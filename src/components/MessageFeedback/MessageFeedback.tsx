import * as React from 'react'
import { ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import { Textarea } from '@/components/Textarea'

export interface MessageFeedbackProps {
  onSubmit: (rating: 'positive' | 'negative', comment?: string) => void
  className?: string
}

function MessageFeedback({ onSubmit, className }: MessageFeedbackProps) {
  const [rating, setRating] = React.useState<'positive' | 'negative' | null>(null)
  const [comment, setComment] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleRatingClick = (value: 'positive' | 'negative') => {
    if (submitted) return
    setRating(value)
  }

  const handleSubmit = () => {
    if (!rating) return
    onSubmit(rating, comment.trim() || undefined)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={cn('text-sm text-muted-foreground', className)}>
        Thanks for your feedback!
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => handleRatingClick('positive')}
          aria-label="Thumbs up"
          className={cn(rating === 'positive' && 'text-primary bg-primary/10')}
        >
          <ThumbsUpIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => handleRatingClick('negative')}
          aria-label="Thumbs down"
          className={cn(rating === 'negative' && 'text-destructive bg-destructive/10')}
        >
          <ThumbsDownIcon />
        </Button>
      </div>
      {rating !== null && (
        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Optional: tell us more…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[60px] text-sm"
          />
          <Button size="sm" onClick={handleSubmit}>
            Submit feedback
          </Button>
        </div>
      )}
    </div>
  )
}

export { MessageFeedback }
