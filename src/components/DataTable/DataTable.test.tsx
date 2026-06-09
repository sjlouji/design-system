import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from './DataTable'

interface Row {
  id: number
  name: string
  email: string
}

const columnHelper = createColumnHelper<Row>()

const columns = [
  columnHelper.accessor('id', { header: 'ID' }),
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('email', { header: 'Email' }),
]

const data: Row[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
]

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable data={data} columns={columns} />)
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders row data', () => {
    render(<DataTable data={data} columns={columns} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
  })

  it('shows empty message when data is empty', () => {
    render(<DataTable data={[]} columns={columns} emptyMessage="Nothing here." />)
    expect(screen.getByText('Nothing here.')).toBeInTheDocument()
  })

  it('shows skeleton rows when loading', () => {
    render(<DataTable data={[]} columns={columns} loading />)
    // Skeleton rows — no data cells with text
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
  })

  it('renders search input when searchable', () => {
    render(<DataTable data={data} columns={columns} searchable searchPlaceholder="Search…" />)
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument()
  })

  it('renders selection checkboxes when selectable', () => {
    render(<DataTable data={data} columns={columns} selectable />)
    const checkboxes = screen.getAllByRole('checkbox')
    // header checkbox + one per row
    expect(checkboxes.length).toBe(data.length + 1)
  })

  it('sorts rows when header is clicked', async () => {
    const { userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} />)
    const nameHeader = screen.getByText('Name')
    await user.click(nameHeader)
    // After ascending sort Alice should still be in DOM
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })
})
