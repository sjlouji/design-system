import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenCounter } from './TokenCounter'

const meta = {
  title: 'AI/TokenCounter',
  component: TokenCounter,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    current: {
      control: { type: 'number', min: 0 },
      description: 'Number of tokens currently used. The progress bar and text color update automatically: neutral below 75%, warning (`text-warning`) above 75%, destructive (`text-destructive`) above 90%.',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum token capacity for the model context window.',
    },
    compact: {
      control: 'boolean',
      description: '`false` (default) — full layout with a labelled progress bar. `true` — single-line inline display showing `count/max` + a narrow bar, suitable for toolbars or footers.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root element.',
    },
  },
} satisfies Meta<typeof TokenCounter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    current: 1024,
    max: 8192,
    compact: false,
  },
}

export const LowUsage: Story = {
  args: {
    current: 1024,
    max: 10000,
    compact: false,
  },
}

export const MediumUsage: Story = {
  args: {
    current: 5000,
    max: 10000,
    compact: false,
  },
}

export const WarningUsage: Story = {
  args: {
    current: 8000,
    max: 10000,
    compact: false,
  },
}

export const CriticalUsage: Story = {
  args: {
    current: 9500,
    max: 10000,
    compact: false,
  },
}

export const Full: Story = {
  args: {
    current: 10000,
    max: 10000,
    compact: false,
  },
}

export const ZeroTokens: Story = {
  args: {
    current: 0,
    max: 10000,
    compact: false,
  },
}

export const CompactLow: Story = {
  args: {
    current: 1024,
    max: 10000,
    compact: true,
  },
}

export const CompactWarning: Story = {
  args: {
    current: 8000,
    max: 10000,
    compact: true,
  },
}

export const CompactCritical: Story = {
  args: {
    current: 9500,
    max: 10000,
    compact: true,
  },
}

export const LargeContextWindow: Story = {
  args: {
    current: 45000,
    max: 200000,
    compact: false,
  },
}

export const MillionTokenContext: Story = {
  args: {
    current: 750000,
    max: 1000000,
    compact: false,
  },
}

export const AllStatesExpanded: Story = {
  args: {} as Story['args'],
  render: () => (
    <div className="flex flex-col gap-6 w-72">
      {[
        { label: 'Low (10%)', current: 1000, max: 10000 },
        { label: 'Medium (50%)', current: 5000, max: 10000 },
        { label: 'Warning (80%)', current: 8000, max: 10000 },
        { label: 'Critical (95%)', current: 9500, max: 10000 },
        { label: 'Full (100%)', current: 10000, max: 10000 },
      ].map(({ label, current, max }) => (
        <div key={label}>
          <p className="text-xs text-muted-foreground mb-2">{label}</p>
          <TokenCounter current={current} max={max} />
        </div>
      ))}
    </div>
  ),
}

export const AllStatesCompact: Story = {
  args: {} as Story['args'],
  render: () => (
    <div className="flex flex-col gap-3">
      {[
        { label: 'Low (10%)', current: 1000, max: 10000 },
        { label: 'Medium (50%)', current: 5000, max: 10000 },
        { label: 'Warning (80%)', current: 8000, max: 10000 },
        { label: 'Critical (95%)', current: 9500, max: 10000 },
        { label: 'Full (100%)', current: 10000, max: 10000 },
      ].map(({ label, current, max }) => (
        <div key={label} className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground w-28">{label}</span>
          <TokenCounter current={current} max={max} compact />
        </div>
      ))}
    </div>
  ),
}

export const InPromptFooter: Story = {
  args: {} as Story['args'],
  render: () => (
    <div className="flex items-center justify-between gap-4 px-4 py-2 border border-border rounded-lg bg-background w-80">
      <TokenCounter current={3200} max={8192} compact />
      <span className="text-xs text-muted-foreground">GPT-4o</span>
    </div>
  ),
}
