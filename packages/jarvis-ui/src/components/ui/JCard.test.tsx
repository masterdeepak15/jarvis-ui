import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JCard } from './JCard'
import type { JCardProps } from './JCard'

function W({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JCard', () => {
  it('renders children', () => {
    render(<W><JCard>Content</JCard></W>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies default style class j-card-s1', () => {
    const { container } = render(<W><JCard /></W>)
    expect(container.querySelector('.j-card-s1')).toBeTruthy()
  })

  it('applies color class', () => {
    const { container } = render(<W><JCard color="amber" /></W>)
    expect(container.querySelector('.j-color-amber')).toBeTruthy()
  })

  it('renders s1 corner bracket inner elements', () => {
    const { container } = render(<W><JCard cardStyle="CornerBracket" /></W>)
    expect(container.querySelector('.j-c-tl')).toBeTruthy()
    expect(container.querySelector('.j-c-br')).toBeTruthy()
    expect(container.querySelector('.j-inner-border')).toBeTruthy()
  })

  it('renders s2 notched inner elements', () => {
    const { container } = render(<W><JCard cardStyle="Notched" /></W>)
    expect(container.querySelector('.j-notch-border')).toBeTruthy()
    expect(container.querySelector('.j-tri-tl')).toBeTruthy()
  })

  it('renders s3 side rail inner elements', () => {
    const { container } = render(<W><JCard cardStyle="SideRail" /></W>)
    expect(container.querySelector('.j-rail')).toBeTruthy()
    expect(container.querySelector('.j-tab-top')).toBeTruthy()
  })

  it('renders s7 hexagonal ring', () => {
    const { container } = render(<W><JCard cardStyle="Hexagonal" /></W>)
    expect(container.querySelector('.j-hex-ring')).toBeTruthy()
  })

  it('renders s8 radar inner elements', () => {
    const { container } = render(<W><JCard cardStyle="Radar" /></W>)
    expect(container.querySelector('.j-radar-sweep')).toBeTruthy()
    expect(container.querySelector('.j-radar-center')).toBeTruthy()
  })

  it('renders s9 double frame with inner-frame wrapper', () => {
    const { container } = render(<W><JCard cardStyle="DoubleFrame">Hello</JCard></W>)
    expect(container.querySelector('.j-inner-frame')).toBeTruthy()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders header slot', () => {
    render(<W><JCard header={<span>HDR</span>} /></W>)
    expect(screen.getByText('HDR')).toBeInTheDocument()
  })

  it('renders footer slot', () => {
    render(<W><JCard footer={<span>FTR</span>} /></W>)
    expect(screen.getByText('FTR')).toBeInTheDocument()
  })

  it('renders all 9 card styles without throwing', () => {
    const styles: JCardProps['cardStyle'][] = [
      'CornerBracket','Notched','SideRail','GlowBorder','PartialBorder',
      'DangerPulse','Hexagonal','Radar','DoubleFrame',
    ]
    for (const cardStyle of styles) {
      expect(() => render(<W><JCard cardStyle={cardStyle} /></W>)).not.toThrow()
    }
  })
})
