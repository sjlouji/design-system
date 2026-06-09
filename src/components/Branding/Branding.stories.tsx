import type { Meta, StoryObj } from '@storybook/react-vite'
import { Branding } from './Branding'

const meta = {
  title: 'Navigation/Branding',
  component: Branding,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Branding>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Acme',
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
