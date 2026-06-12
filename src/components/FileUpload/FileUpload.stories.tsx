import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileUpload } from './FileUpload'
import type { UploadFile } from './FileUpload'

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
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
    onUpload: {
      action: 'onUpload',
      description: 'Called when the user drops or selects files. Receives the accepted `File[]` array. Use this to begin the upload process and populate the `files` prop.',
    },
    files: {
      control: false,
      description: 'Array of `UploadFile` objects to display below the dropzone. Each entry tracks `id`, `file`, `progress` (0–100), `status` ("pending" | "uploading" | "done" | "error"), and an optional `error` message.',
    },
    onRemove: {
      action: 'onRemove',
      description: 'Called when the user clicks the remove (×) button on a file row. Receives the `id` string of the file to remove. When omitted, remove buttons are hidden.',
    },
    accept: {
      control: 'text',
      description: 'MIME type filter passed to the underlying file input (e.g. "image/*", ".pdf,.docx"). Omit to accept all file types.',
    },
    multiple: {
      control: 'boolean',
      description: 'When true, the dropzone allows picking or dropping more than one file at a time.',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum allowed file size in bytes. Files exceeding this limit are rejected before `onUpload` fires.',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, the dropzone and all file row interactions are disabled.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes applied to the root wrapper `<div>`.',
    },
  },
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

const makeMockFile = (name: string, size: number): File =>
  new File(['x'.repeat(size)], name, { type: 'text/plain' })

const uploadingFiles: UploadFile[] = [
  {
    id: '1',
    file: makeMockFile('report.pdf', 204800),
    progress: 65,
    status: 'uploading',
  },
  {
    id: '2',
    file: makeMockFile('image.png', 1048576),
    progress: 30,
    status: 'uploading',
  },
]

const mixedFiles: UploadFile[] = [
  {
    id: '1',
    file: makeMockFile('report.pdf', 204800),
    progress: 100,
    status: 'done',
  },
  {
    id: '2',
    file: makeMockFile('data.csv', 512000),
    progress: 100,
    status: 'done',
  },
  {
    id: '3',
    file: makeMockFile('corrupt.zip', 2048),
    progress: 0,
    status: 'error',
    error: 'Upload failed. Please try again.',
  },
  {
    id: '4',
    file: makeMockFile('pending.docx', 98304),
    progress: 0,
    status: 'pending',
  },
]

export const Default: Story = {
  args: {
    multiple: false,
    disabled: false,
    accept: undefined,
    maxSize: undefined,
  },
}

export const WithUploadingFiles: Story = {
  args: {
    files: uploadingFiles,
  },
}

export const WithMixedStatuses: Story = {
  args: {
    files: mixedFiles,
    onRemove: (id) => console.log('Remove', id),
  },
}

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    files: mixedFiles,
    onRemove: (id) => console.log('Remove', id),
  },
}

export const ImagesOnly: Story = {
  args: {
    accept: 'image/*',
    multiple: true,
  },
}

export const WithMaxSize: Story = {
  args: {
    maxSize: 10 * 1024 * 1024,
    multiple: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    files: mixedFiles,
  },
}
