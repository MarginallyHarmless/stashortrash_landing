# Landing Page Copy Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update all landing page copy to the new Speed & Satisfaction tone per `docs/plans/2026-02-22-landing-page-copy-design.md`

**Architecture:** Text-only edits across 7 Astro components. No structural, styling, or logic changes.

**Tech Stack:** Astro 5 components (`.astro` files)

---

### Task 1: Update Hero copy

**Files:**
- Modify: `src/components/Hero.astro:24-29`

**Step 1: Update headline and subheadline**

Replace the h1 inner text (line 25):
```
Swipe Your Photo Gallery Clean
```
With:
```
Gallery Cleanup That Actually Feels Good
```

Replace the p inner text (line 28):
```
The fast, fun way to declutter your phone's photo gallery. Swipe left to delete, right to keep — it's that simple.
```
With:
```
Every photo, full-screen. Swipe left to trash, right to keep. Clean your entire gallery in minutes, not hours.
```

**Step 2: Verify dev server**

Run: `npm run dev`
Open http://localhost:4321, confirm hero text renders correctly.

**Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "copy: update hero headline and subheadline"
```

---

### Task 2: Update Problem section copy

**Files:**
- Modify: `src/components/Problem.astro:9-14`

**Step 1: Update headline and body**

Replace the h2 inner text (line 10):
```
Thousands of Photos. No Time to Sort Them.
```
With:
```
Your Gallery Is Out of Control
```

Replace the p tag content (line 13):
```
Photos pile up — duplicates, blurry shots, random screenshots you forgot about. You know you should clean up, but <span class="text-white/90 font-medium">where do you even start?</span>
```
With:
```
Duplicates, blurry shots, screenshots of WiFi passwords — they pile up fast. And cleaning them out one by one? <span class="text-white/90 font-medium">Nobody has time for that.</span> So you don't. And it only gets worse.
```

**Step 2: Verify in browser**

Scroll to Problem section, confirm text renders correctly.

**Step 3: Commit**

```bash
git add src/components/Problem.astro
git commit -m "copy: update problem section headline and body"
```

---

### Task 3: Update How It Works copy

**Files:**
- Modify: `src/components/HowItWorks.astro:6-11, 53-76`

**Step 1: Update section heading and subheadline**

Replace the p tag content (lines 8-10):
```
Review hundreds of photos in minutes.<br>
      Nothing is deleted until you confirm.
```
With:
```
Three moves. That's the whole system.
```

**Step 2: Update step card text**

Line 53, replace:
```
<h3 class="text-white font-semibold mb-1">Swipe Left = Trash</h3>
<p class="text-white/60 text-sm">Blurry selfie? Old screenshot? Swipe it away.</p>
```
With:
```
<h3 class="text-white font-semibold mb-1">Swipe Left = Gone</h3>
<p class="text-white/60 text-sm">Blurry selfie? Random screenshot? Flick it away.</p>
```

Line 64, replace:
```
<h3 class="text-white font-semibold mb-1">Swipe Right = Stash</h3>
<p class="text-white/60 text-sm">Worth keeping? Swipe right and move on.</p>
```
With:
```
<h3 class="text-white font-semibold mb-1">Swipe Right = Saved</h3>
<p class="text-white/60 text-sm">Worth keeping? One swipe and you're on to the next one.</p>
```

Line 75, replace:
```
<h3 class="text-white font-semibold mb-1">Review & Delete</h3>
<p class="text-white/60 text-sm">Check your trash queue before anything's permanent. Undo anytime.</p>
```
With:
```
<h3 class="text-white font-semibold mb-1">Review Before You Delete</h3>
<p class="text-white/60 text-sm">Everything lands in a review queue first. Nothing disappears until you say so.</p>
```

**Step 3: Verify in browser**

Scroll to How It Works, confirm all three steps and subheadline render correctly.

**Step 4: Commit**

```bash
git add src/components/HowItWorks.astro
git commit -m "copy: update how it works steps and subheadline"
```

---

### Task 4: Update Smart Scanner copy

**Files:**
- Modify: `src/components/SmartScanner.astro:7-12, 43`

**Step 1: Update headline and body**

Line 8, replace:
```
Let the App Find the Junk for You
```
With:
```
It Finds the Junk So You Don't Have To
```

Line 11, replace:
```
The Smart Scanner automatically detects the photos you'll never use:
```
With:
```
The Smart Scanner does the boring part. It scans your gallery and flags:
```

Line 43, replace:
```
<p class="text-white/40 mt-8">See exactly how much space you'll recover.</p>
```
With:
```
<p class="text-white/40 mt-8">See exactly how much space you'll get back before you delete a thing.</p>
```

**Step 2: Verify in browser**

Scroll to Smart Scanner section, confirm text renders correctly.

**Step 3: Commit**

```bash
git add src/components/SmartScanner.astro
git commit -m "copy: update smart scanner headline and descriptions"
```

---

### Task 5: Update Features copy

**Files:**
- Modify: `src/components/Features.astro:6, 18, 30, 41, 54, 67, 80`

**Step 1: Update section headline**

Line 6, replace:
```
Everything You Need
```
With:
```
What Else Can It Do?
```

**Step 2: Update feature descriptions**

Line 18, replace:
```
<p class="text-white/60 text-base">Jump to any month or album. See your progress on each.</p>
```
With:
```
<p class="text-white/60 text-base">Jump to any month or album. Pick up right where you left off.</p>
```

Line 30, replace:
```
<p class="text-white/60 text-sm">Not just photos — swipe through videos the same way.</p>
```
With:
```
<p class="text-white/60 text-sm">Same swipe, same speed. Works on videos just like photos.</p>
```

Line 41, replace:
```
<p class="text-white/60 text-sm">Can't decide where to start? Shuffle your gallery and swipe at random.</p>
```
With:
```
<p class="text-white/60 text-sm">No idea where to start? Hit shuffle and let the app decide.</p>
```

Line 54, replace:
```
<p class="text-white/60">Changed your mind? One tap brings back the last photo. Nothing's permanent until you say so.</p>
```
With:
```
<p class="text-white/60">Swiped too fast? Tap to undo. Nothing's permanent until you are.</p>
```

Line 67, replace:
```
<p class="text-white/60 text-sm">Stats show how many photos you've reviewed, kept, and deleted — plus space recovered.</p>
```
With:
```
<p class="text-white/60 text-sm">See how many you've reviewed, kept, and trashed — plus space recovered.</p>
```

Line 80, replace:
```
<p class="text-white/60">Move photos into albums without leaving the swipe flow.</p>
```
With:
```
<p class="text-white/60">Toss photos into albums mid-swipe. No extra steps.</p>
```

**Step 3: Verify in browser**

Scroll to Features section, confirm all 6 feature cards render correctly.

**Step 4: Commit**

```bash
git add src/components/Features.astro
git commit -m "copy: update features headline and descriptions"
```

---

### Task 6: Update Privacy section copy

**Files:**
- Modify: `src/components/Privacy.astro:13-14, 26, 34, 42, 47-48`

**Step 1: Update headline**

Line 14, replace:
```
Your Photos Stay on Your Phone
```
With:
```
Your Photos Never Leave Your Phone
```

**Step 2: Update trust points**

Line 26, replace:
```
<p class="text-white/70">No data collection. No analytics. No tracking.</p>
```
With:
```
<p class="text-white/70">No cloud. No servers. No uploads. Ever.</p>
```

Line 34, replace:
```
<p class="text-white/70">No cloud uploads. No accounts. No servers.</p>
```
With:
```
<p class="text-white/70">No accounts. No sign-ups. No tracking.</p>
```

Line 42, replace:
```
<p class="text-white/70">Everything happens entirely on your device.</p>
```
With:
```
<p class="text-white/70">Everything runs on your device. Period.</p>
```

**Step 3: Update link text**

Lines 47-48, replace:
```
Read our full Privacy Policy <span class="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
```
With:
```
Read our Privacy Policy <span class="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
```

**Step 4: Verify in browser**

Scroll to Privacy section, confirm text renders correctly.

**Step 5: Commit**

```bash
git add src/components/Privacy.astro
git commit -m "copy: update privacy headline and trust points"
```

---

### Task 7: Update Download CTA copy

**Files:**
- Modify: `src/components/DownloadCTA.astro:7-9`

**Step 1: Update headline and subheadline**

Line 7, replace:
```
Ready to Clean Up?
```
With:
```
Your Gallery Won't Clean Itself
```

Line 9, replace:
```
<p class="text-white/70 text-lg mb-10">Free on Google Play</p>
```
With:
```
<p class="text-white/70 text-lg mb-10">Free on Google Play.</p>
```

**Step 2: Verify in browser**

Scroll to bottom CTA, confirm text renders correctly.

**Step 3: Commit**

```bash
git add src/components/DownloadCTA.astro
git commit -m "copy: update download CTA headline"
```

---

### Task 8: Final review

**Step 1: Full page scroll-through**

Run: `npm run dev`
Scroll through the entire page top to bottom. Verify:
- All new copy renders correctly
- No leftover old copy
- No layout breaks from longer/shorter text
- Animations still work (stat counter, swipe demo, tilt cards)

**Step 2: Build check**

Run: `npm run build`
Confirm no build errors.

**Step 3: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "copy: landing page copy redesign complete"
```
