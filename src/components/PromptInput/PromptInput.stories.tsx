import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PromptInput } from './PromptInput'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { PaperclipIcon, ImageIcon } from 'lucide-react'

const meta = {
  title: 'AI/PromptInput',
  component: PromptInput,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Textarea placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea and submit button',
    },
    maxTokens: {
      control: { type: 'number', min: 0 },
      description: 'When set alongside currentTokens, displays a TokenCounter',
    },
    currentTokens: {
      control: { type: 'number', min: 0 },
      description: 'Current token usage shown in the footer',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root wrapper',
    },
  },
} satisfies Meta<typeof PromptInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter your prompt…',
    onSubmit: (v) => console.log('Submitted:', v),
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Ask anything about your codebase…',
    onSubmit: (v) => console.log('Submitted:', v),
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Waiting for response…',
    disabled: true,
  },
}

export const WithTokenCounterLow: Story = {
  args: {
    placeholder: 'Enter your prompt…',
    maxTokens: 8192,
    currentTokens: 450,
    onSubmit: (v) => console.log('Submitted:', v),
  },
}

export const WithTokenCounterWarning: Story = {
  args: {
    placeholder: 'Enter your prompt…',
    maxTokens: 8192,
    currentTokens: 6800,
    onSubmit: (v) => console.log('Submitted:', v),
  },
}

export const WithTokenCounterCritical: Story = {
  args: {
    placeholder: 'Enter your prompt…',
    maxTokens: 8192,
    currentTokens: 7900,
    onSubmit: (v) => console.log('Submitted:', v),
  },
}

export const WithPrefilledValue: Story = {
  args: {
    value: 'Explain the difference between useMemo and useCallback in React.',
    onSubmit: (v) => console.log('Submitted:', v),
    onChange: (v) => console.log('Changed:', v),
  },
}

export const WithActionsSlot: Story = {
  args: {
    placeholder: 'Describe what you need…',
    onSubmit: (v) => console.log('Submitted:', v),
    actionsSlot: (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground">
          <PaperclipIcon className="size-3.5" />
          Attach file
        </Button>
        <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground">
          <ImageIcon className="size-3.5" />
          Image
        </Button>
        <div className="ml-auto">
          <Badge variant="secondary" className="text-xs font-normal">GPT-4o</Badge>
        </div>
      </div>
    ),
  },
}

export const WithAllFeatures: Story = {
  args: {
    placeholder: 'Write a prompt…',
    maxTokens: 8192,
    currentTokens: 1200,
    onSubmit: (v) => console.log('Submitted:', v),
    onChange: (v) => console.log('Changed:', v),
    actionsSlot: (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground">
          <PaperclipIcon className="size-3.5" />
          Attach
        </Button>
      </div>
    ),
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    const [submitted, setSubmitted] = React.useState<string[]>([])

    return (
      <div className="flex flex-col gap-4 w-full max-w-xl">
        <PromptInput
          value={value}
          onChange={setValue}
          onSubmit={(v) => {
            setSubmitted((prev) => [v, ...prev])
            setValue('')
          }}
          placeholder="Type something and submit…"
        />
        {submitted.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground font-medium">Submitted:</p>
            {submitted.map((s, i) => (
              <p key={i} className="text-xs bg-muted rounded-md px-2 py-1 font-mono truncate">
                {s}
              </p>
            ))}
          </div>
        )}
      </div>
    )
  },
}

export const SubmittingState: Story = {
  render: () => {
    const [submitting, setSubmitting] = React.useState(false)
    const [lastSubmit, setLastSubmit] = React.useState('')

    const handleSubmit = (v: string) => {
      setSubmitting(true)
      setLastSubmit(v)
      setTimeout(() => setSubmitting(false), 2000)
    }

    return (
      <div className="flex flex-col gap-3 w-full max-w-xl">
        <PromptInput
          placeholder="Submit to trigger loading state…"
          disabled={submitting}
          onSubmit={handleSubmit}
        />
        {submitting && (
          <p className="text-xs text-muted-foreground">
            Generating response for: <em>{lastSubmit}</em>
          </p>
        )}
      </div>
    )
  },
}
