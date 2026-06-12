import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SplitLayout } from './SplitLayout'
import { Section } from '@/components/Section'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/Textarea'
import { Switch } from '@/components/Switch'
import { Button } from '@/components/Button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/Select'
import { Label } from '@/components/Label'

const meta = {
  title: 'Layout/SplitLayout',
  component: SplitLayout,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    label: 'Label',
    children: <Input placeholder="Value" />,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The field label shown on the left side of the layout.',
    },
    description: {
      control: 'text',
      description: 'Optional helper text shown below the label.',
    },
    labelWidth: {
      control: 'text',
      description: 'Tailwind width class applied to the label column. Defaults to `w-1/3`.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root element.',
    },
  },
} satisfies Meta<typeof SplitLayout>

export default meta
type Story = StoryObj<typeof meta>

// ─── Basic states ─────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Display Name',
    children: <Input placeholder="Enter your display name" />,
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Email Address',
    description: 'Used for account notifications and login.',
    children: <Input type="email" placeholder="you@example.com" />,
  },
}

export const LabelOnly: Story = {
  name: 'Label only (no description)',
  args: {
    label: 'Website URL',
    children: <Input type="url" placeholder="https://example.com" />,
  },
}

// ─── labelWidth variations ────────────────────────────────────────────────

export const NarrowLabel: Story = {
  name: 'Prop: labelWidth = w-1/4',
  args: {
    label: 'Status',
    description: 'Your current availability.',
    labelWidth: 'w-1/4',
    children: <Input placeholder="Active" />,
  },
}

export const WideLabel: Story = {
  name: 'Prop: labelWidth = w-1/2',
  args: {
    label: 'Billing Address',
    description: 'Used for invoices and tax purposes.',
    labelWidth: 'w-1/2',
    children: <Input placeholder="123 Main St" />,
  },
}

export const FixedWidthLabel: Story = {
  name: 'Prop: labelWidth = w-48',
  args: {
    label: 'Time Zone',
    description: 'All timestamps will be shown in this zone.',
    labelWidth: 'w-48',
    children: <Input placeholder="UTC+0" />,
  },
}

// ─── Different content types ──────────────────────────────────────────────

export const WithTextarea: Story = {
  args: {
    label: 'Bio',
    description: 'A brief description of yourself. Max 200 characters.',
    children: (
      <Textarea
        placeholder="Tell us a little about yourself…"
        className="resize-none"
        rows={4}
      />
    ),
  },
}

export const WithSwitch: Story = {
  args: {
    label: 'Marketing Emails',
    description: 'Receive product updates, tips, and promotional offers.',
    children: (
      <div className="flex items-center gap-2">
        <Switch id="marketing" />
        <Label htmlFor="marketing">Enabled</Label>
      </div>
    ),
  },
}

export const WithSelect: Story = {
  args: {
    label: 'Language',
    description: 'The language used throughout the interface.',
    children: (
      <Select defaultValue="en">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">French</SelectItem>
          <SelectItem value="de">German</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="ja">Japanese</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
}

export const WithActionButtons: Story = {
  args: {
    label: 'Danger Zone',
    description: 'Permanently delete your account and all associated data.',
    children: (
      <Button variant="destructive" size="sm">
        Delete Account
      </Button>
    ),
  },
}

// ─── Composite / real-world patterns ─────────────────────────────────────

export const ProfileSettingsForm: Story = {
  render: () => (
    <Section title="Profile" description="Update your personal information." divider>
      <div className="flex flex-col gap-6">
        <SplitLayout label="Display Name" description="Your public display name across the platform.">
          <Input defaultValue="Jane Smith" />
        </SplitLayout>
        <SplitLayout label="Email Address" description="Used for login and account notifications.">
          <Input type="email" defaultValue="jane@example.com" />
        </SplitLayout>
        <SplitLayout label="Bio" description="Brief description shown on your public profile.">
          <Textarea
            defaultValue="Product designer based in San Francisco."
            className="resize-none"
            rows={3}
          />
        </SplitLayout>
        <SplitLayout label="Website" description="Your personal or company website.">
          <Input type="url" placeholder="https://example.com" />
        </SplitLayout>
      </div>
    </Section>
  ),
}

export const NotificationPreferences: Story = {
  render: () => (
    <Section title="Notifications" description="Choose how you receive updates." divider>
      <div className="flex flex-col gap-6">
        <SplitLayout
          label="Email Notifications"
          description="Receive a daily digest of activity in your workspace."
        >
          <div className="flex items-center gap-2">
            <Switch id="email-notif" defaultChecked />
            <Label htmlFor="email-notif">Enabled</Label>
          </div>
        </SplitLayout>
        <SplitLayout
          label="Browser Notifications"
          description="Get real-time push alerts in supported browsers."
        >
          <div className="flex items-center gap-2">
            <Switch id="push-notif" />
            <Label htmlFor="push-notif">Disabled</Label>
          </div>
        </SplitLayout>
        <SplitLayout
          label="Notification Frequency"
          description="How often you'd like to be notified about changes."
        >
          <Select defaultValue="realtime">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">Real-time</SelectItem>
              <SelectItem value="hourly">Hourly digest</SelectItem>
              <SelectItem value="daily">Daily digest</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </SplitLayout>
      </div>
    </Section>
  ),
}

export const MultiSectionSettings: Story = {
  render: () => (
    <div className="flex flex-col gap-10 max-w-2xl">
      <Section title="Account" description="Manage your account credentials." divider>
        <div className="flex flex-col gap-6">
          <SplitLayout label="Username" description="Your unique identifier on the platform.">
            <Input defaultValue="janesmith" />
          </SplitLayout>
          <SplitLayout label="Password" description="At least 12 characters recommended.">
            <div className="flex gap-2">
              <Input type="password" defaultValue="••••••••••••" className="flex-1" />
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </SplitLayout>
        </div>
      </Section>

      <Section title="Preferences" description="Customise your workspace experience." divider>
        <div className="flex flex-col gap-6">
          <SplitLayout label="Language" description="Interface language.">
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </SplitLayout>
          <SplitLayout label="Time Zone" description="All timestamps use this zone.">
            <Input defaultValue="UTC+0 (London)" />
          </SplitLayout>
        </div>
      </Section>
    </div>
  ),
}
