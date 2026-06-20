import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JDivider } from './JDivider'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JDivider', () => {
  it('horizontal (default) renders two gradient line divs', () => {
    const { container } = render(<W><JDivider /></W>)
    const lines = Array.from(container.querySelectorAll('div')).filter(d =>
      d.style.background?.includes('linear-gradient')
    )
    expect(lines.length).toBeGreaterThanOrEqual(2)
  })

  it('label renders label text', () => {
    render(<W><JDivider label="SECTION" /></W>)
    expect(screen.getByText('SECTION')).toBeInTheDocument()
  })

  it('showDot=true renders diamond dot div', () => {
    const { container } = render(<W><JDivider showDot /></W>)
    const dots = Array.from(container.querySelectorAll('div')).filter(d =>
      d.style.clipPath?.includes('50%')
    )
    expect(dots.length).toBeGreaterThanOrEqual(1)
  })

  it('showDot=false with no label — no dot rendered', () => {
    const { container } = render(<W><JDivider showDot={false} /></W>)
    const dots = Array.from(container.querySelectorAll('div')).filter(d =>
      d.style.clipPath?.includes('50%')
    )
    expect(dots.length).toBe(0)
  })

  it('label takes priority over dot', () => {
    render(<W><JDivider label="TEST" showDot /></W>)
    expect(screen.getByText('TEST')).toBeInTheDocument()
  })

  it('vertical orientation sets flex-direction column', () => {
    const { container } = render(<W><JDivider orientation="vertical" /></W>)
    const root = container.querySelector('div') as HTMLElement
    expect(root.style.flexDirection).toBe('column')
  })
})
