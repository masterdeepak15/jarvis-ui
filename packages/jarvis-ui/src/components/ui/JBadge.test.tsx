import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JBadge } from './JBadge'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JBadge', () => {
  it('renders children', () => {
    render(<W><JBadge>Active</JBadge></W>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('angular shape has clip-path polygon', () => {
    const { container } = render(<W><JBadge shape="angular">Tag</JBadge></W>)
    expect((container.querySelector('span') as HTMLElement).style.clipPath).toContain('polygon')
  })

  it('pill shape has border-radius 999px', () => {
    const { container } = render(<W><JBadge shape="pill">Tag</JBadge></W>)
    expect((container.querySelector('span') as HTMLElement).style.borderRadius).toBe('999px')
  })

  it('hex shape has clip-path polygon', () => {
    const { container } = render(<W><JBadge shape="hex">Hex</JBadge></W>)
    expect((container.querySelector('span') as HTMLElement).style.clipPath).toContain('polygon')
  })

  it('diamond shape has 36px size', () => {
    const { container } = render(<W><JBadge shape="diamond">X</JBadge></W>)
    const span = container.querySelector('span') as HTMLElement
    expect(span.style.width).toBe('36px')
    expect(span.style.height).toBe('36px')
  })

  it('amber color applies warn CSS vars', () => {
    const { container } = render(<W><JBadge color="amber">Warn</JBadge></W>)
    expect((container.querySelector('span') as HTMLElement).style.background).toContain('j-warn-12')
  })

  it('red color applies err CSS vars', () => {
    const { container } = render(<W><JBadge color="red">Err</JBadge></W>)
    expect((container.querySelector('span') as HTMLElement).style.color).toContain('j-red')
  })

  it('blink=true adds j-blink class', () => {
    const { container } = render(<W><JBadge blink>Tag</JBadge></W>)
    expect(container.querySelector('.j-blink')).toBeInTheDocument()
  })

  it('blink=false (default) has no j-blink class', () => {
    const { container } = render(<W><JBadge>Tag</JBadge></W>)
    expect(container.querySelector('.j-blink')).not.toBeInTheDocument()
  })

  it('showDot=true renders j-status-dot', () => {
    const { container } = render(<W><JBadge showDot>Tag</JBadge></W>)
    expect(container.querySelector('.j-status-dot')).toBeInTheDocument()
  })

  it('showDot=false (default) has no j-status-dot', () => {
    const { container } = render(<W><JBadge>Tag</JBadge></W>)
    expect(container.querySelector('.j-status-dot')).not.toBeInTheDocument()
  })
})
