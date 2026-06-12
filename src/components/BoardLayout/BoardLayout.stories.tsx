import type { Meta, StoryObj } from '@storybook/react-vite'
import { BoardLayout, type BoardColumn } from './BoardLayout'

const meta = {
  title: 'Layout/BoardLayout',
  component: BoardLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    columns: {
      control: false,
      description:
        'Array of board columns. Each column has an id, title, cards array, and an optional color string (any CSS colour) rendered as a dot in the column header.',
    },
    onCardMove: {
      action: 'onCardMove',
      description:
        'Fired after a card is dragged to a different column. Receives (cardId, fromColumnId, toColumnId, newIndex). Does not fire for same-column reorders.',
    },
    onColumnsChange: {
      action: 'onColumnsChange',
      description:
        'Fired after any drag-and-drop operation completes, with the full updated columns array reflecting the new card positions.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the scrollable columns container.',
    },
  },
} satisfies Meta<typeof BoardLayout>

export default meta
type Story = StoryObj<typeof meta>

const defaultColumns: BoardColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: '#6b7280',
    cards: [
      {
        id: 'card-1',
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated testing and deployment.',
        priority: 'high',
        badge: 'DevOps',
        assignee: { name: 'Alice Chen' },
      },
      {
        id: 'card-2',
        title: 'Design system audit',
        description: 'Review existing components for accessibility issues.',
        priority: 'medium',
        assignee: { name: 'Bob Smith' },
      },
      {
        id: 'card-3',
        title: 'Update API documentation',
        priority: 'low',
        badge: 'Docs',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: '#3b82f6',
    cards: [
      {
        id: 'card-4',
        title: 'Implement authentication flow',
        description: 'Add OAuth2 login with Google and GitHub providers.',
        priority: 'critical',
        assignee: { name: 'Carol Davis' },
      },
      {
        id: 'card-5',
        title: 'Refactor data layer',
        description: 'Move API calls into dedicated service modules.',
        priority: 'medium',
        badge: 'Backend',
        assignee: { name: 'Dan Lee' },
      },
      {
        id: 'card-6',
        title: 'Add dark mode support',
        priority: 'low',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: '#22c55e',
    cards: [
      {
        id: 'card-7',
        title: 'Initial project setup',
        description: 'Scaffold Vite + React + TypeScript project with Tailwind.',
        priority: 'high',
        assignee: { name: 'Eva Park' },
      },
      {
        id: 'card-8',
        title: 'Create component library',
        priority: 'medium',
        badge: 'UI',
      },
      {
        id: 'card-9',
        title: 'Write unit tests',
        description: 'Set up Vitest and write initial test suite.',
        priority: 'medium',
        assignee: { name: 'Frank Wu' },
      },
    ],
  },
]

export const Default: Story = {
  args: {
    columns: defaultColumns,
  },
  decorators: [
    (Story) => (
      <div className="p-6 min-h-screen bg-background">
        <Story />
      </div>
    ),
  ],
}

export const EmptyColumns: Story = {
  args: {
    columns: [
      { id: 'backlog', title: 'Backlog', color: '#6b7280', cards: [] },
      { id: 'ready', title: 'Ready', color: '#3b82f6', cards: [] },
      { id: 'complete', title: 'Complete', color: '#22c55e', cards: [] },
    ],
  },
  decorators: [
    (Story) => (
      <div className="p-6 min-h-screen bg-background">
        <Story />
      </div>
    ),
  ],
}

export const SingleColumn: Story = {
  args: {
    columns: [
      {
        id: 'all',
        title: 'All Tasks',
        color: '#a855f7',
        cards: [
          {
            id: 's1',
            title: 'Task Alpha',
            priority: 'critical',
            description: 'Critical path item that blocks other work.',
            assignee: { name: 'Grace Kim' },
          },
          {
            id: 's2',
            title: 'Task Beta',
            priority: 'high',
            badge: 'Frontend',
          },
          {
            id: 's3',
            title: 'Task Gamma',
            priority: 'low',
            description: 'Nice to have improvement.',
          },
        ],
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="p-6 min-h-screen bg-background">
        <Story />
      </div>
    ),
  ],
}
