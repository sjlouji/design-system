"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

export interface ExpandableTabItem {
  title: string
  icon: LucideIcon
}

export interface ExpandableTabSeparator {
  type: "separator"
}

export type ExpandableTabsEntry = ExpandableTabItem | ExpandableTabSeparator

export interface ExpandableTabsProps {
  tabs: ExpandableTabsEntry[]
  /** Controlled active tab index (array index, including separators). */
  activeIndex?: number | null
  /** Initial active tab for uncontrolled usage. Defaults to null (none selected). */
  defaultActiveIndex?: number
  /** Fired on tab selection/deselection. Receives the new index, or null when the active tab is clicked again. */
  onChange?: (index: number | null) => void
  /** Tailwind text-colour class applied to the active tab. Defaults to "text-foreground". */
  activeColor?: string
  className?: string
}

function ExpandableTabs({
  tabs,
  activeIndex: controlledIndex,
  defaultActiveIndex,
  onChange,
  activeColor = "text-foreground",
  className,
}: ExpandableTabsProps) {
  const isControlled = controlledIndex !== undefined
  const [internalIndex, setInternalIndex] = React.useState<number | null>(
    defaultActiveIndex ?? null
  )

  const activeIdx = isControlled ? controlledIndex : internalIndex

  function handleClick(index: number) {
    const next = activeIdx === index ? null : index
    if (!isControlled) setInternalIndex(next)
    onChange?.(next)
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border bg-background p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if ("type" in tab) {
          return (
            <div
              key={`sep-${index}`}
              aria-hidden="true"
              className="mx-1 h-4 w-px shrink-0 bg-border"
            />
          )
        }

        const { title, icon: Icon } = tab
        const isActive = activeIdx === index

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            aria-pressed={isActive}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-1",
              isActive
                ? cn("bg-muted", activeColor)
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span
              className={cn(
                "overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out",
                isActive ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
              )}
            >
              {title}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export { ExpandableTabs }
