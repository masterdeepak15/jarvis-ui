import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JRadio } from './JRadio'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JRadio', () => {
  it('renders a radio input', () => {
    const { container } = render(<W><JRadio value="opt1" /></W>)
    expect(container.querySelector('input[type="radio"]')).toBeTruthy()
  })

  it('shows label text', () => {
    render(<W><JRadio value="opt1" label="Option A" /></W>)
    expect(screen.getByText('Option A')).toBeInTheDocument()
  })

  it('calls onChange with the value string when clicked', () => {
    const fn = vi.fn()
    render(<W><JRadio value="opt1" onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('radio'))
    expect(fn).toHaveBeenCalledWith('opt1')
  })

  it('controlled: checked prop reflects state', () => {
    render(<W><JRadio value="opt1" checked onChange={() => {}} /></W>)
    expect((screen.getByRole('radio') as HTMLInputElement).checked).toBe(true)
  })

  it('disabled prevents onChange', () => {
    const fn = vi.fn()
    render(<W><JRadio value="opt1" disabled onChange={fn} /></W>)
    fireEvent.click(screen.getByRole('radio'))
    expect(fn).not.toHaveBeenCalled()
  })

  it('passes name attribute', () => {
    const { container } = render(<W><JRadio value="opt1" name="group1" /></W>)
    expect((container.querySelector('input') as HTMLInputElement).name).toBe('group1')
  })
})
