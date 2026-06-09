import { cn } from '@/lib/utils'

const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
} as const

export interface SpinnerProps {
  size?: keyof typeof sizeMap
  className?: string
}

function Spinner({ size = 'md', className }: SpinnerProps) {
  const px = sizeMap[size]
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Loading"
      role="status"
      className={cn('animate-spin', className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

export { Spinner }
