import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TrashIcon, LogOutIcon, AlertTriangleIcon, ShieldAlertIcon } from 'lucide-react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogMedia,
} from './AlertDialog'

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    open: { control: 'boolean', description: 'Controlled open state' },
    defaultOpen: { control: 'boolean', description: 'Initial open state (uncontrolled)' },
    onOpenChange: { action: 'onOpenChange' },
  },
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Basic usage
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// ---------------------------------------------------------------------------
// Destructive confirm
// ---------------------------------------------------------------------------

export const DestructiveConfirm: Story = {
  name: 'Destructive confirm',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <TrashIcon />
          Delete account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete account permanently?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your account, all your projects, and
            associated data. This action is irreversible and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete account</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// ---------------------------------------------------------------------------
// Custom button labels
// ---------------------------------------------------------------------------

export const CustomButtonLabels: Story = {
  name: 'Custom button labels',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <LogOutIcon />
          Sign out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be redirected to the login page. Any unsaved changes will
            be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay signed in</AlertDialogCancel>
          <AlertDialogAction>Yes, sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// ---------------------------------------------------------------------------
// Size: sm
// ---------------------------------------------------------------------------

export const SizeSmall: Story = {
  name: 'Size: sm',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open small dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm action</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// ---------------------------------------------------------------------------
// With media
// ---------------------------------------------------------------------------

export const WithMedia: Story = {
  name: 'With media icon',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open with media</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <AlertTriangleIcon className="text-amber-500" />
          </AlertDialogMedia>
          <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. If you leave now, your changes will be
            lost. Do you want to save before leaving?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Discard changes</AlertDialogCancel>
          <AlertDialogAction>Save changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const WithDestructiveMedia: Story = {
  name: 'With destructive media icon',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <ShieldAlertIcon className="text-destructive" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            All files, collaborators, and history associated with this project
            will be permanently removed. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete project</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// ---------------------------------------------------------------------------
// Long content
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  name: 'Long content',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">View terms</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Accept updated terms of service</AlertDialogTitle>
          <AlertDialogDescription>
            We have updated our Terms of Service effective July 1st, 2026. Key
            changes include: (1) Updated data retention policies — we now retain
            logs for 90 days instead of 30. (2) Revised billing terms for
            enterprise customers. (3) New acceptable use provisions covering AI
            features. (4) Updated GDPR compliance clauses for EU residents.
            (5) Changes to our dispute resolution process. By clicking "I
            accept", you acknowledge that you have read and agree to the new
            terms. You must accept the updated terms to continue using the
            service.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Decline</AlertDialogCancel>
          <AlertDialogAction>I accept</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// ---------------------------------------------------------------------------
// With onConfirm / onCancel callbacks
// ---------------------------------------------------------------------------

export const WithCallbacks: Story = {
  name: 'With callbacks',
  render: () => {
    const [result, setResult] = React.useState<string | null>(null)
    return (
      <div className="flex flex-col items-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Open dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm action</AlertDialogTitle>
              <AlertDialogDescription>
                Choose confirm or cancel to see the callback result.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setResult('Cancelled')}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => setResult('Confirmed')}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {result && (
          <p className="text-sm text-muted-foreground">
            Result:{' '}
            <span className="font-medium text-foreground">{result}</span>
          </p>
        )}
      </div>
    )
  },
}

// ---------------------------------------------------------------------------
// With form inside
// ---------------------------------------------------------------------------

export const WithFormInside: Story = {
  name: 'With form inside',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete workspace</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete workspace</AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent. To confirm, type the workspace name{' '}
            <span className="font-medium text-foreground">my-workspace</span>{' '}
            below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-2 py-2">
          <Label htmlFor="confirm-name">Workspace name</Label>
          <Input id="confirm-name" placeholder="my-workspace" />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Delete workspace
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// ---------------------------------------------------------------------------
// Title only (no description)
// ---------------------------------------------------------------------------

export const TitleOnly: Story = {
  name: 'Title only (no description)',
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, go back</AlertDialogCancel>
          <AlertDialogAction>Yes, proceed</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

// ---------------------------------------------------------------------------
// Controlled open state
// ---------------------------------------------------------------------------

export const Controlled: Story = {
  name: 'Controlled open state',
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setOpen(true)}>
            Open externally
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)} disabled={!open}>
            Close externally
          </Button>
        </div>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Controlled dialog</AlertDialogTitle>
              <AlertDialogDescription>
                This dialog's open state is managed externally.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <p className="text-sm text-muted-foreground">
          Dialog is:{' '}
          <span className="font-medium text-foreground">
            {open ? 'open' : 'closed'}
          </span>
        </p>
      </div>
    )
  },
}

// ---------------------------------------------------------------------------
// Action button variants side by side
// ---------------------------------------------------------------------------

export const ActionVariants: Story = {
  name: 'Action button variants',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="outline">Default action</Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Default action</AlertDialogTitle>
            <AlertDialogDescription>
              The confirm button uses the default variant.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="default">Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="outline">Destructive action</Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Destructive action</AlertDialogTitle>
            <AlertDialogDescription>
              The confirm button uses the destructive variant.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
}
