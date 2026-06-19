import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JDatePicker } from './JDatePicker'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JDatePicker', () => {
  it('renders a trigger button', () => {
    render(<W><JDatePicker /></W>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows placeholder when no value', () => {
    render(<W><JDatePicker placeholder="Pick a date" /></W>)
    expect(screen.getByText('Pick a date')).toBeInTheDocument()
  })

  it('shows formatted date when value is set', () => {
    render(<W><JDatePicker value={new Date(2026, 5, 19)} onChange={() => {}} /></W>)
    expect(screen.getByText(/19 Jun 2026/)).toBeInTheDocument()
  })

  it('opens calendar popover on trigger click', () => {
    render(<W><JDatePicker /></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('disabled button cannot be clicked to open calendar', () => {
    render(<W><JDatePicker disabled /></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByRole('grid')).toBeNull()
  })
})
