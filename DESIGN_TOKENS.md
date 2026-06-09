# Design Tokens & CSS Strategy

## CSS Pattern: Tailwind v4 + CSS Custom Properties

Tailwind v4 moves config into CSS — no `tailwind.config.ts`. Everything lives in `src/index.css` using `@theme {}` and `@layer base {}`.

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  /* All design tokens defined here */
  /* Tailwind generates utility classes from these automatically */
}

@layer base {
  :root { /* light mode variables */ }
  .dark { /* dark mode variables */ }
}
```

Dark mode works via `.dark` class on `<html>` — same pattern as shadcn/ui. No media query approach.

---

## Spacing & Layout

4px base grid. Identical to GitHub Primer.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Tight gaps, icon padding |
| `space-2` | 8px | Inner padding sm |
| `space-3` | 12px | Inner padding md |
| `space-4` | 16px | Standard block padding |
| `space-6` | 24px | Section gaps |
| `space-8` | 32px | Page section gaps |
| `space-12` | 48px | Large section spacing |
| `space-16` | 64px | Hero/page-level spacing |

This is Tailwind's default scale — no changes needed, documented for clarity.

---

## Border Radius

Subtle, not bubbly. GitHub-style.

| Token | Value | Usage |
|---|---|---|
| `--radius` (base) | `6px` | Buttons, inputs, cards |
| `sm` | `4px` | Badges, tags |
| `md` | `6px` | Default |
| `lg` | `8px` | Cards, modals |
| `full` | `9999px` | Pills, avatars |

---

## Typography Scale

GitHub Primer–inspired. 14px UI base (not 16px) — tighter, more information-dense.

| Name | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `xs` | 11px | 1.45 | 400 | Timestamps, metadata |
| `sm` | 12px | 1.5 | 400 | Labels, helper text, captions |
| `base` | 14px | 1.5 | 400 | **Body / default UI text** |
| `md` | 16px | 1.5 | 400 | Slightly larger body copy |
| `lg` | 18px | 1.4 | 500 | Lead text, large labels |
| `xl` | 20px | 1.4 | 500 | Card titles, section headers |
| `2xl` | 24px | 1.3 | 600 | Page subheadings |
| `3xl` | 30px | 1.2 | 700 | Page headings |
| `4xl` | 36px | 1.1 | 700 | Hero headings |

Font: **Inter** (already set). Fallbacks: `ui-sans-serif, system-ui, sans-serif`.

Mono font: **JetBrains Mono** (for `<kbd>`, `<code>`, `Input OTP`).

---

## Color System — Blue ✓

Primary accent: **Blue** (GitHub default feel). Professional, trustworthy, familiar.

```
Primary:    #2563eb  (blue-600)
Hover:      #1d4ed8  (blue-700)
Light bg:   #eff6ff  (blue-50)
Ring:       #93c5fd  (blue-300)
```

---

## Neutral Palette (same for all options)

Zinc grays. GitHub uses very similar values.

| Role | Light | Dark |
|---|---|---|
| `background` | `#ffffff` | `#09090b` |
| `foreground` | `#09090b` | `#fafafa` |
| `card` | `#ffffff` | `#09090b` |
| `muted` | `#f4f4f5` | `#27272a` |
| `muted-foreground` | `#71717a` | `#a1a1aa` |
| `border` | `#e4e4e7` | `#27272a` |
| `input` | `#e4e4e7` | `#27272a` |
| `destructive` | `#ef4444` | `#ef4444` |

---

## Summary

```
Font:         Inter 14px base (GitHub-density)
Radius:       6px (subtle, not bubbly)
Spacing:      4px grid (Tailwind default)
Shadows:      Very subtle — 1px borders preferred over heavy shadows
Color base:   Zinc neutrals
Color accent: YOUR CHOICE — Blue / Black / Green
Dark mode:    Supported via .dark class
```
