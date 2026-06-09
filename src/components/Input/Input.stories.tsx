import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-[300px]',
  },
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter your text here...',
    className: 'w-[300px]',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    className: 'w-[300px]',
  },
}

export const TypeEmail: Story = {
  args: {
    type: 'email',
    placeholder: 'name@example.com',
    className: 'w-[300px]',
  },
}

export const TypePassword: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    className: 'w-[300px]',
  },
}

export const TypeSearch: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    className: 'w-[300px]',
  },
}

export const CssCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { className: 'w-[300px]' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    const styles = window.getComputedStyle(input)
    expect(styles.fontSize).toBe('14px')
  },
}

export const TypeInteraction: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { placeholder: 'Type here...', className: 'w-[300px]' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.type(input, 'Hello, world!')
    expect(input).toHaveValue('Hello, world!')
  },
}

export const ClearInteraction: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { defaultValue: 'initial text', className: 'w-[300px]' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    await userEvent.clear(input)
    expect(input).toHaveValue('')
  },
}
