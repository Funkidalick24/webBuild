import Link from 'next/link';

import { Button } from '../ui/button';
import { SectionFrame, type SectionMetadata } from './SectionFrame';

export type CTABlastProps = {
  sectionIndex?: number;
  meta?: Omit<SectionMetadata, 'sectionIndex'>;
  headline?: string;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CTABlast({
  sectionIndex = 3,
  meta = {},
  headline = 'Publish a prototype',
  subhead = 'A single click creates a shareable version you can iterate on.',
  ctaLabel = 'Create Another Draft',
  ctaHref = '/create',
}: CTABlastProps) {
  return (
    <SectionFrame meta={{ sectionIndex, ...meta }} title="Call To Action">
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.2] tracking-[-0.01em] text-[var(--md-on-surface)]">
            {headline}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-6 text-[var(--md-on-surface-variant)]">
            {subhead}
          </p>
        </div>

        <div className="rounded-[var(--md-radius-xl)] bg-[var(--md-surface-container-low)] p-6 shadow-[var(--md-shadow-sm)] transition-all duration-300 ease-[var(--md-ease)] hover:shadow-[var(--md-shadow-md)]">
          <p className="text-sm font-medium text-[var(--md-on-surface-variant)]">Ready when you are</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href={ctaHref}>
              <Button size="lg" variant="filled">
                {ctaLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
