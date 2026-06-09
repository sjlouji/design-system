import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatMessage } from './ChatMessage'
import { MessageActions } from '@/components/MessageActions'

const meta = {
  title: 'AI/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ChatMessage>

export default meta
type Story = StoryObj<typeof meta>

export const UserMessage: Story = {
  args: {
    role: 'user',
    content: 'Hello! Can you explain how React hooks work?',
    avatar: { fallback: 'U' },
    timestamp: '2:34 PM',
  },
}

export const AssistantMessage: Story = {
  args: {
    role: 'assistant',
    content: `React hooks are functions that let you use state and other React features in functional components.

The most common hooks are:
- **useState** — manages local state
- **useEffect** — handles side effects
- **useContext** — reads context

Here's an example:

\`\`\`tsx
const [count, setCount] = useState(0)
\`\`\`
`,
    avatar: { fallback: 'AI' },
    timestamp: '2:34 PM',
  },
}

export const Streaming: Story = {
  args: {
    role: 'assistant',
    content: '',
    streaming: true,
    avatar: { fallback: 'AI' },
  },
}

export const SystemMessage: Story = {
  args: {
    role: 'system',
    content: 'Conversation started',
    timestamp: '2:30 PM',
  },
}

export const WithActions: Story = {
  args: {
    role: 'assistant',
    content: 'Here is my response to your question.',
    avatar: { fallback: 'AI' },
    timestamp: '2:35 PM',
    actions: (
      <MessageActions
        onCopy={() => {}}
        onRegenerate={() => {}}
        onThumbsUp={() => {}}
        onThumbsDown={() => {}}
      />
    ),
  },
}
