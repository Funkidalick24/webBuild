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

export type ComponentNode = {
  id: string;
  type: string;
  props?: Record<string, unknown>;
  children?: ComponentNode[];
  metadata?: {
    sectionIndex?: number;
    chaosOffsetX?: number;
    chaosOffsetY?: number;
    rotation?: number;
  };
};

export type VersionedComponentTree = {
  schemaVersion: string;
  pageId: string;
  nodes: ComponentNode[];
};
