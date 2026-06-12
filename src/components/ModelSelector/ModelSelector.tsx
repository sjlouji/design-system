import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select'

export interface AIModel {
  id: string
  name: string
  provider: string
  contextWindow?: number
  description?: string
  tier?: 'fast' | 'balanced' | 'powerful'
}

export interface ModelSelectorProps {
  models: AIModel[]
  value?: string
  onChange?: (modelId: string) => void
  disabled?: boolean
  className?: string
}

const TIER_DOT: Record<string, string> = {
  fast: 'bg-[oklch(0.627_0.133_160)] dark:bg-[oklch(0.704_0.148_160)]',
  balanced: 'bg-[oklch(0.541_0.191_259)] dark:bg-[oklch(0.633_0.165_259)]',
  powerful: 'bg-[oklch(0.557_0.185_29)]',
}

function formatCtx(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`
  return `${n}`
}

function ModelSelector({
  models,
  value,
  onChange,
  disabled = false,
  className,
}: ModelSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger
        className={cn(
          'h-8 gap-2 rounded-lg border-border/60 bg-background text-sm font-medium',
          'hover:bg-accent/50 dark:bg-card',
          className
        )}
      >
        <SelectValue placeholder="Select a model…" />
      </SelectTrigger>

      <SelectContent className="max-h-[320px]">
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id} className="py-2.5 pr-3">
            <div className="flex items-start gap-2.5 py-0.5">
              {/* Provider badge */}
              <div className={cn(
                'shrink-0 mt-0.5 size-5 rounded-md flex items-center justify-center',
                'text-[9px] font-bold text-white',
                'bg-[linear-gradient(135deg,oklch(0.541_0.191_259),oklch(0.552_0.094_225))]',
                'dark:bg-[linear-gradient(135deg,oklch(0.633_0.165_259),oklch(0.635_0.110_225))]',
              )}>
                {model.provider.slice(0, 1).toUpperCase()}
              </div>

              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-medium text-sm leading-none">{model.name}</span>
                  {model.tier && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                      <span className={cn('size-1.5 rounded-full', TIER_DOT[model.tier])} />
                      {model.tier.charAt(0).toUpperCase() + model.tier.slice(1)}
                    </span>
                  )}
                  {model.contextWindow && (
                    <span className="text-[10px] text-muted-foreground/60 font-mono tabular-nums">
                      {formatCtx(model.contextWindow)} ctx
                    </span>
                  )}
                </div>
                {model.description && (
                  <span className="text-xs text-muted-foreground/70 leading-snug truncate max-w-[220px]">
                    {model.description}
                  </span>
                )}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { ModelSelector }
