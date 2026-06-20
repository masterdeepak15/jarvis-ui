import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JDonutChart } from './JDonutChart'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

const DATA = [
  { label: 'Alpha', value: 60 },
  { label: 'Beta',  value: 40 },
]

describe('JDonutChart', () => {
  it('renders svg', () => {
    const { container } = render(<W><JDonutChart data={DATA} /></W>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders j-chart-donut-seg circles equal to data length', () => {
    const { container } = render(<W><JDonutChart data={DATA} /></W>)
    expect(container.querySelectorAll('.j-chart-donut-seg').length).toBe(DATA.length)
  })

  it('total circles = track(1) + segments(data.length)', () => {
    const { container } = render(<W><JDonutChart data={DATA} /></W>)
    expect(container.querySelectorAll('circle').length).toBe(DATA.length + 1)
  })

  it('centerLabel text renders', () => {
    render(<W><JDonutChart data={DATA} centerLabel="CPU" /></W>)
    expect(screen.getByText('CPU')).toBeInTheDocument()
  })

  it('centerValue text renders', () => {
    render(<W><JDonutChart data={DATA} centerValue="42%" /></W>)
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('showLegend=true (default) renders legend rows equal to data length', () => {
    const { container } = render(<W><JDonutChart data={DATA} /></W>)
    expect(container.querySelectorAll('.j-chart-donut-legend-row').length).toBe(DATA.length)
  })

  it('showLegend=false hides legend', () => {
    const { container } = render(<W><JDonutChart data={DATA} showLegend={false} /></W>)
    expect(container.querySelector('.j-chart-donut-legend')).not.toBeInTheDocument()
  })

  it('empty data renders no segments', () => {
    const { container } = render(<W><JDonutChart data={[]} /></W>)
    expect(container.querySelectorAll('.j-chart-donut-seg').length).toBe(0)
  })
})
