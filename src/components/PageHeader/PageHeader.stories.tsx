import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageHeader } from './PageHeader'
import { Button } from '@/components/Button'

const meta = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const TitleOnly: Story = {
  args: {
    title: 'Dashboard',
  },
}

export const WithDescription: Story = {
  args: {
    title: 'Dashboard',
    description: 'An overview of your account activity and metrics.',
  },
}

export const WithActions: Story = {
  args: {
    title: 'Projects',
    description: 'Manage your active projects.',
    actions: <Button>New Project</Button>,
  },
}

export const WithBreadcrumb: Story = {
  args: {
    title: 'Edit Profile',
    breadcrumb: <span>Settings / Profile</span>,
  },
}

export const Full: Story = {
  args: {
    title: 'Team Members',
    description: 'Manage who has access to this workspace.',
    breadcrumb: <span>Settings / Team</span>,
    actions: (
      <>
        <Button variant="outline">Export</Button>
        <Button>Invite Member</Button>
      </>
    ),
  },
}
