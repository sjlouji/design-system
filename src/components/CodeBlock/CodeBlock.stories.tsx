import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodeBlock } from './CodeBlock'

const meta: Meta<typeof CodeBlock> = {
  title: 'DataDisplay/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof CodeBlock>

const sampleCode = `function greet(name: string): string {
  return \`Hello, \${name}!\`
}

export default greet`

const longCode = Array.from(
  { length: 30 },
  (_, i) => `const line${i + 1} = "value ${i + 1}"`
).join('\n')

export const Default: Story = {
  args: {
    code: sampleCode,
  },
}

export const WithFilename: Story = {
  args: {
    code: sampleCode,
    filename: 'greet.ts',
  },
}

export const WithLanguage: Story = {
  args: {
    code: sampleCode,
    language: 'typescript',
    filename: 'greet.ts',
  },
}

export const WithLineNumbers: Story = {
  args: {
    code: sampleCode,
    filename: 'greet.ts',
    language: 'typescript',
    showLineNumbers: true,
  },
}

export const LongCode: Story = {
  args: {
    code: longCode,
    filename: 'constants.ts',
    language: 'typescript',
    showLineNumbers: true,
  },
}
