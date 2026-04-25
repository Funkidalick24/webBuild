# Observability Blueprint

## Metrics (Prometheus)
- `publish_latency_ms` (target P95 < 700ms excluding build wait)
- `ai_generation_duration_ms` (median target < 12s)
- `ai_generation_success_rate`
- `token_validation_failures_total`

## Traces (OpenTelemetry)
- API gateway request span
- AI orchestration span
- Publish orchestration span
- Persist spans for site/page/theme writes

## Alerts
- Publish failure ratio > 2% in 15 min
- Token validation spikes (> 50/min)
- AI generation success rate < 97%
