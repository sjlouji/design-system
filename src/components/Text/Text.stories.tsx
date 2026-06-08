import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'label', 'code', 'h1', 'h2', 'h3', 'h4'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    muted: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: { children: 'The quick brown fox jumps over the lazy dog.' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'] as const).map((size) => (
        <Text key={size} size={size}>{size} — The quick brown fox</Text>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {(['normal', 'medium', 'semibold', 'bold'] as const).map((weight) => (
        <Text key={weight} weight={weight}>{weight} — The quick brown fox</Text>
      ))}
    </div>
  ),
};

export const Muted: Story = {
  args: { muted: true, children: 'This text is muted.' },
};

export const Code: Story = {
  args: { as: 'code', variant: 'code', children: 'const x = 42;' },
};
