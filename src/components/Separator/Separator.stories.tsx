import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './Separator'

const meta = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
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

interface LabeledSeparatorProps {
  label: string
}

function LabeledSeparator({ label }: LabeledSeparatorProps) {
  return (
    <div className="flex items-center gap-3">
      <Separator className="flex-1" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <Separator className="flex-1" />
    </div>
  )
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-64">
      <LabeledSeparator label="OR" />
    </div>
  ),
}
