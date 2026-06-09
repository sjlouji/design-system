import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup, RadioGroupItem } from './RadioGroup'
import { Label } from '@/components/Label'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">Option 1</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">Option 2</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-3" id="option-3" />
        <Label htmlFor="option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithDefaultValue: Story = {
  render: () => (
    <RadioGroup defaultValue="option-2">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-1" id="wdv-option-1" />
        <Label htmlFor="wdv-option-1">Option 1</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-2" id="wdv-option-2" />
        <Label htmlFor="wdv-option-2">Option 2</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-3" id="wdv-option-3" />
        <Label htmlFor="wdv-option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup disabled>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-1" id="dis-option-1" />
        <Label htmlFor="dis-option-1">Option 1</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-2" id="dis-option-2" />
        <Label htmlFor="dis-option-2">Option 2</Label>
      </div>
    </RadioGroup>
  ),
}
