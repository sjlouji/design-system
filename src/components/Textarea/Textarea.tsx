import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-3 py-2",
          "text-sm shadow-xs transition-[color,border-color,box-shadow] duration-150 outline-none leading-relaxed",
          "placeholder:text-muted-foreground/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-input/20",
          "focus-visible:border-ring/60 focus-visible:ring-[3px] focus-visible:ring-ring/30",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/30",
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
