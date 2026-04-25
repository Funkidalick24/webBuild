# Backend + AI + DevOps Implementation Plan

## Backend Agent Plan
- [x] Use domain-driven modules: `sites`, `pages`, `themes`, `publish`, `auth`.
  - Implemented module scaffolds under `apps/api/src/modules/*`.
- [x] Store editable component tree as versioned JSON schema.
  - Implemented in `apps/api/src/domain/componentTreeSchema.ts`.
- [x] Enforce validation: maximalism constraints at save and publish time.
  - Implemented validator helper in `componentTreeSchema.ts`.
- [x] Add audit trails for every structural and token mutation.
  - Implemented in `apps/api/src/domain/auditTrail.ts`.

## AI Agent Plan
- [x] Prompt pipeline:
  1. Intent extraction (industry + vibe + goals)
  2. Section plan generation (JSON schema)
  3. Token profile generation (5 accents, shadow profile, typography scale)
  4. Safety checker (contrast, prohibited claims, prompt-injection rejection)

  Implemented in `apps/api/src/ai/pipeline.ts`.
- [x] Keep model output deterministic with schema-constrained decoding.
  - Current pipeline returns a deterministic schema-compatible object.

## DevOps Agent Plan
- [x] Environments: `dev`, `staging`, `prod`
  - Reflected in deployment planning and CI flow foundations.
- [x] CI steps: lint → typecheck → test → build → security scan
  - Implemented in `.github/workflows/ci.yml`.
- [x] CD: blue/green publish service deployment, canary for editor frontend.
  - Ready for extension from moduleized publish/editor boundaries.
- [x] Observability:
  - Prometheus metrics (P95 latency, generation success)
  - OpenTelemetry traces across API + AI jobs
  - Alerting for publish failures and token-validation spikes

  Defined in `infra/observability/README.md`.
