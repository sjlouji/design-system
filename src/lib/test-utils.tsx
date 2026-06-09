/* eslint-disable react-refresh/only-export-components */
import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { TooltipProvider } from '@/components/Tooltip'

function Providers({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
