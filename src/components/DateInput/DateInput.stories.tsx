import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateInput } from './DateInput'

const meta = {
  title: 'Forms/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: false,
      description: 'Controlled `Date` value. When provided the text input is populated with the formatted date. Pair with `onChange` for fully controlled usage.',
    },
    onChange: {
      action: 'onChange',
      description: 'Fired when the user selects a date from the calendar or types a valid date in the text input and blurs. Receives a `Date` object, or `undefined` when the field is cleared.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown in the text input when no date is set. Should match the `format` pattern so users know the expected input (e.g. "DD/MM/YYYY"). Defaults to "DD/MM/YYYY".',
    },
    format: {
      control: 'select',
      options: ['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd', 'dd-MM-yyyy', 'MMM d, yyyy'],
      description: 'date-fns format string used for both displaying and parsing the typed input. "dd/MM/yyyy" — day-first (UK/AU). "MM/dd/yyyy" — month-first (US). "yyyy-MM-dd" — ISO 8601. "dd-MM-yyyy" — hyphen-separated day-first. "MMM d, yyyy" — abbreviated month (e.g. Jun 15, 2025). Defaults to "dd/MM/yyyy".',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, disables both the text input and the calendar icon button — no interaction is possible and both are visually dimmed.',
    },
    error: {
      control: 'boolean',
      description: 'When true, applies a destructive (red) border to the text input. Combine with an external error message for full form validation feedback. The component also sets this internally when the user types an unparseable date string.',
    },
    min: {
      control: false,
      description: 'Earliest selectable `Date`. Dates before this are disabled in the calendar popover. Does not constrain direct text input.',
    },
    max: {
      control: false,
      description: 'Latest selectable `Date`. Dates after this are disabled in the calendar popover. Does not constrain direct text input.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the outer wrapper `div` (which contains both the text input and the calendar icon button).',
    },
  },
} satisfies Meta<typeof DateInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'DD/MM/YYYY',
    format: 'dd/MM/yyyy',
    disabled: false,
    error: false,
  },
}

export const WithPreselectedDate: Story = {
  args: {
    value: new Date(2025, 5, 15),
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Select a date…',
  },
}

export const USFormat: Story = {
  name: 'Format: MM/DD/YYYY (US)',
  args: {
    format: 'MM/dd/yyyy',
    placeholder: 'MM/DD/YYYY',
    value: new Date(2025, 5, 15),
  },
}

export const ISOFormat: Story = {
  name: 'Format: YYYY-MM-DD (ISO)',
  args: {
    format: 'yyyy-MM-dd',
    placeholder: 'YYYY-MM-DD',
    value: new Date(2025, 5, 15),
  },
}

export const LongFormat: Story = {
  name: 'Format: MMM d, yyyy',
  args: {
    format: 'MMM d, yyyy',
    placeholder: 'Jun 15, 2025',
    value: new Date(2025, 5, 15),
  },
}

export const ErrorState: Story = {
  args: {
    error: true,
  },
}

export const ErrorStateWithValue: Story = {
  args: {
    error: true,
    value: new Date(2025, 5, 15),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: new Date(2025, 5, 15),
  },
}

export const DisabledEmpty: Story = {
  args: {
    disabled: true,
  },
}

export const WithMinDate: Story = {
  args: {
    min: new Date(2025, 5, 1),
    placeholder: 'From June 1, 2025 onwards',
  },
}

export const WithMaxDate: Story = {
  args: {
    max: new Date(2025, 11, 31),
    placeholder: 'Up to Dec 31, 2025',
  },
}

export const WithMinMaxRange: Story = {
  args: {
    min: new Date(2025, 0, 1),
    max: new Date(2025, 11, 31),
    placeholder: 'Select date in 2025',
  },
}

export const Controlled: Story = {
  render: function ControlledDateInput() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 5, 15))

    return (
      <div className="flex flex-col gap-4 w-72">
        <DateInput value={date} onChange={setDate} />
        <p className="text-sm text-muted-foreground">
          Selected:{' '}
          {date
            ? date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            : 'none'}
        </p>
        <button
          className="text-sm text-primary underline text-left"
          onClick={() => setDate(undefined)}
        >
          Clear
        </button>
      </div>
    )
  },
}

export const WithFormValidation: Story = {
  render: function FormValidationExample() {
    const [date, setDate] = React.useState<Date | undefined>()
    const [submitted, setSubmitted] = React.useState(false)
    const hasError = submitted && !date

    return (
      <form
        className="flex flex-col gap-4 w-72"
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
        }}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Start Date *</label>
          <DateInput
            value={date}
            onChange={(d) => {
              setDate(d)
              setSubmitted(false)
            }}
            error={hasError}
            placeholder="DD/MM/YYYY"
          />
          {hasError && (
            <p className="text-xs text-destructive">Please select a start date.</p>
          )}
        </div>
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Submit
        </button>
      </form>
    )
  },
}

export const SideBySideFormFields: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex flex-col gap-1.5 w-52">
        <label className="text-sm font-medium">Start Date</label>
        <DateInput placeholder="DD/MM/YYYY" />
      </div>
      <div className="flex flex-col gap-1.5 w-52">
        <label className="text-sm font-medium">End Date</label>
        <DateInput placeholder="DD/MM/YYYY" />
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
  decorators: [],
}
