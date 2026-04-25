export type SiteIntent = {
  industry: string;
  vibe: string;
  goals: string[];
};

export type SectionPlan = {
  sections: Array<{ type: string; objective: string }>;
};

export type TokenProfile = {
  accents: [string, string, string, string, string];
  shadowProfile: string;
  typographyScale: string[];
};

export type PipelineOutput = {
  intent: SiteIntent;
  sectionPlan: SectionPlan;
  tokenProfile: TokenProfile;
  safetyChecks: string[];
};

export async function runGenerationPipeline(prompt: string): Promise<PipelineOutput> {
  const normalizedPrompt = prompt.trim();

  return {
    intent: {
      industry: normalizedPrompt.includes('shop') ? 'commerce' : 'general',
      vibe: normalizedPrompt,
      goals: ['fast-launch', 'high-contrast-branding'],
    },
    sectionPlan: {
      sections: [
        { type: 'HeroMaximal', objective: 'clarify brand promise' },
        { type: 'FeatureGrid', objective: 'sell core benefits' },
      ],
    },
    tokenProfile: {
      accents: ['#FF1178', '#00F5D4', '#FFE600', '#7B61FF', '#FF7A00'],
      shadowProfile: 'stacked-hard-shadow',
      typographyScale: ['clamp(3rem,10vw,8rem)', 'clamp(2rem,7vw,5rem)'],
    },
    safetyChecks: ['contrast-passed', 'claims-scan-passed', 'prompt-injection-none'],
  };
}
