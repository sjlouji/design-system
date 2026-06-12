import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Direction } from './Direction'

const meta: Meta<typeof Direction> = {
  title: 'Utilities/Direction',
  component: Direction,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Text direction applied to all descendant Radix UI components. "ltr" — left-to-right (default, suits Latin scripts). "rtl" — right-to-left (suits Arabic, Hebrew, etc.).',
    },
    children: {
      control: false,
      description: 'Content to wrap. All Radix UI primitives inside will inherit the chosen direction.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Direction>

function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option-1">Option 1</SelectItem>
        <SelectItem value="option-2">Option 2</SelectItem>
        <SelectItem value="option-3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  )
}

export const Default: Story = {
  args: {
    dir: 'ltr',
  },
  render: (args) => (
    <Direction {...args}>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Direction: {args.dir ?? 'ltr'}</p>
        <SelectDemo />
      </div>
    </Direction>
  ),
}

export const LTR: Story = {
  render: () => (
    <Direction dir="ltr">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Left-to-right (default)</p>
        <SelectDemo />
      </div>
    </Direction>
  ),
}

export const RTL: Story = {
  render: () => (
    <Direction dir="rtl">
      <div dir="rtl" className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Right-to-left</p>
        <SelectDemo />
      </div>
    </Direction>
  ),
}
