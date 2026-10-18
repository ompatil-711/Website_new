# Paradise Enterprise

React + Vite website for Paradise Enterprise, Nagpur.

## Run locally

```sh
npm run dev
npm run build
npm run preview
```

Open the local URL printed by Vite. The production site is generated in `dist/`.

## Design and source

- `src/styles/professional.css`: base layout and shared component styles.
- `src/styles/expressive.css`: active vivid blue, orange and aqua accents, compact spacing and responsive product layouts.
- `src/components/PageEntrance.jsx`: brief animated brand entrance on page load.
- `src/components/ProductVisual.jsx`: local SVG product illustrations.
- `src/components/ModernHero.jsx`: animated product mosaic with scroll-linked movement.
- `src/components/Products.jsx`: product catalogue and enquiry actions.
- `src/components/MotionCard.jsx`: Framer Motion scroll entrances, staggered reveals and hover interactions.
- `src/App.jsx`: page composition and enquiry category state.
- `01.html`: reference-only; do not modify.
- Older stylesheets remain as historical references and are not imported by the live site.

Create replacement files before switching imports to them. Verify production builds and the running preview after design changes. See `AGENTS.md` for project instructions.

## Enquiries and external services

The form validates required fields and prepares an email in the visitor's configured email app. The visitor must send that email; this project has no server or email delivery service. Product enquiry buttons preselect the matching category. Google Fonts and the embedded Google Map require internet access. Phone, email, Instagram and location links use the details in the reference. Business claims and testimonial text are retained from that reference.

