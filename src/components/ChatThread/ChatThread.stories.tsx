import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatThread, ChatThreadEmpty } from './ChatThread'
import { ChatMessage } from '@/components/ChatMessage'

const meta = {
  title: 'AI/ChatThread',
  component: ChatThread,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { children: null },
  argTypes: {
    children: {
      control: false,
      description:
        'Message nodes to render — typically `<ChatMessage>` components or a `<ChatThreadEmpty>` placeholder. The thread auto-scrolls to the bottom when new children are added, but only if the scroll position is within 120 px of the bottom.',
    },
    className: {
      control: 'text',
      description:
        'Additional CSS classes on the scrollable container. Use this to set an explicit height (e.g. `h-full`, `h-[400px]`) so the thread can scroll independently.',
    },
  },
} satisfies Meta<typeof ChatThread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ChatThread className="h-[300px] border rounded-lg">
      <ChatMessage role="user" content="Hello! Can you help me?" avatar={{ fallback: 'U' }} timestamp="Now" />
      <ChatMessage role="assistant" content="Of course! What would you like to know?" timestamp="Now" />
    </ChatThread>
  ),
}

export const WithMessages: Story = {
  render: () => (
    <ChatThread className="h-[400px] border rounded-lg">
      <ChatMessage role="user" content="Hello! How are you?" avatar={{ fallback: 'U' }} timestamp="2:00 PM" />
      <ChatMessage role="assistant" content="I'm doing great, thanks for asking! How can I help you today?" avatar={{ fallback: 'AI' }} timestamp="2:00 PM" />
      <ChatMessage role="user" content="Can you write a hello world in TypeScript?" avatar={{ fallback: 'U' }} timestamp="2:01 PM" />
      <ChatMessage
        role="assistant"
        content={`Sure! Here's hello world in TypeScript:\n\n\`\`\`typescript\nconst greeting: string = "Hello, World!";\nconsole.log(greeting);\n\`\`\``}
        avatar={{ fallback: 'AI' }}
        timestamp="2:01 PM"
      />
    </ChatThread>
  ),
}

export const Empty: Story = {
  render: () => (
    <ChatThread className="h-[400px] border rounded-lg">
      <ChatThreadEmpty className="min-h-[300px]" />
    </ChatThread>
  ),
}
