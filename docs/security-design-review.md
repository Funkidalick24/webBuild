# Security + Design Review

## Reviewer Findings
### Security
- Must sanitize rich text and user HTML embeds.
- Plugin system requires permission scopes and signed manifests.
- AI prompt ingestion must strip secrets and script-like payloads.

### UX / Design Risks
- Excessive motion can create cognitive overload; provide reduced-motion mode.
- Contrast drift when user overrides accents; enforce token guardrails.
- Overlap-heavy layouts can break tap targets on mobile.

## Required Gates Before Production
1. OWASP ASVS-aligned API checks.
2. CSP headers for published sites.
3. Visual regression checks against maximalism baseline.
4. A11y gate: no critical axe violations.
