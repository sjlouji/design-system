import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageFeedback } from './MessageFeedback'

const meta = {
  title: 'AI/MessageFeedback',
  component: MessageFeedback,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { onSubmit: () => {} },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root wrapper',
    },
  },
} satisfies Meta<typeof MessageFeedback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithOnSubmitCallback: Story = {
  args: {
    onSubmit: (rating?: 'positive' | 'negative', comment?: string) => console.log('Feedback:', rating, comment),
  },
}

export const ThumbsUpFlow: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">Click the thumbs up button to see the comment form appear</p>
      <MessageFeedback
        onSubmit={(rating, comment) => console.log('Submitted:', rating, comment)}
      />
    </div>
  ),
}

export const ThumbsDownFlow: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">Click the thumbs down button to see the negative feedback form</p>
      <MessageFeedback
        onSubmit={(rating, comment) => console.log('Submitted:', rating, comment)}
      />
    </div>
  ),
}

export const WithLogging: Story = {
  render: () => {
    const [log, setLog] = React.useState<string[]>([])

    return (
      <div className="flex flex-col gap-4 w-72">
        <MessageFeedback
          onSubmit={(rating, comment) => {
            setLog((prev) => [`${rating}${comment ? `: "${comment}"` : ''}`, ...prev])
          }}
        />
        {log.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground font-medium">Submitted feedback:</p>
            {log.map((entry, i) => (
              <p key={i} className="text-xs bg-muted rounded px-2 py-1 font-mono">
                {entry}
              </p>
            ))}
          </div>
        )}
      </div>
    )
  },
}

export const SubmittedState: Story = {
  render: () => {
    const [submitted, setSubmitted] = React.useState(false)
    const [key, setKey] = React.useState(0)

    return (
      <div className="flex flex-col gap-3">
        <MessageFeedback
          key={key}
          onSubmit={(rating, comment) => {
            console.log('Feedback:', rating, comment)
            setSubmitted(true)
          }}
        />
        {submitted && (
          <button
            className="text-xs text-muted-foreground underline"
            onClick={() => { setSubmitted(false); setKey((k) => k + 1) }}
          >
            Reset
          </button>
        )}
      </div>
    )
  },
}

export const InMessageContext: Story = {
  render: () => (
    <div className="max-w-md flex flex-col gap-3 p-4 rounded-xl border border-border bg-card">
      <p className="text-sm leading-relaxed">
        The capital of France is Paris, which has been the country's political, cultural, and economic centre for centuries.
      </p>
      <div className="border-t border-border/60 pt-3">
        <p className="text-xs text-muted-foreground mb-2">Was this response helpful?</p>
        <MessageFeedback
          onSubmit={(rating, comment) => console.log('Feedback:', rating, comment)}
        />
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
}

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {['Response 1', 'Response 2', 'Response 3'].map((label) => (
        <div key={label} className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <MessageFeedback
            onSubmit={(rating, comment) => console.log(`${label} feedback:`, rating, comment)}
          />
        </div>
      ))}
    </div>
  ),
}
