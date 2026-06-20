import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JSparkline } from './JSparkline'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JSparkline', () => {
  it('renders an svg element', () => {
    const { container } = render(<W><JSparkline data={[1, 2, 3]} /></W>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders j-sparkline-line polyline for 2+ data points', () => {
    const { container } = render(<W><JSparkline data={[1, 2, 3]} /></W>)
    expect(container.querySelector('.j-sparkline-line')).toBeInTheDocument()
  })

  it('showArea=true (default) renders j-sparkline-area path', () => {
    const { container } = render(<W><JSparkline data={[1, 2, 3]} /></W>)
    expect(container.querySelector('.j-sparkline-area')).toBeInTheDocument()
  })

  it('showArea=false renders no j-sparkline-area', () => {
    const { container } = render(<W><JSparkline data={[1, 2, 3]} showArea={false} /></W>)
    expect(container.querySelector('.j-sparkline-area')).not.toBeInTheDocument()
  })

  it('renders j-sparkline-dot at last data point', () => {
    const { container } = render(<W><JSparkline data={[1, 2, 3]} /></W>)
    expect(container.querySelector('.j-sparkline-dot')).toBeInTheDocument()
  })

  it('showTrend=false (default) renders no trend span', () => {
    const { container } = render(<W><JSparkline data={[1, 2, 3]} /></W>)
    expect(container.querySelector('.j-sparkline-trend')).not.toBeInTheDocument()
  })

  it('showTrend=true renders trend icon span', () => {
    const { container } = render(<W><JSparkline data={[1, 2, 3]} showTrend /></W>)
    expect(container.querySelector('.j-sparkline-trend')).toBeInTheDocument()
  })

  it('ascending data with showTrend gets j-text-ok class', () => {
    const { container } = render(<W><JSparkline data={[1, 5, 10]} showTrend /></W>)
    expect(container.querySelector('.j-sparkline-trend.j-text-ok')).toBeInTheDocument()
  })

  it('descending data with showTrend gets j-text-err class', () => {
    const { container } = render(<W><JSparkline data={[10, 5, 1]} showTrend /></W>)
    expect(container.querySelector('.j-sparkline-trend.j-text-err')).toBeInTheDocument()
  })

  it('flat data with showTrend gets j-text-accent class', () => {
    const { container } = render(<W><JSparkline data={[5, 5, 5]} showTrend /></W>)
    expect(container.querySelector('.j-sparkline-trend.j-text-accent')).toBeInTheDocument()
  })
})
