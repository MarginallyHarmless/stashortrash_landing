# Swipe Energy Redesign

**Date:** 2026-02-21
**Goal:** Make the landing page feel more playful, tactile, and distinctive — tied to the app's swipe mechanic — while keeping the dark theme with bolder color pops.

## Constraints

- Hero section and Spline 3D animation are unchanged
- Dark theme stays, but colors used more boldly (solid fills, not just 20% opacity)
- No new dependencies — all JS is vanilla
- Keep page load fast (minimal JS additions)

## Global Changes

### Section Dividers
- Angled `clip-path` dividers between sections (2-3 degree slant)
- Alternating slant direction for visual rhythm
- CSS-only, zero JS

### Card System
- Replace `rgba(255,255,255,0.06)` borders with gradient borders (teal-to-mauve, subtle)
- 3D tilt on hover via mouse-follow (`perspective` + `rotateX/rotateY`)
- Shared tilt utility function (~20 lines JS)

### Scroll Animations
- Add overshoot easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` for bounce-land feel
- Applies to all `.fade-in`, `.stagger-in`, `.slide-in-left`, `.scale-in`

### Glow Orbs
- Increase size from 400px to 600px on key sections
- Bump opacity from 0.15 to 0.2

### Icon Backgrounds
- Solid colored backgrounds on all icon circles/squares (not 20% opacity)
- Teal icons get solid teal bg, mauve icons get solid mauve bg, with white icon color

## Section-by-Section Changes

### Problem Section ("Thousands of Photos...")

- **Animated counter:** "2,000+" counts up from 0 on scroll into view (~15 lines JS, IntersectionObserver triggered)
- **Accent bar:** 4px solid teal bar (60px wide) above the heading, replacing the gradient divider below
- **Stat pill:** "2,000+" number sits inside a rounded pill with teal at ~15% opacity background

### How It Works — Interactive Swipe Demo

This is the biggest change. Replace the three static cards with an interactive demo.

**Layout:**
- Phone-frame mockup centered, containing a draggable "photo card"
- Below: horizontal row of bold pills summarizing the three steps

**Swipe interaction (vanilla JS, ~80-100 lines):**
- Pointer down starts drag tracking
- Card follows pointer horizontally, tilts in drag direction (CSS transform)
- Drag left: mauve glow builds on card, "Trash" label fades in
- Drag right: teal glow builds on card, "Stash" label fades in
- Release near center: card snaps back with spring animation
- Release past threshold: card flies off-screen, new card animates in from below
- Works with both mouse and touch (pointer events API)

**Step pills:**
- Three horizontal pills below the demo
- Bold rounded-full shape, solid backgrounds
- "1. Swipe Left = Trash" (mauve), "2. Swipe Right = Stash" (teal), "3. Review & Delete" (white/muted)

### Smart Scanner

- **Pill badges:** Four detection types displayed as chunky solid-fill pills (rounded-full, solid color, white text, inline icon) instead of list items
- **Bounce stagger:** Pills animate in from left with `cubic-bezier(0.34, 1.56, 0.64, 1)` overshoot
- **Phone mockup tilt:** Mouse-follow 3D tilt (3-5 degrees), uses shared tilt utility
- **Mauve accent bar:** Vertical 4px solid mauve bar on left edge of section

### Features Grid

- **3D tilt on hover:** Per-card mouse-follow tilt using shared utility
- **Gradient borders:** teal-to-mauve gradient border replacing current `white/6%`
- **Solid icon backgrounds:** Small solid-color circles for icons
- **Variable card sizes:** "Undo Anytime" and "Browse by Date" cards span full width (md:col-span-2) to break uniform grid; remaining 4 cards in 2x2

### Privacy Section

- **Trust card:** Wrap all three items in a single wide card with 4px solid teal left border
- **Badge:** "100% On-Device" pill above heading — solid teal background, white bold text, rotated -2deg
- Keep messaging clean and minimal otherwise

### Download CTA

- **Bolder gradient:** Deeper mauve saturation in background gradient
- **Floating pill:** "Free, No Ads" pill with slight rotation and gentle bounce animation
- **Badge container:** Google Play badge wrapped in a rounded container with dark background and gradient border

## JS Budget

| Feature | Estimated Lines | Trigger |
|---------|----------------|---------|
| Counter animation | ~15 | IntersectionObserver |
| Swipe demo | ~80-100 | Pointer events |
| Mouse-follow tilt (shared) | ~20 | mousemove |
| **Total** | **~115-135** | — |

No new dependencies. All vanilla JS.
