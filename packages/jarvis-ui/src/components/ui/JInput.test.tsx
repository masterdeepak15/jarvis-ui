import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JInput } from './JInput'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JInput', () => {
  it('renders an input element', () => {
    const { container } = render(<W><JInput /></W>)
    expect(container.querySelector('input')).toBeTruthy()
  })

  it('shows placeholder', () => {
    render(<W><JInput placeholder="Enter value" /></W>)
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument()
  })

  it('calls onChange with string value', () => {
    const fn = vi.fn()
    render(<W><JInput value="" onChange={fn} /></W>)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } })
    expect(fn).toHaveBeenCalledWith('hello')
  })

  it('controlled: value prop sets input value', () => {
    render(<W><JInput value="preset" onChange={() => {}} /></W>)
    expect(screen.getByDisplayValue('preset')).toBeInTheDocument()
  })

  it('disabled input cannot be interacted with', () => {
    const { container } = render(<W><JInput disabled /></W>)
    expect((container.querySelector('input') as HTMLInputElement).disabled).toBe(true)
  })

  it('error state applies error border color via inline style', () => {
    const { container } = render(<W><JInput error /></W>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.style.borderColor).toContain('var(--j-err)')
  })

  it('passes type attribute', () => {
    const { container } = render(<W><JInput type="password" /></W>)
    expect((container.querySelector('input') as HTMLInputElement).type).toBe('password')
  })
})
