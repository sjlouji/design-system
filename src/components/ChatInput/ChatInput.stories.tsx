import type { Meta, StoryObj } from '@storybook/react-vite'
import { PaperclipIcon } from 'lucide-react'
import { ChatInput } from './ChatInput'
import { Button } from '@/components/Button'

const meta = {
  title: 'AI/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ChatInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Message the AI…',
    onSubmit: (value) => alert(`Sent: ${value}`),
  },
}

export const Loading: Story = {
  args: {
    value: 'Waiting for response...',
    loading: true,
  },
}

export const WithMaxLength: Story = {
  args: {
    placeholder: 'Type your message…',
    maxLength: 200,
    onSubmit: (value) => alert(`Sent: ${value}`),
  },
}

export const WithAttachSlot: Story = {
  args: {
    placeholder: 'Message…',
    onSubmit: (value) => alert(`Sent: ${value}`),
    attachSlot: (
      <Button variant="ghost" size="icon-sm" aria-label="Attach file">
        <PaperclipIcon />
      </Button>
    ),
  },
}
