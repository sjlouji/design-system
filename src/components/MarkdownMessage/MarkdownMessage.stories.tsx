import type { Meta, StoryObj } from '@storybook/react-vite'
import { MarkdownMessage } from './MarkdownMessage'

const meta = {
  title: 'AI/MarkdownMessage',
  component: MarkdownMessage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof MarkdownMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  args: {
    content: 'This is a simple paragraph of text rendered from markdown.',
  },
}

export const WithCode: Story = {
  args: {
    content: `Here is some inline code: \`const x = 42\`

And a code block:

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`
}
\`\`\`
`,
  },
}

export const WithList: Story = {
  args: {
    content: `## Features

- Fast rendering
- Markdown support
- Code highlighting

1. Step one
2. Step two
3. Step three
`,
  },
}

export const WithTable: Story = {
  args: {
    content: `| Model | Context | Provider |
|-------|---------|----------|
| Claude 3.5 Sonnet | 200k | Anthropic |
| GPT-4o | 128k | OpenAI |
| Gemini 1.5 Pro | 1M | Google |
`,
  },
}

export const Full: Story = {
  args: {
    content: `# Full Markdown Example

This is a **bold** and *italic* paragraph with [a link](https://example.com).

## Code

Inline: \`const foo = 'bar'\`

\`\`\`javascript
const hello = () => console.log('world')
\`\`\`

## Lists

- Item one
- Item two
  - Nested item

1. First
2. Second

## Blockquote

> This is a blockquote with *italic* text inside.

## Table

| Name | Value |
|------|-------|
| Alpha | 1 |
| Beta | 2 |
`,
  },
}
