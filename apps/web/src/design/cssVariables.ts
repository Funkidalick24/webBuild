import { maximalTokens } from './tokens';

export const tokenCssVariables = {
  '--mx-color-bg': maximalTokens.colors.bg,
  '--mx-color-surface': maximalTokens.colors.surface,
  '--mx-color-text': maximalTokens.colors.text,
  '--mx-color-accent-0': maximalTokens.colors.accent[0],
  '--mx-color-accent-1': maximalTokens.colors.accent[1],
  '--mx-color-accent-2': maximalTokens.colors.accent[2],
  '--mx-color-accent-3': maximalTokens.colors.accent[3],
  '--mx-color-accent-4': maximalTokens.colors.accent[4],
  '--mx-shadow-button': maximalTokens.shadows.button,
  '--mx-shadow-card': maximalTokens.shadows.card,
  '--mx-shadow-text': maximalTokens.shadows.text,
  '--mx-motion-fast': maximalTokens.motion.fast,
  '--mx-motion-base': maximalTokens.motion.base,
  '--mx-motion-slow': maximalTokens.motion.slow,
  '--mx-motion-easing': maximalTokens.motion.easing,
} as const;

export type TokenCssVariables = typeof tokenCssVariables;
