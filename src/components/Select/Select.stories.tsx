import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './Select'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: {
      control: 'boolean',
      description:
        'Disables the entire select — the trigger becomes unclickable and renders with reduced opacity.',
    },
    value: {
      control: 'text',
      description:
        'Controlled selected value. When set, the component is controlled — you must also provide onValueChange to update it.',
    },
    defaultValue: {
      control: 'text',
      description:
        'Initial selected value for uncontrolled usage. The component manages its own state after mount.',
    },
    onValueChange: {
      action: 'onValueChange',
      description:
        'Fires whenever the user selects a new item. Receives the string value of the chosen SelectItem.',
    },
    open: {
      control: 'boolean',
      description:
        'Controlled open/closed state of the dropdown. When set, also provide onOpenChange to keep it in sync.',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description:
        'Fires when the dropdown opens or closes. Receives a boolean — true when opening, false when closing.',
    },
    name: {
      control: 'text',
      description:
        'Name attribute for the hidden input element submitted with a native HTML form.',
    },
    required: {
      control: 'boolean',
      description:
        'Marks the select as required. The trigger gains aria-required and native form validation applies.',
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
    required: false,
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
        <SelectItem value="mango">Mango</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithPlaceholder: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Choose your favourite..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Cannot select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const SizeSmall: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-16">Default</span>
        <Select>
          <SelectTrigger size="default" className="w-[180px]">
            <SelectValue placeholder="Default size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-16">Small</span>
        <Select>
          <SelectTrigger size="sm" className="w-[180px]">
            <SelectValue placeholder="Small size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time</SelectItem>
          <SelectItem value="cst">Central Standard Time</SelectItem>
          <SelectItem value="mst">Mountain Standard Time</SelectItem>
          <SelectItem value="pst">Pacific Standard Time</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time</SelectItem>
          <SelectItem value="cet">Central European Time</SelectItem>
          <SelectItem value="eet">Eastern European Time</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="ist">India Standard Time</SelectItem>
          <SelectItem value="cst-asia">China Standard Time</SelectItem>
          <SelectItem value="jst">Japan Standard Time</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const WithSeparator: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="owner">Owner</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectSeparator />
        <SelectItem value="editor">Editor</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
        <SelectSeparator />
        <SelectItem value="guest">Guest</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithDisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise" disabled>
          Enterprise (contact sales)
        </SelectItem>
        <SelectItem value="custom" disabled>
          Custom (coming soon)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const ErrorState: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Select>
        <SelectTrigger className="w-[200px]" aria-invalid="true">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-destructive">Please select a country.</p>
    </div>
  ),
}

export const ManyOptions: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        {[
          'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
          'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
          'Bahamas', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium',
          'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Brazil',
          'Bulgaria', 'Burkina Faso', 'Cambodia', 'Cameroon', 'Canada',
          'Chile', 'China', 'Colombia', 'Croatia', 'Cuba',
        ].map((country) => (
          <SelectItem key={country} value={country.toLowerCase().replace(/ /g, '-')}>
            {country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('banana')
    return (
      <div className="flex flex-col gap-4 items-center">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
            <SelectItem value="mango">Mango</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Selected: <strong>{value}</strong>
        </p>
        <div className="flex gap-2">
          <button
            className="text-xs px-2 py-1 border rounded"
            onClick={() => setValue('apple')}
          >
            Set Apple
          </button>
          <button
            className="text-xs px-2 py-1 border rounded"
            onClick={() => setValue('cherry')}
          >
            Set Cherry
          </button>
        </div>
      </div>
    )
  },
}

export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="editor">
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="editor">Editor</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const GroupsWithSeparator: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frontend</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Backend</SelectLabel>
          <SelectItem value="express">Express</SelectItem>
          <SelectItem value="fastify">Fastify</SelectItem>
          <SelectItem value="nestjs">NestJS</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Full-stack</SelectLabel>
          <SelectItem value="nextjs">Next.js</SelectItem>
          <SelectItem value="remix">Remix</SelectItem>
          <SelectItem value="nuxt">Nuxt</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const InFormContext: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">Country</label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Language</label>
        <Select defaultValue="en">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Timezone</label>
        <Select>
          <SelectTrigger className="w-full" aria-invalid="true">
            <SelectValue placeholder="Required" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="utc">UTC</SelectItem>
            <SelectItem value="est">EST</SelectItem>
            <SelectItem value="pst">PST</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-destructive">Timezone is required.</p>
      </div>
    </div>
  ),
}
