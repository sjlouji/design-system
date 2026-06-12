import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  BookOpenIcon,
  BoxIcon,
  CodeIcon,
  FileTextIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  RocketIcon,
  SettingsIcon,
  ShieldIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
} from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from './NavigationMenu'

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    viewport: {
      control: 'boolean',
      description: 'Whether to render the viewport panel (animated dropdown container)',
      defaultValue: true,
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the menu items',
    },
    delayDuration: {
      control: 'number',
      description: 'Duration in ms before the menu opens on hover',
    },
    skipDelayDuration: {
      control: 'number',
      description: 'How much time a user has to move to another trigger without delay',
    },
  },
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
            <ul className="grid gap-1 p-3 md:w-[400px] md:grid-cols-2">
              <li>
                <NavigationMenuLink href="#">
                  <div className="flex items-center gap-2">
                    <LayoutDashboardIcon className="size-4" />
                    <span className="font-medium">Dashboard</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Real-time analytics and reporting.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <div className="flex items-center gap-2">
                    <ZapIcon className="size-4" />
                    <span className="font-medium">Automations</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Build powerful workflow automations.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="size-4" />
                    <span className="font-medium">Team</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Collaborate across your organisation.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <div className="flex items-center gap-2">
                    <ShieldIcon className="size-4" />
                    <span className="font-medium">Security</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Enterprise-grade access controls.
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-3 md:w-[350px]">
              <li>
                <NavigationMenuLink href="#">
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="size-4" />
                    <span className="font-medium">Documentation</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Guides, tutorials, and API reference.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <div className="flex items-center gap-2">
                    <CodeIcon className="size-4" />
                    <span className="font-medium">API Reference</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Complete REST and GraphQL API docs.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <div className="flex items-center gap-2">
                    <BoxIcon className="size-4" />
                    <span className="font-medium">SDKs</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Client libraries for popular languages.
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const SimpleLinks: Story = {
  name: 'Simple Links (No Dropdowns)',
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((label) => (
          <NavigationMenuItem key={label}>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              {label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            <LayoutDashboardIcon className="size-4" />
            Dashboard
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            <FileTextIcon className="size-4" />
            Projects
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            <UsersIcon className="size-4" />
            Team
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            <SettingsIcon className="size-4" />
            Settings
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const WithActiveLink: Story = {
  name: 'With Active/Current Link',
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" data-active="true" className={navigationMenuTriggerStyle()}>
            Products
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const WithViewportDisabled: Story = {
  name: 'Without Viewport (Inline Content)',
  render: () => (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-3 w-[260px]">
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">Getting Started</span>
                  <p className="text-muted-foreground text-xs">
                    A quick introduction to the platform.
                  </p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">Case Studies</span>
                  <p className="text-muted-foreground text-xs">
                    How teams are using the product.
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Status
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const FeaturedLayout: Story = {
  name: 'Featured Item Layout',
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid md:w-[500px] md:grid-cols-[200px_1fr] gap-0 p-3">
              <NavigationMenuLink
                href="#"
                className="flex flex-col justify-end rounded-md bg-gradient-to-b from-violet-500 to-indigo-600 p-4 text-white no-underline outline-none"
              >
                <RocketIcon className="size-5 mb-2" />
                <div className="font-semibold mb-1">Getting Started</div>
                <p className="text-white/80 text-xs leading-tight">
                  Deploy your first project in under 5 minutes.
                </p>
              </NavigationMenuLink>
              <ul className="grid gap-1 pl-3">
                <li>
                  <NavigationMenuLink href="#">
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="size-4" />
                      <span className="font-medium">AI Features</span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Intelligent suggestions and automation.
                    </p>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">
                    <div className="flex items-center gap-2">
                      <GlobeIcon className="size-4" />
                      <span className="font-medium">Global CDN</span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Edge deployments in 50+ regions.
                    </p>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">
                    <div className="flex items-center gap-2">
                      <LifeBuoyIcon className="size-4" />
                      <span className="font-medium">Support</span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      24/7 enterprise support and SLAs.
                    </p>
                  </NavigationMenuLink>
                </li>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Enterprise
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const WithIndicator: Story = {
  name: 'With Indicator Arrow',
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-3 w-[300px]">
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">For Startups</span>
                  <p className="text-muted-foreground text-xs">Scale fast without the complexity.</p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">For Enterprise</span>
                  <p className="text-muted-foreground text-xs">
                    Advanced controls, compliance, and SSO.
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator />
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Changelog
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  ),
}

export const DeepNestedContent: Story = {
  name: 'Rich Dropdown Content',
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-3 w-[420px]">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-2">
                About
              </p>
              <ul className="grid grid-cols-2 gap-1 mb-3">
                {[
                  { title: 'Our Mission', desc: 'What drives us forward' },
                  { title: 'Leadership', desc: 'Meet the team behind the product' },
                  { title: 'Press', desc: 'Coverage and media resources' },
                  { title: 'Careers', desc: 'Join us — 30+ open roles' },
                ].map((item) => (
                  <li key={item.title}>
                    <NavigationMenuLink href="#">
                      <span className="font-medium">{item.title}</span>
                      <p className="text-muted-foreground text-xs">{item.desc}</p>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-2 mt-1">
                <NavigationMenuLink
                  href="#"
                  className="flex items-center justify-between text-sm font-medium px-2 py-1.5 rounded hover:bg-accent"
                >
                  <span>Read the latest news</span>
                  <span className="text-muted-foreground text-xs">View all →</span>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const TriggerStyleHelper: Story = {
  name: 'navigationMenuTriggerStyle() Helper',
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <p className="text-sm text-muted-foreground">
        Use <code className="text-xs bg-muted px-1 py-0.5 rounded">navigationMenuTriggerStyle()</code> to
        style any element as a nav trigger without a dropdown.
      </p>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              Plain link styled as trigger
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Trigger with dropdown</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-3 w-[200px]">
                <li>
                  <NavigationMenuLink href="#">Item one</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">Item two</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
}

export const LargeMenu: Story = {
  name: 'Full App Navigation',
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-3 md:w-[420px] md:grid-cols-2">
              {[
                { icon: LayoutDashboardIcon, title: 'Overview', desc: 'Your project at a glance' },
                { icon: ZapIcon, title: 'Pipelines', desc: 'Automated CI/CD workflows' },
                { icon: ShieldIcon, title: 'Access', desc: 'Roles, permissions, and SSO' },
                { icon: SparklesIcon, title: 'Copilot', desc: 'AI-assisted development' },
              ].map(({ icon: Icon, title, desc }) => (
                <li key={title}>
                  <NavigationMenuLink href="#">
                    <div className="flex items-center gap-2">
                      <Icon className="size-4" />
                      <span className="font-medium">{title}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">{desc}</p>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-3 md:w-[340px]">
              {[
                { icon: BookOpenIcon, title: 'Guides', desc: 'Step-by-step tutorials' },
                { icon: CodeIcon, title: 'API Reference', desc: 'REST, GraphQL, and webhooks' },
                { icon: FileTextIcon, title: 'Changelog', desc: 'What\'s new in each release' },
              ].map(({ icon: Icon, title, desc }) => (
                <li key={title}>
                  <NavigationMenuLink href="#">
                    <div className="flex items-center gap-2">
                      <Icon className="size-4" />
                      <span className="font-medium">{title}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">{desc}</p>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Enterprise
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Blog
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
