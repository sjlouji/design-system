import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExternalLink } from 'lucide-react'
import { KeyValuePairs } from './KeyValuePairs'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Separator } from '@/components/Separator'

const meta = {
  title: 'Data Display/KeyValuePairs',
  component: KeyValuePairs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
      description: 'Number of columns in the grid. Responsive — collapses to fewer columns on smaller screens.',
    },
    items: {
      control: false,
      description: 'Array of `{ label, value, id?, info? }`. Both `label` and `value` accept strings or any ReactNode.',
    },
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof KeyValuePairs>

export default meta
type Story = StoryObj<typeof meta>

// ── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    columns: 3,
    items: [
      { label: 'Distribution ID', value: 'E1WG1ZNPRXT0D4' },
      { label: 'Status', value: 'Enabled' },
      { label: 'Price class', value: 'Use only US, Canada, Europe' },
      { label: 'Origin', value: 'my-bucket.s3.amazonaws.com' },
      { label: 'SSL Certificate', value: 'Default CloudFront certificate' },
      { label: 'HTTP version', value: 'HTTP/2' },
    ],
  },
}

export const SingleColumn: Story = {
  args: {
    columns: 1,
    items: [
      { label: 'Full name', value: 'Joan Louji' },
      { label: 'Email', value: 'joan@example.com' },
      { label: 'Role', value: 'Administrator' },
      { label: 'Last login', value: '2 hours ago' },
    ],
  },
}

export const TwoColumns: Story = {
  args: {
    columns: 2,
    items: [
      { label: 'Invoice number', value: 'INV-2025-0042' },
      { label: 'Issue date', value: 'June 1, 2025' },
      { label: 'Due date', value: 'June 30, 2025' },
      { label: 'Amount', value: '$4,200.00' },
    ],
  },
}

export const WithBadgeValues: Story = {
  args: { items: [] },
  render: () => (
    <KeyValuePairs
      columns={3}
      items={[
        { label: 'Status', value: <Badge variant="default">Active</Badge> },
        { label: 'Environment', value: <Badge variant="secondary">Production</Badge> },
        { label: 'Health', value: <Badge variant="outline">Healthy</Badge> },
        { label: 'Region', value: 'us-east-1' },
        { label: 'Instance type', value: 't3.medium' },
        { label: 'Availability zone', value: 'us-east-1a' },
      ]}
    />
  ),
}

export const WithReactNodeLabels: Story = {
  args: { items: [] },
  render: () => (
    <KeyValuePairs
      columns={2}
      items={[
        {
          label: (
            <span className="flex items-center gap-1">
              IP Addresses <ExternalLink className="size-3" />
            </span>
          ),
          value: (
            <div className="flex flex-col gap-1">
              <span>192.168.0.1</span>
              <span>192.168.0.2</span>
              <span>192.168.0.3</span>
            </div>
          ),
        },
        {
          label: 'ARN',
          value: (
            <span className="font-mono text-xs break-all">
              arn:aws:iam::111122223333:role/example-role
            </span>
          ),
        },
      ]}
    />
  ),
}

export const WithInfoSlot: Story = {
  args: { items: [] },
  render: () => (
    <KeyValuePairs
      columns={3}
      items={[
        {
          label: 'Distribution ID',
          value: 'E1WG1ZNPRXT0D4',
          info: (
            <button className="text-xs text-primary underline underline-offset-2">Info</button>
          ),
        },
        {
          label: 'SSL Certificate',
          value: 'Default CloudFront certificate',
          info: (
            <button className="text-xs text-primary underline underline-offset-2">Info</button>
          ),
        },
        { label: 'Price class', value: 'Use only US, Canada, Europe' },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pass `info` to render extra content (e.g. an info link) inline with the label.',
      },
    },
  },
}

export const InDetailPanel: Story = {
  args: { items: [] },
  render: () => (
    <div className="rounded-lg border bg-card p-6 space-y-6 max-w-2xl">
      <div>
        <h3 className="text-base font-semibold mb-1">Distribution details</h3>
        <p className="text-sm text-muted-foreground">CloudFront distribution E1WG1ZNPRXT0D4</p>
      </div>
      <Separator />
      <KeyValuePairs
        columns={2}
        items={[
          { label: 'Distribution ID', value: 'E1WG1ZNPRXT0D4' },
          { label: 'Status', value: <Badge>Enabled</Badge> },
          { label: 'Price class', value: 'Use only US, Canada, Europe' },
          { label: 'HTTP version', value: 'HTTP/2' },
          { label: 'IPv6', value: 'Enabled' },
          { label: 'Created', value: 'Jan 12, 2025' },
        ]}
      />
      <Separator />
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">Edit</Button>
        <Button size="sm">Deploy</Button>
      </div>
    </div>
  ),
  parameters: { layout: 'centered' },
}
