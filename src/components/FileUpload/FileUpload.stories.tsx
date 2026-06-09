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
  args: {},
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
