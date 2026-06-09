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
