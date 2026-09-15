# Audio & Visual Effects

## Visual Effects

- Pointer-reactive spotlight on project cards.
- Charcoal scanline/grain overlay used as a low-opacity texture.
- Bright-blue system pulses for active and live states.
- Orange hover and status transitions.
- Pixel-art labels and mono-like metadata for a terminal / creative-coding feel.
- Real product screenshots framed as evidence rather than decorative mockups.

## Audio

The site includes an optional ambient loop. Browsers block autoplay with sound, so playback is user-controlled. The interface exposes a compact audio toggle and respects reduced-motion preferences.

## Performance

Visual effects animate opacity and transforms where possible. Heavy image assets are served through WebDev storage proxy paths, and the interactive scene is kept separate from the readable content hierarchy.
