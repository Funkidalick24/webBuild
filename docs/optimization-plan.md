# Optimization Plan

## Frontend Performance
- Use CSS variables for tokens to minimize class explosion.
- Restrict animations to `transform` and `opacity`.
- Lazy-load heavy pattern/section modules in editor.

## Rendering Strategy
- SSR marketing + dashboard shell; dynamic import editor canvas.
- Cache compiled section trees for preview mode.
- Memoize component tree diff calculations.

## Backend/AI Optimization
- Queue concurrency caps by tenant tier.
- Cache frequent generation archetypes.
- Use idempotency keys for publish jobs.

## Performance SLOs
- Editor interactive TTI < 3s on mid-tier laptops.
- Publish API P95 < 700ms (excluding build wait).
- AI first draft median < 12s.
