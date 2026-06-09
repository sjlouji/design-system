import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { MarkdownMessage } from './MarkdownMessage'

describe('MarkdownMessage', () => {
  it('renders paragraphs', () => {
    render(<MarkdownMessage content="Hello world paragraph." />)
    expect(screen.getByText('Hello world paragraph.')).toBeInTheDocument()
  })

  it('renders inline code', () => {
    render(<MarkdownMessage content="Use `const x = 1` here." />)
    expect(screen.getByText('const x = 1')).toBeInTheDocument()
  })

  it('renders headings', () => {
    render(<MarkdownMessage content="# My Heading" />)
    expect(screen.getByText('My Heading')).toBeInTheDocument()
  })

  it('renders links', () => {
    render(<MarkdownMessage content="[Click here](https://example.com)" />)
    expect(screen.getByRole('link', { name: 'Click here' })).toBeInTheDocument()
  })
})
