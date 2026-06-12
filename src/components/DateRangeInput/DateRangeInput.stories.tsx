import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateRangeInput, type DateRange } from './DateRangeInput'

const meta = {
  title: 'Forms/DateRangeInput',
  component: DateRangeInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: false,
      description: 'Controlled date range `{ from?: Date, to?: Date }`. When only `from` is set the display shows "startDate → ...". When both are set it shows the full formatted range. Pair with `onChange` for fully controlled usage.',
    },
    onChange: {
      action: 'onChange',
      description: 'Fired on every calendar selection change. Receives a `{ from?: Date, to?: Date }` object, or `undefined` if the range is cleared. The popover auto-closes once both `from` and `to` are selected.',
    },
    placeholder: {
      control: 'text',
      description: 'Text shown on the trigger button when no range is selected. Defaults to "Start date → End date".',
    },
    format: {
      control: 'select',
      options: ['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd', 'MMM d, yyyy'],
      description: 'date-fns format string used to display the selected dates on the trigger button. "dd/MM/yyyy" — day-first (UK/AU). "MM/dd/yyyy" — month-first (US). "yyyy-MM-dd" — ISO 8601. "MMM d, yyyy" — abbreviated month (e.g. Jun 15, 2025). Defaults to "dd/MM/yyyy".',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, disables the trigger button — the calendar popover cannot be opened and the button is visually dimmed.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the trigger button element.',
    },
  },
} satisfies Meta<typeof DateRangeInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Start date → End date',
    format: 'dd/MM/yyyy',
    disabled: false,
  },
}

export const WithFullRange: Story = {
  args: {
    value: {
      from: new Date(2025, 5, 1),
      to: new Date(2025, 5, 30),
    },
  },
}

export const StartDateOnly: Story = {
  args: {
    value: {
      from: new Date(2025, 5, 15),
    },
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Select a reporting period…',
  },
}

export const USFormat: Story = {
  name: 'Format: MM/DD/YYYY (US)',
  args: {
    format: 'MM/dd/yyyy',
    placeholder: 'Start → End',
    value: {
      from: new Date(2025, 5, 1),
      to: new Date(2025, 5, 30),
    },
  },
}

export const ISOFormat: Story = {
  name: 'Format: YYYY-MM-DD (ISO)',
  args: {
    format: 'yyyy-MM-dd',
    value: {
      from: new Date(2025, 0, 1),
      to: new Date(2025, 11, 31),
    },
  },
}

export const MonthRange: Story = {
  args: {
    value: {
      from: new Date(2025, 0, 1),
      to: new Date(2025, 2, 31),
    },
  },
}

export const FullYearRange: Story = {
  args: {
    value: {
      from: new Date(2025, 0, 1),
      to: new Date(2025, 11, 31),
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: {
      from: new Date(2025, 0, 1),
      to: new Date(2025, 11, 31),
    },
  },
}

export const DisabledEmpty: Story = {
  args: {
    disabled: true,
  },
}

export const Controlled: Story = {
  render: function ControlledDateRange() {
    const [range, setRange] = React.useState<DateRange | undefined>()

    return (
      <div className="flex flex-col gap-4 w-80">
        <DateRangeInput value={range} onChange={setRange} />
        <div className="text-sm text-muted-foreground space-y-0.5">
          <p>From: {range?.from ? range.from.toLocaleDateString('en-GB') : '—'}</p>
          <p>To: {range?.to ? range.to.toLocaleDateString('en-GB') : '—'}</p>
        </div>
        {range && (
          <button
            className="text-sm text-primary underline text-left"
            onClick={() => setRange(undefined)}
          >
            Clear range
          </button>
        )}
      </div>
    )
  },
}

export const WithDurationDisplay: Story = {
  render: function DurationDisplay() {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2025, 5, 1),
      to: new Date(2025, 5, 14),
    })

    const nights =
      range?.from && range?.to
        ? Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))
        : null

    return (
      <div className="flex flex-col gap-3 w-80">
        <label className="text-sm font-medium">Hotel Stay</label>
        <DateRangeInput value={range} onChange={setRange} placeholder="Check-in → Check-out" />
        {nights !== null && (
          <p className="text-sm text-muted-foreground">
            {nights} night{nights !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    )
  },
}

export const InFilterBar: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30 w-auto">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Date range:</span>
      <div className="w-72">
        <DateRangeInput
          value={{ from: new Date(2025, 0, 1), to: new Date(2025, 2, 31) }}
          placeholder="All time"
        />
      </div>
    </div>
  ),
  parameters: { layout: 'centered' },
  decorators: [],
}

export const MultipleRangeInputs: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Project Duration</label>
        <DateRangeInput placeholder="Select start and end" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Sprint Window</label>
        <DateRangeInput placeholder="Select sprint dates" />
      </div>
    </div>
  ),
  decorators: [],
}
