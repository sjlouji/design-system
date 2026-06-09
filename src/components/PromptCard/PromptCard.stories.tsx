import type { Meta, StoryObj } from '@storybook/react-vite'
import { PromptCard } from './PromptCard'

const meta = {
  title: 'AI/PromptCard',
  component: PromptCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof PromptCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Summarise article',
    content: 'Please summarise the following article in 3 bullet points, focusing on the key takeaways and actionable insights.',
  },
}

export const WithCategory: Story = {
  args: {
    title: 'Code review',
    content: 'Review the following code for bugs, performance issues, and adherence to best practices. Provide specific suggestions for improvement.',
    category: 'Engineering',
  },
}

export const WithAllActions: Story = {
  args: {
    title: 'Write a blog post',
    content: 'Write a 500-word blog post about the given topic. Use an engaging title, include subheadings, and end with a call-to-action.',
    category: 'Writing',
    onUse: () => alert('Use'),
    onCopy: () => alert('Copy'),
    onDelete: () => alert('Delete'),
  },
}
