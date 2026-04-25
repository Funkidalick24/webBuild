# Website Builder Platform PRD (Hybrid WordPress × Wix)

## 1. Product Vision
Build a production-grade, AI-accelerated website builder that combines:
- **WordPress-like extensibility** (plugins, templates, content model)
- **Wix-like visual editing** (drag-drop canvas, zero-code controls)
- **Maximalism-first design language** baked into editor defaults

## 2. Problem
Most builders optimize for minimal templates. Creative brands (music, fashion, gaming, youth commerce) need loud visual identity without custom code.

## 3. Goals
- Launch an MVP for SMB creators to publish performant websites in < 30 minutes.
- Deliver a maximalism design system that is reusable, accessible, and responsive.
- Provide AI-assisted site generation + editing.

## 4. Non-Goals (MVP)
- Full marketplace billing ecosystem
- On-prem enterprise deployment
- Real-time collaborative editing (v2)

## 5. Personas
1. **Creator Solo**: needs fast launch with expressive visual style.
2. **Agency Designer**: needs reusable patterns and component variants.
3. **Growth Marketer**: needs landing pages, SEO metadata, and A/B-ready content blocks.

## 6. Core MVP Features
- Visual editor canvas with section-level controls.
- Component library (Button/Card/Input/Hero/Gallery/CTA).
- AI site generation from prompt + business category.
- Page management + content model.
- Publish pipeline (preview, staging, production).
- Theme tokens and section-level accent rotation.

## 7. Success Metrics
- Time-to-first-publish < 30 min median.
- Lighthouse Perf >= 85 for default templates.
- Accessibility score >= 90 baseline.
- 70%+ generated sites retain maximalist token profile.

## 8. Risks
- Visual intensity hurting accessibility.
- Heavy layered CSS affecting performance.
- Unstructured customization causing design drift.

## 9. Mitigations
- Contrast guardrails + token constraints.
- GPU-safe animation utilities only.
- UX rules for bounded chaos in editor.
