import type { Meta, StoryObj } from '@storybook/react-vite'

import { ColumnLayout } from './ColumnLayout'

const meta = {
  title: 'Layout/ColumnLayout',
  component: ColumnLayout,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    children: null,
  },
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4],
      description: 'Number of equal-width columns in the grid.',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'text-grid'],
      description: "'default' uses gap-4; 'text-grid' uses gap-8 and applies text-sm to children.",
    },
    borders: {
      control: { type: 'select' },
      options: ['none', 'vertical', 'horizontal', 'all'],
      description: 'Border placement between columns and/or rows.',
    },
    children: {
      control: false,
      description: 'Column content. Each direct child occupies one column cell.',
    },
  },
} satisfies Meta<typeof ColumnLayout>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Two columns
// ---------------------------------------------------------------------------

export const TwoColumns: Story = {
  name: 'Two columns (default)',
  render: () => (
    <ColumnLayout columns={2}>
      <div>
        <h3 className="font-semibold mb-1">Instance details</h3>
        <p className="text-sm text-muted-foreground">
          An EC2 instance running in the us-east-1 region. Launched on June 1, 2026.
        </p>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Network configuration</h3>
        <p className="text-sm text-muted-foreground">
          Attached to VPC vpc-0abc1234. Inbound traffic allowed on ports 80 and 443.
        </p>
      </div>
    </ColumnLayout>
  ),
}

// ---------------------------------------------------------------------------
// Three columns — text-grid variant
// ---------------------------------------------------------------------------

export const ThreeColumns: Story = {
  name: 'Three columns (text-grid)',
  render: () => (
    <ColumnLayout columns={3} variant="text-grid">
      <div>
        <h3 className="font-semibold mb-1">Storage</h3>
        <p className="text-muted-foreground">
          100 GB gp3 volume attached. 62% utilised. Snapshots taken daily at 02:00 UTC.
        </p>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Compute</h3>
        <p className="text-muted-foreground">
          t3.medium — 2 vCPUs, 4 GB memory. Average CPU load over the last 7 days: 12%.
        </p>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Billing</h3>
        <p className="text-muted-foreground">
          On-demand pricing. Estimated monthly cost: $32.48. No reserved capacity applied.
        </p>
      </div>
    </ColumnLayout>
  ),
}

// ---------------------------------------------------------------------------
// Four columns — default variant
// ---------------------------------------------------------------------------

export const FourColumns: Story = {
  name: 'Four columns (default)',
  render: () => (
    <ColumnLayout columns={4}>
      <div className="rounded-lg border bg-card p-4 text-center">
        <p className="text-2xl font-bold">12</p>
        <p className="text-xs text-muted-foreground mt-1">Running</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-center">
        <p className="text-2xl font-bold">4</p>
        <p className="text-xs text-muted-foreground mt-1">Stopped</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-center">
        <p className="text-2xl font-bold">2</p>
        <p className="text-xs text-muted-foreground mt-1">Pending</p>
      </div>
      <div className="rounded-lg border bg-card p-4 text-center">
        <p className="text-2xl font-bold">1</p>
        <p className="text-xs text-muted-foreground mt-1">Terminated</p>
      </div>
    </ColumnLayout>
  ),
}

// ---------------------------------------------------------------------------
// Vertical borders
// ---------------------------------------------------------------------------

export const WithVerticalBorders: Story = {
  name: 'With vertical borders',
  render: () => (
    <ColumnLayout columns={3} borders="vertical">
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          Region
        </p>
        <p className="text-sm font-medium">us-east-1</p>
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          Availability zone
        </p>
        <p className="text-sm font-medium">us-east-1a</p>
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          Instance type
        </p>
        <p className="text-sm font-medium">t3.medium</p>
      </div>
    </ColumnLayout>
  ),
}

// ---------------------------------------------------------------------------
// Single column
// ---------------------------------------------------------------------------

export const SingleColumn: Story = {
  name: 'Single column',
  render: () => (
    <ColumnLayout columns={1}>
      <div>
        <h3 className="font-semibold mb-1">Description</h3>
        <p className="text-sm text-muted-foreground">
          This resource is part of the production stack. Changes to this configuration
          require approval from the infrastructure team before being applied.
        </p>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Tags</h3>
        <p className="text-sm text-muted-foreground">
          Environment: production &mdash; Team: platform &mdash; CostCenter: eng-infra
        </p>
      </div>
    </ColumnLayout>
  ),
}
