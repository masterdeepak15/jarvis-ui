import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JSpinner } from './JSpinner'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JSpinner', () => {
  it('renders without crashing', () => {
    render(<W><JSpinner /></W>)
  })

  it('shows label when showLabel=true and label is provided', () => {
    render(<W><JSpinner label="LOADING" showLabel /></W>)
    expect(screen.getByText('LOADING')).toBeInTheDocument()
  })

  it('hides label when showLabel=false', () => {
    render(<W><JSpinner label="LOADING" showLabel={false} /></W>)
    expect(screen.queryByText('LOADING')).toBeNull()
  })

  it('applies correct size via style', () => {
    const { container } = render(<W><JSpinner size="80px" /></W>)
    const wrapper = container.firstChild!.firstChild as HTMLElement
    expect(wrapper.style.width).toBe('80px')
    expect(wrapper.style.height).toBe('80px')
  })
})
