import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { StreamingText } from './StreamingText'

const meta = {
  title: 'AI/StreamingText',
  component: StreamingText,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StreamingText>

export default meta
type Story = StoryObj<typeof meta>

export const Static: Story = {
  args: {
    text: 'This is a static message with no streaming cursor.',
    streaming: false,
  },
}

export const Streaming: Story = {
  render: () => {
    const fullText = 'Hello! I am streaming text character by character...'
    const [displayed, setDisplayed] = React.useState('')

    React.useEffect(() => {
      let i = 0
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayed(fullText.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
        }
      }, 50)
      return () => clearInterval(interval)
    }, [])

    const isStreaming = displayed.length < fullText.length
    return <StreamingText text={displayed} streaming={isStreaming} />
  },
}

export const Empty: Story = {
  args: {
    text: '',
    streaming: true,
  },
}
