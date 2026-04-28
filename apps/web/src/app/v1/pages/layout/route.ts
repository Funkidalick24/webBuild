import type { NextRequest } from 'next/server';

import type { VersionedComponentTree } from '../../../../lib/types';
import { store } from '../../../../server/store';

export async function PATCH(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as VersionedComponentTree | null;
  if (!body?.pageId || !body?.schemaVersion) return new Response('Invalid tree', { status: 400 });
  await store.saveLayout(body);
  return Response.json({ ok: true });
}
