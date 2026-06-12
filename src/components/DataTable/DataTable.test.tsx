import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from './DataTable'

// ── Shared fixtures ───────────────────────────────────────────────────────────

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

// ── Basic rendering ───────────────────────────────────────────────────────────

describe('DataTable — basic rendering', () => {
  it('renders all column headers', () => {
    render(<DataTable data={data} columns={columns} />)
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders row data for every record', () => {
    render(<DataTable data={data} columns={columns} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
    expect(screen.getByText('alice@example.com')).toBeInTheDocument()
  })

  it('shows the default empty message when data is empty', () => {
    render(<DataTable data={[]} columns={columns} />)
    expect(screen.getByText('No results.')).toBeInTheDocument()
  })

  it('shows a custom emptyMessage prop', () => {
    render(<DataTable data={[]} columns={columns} emptyMessage="Nothing here." />)
    expect(screen.getByText('Nothing here.')).toBeInTheDocument()
  })

  it('renders skeleton rows when loading and hides data', () => {
    render(<DataTable data={data} columns={columns} loading />)
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
    // 5 skeleton rows × 3 columns = 15 skeleton cells (each containing a Skeleton)
    const skeletons = document.querySelectorAll('[class*="animate-pulse"], [class*="skeleton"]')
    // At minimum there should be skeleton elements
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('hides pagination controls while loading', () => {
    render(<DataTable data={data} columns={columns} loading />)
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument()
  })
})

// ── Search ────────────────────────────────────────────────────────────────────

describe('DataTable — search', () => {
  it('renders search input when searchable=true', () => {
    render(<DataTable data={data} columns={columns} searchable />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('does not render search input when searchable is omitted', () => {
    render(<DataTable data={data} columns={columns} />)
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('respects searchPlaceholder prop', () => {
    render(
      <DataTable data={data} columns={columns} searchable searchPlaceholder="Find something…" />,
    )
    expect(screen.getByPlaceholderText('Find something…')).toBeInTheDocument()
  })

  it('filters rows as the user types', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} searchable />)
    await user.type(screen.getByRole('textbox'), 'Alice')
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.queryByText('Bob')).not.toBeInTheDocument()
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument()
  })

  it('defaultSearchValue pre-populates the input and pre-filters rows', () => {
    render(<DataTable data={data} columns={columns} searchable defaultSearchValue="Bob" />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('Bob')
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
  })
})

// ── Filter no-match state ─────────────────────────────────────────────────────

describe('DataTable — filter no-match state', () => {
  it('shows "No results for …" message when filter matches nothing', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} searchable />)
    await user.type(screen.getByRole('textbox'), 'zzznomatch')
    expect(screen.getByText(/No results for/i)).toBeInTheDocument()
    expect(screen.getByText(/zzznomatch/)).toBeInTheDocument()
  })

  it('shows a "Clear filter" button when filter matches nothing', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} searchable />)
    await user.type(screen.getByRole('textbox'), 'zzznomatch')
    expect(screen.getByRole('button', { name: /clear filter/i })).toBeInTheDocument()
  })

  it('clicking "Clear filter" resets the filter and restores all rows', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} searchable />)
    await user.type(screen.getByRole('textbox'), 'zzznomatch')
    await user.click(screen.getByRole('button', { name: /clear filter/i }))
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /clear filter/i })).not.toBeInTheDocument()
  })
})

// ── Pagination ────────────────────────────────────────────────────────────────

describe('DataTable — pagination', () => {
  const manyRows: Row[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }))

  it('renders Previous and Next buttons by default', () => {
    render(<DataTable data={manyRows} columns={columns} />)
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('shows page count text', () => {
    render(<DataTable data={manyRows} columns={columns} pageSize={10} />)
    expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument()
  })

  it('disables Previous on the first page', () => {
    render(<DataTable data={manyRows} columns={columns} />)
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
  })

  it('disables Next on the last page after navigating there', async () => {
    const user = userEvent.setup()
    render(<DataTable data={manyRows} columns={columns} pageSize={10} />)
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /previous/i })).not.toBeDisabled()
  })

  it('hides pagination controls when pagination={false}', () => {
    render(<DataTable data={manyRows} columns={columns} pagination={false} />)
    expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument()
  })
})

// ── Sorting ───────────────────────────────────────────────────────────────────

describe('DataTable — sorting', () => {
  function getNameCells() {
    // tbody rows (exclude header); grab the second cell (Name column, index 1)
    const rows = document.querySelectorAll('tbody tr')
    return Array.from(rows).map((row) => row.querySelectorAll('td')[1]?.textContent ?? '')
  }

  it('sorts ascending on first header click, descending on second, then unsorted on third', async () => {
    const user = userEvent.setup()
    const unsortedData: Row[] = [
      { id: 2, name: 'Bob', email: 'b@example.com' },
      { id: 3, name: 'Charlie', email: 'c@example.com' },
      { id: 1, name: 'Alice', email: 'a@example.com' },
    ]
    render(<DataTable data={unsortedData} columns={columns} pagination={false} />)

    const nameHeader = screen.getByText('Name')

    // First click → ascending
    await user.click(nameHeader)
    expect(getNameCells()).toEqual(['Alice', 'Bob', 'Charlie'])

    // Second click → descending
    await user.click(nameHeader)
    expect(getNameCells()).toEqual(['Charlie', 'Bob', 'Alice'])

    // Third click → cleared (original order)
    await user.click(nameHeader)
    expect(getNameCells()).toEqual(['Bob', 'Charlie', 'Alice'])
  })
})

// ── selectable prop (backward compat) ─────────────────────────────────────────

describe('DataTable — selectable prop (backward compat)', () => {
  it('renders header checkbox and one checkbox per row', () => {
    render(<DataTable data={data} columns={columns} selectable />)
    const checkboxes = screen.getAllByRole('checkbox')
    // 1 header + 3 rows
    expect(checkboxes).toHaveLength(data.length + 1)
  })

  it('header checkbox has aria-label "Select all"', () => {
    render(<DataTable data={data} columns={columns} selectable />)
    expect(screen.getByRole('checkbox', { name: /select all/i })).toBeInTheDocument()
  })
})

// ── selectionMode="single" ────────────────────────────────────────────────────

describe('DataTable — selectionMode="single"', () => {
  it('does not render any checkboxes', () => {
    render(<DataTable data={data} columns={columns} selectionMode="single" />)
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('clicking a row sets data-state="selected" on that row', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} selectionMode="single" />)
    const rows = document.querySelectorAll('tbody tr')
    await user.click(rows[0] as HTMLElement)
    expect(rows[0]).toHaveAttribute('data-state', 'selected')
  })

  it('clicking a second row deselects the first', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} selectionMode="single" />)
    const rows = document.querySelectorAll('tbody tr')
    await user.click(rows[0] as HTMLElement)
    await user.click(rows[1] as HTMLElement)
    expect(rows[0]).not.toHaveAttribute('data-state', 'selected')
    expect(rows[1]).toHaveAttribute('data-state', 'selected')
  })

  it('clicking the already-selected row deselects it', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} selectionMode="single" />)
    const rows = document.querySelectorAll('tbody tr')
    await user.click(rows[0] as HTMLElement)
    await user.click(rows[0] as HTMLElement)
    expect(rows[0]).not.toHaveAttribute('data-state', 'selected')
  })
})

// ── selectionMode="multi" ─────────────────────────────────────────────────────

describe('DataTable — selectionMode="multi"', () => {
  it('renders checkbox column (header + per-row)', () => {
    render(<DataTable data={data} columns={columns} selectionMode="multi" />)
    expect(screen.getAllByRole('checkbox')).toHaveLength(data.length + 1)
  })

  it('multiple rows can be selected simultaneously', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} selectionMode="multi" />)
    // Re-query after each click to avoid stale DOM references across re-renders
    await user.click(screen.getAllByRole('checkbox', { name: /select row/i })[0])
    await user.click(screen.getAllByRole('checkbox', { name: /select row/i })[1])
    const rows = document.querySelectorAll('tbody tr')
    expect(rows[0]).toHaveAttribute('data-state', 'selected')
    expect(rows[1]).toHaveAttribute('data-state', 'selected')
    expect(rows[2]).not.toHaveAttribute('data-state', 'selected')
  })

  it('header checkbox selects all rows', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} selectionMode="multi" />)
    await user.click(screen.getByRole('checkbox', { name: /select all/i }))
    const rows = document.querySelectorAll('tbody tr')
    rows.forEach((row) => expect(row).toHaveAttribute('data-state', 'selected'))
  })

  it('selectionMode="multi" is equivalent to selectable={true}', () => {
    const { unmount } = render(<DataTable data={data} columns={columns} selectionMode="multi" />)
    const multiCount = screen.getAllByRole('checkbox').length
    unmount()
    render(<DataTable data={data} columns={columns} selectable />)
    const selectableCount = screen.getAllByRole('checkbox').length
    expect(multiCount).toBe(selectableCount)
  })
})

// ── onRowSelectionChange ──────────────────────────────────────────────────────

describe('DataTable — onRowSelectionChange', () => {
  it('fires with the selected data array when a row is checked (multi)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DataTable
        data={data}
        columns={columns}
        selectionMode="multi"
        onRowSelectionChange={onChange}
      />,
    )
    const rowCheckboxes = screen.getAllByRole('checkbox', { name: /select row/i })
    await user.click(rowCheckboxes[0])
    expect(onChange).toHaveBeenLastCalledWith([data[0]])
  })

  it('fires with multiple items when multiple rows are checked (multi)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DataTable
        data={data}
        columns={columns}
        selectionMode="multi"
        onRowSelectionChange={onChange}
      />,
    )
    // Re-query after each click — React re-renders replace DOM nodes
    await user.click(screen.getAllByRole('checkbox', { name: /select row/i })[0])
    await user.click(screen.getAllByRole('checkbox', { name: /select row/i })[1])
    expect(onChange).toHaveBeenLastCalledWith([data[0], data[1]])
  })

  it('fires with [] when the selected row is deselected (multi)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DataTable
        data={data}
        columns={columns}
        selectionMode="multi"
        onRowSelectionChange={onChange}
      />,
    )
    // Re-query after each click — React re-renders replace DOM nodes
    await user.click(screen.getAllByRole('checkbox', { name: /select row/i })[0])
    await user.click(screen.getAllByRole('checkbox', { name: /select row/i })[0])
    expect(onChange).toHaveBeenLastCalledWith([])
  })

  it('fires with the selected row in single mode and [] on deselect', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DataTable
        data={data}
        columns={columns}
        selectionMode="single"
        onRowSelectionChange={onChange}
      />,
    )
    const rows = document.querySelectorAll('tbody tr')
    await user.click(rows[0] as HTMLElement)
    expect(onChange).toHaveBeenLastCalledWith([data[0]])
    await user.click(rows[0] as HTMLElement)
    expect(onChange).toHaveBeenLastCalledWith([])
  })
})

// ── rowActions ────────────────────────────────────────────────────────────────

describe('DataTable — rowActions', () => {
  const actions = [
    { label: 'Edit', onClick: vi.fn() },
    { label: 'Delete', onClick: vi.fn(), variant: 'destructive' as const },
    { label: 'Archive', onClick: vi.fn(), disabled: true },
    { label: 'Duplicate', onClick: vi.fn(), separator: true },
  ]

  it('renders one Actions trigger button per row', () => {
    render(<DataTable data={data} columns={columns} rowActions={actions} />)
    expect(screen.getAllByRole('button', { name: /actions/i })).toHaveLength(data.length)
  })

  it('clicking Actions opens a dropdown with all configured items', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} rowActions={actions} />)
    const triggers = screen.getAllByRole('button', { name: /actions/i })
    await user.click(triggers[0])
    expect(screen.getByRole('menuitem', { name: /edit/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /delete/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /archive/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /duplicate/i })).toBeInTheDocument()
  })

  it('clicking a menu item calls onClick with the row original data', async () => {
    const onEdit = vi.fn()
    const user = userEvent.setup()
    render(
      <DataTable
        data={data}
        columns={columns}
        rowActions={[{ label: 'Edit', onClick: onEdit }]}
      />,
    )
    const triggers = screen.getAllByRole('button', { name: /actions/i })
    await user.click(triggers[0])
    await user.click(screen.getByRole('menuitem', { name: /edit/i }))
    expect(onEdit).toHaveBeenCalledWith(data[0])
  })

  it('destructive action has destructive class', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} rowActions={actions} />)
    await user.click(screen.getAllByRole('button', { name: /actions/i })[0])
    const deleteItem = screen.getByRole('menuitem', { name: /delete/i })
    expect(deleteItem.className).toMatch(/destructive/)
  })

  it('disabled action is rendered disabled', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} rowActions={actions} />)
    await user.click(screen.getAllByRole('button', { name: /actions/i })[0])
    const archiveItem = screen.getByRole('menuitem', { name: /archive/i })
    expect(archiveItem).toHaveAttribute('data-disabled')
  })

  it('separator:true renders a separator element above the action', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} rowActions={actions} />)
    await user.click(screen.getAllByRole('button', { name: /actions/i })[0])
    expect(document.querySelector('[role="separator"]')).toBeInTheDocument()
  })

  it('accepts a function for rowActions returning per-row actions', async () => {
    const onAction = vi.fn()
    const user = userEvent.setup()
    render(
      <DataTable
        data={data}
        columns={columns}
        rowActions={(row) => [{ label: `Edit ${row.name}`, onClick: onAction }]}
      />,
    )
    const triggers = screen.getAllByRole('button', { name: /actions/i })
    await user.click(triggers[1]) // Bob's row
    await user.click(screen.getByRole('menuitem', { name: /edit bob/i }))
    expect(onAction).toHaveBeenCalledWith(data[1])
  })
})

// ── renderSubRow ──────────────────────────────────────────────────────────────

describe('DataTable — renderSubRow', () => {
  it('renders an expand toggle button for every row', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        renderSubRow={(row) => <span>Details: {row.name}</span>}
      />,
    )
    expect(screen.getAllByRole('button', { name: /expand row/i })).toHaveLength(data.length)
  })

  it('clicking the expand button reveals sub-row content', async () => {
    const user = userEvent.setup()
    render(
      <DataTable
        data={data}
        columns={columns}
        renderSubRow={(row) => <span>Details: {row.name}</span>}
      />,
    )
    const expandButtons = screen.getAllByRole('button', { name: /expand row/i })
    await user.click(expandButtons[0])
    expect(screen.getByText('Details: Alice')).toBeInTheDocument()
  })

  it('clicking the expand button again collapses the sub-row', async () => {
    const user = userEvent.setup()
    render(
      <DataTable
        data={data}
        columns={columns}
        renderSubRow={(row) => <span>Details: {row.name}</span>}
      />,
    )
    const expandButtons = screen.getAllByRole('button', { name: /expand row/i })
    await user.click(expandButtons[0])
    // Now collapse
    await user.click(screen.getByRole('button', { name: /collapse row/i }))
    expect(screen.queryByText('Details: Alice')).not.toBeInTheDocument()
  })

  it('sub-row content is not visible before expansion', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        renderSubRow={(row) => <span>Details: {row.name}</span>}
      />,
    )
    expect(screen.queryByText('Details: Alice')).not.toBeInTheDocument()
  })
})

// ── getRowCanExpand ───────────────────────────────────────────────────────────

describe('DataTable — getRowCanExpand', () => {
  it('only renders expand button for rows where getRowCanExpand returns true', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        renderSubRow={(row) => <span>Details: {row.name}</span>}
        getRowCanExpand={(row) => row.id === 1}
      />,
    )
    // Only Alice (id=1) should have an expand button
    expect(screen.getAllByRole('button', { name: /expand row/i })).toHaveLength(1)
  })

  it('does not render expand button for rows where getRowCanExpand returns false', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        renderSubRow={(row) => <span>Details: {row.name}</span>}
        getRowCanExpand={() => false}
      />,
    )
    expect(screen.queryByRole('button', { name: /expand row/i })).not.toBeInTheDocument()
  })
})

// ── resizable ─────────────────────────────────────────────────────────────────

describe('DataTable — resizable', () => {
  it('renders resize handle elements when resizable={true}', () => {
    render(<DataTable data={data} columns={columns} resizable />)
    // Resize handles are divs with cursor-col-resize class
    const handles = document.querySelectorAll('[class*="cursor-col-resize"]')
    expect(handles.length).toBeGreaterThan(0)
  })

  it('does not render resize handle elements when resizable is omitted', () => {
    render(<DataTable data={data} columns={columns} />)
    const handles = document.querySelectorAll('[class*="cursor-col-resize"]')
    expect(handles.length).toBe(0)
  })
})
