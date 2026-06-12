import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Settings, User, Bell, CreditCard, ShieldCheck, Code2, Database, Globe } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'
import { Badge } from '@/components/Badge'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The value of the tab that should be active by default (uncontrolled)',
    },
    value: {
      control: 'text',
      description: 'Controlled active tab value',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback fired when the active tab changes',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the tab list',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root element',
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
