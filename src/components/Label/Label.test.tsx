import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Label } from './Label'

describe('Label', () => {
  it('renders the label text', () => {
    render(<Label>Email address</Label>)
    expect(screen.getByText('Email address')).toBeInTheDocument()
  })

  it('renders with htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Username</Label>)
    const label = screen.getByText('Username')
    expect(label).toHaveAttribute('for', 'test-input')
  })
})
