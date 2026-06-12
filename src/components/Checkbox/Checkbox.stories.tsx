import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Checkbox } from './Checkbox'
import { Label } from '@/components/Label'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    checked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
      description: 'Controlled checked state (true, false, or "indeterminate")',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox',
    },
    required: {
      control: 'boolean',
      description: 'Marks the checkbox as required',
    },
    onCheckedChange: {
      action: 'checkedChange',
      description: 'Callback fired when checked state changes',
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { id: 'default' },
}

export const Checked: Story = {
  args: { id: 'checked', defaultChecked: true },
}

export const Unchecked: Story = {
  args: { id: 'unchecked', defaultChecked: false },
}

export const Indeterminate: Story = {
  args: { id: 'indeterminate', checked: 'indeterminate' },
}

export const Disabled: Story = {
  args: { id: 'disabled', disabled: true },
}

export const DisabledChecked: Story = {
  args: { id: 'disabled-checked', disabled: true, defaultChecked: true },
}

export const Required: Story = {
  args: { id: 'required', required: true },
}

export const WithAriaInvalid: Story = {
  args: { id: 'invalid', 'aria-invalid': true },
  name: 'Invalid (aria-invalid)',
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const WithLabelAndDescription: Story = {
  render: () => (
    <div className="flex gap-2">
      <Checkbox id="marketing" className="mt-0.5" />
      <div className="flex flex-col gap-1">
        <Label htmlFor="marketing">Marketing emails</Label>
        <p className="text-sm text-muted-foreground">
          Receive emails about new products, features, and more.
        </p>
      </div>
    </div>
  ),
}

export const CheckedWithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="remember" defaultChecked />
      <Label htmlFor="remember">Remember me</Label>
    </div>
  ),
}

export const DisabledWithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled-label" disabled />
      <Label htmlFor="disabled-label">This option is unavailable</Label>
    </div>
  ),
}

export const FormAgreements: Story = {
  name: 'Form — Agreement Checkboxes',
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <p className="text-sm font-semibold">Please review and accept:</p>
      <div className="flex gap-2">
        <Checkbox id="tos" defaultChecked className="mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <Label htmlFor="tos">Terms of Service</Label>
          <p className="text-sm text-muted-foreground">
            I agree to the terms of service and privacy policy.
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Checkbox id="gdpr" className="mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <Label htmlFor="gdpr">GDPR Consent</Label>
          <p className="text-sm text-muted-foreground">
            I consent to my data being processed as described.
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Checkbox id="newsletter" className="mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <Label htmlFor="newsletter">Newsletter</Label>
          <p className="text-sm text-muted-foreground">
            Subscribe to our weekly product newsletter.
          </p>
        </div>
      </div>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(false)
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="controlled">Controlled checkbox</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          State: <strong>{String(checked)}</strong>
        </p>
      </div>
    )
  },
}

export const SelectAll: Story = {
  name: 'Select All (Indeterminate Pattern)',
  render: () => {
    const [items, setItems] = React.useState({
      email: true,
      sms: false,
      push: true,
    })
    const allChecked = Object.values(items).every(Boolean)
    const someChecked = Object.values(items).some(Boolean)
    const parentState = allChecked ? true : someChecked ? 'indeterminate' : false

    const toggleAll = (val: boolean | 'indeterminate') => {
      const next = val === true
      setItems({ email: next, sms: next, push: next })
    }

    return (
      <div className="flex flex-col gap-3 w-64">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={parentState}
            onCheckedChange={toggleAll}
          />
          <Label htmlFor="select-all" className="font-semibold">
            Notifications
          </Label>
        </div>
        <div className="ml-6 flex flex-col gap-2">
          {(Object.keys(items) as Array<keyof typeof items>).map((key) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={`item-${key}`}
                checked={items[key]}
                onCheckedChange={(val) =>
                  setItems((prev) => ({ ...prev, [key]: val === true }))
                }
              />
              <Label htmlFor={`item-${key}`} className="capitalize">
                {key}
              </Label>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const ToggleInteraction: Story = {
  args: { id: 'toggle' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('data-state', 'unchecked')
    await userEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('data-state', 'checked')
    await userEvent.click(checkbox)
    expect(checkbox).toHaveAttribute('data-state', 'unchecked')
  },
}
