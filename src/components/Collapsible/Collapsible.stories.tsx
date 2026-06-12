import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDownIcon, ChevronUpIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'
import { Button } from '@/components/Button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/Card'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './Collapsible'

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    open: {
      control: 'boolean',
      description:
        'Controlled open state. When provided, the component becomes controlled and `onOpenChange` must be used to update it. Omit to use uncontrolled mode with `defaultOpen`.',
    },
    defaultOpen: {
      control: 'boolean',
      description:
        'Initial open state in uncontrolled mode. Has no effect when `open` is also provided. Defaults to false (collapsed).',
    },
    disabled: {
      control: 'boolean',
      description:
        'When true, the `CollapsibleTrigger` clicks are ignored and the content cannot be toggled. Does not visually dim the component — apply disabled styles to the trigger separately if needed.',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description:
        'Fired when the open state changes. Receives the new boolean open value. Required when using the component in controlled mode (i.e. when `open` is provided).',
    },
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Basic open/close
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Starred repositories</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle">
            <ChevronDownIcon className="size-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-4 py-2 text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

// ---------------------------------------------------------------------------
// Default open
// ---------------------------------------------------------------------------

export const DefaultOpen: Story = {
  name: 'Default open',
  render: () => (
    <Collapsible defaultOpen className="w-[350px] space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Recent files</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle">
            <ChevronDownIcon className="size-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        {['design-system.fig', 'wireframes.sketch', 'brand-assets.zip'].map((file) => (
          <div key={file} className="rounded-md border px-4 py-2 text-sm">
            {file}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ),
}

// ---------------------------------------------------------------------------
// Controlled open state with onOpenChange
// ---------------------------------------------------------------------------

export const Controlled: Story = {
  name: 'Controlled open state',
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex flex-col items-center gap-4">
        <Collapsible open={open} onOpenChange={setOpen} className="w-[350px] space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Advanced options</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {open ? 'Hide' : 'Show'}
                {open ? (
                  <ChevronUpIcon className="size-4" />
                ) : (
                  <ChevronDownIcon className="size-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
              <p>Enable debug mode</p>
            </div>
            <div className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
              <p>Show experimental features</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <p className="text-sm text-muted-foreground">
          State:{' '}
          <span className="font-medium text-foreground">{open ? 'open' : 'closed'}</span>
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
            Open
          </Button>
          <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </div>
    )
  },
}

// ---------------------------------------------------------------------------
// With icon rotation animation
// ---------------------------------------------------------------------------

export const WithIconRotation: Story = {
  name: 'With icon rotation',
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between rounded-md border px-4 py-2">
          <span className="text-sm font-medium">Filters</span>
          <CollapsibleTrigger asChild>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ChevronDownIcon
                className={`size-4 transition-transform duration-200 ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          {['Status', 'Priority', 'Assignee', 'Label'].map((filter) => (
            <div key={filter} className="flex items-center gap-2 px-2 text-sm text-muted-foreground">
              <div className="size-3 rounded border" />
              {filter}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  },
}

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  render: () => (
    <Collapsible disabled className="w-[350px] space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-muted-foreground">
          Locked section
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" disabled aria-label="Toggle">
            <ChevronDownIcon className="size-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 text-sm text-muted-foreground">
        Content is locked. Upgrade to unlock.
      </div>
      <CollapsibleContent>
        <div className="rounded-md border px-4 py-2 text-sm">Hidden content</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

// ---------------------------------------------------------------------------
// Long content
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  name: 'Long content',
  render: () => (
    <Collapsible className="w-[400px] space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Release notes — v2.0.0</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            Read more
          </Button>
        </CollapsibleTrigger>
      </div>
      <p className="text-sm text-muted-foreground">
        Major release with breaking changes and new features.
      </p>
      <CollapsibleContent>
        <div className="mt-2 space-y-3 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Breaking changes:</strong></p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Removed deprecated Button.loading prop — use disabled + spinner instead</li>
            <li>Alert variant "warning" renamed to "default"</li>
            <li>Minimum React version bumped to 19</li>
          </ul>
          <p><strong className="text-foreground">New features:</strong></p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Added AI component suite (ChatShell, ChatMessage, PromptInput)</li>
            <li>New TreeView component with keyboard navigation</li>
            <li>Dark mode tokens fully revised</li>
            <li>Storybook 10 with interaction tests</li>
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

// ---------------------------------------------------------------------------
// In card context
// ---------------------------------------------------------------------------

export const InCard: Story = {
  name: 'In card context',
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Environment variables</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {['NODE_ENV=production', 'PORT=3000'].map((env) => (
          <div key={env} className="rounded-md bg-muted px-3 py-1.5 font-mono text-xs">
            {env}
          </div>
        ))}
        <Collapsible className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Show 4 more</span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">Expand</Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            {['DATABASE_URL=postgres://...', 'REDIS_URL=redis://...', 'API_KEY=sk-...', 'SENTRY_DSN=https://...'].map(
              (env) => (
                <div key={env} className="rounded-md bg-muted px-3 py-1.5 font-mono text-xs">
                  {env}
                </div>
              )
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  ),
}

// ---------------------------------------------------------------------------
// File tree pattern
// ---------------------------------------------------------------------------

export const FileTree: Story = {
  name: 'File tree pattern',
  render: () => {
    const [open, setOpen] = React.useState(true)
    return (
      <div className="w-[260px] space-y-1 text-sm">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full rounded-md px-2 py-1 hover:bg-muted text-left">
            {open ? (
              <FolderOpenIcon className="size-4 text-muted-foreground" />
            ) : (
              <FolderIcon className="size-4 text-muted-foreground" />
            )}
            <span className="font-medium">src</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-6 space-y-1 border-l pl-2">
              {['components/', 'hooks/', 'lib/', 'index.ts', 'index.css'].map((file) => (
                <div
                  key={file}
                  className="flex items-center gap-2 rounded-md px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {file.endsWith('/') ? (
                    <FolderIcon className="size-4" />
                  ) : (
                    <span className="size-4" />
                  )}
                  {file}
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  },
}

// ---------------------------------------------------------------------------
// Multiple independent collapsibles
// ---------------------------------------------------------------------------

export const Multiple: Story = {
  name: 'Multiple independent',
  render: () => {
    const sections = [
      { id: 'general', title: 'General', items: ['Display name', 'Username', 'Bio'] },
      { id: 'privacy', title: 'Privacy', items: ['Profile visibility', 'Activity status', 'Search indexing'] },
      { id: 'advanced', title: 'Advanced', items: ['Developer mode', 'Beta features', 'Diagnostics'] },
    ]
    const [openSections, setOpenSections] = React.useState<string[]>(['general'])
    const toggle = (id: string) =>
      setOpenSections((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      )
    return (
      <div className="w-[360px] divide-y border rounded-lg overflow-hidden">
        {sections.map(({ id, title, items }) => (
          <Collapsible
            key={id}
            open={openSections.includes(id)}
            onOpenChange={() => toggle(id)}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted">
              {title}
              <ChevronDownIcon
                className={`size-4 text-muted-foreground transition-transform duration-200 ${
                  openSections.includes(id) ? 'rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 pb-3 space-y-1">
                {items.map((item) => (
                  <p key={item} className="text-sm text-muted-foreground py-1">
                    {item}
                  </p>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    )
  },
}
