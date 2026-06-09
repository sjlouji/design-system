import * as React from 'react'
import { UploadCloudIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FileDropzoneProps {
  accept?: string
  multiple?: boolean
  maxSize?: number
  onFilesAccepted?: (files: File[]) => void
  onFilesRejected?: (files: File[], reason: string) => void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function matchesAccept(file: File, accept: string): boolean {
  const parts = accept.split(',').map((p) => p.trim())
  return parts.some((part) => {
    if (part.startsWith('.')) {
      return file.name.toLowerCase().endsWith(part.toLowerCase())
    }
    if (part.endsWith('/*')) {
      return file.type.startsWith(part.slice(0, -1))
    }
    return file.type === part
  })
}

function FileDropzone({
  accept,
  multiple = false,
  maxSize,
  onFilesAccepted,
  onFilesRejected,
  disabled = false,
  className,
  children,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dragCountRef = React.useRef(0)

  function processFiles(rawFiles: File[]) {
    const accepted: File[] = []
    const rejected: File[] = []
    let rejectionReason = ''

    for (const file of rawFiles) {
      let ok = true
      if (maxSize && file.size > maxSize) {
        ok = false
        rejectionReason = `File size exceeds ${formatBytes(maxSize)}`
      }
      if (accept && !matchesAccept(file, accept)) {
        ok = false
        rejectionReason = `File type not accepted`
      }
      if (ok) {
        accepted.push(file)
      } else {
        rejected.push(file)
      }
    }

    if (accepted.length) onFilesAccepted?.(accepted)
    if (rejected.length) onFilesRejected?.(rejected, rejectionReason)
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    dragCountRef.current++
    setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    dragCountRef.current--
    if (dragCountRef.current === 0) setIsDragging(false)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    dragCountRef.current = 0
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (!files.length) return
    processFiles(multiple ? files : [files[0]])
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    processFiles(files)
    e.target.value = ''
  }

  function handleClick() {
    inputRef.current?.click()
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="File upload dropzone"
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleClick() : undefined}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn(
        'flex min-h-[160px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-colors',
        isDragging && 'border-primary bg-primary/5',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        disabled={disabled}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />
      {children ?? (
        <div className="flex flex-col items-center gap-2">
          <UploadCloudIcon className="size-12 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            Drag &amp; drop files here
          </p>
          <p className="text-sm text-muted-foreground">
            or{' '}
            <span className="text-primary underline-offset-4 hover:underline">
              browse
            </span>
          </p>
          {(accept || maxSize) && (
            <p className="text-xs text-muted-foreground">
              {[
                accept && `Accepted: ${accept}`,
                maxSize && `Max size: ${formatBytes(maxSize)}`,
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export { FileDropzone }
