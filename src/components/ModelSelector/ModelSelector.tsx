import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select'
import { Badge } from '@/components/Badge'

export interface AIModel {
  id: string
  name: string
  provider: string
  contextWindow?: number
  description?: string
}

export interface ModelSelectorProps {
  models: AIModel[]
  value?: string
  onChange?: (modelId: string) => void
  disabled?: boolean
  className?: string
}

function formatContextWindow(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M ctx`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k ctx`
  return `${n} ctx`
}

function ModelSelector({
  models,
  value,
  onChange,
  disabled = false,
  className,
}: ModelSelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger className={cn('w-[280px]', className)}>
        <SelectValue placeholder="Select a model…" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            <div className="flex flex-col gap-0.5 py-0.5">
              <div className="flex items-center gap-2">
                <span className="font-medium">{model.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {model.provider}
                </Badge>
                {model.contextWindow && (
                  <span className="text-xs text-muted-foreground">
                    {formatContextWindow(model.contextWindow)}
                  </span>
                )}
              </div>
              {model.description && (
                <span className="text-xs text-muted-foreground">
                  {model.description}
                </span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { ModelSelector }
