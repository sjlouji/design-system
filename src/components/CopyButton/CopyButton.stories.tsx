import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyButton } from './CopyButton'

const meta = {
  title: 'Primitives/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: 'npm install @design-system/react' },
}

export const WithLabel: Story = {
  args: { value: 'npm install @design-system/react' },
  render: () => (
    <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm">
      <span className="flex-1 text-foreground">npm install @design-system/react</span>
      <CopyButton value="npm install @design-system/react" size="sm" />
    </div>
  ),
}

export const SmallSize: Story = {
  args: { value: 'some-value', size: 'sm' },
}
