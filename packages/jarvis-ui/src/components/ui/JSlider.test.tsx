import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JSlider } from './JSlider'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JSlider', () => {
  it('renders a range input', () => {
    const { container } = render(<W><JSlider /></W>)
    expect(container.querySelector('input[type="range"]')).toBeTruthy()
  })

  it('shows current value label by default', () => {
    render(<W><JSlider value={42} onChange={() => {}} /></W>)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('hides value label when showValue=false', () => {
    render(<W><JSlider value={42} onChange={() => {}} showValue={false} /></W>)
    expect(screen.queryByText('42')).toBeNull()
  })

  it('calls onChange with numeric value', () => {
    const fn = vi.fn()
    render(<W><JSlider value={50} onChange={fn} /></W>)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '75' } })
    expect(fn).toHaveBeenCalledWith(75)
  })

  it('respects min and max props', () => {
    const { container } = render(<W><JSlider min={10} max={50} /></W>)
    const input = container.querySelector('input[type="range"]') as HTMLInputElement
    expect(input.min).toBe('10')
    expect(input.max).toBe('50')
  })

  it('disabled prevents interaction', () => {
    const { container } = render(<W><JSlider disabled /></W>)
    expect((container.querySelector('input[type="range"]') as HTMLInputElement).disabled).toBe(true)
  })
})
