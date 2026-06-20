import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JHudLabel } from './JHudLabel'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JHudLabel', () => {
  it('chip variant renders j-hl-chip class', () => {
    const { container } = render(<W><JHudLabel variant="chip" text="UPLOAD" /></W>)
    expect(container.querySelector('.j-hl-chip')).toBeInTheDocument()
  })

  it('chip variant renders text', () => {
    render(<W><JHudLabel variant="chip" text="SENSOR-04" /></W>)
    expect(screen.getByText('SENSOR-04')).toBeInTheDocument()
  })

  it('callout variant renders j-hl-callout class', () => {
    const { container } = render(<W><JHudLabel variant="callout" text="NH-90" /></W>)
    expect(container.querySelector('.j-hl-callout')).toBeInTheDocument()
  })

  it('circuit variant renders j-hl-circuit class', () => {
    const { container } = render(<W><JHudLabel variant="circuit" text="SENSOR" /></W>)
    expect(container.querySelector('.j-hl-circuit')).toBeInTheDocument()
  })

  it('badge variant renders j-hl-badge class', () => {
    const { container } = render(<W><JHudLabel variant="badge" text="90" /></W>)
    expect(container.querySelector('.j-hl-badge')).toBeInTheDocument()
  })

  it('panel variant renders j-hl-panel class', () => {
    const { container } = render(<W><JHudLabel variant="panel" text="DATA" /></W>)
    expect(container.querySelector('.j-hl-panel')).toBeInTheDocument()
  })

  it('outer div has j-hl class', () => {
    const { container } = render(<W><JHudLabel variant="chip" text="X" /></W>)
    expect(container.querySelector('.j-hl')).toBeInTheDocument()
  })

  it('showLine=false omits line element for chip', () => {
    const { container } = render(<W><JHudLabel variant="chip" text="X" showLine={false} /></W>)
    expect(container.querySelector('.j-hl-line-h')).not.toBeInTheDocument()
  })

  it('subText renders in callout variant', () => {
    render(<W><JHudLabel variant="callout" text="MAIN" subText="SUB" /></W>)
    expect(screen.getByText('SUB')).toBeInTheDocument()
  })

  it('value renders in circuit variant', () => {
    render(<W><JHudLabel variant="circuit" text="SENSOR" value="99.8%" /></W>)
    expect(screen.getByText('99.8%')).toBeInTheDocument()
  })
})
