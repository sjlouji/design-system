import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from './Spinner'

const meta = {
  title: 'Primitives/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { size: 'md' },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
}

export const InlineWithText: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner size="sm" />
      <span>Loading data…</span>
    </div>
  ),
}
