import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

import type { PipelineOutput, TokenProfile, VersionedComponentTree } from '../lib/types';

type SiteRecord = {
  siteId: string;
  name: string;
  createdAt: string;
  generation: PipelineOutput;
};

type PublishRecord = {
  versionId: string;
  siteId: string;
  pageId: string;
  createdAt: string;
  tree: VersionedComponentTree;
  tokenProfile: TokenProfile;
};

type DbShape = {
  sites: Record<string, SiteRecord>;
  pages: Record<string, VersionedComponentTree>;
  publishes: Record<string, PublishRecord>;
};

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readDb(): Promise<DbShape> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    const parsed = JSON.parse(raw) as Partial<DbShape>;
    return {
      sites: parsed.sites ?? {},
      pages: parsed.pages ?? {},
      publishes: parsed.publishes ?? {},
    };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return { sites: {}, pages: {}, publishes: {} };
    }
    throw err;
  }
}

async function writeDb(next: DbShape) {
  await ensureDataDir();
  await fs.writeFile(DB_PATH, JSON.stringify(next, null, 2), 'utf8');
}

function newId(prefix: string) {
  const id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
  return `${prefix}_${id.replaceAll('-', '')}`;
}

export const store = {
  async createSite(input: { name: string; generation: PipelineOutput }) {
    const db = await readDb();
    const siteId = newId('site');
    db.sites[siteId] = {
      siteId,
      name: input.name,
      createdAt: new Date().toISOString(),
      generation: input.generation,
    };
    await writeDb(db);
    return db.sites[siteId];
  },

  async getSite(siteId: string): Promise<SiteRecord | null> {
    const db = await readDb();
    return db.sites[siteId] ?? null;
  },

  async updateSiteTokenProfile(siteId: string, tokenProfile: TokenProfile): Promise<boolean> {
    const db = await readDb();
    const site = db.sites[siteId];
    if (!site) return false;
    site.generation = { ...site.generation, tokenProfile };
    db.sites[siteId] = site;
    await writeDb(db);
    return true;
  },

  async saveLayout(tree: VersionedComponentTree) {
    const db = await readDb();
    db.pages[tree.pageId] = tree;
    await writeDb(db);
    return { ok: true as const };
  },

  async getLayout(pageId: string): Promise<VersionedComponentTree | null> {
    const db = await readDb();
    return db.pages[pageId] ?? null;
  },

  async publishSite(siteId: string): Promise<PublishRecord | null> {
    const db = await readDb();
    const site = db.sites[siteId];
    if (!site) return null;

    const pageId = `${siteId}_home`;
    const tree = db.pages[pageId];
    if (!tree) return null;

    const versionId = newId('ver');
    const record: PublishRecord = {
      versionId,
      siteId,
      pageId,
      createdAt: new Date().toISOString(),
      tree,
      tokenProfile: site.generation.tokenProfile,
    };
    db.publishes[versionId] = record;
    await writeDb(db);
    return record;
  },

  async getPublished(versionId: string): Promise<PublishRecord | null> {
    const db = await readDb();
    return db.publishes[versionId] ?? null;
  },
};

