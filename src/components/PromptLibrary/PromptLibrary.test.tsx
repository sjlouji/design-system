import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { userEvent } from '@testing-library/user-event'
import { PromptLibrary } from './PromptLibrary'
import type { PromptCardData } from './PromptLibrary'

const prompts: PromptCardData[] = [
  { id: '1', title: 'Summarise article', content: 'Summarise this article.', category: 'Writing' },
  { id: '2', title: 'Code review', content: 'Review this code.', category: 'Engineering' },
  { id: '3', title: 'Write tests', content: 'Write unit tests.', category: 'Engineering' },
]

describe('PromptLibrary', () => {
  it('renders all prompts', () => {
    render(<PromptLibrary prompts={prompts} />)
    expect(screen.getByText('Summarise article')).toBeInTheDocument()
    expect(screen.getByText('Code review')).toBeInTheDocument()
    expect(screen.getByText('Write tests')).toBeInTheDocument()
  })

  it('shows empty state when no prompts', () => {
    render(<PromptLibrary prompts={[]} />)
    expect(screen.getByText('No prompts found')).toBeInTheDocument()
  })

  it('filters prompts by search', async () => {
    const user = userEvent.setup()
    render(<PromptLibrary prompts={prompts} />)
    await user.type(screen.getByPlaceholderText('Search prompts…'), 'Summarise')
    expect(screen.getByText('Summarise article')).toBeInTheDocument()
    expect(screen.queryByText('Code review')).toBeNull()
  })

  it('filters by category button', async () => {
    const user = userEvent.setup()
    render(<PromptLibrary prompts={prompts} />)
    await user.click(screen.getByRole('button', { name: 'Engineering' }))
    expect(screen.queryByText('Summarise article')).toBeNull()
    expect(screen.getByText('Code review')).toBeInTheDocument()
  })
})
