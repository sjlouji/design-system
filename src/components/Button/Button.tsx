/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "cursor-pointer inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-lg text-sm font-medium whitespace-nowrap",
    "transition-all duration-150 outline-none",
    "focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      shape: {
        default: "",
        boxy:    "!rounded-none",
        rounded: "!rounded-full",
      },
      variant: {
        default: [
          "bg-primary text-primary-foreground shadow-sm",
          "hover:brightness-110 active:brightness-95",
          "dark:shadow-[0_1px_0_0_rgb(255_255_255_/_0.06)_inset]",
        ].join(" "),

        outline: [
          "border-2 border-foreground/20 bg-transparent text-foreground",
          "hover:bg-foreground/[0.03] hover:border-foreground/30",
          "dark:border-foreground/25 dark:hover:bg-foreground/[0.05] dark:hover:border-foreground/35",
        ].join(" "),

        secondary: [
          "bg-secondary text-secondary-foreground shadow-xs",
          "hover:bg-secondary/70 active:bg-secondary/60",
        ].join(" "),

        ghost: [
          "text-foreground hover:bg-accent hover:text-accent-foreground",
          "active:bg-accent/70 dark:hover:bg-accent/40",
        ].join(" "),

        destructive: [
          "bg-destructive text-destructive-foreground shadow-sm",
          "hover:bg-destructive/90 active:bg-destructive/80",
          "focus-visible:ring-destructive/40",
        ].join(" "),

        link: "text-primary underline-offset-4 hover:underline active:opacity-70",

        /** Gradient — prominent AI / primary call-to-action */
        ai: [
          "relative text-white shadow-sm overflow-hidden",
          "[background:linear-gradient(135deg,var(--ai-grad-from),var(--ai-grad-to))]",
          "hover:brightness-110 active:brightness-95",
          "dark:shadow-[0_1px_0_0_rgb(255_255_255_/_0.08)_inset]",
        ].join(" "),
      },
      size: {
        default:   "h-9 px-4 py-2 has-[>svg]:px-3",
        xs:        "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm:        "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg:        "h-10 rounded-lg px-6 text-[0.9375rem] has-[>svg]:px-4",
        xl:        "h-12 rounded-xl px-8 text-base has-[>svg]:px-5",
        icon:      "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  shape = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      className={cn(buttonVariants({ variant, size, shape, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
