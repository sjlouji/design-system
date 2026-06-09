import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/Input'
import { Field } from './Field'

const meta = {
  title: 'Forms/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <Field label="Email" htmlFor="email">
        <Input id="email" type="email" placeholder="you@example.com" />
      </Field>
    </div>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <div className="w-72">
      <Field
        label="Username"
        htmlFor="username"
        helperText="Only letters, numbers, and underscores."
      >
        <Input id="username" placeholder="jsmith" />
      </Field>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-72">
      <Field
        label="Email"
        htmlFor="email-error"
        error="Please enter a valid email address."
        helperText="This helper text should not show when there is an error."
      >
        <Input id="email-error" type="email" placeholder="you@example.com" />
      </Field>
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div className="w-72">
      <Field label="Password" htmlFor="password" required>
        <Input id="password" type="password" placeholder="••••••••" />
      </Field>
    </div>
  ),
}
