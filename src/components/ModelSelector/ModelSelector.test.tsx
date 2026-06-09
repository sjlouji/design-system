import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { ModelSelector } from './ModelSelector'
import type { AIModel } from './ModelSelector'

const models: AIModel[] = [
  { id: 'model-1', name: 'Model One', provider: 'Provider A', contextWindow: 8000 },
  { id: 'model-2', name: 'Model Two', provider: 'Provider B', contextWindow: 16000 },
]

describe('ModelSelector', () => {
  it('renders with placeholder when no value', () => {
    render(<ModelSelector models={models} />)
    expect(screen.getByText('Select a model…')).toBeInTheDocument()
  })

  it('shows selected model name', () => {
    render(<ModelSelector models={models} value="model-1" />)
    expect(screen.getByText('Model One')).toBeInTheDocument()
  })

  it('is disabled when disabled prop set', () => {
    render(<ModelSelector models={models} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })
})
