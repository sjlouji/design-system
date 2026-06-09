# Custom Components — Full List

Components not covered by shadcn/ui, built specifically for micro-SaaS and AI product needs.

---

## Form & Input (7)

| Component | Description |
|---|---|
| **Field** | Label + input + helper text + error message wrapper |
| **FieldGroup** | Groups multiple Fields under a title + optional description |
| **Form** | Form wrapper with submit handling and validation state context |
| **FormSection** | Titled section within a form with a field grid |
| **InputGroup** | Input with prefix/suffix slots (icon, text, button — e.g. `$[amount]`) |
| **SearchInput** | Input pre-wired with search icon, clear button, and debounce-ready |
| **NativeSelect** | Styled native `<select>` for simple cases |

---

## Layout & Structure (4)

| Component | Description |
|---|---|
| **PageHeader** | Page-level title + description + breadcrumb + action slot |
| **Section** | Content section with heading, subheading, and optional divider |
| **SplitLayout** | Two-column: left label/description, right content (settings pages) |
| **EmptyState** | Empty page/section — icon, title, description, CTA button |

---

## Data Display (7)

| Component | Description |
|---|---|
| **StatCard** | Metric display: label, value, trend indicator (↑/↓) |
| **DataTable** | Sorting, filtering, column visibility, pagination (TanStack Table) |
| **Timeline** | Vertical list of timestamped events with icons and content |
| **CodeBlock** | Syntax-highlighted code display with copy button and language label |
| **CopyButton** | Copies text to clipboard, shows checkmark on success |
| **AvatarGroup** | Stacked avatars with overflow count (`+3`) |
| **StatusBadge** | Badge with coloured dot — `online`, `offline`, `busy`, `away` |

---

## Navigation & Feedback (3)

| Component | Description |
|---|---|
| **Stepper** | Multi-step wizard: step indicators, prev/next, current state |
| **ButtonGroup** | Joined buttons, shared border — toolbar/segmented control |
| **Kbd** | Styled `<kbd>` keyboard shortcut display — `⌘K`, `Ctrl+S` |

---

## Typography & Primitives (4)

| Component | Description |
|---|---|
| **Typography** | `h1`–`h4`, `p`, `lead`, `large`, `small`, `muted`, `blockquote`, `code`, `list` |
| **Spinner** | Animated loading spinner — `sm`, `md`, `lg`; fits inside buttons |
| **Item** | List item: icon + label + description + trailing action slot |
| **Direction** | `DirectionProvider` wrapper from Radix for RTL support |

---

## AI Components (18)

### Chat UI

| Component | Description |
|---|---|
| **ChatShell** | Full-page chat layout — sidebar + main thread + input area |
| **ChatThread** | Scrollable conversation area, auto-scrolls to bottom on new messages |
| **ChatMessage** | Single message bubble — `user` or `assistant` role, with avatar, timestamp, and actions |
| **ChatInput** | Textarea with send button; supports `Cmd+Enter` submit, attach slot, and character count |
| **TypingIndicator** | Animated three-dot pulse — shown while AI is generating |
| **MessageActions** | Hover toolbar on a message: copy, regenerate, thumbs up/down |
| **MessageFeedback** | Inline thumbs up/down + optional free-text feedback form |

### Content Rendering

| Component | Description |
|---|---|
| **MarkdownMessage** | Renders AI-generated markdown safely inside a chat message (headings, lists, bold, etc.) |
| **StreamingText** | Renders text as it streams in — cursor blink animation, no layout shift |
| **ThinkingBlock** | Collapsible "reasoning" / "thinking" block shown before the final answer |
| **CodeMessage** | Code block inside a message — language label, copy button, syntax highlight |
| **FileAttachment** | Displays an attached file in a message — icon, filename, size, download link |

### Prompt & Model Controls

| Component | Description |
|---|---|
| **PromptInput** | Standalone multi-line prompt editor — char/token count, submit on `Cmd+Enter`, clear |
| **ModelSelector** | Dropdown to pick an AI model — shows provider, name, context window size |
| **TokenCounter** | Inline display of tokens used vs. available — colour-coded near limit |
| **PromptCard** | Saved prompt card — title, preview text, copy/use/delete actions |
| **PromptLibrary** | Grid/list of `PromptCard`s with search and category filter |

### Conversation Management

| Component | Description |
|---|---|
| **ConversationList** | Sidebar list of past conversations — title, timestamp, delete/rename actions |

---

## Summary

| Category | Count |
|---|---|
| Form & Input | 7 |
| Layout & Structure | 4 |
| Data Display | 7 |
| Navigation & Feedback | 3 |
| Typography & Primitives | 4 |
| AI Components | 18 |
| **Total custom** | **43** |
