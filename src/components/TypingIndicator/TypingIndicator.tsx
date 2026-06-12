import { cn } from '@/lib/utils'

export interface TypingIndicatorProps {
  className?: string
}

function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <span
      className={cn('inline-flex items-end gap-[5px] px-1 py-1', className)}
      aria-label="Thinking"
      role="status"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block size-[7px] rounded-full bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))] dark:bg-[linear-gradient(135deg,oklch(0.633_0.165_259),oklch(0.635_0.110_225))]"
          style={{
            animation: 'typing-wave 1.4s ease-in-out infinite',
            animationDelay: `${i * 160}ms`,
          }}
        />
      ))}
    </span>
  )
}

export { TypingIndicator }
