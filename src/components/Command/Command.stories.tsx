import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarIcon, FileIcon, SearchIcon, SettingsIcon } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './Command'

const meta = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[400px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon />
            Calendar
          </CommandItem>
          <CommandItem>
            <SearchIcon />
            Search
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[400px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Files">
          <CommandItem>
            <FileIcon />
            README.md
          </CommandItem>
          <CommandItem>
            <FileIcon />
            package.json
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <SettingsIcon />
            Preferences
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
