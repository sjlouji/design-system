"use client"

import * as React from 'react'
import { Search, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────

export type FilterOperator =
  | '=' | '!=' | ':' | '!:' | '^' | '!^' | '>' | '<' | '>=' | '<='

export interface FilteringProperty {
  key: string
  propertyLabel: string
  groupValuesLabel?: string
  operators: ReadonlyArray<FilterOperator | { operator: FilterOperator; tokenType?: 'enum' }>
}

export interface FilteringOption {
  propertyKey: string
  value: string
}

export interface FilterToken {
  propertyKey?: string
  operator: FilterOperator
  value: string
}

export interface PropertyFilterQuery {
  tokens: FilterToken[]
  operation: 'and' | 'or'
}

export interface PropertyFilterProps {
  query: PropertyFilterQuery
  onChange: (query: PropertyFilterQuery) => void
  filteringProperties: FilteringProperty[]
  filteringOptions?: FilteringOption[]
  filteringPlaceholder?: string
  filteringAriaLabel?: string
  filteringConstraintText?: string
  countText?: string
  disabled?: boolean
  className?: string
}

// ── Constants ─────────────────────────────────────────────────────────────────

const OPERATOR_LABELS: Record<FilterOperator, string> = {
  '=':  'Equals',
  '!=': 'Does not equal',
  ':':  'Contains',
  '!:': 'Does not contain',
  '^':  'Starts with',
  '!^': 'Does not start with',
  '>':  'Greater than',
  '<':  'Less than',
  '>=': 'Greater than or equal',
  '<=': 'Less than or equal',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getOperators(prop: FilteringProperty): FilterOperator[] {
  return prop.operators.map(op => (typeof op === 'string' ? op : op.operator))
}

type InputStage =
  | { type: 'search'; query: string }
  | { type: 'value'; property: FilteringProperty; operator: FilterOperator; value: string }

function parseInput(input: string, properties: FilteringProperty[]): InputStage {
  if (!input) return { type: 'search', query: '' }

  for (const prop of properties) {
    const label = prop.propertyLabel
    if (!input.toLowerCase().startsWith(label.toLowerCase())) continue

    const afterLabel = input.slice(label.length)
    if (!afterLabel.startsWith(' ')) continue

    const rest = afterLabel.slice(1) // strip leading space
    // Try longest operators first so ">=" is matched before ">"
    const ops = [...getOperators(prop)].sort((a, b) => b.length - a.length)

    for (const op of ops) {
      if (rest === op || rest.startsWith(op + ' ')) {
        const value = rest === op ? '' : rest.slice(op.length + 1)
        return { type: 'value', property: prop, operator: op, value }
      }
    }
  }

  return { type: 'search', query: input }
}

function tokenLabel(token: FilterToken, properties: FilteringProperty[]): React.ReactNode {
  if (!token.propertyKey) return <span>{token.value}</span>
  const prop = properties.find(p => p.key === token.propertyKey)
  const label = prop ? prop.propertyLabel : token.propertyKey
  return (
    <span>
      {label} <strong>{token.operator}</strong> {token.value}
    </span>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

function PropertyFilter({
  query,
  onChange,
  filteringProperties,
  filteringOptions = [],
  filteringPlaceholder = 'Filter',
  filteringAriaLabel,
  filteringConstraintText,
  countText,
  disabled = false,
  className,
}: PropertyFilterProps) {
  const [inputValue, setInputValue] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const stage = React.useMemo(
    () => parseInput(inputValue, filteringProperties),
    [inputValue, filteringProperties]
  )

  // Close dropdown on outside click
  React.useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  // ── Dropdown items ─────────────────────────────────────────────────────────

  type PropOpItem = { kind: 'prop-op'; property: FilteringProperty; operator: FilterOperator }
  type ValueItem  = { kind: 'value'; value: string }
  type FreeItem   = { kind: 'free'; value: string }
  type Item = PropOpItem | ValueItem | FreeItem

  const items = React.useMemo((): Item[] => {
    if (stage.type === 'value') {
      const { property, value } = stage
      const suggestions = filteringOptions
        .filter(o => o.propertyKey === property.key)
        .map(o => o.value)
        .filter(v => !value || v.toLowerCase().includes(value.toLowerCase()))
      const result: Item[] = []
      if (value) result.push({ kind: 'free', value })
      suggestions.forEach(v => result.push({ kind: 'value', value: v }))
      return result
    }

    const { query: q } = stage
    const result: Item[] = []
    if (q) result.push({ kind: 'free', value: q })

    filteringProperties.forEach(prop => {
      if (q && !prop.propertyLabel.toLowerCase().includes(q.toLowerCase())) return
      getOperators(prop).forEach(op => {
        result.push({ kind: 'prop-op', property: prop, operator: op })
      })
    })
    return result
  }, [stage, filteringProperties, filteringOptions])

  // ── Actions ────────────────────────────────────────────────────────────────

  function commit(token: FilterToken) {
    onChange({ ...query, tokens: [...query.tokens, token] })
    setInputValue('')
    setOpen(false)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  function handleItemClick(item: Item) {
    if (item.kind === 'free') {
      if (stage.type === 'value') {
        commit({ propertyKey: stage.property.key, operator: stage.operator, value: item.value })
      } else {
        commit({ operator: ':', value: item.value })
      }
    } else if (item.kind === 'prop-op') {
      const next = `${item.property.propertyLabel} ${item.operator} `
      setInputValue(next)
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      // kind === 'value'
      if (stage.type === 'value') {
        commit({ propertyKey: stage.property.key, operator: stage.operator, value: item.value })
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') { setOpen(false); return }
    if (e.key === 'Enter') {
      if (stage.type === 'value' && stage.value) {
        commit({ propertyKey: stage.property.key, operator: stage.operator, value: stage.value })
      } else if (stage.type === 'search' && stage.query) {
        commit({ operator: ':', value: stage.query })
      }
    }
  }

  function removeToken(index: number) {
    onChange({ ...query, tokens: query.tokens.filter((_, i) => i !== index) })
  }

  function clearInput() {
    setInputValue('')
    inputRef.current?.focus()
  }

  // ── Dropdown render ────────────────────────────────────────────────────────

  function renderDropdown() {
    if (!open || items.length === 0) return null

    if (stage.type === 'value') {
      return (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[240px] w-full max-w-sm rounded-md border bg-popover text-popover-foreground shadow-md">
          <div className="p-1">
            <p className="px-2 py-1 text-xs font-semibold text-muted-foreground">
              {stage.property.propertyLabel} value
            </p>
            {items.map((item, i) => (
              <button
                key={i}
                type="button"
                onMouseDown={e => { e.preventDefault(); handleItemClick(item) }}
                className="flex w-full items-start rounded px-2 py-1.5 text-sm hover:bg-accent text-left"
              >
                {item.kind === 'free'
                  ? <span>Use: <span className="font-semibold">"{item.value}"</span></span>
                  : item.kind === 'value' ? item.value : null}
              </button>
            ))}
          </div>
        </div>
      )
    }

    const freeItem = items.find(i => i.kind === 'free') as FreeItem | undefined
    const propOpItems = items.filter(i => i.kind === 'prop-op') as PropOpItem[]

    // Group by property key
    const grouped = new Map<string, PropOpItem[]>()
    propOpItems.forEach(item => {
      const existing = grouped.get(item.property.key) ?? []
      grouped.set(item.property.key, [...existing, item])
    })

    return (
      <div className="absolute left-0 top-full z-50 mt-1 min-w-[240px] max-h-80 overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md">
        <div className="p-1">
          {freeItem && (
            <button
              type="button"
              onMouseDown={e => { e.preventDefault(); handleItemClick(freeItem) }}
              className="flex w-full items-center rounded px-2 py-1.5 text-sm hover:bg-accent text-left"
            >
              Use: <span className="ml-1 font-semibold">"{freeItem.value}"</span>
            </button>
          )}

          {grouped.size > 0 && (
            <>
              <p className="mt-1 px-2 py-1 text-xs font-semibold text-muted-foreground">
                Operators
              </p>
              {Array.from(grouped.values()).flat().map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseDown={e => { e.preventDefault(); handleItemClick(item) }}
                  className="flex w-full flex-col rounded px-2 py-1.5 hover:bg-accent text-left"
                >
                  <span className="text-sm">
                    <span className="font-semibold text-primary">{item.property.propertyLabel}</span>
                    {' '}
                    <span className="font-semibold">{item.operator}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">{OPERATOR_LABELS[item.operator]}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    )
  }

  // ── Main render ────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-2', className)}>
      {/* Input row */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-label={filteringAriaLabel}
            placeholder={filteringPlaceholder}
            disabled={disabled}
            value={inputValue}
            onChange={e => { setInputValue(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            className={cn(
              'h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-8 text-sm shadow-xs outline-none transition-[color,box-shadow]',
              'focus:border-ring focus:ring-[3px] focus:ring-ring/50',
              'placeholder:text-muted-foreground',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          />
          {inputValue && (
            <button
              type="button"
              aria-label="Clear input"
              onClick={clearInput}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
          {renderDropdown()}
        </div>

        {countText && (
          <span className="shrink-0 text-sm text-muted-foreground">{countText}</span>
        )}
      </div>

      {/* Active token chips */}
      {query.tokens.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {query.tokens.map((token, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => onChange({ ...query, operation: query.operation === 'and' ? 'or' : 'and' })}
                  className="inline-flex items-center gap-0.5 rounded border border-input px-2 py-0.5 text-xs hover:bg-accent"
                >
                  {query.operation}
                  <ChevronDown className="size-3" />
                </button>
              )}
              <div className="inline-flex items-center gap-1 rounded border border-input px-2.5 py-1 text-sm">
                {tokenLabel(token, filteringProperties)}
                <button
                  type="button"
                  onClick={() => removeToken(index)}
                  aria-label="Remove filter"
                  className="ml-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </React.Fragment>
          ))}

          <span className="text-muted-foreground" aria-hidden>|</span>

          <button
            type="button"
            onClick={() => onChange({ ...query, tokens: [] })}
            className="text-sm font-medium text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {filteringConstraintText && (
        <p className="text-xs text-muted-foreground">{filteringConstraintText}</p>
      )}
    </div>
  )
}

export { PropertyFilter }
