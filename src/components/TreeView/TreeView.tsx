/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/Badge'

export interface TreeNode {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeNode[]
  disabled?: boolean
  badge?: string | number
}

export interface TreeViewProps {
  nodes: TreeNode[]
  defaultExpanded?: string[]
  selected?: string
  onSelect?: (nodeId: string) => void
  className?: string
}

interface FlatNode {
  id: string
  label: string
  parentId?: string
  icon?: React.ReactNode
  disabled?: boolean
  badge?: string | number
}

export function buildTree(flatNodes: FlatNode[]): TreeNode[] {
  const map = new Map<string, TreeNode>()
  const roots: TreeNode[] = []

  for (const node of flatNodes) {
    map.set(node.id, {
      id: node.id,
      label: node.label,
      icon: node.icon,
      disabled: node.disabled,
      badge: node.badge,
      children: [],
    })
  }

  for (const node of flatNodes) {
    const treeNode = map.get(node.id)!
    if (node.parentId) {
      const parent = map.get(node.parentId)
      if (parent) {
        parent.children = parent.children ?? []
        parent.children.push(treeNode)
      }
    } else {
      roots.push(treeNode)
    }
  }

  // Clean up empty children arrays
  const clean = (node: TreeNode): TreeNode => ({
    ...node,
    children: node.children && node.children.length > 0
      ? node.children.map(clean)
      : undefined,
  })

  return roots.map(clean)
}

interface TreeNodeItemProps {
  node: TreeNode
  level: number
  expanded: Set<string>
  onToggle: (id: string) => void
  selected: string | undefined
  onSelect: ((id: string) => void) | undefined
}

function TreeNodeItem({
  node,
  level,
  expanded,
  onToggle,
  selected,
  onSelect,
}: TreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expanded.has(node.id)
  const isSelected = selected === node.id

  function handleClick() {
    if (node.disabled) return
    if (hasChildren) onToggle(node.id)
    onSelect?.(node.id)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <li role="treeitem" aria-selected={isSelected} aria-expanded={hasChildren ? isExpanded : undefined}>
      <div
        className={cn(
          'flex items-center gap-1.5 rounded-md px-2 py-1 text-sm cursor-pointer select-none',
          'hover:bg-accent hover:text-accent-foreground',
          isSelected && 'bg-accent text-accent-foreground',
          node.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={node.disabled ? -1 : 0}
        role="button"
        aria-disabled={node.disabled}
      >
        {/* Chevron toggle */}
        <span className="size-4 flex items-center justify-center shrink-0 text-muted-foreground">
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="size-3.5" />
            ) : (
              <ChevronRight className="size-3.5" />
            )
          ) : (
            <span className="size-3.5" />
          )}
        </span>

        {/* Icon */}
        {node.icon && (
          <span className="size-4 flex items-center justify-center shrink-0 text-muted-foreground [&_svg]:size-4">
            {node.icon}
          </span>
        )}

        {/* Label */}
        <span className="flex-1 truncate">{node.label}</span>

        {/* Badge */}
        {node.badge !== undefined && (
          <Badge variant="secondary" className="ml-auto">
            {node.badge}
          </Badge>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <ul
          role="group"
          className="overflow-hidden animate-in fade-in-0"
        >
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              onToggle={onToggle}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export function TreeView({
  nodes,
  defaultExpanded = [],
  selected,
  onSelect,
  className,
}: TreeViewProps) {
  const [expanded, setExpanded] = React.useState<Set<string>>(
    () => new Set(defaultExpanded),
  )

  function handleToggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <ul
      role="tree"
      className={cn('w-full text-sm', className)}
    >
      {nodes.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          level={0}
          expanded={expanded}
          onToggle={handleToggle}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </ul>
  )
}
