import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from './Drawer'

function TestDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button>Open Drawer</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>My Drawer</DrawerTitle>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}

describe('Drawer', () => {
  it('renders the trigger button', () => {
    render(<TestDrawer />)
    expect(screen.getByRole('button', { name: 'Open Drawer' })).toBeInTheDocument()
  })
})
