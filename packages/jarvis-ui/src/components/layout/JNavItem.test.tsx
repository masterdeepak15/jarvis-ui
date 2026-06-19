import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JNavItem } from './JNavItem'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JNavItem', () => {
  it('renders as anchor when href provided', () => {
    render(<W><JNavItem href="/dashboard" label="Dashboard" /></W>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard')
  })

  it('renders as button when no href', () => {
    render(<W><JNavItem label="Settings" /></W>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows icon', () => {
    render(<W><JNavItem icon="⊞" label="Home" /></W>)
    expect(screen.getByText('⊞')).toBeInTheDocument()
  })

  it('shows label', () => {
    render(<W><JNavItem label="Analytics" /></W>)
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('shows badge when provided', () => {
    render(<W><JNavItem label="Alerts" badge="3" /></W>)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('calls onClick when button clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<W><JNavItem label="Test" onClick={onClick} /></W>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies active styles when active=true', () => {
    const { container } = render(<W><JNavItem label="Active" active /></W>)
    const el = container.querySelector('button,a') as HTMLElement
    expect(el.style.background).toContain('var(--j-accent')
  })
})
