import type { NextRequest } from 'next/server';

import { store } from '../../../../../server/store';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ pageId: string }> }) {
  const { pageId } = await ctx.params;
  const tree = await store.getLayout(pageId);
  return Response.json({ pageId, tree });
}

