import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './NavigationMenu'

describe('NavigationMenu', () => {
  it('renders the navigation menu', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Analytics</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    const nav = document.querySelector('[data-slot="navigation-menu"]')
    expect(nav).toBeInTheDocument()
  })

  it('renders nav triggers', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Item</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Company</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">About</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
  })
})
