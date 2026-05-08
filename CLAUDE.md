# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build (TypeScript check + Turbopack)
npm run start    # Serve production build
npm run lint     # ESLint
```

## Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **Tailwind CSS v4** — config via `@theme` in `globals.css`, NOT `tailwind.config.ts`
- **Framer Motion 12** — stricter TS types (see notes below)
- **@phosphor-icons/react** — all icons, `weight="bold"` or `weight="fill"`
- **Geist** font via `next/font/google` → CSS vars `--font-geist-sans` / `--font-geist-mono`

PostCSS: uses `@tailwindcss/postcss` (v4 plugin). Never add the old `tailwindcss` plugin.

## Architecture

```
app/
  layout.tsx           — wraps <LangProvider><ModalProvider>
  page.tsx             — imports all section components in order
  globals.css          — Tailwind v4 @theme, utility classes (.btn-primary, .glass-card, .gradient-text, .wrap, etc.)
context/
  LangContext.tsx      — UA/EN language switcher state + useLang() hook
  ModalContext.tsx     — global modal open/close state + useModal() hook
lib/
  translations.ts      — all copy for ua + en, type-safe with `as const`
components/
  Header.tsx           — sticky, hides scroll-down / shows scroll-up; UA/EN switcher; mobile burger menu
  Hero.tsx             — full-viewport hero, stagger animations, tilt card
  TrustStrip.tsx       — animated marquee of key metrics
  About.tsx            — 2-col: headline + stats grid
  WhoIsItFor.tsx       — 6-card tilt grid of target audience
  Services.tsx         — accordion rows (01–04), NOT 3 equal cards
  HowItWorks.tsx       — 4-step horizontal process
  Benefits.tsx         — 2×3 grid with hover state
  Cases.tsx            — 3 tilt cards with before/after metrics
  Testimonials.tsx     — rotating single quote + thumbnail row
  FAQ.tsx              — accordion
  ApplicationSection.tsx — split-layout form section (inline #apply)
  FormFields.tsx       — shared form logic (name/age/city/gender/contact/18+/privacy)
  ApplicationModal.tsx — popup modal wrapping FormFields
  Footer.tsx           — links, contacts, socials, docs, 18+ notice
  FloatingWidget.tsx   — desktop sticky CTA (visible after 400px scroll)
  MobileStickyBar.tsx  — mobile sticky bottom CTA bar
```

## Key patterns

**Language switching** — `useLang()` returns `{ lang, setLang, t }`. All user-facing copy comes from `t.*` (never hardcoded strings).

**Modal system** — `useModal()` returns `{ isOpen, openModal, closeModal }`. Every CTA button calls `openModal()`. Both the inline section (`ApplicationSection`) and the popup (`ApplicationModal`) use the shared `FormFields` component.

**Framer Motion v12 TS constraint** — `ease` inside a `Variants` object must be cast `"easeOut" as const`. Raw `number[]` bezier arrays and bare `string` both fail TS. Inline `transition={{ ease: "easeOut" as const }}` props are fine.

**Tailwind v4 custom tokens** — defined in `@theme { }` block in `globals.css`. Available as Tailwind utilities: `bg-surface`, `text-muted`, `text-accent`, `text-accent-2`, etc.

**18+ requirement** — shown in Hero badges, ApplicationSection warning block, ApplicationModal header, and Footer. The form validates age ≥ 18.

## Design tokens (globals.css)

| Token | Value |
|---|---|
| `--color-bg` | `#07070a` |
| `--color-surface` | `#0e0e15` |
| `--color-surface-2` | `#14141e` |
| `--color-accent` | `#d946ef` (fuchsia) |
| `--color-accent-2` | `#22d3ee` (cyan) |
| `.gradient-text` | fuchsia → cyan gradient clip |
| `.glass-card` | backdrop-blur panel |
| `.btn-primary` | gradient pill with glow |
| `.btn-ghost` | transparent outlined pill |
| `.wrap` | `max-w-[1280px] mx-auto px-6` |

## Design rules (.claude/rulles/)

The `taste-skill` in `.claude/rulles/taste-skill-main 4/` sets design defaults:
- DESIGN_VARIANCE: 8, MOTION_INTENSITY: 6, VISUAL_DENSITY: 4
- No Inter font (use Geist), no pure black, no 3-col equal cards, no centered hero
- Animations via Framer Motion spring physics only; never animate `top/left/width/height`
- Mobile: all asymmetric layouts collapse to single column below `md:`
