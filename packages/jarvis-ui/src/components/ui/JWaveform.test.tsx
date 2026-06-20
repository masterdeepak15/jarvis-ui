import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JWaveform } from './JWaveform'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JWaveform', () => {
  it('container has j-waveform class', () => {
    const { container } = render(<W><JWaveform /></W>)
    expect(container.querySelector('.j-waveform')).toBeInTheDocument()
  })

  it('renders default 20 bars with j-wv class', () => {
    const { container } = render(<W><JWaveform /></W>)
    expect(container.querySelectorAll('.j-wv').length).toBe(20)
  })

  it('custom barCount renders correct number of bars', () => {
    const { container } = render(<W><JWaveform barCount={8} /></W>)
    expect(container.querySelectorAll('.j-wv').length).toBe(8)
  })

  it('active=false wrapper has 0.3 opacity', () => {
    const { container } = render(<W><JWaveform active={false} /></W>)
    const wrapper = container.querySelector('.j-waveform') as HTMLElement
    expect(wrapper.style.opacity).toBe('0.3')
  })

  it('active=true wrapper does not have reduced opacity', () => {
    const { container } = render(<W><JWaveform active /></W>)
    const wrapper = container.querySelector('.j-waveform') as HTMLElement
    expect(wrapper.style.opacity).not.toBe('0.3')
  })

  it('active=false bars have animationPlayState paused', () => {
    const { container } = render(<W><JWaveform active={false} /></W>)
    const bar = container.querySelectorAll('.j-wv')[0] as HTMLElement
    expect(bar.style.animationPlayState).toBe('paused')
  })

  it('active=true bars do not have paused animation', () => {
    const { container } = render(<W><JWaveform active /></W>)
    const bar = container.querySelectorAll('.j-wv')[0] as HTMLElement
    expect(bar.style.animationPlayState).not.toBe('paused')
  })
})
