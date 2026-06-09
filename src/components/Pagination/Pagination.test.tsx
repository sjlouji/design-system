import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from './Pagination'

describe('Pagination', () => {
  it('renders page links', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('marks the active page', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    const activeLink = screen.getByText('2').closest('a')
    expect(activeLink).toHaveAttribute('aria-current', 'page')
  })

  it('renders previous and next navigation', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument()
  })
})
