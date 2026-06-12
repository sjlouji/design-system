import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Folder, File, FileText, FileCode, Image, Package } from 'lucide-react'
import { TreeView, type TreeNode } from './TreeView'

const meta = {
  title: 'DataDisplay/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    nodes: {
      control: false,
      description:
        'Array of `TreeNode` objects that form the root level of the tree. Each node supports `id` (unique key), `label` (display text), `icon` (ReactNode rendered at 16 px), `children` (nested `TreeNode[]` — presence of children makes the row expandable/collapsible), `disabled` (makes the row non-interactive and visually dimmed), and `badge` (string or number shown as a secondary badge on the right).',
    },
    defaultExpanded: {
      control: false,
      description:
        'Array of node `id` strings that should be expanded on initial render. Only applies at mount — after that, expand/collapse state is managed internally. Pass an empty array (default) to start fully collapsed.',
    },
    selected: {
      control: 'text',
      description:
        'The `id` of the currently selected node. Pass `undefined` for no selection. When controlled, update this value inside `onSelect` to keep the highlight in sync.',
    },
    onSelect: {
      action: 'nodeSelected',
      description:
        'Fired when a non-disabled node row is clicked or activated via keyboard. Receives the node `id` string as its only argument. Also fires for branch nodes (nodes with children) in addition to toggling their expand state.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the root `<ul role="tree">` element.',
    },
  },
} satisfies Meta<typeof TreeView>

export default meta
type Story = StoryObj<typeof meta>

const defaultNodes: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: <Folder />,
    children: [
      {
        id: 'components',
        label: 'components',
        icon: <Folder />,
        children: [
          { id: 'button', label: 'Button.tsx', icon: <FileCode /> },
          { id: 'badge', label: 'Badge.tsx', icon: <FileCode /> },
          {
            id: 'card-dir',
            label: 'Card',
            icon: <Folder />,
            children: [
              { id: 'card-tsx', label: 'Card.tsx', icon: <FileCode /> },
              { id: 'card-index', label: 'index.ts', icon: <File /> },
            ],
          },
        ],
      },
      {
        id: 'lib',
        label: 'lib',
        icon: <Folder />,
        children: [
          { id: 'utils', label: 'utils.ts', icon: <FileCode /> },
        ],
      },
    ],
  },
  {
    id: 'public',
    label: 'public',
    icon: <Folder />,
    children: [
      { id: 'favicon', label: 'favicon.ico', icon: <Image /> },
    ],
  },
  { id: 'package-json', label: 'package.json', icon: <Package /> },
]

export const Default: Story = {
  args: {
    nodes: defaultNodes,
    defaultExpanded: ['src', 'components'],
    selected: undefined,
    className: undefined,
  },
}

const fileTreeNodes: TreeNode[] = [
  {
    id: 'root',
    label: 'my-project',
    icon: <Folder />,
    children: [
      {
        id: 'app',
        label: 'app',
        icon: <Folder />,
        children: [
          { id: 'page', label: 'page.tsx', icon: <FileCode /> },
          { id: 'layout', label: 'layout.tsx', icon: <FileCode /> },
          {
            id: 'api',
            label: 'api',
            icon: <Folder />,
            children: [
              { id: 'route', label: 'route.ts', icon: <FileCode /> },
            ],
          },
        ],
      },
      {
        id: 'components-dir',
        label: 'components',
        icon: <Folder />,
        children: [
          { id: 'nav', label: 'Nav.tsx', icon: <FileCode /> },
          { id: 'footer', label: 'Footer.tsx', icon: <FileCode /> },
        ],
      },
      { id: 'next-config', label: 'next.config.ts', icon: <FileCode /> },
      { id: 'readme', label: 'README.md', icon: <FileText /> },
    ],
  },
]

export const FileTree: Story = {
  args: {
    nodes: fileTreeNodes,
    defaultExpanded: ['root', 'app', 'components-dir'],
  },
}

const singleLevelNodes: TreeNode[] = [
  { id: 'home', label: 'Home', icon: <File /> },
  { id: 'about', label: 'About', icon: <File /> },
  { id: 'services', label: 'Services', icon: <File /> },
  { id: 'contact', label: 'Contact', icon: <File />, disabled: true },
]

export const SingleLevel: Story = {
  args: {
    nodes: singleLevelNodes,
  },
}

const badgeNodes: TreeNode[] = [
  {
    id: 'notifications',
    label: 'Notifications',
    badge: 12,
    children: [
      { id: 'unread', label: 'Unread', badge: 5 },
      { id: 'archived', label: 'Archived', badge: 7 },
    ],
  },
  {
    id: 'messages',
    label: 'Messages',
    badge: 3,
    children: [
      { id: 'inbox', label: 'Inbox', badge: 3 },
      { id: 'sent', label: 'Sent', badge: 0 },
    ],
  },
]

export const WithBadges: Story = {
  args: {
    nodes: badgeNodes,
    defaultExpanded: ['notifications', 'messages'],
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string | undefined>(undefined)
    return (
      <div className="w-64">
        <TreeView
          {...args}
          selected={selected}
          onSelect={(id) => {
            console.log('Selected node:', id)
            setSelected(id)
          }}
        />
        {selected && (
          <p className="mt-4 text-sm text-muted-foreground">
            Selected: <code className="text-foreground">{selected}</code>
          </p>
        )}
      </div>
    )
  },
  args: {
    nodes: defaultNodes,
    defaultExpanded: ['src'],
  },
}
