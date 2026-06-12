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
      description: 'Controlled date value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the date changes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when no date is selected',
    },
    format: {
      control: 'select',
      options: ['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd', 'dd-MM-yyyy', 'MMM d, yyyy'],
      description: 'Date format string (date-fns format tokens)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input and calendar button',
    },
    error: {
      control: 'boolean',
      description: 'Renders the input in an error state',
    },
    min: {
      control: false,
      description: 'Minimum selectable date (disables earlier dates in the calendar)',
    },
    max: {
      control: false,
      description: 'Maximum selectable date (disables later dates in the calendar)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the wrapper',
    },
  },
} satisfies Meta<typeof DateInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
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
