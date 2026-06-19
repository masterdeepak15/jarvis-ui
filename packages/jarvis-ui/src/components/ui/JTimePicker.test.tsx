import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JTimePicker } from './JTimePicker'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JTimePicker', () => {
  it('renders two number inputs', () => {
    const { container } = render(<W><JTimePicker /></W>)
    const inputs = container.querySelectorAll('input[type="number"]')
    expect(inputs.length).toBe(2)
  })

  it('shows hours and minutes from value prop', () => {
    render(<W><JTimePicker value="14:30" onChange={() => {}} /></W>)
    expect(screen.getByDisplayValue('14')).toBeInTheDocument()
    expect(screen.getByDisplayValue('30')).toBeInTheDocument()
  })

  it('calls onChange with HH:mm string on minute blur', () => {
    const fn = vi.fn()
    render(<W><JTimePicker value="10:00" onChange={fn} /></W>)
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[1], { target: { value: '45' } })
    fireEvent.blur(inputs[1])
    expect(fn).toHaveBeenCalledWith('10:45')
  })

  it('clamps hours to 0-23 on blur', () => {
    const fn = vi.fn()
    render(<W><JTimePicker value="10:00" onChange={fn} /></W>)
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '99' } })
    fireEvent.blur(inputs[0])
    expect(fn).toHaveBeenCalledWith('23:00')
  })

  it('clamps minutes to 0-59 on blur', () => {
    const fn = vi.fn()
    render(<W><JTimePicker value="10:00" onChange={fn} /></W>)
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[1], { target: { value: '99' } })
    fireEvent.blur(inputs[1])
    expect(fn).toHaveBeenCalledWith('10:59')
  })

  it('disabled inputs cannot be changed', () => {
    const { container } = render(<W><JTimePicker disabled /></W>)
    const inputs = container.querySelectorAll('input[type="number"]')
    inputs.forEach(i => expect((i as HTMLInputElement).disabled).toBe(true))
  })
})
