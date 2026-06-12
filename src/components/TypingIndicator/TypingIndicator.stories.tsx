import type { Meta, StoryObj } from '@storybook/react-vite'
import { TypingIndicator } from './TypingIndicator'

const meta = {
  title: 'AI/TypingIndicator',
  component: TypingIndicator,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    className: {
      control: 'text',
      description:
        'Additional CSS classes applied to the wrapping `<span>` element. Use this to adjust outer padding/margin or override gap between dots. Dot size can be targeted with the `[&>span]` selector (e.g. `[&>span]:size-3`).',
    },
  },
} satisfies Meta<typeof TypingIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: undefined,
  },
}

export const WithCustomPadding: Story = {
  args: {
    className: 'px-3 py-3',
  },
}

export const LargeDots: Story = {
  args: {
    className: '[&>span]:size-3 gap-2',
  },
}

export const SmallDots: Story = {
  args: {
    className: '[&>span]:size-[5px]',
  },
}

export const InChatBubble: Story = {
  render: () => (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl max-w-xs bg-muted/20">
      <div className="shrink-0 size-8 rounded-full flex items-center justify-center bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))] text-white text-[10px] font-bold ring-2 ring-background shadow-sm">
        AI
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))] bg-clip-text text-transparent">
          Assistant
        </span>
        <div className="text-sm text-foreground">
          <TypingIndicator />
        </div>
      </div>
    </div>
  ),
}

export const InlineWithText: Story = {
  render: () => (
    <p className="text-sm text-foreground flex items-center gap-1">
      The assistant is thinking
      <TypingIndicator />
    </p>
  ),
}

export const MultipleInstances: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['Claude', 'GPT-4', 'Gemini'] as const).map((name) => (
        <div key={name} className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-16">{name}:</span>
          <TypingIndicator />
        </div>
      ))}
    </div>
  ),
}

export const OnDarkBackground: Story = {
  render: () => (
    <div className="dark bg-zinc-900 rounded-xl p-4 flex items-center gap-3">
      <div className="shrink-0 size-8 rounded-full flex items-center justify-center bg-[linear-gradient(135deg,oklch(0.633_0.165_259),oklch(0.635_0.110_225))] text-white text-[10px] font-bold">
        AI
      </div>
      <TypingIndicator />
    </div>
  ),
}

export const WithStatusLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 bg-background">
      <TypingIndicator />
      <span className="text-xs text-muted-foreground">Claude is typing…</span>
    </div>
  ),
}
