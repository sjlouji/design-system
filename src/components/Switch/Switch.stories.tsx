import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Switch } from './Switch'
import { Label } from '@/components/Label'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'Visual size of the switch',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch',
    },
    required: {
      control: 'boolean',
      description: 'Marks the switch as required',
    },
    onCheckedChange: {
      action: 'checkedChange',
      description: 'Callback fired when checked state changes',
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { size: 'default' },
}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Unchecked: Story = {
  args: { defaultChecked: false },
}

export const SizeDefault: Story = {
  name: 'Size — Default',
  args: { size: 'default' },
}

export const SizeSmall: Story = {
  name: 'Size — Small',
  args: { size: 'sm' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

export const WithLabelChecked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notifications-on" defaultChecked />
      <Label htmlFor="notifications-on">Push notifications</Label>
    </div>
  ),
}

export const WithLabelDisabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="feature-flag" disabled />
      <Label htmlFor="feature-flag">Beta feature (unavailable)</Label>
    </div>
  ),
}

export const SizeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch size="default" defaultChecked />
        <span className="text-sm text-muted-foreground">Default</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch size="sm" defaultChecked />
        <span className="text-sm text-muted-foreground">Small</span>
      </div>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <Switch
            id="controlled-switch"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="controlled-switch">Dark mode</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          State: <strong>{checked ? 'on' : 'off'}</strong>
        </p>
      </div>
    )
  },
}

export const SettingsPanel: Story = {
  name: 'Form — Settings Panel',
  render: () => {
    const [settings, setSettings] = React.useState({
      emailNotifications: true,
      smsAlerts: false,
      marketingEmails: false,
      twoFactor: true,
    })

    const labels: Record<keyof typeof settings, { label: string; description: string }> = {
      emailNotifications: {
        label: 'Email notifications',
        description: 'Receive updates about your account activity.',
      },
      smsAlerts: {
        label: 'SMS alerts',
        description: 'Get text messages for critical security events.',
      },
      marketingEmails: {
        label: 'Marketing emails',
        description: 'Hear about new products and special offers.',
      },
      twoFactor: {
        label: 'Two-factor authentication',
        description: 'Add an extra layer of security to your account.',
      },
    }

    return (
      <div className="w-96 flex flex-col gap-5">
        {(Object.keys(settings) as Array<keyof typeof settings>).map((key) => (
          <div key={key} className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor={key}>{labels[key].label}</Label>
              <p className="text-sm text-muted-foreground">{labels[key].description}</p>
            </div>
            <Switch
              id={key}
              size="sm"
              checked={settings[key]}
              onCheckedChange={(val) =>
                setSettings((prev) => ({ ...prev, [key]: val }))
              }
            />
          </div>
        ))}
      </div>
    )
  },
}

export const ToggleInteraction: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole('switch')
    expect(switchEl).toHaveAttribute('data-state', 'unchecked')
    await userEvent.click(switchEl)
    expect(switchEl).toHaveAttribute('data-state', 'checked')
    await userEvent.click(switchEl)
    expect(switchEl).toHaveAttribute('data-state', 'unchecked')
  },
}
