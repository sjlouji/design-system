import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from './Header'
import { Branding } from '@/components/Branding'
import { Button } from '@/components/Button'
import { Bell } from 'lucide-react'

const meta = {
  title: 'Navigation/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    branding: <Branding name="Acme" />,
    navigation: (
      <div className="flex items-center gap-1">
        <a href="#" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50 transition-colors">Dashboard</a>
        <a href="#" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50 transition-colors">Projects</a>
        <a href="#" className="px-3 py-2 text-sm text-foreground font-medium rounded-md bg-accent transition-colors">Team</a>
      </div>
    ),
    actions: (
      <Button variant="ghost" size="icon">
        <Bell />
      </Button>
    ),
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    onSignOut: () => alert('Signed out'),
  },
}

export const WithoutNav: Story = {
  args: {
    branding: <Branding name="Acme" />,
    actions: (
      <Button variant="ghost" size="icon">
        <Bell />
      </Button>
    ),
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  },
}

export const MinimalHeader: Story = {
  args: {
    branding: <Branding name="Acme" />,
  },
}
