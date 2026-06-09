# Design System — Requirements

## Goal
Build a production-ready, reusable component library for a micro-SaaS product using **React + TypeScript + Tailwind CSS v4** and **shadcn/ui** as the component foundation.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Styling | Tailwind CSS v4 + `@tailwindcss/vite` | Utility-first, tree-shakeable, fast |
| Component base | shadcn/ui (New York style) | Accessible, unstyled-friendly, copy-owned |
| Primitives | Radix UI | Battle-tested accessibility |
| Variants | `class-variance-authority` (CVA) | Type-safe variant APIs |
| Class merging | `clsx` + `tailwind-merge` | Conflict-free class composition |
| Icons | `lucide-react` | Consistent icon set used by shadcn/ui |
| Build | Vite lib mode | Already configured |
| Docs/Preview | Storybook (already set up) | Visual development |

---

## Design Tokens

CSS custom properties defined in `src/index.css` (shadcn/ui convention):
- **Colors:** neutral palette (background, foreground, card, muted, accent, destructive, border, input, ring)
- **Radius:** `--radius` base radius value
- **Font:** Inter (already set)

---

## Components

### From shadcn/ui (copy + own, customisable)

These are scaffolded via the shadcn CLI and live in `src/components/ui/`.

| Component | shadcn name | Notes |
|---|---|---|
| Accordion | `accordion` | Animated expand/collapse |
| Alert | `alert` | Inline status messages |
| Alert Dialog | `alert-dialog` | Blocking confirmation modal |
| Aspect Ratio | `aspect-ratio` | Constrain media dimensions |
| Avatar | `avatar` | User image with fallback initials |
| Badge | `badge` | Status/label chips |
| Breadcrumb | `breadcrumb` | Navigation trail |
| Button | `button` | Replaces current inline-style Button |
| Calendar | `calendar` | Date picker calendar grid |
| Card | `card` | Content container with header/body/footer |
| Carousel | `carousel` | Embla-based image/content slider |
| Chart | `chart` | Recharts wrapper with theme tokens |
| Checkbox | `checkbox` | Accessible checkbox |
| Collapsible | `collapsible` | Show/hide any content block |
| Command | `command` | Command palette / search |
| Context Menu | `context-menu` | Right-click menu |
| Dialog | `dialog` | Accessible modal |
| Drawer | `drawer` | Vaul bottom sheet / side drawer |
| Dropdown Menu | `dropdown-menu` | Click-triggered menu |
| Hover Card | `hover-card` | Hover-triggered card popover |
| Input | `input` | Text input |
| Input OTP | `input-otp` | OTP code entry |
| Label | `label` | Accessible form label |
| Menubar | `menubar` | App-style top menu bar |
| Navigation Menu | `navigation-menu` | Top-level nav with sub-menus |
| Pagination | `pagination` | Page navigation controls |
| Popover | `popover` | Floating content trigger |
| Progress | `progress` | Linear progress bar |
| Radio Group | `radio-group` | Accessible radio buttons |
| Resizable | `resizable` | Drag-to-resize panels |
| Scroll Area | `scroll-area` | Custom scrollbar container |
| Select | `select` | Accessible dropdown select |
| Separator | `separator` | Horizontal/vertical divider |
| Sheet | `sheet` | Side-panel modal (drawer variant) |
| Sidebar | `sidebar` | App sidebar layout primitive |
| Skeleton | `skeleton` | Loading placeholder |
| Slider | `slider` | Range input |
| Sonner | `sonner` | Toast notification system |
| Switch | `switch` | Toggle switch |
| Table | `table` | Styled HTML table |
| Tabs | `tabs` | Tab navigation |
| Textarea | `textarea` | Multi-line text input |
| Toggle | `toggle` | On/off button |
| Toggle Group | `toggle-group` | Grouped toggles (single/multiple) |
| Tooltip | `tooltip` | Hover label |

### Custom-built (not in shadcn/ui)

These are hand-crafted using Tailwind + Radix where needed, consistent with shadcn/ui's style.

| Component | Description |
|---|---|
| **Button Group** | Groups multiple Buttons with joined borders, no gap between them |
| **Combobox** | Search + select combo built on top of Command + Popover |
| **Data Table** | Full-featured table: sorting, filtering, pagination using TanStack Table |
| **Date Picker** | Popover + Calendar assembled into a single date-picker input |
| **Direction** | `DirectionProvider` wrapper from `@radix-ui/react-direction` for RTL support |
| **Empty** | Empty state placeholder with icon, title, description, and action slot |
| **Field** | Form field wrapper: Label + Input/Select + helper text + error message |
| **Input Group** | Input with prefix/suffix slots (icons, text, buttons) |
| **Item** | Generic list item with icon, label, description, and trailing slot |
| **Kbd** | Keyboard shortcut display (`<kbd>` styled component) |
| **Native Select** | Styled native `<select>` for simple cases without Radix overhead |
| **Spinner** | Animated loading spinner (replaces the ⏳ emoji in current Button) |
| **Typography** | `h1`–`h4`, `p`, `lead`, `large`, `small`, `muted`, `blockquote`, `code`, `list` variants |
| **Toast** | shadcn/ui toast wired with `useToast` hook (assembly component) |

---

## File Structure

```
src/
├── index.css                  # Tailwind v4 + CSS custom properties
├── index.ts                   # Main export barrel
├── lib/
│   └── utils.ts               # cn() helper (clsx + tailwind-merge)
├── components/
│   ├── ui/                    # All shadcn/ui components live here
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   └── ... (one file per component)
│   ├── ButtonGroup/
│   │   ├── ButtonGroup.tsx
│   │   ├── ButtonGroup.stories.tsx
│   │   └── index.ts
│   ├── Combobox/
│   ├── DataTable/
│   ├── DatePicker/
│   ├── Direction/
│   ├── Empty/
│   ├── Field/
│   ├── InputGroup/
│   ├── Item/
│   ├── Kbd/
│   ├── NativeSelect/
│   ├── Spinner/
│   └── Typography/
└── tokens/                    # Existing design tokens (kept)
    ├── colors.ts
    ├── spacing.ts
    └── typography.ts
```

> The existing `Button/` and `Text/` component directories will be replaced by the shadcn `button` and custom `Typography` components.

---

## What Gets Changed in Existing Files

| File | Change |
|---|---|
| `vite.config.ts` | Add `@tailwindcss/vite` plugin |
| `src/index.css` | Replace with Tailwind v4 + shadcn CSS variable theme |
| `tsconfig.app.json` | Add `paths` alias: `@/*` → `./src/*` |
| `src/components/Button/Button.tsx` | Replaced by shadcn `button.tsx` — old file removed |
| `src/components/Text/Text.tsx` | Replaced by `Typography` component — old file removed |
| `src/index.ts` | Full re-export of all components |

---

1. FIx all the eslint issues. 
2. Create exhaustive test cases for all the components.  
3. create exhaustive examples for all the components in story book.
4. write the scripts necessary to publish the component in Dev and prod stage. 
5. wrte necessary scripts to run test cases along with coverage and also create scripts for starting storybook. 
6. Create a Claude.md file to help Claude understand about the folder strucuytre. 

## What's Out of Scope
- No dark mode toggle UI (tokens support dark mode via CSS variables, but no UI control is built).
- No design token export to Figma.
