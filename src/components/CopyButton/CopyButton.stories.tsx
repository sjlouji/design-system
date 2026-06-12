import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyButton } from './CopyButton'

const meta = {
  title: 'Primitives/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    value: {
      control: 'text',
      description: 'The string value written to the clipboard on click',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Controls the icon button size (sm = icon-sm, md = icon)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the button',
    },
  },
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'npm install @design-system/react',
  },
}

export const SizeSmall: Story = {
  args: {
    value: 'npm install @design-system/react',
    size: 'sm',
  },
}

export const SizeMedium: Story = {
  args: {
    value: 'npm install @design-system/react',
    size: 'md',
  },
}

export const BothSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-1">
        <CopyButton value="copy me" size="sm" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <CopyButton value="copy me" size="md" />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
    </div>
  ),
}

export const WithCodeValue: Story = {
  args: {
    value: 'npx shadcn@latest init',
    size: 'sm',
  },
}

export const WithMultilineValue: Story = {
  args: {
    value: `const result = await fetch('https://api.example.com/v1/completions', {
  method: 'POST',
  headers: { Authorization: 'Bearer sk-...' },
})`,
    size: 'md',
  },
}

export const InlineWithCodeSnippet: Story = {
  render: () => (
    <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 w-80">
      <code className="text-sm font-mono text-foreground flex-1 truncate">
        npm install @design-system/react
      </code>
      <CopyButton value="npm install @design-system/react" size="sm" />
    </div>
  ),
}

export const InCodeBlock: Story = {
  render: () => (
    <div className="relative bg-zinc-950 rounded-lg p-4 w-96">
      <div className="absolute top-2 right-2">
        <CopyButton
          value={`function greet(name: string) {\n  return \`Hello, \${name}!\`\n}`}
          size="sm"
          className="text-zinc-400 hover:text-zinc-100"
        />
      </div>
      <pre className="font-mono text-sm text-zinc-100 pr-8">
        {`function greet(name: string) {\n  return \`Hello, \${name}!\`\n}`}
      </pre>
    </div>
  ),
}

export const AfterCopyState: Story = {
  render: () => (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-xs text-muted-foreground">
        Click to copy — the icon switches to a green checkmark for 2 seconds
      </p>
      <CopyButton value="Hello, world!" size="md" />
    </div>
  ),
}

export const MultipleInRow: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-72">
      {[
        { label: 'API key', value: 'sk-proj-abc123def456' },
        { label: 'Webhook URL', value: 'https://hooks.example.com/v1/abc' },
        { label: 'Model ID', value: 'claude-sonnet-4-6' },
      ].map(({ label, value }) => (
        <div key={label} className="flex items-center gap-2 bg-muted rounded-md px-3 py-2">
          <span className="text-xs text-muted-foreground w-20 shrink-0">{label}</span>
          <code className="text-xs font-mono flex-1 truncate text-foreground">{value}</code>
          <CopyButton value={value} size="sm" />
        </div>
      ))}
    </div>
  ),
}
