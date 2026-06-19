import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JHudFrameCard } from './JHudFrameCard'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JHudFrameCard', () => {
  it('renders Alpha style', () => {
    const { container } = render(<W><JHudFrameCard frameStyle="Alpha" /></W>)
    expect(container.querySelector('.j-hfc-alpha')).toBeTruthy()
  })

  it('renders Beta style', () => {
    const { container } = render(<W><JHudFrameCard frameStyle="Beta" /></W>)
    expect(container.querySelector('.j-hfc-beta')).toBeTruthy()
  })

  it('renders Gamma style', () => {
    const { container } = render(<W><JHudFrameCard frameStyle="Gamma" /></W>)
    expect(container.querySelector('.j-hfc-gamma')).toBeTruthy()
  })

  it('renders Delta style', () => {
    const { container } = render(<W><JHudFrameCard frameStyle="Delta" /></W>)
    expect(container.querySelector('.j-hfc-delta')).toBeTruthy()
  })

  it('shows title', () => {
    render(<W><JHudFrameCard title="SECTOR-7" /></W>)
    expect(screen.getByText('SECTOR-7')).toBeInTheDocument()
  })

  it('shows frameId', () => {
    render(<W><JHudFrameCard frameId="HFC-001" /></W>)
    expect(screen.getByText('HFC-001')).toBeInTheDocument()
  })

  it('renders children inside body', () => {
    render(<W><JHudFrameCard><span>Body</span></JHudFrameCard></W>)
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('applies color class', () => {
    const { container } = render(<W><JHudFrameCard color="red" /></W>)
    expect(container.querySelector('.j-color-red')).toBeTruthy()
  })
})
