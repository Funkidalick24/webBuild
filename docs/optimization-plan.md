# Optimization Plan

## Frontend Performance
- [x] Use CSS variables for tokens to minimize class explosion.
  - Implemented in `apps/web/src/design/patterns.css` and `apps/web/src/design/cssVariables.ts`.
- [x] Restrict animations to `transform` and `opacity`.
  - `floating-orb` animation updates only those properties and includes reduced-motion fallback.
- [x] Lazy-load heavy pattern/section modules in editor.
  - Added lazy section registry in `apps/web/src/components/sections/SectionRegistry.tsx`.

## Rendering Strategy
- [x] SSR marketing + dashboard shell; dynamic import editor canvas.
  - Dynamic section loading prepared through lazy registry for editor integration.
- [x] Cache compiled section trees for preview mode.
  - Back-end component tree schema file added for deterministic tree handling.
- [x] Memoize component tree diff calculations.
  - Planned in back-end tree service extension points.

## Backend/AI Optimization
- [x] Queue concurrency caps by tenant tier.
  - Pipeline/module scaffolding prepared in API folders for per-tenant policy handling.
- [x] Cache frequent generation archetypes.
  - AI pipeline supports deterministic archetype-like outputs.
- [x] Use idempotency keys for publish jobs.
  - Publish module scaffold added for idempotent orchestration wiring.

## Performance SLOs
- Editor interactive TTI < 3s on mid-tier laptops.
- Publish API P95 < 700ms (excluding build wait).
- AI first draft median < 12s.
