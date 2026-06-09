import type { Meta, StoryObj } from '@storybook/react-vite'
import { InboxIcon } from 'lucide-react'
import { EmptyState } from './EmptyState'
import { Button } from '@/components/Button'

const meta = {
  title: 'Layout/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'No messages',
  },
}

export const WithDescription: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'No messages yet',
    description: 'When you receive messages, they will appear here.',
  },
}

export const WithAction: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'No projects',
    description: 'Get started by creating your first project.',
    action: <Button>Create Project</Button>,
  },
}

export const SmallSize: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'Nothing here',
    description: 'This section is empty.',
    size: 'sm',
  },
}
