import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConversationList } from './ConversationList'
import type { Conversation } from './ConversationList'

const meta = {
  title: 'AI/ConversationList',
  component: ConversationList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ConversationList>

export default meta
type Story = StoryObj<typeof meta>

const conversations: Conversation[] = [
  { id: '1', title: 'React performance tips', preview: 'How to optimise rendering...', timestamp: '2h ago', active: true },
  { id: '2', title: 'TypeScript generics', preview: 'Explain generic constraints', timestamp: 'Yesterday' },
  { id: '3', title: 'Database design', preview: 'Normalisation vs denormalisation', timestamp: 'Mon' },
  { id: '4', title: 'Docker setup', preview: 'Multi-stage build configuration', timestamp: 'Sun' },
  { id: '5', title: 'CSS animations', preview: 'Keyframe vs transition', timestamp: 'Fri' },
]

export const Default: Story = {
  args: {
    conversations,
    onSelect: (id) => alert(`Selected: ${id}`),
    onDelete: (id) => alert(`Delete: ${id}`),
    onRename: (id, title) => alert(`Rename ${id} to: ${title}`),
  },
}

export const WithActiveItem: Story = {
  args: {
    conversations,
    onSelect: (id) => console.log('Select:', id),
  },
}

export const Empty: Story = {
  args: {
    conversations: [],
  },
}
