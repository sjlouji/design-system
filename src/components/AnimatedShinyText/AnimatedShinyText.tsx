import * as React from "react"
import { cn } from "@/lib/utils"

export interface AnimatedShinyTextProps {
  children: React.ReactNode
  /** Width (px) of the travelling shine highlight. Defaults to 100. */
  shimmerWidth?: number
  className?: string
}

/**
 * Wraps text in a sliding-shine gradient animation.
 * The gradient sweeps from left to right continuously, making the text
 * appear to catch a moving light reflection.
 *
 * Reuses the existing `shimmer` keyframe defined in index.css.
 */
function AnimatedShinyText({
  children,
  shimmerWidth = 100,
  className,
}: AnimatedShinyTextProps) {
  return (
    <span
      style={{ '--shiny-width': `${shimmerWidth}px` } as React.CSSProperties}
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "bg-gradient-to-r from-foreground/25 via-foreground via-50% to-foreground/25",
        "bg-no-repeat [background-size:200%_100%]",
        "[animation:shimmer_2s_linear_infinite]",
        className,
      )}
    >
      {children}
    </span>
  )
}

export { AnimatedShinyText }
