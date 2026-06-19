import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JTextArea } from './JTextArea'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JTextArea', () => {
  it('renders a textarea element', () => {
    const { container } = render(<W><JTextArea /></W>)
    expect(container.querySelector('textarea')).toBeTruthy()
  })

  it('shows placeholder', () => {
    render(<W><JTextArea placeholder="Type here" /></W>)
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
  })

  it('calls onChange with string value', () => {
    const fn = vi.fn()
    render(<W><JTextArea value="" onChange={fn} /></W>)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hi' } })
    expect(fn).toHaveBeenCalledWith('hi')
  })

  it('controlled: value sets textarea content', () => {
    render(<W><JTextArea value="abc" onChange={() => {}} /></W>)
    expect(screen.getByDisplayValue('abc')).toBeInTheDocument()
  })

  it('disabled textarea cannot be interacted with', () => {
    const { container } = render(<W><JTextArea disabled /></W>)
    expect((container.querySelector('textarea') as HTMLTextAreaElement).disabled).toBe(true)
  })

  it('applies rows attribute', () => {
    const { container } = render(<W><JTextArea rows={8} /></W>)
    expect((container.querySelector('textarea') as HTMLTextAreaElement).rows).toBe(8)
  })

  it('error state applies error border color', () => {
    const { container } = render(<W><JTextArea error /></W>)
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    expect(ta.style.borderColor).toContain('var(--j-err)')
  })
})
