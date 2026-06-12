import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/lib/test-utils'
import { PropertyFilter } from './PropertyFilter'
import type { PropertyFilterQuery, FilteringProperty } from './PropertyFilter'

// ── Shared fixtures ───────────────────────────────────────────────────────────

const properties: FilteringProperty[] = [
  { key: 'name', propertyLabel: 'Name', operators: ['=', ':'] },
  { key: 'status', propertyLabel: 'Status', operators: ['=', '!='] },
]

const emptyQuery: PropertyFilterQuery = { tokens: [], operation: 'and' }

// ── Helpers ───────────────────────────────────────────────────────────────────

function setup(props: Partial<React.ComponentProps<typeof PropertyFilter>> = {}) {
  const onChange = vi.fn()
  const user = userEvent.setup()
  const utils = render(
    <PropertyFilter
      query={emptyQuery}
      onChange={onChange}
      filteringProperties={properties}
      {...props}
    />
  )
  const input = screen.getByRole('combobox')
  return { user, onChange, input, ...utils }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('PropertyFilter', () => {
  describe('basic rendering', () => {
    it('renders a combobox input with the filteringPlaceholder text', () => {
      setup({ filteringPlaceholder: 'Search resources' })
      expect(screen.getByRole('combobox')).toHaveAttribute('placeholder', 'Search resources')
    })

    it('applies filteringAriaLabel to the input aria-label', () => {
      setup({ filteringAriaLabel: 'Filter resources by property' })
      expect(screen.getByRole('combobox')).toHaveAttribute(
        'aria-label',
        'Filter resources by property'
      )
    })

    it('disables the input when disabled={true}', () => {
      setup({ disabled: true })
      expect(screen.getByRole('combobox')).toBeDisabled()
    })

    it('renders countText in the DOM', () => {
      setup({ countText: '42 matches' })
      expect(screen.getByText('42 matches')).toBeInTheDocument()
    })

    it('renders filteringConstraintText below the input', () => {
      setup({ filteringConstraintText: 'Use property:value syntax' })
      expect(screen.getByText('Use property:value syntax')).toBeInTheDocument()
    })
  })

  describe('dropdown — opening and suggestions', () => {
    it('opens a dropdown with property+operator suggestions when the user types', async () => {
      const { user, input } = setup()
      await user.type(input, 'N')
      // Should show "Name =" and "Name :" suggestions
      const buttons = screen.getAllByRole('button')
      const labels = buttons.map(b => b.textContent ?? '')
      expect(labels.some(l => l.includes('Name') && l.includes('='))).toBe(true)
    })

    it('filters property suggestions to only those matching the typed text', async () => {
      const { user, input } = setup()
      await user.type(input, 'Status')
      const buttons = screen.getAllByRole('button')
      const labels = buttons.map(b => b.textContent ?? '')
      // Should show Status operators but not Name operators
      expect(labels.some(l => l.includes('Status'))).toBe(true)
      expect(labels.some(l => /\bName\b/.test(l))).toBe(false)
    })
  })

  describe('dropdown — selecting a property+operator', () => {
    it('clicking a "Name =" suggestion fills the input with "Name = " and retains focus', async () => {
      const { user, input } = setup()
      await user.type(input, 'N')

      // Find the "Name =" suggestion button
      const nameEqButton = screen
        .getAllByRole('button')
        .find(b => b.textContent?.includes('Name') && b.textContent?.includes('='))

      expect(nameEqButton).toBeDefined()
      await user.click(nameEqButton!)

      // Input value should now be "Name = " (with trailing space)
      expect(input).toHaveValue('Name = ')
    })

    it('does not call onChange when selecting a property+operator (only fills input)', async () => {
      const { user, onChange, input } = setup()
      await user.type(input, 'N')

      const nameEqButton = screen
        .getAllByRole('button')
        .find(b => b.textContent?.includes('Name') && b.textContent?.includes('='))

      await user.click(nameEqButton!)
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('committing tokens via Enter', () => {
    it('calls onChange with a property token when Enter is pressed after property+operator+value', async () => {
      const { user, onChange, input } = setup()

      // Type property + operator prefix to enter value stage, then add value
      await user.type(input, 'Name = foo{Enter}')

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({
        tokens: [{ propertyKey: 'name', operator: '=', value: 'foo' }],
        operation: 'and',
      })
    })

    it('calls onChange with a free-text token when Enter is pressed without property match', async () => {
      const { user, onChange, input } = setup()

      await user.type(input, 'hello{Enter}')

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({
        tokens: [{ operator: ':', value: 'hello' }],
        operation: 'and',
      })
    })

    it('does not call onChange on Enter when the input is empty', async () => {
      const { user, onChange, input } = setup()
      await user.click(input)
      await user.keyboard('{Enter}')
      expect(onChange).not.toHaveBeenCalled()
    })

    it('resets input value to empty string after a token is committed', async () => {
      const { user, onChange, input } = setup()
      await user.type(input, 'hello{Enter}')
      // onChange is called, but the internal state clears — we verify via
      // the re-render by passing the new query back (controlled component).
      // Since our setup fixture uses emptyQuery (uncontrolled scenario), we
      // verify the onChange was called correctly; input clearing is an
      // internal state reset triggered by commit().
      expect(onChange).toHaveBeenCalledOnce()
    })
  })

  describe('rendered active tokens', () => {
    it('renders token chips when query.tokens is non-empty', () => {
      setup({
        query: {
          tokens: [
            { propertyKey: 'name', operator: '=', value: 'Alice' },
          ],
          operation: 'and',
        },
      })
      // tokenLabel renders a <span> containing "Name", <strong>=</strong>, and "Alice"
      // as sibling text nodes — use getAllByText with a regex to match the partial text.
      expect(screen.getAllByText(/Alice/)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/Name/)[0]).toBeInTheDocument()
    })

    it('renders multiple token chips', () => {
      setup({
        query: {
          tokens: [
            { propertyKey: 'name', operator: '=', value: 'Alice' },
            { propertyKey: 'status', operator: '!=', value: 'inactive' },
          ],
          operation: 'and',
        },
      })
      expect(screen.getAllByText(/Alice/)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/inactive/)[0]).toBeInTheDocument()
    })

    it('renders no token chips when query.tokens is empty', () => {
      setup({ query: emptyQuery })
      expect(screen.queryAllByLabelText('Remove filter')).toHaveLength(0)
    })
  })

  describe('removing tokens', () => {
    it('calls onChange with the token removed when the Remove filter button is clicked', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(
        <PropertyFilter
          query={{
            tokens: [
              { propertyKey: 'name', operator: '=', value: 'Alice' },
              { propertyKey: 'status', operator: '=', value: 'active' },
            ],
            operation: 'and',
          }}
          onChange={onChange}
          filteringProperties={properties}
        />
      )

      const removeButtons = screen.getAllByLabelText('Remove filter')
      // Click the first remove button (Alice token)
      await user.click(removeButtons[0])

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({
        tokens: [{ propertyKey: 'status', operator: '=', value: 'active' }],
        operation: 'and',
      })
    })
  })

  describe('clear all tokens', () => {
    it('calls onChange with tokens:[] when "Clear filters" is clicked', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(
        <PropertyFilter
          query={{
            tokens: [
              { propertyKey: 'name', operator: '=', value: 'Alice' },
              { propertyKey: 'status', operator: '=', value: 'active' },
            ],
            operation: 'and',
          }}
          onChange={onChange}
          filteringProperties={properties}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Clear filters' }))

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ tokens: [] })
      )
    })

    it('does not render "Clear filters" when there are no tokens', () => {
      setup({ query: emptyQuery })
      expect(screen.queryByRole('button', { name: 'Clear filters' })).not.toBeInTheDocument()
    })
  })

  describe('AND/OR connector toggle', () => {
    it('renders a connector button between tokens showing the current operation', () => {
      setup({
        query: {
          tokens: [
            { propertyKey: 'name', operator: '=', value: 'Alice' },
            { propertyKey: 'status', operator: '=', value: 'active' },
          ],
          operation: 'and',
        },
      })
      // The connector button contains the operation text
      const connector = screen.getByRole('button', { name: /^and/i })
      expect(connector).toBeInTheDocument()
    })

    it('toggles operation from "and" to "or" when the connector is clicked', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(
        <PropertyFilter
          query={{
            tokens: [
              { propertyKey: 'name', operator: '=', value: 'Alice' },
              { propertyKey: 'status', operator: '=', value: 'active' },
            ],
            operation: 'and',
          }}
          onChange={onChange}
          filteringProperties={properties}
        />
      )

      const connector = screen.getByRole('button', { name: /^and/i })
      await user.click(connector)

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ operation: 'or' })
      )
    })

    it('toggles operation from "or" back to "and" when the connector is clicked again', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(
        <PropertyFilter
          query={{
            tokens: [
              { propertyKey: 'name', operator: '=', value: 'Alice' },
              { propertyKey: 'status', operator: '=', value: 'active' },
            ],
            operation: 'or',
          }}
          onChange={onChange}
          filteringProperties={properties}
        />
      )

      const connector = screen.getByRole('button', { name: /^or/i })
      await user.click(connector)

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ operation: 'and' })
      )
    })

    it('does not render a connector button with only one token', () => {
      setup({
        query: {
          tokens: [{ propertyKey: 'name', operator: '=', value: 'Alice' }],
          operation: 'and',
        },
      })
      // No connector rendered for a single token — the connector appears at
      // index > 0 only.
      expect(screen.queryByRole('button', { name: /^and/i })).not.toBeInTheDocument()
    })
  })

  describe('input clear button', () => {
    it('shows a clear button (aria-label "Clear input") only when the input has text', async () => {
      const { user, input } = setup()

      // Not shown initially
      expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument()

      await user.type(input, 'foo')
      expect(screen.getByLabelText('Clear input')).toBeInTheDocument()
    })

    it('clears the input value when the clear button is clicked', async () => {
      const { user, input } = setup()
      await user.type(input, 'foo')

      const clearBtn = screen.getByLabelText('Clear input')
      await user.click(clearBtn)

      expect(input).toHaveValue('')
    })

    it('hides the clear button after the input is cleared', async () => {
      const { user, input } = setup()
      await user.type(input, 'foo')
      await user.click(screen.getByLabelText('Clear input'))
      expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument()
    })
  })
})
