import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@/lib/test-utils'
import { SearchInput } from './SearchInput'

describe('SearchInput', () => {
  it('renders the search icon', () => {
    const { container } = render(<SearchInput />)
    // lucide-react renders an SVG; verify it exists inside the wrapper
    const svg = container.querySelector('[data-slot="search-input"] svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders the input element', () => {
    render(<SearchInput placeholder="Find something…" />)
    expect(screen.getByPlaceholderText('Find something…')).toBeInTheDocument()
  })

  it('calls onChange when typing', () => {
    const handleChange = vi.fn()
    render(<SearchInput onChange={handleChange} />)
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'hello' } })
    expect(handleChange).toHaveBeenCalledWith('hello')
  })

  it('shows clear button when value is non-empty', () => {
    render(<SearchInput value="hello" onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument()
  })

  it('does not show clear button when value is empty', () => {
    render(<SearchInput value="" onChange={() => {}} />)
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument()
  })

  it('calls onClear and onChange("") when clear button is clicked', () => {
    const handleChange = vi.fn()
    const handleClear = vi.fn()
    render(<SearchInput value="hello" onChange={handleChange} onClear={handleClear} />)
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(handleClear).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith('')
  })

  it('shows spinner instead of clear button when loading=true', () => {
    render(<SearchInput value="hello" onChange={() => {}} loading />)
    // The clear button should be hidden when loading
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument()
    // The spinner SVG should be present
    const spinners = document.querySelectorAll('[aria-label="Loading"]')
    expect(spinners.length).toBeGreaterThan(0)
  })

  it('debounces onChange calls', () => {
    vi.useFakeTimers()
    const handleChange = vi.fn()
    render(<SearchInput debounce={300} onChange={handleChange} />)
    const input = screen.getByRole('searchbox')

    fireEvent.change(input, { target: { value: 'a' } })
    fireEvent.change(input, { target: { value: 'ab' } })
    fireEvent.change(input, { target: { value: 'abc' } })

    // Not called yet within debounce window
    expect(handleChange).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith('abc')

    vi.useRealTimers()
  })
})
