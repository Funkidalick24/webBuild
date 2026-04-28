import Link from 'next/link';

import { HeroMaximal } from '../components/sections/HeroMaximal';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-10">
      <HeroMaximal />
      <section className="mt-10">
        <Card className="rounded-[var(--md-radius-2xl)] p-8" interactive>
          <h2 className="text-2xl font-medium tracking-tight text-[var(--md-on-surface)]">Editor MVP</h2>
          <p className="mt-2 max-w-3xl text-base leading-6 text-[var(--md-on-surface-variant)]">
            Generate a draft site from a prompt, tweak sections in the editor, then publish a shareable prototype.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/create">
              <Button size="lg" variant="filled">
                Create a Site
              </Button>
            </Link>
            <Link href="/create">
              <Button size="lg" variant="outlined">
                Try a Draft
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </main>
  );
}
