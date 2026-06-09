import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatThread, ChatThreadEmpty } from './ChatThread'
import { ChatMessage } from '@/components/ChatMessage'

const meta = {
  title: 'AI/ChatThread',
  component: ChatThread,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ChatThread>

export default meta
type Story = StoryObj<typeof meta>

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
