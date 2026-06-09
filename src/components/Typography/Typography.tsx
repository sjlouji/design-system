import * as React from 'react'
import { cn } from '@/lib/utils'

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted'
  | 'blockquote'
  | 'code'
  | 'list'

const variantElementMap: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  lead: 'p',
  large: 'p',
  small: 'small',
  muted: 'p',
  blockquote: 'blockquote',
  code: 'code',
  list: 'ul',
}

const variantClassMap: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-3xl font-semibold tracking-tight',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  p: 'text-base leading-7',
  lead: 'text-lg text-muted-foreground',
  large: 'text-md font-semibold',
  small: 'text-sm font-medium leading-none',
  muted: 'text-sm text-muted-foreground',
  blockquote: 'border-l-2 border-border pl-4 italic text-muted-foreground',
  code: 'font-mono text-sm bg-muted px-1.5 py-0.5 rounded',
  list: 'list-disc ml-6 space-y-1',
}

export interface TypographyProps {
  variant?: TypographyVariant
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
}

function Typography({
  variant = 'p',
  as,
  className,
  children,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  const Comp: React.ElementType = as ?? variantElementMap[variant]
  return (
    <Comp className={cn(variantClassMap[variant], className)} {...props}>
      {children}
    </Comp>
  )
}

// Convenience exports
function H1(props: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) {
  return <Typography variant="h1" {...props} />
}

function H2(props: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) {
  return <Typography variant="h2" {...props} />
}

function H3(props: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) {
  return <Typography variant="h3" {...props} />
}

function H4(props: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) {
  return <Typography variant="h4" {...props} />
}

function P(props: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) {
  return <Typography variant="p" {...props} />
}

function Lead(props: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) {
  return <Typography variant="lead" {...props} />
}

function Muted(props: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) {
  return <Typography variant="muted" {...props} />
}

function Code(props: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) {
  return <Typography variant="code" {...props} />
}

export { Typography, H1, H2, H3, H4, P, Lead, Muted, Code }
