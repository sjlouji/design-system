import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/CodeBlock'

export interface MarkdownMessageProps {
  content: string
  className?: string
}

function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  return (
    <div className={cn('prose max-w-none', className)}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="font-bold text-2xl mb-3">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-bold text-xl mb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-bold text-lg mb-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="leading-relaxed mb-3 last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="ml-4 mb-3 space-y-1 list-disc">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="ml-4 mb-3 space-y-1 list-decimal">{children}</ol>
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
              <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">
                {children}
              </code>
            )
          },
          pre: ({ children }) => <>{children}</>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-border pl-3 text-muted-foreground italic mb-3">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-primary underline underline-offset-2 hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border px-3 py-1.5 text-sm font-semibold text-left bg-muted">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-3 py-1.5 text-sm">
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
