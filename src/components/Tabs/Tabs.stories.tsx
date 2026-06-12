import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Settings,
  User,
  Bell,
  CreditCard,
  ShieldCheck,
  Code2,
  Database,
  Globe,
  BarChart2,
  FileText,
  Layout,
  Lock,
  Palette,
  Activity,
  Package,
  HelpCircle,
  Home,
  Inbox,
  Send,
  Star,
  Trash2,
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'
import type { ExpandableTabsEntry } from './ExpandableTabs'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'expandable'],
      description:
        '`"default"` renders standard pill/line tabs using Radix UI (compose with `TabsList`, `TabsTrigger`, `TabsContent`). `"expandable"` renders icon-only tabs that expand to show a label when active — pass a `tabs` array instead of children.',
    },
    defaultValue: {
      control: 'text',
      description: '(`type="default"`) The value of the tab that should be active by default (uncontrolled). Omit when using `value` for controlled mode.',
    },
    value: {
      control: 'text',
      description: '(`type="default"`) Controlled active tab value. Use with `onValueChange` to manage state externally.',
    },
    onValueChange: {
      action: 'valueChanged',
      description: '(`type="default"`) Callback fired when the active tab changes. Receives the new tab value string.',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '(`type="default"`) Direction of the tab list. `horizontal` stacks tabs in a row; `vertical` stacks them in a column.',
    },
    tabs: {
      control: false,
      description:
        '(`type="expandable"`) Array of tab entries. Each entry is `{ title: string; icon: LucideIcon }` or `{ type: "separator" }` for a visual divider.',
    },
    activeIndex: {
      control: 'number',
      description: '(`type="expandable"`) Controlled active tab index. Pass `null` to deselect all.',
    },
    defaultActiveIndex: {
      control: 'number',
      description: '(`type="expandable"`) Initial active index for uncontrolled usage.',
    },
    onChange: {
      action: 'onChange',
      description: '(`type="expandable"`) Fired when a tab is selected or deselected. Receives the new index or `null`.',
    },
    activeColor: {
      control: 'text',
      description: '(`type="expandable"`) Tailwind text-colour class for the active tab (e.g. `"text-primary"`). Defaults to `"text-foreground"`.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root element.',
    },
    children: {
      control: false,
      description: '(`type="default"`) Compose with `TabsList`, `TabsTrigger`, and `TabsContent`. `TabsList` accepts a `variant` prop (`"default"` | `"line"`) that controls pill vs. underline styling.',
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'account',
    orientation: 'horizontal',
  },
  render: () => (
    <Tabs defaultValue="account" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="py-4 text-sm text-muted-foreground">
          Make changes to your account here. Click save when you are done.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="py-4 text-sm text-muted-foreground">
          Change your password here. After saving, you will be logged out.
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="py-4 text-sm text-muted-foreground">
          Update your notification and privacy settings here.
        </p>
      </TabsContent>
    </Tabs>
  ),
}

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[480px]">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="py-4 text-sm text-muted-foreground">Overview content displayed here.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="py-4 text-sm text-muted-foreground">Analytics charts and metrics.</p>
      </TabsContent>
      <TabsContent value="reports">
        <p className="py-4 text-sm text-muted-foreground">Generated reports and exports.</p>
      </TabsContent>
      <TabsContent value="notifications">
        <p className="py-4 text-sm text-muted-foreground">Notification preferences.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const VerticalOrientation: Story = {
  render: () => (
    <Tabs defaultValue="profile" orientation="vertical" className="w-[560px]">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div className="pl-4">
          <h3 className="text-sm font-medium mb-2">Profile Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your public profile information including your display name and avatar.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="account">
        <div className="pl-4">
          <h3 className="text-sm font-medium mb-2">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Update your email address, username, and account preferences.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="pl-4">
          <h3 className="text-sm font-medium mb-2">Notification Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Configure which emails and push notifications you'd like to receive.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="security">
        <div className="pl-4">
          <h3 className="text-sm font-medium mb-2">Security</h3>
          <p className="text-sm text-muted-foreground">
            Manage your password, two-factor authentication, and active sessions.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="profile">
          <User />
          Profile
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="billing">
          <CreditCard />
          Billing
        </TabsTrigger>
        <TabsTrigger value="security">
          <ShieldCheck />
          Security
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <p className="py-4 text-sm text-muted-foreground">Manage your public profile.</p>
      </TabsContent>
      <TabsContent value="notifications">
        <p className="py-4 text-sm text-muted-foreground">Configure notification preferences.</p>
      </TabsContent>
      <TabsContent value="billing">
        <p className="py-4 text-sm text-muted-foreground">Manage your billing and subscription.</p>
      </TabsContent>
      <TabsContent value="security">
        <p className="py-4 text-sm text-muted-foreground">Manage passwords and 2FA settings.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="inbox" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="inbox">
          Inbox
          <Badge className="ml-1 h-4 px-1 text-xs">12</Badge>
        </TabsTrigger>
        <TabsTrigger value="sent">Sent</TabsTrigger>
        <TabsTrigger value="drafts">
          Drafts
          <Badge variant="outline" className="ml-1 h-4 px-1 text-xs">3</Badge>
        </TabsTrigger>
        <TabsTrigger value="spam">
          Spam
          <Badge variant="destructive" className="ml-1 h-4 px-1 text-xs">2</Badge>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inbox">
        <p className="py-4 text-sm text-muted-foreground">12 unread messages in your inbox.</p>
      </TabsContent>
      <TabsContent value="sent">
        <p className="py-4 text-sm text-muted-foreground">Your sent messages.</p>
      </TabsContent>
      <TabsContent value="drafts">
        <p className="py-4 text-sm text-muted-foreground">3 saved drafts.</p>
      </TabsContent>
      <TabsContent value="spam">
        <p className="py-4 text-sm text-muted-foreground">2 messages in spam.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="general" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="advanced" disabled>Advanced</TabsTrigger>
        <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <p className="py-4 text-sm text-muted-foreground">General settings are managed here.</p>
      </TabsContent>
      <TabsContent value="integrations">
        <p className="py-4 text-sm text-muted-foreground">Connect third-party integrations.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="js" className="w-[640px]">
      <TabsList>
        <TabsTrigger value="js">JavaScript</TabsTrigger>
        <TabsTrigger value="ts">TypeScript</TabsTrigger>
        <TabsTrigger value="py">Python</TabsTrigger>
        <TabsTrigger value="go">Go</TabsTrigger>
        <TabsTrigger value="rust">Rust</TabsTrigger>
        <TabsTrigger value="java">Java</TabsTrigger>
      </TabsList>
      <TabsContent value="js"><p className="py-4 text-sm text-muted-foreground">JavaScript code examples and snippets.</p></TabsContent>
      <TabsContent value="ts"><p className="py-4 text-sm text-muted-foreground">TypeScript with full type safety.</p></TabsContent>
      <TabsContent value="py"><p className="py-4 text-sm text-muted-foreground">Python implementation details.</p></TabsContent>
      <TabsContent value="go"><p className="py-4 text-sm text-muted-foreground">Go package and module documentation.</p></TabsContent>
      <TabsContent value="rust"><p className="py-4 text-sm text-muted-foreground">Rust crate usage and ownership model.</p></TabsContent>
      <TabsContent value="java"><p className="py-4 text-sm text-muted-foreground">Java class and Maven integration.</p></TabsContent>
    </Tabs>
  ),
}

export const Controlled: Story = {
  render: function ControlledTabs() {
    const [tab, setTab] = React.useState('account')

    return (
      <div className="flex flex-col gap-4 w-[480px]">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p className="py-4 text-sm text-muted-foreground">Account settings content.</p>
          </TabsContent>
          <TabsContent value="password">
            <p className="py-4 text-sm text-muted-foreground">Password management content.</p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="py-4 text-sm text-muted-foreground">General settings content.</p>
          </TabsContent>
        </Tabs>
        <p className="text-sm text-muted-foreground">Active tab: <strong>{tab}</strong></p>
      </div>
    )
  },
}

export const DeveloperSettings: Story = {
  render: () => (
    <Tabs defaultValue="api" className="w-[560px]">
      <TabsList variant="line">
        <TabsTrigger value="api">
          <Code2 />
          API
        </TabsTrigger>
        <TabsTrigger value="database">
          <Database />
          Database
        </TabsTrigger>
        <TabsTrigger value="domains">
          <Globe />
          Domains
        </TabsTrigger>
        <TabsTrigger value="env">
          <Settings />
          Environment
        </TabsTrigger>
      </TabsList>
      <TabsContent value="api">
        <div className="py-4 space-y-2">
          <h3 className="text-sm font-medium">API Keys</h3>
          <p className="text-sm text-muted-foreground">Manage your API keys for programmatic access to the platform.</p>
        </div>
      </TabsContent>
      <TabsContent value="database">
        <div className="py-4 space-y-2">
          <h3 className="text-sm font-medium">Database Connections</h3>
          <p className="text-sm text-muted-foreground">Configure database connection strings and credentials.</p>
        </div>
      </TabsContent>
      <TabsContent value="domains">
        <div className="py-4 space-y-2">
          <h3 className="text-sm font-medium">Custom Domains</h3>
          <p className="text-sm text-muted-foreground">Set up custom domains for your deployed applications.</p>
        </div>
      </TabsContent>
      <TabsContent value="env">
        <div className="py-4 space-y-2">
          <h3 className="text-sm font-medium">Environment Variables</h3>
          <p className="text-sm text-muted-foreground">Add and manage environment variables across deployment stages.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const DefaultToSecondTab: Story = {
  render: () => (
    <Tabs defaultValue="password" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="password">
        <p className="py-4 text-sm text-muted-foreground">Password tab is active by default.</p>
      </TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
    </Tabs>
  ),
}

export const SettingsPage: Story = {
  render: () => (
    <div className="w-[640px] rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account and workspace preferences.</p>
      </div>
      <Tabs defaultValue="profile" orientation="vertical" className="gap-6">
        <TabsList className="w-44 shrink-0">
          <TabsTrigger value="profile" className="justify-start gap-2">
            <User className="size-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="appearance" className="justify-start gap-2">
            <Palette className="size-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="justify-start gap-2">
            <Bell className="size-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="justify-start gap-2">
            <CreditCard className="size-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="security" className="justify-start gap-2">
            <Lock className="size-4" />
            Security
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 min-w-0">
          <TabsContent value="profile" className="mt-0">
            <div className="space-y-3">
              <h3 className="font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">Update your name, avatar, and public profile information.</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm">Save changes</Button>
                <Button size="sm" variant="outline">Cancel</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="appearance" className="mt-0">
            <div className="space-y-3">
              <h3 className="font-medium">Appearance</h3>
              <p className="text-sm text-muted-foreground">Choose your theme, font size, and display density preferences.</p>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="mt-0">
            <div className="space-y-3">
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground">Configure which events trigger email and push notifications.</p>
            </div>
          </TabsContent>
          <TabsContent value="billing" className="mt-0">
            <div className="space-y-3">
              <h3 className="font-medium">Billing</h3>
              <p className="text-sm text-muted-foreground">Manage your subscription, payment method, and invoices.</p>
            </div>
          </TabsContent>
          <TabsContent value="security" className="mt-0">
            <div className="space-y-3">
              <h3 className="font-medium">Security</h3>
              <p className="text-sm text-muted-foreground">Change your password, enable 2FA, and manage active sessions.</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Full settings page layout with vertical tabs used as a sidebar navigation inside a card.',
      },
    },
  },
}

export const ProjectDashboard: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[640px]">
      <div className="flex items-center justify-between border-b pb-0">
        <TabsList variant="line">
          <TabsTrigger value="overview">
            <Layout className="size-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="size-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart2 className="size-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="packages">
            <Package className="size-4" />
            Packages
          </TabsTrigger>
          <TabsTrigger value="docs">
            <FileText className="size-4" />
            Docs
          </TabsTrigger>
        </TabsList>
        <Button size="sm" variant="outline" className="mb-2">New release</Button>
      </div>
      <TabsContent value="overview">
        <div className="py-4 space-y-2">
          <h3 className="text-sm font-medium">Project Overview</h3>
          <p className="text-sm text-muted-foreground">Repository stats, recent commits, and contributors.</p>
        </div>
      </TabsContent>
      <TabsContent value="activity">
        <div className="py-4 space-y-2">
          <h3 className="text-sm font-medium">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Push events, pull requests, and issues across all branches.</p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="py-4 space-y-2">
          <h3 className="text-sm font-medium">Analytics</h3>
          <p className="text-sm text-muted-foreground">Traffic, clones, and contributor graphs over time.</p>
        </div>
      </TabsContent>
      <TabsContent value="packages">
        <div className="py-4 space-y-2">
          <h3 className="text-sm font-medium">Packages</h3>
          <p className="text-sm text-muted-foreground">Published packages and container images linked to this repository.</p>
        </div>
      </TabsContent>
      <TabsContent value="docs">
        <div className="py-4 space-y-2">
          <h3 className="text-sm font-medium">Documentation</h3>
          <p className="text-sm text-muted-foreground">Auto-generated API docs and README content.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Repository-style dashboard header using the `line` variant with an action button aligned to the right of the tab list.',
      },
    },
  },
}

export const VerticalWithLineVariant: Story = {
  render: () => (
    <Tabs defaultValue="general" orientation="vertical" className="w-[560px]">
      <TabsList variant="line">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        <TabsTrigger value="support" disabled>Support</TabsTrigger>
      </TabsList>
      <div className="flex-1 pl-6">
        <TabsContent value="general" className="mt-0">
          <h3 className="text-sm font-medium mb-2">General Settings</h3>
          <p className="text-sm text-muted-foreground">Workspace name, timezone, and regional preferences.</p>
        </TabsContent>
        <TabsContent value="integrations" className="mt-0">
          <h3 className="text-sm font-medium mb-2">Integrations</h3>
          <p className="text-sm text-muted-foreground">Connect Slack, GitHub, and other services.</p>
        </TabsContent>
        <TabsContent value="api" className="mt-0">
          <h3 className="text-sm font-medium mb-2">API Access</h3>
          <p className="text-sm text-muted-foreground">Generate and revoke API tokens for programmatic access.</p>
        </TabsContent>
        <TabsContent value="webhooks" className="mt-0">
          <h3 className="text-sm font-medium mb-2">Webhooks</h3>
          <p className="text-sm text-muted-foreground">Configure outgoing webhooks to external endpoints.</p>
        </TabsContent>
      </div>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical layout using the `line` variant — the active indicator appears on the right edge of each trigger.',
      },
    },
  },
}

export const HelpCenter: Story = {
  render: () => (
    <Tabs defaultValue="faq" className="w-[560px]">
      <TabsList>
        <TabsTrigger value="faq">
          <HelpCircle className="size-4" />
          FAQ
        </TabsTrigger>
        <TabsTrigger value="guides">
          <FileText className="size-4" />
          Guides
        </TabsTrigger>
        <TabsTrigger value="api">
          <Code2 className="size-4" />
          API Docs
        </TabsTrigger>
        <TabsTrigger value="status">
          <Activity className="size-4" />
          Status
          <Badge variant="outline" className="ml-1 h-4 px-1 text-xs text-green-600 border-green-200">All good</Badge>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="faq">
        <div className="py-4 space-y-2">
          <p className="text-sm font-medium">How do I reset my password?</p>
          <p className="text-sm text-muted-foreground">Go to Settings → Security and click "Change password".</p>
        </div>
      </TabsContent>
      <TabsContent value="guides">
        <p className="py-4 text-sm text-muted-foreground">Step-by-step guides for common workflows.</p>
      </TabsContent>
      <TabsContent value="api">
        <p className="py-4 text-sm text-muted-foreground">Full API reference with code examples in multiple languages.</p>
      </TabsContent>
      <TabsContent value="status">
        <p className="py-4 text-sm text-muted-foreground">All systems operational. Last checked 2 minutes ago.</p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Help center tabs combining icons, text, and a status badge inside a single trigger.',
      },
    },
  },
}

// ──── type="expandable" ──────────────────────────────────────────────────────

export const Expandable: Story = {
  args: {
    type: 'expandable',
    tabs: [
      { title: 'Home', icon: Home },
      { title: 'Profile', icon: User },
      { title: 'Settings', icon: Settings },
    ] satisfies ExpandableTabsEntry[],
    defaultActiveIndex: 0,
    activeColor: 'text-foreground',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pass `type="expandable"` and a `tabs` array to render icon-only tabs that animate open to reveal their label when active. No `TabsList`/`TabsTrigger` children needed.',
      },
    },
  },
}

export const ExpandableWithSeparator: Story = {
  render: () => (
    <Tabs
      type="expandable"
      tabs={[
        { title: 'Inbox', icon: Inbox },
        { title: 'Sent', icon: Send },
        { title: 'Drafts', icon: FileText },
        { type: 'separator' },
        { title: 'Starred', icon: Star },
        { title: 'Trash', icon: Trash2 },
      ] satisfies ExpandableTabsEntry[]}
      defaultActiveIndex={0}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use `{ type: "separator" }` entries in the `tabs` array to visually group tabs with a thin divider.',
      },
    },
  },
}

export const ExpandableCustomColor: Story = {
  render: () => (
    <Tabs
      type="expandable"
      tabs={[
        { title: 'Overview', icon: Layout },
        { title: 'Analytics', icon: BarChart2 },
        { title: 'Code', icon: Code2 },
        { title: 'Settings', icon: Settings },
      ] satisfies ExpandableTabsEntry[]}
      defaultActiveIndex={0}
      activeColor="text-primary"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use `activeColor` to apply any Tailwind text-colour class to the active tab.',
      },
    },
  },
}

export const ExpandableControlled: Story = {
  render: function ExpandableControlledDemo() {
    const [active, setActive] = React.useState<number | null>(0)
    const tabs = [
      { title: 'Home', icon: Home },
      { title: 'Profile', icon: User },
      { title: 'Settings', icon: Settings },
    ] satisfies ExpandableTabsEntry[]

    return (
      <div className="flex flex-col items-center gap-4">
        <Tabs type="expandable" tabs={tabs} activeIndex={active} onChange={setActive} />
        <p className="text-sm text-muted-foreground">
          Active: <strong>{active !== null ? (tabs[active] as { title: string }).title : 'none'}</strong>
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully controlled mode — drive the active tab externally via `activeIndex` + `onChange`.',
      },
    },
  },
}

export const SideBySide: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-start">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">type="default"</p>
        <Tabs defaultValue="overview" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="overview"><Layout className="size-4" />Overview</TabsTrigger>
            <TabsTrigger value="analytics"><BarChart2 className="size-4" />Analytics</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="size-4" />Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"><p className="py-3 text-sm text-muted-foreground">Overview content.</p></TabsContent>
          <TabsContent value="analytics"><p className="py-3 text-sm text-muted-foreground">Analytics content.</p></TabsContent>
          <TabsContent value="settings"><p className="py-3 text-sm text-muted-foreground">Settings content.</p></TabsContent>
        </Tabs>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">type="expandable"</p>
        <Tabs
          type="expandable"
          tabs={[
            { title: 'Overview', icon: Layout },
            { title: 'Analytics', icon: BarChart2 },
            { title: 'Settings', icon: Settings },
          ] satisfies ExpandableTabsEntry[]}
          defaultActiveIndex={0}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Both tab styles rendered side-by-side for comparison. Same `<Tabs>` component — different `type` prop.',
      },
    },
  },
}
