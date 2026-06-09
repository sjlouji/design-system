import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@/lib/test-utils'
import { CopyButton } from './CopyButton'

const mockWriteText = vi.fn().mockResolvedValue(undefined)

beforeEach(() => {
  vi.clearAllMocks()
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: mockWriteText },
    configurable: true,
  })
})

afterEach(() => {
  vi.useRealTimers()
})

describe('CopyButton', () => {
  it('renders the copy button', () => {
    render(<CopyButton value="hello" />)
    expect(screen.getByRole('button', { name: 'Copy to clipboard' })).toBeInTheDocument()
  })

  it('calls clipboard.writeText with the provided value', async () => {
    render(<CopyButton value="copy me" />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockWriteText).toHaveBeenCalledWith('copy me')
  })

  it('shows copied state after click', async () => {
    render(<CopyButton value="test" />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
    })
  })

  it('reverts back to copy state after 2s', async () => {
    vi.useFakeTimers()
    render(<CopyButton value="test" />)
    fireEvent.click(screen.getByRole('button'))

    // Resolve the clipboard promise
    await act(async () => { await Promise.resolve() })

    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()

    // Advance 2 seconds
    await act(async () => { vi.advanceTimersByTime(2000) })

    expect(screen.getByRole('button', { name: 'Copy to clipboard' })).toBeInTheDocument()
  })

  it('forwards className', () => {
    render(<CopyButton value="x" className="my-class" />)
    expect(screen.getByRole('button')).toHaveClass('my-class')
  })
})
