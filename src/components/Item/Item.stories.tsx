import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserIcon, SettingsIcon, BellIcon, LogOutIcon } from 'lucide-react'
import { Badge } from '@/components/Badge'
import { Item } from './Item'

const meta: Meta<typeof Item> = {
  title: 'Primitives/Item',
  component: Item,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Item>

export const Default: Story = {
  args: {
    label: 'Profile',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Notifications',
    description: 'Manage your notification preferences',
    icon: <BellIcon />,
  },
}

export const WithTrailing: Story = {
  args: {
    label: 'Unread messages',
    icon: <BellIcon />,
    trailing: <Badge variant="default">12</Badge>,
  },
}

export const Clickable: Story = {
  args: {
    label: 'Settings',
    icon: <SettingsIcon />,
    onClick: () => alert('Settings clicked'),
  },
}

export const Active: Story = {
  args: {
    label: 'Profile',
    icon: <UserIcon />,
    active: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Log out',
    icon: <LogOutIcon />,
    disabled: true,
    onClick: () => undefined,
  },
}

export const List: Story = {
  render: () => (
    <div className="w-64 border border-border rounded-lg p-1 flex flex-col gap-0.5">
      <Item label="Profile" icon={<UserIcon />} active />
      <Item
        label="Notifications"
        icon={<BellIcon />}
        description="3 unread"
        trailing={<Badge variant="secondary">3</Badge>}
        onClick={() => undefined}
      />
      <Item label="Settings" icon={<SettingsIcon />} onClick={() => undefined} />
      <Item label="Log out" icon={<LogOutIcon />} disabled onClick={() => undefined} />
    </div>
  ),
}
