import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodeEditor } from './CodeEditor'

const meta = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    value: {
      control: 'text',
      description:
        'Controlled value of the editor. When provided, the component is controlled and `onChange` must be used to update it.',
    },
    onChange: {
      action: 'onChange',
      description:
        'Fired on every edit with the full current editor content as a string. Required when using the component in controlled mode.',
    },
    language: {
      control: 'select',
      options: ['javascript', 'typescript', 'css', 'html', 'json', 'python', 'plain'],
      description:
        '"javascript" — JS syntax highlighting. "typescript" — TS syntax highlighting. "css" — CSS. "html" — HTML. "json" — JSON. "python" — Python. "plain" — no language extension, plain text.',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description:
        '"light" — default CodeMirror light theme. "dark" — One Dark theme. Defaults to "light".',
    },
    readOnly: {
      control: 'boolean',
      description:
        'When true, the editor content cannot be edited. Cursor and selection still work. Defaults to false.',
    },
    lineNumbers: {
      control: 'boolean',
      description:
        'When true, line numbers are shown in the gutter on the left. Defaults to true.',
    },
    placeholder: {
      control: 'text',
      description:
        'Placeholder text shown when the editor is empty. Rendered by CodeMirror as a ghost overlay.',
    },
    height: {
      control: 'text',
      description:
        'Fixed height of the editor as a CSS string (e.g. "300px", "50vh"). Defaults to "300px".',
    },
    minHeight: {
      control: 'text',
      description:
        'Minimum height as a CSS string. Useful for auto-growing editors — combine with no `height` and set a `minHeight` instead.',
    },
    maxHeight: {
      control: 'text',
      description:
        'Maximum height as a CSS string. Editor scrolls vertically when content exceeds this height.',
    },
    filename: {
      control: 'text',
      description:
        'When provided, renders a header bar above the editor showing the filename, language badge, and a copy button.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root wrapper `div`.',
    },
  },
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

export const Default: Story = {
  args: {
    value: jsCode,
    language: 'javascript',
    theme: 'light',
    readOnly: false,
    lineNumbers: true,
    height: '200px',
  },
}

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
