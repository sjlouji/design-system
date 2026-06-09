import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodeEditor } from './CodeEditor'

const meta = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CodeEditor>

export default meta
type Story = StoryObj<typeof meta>

const jsCode = `function greet(name) {
  return \`Hello, \${name}!\`
}

console.log(greet('World'))`

const tsCode = `interface User {
  id: string
  name: string
  email: string
}

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  return res.json()
}`

const pythonCode = `def fibonacci(n: int) -> list[int]:
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]

print(fibonacci(10))`

const jsonCode = `{
  "name": "design-system",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build"
  }
}`

export const JavaScript: Story = {
  args: {
    value: jsCode,
    language: 'javascript',
    height: '200px',
  },
}

export const TypeScript: Story = {
  args: {
    value: tsCode,
    language: 'typescript',
    height: '220px',
  },
}

export const Python: Story = {
  args: {
    value: pythonCode,
    language: 'python',
    height: '200px',
  },
}

export const JSON: Story = {
  args: {
    value: jsonCode,
    language: 'json',
    height: '180px',
  },
}

export const DarkTheme: Story = {
  args: {
    value: jsCode,
    language: 'javascript',
    theme: 'dark',
    height: '200px',
  },
}

export const WithFilename: Story = {
  args: {
    value: tsCode,
    language: 'typescript',
    filename: 'src/api/users.ts',
    height: '220px',
  },
}

export const ReadOnly: Story = {
  args: {
    value: jsCode,
    language: 'javascript',
    readOnly: true,
    height: '200px',
  },
}

export const NoLineNumbers: Story = {
  args: {
    value: jsCode,
    language: 'javascript',
    lineNumbers: false,
    height: '200px',
  },
}

export const WithPlaceholder: Story = {
  args: {
    language: 'javascript',
    placeholder: 'Type your code here…',
    height: '200px',
  },
}
