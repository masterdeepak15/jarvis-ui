import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JDataRow } from './JDataRow'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JDataRow', () => {
  it('renders label and value', () => {
    render(<W><JDataRow label="CPU" value="74%" /></W>)
    expect(screen.getByText('CPU')).toBeInTheDocument()
    expect(screen.getByText('74%')).toBeInTheDocument()
  })

  it('uses j-data-row class on root', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" /></W>)
    expect(container.querySelector('.j-data-row')).toBeInTheDocument()
  })

  it('label uses j-data-key class', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" /></W>)
    expect(container.querySelector('.j-data-key')).toBeInTheDocument()
  })

  it('value uses j-data-val class', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" /></W>)
    expect(container.querySelector('.j-data-val')).toBeInTheDocument()
  })

  it('barPercent=50 renders j-data-bar with --j-w set', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" barPercent={50} /></W>)
    expect(container.querySelector('.j-data-bar')).toBeInTheDocument()
    const fill = container.querySelector('.j-data-bar-fill') as HTMLElement
    expect(fill.style.getPropertyValue('--j-w')).toBe('50%')
  })

  it('no barPercent — no j-data-bar rendered', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" /></W>)
    expect(container.querySelector('.j-data-bar')).not.toBeInTheDocument()
  })

  it('error state applies red color to value', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" state="error" /></W>)
    const val = container.querySelector('.j-data-val') as HTMLElement
    expect(val.style.color).toContain('j-red')
  })

  it('warning state applies amber color to value', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" state="warning" /></W>)
    const val = container.querySelector('.j-data-val') as HTMLElement
    expect(val.style.color).toContain('j-amber')
  })

  it('success state applies green color to bar', () => {
    const { container } = render(<W><JDataRow label="CPU" value="74%" barPercent={80} state="success" /></W>)
    const fill = container.querySelector('.j-data-bar-fill') as HTMLElement
    expect(fill.style.background).toContain('j-ok')
  })
})
