import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
import { Button } from '@/components/Button'
import { ButtonGroup } from './ButtonGroup'

const meta = {
  title: 'Forms/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  // children is required by type but always provided via render
  args: { children: null },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">One</Button>
      <Button variant="outline">Two</Button>
      <Button variant="outline">Three</Button>
    </ButtonGroup>
  ),
}

export const WithIcons: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline" size="icon">
        <Bold />
      </Button>
      <Button variant="outline" size="icon">
        <Italic />
      </Button>
      <Button variant="outline" size="icon">
        <Underline />
      </Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline" size="icon">
        <AlignLeft />
      </Button>
      <Button variant="outline" size="icon">
        <AlignCenter />
      </Button>
      <Button variant="outline" size="icon">
        <AlignRight />
      </Button>
    </ButtonGroup>
  ),
}

export const Sizes: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup {...args}>
        <Button variant="outline" size="sm">Small A</Button>
        <Button variant="outline" size="sm">Small B</Button>
        <Button variant="outline" size="sm">Small C</Button>
      </ButtonGroup>
      <ButtonGroup {...args}>
        <Button variant="outline">Default A</Button>
        <Button variant="outline">Default B</Button>
        <Button variant="outline">Default C</Button>
      </ButtonGroup>
      <ButtonGroup {...args}>
        <Button variant="outline" size="lg">Large A</Button>
        <Button variant="outline" size="lg">Large B</Button>
        <Button variant="outline" size="lg">Large C</Button>
      </ButtonGroup>
    </div>
  ),
}
