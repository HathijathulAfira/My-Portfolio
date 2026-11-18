# Cinematic Portfolio — Hathijathul Afira B

A full one-page portfolio site built with Next.js (App Router), Three.js,
and GSAP. Fullscreen cinematic video hero, then About, Skills, Experience,
Projects, Education, Awards, and Contact — all populated from the resume
you provided.

## Stack

- Next.js 14 (App Router)
- React 18
- Three.js — cinematic bokeh particle field in the hero (additive blending,
  mouse parallax, sine-wave drift)
- GSAP + ScrollTrigger — hero entrance timeline, and scroll-triggered
  fade/stagger reveals on every section below it
- CSS Modules throughout — no utility framework

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
app/
  layout.js            — fonts (Bebas Neue display + Manrope body), metadata
  page.js               — assembles every section, in order
  globals.css           — CSS variables / design tokens, reset

lib/
  profileData.js        — single source of truth for all resume content
  gsap.js                — registers GSAP's ScrollTrigger plugin once
  useScrollReveal.js     — shared scroll-reveal hook used by every section

components/
  Nav/                   — fixed glass nav, fades in after the hero, anchor links
  VideoIntro/            — the cinematic video hero
    VideoIntro.jsx
    CinematicLayer.jsx   — Three.js particle layer
  shared/Section.module.css — shared eyebrow/heading/container styling
  About/
  Skills/
  Experience/
  Projects/
  Education/
  Awards/
  Contact/
  Footer/

public/videos/
  hero-video.mp4         — your uploaded talking-head clip
```

## Content

Everything below the hero is driven by `lib/profileData.js` — edit that
one file to update copy, add a role, or add a project; no need to touch
the section components themselves.

A couple of honest notes on how the resume mapped to the site:

- **Projects** — the resume doesn't have a dedicated "Projects" section,
  so the three cards there are the concrete deliverables described under
  each internship (the ONGC conference webpage, the ONGC business
  analytics webpage, and the IQUANTIUM reporting/dashboards work).
- **Awards & Recognition** — the resume lists awards/accomplishments, not
  formal certifications, so that's what the section is titled. Nothing
  was invented; if you do have certifications, add an `certifications`
  array to `profileData.js` and a small section for it.

## Customizing

- **Colors / fonts** — CSS variables in `app/globals.css`.
- **Particle count / warmth / the blue "monitor glow"** — top of
  `components/VideoIntro/CinematicLayer.jsx` (particles) and the
  `.monitorGlow` rule in `VideoIntro.module.css` (the cool accent).
- **Section order or copy** — `app/page.js` for order, `lib/profileData.js`
  for content.
- **Reveal timing** — `lib/useScrollReveal.js` (`y` offset, `start`
  trigger point, stagger amount) is shared by every section, so a change
  there affects the whole site consistently.

## Notes on the video

The uploaded clip is 848×478, ~10s, h264/aac. `object-fit: cover` handles
the aspect-ratio mismatch against a fullscreen viewport. Swapping in a
higher-resolution clip (same filename, `public/videos/hero-video.mp4`)
needs no code changes.

Autoplay is muted by default (required by all major browsers); the
speaker button unmutes on user interaction — that's what the "Tap for
sound" badge is nudging toward.

## Performance notes

- The particle canvas is capped at `devicePixelRatio` 1.5 and pauses its
  render loop on `visibilitychange` (backgrounded tabs), with full
  geometry/material/renderer disposal on unmount.
- Every scroll reveal below the hero uses one shared GSAP context per
  section (cleaned up on unmount) rather than a library-wide observer,
  keeping re-renders and ScrollTrigger instances predictable.
- `prefers-reduced-motion` disables particle drift/parallax and the
  pulsing scroll/sound indicators in the hero.
