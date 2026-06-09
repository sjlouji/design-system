import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './Breadcrumb'

function TestBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Item</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

describe('Breadcrumb', () => {
  it('renders breadcrumb items', () => {
    render(<TestBreadcrumb />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Item')).toBeInTheDocument()
  })

  it('renders separators', () => {
    render(<TestBreadcrumb />)
    const separators = document.querySelectorAll('[data-slot="breadcrumb-separator"]')
    expect(separators.length).toBeGreaterThan(0)
  })

  it('marks the last item as current page', () => {
    render(<TestBreadcrumb />)
    const page = screen.getByText('Item')
    expect(page).toHaveAttribute('aria-current', 'page')
  })
})
