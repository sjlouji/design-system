import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageHeader } from './PageHeader'
import { Button } from '@/components/Button'

const meta = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    title: {
      control: 'text',
      description: 'The main heading rendered as an `<h1>`. Required.',
    },
    description: {
      control: 'text',
      description: 'Optional subtitle rendered below the title in muted text.',
    },
    breadcrumb: {
      control: false,
      description: 'ReactNode slot rendered above the title row, typically a breadcrumb trail or path string.',
    },
    actions: {
      control: false,
      description: 'ReactNode slot rendered in the top-right corner of the header, typically one or more action buttons.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the root element.',
    },
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Dashboard',
    description: 'An overview of your account activity and metrics.',
  },
}

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
