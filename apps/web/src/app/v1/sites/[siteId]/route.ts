import type { NextRequest } from 'next/server';

import type { TokenProfile } from '../../../../lib/types';
import { store } from '../../../../server/store';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ siteId: string }> }) {
  const { siteId } = await ctx.params;
  const site = await store.getSite(siteId);
  if (!site) return new Response('Not found', { status: 404 });
  return Response.json({ siteId: site.siteId, name: site.name, generation: site.generation });
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ siteId: string }> }) {
  const { siteId } = await ctx.params;
  const body = (await req.json().catch(() => null)) as { tokenProfile?: TokenProfile } | null;
  if (!body?.tokenProfile) return new Response('Missing tokenProfile', { status: 400 });

  const ok = await store.updateSiteTokenProfile(siteId, body.tokenProfile);
  if (!ok) return new Response('Not found', { status: 404 });
  return Response.json({ ok: true });
}

