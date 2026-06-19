import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JHudBar } from './JHudBar'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JHudBar', () => {
  it('renders top bar', () => {
    const { container } = render(<W><JHudBar position="top" /></W>)
    expect(container.querySelector('.j-hud-bar-top')).toBeTruthy()
  })

  it('renders bottom bar', () => {
    const { container } = render(<W><JHudBar position="bottom" /></W>)
    expect(container.querySelector('.j-hud-bar-bot')).toBeTruthy()
  })

  it('shows system label', () => {
    render(<W><JHudBar systemLabel="ALPHA·01" /></W>)
    expect(screen.getByText('ALPHA·01')).toBeInTheDocument()
  })

  it('shows LIVE indicator when showLive=true', () => {
    render(<W><JHudBar showLive /></W>)
    expect(screen.getByText(/LIVE/)).toBeInTheDocument()
  })

  it('does not show LIVE when showLive=false', () => {
    render(<W><JHudBar showLive={false} /></W>)
    expect(screen.queryByText(/LIVE/)).toBeNull()
  })

  it('shows REC indicator when showRec=true', () => {
    render(<W><JHudBar showRec /></W>)
    expect(screen.getByText(/REC/)).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<W><JHudBar><span>custom</span></JHudBar></W>)
    expect(screen.getByText('custom')).toBeInTheDocument()
  })

  it('applies color class', () => {
    const { container } = render(<W><JHudBar color="amber" /></W>)
    expect(container.querySelector('.j-color-amber')).toBeTruthy()
  })
})
