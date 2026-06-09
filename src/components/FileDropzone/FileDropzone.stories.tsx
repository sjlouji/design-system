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
} satisfies Meta<typeof FileDropzone>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
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
