import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from './Menubar'

describe('Menubar', () => {
  it('renders menubar triggers', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New File</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    expect(screen.getByText('File')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  it('renders menubar root element', () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Zoom In</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
    const menubar = document.querySelector('[data-slot="menubar"]')
    expect(menubar).toBeInTheDocument()
  })
})
