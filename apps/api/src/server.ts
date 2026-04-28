import cors from '@fastify/cors';
import Fastify, { type FastifyReply } from 'fastify';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { z } from 'zod';

import { runGenerationPipeline, type PipelineOutput } from './ai/pipeline';
import { recordAuditEvent } from './domain/auditTrail';
import { COMPONENT_TREE_SCHEMA_VERSION, validateMaximalismConstraints, type VersionedComponentTree } from './domain/componentTreeSchema';

type SiteRecord = {
  id: string;
  name: string;
  createdAt: string;
  tokenProfile?: PipelineOutput['tokenProfile'];
};

type PageRecord = {
  id: string;
  siteId: string;
  slug: string;
  tree?: VersionedComponentTree;
};

type PublishRecord = {
  versionId: string;
  siteId: string;
  createdAt: string;
  snapshot: {
    site: SiteRecord;
    page: PageRecord | null;
  };
};

const sites = new Map<string, SiteRecord>();
const pages = new Map<string, PageRecord>();
const publishesBySite = new Map<string, PublishRecord[]>();

const createSiteBodySchema = z.object({
  name: z.string().min(1).max(80).optional(),
  generation: z
    .object({
      tokenProfile: z
        .object({
          accents: z.tuple([z.string(), z.string(), z.string(), z.string(), z.string()]),
          shadowProfile: z.string(),
          typographyScale: z.array(z.string()),
        })
        .optional(),
    })
    .passthrough()
    .optional(),
});

const generationBodySchema = z.object({
  prompt: z.string().min(2).max(2000),
});

const saveLayoutBodySchema = z.object({
  schemaVersion: z.string(),
  pageId: z.string().min(1),
  nodes: z.array(
    z.object({
      id: z.string().min(1),
      type: z.string().min(1),
      props: z.record(z.unknown()).optional(),
      children: z.any().optional(),
      metadata: z
        .object({
          sectionIndex: z.number().int().nonnegative().optional(),
          patterns: z.array(z.string()).optional(),
        })
        .optional(),
    })
  ),
});

export async function buildServer() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  app.get('/health', async () => ({ ok: true }));

  app.post('/v1/ai/generate-site', async (req, reply) => {
    const body = generationBodySchema.parse(req.body);
    const output = await runGenerationPipeline(body.prompt);
    reply.send(output);
  });

  app.post('/v1/sites', async (req, reply) => {
    const body = createSiteBodySchema.parse(req.body);
    const siteId = `site_${randomUUID()}`;
    const createdAt = new Date().toISOString();

    const site: SiteRecord = {
      id: siteId,
      name: body.name ?? 'Untitled Site',
      createdAt,
      tokenProfile: body.generation?.tokenProfile,
    };

    const pageId = `${siteId}_home`;
    const page: PageRecord = { id: pageId, siteId, slug: '/' };

    sites.set(siteId, site);
    pages.set(pageId, page);

    recordAuditEvent({
      tenantId: 'demo',
      siteId,
      userId: 'demo',
      eventType: 'STRUCTURE_MUTATION',
      at: createdAt,
      details: { action: 'site_created' },
    });

    reply.send({ siteId });
  });

  app.get('/v1/sites/:id/pages', async (req, reply) => {
    const siteId = z.object({ id: z.string().min(1) }).parse(req.params).id;
    const sitePages = Array.from(pages.values()).filter((page) => page.siteId === siteId);
    reply.send({ pages: sitePages });
  });

  async function saveLayout(tree: VersionedComponentTree, reply: FastifyReply) {
    const pageId = tree.pageId;
    const page = pages.get(pageId);
    if (!page) {
      reply.code(404).send('Unknown pageId');
      return;
    }

    const errors = validateMaximalismConstraints(tree);
    if (errors.length > 0) {
      reply.code(400).send(errors.join('\n'));
      return;
    }

    page.tree = tree;
    pages.set(page.id, page);

    recordAuditEvent({
      tenantId: 'demo',
      siteId: page.siteId,
      userId: 'demo',
      eventType: 'STRUCTURE_MUTATION',
      at: new Date().toISOString(),
      details: { action: 'layout_saved', pageId },
    });

    reply.send({ ok: true });
  }

  app.patch('/v1/pages/layout', async (req, reply) => {
    const tree = saveLayoutBodySchema.parse(req.body) as VersionedComponentTree;
    await saveLayout(tree, reply);
  });

  app.get('/v1/pages/:id/layout', async (req, reply) => {
    const pageId = z.object({ id: z.string().min(1) }).parse(req.params).id;
    const page = pages.get(pageId);
    if (!page) {
      reply.code(404).send('Unknown pageId');
      return;
    }
    reply.send({ pageId, tree: page.tree ?? null });
  });

  app.patch('/v1/pages/:id/layout', async (req, reply) => {
    const pageId = z.object({ id: z.string().min(1) }).parse(req.params).id;
    const bodyTree = saveLayoutBodySchema.parse({ ...(req.body as object), pageId }) as VersionedComponentTree;
    await saveLayout(bodyTree, reply);
  });

  app.get('/v1/themes/:siteId/tokens', async (req, reply) => {
    const siteId = z.object({ siteId: z.string().min(1) }).parse(req.params).siteId;
    const site = sites.get(siteId);
    if (!site) {
      reply.code(404).send('Unknown siteId');
      return;
    }
    reply.send({ siteId, tokenProfile: site.tokenProfile ?? null });
  });

  app.post('/v1/publish/:siteId', async (req, reply) => {
    const siteId = z.object({ siteId: z.string().min(1) }).parse(req.params).siteId;
    const site = sites.get(siteId);
    if (!site) {
      reply.code(404).send('Unknown siteId');
      return;
    }

    const homePage = pages.get(`${siteId}_home`) ?? null;
    if (!homePage?.tree) {
      reply.code(400).send('Nothing to publish: no saved layout');
      return;
    }

    const treeWithVersion: VersionedComponentTree = {
      ...homePage.tree,
      schemaVersion: homePage.tree.schemaVersion || COMPONENT_TREE_SCHEMA_VERSION,
    };
    const errors = validateMaximalismConstraints(treeWithVersion);
    if (errors.length > 0) {
      reply.code(400).send(errors.join('\n'));
      return;
    }

    recordAuditEvent({
      tenantId: 'demo',
      siteId,
      userId: 'demo',
      eventType: 'PUBLISH_REQUESTED',
      at: new Date().toISOString(),
      details: { pageId: homePage.id },
    });

    const versionId = `pub_${randomUUID()}`;
    const record: PublishRecord = {
      versionId,
      siteId,
      createdAt: new Date().toISOString(),
      snapshot: { site, page: homePage },
    };

    const list = publishesBySite.get(siteId) ?? [];
    list.push(record);
    publishesBySite.set(siteId, list);

    recordAuditEvent({
      tenantId: 'demo',
      siteId,
      userId: 'demo',
      eventType: 'PUBLISH_COMPLETED',
      at: new Date().toISOString(),
      details: { versionId },
    });

    reply.send({ versionId, url: `http://localhost:3001/v1/published/${siteId}/${versionId}` });
  });

  app.get('/v1/published/:siteId/:versionId', async (req, reply) => {
    const params = z.object({ siteId: z.string().min(1), versionId: z.string().min(1) }).parse(req.params);
    const list = publishesBySite.get(params.siteId) ?? [];
    const match = list.find((item) => item.versionId === params.versionId);
    if (!match) {
      reply.code(404).send('Unknown publish version');
      return;
    }
    reply.send(match.snapshot);
  });

  return app;
}

const entryFile = process.argv[1];
if (entryFile && import.meta.url === pathToFileURL(entryFile).toString()) {
  const port = Number(process.env.PORT ?? 3001);
  const host = process.env.HOST ?? '0.0.0.0';

  buildServer()
    .then((app) => app.listen({ port, host }))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    });
}
