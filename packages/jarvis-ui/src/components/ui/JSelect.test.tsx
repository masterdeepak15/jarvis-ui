import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JSelect } from './JSelect'

const OPTIONS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
]

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JSelect', () => {
  it('renders a select element', () => {
    const { container } = render(<W><JSelect options={OPTIONS} /></W>)
    expect(container.querySelector('select')).toBeTruthy()
  })

  it('renders all options', () => {
    render(<W><JSelect options={OPTIONS} /></W>)
    expect(screen.getByRole('option', { name: 'Alpha' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Beta'  })).toBeInTheDocument()
  })

  it('calls onChange with string value', () => {
    const fn = vi.fn()
    render(<W><JSelect options={OPTIONS} value="a" onChange={fn} /></W>)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'b' } })
    expect(fn).toHaveBeenCalledWith('b')
  })

  it('controlled: value prop selects the matching option', () => {
    render(<W><JSelect options={OPTIONS} value="b" onChange={() => {}} /></W>)
    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('b')
  })

  it('disabled prevents interaction', () => {
    const { container } = render(<W><JSelect options={OPTIONS} disabled /></W>)
    expect((container.querySelector('select') as HTMLSelectElement).disabled).toBe(true)
  })

  it('shows placeholder as first disabled option', () => {
    const { container } = render(<W><JSelect options={OPTIONS} placeholder="Pick one" /></W>)
    const opts = container.querySelectorAll('option')
    expect(opts[0].textContent).toBe('Pick one')
  })

  it('error state applies error border color', () => {
    const { container } = render(<W><JSelect options={OPTIONS} error /></W>)
    const sel = container.querySelector('select') as HTMLSelectElement
    expect(sel.style.borderColor).toContain('var(--j-err)')
  })
})
