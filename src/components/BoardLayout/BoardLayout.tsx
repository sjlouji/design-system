import * as React from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  useDraggable,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/Badge'

export interface BoardCard {
  id: string
  title: string
  description?: string
  badge?: string
  assignee?: { name: string; avatar?: string }
  priority?: 'low' | 'medium' | 'high' | 'critical'
}

export interface BoardColumn {
  id: string
  title: string
  cards: BoardCard[]
  color?: string
}

export interface BoardLayoutProps {
  columns: BoardColumn[]
  onCardMove?: (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    newIndex: number,
  ) => void
  onColumnsChange?: (columns: BoardColumn[]) => void
  className?: string
}

const priorityStyles: Record<NonNullable<BoardCard['priority']>, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
}

interface BoardCardProps {
  card: BoardCard
  isDragging?: boolean
}

export function BoardCardComponent({ card, isDragging }: BoardCardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing shadow-xs hover:shadow-sm transition-shadow',
        isDragging && 'opacity-50',
      )}
    >
      <p className="text-sm font-medium leading-snug">{card.title}</p>
      {card.description && (
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
          {card.description}
        </p>
      )}
      {(card.badge || card.priority || card.assignee) && (
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          {card.priority && (
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize',
                priorityStyles[card.priority],
              )}
            >
              {card.priority}
            </span>
          )}
          {card.badge && (
            <Badge variant="secondary" className="text-xs">
              {card.badge}
            </Badge>
          )}
          {card.assignee && (
            <div className="ml-auto flex items-center gap-1">
              {card.assignee.avatar ? (
                <img
                  src={card.assignee.avatar}
                  alt={card.assignee.name}
                  className="size-5 rounded-full object-cover"
                />
              ) : (
                <span className="size-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {card.assignee.name[0]?.toUpperCase()}
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                {card.assignee.name}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface DraggableCardProps {
  card: BoardCard
}

function DraggableCard({ card }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: card.id,
  })

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <BoardCardComponent card={card} isDragging={isDragging} />
    </div>
  )
}

interface BoardColumnContainerProps {
  column: BoardColumn
}

export function BoardColumnContainer({ column }: BoardColumnContainerProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  return (
    <div className="w-72 flex-shrink-0 flex flex-col gap-3">
      {/* Column header */}
      <div className="flex items-center gap-2 px-1">
        {column.color && (
          <span
            className="size-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: column.color }}
          />
        )}
        <h3 className="text-sm font-semibold flex-1 truncate">{column.title}</h3>
        <Badge variant="secondary">{column.cards.length}</Badge>
      </div>

      {/* Cards drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          'flex flex-col gap-2 rounded-lg p-2 min-h-16 transition-colors',
          isOver ? 'bg-accent/50' : 'bg-muted/30',
        )}
      >
        {column.cards.map((card) => (
          <DraggableCard key={card.id} card={card} />
        ))}
        {column.cards.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">
            Drop cards here
          </p>
        )}
      </div>
    </div>
  )
}

export function BoardLayout({
  columns: initialColumns,
  onCardMove,
  onColumnsChange,
  className,
}: BoardLayoutProps) {
  const [columns, setColumns] = React.useState<BoardColumn[]>(initialColumns)
  const [activeCardId, setActiveCardId] = React.useState<string | null>(null)

  // Sync external prop changes
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setColumns(initialColumns)
  }, [initialColumns])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function findCardColumn(cardId: string): BoardColumn | undefined {
    return columns.find((col) => col.cards.some((c) => c.id === cardId))
  }

  function findCard(cardId: string): BoardCard | undefined {
    for (const col of columns) {
      const card = col.cards.find((c) => c.id === cardId)
      if (card) return card
    }
    return undefined
  }

  function handleDragStart({ active }: DragStartEvent) {
    setActiveCardId(active.id as string)
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveCardId(null)
    if (!over) return

    const cardId = active.id as string
    const targetColumnId = over.id as string

    const fromColumn = findCardColumn(cardId)
    const toColumn = columns.find((c) => c.id === targetColumnId)

    if (!fromColumn || !toColumn) return
    if (fromColumn.id === toColumn.id) return

    const card = fromColumn.cards.find((c) => c.id === cardId)!
    const newIndex = toColumn.cards.length

    const updated = columns.map((col) => {
      if (col.id === fromColumn.id) {
        return { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
      }
      if (col.id === toColumn.id) {
        return { ...col, cards: [...col.cards, card] }
      }
      return col
    })

    setColumns(updated)
    onCardMove?.(cardId, fromColumn.id, toColumn.id, newIndex)
    onColumnsChange?.(updated)
  }

  const activeCard = activeCardId ? findCard(activeCardId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className={cn(
          'flex gap-4 overflow-x-auto pb-4',
          className,
        )}
      >
        {columns.map((column) => (
          <BoardColumnContainer key={column.id} column={column} />
        ))}
      </div>
      <DragOverlay>
        {activeCard && (
          <div className="rotate-2 opacity-90">
            <BoardCardComponent card={activeCard} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
