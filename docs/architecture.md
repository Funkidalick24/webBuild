# System Architecture

## Planner → Architecture Alignment
**Assumed stack (greenfield because repository was empty):**
- Frontend: Next.js (App Router), React, TypeScript, Tailwind + CVA
- Backend: Node.js (NestJS/Fastify), PostgreSQL, Redis, S3-compatible storage
- AI: Orchestration service + prompt templates + policy layer
- Infra: Docker, Kubernetes, Terraform, GitHub Actions, CDN

## High-Level Services
1. **Web App**: editor, dashboard, preview
2. **API Gateway**: auth, routing, rate limiting
3. **Site Service**: pages, sections, component tree storage
4. **Theme Service**: design tokens, maximalism validation
5. **AI Generation Service**: prompt → structured site JSON
6. **Render/Publish Service**: static + dynamic builds, deployment orchestration
7. **Asset Service**: media uploads, transformations
8. **Observability**: logs, metrics, tracing

## Data Model (Core)
- `workspace`
- `site`
- `page`
- `section`
- `component_instance`
- `theme_token_set`
- `publish_version`
- `ai_generation_job`

## API Boundaries
- `POST /v1/sites`
- `GET /v1/sites/:id/pages`
- `PATCH /v1/pages/:id/layout`
- `POST /v1/ai/generate-site`
- `POST /v1/publish/:siteId`
- `GET /v1/themes/:siteId/tokens`

## Event-Driven Flows
- `SITE_GENERATION_REQUESTED`
- `SITE_GENERATION_COMPLETED`
- `PUBLISH_STARTED`
- `PUBLISH_COMPLETED`
- `TOKEN_VALIDATION_FAILED`

## Security Architecture
- JWT + refresh tokens, tenant-scoped RBAC
- Signed upload URLs
- WAF + API rate limits
- Content sanitization at ingestion and render

## Scalability
- Horizontal editor/API pods
- Queue-backed AI jobs
- Redis cache for token + page snapshots
- CDN edge caching for published pages
