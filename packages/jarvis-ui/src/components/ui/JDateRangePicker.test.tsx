import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JDateRangePicker } from './JDateRangePicker'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JDateRangePicker', () => {
  it('renders a trigger button', () => {
    render(<W><JDateRangePicker /></W>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows placeholder when no range selected', () => {
    render(<W><JDateRangePicker placeholder="Select range" /></W>)
    expect(screen.getByText('Select range')).toBeInTheDocument()
  })

  it('shows formatted from date when from is set', () => {
    render(<W><JDateRangePicker value={{ from: new Date(2026, 5, 1) }} onChange={() => {}} /></W>)
    expect(screen.getByText(/01 Jun 2026/)).toBeInTheDocument()
  })

  it('opens calendar on trigger click', () => {
    render(<W><JDateRangePicker /></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('disabled prevents opening', () => {
    render(<W><JDateRangePicker disabled /></W>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByRole('grid')).toBeNull()
  })
})
