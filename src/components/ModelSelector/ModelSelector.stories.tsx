import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ModelSelector } from './ModelSelector'
import type { AIModel } from './ModelSelector'

const meta = {
  title: 'AI/ModelSelector',
  component: ModelSelector,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently selected model ID (controlled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select trigger',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the trigger',
    },
  },
} satisfies Meta<typeof ModelSelector>

export default meta
type Story = StoryObj<typeof meta>

const anthropicModels: AIModel[] = [
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    contextWindow: 200000,
    description: 'Most powerful model for complex tasks',
    tier: 'powerful',
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    contextWindow: 200000,
    description: 'Balanced speed and intelligence',
    tier: 'balanced',
  },
  {
    id: 'claude-haiku-3-5',
    name: 'Claude Haiku 3.5',
    provider: 'Anthropic',
    contextWindow: 200000,
    description: 'Fastest and most compact model',
    tier: 'fast',
  },
]

const multiProviderModels: AIModel[] = [
  ...anthropicModels,
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    contextWindow: 128000,
    description: 'High-intelligence flagship model',
    tier: 'powerful',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    contextWindow: 128000,
    description: 'Affordable and intelligent small model',
    tier: 'fast',
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    contextWindow: 1000000,
    description: 'Long context multimodal model',
    tier: 'powerful',
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    contextWindow: 1000000,
    description: 'Fast and versatile multimodal model',
    tier: 'fast',
  },
]

export const Default: Story = {
  args: {
    models: anthropicModels,
    value: 'claude-sonnet-4',
    onChange: (id) => console.log('Selected:', id),
  },
}

export const WithAllTiers: Story = {
  args: {
    models: anthropicModels,
    value: 'claude-opus-4',
    onChange: (id) => console.log('Selected:', id),
  },
}

export const Disabled: Story = {
  args: {
    models: anthropicModels,
    value: 'claude-sonnet-4',
    disabled: true,
  },
}

export const SingleModel: Story = {
  args: {
    models: [anthropicModels[0]],
    value: anthropicModels[0].id,
  },
}

export const NoSelection: Story = {
  args: {
    models: anthropicModels,
  },
}

export const MultiProvider: Story = {
  args: {
    models: multiProviderModels,
    value: 'claude-sonnet-4',
    onChange: (id) => console.log('Selected:', id),
  },
}

export const ManyModels: Story = {
  args: {
    models: multiProviderModels,
    onChange: (id) => console.log('Selected:', id),
  },
}

export const WithContextWindows: Story = {
  args: {
    models: [
      {
        id: 'gpt-3-5-turbo',
        name: 'GPT-3.5 Turbo',
        provider: 'OpenAI',
        contextWindow: 16385,
        description: 'Fast and economical',
        tier: 'fast',
      },
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'OpenAI',
        contextWindow: 128000,
        description: 'High-intelligence flagship',
        tier: 'powerful',
      },
      {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        provider: 'Google',
        contextWindow: 1000000,
        description: 'One million token context',
        tier: 'powerful',
      },
    ],
    value: 'gpt-4o',
    onChange: (id) => console.log('Selected:', id),
  },
}

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('claude-sonnet-4')
    return (
      <div className="flex flex-col gap-3">
        <ModelSelector
          models={anthropicModels}
          value={selected}
          onChange={setSelected}
        />
        <p className="text-xs text-muted-foreground">
          Selected: <code className="font-mono">{selected}</code>
        </p>
      </div>
    )
  },
}

export const AllTierDots: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['fast', 'balanced', 'powerful'] as const).map((tier) => (
        <ModelSelector
          key={tier}
          models={[{
            id: `model-${tier}`,
            name: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Model`,
            provider: 'Anthropic',
            contextWindow: 200000,
            description: `A ${tier} tier model`,
            tier,
          }]}
          value={`model-${tier}`}
        />
      ))}
    </div>
  ),
}
