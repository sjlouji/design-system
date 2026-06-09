import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from './Slider'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [50],
    className: 'w-[300px]',
  },
}

export const Range: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [25, 75],
    className: 'w-[300px]',
  },
}

export const Small: Story = {
  args: {
    min: 0,
    max: 10,
    defaultValue: [5],
    className: 'w-[200px]',
  },
}
