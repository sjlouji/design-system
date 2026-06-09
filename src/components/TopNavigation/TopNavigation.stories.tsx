import type { Meta, StoryObj } from '@storybook/react-vite'
import { LayoutDashboard, FolderOpen, Users, Settings } from 'lucide-react'
import { TopNavigation } from './TopNavigation'

const meta = {
  title: 'Navigation/TopNavigation',
  component: TopNavigation,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TopNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { id: 'dashboard', label: 'Dashboard', active: true },
      { id: 'projects', label: 'Projects' },
      { id: 'team', label: 'Team' },
      { id: 'settings', label: 'Settings' },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, active: true },
      { id: 'projects', label: 'Projects', icon: <FolderOpen /> },
      { id: 'team', label: 'Team', icon: <Users /> },
      { id: 'settings', label: 'Settings', icon: <Settings /> },
    ],
  },
}

export const WithBadges: Story = {
  args: {
    items: [
      { id: 'dashboard', label: 'Dashboard', active: true },
      { id: 'projects', label: 'Projects', badge: 12 },
      { id: 'team', label: 'Team', badge: 'New' },
      { id: 'settings', label: 'Settings' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    items: [
      { id: 'dashboard', label: 'Dashboard', active: true },
      { id: 'projects', label: 'Projects' },
      { id: 'team', label: 'Team', disabled: true },
      { id: 'settings', label: 'Settings', disabled: true },
    ],
  },
}
