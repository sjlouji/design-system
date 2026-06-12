import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from './Slider'
import { Label } from '@/components/Label'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    min: {
      control: { type: 'number' },
      description: 'Minimum selectable value. Defaults to `0`.',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum selectable value. Defaults to `100`.',
    },
    step: {
      control: { type: 'number' },
      description: 'Increment between each selectable value. Defaults to `1`. Use larger values (e.g. `10`) for coarse steps.',
    },
    defaultValue: {
      control: false,
      description: 'Initial value(s) as an array of numbers — one entry per thumb. Use for uncontrolled usage. Pass two numbers (e.g. `[25, 75]`) to render a range slider.',
    },
    value: {
      control: false,
      description: 'Controlled value(s) as an array of numbers — one entry per thumb. Must be paired with `onValueChange` to stay in sync.',
    },
    disabled: {
      control: 'boolean',
      description: 'When `true`, prevents all interaction and renders the track and thumb(s) at reduced opacity.',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '`horizontal` — standard left-to-right slider (default). `vertical` — top-to-bottom slider; requires an explicit height on the wrapper.',
    },
    onValueChange: {
      action: 'valueChange',
      description: 'Fires continuously while the user drags a thumb. Receives the current value array, e.g. `[42]` or `[20, 80]`.',
    },
    onValueCommit: {
      action: 'valueCommit',
      description: 'Fires once when the user releases the thumb (pointer-up or key-up). Useful for triggering expensive operations only after the drag is finished.',
    },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [50],
    disabled: false,
    orientation: 'horizontal',
    className: 'w-[300px]',
  },
}

export const AtMinimum: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [0],
    className: 'w-[300px]',
  },
}

export const AtMaximum: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [100],
    className: 'w-[300px]',
  },
}

export const Range: Story = {
  name: 'Range (Two Thumbs)',
  args: {
    min: 0,
    max: 100,
    defaultValue: [25, 75],
    className: 'w-[300px]',
  },
}

export const WithStep: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: [40],
    className: 'w-[300px]',
  },
}

export const SmallRange: Story = {
  args: {
    min: 1,
    max: 10,
    step: 1,
    defaultValue: [5],
    className: 'w-[200px]',
  },
}

export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [40],
    disabled: true,
    className: 'w-[300px]',
  },
}

export const Vertical: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [60],
    orientation: 'vertical',
    className: 'h-[180px]',
  },
}

export const VerticalRange: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [20, 80],
    orientation: 'vertical',
    className: 'h-[180px]',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[300px]">
      <div className="flex justify-between">
        <Label>Volume</Label>
        <span className="text-sm text-muted-foreground">70%</span>
      </div>
      <Slider min={0} max={100} defaultValue={[70]} />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState([40])
    return (
      <div className="flex flex-col gap-3 w-[300px]">
        <div className="flex justify-between">
          <Label>Brightness</Label>
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <Slider
          min={0}
          max={100}
          value={value}
          onValueChange={setValue}
        />
      </div>
    )
  },
}

export const ControlledRange: Story = {
  render: () => {
    const [range, setRange] = React.useState([20, 80])
    return (
      <div className="flex flex-col gap-3 w-[300px]">
        <div className="flex justify-between">
          <Label>Price range</Label>
          <span className="text-sm text-muted-foreground">
            ${range[0]} – ${range[1]}
          </span>
        </div>
        <Slider
          min={0}
          max={200}
          step={5}
          value={range}
          onValueChange={setRange}
        />
      </div>
    )
  },
}

export const FormVolumeControl: Story = {
  name: 'Form — Audio Settings',
  render: () => {
    const [volume, setVolume] = React.useState([75])
    const [bass, setBass] = React.useState([50])
    const [treble, setTreble] = React.useState([60])
    return (
      <div className="flex flex-col gap-5 w-[320px]">
        <p className="text-sm font-semibold">Audio Settings</p>
        {[
          { label: 'Volume', value: volume, onChange: setVolume },
          { label: 'Bass', value: bass, onChange: setBass },
          { label: 'Treble', value: treble, onChange: setTreble },
        ].map(({ label, value, onChange }) => (
          <div key={label} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <Label>{label}</Label>
              <span className="text-sm text-muted-foreground">{value[0]}</span>
            </div>
            <Slider min={0} max={100} value={value} onValueChange={onChange} />
          </div>
        ))}
      </div>
    )
  },
}
