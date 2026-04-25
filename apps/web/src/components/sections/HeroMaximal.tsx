import { type CSSProperties } from 'react';

import { getAccentForSection } from '../../design/tokens';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';

export function HeroMaximal() {
  const heroAccent = getAccentForSection(0);

  return (
    <section
      className="pattern-mesh-zig relative overflow-hidden border-b-[6px] border-[var(--mx-color-accent-4)] bg-[var(--mx-color-bg)] px-6 py-16 md:px-12"
      style={{ '--hero-accent': heroAccent } as CSSProperties}
    >
      <div className="absolute -left-6 top-8 floating-orb text-6xl">💥</div>
      <div className="absolute right-8 top-24 floating-orb text-5xl">⚡</div>
      <div className="absolute bottom-10 left-1/3 floating-orb text-4xl">🎉</div>

      <p className="mb-4 -rotate-2 text-xl font-black uppercase tracking-[0.2em] text-[var(--mx-color-accent-1)]">
        Build Loud. Ship Fast.
      </p>

      <h1 className="max-w-5xl text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.9] text-[var(--mx-color-accent-2)] [text-shadow:var(--mx-shadow-text)]">
        Website Builder
        <span className="ml-3 inline-block -rotate-2 bg-gradient-to-r from-[var(--hero-accent)] via-[var(--mx-color-accent-2)] to-[var(--mx-color-accent-1)] bg-clip-text text-transparent animate-pulse">
          Engine
        </span>
      </h1>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <Card className="-rotate-1" accent="var(--mx-color-accent-2)">
          <p className="mb-4 text-xl font-extrabold">AI + Drag & Drop + Maximalist DNA</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" tone="pink">
              Start from Prompt
            </Button>
            <Button size="lg" tone="electric">
              Open Editor
            </Button>
          </div>
        </Card>

        <Card className="rotate-1 border-double" accent="var(--mx-color-accent-1)">
          <label className="mb-2 block text-sm font-black uppercase tracking-widest text-[var(--mx-color-accent-1)]">
            Describe your brand vibe
          </label>
          <Input placeholder="Neon skate shop with chaotic collage energy" />
        </Card>
      </div>
    </section>
  );
}
