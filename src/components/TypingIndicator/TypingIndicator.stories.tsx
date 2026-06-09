import type { Meta, StoryObj } from '@storybook/react-vite'
import { TypingIndicator } from './TypingIndicator'

const meta = {
  title: 'AI/TypingIndicator',
  component: TypingIndicator,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TypingIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
