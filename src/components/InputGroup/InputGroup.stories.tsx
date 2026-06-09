import type { Meta, StoryObj } from '@storybook/react-vite'
import { Globe } from 'lucide-react'
import { Input } from '@/components/Input'
import { InputGroup } from './InputGroup'

const meta = {
  title: 'Forms/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: null },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const WithPrefix: Story = {
  render: () => (
    <div className="w-64">
      <InputGroup prefix="$">
        <Input placeholder="0.00" />
      </InputGroup>
    </div>
  ),
}

export const WithSuffix: Story = {
  render: () => (
    <div className="w-64">
      <InputGroup suffix=".com">
        <Input placeholder="yoursite" />
      </InputGroup>
    </div>
  ),
}

export const WithBothSides: Story = {
  render: () => (
    <div className="w-64">
      <InputGroup prefix="https://" suffix=".com">
        <Input placeholder="yoursite" />
      </InputGroup>
    </div>
  ),
}

export const WithIconPrefix: Story = {
  render: () => (
    <div className="w-64">
      <InputGroup prefix={<Globe className="size-4" />}>
        <Input placeholder="https://example.com" />
      </InputGroup>
    </div>
  ),
}
