import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileAttachment } from './FileAttachment'

const meta = {
  title: 'AI/FileAttachment',
  component: FileAttachment,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    filename: {
      control: 'text',
      description: 'Name of the file shown as the primary label. Truncates with ellipsis when the container is narrow.',
    },
    size: {
      control: 'text',
      description: 'Human-readable file size string displayed as secondary muted text below the filename (e.g. "2.4 MB"). Omit to hide.',
    },
    type: {
      control: 'text',
      description: 'MIME type or extension used to choose the icon. "image/*" types show an image icon; "application/pdf" or "pdf" shows a document icon; all other types fall back to a generic file icon.',
    },
    url: {
      control: 'text',
      description: 'When provided, wraps the entire chip in an `<a download>` tag so clicking it downloads the file. Omit for display-only chips.',
    },
    onRemove: {
      action: 'onRemove',
      description: 'When provided, renders a ghost icon button (×) on the right. Called with no arguments when the button is clicked. Typically used to remove the file from an upload queue.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the chip container.',
    },
  },
} satisfies Meta<typeof FileAttachment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    filename: 'document.txt',
    size: '12 KB',
    type: 'text/plain',
    url: undefined,
  },
}

export const PDFFile: Story = {
  args: {
    filename: 'report-q4-2024.pdf',
    size: '2.4 MB',
    type: 'application/pdf',
  },
}

export const ImageFile: Story = {
  args: {
    filename: 'screenshot.png',
    size: '845 KB',
    type: 'image/png',
  },
}

export const WithRemove: Story = {
  args: {
    filename: 'data-export.csv',
    size: '1.1 MB',
    type: 'text/csv',
    onRemove: () => alert('Remove clicked'),
  },
}

export const WithDownload: Story = {
  args: {
    filename: 'presentation.pdf',
    size: '5.6 MB',
    type: 'application/pdf',
    url: '/files/presentation.pdf',
  },
}
