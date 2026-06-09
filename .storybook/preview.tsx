import type { Preview } from '@storybook/react-vite'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { TooltipProvider } from '../src/components/Tooltip'
import { handlers } from './msw-handlers'
import '../src/index.css'

initialize({ onUnhandledRequest: 'bypass', serviceWorker: { url: '/mockServiceWorker.js' } })

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#09090b' },
        { name: 'muted', value: '#f4f4f5' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      test: 'todo',
    },
    msw: {
      handlers,
    },
  },
  loaders: [mswLoader],
  globalTypes: {
    theme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals['theme'] as string
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        document.documentElement.style.backgroundColor =
          theme === 'dark' ? '#09090b' : '#ffffff'
      }
      return (
        <TooltipProvider>
          <Story />
        </TooltipProvider>
      )
    },
  ],
}

export default preview
