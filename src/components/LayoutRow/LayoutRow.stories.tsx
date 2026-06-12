import type { Meta, StoryObj } from '@storybook/react-vite'
import { LayoutRow } from './LayoutRow'

const meta = {
  title: 'Layout/LayoutRow',
  component: LayoutRow,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { children: null },
  argTypes: {
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 6, 8],
      description: 'Gap between children using Tailwind spacing scale. 0 — no gap. 1 — 4px. 2 — 8px. 3 — 12px. 4 — 16px. 6 — 24px. 8 — 32px.',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Cross-axis alignment of children (align-items). "start" — top-align. "center" — vertically centre. "end" — bottom-align. "stretch" — fill the row height. "baseline" — align text baselines.',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Main-axis distribution of children (justify-content). "start" — pack to left. "center" — centre. "end" — pack to right. "between" — space between items. "around" — equal space around items. "evenly" — equal space including edges.',
    },
    wrap: {
      control: 'boolean',
      description: 'When true, children that overflow the row width wrap to the next line (flex-wrap).',
    },
    children: {
      control: false,
      description: 'Child elements to lay out in a row. Typically boxes, cards, or buttons.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the flex container.',
    },
  },
} satisfies Meta<typeof LayoutRow>

export default meta
type Story = StoryObj<typeof meta>

function Box({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center w-20 h-12 rounded-md bg-muted text-muted-foreground text-sm font-medium border border-border">
      {label}
    </div>
  )
}

export const Default: Story = {
  args: {
    gap: 4,
    align: 'center',
    justify: 'start',
    wrap: false,
  },
  render: (args) => (
    <div className="p-6">
      <LayoutRow {...args}>
        <Box label="Box 1" />
        <Box label="Box 2" />
        <Box label="Box 3" />
      </LayoutRow>
    </div>
  ),
}

export const Centered: Story = {
  render: () => (
    <div className="p-6">
      <LayoutRow gap={4} align="center" justify="center">
        <Box label="Box 1" />
        <Box label="Box 2" />
        <Box label="Box 3" />
      </LayoutRow>
    </div>
  ),
}

export const SpaceBetween: Story = {
  render: () => (
    <div className="p-6">
      <LayoutRow gap={4} align="center" justify="between">
        <Box label="Left" />
        <Box label="Center" />
        <Box label="Right" />
      </LayoutRow>
    </div>
  ),
}

export const Wrapped: Story = {
  render: () => (
    <div className="p-6" style={{ maxWidth: 300 }}>
      <LayoutRow gap={2} wrap>
        {Array.from({ length: 8 }, (_, i) => (
          <Box key={i} label={`Box ${i + 1}`} />
        ))}
      </LayoutRow>
    </div>
  ),
}
