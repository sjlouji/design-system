import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar } from './Calendar'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: 'single',
  },
}

export const Selected: Story = {
  args: {
    mode: 'single',
    defaultMonth: new Date(2024, 0, 1),
    selected: new Date(2024, 0, 15),
  },
}
