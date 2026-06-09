import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { userEvent } from '@testing-library/user-event'
import { FileAttachment } from './FileAttachment'

describe('FileAttachment', () => {
  it('renders filename', () => {
    render(<FileAttachment filename="report.pdf" />)
    expect(screen.getByText('report.pdf')).toBeInTheDocument()
  })

  it('renders size when provided', () => {
    render(<FileAttachment filename="file.txt" size="2.4 MB" />)
    expect(screen.getByText('2.4 MB')).toBeInTheDocument()
  })

  it('shows remove button when onRemove provided', () => {
    render(<FileAttachment filename="file.txt" onRemove={() => {}} />)
    expect(screen.getByRole('button', { name: 'Remove file' })).toBeInTheDocument()
  })

  it('calls onRemove when remove button clicked', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<FileAttachment filename="file.txt" onRemove={onRemove} />)
    await user.click(screen.getByRole('button', { name: 'Remove file' }))
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it('shows download link when url provided', () => {
    render(<FileAttachment filename="file.pdf" url="/files/file.pdf" />)
    expect(screen.getByRole('link')).toBeInTheDocument()
  })
})
