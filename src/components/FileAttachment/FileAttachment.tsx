/* eslint-disable react-hooks/static-components */
import { FileIcon, FileTextIcon, ImageIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'

export interface FileAttachmentProps {
  filename: string
  size?: string
  type?: string
  url?: string
  onRemove?: () => void
  className?: string
}

function getFileIcon(type?: string) {
  if (!type) return FileIcon
  if (type.startsWith('image/')) return ImageIcon
  if (type === 'application/pdf' || type === 'pdf') return FileTextIcon
  return FileIcon
}

function FileAttachment({
  filename,
  size,
  type,
  url,
  onRemove,
  className,
}: FileAttachmentProps) {
  const Icon = getFileIcon(type)

  const inner = (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-3 py-2',
        className
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-background">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium">{filename}</span>
        {size && (
          <span className="text-xs text-muted-foreground">{size}</span>
        )}
      </div>
      {onRemove && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onRemove()
          }}
          aria-label="Remove file"
        >
          <XIcon className="size-4" />
        </Button>
      )}
    </div>
  )

  if (url) {
    return (
      <a href={url} download={filename} className="block w-fit">
        {inner}
      </a>
    )
  }

  return inner
}

export { FileAttachment }
