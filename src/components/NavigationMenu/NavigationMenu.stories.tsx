import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './NavigationMenu'

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div style={{ padding: '1rem', minWidth: '200px' }}>
              <NavigationMenuLink href="#">Analytics</NavigationMenuLink>
              <NavigationMenuLink href="#">Dashboard</NavigationMenuLink>
              <NavigationMenuLink href="#">Reports</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div style={{ padding: '1rem', minWidth: '200px' }}>
              <NavigationMenuLink href="#">About</NavigationMenuLink>
              <NavigationMenuLink href="#">Careers</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Blog</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
