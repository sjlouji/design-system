import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatShell } from './ChatShell'
import { ConversationList } from '@/components/ConversationList'
import { ChatThread, ChatThreadEmpty } from '@/components/ChatThread'
import { ChatInput } from '@/components/ChatInput'
import { ChatMessage } from '@/components/ChatMessage'
import { ModelSelector } from '@/components/ModelSelector'
import type { Conversation } from '@/components/ConversationList'
import type { AIModel } from '@/components/ModelSelector'

const meta = {
  title: 'AI/ChatShell',
  component: ChatShell,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ChatShell>

export default meta
type Story = StoryObj<typeof meta>

const conversations: Conversation[] = [
  { id: '1', title: 'React performance tips', preview: 'Optimise rendering...', active: true },
  { id: '2', title: 'TypeScript generics', preview: 'Generic constraints' },
  { id: '3', title: 'Docker setup', preview: 'Multi-stage builds' },
]

const models: AIModel[] = [
  { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Anthropic', contextWindow: 200000 },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', contextWindow: 128000 },
]

export const Default: Story = {
  render: () => (
    <ChatShell
      sidebar={
        <ConversationList
          conversations={conversations}
          onSelect={(id) => console.log('Select:', id)}
          onDelete={(id) => console.log('Delete:', id)}
        />
      }
      header={
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">React performance tips</span>
          <ModelSelector models={models} value="claude-sonnet-4" />
        </div>
      }
      footer={<ChatInput placeholder="Message Claude…" onSubmit={(v) => console.log(v)} />}
    >
      <ChatThread className="h-full">
        <ChatMessage role="user" content="How can I optimise React rendering?" avatar={{ fallback: 'U' }} timestamp="2:00 PM" />
        <ChatMessage
          role="assistant"
          content="There are several techniques to optimise React rendering:\n\n- **React.memo** — prevents re-renders when props haven't changed\n- **useMemo / useCallback** — memoize expensive computations\n- **Code splitting** — lazy load components with `React.lazy`"
          avatar={{ fallback: 'AI' }}
          timestamp="2:01 PM"
        />
      </ChatThread>
    </ChatShell>
  ),
}

export const WithoutSidebar: Story = {
  render: () => (
    <ChatShell
      header={
        <div className="flex items-center">
          <span className="font-medium">New Conversation</span>
        </div>
      }
      footer={<ChatInput placeholder="Message…" />}
    >
      <ChatThread className="h-full">
        <ChatThreadEmpty className="h-full" />
      </ChatThread>
    </ChatShell>
  ),
}
