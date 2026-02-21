# Sticky Nav Bar with App Logo

## Summary

Add a sticky top navigation bar to the landing page featuring the Stash or Trash app logo, app name, and tagline. Provides persistent brand identity across all sections.

## Layout

- Fixed bar at the top of the viewport, `z-50` (above Spline scene)
- Left-aligned content: logo icon (36px) + "Stash or Trash" bold text + "Swipe to clean" muted tagline
- Semi-transparent background with backdrop blur (`bg-carbon/80 backdrop-blur-md`)
- Compact padding (`py-3 px-4`)

## Behavior

- Always visible on scroll (sticky/fixed positioning)
- Starts transparent in the hero section
- Gains backdrop blur background once user scrolls past a small threshold (~10px)

## Assets

- Source: `c:\Users\bogda\Desktop\Clean My Photos\app icon\logo.png`
- Destination: `public/images/logo.png`
- Display size: 36px height, auto width

## Implementation Notes

- Create a new `Navbar.astro` component
- Add it to `Layout.astro` so it appears on all pages
- Use a small inline `<script>` for the scroll-triggered background transition
- Keep the Hero section's existing `z-40` content below the navbar's `z-50`
