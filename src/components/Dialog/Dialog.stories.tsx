import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './Dialog'
import { Button } from '@/components/Button'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">Profile form content goes here.</p>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const CssCheck: Story = {
  tags: ['ai-generated', 'needs-work'],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes here.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Open Dialog' })
    const styles = window.getComputedStyle(trigger)
    expect(styles.display).toBe('inline-flex')
  },
}

export const OpenCloseInteraction: Story = {
  tags: ['ai-generated', 'needs-work'],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription>Are you sure you want to continue?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Open' })
    expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
    await userEvent.click(trigger)
    const dialog = await within(document.body).findByRole('dialog')
    expect(dialog).toBeVisible()
    expect(within(dialog).getByText('Confirmation')).toBeVisible()
    const closeBtn = within(document.body).getByRole('button', { name: /close/i })
    await userEvent.click(closeBtn)
  },
}
