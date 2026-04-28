export const COMPONENT_TREE_SCHEMA_VERSION = '1.0.0';

export type ComponentNode = {
  id: string;
  type: string;
  props?: Record<string, unknown>;
  children?: ComponentNode[];
  metadata?: {
    sectionIndex?: number;
    patterns?: string[];
  };
};

export type VersionedComponentTree = {
  schemaVersion: string;
  pageId: string;
  nodes: ComponentNode[];
};

export function validateMaximalismConstraints(tree: VersionedComponentTree): string[] {
  const errors: string[] = [];

  if (tree.schemaVersion !== COMPONENT_TREE_SCHEMA_VERSION) {
    errors.push(`Unsupported schema version: ${tree.schemaVersion}`);
  }

  for (const node of tree.nodes) {
    const patternCount = node.metadata?.patterns?.length ?? 0;
    const isSectionNode = node.metadata?.sectionIndex !== undefined;
    if (isSectionNode && patternCount < 2) {
      errors.push(`Section ${node.id} must include at least 2 patterns.`);
    }
  }

  return errors;
}
