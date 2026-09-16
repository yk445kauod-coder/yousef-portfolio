# Performance & Motion

## Terminal / Retro Layer

The portfolio adds a compact terminal ribbon, status metadata, pixel-style QUEST rail, milestone unlock notices, and pointer-reactive project cards. The milestones are tied to semantic section IDs and remain keyboard accessible.

## Scroll Gamification

Progress unlocks five milestones: boot, context, projects, toolkit, and contact. The progress rail does not block content and can jump directly to each section.

## Performance Rules

The hero uses one compressed local portrait and storage-proxied media for larger project visuals. The Three.js renderer caps device pixel ratio at two and cleans up its animation frame, observer, geometry, and renderer on unmount. The ambient audio is opt-in and preloaded only when requested. Reduced-motion preferences disable non-essential animation.

## Validation

Run `pnpm check`, `pnpm build`, and capture desktop/mobile screenshots before shipping.
