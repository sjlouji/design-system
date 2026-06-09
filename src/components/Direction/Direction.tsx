import * as React from 'react'
import { DirectionProvider } from '@radix-ui/react-direction'

export type Direction = 'ltr' | 'rtl'

export interface DirectionProps {
  dir?: Direction
  children: React.ReactNode
}

function Direction({ dir = 'ltr', children }: DirectionProps) {
  return <DirectionProvider dir={dir}>{children}</DirectionProvider>
}

export { Direction }
