import { describe, it, expect } from 'vitest'
import { render } from '@/lib/test-utils'
import { Calendar } from './Calendar'

describe('Calendar', () => {
  it('renders the calendar grid', () => {
    render(<Calendar mode="single" />)
    expect(document.querySelector('[data-slot="calendar"]')).toBeInTheDocument()
  })

  it('renders day buttons', () => {
    render(<Calendar mode="single" />)
    const dayButtons = document.querySelectorAll('[data-day]')
    expect(dayButtons.length).toBeGreaterThan(0)
  })

  it('renders weekday headers', () => {
    render(<Calendar mode="single" />)
    // DayPicker renders weekday abbreviations (Su, Mo, Tu, etc.)
    const weekdays = document.querySelectorAll('.rdp-weekday')
    expect(weekdays.length).toBeGreaterThan(0)
  })
})
