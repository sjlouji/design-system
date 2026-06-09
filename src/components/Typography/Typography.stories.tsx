import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from './Typography'

const meta = {
  title: 'Typography/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-xl">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="p">
        Paragraph — The quick brown fox jumps over the lazy dog.
      </Typography>
      <Typography variant="lead">
        Lead — A larger introductory paragraph.
      </Typography>
      <Typography variant="large">Large text</Typography>
      <Typography variant="small">Small text</Typography>
      <Typography variant="muted">Muted text</Typography>
      <Typography variant="blockquote">
        Blockquote — "Design is not just what it looks like and feels like. Design is how it works."
      </Typography>
      <Typography variant="code">const greeting = "hello world"</Typography>
      <Typography variant="list" as="ul">
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </Typography>
    </div>
  ),
}

export const Heading: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Typography variant="h1">Page Title</Typography>
      <Typography variant="h2">Section Header</Typography>
      <Typography variant="h3">Subsection</Typography>
      <Typography variant="h4">Card Title</Typography>
    </div>
  ),
}

export const Body: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-md">
      <Typography variant="lead">
        An introductory paragraph that provides context.
      </Typography>
      <Typography variant="p">
        Body text for reading. Comfortable line height for longer passages of copy.
      </Typography>
      <Typography variant="muted">
        Secondary information rendered in a subdued colour.
      </Typography>
    </div>
  ),
}
