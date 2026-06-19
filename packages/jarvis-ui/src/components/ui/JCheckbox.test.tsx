import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JCheckbox } from './JCheckbox'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JCheckbox', () => {
  it('renders a checkbox input', () => {
    const { container } = render(<W><JCheckbox /></W>)
    expect(container.querySelector('input[type="checkbox"]')).toBeTruthy()
  })

  it('shows label text', () => {
    render(<W><JCheckbox label="Accept terms" /></W>)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('calls onChange with true when checked', () => {
    const fn = vi.fn()
    render(<W><JCheckbox onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).toHaveBeenCalledWith(true)
  })

  it('calls onChange with false when unchecked', () => {
    const fn = vi.fn()
    render(<W><JCheckbox defaultChecked onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).toHaveBeenCalledWith(false)
  })

  it('controlled: checked prop controls state', () => {
    render(<W><JCheckbox checked onChange={() => {}} /></W>)
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(true)
  })

  it('disabled prevents onChange', () => {
    const fn = vi.fn()
    render(<W><JCheckbox disabled onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).not.toHaveBeenCalled()
  })
})
