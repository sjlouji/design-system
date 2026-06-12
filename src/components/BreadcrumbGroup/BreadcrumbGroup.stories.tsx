import type { Meta, StoryObj } from '@storybook/react-vite'
import { BreadcrumbGroup } from './BreadcrumbGroup'

const meta = {
  title: 'Navigation/BreadcrumbGroup',
  component: BreadcrumbGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items with label, optional href, and optional current flag',
    },
    maxItems: {
      control: { type: 'number', min: 1 },
      description:
        'When set and item count exceeds this value, the middle items collapse to an ellipsis',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the breadcrumb root',
    },
  },
} satisfies Meta<typeof BreadcrumbGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Design System', current: true },
    ],
  },
}

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Settings', current: true },
    ],
  },
}

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Dashboard', current: true }],
  },
}

export const FourLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Organisation', href: '/org' },
      { label: 'Team Alpha', href: '/org/team-alpha' },
      { label: 'Sprint 24', current: true },
    ],
  },
}

export const WithCurrentFlag: Story = {
  name: 'Explicit current Flag',
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile', current: true },
    ],
  },
}

export const CollapsedWithMaxItems: Story = {
  name: 'Collapsed (maxItems = 3)',
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Workspace', href: '/workspace' },
      { label: 'Projects', href: '/workspace/projects' },
      { label: 'Design', href: '/workspace/projects/design' },
      { label: 'Components', href: '/workspace/projects/design/components' },
      { label: 'Button', current: true },
    ],
    maxItems: 3,
  },
}

export const CollapsedMinimal: Story = {
  name: 'Collapsed (maxItems = 2)',
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Level 2', href: '/level2' },
      { label: 'Level 3', href: '/level2/level3' },
      { label: 'Current Page', current: true },
    ],
    maxItems: 2,
  },
}

export const NoHrefs: Story = {
  name: 'Items Without hrefs (Fall Back to #)',
  args: {
    items: [
      { label: 'Root' },
      { label: 'Section' },
      { label: 'Subsection', current: true },
    ],
  },
}

export const FileSystemPath: Story = {
  args: {
    items: [
      { label: 'Users', href: '/users' },
      { label: 'joan', href: '/users/joan' },
      { label: 'Documents', href: '/users/joan/documents' },
      { label: 'design-system', current: true },
    ],
  },
}

export const AdminBreadcrumb: Story = {
  name: 'Admin Console Path',
  args: {
    items: [
      { label: 'Admin', href: '/admin' },
      { label: 'Users', href: '/admin/users' },
      { label: 'joan@example.com', current: true },
    ],
  },
}

export const DocumentationPath: Story = {
  args: {
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Form', href: '/docs/components/form' },
      { label: 'Validation', current: true },
    ],
  },
}

export const LongLabelPath: Story = {
  name: 'Long Labels',
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Customer Relationship Management', href: '/crm' },
      { label: 'Q2 2026 Sales Pipeline', current: true },
    ],
  },
}

export const MaxItemsNotTriggered: Story = {
  name: 'maxItems Not Triggered (Items <= maxItems)',
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Security', current: true },
    ],
    maxItems: 5,
  },
}
