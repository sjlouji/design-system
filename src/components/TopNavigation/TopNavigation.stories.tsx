import type { Meta, StoryObj } from '@storybook/react-vite'
import { LayoutDashboard, FolderOpen, Users, Settings } from 'lucide-react'
import { TopNavigation } from './TopNavigation'

const meta = {
  title: 'Navigation/TopNavigation',
  component: TopNavigation,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    items: {
      control: false,
      description:
        'Array of `NavItem` objects that define the navigation links. Each item supports `id` (unique key), `label` (display text), `href` (renders an `<a>` when provided, otherwise a `<button>`), `icon` (ReactNode rendered at 16 px), `badge` (string or number shown as a secondary badge), `active` (highlights the item and sets `aria-current="page"`), and `disabled` (makes the item non-interactive).',
    },
    onItemClick: {
      action: 'itemClicked',
      description:
        'Fired when a non-disabled item is clicked. Receives the full `NavItem` object as its only argument. Not fired for disabled items.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the wrapping `<nav>` element.',
    },
  },
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
