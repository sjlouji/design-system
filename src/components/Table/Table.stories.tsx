import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
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
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Skeleton } from '@/components/Skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the inner <table> element. The outer container always has overflow-x-auto applied.',
    },
    children: {
      control: false,
      description: 'Table content — compose with TableHeader, TableBody, TableFooter, TableCaption, TableRow, TableHead, and TableCell sub-components.',
    },
  },
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
  args: {
    className: undefined,
  },
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

// ---- Feature: Sticky columns ----

export const StickyColumns: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }} className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sticky="left" className="w-24">Invoice</TableHead>
            <TableHead sticky="left" className="w-40">Customer</TableHead>
            <TableHead className="w-40">Method</TableHead>
            <TableHead className="w-40">Date</TableHead>
            <TableHead className="w-32">Notes</TableHead>
            <TableHead sticky="right" className="w-28 text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell sticky="left" className="font-medium">{inv.id}</TableCell>
              <TableCell sticky="left">{inv.customer}</TableCell>
              <TableCell>{inv.method}</TableCell>
              <TableCell className="text-muted-foreground">{inv.date}</TableCell>
              <TableCell className="text-muted-foreground text-xs">Ref #{Math.floor(inv.amount)}</TableCell>
              <TableCell sticky="right" className="text-right font-medium">${inv.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Invoice and Customer columns pin to the left; Amount pins to the right. Scroll horizontally to see them stay in place. Use `sticky="left"` or `sticky="right"` on `TableHead` and `TableCell`.',
      },
    },
  },
}

// ---- Feature: Loading state ----

export const LoadingState: Story = {
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
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
            <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
            <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use `Skeleton` components inside `TableCell` to show a loading placeholder while data is being fetched.',
      },
    },
  },
}

// ---- Feature: Action menu ----

export const WithActionMenu: Story = {
  render: function ActionMenuTable() {
    const [log, setLog] = React.useState<string[]>([])

    return (
      <div className="flex flex-col gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-12" />
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
                <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <span className="text-base leading-none">⋯</span>
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setLog((p) => [`View ${inv.id}`, ...p.slice(0, 4)])}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLog((p) => [`Edit ${inv.id}`, ...p.slice(0, 4)])}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setLog((p) => [`Delete ${inv.id}`, ...p.slice(0, 4)])}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {log.length > 0 && (
          <div className="text-sm text-muted-foreground space-y-0.5">
            {log.map((entry, i) => <div key={i}>{entry}</div>)}
          </div>
        )}
      </div>
    )
  },
}

// ---- Feature: Expandable rows ----

export const ExpandableRows: Story = {
  render: function ExpandableTable() {
    const [expanded, setExpanded] = React.useState<Set<string>>(new Set())

    function toggle(id: string) {
      setExpanded((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10" />
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <React.Fragment key={inv.id}>
              <TableRow>
                <TableCell>
                  <button
                    onClick={() => toggle(inv.id)}
                    aria-label={expanded.has(inv.id) ? 'Collapse row' : 'Expand row'}
                    className={cn(
                      'flex items-center justify-center text-muted-foreground hover:text-foreground transition-transform duration-150',
                      expanded.has(inv.id) && 'rotate-90',
                    )}
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </TableCell>
                <TableCell className="font-medium">{inv.id}</TableCell>
                <TableCell>{inv.customer}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(inv.status)}>{inv.status}</Badge>
                </TableCell>
                <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
              </TableRow>
              {expanded.has(inv.id) && (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={5} className="bg-muted/30 px-4 py-3">
                    <p className="text-sm text-muted-foreground">
                      Payment method: {inv.method} · Date: {inv.date}
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `React.Fragment` to pair each data row with a collapsible sub-row. Toggle expanded state with local `useState`. The sub-row spans all columns with `colSpan`.',
      },
    },
  },
}

// ---- Selection ---------------------------------------------------------------

/**
 * Single selection — click a row to highlight it; clicking the same row again
 * deselects it. No checkboxes: visual state is driven by `data-state="selected"`
 * on the row, which maps to the `data-[state=selected]:bg-muted` Tailwind rule.
 */
export const SingleSelectRows: Story = {
  render: function SingleSelectTable() {
    const [selectedId, setSelectedId] = React.useState<string | null>(null)

    return (
      <div className="flex flex-col gap-4">
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
              <TableRow
                key={inv.id}
                data-state={selectedId === inv.id ? 'selected' : undefined}
                onClick={() => setSelectedId((prev) => (prev === inv.id ? null : inv.id))}
                className="cursor-pointer select-none"
              >
                <TableCell className="font-medium">{inv.id}</TableCell>
                <TableCell>{inv.customer}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(inv.status)}>{inv.status}</Badge>
                </TableCell>
                <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-sm text-muted-foreground">
          {selectedId ? `Selected: ${selectedId}` : 'Click a row to select it. Click again to deselect.'}
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Click-to-select single row. Set `data-state="selected"` on the `TableRow` to trigger the built-in highlight. Toggle by comparing the clicked id with the current selection.',
      },
    },
  },
}

/**
 * Single selection with an explicit radio button in a leading column.
 * Radio inputs make the single-select contract visually obvious to users
 * and improve keyboard accessibility (arrow keys cycle through rows).
 */
export const SingleSelectRadio: Story = {
  render: function RadioSelectTable() {
    const [selectedId, setSelectedId] = React.useState<string | null>(invoices[0].id)

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10" />
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow
              key={inv.id}
              data-state={selectedId === inv.id ? 'selected' : undefined}
              onClick={() => setSelectedId(inv.id)}
              className="cursor-pointer select-none"
            >
              <TableCell>
                <input
                  type="radio"
                  name="invoice-select"
                  value={inv.id}
                  checked={selectedId === inv.id}
                  onChange={() => setSelectedId(inv.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-pointer"
                  aria-label={`Select ${inv.id}`}
                />
              </TableCell>
              <TableCell className="font-medium">{inv.id}</TableCell>
              <TableCell>{inv.customer}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(inv.status)}>{inv.status}</Badge>
              </TableCell>
              <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio `<input>` in a leading column makes the single-select contract explicit. Row click and radio click both update state; `e.stopPropagation()` on the radio prevents double-firing.',
      },
    },
  },
}

/**
 * Multi selection using Checkbox components — correct indeterminate state on the
 * header checkbox when only some rows are checked.
 */
export const MultiSelectRows: Story = {
  render: function MultiSelectTable() {
    const [selected, setSelected] = React.useState<Set<string>>(new Set())
    const allIds = invoices.map((i) => i.id)
    const isAllSelected = selected.size === allIds.length
    const isSomeSelected = selected.size > 0 && !isAllSelected

    function toggle(id: string) {
      setSelected((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    function toggleAll() {
      setSelected(isAllSelected ? new Set() : new Set(allIds))
    }

    return (
      <div className="flex flex-col gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={isAllSelected ? true : isSomeSelected ? 'indeterminate' : false}
                  onCheckedChange={toggleAll}
                  aria-label="Select all rows"
                />
              </TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow
                key={inv.id}
                data-state={selected.has(inv.id) ? 'selected' : undefined}
              >
                <TableCell>
                  <Checkbox
                    checked={selected.has(inv.id)}
                    onCheckedChange={() => toggle(inv.id)}
                    aria-label={`Select ${inv.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{inv.id}</TableCell>
                <TableCell>{inv.customer}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(inv.status)}>{inv.status}</Badge>
                </TableCell>
                <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-sm text-muted-foreground">
          {selected.size === 0
            ? 'Check rows individually or use the header checkbox.'
            : `${selected.size} of ${allIds.length} row(s) selected.`}
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select pattern using `Checkbox`. Pass `checked="indeterminate"` to the header checkbox when `someSelected && !allSelected` to show the half-checked state.',
      },
    },
  },
}

/**
 * Multi selection with a contextual bulk-action bar that slides in above the
 * table only when at least one row is selected. Clearing selection hides the bar.
 */
export const MultiSelectBulkBar: Story = {
  render: function BulkBarTable() {
    const [selected, setSelected] = React.useState<Set<string>>(new Set())
    const [log, setLog] = React.useState<string[]>([])
    const allIds = invoices.map((i) => i.id)
    const isAllSelected = selected.size === allIds.length
    const isSomeSelected = selected.size > 0 && !isAllSelected

    function toggle(id: string) {
      setSelected((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    function toggleAll() {
      setSelected((prev) => (prev.size === allIds.length ? new Set() : new Set(allIds)))
    }

    function act(label: string) {
      const ids = Array.from(selected).join(', ')
      setLog((prev) => [`${label}: ${ids}`, ...prev.slice(0, 3)])
      setSelected(new Set())
    }

    return (
      <div className="flex flex-col gap-3">
        {selected.size > 0 && (
          <div className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2.5">
            <span className="text-sm font-medium">{selected.size} row(s) selected</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => act('Exported')}>
                Export
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => act('Deleted')}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={isAllSelected ? true : isSomeSelected ? 'indeterminate' : false}
                  onCheckedChange={toggleAll}
                  aria-label="Select all rows"
                />
              </TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow
                key={inv.id}
                data-state={selected.has(inv.id) ? 'selected' : undefined}
              >
                <TableCell>
                  <Checkbox
                    checked={selected.has(inv.id)}
                    onCheckedChange={() => toggle(inv.id)}
                    aria-label={`Select ${inv.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{inv.id}</TableCell>
                <TableCell>{inv.customer}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(inv.status)}>{inv.status}</Badge>
                </TableCell>
                <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {log.length > 0 && (
          <div className="space-y-0.5 text-sm text-muted-foreground">
            {log.map((entry, i) => <div key={i}>{entry}</div>)}
          </div>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'The bulk-action bar renders conditionally — only when `selected.size > 0`. Actions call `setSelected(new Set())` to clear selection after executing.',
      },
    },
  },
}

/**
 * Single and multi selection side-by-side as a visual comparison.
 */
export const SelectionComparison: Story = {
  render: function ComparisonTable() {
    const [singleId, setSingleId] = React.useState<string | null>(null)
    const [multiIds, setMultiIds] = React.useState<Set<string>>(new Set())
    const allIds = invoices.map((i) => i.id)
    const isAllSelected = multiIds.size === allIds.length
    const isSomeSelected = multiIds.size > 0 && !isAllSelected

    function toggleMulti(id: string) {
      setMultiIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    const sharedHead = (
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
    )

    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Single selection</p>
          <Table>
            {sharedHead}
            <TableBody>
              {invoices.map((inv) => (
                <TableRow
                  key={inv.id}
                  data-state={singleId === inv.id ? 'selected' : undefined}
                  onClick={() => setSingleId((p) => (p === inv.id ? null : inv.id))}
                  className="cursor-pointer select-none"
                >
                  <TableCell className="font-medium">{inv.id}</TableCell>
                  <TableCell>{inv.customer}</TableCell>
                  <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground">
            {singleId ?? 'Nothing selected'}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Multi selection</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={isAllSelected ? true : isSomeSelected ? 'indeterminate' : false}
                    onCheckedChange={() =>
                      setMultiIds(isAllSelected ? new Set() : new Set(allIds))
                    }
                    aria-label="Select all"
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
                  data-state={multiIds.has(inv.id) ? 'selected' : undefined}
                >
                  <TableCell>
                    <Checkbox
                      checked={multiIds.has(inv.id)}
                      onCheckedChange={() => toggleMulti(inv.id)}
                      aria-label={`Select ${inv.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{inv.id}</TableCell>
                  <TableCell>{inv.customer}</TableCell>
                  <TableCell className="text-right">${inv.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground">
            {multiIds.size === 0 ? 'Nothing selected' : `${multiIds.size} selected`}
          </p>
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Single vs multi selection side by side. Both patterns use `data-state="selected"` for row highlighting; multi additionally needs a `Checkbox` column and indeterminate logic.',
      },
    },
  },
}
