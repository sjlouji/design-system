/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import {
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table'
import { ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Checkbox } from '@/components/Checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Skeleton } from '@/components/Skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table'

export interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  searchable?: boolean
  searchPlaceholder?: string
  selectable?: boolean
  pagination?: boolean
  pageSize?: number
  loading?: boolean
  emptyMessage?: string
  className?: string
}

export function DataTable<TData>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = 'Search…',
  selectable = false,
  pagination = true,
  pageSize = 10,
  loading = false,
  emptyMessage = 'No results.',
  className,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

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
  }

  const resolvedColumns: ColumnDef<TData, any>[] = selectable
    ? [selectionColumn, ...columns]
    : columns

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: resolvedColumns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize },
    },
    enableRowSelection: selectable,
  })

  const colCount = resolvedColumns.length

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {searchable && (
        <Input
          placeholder={searchPlaceholder}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      )}

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sortDir = header.column.getIsSorted()
                  return (
                    <TableHead key={header.id}>
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
                <TableCell colSpan={colCount} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
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
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
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
