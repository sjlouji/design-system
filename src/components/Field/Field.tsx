import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/Label'

export interface FieldProps {
  label?: string
  htmlFor?: string
  helperText?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

function Field({
  label,
  htmlFor,
  helperText,
  error,
  required,
  children,
  className,
}: FieldProps) {
  const descriptionId = htmlFor ? `${htmlFor}-description` : undefined
  const hasError = Boolean(error)

  // Inject aria-invalid and aria-describedby into the direct child input if possible
  const child = React.Children.only(children) as React.ReactElement<{
    'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling'
    'aria-describedby'?: string
    id?: string
  }>

  const clonedChild = React.isValidElement(child)
    ? React.cloneElement(child, {
        ...(hasError ? { 'aria-invalid': true as const } : {}),
        ...(descriptionId ? { 'aria-describedby': descriptionId } : {}),
      })
    : child

  return (
    <div data-slot="field" className={cn('flex flex-col gap-1.5', className)}>
      {label != null && (
        <Label htmlFor={htmlFor}>
          {label}
          {required && (
            <span className="text-destructive ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </Label>
      )}
      {clonedChild}
      {hasError ? (
        <p
          id={descriptionId}
          data-slot="field-error"
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : helperText != null ? (
        <p
          id={descriptionId}
          data-slot="field-helper"
          className="text-sm text-muted-foreground"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  )
}

export { Field }
