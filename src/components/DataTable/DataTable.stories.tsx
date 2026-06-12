import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { createColumnHelper } from '@tanstack/react-table'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { DataTable, type DataTableProps } from './DataTable'

// ---- Shared types and data ----

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  joined: string
}

const columnHelper = createColumnHelper<User>()

const baseColumns = [
  columnHelper.accessor('id', { header: 'ID', enableSorting: true }),
  columnHelper.accessor('name', { header: 'Name', enableSorting: true }),
  columnHelper.accessor('email', { header: 'Email', enableSorting: true }),
  columnHelper.accessor('role', { header: 'Role', enableSorting: true }),
  columnHelper.accessor('status', { header: 'Status' }),
]

const roles = ['Admin', 'Editor', 'Viewer', 'Manager']
const statuses = ['Active', 'Inactive', 'Pending']

const userData: User[] = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: roles[i % roles.length],
  status: statuses[i % statuses.length],
  joined: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
}))

const smallData = userData.slice(0, 7)

// ---- Meta ----

const meta: Meta<DataTableProps<User>> = {
  title: 'DataDisplay/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    data: {
      control: false,
      description: 'Array of row data objects. The generic type `TData` is inferred from this array and must match the column definitions.',
    },
    columns: {
      control: false,
      description: 'TanStack Table column definitions (`ColumnDef<TData>[]`). Use `createColumns` (re-exported `createColumnHelper`) to build type-safe column definitions. Columns with `enableSorting: true` render a sortable header button.',
    },
    searchable: {
      control: 'boolean',
      description: 'When true, renders a global search input above the table that filters across all columns. Pair with `searchPlaceholder` to customise the input hint.',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the global search input. Only visible when `searchable` is true. Defaults to "Search…".',
    },
    selectable: {
      control: 'boolean',
      description: 'Shorthand for `selectionMode="multi"`. Prepends a checkbox column. Prefer `selectionMode` for new usage.',
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multi'],
      description: '`"single"` — click a row to select one at a time (no checkboxes). `"multi"` — checkbox column; header checkbox selects/deselects the whole page. Takes precedence over `selectable`.',
    },
    onRowSelectionChange: {
      control: false,
      description: 'Callback fired whenever selected rows change. Receives an array of selected data objects (typed to `TData`).',
    },
    pagination: {
      control: 'boolean',
      description: 'When true, renders pagination controls below the table — a page-size selector (5/10/20/50) and Previous/Next buttons. Defaults to true.',
    },
    pageSize: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Initial number of rows displayed per page. Defaults to 10. The user can change this at runtime via the rows-per-page selector when `pagination` is true.',
    },
    loading: {
      control: 'boolean',
      description: 'When true, replaces table rows with skeleton placeholders (5 rows × column count). Hides pagination. Use while data is being fetched.',
    },
    emptyMessage: {
      control: 'text',
      description: 'Text shown in the table body when `data` is empty and `loading` is false. Defaults to "No results.".',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the outermost wrapper `div`.',
    },
  },
}

export default meta
type Story = StoryObj<DataTableProps<User>>

// ---- Stories ----

export const Default: Story = {
  args: {
    data: smallData,
    columns: baseColumns,
    searchable: false,
    selectable: false,
    pagination: true,
    pageSize: 10,
    loading: false,
    emptyMessage: 'No results.',
  },
}

export const Basic: Story = {
  args: {
    data: smallData,
    columns: baseColumns,
    pagination: false,
  },
}

export const WithSearch: Story = {
  args: {
    data: userData,
    columns: baseColumns,
    searchable: true,
    searchPlaceholder: 'Search users…',
    pagination: true,
    pageSize: 10,
  },
}

export const WithSelection: Story = {
  args: {
    data: smallData,
    columns: baseColumns,
    selectable: true,
    pagination: false,
  },
}

export const WithPagination: Story = {
  args: {
    data: userData,
    columns: baseColumns,
    pagination: true,
    pageSize: 10,
  },
}

export const SmallPageSize: Story = {
  args: {
    data: userData,
    columns: baseColumns,
    pagination: true,
    pageSize: 5,
  },
}

export const AllFeatures: Story = {
  args: {
    data: userData,
    columns: baseColumns,
    searchable: true,
    searchPlaceholder: 'Search by name, email, role…',
    selectable: true,
    pagination: true,
    pageSize: 10,
  },
}

export const Loading: Story = {
  args: {
    data: [],
    columns: baseColumns,
    loading: true,
    pagination: false,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    columns: baseColumns,
    pagination: false,
  },
}

export const CustomEmptyMessage: Story = {
  args: {
    data: [],
    columns: baseColumns,
    emptyMessage: 'No users match your search. Try adjusting your filters.',
    pagination: false,
  },
}

export const WithBadgeColumn: Story = {
  render: () => {
    const statusVariant = (s: string): 'default' | 'secondary' | 'destructive' => {
      if (s === 'Active') return 'default'
      if (s === 'Pending') return 'secondary'
      return 'destructive'
    }

    const cols = [
      columnHelper.accessor('id', { header: 'ID' }),
      columnHelper.accessor('name', { header: 'Name' }),
      columnHelper.accessor('email', { header: 'Email' }),
      columnHelper.accessor('role', { header: 'Role' }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ getValue }) => (
          <Badge variant={statusVariant(getValue())}>{getValue()}</Badge>
        ),
        enableSorting: false,
      }),
    ]

    return (
      <DataTable
        data={smallData}
        columns={cols}
        pagination={false}
      />
    )
  },
}

export const WithActionsColumn: Story = {
  render: () => {
    const cols = [
      columnHelper.accessor('id', { header: 'ID' }),
      columnHelper.accessor('name', { header: 'Name' }),
      columnHelper.accessor('email', { header: 'Email' }),
      columnHelper.accessor('role', { header: 'Role' }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => alert(`Edit user ${row.original.id}`)}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => alert(`Delete user ${row.original.id}`)}
            >
              Delete
            </Button>
          </div>
        ),
        enableSorting: false,
      }),
    ]

    return (
      <DataTable
        data={smallData}
        columns={cols}
        pagination={false}
      />
    )
  },
}

export const WithSearchAndBadges: Story = {
  render: () => {
    const statusVariant = (s: string): 'default' | 'secondary' | 'destructive' => {
      if (s === 'Active') return 'default'
      if (s === 'Pending') return 'secondary'
      return 'destructive'
    }

    const cols = [
      columnHelper.accessor('id', { header: 'ID' }),
      columnHelper.accessor('name', { header: 'Name', enableSorting: true }),
      columnHelper.accessor('email', { header: 'Email', enableSorting: true }),
      columnHelper.accessor('role', { header: 'Role', enableSorting: true }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ getValue }) => (
          <Badge variant={statusVariant(getValue())}>{getValue()}</Badge>
        ),
      }),
      columnHelper.accessor('joined', { header: 'Joined', enableSorting: true }),
    ]

    return (
      <DataTable
        data={userData}
        columns={cols}
        searchable
        searchPlaceholder="Search users..."
        selectable
        pagination
        pageSize={10}
      />
    )
  },
}

// ---- Selection ---------------------------------------------------------------

/**
 * Single selection — click any row to highlight it. Clicking the same row again
 * deselects it. Only one row can be selected at a time; no checkbox column is
 * rendered. Works alongside sorting, search, and pagination.
 */
export const SingleSelect: Story = {
  args: {
    data: smallData,
    columns: baseColumns,
    selectionMode: 'single',
    pagination: false,
  },
  parameters: {
    docs: { description: { story: 'Click a row to select it. Click again to deselect. No checkboxes — selection state is shown via row highlight.' } },
  },
}

/**
 * Single selection with a controlled callback that surfaces the selected row
 * outside the table. Demonstrates the `onRowSelectionChange` API.
 */
export const SingleSelectControlled: Story = {
  render: function SingleSelectControlledTable() {
    const [selected, setSelected] = React.useState<User | null>(null)
    return (
      <div className="flex flex-col gap-4">
        <DataTable
          data={smallData}
          columns={baseColumns}
          selectionMode="single"
          onRowSelectionChange={(rows) => setSelected(rows[0] ?? null)}
          pagination={false}
        />
        <div className="rounded-lg border px-4 py-3 text-sm">
          {selected ? (
            <span>
              Selected: <strong>{selected.name}</strong> — {selected.email}
            </span>
          ) : (
            <span className="text-muted-foreground">Click a row to select it.</span>
          )}
        </div>
      </div>
    )
  },
  parameters: {
    docs: { description: { story: '`onRowSelectionChange` fires with a `TData[]` array on every selection change. For single mode the array always has 0 or 1 items.' } },
  },
}

/**
 * Single selection that drives a side panel. A common pattern for
 * master-detail layouts: the table lives on the left, details on the right.
 */
export const SingleSelectDetailPanel: Story = {
  render: function SingleSelectDetailTable() {
    const [selected, setSelected] = React.useState<User | null>(null)
    const statusVariant = (s: string): 'default' | 'secondary' | 'destructive' =>
      s === 'Active' ? 'default' : s === 'Pending' ? 'secondary' : 'destructive'

    return (
      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 260px' }}>
        <DataTable
          data={userData.slice(0, 8)}
          columns={baseColumns}
          selectionMode="single"
          onRowSelectionChange={(rows) => setSelected(rows[0] ?? null)}
          pagination={false}
        />
        <div className="rounded-lg border p-4 self-start">
          {selected ? (
            <div className="flex flex-col gap-2 text-sm">
              <p className="font-semibold text-base leading-tight">{selected.name}</p>
              <p className="text-muted-foreground break-all">{selected.email}</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                <Badge variant="outline">{selected.role}</Badge>
                <Badge variant={statusVariant(selected.status)}>{selected.status}</Badge>
              </div>
              <p className="text-muted-foreground text-xs">Joined {selected.joined}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Select a row to view details.</p>
          )}
        </div>
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'Master-detail layout: single-select drives a detail panel. Combine `selectionMode="single"` with `onRowSelectionChange` to keep a separate detail state.' } },
  },
}

/**
 * Single selection with searching — selection persists across filter changes.
 */
export const SingleSelectWithSearch: Story = {
  render: function SingleSelectSearchTable() {
    const [selected, setSelected] = React.useState<User | null>(null)
    return (
      <div className="flex flex-col gap-4">
        <DataTable
          data={userData}
          columns={baseColumns}
          selectionMode="single"
          onRowSelectionChange={(rows) => setSelected(rows[0] ?? null)}
          searchable
          searchPlaceholder="Search users…"
          pagination={false}
        />
        <p className="text-sm text-muted-foreground">
          {selected ? `Selected: ${selected.name}` : 'Search and click a row to select it.'}
        </p>
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'Single-select + search together. Try searching "Admin" then selecting a row — the selected row can be filtered out without losing the selection state.' } },
  },
}

/**
 * Multi selection via checkbox column. The header checkbox selects / deselects
 * all rows on the current page and shows an indeterminate state when only some
 * rows are selected.
 */
export const MultiSelect: Story = {
  args: {
    data: smallData,
    columns: baseColumns,
    selectionMode: 'multi',
    pagination: false,
  },
  parameters: {
    docs: { description: { story: 'Checkbox column with indeterminate header. `selectionMode="multi"` is the explicit API; the legacy `selectable` prop remains equivalent.' } },
  },
}

/**
 * Multi selection with a callback that reports which rows are currently
 * selected. Shows name list and selection count.
 */
export const MultiSelectControlled: Story = {
  render: function MultiSelectControlledTable() {
    const [selected, setSelected] = React.useState<User[]>([])
    return (
      <div className="flex flex-col gap-4">
        <DataTable
          data={smallData}
          columns={baseColumns}
          selectionMode="multi"
          onRowSelectionChange={setSelected}
          pagination={false}
        />
        <div className="rounded-lg border px-4 py-3 text-sm">
          {selected.length === 0 ? (
            <span className="text-muted-foreground">No rows selected.</span>
          ) : (
            <span>
              <strong>{selected.length}</strong> selected:{' '}
              {selected.map((r) => r.name).join(', ')}
            </span>
          )}
        </div>
      </div>
    )
  },
  parameters: {
    docs: { description: { story: '`onRowSelectionChange` delivers an array of selected data objects. Useful for wiring up bulk-action buttons.' } },
  },
}

/**
 * Multi selection with a bulk-action toolbar. The toolbar is only visible when
 * at least one row is selected, keeping the UI clean when idle.
 */
export const MultiSelectBulkActions: Story = {
  render: function BulkActionsTable() {
    const [selected, setSelected] = React.useState<User[]>([])
    const [log, setLog] = React.useState<string[]>([])

    function act(label: string) {
      setLog((prev) => [`${label}: ${selected.map((r) => r.name).join(', ')}`, ...prev.slice(0, 3)])
    }

    return (
      <div className="flex flex-col gap-3">
        {selected.length > 0 && (
          <div className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2.5">
            <span className="text-sm font-medium">{selected.length} row(s) selected</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => act('Exported')}>
                Export
              </Button>
              <Button size="sm" variant="outline" onClick={() => act('Assigned')}>
                Assign role
              </Button>
              <Button size="sm" variant="destructive" onClick={() => act('Deleted')}>
                Delete
              </Button>
            </div>
          </div>
        )}
        <DataTable
          data={userData}
          columns={baseColumns}
          selectionMode="multi"
          onRowSelectionChange={setSelected}
          searchable
          searchPlaceholder="Search users…"
          pagination
          pageSize={10}
        />
        {log.length > 0 && (
          <div className="space-y-0.5 text-sm text-muted-foreground">
            {log.map((entry, i) => <div key={i}>{entry}</div>)}
          </div>
        )}
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'The bulk-action toolbar is conditionally rendered based on `selected.length`. Combine with `searchable` and `pagination` for a full list management UI.' } },
  },
}

/**
 * Multi selection that preserves selection across page changes. Selected rows
 * from page 1 stay selected when you navigate to page 2.
 */
export const MultiSelectWithPagination: Story = {
  render: function MultiSelectPaginatedTable() {
    const [selected, setSelected] = React.useState<User[]>([])
    return (
      <div className="flex flex-col gap-4">
        <DataTable
          data={userData}
          columns={baseColumns}
          selectionMode="multi"
          onRowSelectionChange={setSelected}
          pagination
          pageSize={5}
        />
        <p className="text-sm text-muted-foreground">
          {selected.length > 0
            ? `${selected.length} user(s) selected across all pages: ${selected.map((r) => r.name).join(', ')}`
            : 'Select rows on any page — selection persists across page changes.'}
        </p>
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'Row selection state is held in TanStack Table and persists across page navigations. The header checkbox acts on the current page only.' } },
  },
}

/**
 * Multi selection combined with expandable rows — both features active at the
 * same time. Checkboxes and expand toggles coexist in leading columns.
 */
export const MultiSelectWithExpand: Story = {
  render: function MultiSelectExpandTable() {
    const [selected, setSelected] = React.useState<User[]>([])
    return (
      <div className="flex flex-col gap-4">
        <DataTable
          data={smallData}
          columns={baseColumns}
          selectionMode="multi"
          onRowSelectionChange={setSelected}
          renderSubRow={(row) => (
            <div className="grid grid-cols-2 gap-x-8 text-sm">
              <span><span className="text-muted-foreground">Email: </span>{row.email}</span>
              <span><span className="text-muted-foreground">Joined: </span>{row.joined}</span>
            </div>
          )}
          pagination={false}
        />
        <p className="text-sm text-muted-foreground">
          {selected.length > 0 ? `${selected.length} selected` : 'Select rows and expand them to see sub-row details.'}
        </p>
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'Multi-select and expandable rows can be used simultaneously. The expand toggle column appears first, followed by the checkbox column.' } },
  },
}

// ---- Feature: Sticky columns ----

export const WithStickyColumns: Story = {
  render: () => {
    const cols = [
      columnHelper.accessor('id', {
        header: 'ID',
        size: 60,
        meta: { sticky: 'left' as const },
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        size: 160,
        enableSorting: true,
        meta: { sticky: 'left' as const },
      }),
      columnHelper.accessor('email', { header: 'Email', size: 240, enableSorting: true }),
      columnHelper.accessor('role', { header: 'Role', size: 140, enableSorting: true }),
      columnHelper.accessor('joined', { header: 'Joined', size: 150, enableSorting: true }),
      columnHelper.accessor('status', {
        header: 'Status',
        size: 120,
        meta: { sticky: 'right' as const },
      }),
    ]
    return (
      <div style={{ maxWidth: 520 }}>
        <DataTable data={smallData} columns={cols} pagination={false} />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'ID and Name columns are sticky-left; Status is sticky-right. Scroll horizontally to see them pin. Set `meta: { sticky: "left" | "right" }` and an explicit `size` on each column.',
      },
    },
  },
}

// ---- Feature: Resizable columns ----

export const Resizable: Story = {
  render: () => {
    const cols = [
      columnHelper.accessor('id', { header: 'ID', size: 60 }),
      columnHelper.accessor('name', { header: 'Name', size: 180, enableSorting: true }),
      columnHelper.accessor('email', { header: 'Email', size: 220, enableSorting: true }),
      columnHelper.accessor('role', { header: 'Role', size: 140, enableSorting: true }),
      columnHelper.accessor('status', { header: 'Status', size: 120 }),
    ]
    return (
      <DataTable data={smallData} columns={cols} resizable pagination={false} />
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Hover a column header to reveal its resize handle, then drag to resize. Pass `resizable` prop and explicit `size` on columns for best results.',
      },
    },
  },
}

// ---- Feature: No filter match ----

export const FilterNoMatch: Story = {
  args: {
    data: userData,
    columns: baseColumns,
    searchable: true,
    searchPlaceholder: 'Search users…',
    defaultSearchValue: 'zzz-no-match',
    pagination: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'When a search finds no rows, the table shows a "No results for…" message with a Clear filter button. Pre-seeded via `defaultSearchValue`.',
      },
    },
  },
}

// ---- Feature: Row actions dropdown ----

export const WithRowActions: Story = {
  render: function RowActionsTable() {
    const [log, setLog] = React.useState<string[]>([])

    const actions = [
      {
        label: 'Edit',
        onClick: (row: User) => setLog((prev) => [`Edit: ${row.name}`, ...prev.slice(0, 4)]),
      },
      {
        label: 'View profile',
        onClick: (row: User) => setLog((prev) => [`View: ${row.name}`, ...prev.slice(0, 4)]),
      },
      {
        separator: true,
        label: 'Delete',
        variant: 'destructive' as const,
        onClick: (row: User) => setLog((prev) => [`Delete: ${row.name}`, ...prev.slice(0, 4)]),
      },
    ]

    return (
      <div className="flex flex-col gap-4">
        <DataTable
          data={smallData}
          columns={baseColumns}
          rowActions={actions}
          pagination={false}
        />
        {log.length > 0 && (
          <div className="text-sm text-muted-foreground space-y-0.5">
            {log.map((entry, i) => <div key={i}>{entry}</div>)}
          </div>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Pass `rowActions` to automatically append a ⋯ dropdown column. Each action has a `label`, `onClick`, optional `icon`, `disabled`, `variant: "destructive"`, and `separator`.',
      },
    },
  },
}

// ---- Feature: Expandable rows ----

export const WithExpandableRows: Story = {
  render: () => (
    <DataTable
      data={smallData}
      columns={baseColumns}
      renderSubRow={(row) => (
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
          <div>
            <span className="text-muted-foreground">Email: </span>
            {row.email}
          </div>
          <div>
            <span className="text-muted-foreground">Joined: </span>
            {row.joined}
          </div>
        </div>
      )}
      pagination={false}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pass `renderSubRow` to add an expand toggle column. Clicking the chevron reveals the sub-row content beneath that row. Use `getRowCanExpand` to conditionally hide the toggle.',
      },
    },
  },
}

// ---- Kitchen sink: all features together ----

export const KitchenSink: Story = {
  render: function KitchenSinkTable() {
    const cols = [
      columnHelper.accessor('id', {
        header: 'ID',
        size: 60,
        meta: { sticky: 'left' as const },
      }),
      columnHelper.accessor('name', { header: 'Name', size: 160, enableSorting: true }),
      columnHelper.accessor('email', { header: 'Email', size: 220, enableSorting: true }),
      columnHelper.accessor('role', { header: 'Role', size: 140, enableSorting: true }),
      columnHelper.accessor('status', { header: 'Status', size: 120 }),
      columnHelper.accessor('joined', { header: 'Joined', size: 140, enableSorting: true }),
    ]

    return (
      <div style={{ maxWidth: 700 }}>
        <DataTable
          data={userData}
          columns={cols}
          searchable
          searchPlaceholder="Search users…"
          selectable
          resizable
          rowActions={[
            {
              label: 'Edit',
              onClick: (row) => console.log('Edit', row.name),
            },
            {
              separator: true,
              label: 'Delete',
              variant: 'destructive',
              onClick: (row) => console.log('Delete', row.name),
            },
          ]}
          renderSubRow={(row) => (
            <div className="text-sm text-muted-foreground">
              {row.email} · Joined {row.joined}
            </div>
          )}
          pagination
          pageSize={10}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Sticky ID column, resizable columns, row selection, search with no-match state, row actions, and expandable sub-rows — all together.',
      },
    },
  },
}
