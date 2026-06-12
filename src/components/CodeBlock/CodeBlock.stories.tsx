import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodeBlock } from './CodeBlock'

const meta: Meta<typeof CodeBlock> = {
  title: 'DataDisplay/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    code: {
      control: 'text',
      description: 'The raw code string to display. Whitespace and newlines are preserved.',
    },
    language: {
      control: 'text',
      description:
        'Language label shown as a badge in the header (e.g. "typescript", "python", "bash"). Purely decorative — no syntax highlighting is applied. Requires either `language` or `filename` to be set for the header to appear.',
    },
    filename: {
      control: 'text',
      description:
        'Filename displayed on the left side of the header bar (e.g. "greet.ts"). When provided, the header is shown and a copy button appears in the top-right. Can be combined with `language` for the badge.',
    },
    showLineNumbers: {
      control: 'boolean',
      description:
        'When true, each line is wrapped in a `<span>` with a right-aligned muted line number in the gutter. Defaults to false.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root wrapper `div`.',
    },
  },
}

export default meta
type Story = StoryObj<typeof CodeBlock>

const tsCode = `function greet(name: string): string {
  return \`Hello, \${name}!\`
}

export default greet`

const jsCode = `function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}`

const pythonCode = `def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

if __name__ == "__main__":
    print([fibonacci(i) for i in range(10)])`

const bashCode = `#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Building application..."
npm ci --prefer-offline
npm run build

echo "Deploy complete."`

const jsonCode = `{
  "name": "@myorg/design-system",
  "version": "0.7.0",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
  "peerDependencies": {
    "react": ">=19",
    "react-dom": ">=19"
  }
}`

const longCode = `import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { Textarea } from '@/components/Textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'

interface ContactFormProps {
  onSubmit: (data: FormData) => void
  loading?: boolean
  className?: string
}

export function ContactForm({ onSubmit, loading = false, className }: ContactFormProps) {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [message, setMessage] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData()
    data.set('name', name)
    data.set('email', email)
    data.set('subject', subject)
    data.set('message', message)
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-4', className)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Select a subject…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General enquiry</SelectItem>
            <SelectItem value="bug">Bug report</SelectItem>
            <SelectItem value="feature">Feature request</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}`

const shortSnippet = `npm install @myorg/design-system`

export const Default: Story = {
  args: {
    code: tsCode,
    language: 'typescript',
    filename: 'greet.ts',
    showLineNumbers: false,
  },
}

export const JavaScript: Story = {
  args: {
    code: jsCode,
    language: 'javascript',
    filename: 'debounce.js',
  },
}

export const TypeScript: Story = {
  args: {
    code: tsCode,
    language: 'typescript',
    filename: 'greet.ts',
  },
}

export const Python: Story = {
  args: {
    code: pythonCode,
    language: 'python',
    filename: 'fibonacci.py',
  },
}

export const Bash: Story = {
  args: {
    code: bashCode,
    language: 'bash',
    filename: 'deploy.sh',
  },
}

export const JSON: Story = {
  args: {
    code: jsonCode,
    language: 'json',
    filename: 'package.json',
  },
}

export const WithFilenameOnly: Story = {
  args: {
    code: tsCode,
    filename: 'greet.ts',
  },
}

export const WithLanguageOnly: Story = {
  args: {
    code: tsCode,
    language: 'typescript',
  },
}

export const WithLineNumbers: Story = {
  args: {
    code: tsCode,
    language: 'typescript',
    filename: 'greet.ts',
    showLineNumbers: true,
  },
}

export const WithoutLineNumbers: Story = {
  args: {
    code: tsCode,
    language: 'typescript',
    filename: 'greet.ts',
    showLineNumbers: false,
  },
}

export const NoHeader: Story = {
  args: {
    code: tsCode,
  },
}

export const ShortSnippet: Story = {
  args: {
    code: shortSnippet,
    language: 'bash',
  },
}

export const LongCode: Story = {
  args: {
    code: longCode,
    language: 'typescript',
    filename: 'ContactForm.tsx',
    showLineNumbers: true,
  },
}

export const LongCodeGenerated: Story = {
  args: {
    code: Array.from({ length: 30 }, (_, i) => `const line${i + 1} = "value ${i + 1}"`).join('\n'),
    filename: 'constants.ts',
    language: 'typescript',
    showLineNumbers: true,
  },
}

export const InChatContext: Story = {
  render: () => (
    <div className="max-w-xl flex flex-col gap-3">
      <p className="text-sm text-foreground leading-relaxed">
        Here's a TypeScript utility function that debounces any async function:
      </p>
      <CodeBlock
        code={jsCode}
        language="javascript"
        filename="debounce.js"
        showLineNumbers={true}
      />
      <p className="text-sm text-muted-foreground">
        You can adjust the <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">delay</code> to control how long to wait before invoking the function.
      </p>
    </div>
  ),
}
