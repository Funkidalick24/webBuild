import type { NextRequest } from 'next/server';

import type { PipelineOutput } from '../../../lib/types';
import { store } from '../../../server/store';

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { name?: string; generation?: PipelineOutput } | null;
  const name = (body?.name ?? 'Draft Site').toString();
  const generation = body?.generation;
  if (!generation) return new Response('Missing generation', { status: 400 });

  const created = await store.createSite({ name, generation });
  return Response.json({ siteId: created.siteId });
}
