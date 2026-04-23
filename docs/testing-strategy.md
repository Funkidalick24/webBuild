# Testing Strategy (Functional + Maximalism QA)

## Test Pyramid
- Unit: token rotation logic, validation rules, component variants.
- Integration: editor save/load, publish pipeline, AI generation workflow.
- E2E: create site → edit section → publish → verify live output.

## Maximalism-specific Assertions
- Each section has >= 2 patterns.
- Interactive components have multi-layer shadows.
- Headings hit display scale thresholds.
- Accent rotation index advances by section.

## Accessibility + Responsive Tests
- Automated contrast checks for all accent permutations.
- Keyboard navigation + focus ring visibility.
- Mobile overflow checks for display typography and rotated elements.

## Tooling
- Unit/integration: Vitest/Jest
- E2E + visual diff: Playwright
- Accessibility: axe-core, pa11y
- Performance budgets in CI: Lighthouse CI + bundle analyzer
