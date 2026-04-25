import { lazy } from 'react';

export const sectionRegistry = {
  HeroMaximal: lazy(() => import('./HeroMaximal').then((module) => ({ default: module.HeroMaximal }))),
} as const;

export type SectionKey = keyof typeof sectionRegistry;
