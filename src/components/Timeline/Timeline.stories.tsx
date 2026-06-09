import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckIcon, AlertCircleIcon, ClockIcon } from 'lucide-react'
import { Timeline } from './Timeline'
import type { TimelineItem } from './Timeline'

const meta = {
  title: 'DataDisplay/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

const defaultItems: TimelineItem[] = [
  {
    id: '1',
    title: 'Order placed',
    description: 'Your order #1234 has been placed.',
    timestamp: 'June 9, 2026 at 9:00 AM',
  },
  {
    id: '2',
    title: 'Payment confirmed',
    description: 'Payment of $99.00 was processed successfully.',
    timestamp: 'June 9, 2026 at 9:05 AM',
  },
  {
    id: '3',
    title: 'Shipped',
    description: 'Your package is on its way.',
    timestamp: 'June 10, 2026 at 2:30 PM',
  },
  {
    id: '4',
    title: 'Delivered',
    timestamp: 'June 11, 2026 at 11:00 AM',
  },
]

export const Default: Story = {
  args: {
    items: defaultItems,
  },
}

export const WithStatuses: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Build passed',
        description: 'All tests completed successfully.',
        timestamp: '2 minutes ago',
        status: 'success',
      },
      {
        id: '2',
        title: 'Deploy in progress',
        description: 'Deploying to production environment.',
        timestamp: 'Just now',
        status: 'pending',
      },
      {
        id: '3',
        title: 'Previous deploy failed',
        description: 'Deployment rolled back due to health check failure.',
        timestamp: '1 hour ago',
        status: 'error',
      },
      {
        id: '4',
        title: 'Warning: high memory usage',
        description: 'Memory usage exceeded 85% threshold.',
        timestamp: '3 hours ago',
        status: 'warning',
      },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Task completed',
        description: 'Design review finished.',
        timestamp: 'Yesterday',
        icon: <CheckIcon />,
        status: 'success',
      },
      {
        id: '2',
        title: 'Review pending',
        description: 'Awaiting engineering sign-off.',
        timestamp: 'Today',
        icon: <ClockIcon />,
        status: 'pending',
      },
      {
        id: '3',
        title: 'Issue reported',
        description: 'Accessibility issue found in navigation.',
        timestamp: '2 days ago',
        icon: <AlertCircleIcon />,
        status: 'error',
      },
    ],
  },
}
