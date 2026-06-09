import * as React from 'react'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/Breadcrumb'
import { cn } from '@/lib/utils'

interface BreadcrumbGroupItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbGroupProps {
  items: BreadcrumbGroupItem[]
  maxItems?: number
  className?: string
}

function BreadcrumbGroup({ items, maxItems, className }: BreadcrumbGroupProps) {
  const shouldCollapse = maxItems !== undefined && items.length > maxItems

  let displayItems: Array<BreadcrumbGroupItem | 'ellipsis'>

  if (shouldCollapse) {
    // Show first item, ellipsis, and last item
    displayItems = [items[0], 'ellipsis', items[items.length - 1]]
  } else {
    displayItems = items
  }

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1

          if (item === 'ellipsis') {
            return (
              <React.Fragment key="ellipsis">
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            )
          }

          const isCurrent = item.current || isLast

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {isCurrent ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href ?? '#'}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { BreadcrumbGroup }
export type { BreadcrumbGroupProps, BreadcrumbGroupItem }
