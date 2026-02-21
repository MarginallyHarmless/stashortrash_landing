# Stash or Trash — Landing Page Design

**Date**: 2026-02-21
**Status**: Approved

---

## Decisions

- **Framework**: Astro with Tailwind CSS
- **Spline 3D**: React island using `@splinetool/react-spline`, loaded via `client:visible`
- **Styling**: Tailwind CSS with custom brand colors
- **Animations**: Subtle fade-ins on scroll via vanilla JS `IntersectionObserver`
- **Approach**: Single-page Astro, React only for the Spline embed, minimal client JS

---

## Tech Stack

- Astro (static site generator)
- Tailwind CSS (utility-first styling)
- React (only for Spline embed component)
- `@splinetool/react-spline` (Spline 3D embedding)

---

## Project Structure

```
src/
  layouts/
    Layout.astro          — base HTML shell, meta tags, JSON-LD schema, fonts
  components/
    Hero.astro            — headline, subheadline, contained Spline area, CTA
    SplineScene.tsx       — React component wrapping @splinetool/react-spline
    Problem.astro         — pain point section
    HowItWorks.astro      — 3-step cards
    SmartScanner.astro    — scanner features with placeholder images
    Features.astro        — 6-feature grid
    Privacy.astro         — trust/privacy section
    DownloadCTA.astro     — closing CTA
    Footer.astro          — links, copyright
  pages/
    index.astro           — assembles all sections
  styles/
    global.css            — Tailwind imports + custom properties
public/
  images/                 — placeholder images, Google Play badge
```

---

## Visual Direction

- **Background**: Carbon Black `#1E1B18`
- **Positive accent**: Seagrass Teal `#61988E` (CTAs, keep actions)
- **Negative accent**: Dusty Mauve `#A64253` (delete/trash actions)
- **Text**: White headings, muted gray body text
- **Typography**: Clean sans-serif, large headings, short copy
- **Dark theme only** — no light mode

Tailwind config adds custom colors: `carbon`, `teal`, `mauve`.

---

## Section Designs

### 1. Hero

- Large bold white headline centered: "Swipe Your Photo Gallery Clean"
- Muted gray subheadline below
- Spline 3D animation in a contained area below the text (lazy-loaded React island)
- Loading skeleton while Spline loads
- Google Play badge CTA centered below
- Full viewport height on desktop, natural height on mobile

### 2. The Problem

- Centered headline addressing gallery bloat
- 2-3 short paragraphs about the pain point
- Optional stat callout (large highlighted number)
- Dark background

### 3. How It Works

- 3 cards in a row (stacks on mobile)
- Each card: icon (mauve X, teal checkmark, neutral undo), step number, heading, one-liner
- Subtle card styling with slightly lighter background

### 4. Smart Scanner

- Split layout: text left, placeholder image right (stacks on mobile)
- Headline + 4 bullet points with icons (duplicates, blurry, dark, screenshots)
- Mention of storage savings visibility

### 5. Features

- 2x3 grid (2 columns desktop, 1 column mobile)
- 6 feature cards: icon + title + 1-2 sentence description
- Features: Browse by Date/Album, Undo, Progress Tracking, Organize While Swiping, Videos, Random Shuffle

### 6. Privacy & Trust

- Centered layout
- Headline: "Your Photos Stay on Your Phone"
- Three statements with icons (lock/shield/device)
- Privacy policy link

### 7. Download CTA

- Full-width teal-accented background
- Large headline + prominent Google Play badge + "Free on Android"

### 8. Footer

- Small Play badge, privacy policy link, contact email, copyright
- Simple dark styling

---

## Scroll Animations

- Vanilla JS `IntersectionObserver` in `Layout.astro`
- Adds `.visible` class when sections enter viewport
- CSS `opacity` and `transform` transitions for fade-in effect
- No animation library needed

---

## SEO

- Proper meta tags (title, description) from the content plan
- SoftwareApplication JSON-LD schema
- Semantic HTML (`<section>`, `<header>`, `<footer>`, `<main>`)
- Descriptive alt text on all images
- WebP images with lazy loading

---

## Assets

- App screenshots: placeholders for now, to be replaced later
- Google Play badge: standard asset in `public/images/`
- Spline scene: provided via URL prop to `SplineScene.tsx`
