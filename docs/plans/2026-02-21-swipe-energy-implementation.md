# Swipe Energy Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the landing page from generic dark-theme template into a playful, tactile experience tied to the app's swipe mechanic.

**Architecture:** CSS-first approach — most changes are styling updates to existing components. Three small vanilla JS utilities are added inline via `<script>` tags in Astro components. No new dependencies, no build config changes.

**Tech Stack:** Astro 5, Tailwind CSS v4 (via `@theme` in global.css), vanilla JS (pointer events, IntersectionObserver)

---

### Task 1: Global CSS — Update animations, glow orbs, and card system

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Update scroll animation easing to bouncy overshoot**

In `global.css`, change the easing on all four animation classes from `ease-out` to `cubic-bezier(0.34, 1.56, 0.64, 1)`:

```css
/* Scroll fade-in animation */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Stagger animation — children animate in with delays */
.stagger-in > * {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Slide-in-left */
.slide-in-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Scale-in */
.scale-in {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**Step 2: Increase glow orb size and opacity**

Change both `.glow-teal` and `.glow-mauve`:
- `width: 400px` → `width: 600px`
- `height: 400px` → `height: 600px`
- `opacity: 0.15` → `opacity: 0.2`

**Step 3: Update card borders to gradient borders**

Replace the `.card` border with a gradient border technique using `border-image`:

```css
.card {
  background: linear-gradient(145deg, rgba(42, 39, 36, 0.8), rgba(30, 27, 24, 0.9));
  border: 1px solid transparent;
  border-image: linear-gradient(145deg, rgba(97, 152, 142, 0.2), rgba(166, 66, 83, 0.2)) 1;
  border-radius: 1rem;
  padding: 2rem;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
```

Note: `border-image` doesn't work with `border-radius`. Use the background-clip approach instead:

```css
.card {
  position: relative;
  background: linear-gradient(145deg, rgba(42, 39, 36, 0.8), rgba(30, 27, 24, 0.9));
  border: 1px solid rgba(97, 152, 142, 0.15);
  border-radius: 1rem;
  padding: 2rem;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(97, 152, 142, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

**Step 4: Add section divider utility class**

Add at the end of global.css (before the reduced-motion media query):

```css
/* Angled section dividers */
.section-slant-down {
  clip-path: polygon(0 0, 100% 3%, 100% 100%, 0 97%);
  padding-top: calc(3vw + 5rem);
  padding-bottom: calc(3vw + 5rem);
}

.section-slant-up {
  clip-path: polygon(0 3%, 100% 0, 100% 97%, 0 100%);
  padding-top: calc(3vw + 5rem);
  padding-bottom: calc(3vw + 5rem);
}
```

**Step 5: Add 3D tilt utility class**

```css
/* 3D tilt container */
.tilt-card {
  transform-style: preserve-3d;
  perspective: 800px;
}
```

**Step 6: Add floating pill badge style**

```css
/* Floating pill badge */
.pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.02em;
}
```

**Step 7: Run dev server and verify no visual regressions**

Run: `npm run dev`
Expected: Site loads at localhost:4321, animations have subtle bounce overshoot, glow orbs are larger, cards have teal-tinted borders.

**Step 8: Commit**

```bash
git add src/styles/global.css
git commit -m "style: update global CSS with bouncy animations, larger glows, gradient card borders, and utility classes"
```

---

### Task 2: Problem Section — Animated counter and accent bar

**Files:**
- Modify: `src/components/Problem.astro`

**Step 1: Replace the entire Problem.astro with updated version**

Replace the full contents of `src/components/Problem.astro` with:

```astro
<section class="fade-in py-20 md:py-32 px-4 relative overflow-hidden section-slant-down bg-carbon-light/30">
  <!-- Larger teal glow behind stat -->
  <div class="glow-teal top-[40%] left-[50%] -translate-x-1/2"></div>

  <div class="relative z-10 max-w-3xl mx-auto text-center">
    <!-- Teal accent bar above heading -->
    <div class="w-15 h-1 bg-teal mx-auto mb-8 rounded-full"></div>

    <h2 class="text-3xl md:text-5xl font-bold mb-8">
      Thousands of Photos. No Time to Sort Them.
    </h2>
    <div class="space-y-4 text-white/70 text-lg">
      <p>Photos pile up — duplicates, blurry shots, random screenshots you forgot about.</p>
      <p>Scrolling through your gallery to delete them one by one? Nobody has time for that.</p>
      <p>So you keep putting it off, and the pile keeps growing.</p>
    </div>

    <div class="mt-12">
      <div class="inline-block rounded-full bg-teal/15 px-8 py-4">
        <div class="scale-in text-6xl md:text-8xl font-extrabold text-teal-bright glow-text-teal" id="stat-counter">
          0+
        </div>
      </div>
      <p class="text-white/50 mt-4">photos on the average phone</p>
    </div>
  </div>
</section>

<script>
  const counter = document.getElementById('stat-counter');
  if (counter) {
    const target = 2000;
    let started = false;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        const duration = 1500;
        const start = performance.now();
        const step = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          counter.textContent = current.toLocaleString() + '+';
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    observer.observe(counter);
  }
</script>
```

**Step 2: Verify in browser**

Run: `npm run dev` (if not already running)
Expected: Problem section has angled edges, teal bar above heading, stat number in a teal pill that counts up from 0 to 2,000+ when scrolled into view.

**Step 3: Commit**

```bash
git add src/components/Problem.astro
git commit -m "feat: add animated counter, accent bar, and stat pill to Problem section"
```

---

### Task 3: How It Works — Interactive swipe demo

**Files:**
- Modify: `src/components/HowItWorks.astro`

**Step 1: Replace HowItWorks.astro with the interactive swipe demo**

Replace the full contents of `src/components/HowItWorks.astro` with:

```astro
<section class="fade-in py-20 md:py-32 px-4 section-slant-up relative overflow-hidden">
  <div class="glow-teal top-[20%] right-[-100px]"></div>
  <div class="glow-mauve bottom-[20%] left-[-100px]"></div>

  <div class="relative z-10 max-w-4xl mx-auto">
    <h2 class="text-3xl md:text-5xl font-bold text-center mb-16">
      How It Works
    </h2>

    <!-- Swipe Demo -->
    <div class="relative max-w-sm mx-auto mb-16" id="swipe-demo">
      <!-- Phone frame -->
      <div class="aspect-[9/16] rounded-[2.5rem] bg-gradient-to-b from-carbon-light to-carbon border-2 border-white/10 shadow-2xl overflow-hidden relative mx-auto max-w-[280px]">
        <!-- Swipe labels -->
        <div id="trash-label" class="absolute top-8 left-4 z-30 px-4 py-2 rounded-xl bg-mauve font-bold text-white text-lg rotate-[-12deg] opacity-0 transition-opacity duration-150 pointer-events-none">
          TRASH
        </div>
        <div id="stash-label" class="absolute top-8 right-4 z-30 px-4 py-2 rounded-xl bg-teal font-bold text-white text-lg rotate-[12deg] opacity-0 transition-opacity duration-150 pointer-events-none">
          STASH
        </div>

        <!-- Glow overlays -->
        <div id="mauve-overlay" class="absolute inset-0 z-20 bg-mauve/0 transition-colors duration-150 pointer-events-none rounded-[2.5rem]"></div>
        <div id="teal-overlay" class="absolute inset-0 z-20 bg-teal/0 transition-colors duration-150 pointer-events-none rounded-[2.5rem]"></div>

        <!-- Draggable photo card -->
        <div id="swipe-card" class="absolute inset-4 z-10 rounded-2xl bg-carbon-light overflow-hidden cursor-grab active:cursor-grabbing shadow-lg select-none touch-none">
          <div class="w-full h-full bg-gradient-to-br from-white/10 via-white/5 to-transparent flex items-center justify-center">
            <div class="text-center px-4">
              <div class="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="text-white/60 text-sm font-medium">Drag left or right</p>
              <p class="text-white/30 text-xs mt-1">Try it!</p>
            </div>
          </div>
        </div>

        <!-- Screen reflection -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none z-30"></div>
      </div>
    </div>

    <!-- Step pills -->
    <div class="flex flex-wrap justify-center gap-3 stagger-in">
      <div class="pill-badge bg-mauve text-white">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        Swipe Left = Trash
      </div>
      <div class="pill-badge bg-teal text-white">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
        Swipe Right = Stash
      </div>
      <div class="pill-badge bg-white/10 text-white/80">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
        Review & Delete
      </div>
    </div>

    <p class="text-center text-white/40 mt-8">
      Review hundreds of photos in minutes. Nothing is deleted until you confirm.
    </p>
  </div>
</section>

<script>
  const card = document.getElementById('swipe-card');
  const trashLabel = document.getElementById('trash-label');
  const stashLabel = document.getElementById('stash-label');
  const mauveOverlay = document.getElementById('mauve-overlay');
  const tealOverlay = document.getElementById('teal-overlay');

  if (card && trashLabel && stashLabel && mauveOverlay && tealOverlay) {
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    const threshold = 120;

    card.addEventListener('pointerdown', (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX;
      card.setPointerCapture(e.pointerId);
      card.style.transition = 'none';
    });

    card.addEventListener('pointermove', (e: PointerEvent) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      const rotation = currentX * 0.08;
      const progress = Math.min(Math.abs(currentX) / threshold, 1);

      card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;

      if (currentX < 0) {
        trashLabel.style.opacity = String(progress);
        stashLabel.style.opacity = '0';
        mauveOverlay.style.backgroundColor = `rgba(166, 66, 83, ${progress * 0.15})`;
        tealOverlay.style.backgroundColor = 'transparent';
      } else {
        stashLabel.style.opacity = String(progress);
        trashLabel.style.opacity = '0';
        tealOverlay.style.backgroundColor = `rgba(97, 152, 142, ${progress * 0.15})`;
        mauveOverlay.style.backgroundColor = 'transparent';
      }
    });

    const resetCard = () => {
      isDragging = false;
      card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.transform = 'translateX(0) rotate(0deg)';
      trashLabel.style.opacity = '0';
      stashLabel.style.opacity = '0';
      mauveOverlay.style.backgroundColor = 'transparent';
      tealOverlay.style.backgroundColor = 'transparent';
    };

    const flyOff = (direction: number) => {
      isDragging = false;
      card.style.transition = 'transform 0.4s ease-in, opacity 0.4s ease-in';
      card.style.transform = `translateX(${direction * 400}px) rotate(${direction * 30}deg)`;
      card.style.opacity = '0';
      trashLabel.style.opacity = '0';
      stashLabel.style.opacity = '0';

      setTimeout(() => {
        card.style.transition = 'none';
        card.style.transform = 'translateY(40px) scale(0.9)';
        card.style.opacity = '0';
        mauveOverlay.style.backgroundColor = 'transparent';
        tealOverlay.style.backgroundColor = 'transparent';

        requestAnimationFrame(() => {
          card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out';
          card.style.transform = 'translateX(0) rotate(0deg) scale(1)';
          card.style.opacity = '1';
        });
      }, 400);
    };

    card.addEventListener('pointerup', () => {
      if (!isDragging) return;
      if (Math.abs(currentX) > threshold) {
        flyOff(currentX > 0 ? 1 : -1);
      } else {
        resetCard();
      }
      currentX = 0;
    });

    card.addEventListener('pointercancel', () => {
      resetCard();
      currentX = 0;
    });
  }
</script>
```

**Step 2: Verify in browser**

Expected: Phone frame with draggable card. Dragging left shows "TRASH" label + mauve glow. Dragging right shows "STASH" label + teal glow. Releasing past threshold flies card off and brings in a new one. Three colored pills below.

**Step 3: Commit**

```bash
git add src/components/HowItWorks.astro
git commit -m "feat: replace How It Works cards with interactive swipe demo"
```

---

### Task 4: Smart Scanner — Pill badges, bounce animation, phone tilt, accent bar

**Files:**
- Modify: `src/components/SmartScanner.astro`

**Step 1: Replace SmartScanner.astro with updated version**

Replace the full contents of `src/components/SmartScanner.astro` with:

```astro
<section class="fade-in py-20 md:py-32 px-4 relative overflow-hidden border-l-4 border-mauve/40">
  <div class="glow-mauve top-[30%] left-[-100px]"></div>

  <div class="max-w-5xl mx-auto">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="slide-in-left">
        <h2 class="text-3xl md:text-5xl font-bold mb-8">
          Let the App Find the Junk for You
        </h2>
        <p class="text-white/70 text-lg mb-8">
          The Smart Scanner automatically detects the photos you'll never use:
        </p>

        <!-- Pill badges -->
        <div class="flex flex-wrap gap-3 stagger-in">
          <div class="pill-badge bg-teal text-white">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Duplicates
          </div>
          <div class="pill-badge bg-mauve text-white">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Blurry Photos
          </div>
          <div class="pill-badge bg-amber-600 text-white">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            Too Dark
          </div>
          <div class="pill-badge bg-blue-600 text-white">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
            </svg>
            Screenshots
          </div>
        </div>

        <p class="text-white/40 mt-8">See exactly how much space you'll recover.</p>
      </div>

      <!-- Phone mockup with tilt -->
      <div class="relative max-w-xs mx-auto w-full" style="perspective: 800px;">
        <div id="phone-tilt" class="aspect-[720/1143] rounded-[2rem] bg-gradient-to-b from-carbon-light to-carbon border border-white/10 shadow-2xl overflow-hidden relative transition-transform duration-200 ease-out">
          <!-- Screen reflection -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none"></div>
          <!-- Inner shadow -->
          <div class="absolute inset-0 shadow-[inset_0_2px_20px_rgba(0,0,0,0.4)] pointer-events-none rounded-[2rem]"></div>
          <img
            src="/images/smart-scanner-screenshot.jpg"
            alt="Stash or Trash Smart Scanner detecting blurry, dark, and duplicate photos"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  const phoneTilt = document.getElementById('phone-tilt');
  if (phoneTilt) {
    const parent = phoneTilt.parentElement!;
    parent.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      phoneTilt.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    parent.addEventListener('mouseleave', () => {
      phoneTilt.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }
</script>
```

**Step 2: Verify in browser**

Expected: Mauve left border accent on section. Four chunky colored pills instead of list items. Phone mockup tilts with mouse movement (3D effect). Pills stagger in with bouncy animation.

**Step 3: Commit**

```bash
git add src/components/SmartScanner.astro
git commit -m "feat: Smart Scanner pills, phone tilt, and mauve accent bar"
```

---

### Task 5: Features Grid — Tilt cards, gradient borders, solid icons, variable sizing

**Files:**
- Modify: `src/components/Features.astro`

**Step 1: Replace Features.astro with updated version**

Replace the full contents of `src/components/Features.astro` with:

```astro
<section class="fade-in py-20 md:py-32 px-4 section-slant-down relative overflow-hidden">
  <div class="glow-teal top-[10%] right-[-100px]"></div>

  <div class="relative z-10 max-w-5xl mx-auto">
    <h2 class="text-3xl md:text-5xl font-bold text-center mb-16">
      Everything You Need
    </h2>
    <div class="grid md:grid-cols-2 gap-6 stagger-in" id="features-grid">
      <!-- Featured: full width -->
      <div class="card card-teal tilt-card md:col-span-2">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-teal flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-2">Browse by Date or Album</h3>
            <p class="text-white/60">Jump to any month or album. See your progress on each.</p>
          </div>
        </div>
      </div>

      <!-- Featured: full width -->
      <div class="card card-mauve tilt-card md:col-span-2">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-mauve flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-2">Undo Anytime</h3>
            <p class="text-white/60">Changed your mind? One tap brings back the last photo. Nothing's permanent until you say so.</p>
          </div>
        </div>
      </div>

      <!-- 2x2 grid -->
      <div class="card card-teal tilt-card">
        <div class="w-10 h-10 rounded-lg bg-teal flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 class="font-bold text-lg mb-2">Track Your Progress</h3>
        <p class="text-white/60">Stats show how many photos you've reviewed, kept, and deleted — plus space recovered.</p>
      </div>

      <div class="card card-teal tilt-card">
        <div class="w-10 h-10 rounded-lg bg-teal flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <h3 class="font-bold text-lg mb-2">Organize While Swiping</h3>
        <p class="text-white/60">Move photos into albums without leaving the swipe flow.</p>
      </div>

      <div class="card card-mauve tilt-card">
        <div class="w-10 h-10 rounded-lg bg-mauve flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="font-bold text-lg mb-2">Videos Too</h3>
        <p class="text-white/60">Not just photos — swipe through videos the same way.</p>
      </div>

      <div class="card card-teal tilt-card">
        <div class="w-10 h-10 rounded-lg bg-teal flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h3 class="font-bold text-lg mb-2">Random Shuffle</h3>
        <p class="text-white/60">Can't decide where to start? Shuffle your entire gallery and swipe at random.</p>
      </div>
    </div>
  </div>
</section>

<script>
  document.querySelectorAll('#features-grid .tilt-card').forEach((card) => {
    const el = card as HTMLElement;
    el.style.transformStyle = 'preserve-3d';
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  });
</script>
```

**Step 2: Verify in browser**

Expected: Two full-width featured cards at top (Browse by Date, Undo Anytime) with horizontal layout. Four smaller cards in 2x2 below. All cards have solid-color icon backgrounds (white icons on teal/mauve). Cards tilt toward mouse on hover. Angled section edges.

**Step 3: Commit**

```bash
git add src/components/Features.astro
git commit -m "feat: Features grid with tilt cards, solid icons, and variable sizing"
```

---

### Task 6: Privacy Section — Trust card and on-device badge

**Files:**
- Modify: `src/components/Privacy.astro`

**Step 1: Replace Privacy.astro with updated version**

Replace the full contents of `src/components/Privacy.astro` with:

```astro
<section class="fade-in py-20 md:py-32 px-4">
  <div class="max-w-3xl mx-auto text-center">
    <!-- Rotated pill badge -->
    <div class="mb-6">
      <span class="pill-badge bg-teal text-white inline-flex -rotate-2">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        100% On-Device
      </span>
    </div>

    <h2 class="text-3xl md:text-5xl font-bold mb-10">
      Your Photos Stay on Your Phone
    </h2>

    <!-- Trust card -->
    <div class="card border-l-4 border-l-teal stagger-in">
      <div class="grid md:grid-cols-3 gap-8">
        <div class="flex flex-col items-center">
          <div class="w-14 h-14 rounded-full bg-teal flex items-center justify-center mb-4">
            <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p class="text-white/70">No data collection. No analytics. No tracking.</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-14 h-14 rounded-full bg-teal flex items-center justify-center mb-4">
            <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p class="text-white/70">No cloud uploads. No accounts. No servers.</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-14 h-14 rounded-full bg-teal flex items-center justify-center mb-4">
            <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-white/70">Everything happens entirely on your device.</p>
        </div>
      </div>
    </div>

    <a href="/privacy" class="group inline-block mt-10 text-teal hover:text-teal-bright transition-colors">
      Read our full Privacy Policy <span class="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
    </a>
  </div>
</section>
```

**Step 2: Verify in browser**

Expected: Slightly rotated "100% On-Device" teal pill badge above heading. Three privacy items wrapped in a single card with a teal left border accent. Solid teal icon backgrounds with white icons.

**Step 3: Commit**

```bash
git add src/components/Privacy.astro
git commit -m "feat: Privacy trust card with on-device badge"
```

---

### Task 7: Download CTA — Bolder gradient, floating pill, badge container

**Files:**
- Modify: `src/components/DownloadCTA.astro`

**Step 1: Replace DownloadCTA.astro with updated version**

Replace the full contents of `src/components/DownloadCTA.astro` with:

```astro
<section class="fade-in py-20 md:py-32 px-4 bg-gradient-to-b from-carbon via-mauve/25 to-carbon relative overflow-hidden section-slant-up">
  <!-- Mauve glow behind heading -->
  <div class="glow-mauve top-[10%] left-[50%] -translate-x-1/2"></div>

  <div class="relative z-10 max-w-3xl mx-auto text-center">
    <!-- Floating badge -->
    <div class="mb-6">
      <span class="pill-badge bg-teal-bright/20 text-teal-bright rotate-2 scroll-hint inline-flex">
        Free, No Ads
      </span>
    </div>

    <h2 class="text-3xl md:text-5xl font-bold mb-6 gradient-text">
      Ready to Clean Up?
    </h2>
    <p class="text-white/70 text-lg mb-10">Free on Google Play</p>
    <a
      href="https://play.google.com/store/apps/details?id=YOUR_APP_ID"
      target="_blank"
      rel="noopener noreferrer"
      class="cta-ring inline-block rounded-2xl bg-carbon-light/60 border border-white/10 px-6 py-4 transition-transform hover:scale-105"
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

**Step 2: Verify in browser**

Expected: Bolder mauve gradient (via-mauve/25 instead of /15). "Free, No Ads" floating teal pill with gentle bounce. Google Play badge in a rounded dark container with border. Angled section edges.

**Step 3: Commit**

```bash
git add src/components/DownloadCTA.astro
git commit -m "feat: bolder CTA with floating badge and contained play button"
```

---

### Task 8: Final build verification

**Files:** None (verification only)

**Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 2: Preview production build**

Run: `npm run preview`
Expected: All sections render correctly, animations work, swipe demo is interactive, phone tilts on hover, counter animates.

**Step 3: Final commit with all changes if any stragglers**

```bash
git status
# If any unstaged changes remain:
git add -A
git commit -m "chore: final cleanup for swipe energy redesign"
```
