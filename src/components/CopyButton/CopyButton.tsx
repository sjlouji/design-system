import * as React from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'

export interface CopyButtonProps {
  value: string
  size?: 'sm' | 'md'
  className?: string
}

function CopyButton({ value, size = 'md', className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const buttonSize = size === 'sm' ? 'icon-sm' : 'icon'

  return (
    <Button
      variant="ghost"
      size={buttonSize}
      className={cn(className)}
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
    >
      {copied ? (
        <Check className="text-green-500" />
      ) : (
        <Copy />
      )}
    </Button>
  )
}

export { CopyButton }
