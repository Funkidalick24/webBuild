'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { api } from '../../lib/api';

export default function CreatePage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('Neon skate shop with chaotic collage energy');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCreate() {
    setBusy(true);
    setError(null);
    try {
      const result = await api.createSiteFromPrompt(prompt);
      router.push(`/editor/${result.siteId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create site');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Card className="rounded-[var(--md-radius-2xl)] p-8" interactive>
        <h1 className="text-3xl font-medium tracking-tight text-[var(--md-on-surface)]">Create site</h1>
        <p className="mt-2 text-base leading-6 text-[var(--md-on-surface-variant)]">
          Describe the vibe. We generate a section plan and seed a site you can edit.
        </p>

        <div className="mt-6 grid gap-4">
          <Input value={prompt} onChange={(event) => setPrompt(event.target.value)} />
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" variant="filled" disabled={busy} onClick={onCreate}>
              {busy ? 'Generating…' : 'Generate Draft'}
            </Button>
            {error ? <p className="text-sm font-medium text-[var(--md-tertiary)]">{error}</p> : null}
          </div>
        </div>
      </Card>
    </main>
  );
}
