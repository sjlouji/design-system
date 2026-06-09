import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render } from '@/lib/test-utils'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './InputOTP'

// input-otp schedules a window-access timeout after mount; fake timers
// prevent it from firing after jsdom tears down the environment.
describe('InputOTP', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())
  it('renders the correct number of slots', () => {
    render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    )
    const slots = document.querySelectorAll('[data-slot="input-otp-slot"]')
    expect(slots).toHaveLength(6)
  })

  it('renders the group container', () => {
    render(
      <InputOTP maxLength={3}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>
    )
    const group = document.querySelector('[data-slot="input-otp-group"]')
    expect(group).toBeInTheDocument()
  })
})
