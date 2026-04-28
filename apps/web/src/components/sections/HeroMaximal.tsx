import Link from 'next/link';
import { type CSSProperties } from 'react';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { SectionFrame, type SectionMetadata } from './SectionFrame';

export type HeroMaximalProps = {
  sectionIndex?: number;
  meta?: Omit<SectionMetadata, 'sectionIndex'>;
  eyebrow?: string;
  headline?: string;
  highlight?: string;
  subhead?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  promptPlaceholder?: string;
};

export function HeroMaximal({
  sectionIndex = 0,
  meta = {},
  eyebrow = 'Build personal sites, fast.',
  headline = 'Website Builder',
  highlight = 'Studio',
  subhead = 'Generate a draft from a prompt, edit sections, then publish a clean prototype.',
  primaryCtaLabel = 'Create a Site',
  primaryCtaHref = '/create',
  secondaryCtaLabel = 'Open Editor',
  secondaryCtaHref = '/create',
  promptPlaceholder = 'Neon skate shop with chaotic collage energy',
}: HeroMaximalProps) {
  return (
    <SectionFrame meta={{ sectionIndex, ...meta }} title={undefined}>
      <div style={{ '--hero-accent': 'var(--md-primary)' } as CSSProperties}>
        <p className="text-sm font-medium text-[var(--md-on-surface-variant)]">{eyebrow}</p>

        <h1 className="mt-4 max-w-5xl text-[clamp(3rem,6vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.01em] text-[var(--md-on-surface)]">
          {headline}{' '}
          <span className="text-[var(--md-primary)]" style={{ whiteSpace: 'nowrap' }}>
            {highlight}
          </span>
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-7 text-[var(--md-on-surface-variant)]">{subhead}</p>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-[var(--md-radius-2xl)] p-8" interactive>
            <div className="flex flex-wrap gap-3">
              <Link href={primaryCtaHref}>
                <Button size="lg" variant="filled">
                  {primaryCtaLabel}
                </Button>
              </Link>
              <Link href={secondaryCtaHref}>
                <Button size="lg" variant="tonal">
                  {secondaryCtaLabel}
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="rounded-[var(--md-radius-2xl)] p-8">
            <label className="mb-3 block text-sm font-medium text-[var(--md-on-surface-variant)]">
              Describe your brand vibe
            </label>
            <Input placeholder={promptPlaceholder} />
          </Card>
        </div>
      </div>
    </SectionFrame>
  );
}
