import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { RadioGroup, RadioGroupItem } from './RadioGroup'
import { Label } from '@/components/Label'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default selected value (uncontrolled)',
    },
    value: {
      control: 'text',
      description: 'The controlled selected value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all radio items in the group',
    },
    required: {
      control: 'boolean',
      description: 'Marks the group as required',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of the group',
    },
    onValueChange: {
      action: 'valueChange',
      description: 'Callback when the selected value changes',
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="r-option-1" />
        <Label htmlFor="r-option-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="r-option-2" />
        <Label htmlFor="r-option-2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="r-option-3" />
        <Label htmlFor="r-option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithDefaultValue: Story = {
  render: () => (
    <RadioGroup defaultValue="option-2">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="dv-option-1" />
        <Label htmlFor="dv-option-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="dv-option-2" />
        <Label htmlFor="dv-option-2">Option 2 (default)</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="dv-option-3" />
        <Label htmlFor="dv-option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="dis-option-1" />
        <Label htmlFor="dis-option-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="dis-option-2" />
        <Label htmlFor="dis-option-2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="dis-option-3" />
        <Label htmlFor="dis-option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const DisabledWithSelection: Story = {
  render: () => (
    <RadioGroup disabled defaultValue="option-2">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="dws-option-1" />
        <Label htmlFor="dws-option-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="dws-option-2" />
        <Label htmlFor="dws-option-2">Option 2 (selected)</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="dws-option-3" />
        <Label htmlFor="dws-option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const SingleItemDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="monthly">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="monthly" id="plan-monthly" />
        <Label htmlFor="plan-monthly">Monthly billing</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="yearly" id="plan-yearly" />
        <Label htmlFor="plan-yearly">Yearly billing (save 20%)</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="enterprise" id="plan-enterprise" disabled />
        <Label htmlFor="plan-enterprise" className="text-muted-foreground">
          Enterprise (contact sales)
        </Label>
      </div>
    </RadioGroup>
  ),
}

export const WithInvalidState: Story = {
  name: 'Invalid (aria-invalid)',
  render: () => (
    <div className="flex flex-col gap-2">
      <RadioGroup aria-invalid="true">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="yes" id="inv-yes" aria-invalid="true" />
          <Label htmlFor="inv-yes">Yes</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="no" id="inv-no" aria-invalid="true" />
          <Label htmlFor="inv-no">No</Label>
        </div>
      </RadioGroup>
      <p className="text-sm text-destructive">Please select an option.</p>
    </div>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup orientation="horizontal" className="flex gap-6">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="left" id="align-left" />
        <Label htmlFor="align-left">Left</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="center" id="align-center" />
        <Label htmlFor="align-center">Center</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="right" id="align-right" />
        <Label htmlFor="align-right">Right</Label>
      </div>
    </RadioGroup>
  ),
}

export const PlanSelector: Story = {
  name: 'Form — Plan Selector',
  render: () => (
    <div className="w-72">
      <p className="text-sm font-semibold mb-3">Select a billing plan</p>
      <RadioGroup defaultValue="pro">
        {[
          { value: 'free', label: 'Free', description: 'Up to 3 projects' },
          { value: 'pro', label: 'Pro — $12/mo', description: 'Unlimited projects' },
          { value: 'team', label: 'Team — $49/mo', description: 'Up to 20 seats' },
        ].map(({ value, label, description }) => (
          <div key={value} className="flex gap-2">
            <RadioGroupItem value={value} id={`plan-${value}`} className="mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <Label htmlFor={`plan-${value}`}>{label}</Label>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  ),
}

export const NotificationPreferences: Story = {
  name: 'Form — Notification Preferences',
  render: () => (
    <div className="w-80">
      <p className="text-sm font-semibold mb-1">Notify me about</p>
      <p className="text-sm text-muted-foreground mb-3">
        Choose how often you'd like to hear from us.
      </p>
      <RadioGroup defaultValue="important">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="all" id="notif-all" />
          <Label htmlFor="notif-all">All new messages</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="important" id="notif-important" />
          <Label htmlFor="notif-important">Important only</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="none" id="notif-none" />
          <Label htmlFor="notif-none">None</Label>
        </div>
      </RadioGroup>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <div className="flex flex-col gap-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="design" id="ctrl-design" />
            <Label htmlFor="ctrl-design">Design</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="engineering" id="ctrl-eng" />
            <Label htmlFor="ctrl-eng">Engineering</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="product" id="ctrl-product" />
            <Label htmlFor="ctrl-product">Product</Label>
          </div>
        </RadioGroup>
        <p className="text-sm text-muted-foreground">
          Selected: <strong>{value || '(none)'}</strong>
        </p>
      </div>
    )
  },
}

export const KeyboardNavigation: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="kb-option-1" />
        <Label htmlFor="kb-option-1">First (Tab here, then use arrow keys)</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="kb-option-2" />
        <Label htmlFor="kb-option-2">Second</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="kb-option-3" />
        <Label htmlFor="kb-option-3">Third</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const firstRadio = canvas.getByRole('radio', { name: /First/i })
    await userEvent.click(firstRadio)
    expect(firstRadio).toBeChecked()
  },
}
