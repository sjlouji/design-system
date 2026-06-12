import { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StreamingText } from './StreamingText'

const meta = {
  title: 'AI/StreamingText',
  component: StreamingText,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { text: '' },
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content to display',
    },
    streaming: {
      control: 'boolean',
      description: 'When true, shows an animated blinking cursor after the text',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for font, size, color, etc.',
    },
  },
} satisfies Meta<typeof StreamingText>

export default meta
type Story = StoryObj<typeof meta>

export const Static: Story = {
  args: {
    text: 'This is a static message with no streaming cursor.',
    streaming: false,
  },
}

export const StreamingInProgress: Story = {
  args: {
    text: 'The answer to your question is',
    streaming: true,
  },
}

export const CursorVisible: Story = {
  args: {
    text: 'Claude is generating a response',
    streaming: true,
  },
}

export const CursorHidden: Story = {
  args: {
    text: 'Claude has finished generating.',
    streaming: false,
  },
}

export const EmptyStreaming: Story = {
  args: {
    text: '',
    streaming: true,
  },
}

export const Animated: Story = {
  render: () => {
    const fullText = 'Hello! I am streaming text character by character, just like a real AI response would appear in your application.'
    const [displayed, setDisplayed] = useState('')

    useEffect(() => {
      setDisplayed('')
      let i = 0
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayed(fullText.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
        }
      }, 40)
      return () => clearInterval(interval)
    }, [])

    const isStreaming = displayed.length < fullText.length
    return <StreamingText text={displayed} streaming={isStreaming} className="text-sm" />
  },
  parameters: { layout: 'padded' },
}

export const LongText: Story = {
  args: {
    text: 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components. React manages the rendering of components efficiently using a virtual DOM, which minimises the number of direct manipulations to the actual DOM. This makes React applications fast and responsive.',
    streaming: true,
    className: 'text-sm leading-relaxed',
  },
  parameters: { layout: 'padded' },
}

export const LargeText: Story = {
  args: {
    text: 'Generating summary',
    streaming: true,
    className: 'text-2xl font-bold',
  },
}

export const SmallText: Story = {
  args: {
    text: 'Processing your request',
    streaming: true,
    className: 'text-xs text-muted-foreground',
  },
}

export const MultilineStreaming: Story = {
  args: {
    text: 'Here is a step-by-step breakdown:\n\n1. First, identify the problem\n2. Then, analyse the constraints\n3. Finally, implement the solution',
    streaming: true,
    className: 'text-sm leading-relaxed',
  },
  parameters: { layout: 'padded' },
}

export const InChatContext: Story = {
  render: () => (
    <div className="max-w-xl">
      <div className="flex gap-3 px-4 py-3 rounded-xl hover:bg-muted/20">
        <div className="shrink-0 size-8 rounded-full flex items-center justify-center bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))] text-white text-[10px] font-bold ring-2 ring-background shadow-sm">
          AI
        </div>
        <div className="text-sm leading-relaxed text-foreground">
          <StreamingText
            text="Based on your question, here's what I think about the best approach to take when designing scalable systems"
            streaming={true}
          />
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
}

export const BeforeAndAfter: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <div>
        <p className="text-xs text-muted-foreground mb-2">Streaming (cursor visible)</p>
        <p className="text-sm text-foreground">
          <StreamingText text="The model is still generating this response" streaming={true} />
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Complete (no cursor)</p>
        <p className="text-sm text-foreground">
          <StreamingText text="The model has finished generating this response." streaming={false} />
        </p>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
}
