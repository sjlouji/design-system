import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    value: {
      control: false,
      description: 'Controlled selected `Date`. When set, the trigger button displays the formatted date ("PPP" format, e.g. "June 15th, 2025"). Pair with `onChange` for fully controlled usage.',
    },
    onChange: {
      action: 'onChange',
      description: 'Fired when the user selects a date from the calendar popover. Receives the selected `Date` object, or `undefined` if the selection is cleared.',
    },
    placeholder: {
      control: 'text',
      description: 'Text shown on the trigger button when no date is selected. Renders in muted foreground colour. Defaults to "Pick a date".',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, disables the trigger button — the calendar popover cannot be opened and the button is visually dimmed.',
    },
    fromDate: {
      control: false,
      description: 'Earliest selectable `Date`. Dates before this value are disabled in the calendar. Use for "future dates only" or "start of valid range" constraints.',
    },
    toDate: {
      control: false,
      description: 'Latest selectable `Date`. Dates after this value are disabled in the calendar. Use for "past dates only" or "end of valid range" constraints.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the trigger button. The default width is `w-[240px]` — pass `w-full` to make it fill its container.',
    },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: {
    placeholder: 'Pick a date',
    disabled: false,
  },
}

export const WithPreselectedDate: Story = {
  args: {
    value: new Date(2025, 5, 15),
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Choose a delivery date…',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Pick a date',
    disabled: true,
  },
}

export const DisabledWithDate: Story = {
  args: {
    value: new Date(2025, 5, 15),
    disabled: true,
  },
}

export const WithFromDate: Story = {
  name: 'From Date (min)',
  args: {
    placeholder: 'Select a future date',
    fromDate: new Date(),
  },
}

export const WithToDate: Story = {
  name: 'To Date (max)',
  args: {
    placeholder: 'Select a past date',
    toDate: new Date(),
  },
}

export const WithDateRange: Story = {
  name: 'Constrained date range',
  args: {
    placeholder: 'Select date in Q3 2025',
    fromDate: new Date(2025, 6, 1),
    toDate: new Date(2025, 8, 30),
  },
}

export const FullWidth: Story = {
  args: {
    placeholder: 'Pick a date',
    className: 'w-full',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export const Controlled: Story = {
  render: function ControlledDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>()

    return (
      <div className="flex flex-col gap-4">
        <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
        <p className="text-sm text-muted-foreground">
          Selected:{' '}
          {date
            ? date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'none'}
        </p>
        {date && (
          <button
            className="text-sm text-primary underline text-left"
            onClick={() => setDate(undefined)}
          >
            Clear selection
          </button>
        )}
      </div>
    )
  },
}

export const BirthDatePicker: Story = {
  render: function BirthDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>()
    const today = new Date()
    const minAge = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
    const maxAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

    return (
      <div className="flex flex-col gap-4 w-72">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Date of Birth</label>
          <p className="text-xs text-muted-foreground">You must be at least 18 years old.</p>
          <DatePicker
            value={date}
            onChange={setDate}
            placeholder="Select your birth date"
            fromDate={minAge}
            toDate={maxAge}
          />
        </div>
        {date && (
          <p className="text-sm text-muted-foreground">
            Age:{' '}
            {today.getFullYear() -
              date.getFullYear() -
              (today < new Date(today.getFullYear(), date.getMonth(), date.getDate()) ? 1 : 0)}{' '}
            years
          </p>
        )}
      </div>
    )
  },
  parameters: { layout: 'centered' },
}

export const InForm: Story = {
  render: function InFormExample() {
    const [startDate, setStartDate] = React.useState<Date | undefined>()
    const [endDate, setEndDate] = React.useState<Date | undefined>()

    return (
      <form className="flex flex-col gap-4 w-96 p-4 border rounded-lg">
        <h3 className="text-sm font-semibold">Schedule Event</h3>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Start Date</label>
          <DatePicker
            value={startDate}
            onChange={(d) => {
              setStartDate(d)
              if (endDate && d && endDate < d) setEndDate(undefined)
            }}
            placeholder="Pick start date"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">End Date</label>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            placeholder="Pick end date"
            fromDate={startDate}
            disabled={!startDate}
            className="w-full"
          />
        </div>
        {startDate && endDate && (
          <p className="text-xs text-muted-foreground">
            Duration:{' '}
            {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
          </p>
        )}
      </form>
    )
  },
  parameters: { layout: 'centered' },
}

export const MultipleInline: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <DatePicker placeholder="From" />
      <span className="text-muted-foreground text-sm">to</span>
      <DatePicker placeholder="To" />
    </div>
  ),
  parameters: { layout: 'centered' },
}
