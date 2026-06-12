import * as React from 'react'
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  AlertTriangle,
  Circle,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type StepStatus =
  | 'success'
  | 'error'
  | 'warning'
  | 'stopped'
  | 'loading'
  | 'in-progress'
  | 'not-started'

export interface StepItem {
  status: StepStatus
  header: React.ReactNode
  statusIconAriaLabel?: string
}

export interface StepsProps {
  steps: StepItem[]
  className?: string
}

const iconClass: Record<StepStatus, string> = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-amber-600',
  stopped: 'text-muted-foreground',
  loading: 'text-muted-foreground',
  'in-progress': 'text-blue-600',
  'not-started': 'text-muted-foreground',
}

const textClass: Record<StepStatus, string> = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-amber-600',
  stopped: 'text-muted-foreground',
  loading: 'text-muted-foreground',
  'in-progress': 'text-foreground',
  'not-started': 'text-muted-foreground',
}

function StepIcon({ status, ariaLabel }: { status: StepStatus; ariaLabel?: string }) {
  const cls = cn('size-5 shrink-0', iconClass[status])
  const props = { className: cls, 'aria-label': ariaLabel, 'aria-hidden': !ariaLabel }

  switch (status) {
    case 'success':
      return <CheckCircle2 {...props} />
    case 'error':
      return <XCircle {...props} />
    case 'warning':
      return <AlertTriangle {...props} />
    case 'stopped':
      return <MinusCircle {...props} />
    case 'loading':
      return <Loader2 {...props} className={cn(cls, 'animate-spin')} />
    case 'in-progress':
      return <RefreshCw {...props} className={cn(cls, 'animate-spin')} />
    case 'not-started':
      return <Circle {...props} />
  }
}

function Steps({ steps, className }: StepsProps) {
  return (
    <div role="list" className={cn('flex flex-col', className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        return (
          <div key={index} role="listitem" className="flex gap-2.5">
            <div className="flex flex-col items-center">
              <StepIcon status={step.status} ariaLabel={step.statusIconAriaLabel} />
              {!isLast && (
                <div className="w-px flex-1 my-0.5 min-h-[0.75rem] bg-border" />
              )}
            </div>
            <div className={cn('text-sm pb-3 last:pb-0', isLast && 'pb-0')}>
              <span className={textClass[step.status]}>{step.header}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { Steps }
