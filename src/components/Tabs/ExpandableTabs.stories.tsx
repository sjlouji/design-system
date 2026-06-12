import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Home,
  Settings,
  User,
  Bell,
  CreditCard,
  ShieldCheck,
  Search,
  FileText,
  BarChart2,
  Inbox,
  Star,
  Trash2,
  Send,
  FolderOpen,
  Layout,
  Code2,
  Database,
  Globe,
} from 'lucide-react'
import { Tabs } from './Tabs'
import type { ExpandableTabsEntry } from './ExpandableTabs'

const meta = {
  title: 'Components/Tabs/Expandable',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    tabs: {
      control: false,
      description:
        'Array of tab entries. Each entry is either `{ title: string; icon: LucideIcon }` for a tab or `{ type: "separator" }` for a visual divider between groups.',
    },
    activeIndex: {
      control: 'number',
      description:
        'Controlled active tab index (based on position in the `tabs` array, including separator entries). Pass `null` to deselect all tabs.',
    },
    defaultActiveIndex: {
      control: 'number',
      description:
        'Initial active index for uncontrolled usage. Omit to start with no tab selected. Does nothing when `activeIndex` is also provided.',
    },
    onChange: {
      action: 'onChange',
      description:
        'Callback fired when a tab is selected or deselected. Receives the new index, or `null` when the currently active tab is clicked again to deselect it.',
    },
    activeColor: {
      control: 'text',
      description:
        'Tailwind text-colour utility class applied to the active tab (e.g. `"text-primary"`, `"text-blue-600"`). Defaults to `"text-foreground"`.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root container element.',
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const basicTabs: ExpandableTabsEntry[] = [
  { title: 'Home', icon: Home },
  { title: 'Profile', icon: User },
  { title: 'Settings', icon: Settings },
]

export const Default: Story = {
  args: {
    type: 'expandable',
    tabs: basicTabs,
    defaultActiveIndex: 0,
    activeColor: 'text-foreground',
  },
}

export const NoneSelected: Story = {
  args: {
    type: 'expandable',
    tabs: basicTabs,
  },
  parameters: {
    docs: {
      description: {
        story: 'No tab is active by default. Click a tab to expand it; click it again to deselect.',
      },
    },
  },
}

export const WithSeparator: Story = {
  args: {
    type: 'expandable',
    tabs: [
      { title: 'Inbox', icon: Inbox },
      { title: 'Sent', icon: Send },
      { title: 'Drafts', icon: FileText },
      { type: 'separator' },
      { title: 'Starred', icon: Star },
      { title: 'Trash', icon: Trash2 },
    ] satisfies ExpandableTabsEntry[],
    defaultActiveIndex: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `{ type: "separator" }` entries to visually group related tabs with a thin divider.',
      },
    },
  },
}

export const CustomActiveColor: Story = {
  args: {
    type: 'expandable',
    tabs: [
      { title: 'Overview', icon: Layout },
      { title: 'Analytics', icon: BarChart2 },
      { title: 'Documents', icon: FolderOpen },
      { title: 'Search', icon: Search },
    ] satisfies ExpandableTabsEntry[],
    defaultActiveIndex: 0,
    activeColor: 'text-primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pass any Tailwind text-colour class to `activeColor` to match your brand. Here `"text-primary"` is used.',
      },
    },
  },
}

export const Controlled: Story = {
  args: {
    type: 'expandable',
    tabs: basicTabs,
  },
  render: function ControlledExample() {
    const [active, setActive] = React.useState<number | null>(0)

    return (
      <div className="flex flex-col items-center gap-4">
        <Tabs type="expandable" tabs={basicTabs} activeIndex={active} onChange={setActive} />
        <p className="text-sm text-muted-foreground">
          Active index: <strong>{active ?? 'none'}</strong>
        </p>
        <div className="flex gap-2">
          {basicTabs.map((tab, i) => (
            'title' in tab && (
              <button
                key={i}
                className="rounded border px-2 py-1 text-xs hover:bg-muted"
                onClick={() => setActive(i)}
              >
                Select {tab.title}
              </button>
            )
          ))}
          <button
            className="rounded border px-2 py-1 text-xs hover:bg-muted"
            onClick={() => setActive(null)}
          >
            Clear
          </button>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `activeIndex` + `onChange` for fully controlled mode. External buttons below also drive the active state.',
      },
    },
  },
}

export const AccountNavigation: Story = {
  args: {
    type: 'expandable',
    tabs: [
      { title: 'Profile', icon: User },
      { title: 'Notifications', icon: Bell },
      { title: 'Billing', icon: CreditCard },
      { type: 'separator' },
      { title: 'Security', icon: ShieldCheck },
      { title: 'Settings', icon: Settings },
    ] satisfies ExpandableTabsEntry[],
    defaultActiveIndex: 0,
    activeColor: 'text-foreground',
  },
  parameters: {
    docs: {
      description: {
        story: 'A typical account settings navigation with grouped sections using a separator.',
      },
    },
  },
}

export const DeveloperTools: Story = {
  args: {
    type: 'expandable',
    tabs: [
      { title: 'API', icon: Code2 },
      { title: 'Database', icon: Database },
      { title: 'Domains', icon: Globe },
      { type: 'separator' },
      { title: 'Settings', icon: Settings },
    ] satisfies ExpandableTabsEntry[],
    defaultActiveIndex: 0,
    activeColor: 'text-primary',
  },
}

export const ManyTabs: Story = {
  args: {
    type: 'expandable',
    tabs: [
      { title: 'Home', icon: Home },
      { title: 'Profile', icon: User },
      { title: 'Search', icon: Search },
      { title: 'Inbox', icon: Inbox },
      { title: 'Documents', icon: FileText },
      { title: 'Analytics', icon: BarChart2 },
      { type: 'separator' },
      { title: 'Settings', icon: Settings },
    ] satisfies ExpandableTabsEntry[],
    defaultActiveIndex: 0,
  },
}

export const ClickToDeselect: Story = {
  args: {
    type: 'expandable',
    tabs: [
      { title: 'Filter A', icon: FolderOpen },
      { title: 'Filter B', icon: Star },
      { title: 'Filter C', icon: Bell },
    ] satisfies ExpandableTabsEntry[],
    defaultActiveIndex: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Clicking the currently active tab deselects it (fires `onChange(null)`). Useful for toggle-filter patterns where "none selected" is a valid state.',
      },
    },
  },
}
