import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from './Spinner'
import { Button } from '../Button/Button'

const meta = {
  title: 'Primitives/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Controls the rendered SVG dimensions. `xs` — 12 px, typically for icon-size buttons. `sm` — 16 px, for use inside standard buttons or inline with small text. `md` — 20 px (default), general-purpose. `lg` — 24 px, for prominent loading states such as full-page or overlay spinners.',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind classes applied to the SVG. Use `text-*` utilities to change the stroke color (e.g. `text-primary`, `text-destructive`). Use `[animation-duration:Xs]` to adjust spin speed.',
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Individual sizes
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    size: 'md',
    className: undefined,
  },
}

export const SizeXS: Story = {
  name: 'Size: xs (12px)',
  args: { size: 'xs' },
}

export const SizeSM: Story = {
  name: 'Size: sm (16px)',
  args: { size: 'sm' },
}

export const SizeMD: Story = {
  name: 'Size: md (20px)',
  args: { size: 'md' },
}

export const SizeLG: Story = {
  name: 'Size: lg (24px)',
  args: { size: 'lg' },
}

// ---------------------------------------------------------------------------
// All sizes together
// ---------------------------------------------------------------------------

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xs" />
        <span className="text-xs text-muted-foreground">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Custom className (color, etc.)
// ---------------------------------------------------------------------------

export const CustomColor: Story = {
  name: 'Custom color via className',
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="text-primary" />
        <span className="text-xs text-muted-foreground">primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="text-destructive" />
        <span className="text-xs text-muted-foreground">destructive</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="text-muted-foreground" />
        <span className="text-xs text-muted-foreground">muted</span>
      </div>
      <div className="flex flex-col items-center gap-2 bg-primary rounded-lg p-2">
        <Spinner className="text-white" />
        <span className="text-xs text-white">white</span>
      </div>
    </div>
  ),
}

export const SlowerAnimation: Story = {
  name: 'Custom animation speed via className',
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="[animation-duration:2s]" />
        <span className="text-xs text-muted-foreground">slow (2s)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner />
        <span className="text-xs text-muted-foreground">default (1s)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="[animation-duration:0.5s]" />
        <span className="text-xs text-muted-foreground">fast (0.5s)</span>
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// In context: inside button
// ---------------------------------------------------------------------------

export const InsideButton: Story = {
  name: 'Inside button — loading state',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>
        <Spinner size="sm" />
        Saving…
      </Button>
      <Button variant="outline" disabled>
        <Spinner size="sm" />
        Loading…
      </Button>
      <Button variant="secondary" disabled>
        <Spinner size="sm" />
        Processing…
      </Button>
      <Button variant="destructive" disabled>
        <Spinner size="sm" />
        Deleting…
      </Button>
    </div>
  ),
}

export const InsideIconButton: Story = {
  name: 'Inside icon-size button',
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon-xs" disabled variant="outline" aria-label="Loading">
        <Spinner size="xs" />
      </Button>
      <Button size="icon-sm" disabled variant="outline" aria-label="Loading">
        <Spinner size="xs" />
      </Button>
      <Button size="icon" disabled variant="outline" aria-label="Loading">
        <Spinner size="sm" />
      </Button>
      <Button size="icon-lg" disabled variant="outline" aria-label="Loading">
        <Spinner size="sm" />
      </Button>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Inline with text
// ---------------------------------------------------------------------------

export const InlineWithText: Story = {
  name: 'Inline with text',
  render: () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner size="sm" />
      <span>Loading data…</span>
    </div>
  ),
}

export const InlineVariants: Story = {
  name: 'Inline with text — variants',
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Spinner size="xs" />
        <span>Fetching results…</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner size="sm" />
        <span>Loading data…</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Spinner size="md" />
        <span>Processing your request…</span>
      </div>
      <div className="flex items-center gap-2 text-base font-medium">
        <Spinner size="lg" />
        <span>Please wait…</span>
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Centered full-area usage
// ---------------------------------------------------------------------------

export const CenteredFullArea: Story = {
  name: 'Centered in a container',
  render: () => (
    <div className="flex h-48 w-96 items-center justify-center rounded-xl border bg-muted/30">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-sm text-muted-foreground">Loading content…</span>
      </div>
    </div>
  ),
}

export const OverlaySpinner: Story = {
  name: 'Overlay on content',
  render: () => (
    <div className="relative w-72 rounded-xl border bg-card p-4">
      {/* Content underneath */}
      <div className="flex flex-col gap-2 blur-sm select-none" aria-hidden>
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-2/3 bg-muted rounded" />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/70">
        <Spinner size="lg" />
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Interactive toggle demo
// ---------------------------------------------------------------------------

export const ToggleLoading: Story = {
  name: 'Toggle loading state',
  render: () => {
    const [loading, setLoading] = React.useState(false)

    const handleClick = () => {
      setLoading(true)
      setTimeout(() => setLoading(false), 2000)
    }

    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={handleClick} disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" />
              Saving…
            </>
          ) : (
            'Save changes'
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          {loading ? 'Loading for 2 seconds…' : 'Click button to simulate loading'}
        </p>
      </div>
    )
  },
}
