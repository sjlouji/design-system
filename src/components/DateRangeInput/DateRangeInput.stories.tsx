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
      description: 'Controlled date range value with optional from/to dates',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the range changes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no range is selected',
    },
    format: {
      control: 'select',
      options: ['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd', 'MMM d, yyyy'],
      description: 'Date format string for displaying selected dates',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the range input trigger',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the trigger',
    },
  },
} satisfies Meta<typeof DateRangeInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
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
