import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { renderHook, act } from '@testing-library/react'
import { Stepper, useStepper } from './Stepper'

const steps = [
  { id: 'step-1', title: 'Step One', description: 'First step description' },
  { id: 'step-2', title: 'Step Two' },
  { id: 'step-3', title: 'Step Three', optional: true },
]

describe('Stepper', () => {
  it('renders all step titles', () => {
    render(<Stepper steps={steps} currentStep={0} />)
    expect(screen.getByText('Step One')).toBeInTheDocument()
    expect(screen.getByText('Step Two')).toBeInTheDocument()
    expect(screen.getByText('Step Three')).toBeInTheDocument()
  })

  it('marks current step with aria-current="step"', () => {
    render(<Stepper steps={steps} currentStep={1} />)
    const currentBtn = screen.getByRole('button', { name: /Step 2: Step Two/ })
    expect(currentBtn).toHaveAttribute('aria-current', 'step')
  })

  it('renders description when provided', () => {
    render(<Stepper steps={steps} currentStep={0} />)
    expect(screen.getByText('First step description')).toBeInTheDocument()
  })

  it('renders optional label for optional steps', () => {
    render(<Stepper steps={steps} currentStep={0} />)
    expect(screen.getByText('(optional)')).toBeInTheDocument()
  })

  it('calls onStepClick when a completed step is clicked', async () => {
    const { userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    const onStepClick = vi.fn()
    render(<Stepper steps={steps} currentStep={2} onStepClick={onStepClick} />)
    const firstStepBtn = screen.getByRole('button', { name: /Step 1: Step One/ })
    await user.click(firstStepBtn)
    expect(onStepClick).toHaveBeenCalledWith(0)
  })

  it('renders vertical orientation', () => {
    render(<Stepper steps={steps} currentStep={0} orientation="vertical" />)
    expect(screen.getByText('Step One')).toBeInTheDocument()
  })
})

describe('useStepper', () => {
  it('starts at step 0', () => {
    const { result } = renderHook(() => useStepper(3))
    expect(result.current.currentStep).toBe(0)
    expect(result.current.isFirst).toBe(true)
    expect(result.current.isLast).toBe(false)
    expect(result.current.isComplete).toBe(false)
  })

  it('next increments the step', () => {
    const { result } = renderHook(() => useStepper(3))
    act(() => result.current.next())
    expect(result.current.currentStep).toBe(1)
  })

  it('prev decrements the step', () => {
    const { result } = renderHook(() => useStepper(3))
    act(() => result.current.next())
    act(() => result.current.prev())
    expect(result.current.currentStep).toBe(0)
  })

  it('does not go below 0', () => {
    const { result } = renderHook(() => useStepper(3))
    act(() => result.current.prev())
    expect(result.current.currentStep).toBe(0)
  })

  it('isLast when on last step', () => {
    const { result } = renderHook(() => useStepper(3))
    act(() => result.current.goTo(2))
    expect(result.current.isLast).toBe(true)
  })

  it('isComplete when past last step', () => {
    const { result } = renderHook(() => useStepper(3))
    act(() => result.current.goTo(3))
    expect(result.current.isComplete).toBe(true)
  })
})
