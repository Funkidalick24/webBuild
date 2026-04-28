import { type CSSProperties, type ReactNode } from 'react';

export type SectionMetadata = {
  sectionIndex: number;
  chaosOffsetX?: number;
  chaosOffsetY?: number;
  rotation?: number;
};

function normalizeRotation(rotation?: number) {
  if (!rotation) return 0;
  const allowed = [-6, -3, 0, 3, 6];
  return allowed.includes(rotation) ? rotation : 0;
}

export function SectionFrame({
  meta,
  title,
  children,
}: {
  meta: SectionMetadata;
  title?: string;
  children: ReactNode;
}) {
  const rot = normalizeRotation(meta.rotation);
  const x = meta.chaosOffsetX ?? 0;
  const y = meta.chaosOffsetY ?? 0;

  return (
    <section
      className="relative overflow-hidden rounded-[var(--md-radius-2xl)] bg-[var(--md-surface-container)] px-6 py-14 shadow-[var(--md-shadow-md)] md:px-10"
      style={
        {
          transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--md-primary)_22%,transparent)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-[color-mix(in_srgb,var(--md-tertiary)_18%,transparent)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-140px] left-1/3 h-96 w-96 rounded-full bg-[color-mix(in_srgb,var(--md-secondary-container)_26%,transparent)] blur-3xl"
      />

      {title ? (
        <div className="mb-6 inline-flex rounded-full bg-[var(--md-secondary-container)] px-4 py-2 text-sm font-medium text-[var(--md-on-secondary-container)]">
          {title}
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </section>
  );
}
