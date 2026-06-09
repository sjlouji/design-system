import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SearchInput } from './SearchInput'

const meta = {
  title: 'Forms/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Search…',
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
