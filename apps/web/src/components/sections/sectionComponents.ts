import { CTABlast } from './CTABlast';
import { FeatureGridMaximal } from './FeatureGridMaximal';
import { FooterLoud } from './FooterLoud';
import { GalleryCollage } from './GalleryCollage';
import { HeroMaximal } from './HeroMaximal';

export const sectionComponents = {
  HeroMaximal,
  FeatureGridMaximal,
  GalleryCollage,
  CTABlast,
  FooterLoud,
} as const;

export type SectionComponentKey = keyof typeof sectionComponents;

