# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for **Stash or Trash**, an Android photo gallery cleanup app. The app uses swipe mechanics (left = delete, right = keep) with smart detection for duplicates, blurry/dark photos, and screenshots. All processing is on-device with no cloud, accounts, or tracking.

This repository contains the landing page website — not the Android app itself.

## Architecture

- **Single scrolling page** with 8 sections: Hero, Problem, How It Works, Smart Scanner, Features, Privacy & Trust, Download CTA, Footer
- **Content plan**: `docs/plans/2026-02-21-landing-page-content-plan.md` — the source of truth for page structure, copy, and SEO strategy
- **3D integration reference**: `spline-3d-integration-skill (1).zip` contains Spline 3D guides and React/vanilla examples if 3D elements are needed

## Visual Direction

- **Dark theme**: Carbon Black `#1E1B18` background
- **Accent colors**: Seagrass Teal `#61988E` (positive actions, CTAs), Dusty Mauve `#A64253` (delete/contrast)
- **Tone**: Fun, casual, action-oriented
- **Typography**: Clean sans-serif, large headings, short punchy copy

## Technical Requirements (from content plan)

- Sub-2-second page load target
- Minimal JavaScript — mostly static content
- WebP images with lazy loading for below-the-fold content
- SoftwareApplication JSON-LD schema for search rich snippets
- SEO-first: descriptive alt text, keyword-targeted copy, proper metadata
- Static site generator preferred (Hugo, Astro, or plain HTML)

## Current State

The project is in the planning phase. No frontend framework or build tooling has been set up yet. Implementation will need to start with scaffolding the web project.
