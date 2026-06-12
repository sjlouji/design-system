import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  InboxIcon,
  SearchIcon,
  FolderOpenIcon,
  FileTextIcon,
  MessageSquareIcon,
  PackageIcon,
  UsersIcon,
  BellIcon,
} from 'lucide-react'
import { EmptyState } from './EmptyState'
import { Button } from '@/components/Button'

const meta = {
  title: 'Layout/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    title: {
      control: 'text',
      description: 'Primary heading text. Always required — describes what is absent.',
    },
    description: {
      control: 'text',
      description: 'Optional secondary body text rendered below the title. Use to explain why the state is empty or suggest a next action.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Overall scale of the component. "sm" — compact icon (20px), small title, py-8 padding; best for card interiors. "md" — standard icon (28px), base title, py-12 (default). "lg" — large icon (36px), lg title, py-20; best for full-page empty states.',
    },
    icon: {
      control: false,
      description: 'Optional React element rendered above the title in a branded gradient container. Pass any lucide-react icon, e.g. `<InboxIcon />`.',
    },
    action: {
      control: false,
      description: 'Optional React element rendered below the title/description block. Typically a `<Button>` or a row of buttons that lets the user resolve the empty state.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the root flex container.',
    },
  },
  args: { title: '' },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'No messages',
    description: 'When you receive messages, they will appear here.',
    size: 'md',
  },
}

export const TitleOnly: Story = {
  args: {
    title: 'Nothing here yet',
  },
}

export const WithDescription: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'No messages yet',
    description: 'When you receive messages, they will appear here.',
  },
}

export const WithAction: Story = {
  args: {
    icon: <FolderOpenIcon />,
    title: 'No projects',
    description: 'Get started by creating your first project.',
    action: <Button>Create project</Button>,
  },
}

export const WithSecondaryAction: Story = {
  args: {
    icon: <UsersIcon />,
    title: 'No team members',
    description: 'Invite people to collaborate on your workspace.',
    action: (
      <div className="flex gap-2">
        <Button>Invite members</Button>
        <Button variant="outline">Learn more</Button>
      </div>
    ),
  },
}

export const SizeSmall: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'Nothing here',
    description: 'This section is empty.',
    size: 'sm',
  },
}

export const SizeMedium: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'Nothing here',
    description: 'This section is empty.',
    size: 'md',
  },
}

export const SizeLarge: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'Nothing here',
    description: 'This section is empty.',
    size: 'lg',
  },
}

export const SearchNoResults: Story = {
  args: {
    icon: <SearchIcon />,
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.',
    size: 'sm',
  },
}

export const NoDataPattern: Story = {
  args: {
    icon: <PackageIcon />,
    title: 'No packages yet',
    description: 'Add packages to your library to start using them in your projects.',
    action: <Button size="sm">Add package</Button>,
    size: 'md',
  },
}

export const NotificationsEmpty: Story = {
  args: {
    icon: <BellIcon />,
    title: 'You\'re all caught up!',
    description: 'No new notifications. Check back later.',
    size: 'sm',
  },
}

export const DocumentsEmpty: Story = {
  args: {
    icon: <FileTextIcon />,
    title: 'No documents',
    description: 'Upload or create a document to get started.',
    action: (
      <div className="flex gap-2">
        <Button size="sm">Upload document</Button>
        <Button size="sm" variant="outline">Create new</Button>
      </div>
    ),
  },
}

export const ConversationsEmpty: Story = {
  args: {
    icon: <MessageSquareIcon />,
    title: 'Start a conversation',
    description: 'Send a message to begin chatting with your team.',
    action: <Button>New message</Button>,
  },
}

export const InCardContext: Story = {
  render: () => (
    <div className="border border-border rounded-xl bg-card p-6 max-w-sm">
      <EmptyState
        icon={<FolderOpenIcon />}
        title="No files uploaded"
        description="Drag and drop files here, or click to browse."
        action={<Button size="sm" variant="outline">Browse files</Button>}
        size="sm"
      />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 divide-y divide-border">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="pt-4">
          <p className="text-xs font-mono text-muted-foreground mb-2">size="{size}"</p>
          <EmptyState
            icon={<InboxIcon />}
            title="No items"
            description="Nothing to show here."
            action={<Button size="sm">Add item</Button>}
            size={size}
          />
        </div>
      ))}
    </div>
  ),
}
