import type { NextRequest } from 'next/server';

import { store } from '../../../../server/store';

function validateTree(tree: { nodes: Array<{ type: string }> }) {
  const problems: string[] = [];
  const hasHero = tree.nodes.some((n) => n.type === 'HeroMaximal');
  if (!hasHero) problems.push('Site must include a HeroMaximal section.');
  return problems;
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ siteId: string }> }) {
  const { siteId } = await ctx.params;
  const site = await store.getSite(siteId);
  if (!site) return new Response('Not found', { status: 404 });

  const tree = await store.getLayout(`${siteId}_home`);
  if (!tree) return new Response('Missing layout', { status: 400 });

  const problems = validateTree(tree);
  if (problems.length) {
    return new Response(problems.join('\n'), { status: 400 });
  }

  const published = await store.publishSite(siteId);
  if (!published) return new Response('Publish failed', { status: 400 });

  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? 'localhost:3000';
  const proto = req.headers.get('x-forwarded-proto') ?? 'http';
  const url = `${proto}://${host}/published/${published.versionId}`;
  return Response.json({ versionId: published.versionId, url });
}
