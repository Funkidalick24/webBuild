import { SectionFrame, type SectionMetadata } from './SectionFrame';

export type GalleryCollageProps = {
  sectionIndex?: number;
  meta?: Omit<SectionMetadata, 'sectionIndex'>;
  headline?: string;
  tiles?: Array<{ label: string; sublabel?: string }>;
};

export function GalleryCollage({
  sectionIndex = 2,
  meta = {},
  headline = 'Make it yours',
  tiles = [
    { label: 'Drop', sublabel: 'New arrivals. New energy.' },
    { label: 'Look', sublabel: 'Stickers, scribbles, pop type.' },
    { label: 'Feel', sublabel: 'Sharp borders. Loud shadows.' },
    { label: 'Move', sublabel: 'Controlled chaos rails.' },
    { label: 'Ship', sublabel: 'Publish with checks.' },
    { label: 'Repeat', sublabel: 'Templates next.' },
  ],
}: GalleryCollageProps) {
  return (
    <SectionFrame meta={{ sectionIndex, ...meta }} title="Gallery">
      <div className="grid items-end gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <h2 className="text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.2] tracking-[-0.01em] text-[var(--md-on-surface)]">
          {headline}
        </h2>
        <p className="text-base leading-6 text-[var(--md-on-surface-variant)]">
          Soft surfaces, friendly motion, and a system that stays consistent across pages.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-12">
        {tiles.slice(0, 6).map((tile, i) => {
          const span = i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5' : 'md:col-span-4';
          return (
            <div
              key={`${i}-${tile.label}`}
              className={`${span} group relative overflow-hidden rounded-[var(--md-radius-xl)] bg-[var(--md-surface-container-low)] p-6 shadow-[var(--md-shadow-sm)] transition-all duration-300 ease-[var(--md-ease)] hover:shadow-[var(--md-shadow-md)] hover:scale-[1.01]`}
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[color-mix(in_srgb,var(--md-primary)_18%,transparent)] blur-3xl transition-opacity duration-300 ease-[var(--md-ease)] group-hover:opacity-100 opacity-70" />

              <div className="relative">
                <div className="inline-flex rounded-full bg-[var(--md-secondary-container)] px-3 py-1 text-xs font-medium text-[var(--md-on-secondary-container)]">
                  {tile.label}
                </div>
                {tile.sublabel ? <p className="mt-3 text-base text-[var(--md-on-surface-variant)]">{tile.sublabel}</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </SectionFrame>
  );
}
