import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JGaugeChart } from './JGaugeChart'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JGaugeChart', () => {
  it('renders svg', () => {
    const { container } = render(<W><JGaugeChart value={50} /></W>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('value=50 renders 2 path elements (track + value arc)', () => {
    const { container } = render(<W><JGaugeChart value={50} /></W>)
    expect(container.querySelectorAll('path').length).toBe(2)
  })

  it('value=0 renders 1 path element (track only, no value arc)', () => {
    const { container } = render(<W><JGaugeChart value={0} /></W>)
    expect(container.querySelectorAll('path').length).toBe(1)
  })

  it('showNeedle=true (default) renders j-chart-gauge-needle line', () => {
    const { container } = render(<W><JGaugeChart value={50} /></W>)
    expect(container.querySelector('.j-chart-gauge-needle')).toBeInTheDocument()
  })

  it('showNeedle=false renders no needle', () => {
    const { container } = render(<W><JGaugeChart value={50} showNeedle={false} /></W>)
    expect(container.querySelector('.j-chart-gauge-needle')).not.toBeInTheDocument()
  })

  it('showNeedle=true renders j-chart-gauge-hub circle', () => {
    const { container } = render(<W><JGaugeChart value={50} /></W>)
    expect(container.querySelector('.j-chart-gauge-hub')).toBeInTheDocument()
  })

  it('label prop renders label text', () => {
    render(<W><JGaugeChart value={50} label="POWER" /></W>)
    expect(screen.getByText('POWER')).toBeInTheDocument()
  })

  it('displayValue overrides computed value text', () => {
    render(<W><JGaugeChart value={50} displayValue="HALF" /></W>)
    expect(screen.getByText('HALF')).toBeInTheDocument()
  })

  it('showMinMax=true renders min and max text elements', () => {
    render(<W><JGaugeChart value={50} min={0} max={100} showMinMax /></W>)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('showTicks=true (default) renders j-chart-gauge-tick lines', () => {
    const { container } = render(<W><JGaugeChart value={50} ticks={8} /></W>)
    expect(container.querySelectorAll('.j-chart-gauge-tick').length).toBe(9)
  })
})
