import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatMessage } from './ChatMessage'
import { MessageActions } from '@/components/MessageActions'
import { MessageFeedback } from '@/components/MessageFeedback'

const meta = {
  title: 'AI/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'assistant', 'system'],
      description: 'The sender role — controls layout direction and bubble style',
    },
    content: {
      control: 'text',
      description: 'Message text content (markdown is rendered for assistant)',
    },
    name: {
      control: 'text',
      description: 'Display name shown above the message bubble',
    },
    timestamp: {
      control: 'text',
      description: 'Timestamp string rendered beside the name',
    },
    streaming: {
      control: 'boolean',
      description: 'When true, shows TypingIndicator instead of content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the root element',
    },
  },
} satisfies Meta<typeof ChatMessage>

export default meta
type Story = StoryObj<typeof meta>

export const UserMessage: Story = {
  args: {
    role: 'user',
    content: 'Hello! Can you explain how React hooks work?',
    avatar: { fallback: 'JL' },
    name: 'Joan',
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
- **useContext** — reads context values

Here's a quick example:

\`\`\`tsx
const [count, setCount] = useState(0)

useEffect(() => {
  document.title = \`Count: \${count}\`
}, [count])
\`\`\`
`,
    name: 'Claude',
    timestamp: '2:34 PM',
  },
}

export const AssistantWithAvatar: Story = {
  args: {
    role: 'assistant',
    content: 'Sure! I can help you with that. Let me walk you through the concept step by step.',
    avatar: { fallback: 'AI' },
    name: 'Claude',
    timestamp: '2:35 PM',
  },
}

export const UserWithName: Story = {
  args: {
    role: 'user',
    content: 'Can you write a function that reverses a string in TypeScript?',
    avatar: { fallback: 'JL' },
    name: 'Joan',
    timestamp: '2:36 PM',
  },
}

export const UserNoAvatar: Story = {
  name: 'User — No Avatar',
  args: {
    role: 'user',
    content: 'What are the best practices for TypeScript generics?',
    timestamp: '3:00 PM',
  },
}

export const AssistantNoAvatar: Story = {
  name: 'Assistant — No Avatar',
  args: {
    role: 'assistant',
    content: 'TypeScript generics allow you to write reusable, type-safe code. Think of them as variables for types.',
    timestamp: '3:01 PM',
  },
}

export const StreamingState: Story = {
  args: {
    role: 'assistant',
    content: '',
    streaming: true,
    avatar: { fallback: 'AI' },
    name: 'Claude',
  },
}

export const SystemMessage: Story = {
  args: {
    role: 'system',
    content: 'Conversation started',
  },
}

export const SystemMessageContextCleared: Story = {
  name: 'System — Context Cleared',
  args: {
    role: 'system',
    content: 'New session · Context cleared',
  },
}

export const SystemMessageModelChanged: Story = {
  name: 'System — Model Changed',
  args: {
    role: 'system',
    content: 'Switched to Claude Opus 4',
  },
}

export const WithActions: Story = {
  args: {
    role: 'assistant',
    content: 'Here is my response to your question about React hooks. Hooks allow functional components to use state and lifecycle features.',
    name: 'Claude',
    timestamp: '2:35 PM',
    actions: (
      <MessageActions
        onCopy={() => console.log('copied')}
        onRegenerate={() => console.log('regenerate')}
        onThumbsUp={() => console.log('thumbs up')}
        onThumbsDown={() => console.log('thumbs down')}
      />
    ),
  },
}

export const WithFeedback: Story = {
  args: {
    role: 'assistant',
    content: 'The answer to your question is 42. This is derived from a thorough analysis of the problem space.',
    name: 'Claude',
    timestamp: '4:00 PM',
    actions: (
      <MessageFeedback onSubmit={(rating, comment) => console.log('Feedback:', rating, comment)} />
    ),
  },
}

export const LongUserMessage: Story = {
  args: {
    role: 'user',
    content: `I'm working on a large-scale React application and I'm running into performance issues. The app has many components re-rendering unnecessarily when global state changes. I've already tried using React.memo on leaf components but the problem persists. Could you help me identify and fix the root cause? Here's some context: we're using Redux Toolkit for state management, and we have some selectors that may not be properly memoized.`,
    avatar: { fallback: 'JL' },
    name: 'Joan',
    timestamp: '3:10 PM',
  },
}

export const LongAssistantMessage: Story = {
  args: {
    role: 'assistant',
    content: `Great question! Performance issues in Redux applications often come from a few common sources. Let me walk through them:

## 1. Selector Memoization

Using \`createSelector\` from Reselect (included in Redux Toolkit) is critical:

\`\`\`ts
const selectFilteredItems = createSelector(
  (state: RootState) => state.items.list,
  (state: RootState) => state.filters.activeFilter,
  (items, filter) => items.filter((item) => item.status === filter)
)
\`\`\`

## 2. Component Structure

Avoid subscribing to large slices of state in parent components and passing them down as props. Subscribe at the component level that actually needs the data.

## 3. useSelector Equality

By default, \`useSelector\` uses strict reference equality. For derived objects, use \`shallowEqual\`:

\`\`\`ts
import { shallowEqual } from 'react-redux'
const { name, email } = useSelector(selectUser, shallowEqual)
\`\`\`

## 4. React DevTools Profiler

Use the Profiler tab to identify which components re-render on each action and why.`,
    name: 'Claude',
    timestamp: '3:11 PM',
    actions: (
      <MessageActions
        onCopy={() => console.log('copied')}
        onRegenerate={() => console.log('regenerate')}
        onThumbsUp={() => console.log('thumbs up')}
        onThumbsDown={() => console.log('thumbs down')}
      />
    ),
  },
}

export const CodeOnlyMessage: Story = {
  args: {
    role: 'assistant',
    content: "```typescript\nfunction reverseString(str: string): string {\n  return str.split('').reverse().join('')\n}\n```",
    name: 'Claude',
    timestamp: '2:40 PM',
  },
}

export const MultilineUserMessage: Story = {
  args: {
    role: 'user',
    content: `Please help me with the following:

1. Fix the TypeScript errors in my codebase
2. Add proper error boundaries
3. Write unit tests for the utility functions

Thank you!`,
    avatar: { fallback: 'JL' },
    name: 'Joan',
    timestamp: '2:50 PM',
  },
}

export const FullConversation: Story = {
  args: {} as Story['args'],
  render: () => (
    <div className="flex flex-col gap-1 max-w-2xl mx-auto py-4">
      <ChatMessage role="system" content="New conversation" />
      <ChatMessage
        role="user"
        content="What is the capital of France?"
        avatar={{ fallback: 'JL' }}
        name="Joan"
        timestamp="10:00 AM"
      />
      <ChatMessage
        role="assistant"
        content="The capital of France is **Paris**. It has been the country's capital since 987 AD and is home to over 2 million people in the city proper, with about 12 million in the greater metropolitan area."
        name="Claude"
        timestamp="10:00 AM"
        actions={
          <MessageActions
            onCopy={() => console.log('copied')}
            onThumbsUp={() => console.log('up')}
            onThumbsDown={() => console.log('down')}
          />
        }
      />
      <ChatMessage
        role="user"
        content="What about the population of the wider Île-de-France region?"
        avatar={{ fallback: 'JL' }}
        name="Joan"
        timestamp="10:01 AM"
      />
      <ChatMessage
        role="assistant"
        content="The Île-de-France region, which surrounds Paris, has a population of approximately **12.3 million people**, making it the most densely populated region in France and one of the most populated in Europe."
        name="Claude"
        timestamp="10:02 AM"
        actions={
          <MessageActions
            onCopy={() => console.log('copied')}
            onThumbsUp={() => console.log('up')}
            onThumbsDown={() => console.log('down')}
          />
        }
      />
      <ChatMessage
        role="system"
        content="Assistant is generating a response…"
      />
      <ChatMessage
        role="assistant"
        content=""
        streaming={true}
        name="Claude"
      />
    </div>
  ),
  parameters: { layout: 'fullscreen' },
}

export const AllRoles: Story = {
  args: {} as Story['args'],
  render: () => (
    <div className="flex flex-col gap-1 max-w-2xl mx-auto py-4">
      <ChatMessage role="system" content="Session started" />
      <ChatMessage
        role="user"
        content="Hi there!"
        avatar={{ fallback: 'U' }}
        name="User"
        timestamp="Now"
      />
      <ChatMessage
        role="assistant"
        content="Hello! How can I assist you today?"
        name="Claude"
        timestamp="Now"
      />
    </div>
  ),
}
