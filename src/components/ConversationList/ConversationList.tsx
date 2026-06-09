import * as React from 'react'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'

export interface Conversation {
  id: string
  title: string
  preview?: string
  timestamp?: string
  active?: boolean
}

export interface ConversationListProps {
  conversations: Conversation[]
  onSelect?: (id: string) => void
  onDelete?: (id: string) => void
  onRename?: (id: string, newTitle: string) => void
  className?: string
}

function ConversationList({
  conversations,
  onSelect,
  onDelete,
  onRename,
  className,
}: ConversationListProps) {
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editingValue, setEditingValue] = React.useState('')
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)

  const startEditing = (conv: Conversation) => {
    setEditingId(conv.id)
    setEditingValue(conv.title)
  }

  const commitEdit = (id: string) => {
    if (editingValue.trim()) {
      onRename?.(id, editingValue.trim())
    }
    setEditingId(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') commitEdit(id)
    if (e.key === 'Escape') setEditingId(null)
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="p-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2"
          aria-label="New chat"
        >
          <PlusIcon className="size-4" />
          New chat
        </Button>
      </div>
      <div className="flex flex-col gap-0.5 px-2 overflow-y-auto flex-1">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={cn(
              'group relative flex items-center rounded-md px-2 py-2 cursor-pointer transition-colors',
              conv.active
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-accent/50'
            )}
            onClick={() => !editingId && onSelect?.(conv.id)}
            onMouseEnter={() => setHoveredId(conv.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex min-w-0 flex-1 flex-col">
              {editingId === conv.id ? (
                <input
                  className="w-full rounded border border-input bg-background px-1.5 py-0.5 text-sm outline-none focus:ring-1 focus:ring-ring"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  onBlur={() => commitEdit(conv.id)}
                  onKeyDown={(e) => handleKeyDown(e, conv.id)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              ) : (
                <span
                  className="truncate text-sm font-medium"
                  onDoubleClick={(e) => {
                    e.stopPropagation()
                    startEditing(conv)
                  }}
                >
                  {conv.title}
                </span>
              )}
              {conv.preview && editingId !== conv.id && (
                <span className="truncate text-xs text-muted-foreground">
                  {conv.preview}
                </span>
              )}
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              {conv.timestamp && hoveredId !== conv.id && (
                <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
              )}
              {(hoveredId === conv.id || conv.active) && onDelete && (
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(conv.id)
                  }}
                  aria-label={`Delete ${conv.title}`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2Icon />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ConversationList }
