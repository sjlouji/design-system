import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserIcon, SettingsIcon, BellIcon, LogOutIcon } from 'lucide-react'
import { Badge } from '@/components/Badge'
import { Item } from './Item'

const meta: Meta<typeof Item> = {
  title: 'Primitives/Item',
  component: Item,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    label: {
      control: 'text',
      description: 'Primary text displayed in the item row. Always required — rendered in a medium-weight font and truncated if it overflows.',
    },
    description: {
      control: 'text',
      description: 'Optional secondary text rendered below the label in a smaller, muted style. Truncated on overflow.',
    },
    icon: {
      control: false,
      description: 'Optional icon element displayed to the left of the label. Pass any 16×16 React element (e.g. a lucide-react icon). Rendered at muted-foreground colour.',
    },
    trailing: {
      control: false,
      description: 'Optional content rendered at the far right of the row. Use for badges, counts, chevrons, or secondary actions.',
    },
    onClick: {
      action: 'onClick',
      description: 'When provided, the item becomes interactive — it gains a pointer cursor, hover highlight, `role="button"`, and keyboard support (Enter / Space). Omit for static/display-only items.',
    },
    active: {
      control: 'boolean',
      description: 'When true, the item is highlighted with the accent background and accent-foreground text to indicate the current selection.',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, the item is dimmed (50% opacity), pointer events are removed, and `aria-disabled` is set. Clicks are suppressed even if `onClick` is provided.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the root `<div>`.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Item>

export const Default: Story = {
  args: {
    label: 'Profile',
    description: undefined,
    active: false,
    disabled: false,
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
