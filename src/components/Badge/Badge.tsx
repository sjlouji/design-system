/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden",
    "rounded-full border border-transparent px-2 py-0.5",
    "text-xs font-medium whitespace-nowrap",
    "transition-[color,background-color,box-shadow] duration-100",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "[&>svg]:pointer-events-none [&>svg]:size-3",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:brightness-110",
        secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/20 [a&]:hover:bg-destructive/20 dark:bg-destructive/20",
        success:
          "bg-success/10 text-success border-success/20 [a&]:hover:bg-success/20 dark:bg-success/20",
        warning:
          "bg-warning/10 text-warning-foreground border-warning/20 dark:bg-warning/20 dark:text-warning",
        outline: "border-border text-foreground [a&]:hover:bg-accent",
        ghost: "text-muted-foreground [a&]:hover:bg-accent [a&]:hover:text-foreground",
        /** AI/model variant — violet tinted */
        ai: [
          "border-[oklch(0.837_0.075_260)] bg-[oklch(0.905_0.043_259)] text-[oklch(0.482_0.171_259)]",
          "dark:border-[oklch(0.36_0.05_259)] dark:bg-[oklch(0.32_0.03_259)] dark:text-[oklch(0.633_0.165_259)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
