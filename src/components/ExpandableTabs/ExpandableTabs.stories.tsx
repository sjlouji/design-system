import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Bell,
  Home,
  HelpCircle,
  Settings,
  Shield,
  Mail,
  User,
  FileText,
  Lock,
  BarChart,
  Inbox,
  Search,
  Star,
  Bookmark,
  Code,
  Layers,
} from 'lucide-react'
import { ExpandableTabs } from './ExpandableTabs'

const meta = {
  title: 'Navigation/ExpandableTabs',
  component: ExpandableTabs,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    tabs: {
      control: false,
      description:
        'Array of tab entries to render. Each entry is either a tab object `{ title: string, icon: LucideIcon }` or a separator `{ type: "separator" }`. Separators render as thin vertical dividers between groups of tabs.',
    },
    activeIndex: {
      control: 'number',
      description:
        'Controlled active tab index (array index, separators included in count). When provided, you must also handle `onChange` to update it.',
    },
    defaultActiveIndex: {
      control: 'number',
      description:
        'Initial active tab index for uncontrolled usage. Defaults to null — no tab selected on mount.',
    },
    onChange: {
      action: 'onChange',
      description:
        'Fired when a tab is selected or deselected. Receives the new index (number) when a tab is activated, or null when the currently active tab is clicked again to collapse it.',
    },
    activeColor: {
      control: 'text',
      description:
        'Tailwind text-colour class applied to the icon and label of the active tab. Defaults to "text-foreground". Example: "text-blue-500", "text-violet-600".',
    },
    className: {
      control: 'text',
      description:
        'Additional CSS classes on the outer container. Useful for overriding border colour or adding spacing.',
    },
  },
} satisfies Meta<typeof ExpandableTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabs: [
      { title: 'Dashboard', icon: Home },
      { title: 'Notifications', icon: Bell },
      { type: 'separator' },
      { title: 'Settings', icon: Settings },
      { title: 'Support', icon: HelpCircle },
      { title: 'Security', icon: Shield },
    ],
    defaultActiveIndex: 0,
    activeColor: 'text-foreground',
  },
}

export const CustomColor: Story = {
  args: {
    tabs: [
      { title: 'Profile', icon: User },
      { title: 'Messages', icon: Mail },
      { type: 'separator' },
      { title: 'Documents', icon: FileText },
      { title: 'Privacy', icon: Lock },
    ],
    defaultActiveIndex: 0,
    activeColor: 'text-blue-500',
    className: 'border-blue-200 dark:border-blue-800',
  },
}

export const NoneSelected: Story = {
  args: {
    tabs: [
      { title: 'Dashboard', icon: Home },
      { title: 'Inbox', icon: Inbox },
      { title: 'Search', icon: Search },
    ],
  },
}

export const NoSeparators: Story = {
  args: {
    tabs: [
      { title: 'Overview', icon: BarChart },
      { title: 'Starred', icon: Star },
      { title: 'Saved', icon: Bookmark },
      { title: 'Code', icon: Code },
    ],
    defaultActiveIndex: 0,
  },
}

export const Controlled: Story = {
  args: {} as Story['args'],
  render: () => {
    const tabs = [
      { title: 'Layers', icon: Layers },
      { title: 'Components', icon: Code },
      { type: 'separator' as const },
      { title: 'Settings', icon: Settings },
    ]

    const [active, setActive] = React.useState<number | null>(0)

    return (
      <div className="flex flex-col items-center gap-4">
        <ExpandableTabs
          tabs={tabs}
          activeIndex={active}
          onChange={setActive}
          activeColor="text-violet-600"
        />
        <p className="text-sm text-muted-foreground">
          Active index: <code className="font-mono">{active ?? 'null'}</code>
        </p>
      </div>
    )
  },
}

export const MultipleColorVariants: Story = {
  args: {} as Story['args'],
  render: () => {
    const tabs = [
      { title: 'Home', icon: Home },
      { title: 'Mail', icon: Mail },
      { title: 'Settings', icon: Settings },
    ]

    const variants: { color: string; border: string; label: string }[] = [
      { color: 'text-foreground', border: '', label: 'Default' },
      { color: 'text-blue-500', border: 'border-blue-200', label: 'Blue' },
      { color: 'text-violet-600', border: 'border-violet-200', label: 'Violet' },
      { color: 'text-emerald-600', border: 'border-emerald-200', label: 'Emerald' },
      { color: 'text-rose-500', border: 'border-rose-200', label: 'Rose' },
    ]

    return (
      <div className="flex flex-col items-center gap-4">
        {variants.map(({ color, border, label }) => (
          <div key={color} className="flex items-center gap-4">
            <span className="w-16 text-right text-xs text-muted-foreground">{label}</span>
            <ExpandableTabs
              tabs={tabs}
              defaultActiveIndex={0}
              activeColor={color}
              className={border || undefined}
            />
          </div>
        ))}
      </div>
    )
  },
}
