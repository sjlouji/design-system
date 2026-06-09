# @sjlouji/design-system

A React component library built on Radix UI primitives, Tailwind CSS v4, and shadcn/ui patterns. Ships as an npm package with full TypeScript support.

## What's in here

100+ production-ready components spanning UI primitives, layout helpers, data display, forms, and AI-specific patterns (streaming text, chat shells, thinking blocks, etc). Every component has Storybook stories and unit tests.

**Stack:** React 19 · TypeScript 6 · Tailwind CSS v4 · Radix UI · Vite · Storybook 10 · Vitest

**Storybook:** `https://<branch>--6a278cda6ea36483150a66f5.chromatic.com`
e.g. [https://main--6a278cda6ea36483150a66f5.chromatic.com](https://main--6a278cda6ea36483150a66f5.chromatic.com) for `main`

---

## Getting started locally

```bash
# Clone and install
git clone git@github.com:sjlouji/design-system.git
cd design-system
npm install

# Start Storybook (component explorer + docs)
npm run storybook

# Start the dev playground (src/main.tsx)
npm run dev
```

Storybook runs at `http://localhost:6006`. The dev playground runs at `http://localhost:5173`.

---

## Available commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev playground |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build` | Typecheck + build the library to `dist/` |
| `npm run build-storybook` | Build static Storybook site |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting |
| `npm run test` | Run all unit tests (single run) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with v8 coverage report |

---

## Project structure

```
src/
├── components/          # One folder per component
│   ├── Button/
│   │   ├── Button.tsx       # Component source
│   │   ├── Button.stories.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts         # Re-export
│   └── ...
├── hooks/               # Shared hooks (use-mobile, etc.)
├── lib/
│   ├── utils.ts         # cn() helper
│   └── test-utils.tsx   # render() wrapper with providers
└── index.ts             # Public package entry point

.github/workflows/
├── ci.yml               # PR validation (lint, typecheck, test, build)
├── release.yml          # main → version bump + GitHub Release + npm publish
└── prerelease.yml       # feature/** → dev prerelease (e.g. 0.1.0-feat-my-thing.42)

scripts/
└── bump-version.mjs     # Conventional commits → semver bump
```

---

## Using the package

```bash
npm install @sjlouji/design-system
```

Import components and the stylesheet:

```tsx
// In your app entry
import '@sjlouji/design-system/styles'

// Import components
import { Button, Input, Dialog } from '@sjlouji/design-system'
```

The package ships both ESM (`dist/index.mjs`) and CJS (`dist/index.cjs`) builds.

---

## Contributing

### Before you start

- Node.js 20+ required. Use `mise` if you have it: `mise install`.
- All commits go through lint-staged (ESLint on staged files) and a pre-push test run via Husky.

### Adding a new component

1. Create `src/components/MyComponent/` with:
   - `MyComponent.tsx` — the component
   - `MyComponent.stories.tsx` — at least a Default story
   - `MyComponent.test.tsx` — basic render test
   - `index.ts` — `export { MyComponent } from './MyComponent'`
2. Add the export to `src/index.ts`
3. Run `npm run storybook` to verify the story renders correctly
4. Run `npm test` to confirm tests pass

**Component conventions:**
- Functional components, no class components
- Use `cn()` from `@/lib/utils` for className merging
- Use `data-slot="component-name"` on root elements for CSS targeting
- Named exports only (no default exports)
- Use CVA (`class-variance-authority`) for variant-based styling

**Story conventions:**
- `import type { Meta, StoryObj } from '@storybook/react-vite'`
- Always add `args` defaults in the meta for required props
- For components with complex prop types (generics, union-heavy), drop the `: Story` annotation and let TypeScript infer

**Test conventions:**
- `import { render } from '@/lib/test-utils'` — wraps in `TooltipProvider` and other global providers
- Tests live alongside the component, not in a separate `__tests__` folder

### Commit messages

This repo uses [Conventional Commits](https://www.conventionalcommits.org/). The CI release workflow reads these to determine the version bump:

| Prefix | Version bump |
|---|---|
| `feat:` | minor (0.x.0) |
| `fix:`, `chore:`, `docs:`, etc. | patch (0.0.x) |
| `feat!:` or `BREAKING CHANGE` in body | major (x.0.0) |

### Pull requests

Open PRs against `main`. The CI workflow runs lint, typecheck, tests, and a full build on every PR. Merging to `main` automatically triggers a version bump, GitHub Release, and npm publish.

For experimental work, push to a `feature/`, `feat/`, `fix/`, or `bugfix/` branch — this triggers a dev prerelease publish tagged with the branch name (e.g. `@sjlouji/design-system@0.1.0-feat-my-branch.12`).

---

## Component catalogue

<details>
<summary>View all 100+ components</summary>

**Layout**
Accordion · AppLayout · AspectRatio · BoardLayout · BreadcrumbGroup · Card · Collapsible · Direction · Drawer · LayoutCol · LayoutRow · Resizable · ScrollArea · Section · Separator · Sheet · Sidebar · SplitLayout · Tabs

**Navigation**
Breadcrumb · Header · Menubar · NavigationMenu · PageHeader · Pagination · Stepper · Timeline · TopNavigation · TreeView

**Forms & Inputs**
AutoSuggest · Calendar · Checkbox · Combobox · DateInput · DatePicker · DateRangeInput · Field · FieldGroup · FileDropzone · FileUpload · Form · Input · InputGroup · InputOTP · Label · NativeSelect · PropertyFilter · RadioGroup · SearchInput · Select · Slider · Switch · Textarea · Toggle · ToggleGroup

**Actions**
Button · ButtonDropdown · ButtonGroup · Command · ContextMenu · CopyButton · DropdownMenu · HoverCard · Popover · Tooltip

**Data Display**
Avatar · AvatarGroup · Badge · Branding · Chart · DataTable · EmptyState · Item · Kbd · Progress · SearchBar · Skeleton · StatCard · StatusBadge · StatusIndicator · Table · Typography

**Feedback & Overlays**
Alert · AlertDialog · Dialog · Flashbar · Sonner · Spinner

**AI / Chat**
ChatInput · ChatMessage · ChatShell · ChatThread · CodeBlock · CodeEditor · ConversationList · MarkdownMessage · MessageActions · MessageFeedback · ModelSelector · PromptCard · PromptInput · PromptLibrary · StreamingText · ThinkingBlock · TokenCounter · TypingIndicator

**Utility**
ActionCard · FileAttachment · Carousel

</details>

---

## Versioning & publishing

Versioning is fully automated via GitHub Actions on push to `main`:

1. Reads conventional commit messages since the last git tag
2. Bumps `package.json` version accordingly
3. Commits the bump with `[skip ci]` and pushes a git tag
4. Creates a GitHub Release with auto-generated notes
5. Publishes to npm as `@sjlouji/design-system` with provenance
