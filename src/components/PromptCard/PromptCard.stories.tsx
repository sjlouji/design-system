import type { Meta, StoryObj } from '@storybook/react-vite'
import { PromptCard } from './PromptCard'

const meta = {
  title: 'AI/PromptCard',
  component: PromptCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    title: {
      control: 'text',
      description: 'Short title displayed at the top of the card',
    },
    content: {
      control: 'text',
      description: 'Prompt body text, line-clamped to 2 lines',
    },
    category: {
      control: 'text',
      description: 'Optional badge label shown beside the title',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the card root',
    },
  },
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

export const WithUseAction: Story = {
  args: {
    title: 'Write a blog post',
    content: 'Write a 500-word blog post about the given topic. Use an engaging title, include subheadings, and end with a call-to-action.',
    category: 'Writing',
    onUse: () => console.log('Use clicked'),
  },
}

export const WithCopyAction: Story = {
  args: {
    title: 'Translate to Spanish',
    content: 'Translate the following text to Spanish. Maintain the tone and style of the original, and flag any idioms that do not translate directly.',
    category: 'Language',
    onCopy: () => console.log('Copy clicked'),
  },
}

export const WithAllActions: Story = {
  args: {
    title: 'Explain like I\'m 5',
    content: 'Explain the following concept as if you are talking to a 5-year-old. Use simple words, analogies, and avoid jargon.',
    category: 'Education',
    onUse: () => console.log('Use clicked'),
    onCopy: () => console.log('Copy clicked'),
    onDelete: () => console.log('Delete clicked'),
  },
}

export const WithDeleteOnly: Story = {
  args: {
    title: 'SQL query optimiser',
    content: 'Analyse the following SQL query and suggest optimisations to improve performance. Consider indexing, query structure, and execution plan.',
    category: 'Database',
    onDelete: () => console.log('Delete clicked'),
  },
}

export const NoActions: Story = {
  args: {
    title: 'Meeting summary',
    content: 'Summarise the key decisions, action items, and follow-ups from the following meeting transcript.',
    category: 'Productivity',
  },
}

export const LongContent: Story = {
  args: {
    title: 'Comprehensive code audit',
    content: 'Please perform a thorough review of the provided codebase, examining security vulnerabilities, code quality, performance bottlenecks, test coverage gaps, documentation completeness, dependency risks, and adherence to the project\'s established coding standards and patterns. Provide a prioritised list of findings with severity ratings.',
    category: 'Engineering',
    onUse: () => console.log('Use'),
    onCopy: () => console.log('Copy'),
    onDelete: () => console.log('Delete'),
  },
}

export const ShortContent: Story = {
  args: {
    title: 'Quick fix',
    content: 'Fix the bug in the code below.',
    onUse: () => console.log('Use'),
    onCopy: () => console.log('Copy'),
  },
}

export const Grid: Story = {
  args: {} as Story['args'],
  render: () => (
    <div className="grid grid-cols-2 gap-3 w-[600px]">
      {[
        { title: 'Summarise article', content: 'Summarise in 3 bullet points with key takeaways.', category: 'Research' },
        { title: 'Code review', content: 'Review for bugs, performance, and best practices.', category: 'Engineering' },
        { title: 'Draft email', content: 'Write a professional email for the given scenario.', category: 'Writing' },
        { title: 'Translate text', content: 'Translate to Spanish maintaining tone and style.', category: 'Language' },
      ].map((p) => (
        <PromptCard
          key={p.title}
          {...p}
          onUse={() => console.log('Use:', p.title)}
          onCopy={() => console.log('Copy:', p.title)}
          onDelete={() => console.log('Delete:', p.title)}
        />
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
}
