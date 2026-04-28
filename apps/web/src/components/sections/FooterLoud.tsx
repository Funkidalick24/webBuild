import { SectionFrame, type SectionMetadata } from './SectionFrame';

export type FooterLoudProps = {
  sectionIndex?: number;
  meta?: Omit<SectionMetadata, 'sectionIndex'>;
  brand?: string;
  links?: string[];
};

export function FooterLoud({
  sectionIndex = 4,
  meta = {},
  brand = 'WebBuild',
  links = ['Templates', 'Pricing', 'Docs', 'Status', 'Privacy', 'Terms'],
}: FooterLoudProps) {
  return (
    <SectionFrame meta={{ sectionIndex, ...meta }} title="Footer">
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="text-[clamp(1.6rem,3vw,2rem)] font-medium leading-[1.2] tracking-[-0.01em] text-[var(--md-on-surface)]">
            {brand}
          </div>
          <p className="mt-3 text-base leading-6 text-[var(--md-on-surface-variant)]">
            A Material You prototype you can iterate on.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {links.slice(0, 6).map((label) => (
            <div
              key={label}
              className="rounded-full bg-[var(--md-surface-container-low)] px-4 py-3 text-sm font-medium text-[var(--md-on-surface-variant)] shadow-[var(--md-shadow-sm)] transition-all duration-300 ease-[var(--md-ease)] hover:bg-[color-mix(in_srgb,var(--md-primary)_8%,transparent)] hover:text-[var(--md-on-surface)]"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
