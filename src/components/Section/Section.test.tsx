import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { Section } from './Section'

describe('Section', () => {
  it('renders title', () => {
    render(<Section title="General" />)
    expect(screen.getByText('General')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<Section title="General" description="Basic account settings." />)
    expect(screen.getByText('Basic account settings.')).toBeInTheDocument()
  })

  it('shows divider when divider=true', () => {
    const { container } = render(<Section title="General" divider />)
    expect(container.querySelector('[data-slot="separator"]')).toBeInTheDocument()
  })

  it('does not show divider by default', () => {
    const { container } = render(<Section title="General" />)
    expect(container.querySelector('[data-slot="separator"]')).not.toBeInTheDocument()
  })

  it('renders children', () => {
    render(<Section title="General"><p>Child content</p></Section>)
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })
})
