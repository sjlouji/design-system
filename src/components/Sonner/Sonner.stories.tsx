import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { Toaster, useToasts } from './Sonner'

const btn = {
  background: 'oklch(0.541 0.191 259)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '6px 14px',
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 500,
}

const btnSecondary = {
  ...btn,
  background: 'transparent',
  color: 'oklch(0.541 0.191 259)',
  border: '1px solid oklch(0.541 0.191 259 / 0.4)',
}

const row = { display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'center' }

const meta = {
  title: 'Components/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <button style={btn} onClick={() => toast('Event has been created', { description: 'Monday, January 3rd at 6:00pm' })}>
        Show Toast
      </button>
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div style={row}>
      <Toaster />
      <button style={btn} onClick={() => toast.success('Saved successfully')}>Success</button>
      <button style={btn} onClick={() => toast.error('Something went wrong')}>Error</button>
      <button style={btn} onClick={() => toast.warning('Context window at 90%')}>Warning</button>
      <button style={btn} onClick={() => toast.info('New version available')}>Info</button>
      <button style={btn} onClick={() => toast.loading('Uploading…')}>Loading</button>
    </div>
  ),
}

export const WithAction: Story = {
  render: () => (
    <div style={row}>
      <Toaster />
      <button
        style={btn}
        onClick={() =>
          toast('File deleted', {
            description: 'report-q4-2024.pdf has been removed.',
            action: { label: 'Undo', onClick: () => toast.success('File restored') },
          })
        }
      >
        Delete with Undo
      </button>
      <button
        style={btn}
        onClick={() =>
          toast.error('Failed to send message', {
            description: 'Check your connection and try again.',
            action: { label: 'Retry', onClick: () => toast.loading('Retrying…') },
          })
        }
      >
        Error with Retry
      </button>
    </div>
  ),
}

// useToasts hook examples

const UndoDemo = () => {
  const toasts = useToasts()
  return (
    <div style={row}>
      <Toaster />
      <button
        style={btn}
        onClick={() =>
          toasts.message({
            text: 'Conversation archived',
            description: 'You can restore it from the archive.',
            onUndoAction: () => toasts.success('Conversation restored'),
          })
        }
      >
        Archive (with Undo)
      </button>
      <button
        style={btnSecondary}
        onClick={() =>
          toasts.message({
            text: 'Settings saved',
            action: 'View',
            onAction: () => {},
          })
        }
      >
        Save with Action
      </button>
      <button
        style={btnSecondary}
        onClick={() =>
          toasts.message({
            text: 'Rate limit warning',
            description: 'You have used 90% of your monthly tokens.',
            preserve: true,
            action: 'Upgrade',
            onAction: () => toast.dismiss(),
          })
        }
      >
        Persistent Toast
      </button>
    </div>
  )
}

export const UseToastsHook: Story = {
  name: 'useToasts hook',
  render: () => <UndoDemo />,
}

// Promise toast

const simulateUpload = () =>
  new Promise<{ name: string }>((resolve, reject) =>
    setTimeout(() => {
      Math.random() > 0.4
        ? resolve({ name: 'report-q4.pdf' })
        : reject(new Error('Upload failed'))
    }, 2000)
  )

const PromiseDemo = () => {
  const toasts = useToasts()
  return (
    <div style={row}>
      <Toaster />
      <button
        style={btn}
        onClick={() =>
          toasts.promise(simulateUpload(), {
            loading: 'Uploading file…',
            success: (data) => `${data.name} uploaded successfully`,
            error: 'Upload failed — please try again',
          })
        }
      >
        Upload File (Promise)
      </button>
      <button
        style={btnSecondary}
        onClick={() => {
          const p = new Promise<void>((resolve) => setTimeout(resolve, 1500))
          toast.promise(p, {
            loading: 'Saving changes…',
            success: 'Changes saved',
            error: 'Failed to save',
          })
        }}
      >
        Save (always succeeds)
      </button>
    </div>
  )
}

export const PromiseToast: Story = {
  name: 'Promise (loading → success/error)',
  render: () => <PromiseDemo />,
}

export const Stacked: Story = {
  name: 'Stacked (hover to expand)',
  render: () => (
    <div>
      <Toaster />
      <button
        style={btn}
        onClick={() => {
          toast('Message sent')
          toast.success('File uploaded')
          toast.error('Rate limit reached')
          toast.info('2 new notifications')
          toast.warning('Context window at 90%')
        }}
      >
        Fire 5 Toasts
      </button>
    </div>
  ),
}

export const Expanded: Story = {
  name: 'Expanded (always open)',
  args: { expand: true },
  render: (args) => (
    <div>
      <Toaster {...args} />
      <button
        style={btn}
        onClick={() => {
          toast('First notification')
          toast.success('Second notification')
          toast.warning('Third notification')
        }}
      >
        Fire 3 Toasts
      </button>
    </div>
  ),
}
