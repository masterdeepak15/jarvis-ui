import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JHudFrame } from './JHudFrame'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JHudFrame', () => {
  it('renders without crashing', () => {
    render(<W><JHudFrame /></W>)
  })

  it('renders children', () => {
    render(<W><JHudFrame><span>Content</span></JHudFrame></W>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('shows top bar by default', () => {
    const { container } = render(<W><JHudFrame /></W>)
    expect(container.querySelector('.j-hud-bar-top')).toBeTruthy()
  })

  it('hides top bar when showTop=false', () => {
    const { container } = render(<W><JHudFrame showTop={false} /></W>)
    expect(container.querySelector('.j-hud-bar-top')).toBeNull()
  })

  it('shows bottom bar by default', () => {
    const { container } = render(<W><JHudFrame /></W>)
    expect(container.querySelector('.j-hud-bar-bot')).toBeTruthy()
  })

  it('renders 4 corner brackets', () => {
    const { container } = render(<W><JHudFrame /></W>)
    const corners = container.querySelector('.j-hud-frame')
      ?.querySelectorAll('.j-hf-corner')
    expect(corners?.length).toBe(4)
  })

  it('shows systemLabel in top bar', () => {
    render(<W><JHudFrame systemLabel="CORE·SYS" /></W>)
    expect(screen.getByText('CORE·SYS')).toBeInTheDocument()
  })
})
