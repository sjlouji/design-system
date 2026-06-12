import type { Meta, StoryObj } from '@storybook/react-vite'
import { UsersIcon } from 'lucide-react'
import { StatCard } from './StatCard'

const meta = {
  title: 'DataDisplay/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    label: {
      control: 'text',
      description: 'Short descriptive label shown above the primary value, rendered in muted foreground text.',
    },
    value: {
      control: 'text',
      description: 'The primary metric displayed in large bold text. Accepts a string (e.g. `"$12,400"`, `"98.6%"`) or a number.',
    },
    trend: {
      control: false,
      description: 'Optional trend indicator. Pass an object `{ value: number, label?: string }`. Positive values show a green upward arrow; negative values show a red downward arrow; zero shows neutral muted text. The `label` is appended after the number (e.g. `"vs last month"`).',
    },
    icon: {
      control: false,
      description: 'Optional icon rendered in the top-right corner of the card, displayed in muted foreground color. Accepts any React node — typically a Lucide icon at `size-5`.',
    },
    loading: {
      control: 'boolean',
      description: 'When `true`, replaces card content with skeleton placeholders. Use while data is being fetched.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the card container. Useful for controlling width or adding custom spacing.',
    },
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$12,400',
    loading: false,
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
