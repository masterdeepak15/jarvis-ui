import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JArcMeter } from './JArcMeter'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JArcMeter', () => {
  it('renders totalArcs number of segments', () => {
    const { container } = render(<W><JArcMeter level={3} totalArcs={6} /></W>)
    expect(container.querySelectorAll('[data-testid^="arc-seg-"]').length).toBe(6)
  })

  it('custom totalArcs renders correct count', () => {
    const { container } = render(<W><JArcMeter level={2} totalArcs={8} /></W>)
    expect(container.querySelectorAll('[data-testid^="arc-seg-"]').length).toBe(8)
  })

  it('inactive segment has accent-05 background', () => {
    const { container } = render(<W><JArcMeter level={0} totalArcs={4} /></W>)
    const seg = container.querySelector('[data-testid="arc-seg-0"]') as HTMLElement
    expect(seg.style.background).toContain('j-accent-05')
  })

  it('active non-peak segment has accent background', () => {
    const { container } = render(<W><JArcMeter level={3} totalArcs={6} /></W>)
    // level=3: index 0 is active and non-peak (peak is index 2)
    const seg = container.querySelector('[data-testid="arc-seg-0"]') as HTMLElement
    expect(seg.style.background).toContain('var(--j-accent)')
    expect(seg.style.background).not.toContain('gradient')
  })

  it('peak segment (last active) has j-pulse animation', () => {
    const { container } = render(<W><JArcMeter level={3} totalArcs={6} /></W>)
    // peak is index 2 (level - 1)
    const seg = container.querySelector('[data-testid="arc-seg-2"]') as HTMLElement
    expect(seg.style.animation).toContain('j-pulse')
  })

  it('level=0 renders all segments inactive', () => {
    const { container } = render(<W><JArcMeter level={0} totalArcs={4} /></W>)
    container.querySelectorAll('[data-testid^="arc-seg-"]').forEach((seg) => {
      expect((seg as HTMLElement).style.background).toContain('j-accent-05')
    })
  })

  it('showLabel=true renders label text', () => {
    render(<W><JArcMeter level={2} showLabel label="MIC" /></W>)
    expect(screen.getByText('MIC')).toBeInTheDocument()
  })

  it('showLabel=false does not render label', () => {
    render(<W><JArcMeter level={2} showLabel={false} label="MIC" /></W>)
    expect(screen.queryByText('MIC')).not.toBeInTheDocument()
  })

  it('default label is LEVEL when showLabel=true', () => {
    render(<W><JArcMeter level={2} showLabel /></W>)
    expect(screen.getByText('LEVEL')).toBeInTheDocument()
  })

  it('showValue=true renders level/total readout', () => {
    render(<W><JArcMeter level={3} totalArcs={6} showValue /></W>)
    expect(screen.getByText('3 / 6')).toBeInTheDocument()
  })

  it('vertical orientation renders same segment count', () => {
    const { container } = render(<W><JArcMeter level={2} totalArcs={6} orientation="vertical" /></W>)
    expect(container.querySelectorAll('[data-testid^="arc-seg-"]').length).toBe(6)
  })
})
