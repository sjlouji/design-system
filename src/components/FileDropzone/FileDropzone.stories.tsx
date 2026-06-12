import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImageIcon, FileTextIcon } from 'lucide-react'
import { FileDropzone } from './FileDropzone'

const meta = {
  title: 'Components/FileDropzone',
  component: FileDropzone,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    accept: {
      control: 'text',
      description: 'Comma-separated list of accepted file types. Supports MIME types ("image/png"), wildcard MIME groups ("image/*"), and file extensions (".pdf"). Files that do not match are passed to `onFilesRejected`. Omit to accept any file.',
    },
    multiple: {
      control: 'boolean',
      description: 'When true, multiple files can be dropped or selected at once. When false (default), only the first file of each drop event is processed.',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum allowed file size in bytes. Files exceeding this are passed to `onFilesRejected` with a "File size exceeds …" reason. Omit for no size limit.',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, disables all interaction — pointer events are blocked, keyboard focus is removed, and the zone is dimmed with 50% opacity.',
    },
    onFilesAccepted: {
      action: 'onFilesAccepted',
      description: 'Called with the array of `File` objects that passed all validation rules (type and size). Fires immediately after a drop or file-picker selection.',
    },
    onFilesRejected: {
      action: 'onFilesRejected',
      description: 'Called with the array of rejected `File` objects and a human-readable reason string when any files fail type or size validation.',
    },
    children: {
      control: false,
      description: 'Optional custom content rendered inside the drop zone. When omitted, a default cloud-upload icon with instructional text is shown. Use to provide branded or context-specific copy.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the drop zone container.',
    },
  },
} satisfies Meta<typeof FileDropzone>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    accept: undefined,
    multiple: false,
    maxSize: undefined,
    disabled: false,
  },
}

export const ImagesOnly: Story = {
  args: {
    accept: 'image/*',
    multiple: true,
  },
}

export const PDFOnly: Story = {
  args: {
    accept: '.pdf',
  },
}

export const MultipleFiles: Story = {
  args: {
    multiple: true,
  },
}

export const WithMaxSize: Story = {
  args: {
    maxSize: 5 * 1024 * 1024,
    accept: 'image/*',
    multiple: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const CustomContent: Story = {
  args: {},
  render: () => (
    <FileDropzone accept="image/*" multiple>
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-3">
          <ImageIcon className="size-8 text-muted-foreground" />
          <FileTextIcon className="size-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-semibold">Drop your images here</p>
        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
      </div>
    </FileDropzone>
  ),
}
