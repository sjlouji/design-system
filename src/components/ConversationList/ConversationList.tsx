import * as React from 'react'
import { PlusIcon, Trash2Icon, PencilIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Conversation {
  id: string
  title: string
  preview?: string
  timestamp?: string
  active?: boolean
  group?: string
}

export interface ConversationListProps {
  conversations: Conversation[]
  onNew?: () => void
  onSelect?: (id: string) => void
  onDelete?: (id: string) => void
  onRename?: (id: string, newTitle: string) => void
  className?: string
}

function ConversationList({
  conversations,
  onNew,
  onSelect,
  onDelete,
  onRename,
  className,
}: ConversationListProps) {
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editingValue, setEditingValue] = React.useState('')

  const startEditing = (conv: Conversation, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingId(conv.id)
    setEditingValue(conv.title)
  }

  const commitEdit = (id: string) => {
    if (editingValue.trim()) onRename?.(id, editingValue.trim())
    setEditingId(null)
  }

  const handleEditKey = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') commitEdit(id)
    if (e.key === 'Escape') setEditingId(null)
  }

  // Group conversations if `group` is provided
  const groups = React.useMemo(() => {
    const map = new Map<string, Conversation[]>()
    for (const conv of conversations) {
      const key = conv.group ?? ''
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(conv)
    }
    return map
  }, [conversations])

  const hasGroups = conversations.some((c) => c.group)

  const renderItem = (conv: Conversation) => (
    <div
      key={conv.id}
      role="button"
      tabIndex={0}
      className={cn(
        'group relative flex items-center gap-2 rounded-lg px-2.5 py-2 cursor-pointer',
        'transition-colors duration-100 outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring/60',
        conv.active
          ? [
            'bg-[oklch(0.905_0.043_259)] text-[oklch(0.482_0.171_259)]',
            'dark:bg-[oklch(0.32_0.03_259)] dark:text-[oklch(0.633_0.165_259)]',
          ].join(' ')
          : 'text-foreground hover:bg-muted/60 dark:hover:bg-muted/30',
      )}
      onClick={() => !editingId && onSelect?.(conv.id)}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect?.(conv.id) }}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {editingId === conv.id ? (
          <input
            className={cn(
              'w-full rounded-md border border-ring/40 bg-background px-2 py-0.5',
              'text-sm text-foreground outline-none focus:ring-1 focus:ring-ring/60',
            )}
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
            onBlur={() => commitEdit(conv.id)}
            onKeyDown={(e) => handleEditKey(e, conv.id)}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <span className="truncate text-sm font-medium leading-snug">{conv.title}</span>
        )}
        {conv.preview && editingId !== conv.id && (
          <span className="truncate text-xs text-muted-foreground/70 leading-none">{conv.preview}</span>
        )}
      </div>

      {/* Hover actions */}
      <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-100">
        {conv.timestamp && !onDelete && !onRename && (
          <span className="text-[11px] text-muted-foreground/60 tabular-nums">{conv.timestamp}</span>
        )}
        {onRename && (
          <button
            type="button"
            onClick={(e) => startEditing(conv, e)}
            aria-label={`Rename ${conv.title}`}
            className={cn(
              'flex size-6 items-center justify-center rounded-md',
              'text-muted-foreground hover:text-foreground hover:bg-background/60',
              'transition-colors duration-100',
            )}
          >
            <PencilIcon className="size-3" />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDelete(conv.id) }}
            aria-label={`Delete ${conv.title}`}
            className={cn(
              'flex size-6 items-center justify-center rounded-md',
              'text-muted-foreground hover:text-destructive hover:bg-destructive/10',
              'transition-colors duration-100',
            )}
          >
            <Trash2Icon className="size-3" />
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {/* New chat button */}
      <div className="px-2 pb-1">
        <button
          type="button"
          onClick={onNew}
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-3 py-2',
            'text-sm font-medium text-muted-foreground',
            'border border-dashed border-border/60',
            'hover:border-primary/40 hover:text-primary hover:bg-primary/5',
            'dark:hover:bg-primary/10',
            'transition-colors duration-150 outline-none',
            'focus-visible:ring-2 focus-visible:ring-ring/60',
          )}
        >
          <PlusIcon className="size-4" />
          New chat
        </button>
      </div>

      {/* Conversation items */}
      <div className="flex flex-col gap-0.5 px-2 overflow-y-auto flex-1">
        {hasGroups ? (
          Array.from(groups.entries()).map(([group, items]) => (
            <div key={group} className="mb-2">
              {group && (
                <p className="px-2.5 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {group}
                </p>
              )}
              {items.map(renderItem)}
            </div>
          ))
        ) : (
          conversations.map(renderItem)
        )}
      </div>
    </div>
  )
}

export { ConversationList }
