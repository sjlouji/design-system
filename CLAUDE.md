# Design System — Claude Context

Production-ready React component library. React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui (New York style).

---

## Tech Stack

| Layer | Choice |
|---|---|
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Components | shadcn/ui base + custom-built components |
| Primitives | Radix UI |
| Variants | `class-variance-authority` (CVA) |
| Class merging | `clsx` + `tailwind-merge` via `cn()` in `src/lib/utils.ts` |
| Icons | `lucide-react` |
| Build | Vite lib mode (ESM + CJS) |
| Docs/Preview | Storybook 10 with `@storybook/react-vite` |
| Tests | Vitest + @testing-library/react + jsdom |

---

## Project Structure

```
src/
├── index.css               # Tailwind v4 + CSS custom properties (design tokens)
├── index.ts                # Main export barrel — re-exports every component
├── lib/
│   ├── utils.ts            # cn() helper (clsx + tailwind-merge)
│   └── test-utils.tsx      # Custom render() with TooltipProvider wrapper
├── hooks/
│   └── use-mobile.ts       # useIsMobile() hook
└── components/
    ├── Accordion/          # One folder per component
    │   ├── Accordion.tsx
    │   ├── Accordion.stories.tsx
    │   ├── Accordion.test.tsx  (where tests exist)
    │   └── index.ts
    └── ... (109 components total)
```

Each component folder follows the same pattern:
- `ComponentName.tsx` — implementation
- `ComponentName.stories.tsx` — Storybook stories
- `ComponentName.test.tsx` — Vitest unit tests (not all components have tests yet)
- `index.ts` — re-exports from the tsx file

---

## Component Categories

### shadcn/ui base components (in `src/components/`)
Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, HoverCard, Input, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toggle, ToggleGroup, Tooltip

### Custom components
**Form & Input:** Field, FieldGroup, Form, InputGroup, SearchInput, NativeSelect, DateInput, DatePicker, DateRangeInput, AutoSuggest, Combobox

**Layout:** PageHeader, Section, SplitLayout, EmptyState, LayoutRow, Header, BoardLayout, SplitLayout

**Data Display:** StatCard, DataTable, Timeline, CodeBlock, CopyButton, AvatarGroup, StatusBadge, Stepper, TreeView, Branding

**Navigation:** ButtonGroup, ButtonDropdown, BreadcrumbGroup, TopNavigation, Kbd, Item

**Typography & Primitives:** Typography, Spinner, Direction

**AI Components:** ChatShell, ChatThread, ChatMessage, ChatInput, TypingIndicator, MessageActions, MessageFeedback, MarkdownMessage, StreamingText, ThinkingBlock, FileAttachment, FileDropzone, FileUpload, PromptInput, ModelSelector, TokenCounter, PromptCard, PromptLibrary, ConversationList, CodeEditor

---

## Key Conventions

### Path alias
`@/` maps to `./src/` — use `@/lib/utils`, `@/components/Button`, etc.

### Component pattern
```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

function MyComponent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('base-classes', className)} {...props} />
}

export { MyComponent }
```

### CVA variants
Files that export both a component and a CVA variant function (e.g. `buttonVariants`) have `/* eslint-disable react-refresh/only-export-components */` at the top — this is intentional.

### Stories
All stories import from `@storybook/react-vite` (not `@storybook/react`):
```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
```

### Tests
Tests use the custom `render` from `@/lib/test-utils` (wraps with `TooltipProvider`):
```tsx
import { render, screen } from '@/lib/test-utils'
```

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | TypeScript check + Vite lib build (ESM + CJS) |
| `npm run lint` | ESLint |
| `npm run test` | Vitest unit tests (jsdom) |
| `npm run test:coverage` | Vitest unit tests with coverage report |
| `npm run test:watch` | Vitest in watch mode |
| `npm run storybook` | Storybook dev server on port 6006 |
| `npm run build-storybook` | Build static Storybook |
| `npm run publish:dev` | Build + publish with `next` tag (pre-release) |
| `npm run publish:prod` | Build + publish with `latest` tag (stable) |

`prepublishOnly` runs lint + test + build automatically before any publish.

---

## Design Tokens

CSS custom properties in `src/index.css` (shadcn/ui convention):
- `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`
- `--radius` — base border radius
- Dark mode variants via `@dark` selector

---

## Build Output

Vite lib mode outputs to `dist/`:
- `dist/index.mjs` — ESM
- `dist/index.cjs` — CommonJS

External peer deps: `react`, `react-dom`, `react/jsx-runtime`
