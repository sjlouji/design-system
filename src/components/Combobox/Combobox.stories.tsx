import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Combobox, type ComboboxOption } from './Combobox'

const meta: Meta<typeof Combobox> = {
  title: 'Forms/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    options: {
      control: false,
      description: 'Array of options to display, each with value, label, and optional description',
    },
    value: {
      control: 'text',
      description: 'Currently selected option value (controlled)',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when selection changes. Receives the selected value string.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown on the trigger button when nothing is selected',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder shown in the search input inside the dropdown',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no options match the search query',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the trigger button',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the trigger button',
    },
  },
}

export default meta
type Story = StoryObj<typeof Combobox>

const frameworks: ComboboxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'astro', label: 'Astro' },
  { value: 'remix', label: 'Remix' },
  { value: 'nextjs', label: 'Next.js' },
]

const frameworksWithDescriptions: ComboboxOption[] = [
  { value: 'react', label: 'React', description: 'A JavaScript library for building user interfaces' },
  { value: 'vue', label: 'Vue', description: 'The progressive JavaScript framework' },
  { value: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop web apps' },
  { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
  { value: 'solid', label: 'Solid', description: 'Simple and performant reactivity for building UIs' },
  { value: 'astro', label: 'Astro', description: 'Build fast websites with your favorite JS framework' },
]

const countries: ComboboxOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
  { value: 'cn', label: 'China' },
  { value: 'mx', label: 'Mexico' },
  { value: 'za', label: 'South Africa' },
]

const priorities: ComboboxOption[] = [
  { value: 'critical', label: 'Critical', description: 'Immediate action required' },
  { value: 'high', label: 'High', description: 'Address within 24 hours' },
  { value: 'medium', label: 'Medium', description: 'Address within this week' },
  { value: 'low', label: 'Low', description: 'Address when time permits' },
]

export const Default: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select a framework…',
    searchPlaceholder: 'Search frameworks…',
    emptyMessage: 'No framework found.',
  },
}

export const WithPreselectedValue: Story = {
  args: {
    options: frameworks,
    value: 'react',
    placeholder: 'Select a framework…',
  },
}

export const WithDescriptions: Story = {
  args: {
    options: frameworksWithDescriptions,
    placeholder: 'Select a framework…',
    searchPlaceholder: 'Search frameworks…',
    emptyMessage: 'No framework found.',
  },
}

export const CustomPlaceholders: Story = {
  args: {
    options: countries,
    placeholder: 'Choose your country…',
    searchPlaceholder: 'Type to filter countries…',
    emptyMessage: 'Country not found.',
  },
}

export const LongOptionList: Story = {
  args: {
    options: countries,
    placeholder: 'Select a country…',
    searchPlaceholder: 'Search countries…',
  },
}

export const Disabled: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select a framework…',
    disabled: true,
  },
}

export const DisabledWithValue: Story = {
  args: {
    options: frameworks,
    value: 'vue',
    disabled: true,
  },
}

export const EmptyOptions: Story = {
  args: {
    options: [],
    placeholder: 'No options available',
    emptyMessage: 'No options configured.',
  },
}

export const SingleOption: Story = {
  args: {
    options: [{ value: 'only', label: 'Only Option' }],
    placeholder: 'Select an option…',
  },
}

export const CustomWidth: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select…',
    className: 'w-[320px]',
  },
}

export const Controlled: Story = {
  render: function ControlledCombobox() {
    const [value, setValue] = React.useState('')

    return (
      <div className="flex flex-col gap-4">
        <Combobox
          options={frameworks}
          value={value}
          onChange={setValue}
          placeholder="Select a framework…"
          searchPlaceholder="Search frameworks…"
          emptyMessage="No framework found."
        />
        <p className="text-sm text-muted-foreground">
          Selected: <strong>{value || 'none'}</strong>
        </p>
        {value && (
          <button
            className="text-sm text-primary underline text-left"
            onClick={() => setValue('')}
          >
            Clear selection
          </button>
        )}
      </div>
    )
  },
}

export const ToggleBehavior: Story = {
  name: 'Toggle (click same item to deselect)',
  render: function ToggleCombobox() {
    const [value, setValue] = React.useState('react')

    return (
      <div className="flex flex-col gap-4">
        <p className="text-xs text-muted-foreground">
          Clicking the selected item again will deselect it.
        </p>
        <Combobox
          options={frameworks}
          value={value}
          onChange={setValue}
          placeholder="Select a framework…"
        />
        <p className="text-sm text-muted-foreground">Value: {value || '(empty)'}</p>
      </div>
    )
  },
}

export const PrioritySelector: Story = {
  render: function PrioritySelector() {
    const [value, setValue] = React.useState('')

    return (
      <div className="flex flex-col gap-3 w-64">
        <label className="text-sm font-medium">Task Priority</label>
        <Combobox
          options={priorities}
          value={value}
          onChange={setValue}
          placeholder="Set priority…"
          searchPlaceholder="Search…"
        />
        {value && (
          <p className="text-xs text-muted-foreground">
            {priorities.find((p) => p.value === value)?.description}
          </p>
        )}
      </div>
    )
  },
}

export const InFormContext: Story = {
  render: function InFormContext() {
    const [framework, setFramework] = React.useState('')
    const [country, setCountry] = React.useState('')

    return (
      <form className="flex flex-col gap-4 w-80 p-4 border rounded-lg">
        <h3 className="text-sm font-semibold">Project Setup</h3>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Framework</label>
          <Combobox
            options={frameworks}
            value={framework}
            onChange={setFramework}
            placeholder="Select framework…"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Country</label>
          <Combobox
            options={countries}
            value={country}
            onChange={setCountry}
            placeholder="Select country…"
            searchPlaceholder="Search countries…"
            className="w-full"
          />
        </div>
      </form>
    )
  },
  parameters: { layout: 'centered' },
}
