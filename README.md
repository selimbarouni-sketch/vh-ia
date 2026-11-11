# VH.IA — AI correction for assessments

A marketing site plus a working correction demo for an AI grading product. VH.IA reads a
student's math work, awards partial credit, explains exactly where the reasoning breaks, and
turns the mistakes into targeted practice.

Built with **Vite + React + TypeScript + Tailwind CSS v4**. All copy, code and illustrations are
original; no third-party site code, text or image assets are used.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # typecheck + production bundle into dist/
npm run preview  # serve the built bundle
```

Requires Node 20+.

## The correction engine

`src/lib/grader.ts` is a transparent, local rubric engine used by the demo section
(`src/components/Grader.tsx`):

- normalises math notation (minus signs, exponents, fractions, TeX leftovers)
- compares the student's final line against the expected answer, with numeric tolerance and
  multi-value answers (`x = 2 or x = 3`)
- detects **sign errors** and incomplete answers rather than marking them simply wrong
- matches the working steps the teacher expects, awarding half credit when the values appear
  but the step is not written out
- returns per-criterion points, comments, review flags, a summary and a confidence score

It runs entirely in the browser: no student work is sent anywhere, and nothing is graded by a
model. In the demo UI, a teacher must still approve the correction before it is released.

### Swapping in a real model

`gradeWork()` takes `{ prompt, expected, steps, student, totalPoints }` and returns a
`GradeResult`. To grade free-form handwriting or open-ended reasoning, keep the same return type
and replace the body with a server-side call to your model of choice (never call a model with an
API key from the browser). The demo's teacher-approval step is part of the product contract —
keep it.

## Structure

```
src/
  App.tsx                 page composition
  index.css               Tailwind v4 theme tokens, keyframes, component classes
  lib/grader.ts           correction + partial-credit engine, sample assessments
  components/
    Nav.tsx               sticky nav with product/solutions/resources dropdowns + mobile panel
    Hero.tsx              headline, CTAs, floating correction card
    Grader.tsx            interactive correction demo (samples or your own assessment)
    mocks.tsx             product UI mocks (correction, insights, practice, assistant)
    Sections.tsx          stats, pillars, tabbed deep dive, testimonials, integrations, privacy, CTA
    Footer.tsx
    ui.tsx                icons, logo, mascot, scroll-reveal, shared heading
```

## Notes

- Integrations and compliance badges (FERPA, COPPA, GDPR, SOC 2) are illustrative placeholders —
  replace them with what the real product supports before publishing.
- Testimonials are fictional sample content.
- The hero's "3.4 hrs saved" figure is sample marketing copy.
- Fonts come from Google Fonts (Inter, Caveat); everything else is CSS and inline SVG.

## Deploy

`npm run build` produces a fully static site in `dist/`, deployable to any static host
(GitHub Pages, Cloudflare Pages, Netlify, Vercel).
