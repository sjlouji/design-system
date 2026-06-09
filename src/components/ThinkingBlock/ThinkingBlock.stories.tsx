import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThinkingBlock } from './ThinkingBlock'

const meta = {
  title: 'AI/ThinkingBlock',
  component: ThinkingBlock,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ThinkingBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'The user is asking about the capital of France. The answer is Paris.',
    defaultOpen: false,
  },
}

export const DefaultOpen: Story = {
  args: {
    children: 'I need to think through this carefully. The problem involves recursion...',
    defaultOpen: true,
  },
}

export const WithLongContent: Story = {
  args: {
    title: 'Reasoning…',
    defaultOpen: true,
    children: `Let me break down this problem step by step.

First, I'll consider the constraints: we need an O(n log n) solution.
The naive approach would be O(n²) which is too slow for large inputs.

A better approach uses a divide and conquer strategy:
1. Split the array in half
2. Recursively solve each half
3. Merge the results

The merge step takes O(n) time, and with log n levels of recursion,
the total complexity is O(n log n).`,
  },
}
