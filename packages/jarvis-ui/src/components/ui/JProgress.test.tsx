import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JProgress } from './JProgress'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JProgress - bar variant', () => {
  it('renders label', () => {
    render(<W><JProgress value={50} label="CPU Load" /></W>)
    expect(screen.getByText('CPU Load')).toBeInTheDocument()
  })

  it('value=75 sets fill width to 75%', () => {
    const { container } = render(<W><JProgress value={75} /></W>)
    const fills = container.querySelectorAll('div')
    const fill = Array.from(fills).find(d => d.style.width === '75%')
    expect(fill).toBeInTheDocument()
  })

  it('showPercent=true (default) shows percentage when label provided', () => {
    render(<W><JProgress value={42} label="RAM" showPercent /></W>)
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('showPercent=false hides percentage', () => {
    render(<W><JProgress value={42} label="RAM" showPercent={false} /></W>)
    expect(screen.queryByText('42%')).not.toBeInTheDocument()
  })

  it('indeterminate=true shows no percentage even when showPercent=true', () => {
    render(<W><JProgress value={50} label="Loading" indeterminate showPercent /></W>)
    expect(screen.queryByText('50%')).not.toBeInTheDocument()
  })

  it('indeterminate hides width fill', () => {
    const { container } = render(<W><JProgress value={50} indeterminate /></W>)
    const fills = container.querySelectorAll('div')
    const widthFill = Array.from(fills).find(d => d.style.width === '50%')
    expect(widthFill).toBeFalsy()
  })
})

describe('JProgress - ticks variant', () => {
  it('renders total tick divs (default 16)', () => {
    const { container } = render(<W><JProgress value={50} variant="ticks" /></W>)
    expect(container.querySelectorAll('.j-tk').length).toBe(16)
  })

  it('active ticks = Math.round(50/100*16) = 8 — no "off" class', () => {
    const { container } = render(<W><JProgress value={50} variant="ticks" /></W>)
    const active = Array.from(container.querySelectorAll('.j-tk')).filter(el => !el.className.includes('off'))
    expect(active.length).toBe(8)
  })

  it('custom total=10 renders 10 ticks', () => {
    const { container } = render(<W><JProgress value={50} variant="ticks" total={10} /></W>)
    expect(container.querySelectorAll('.j-tk').length).toBe(10)
  })

  it('error state applies red background to active ticks', () => {
    const { container } = render(<W><JProgress value={100} variant="ticks" state="error" /></W>)
    const activeTick = container.querySelector('.j-tk:not(.off)') as HTMLElement
    expect(activeTick?.style.background).toContain('j-red')
  })
})
