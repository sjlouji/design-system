import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import {
  CheckCircleIcon,
  AlertCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  StarIcon,
  SparklesIcon,
  ZapIcon,
  XIcon,
} from 'lucide-react'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'success', 'warning', 'outline', 'ghost', 'ai'],
    },
    asChild: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Individual variants
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: { children: 'Default' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
}

export const Success: Story = {
  args: { variant: 'success', children: 'Success' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Warning' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
}

export const AI: Story = {
  name: 'Variant: AI',
  args: { variant: 'ai', children: 'AI' },
}

// ---------------------------------------------------------------------------
// All variants at once
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="ai">AI</Badge>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// With icons
// ---------------------------------------------------------------------------

export const WithIconLeft: Story = {
  name: 'With icon — left',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <CheckCircleIcon />
        Active
      </Badge>
      <Badge variant="destructive">
        <AlertCircleIcon />
        Error
      </Badge>
      <Badge variant="warning">
        <AlertTriangleIcon />
        Warning
      </Badge>
      <Badge variant="default">
        <InfoIcon />
        Info
      </Badge>
      <Badge variant="ai">
        <SparklesIcon />
        AI-powered
      </Badge>
    </div>
  ),
}

export const WithIconOnly: Story = {
  name: 'With icon only',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default"><StarIcon /></Badge>
      <Badge variant="success"><CheckCircleIcon /></Badge>
      <Badge variant="destructive"><XIcon /></Badge>
      <Badge variant="warning"><ZapIcon /></Badge>
      <Badge variant="ai"><SparklesIcon /></Badge>
    </div>
  ),
}

export const StatusBadges: Story = {
  name: 'Status badges (with icons)',
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <Badge variant="success"><CheckCircleIcon />Published</Badge>
        <Badge variant="warning"><AlertTriangleIcon />Draft</Badge>
        <Badge variant="destructive"><AlertCircleIcon />Failed</Badge>
        <Badge variant="secondary"><InfoIcon />Pending</Badge>
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Size via className
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  name: 'Sizes via className',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge className="text-[10px] px-1.5 py-0">Tiny</Badge>
      <Badge>Default</Badge>
      <Badge className="text-sm px-3 py-1">Large</Badge>
      <Badge className="text-base px-4 py-1.5">XLarge</Badge>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// asChild usage
// ---------------------------------------------------------------------------

export const AsChildAnchor: Story = {
  name: 'asChild — renders as <a>',
  render: () => (
    <Badge asChild variant="outline">
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Clickable badge
      </a>
    </Badge>
  ),
}

export const AsChildAllVariants: Story = {
  name: 'asChild — all variants as links',
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['default', 'secondary', 'outline', 'ghost', 'destructive', 'success', 'warning', 'ai'] as const).map(
        (variant) => (
          <Badge key={variant} asChild variant={variant}>
            <a href="#" onClick={(e) => e.preventDefault()}>
              {variant}
            </a>
          </Badge>
        )
      )}
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Contextual usage examples
// ---------------------------------------------------------------------------

export const InlineWithText: Story = {
  name: 'Inline with text',
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <p className="text-sm">
        This feature is{' '}
        <Badge variant="success" className="align-middle">stable</Badge>{' '}
        and ready for production.
      </p>
      <p className="text-sm">
        This API is{' '}
        <Badge variant="warning" className="align-middle">experimental</Badge>{' '}
        and may change.
      </p>
      <p className="text-sm">
        Powered by{' '}
        <Badge variant="ai" className="align-middle">
          <SparklesIcon />
          AI
        </Badge>{' '}
        models.
      </p>
    </div>
  ),
}

export const NotificationCount: Story = {
  name: 'Notification count badge',
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative inline-flex">
        <button className="px-3 py-1.5 text-sm border rounded-lg">Inbox</button>
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 px-1.5 min-w-[1.25rem] justify-center"
        >
          3
        </Badge>
      </div>
      <div className="relative inline-flex">
        <button className="px-3 py-1.5 text-sm border rounded-lg">Notifications</button>
        <Badge
          variant="default"
          className="absolute -top-2 -right-2 px-1.5 min-w-[1.25rem] justify-center"
        >
          12
        </Badge>
      </div>
    </div>
  ),
}

export const TableCellBadges: Story = {
  name: 'In table cells',
  parameters: { layout: 'padded' },
  render: () => (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b">
          <th className="text-left p-2 font-medium">Name</th>
          <th className="text-left p-2 font-medium">Status</th>
          <th className="text-left p-2 font-medium">Plan</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="p-2">Acme Corp</td>
          <td className="p-2"><Badge variant="success"><CheckCircleIcon />Active</Badge></td>
          <td className="p-2"><Badge variant="ai"><SparklesIcon />Enterprise</Badge></td>
        </tr>
        <tr className="border-b">
          <td className="p-2">Beta Inc</td>
          <td className="p-2"><Badge variant="warning"><AlertTriangleIcon />Trial</Badge></td>
          <td className="p-2"><Badge variant="secondary">Starter</Badge></td>
        </tr>
        <tr>
          <td className="p-2">Gamma LLC</td>
          <td className="p-2"><Badge variant="destructive"><AlertCircleIcon />Suspended</Badge></td>
          <td className="p-2"><Badge variant="outline">Free</Badge></td>
        </tr>
      </tbody>
    </table>
  ),
}

// ---------------------------------------------------------------------------
// Preserved play stories
// ---------------------------------------------------------------------------

export const CssCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { children: 'Badge' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText('Badge')
    const styles = window.getComputedStyle(badge)
    expect(styles.display).toBe('inline-flex')
    expect(styles.fontSize).toBe('12px')
  },
}

export const AllVariantsPlay: Story = {
  name: 'All variants (play test)',
  tags: ['ai-generated', 'needs-work'],
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="ai">AI</Badge>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('Default')).toBeInTheDocument()
    expect(canvas.getByText('Secondary')).toBeInTheDocument()
    expect(canvas.getByText('Destructive')).toBeInTheDocument()
    expect(canvas.getByText('Success')).toBeInTheDocument()
    expect(canvas.getByText('Warning')).toBeInTheDocument()
    expect(canvas.getByText('Outline')).toBeInTheDocument()
    expect(canvas.getByText('Ghost')).toBeInTheDocument()
    expect(canvas.getByText('AI')).toBeInTheDocument()
  },
}
