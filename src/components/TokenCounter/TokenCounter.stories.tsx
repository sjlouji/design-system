import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenCounter } from './TokenCounter'

const meta = {
  title: 'AI/TokenCounter',
  component: TokenCounter,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TokenCounter>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    current: 1200,
    max: 8000,
  },
}

export const Warning: Story = {
  args: {
    current: 6200,
    max: 8000,
  },
}

export const Critical: Story = {
  args: {
    current: 7400,
    max: 8000,
  },
}
