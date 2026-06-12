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

describe('TableHead sticky prop', () => {
  it('sticky="left" applies sticky, left-0, z-10, and bg-background classes', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sticky="left">Pinned Left</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody />
      </Table>
    )
    const th = screen.getByText('Pinned Left').closest('th')!
    expect(th).toHaveClass('sticky')
    expect(th).toHaveClass('left-0')
    expect(th).toHaveClass('z-10')
    expect(th).toHaveClass('bg-background')
  })

  it('sticky="right" applies sticky and right-0 classes', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sticky="right">Pinned Right</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody />
      </Table>
    )
    const th = screen.getByText('Pinned Right').closest('th')!
    expect(th).toHaveClass('sticky')
    expect(th).toHaveClass('right-0')
  })

  it('sticky="right" does NOT apply left-0', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sticky="right">Pinned Right</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody />
      </Table>
    )
    const th = screen.getByText('Pinned Right').closest('th')!
    expect(th).not.toHaveClass('left-0')
  })

  it('no sticky prop: does NOT have the sticky class', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Not Pinned</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody />
      </Table>
    )
    const th = screen.getByText('Not Pinned').closest('th')!
    expect(th).not.toHaveClass('sticky')
    expect(th).not.toHaveClass('left-0')
    expect(th).not.toHaveClass('right-0')
  })
})

describe('TableCell sticky prop', () => {
  it('sticky="left" applies sticky, left-0, z-10, and bg-background classes', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Col</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell sticky="left">Pinned Cell Left</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const td = screen.getByText('Pinned Cell Left').closest('td')!
    expect(td).toHaveClass('sticky')
    expect(td).toHaveClass('left-0')
    expect(td).toHaveClass('z-10')
    expect(td).toHaveClass('bg-background')
  })

  it('sticky="right" applies sticky and right-0 classes', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Col</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell sticky="right">Pinned Cell Right</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const td = screen.getByText('Pinned Cell Right').closest('td')!
    expect(td).toHaveClass('sticky')
    expect(td).toHaveClass('right-0')
  })

  it('sticky="right" does NOT apply left-0', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Col</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell sticky="right">Pinned Cell Right</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const td = screen.getByText('Pinned Cell Right').closest('td')!
    expect(td).not.toHaveClass('left-0')
  })

  it('no sticky prop: does NOT have the sticky class', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Col</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Not Pinned Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const td = screen.getByText('Not Pinned Cell').closest('td')!
    expect(td).not.toHaveClass('sticky')
    expect(td).not.toHaveClass('left-0')
    expect(td).not.toHaveClass('right-0')
  })
})
