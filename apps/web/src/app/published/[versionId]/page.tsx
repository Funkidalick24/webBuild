import { notFound } from 'next/navigation';

import { sectionComponents, type SectionComponentKey } from '../../../components/sections/sectionComponents';
import { store } from '../../../server/store';
import type { ComponentNode } from '../../../lib/types';

function renderNode(node: ComponentNode, index: number) {
  const type = (node.type in sectionComponents ? node.type : 'HeroMaximal') as SectionComponentKey;
  const Component = sectionComponents[type];

  const meta = {
    chaosOffsetX: node.metadata?.chaosOffsetX ?? 0,
    chaosOffsetY: node.metadata?.chaosOffsetY ?? 0,
    rotation: node.metadata?.rotation ?? 0,
  };

  return (
    <div key={node.id} className="mb-10">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Component sectionIndex={index} meta={meta as any} {...(node.props ?? {})} />
    </div>
  );
}

export default async function PublishedPage({ params }: { params: Promise<{ versionId: string }> }) {
  const { versionId } = await params;
  const published = await store.getPublished(versionId);
  if (!published) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-10">
      {published.tree.nodes.map((node, index) => renderNode({ ...node, metadata: { ...node.metadata, sectionIndex: index } }, index))}
      <div className="pt-10 text-center text-sm text-[var(--md-on-surface-variant)]">
        Published prototype version: <span className="font-medium text-[var(--md-on-surface)]">{versionId}</span>
      </div>
    </main>
  );
}
