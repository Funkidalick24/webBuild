import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';

export function HeroMaximal() {
  return (
    <section className="pattern-mesh-zig relative overflow-hidden border-b-[6px] border-orange-500 bg-[#120224] px-6 py-16 md:px-12">
      <div className="absolute -left-6 top-8 floating-orb text-6xl">💥</div>
      <div className="absolute right-8 top-24 floating-orb text-5xl">⚡</div>
      <div className="absolute bottom-10 left-1/3 floating-orb text-4xl">🎉</div>

      <p className="mb-4 -rotate-2 text-xl font-black uppercase tracking-[0.2em] text-cyan-300">
        Build Loud. Ship Fast.
      </p>

      <h1 className="max-w-5xl text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.9] text-yellow-300 [text-shadow:2px_2px_0_#000,4px_4px_0_#FF1178,6px_6px_0_#00F5D4]">
        Website Builder
        <span className="ml-3 inline-block -rotate-2 bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-300 bg-clip-text text-transparent animate-pulse">
          Engine
        </span>
      </h1>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <Card className="-rotate-1">
          <p className="mb-4 text-xl font-extrabold">AI + Drag & Drop + Maximalist DNA</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" tone="pink">Start from Prompt</Button>
            <Button size="lg" tone="electric">Open Editor</Button>
          </div>
        </Card>

        <Card className="rotate-1 border-double">
          <label className="mb-2 block text-sm font-black uppercase tracking-widest text-cyan-200">
            Describe your brand vibe
          </label>
          <Input placeholder="Neon skate shop with chaotic collage energy" />
        </Card>
      </div>
    </section>
  );
}
