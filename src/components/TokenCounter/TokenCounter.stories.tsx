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
      description: 'Current token count',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum token limit',
    },
    compact: {
      control: 'boolean',
      description: 'Compact inline display — shows count/max + mini progress bar inline',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof TokenCounter>

export default meta
type Story = StoryObj<typeof meta>

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
  render: () => (
    <div className="flex items-center justify-between gap-4 px-4 py-2 border border-border rounded-lg bg-background w-80">
      <TokenCounter current={3200} max={8192} compact />
      <span className="text-xs text-muted-foreground">GPT-4o</span>
    </div>
  ),
}
