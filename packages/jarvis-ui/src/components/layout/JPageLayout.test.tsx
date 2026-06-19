import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JPageLayout } from './JPageLayout'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JPageLayout', () => {
  it('renders without crashing', () => {
    render(<W><JPageLayout /></W>)
  })

  it('renders main content children', () => {
    render(<W><JPageLayout><span>Main</span></JPageLayout></W>)
    expect(screen.getByText('Main')).toBeInTheDocument()
  })

  it('renders sidebar when showSidebar=true (default)', () => {
    const { container } = render(<W><JPageLayout /></W>)
    expect(container.querySelector('.j-sidebar')).toBeTruthy()
  })

  it('hides sidebar when showSidebar=false', () => {
    const { container } = render(<W><JPageLayout showSidebar={false} /></W>)
    expect(container.querySelector('.j-sidebar')).toBeNull()
  })

  it('renders top and bottom hud bars', () => {
    const { container } = render(<W><JPageLayout /></W>)
    expect(container.querySelector('.j-hud-bar-top')).toBeTruthy()
    expect(container.querySelector('.j-hud-bar-bot')).toBeTruthy()
  })

  it('applies j-root class to wrapper', () => {
    const { container } = render(<W><JPageLayout /></W>)
    expect(container.querySelector('.j-root')).toBeTruthy()
  })

  it('renders sidebar nav children', () => {
    render(
      <W>
        <JPageLayout sidebar={<span>Nav Link</span>} />
      </W>
    )
    expect(screen.getByText('Nav Link')).toBeInTheDocument()
  })
})
