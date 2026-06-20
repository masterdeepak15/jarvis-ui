import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JRadarChart } from './JRadarChart'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

const AXES = [
  { label: 'Speed',   value: 80 },
  { label: 'Power',   value: 60 },
  { label: 'Range',   value: 70 },
  { label: 'Agility', value: 90 },
]

describe('JRadarChart', () => {
  it('renders svg', () => {
    const { container } = render(<W><JRadarChart axes={AXES} /></W>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders web ring polygons equal to rings prop', () => {
    const { container } = render(<W><JRadarChart axes={AXES} rings={4} /></W>)
    expect(container.querySelectorAll('.j-chart-radar-web').length).toBe(4)
  })

  it('renders spokes equal to axes length', () => {
    const { container } = render(<W><JRadarChart axes={AXES} /></W>)
    expect(container.querySelectorAll('.j-chart-radar-spoke').length).toBe(AXES.length)
  })

  it('renders exactly 1 data polygon', () => {
    const { container } = render(<W><JRadarChart axes={AXES} /></W>)
    expect(container.querySelectorAll('.j-chart-radar-data').length).toBe(1)
  })

  it('renders j-chart-dot circles equal to axes length', () => {
    const { container } = render(<W><JRadarChart axes={AXES} /></W>)
    expect(container.querySelectorAll('.j-chart-dot').length).toBe(AXES.length)
  })

  it('showLabels=true (default) renders axis-label text count = axes length', () => {
    const { container } = render(<W><JRadarChart axes={AXES} /></W>)
    expect(container.querySelectorAll('.j-chart-axis-label').length).toBe(AXES.length)
  })

  it('showLabels=false renders no axis labels', () => {
    const { container } = render(<W><JRadarChart axes={AXES} showLabels={false} /></W>)
    expect(container.querySelector('.j-chart-axis-label')).not.toBeInTheDocument()
  })

  it('degenerate guard: 2 axes still renders at least 3 spokes', () => {
    const { container } = render(
      <W><JRadarChart axes={[{ label: 'A', value: 10 }, { label: 'B', value: 20 }]} /></W>
    )
    expect(container.querySelectorAll('.j-chart-radar-spoke').length).toBeGreaterThanOrEqual(3)
  })
})
