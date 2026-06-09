import type { Meta, StoryObj } from '@storybook/react-vite'
import { ModelSelector } from './ModelSelector'
import type { AIModel } from './ModelSelector'

const meta = {
  title: 'AI/ModelSelector',
  component: ModelSelector,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ModelSelector>

export default meta
type Story = StoryObj<typeof meta>

const models: AIModel[] = [
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    contextWindow: 200000,
    description: 'Most powerful model for complex tasks',
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    contextWindow: 200000,
    description: 'Balanced speed and intelligence',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    contextWindow: 128000,
    description: 'High-intelligence flagship model',
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    contextWindow: 1000000,
    description: 'Long context multimodal model',
  },
]

export const Default: Story = {
  args: {
    models,
    value: 'claude-sonnet-4',
    onChange: (id) => console.log('Selected:', id),
  },
}

export const SingleModel: Story = {
  args: {
    models: [models[0]],
    value: models[0].id,
  },
}

export const Disabled: Story = {
  args: {
    models,
    value: 'claude-sonnet-4',
    disabled: true,
  },
}
