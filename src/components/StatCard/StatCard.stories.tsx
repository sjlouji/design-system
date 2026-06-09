import type { Meta, StoryObj } from '@storybook/react-vite'
import { UsersIcon } from 'lucide-react'
import { StatCard } from './StatCard'

const meta = {
  title: 'DataDisplay/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$12,400',
  },
}

export const WithTrend: Story = {
  args: {
    label: 'Monthly Active Users',
    value: '2,340',
    trend: { value: 12.5, label: 'vs last month' },
  },
}

export const NegativeTrend: Story = {
  args: {
    label: 'Churn Rate',
    value: '3.2%',
    trend: { value: -1.4, label: 'vs last month' },
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Active Users',
    value: '1,892',
    icon: <UsersIcon className="size-5" />,
    trend: { value: 8, label: 'this week' },
  },
}

export const Loading: Story = {
  args: {
    label: 'Total Revenue',
    value: '$12,400',
    loading: true,
  },
}
