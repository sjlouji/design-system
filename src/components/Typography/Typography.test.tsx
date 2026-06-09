import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Typography, H1, H2, H3, H4, P, Lead, Muted, Code } from './Typography'

describe('Typography', () => {
  it('renders h1 as an h1 element', () => {
    render(<Typography variant="h1">Title</Typography>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders h2 as an h2 element', () => {
    render(<Typography variant="h2">Title</Typography>)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders h3 as an h3 element', () => {
    render(<Typography variant="h3">Title</Typography>)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('renders h4 as an h4 element', () => {
    render(<Typography variant="h4">Title</Typography>)
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument()
  })

  it('renders p as a p element', () => {
    render(<Typography variant="p">Text</Typography>)
    const el = screen.getByText('Text')
    expect(el.tagName).toBe('P')
  })

  it('renders lead as a p element', () => {
    render(<Typography variant="lead">Lead text</Typography>)
    const el = screen.getByText('Lead text')
    expect(el.tagName).toBe('P')
  })

  it('renders blockquote as a blockquote element', () => {
    render(<Typography variant="blockquote">Quote</Typography>)
    const el = screen.getByText('Quote')
    expect(el.tagName).toBe('BLOCKQUOTE')
  })

  it('renders code as a code element', () => {
    render(<Typography variant="code">const x = 1</Typography>)
    const el = screen.getByText('const x = 1')
    expect(el.tagName).toBe('CODE')
  })

  it('renders list as a ul element', () => {
    render(
      <Typography variant="list">
        <li>Item</li>
      </Typography>
    )
    const el = screen.getByRole('list')
    expect(el.tagName).toBe('UL')
  })

  it('overrides element via as prop', () => {
    render(
      <Typography variant="h1" as="span">
        Span heading
      </Typography>
    )
    const el = screen.getByText('Span heading')
    expect(el.tagName).toBe('SPAN')
  })

  it('applies correct classes for h1 variant', () => {
    render(<Typography variant="h1">H1</Typography>)
    const el = screen.getByRole('heading', { level: 1 })
    expect(el).toHaveClass('text-4xl', 'font-bold', 'tracking-tight')
  })

  it('applies correct classes for muted variant', () => {
    render(<Typography variant="muted">Muted</Typography>)
    const el = screen.getByText('Muted')
    expect(el).toHaveClass('text-muted-foreground')
  })

  it('forwards className', () => {
    render(<Typography variant="p" className="custom-class">Text</Typography>)
    expect(screen.getByText('Text')).toHaveClass('custom-class')
  })
})

describe('Typography convenience exports', () => {
  it('H1 renders as h1', () => {
    render(<H1>Title</H1>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('H2 renders as h2', () => {
    render(<H2>Title</H2>)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('H3 renders as h3', () => {
    render(<H3>Title</H3>)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('H4 renders as h4', () => {
    render(<H4>Title</H4>)
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument()
  })

  it('P renders as p', () => {
    render(<P>Paragraph</P>)
    expect(screen.getByText('Paragraph').tagName).toBe('P')
  })

  it('Lead renders as p with muted class', () => {
    render(<Lead>Lead</Lead>)
    const el = screen.getByText('Lead')
    expect(el.tagName).toBe('P')
    expect(el).toHaveClass('text-muted-foreground')
  })

  it('Muted renders with muted class', () => {
    render(<Muted>Muted</Muted>)
    expect(screen.getByText('Muted')).toHaveClass('text-muted-foreground')
  })

  it('Code renders as code element', () => {
    render(<Code>code</Code>)
    expect(screen.getByText('code').tagName).toBe('CODE')
  })
})
