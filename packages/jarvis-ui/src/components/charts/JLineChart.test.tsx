import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JLineChart } from './JLineChart'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

const DATA2 = [{ label: 'A', value: 10 }, { label: 'B', value: 20 }]

describe('JLineChart', () => {
  it('renders an svg element', () => {
    const { container } = render(<W><JLineChart data={DATA2} /></W>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders j-chart-line polyline', () => {
    const { container } = render(<W><JLineChart data={DATA2} /></W>)
    expect(container.querySelector('.j-chart-line')).toBeInTheDocument()
  })

  it('showArea=false (default) renders no j-chart-area path', () => {
    const { container } = render(<W><JLineChart data={DATA2} /></W>)
    expect(container.querySelector('.j-chart-area')).not.toBeInTheDocument()
  })

  it('showArea=true renders j-chart-area path', () => {
    const { container } = render(<W><JLineChart data={DATA2} showArea /></W>)
    expect(container.querySelector('.j-chart-area')).toBeInTheDocument()
  })

  it('showDots=true (default) renders j-chart-dot circles equal to data length', () => {
    const { container } = render(<W><JLineChart data={DATA2} /></W>)
    expect(container.querySelectorAll('.j-chart-dot').length).toBe(2)
  })

  it('showDots=false renders no j-chart-dot circles', () => {
    const { container } = render(<W><JLineChart data={DATA2} showDots={false} /></W>)
    expect(container.querySelector('.j-chart-dot')).not.toBeInTheDocument()
  })

  it('renders j-chart-grid lines when showGrid=true (default)', () => {
    const { container } = render(<W><JLineChart data={DATA2} /></W>)
    expect(container.querySelectorAll('.j-chart-grid').length).toBeGreaterThan(0)
  })

  it('showGrid=false renders no j-chart-grid lines', () => {
    const { container } = render(<W><JLineChart data={DATA2} showGrid={false} /></W>)
    expect(container.querySelector('.j-chart-grid')).not.toBeInTheDocument()
  })

  it('renders j-chart-scan div', () => {
    const { container } = render(<W><JLineChart data={DATA2} /></W>)
    expect(container.querySelector('.j-chart-scan')).toBeInTheDocument()
  })
})
