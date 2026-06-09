import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'h-4 w-[250px]',
  },
}

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ width: 280, padding: '1rem', border: '1px solid #eee', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Skeleton className="h-[140px] w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
    </div>
  ),
}

export const ProfileSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <Skeleton className="size-12 rounded-full" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  ),
}
