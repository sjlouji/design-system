import type { Meta, StoryObj } from '@storybook/react-vite'
import { LayoutRow } from './LayoutRow'

const meta = {
  title: 'Layout/LayoutRow',
  component: LayoutRow,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
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
  render: () => (
    <div className="p-6">
      <LayoutRow gap={4}>
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
