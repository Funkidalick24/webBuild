import { SectionFrame, type SectionMetadata } from './SectionFrame';

export type FeatureGridProps = {
  sectionIndex?: number;
  meta?: Omit<SectionMetadata, 'sectionIndex'>;
  headline?: string;
  bullets?: string[];
};

export function FeatureGridMaximal({
  sectionIndex = 1,
  meta = {},
  headline = 'Material You, end to end',
  bullets = ['Tonal surfaces instead of borders', 'State layers + tactile press feedback', 'Soft elevation that scales with importance'],
}: FeatureGridProps) {
  return (
    <SectionFrame meta={{ sectionIndex, ...meta }} title="Highlights">
      <h2 className="max-w-4xl text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.2] tracking-[-0.01em] text-[var(--md-on-surface)]">
        {headline}
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {bullets.slice(0, 6).map((text, i) => (
          <div
            key={`${i}-${text}`}
            className="rounded-[var(--md-radius-lg)] bg-[var(--md-surface-container-low)] p-6 shadow-[var(--md-shadow-sm)] transition-all duration-300 ease-[var(--md-ease)] hover:shadow-[var(--md-shadow-md)] hover:scale-[1.01]"
          >
            <div className="text-sm font-medium text-[var(--md-primary)]">Feature {i + 1}</div>
            <p className="mt-2 text-base leading-6 text-[var(--md-on-surface-variant)]">{text}</p>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}

/* Legacy export name retained; file now implements MD3 styling. */
