import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/Input'
import { Field } from './Field'

const meta = {
  title: 'Forms/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: null },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text rendered in a `<Label>` element above the input. Omit to render no label.',
    },
    htmlFor: {
      control: 'text',
      description: 'Associates the label with an input by id. Should match the `id` prop of the child input element so clicking the label focuses the input.',
    },
    helperText: {
      control: 'text',
      description: 'Subtle hint text shown below the input when there is no error. Hidden when `error` is provided — only one of the two is shown at a time.',
    },
    error: {
      control: 'text',
      description: 'Validation error message shown below the input in destructive colour. When present, it replaces `helperText`, sets `role="alert"` on the message, and injects `aria-invalid` + `aria-describedby` into the child input.',
    },
    required: {
      control: 'boolean',
      description: 'When true, appends a red asterisk (*) to the label as a visual required indicator. Does not add HTML `required` to the input — set that on the child element directly.',
    },
    children: {
      control: false,
      description: 'The single input element to wrap (e.g. `<Input>`, `<Select>`, `<Textarea>`). Field clones the child to inject `aria-invalid` and `aria-describedby` automatically.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the root flex column container.',
    },
  },
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
