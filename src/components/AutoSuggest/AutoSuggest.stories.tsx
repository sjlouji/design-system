import type { Meta, StoryObj } from '@storybook/react-vite'
import { AutoSuggest } from './AutoSuggest'

const meta = {
  title: 'Components/AutoSuggest',
  component: AutoSuggest,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    options: {
      control: false,
      description:
        'Array of suggestion items. Each item has a required string value and label, plus an optional description shown as secondary text.',
    },
    value: {
      control: 'text',
      description:
        'Controlled input value. When provided, the component syncs the text field to this string. Omit for uncontrolled usage.',
    },
    onChange: {
      action: 'onChange',
      description:
        'Fired on every keystroke in the text input. Receives the current raw string value.',
    },
    onSelect: {
      action: 'onSelect',
      description:
        'Fired when the user picks a suggestion from the dropdown. Receives the full AutoSuggestOption object ({ value, label, description? }).',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown inside the input when it is empty.',
    },
    loading: {
      control: 'boolean',
      description:
        'When true, replaces the suggestion list with a centered spinner. Use while fetching async options.',
    },
    emptyMessage: {
      control: 'text',
      description:
        'Message shown when the dropdown is open but no options match the current input. Defaults to "No results found."',
    },
    filterOptions: {
      control: 'boolean',
      description:
        'When true (default), options are filtered client-side to match the input text. Set to false to disable filtering and show all options on focus — useful when filtering happens server-side.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the outer wrapper div.',
    },
  },
} satisfies Meta<typeof AutoSuggest>

export default meta
type Story = StoryObj<typeof meta>

const frameworkOptions = [
  { value: 'react', label: 'React', description: 'UI library by Meta' },
  { value: 'vue', label: 'Vue', description: 'Progressive framework' },
  { value: 'angular', label: 'Angular', description: 'Platform by Google' },
  { value: 'svelte', label: 'Svelte', description: 'Compile-time framework' },
  { value: 'solid', label: 'Solid', description: 'Fine-grained reactivity' },
  { value: 'qwik', label: 'Qwik', description: 'Resumable framework' },
]

export const Default: Story = {
  args: {
    options: frameworkOptions,
    placeholder: 'Search frameworks…',
    loading: false,
    emptyMessage: 'No results found.',
    filterOptions: true,
  },
}

export const WithDescriptions: Story = {
  args: {
    options: frameworkOptions,
    placeholder: 'Search frameworks…',
  },
}

export const Loading: Story = {
  args: {
    options: [],
    placeholder: 'Searching…',
    loading: true,
  },
}

export const EmptyState: Story = {
  args: {
    options: [],
    placeholder: 'Try typing something…',
    emptyMessage: 'No frameworks found.',
  },
}

export const WithDefaultValue: Story = {
  args: {
    options: frameworkOptions,
    value: 'React',
    placeholder: 'Search frameworks…',
  },
}

export const NoFilter: Story = {
  args: {
    options: frameworkOptions,
    placeholder: 'Show all on focus…',
    filterOptions: false,
  },
}

export const Disabled: Story = {
  args: {
    options: frameworkOptions,
    placeholder: 'Disabled',
    value: 'React',
  },
  render: (args) => (
    <div className="w-72 opacity-50 pointer-events-none">
      <AutoSuggest {...args} />
    </div>
  ),
}
