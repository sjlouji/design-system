import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateInput } from './DateInput'

const meta = {
  title: 'Components/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithValue: Story = {
  args: {
    value: new Date(2024, 5, 15),
  },
}

export const USFormat: Story = {
  args: {
    format: 'MM/dd/yyyy',
    placeholder: 'MM/DD/YYYY',
  },
}

export const ISOFormat: Story = {
  args: {
    format: 'yyyy-MM-dd',
    placeholder: 'YYYY-MM-DD',
  },
}

export const WithMinMax: Story = {
  args: {
    min: new Date(2024, 0, 1),
    max: new Date(2024, 11, 31),
    placeholder: 'Select date in 2024',
  },
}

export const ErrorState: Story = {
  args: {
    error: true,
    value: undefined,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: new Date(2024, 5, 15),
  },
}
