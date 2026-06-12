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
      description: 'When true, disables the trigger button — the calendar popover cannot be opened.',
    },
    fromDate: {
      control: false,
      description: 'Earliest selectable `Date`. Dates before this value are disabled in the calendar.',
    },
    toDate: {
      control: false,
      description: 'Latest selectable `Date`. Dates after this value are disabled in the calendar.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the trigger button. Default width is `w-[240px]`.',
    },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: function DefaultDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>()
    return (
      <div className="flex flex-col gap-3">
        <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
        <p className="text-sm text-muted-foreground">
          Selected: <strong>{date ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'none'}</strong>
        </p>
      </div>
    )
  },
}

export const WithPreselectedDate: Story = {
  render: function PreselectedDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 5, 15))
    return (
      <div className="flex flex-col gap-3">
        <DatePicker value={date} onChange={setDate} />
        <p className="text-sm text-muted-foreground">
          Selected: <strong>{date ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'none'}</strong>
        </p>
      </div>
    )
  },
}

export const CustomPlaceholder: Story = {
  render: function CustomPlaceholderPicker() {
    const [date, setDate] = React.useState<Date | undefined>()
    return (
      <DatePicker value={date} onChange={setDate} placeholder="Choose a delivery date…" />
    )
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Pick a date',
    disabled: true,
  },
}

export const DisabledWithDate: Story = {
  render: () => (
    <DatePicker value={new Date(2025, 5, 15)} disabled />
  ),
}

export const FutureDatesOnly: Story = {
  name: 'Future Dates Only (fromDate)',
  render: function FutureDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>()
    const today = new Date()
    return (
      <div className="flex flex-col gap-3">
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Select a future date"
          fromDate={today}
        />
        {date && (
          <p className="text-sm text-muted-foreground">
            Selected: <strong>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
          </p>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `fromDate={new Date()}` to allow only future dates. Past dates are disabled in the calendar.',
      },
    },
  },
}

export const PastDatesOnly: Story = {
  name: 'Past Dates Only (toDate)',
  render: function PastDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>()
    const today = new Date()
    return (
      <div className="flex flex-col gap-3">
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Select a past date"
          toDate={today}
        />
        {date && (
          <p className="text-sm text-muted-foreground">
            Selected: <strong>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
          </p>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `toDate={new Date()}` to allow only past dates. Future dates are disabled in the calendar.',
      },
    },
  },
}

export const ConstrainedRange: Story = {
  name: 'Constrained Range (Q3 2025)',
  render: function ConstrainedDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>()
    return (
      <div className="flex flex-col gap-3">
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Select date in Q3 2025"
          fromDate={new Date(2025, 6, 1)}
          toDate={new Date(2025, 8, 30)}
        />
        {date && (
          <p className="text-sm text-muted-foreground">
            Selected: <strong>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
          </p>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Use both `fromDate` and `toDate` to restrict selection to a specific window.',
      },
    },
  },
}

export const FullWidth: Story = {
  render: function FullWidthDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>()
    return (
      <div className="w-80">
        <DatePicker value={date} onChange={setDate} placeholder="Pick a date" className="w-full" />
      </div>
    )
  },
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
            ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
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
  render: function BirthDate() {
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
}

export const InForm: Story = {
  render: function InFormExample() {
    const [startDate, setStartDate] = React.useState<Date | undefined>()
    const [endDate, setEndDate] = React.useState<Date | undefined>()

    return (
      <form className="flex flex-col gap-4 w-80 p-4 border rounded-lg">
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
