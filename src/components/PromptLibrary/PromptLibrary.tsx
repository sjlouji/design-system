import * as React from 'react'
import { cn } from '@/lib/utils'
import { PromptCard } from '@/components/PromptCard'
import { SearchInput } from '@/components/SearchInput'
import { EmptyState } from '@/components/EmptyState'
import { Button } from '@/components/Button'

export interface PromptCardData {
  id: string
  title: string
  content: string
  category?: string
}

export interface PromptLibraryProps {
  prompts: PromptCardData[]
  onUse?: (id: string) => void
  onCopy?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}

function PromptLibrary({
  prompts,
  onUse,
  onCopy,
  onDelete,
  className,
}: PromptLibraryProps) {
  const [search, setSearch] = React.useState('')
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)

  const categories = React.useMemo(() => {
    const cats = prompts.map((p) => p.category).filter(Boolean) as string[]
    return Array.from(new Set(cats))
  }, [prompts])

  const filtered = React.useMemo(() => {
    return prompts.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        !activeCategory || p.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [prompts, search, activeCategory])

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search prompts…"
          className="w-full sm:w-64"
        />
        {categories.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <Button
              variant={activeCategory === null ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory(null)}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        )}
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          title="No prompts found"
          description="Try adjusting your search or filter."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((prompt) => (
            <PromptCard
              key={prompt.id}
              title={prompt.title}
              content={prompt.content}
              category={prompt.category}
              onUse={onUse ? () => onUse(prompt.id) : undefined}
              onCopy={onCopy ? () => onCopy(prompt.id) : undefined}
              onDelete={onDelete ? () => onDelete(prompt.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { PromptLibrary }
