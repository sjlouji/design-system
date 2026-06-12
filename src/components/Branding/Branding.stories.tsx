import type { Meta, StoryObj } from '@storybook/react-vite'
import { Branding } from './Branding'

const meta = {
  title: 'Navigation/Branding',
  component: Branding,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    name: {
      control: 'text',
      description: 'Brand or product name. Always required. Drives the default logo initial when no custom logo is provided.',
    },
    tagline: {
      control: 'text',
      description: 'Optional secondary line rendered below the name in a smaller, muted style.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Overall scale. "sm" — 20 px logo, text-sm. "md" — 28 px logo, text-base semibold (default). "lg" — 36 px logo, text-xl bold.',
    },
    href: {
      control: 'text',
      description: 'When provided, wraps the entire branding block in an <a> element. Useful for linking back to a home page.',
    },
    logo: {
      control: false,
      description: 'Custom logo element rendered left of the name. When omitted, a coloured square showing the first letter of name is used as a fallback.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the outer wrapper element.',
    },
  },
} satisfies Meta<typeof Branding>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Acme',
    size: 'md',
    tagline: undefined,
    href: undefined,
  },
}

export const WithTagline: Story = {
  args: {
    name: 'Acme',
    tagline: 'Build better products',
  },
}

export const Small: Story = {
  args: {
    name: 'Acme',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    name: 'Acme',
    tagline: 'Build better products',
    size: 'lg',
  },
}

export const WithCustomLogo: Story = {
  args: {
    name: 'Acme',
    logo: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="28" height="28" rx="6" fill="#3b82f6" />
        <path d="M14 6L22 22H6L14 6Z" fill="white" />
      </svg>
    ),
  },
}

export const AsLink: Story = {
  args: {
    name: 'Acme',
    tagline: 'Build better products',
    href: 'https://example.com',
  },
}
