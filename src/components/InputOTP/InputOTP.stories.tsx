import type { Meta } from '@storybook/react-vite'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from './InputOTP'

const meta = {
  title: 'Components/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { maxLength: 6 },
  argTypes: {
    maxLength: {
      control: 'number',
      description: 'Total number of OTP characters. Must match the number of `<InputOTPSlot>` elements rendered inside the group(s).',
    },
    value: {
      control: 'text',
      description: 'Controlled value string. Each character maps to the corresponding slot by index. When provided, pair with `onChange` to keep state in sync.',
    },
    onChange: {
      action: 'onChange',
      description: 'Fired whenever the user types or pastes into any slot. Receives the full current value string.',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, all slots are non-interactive and the container is dimmed to 50% opacity.',
    },
    containerClassName: {
      control: 'text',
      description: 'Additional CSS classes applied to the outer container `<div>` that wraps all slots and separators.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the hidden `<input>` element that drives the OTP logic.',
    },
  },
} satisfies Meta<typeof InputOTP>

export default meta

export const Default = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const TwoGroups = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}
