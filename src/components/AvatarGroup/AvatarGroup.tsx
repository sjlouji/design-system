import { Avatar, AvatarImage, AvatarFallback } from '@/components/Avatar'
import { cn } from '@/lib/utils'

export interface AvatarItem {
  src?: string
  fallback: string
  alt?: string
}

export interface AvatarGroupProps {
  avatars: AvatarItem[]
  max?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClassMap = {
  sm: 'size-6 text-xs',
  md: 'size-8 text-sm',
  lg: 'size-10 text-sm',
} as const

const radixSizeMap = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
} as const

function AvatarGroup({ avatars, max = 4, size = 'md', className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - visible.length

  return (
    <div
      className={cn('flex -ml-0 items-center', className)}
      role="group"
      aria-label={`${avatars.length} avatar${avatars.length !== 1 ? 's' : ''}`}
    >
      {visible.map((avatar, index) => (
        <Avatar
          key={index}
          size={radixSizeMap[size]}
          className={cn('-ml-2 first:ml-0 ring-2 ring-background')}
        >
          {avatar.src && (
            <AvatarImage src={avatar.src} alt={avatar.alt ?? avatar.fallback} />
          )}
          <AvatarFallback>{avatar.fallback}</AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            'relative -ml-2 flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ring-2 ring-background',
            sizeClassMap[size]
          )}
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}

export { AvatarGroup }
