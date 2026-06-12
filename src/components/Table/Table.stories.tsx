import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './Table'
import { Badge } from '@/components/Badge'

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const invoices = [
  { id: 'INV-001', customer: 'Acme Corp', status: 'Paid', method: 'Credit Card', amount: 2500.0, date: 'Jun 1, 2025' },
  { id: 'INV-002', customer: 'Globex Inc', status: 'Pending', method: 'Bank Transfer', amount: 1750.5, date: 'Jun 5, 2025' },
  { id: 'INV-003', customer: 'Umbrella Ltd', status: 'Unpaid', method: 'PayPal', amount: 3200.0, date: 'Jun 10, 2025' },
  { id: 'INV-004', customer: 'Initech', status: 'Paid', method: 'Credit Card', amount: 850.75, date: 'Jun 12, 2025' },
  { id: 'INV-005', customer: 'Massive Dynamic', status: 'Overdue', method: 'Bank Transfer', amount: 6100.0, date: 'May 28, 2025' },
]

const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', lastSeen: '2 min ago' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', lastSeen: '1 hour ago' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', lastSeen: '3 days ago' },
  { id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', lastSeen: 'Just now' },
  { id: 5, name: 'Eva Martinez', email: 'eva@example.com', role: 'Manager', lastSeen: '5 hours ago' },
]

const statusVariant = (status: string) => {
  switch (status) {
    case 'Paid': return 'default'
    case 'Pending': return 'secondary'
    case 'Unpaid': return 'outline'
    case 'Overdue': return 'destructive'
    default: return 'secondary'
  }
}

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.id}</TableCell>
            <TableCell>{inv.customer}</TableCell>
            <TableCell>{inv.status}</TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>Invoice data for June 2025 — 5 records shown.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.id}</TableCell>
            <TableCell>{inv.customer}</TableCell>
            <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const WithFooter: Story = {
  render: () => {
    const total = invoices.reduce((sum, inv) => sum + inv.amount, 0)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-medium">{inv.id}</TableCell>
              <TableCell>{inv.customer}</TableCell>
              <TableCell>{inv.status}</TableCell>
              <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-semibold">Total</TableCell>
            <TableCell className="text-right font-semibold">${total.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  },
}

export const WithStatusBadges: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.id}</TableCell>
            <TableCell>{inv.customer}</TableCell>
            <TableCell>
              <Badge variant={statusVariant(inv.status)}>{inv.status}</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{inv.date}</TableCell>
            <TableCell className="text-right font-medium">${inv.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const UserDirectory: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Last Seen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="text-muted-foreground">{user.email}</TableCell>
            <TableCell>
              <Badge variant="outline">{user.role}</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground text-sm">{user.lastSeen}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const EmptyState: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
            No invoices found.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const StickyHeader: Story = {
  render: () => (
    <div className="max-h-64 overflow-auto rounded-lg border">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 15 }, (_, i) => ({
            id: `INV-${String(i + 1).padStart(3, '0')}`,
            customer: `Customer ${i + 1}`,
            status: ['Paid', 'Pending', 'Unpaid'][i % 3],
            amount: (i + 1) * 125.5,
          })).map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-medium">{inv.id}</TableCell>
              <TableCell>{inv.customer}</TableCell>
              <TableCell>{inv.status}</TableCell>
              <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
}

export const SelectableRows: Story = {
  render: function SelectableTable() {
    const [selected, setSelected] = React.useState<Set<string>>(new Set())

    function toggle(id: string) {
      setSelected((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    }

    function toggleAll() {
      setSelected((prev) =>
        prev.size === invoices.length ? new Set() : new Set(invoices.map((i) => i.id))
      )
    }

    return (
      <div className="space-y-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input
                  type="checkbox"
                  checked={selected.size === invoices.length}
                  onChange={toggleAll}
                  className="cursor-pointer"
                />
              </TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow
                key={inv.id}
                data-state={selected.has(inv.id) ? 'selected' : undefined}
                onClick={() => toggle(inv.id)}
                className="cursor-pointer"
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selected.has(inv.id)}
                    onChange={() => toggle(inv.id)}
                    className="cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell className="font-medium">{inv.id}</TableCell>
                <TableCell>{inv.customer}</TableCell>
                <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {selected.size > 0 && (
          <p className="text-sm text-muted-foreground">{selected.size} row(s) selected</p>
        )}
      </div>
    )
  },
}

export const NarrowColumns: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-24 text-right">Score</TableHead>
          <TableHead className="w-24 text-right">Rank</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { rank: 1, name: 'Alice Johnson', score: 98.5 },
          { rank: 2, name: 'Bob Smith', score: 95.2 },
          { rank: 3, name: 'Carol White', score: 91.8 },
          { rank: 4, name: 'Dave Brown', score: 87.4 },
          { rank: 5, name: 'Eva Martinez', score: 84.0 },
        ].map((row) => (
          <TableRow key={row.rank}>
            <TableCell className="text-muted-foreground">{row.rank}</TableCell>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell className="text-right">{row.score}</TableCell>
            <TableCell className="text-right font-medium">#{row.rank}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
