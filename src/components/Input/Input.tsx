import * as React from "react"

import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  shape?: "default" | "boxy" | "rounded"
}

const shapeClass: Record<NonNullable<InputProps["shape"]>, string> = {
  default: "rounded-lg",
  boxy:    "rounded-none",
  rounded: "rounded-full",
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, shape = "default", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        data-shape={shape}
        className={cn(
          "h-9 w-full min-w-0 border border-input bg-transparent px-3 py-1",
          "text-sm shadow-xs transition-[color,border-color,box-shadow] duration-150 outline-none",
          "selection:bg-primary selection:text-primary-foreground",
          "placeholder:text-muted-foreground/50",
          "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-input/20",
          "focus-visible:border-ring/60 focus-visible:ring-[3px] focus-visible:ring-ring/30",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/30",
          shapeClass[shape],
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
