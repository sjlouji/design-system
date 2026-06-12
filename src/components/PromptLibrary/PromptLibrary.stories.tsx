import type { Meta, StoryObj } from '@storybook/react-vite'
import { PromptLibrary } from './PromptLibrary'
import type { PromptCardData } from './PromptLibrary'

const meta = {
  title: 'AI/PromptLibrary',
  component: PromptLibrary,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    prompts: {
      control: false,
      description: 'Array of `PromptCardData` objects (`{ id, title, content, category? }`) to display. The library derives category filter buttons from the unique `category` values in this list.',
    },
    onUse: {
      action: 'onUse',
      description: 'Fires when the "Use" button on a card is clicked. Receives the `id` string of the selected prompt. Providing this prop makes the Use button visible on every card.',
    },
    onCopy: {
      action: 'onCopy',
      description: 'Fires when the "Copy" button on a card is clicked. Receives the `id` string of the selected prompt.',
    },
    onDelete: {
      action: 'onDelete',
      description: 'Fires when the "Delete" button on a card is clicked. Receives the `id` string of the selected prompt.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the root wrapper element.',
    },
  },
} satisfies Meta<typeof PromptLibrary>

export default meta
type Story = StoryObj<typeof meta>

const samplePrompts: PromptCardData[] = [
  { id: '1', title: 'Summarise article', content: 'Summarise this article in 3 bullet points with key takeaways.', category: 'Writing' },
  { id: '2', title: 'Code review', content: 'Review this code for bugs, performance issues, and best practices.', category: 'Engineering' },
  { id: '3', title: 'Write unit tests', content: 'Write comprehensive unit tests for the following function, covering edge cases.', category: 'Engineering' },
  { id: '4', title: 'Brainstorm ideas', content: 'Generate 10 creative ideas for the following problem or topic.', category: 'Creative' },
  { id: '5', title: 'Explain concept', content: 'Explain this concept as if I am a complete beginner. Use simple language and analogies.', category: 'Writing' },
  { id: '6', title: 'Draft email', content: 'Write a professional email based on the following context and requirements.', category: 'Writing' },
]

export const Default: Story = {
  args: {
    prompts: samplePrompts,
    onUse: (id) => alert(`Use: ${id}`),
    onCopy: (id) => alert(`Copy: ${id}`),
    onDelete: (id) => alert(`Delete: ${id}`),
  },
}

export const Empty: Story = {
  args: {
    prompts: [],
  },
}

export const WithFilter: Story = {
  args: {
    prompts: samplePrompts,
    onUse: (id) => console.log('Use:', id),
    onCopy: (id) => console.log('Copy:', id),
  },
}
