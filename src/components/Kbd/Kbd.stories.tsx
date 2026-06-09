import type { Meta, StoryObj } from '@storybook/react-vite'
import { Kbd } from './Kbd'

const meta = {
  title: 'Primitives/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: null },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: { children: '⌘K' },
}

export const Combination: Story = {
  render: () => (
    <div className="flex items-center gap-1">
      <Kbd>⌘</Kbd>
      <span className="text-xs text-muted-foreground">+</span>
      <Kbd>Shift</Kbd>
      <span className="text-xs text-muted-foreground">+</span>
      <Kbd>P</Kbd>
    </div>
  ),
}

export const InlineWithText: Story = {
  render: () => (
    <p className="text-sm text-foreground">
      Press <Kbd>⌘K</Kbd> to open the command palette.
    </p>
  ),
}
