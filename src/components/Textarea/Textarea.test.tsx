import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders the textarea', () => {
    render(<Textarea />)
    const textarea = document.querySelector('[data-slot="textarea"]')
    expect(textarea).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter text here" />)
    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument()
  })

  it('accepts a value', () => {
    render(<Textarea defaultValue="Hello world" />)
    const textarea = screen.getByDisplayValue('Hello world')
    expect(textarea).toBeInTheDocument()
  })

  it('renders disabled state', () => {
    render(<Textarea disabled />)
    const textarea = document.querySelector('[data-slot="textarea"]') as HTMLTextAreaElement
    expect(textarea).toBeDisabled()
  })
})
