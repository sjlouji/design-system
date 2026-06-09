import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/Badge'
import { CopyButton } from '@/components/CopyButton'

export interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  className?: string
}

function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const lines = code.split('\n')
  const hasHeader = filename || language

  return (
    <div className={cn('rounded-lg border border-border overflow-hidden', className)}>
      {hasHeader ? (
        <div className="bg-muted px-4 py-2 flex items-center justify-between gap-2">
          <span className="text-sm font-mono text-muted-foreground truncate">
            {filename}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {language && (
              <Badge variant="secondary" className="text-xs">
                {language}
              </Badge>
            )}
            <CopyButton value={code} size="sm" />
          </div>
        </div>
      ) : null}

      <div className="relative bg-zinc-950 dark:bg-zinc-900 text-zinc-100 p-4 overflow-x-auto">
        {!hasHeader && (
          <div className="absolute top-2 right-2">
            <CopyButton value={code} size="sm" />
          </div>
        )}
        <pre className="font-mono text-sm">
          <code>
            {showLineNumbers ? (
              lines.map((line, i) => (
                <span key={i} className="block">
                  <span className="text-zinc-500 mr-4 select-none inline-block w-[2ch] text-right">
                    {i + 1}
                  </span>
                  {line}
                </span>
              ))
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  )
}

export { CodeBlock }
