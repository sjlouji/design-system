import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/CodeBlock'

export interface MarkdownMessageProps {
  content: string
  className?: string
}

function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  return (
    <div className={cn('space-y-3 text-sm leading-relaxed', className)}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold tracking-tight mt-4 mb-2 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold tracking-tight mt-3 mb-1.5 first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold mt-3 mb-1 first:mt-0">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="leading-[1.7] last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="ml-4 space-y-1.5 list-disc marker:text-muted-foreground/60">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="ml-4 space-y-1.5 list-decimal marker:text-muted-foreground/60">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-0.5">{children}</li>
          ),
          code: ({ children, className: codeClassName }) => {
            const match = /language-(\w+)/.exec(codeClassName ?? '')
            if (match) {
              return (
                <CodeBlock
                  code={String(children).replace(/\n$/, '')}
                  language={match[1]}
                />
              )
            }
            return (
              <code className="font-mono text-[0.8em] bg-muted/60 dark:bg-muted/40 px-1.5 py-0.5 rounded-md border border-border/40">
                {children}
              </code>
            )
          },
          pre: ({ children }) => <>{children}</>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-[3px] border-primary/40 pl-3.5 text-muted-foreground italic">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          hr: () => <hr className="border-border/60 my-4" />,
          table: ({ children }) => (
            <div className="overflow-x-auto rounded-lg border border-border/60 my-3">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/40">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-border/60 px-3 py-2 text-xs font-semibold text-muted-foreground text-left uppercase tracking-wide">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border/40 px-3 py-2 last:border-0 [tr:last-child>&]:border-0">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export { MarkdownMessage }
