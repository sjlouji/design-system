import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
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
    shape: {
      control: 'select',
      options: ['default', 'boxy', 'rounded'],
      description: 'Corner radius style. "default" — rounded-lg (standard). "boxy" — no rounding, flat corners for grouped/stacked layouts. "rounded" — pill shape, fully rounded ends.',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url', 'file'],
      description: 'HTML input type. Controls the native keyboard on mobile and browser-level validation. "password" masks the value; "file" shows a file picker.',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, the input is non-interactive, dimmed (50% opacity), and shows a not-allowed cursor.',
    },
    readOnly: {
      control: 'boolean',
      description: 'When true, the value is visible and selectable but cannot be edited by the user.',
    },
    placeholder: {
      control: 'text',
      description: 'Hint text displayed when the input has no value. Rendered at reduced opacity via the muted-foreground colour token.',
    },
    onChange: {
      action: 'changed',
      description: 'Fired on every keystroke. Receives the native `React.ChangeEvent<HTMLInputElement>`.',
    },
    onFocus: {
      action: 'focused',
      description: 'Fired when the input receives focus. Receives the native `React.FocusEvent<HTMLInputElement>`.',
    },
    onBlur: {
      action: 'blurred',
      description: 'Fired when the input loses focus. Receives the native `React.FocusEvent<HTMLInputElement>`.',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Playground / default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    placeholder: 'Enter text…',
    shape: 'default',
    type: 'text',
    disabled: false,
  },
}

// ---------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------

export const ShapeDefault: Story = {
  name: 'Shape: default',
  args: { placeholder: 'Default shape', shape: 'default' },
}

export const ShapeBoxy: Story = {
  name: 'Shape: boxy',
  args: { placeholder: 'Boxy shape', shape: 'boxy' },
}

export const ShapeRounded: Story = {
  name: 'Shape: rounded',
  args: { placeholder: 'Rounded shape', shape: 'rounded' },
}

export const ShapeComparison: Story = {
  name: 'Shapes compared',
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Default</span>
        <Input placeholder="Default shape" shape="default" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Boxy</span>
        <Input placeholder="Boxy shape" shape="boxy" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Rounded</span>
        <Input placeholder="Rounded shape" shape="rounded" />
      </div>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Input types
// ---------------------------------------------------------------------------

export const TypeText: Story = {
  name: 'Type: text',
  args: { type: 'text', placeholder: 'Plain text' },
}

export const TypeEmail: Story = {
  name: 'Type: email',
  args: { type: 'email', placeholder: 'you@example.com' },
}

export const TypePassword: Story = {
  name: 'Type: password',
  args: { type: 'password', placeholder: 'Enter password' },
}

export const TypeNumber: Story = {
  name: 'Type: number',
  args: { type: 'number', placeholder: '42' },
}

export const TypeSearch: Story = {
  name: 'Type: search',
  args: { type: 'search', placeholder: 'Search…' },
}

export const TypeTel: Story = {
  name: 'Type: tel',
  args: { type: 'tel', placeholder: '+1 (555) 000-0000' },
}

export const TypeUrl: Story = {
  name: 'Type: url',
  args: { type: 'url', placeholder: 'https://example.com' },
}

export const TypeFile: Story = {
  name: 'Type: file',
  args: { type: 'file' },
}

export const AllTypes: Story = {
  name: 'All types',
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      {(
        [
          ['text', 'Plain text'],
          ['email', 'you@example.com'],
          ['password', 'Enter password'],
          ['number', '42'],
          ['search', 'Search…'],
          ['tel', '+1 (555) 000-0000'],
          ['url', 'https://example.com'],
        ] as const
      ).map(([type, placeholder]) => (
        <div key={type} className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">{type}</span>
          <Input type={type} placeholder={placeholder} />
        </div>
      ))}
    </div>
  ),
}

// ---------------------------------------------------------------------------
// States
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: { placeholder: 'Disabled input', disabled: true },
}

export const DisabledWithValue: Story = {
  name: 'Disabled with value',
  args: { defaultValue: 'Cannot change this', disabled: true },
}

export const ReadOnly: Story = {
  name: 'Read only',
  args: { defaultValue: 'Read-only value', readOnly: true },
}

export const WithDefaultValue: Story = {
  name: 'With default value',
  args: { defaultValue: 'Pre-filled value' },
}

export const ErrorState: Story = {
  name: 'Error state (aria-invalid)',
  args: {
    placeholder: 'Invalid input',
    'aria-invalid': true,
    defaultValue: 'bad-email',
  },
}

export const ErrorStateAllShapes: Story = {
  name: 'Error state — all shapes',
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Input
        shape="default"
        defaultValue="bad input"
        aria-invalid
      />
      <Input
        shape="boxy"
        defaultValue="bad input"
        aria-invalid
      />
      <Input
        shape="rounded"
        defaultValue="bad input"
        aria-invalid
      />
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Callbacks
// ---------------------------------------------------------------------------

export const OnChange: Story = {
  name: 'onChange callback',
  render: (args) => {
    const [value, setValue] = React.useState('')
    return (
      <div className="flex flex-col gap-2 w-72">
        <Input
          {...args}
          placeholder="Type something…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span className="text-xs text-muted-foreground">Value: "{value}"</span>
      </div>
    )
  },
}

export const OnFocusBlur: Story = {
  name: 'onFocus / onBlur callbacks',
  render: (args) => {
    const [status, setStatus] = React.useState('idle')
    return (
      <div className="flex flex-col gap-2 w-72">
        <Input
          {...args}
          placeholder="Click in / out"
          onFocus={() => setStatus('focused')}
          onBlur={() => setStatus('blurred')}
        />
        <span className="text-xs text-muted-foreground">Status: {status}</span>
      </div>
    )
  },
}

// ---------------------------------------------------------------------------
// With Label (common usage pattern)
// ---------------------------------------------------------------------------

export const WithLabel: Story = {
  name: 'With label (usage pattern)',
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name-input" className="text-sm font-medium">
          Full name
        </label>
        <Input id="name-input" placeholder="Jane Smith" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email-input" className="text-sm font-medium">
          Email address
        </label>
        <Input id="email-input" type="email" placeholder="jane@example.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password-input" className="text-sm font-medium">
          Password
        </label>
        <Input id="password-input" type="password" placeholder="••••••••" />
      </div>
    </div>
  ),
}

export const WithLabelAndError: Story = {
  name: 'With label and error',
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <label htmlFor="error-email" className="text-sm font-medium">
        Email address
      </label>
      <Input
        id="error-email"
        type="email"
        defaultValue="not-an-email"
        aria-invalid
        aria-describedby="error-email-msg"
      />
      <span id="error-email-msg" className="text-xs text-destructive">
        Please enter a valid email address.
      </span>
    </div>
  ),
}
