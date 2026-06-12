import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusBadge } from './StatusBadge'

const meta = {
  title: 'Primitives/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { status: 'online' as const },
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'away', 'pending'],
      description: 'Availability or connection state to display. `online` — green dot with glow (user is active). `offline` — muted gray dot (user is not connected). `busy` — red/orange dot (do not disturb). `away` — yellow dot (user is idle). `pending` — blue dot with glow (awaiting confirmation or action).',
    },
    label: {
      control: 'text',
      description: 'Custom text label next to the dot. When omitted, defaults to the capitalised status name (e.g. `"Online"`, `"Pending"`).',
    },
    showDot: {
      control: 'boolean',
      description: 'When `true` (default), renders the colored status dot before the label. Set to `false` to show label text only.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the wrapper `<span>`. Use to adjust text size or spacing.',
    },
  },
} satisfies Meta<typeof StatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    status: 'online',
    showDot: true,
  },
}

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
