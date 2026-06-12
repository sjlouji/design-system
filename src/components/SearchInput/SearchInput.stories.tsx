import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SearchInput } from './SearchInput'

const meta = {
  title: 'Forms/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    value: {
      control: 'text',
      description:
        'Controlled value. When provided, the component reflects this string and becomes controlled — pair with onChange to update it.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when the input is empty.',
    },
    loading: {
      control: 'boolean',
      description:
        'When true, replaces the clear button with a spinner to indicate an async operation is in progress (e.g. a debounced server search).',
    },
    debounce: {
      control: { type: 'range', min: 0, max: 1000, step: 50 },
      description:
        'Milliseconds to wait after the last keystroke before calling onChange. Use 0 (default) for immediate updates. Useful for reducing API calls during fast typing.',
    },
    onChange: {
      action: 'onChange',
      description:
        'Fires with the current string value after each keystroke (or after the debounce delay). Receives the raw string — not a React ChangeEvent.',
    },
    onClear: {
      action: 'onClear',
      description:
        'Fires when the user clicks the X clear button. Also resets the internal value and calls onChange(""). Use to reset any external state.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root wrapper div.',
    },
  },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Search…',
    loading: false,
    debounce: 0,
  },
  render: (args) => (
    <div className="w-72">
      <SearchInput {...args} />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="w-72 flex flex-col gap-2">
        <SearchInput
          value={value}
          onChange={setValue}
          onClear={() => setValue('')}
          placeholder="Search…"
        />
        <p className="text-sm text-muted-foreground">Value: {value || '(empty)'}</p>
      </div>
    )
  },
}

export const Loading: Story = {
  args: {
    value: 'react hooks',
    loading: true,
    placeholder: 'Search…',
  },
  render: (args) => (
    <div className="w-72">
      <SearchInput {...args} />
    </div>
  ),
}

export const WithClear: Story = {
  args: {
    value: 'tailwind css',
    placeholder: 'Search…',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '')
    return (
      <div className="w-72">
        <SearchInput
          value={value}
          onChange={setValue}
          onClear={() => setValue('')}
          placeholder={args.placeholder}
        />
      </div>
    )
  },
}

export const WithDebounce: Story = {
  render: () => {
    const [committed, setCommitted] = useState('')
    return (
      <div className="w-72 flex flex-col gap-2">
        <SearchInput
          debounce={400}
          onChange={setCommitted}
          placeholder="Debounced (400 ms)…"
        />
        <p className="text-sm text-muted-foreground">Committed: {committed || '(empty)'}</p>
      </div>
    )
  },
}
