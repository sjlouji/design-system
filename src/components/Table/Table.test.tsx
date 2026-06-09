import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from './Table'

describe('Table', () => {
  it('renders table headers', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody />
      </Table>
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
  })

  it('renders table rows', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Charlie</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
  })
})
