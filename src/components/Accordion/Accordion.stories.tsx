import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import {
  ShieldIcon,
  CreditCardIcon,
  BellIcon,
  UserIcon,
  KeyIcon,
} from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether one or multiple items can be open at the same time',
    },
    collapsible: {
      control: 'boolean',
      description: 'When type is "single", allows closing the open item by clicking its trigger',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all items in the accordion',
    },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Single mode (default)
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
    className: 'w-[400px]',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is a design system?</AccordionTrigger>
        <AccordionContent>
          A design system is a collection of reusable components guided by clear
          standards that can be assembled to build any number of applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why use Tailwind CSS?</AccordionTrigger>
        <AccordionContent>
          Tailwind CSS provides utility-first styling that makes it easy to build
          consistent UIs rapidly without leaving your HTML.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is Radix UI?</AccordionTrigger>
        <AccordionContent>
          Radix UI provides accessible, unstyled component primitives for React
          that handle all the hard accessibility and keyboard interaction work.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// ---------------------------------------------------------------------------
// Multiple mode
// ---------------------------------------------------------------------------

export const Multiple: Story = {
  name: 'Multiple — open several at once',
  args: {
    type: 'multiple',
    className: 'w-[400px]',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Can open multiple at once</AccordionTrigger>
        <AccordionContent>
          This item stays open independently of others. Click another item and
          this one will remain expanded.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second independent item</AccordionTrigger>
        <AccordionContent>
          This item also stays open independently. Multiple items can be expanded
          at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third independent item</AccordionTrigger>
        <AccordionContent>
          All items can be open simultaneously in multiple mode.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// ---------------------------------------------------------------------------
// Default expanded
// ---------------------------------------------------------------------------

export const DefaultExpanded: Story = {
  name: 'Default expanded',
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-2" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Account settings</AccordionTrigger>
        <AccordionContent>
          Manage your account details, email address, and password.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Notifications</AccordionTrigger>
        <AccordionContent>
          Configure how and when you receive notifications. This item is open by
          default.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Billing</AccordionTrigger>
        <AccordionContent>
          View and manage your billing information and subscription.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// ---------------------------------------------------------------------------
// All items expanded (multiple + defaultValue)
// ---------------------------------------------------------------------------

export const AllExpanded: Story = {
  name: 'All items expanded (multiple)',
  render: () => (
    <Accordion
      type="multiple"
      defaultValue={['item-1', 'item-2', 'item-3']}
      className="w-[400px]"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>General information</AccordionTrigger>
        <AccordionContent>
          Basic information about your workspace and organization settings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Security</AccordionTrigger>
        <AccordionContent>
          Two-factor authentication, session management, and security keys.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Integrations</AccordionTrigger>
        <AccordionContent>
          Connected apps, webhooks, and third-party service integrations.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// ---------------------------------------------------------------------------
// Disabled item
// ---------------------------------------------------------------------------

export const DisabledItem: Story = {
  name: 'With disabled item',
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Available section</AccordionTrigger>
        <AccordionContent>
          This section is available and can be expanded normally.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled section (no access)</AccordionTrigger>
        <AccordionContent>
          This content will not be shown because the item is disabled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another available section</AccordionTrigger>
        <AccordionContent>
          This section is also available and works normally.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// ---------------------------------------------------------------------------
// With icons in triggers
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  name: 'With icons in triggers',
  render: () => (
    <Accordion type="single" collapsible className="w-[420px]">
      <AccordionItem value="account">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <UserIcon className="size-4 text-muted-foreground" />
            Account
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Manage your account name, email address, and profile picture.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <ShieldIcon className="size-4 text-muted-foreground" />
            Security
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Change your password, enable two-factor authentication, and manage
          active sessions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="billing">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <CreditCardIcon className="size-4 text-muted-foreground" />
            Billing
          </span>
        </AccordionTrigger>
        <AccordionContent>
          View invoices, update payment methods, and manage your subscription.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="notifications">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <BellIcon className="size-4 text-muted-foreground" />
            Notifications
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Configure email and push notification preferences for your account.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// ---------------------------------------------------------------------------
// Long content item
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  name: 'Long content',
  render: () => (
    <Accordion type="single" collapsible className="w-[420px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Quick answer</AccordionTrigger>
        <AccordionContent>Short and concise answer here.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Detailed explanation</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>
              This accordion item contains a much longer piece of content to
              demonstrate how the component handles multi-paragraph text and
              varying content heights.
            </p>
            <p>
              The animation expands smoothly regardless of how tall the content
              is, thanks to the CSS custom property used by
              animate-accordion-down and animate-accordion-up.
            </p>
            <p>
              You can put any content inside AccordionContent — forms, lists,
              images, or complex layouts. The container will always expand to
              fit.
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Bullet point one</li>
              <li>Bullet point two</li>
              <li>Bullet point three</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another short item</AccordionTrigger>
        <AccordionContent>Brief content here.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// ---------------------------------------------------------------------------
// Nested content (non-nested accordions, content with structure)
// ---------------------------------------------------------------------------

export const NestedContent: Story = {
  name: 'Structured nested content',
  render: () => (
    <Accordion type="single" collapsible className="w-[420px]">
      <AccordionItem value="api-keys">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <KeyIcon className="size-4 text-muted-foreground" />
            API keys
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Your API keys are listed below. Keep them secret.
            </p>
            {['sk-prod-...abc123', 'sk-test-...def456'].map((key) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-md border px-3 py-2 font-mono text-xs"
              >
                <span>{key}</span>
                <span className="text-muted-foreground">Copy</span>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="webhooks">
        <AccordionTrigger>Webhooks</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              No webhooks configured yet.
            </p>
            <button className="text-sm text-primary underline underline-offset-4">
              Add webhook endpoint
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// ---------------------------------------------------------------------------
// Non-collapsible single
// ---------------------------------------------------------------------------

export const NonCollapsible: Story = {
  name: 'Single — non-collapsible',
  render: () => (
    <Accordion type="single" defaultValue="item-1" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Always one open (click others to switch)</AccordionTrigger>
        <AccordionContent>
          With collapsible=false the open item cannot be collapsed by clicking
          its own trigger — only by opening another item.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Click me to open</AccordionTrigger>
        <AccordionContent>
          Now this item is open and the previous one collapsed automatically.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Or click me</AccordionTrigger>
        <AccordionContent>
          One item is always open; the currently open item cannot be toggled
          closed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

// ---------------------------------------------------------------------------
// FAQ pattern
// ---------------------------------------------------------------------------

export const FAQPattern: Story = {
  name: 'FAQ pattern',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Frequently asked questions</h2>
      <Accordion type="single" collapsible>
        {[
          {
            q: 'How do I reset my password?',
            a: 'Click "Forgot password" on the sign-in page and follow the instructions sent to your email.',
          },
          {
            q: 'Can I change my plan at any time?',
            a: 'Yes, you can upgrade or downgrade your plan at any time from the billing settings page.',
          },
          {
            q: 'Is there a free trial?',
            a: 'We offer a 14-day free trial on all plans. No credit card required to start.',
          },
          {
            q: 'How do I invite team members?',
            a: 'Go to Settings > Team and enter the email addresses of the people you want to invite.',
          },
          {
            q: 'What happens to my data if I cancel?',
            a: 'Your data is retained for 30 days after cancellation. You can export it at any time during that period.',
          },
        ].map(({ q, a }, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{q}</AccordionTrigger>
            <AccordionContent>{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
}

// ---------------------------------------------------------------------------
// Interaction tests
// ---------------------------------------------------------------------------

export const CssCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { type: 'single', collapsible: true, className: 'w-[400px]' },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section One</AccordionTrigger>
        <AccordionContent>Content here.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Section One' })
    expect(trigger).toHaveAttribute('data-state', 'closed')
    const styles = window.getComputedStyle(trigger)
    expect(styles.fontWeight).toBe('500')
  },
}

export const ExpandInteraction: Story = {
  tags: ['ai-generated', 'needs-work'],
  args: { type: 'single', collapsible: true, className: 'w-[400px]' },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is a design system?</AccordionTrigger>
        <AccordionContent>A design system is a collection of reusable components.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why use Radix UI?</AccordionTrigger>
        <AccordionContent>Radix provides accessible primitives.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger1 = canvas.getByRole('button', { name: 'What is a design system?' })
    expect(trigger1).toHaveAttribute('data-state', 'closed')
    await userEvent.click(trigger1)
    expect(trigger1).toHaveAttribute('data-state', 'open')
    expect(canvas.getByText('A design system is a collection of reusable components.')).toBeVisible()
    await userEvent.click(trigger1)
    expect(trigger1).toHaveAttribute('data-state', 'closed')
  },
}

