import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageActions } from './MessageActions'

const meta = {
  title: 'AI/MessageActions',
  component: MessageActions,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof MessageActions>

export default meta
type Story = StoryObj<typeof meta>

export const AllActions: Story = {
  args: {
    onCopy: () => alert('Copied!'),
    onRegenerate: () => alert('Regenerating...'),
    onThumbsUp: () => alert('Thumbs up!'),
    onThumbsDown: () => alert('Thumbs down!'),
  },
}

export const CopyOnly: Story = {
  args: {
    onCopy: () => alert('Copied!'),
  },
}

export const WithFeedback: Story = {
  args: {
    onThumbsUp: () => alert('Thumbs up!'),
    onThumbsDown: () => alert('Thumbs down!'),
  },
}
