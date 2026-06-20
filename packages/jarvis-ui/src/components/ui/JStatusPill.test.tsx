import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JStatusPill } from './JStatusPill'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JStatusPill', () => {
  it('renders children', () => {
    render(<W><JStatusPill>System Online</JStatusPill></W>)
    expect(screen.getByText('System Online')).toBeInTheDocument()
  })

  it('active state (default) uses accent border', () => {
    const { container } = render(<W><JStatusPill>Active</JStatusPill></W>)
    expect((container.querySelector('div') as HTMLElement).style.borderLeft).toContain('j-accent')
  })

  it('error state uses err color in border', () => {
    const { container } = render(<W><JStatusPill state="error">Error</JStatusPill></W>)
    expect((container.querySelector('div') as HTMLElement).style.borderLeft).toContain('j-err')
  })

  it('warning state uses warn color in border', () => {
    const { container } = render(<W><JStatusPill state="warning">Warn</JStatusPill></W>)
    expect((container.querySelector('div') as HTMLElement).style.borderLeft).toContain('j-warn')
  })

  it('success state uses ok color in border', () => {
    const { container } = render(<W><JStatusPill state="success">Ok</JStatusPill></W>)
    expect((container.querySelector('div') as HTMLElement).style.borderLeft).toContain('j-ok')
  })

  it('blink=true adds j-blink-slow class', () => {
    const { container } = render(<W><JStatusPill blink>Status</JStatusPill></W>)
    expect(container.querySelector('.j-blink-slow')).toBeInTheDocument()
  })

  it('renders j-status-dot', () => {
    const { container } = render(<W><JStatusPill>Online</JStatusPill></W>)
    expect(container.querySelector('.j-status-dot')).toBeInTheDocument()
  })

  it('idle state removes dot animation', () => {
    const { container } = render(<W><JStatusPill state="idle">Idle</JStatusPill></W>)
    expect((container.querySelector('.j-status-dot') as HTMLElement).style.animation).toBe('none')
  })
})
