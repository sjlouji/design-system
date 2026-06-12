import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import {
  PlusIcon,
  Loader2Icon,
  ArrowRightIcon,
  TrashIcon,
  DownloadIcon,
  SparklesIcon,
  SearchIcon,
  HeartIcon,
  SettingsIcon,
} from 'lucide-react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link', 'ai'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
    shape: {
      control: 'select',
      options: ['default', 'boxy', 'rounded'],
    },
    disabled: { control: 'boolean' },
    asChild: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Individual variants
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: { children: 'Button' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
}

export const Link: Story = {
  args: { variant: 'link', children: 'Link button' },
}

export const AI: Story = {
  name: 'Variant: AI',
  args: { variant: 'ai', children: 'Ask AI' },
}

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button variant="ai">AI</Button>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Individual sizes
// ---------------------------------------------------------------------------

export const SizeXS: Story = {
  name: 'Size: xs',
  args: { size: 'xs', children: 'Extra small' },
}

export const SizeSM: Story = {
  name: 'Size: sm',
  args: { size: 'sm', children: 'Small' },
}

export const SizeDefault: Story = {
  name: 'Size: default',
  args: { size: 'default', children: 'Default' },
}

export const SizeLG: Story = {
  name: 'Size: lg',
  args: { size: 'lg', children: 'Large' },
}

export const SizeXL: Story = {
  name: 'Size: xl',
  args: { size: 'xl', children: 'Extra large' },
}

export const SizeIcon: Story = {
  name: 'Size: icon',
  args: { size: 'icon', children: <SettingsIcon /> },
}

export const SizeIconXS: Story = {
  name: 'Size: icon-xs',
  args: { size: 'icon-xs', children: <PlusIcon /> },
}

export const SizeIconSM: Story = {
  name: 'Size: icon-sm',
  args: { size: 'icon-sm', children: <PlusIcon /> },
}

export const SizeIconLG: Story = {
  name: 'Size: icon-lg',
  args: { size: 'icon-lg', children: <SearchIcon /> },
}

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
    </div>
  ),
}

export const AllIconSizes: Story = {
  name: 'All icon sizes',
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      <Button size="icon-xs" variant="outline"><SettingsIcon /></Button>
      <Button size="icon-sm" variant="outline"><SettingsIcon /></Button>
      <Button size="icon" variant="outline"><SettingsIcon /></Button>
      <Button size="icon-lg" variant="outline"><SettingsIcon /></Button>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------

export const ShapeDefault: Story = {
  name: 'Shape: default',
  args: { shape: 'default', children: 'Default shape' },
}

export const ShapeBoxy: Story = {
  name: 'Shape: boxy',
  render: () => (
    <div className="flex items-center gap-3">
      <Button shape="boxy">Default</Button>
      <Button shape="boxy" variant="outline">Outline</Button>
      <Button shape="boxy" variant="secondary">Secondary</Button>
      <Button shape="boxy" variant="destructive">Destructive</Button>
      <Button shape="boxy" variant="ghost">Ghost</Button>
      <Button shape="boxy" variant="ai">AI</Button>
    </div>
  ),
}

export const ShapeRounded: Story = {
  name: 'Shape: rounded',
  render: () => (
    <div className="flex items-center gap-3">
      <Button shape="rounded">Default</Button>
      <Button shape="rounded" variant="outline">Outline</Button>
      <Button shape="rounded" variant="secondary">Secondary</Button>
      <Button shape="rounded" variant="destructive">Destructive</Button>
      <Button shape="rounded" variant="ghost">Ghost</Button>
      <Button shape="rounded" variant="ai">AI</Button>
    </div>
  ),
}

export const ShapeComparison: Story = {
  name: 'Shapes compared',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="w-20 text-xs text-muted-foreground">Default</span>
        <Button>Button</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 text-xs text-muted-foreground">Boxy</span>
        <Button shape="boxy">Button</Button>
        <Button shape="boxy" variant="outline">Outline</Button>
        <Button shape="boxy" variant="secondary">Secondary</Button>
        <Button shape="boxy" variant="destructive">Destructive</Button>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 text-xs text-muted-foreground">Rounded</span>
        <Button shape="rounded">Button</Button>
        <Button shape="rounded" variant="outline">Outline</Button>
        <Button shape="rounded" variant="secondary">Secondary</Button>
        <Button shape="rounded" variant="destructive">Destructive</Button>
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// States
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
}

export const DisabledAllVariants: Story = {
  name: 'Disabled — all variants',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default" disabled>Default</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="destructive" disabled>Destructive</Button>
      <Button variant="link" disabled>Link</Button>
      <Button variant="ai" disabled>AI</Button>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2Icon className="animate-spin" />
      Loading…
    </Button>
  ),
}

export const LoadingVariants: Story = {
  name: 'Loading — all variants',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default" disabled>
        <Loader2Icon className="animate-spin" />
        Saving…
      </Button>
      <Button variant="outline" disabled>
        <Loader2Icon className="animate-spin" />
        Saving…
      </Button>
      <Button variant="secondary" disabled>
        <Loader2Icon className="animate-spin" />
        Saving…
      </Button>
      <Button variant="destructive" disabled>
        <Loader2Icon className="animate-spin" />
        Deleting…
      </Button>
      <Button variant="ai" disabled>
        <Loader2Icon className="animate-spin" />
        Thinking…
      </Button>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

export const WithIconLeft: Story = {
  name: 'With icon — left',
  render: () => (
    <Button>
      <PlusIcon />
      Add item
    </Button>
  ),
}

export const WithIconRight: Story = {
  name: 'With icon — right',
  render: () => (
    <Button>
      Continue
      <ArrowRightIcon />
    </Button>
  ),
}

export const WithIconBothSides: Story = {
  name: 'With icon — both sides',
  render: () => (
    <Button variant="secondary">
      <DownloadIcon />
      Download
      <ArrowRightIcon />
    </Button>
  ),
}

export const IconOnlyButton: Story = {
  name: 'Icon-only (size: icon)',
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon" variant="default" aria-label="Add"><PlusIcon /></Button>
      <Button size="icon" variant="outline" aria-label="Delete"><TrashIcon /></Button>
      <Button size="icon" variant="ghost" aria-label="Settings"><SettingsIcon /></Button>
      <Button size="icon" variant="secondary" aria-label="Download"><DownloadIcon /></Button>
      <Button size="icon" variant="destructive" aria-label="Delete"><TrashIcon /></Button>
    </div>
  ),
}

export const AIWithIcon: Story = {
  name: 'AI variant with icon',
  render: () => (
    <Button variant="ai">
      <SparklesIcon />
      Ask AI
    </Button>
  ),
}

// ---------------------------------------------------------------------------
// asChild (polymorphic)
// ---------------------------------------------------------------------------

export const AsChildAnchor: Story = {
  name: 'asChild — renders as <a>',
  render: () => (
    <Button asChild>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Open link
      </a>
    </Button>
  ),
}

export const AsChildAnchorOutline: Story = {
  name: 'asChild — outline anchor',
  render: () => (
    <Button asChild variant="outline">
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        <ArrowRightIcon />
        Visit docs
      </a>
    </Button>
  ),
}

// ---------------------------------------------------------------------------
// Callbacks
// ---------------------------------------------------------------------------

export const WithOnClick: Story = {
  name: 'onClick callback',
  args: {
    children: 'Click me',
    onClick: undefined,
  },
  render: (args) => {
    const [count, setCount] = React.useState(0)
    return (
      <div className="flex flex-col items-center gap-3">
        <Button {...args} onClick={() => setCount((c) => c + 1)}>
          Click me
        </Button>
        <span className="text-sm text-muted-foreground">Clicked {count} times</span>
      </div>
    )
  },
}

// ---------------------------------------------------------------------------
// Preserved interaction / play stories
// ---------------------------------------------------------------------------

export const CssCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { children: 'Check' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Check' })
    const styles = window.getComputedStyle(button)
    expect(styles.display).toBe('inline-flex')
    expect(styles.fontWeight).toBe('500')
  },
}

export const DisabledOpacity: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { children: 'Disabled', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Disabled' })
    expect(button).toBeDisabled()
    const styles = window.getComputedStyle(button)
    expect(styles.opacity).toBe('0.5')
  },
}

export const ClickInteraction: Story = {
  tags: ['ai-generated', 'needs-work'],
  render: () => {
    return (
      <Button onClick={() => { document.title = 'clicked' }}>
        Click me
      </Button>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Click me' })
    await userEvent.click(button)
  },
}

// ---------------------------------------------------------------------------
// Comprehensive grid
// ---------------------------------------------------------------------------

export const VariantSizeMatrix: Story = {
  name: 'Variant × size matrix',
  parameters: { layout: 'padded' },
  render: () => {
    const variants = ['default', 'outline', 'secondary', 'ghost', 'destructive', 'ai'] as const
    const sizes = ['xs', 'sm', 'default', 'lg', 'xl'] as const
    return (
      <div className="overflow-x-auto">
        <table className="border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-3 text-left text-xs text-muted-foreground font-normal w-28">variant \ size</th>
              {sizes.map((s) => (
                <th key={s} className="p-3 text-xs text-muted-foreground font-normal">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variants.map((v) => (
              <tr key={v}>
                <td className="p-3 text-xs text-muted-foreground">{v}</td>
                {sizes.map((s) => (
                  <td key={s} className="p-3">
                    <Button variant={v} size={s}>Label</Button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
}
