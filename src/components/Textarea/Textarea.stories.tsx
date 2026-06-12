import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'
import { Label } from '@/components/Label'
import { Field } from '@/components/Field'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when the field is empty. Rendered at reduced opacity.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction. Applies reduced opacity and a not-allowed cursor.',
    },
    readOnly: {
      control: 'boolean',
      description: 'Prevents editing without disabling. The field still receives focus and can be selected/copied.',
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required for native form validation.',
    },
    rows: {
      control: { type: 'number', min: 1 },
      description: 'Number of visible text rows. The textarea auto-grows beyond this via `field-sizing-content` unless overridden.',
    },
    maxLength: {
      control: { type: 'number' },
      description: 'Maximum character count enforced by the browser. Pair with a character counter in the UI for user feedback.',
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Triggers error styling (destructive border and ring). Set to `true` when form validation fails.',
    },
    onChange: {
      action: 'change',
      description: 'Fires on every keystroke. Receives a `React.ChangeEvent<HTMLTextAreaElement>`.',
    },
    onBlur: {
      action: 'blur',
      description: 'Fires when focus leaves the textarea. Receives a `React.FocusEvent<HTMLTextAreaElement>`.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes merged onto the textarea element.',
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Write your message here…',
    disabled: false,
    readOnly: false,
    required: false,
    className: 'w-[320px]',
  },
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Write your message here…',
    className: 'w-[320px]',
  },
}

export const WithValue: Story = {
  args: {
    defaultValue:
      'This is some pre-filled content in the textarea. It grows automatically as you type more text.',
    className: 'w-[320px]',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'This field is disabled',
    className: 'w-[320px]',
  },
}

export const DisabledWithValue: Story = {
  args: {
    disabled: true,
    defaultValue: 'This content cannot be edited.',
    className: 'w-[320px]',
  },
}

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 'This content is read-only and cannot be modified.',
    className: 'w-[320px]',
  },
}

export const WithAriaInvalid: Story = {
  name: 'Invalid (aria-invalid)',
  args: {
    'aria-invalid': true,
    placeholder: 'Enter a valid message',
    className: 'w-[320px]',
  },
}

export const WithRows: Story = {
  args: {
    rows: 6,
    placeholder: 'A textarea with 6 fixed rows…',
    className: 'w-[320px]',
  },
}

export const WithMaxLength: Story = {
  render: () => {
    const max = 200
    const [value, setValue] = React.useState('')
    return (
      <div className="flex flex-col gap-1.5 w-[320px]">
        <Textarea
          placeholder="Tell us about yourself…"
          maxLength={max}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className="text-xs text-muted-foreground text-right">
          {value.length} / {max}
        </p>
      </div>
    )
  },
}

export const Required: Story = {
  render: () => (
    <div className="w-[320px]">
      <Field label="Message" htmlFor="req-msg" required>
        <Textarea id="req-msg" placeholder="Your message…" required />
      </Field>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-[320px]">
      <Field
        label="Bio"
        htmlFor="bio-error"
        error="Bio must be at least 20 characters."
      >
        <Textarea id="bio-error" placeholder="Describe yourself…" defaultValue="Too short." />
      </Field>
    </div>
  ),
}

export const WithHelperText: Story = {
  render: () => (
    <div className="w-[320px]">
      <Field
        label="Support message"
        htmlFor="support-msg"
        helperText="Describe your issue in as much detail as possible."
      >
        <Textarea id="support-msg" placeholder="What went wrong?" rows={4} />
      </Field>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <div className="flex flex-col gap-2 w-[320px]">
        <Label htmlFor="ctrl-textarea">Notes</Label>
        <Textarea
          id="ctrl-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your notes here…"
        />
        <p className="text-sm text-muted-foreground">
          Characters: <strong>{value.length}</strong>
        </p>
      </div>
    )
  },
}

export const FeedbackForm: Story = {
  name: 'Form — Feedback Form',
  render: () => (
    <form className="flex flex-col gap-4 w-[380px]" onSubmit={(e) => e.preventDefault()}>
      <p className="text-base font-semibold">Share your feedback</p>
      <Field label="What did you like?" htmlFor="liked">
        <Textarea
          id="liked"
          placeholder="The onboarding experience was great…"
          rows={3}
        />
      </Field>
      <Field
        label="What could be improved?"
        htmlFor="improve"
        helperText="Your feedback helps us make things better."
      >
        <Textarea
          id="improve"
          placeholder="I wish the export feature was easier to find…"
          rows={3}
        />
      </Field>
      <Field label="Anything else?" htmlFor="other">
        <Textarea id="other" placeholder="Optional additional comments…" rows={2} />
      </Field>
      <button
        type="submit"
        className="self-end px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
      >
        Submit feedback
      </button>
    </form>
  ),
}
