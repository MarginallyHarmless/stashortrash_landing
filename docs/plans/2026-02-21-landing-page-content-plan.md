# Stash or Trash — Landing Page Content Plan

**Date**: 2026-02-21
**Format**: Single scrolling page
**Purpose**: Establish web presence, SEO for photo cleanup/organizer keywords
**Privacy Policy**: Linked separately (not inline)

---

## Visual Direction

- **Dark theme** matching the app's Carbon Black (#1E1B18) background
- **Accent colors**: Seagrass Teal (#61988E) for positive actions/CTAs, Dusty Mauve (#A64253) for delete/contrast
- **Tone**: Fun, casual, action-oriented — mirrors the app's personality
- **Typography**: Clean sans-serif, large headings, short punchy copy

---

## Page Sections

### 1. Hero

**Purpose**: Instant understanding of what the app does + primary CTA.

**Content**:
- **Headline**: "Swipe Your Photo Gallery Clean"
- **Subheadline**: One sentence positioning the app — fast, fun way to declutter your phone's photo gallery by swiping left to delete, right to keep
- **Visual**: App mockup showing the swipe screen mid-action with the teal "KEEP" overlay visible. Show the card stack so visitors immediately understand the mechanic
- **CTA**: Google Play Store badge

**SEO targets**: "photo cleanup app", "swipe to delete photos", "photo gallery cleaner"

---

### 2. The Problem

**Purpose**: Connect with the visitor's pain point before presenting the solution.

**Content**:
- **Headline**: Something addressing gallery bloat (e.g., "Thousands of Photos. No Time to Sort Them.")
- **Copy**: 2-3 short sentences about the universal problem:
  - Photos pile up — duplicates, blurry shots, random screenshots
  - Scrolling through your gallery to delete one-by-one is tedious
  - You keep putting it off, and the pile keeps growing
- **Visual**: Optional — could use a simple illustration or stat ("The average phone has 2,000+ photos")

**SEO targets**: "clean up phone gallery", "too many photos on phone", "declutter phone photos"

---

### 3. How It Works

**Purpose**: Show the core mechanic in 3 dead-simple steps.

**Layout**: Three columns or cards, each with an icon/mini-screenshot.

| Step | Heading | Description | Accent Color |
|------|---------|-------------|--------------|
| 1 | Swipe Left = Trash | See a blurry selfie? Old screenshot? Swipe it away. | Dusty Mauve + X icon |
| 2 | Swipe Right = Stash | Worth keeping? Swipe right and move on. | Seagrass Teal + checkmark |
| 3 | Review & Delete | Check your delete queue before anything's permanent. Undo anytime. | Neutral |

**Key messaging**: Emphasize speed ("review hundreds of photos in minutes") and safety ("nothing is deleted until you confirm").

**SEO targets**: "tinder for photos", "photo swipe app", "swipe photo organizer"

---

### 4. Smart Scanner

**Purpose**: Showcase the automated detection as the "smart" differentiator.

**Content**:
- **Headline**: Something like "Let the App Find the Junk for You"
- **Copy**: The Smart Scanner automatically detects:
  - **Duplicate photos** — groups near-identical shots so you keep the best one
  - **Blurry photos** — catches out-of-focus and motion-blurred shots
  - **Too-dark photos** — flags underexposed shots you'll never use
  - **Screenshots** — identifies screenshot clutter taking up space
- **Visual**: Screenshot of the Scanner screen showing duplicate groups or the low-quality grid with quality badges
- **Supporting detail**: Mention storage savings visibility (e.g., "See exactly how much space you'll recover")

**SEO targets**: "delete duplicate photos android", "find blurry photos", "duplicate photo finder", "remove bad photos automatically"

---

### 5. Features

**Purpose**: Cover the remaining features that didn't fit in earlier sections.

**Layout**: Grid of 4-6 compact feature cards, each with an icon and 1-2 sentences.

| Feature | Description |
|---------|-------------|
| **Browse by Date or Album** | Jump to any month or album. See your progress on each. |
| **Undo Anytime** | Changed your mind? One tap brings back the last photo. Nothing's permanent until you say so. |
| **Track Your Progress** | Stats show how many photos you've reviewed, kept, and deleted — plus space recovered. |
| **Organize While Swiping** | Move photos into albums without leaving the swipe flow. |
| **Videos Too** | Not just photos — swipe through videos the same way. |
| **Random Shuffle** | Can't decide where to start? Shuffle your entire gallery and swipe at random. |

**SEO targets**: "photo organizer app android", "gallery manager", "organize phone photos"

---

### 6. Privacy & Trust

**Purpose**: Build trust. This is a strong differentiator — most competitor apps require cloud access or accounts.

**Content**:
- **Headline**: "Your Photos Stay on Your Phone"
- **Copy**:
  - No data collection. No analytics. No tracking.
  - No cloud uploads. No accounts. No servers.
  - Everything happens entirely on your device.
- **Link**: "Read our full Privacy Policy" pointing to the separate privacy policy page
- **Visual**: Optional — a simple lock/shield icon, or a "no cloud" visual

**SEO targets**: "private photo app", "offline photo organizer", "photo app no cloud"

---

### 7. Download CTA (Closing)

**Purpose**: Repeat the call to action after the visitor has seen the full pitch.

**Content**:
- **Headline**: Short closing line (e.g., "Ready to clean up?")
- **CTA**: Google Play Store badge (large, prominent)
- **Supporting text**: "Free on Google Play" or "Available for Android"

---

### 8. Footer

**Content**:
- Google Play badge (small, repeated)
- Privacy Policy link
- Contact/support email
- Copyright notice (e.g., "2026 Stash or Trash")

---

## SEO Implementation Notes

### Page Metadata
- **Title tag**: "Stash or Trash — Swipe Your Photo Gallery Clean | Free Android App"
- **Meta description**: "Clean up your phone's photo gallery by swiping. Stash or Trash finds duplicates, blurry shots, and screenshots automatically. Free, private, no cloud. Available on Android."
- **Canonical URL**: Set once domain is chosen

### Structured Data
- Use **SoftwareApplication** schema (JSON-LD) for rich search snippets:
  - applicationCategory: "PhotographyApplication"
  - operatingSystem: "Android"
  - offers: Free
  - aggregateRating: Add once reviews are available

### Keyword Clusters to Target

| Cluster | Primary Keywords | Section |
|---------|-----------------|---------|
| Cleanup | photo cleanup app, clean up phone gallery, declutter phone photos | Hero, Problem |
| Swipe mechanic | swipe to delete photos, tinder for photos, photo swipe app | How It Works |
| Duplicates | duplicate photo finder, delete duplicate photos, find duplicate photos android | Smart Scanner |
| Quality | find blurry photos, remove bad photos, photo quality checker | Smart Scanner |
| Organizer | photo organizer app, gallery manager android, organize phone photos | Features |
| Privacy | private photo app, offline photo organizer, no cloud photo app | Privacy |

### Image Optimization
- All images should have descriptive alt text incorporating target keywords naturally
- Use WebP format for fast loading
- Lazy-load below-the-fold images
- App screenshots should be framed in device mockups for a polished look

### Performance
- Target sub-2-second load time
- Minimal JavaScript — this is a mostly static content page
- Consider static site generator (Hugo, Astro, or plain HTML) for maximum speed
