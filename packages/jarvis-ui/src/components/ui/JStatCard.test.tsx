import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JStatCard } from './JStatCard'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JStatCard', () => {
  it('renders title', () => {
    render(<W><JStatCard title="CPU" value="74%" /></W>)
    expect(screen.getByText('CPU')).toBeInTheDocument()
  })

  it('renders value', () => {
    render(<W><JStatCard title="CPU" value="74%" /></W>)
    expect(screen.getByText('74%')).toBeInTheDocument()
  })

  it('renders sub when provided', () => {
    render(<W><JStatCard title="CPU" value="74%" sub="8 cores" /></W>)
    expect(screen.getByText('8 cores')).toBeInTheDocument()
  })

  it('no sub element when sub omitted', () => {
    render(<W><JStatCard title="CPU" value="74%" /></W>)
    expect(screen.queryByText('8 cores')).not.toBeInTheDocument()
  })

  it('badge prop renders badge text', () => {
    render(<W><JStatCard title="CPU" value="74%" badge="ONLINE" /></W>)
    expect(screen.getByText('ONLINE')).toBeInTheDocument()
  })

  it('no badge when badge prop omitted', () => {
    render(<W><JStatCard title="CPU" value="74%" /></W>)
    expect(screen.queryByText('ONLINE')).not.toBeInTheDocument()
  })

  it('barValue prop renders a progress track div', () => {
    const { container } = render(<W><JStatCard title="CPU" value="74%" barValue={74} /></W>)
    const tracks = Array.from(container.querySelectorAll('div')).filter(d =>
      d.style.background?.includes('j-accent-08')
    )
    expect(tracks.length).toBeGreaterThanOrEqual(1)
  })

  it('no progress track when barValue omitted', () => {
    const { container } = render(<W><JStatCard title="CPU" value="74%" /></W>)
    const tracks = Array.from(container.querySelectorAll('div')).filter(d =>
      d.style.background?.includes('j-accent-08')
    )
    expect(tracks.length).toBe(0)
  })

  it('dataRows renders j-data-row elements', () => {
    render(
      <W>
        <JStatCard
          title="CPU"
          value="74%"
          dataRows={[
            { label: 'Core 1', value: '80%', barPercent: 80 },
            { label: 'Core 2', value: '60%' },
          ]}
        />
      </W>
    )
    expect(screen.getByText('Core 1')).toBeInTheDocument()
    expect(screen.getByText('Core 2')).toBeInTheDocument()
  })

  it('no data rows when dataRows omitted', () => {
    render(<W><JStatCard title="CPU" value="74%" /></W>)
    expect(screen.queryAllByText('Core 1').length).toBe(0)
  })

  it('children slot renders', () => {
    render(<W><JStatCard title="CPU" value="74%"><span>Custom</span></JStatCard></W>)
    expect(screen.getByText('Custom')).toBeInTheDocument()
  })

  it('warning state colors value div', () => {
    const { container } = render(<W><JStatCard title="CPU" value="HIGH" state="warning" /></W>)
    const val = container.querySelector('.j-text-warn')
    expect(val).toBeInTheDocument()
  })

  it('error state colors value div', () => {
    const { container } = render(<W><JStatCard title="CPU" value="FAIL" state="error" /></W>)
    expect(container.querySelector('.j-text-err')).toBeInTheDocument()
  })

  it('showStatusDot=true renders j-status-dot in sub row', () => {
    const { container } = render(<W><JStatCard title="CPU" value="74%" sub="nominal" showStatusDot /></W>)
    expect(container.querySelector('.j-status-dot')).toBeInTheDocument()
  })
})
