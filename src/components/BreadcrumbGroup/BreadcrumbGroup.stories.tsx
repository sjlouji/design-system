import type { Meta, StoryObj } from '@storybook/react-vite'
import { BreadcrumbGroup } from './BreadcrumbGroup'

const meta = {
  title: 'Navigation/BreadcrumbGroup',
  component: BreadcrumbGroup,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BreadcrumbGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Design System', current: true },
    ],
  },
}

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Workspace', href: '/workspace' },
      { label: 'Projects', href: '/workspace/projects' },
      { label: 'Design', href: '/workspace/projects/design' },
      { label: 'Components', href: '/workspace/projects/design/components' },
      { label: 'Button', current: true },
    ],
    maxItems: 3,
  },
}

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Dashboard', current: true }],
  },
}

export const WithCurrentPage: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile', current: true },
    ],
  },
}
