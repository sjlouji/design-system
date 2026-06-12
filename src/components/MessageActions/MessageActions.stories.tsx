import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageActions } from './MessageActions'

const meta = {
  title: 'AI/MessageActions',
  component: MessageActions,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes on the toolbar root',
    },
  },
} satisfies Meta<typeof MessageActions>

export default meta
type Story = StoryObj<typeof meta>

export const AllActions: Story = {
  args: {
    onCopy: () => console.log('copy'),
    onRegenerate: () => console.log('regenerate'),
    onThumbsUp: () => console.log('thumbs up'),
    onThumbsDown: () => console.log('thumbs down'),
  },
}

export const CopyOnly: Story = {
  args: {
    onCopy: () => console.log('copy'),
  },
}

export const RegenerateOnly: Story = {
  args: {
    onRegenerate: () => console.log('regenerate'),
  },
}

export const FeedbackOnly: Story = {
  args: {
    onThumbsUp: () => console.log('thumbs up'),
    onThumbsDown: () => console.log('thumbs down'),
  },
}

export const CopyAndRegenerate: Story = {
  args: {
    onCopy: () => console.log('copy'),
    onRegenerate: () => console.log('regenerate'),
  },
}

export const CopyAndFeedback: Story = {
  args: {
    onCopy: () => console.log('copy'),
    onThumbsUp: () => console.log('thumbs up'),
    onThumbsDown: () => console.log('thumbs down'),
  },
}

export const CopyShowsCheckmark: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-xs text-muted-foreground">Click Copy — the icon switches to a checkmark for 1.5s</p>
      <MessageActions
        onCopy={() => console.log('copied')}
        onRegenerate={() => console.log('regenerate')}
        onThumbsUp={() => console.log('up')}
        onThumbsDown={() => console.log('down')}
      />
    </div>
  ),
}

export const HoverRevealPattern: Story = {
  render: () => (
    <div className="group max-w-md px-4 py-3 rounded-xl hover:bg-muted/20 transition-colors">
      <div className="text-sm leading-relaxed mb-2">
        Here is my response to your question. React hooks are functions that let you use state and
        other React features in functional components.
      </div>
      <div className="opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-150">
        <MessageActions
          onCopy={() => console.log('copy')}
          onRegenerate={() => console.log('regenerate')}
          onThumbsUp={() => console.log('up')}
          onThumbsDown={() => console.log('down')}
        />
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
}

export const ThumbsUpActive: Story = {
  render: () => (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-xs text-muted-foreground">Click thumbs up/down to toggle active state</p>
      <MessageActions
        onCopy={() => console.log('copy')}
        onThumbsUp={() => console.log('thumbs up')}
        onThumbsDown={() => console.log('thumbs down')}
      />
    </div>
  ),
}

export const InAssistantMessage: Story = {
  render: () => (
    <div className="group flex gap-3 px-4 py-3 rounded-xl hover:bg-muted/20 max-w-lg">
      <div className="shrink-0 size-8 rounded-full flex items-center justify-center bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))] text-white text-[10px] font-bold ring-2 ring-background shadow-sm mt-0.5">
        AI
      </div>
      <div className="flex flex-col items-start min-w-0">
        <div className="text-sm leading-relaxed text-foreground">
          The capital of France is Paris. It has been the country's capital since 987 AD.
        </div>
        <div className="mt-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-150">
          <MessageActions
            onCopy={() => console.log('copy')}
            onRegenerate={() => console.log('regenerate')}
            onThumbsUp={() => console.log('up')}
            onThumbsDown={() => console.log('down')}
          />
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
}
