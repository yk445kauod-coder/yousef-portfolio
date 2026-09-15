# Implementation Notes

## Stack

- React 19 + TypeScript
- Vite + Tailwind CSS
- Three.js for the interactive hero scene
- Lucide icons for small interface affordances
- WebDev storage proxy for uploaded media

## Content Model

Project information is derived from the supplied CV and links are kept live to the deployed project or model pages. The portfolio is a single-page experience with semantic section anchors.

## Media Strategy

Large media is uploaded to WebDev storage and referenced through `/manus-storage/...` paths. Originals remain outside the source tree in `/home/ubuntu/webdev-static-assets/`.

## Verification

Run `pnpm check` and `pnpm build` before delivery. Verify the desktop and mobile layouts with WebDev screenshots and check every external project link.
