import type { Meta, StoryObj } from '@storybook/react-vite'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './Resizable'

const meta = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

export const TwoPanels: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" style={{ height: '200px', border: '1px solid #ccc' }}>
      <ResizablePanel defaultSize={50}>
        <div style={{ padding: '1rem', height: '100%', background: '#f5f5f5' }}>
          Left Panel
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div style={{ padding: '1rem', height: '100%', background: '#e5e5e5' }}>
          Right Panel
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" style={{ height: '200px', border: '1px solid #ccc' }}>
      <ResizablePanel defaultSize={33}>
        <div style={{ padding: '1rem', height: '100%', background: '#f5f5f5' }}>
          Panel 1
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={34}>
        <div style={{ padding: '1rem', height: '100%', background: '#e5e5e5' }}>
          Panel 2
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={33}>
        <div style={{ padding: '1rem', height: '100%', background: '#d5d5d5' }}>
          Panel 3
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup orientation="vertical" style={{ height: '300px', border: '1px solid #ccc' }}>
      <ResizablePanel defaultSize={50}>
        <div style={{ padding: '1rem', height: '100%', background: '#f5f5f5' }}>
          Top Panel
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div style={{ padding: '1rem', height: '100%', background: '#e5e5e5' }}>
          Bottom Panel
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
