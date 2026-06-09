import * as React from 'react'
import { cn } from '@/lib/utils'

type BrandingSize = 'sm' | 'md' | 'lg'

interface BrandingProps {
  logo?: React.ReactNode
  name: string
  tagline?: string
  size?: BrandingSize
  href?: string
  className?: string
}

const sizeConfig: Record<BrandingSize, { logoSize: number; textClass: string; taglineClass: string }> = {
  sm: { logoSize: 20, textClass: 'text-sm', taglineClass: 'text-xs' },
  md: { logoSize: 28, textClass: 'text-base font-semibold', taglineClass: 'text-xs' },
  lg: { logoSize: 36, textClass: 'text-xl font-bold', taglineClass: 'text-sm' },
}

function DefaultLogo({ name, size }: { name: string; size: number }) {
  return (
    <span
      className="flex items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold shrink-0"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.5) }}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

function Branding({ logo, name, tagline, size = 'md', href, className }: BrandingProps) {
  const { logoSize, textClass, taglineClass } = sizeConfig[size]

  const content = (
    <span className={cn('inline-flex items-center gap-2', className)}>
      {logo ?? <DefaultLogo name={name} size={logoSize} />}
      <span className="flex flex-col leading-tight">
        <span className={cn('text-foreground', textClass)}>{name}</span>
        {tagline && (
          <span className={cn('text-muted-foreground', taglineClass)}>{tagline}</span>
        )}
      </span>
    </span>
  )

  if (href) {
    return (
      <a href={href} className="inline-flex">
        {content}
      </a>
    )
  }

  return content
}

export { Branding }
export type { BrandingProps }
