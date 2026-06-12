import type { Meta, StoryObj } from '@storybook/react-vite'
import { AnimatedShinyText } from './AnimatedShinyText'

const meta = {
  title: 'Primitives/AnimatedShinyText',
  component: AnimatedShinyText,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content to apply the shimmer effect to.',
    },
    shimmerWidth: {
      control: { type: 'range', min: 20, max: 300, step: 10 },
      description: 'Width (px) of the travelling shine highlight. Larger values create a wider, slower-looking shine. Defaults to 100.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes. Useful for overriding text size, custom gradient colours, or animation speed.',
    },
  },
} satisfies Meta<typeof AnimatedShinyText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Introducing the new design system',
    shimmerWidth: 100,
  },
}

export const Heading: Story = {
  args: {
    children: 'Ship faster with Joan',
    shimmerWidth: 150,
    className: 'text-3xl font-bold',
  },
}

export const NarrowShine: Story = {
  args: {
    children: 'A narrow highlight sweeps across',
    shimmerWidth: 50,
  },
}

export const WideShine: Story = {
  args: {
    children: 'A wide highlight sweeps across',
    shimmerWidth: 200,
  },
}

export const CustomGradient: Story = {
  args: {
    children: 'Custom blue shine',
    shimmerWidth: 120,
    className: 'text-xl font-semibold bg-gradient-to-r from-blue-400/30 via-blue-600 via-50% to-blue-400/30',
  },
}
