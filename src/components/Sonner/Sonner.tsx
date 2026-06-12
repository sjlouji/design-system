import * as React from "react"
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { toast, Toaster as Sonner, type ToasterProps } from "sonner"
import type { ReactNode } from "react"

const Toaster = ({
  expand = false,
  visibleToasts = 3,
  gap = 8,
  closeButton = true,
  ...props
}: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      expand={expand}
      visibleToasts={visibleToasts}
      gap={gap}
      closeButton={closeButton}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--toast-action-button-background": "oklch(0.541 0.191 259)",
          "--toast-action-button-color": "#fff",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

// ─── useToasts ────────────────────────────────────────────────────────────────
// Convenience hook that wraps Sonner's imperative API with typed methods
// matching the patterns from the design reference components.

interface MessageOptions {
  text: string | ReactNode
  /** Prevent auto-dismiss */
  preserve?: boolean
  /** Action button label */
  action?: string
  onAction?: () => void
  /** Show an Undo button instead of a generic action */
  onUndoAction?: () => void
  description?: string
}

interface PromiseMessages<T> {
  loading: string
  success: string | ((data: T) => string)
  error: string | ((err: unknown) => string)
}

function useToasts() {
  return {
    message: React.useCallback(({
      text,
      preserve,
      action,
      onAction,
      onUndoAction,
      description,
    }: MessageOptions) => {
      toast(text as string, {
        description,
        duration: preserve ? Infinity : 4000,
        action: onUndoAction
          ? { label: 'Undo', onClick: onUndoAction }
          : action
          ? { label: action, onClick: onAction ?? (() => {}) }
          : undefined,
      })
    }, []),

    success: React.useCallback((text: string, description?: string) => {
      toast.success(text, { description })
    }, []),

    error: React.useCallback((text: string, description?: string) => {
      toast.error(text, { description })
    }, []),

    warning: React.useCallback((text: string, description?: string) => {
      toast.warning(text, { description })
    }, []),

    info: React.useCallback((text: string, description?: string) => {
      toast.info(text, { description })
    }, []),

    promise: React.useCallback(<T,>(
      fn: Promise<T> | (() => Promise<T>),
      msgs: PromiseMessages<T>
    ) => {
      toast.promise(fn, msgs)
    }, []),
  }
}

export { Toaster, useToasts }
export { toast } from "sonner"
