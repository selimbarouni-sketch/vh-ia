# Sumly — AI grading for mathematics teachers

A marketing site for a K-12 math grading product: AI grading, standards-level insight,
targeted practice and a class-aware assistant. Built with **Vite + React + TypeScript + Tailwind CSS v4**.

The page structure follows the landing-page pattern of modern ed-tech products (hero → proof →
benefits → product deep dive → testimonials → integrations → privacy → CTA). All copy, code and
illustrations in this repository are original; no third-party site code, text or image assets are used.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # typecheck + production bundle into dist/
npm run preview  # serve the built bundle
```

Requires Node 20+.

## Structure

```
src/
  App.tsx                 page composition
  index.css               Tailwind v4 theme tokens, keyframes, component classes
  components/
    Nav.tsx               sticky nav with product/solutions/resources dropdowns + mobile panel
    Hero.tsx              headline, CTAs, floating grading card
    mocks.tsx             product UI mocks (grading, insights, practice, assistant)
    Sections.tsx          stats, pillars, tabbed deep dive, testimonials, integrations, privacy, CTA
    Footer.tsx
    ui.tsx                icons, logo, mascot, scroll-reveal, shared heading
```

## Notes

- Integrations and compliance badges (FERPA, COPPA, GDPR, SOC 2) are illustrative placeholders for the
  demo — replace them with what the real product actually supports before publishing.
- Testimonials are fictional sample content.
- Fonts are loaded from Google Fonts (Inter, Caveat); everything else is CSS and inline SVG.

## Deploy

`npm run build` produces a fully static site in `dist/`, deployable to any static host
(GitHub Pages, Cloudflare Pages, Netlify, Vercel).
