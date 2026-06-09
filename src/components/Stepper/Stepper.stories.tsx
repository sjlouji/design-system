import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stepper, useStepper } from './Stepper'
import { Button } from '@/components/Button'

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Stepper>

const steps = [
  { id: 'account', title: 'Account', description: 'Create your account' },
  { id: 'profile', title: 'Profile', description: 'Set up your profile' },
  { id: 'review', title: 'Review', description: 'Confirm your details' },
]

export const Default: Story = {
  args: {
    steps,
    currentStep: 0,
  },
}

export const Step2Active: Story = {
  args: {
    steps,
    currentStep: 1,
  },
}

export const AllComplete: Story = {
  args: {
    steps,
    currentStep: 3,
  },
}

export const Vertical: Story = {
  args: {
    steps,
    currentStep: 1,
    orientation: 'vertical',
  },
}

function InteractiveDemo() {
  const { currentStep, next, prev, isFirst, isLast, isComplete } = useStepper(steps.length)

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={(i) => {
          // allow clicking already-completed steps
          void i
        }}
      />
      {isComplete ? (
        <p className="text-sm text-muted-foreground text-center">All steps complete!</p>
      ) : (
        <p className="text-sm text-foreground">
          Current step: <strong>{steps[currentStep]?.title}</strong>
        </p>
      )}
      <div className="flex gap-2">
        <Button variant="outline" onClick={prev} disabled={isFirst}>
          Previous
        </Button>
        <Button onClick={next} disabled={isComplete}>
          {isLast ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
}
