import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThinkingBlock } from './ThinkingBlock'

const meta = {
  title: 'AI/ThinkingBlock',
  component: ThinkingBlock,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    title: {
      control: 'text',
      description: 'Label shown in the collapsible trigger button. Defaults to "Thinking…". Set to a duration string like "Thought for 3 seconds" once the model finishes reasoning.',
    },
    thinking: {
      control: 'boolean',
      description: 'When `true`, applies a shimmer animation to the title text and a pulse animation to the brain icon — use while the model is actively reasoning.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the reasoning content is expanded on initial mount. Defaults to `false` so completed thoughts are collapsed.',
    },
    children: {
      control: false,
      description: 'The reasoning text content rendered inside the collapsible area. Accepts any React node.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root collapsible element.',
    },
  },
} satisfies Meta<typeof ThinkingBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Thinking…',
    thinking: false,
    defaultOpen: false,
    children: 'The user is asking about the capital of France. The answer is Paris.',
  },
}

export const ThinkingInProgress: Story = {
  args: {
    thinking: true,
    defaultOpen: true,
    children: 'Analysing the request… considering multiple approaches…',
  },
}

export const ThinkingComplete: Story = {
  args: {
    thinking: false,
    title: 'Thought for 3 seconds',
    defaultOpen: false,
    children: 'The user wants to know the capital of France. The answer is Paris. Simple factual question.',
  },
}

export const DefaultOpen: Story = {
  args: {
    children: 'I need to think through this carefully. The problem involves recursion and base cases.',
    defaultOpen: true,
  },
}

export const Collapsed: Story = {
  args: {
    children: 'Reasoning is hidden by default. Click to expand.',
    defaultOpen: false,
  },
}

export const CustomTitle: Story = {
  args: {
    title: 'Reasoning…',
    defaultOpen: true,
    thinking: true,
    children: 'Breaking down the problem step by step before providing an answer.',
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
the total complexity is O(n log n).

This is essentially merge sort applied to this specific problem.
The space complexity is O(n) due to the auxiliary arrays needed during merging.

Edge cases to consider:
- Empty array: return 0
- Single element: return 0 (no inversions possible)
- All elements in reverse order: maximum inversions = n*(n-1)/2`,
  },
}

export const ThinkingWithShortContent: Story = {
  args: {
    thinking: true,
    defaultOpen: true,
    children: 'Hmm…',
  },
}

export const InChatContext: Story = {
  args: {} as Story['args'],
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <div className="flex gap-3 px-4 py-3">
        <div className="shrink-0 size-8 rounded-full flex items-center justify-center bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))] text-white text-[10px] font-bold ring-2 ring-background shadow-sm">
          AI
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <ThinkingBlock title="Thought for 5 seconds" defaultOpen={false} thinking={false}>
            {`The user is asking for a TypeScript implementation of a binary search tree.
I should provide a clean, well-typed implementation with insert, search, and delete methods.
I'll use generics to make it reusable for any comparable type.`}
          </ThinkingBlock>
          <p className="text-sm leading-relaxed">
            Here's a generic binary search tree implementation in TypeScript:
          </p>
        </div>
      </div>
    </div>
  ),
}

export const ToggleInteraction: Story = {
  args: {} as Story['args'],
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <p className="text-xs text-muted-foreground">Click the header to toggle the content.</p>
      <ThinkingBlock
        title="Thought for 8 seconds"
        defaultOpen={false}
        thinking={false}
      >
        {`Step 1: Parse the user's intent — they want a sorting algorithm explanation.
Step 2: Choose the best algorithm to highlight — quicksort is a great example due to its real-world performance.
Step 3: Structure the explanation with time complexity, space complexity, and a code example.
Step 4: Keep the response concise but complete.`}
      </ThinkingBlock>
    </div>
  ),
}
