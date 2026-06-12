import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConversationList } from './ConversationList'
import type { Conversation } from './ConversationList'

const meta = {
  title: 'AI/ConversationList',
  component: ConversationList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root wrapper',
    },
  },
} satisfies Meta<typeof ConversationList>

export default meta
type Story = StoryObj<typeof meta>

const conversations: Conversation[] = [
  { id: '1', title: 'React performance tips', preview: 'How to optimise rendering in large apps', timestamp: '2h ago', active: true },
  { id: '2', title: 'TypeScript generics', preview: 'Explain generic constraints and variance', timestamp: 'Yesterday' },
  { id: '3', title: 'Database design patterns', preview: 'Normalisation vs denormalisation trade-offs', timestamp: 'Mon' },
  { id: '4', title: 'Docker multi-stage builds', preview: 'Multi-stage build configuration for Node apps', timestamp: 'Sun' },
  { id: '5', title: 'CSS animations deep dive', preview: 'Keyframe vs transition vs Web Animations API', timestamp: 'Fri' },
]

const groupedConversations: Conversation[] = [
  { id: '1', title: 'React performance tips', preview: 'How to optimise rendering', timestamp: '2h ago', active: true, group: 'Today' },
  { id: '2', title: 'TypeScript generics', preview: 'Generic constraints', timestamp: 'Yesterday', group: 'Yesterday' },
  { id: '3', title: 'Database design', preview: 'Normalisation trade-offs', timestamp: 'Mon', group: 'This week' },
  { id: '4', title: 'Docker setup', preview: 'Multi-stage builds', timestamp: 'Sun', group: 'This week' },
  { id: '5', title: 'CSS animations', preview: 'Keyframes vs transitions', timestamp: 'Fri', group: 'Last week' },
  { id: '6', title: 'REST API design', preview: 'Versioning strategies', timestamp: '2w ago', group: 'Last week' },
]

export const Default: Story = {
  args: {
    conversations,
    onNew: () => console.log('new chat'),
    onSelect: (id) => console.log('Select:', id),
    onDelete: (id) => console.log('Delete:', id),
    onRename: (id, title) => console.log('Rename', id, '->', title),
  },
}

export const WithActiveItem: Story = {
  args: {
    conversations,
    onSelect: (id) => console.log('Select:', id),
  },
}

export const WithTimestampsOnly: Story = {
  args: {
    conversations,
    onSelect: (id) => console.log('Select:', id),
  },
}

export const Empty: Story = {
  args: {
    conversations: [],
    onNew: () => console.log('new chat'),
  },
}

export const WithGroups: Story = {
  args: {
    conversations: groupedConversations,
    onNew: () => console.log('new chat'),
    onSelect: (id) => console.log('Select:', id),
    onDelete: (id) => console.log('Delete:', id),
    onRename: (id, title) => console.log('Rename', id, '->', title),
  },
}

export const WithLongTitles: Story = {
  args: {
    conversations: [
      { id: '1', title: 'How to implement a recursive depth-first search algorithm in TypeScript with proper type safety', preview: 'Graph traversal implementation', timestamp: '1h ago', active: true },
      { id: '2', title: 'Explain the difference between microservices, monorepos, and modular monoliths', preview: 'Architecture patterns comparison', timestamp: '3h ago' },
      { id: '3', title: 'Writing comprehensive unit tests for React hooks using Testing Library and Vitest', preview: 'Testing strategy discussion', timestamp: 'Yesterday' },
    ],
    onNew: () => console.log('new chat'),
    onSelect: (id) => console.log('Select:', id),
    onDelete: (id) => console.log('Delete:', id),
  },
}

export const ReadOnly: Story = {
  args: {
    conversations,
    onSelect: (id) => console.log('Select:', id),
  },
}

export const Controlled: Story = {
  args: {} as Story['args'],
  render: () => {
    const [items, setItems] = React.useState<Conversation[]>(conversations)
    const [activeId, setActiveId] = React.useState<string>('1')
    const [log, setLog] = React.useState<string[]>([])

    const displayItems = items.map((c) => ({ ...c, active: c.id === activeId }))

    const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5))

    return (
      <div className="flex gap-6">
        <div className="w-56 border border-border rounded-xl overflow-hidden bg-background">
          <ConversationList
            conversations={displayItems}
            onNew={() => {
              const id = String(Date.now())
              setItems((prev) => [{ id, title: 'New chat', preview: 'Just started', timestamp: 'Just now' }, ...prev])
              setActiveId(id)
              addLog(`Created: ${id}`)
            }}
            onSelect={(id) => { setActiveId(id); addLog(`Selected: ${id}`) }}
            onDelete={(id) => { setItems((prev) => prev.filter((c) => c.id !== id)); addLog(`Deleted: ${id}`) }}
            onRename={(id, title) => {
              setItems((prev) => prev.map((c) => c.id === id ? { ...c, title } : c))
              addLog(`Renamed ${id}: ${title}`)
            }}
          />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground">Event log:</p>
          {log.map((entry, i) => (
            <p key={i} className="text-xs font-mono text-muted-foreground">{entry}</p>
          ))}
        </div>
      </div>
    )
  },
}

export const ManyConversations: Story = {
  args: {
    conversations: Array.from({ length: 20 }, (_, i) => ({
      id: String(i + 1),
      title: `Conversation ${i + 1}`,
      preview: `Preview text for conversation ${i + 1}`,
      timestamp: `${i + 1}h ago`,
      active: i === 0,
    })),
    onNew: () => console.log('new'),
    onSelect: (id) => console.log('Select:', id),
    onDelete: (id) => console.log('Delete:', id),
  },
  parameters: { layout: 'padded' },
}

export const InSidebar: Story = {
  args: {} as Story['args'],
  render: () => (
    <div className="w-60 h-[500px] border border-border rounded-xl bg-background overflow-hidden flex flex-col py-3">
      <ConversationList
        className="flex-1 min-h-0"
        conversations={conversations}
        onNew={() => console.log('new')}
        onSelect={(id) => console.log('Select:', id)}
        onDelete={(id) => console.log('Delete:', id)}
        onRename={(id, title) => console.log('Rename:', id, title)}
      />
    </div>
  ),
}
