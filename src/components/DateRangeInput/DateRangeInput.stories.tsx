import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateRangeInput } from './DateRangeInput'

const meta = {
  title: 'Components/DateRangeInput',
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
} satisfies Meta<typeof DateRangeInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithValue: Story = {
  args: {
    value: {
      from: new Date(2024, 0, 15),
      to: new Date(2024, 0, 28),
    },
  },
}

export const StartOnly: Story = {
  args: {
    value: {
      from: new Date(2024, 5, 1),
    },
  },
}

export const USFormat: Story = {
  args: {
    format: 'MM/dd/yyyy',
    placeholder: 'Start → End',
    value: {
      from: new Date(2024, 5, 1),
      to: new Date(2024, 5, 30),
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 11, 31),
    },
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Pick a date range…',
  },
}
