import { cn } from '@/lib/utils'

export interface StreamingTextProps {
  text: string
  streaming?: boolean
  className?: string
}

function StreamingText({ text, streaming = false, className }: StreamingTextProps) {
  return (
    <span className={cn('whitespace-pre-wrap', className)}>
      {text}
      {streaming && (
        <span
          className={cn(
            'inline-block w-[2px] h-[1.1em] rounded-full align-[-0.1em] ml-[2px]',
            'bg-[linear-gradient(180deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))]',
            'dark:bg-[linear-gradient(180deg,oklch(0.633_0.165_259),oklch(0.635_0.110_225))]',
          )}
          style={{ animation: 'blink-cursor 1s step-end infinite' }}
          aria-hidden="true"
        />
      )}
    </span>
  )
}

export { StreamingText }
