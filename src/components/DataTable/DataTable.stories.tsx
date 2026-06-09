import type { Meta, StoryObj } from '@storybook/react-vite'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from './DataTable'

const meta: Meta<typeof DataTable> = {
  title: 'DataDisplay/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof DataTable>

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

const columnHelper = createColumnHelper<User>()

const userColumns = [
  columnHelper.accessor('id', { header: 'ID' }),
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('email', { header: 'Email' }),
  columnHelper.accessor('role', { header: 'Role' }),
  columnHelper.accessor('status', { header: 'Status' }),
]

const roles = ['Admin', 'Editor', 'Viewer', 'Manager']
const statuses = ['Active', 'Inactive', 'Pending']

const userData: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: roles[i % roles.length],
  status: statuses[i % statuses.length],
}))

export const Default: Story = {
  args: {
    data: userData,
    columns: userColumns,
  },
}

export const WithSearch: Story = {
  args: {
    data: userData,
    columns: userColumns,
    searchable: true,
    searchPlaceholder: 'Search users…',
  },
}

export const WithSelection: Story = {
  args: {
    data: userData,
    columns: userColumns,
    selectable: true,
  },
}

export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: 'No users found.',
  },
}
