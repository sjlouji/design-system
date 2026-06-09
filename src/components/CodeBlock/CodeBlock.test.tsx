import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { CodeBlock } from './CodeBlock'

const sampleCode = `const x = 1\nconst y = 2`

describe('CodeBlock', () => {
  it('renders the code content', () => {
    render(<CodeBlock code={sampleCode} />)
    // The code is rendered inside a <code> element; check a substring
    expect(screen.getByRole('code', { hidden: true }) ?? document.querySelector('code')).toBeTruthy()
    const codeEl = document.querySelector('code')
    expect(codeEl?.textContent).toContain('const x = 1')
  })

  it('renders the filename when provided', () => {
    render(<CodeBlock code={sampleCode} filename="index.ts" />)
    expect(screen.getByText('index.ts')).toBeInTheDocument()
  })

  it('renders the language badge when provided', () => {
    render(<CodeBlock code={sampleCode} language="typescript" />)
    expect(screen.getByText('typescript')).toBeInTheDocument()
  })

  it('does not render a header when neither filename nor language is given', () => {
    render(<CodeBlock code={sampleCode} />)
    expect(screen.queryByText('typescript')).not.toBeInTheDocument()
  })

  it('renders line numbers when showLineNumbers is true', () => {
    render(<CodeBlock code={sampleCode} showLineNumbers />)
    // Two lines → line numbers 1 and 2 should appear
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('does not render line numbers by default', () => {
    render(<CodeBlock code="single line" />)
    // The "1" from line numbers should NOT appear
    expect(screen.queryByText('1')).not.toBeInTheDocument()
  })
})
