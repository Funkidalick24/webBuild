'use client';

import { useParams } from 'next/navigation';
import { type CSSProperties, Suspense, useEffect, useMemo, useRef, useState } from 'react';

import { sectionKeys, sectionRegistry, type SectionKey } from '../../../components/sections/SectionRegistry';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { api } from '../../../lib/api';
import type { ComponentNode, VersionedComponentTree } from '../../../lib/types';

type Breakpoint = 'desktop' | 'tablet' | 'mobile';

function randomId(prefix = 'sec') {
  return `${prefix}_${Math.random().toString(16).slice(2)}`;
}

function defaultPropsFor(type: SectionKey): Record<string, unknown> {
  switch (type) {
    case 'HeroMaximal':
      return {
        eyebrow: 'Build personal sites, fast.',
        headline: 'Your Brand',
        highlight: 'Online',
        subhead: 'Generate a draft from a prompt, edit sections, then publish a clean prototype.',
        primaryCtaLabel: 'Create a Site',
        primaryCtaHref: '/create',
        secondaryCtaLabel: 'Open Editor',
        secondaryCtaHref: '/create',
      };
    case 'FeatureGridMaximal':
      return {
        headline: 'Material You, end to end',
        bullets: ['Tonal surfaces instead of borders', 'State layers + tactile press feedback', 'Soft elevation that scales with importance'],
      };
    case 'GalleryCollage':
      return {
        headline: 'Make it yours',
        tiles: [
          { label: 'Drop', sublabel: 'New arrivals. New energy.' },
          { label: 'Look', sublabel: 'Stickers, scribbles, pop type.' },
          { label: 'Feel', sublabel: 'Sharp borders. Loud shadows.' },
          { label: 'Move', sublabel: 'Controlled chaos rails.' },
          { label: 'Ship', sublabel: 'Publish with checks.' },
          { label: 'Repeat', sublabel: 'Templates next.' },
        ],
      };
    case 'CTABlast':
      return {
        headline: 'Publish a prototype',
        subhead: 'A single click creates a shareable version you can iterate on.',
        ctaLabel: 'Create Another Draft',
        ctaHref: '/create',
      };
    case 'FooterLoud':
      return {
        brand: 'WebBuild',
        links: ['Templates', 'Pricing', 'Docs', 'Status', 'Privacy', 'Terms'],
      };
  }
}

function normalizeNode(node: ComponentNode, index: number): ComponentNode {
  const type = (Object.prototype.hasOwnProperty.call(sectionRegistry, node.type) ? node.type : 'HeroMaximal') as SectionKey;
  return {
    ...node,
    type,
    props: { ...defaultPropsFor(type), ...(node.props ?? {}) },
    metadata: {
      sectionIndex: index,
      chaosOffsetX: node.metadata?.chaosOffsetX ?? 0,
      chaosOffsetY: node.metadata?.chaosOffsetY ?? 0,
      rotation: node.metadata?.rotation ?? 0,
    },
  };
}

export default function EditorPage(_props: { params?: Promise<{ siteId: string }> }) {
  const params = useParams<{ siteId: string }>();
  const siteId = params.siteId;
  const [nodes, setNodes] = useState<ComponentNode[]>([
    normalizeNode({ id: randomId(), type: 'HeroMaximal', props: {}, metadata: {} }, 0),
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [lastPublishUrl, setLastPublishUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [siteName, setSiteName] = useState<string>('Draft Site');
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');
  const dragIdRef = useRef<string | null>(null);

  const tree: VersionedComponentTree = useMemo(
    () => ({
      schemaVersion: '1.0.0',
      pageId: `${siteId}_home`,
      nodes: nodes.map((node, index) => ({
        ...node,
        metadata: { ...node.metadata, sectionIndex: index },
      })),
    }),
    [nodes, siteId]
  );

  useEffect(() => {
    if (hydrated) return;
    if (!siteId) return;

    const pageId = `${siteId}_home`;
    setBusy(true);
    Promise.all([api.getLayout(pageId), api.getSite(siteId)])
      .then(([layoutRes, siteRes]) => {
        setSiteName(siteRes.name);

        if (!layoutRes.tree) return;
        const nextNodes = layoutRes.tree.nodes.map((node, index) => normalizeNode(node, index));
        if (nextNodes.length > 0) setNodes(nextNodes);
      })
      .catch(() => {
        // ignore hydration errors (site may not exist yet)
      })
      .finally(() => {
        setHydrated(true);
        setBusy(false);
      });
  }, [hydrated, siteId]);

  async function onSave() {
    setBusy(true);
    setError(null);
    try {
      await api.saveLayout(tree);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save layout');
    } finally {
      setBusy(false);
    }
  }

  async function onPublish() {
    setBusy(true);
    setError(null);
    try {
      await api.saveLayout(tree);
      const published = await api.publish(siteId);
      setLastPublishUrl(published.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setBusy(false);
    }
  }

  function addSection(type: SectionKey) {
    setNodes((prev) => {
      const next = [
        ...prev,
        normalizeNode(
          {
            id: randomId(),
            type,
            props: defaultPropsFor(type),
            metadata: { chaosOffsetX: 0, chaosOffsetY: 0, rotation: 0 },
          },
          prev.length
        ),
      ];
      return next.map((n, i) => normalizeNode(n, i));
    });
  }

  function removeSelected() {
    if (!selectedId) return;
    setNodes((prev) => prev.filter((n) => n.id !== selectedId).map((n, i) => normalizeNode(n, i)));
    setSelectedId(null);
  }

  function moveSelected(dir: -1 | 1) {
    if (!selectedId) return;
    setNodes((prev) => {
      const idx = prev.findIndex((n) => n.id === selectedId);
      if (idx < 0) return prev;
      const nextIdx = idx + dir;
      if (nextIdx < 0 || nextIdx >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(idx, 1);
      next.splice(nextIdx, 0, item);
      return next.map((n, i) => normalizeNode(n, i));
    });
  }

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? null;

  return (
    <main className="min-h-screen bg-[var(--md-surface)]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-[var(--md-on-surface)]">Editor</h1>
            <p className="mt-2 text-sm text-[var(--md-on-surface-variant)]">
              <span className="font-medium text-[var(--md-on-surface)]">{siteName}</span> <span className="opacity-70">({siteId})</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-1 rounded-full bg-[var(--md-surface-container)] p-1 shadow-[var(--md-shadow-sm)]">
              <button
                type="button"
                onClick={() => setBreakpoint('desktop')}
                className={segmented(breakpoint === 'desktop')}
              >
                Desktop
              </button>
              <button
                type="button"
                onClick={() => setBreakpoint('tablet')}
                className={segmented(breakpoint === 'tablet')}
              >
                Tablet
              </button>
              <button
                type="button"
                onClick={() => setBreakpoint('mobile')}
                className={segmented(breakpoint === 'mobile')}
              >
                Mobile
              </button>
            </div>
            <Button size="md" variant="tonal" disabled={busy} onClick={onSave}>
              Save
            </Button>
            <Button size="md" variant="filled" disabled={busy} onClick={onPublish}>
              Publish
            </Button>
          </div>
        </div>

        {error ? <pre className="mt-4 whitespace-pre-wrap text-sm text-[var(--md-tertiary)]">{error}</pre> : null}

        {lastPublishUrl ? (
          <Card className="mt-6 rounded-[var(--md-radius-xl)] p-6" interactive>
            <p className="text-sm font-medium text-[var(--md-on-surface-variant)]">
              Published:{' '}
              <a className="underline" href={lastPublishUrl} target="_blank" rel="noreferrer">
                {lastPublishUrl}
              </a>
            </p>
          </Card>
        ) : null}

        <div className="mt-10 grid gap-10 lg:grid-cols-[360px_1fr]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <Card className="rounded-[var(--md-radius-xl)]" interactive>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-medium text-[var(--md-on-surface)]">Sections</h2>
                <select
                  className="h-10 rounded-full bg-[var(--md-surface-container-low)] px-4 text-sm text-[var(--md-on-surface)] shadow-[var(--md-shadow-sm)] transition-all duration-300 ease-[var(--md-ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)]"
                  onChange={(e) => {
                    const value = e.target.value as SectionKey;
                    if (value) addSection(value);
                    e.currentTarget.selectedIndex = 0;
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Add…
                  </option>
                  {sectionKeys.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 grid gap-3">
                {nodes.map((n, i) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setSelectedId(n.id)}
                    className={`w-full rounded-[var(--md-radius-lg)] px-4 py-3 text-left shadow-[var(--md-shadow-sm)] transition-all duration-300 ease-[var(--md-ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] ${
                      n.id === selectedId
                        ? 'bg-[color-mix(in_srgb,var(--md-primary)_12%,var(--md-surface-container))] text-[var(--md-on-surface)]'
                        : 'bg-[var(--md-surface-container-low)] text-[var(--md-on-surface)] hover:shadow-[var(--md-shadow-md)] hover:scale-[1.01]'
                    }`}
                  >
                    <div className="text-xs text-[var(--md-on-surface-variant)]">#{i + 1}</div>
                    <div className="mt-1 text-sm font-medium">{n.type}</div>
                  </button>
                ))}
              </div>
            </Card>

            <div className="mt-6">
              <Card className="rounded-[var(--md-radius-xl)]" interactive>
                <h2 className="text-sm font-medium text-[var(--md-on-surface)]">Inspector</h2>
                {selectedNode ? (
                  <Inspector
                    node={selectedNode}
                    onChange={(next) =>
                      setNodes((prev) => prev.map((n) => (n.id === next.id ? normalizeNode(next, n.metadata?.sectionIndex ?? 0) : n)))
                    }
                    onRemove={removeSelected}
                    onMoveUp={() => moveSelected(-1)}
                    onMoveDown={() => moveSelected(1)}
                  />
                ) : (
                  <p className="mt-3 text-sm text-[var(--md-on-surface-variant)]">
                    Select a section to edit spacing rails and copy.
                  </p>
                )}
              </Card>
            </div>
          </aside>

          <section className="min-w-0">
            <div
              className="mx-auto rounded-[var(--md-radius-xl)] bg-[var(--md-surface-container)] p-3 shadow-[var(--md-shadow-md)]"
              style={{ width: breakpointWidth(breakpoint) }}
            >
              <div className="grid gap-10">
                {nodes.map((node, index) => {
                  const type = (Object.prototype.hasOwnProperty.call(sectionRegistry, node.type) ? node.type : 'HeroMaximal') as SectionKey;
                  const SectionComponent = sectionRegistry[type];
                  const meta = {
                    chaosOffsetX: node.metadata?.chaosOffsetX ?? 0,
                    chaosOffsetY: node.metadata?.chaosOffsetY ?? 0,
                    rotation: node.metadata?.rotation ?? 0,
                  };

                  return (
                    <div
                      key={node.id}
                      className={`relative rounded-[var(--md-radius-xl)] ring-2 ${
                        node.id === selectedId ? 'ring-[color-mix(in_srgb,var(--md-primary)_55%,transparent)]' : 'ring-transparent'
                      }`}
                      draggable
                      onDragStart={() => {
                        dragIdRef.current = node.id;
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDrop={() => {
                        const dragged = dragIdRef.current;
                        dragIdRef.current = null;
                        if (!dragged || dragged === node.id) return;
                        setNodes((prev) => {
                          const from = prev.findIndex((n) => n.id === dragged);
                          const to = prev.findIndex((n) => n.id === node.id);
                          if (from < 0 || to < 0) return prev;
                          const next = [...prev];
                          const [item] = next.splice(from, 1);
                          next.splice(to, 0, item);
                          return next.map((n, i) => normalizeNode(n, i));
                        });
                      }}
                      onClick={() => setSelectedId(node.id)}
                    >
                      <div className="absolute -top-4 left-3 z-10 inline-flex items-center gap-2 rounded-full bg-[var(--md-secondary-container)] px-3 py-1 text-xs font-medium text-[var(--md-on-secondary-container)] shadow-[var(--md-shadow-sm)]">
                        {type} #{index + 1}
                      </div>
                      <Suspense fallback={<div className="rounded-[var(--md-radius-xl)] bg-[var(--md-surface-container-low)] p-10 text-sm">Loading section…</div>}>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <SectionComponent sectionIndex={index} meta={meta as any} {...(node.props ?? {})} />
                      </Suspense>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function segmented(active: boolean) {
  return `h-9 rounded-full px-4 text-sm font-medium transition-all duration-300 ease-[var(--md-ease)] ${
    active
      ? 'bg-[color-mix(in_srgb,var(--md-primary)_14%,transparent)] text-[var(--md-on-surface)]'
      : 'text-[var(--md-on-surface-variant)] hover:bg-[color-mix(in_srgb,var(--md-primary)_10%,transparent)] hover:text-[var(--md-on-surface)]'
  }`;
}

function breakpointWidth(bp: Breakpoint) {
  if (bp === 'mobile') return 390;
  if (bp === 'tablet') return 820;
  return '100%';
}

function Inspector({
  node,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  node: ComponentNode;
  onChange: (node: ComponentNode) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const type = node.type as SectionKey;
  const rotation = node.metadata?.rotation ?? 0;
  const x = node.metadata?.chaosOffsetX ?? 0;
  const y = node.metadata?.chaosOffsetY ?? 0;

  return (
    <div className="mt-4 grid gap-5">
      <div className="flex flex-wrap gap-3">
        <button type="button" className={miniBtn()} onClick={onMoveUp}>
          Move Up
        </button>
        <button type="button" className={miniBtn()} onClick={onMoveDown}>
          Move Down
        </button>
        <button type="button" className={miniBtn('danger')} onClick={onRemove}>
          Remove
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-[var(--md-on-surface)]">Rotate</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[-6, -3, 0, 3, 6].map((deg) => (
              <button
                key={deg}
                type="button"
                className={pill(rotation === deg)}
                onClick={() => onChange({ ...node, metadata: { ...node.metadata, rotation: deg } })}
              >
                {deg}deg
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-[var(--md-on-surface)]">Rails</div>
          <div className="mt-3 grid gap-3">
            <label className="grid gap-2">
              <span className="text-xs text-[var(--md-on-surface-variant)]">X: {x}px</span>
              <input
                type="range"
                min={-24}
                max={24}
                value={x}
                onChange={(e) => onChange({ ...node, metadata: { ...node.metadata, chaosOffsetX: Number(e.target.value) } })}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs text-[var(--md-on-surface-variant)]">Y: {y}px</span>
              <input
                type="range"
                min={-24}
                max={24}
                value={y}
                onChange={(e) => onChange({ ...node, metadata: { ...node.metadata, chaosOffsetY: Number(e.target.value) } })}
              />
            </label>
          </div>
        </div>
      </div>

      {type === 'HeroMaximal' ? (
        <div className="grid gap-3">
          <div className="text-sm font-medium text-[var(--md-on-surface)]">Hero copy</div>
          <LabeledInput
            label="Eyebrow"
            value={(node.props?.eyebrow as string) ?? ''}
            onChange={(v) => onChange({ ...node, props: { ...(node.props ?? {}), eyebrow: v } })}
          />
          <LabeledInput
            label="Headline"
            value={(node.props?.headline as string) ?? ''}
            onChange={(v) => onChange({ ...node, props: { ...(node.props ?? {}), headline: v } })}
          />
          <LabeledInput
            label="Highlight"
            value={(node.props?.highlight as string) ?? ''}
            onChange={(v) => onChange({ ...node, props: { ...(node.props ?? {}), highlight: v } })}
          />
        </div>
      ) : null}
    </div>
  );
}

function LabeledInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs text-[var(--md-on-surface-variant)]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-[var(--md-radius-lg)] bg-[var(--md-surface-container-low)] px-4 text-sm text-[var(--md-on-surface)] shadow-[var(--md-shadow-sm)] transition-all duration-200 ease-[var(--md-ease)] placeholder:text-[color-mix(in_srgb,var(--md-on-surface)_55%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--md-primary)_30%,transparent)]"
      />
    </label>
  );
}

function miniBtn(kind: 'default' | 'danger' = 'default') {
  return `h-10 rounded-full px-4 text-sm font-medium shadow-[var(--md-shadow-sm)] transition-all duration-300 ease-[var(--md-ease)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] ${
    kind === 'danger'
      ? 'bg-[color-mix(in_srgb,var(--md-tertiary)_22%,transparent)] text-[var(--md-on-surface)] hover:shadow-[var(--md-shadow-md)]'
      : 'bg-[var(--md-surface-container-low)] text-[var(--md-on-surface)] hover:bg-[color-mix(in_srgb,var(--md-primary)_10%,transparent)] hover:shadow-[var(--md-shadow-md)]'
  }`;
}

function pill(active: boolean) {
  return `h-9 rounded-full px-4 text-sm font-medium shadow-[var(--md-shadow-sm)] transition-all duration-300 ease-[var(--md-ease)] active:scale-95 ${
    active
      ? 'bg-[color-mix(in_srgb,var(--md-primary)_16%,transparent)] text-[var(--md-on-surface)]'
      : 'bg-[var(--md-surface-container-low)] text-[var(--md-on-surface-variant)] hover:bg-[color-mix(in_srgb,var(--md-primary)_10%,transparent)] hover:text-[var(--md-on-surface)]'
  }`;
}
