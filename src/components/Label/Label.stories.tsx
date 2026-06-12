import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'
import { Input } from '../Input/Input'
import { Checkbox } from '../Checkbox/Checkbox'

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text content. Can also contain React nodes such as a required-indicator span.',
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the form control this label is associated with. Clicking the label moves focus to that control.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the label element. Use to override font size, colour, or weight.',
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    children: 'Email address',
    htmlFor: '',
    className: '',
  },
}

export const LongText: Story = {
  name: 'Long label text',
  args: {
    children: 'Your billing address (required for invoices and receipts)',
  },
}

// ---------------------------------------------------------------------------
// Connected to form controls via htmlFor
// ---------------------------------------------------------------------------

export const WithHtmlFor: Story = {
  name: 'With htmlFor — text input',
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <Label htmlFor="story-email">Email address</Label>
      <Input id="story-email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const WithPasswordInput: Story = {
  name: 'With htmlFor — password input',
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <Label htmlFor="story-password">Password</Label>
      <Input id="story-password" type="password" placeholder="••••••••" />
    </div>
  ),
}

export const WithCheckbox: Story = {
  name: 'With htmlFor — checkbox',
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="story-checkbox" />
      <Label htmlFor="story-checkbox">Accept terms and conditions</Label>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Required indicator
// ---------------------------------------------------------------------------

export const RequiredIndicator: Story = {
  name: 'Required indicator',
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <Label htmlFor="story-required">
        Full name
        <span className="text-destructive ml-0.5" aria-hidden>*</span>
      </Label>
      <Input id="story-required" placeholder="Jane Smith" required />
    </div>
  ),
}

export const RequiredAndOptional: Story = {
  name: 'Required vs optional',
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="story-fname">
          First name
          <span className="text-destructive ml-0.5" aria-hidden>*</span>
        </Label>
        <Input id="story-fname" placeholder="Jane" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="story-bio">Bio</Label>
          <span className="text-xs text-muted-foreground">Optional</span>
        </div>
        <Input id="story-bio" placeholder="Tell us about yourself…" />
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Disabled state
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  name: 'Disabled (peer-disabled)',
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <Label htmlFor="story-disabled">Username</Label>
      <Input id="story-disabled" defaultValue="jane_smith" disabled />
    </div>
  ),
}

export const DisabledCheckbox: Story = {
  name: 'Disabled — checkbox label dims',
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="story-disabled-cb" disabled />
      <Label htmlFor="story-disabled-cb">
        Newsletter subscription
      </Label>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Full form example
// ---------------------------------------------------------------------------

export const FormExample: Story = {
  name: 'Full form example',
  parameters: { layout: 'padded' },
  render: () => (
    <form className="flex flex-col gap-4 w-80" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="form-name">
          Full name
          <span className="text-destructive ml-0.5" aria-hidden>*</span>
        </Label>
        <Input id="form-name" placeholder="Jane Smith" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="form-email">
          Email
          <span className="text-destructive ml-0.5" aria-hidden>*</span>
        </Label>
        <Input id="form-email" type="email" placeholder="jane@example.com" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="form-company">Company</Label>
          <span className="text-xs text-muted-foreground">Optional</span>
        </div>
        <Input id="form-company" placeholder="Acme Corp" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="form-terms" />
        <Label htmlFor="form-terms">
          I agree to the{' '}
          <a href="#" className="underline text-primary" onClick={(e) => e.preventDefault()}>
            terms of service
          </a>
        </Label>
      </div>
    </form>
  ),
}

// ---------------------------------------------------------------------------
// Custom className
// ---------------------------------------------------------------------------

export const CustomClassName: Story = {
  name: 'Custom className',
  render: () => (
    <div className="flex flex-col gap-3">
      <Label className="text-base font-semibold">Large label</Label>
      <Label className="text-xs text-muted-foreground uppercase tracking-widest">
        Small caps label
      </Label>
      <Label className="text-destructive">Error label</Label>
    </div>
  ),
}
