/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StepperStep {
  id: string
  title: string
  description?: string
  optional?: boolean
}

export interface StepperProps {
  steps: StepperStep[]
  currentStep: number
  onStepClick?: (index: number) => void
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

function Stepper({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  className,
}: StepperProps) {
  const isVertical = orientation === 'vertical'

  return (
    <div
      className={cn(
        isVertical ? 'flex flex-col gap-0' : 'flex items-start',
        className
      )}
      role="list"
      aria-label="Steps"
    >
      {steps.map((step, index) => {
        const isComplete = index < currentStep
        const isCurrent = index === currentStep
        const isUpcoming = index > currentStep
        const isLast = index === steps.length - 1
        const isClickable = isComplete && typeof onStepClick === 'function'

        const circleContent = isComplete ? (
          <CheckIcon className="size-4" aria-hidden />
        ) : (
          <span className="text-sm font-medium">{index + 1}</span>
        )

        const stepCircle = (
          <button
            type="button"
            disabled={!isClickable}
            onClick={isClickable ? () => onStepClick!(index) : undefined}
            aria-label={`Step ${index + 1}: ${step.title}`}
            aria-current={isCurrent ? 'step' : undefined}
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-full transition-colors',
              isComplete && 'bg-primary text-primary-foreground',
              isCurrent && 'border-2 border-primary text-primary bg-background',
              isUpcoming && 'bg-muted text-muted-foreground',
              isClickable && 'cursor-pointer hover:opacity-80',
              !isClickable && 'cursor-default'
            )}
          >
            {circleContent}
          </button>
        )

        const stepLabel = (
          <div className={cn('flex flex-col', isVertical ? 'min-h-[2rem]' : '')}>
            <span
              className={cn(
                'text-sm font-medium',
                isCurrent && 'text-foreground',
                isComplete && 'text-foreground',
                isUpcoming && 'text-muted-foreground'
              )}
            >
              {step.title}
              {step.optional && (
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  (optional)
                </span>
              )}
            </span>
            {step.description && (
              <span className="text-xs text-muted-foreground">{step.description}</span>
            )}
          </div>
        )

        if (isVertical) {
          return (
            <div key={step.id} role="listitem" className="flex gap-3">
              <div className="flex flex-col items-center">
                {stepCircle}
                {!isLast && (
                  <div
                    className={cn(
                      'w-px flex-1 my-1 min-h-[1.5rem]',
                      isComplete ? 'bg-primary' : 'bg-border'
                    )}
                  />
                )}
              </div>
              <div className={cn('pb-6', isLast && 'pb-0')}>{stepLabel}</div>
            </div>
          )
        }

        return (
          <div key={step.id} role="listitem" className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              {stepCircle}
              <div className="text-center">{stepLabel}</div>
            </div>
            {!isLast && (
              <div
                className={cn(
                  'h-px flex-1 mx-2 -mt-8',
                  isComplete ? 'bg-primary' : 'bg-border'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export interface UseStepperReturn {
  currentStep: number
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  isFirst: boolean
  isLast: boolean
  isComplete: boolean
}

export function useStepper(totalSteps: number): UseStepperReturn {
  const [currentStep, setCurrentStep] = React.useState(0)

  const next = React.useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }, [totalSteps])

  const prev = React.useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const goTo = React.useCallback(
    (index: number) => {
      setCurrentStep(Math.max(0, Math.min(index, totalSteps)))
    },
    [totalSteps]
  )

  return {
    currentStep,
    next,
    prev,
    goTo,
    isFirst: currentStep === 0,
    isLast: currentStep === totalSteps - 1,
    isComplete: currentStep >= totalSteps,
  }
}

export { Stepper }
