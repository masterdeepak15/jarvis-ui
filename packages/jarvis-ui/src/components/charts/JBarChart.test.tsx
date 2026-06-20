import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JBarChart } from './JBarChart'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

const DATA2 = [{ label: 'A', value: 10 }, { label: 'B', value: 20 }]
const DATA3 = [{ label: 'A', value: 10 }, { label: 'B', value: 20 }, { label: 'C', value: 15 }]

describe('JBarChart', () => {
  it('renders an svg element', () => {
    const { container } = render(<W><JBarChart data={DATA2} /></W>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders j-chart-bar rects equal to data length', () => {
    const { container } = render(<W><JBarChart data={DATA3} /></W>)
    expect(container.querySelectorAll('.j-chart-bar').length).toBe(3)
  })

  it('vertical (default) renders polygon notch caps equal to data length', () => {
    const { container } = render(<W><JBarChart data={DATA2} /></W>)
    expect(container.querySelectorAll('polygon').length).toBe(2)
  })

  it('horizontal orientation renders no polygon notch caps', () => {
    const { container } = render(<W><JBarChart data={DATA2} orientation="horizontal" /></W>)
    expect(container.querySelectorAll('polygon').length).toBe(0)
  })

  it('renders j-chart-scan div', () => {
    const { container } = render(<W><JBarChart data={DATA2} /></W>)
    expect(container.querySelector('.j-chart-scan')).toBeInTheDocument()
  })

  it('showValues=false (default) renders no j-chart-value-label', () => {
    const { container } = render(<W><JBarChart data={DATA2} /></W>)
    expect(container.querySelector('.j-chart-value-label')).not.toBeInTheDocument()
  })

  it('showValues=true renders value label text elements', () => {
    const { container } = render(<W><JBarChart data={[{ label: 'X', value: 100 }]} showValues /></W>)
    expect(container.querySelector('.j-chart-value-label')).toBeInTheDocument()
  })

  it('renders j-chart-bar-glow rects equal to data length', () => {
    const { container } = render(<W><JBarChart data={DATA2} /></W>)
    expect(container.querySelectorAll('.j-chart-bar-glow').length).toBe(2)
  })
})
