/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import {
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type PaginationState,
  type ExpandedState,
  type ColumnSizingState,
  type Column,
  type RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table'
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Checkbox } from '@/components/Checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Skeleton } from '@/components/Skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table'

// ── Column meta augmentation ──────────────────────────────────────────────────

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    sticky?: 'left' | 'right'
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RowAction<TData> {
  label: string
  icon?: React.ReactNode
  onClick: (row: TData) => void
  disabled?: boolean | ((row: TData) => boolean)
  variant?: 'default' | 'destructive'
  /** When true, renders a separator above this action. */
  separator?: boolean
}

export interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  searchable?: boolean
  searchPlaceholder?: string
  defaultSearchValue?: string
  selectable?: boolean
  pagination?: boolean
  pageSize?: number
  loading?: boolean
  emptyMessage?: string
  className?: string
  totalRows?: number
  onPaginationChange?: (page: number, pageSize: number) => void
  onSearchChange?: (query: string) => void
  resizable?: boolean
  rowActions?: RowAction<TData>[] | ((row: TData) => RowAction<TData>[])
  renderSubRow?: (row: TData) => React.ReactNode
  getRowCanExpand?: (row: TData) => boolean
  /**
   * 'single' — click a row to select it; only one row active at a time.
   * 'multi'  — checkbox column; multiple rows selectable simultaneously.
   * Overrides the deprecated `selectable` prop when set.
   */
  selectionMode?: 'single' | 'multi'
  /** Fired whenever the selected rows change. Receives the selected data objects. */
  onRowSelectionChange?: (rows: TData[]) => void
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getStickyStyle(
  visibleCols: Column<any, unknown>[],
  column: Column<any, unknown>,
): React.CSSProperties | undefined {
  const sticky = column.columnDef.meta?.sticky
  if (!sticky) return undefined
  const idx = visibleCols.findIndex((c) => c.id === column.id)
  if (sticky === 'left') {
    const left = visibleCols
      .slice(0, idx)
      .filter((c) => c.columnDef.meta?.sticky === 'left')
      .reduce((sum, c) => sum + c.getSize(), 0)
    return { position: 'sticky', left, zIndex: 2 }
  }
  const right = visibleCols
    .slice(idx + 1)
    .filter((c) => c.columnDef.meta?.sticky === 'right')
    .reduce((sum, c) => sum + c.getSize(), 0)
  return { position: 'sticky', right, zIndex: 2 }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function DataTable<TData>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = 'Search…',
  defaultSearchValue = '',
  selectable = false,
  pagination = true,
  pageSize = 10,
  loading = false,
  emptyMessage = 'No results.',
  className,
  totalRows,
  onPaginationChange,
  onSearchChange,
  resizable = false,
  rowActions,
  renderSubRow,
  getRowCanExpand,
  selectionMode,
  onRowSelectionChange,
}: DataTableProps<TData>) {
  const isServerPagination = !!onPaginationChange
  const isServerSearch = !!onSearchChange
  const isExpandable = !!renderSubRow

  // Resolve effective selection mode — selectionMode takes precedence over selectable
  const isSingleSelect = selectionMode === 'single'
  const isMultiSelect = selectionMode === 'multi' || (selectable && !selectionMode)
  const isSelectable = isSingleSelect || isMultiSelect

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState(defaultSearchValue)
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({})
  const [serverPagination, setServerPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })
  const searchTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current !== null) clearTimeout(searchTimeoutRef.current)
    }
  }, [])

  // Fire onRowSelectionChange whenever selection state changes
  React.useEffect(() => {
    if (!onRowSelectionChange) return
    const selected = Object.entries(rowSelection)
      .filter(([, v]) => v)
      .map(([k]) => data[Number(k)])
      .filter((r): r is TData => r !== undefined)
    onRowSelectionChange(selected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection, data])

  function handleSearchInput(value: string) {
    setGlobalFilter(value)
    if (isServerSearch) {
      if (searchTimeoutRef.current !== null) clearTimeout(searchTimeoutRef.current)
      searchTimeoutRef.current = setTimeout(() => {
        onSearchChange!(value)
        if (isServerPagination) {
          setServerPagination((prev) => ({ ...prev, pageIndex: 0 }))
        }
      }, 300)
    }
  }

  // ── System columns ─────────────────────────────────────────────────────────

  const expandColumn: ColumnDef<TData, any> = {
    id: '__expand__',
    header: () => null,
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
          className={cn(
            'flex items-center justify-center text-muted-foreground hover:text-foreground transition-transform duration-150',
            row.getIsExpanded() && 'rotate-90',
          )}
        >
          <ChevronRightIcon className="size-4" />
        </button>
      ) : null,
    enableSorting: false,
    enableGlobalFilter: false,
    size: 40,
  }

  const selectionColumn: ColumnDef<TData, any> = {
    id: '__select__',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? 'indeterminate'
            : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableGlobalFilter: false,
    size: 44,
  }

  const actionsColumn: ColumnDef<TData, any> = {
    id: '__actions__',
    header: () => null,
    cell: ({ row }) => {
      const actions =
        typeof rowActions === 'function' ? rowActions(row.original) : (rowActions ?? [])
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontalIcon className="size-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map((action, i) => {
              const isDisabled =
                typeof action.disabled === 'function'
                  ? action.disabled(row.original)
                  : (action.disabled ?? false)
              return (
                <React.Fragment key={i}>
                  {action.separator && <DropdownMenuSeparator />}
                  <DropdownMenuItem
                    onClick={() => action.onClick(row.original)}
                    disabled={isDisabled}
                    className={cn(
                      action.variant === 'destructive' &&
                        'text-destructive focus:text-destructive',
                    )}
                  >
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                  </DropdownMenuItem>
                </React.Fragment>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableSorting: false,
    enableGlobalFilter: false,
    size: 52,
  }

  const resolvedColumns: ColumnDef<TData, any>[] = [
    ...(isExpandable ? [expandColumn] : []),
    ...(isMultiSelect ? [selectionColumn] : []),
    ...columns,
    ...(rowActions ? [actionsColumn] : []),
  ]

  // ── Table instance ──────────────────────────────────────────────────────────

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: resolvedColumns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      expanded,
      columnSizing,
      ...(isServerPagination ? { pagination: serverPagination } : {}),
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    onColumnSizingChange: setColumnSizing,
    ...(isServerPagination && {
      manualPagination: true,
      pageCount: totalRows != null ? Math.ceil(totalRows / serverPagination.pageSize) : -1,
      onPaginationChange: (updater) => {
        const prev = serverPagination
        const next = typeof updater === 'function' ? updater(prev) : updater
        setServerPagination(next)
        onPaginationChange!(next.pageIndex, next.pageSize)
      },
    }),
    ...(isServerSearch && { manualFiltering: true }),
    ...(resizable && { columnResizeMode: 'onChange' as const, enableColumnResizing: true }),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: isExpandable
      ? (row) => (getRowCanExpand ? getRowCanExpand(row.original) : true)
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
    enableRowSelection: isSelectable,
    enableMultiRowSelection: isMultiSelect,
  })

  const colCount = resolvedColumns.length
  const visibleCols = table.getVisibleLeafColumns()
  const hasActiveFilter = !!globalFilter

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {searchable && (
        <Input
          placeholder={searchPlaceholder}
          value={globalFilter}
          onChange={(e) => handleSearchInput(e.target.value)}
          className="max-w-sm"
        />
      )}

      <div className="rounded-lg border border-border overflow-hidden">
        <Table className={resizable ? 'table-fixed' : undefined}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sortDir = header.column.getIsSorted()
                  const stickyStyle = getStickyStyle(visibleCols, header.column)
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        ...stickyStyle,
                        ...(resizable ? { width: header.getSize() } : {}),
                      }}
                      className={cn(
                        stickyStyle && 'bg-background',
                        resizable && 'relative group/th',
                      )}
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          className="flex items-center gap-1 select-none hover:text-foreground transition-colors"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sortDir === 'asc' ? (
                            <ChevronUpIcon className="size-3.5" />
                          ) : sortDir === 'desc' ? (
                            <ChevronDownIcon className="size-3.5" />
                          ) : (
                            <ChevronsUpDownIcon className="size-3.5 opacity-40" />
                          )}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                      {resizable && header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            'absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none',
                            header.column.getIsResizing()
                              ? 'bg-primary'
                              : 'opacity-0 group-hover/th:opacity-100 bg-border',
                          )}
                        />
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {Array.from({ length: colCount }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={colCount} className="h-24 text-center">
                  {hasActiveFilter ? (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-muted-foreground">
                        No results for &ldquo;{globalFilter}&rdquo;
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSearchInput('')}
                      >
                        Clear filter
                      </Button>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">{emptyMessage}</span>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    onClick={isSingleSelect ? row.getToggleSelectedHandler() : undefined}
                    className={cn(isSingleSelect && 'cursor-pointer select-none')}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const stickyStyle = getStickyStyle(visibleCols, cell.column)
                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            ...stickyStyle,
                            ...(resizable ? { width: cell.column.getSize() } : {}),
                          }}
                          className={cn(stickyStyle && 'bg-background')}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  {row.getIsExpanded() && renderSubRow && (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={colCount} className="bg-muted/30 px-4 py-3">
                        {renderSubRow(row.original)}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && !loading && (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Rows per page</span>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(val) => table.setPageSize(Number(val))}
            >
              <SelectTrigger className="h-8 w-[70px]" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount() === -1 ? '…' : table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export const createColumns = createColumnHelper
