import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Section } from './Section'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Switch } from '@/components/Switch'
import { Label } from '@/components/Label'
import { Badge } from '@/components/Badge'
import { PlusIcon, DownloadIcon, SettingsIcon } from 'lucide-react'

const meta = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    title: {
      control: 'text',
      description: 'Section heading rendered as an h2.',
    },
    description: {
      control: 'text',
      description: 'Optional subheading text shown below the title.',
    },
    divider: {
      control: 'boolean',
      description: 'When true, renders a Separator between the header and the content slot.',
    },
    action: {
      control: false,
      description: 'An optional node rendered to the far right of the header area.',
    },
    children: {
      control: false,
      description: 'Section body content.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root element.',
    },
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

// ─── Basic states ─────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: 'General',
    description: 'Basic settings for your account.',
  },
}

export const TitleOnly: Story = {
  args: {
    title: 'Advanced',
  },
}

export const DescriptionOnly: Story = {
  args: {
    description: 'A section with only descriptive text and no title.',
  },
}

export const WithContent: Story = {
  args: {
    title: 'About',
    children: (
      <p className="text-sm text-muted-foreground">
        This is the content area. Place any components, form fields, or text here as
        children of the Section component.
      </p>
    ),
  },
}

// ─── Divider prop ─────────────────────────────────────────────────────────

export const WithDivider: Story = {
  args: {
    title: 'Notifications',
    description: 'Configure how you receive notifications.',
    divider: true,
    children: (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Email notifications</p>
            <p className="text-xs text-muted-foreground">Receive daily digests via email.</p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Push notifications</p>
            <p className="text-xs text-muted-foreground">Get real-time browser alerts.</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    ),
  },
}

export const WithoutDivider: Story = {
  args: {
    title: 'Notifications',
    description: 'Configure how you receive notifications.',
    divider: false,
    children: (
      <p className="text-sm text-muted-foreground">
        Content directly follows the header with no visual separator.
      </p>
    ),
  },
}

// ─── Action prop ──────────────────────────────────────────────────────────

export const WithSingleAction: Story = {
  args: {
    title: 'API Keys',
    description: 'Manage your API keys for programmatic access.',
    action: <Button size="sm">Generate Key</Button>,
  },
}

export const WithMultipleActions: Story = {
  args: {
    title: 'Team Members',
    description: 'Manage who has access to this workspace.',
    action: (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <DownloadIcon />
          Export
        </Button>
        <Button size="sm">
          <PlusIcon />
          Invite Member
        </Button>
      </div>
    ),
  },
}

export const WithIconAction: Story = {
  args: {
    title: 'Integrations',
    description: 'Connect third-party services to your workspace.',
    action: (
      <Button variant="ghost" size="icon">
        <SettingsIcon />
      </Button>
    ),
  },
}

export const WithBadgeAction: Story = {
  args: {
    title: 'Webhooks',
    description: 'Receive HTTP notifications when events occur.',
    action: <Badge variant="secondary">3 active</Badge>,
  },
}

// ─── No header ────────────────────────────────────────────────────────────

export const ContentOnly: Story = {
  name: 'No header (content only)',
  args: {
    children: (
      <div className="rounded-lg border border-border p-4 bg-muted/30">
        <p className="text-sm text-muted-foreground">
          A section with no title or description — just a content slot.
        </p>
      </div>
    ),
  },
}

// ─── Composite / real-world patterns ─────────────────────────────────────

export const ProfileSection: Story = {
  render: () => (
    <Section
      title="Profile Information"
      description="Update your personal details visible across the platform."
      divider
    >
      <div className="flex flex-col gap-4 max-w-sm">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Display Name</Label>
          <Input id="name" defaultValue="Jane Smith" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="jane@example.com" />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </div>
    </Section>
  ),
}

export const ApiKeysSection: Story = {
  render: () => (
    <Section
      title="API Keys"
      description="Use these keys to authenticate programmatic requests."
      divider
      action={
        <Button size="sm">
          <PlusIcon />
          New Key
        </Button>
      }
    >
      <div className="flex flex-col gap-3">
        {[
          { name: 'Production Key', created: 'Jan 12, 2026', last: '2 hours ago' },
          { name: 'Staging Key', created: 'Mar 4, 2026', last: '14 days ago' },
          { name: 'CI/CD Key', created: 'May 20, 2026', last: 'Never' },
        ].map((key) => (
          <div
            key={key.name}
            className="flex items-center justify-between rounded-md border border-border px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">{key.name}</p>
              <p className="text-xs text-muted-foreground">
                Created {key.created} · Last used {key.last}
              </p>
            </div>
            <Button variant="ghost" size="sm">Revoke</Button>
          </div>
        ))}
      </div>
    </Section>
  ),
}

export const MultipleSections: Story = {
  render: () => (
    <div className="flex flex-col gap-10 max-w-xl">
      <Section
        title="General"
        description="Basic account settings."
        divider
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ms-username">Username</Label>
          <Input id="ms-username" defaultValue="janesmith" />
        </div>
      </Section>

      <Section
        title="Security"
        description="Keep your account secure."
        divider
        action={<Button variant="outline" size="sm">Enable 2FA</Button>}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Two-factor authentication</p>
            <p className="text-xs text-muted-foreground">Add an extra layer of security.</p>
          </div>
          <Switch />
        </div>
      </Section>

      <Section
        title="Danger Zone"
        description="Irreversible and destructive actions."
        divider
      >
        <Button variant="destructive" size="sm">Delete Account</Button>
      </Section>
    </div>
  ),
}
