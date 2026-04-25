# UX Flows + Maximalism Design System Interpretation

## 1) UX Flows
1. **Create Site**: prompt or template → AI draft → token preset selection.
2. **Edit Canvas**: drag section → configure patterns/colors → preview breakpoints.
3. **Publish**: validate contrast/perf/layout → push staging → promote to production.

## 2) Maximalism Interpretation Layer
### Layout Rules
- Minimum 2 layered patterns per section.
- Asymmetric grid offsets allowed within safe overlap zones.
- Large display text required in hero + at least one secondary section.

### Interaction Patterns
- Drag/drop snaps to **chaos rails** (controlled offsets: -24px to +24px).
- Hover handles show overlap boundaries and z-index hints.
- Rotation handles constrained to discrete values (e.g., -6, -3, 0, +3, +6 deg).

### Responsiveness Rules
- Mobile keeps loud typography using clamped sizes, never collapsing to plain body text.
- Pattern density scales down by opacity rather than removal.
- Overlaps transform into stacked depth with retained shadows and accent borders.

### Safe Color Customization
- User can pick primary accent; remaining 4 accents auto-derived and contrast-checked.
- Border and background cannot share same token family.
- Auto-warning when contrast drops below WCAG AA.

## 3) Design Tokens Structure
- `color.accent.1..5`
- `color.base.bg`, `color.base.surface`, `color.base.text`
- `shadow.layer.hard.1..3`, `shadow.layer.glow.1..2`
- `border.style.{solid,dashed,double}`
- `type.display.{xl,2xl,3xl,4xl,5xl}`
- `motion.duration`, `motion.easing`, `motion.float`

## 4) Component Guidelines
- **Button**: thick border, stacked shadows, transform on hover/focus-visible.
- **Card**: pattern-backed surface + conflicting border color + badge ornament.
- **Input**: high-contrast fill, thick focus ring, animated helper states.

## 5) Editor Behavior Constraints
- Cannot publish if a section has <2 patterns.
- Cannot publish if any interactive component has single-layer shadow.
- Cannot publish if heading scale never exceeds display threshold.
