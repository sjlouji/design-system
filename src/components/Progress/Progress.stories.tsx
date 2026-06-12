import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './Progress'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value between 0 and 100. Omit for indeterminate state.',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value (defaults to 100)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 50,
    className: 'w-[300px]',
  },
}

export const Zero: Story = {
  args: {
    value: 0,
    className: 'w-[300px]',
  },
}

export const Quarter: Story = {
  args: {
    value: 25,
    className: 'w-[300px]',
  },
}

export const Half: Story = {
  args: {
    value: 50,
    className: 'w-[300px]',
  },
}

export const ThreeQuarters: Story = {
  args: {
    value: 75,
    className: 'w-[300px]',
  },
}

export const Full: Story = {
  args: {
    value: 100,
    className: 'w-[300px]',
  },
}

export const Indeterminate: Story = {
  name: 'Indeterminate (no value)',
  args: {
    value: undefined,
    className: 'w-[300px]',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[300px]">
      <div className="flex justify-between text-sm">
        <span>Uploading file…</span>
        <span className="text-muted-foreground">68%</span>
      </div>
      <Progress value={68} />
    </div>
  ),
}

export const CustomWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress value={60} className="w-48" />
      <Progress value={60} className="w-72" />
      <Progress value={60} className="w-96" />
    </div>
  ),
}

export const MultipleSteps: Story = {
  name: 'Form — Multi-Step Progress',
  render: () => {
    const steps = ['Account', 'Profile', 'Billing', 'Review']
    const [step, setStep] = React.useState(1)
    const pct = Math.round((step / steps.length) * 100)

    return (
      <div className="flex flex-col gap-4 w-[360px]">
        <div className="flex justify-between text-sm">
          {steps.map((s, i) => (
            <span
              key={s}
              className={i + 1 <= step ? 'font-medium' : 'text-muted-foreground'}
            >
              {s}
            </span>
          ))}
        </div>
        <Progress value={pct} />
        <p className="text-sm text-muted-foreground text-center">
          Step {step} of {steps.length}
        </p>
        <div className="flex gap-2">
          <button
            className="text-sm px-3 py-1 rounded border border-input disabled:opacity-40"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            Back
          </button>
          <button
            className="text-sm px-3 py-1 rounded bg-primary text-primary-foreground disabled:opacity-40"
            onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
            disabled={step === steps.length}
          >
            Next
          </button>
        </div>
      </div>
    )
  },
}

export const Animated: Story = {
  name: 'Animated — Upload Simulation',
  render: () => {
    const [value, setValue] = React.useState(0)
    const running = React.useRef(false)

    const start = () => {
      if (running.current) return
      running.current = true
      setValue(0)
      const tick = () => {
        setValue((v) => {
          if (v >= 100) {
            running.current = false
            return 100
          }
          setTimeout(tick, 60)
          return v + 2
        })
      }
      setTimeout(tick, 60)
    }

    return (
      <div className="flex flex-col gap-3 w-[300px]">
        <div className="flex justify-between text-sm">
          <span>{value < 100 ? 'Uploading…' : 'Complete'}</span>
          <span className="text-muted-foreground">{value}%</span>
        </div>
        <Progress value={value} />
        <button
          className="text-sm px-3 py-1 rounded bg-primary text-primary-foreground w-fit"
          onClick={start}
        >
          Start upload
        </button>
      </div>
    )
  },
}

export const FileUploadList: Story = {
  render: () => {
    const files = [
      { name: 'report-2024.pdf', progress: 100 },
      { name: 'design-assets.zip', progress: 72 },
      { name: 'video-intro.mp4', progress: 34 },
    ]
    return (
      <div className="flex flex-col gap-4 w-[340px]">
        {files.map((f) => (
          <div key={f.name} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm">
              <span>{f.name}</span>
              <span className="text-muted-foreground">{f.progress}%</span>
            </div>
            <Progress value={f.progress} />
          </div>
        ))}
      </div>
    )
  },
}
