import * as React from 'react'
import { cn } from '@/lib/utils'

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string
  error?: boolean
}

// Inline ChevronDown as a data URI so we avoid an extra dependency
// and keep the SVG colour neutral (currentColor won't work in bg-image).
const chevronDownSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, placeholder, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          data-slot="native-select"
          aria-invalid={error || undefined}
          className={cn(
            'flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-1 pr-8 text-sm text-foreground shadow-xs',
            'focus:outline-none focus:ring-[3px] focus:ring-ring/50 focus:border-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus:ring-destructive/20 focus:border-destructive',
            className
          )}
          style={{
            backgroundImage: `url("${chevronDownSvg}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
          }}
          {...props}
        >
          {placeholder != null && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
      </div>
    )
  }
)

NativeSelect.displayName = 'NativeSelect'

export { NativeSelect }
