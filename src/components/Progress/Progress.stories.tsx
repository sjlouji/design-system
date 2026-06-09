import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './Progress'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 50,
    className: 'w-[300px]',
  },
}

export const Zero: Story = {
  args: {
    value: 0,
    className: 'w-[300px]',
  },
}

export const Full: Story = {
  args: {
    value: 100,
    className: 'w-[300px]',
  },
}

export const Loading: Story = {
  args: {
    value: undefined,
    className: 'w-[300px]',
  },
}
