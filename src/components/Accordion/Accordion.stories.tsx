import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
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
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

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
          standards.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why use Tailwind CSS?</AccordionTrigger>
        <AccordionContent>
          Tailwind CSS provides utility-first styling that makes it easy to build
          consistent UIs rapidly.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is Radix UI?</AccordionTrigger>
        <AccordionContent>
          Radix UI provides accessible, unstyled component primitives for React.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Single: Story = {
  args: {
    type: 'single',
    collapsible: true,
    className: 'w-[400px]',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section One</AccordionTrigger>
        <AccordionContent>Content for section one.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section Two</AccordionTrigger>
        <AccordionContent>Content for section two.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section Three</AccordionTrigger>
        <AccordionContent>Content for section three.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  args: {
    type: 'multiple',
    className: 'w-[400px]',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Can open multiple at once</AccordionTrigger>
        <AccordionContent>This item stays open independently.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second independent item</AccordionTrigger>
        <AccordionContent>This item also stays open independently.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third independent item</AccordionTrigger>
        <AccordionContent>All items can be open simultaneously.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

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
