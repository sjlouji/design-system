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
  argTypes: {
    prefix: {
      control: false,
      description: 'Content shown to the left of the input inside a muted, bordered addon. Accepts a string (e.g. "$", "https://") or a React element (e.g. an icon). Omit to show no left addon.',
    },
    suffix: {
      control: false,
      description: 'Content shown to the right of the input inside a muted, bordered addon. Accepts a string (e.g. ".com", "kg") or a React element. Omit to show no right addon.',
    },
    children: {
      control: false,
      description: 'A single `<Input>` element. The component strips the input\'s own border and ring so the outer wrapper owns the focus style.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the root wrapper `<div>`.',
    },
  },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <InputGroup prefix="$">
        <Input placeholder="0.00" />
      </InputGroup>
    </div>
  ),
}

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
