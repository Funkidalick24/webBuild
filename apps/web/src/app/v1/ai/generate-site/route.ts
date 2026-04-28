import type { NextRequest } from 'next/server';

import type { PipelineOutput, TokenProfile } from '../../../../lib/types';

function hashString(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const palettes: Array<[string, string, string, string, string]> = [
  ['#FF1178', '#00F5D4', '#FFE600', '#7B61FF', '#FF7A00'], // neon maximal
  ['#00D1FF', '#FF3D00', '#B6FF00', '#FF00E5', '#FFD000'], // acid cyber
  ['#FF4D8D', '#2EF2FF', '#FFFB00', '#8C5BFF', '#FF9F1C'], // pop candy
  ['#00FFA3', '#FF2E63', '#FFF200', '#6A00FF', '#FF6B00'], // club flyer
];

function guessIndustry(prompt: string) {
  const p = prompt.toLowerCase();
  if (p.includes('skate')) return 'Retail (Skate)';
  if (p.includes('coffee') || p.includes('cafe')) return 'Food & Beverage';
  if (p.includes('music') || p.includes('band') || p.includes('dj')) return 'Music / Events';
  if (p.includes('studio') || p.includes('agency')) return 'Creative Services';
  if (p.includes('game') || p.includes('gaming') || p.includes('esports')) return 'Gaming';
  return 'Small Business';
}

function buildTokenProfile(prompt: string): TokenProfile {
  const idx = hashString(prompt) % palettes.length;
  const accents = palettes[idx];
  return {
    accents,
    shadowProfile: 'stacked-hard+glow',
    typographyScale: ['display-xl', 'display-lg', 'display-md', 'body'],
  };
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { prompt?: string } | null;
  const prompt = (body?.prompt ?? '').trim();
  if (!prompt) {
    return new Response('Missing prompt', { status: 400 });
  }

  const output: PipelineOutput = {
    intent: {
      industry: guessIndustry(prompt),
      vibe: prompt,
      goals: ['Launch fast', 'Collect leads', 'Sell products or bookings'],
    },
    sectionPlan: {
      sections: [
        { type: 'HeroMaximal', objective: 'Instant brand signal + primary CTA' },
        { type: 'FeatureGridMaximal', objective: 'Explain the offer in punchy blocks' },
        { type: 'GalleryCollage', objective: 'Show visual identity with loud composition' },
        { type: 'CTABlast', objective: 'Convert with a bold call to action' },
        { type: 'FooterLoud', objective: 'Contact + socials + legal' },
      ],
    },
    tokenProfile: buildTokenProfile(prompt),
    safetyChecks: [
      'WCAG contrast will be checked on publish',
      'Prototype publish includes basic structure validation',
    ],
  };

  return Response.json(output);
}
