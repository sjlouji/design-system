import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { json } from '@codemirror/lang-json'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { Badge } from '@/components/Badge'
import { CopyButton } from '@/components/CopyButton'
import { cn } from '@/lib/utils'

export type CodeLanguage =
  | 'javascript'
  | 'typescript'
  | 'css'
  | 'html'
  | 'json'
  | 'python'
  | 'plain'

export interface CodeEditorProps {
  value?: string
  onChange?: (value: string) => void
  language?: CodeLanguage
  theme?: 'light' | 'dark'
  readOnly?: boolean
  lineNumbers?: boolean
  placeholder?: string
  height?: string
  minHeight?: string
  maxHeight?: string
  filename?: string
  className?: string
}

function getLanguageExtension(language: CodeLanguage) {
  switch (language) {
    case 'javascript':
      return [javascript()]
    case 'typescript':
      return [javascript({ typescript: true })]
    case 'css':
      return [css()]
    case 'html':
      return [html()]
    case 'json':
      return [json()]
    case 'python':
      return [python()]
    case 'plain':
    default:
      return []
  }
}

function CodeEditor({
  value,
  onChange,
  language = 'javascript',
  theme = 'light',
  readOnly = false,
  lineNumbers = true,
  placeholder,
  height = '300px',
  minHeight,
  maxHeight,
  filename,
  className,
}: CodeEditorProps) {
  if (typeof window === 'undefined') return null

  const extensions = getLanguageExtension(language)
  const editorTheme = theme === 'dark' ? oneDark : undefined

  return (
    <div className={cn('rounded-lg border border-border overflow-hidden', className)}>
      {filename && (
        <div className="bg-muted border-b border-border px-4 py-2 flex items-center justify-between gap-2">
          <span className="text-sm font-mono text-muted-foreground truncate">{filename}</span>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="secondary" className="text-xs">
              {language}
            </Badge>
            <CopyButton value={value ?? ''} size="sm" />
          </div>
        </div>
      )}
      <ReactCodeMirror
        value={value}
        onChange={onChange}
        extensions={extensions}
        theme={editorTheme}
        readOnly={readOnly}
        placeholder={placeholder}
        height={height}
        minHeight={minHeight}
        maxHeight={maxHeight}
        basicSetup={{
          lineNumbers,
        }}
      />
    </div>
  )
}

export { CodeEditor }
