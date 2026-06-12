import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar } from './Calendar'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range', 'default'],
      description: 'Selection behaviour. "single" — one date at a time. "multiple" — any number of individual dates. "range" — contiguous from/to date range. "default" — no selection state managed (display only).',
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'When true, days from the previous and next months are shown in the grid to fill the week rows. Defaults to true.',
    },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: 'How the month/year header is rendered. "label" — static text (default). "dropdown" — both month and year are select dropdowns. "dropdown-months" — only month is a dropdown. "dropdown-years" — only year is a dropdown. Dropdown modes require startMonth/endMonth to bound the range.',
    },
    buttonVariant: {
      control: 'select',
      options: ['default', 'ghost', 'outline', 'secondary', 'destructive', 'link'],
      description: 'Button variant applied to the previous/next month navigation arrow buttons. Defaults to "ghost".',
    },
    showWeekNumber: {
      control: 'boolean',
      description: 'When true, an ISO week number column is prepended to the calendar grid.',
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 4 },
      description: 'How many month grids to render side-by-side. Useful for range pickers where both the start and end month should be visible simultaneously.',
    },
    disabled: {
      control: false,
      description: 'Date matcher to disable specific days. Accepts a Date, Date[], or a function (date: Date) => boolean. Disabled days are visually dimmed and not selectable.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the outermost calendar wrapper element.',
    },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: 'single',
    showOutsideDays: true,
    captionLayout: 'label',
    buttonVariant: 'ghost',
    showWeekNumber: false,
    numberOfMonths: 1,
  },
}

export const WithSelectedDate: Story = {
  args: {
    mode: 'single',
    defaultMonth: new Date(2025, 5, 1),
    selected: new Date(2025, 5, 15),
  },
}

export const RangeSelection: Story = {
  args: {
    mode: 'range',
    defaultMonth: new Date(2025, 5, 1),
    selected: {
      from: new Date(2025, 5, 5),
      to: new Date(2025, 5, 18),
    },
  },
}

export const MultipleSelection: Story = {
  args: {
    mode: 'multiple',
    defaultMonth: new Date(2025, 5, 1),
    selected: [
      new Date(2025, 5, 3),
      new Date(2025, 5, 10),
      new Date(2025, 5, 17),
      new Date(2025, 5, 24),
    ],
  },
}

export const TwoMonths: Story = {
  args: {
    mode: 'range',
    numberOfMonths: 2,
    defaultMonth: new Date(2025, 5, 1),
    selected: {
      from: new Date(2025, 5, 20),
      to: new Date(2025, 6, 10),
    },
  },
}

export const DropdownCaption: Story = {
  args: {
    mode: 'single',
    captionLayout: 'dropdown',
    startMonth: new Date(2020, 0),
    endMonth: new Date(2030, 11),
    defaultMonth: new Date(2025, 5, 1),
  },
}

export const DropdownMonths: Story = {
  args: {
    mode: 'single',
    captionLayout: 'dropdown-months',
    startMonth: new Date(2023, 0),
    endMonth: new Date(2027, 11),
    defaultMonth: new Date(2025, 5, 1),
  },
}

export const WithWeekNumbers: Story = {
  args: {
    mode: 'single',
    showWeekNumber: true,
    defaultMonth: new Date(2025, 5, 1),
  },
}

export const HidingOutsideDays: Story = {
  args: {
    mode: 'single',
    showOutsideDays: false,
    defaultMonth: new Date(2025, 5, 1),
  },
}

export const DisabledDates: Story = {
  args: {
    mode: 'single',
    defaultMonth: new Date(2025, 5, 1),
    disabled: [
      new Date(2025, 5, 5),
      new Date(2025, 5, 12),
      new Date(2025, 5, 19),
      new Date(2025, 5, 26),
    ],
  },
}

export const DisabledWeekends: Story = {
  args: {
    mode: 'single',
    defaultMonth: new Date(2025, 5, 1),
    disabled: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
  },
}

export const FutureDatesOnly: Story = {
  args: {
    mode: 'single',
    disabled: (date: Date) => date < new Date(),
    defaultMonth: new Date(),
  },
}

export const PastDatesOnly: Story = {
  args: {
    mode: 'single',
    disabled: (date: Date) => date > new Date(),
    defaultMonth: new Date(),
  },
}

export const ControlledSingle: Story = {
  render: function ControlledSingle() {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 5, 15))

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={new Date(2025, 5, 1)}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {date ? date.toLocaleDateString('en-GB') : 'none'}
        </p>
      </div>
    )
  },
}

export const ControlledRange: Story = {
  render: function ControlledRange() {
    const [range, setRange] = React.useState<{ from: Date; to?: Date } | undefined>({
      from: new Date(2025, 5, 10),
      to: new Date(2025, 5, 20),
    })

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange as (r: unknown) => void}
          defaultMonth={new Date(2025, 5, 1)}
          numberOfMonths={2}
        />
        <div className="text-sm text-muted-foreground text-center">
          <p>From: {range?.from ? range.from.toLocaleDateString('en-GB') : '—'}</p>
          <p>To: {range?.to ? range.to.toLocaleDateString('en-GB') : '—'}</p>
        </div>
      </div>
    )
  },
}

export const InCard: Story = {
  render: () => (
    <div className="rounded-xl border shadow-sm p-4 w-fit">
      <p className="text-sm font-semibold mb-3">Select appointment date</p>
      <Calendar
        mode="single"
        defaultMonth={new Date(2025, 5, 1)}
        disabled={(date) => date.getDay() === 0 || date.getDay() === 6 || date < new Date()}
      />
    </div>
  ),
}
