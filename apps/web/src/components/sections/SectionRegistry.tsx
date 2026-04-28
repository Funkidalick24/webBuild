import { lazy } from 'react';

export const sectionRegistry = {
  HeroMaximal: lazy(() => import('./HeroMaximal').then((module) => ({ default: module.HeroMaximal }))),
  FeatureGridMaximal: lazy(() =>
    import('./FeatureGridMaximal').then((module) => ({ default: module.FeatureGridMaximal }))
  ),
  GalleryCollage: lazy(() => import('./GalleryCollage').then((module) => ({ default: module.GalleryCollage }))),
  CTABlast: lazy(() => import('./CTABlast').then((module) => ({ default: module.CTABlast }))),
  FooterLoud: lazy(() => import('./FooterLoud').then((module) => ({ default: module.FooterLoud }))),
} as const;

export type SectionKey = keyof typeof sectionRegistry;

export const sectionKeys: SectionKey[] = [
  'HeroMaximal',
  'FeatureGridMaximal',
  'GalleryCollage',
  'CTABlast',
  'FooterLoud',
];
