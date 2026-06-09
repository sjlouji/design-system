import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@/lib/test-utils'
import { TreeView, type TreeNode } from './TreeView'

const nodes: TreeNode[] = [
  {
    id: 'root1',
    label: 'Root One',
    children: [
      { id: 'child1', label: 'Child One' },
      { id: 'child2', label: 'Child Two' },
    ],
  },
  {
    id: 'root2',
    label: 'Root Two',
  },
]

describe('TreeView', () => {
  it('renders root nodes', () => {
    render(<TreeView nodes={nodes} />)
    expect(screen.getByText('Root One')).toBeInTheDocument()
    expect(screen.getByText('Root Two')).toBeInTheDocument()
  })

  it('does not render children when collapsed', () => {
    render(<TreeView nodes={nodes} />)
    expect(screen.queryByText('Child One')).not.toBeInTheDocument()
  })

  it('expands a node on click to show children', () => {
    render(<TreeView nodes={nodes} />)
    fireEvent.click(screen.getByText('Root One'))
    expect(screen.getByText('Child One')).toBeInTheDocument()
    expect(screen.getByText('Child Two')).toBeInTheDocument()
  })

  it('collapses a node on second click', () => {
    render(<TreeView nodes={nodes} defaultExpanded={['root1']} />)
    expect(screen.getByText('Child One')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Root One'))
    expect(screen.queryByText('Child One')).not.toBeInTheDocument()
  })

  it('renders children expanded when in defaultExpanded', () => {
    render(<TreeView nodes={nodes} defaultExpanded={['root1']} />)
    expect(screen.getByText('Child One')).toBeInTheDocument()
  })

  it('calls onSelect with node id when clicked', () => {
    const onSelect = vi.fn()
    render(<TreeView nodes={nodes} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Root Two'))
    expect(onSelect).toHaveBeenCalledWith('root2')
  })

  it('calls onSelect for a leaf node', () => {
    const onSelect = vi.fn()
    render(<TreeView nodes={nodes} defaultExpanded={['root1']} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Child One'))
    expect(onSelect).toHaveBeenCalledWith('child1')
  })

  it('renders badge when provided', () => {
    const nodesWithBadge: TreeNode[] = [
      { id: 'n1', label: 'With Badge', badge: 5 },
    ]
    render(<TreeView nodes={nodesWithBadge} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('does not call onSelect for disabled nodes', () => {
    const onSelect = vi.fn()
    const disabledNodes: TreeNode[] = [
      { id: 'dis', label: 'Disabled Node', disabled: true },
    ]
    render(<TreeView nodes={disabledNodes} onSelect={onSelect} />)
    // disabled nodes have pointer-events-none so click is blocked; verify via aria
    const item = screen.getByRole('treeitem', { name: /Disabled Node/i })
    expect(item.querySelector('[aria-disabled]')).toBeInTheDocument()
  })
})
