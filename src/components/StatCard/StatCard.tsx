import * as React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/Skeleton'

interface StatCardTrend {
  value: number
  label?: string
}

interface StatCardProps {
  label: string
  value: string | number
  trend?: StatCardTrend
  icon?: React.ReactNode
  className?: string
  loading?: boolean
}

function StatCard({ label, value, trend, icon, className, loading }: StatCardProps) {
  if (loading) {
    return (
      <div className={cn('bg-card rounded-lg border border-border p-4 flex flex-col gap-2', className)}>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-16" />
      </div>
    )
  }

  const trendPositive = trend && trend.value > 0
  const trendNegative = trend && trend.value < 0

  return (
    <div className={cn('bg-card rounded-lg border border-border p-4', className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <p
              className={cn(
                'text-xs',
                trendPositive && 'text-green-600 dark:text-green-400',
                trendNegative && 'text-red-600 dark:text-red-400',
                !trendPositive && !trendNegative && 'text-muted-foreground'
              )}
            >
              {trendPositive ? '↑' : trendNegative ? '↓' : ''}
              {Math.abs(trend.value)}
              {trend.label && ` ${trend.label}`}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-muted-foreground shrink-0">{icon}</div>
        )}
      </div>
    </div>
  )
}

export { StatCard }
export type { StatCardProps, StatCardTrend }
