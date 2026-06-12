import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PaperclipIcon, MicIcon, ImageIcon, SparklesIcon } from 'lucide-react'
import { ChatInput } from './ChatInput'
import { Button } from '@/components/Button'

const meta = {
  title: 'AI/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    value: {
      control: 'text',
      description: 'Controlled value of the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input and send button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a spinner and stop button instead of send',
    },
    maxLength: {
      control: 'number',
      description:
        'Maximum character count. When set, a `current/max` counter appears in the toolbar. The counter turns amber when within 10% of the limit and red when over. The send button is disabled while over the limit.',
    },
    onChange: {
      action: 'onChange',
      description:
        'Fired on every keystroke with the current textarea value string. Required when using the component in controlled mode (i.e. when `value` is provided).',
    },
    onSubmit: {
      action: 'onSubmit',
      description:
        'Fired when the user clicks the send button or presses Enter (without Shift). Receives the current value string. Not called when the input is empty, loading, disabled, or over `maxLength`.',
    },
    onStop: {
      action: 'onStop',
      description:
        'Fired when the user clicks the stop button during generation. When both `loading` is true and `onStop` is provided, a square stop button replaces the send button.',
    },
    attachSlot: {
      control: false,
      description:
        'React node rendered in the left side of the toolbar, intended for file attachment or media upload buttons. Renders before `actionsSlot`.',
    },
    actionsSlot: {
      control: false,
      description:
        'React node rendered in the left side of the toolbar after `attachSlot`, intended for secondary action buttons such as microphone or AI suggestions.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root container.',
    },
  },
} satisfies Meta<typeof ChatInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Message the AI…',
    disabled: false,
    loading: false,
  },
}

export const WithValue: Story = {
  args: {
    value: 'Explain how transformers work in machine learning',
    placeholder: 'Message…',
    onSubmit: (value) => console.log('Sent:', value),
  },
}

export const Loading: Story = {
  args: {
    value: 'Waiting for response...',
    loading: true,
    onStop: () => console.log('Stopped'),
  },
}

export const LoadingWithStop: Story = {
  name: 'Loading — With Stop Button',
  args: {
    loading: true,
    onStop: () => console.log('Generation stopped'),
    placeholder: 'Message…',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Chat is unavailable…',
    disabled: true,
  },
}

export const WithMaxLength: Story = {
  args: {
    placeholder: 'Type your message… (200 char limit)',
    maxLength: 200,
    onSubmit: (value) => console.log('Sent:', value),
  },
}

export const NearMaxLength: Story = {
  name: 'Near Max Length (Warning)',
  args: {
    value: 'This message is getting very long and is approaching the character limit set on this input. Almost there!',
    maxLength: 120,
    onSubmit: (value) => console.log('Sent:', value),
  },
}

export const OverMaxLength: Story = {
  name: 'Over Max Length (Error)',
  args: {
    value: 'This message has exceeded the character limit and the text should turn red to indicate that the user needs to shorten their message before it can be submitted.',
    maxLength: 100,
    onSubmit: (value) => console.log('Sent:', value),
  },
}

export const WithAttachSlot: Story = {
  args: {
    placeholder: 'Message…',
    onSubmit: (value) => console.log('Sent:', value),
    attachSlot: (
      <Button variant="ghost" size="icon-sm" aria-label="Attach file">
        <PaperclipIcon />
      </Button>
    ),
  },
}

export const WithActionsSlot: Story = {
  args: {
    placeholder: 'Message…',
    onSubmit: (value) => console.log('Sent:', value),
    actionsSlot: (
      <Button variant="ghost" size="icon-sm" aria-label="Use microphone">
        <MicIcon />
      </Button>
    ),
  },
}

export const WithMultipleSlots: Story = {
  name: 'With Multiple Action Slots',
  args: {
    placeholder: 'Message…',
    onSubmit: (value) => console.log('Sent:', value),
    attachSlot: (
      <>
        <Button variant="ghost" size="icon-sm" aria-label="Attach file">
          <PaperclipIcon />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Attach image">
          <ImageIcon />
        </Button>
      </>
    ),
    actionsSlot: (
      <Button variant="ghost" size="icon-sm" aria-label="AI suggestions">
        <SparklesIcon />
      </Button>
    ),
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Ask me anything about your codebase…',
    onSubmit: (value) => console.log('Sent:', value),
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    const [messages, setMessages] = React.useState<string[]>([])

    const handleSubmit = (v: string) => {
      setMessages((prev) => [...prev, v])
      setValue('')
    }

    return (
      <div className="flex flex-col gap-4 max-w-xl">
        <div className="flex flex-col gap-2 min-h-[80px]">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground">No messages yet. Type something below.</p>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground w-fit ml-auto">
                {msg}
              </div>
            ))
          )}
        </div>
        <ChatInput
          value={value}
          onChange={setValue}
          onSubmit={handleSubmit}
          placeholder="Type a message and press Enter…"
        />
      </div>
    )
  },
}

export const LoadingToggle: Story = {
  name: 'Loading Toggle (Interactive)',
  render: () => {
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = () => {
      setLoading(true)
      setTimeout(() => setLoading(false), 3000)
    }

    return (
      <div className="max-w-xl">
        <ChatInput
          loading={loading}
          onSubmit={handleSubmit}
          onStop={() => setLoading(false)}
          placeholder="Submit to simulate 3s generation…"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {loading ? 'Generating… click stop to cancel.' : 'Type something and submit.'}
        </p>
      </div>
    )
  },
}

export const WithAllFeatures: Story = {
  args: {
    placeholder: 'Message Claude…',
    maxLength: 4000,
    onSubmit: (value) => console.log('Sent:', value),
    onStop: () => console.log('Stopped'),
    attachSlot: (
      <Button variant="ghost" size="icon-sm" aria-label="Attach file">
        <PaperclipIcon />
      </Button>
    ),
    actionsSlot: (
      <Button variant="ghost" size="icon-sm" aria-label="AI suggestions">
        <SparklesIcon />
      </Button>
    ),
  },
}
