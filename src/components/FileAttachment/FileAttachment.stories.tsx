import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileAttachment } from './FileAttachment'

const meta = {
  title: 'AI/FileAttachment',
  component: FileAttachment,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FileAttachment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    filename: 'document.txt',
    size: '12 KB',
    type: 'text/plain',
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
