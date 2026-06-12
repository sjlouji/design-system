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
    searchable: {
      control: 'boolean',
      description: 'Show global search input',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder for the search input',
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row checkbox selection',
    },
    pagination: {
      control: 'boolean',
      description: 'Show pagination controls',
    },
    pageSize: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Initial number of rows per page',
    },
    loading: {
      control: 'boolean',
      description: 'Show skeleton loading state',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when data is empty',
    },
  },
}

export default meta
type Story = StoryObj<DataTableProps<User>>

// ---- Stories ----

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
