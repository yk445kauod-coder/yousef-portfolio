# Yousef Madbouly Portfolio — Design System

## Direction

The portfolio uses a charcoal-black editorial interface with a pixel-art / developer-console character. The visual language balances high-contrast typography, real product imagery, bright blue system accents, and warm orange interaction states.

## Palette

| Token         | Value     | Use                                         |
| ------------- | --------- | ------------------------------------------- |
| Charcoal      | `#111315` | Primary background and chrome               |
| Charcoal Soft | `#1A1D20` | Cards, panels, and elevated surfaces        |
| Text White    | `#F5F3EE` | Main readable text                          |
| Bright Blue   | `#36A3FF` | Primary accent, links, active states, focus |
| Orange        | `#FF754D` | Secondary accent, status, hover, emphasis   |
| Muted Gray    | `#9198A1` | Supporting copy and metadata                |

## Typography

- **IBM Plex Sans Arabic** for readable Arabic and English body content.
- **Handjet** for Arabic/English pixel-art display moments where the glyph shape supports the visual language.
- **Pixelify Sans** for English pixel-art labels, numbers, navigation details, and terminal-like metadata.

## Interaction Principles

The interface should feel tactile but remain readable: short transitions, pointer-reactive lighting, focus-visible controls, subtle scanlines, and optional ambient audio. Audio is opt-in and must never autoplay with sound.

## Accessibility

All controls need keyboard focus, external links use safe `rel` attributes, and non-essential animation is disabled under `prefers-reduced-motion`.
