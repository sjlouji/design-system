import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageFeedback } from './MessageFeedback'

const meta = {
  title: 'AI/MessageFeedback',
  component: MessageFeedback,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { onSubmit: () => {} },
} satisfies Meta<typeof MessageFeedback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FeedbackSelected: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Click a thumb to see the expanded state</p>
        <MessageFeedback onSubmit={(rating, comment) => console.log(rating, comment)} />
      </div>
    )
  },
}
