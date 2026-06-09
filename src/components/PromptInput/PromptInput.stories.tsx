import type { Meta, StoryObj } from '@storybook/react-vite'
import { PromptInput } from './PromptInput'

const meta = {
  title: 'AI/PromptInput',
  component: PromptInput,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof PromptInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Write a short story about…',
    onSubmit: (v) => alert(`Submitted: ${v}`),
  },
}

export const WithTokenCount: Story = {
  args: {
    placeholder: 'Enter your prompt…',
    maxTokens: 2000,
    currentTokens: 450,
    onSubmit: (v) => alert(`Submitted: ${v}`),
  },
}

export const NearLimit: Story = {
  args: {
    placeholder: 'Enter your prompt…',
    maxTokens: 2000,
    currentTokens: 1850,
    onSubmit: (v) => alert(`Submitted: ${v}`),
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input…',
    disabled: true,
  },
}
