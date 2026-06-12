import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateRangePicker, type DateRangePickerValue, type RelativeOption } from './DateRangePicker'

const meta = {
  title: 'Forms/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    value: {
      control: false,
      description:
        'Controlled value. Either `{ type: "relative", amount, unit, key? }` for a relative range, or `{ type: "absolute", startDate, endDate }` for an absolute range (both dates as ISO 8601 strings). Pass `null` or `undefined` to represent an unset range.',
    },
    onChange: {
      action: 'onChange',
      description:
        'Fired when the user clicks Apply. Receives the new `DateRangePickerValue`, or `null` when "Clear and dismiss" is clicked.',
    },
    relativeOptions: {
      control: false,
      description:
        'Array of predefined relative options shown in the Relative mode tab. Each entry: `{ key, amount, unit, type: "relative" }`. If omitted, only Absolute mode is shown.',
    },
    isValidRange: {
      control: false,
      description:
        'Validation callback fired before Apply. Receives the pending value. Return `{ valid: false, errorMessage }` to block the apply and show an error message.',
    },
    placeholder: {
      control: 'text',
      description: 'Text shown on the trigger when no value is selected. Defaults to "Filter by a date and time range".',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, the trigger button is disabled and the popover cannot be opened.',
    },
    i18nStrings: {
      control: false,
      description:
        'Optional overrides for all UI labels (mode titles, button labels, field labels, format hint). All keys are optional — only override what you need.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the trigger button.',
    },
  },
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

// Shared relative options (matching the CloudScape examples)
const relativeOptions: RelativeOption[] = [
  { key: 'previous-5-minutes', amount: 5, unit: 'minute', type: 'relative' },
  { key: 'previous-30-minutes', amount: 30, unit: 'minute', type: 'relative' },
  { key: 'previous-1-hour', amount: 1, unit: 'hour', type: 'relative' },
  { key: 'previous-6-hours', amount: 6, unit: 'hour', type: 'relative' },
]

// Shared validation (matches CloudScape isValidRange example)
function isValidRange(range: NonNullable<DateRangePickerValue>) {
  if (range.type === 'absolute') {
    const [startDate] = range.startDate.split('T')
    const [endDate] = range.endDate.split('T')
    if (!startDate || !endDate) {
      return {
        valid: false,
        errorMessage:
          'The selected date range is incomplete. Select a start and end date for the date range.',
      }
    }
    if (new Date(range.startDate).getTime() - new Date(range.endDate).getTime() > 0) {
      return {
        valid: false,
        errorMessage:
          'The selected date range is invalid. The start date must be before the end date.',
      }
    }
  }
  return { valid: true }
}

// ── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: function DefaultPicker() {
    const [value, setValue] = React.useState<DateRangePickerValue>(undefined)
    return (
      <div className="w-80">
        <DateRangePicker
          value={value}
          onChange={setValue}
          relativeOptions={relativeOptions}
          isValidRange={isValidRange}
          placeholder="Filter by a date and time range"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Empty state. Opens to Relative mode by default when `relativeOptions` are provided. Select a preset and click Apply.',
      },
    },
  },
}

export const WithRelativeValue: Story = {
  render: function RelativeValuePicker() {
    const [value, setValue] = React.useState<DateRangePickerValue>({
      type: 'relative',
      amount: 12,
      unit: 'day',
    })
    return (
      <div className="w-80">
        <DateRangePicker
          value={value}
          onChange={setValue}
          relativeOptions={relativeOptions}
          isValidRange={isValidRange}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pre-seeded with a custom relative value `{ type: "relative", amount: 12, unit: "day" }`. Trigger shows "Last 12 days". Opening the picker shows the Custom range section pre-filled.',
      },
    },
  },
}

export const WithPresetRelativeValue: Story = {
  render: function PresetPicker() {
    const [value, setValue] = React.useState<DateRangePickerValue>({
      type: 'relative',
      key: 'previous-1-hour',
      amount: 1,
      unit: 'hour',
    })
    return (
      <div className="w-80">
        <DateRangePicker
          value={value}
          onChange={setValue}
          relativeOptions={relativeOptions}
          isValidRange={isValidRange}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pre-seeded with the "Last 1 hour" preset. Opening the picker shows the matching radio option selected.',
      },
    },
  },
}

export const WithAbsoluteValue: Story = {
  render: function AbsoluteValuePicker() {
    const today = new Date()
    const start = new Date(today.getFullYear(), today.getMonth(), 1)
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    const [value, setValue] = React.useState<DateRangePickerValue>({
      type: 'absolute',
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    })
    return (
      <div className="w-96">
        <DateRangePicker
          value={value}
          onChange={setValue}
          relativeOptions={relativeOptions}
          isValidRange={isValidRange}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pre-seeded with an absolute range covering the current month. Opening the picker shows Absolute mode with the calendar pre-highlighted.',
      },
    },
  },
}

export const AbsoluteOnly: Story = {
  render: function AbsoluteOnlyPicker() {
    const [value, setValue] = React.useState<DateRangePickerValue>(undefined)
    return (
      <div className="w-80">
        <DateRangePicker
          value={value}
          onChange={setValue}
          isValidRange={isValidRange}
          placeholder="Select a date range"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'No `relativeOptions` provided — only Absolute mode is available (no mode toggle shown).',
      },
    },
  },
}

export const Disabled: Story = {
  render: function DisabledPicker() {
    return (
      <div className="w-80">
        <DateRangePicker
          value={{ type: 'relative', key: 'previous-1-hour', amount: 1, unit: 'hour' }}
          relativeOptions={relativeOptions}
          disabled
        />
      </div>
    )
  },
}

export const InFilterBar: Story = {
  render: function FilterBar() {
    const [value, setValue] = React.useState<DateRangePickerValue>(undefined)
    return (
      <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
        <span className="whitespace-nowrap text-sm text-muted-foreground">Time range:</span>
        <div className="w-72">
          <DateRangePicker
            value={value}
            onChange={setValue}
            relativeOptions={relativeOptions}
            isValidRange={isValidRange}
            placeholder="Filter by date and time"
          />
        </div>
      </div>
    )
  },
  parameters: { layout: 'padded' },
}

export const CustomLabels: Story = {
  render: function CustomLabelsPicker() {
    const [value, setValue] = React.useState<DateRangePickerValue>(undefined)
    return (
      <div className="w-80">
        <DateRangePicker
          value={value}
          onChange={setValue}
          relativeOptions={relativeOptions}
          isValidRange={isValidRange}
          placeholder="Select reporting period"
          i18nStrings={{
            relativeModeTitle: 'Relative',
            absoluteModeTitle: 'Absolute',
            chooseRangeLabel: 'Select a preset',
            clearButtonLabel: 'Reset',
            applyButtonLabel: 'Confirm',
          }}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Override any label via `i18nStrings`. Only the keys you provide are replaced.',
      },
    },
  },
}
