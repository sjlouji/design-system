import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './Separator'

const meta = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    decorative: { control: 'boolean' },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Orientations
// ---------------------------------------------------------------------------

export const Horizontal: Story = {
  name: 'Horizontal (default)',
  render: () => (
    <div className="w-64">
      <p className="text-sm text-foreground">Above the separator</p>
      <Separator className="my-4" />
      <p className="text-sm text-foreground">Below the separator</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-3">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Decorative vs semantic
// ---------------------------------------------------------------------------

export const Decorative: Story = {
  name: 'Decorative (aria-hidden)',
  render: () => (
    <div className="w-64">
      <p className="text-sm">
        A decorative separator has <code>role="none"</code> and is hidden from
        assistive technology.
      </p>
      <Separator decorative className="my-4" />
      <p className="text-sm">
        It is purely visual.
      </p>
    </div>
  ),
}

export const Semantic: Story = {
  name: 'Semantic (not decorative)',
  render: () => (
    <div className="w-64">
      <p className="text-sm">
        A semantic separator has <code>role="separator"</code> and is announced
        by screen readers.
      </p>
      <Separator decorative={false} className="my-4" />
      <p className="text-sm">
        Use this when the separator conveys structure.
      </p>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// With label (OR / AND pattern)
// ---------------------------------------------------------------------------

function LabeledSeparator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <Separator className="flex-1" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <Separator className="flex-1" />
    </div>
  )
}

export const WithLabel: Story = {
  name: 'With label — OR',
  render: () => (
    <div className="w-64">
      <LabeledSeparator label="OR" />
    </div>
  ),
}

export const WithAndLabel: Story = {
  name: 'With label — AND',
  render: () => (
    <div className="w-64">
      <LabeledSeparator label="AND" />
    </div>
  ),
}

export const WithContinueLabel: Story = {
  name: 'With label — continue with',
  render: () => (
    <div className="w-64">
      <LabeledSeparator label="Continue with" />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// In context: between menu items
// ---------------------------------------------------------------------------

export const InMenu: Story = {
  name: 'In context — menu items',
  render: () => (
    <div className="w-48 rounded-lg border bg-popover p-1 shadow-md text-sm">
      <button className="w-full text-left px-2 py-1.5 rounded hover:bg-accent">
        New file
      </button>
      <button className="w-full text-left px-2 py-1.5 rounded hover:bg-accent">
        Open…
      </button>
      <Separator className="my-1" />
      <button className="w-full text-left px-2 py-1.5 rounded hover:bg-accent">
        Save
      </button>
      <button className="w-full text-left px-2 py-1.5 rounded hover:bg-accent">
        Save As…
      </button>
      <Separator className="my-1" />
      <button className="w-full text-left px-2 py-1.5 rounded hover:bg-accent text-destructive">
        Delete
      </button>
    </div>
  ),
}

export const InToolbar: Story = {
  name: 'In context — toolbar',
  render: () => (
    <div className="inline-flex items-center gap-1 rounded-lg border px-2 py-1">
      <button className="px-2 py-1 text-sm rounded hover:bg-accent font-bold">B</button>
      <button className="px-2 py-1 text-sm rounded hover:bg-accent italic">I</button>
      <button className="px-2 py-1 text-sm rounded hover:bg-accent underline">U</button>
      <Separator orientation="vertical" className="mx-1 h-5" />
      <button className="px-2 py-1 text-sm rounded hover:bg-accent">Left</button>
      <button className="px-2 py-1 text-sm rounded hover:bg-accent">Center</button>
      <button className="px-2 py-1 text-sm rounded hover:bg-accent">Right</button>
      <Separator orientation="vertical" className="mx-1 h-5" />
      <button className="px-2 py-1 text-sm rounded hover:bg-accent">Link</button>
    </div>
  ),
}

export const InProfileCard: Story = {
  name: 'In context — profile card',
  render: () => (
    <div className="w-64 rounded-xl border bg-card p-4 text-sm shadow-sm">
      <div className="font-semibold">Jane Smith</div>
      <div className="text-muted-foreground text-xs">jane@example.com</div>
      <Separator className="my-3" />
      <div className="flex justify-between">
        <span className="text-muted-foreground">Role</span>
        <span>Admin</span>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-muted-foreground">Team</span>
        <span>Engineering</span>
      </div>
      <Separator className="my-3" />
      <button className="text-destructive hover:underline text-xs">
        Sign out
      </button>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Custom color / thickness via className
// ---------------------------------------------------------------------------

export const CustomColor: Story = {
  name: 'Custom color via className',
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div>
        <p className="text-xs text-muted-foreground mb-2">Default (bg-border)</p>
        <Separator />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Primary color</p>
        <Separator className="bg-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Destructive color</p>
        <Separator className="bg-destructive" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Thick (2px)</p>
        <Separator className="h-0.5" />
      </div>
    </div>
  ),
}
