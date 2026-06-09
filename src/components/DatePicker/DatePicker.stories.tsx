import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { DatePicker } from "./DatePicker"

const meta: Meta<typeof DatePicker> = {
  title: "Forms/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: {
    placeholder: "Pick a date",
  },
}

export const WithValue: Story = {
  args: {
    value: new Date(2025, 3, 29), // April 29, 2025
    placeholder: "Pick a date",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Pick a date",
    disabled: true,
  },
}

export const Controlled: Story = {
  render: function ControlledDatePicker() {
    const [date, setDate] = React.useState<Date | undefined>()

    return (
      <div className="flex flex-col gap-4">
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Pick a date"
        />
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          {date
            ? date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "none"}
        </p>
      </div>
    )
  },
}
