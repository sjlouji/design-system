import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import { NativeSelect } from './NativeSelect'

describe('NativeSelect', () => {
  it('renders the select element', () => {
    render(
      <NativeSelect aria-label="Fruit">
        <option value="apple">Apple</option>
      </NativeSelect>
    )
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInTheDocument()
  })

  it('renders options', () => {
    render(
      <NativeSelect aria-label="Fruit">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
      </NativeSelect>
    )
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument()
  })

  it('renders placeholder as first disabled option', () => {
    render(
      <NativeSelect aria-label="Fruit" placeholder="Pick one…" defaultValue="">
        <option value="apple">Apple</option>
      </NativeSelect>
    )
    const placeholder = screen.getByRole('option', { name: 'Pick one…' })
    expect(placeholder).toBeDisabled()
  })

  it('applies error styles when error=true', () => {
    render(
      <NativeSelect aria-label="Fruit" error>
        <option value="apple">Apple</option>
      </NativeSelect>
    )
    const select = screen.getByRole('combobox', { name: 'Fruit' })
    expect(select.className).toContain('border-destructive')
    expect(select).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not apply error styles when error=false', () => {
    render(
      <NativeSelect aria-label="Fruit">
        <option value="apple">Apple</option>
      </NativeSelect>
    )
    const select = screen.getByRole('combobox', { name: 'Fruit' })
    expect(select.className).not.toContain('border-destructive')
  })

  it('is disabled when disabled=true', () => {
    render(
      <NativeSelect aria-label="Fruit" disabled>
        <option value="apple">Apple</option>
      </NativeSelect>
    )
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeDisabled()
  })
})
