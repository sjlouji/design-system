import {
  FileIcon,
  XIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FileDropzone } from '@/components/FileDropzone'
import { Progress } from '@/components/Progress'
import { Spinner } from '@/components/Spinner'

export interface UploadFile {
  id: string
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

export interface FileUploadProps {
  onUpload?: (files: File[]) => void
  files?: UploadFile[]
  onRemove?: (fileId: string) => void
  accept?: string
  multiple?: boolean
  maxSize?: number
  disabled?: boolean
  className?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileStatusIcon({ status }: { status: UploadFile['status'] }) {
  if (status === 'uploading') return <Spinner size="sm" className="text-primary" />
  if (status === 'done') return <CheckCircleIcon className="size-4 text-green-500" />
  if (status === 'error') return <AlertCircleIcon className="size-4 text-destructive" />
  return <ClockIcon className="size-4 text-muted-foreground" />
}

function FileUpload({
  onUpload,
  files = [],
  onRemove,
  accept,
  multiple = false,
  maxSize,
  disabled = false,
  className,
}: FileUploadProps) {
  function handleFilesAccepted(accepted: File[]) {
    onUpload?.(accepted)
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <FileDropzone
        accept={accept}
        multiple={multiple}
        maxSize={maxSize}
        onFilesAccepted={handleFilesAccepted}
        disabled={disabled}
      />
      {files.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label="Uploaded files">
          {files.map((uploadFile) => (
            <li
              key={uploadFile.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
            >
              <FileIcon className="size-5 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium text-foreground">
                    {uploadFile.file.name}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatBytes(uploadFile.file.size)}
                  </span>
                </div>
                {uploadFile.status === 'uploading' && (
                  <Progress
                    value={uploadFile.progress}
                    className="mt-1.5 h-1.5"
                    aria-label={`Upload progress for ${uploadFile.file.name}`}
                  />
                )}
                {uploadFile.status === 'error' && uploadFile.error && (
                  <p className="mt-0.5 text-xs text-destructive">{uploadFile.error}</p>
                )}
              </div>
              <FileStatusIcon status={uploadFile.status} />
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(uploadFile.id)}
                  aria-label={`Remove ${uploadFile.file.name}`}
                  className="shrink-0 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <XIcon className="size-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { FileUpload }
