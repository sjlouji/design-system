"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Grid background — internal to this component
function Grid({
  cellSize = 12,
  strokeWidth = 1,
  patternOffset = [0, 0] as [number, number],
  className,
}: {
  cellSize?: number
  strokeWidth?: number
  patternOffset?: [number, number]
  className?: string
}) {
  const id = React.useId()
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0", className)}
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`grid-${id}`}
          x={patternOffset[0] - 1}
          y={patternOffset[1] - 1}
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        </pattern>
      </defs>
      <rect fill={`url(#grid-${id})`} width="100%" height="100%" />
    </svg>
  )
}

const variantConfig = {
  info: {
    wrapper: 'border-blue-200 bg-blue-50/70',
    iconWrapper: 'border-blue-300/60 bg-white/60',
    action: 'border-blue-400/50 text-blue-800 hover:bg-blue-100/70',
    dismiss: 'text-blue-400 hover:text-blue-600',
    grid: 'text-blue-900/20',
  },
  success: {
    wrapper: 'border-green-600/20 bg-gradient-to-r from-lime-100/80 to-emerald-100/80',
    iconWrapper: 'border-green-600/50 bg-white/50',
    action: 'border-green-700/50 text-gray-800 hover:bg-green-500/10',
    dismiss: 'text-green-600 hover:text-green-800',
    grid: 'text-black/20',
  },
  warning: {
    wrapper: 'border-amber-300/70 bg-amber-50/80',
    iconWrapper: 'border-amber-400/50 bg-white/60',
    action: 'border-amber-500/50 text-amber-900 hover:bg-amber-100/70',
    dismiss: 'text-amber-500 hover:text-amber-700',
    grid: 'text-amber-900/20',
  },
  error: {
    wrapper: 'border-red-300/70 bg-red-50/80',
    iconWrapper: 'border-red-400/50 bg-white/60',
    action: 'border-red-500/50 text-red-900 hover:bg-red-100/70',
    dismiss: 'text-red-400 hover:text-red-600',
    grid: 'text-red-900/20',
  },
  neutral: {
    wrapper: 'border-border bg-muted/40',
    iconWrapper: 'border-border bg-background/50',
    action: 'border-border text-foreground hover:bg-muted',
    dismiss: 'text-muted-foreground hover:text-foreground',
    grid: 'text-foreground/10',
  },
} as const

export type AnnouncementBannerVariant = keyof typeof variantConfig

export interface AnnouncementBannerProps {
  /** Main message. Accepts JSX for mixed bold/coloured text, e.g. <><strong>Pro</strong> is here</>. */
  title: React.ReactNode
  /** Secondary inline text shown after the title. */
  description?: React.ReactNode
  /** Visual colour theme. Defaults to "info". */
  variant?: AnnouncementBannerVariant
  /** Optional leading icon, displayed inside a pill on wider screens. */
  icon?: React.ReactNode
  /** Optional call-to-action button shown to the right of the message. */
  action?: { label: string; onClick: () => void }
  /** Optional "Learn more" URL appended as a link after the message. */
  learnMoreUrl?: string
  /** Label for the learn-more link. Defaults to "Learn more". */
  learnMoreLabel?: string
  /** When provided, renders a dismiss (×) button and fires when clicked. */
  onDismiss?: () => void
  /** Show a subtle grid pattern over the background. Defaults to false. */
  showGrid?: boolean
  className?: string
}

function AnnouncementBanner({
  title,
  description,
  variant = 'info',
  icon,
  action,
  learnMoreUrl,
  learnMoreLabel = 'Learn more',
  onDismiss,
  showGrid = false,
  className,
}: AnnouncementBannerProps) {
  const styles = variantConfig[variant]

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'relative isolate flex flex-col justify-between gap-3 overflow-hidden rounded-lg border py-2.5 pl-4 text-sm',
        'sm:flex-row sm:items-center sm:gap-4 sm:py-2',
        onDismiss ? 'pr-10' : 'pr-4',
        styles.wrapper,
        className,
      )}
    >
      {showGrid && (
        <Grid
          cellSize={13}
          patternOffset={[0, -1]}
          className={cn(
            'mix-blend-overlay [mask-image:linear-gradient(to_right,black,transparent)]',
            styles.grid,
          )}
        />
      )}

      <div className="flex items-center gap-3">
        {icon && (
          <div
            className={cn(
              'hidden shrink-0 rounded-full border p-1 shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.8)] sm:block',
              styles.iconWrapper,
            )}
          >
            {icon}
          </div>
        )}
        <p className="text-sm text-foreground">
          {title}
          {description && <span className="ml-1">{description}</span>}
          {learnMoreUrl && (
            <>
              {' '}
              <a
                href={learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-opacity hover:opacity-70"
              >
                {learnMoreLabel}
              </a>
            </>
          )}
        </p>
      </div>

      {action && (
        <div className="flex items-center sm:-my-1">
          <button
            type="button"
            onClick={action.onClick}
            className={cn(
              'whitespace-nowrap rounded-md border px-3 py-1 text-sm transition-colors',
              styles.action,
            )}
          >
            {action.label}
          </button>
        </div>
      )}

      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={onDismiss}
          className={cn(
            'absolute inset-y-0 right-2.5 flex items-center p-1 transition-colors',
            styles.dismiss,
          )}
        >
          <X className="size-[18px]" />
        </button>
      )}
    </div>
  )
}

export { AnnouncementBanner }
