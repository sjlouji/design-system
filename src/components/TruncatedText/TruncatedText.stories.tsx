import type { Meta, StoryObj } from '@storybook/react-vite'
import { TruncatedText } from './TruncatedText'

const meta = {
  title: 'Primitives/TruncatedText',
  component: TruncatedText,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    lines: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Number of visible lines before truncating. `1` uses `text-overflow: ellipsis`; 2–6 use `line-clamp`.',
    },
    children: {
      control: 'text',
      description: 'Text content. When a plain string, hovering shows the full text in a tooltip.',
    },
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof TruncatedText>

export default meta
type Story = StoryObj<typeof meta>

const ARN = 'arn:aws:lambda:us-east-1:123456789012:function:my-cool-function'
const LONG = 'This is a very long piece of text that will overflow its container and get truncated with an ellipsis when it exceeds the available width.'

export const Default: Story = {
  args: {
    children: ARN,
    lines: 1,
  },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
}

export const MultiLine: Story = {
  args: {
    children: LONG,
    lines: 2,
  },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
}

export const ThreeLines: Story = {
  args: {
    children: LONG + ' ' + LONG,
    lines: 3,
  },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
}

export const InTable: Story = {
  args: { children: ARN },
  render: () => (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b text-left text-muted-foreground">
          <th className="pb-2 pr-4 font-medium">Name</th>
          <th className="pb-2 pr-4 font-medium">ARN</th>
          <th className="pb-2 font-medium">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {[
          { name: 'cool-function', arn: ARN, status: 'Active' },
          { name: 'auth-handler', arn: 'arn:aws:lambda:eu-west-1:999888777666:function:auth-handler', status: 'Active' },
          { name: 'data-processor', arn: 'arn:aws:lambda:ap-southeast-1:111222333444:function:data-processor-v2', status: 'Inactive' },
        ].map((row) => (
          <tr key={row.name}>
            <td className="py-2 pr-4 font-mono">{row.name}</td>
            <td className="py-2 pr-4 max-w-[240px]">
              <TruncatedText>{row.arn}</TruncatedText>
            </td>
            <td className="py-2">{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
  parameters: { layout: 'padded' },
}

export const InKeyValuePairs: Story = {
  args: { children: ARN },
  render: () => (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-lg text-sm">
      <div>
        <dt className="text-muted-foreground">Function name</dt>
        <dd className="font-medium">my-cool-function</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Runtime</dt>
        <dd className="font-medium">Node.js 20.x</dd>
      </div>
      <div className="col-span-2">
        <dt className="text-muted-foreground">ARN</dt>
        <dd className="font-medium font-mono">
          <TruncatedText>{ARN}</TruncatedText>
        </dd>
      </div>
    </dl>
  ),
}
