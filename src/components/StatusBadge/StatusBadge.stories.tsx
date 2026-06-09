import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusBadge } from './StatusBadge'

const meta = {
  title: 'Primitives/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { status: 'online' as const },
} satisfies Meta<typeof StatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <StatusBadge status="online" />
      <StatusBadge status="offline" />
      <StatusBadge status="busy" />
      <StatusBadge status="away" />
      <StatusBadge status="pending" />
    </div>
  ),
}

export const WithLabel: Story = {
  args: { status: 'online', label: 'Available' },
}

export const WithoutDot: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <StatusBadge status="online" showDot={false} />
      <StatusBadge status="busy" showDot={false} label="Do not disturb" />
    </div>
  ),
}
