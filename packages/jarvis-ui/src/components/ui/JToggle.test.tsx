import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JToggle } from './JToggle'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JToggle', () => {
  it('renders a checkbox input', () => {
    const { container } = render(<W><JToggle /></W>)
    expect(container.querySelector('input[type="checkbox"]')).toBeTruthy()
  })

  it('shows label text', () => {
    render(<W><JToggle label="Enable feature" /></W>)
    expect(screen.getByText('Enable feature')).toBeInTheDocument()
  })

  it('calls onChange with true when turned on', () => {
    const fn = vi.fn()
    render(<W><JToggle onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).toHaveBeenCalledWith(true)
  })

  it('calls onChange with false when turned off', () => {
    const fn = vi.fn()
    render(<W><JToggle defaultChecked onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).toHaveBeenCalledWith(false)
  })

  it('controlled: checked prop controls state', () => {
    render(<W><JToggle checked onChange={() => {}} /></W>)
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(true)
  })

  it('disabled prevents onChange', () => {
    const fn = vi.fn()
    render(<W><JToggle disabled onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(fn).not.toHaveBeenCalled()
  })
})
