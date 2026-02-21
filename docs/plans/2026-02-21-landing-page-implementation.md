# Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the Stash or Trash landing page — a single scrolling page with 8 sections, Spline 3D hero, and scroll fade-in animations.

**Architecture:** Astro static site with Tailwind CSS. Only React dependency is a single island component for the Spline 3D embed. All other sections are pure Astro components. Scroll animations use vanilla JS IntersectionObserver.

**Tech Stack:** Astro, Tailwind CSS, React, @splinetool/react-spline

**Reference docs:**
- Design: `docs/plans/2026-02-21-landing-page-design.md`
- Content/copy: `docs/plans/2026-02-21-landing-page-content-plan.md`

---

### Task 1: Scaffold Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `src/styles/global.css`, `src/layouts/Layout.astro`, `tailwind.config.mjs`

**Step 1: Initialize Astro project**

Run from the project root (`D:/vibes/Stash or Trash Landing`):

```bash
npm create astro@latest . -- --template minimal --no-git --no-install
```

If it asks to overwrite, allow it (the directory has no source code yet, only `docs/`).

**Step 2: Install dependencies**

```bash
npm install && npx astro add tailwind --yes && npx astro add react --yes && npm install @splinetool/react-spline @splinetool/runtime
```

**Step 3: Configure Tailwind with brand colors**

Edit `tailwind.config.mjs` to add custom colors:

```js
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        carbon: '#1E1B18',
        'carbon-light': '#2A2724',
        teal: '#61988E',
        mauve: '#A64253',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**Step 4: Set up global CSS**

Write `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  --color-carbon: #1E1B18;
  --color-carbon-light: #2A2724;
  --color-teal: #61988E;
  --color-mauve: #A64253;
  --font-sans: 'Inter', system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-carbon);
  color: #ffffff;
}

/* Scroll fade-in animation */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Note: Astro 5 with `@astrojs/tailwind` uses Tailwind v4, which uses `@import "tailwindcss"` and `@theme` instead of `@tailwind` directives and `tailwind.config.mjs`. If the installed version uses Tailwind v3, use `@tailwind base; @tailwind components; @tailwind utilities;` instead and keep the `tailwind.config.mjs`. Check which version was installed and adapt accordingly.

**Step 5: Set up Layout.astro**

Write `src/layouts/Layout.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <script type="application/ld+json" set:html={JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Stash or Trash",
      "applicationCategory": "PhotographyApplication",
      "operatingSystem": "Android",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Clean up your phone's photo gallery by swiping. Find duplicates, blurry shots, and screenshots automatically."
    })} />
  </head>
  <body class="bg-carbon text-white font-sans">
    <main>
      <slot />
    </main>
    <script>
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );
      document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    </script>
  </body>
</html>
```

**Step 6: Create minimal index.astro**

Write `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout
  title="Stash or Trash — Swipe Your Photo Gallery Clean | Free Android App"
  description="Clean up your phone's photo gallery by swiping. Stash or Trash finds duplicates, blurry shots, and screenshots automatically. Free, private, no cloud. Available on Android."
>
  <div class="min-h-screen flex items-center justify-center">
    <h1 class="text-4xl font-bold">Stash or Trash</h1>
  </div>
</Layout>
```

**Step 7: Verify it runs**

```bash
npm run dev
```

Open the URL shown (usually `http://localhost:4321`). You should see "Stash or Trash" centered on a dark background with Inter font.

**Step 8: Commit**

```bash
git init && git add -A && git commit -m "chore: scaffold Astro project with Tailwind and React"
```

---

### Task 2: SplineScene React component

**Files:**
- Create: `src/components/SplineScene.tsx`

**Step 1: Write the Spline wrapper component**

Write `src/components/SplineScene.tsx`:

```tsx
import { lazy, Suspense } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export default function SplineScene({ scene, className = '' }: SplineSceneProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <Suspense
        fallback={
          <div className="w-full aspect-video bg-carbon-light rounded-2xl animate-pulse flex items-center justify-center">
            <span className="text-white/40 text-sm">Loading 3D scene...</span>
          </div>
        }
      >
        <Spline scene={scene} />
      </Suspense>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/SplineScene.tsx && git commit -m "feat: add SplineScene React component"
```

---

### Task 3: Hero section

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

**Step 1: Write Hero.astro**

Write `src/components/Hero.astro`. The hero has: centered headline, subheadline, Spline animation area, and Google Play CTA. Ask the user for their Spline scene URL before writing — use a placeholder `SPLINE_URL_HERE` if not provided yet.

```astro
---
import SplineScene from './SplineScene.tsx';
---

<section class="min-h-screen flex flex-col items-center justify-center px-4 py-16 md:py-24">
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
      Swipe Your Photo Gallery Clean
    </h1>
    <p class="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12">
      The fast, fun way to declutter your phone's photo gallery. Swipe left to delete, right to keep — it's that simple.
    </p>
  </div>

  <div class="w-full max-w-4xl mx-auto mb-12">
    <SplineScene client:visible scene="SPLINE_URL_HERE" className="aspect-video" />
  </div>

  <a
    href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-block transition-transform hover:scale-105"
  >
    <img
      src="/images/google-play-badge.png"
      alt="Get Stash or Trash on Google Play — free photo cleanup app"
      width="200"
      height="60"
      class="h-14 w-auto"
    />
  </a>
</section>
```

**Step 2: Add a Google Play badge placeholder**

Download the official Google Play badge or create a placeholder:

```bash
mkdir -p public/images
```

Save a Google Play badge PNG to `public/images/google-play-badge.png`. If you don't have one yet, create a simple placeholder text file and note it needs replacing.

**Step 3: Update index.astro to use Hero**

Replace `src/pages/index.astro` content:

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
---

<Layout
  title="Stash or Trash — Swipe Your Photo Gallery Clean | Free Android App"
  description="Clean up your phone's photo gallery by swiping. Stash or Trash finds duplicates, blurry shots, and screenshots automatically. Free, private, no cloud. Available on Android."
>
  <Hero />
</Layout>
```

**Step 4: Verify**

```bash
npm run dev
```

Check the hero renders: headline, subheadline, Spline loading placeholder, and Play badge area.

**Step 5: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro public/images/ && git commit -m "feat: add Hero section with Spline embed"
```

---

### Task 4: Problem section

**Files:**
- Create: `src/components/Problem.astro`
- Modify: `src/pages/index.astro`

**Step 1: Write Problem.astro**

```astro
<section class="fade-in py-20 md:py-32 px-4">
  <div class="max-w-3xl mx-auto text-center">
    <h2 class="text-3xl md:text-5xl font-bold mb-8">
      Thousands of Photos. No Time to Sort Them.
    </h2>
    <div class="space-y-4 text-white/60 text-lg">
      <p>Photos pile up — duplicates, blurry shots, random screenshots you forgot about.</p>
      <p>Scrolling through your gallery to delete them one by one? Nobody has time for that.</p>
      <p>So you keep putting it off, and the pile keeps growing.</p>
    </div>
    <div class="mt-12 text-6xl md:text-8xl font-extrabold text-teal/30">
      2,000+
    </div>
    <p class="text-white/40 mt-2">photos on the average phone</p>
  </div>
</section>
```

**Step 2: Add to index.astro**

Add the import and component after `<Hero />`:

```astro
import Problem from '../components/Problem.astro';
```
```astro
<Hero />
<Problem />
```

**Step 3: Verify and commit**

```bash
npm run dev
```

Scroll down to check the Problem section fades in. Then:

```bash
git add src/components/Problem.astro src/pages/index.astro && git commit -m "feat: add Problem section"
```

---

### Task 5: How It Works section

**Files:**
- Create: `src/components/HowItWorks.astro`
- Modify: `src/pages/index.astro`

**Step 1: Write HowItWorks.astro**

```astro
<section class="fade-in py-20 md:py-32 px-4">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-3xl md:text-5xl font-bold text-center mb-16">
      How It Works
    </h2>
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Step 1: Trash -->
      <div class="bg-carbon-light rounded-2xl p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-mauve/20 flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-mauve" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div class="text-sm text-white/40 mb-2">Step 1</div>
        <h3 class="text-xl font-bold mb-3">Swipe Left = Trash</h3>
        <p class="text-white/60">See a blurry selfie? Old screenshot? Swipe it away.</p>
      </div>

      <!-- Step 2: Stash -->
      <div class="bg-carbon-light rounded-2xl p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div class="text-sm text-white/40 mb-2">Step 2</div>
        <h3 class="text-xl font-bold mb-3">Swipe Right = Stash</h3>
        <p class="text-white/60">Worth keeping? Swipe right and move on.</p>
      </div>

      <!-- Step 3: Review -->
      <div class="bg-carbon-light rounded-2xl p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 14l-4-4m0 0l4-4m-4 4h11.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="text-sm text-white/40 mb-2">Step 3</div>
        <h3 class="text-xl font-bold mb-3">Review & Delete</h3>
        <p class="text-white/60">Check your delete queue before anything's permanent. Undo anytime.</p>
      </div>
    </div>
    <p class="text-center text-white/40 mt-10">
      Review hundreds of photos in minutes. Nothing is deleted until you confirm.
    </p>
  </div>
</section>
```

**Step 2: Add to index.astro**

Import and add `<HowItWorks />` after `<Problem />`.

**Step 3: Verify and commit**

```bash
git add src/components/HowItWorks.astro src/pages/index.astro && git commit -m "feat: add How It Works section"
```

---

### Task 6: Smart Scanner section

**Files:**
- Create: `src/components/SmartScanner.astro`
- Modify: `src/pages/index.astro`

**Step 1: Write SmartScanner.astro**

```astro
<section class="fade-in py-20 md:py-32 px-4">
  <div class="max-w-5xl mx-auto">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="text-3xl md:text-5xl font-bold mb-8">
          Let the App Find the Junk for You
        </h2>
        <p class="text-white/60 text-lg mb-8">
          The Smart Scanner automatically detects the photos you'll never use:
        </p>
        <ul class="space-y-5">
          <li class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-lg">Duplicate Photos</h3>
              <p class="text-white/50">Groups near-identical shots so you keep the best one.</p>
            </div>
          </li>
          <li class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-mauve/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-5 h-5 text-mauve" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-lg">Blurry Photos</h3>
              <p class="text-white/50">Catches out-of-focus and motion-blurred shots.</p>
            </div>
          </li>
          <li class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-lg">Too-Dark Photos</h3>
              <p class="text-white/50">Flags underexposed shots you'll never use.</p>
            </div>
          </li>
          <li class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-lg">Screenshots</h3>
              <p class="text-white/50">Identifies screenshot clutter taking up space.</p>
            </div>
          </li>
        </ul>
        <p class="text-white/40 mt-8">See exactly how much space you'll recover.</p>
      </div>
      <div class="bg-carbon-light rounded-2xl aspect-[9/16] max-w-xs mx-auto w-full flex items-center justify-center">
        <span class="text-white/20 text-sm">App screenshot placeholder</span>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Add to index.astro**

Import and add `<SmartScanner />` after `<HowItWorks />`.

**Step 3: Verify and commit**

```bash
git add src/components/SmartScanner.astro src/pages/index.astro && git commit -m "feat: add Smart Scanner section"
```

---

### Task 7: Features section

**Files:**
- Create: `src/components/Features.astro`
- Modify: `src/pages/index.astro`

**Step 1: Write Features.astro**

```astro
<section class="fade-in py-20 md:py-32 px-4">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-3xl md:text-5xl font-bold text-center mb-16">
      Everything You Need
    </h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-carbon-light rounded-2xl p-6">
        <div class="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="font-bold text-lg mb-2">Browse by Date or Album</h3>
        <p class="text-white/50">Jump to any month or album. See your progress on each.</p>
      </div>

      <div class="bg-carbon-light rounded-2xl p-6">
        <div class="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </div>
        <h3 class="font-bold text-lg mb-2">Undo Anytime</h3>
        <p class="text-white/50">Changed your mind? One tap brings back the last photo. Nothing's permanent until you say so.</p>
      </div>

      <div class="bg-carbon-light rounded-2xl p-6">
        <div class="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 class="font-bold text-lg mb-2">Track Your Progress</h3>
        <p class="text-white/50">Stats show how many photos you've reviewed, kept, and deleted — plus space recovered.</p>
      </div>

      <div class="bg-carbon-light rounded-2xl p-6">
        <div class="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <h3 class="font-bold text-lg mb-2">Organize While Swiping</h3>
        <p class="text-white/50">Move photos into albums without leaving the swipe flow.</p>
      </div>

      <div class="bg-carbon-light rounded-2xl p-6">
        <div class="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="font-bold text-lg mb-2">Videos Too</h3>
        <p class="text-white/50">Not just photos — swipe through videos the same way.</p>
      </div>

      <div class="bg-carbon-light rounded-2xl p-6">
        <div class="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h3 class="font-bold text-lg mb-2">Random Shuffle</h3>
        <p class="text-white/50">Can't decide where to start? Shuffle your entire gallery and swipe at random.</p>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Add to index.astro**

Import and add `<Features />` after `<SmartScanner />`.

**Step 3: Verify and commit**

```bash
git add src/components/Features.astro src/pages/index.astro && git commit -m "feat: add Features section"
```

---

### Task 8: Privacy, Download CTA, and Footer sections

**Files:**
- Create: `src/components/Privacy.astro`, `src/components/DownloadCTA.astro`, `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Step 1: Write Privacy.astro**

```astro
<section class="fade-in py-20 md:py-32 px-4">
  <div class="max-w-3xl mx-auto text-center">
    <h2 class="text-3xl md:text-5xl font-bold mb-10">
      Your Photos Stay on Your Phone
    </h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="flex flex-col items-center">
        <div class="w-14 h-14 rounded-full bg-teal/20 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <p class="text-white/60">No data collection. No analytics. No tracking.</p>
      </div>
      <div class="flex flex-col items-center">
        <div class="w-14 h-14 rounded-full bg-teal/20 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <p class="text-white/60">No cloud uploads. No accounts. No servers.</p>
      </div>
      <div class="flex flex-col items-center">
        <div class="w-14 h-14 rounded-full bg-teal/20 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <p class="text-white/60">Everything happens entirely on your device.</p>
      </div>
    </div>
    <a href="/privacy" class="inline-block mt-10 text-teal hover:underline">
      Read our full Privacy Policy &rarr;
    </a>
  </div>
</section>
```

**Step 2: Write DownloadCTA.astro**

```astro
<section class="fade-in py-20 md:py-32 px-4 bg-gradient-to-b from-carbon to-teal/10">
  <div class="max-w-3xl mx-auto text-center">
    <h2 class="text-3xl md:text-5xl font-bold mb-6">
      Ready to Clean Up?
    </h2>
    <p class="text-white/60 text-lg mb-10">Free on Google Play</p>
    <a
      href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block transition-transform hover:scale-105"
    >
      <img
        src="/images/google-play-badge.png"
        alt="Get Stash or Trash on Google Play — free photo cleanup app"
        width="250"
        height="74"
        class="h-16 w-auto"
      />
    </a>
  </div>
</section>
```

**Step 3: Write Footer.astro**

```astro
<footer class="py-10 px-4 border-t border-white/10">
  <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/40">
    <div class="flex items-center gap-4">
      <a
        href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/images/google-play-badge.png"
          alt="Get it on Google Play"
          width="120"
          height="36"
          class="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
        />
      </a>
    </div>
    <div class="flex items-center gap-6">
      <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
      <a href="mailto:support@stashortrash.app" class="hover:text-white transition-colors">Contact</a>
    </div>
    <p>&copy; 2026 Stash or Trash</p>
  </div>
</footer>
```

**Step 4: Update index.astro with all remaining sections**

Final `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Problem from '../components/Problem.astro';
import HowItWorks from '../components/HowItWorks.astro';
import SmartScanner from '../components/SmartScanner.astro';
import Features from '../components/Features.astro';
import Privacy from '../components/Privacy.astro';
import DownloadCTA from '../components/DownloadCTA.astro';
import Footer from '../components/Footer.astro';
---

<Layout
  title="Stash or Trash — Swipe Your Photo Gallery Clean | Free Android App"
  description="Clean up your phone's photo gallery by swiping. Stash or Trash finds duplicates, blurry shots, and screenshots automatically. Free, private, no cloud. Available on Android."
>
  <Hero />
  <Problem />
  <HowItWorks />
  <SmartScanner />
  <Features />
  <Privacy />
  <DownloadCTA />
  <Footer />
</Layout>
```

**Step 5: Verify full page**

```bash
npm run dev
```

Scroll through all 8 sections. Check: fade-in animations trigger, layout is responsive, dark theme looks right, all text matches the content plan.

**Step 6: Commit**

```bash
git add src/components/Privacy.astro src/components/DownloadCTA.astro src/components/Footer.astro src/pages/index.astro && git commit -m "feat: add Privacy, Download CTA, and Footer sections"
```

---

### Task 9: Final polish and build verification

**Files:**
- Possibly modify: any component for visual adjustments

**Step 1: Run production build**

```bash
npm run build
```

Expected: Clean build with no errors. Output in `dist/`.

**Step 2: Preview production build**

```bash
npm run preview
```

Check the production build in browser. Verify:
- All sections render
- Spline embed loads (or shows fallback if URL is placeholder)
- Fade-in animations work
- Page is responsive at mobile/tablet/desktop widths
- JSON-LD schema is in the HTML source

**Step 3: Commit any final adjustments**

```bash
git add -A && git commit -m "chore: final polish and build verification"
```

Only commit if there were changes. If everything was clean, skip this step.
