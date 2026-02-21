# Sticky Nav Bar Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a sticky top navigation bar with the app logo, name, and tagline that stays visible while scrolling.

**Architecture:** New `Navbar.astro` component added to `Layout.astro` outside `<main>`. Uses a scroll listener to transition from fully transparent to a blurred dark background. The navbar sits at `z-50`, above the Hero's `z-40` content.

**Tech Stack:** Astro, Tailwind CSS v4, vanilla JS for scroll detection.

---

### Task 1: Copy the logo asset

**Files:**
- Copy: `c:\Users\bogda\Desktop\Clean My Photos\app icon\logo.png` to `public/images/logo.png`

**Step 1: Copy the file**

Run: `cp "c:/Users/bogda/Desktop/Clean My Photos/app icon/logo.png" "D:/vibes/Stash or Trash Landing/public/images/logo.png"`

**Step 2: Verify**

Run: `ls -la "D:/vibes/Stash or Trash Landing/public/images/logo.png"`
Expected: File exists, reasonable size (should be a few KB).

---

### Task 2: Create the Navbar component

**Files:**
- Create: `src/components/Navbar.astro`

**Step 1: Create the component**

```astro
---
---

<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
  <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
    <img
      src="/images/logo.png"
      alt="Stash or Trash logo"
      width="36"
      height="36"
      class="w-9 h-9"
    />
    <div class="flex items-baseline gap-2">
      <span class="font-bold text-white text-lg leading-none">Stash or Trash</span>
      <span class="hidden sm:inline text-white/50 text-sm leading-none">&mdash; Swipe to clean</span>
    </div>
  </div>
</nav>

<script>
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        navbar.classList.add('bg-carbon/80', 'backdrop-blur-md');
      } else {
        navbar.classList.remove('bg-carbon/80', 'backdrop-blur-md');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
</script>
```

**Step 2: Verify file created**

Run: `cat "D:/vibes/Stash or Trash Landing/src/components/Navbar.astro"` — confirm contents match.

---

### Task 3: Add Navbar to Layout

**Files:**
- Modify: `src/layouts/Layout.astro:37` (the `<body>` tag area)

**Step 1: Import and add Navbar**

In the frontmatter (line 2), add:
```astro
import Navbar from '../components/Navbar.astro';
```

In the body (after line 37, the `<body>` tag), add:
```astro
    <Navbar />
```

The body should now read:
```html
  <body class="bg-carbon text-white font-sans">
    <Navbar />
    <main>
      <slot name="content" />
    </main>
```

---

### Task 4: Add top padding to Hero section

**Files:**
- Modify: `src/components/Hero.astro:5`

**Step 1: Add padding-top so hero content isn't hidden behind the fixed navbar**

Change the hero `<section>` opening tag from:
```html
<section class="relative min-h-screen overflow-hidden flex flex-col">
```
to:
```html
<section class="relative min-h-screen overflow-hidden flex flex-col pt-16">
```

The `pt-16` (64px) gives enough clearance for the ~52px navbar.

---

### Task 5: Visual verification

**Step 1: Start dev server**

Run: `cd "D:/vibes/Stash or Trash Landing" && npm run dev`

**Step 2: Check in browser at localhost:4321**

Verify:
- [ ] Logo + "Stash or Trash — Swipe to clean" visible at top left
- [ ] Navbar is transparent at the top of the page
- [ ] Scrolling down triggers the blurred dark background
- [ ] Navbar stays fixed above all content including the 3D scene
- [ ] Tagline hides on small screens (below `sm` breakpoint)
- [ ] Hero content is not hidden behind the navbar

---
