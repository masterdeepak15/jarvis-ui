import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { act } from 'react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JBootScreen } from './JBootScreen'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

// Cumulative timing (ms):
// Phase 0 → 1: 100 + 700 = 800ms
// Phase 1 → 2: 800 + 600 = 1400ms
// Phase 2: 1400 + 8*180 + 200 = 3040ms
// Phase 3: 3040 + 900 = 3940ms
// Phase 4: 3940 + 800 = 4740ms → onComplete

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

describe('JBootScreen', () => {
  it('renders overlay on mount', () => {
    const { container } = render(<W><JBootScreen /></W>)
    expect(container.querySelector('[data-boot-phase]')).toBeInTheDocument()
  })

  it('initial data-boot-phase is 0', () => {
    const { container } = render(<W><JBootScreen /></W>)
    expect(container.querySelector('[data-boot-phase="0"]')).toBeInTheDocument()
  })

  it('renders scanline in phase 0', () => {
    const { container } = render(<W><JBootScreen /></W>)
    expect(container.querySelector('[data-scanline]')).toBeInTheDocument()
  })

  it('reaches phase 1 at ~800ms — corner brackets expand', async () => {
    const { container } = render(<W><JBootScreen /></W>)
    await act(() => vi.advanceTimersByTimeAsync(900))
    expect(container.querySelector('[data-boot-phase="1"]')).toBeInTheDocument()
  })

  it('reaches phase 2 and shows first boot log line', async () => {
    const { getByText, container } = render(<W><JBootScreen /></W>)
    await act(() => vi.advanceTimersByTimeAsync(1600))
    expect(container.querySelector('[data-boot-phase="2"]')).toBeInTheDocument()
    expect(getByText(/LOADING NEURAL CORE/)).toBeInTheDocument()
  })

  it('shows all 8 boot lines after phase 2 completes', async () => {
    const { container } = render(<W><JBootScreen /></W>)
    await act(() => vi.advanceTimersByTimeAsync(3100))
    expect(container.querySelectorAll('[data-boot-line]').length).toBe(8)
  })

  it('shows spinner at phase 3', async () => {
    const { container } = render(<W><JBootScreen /></W>)
    await act(() => vi.advanceTimersByTimeAsync(3100))
    expect(container.querySelector('[data-boot-phase="3"]')).toBeInTheDocument()
    expect(container.querySelector('[data-spinner]')).toBeInTheDocument()
  })

  it('shows INITIALISING SYSTEMS text at phase 3', async () => {
    const { getByText } = render(<W><JBootScreen /></W>)
    await act(() => vi.advanceTimersByTimeAsync(3100))
    expect(getByText(/INITIALISING SYSTEMS/)).toBeInTheDocument()
  })

  it('shows system name at phase 4', async () => {
    const { container, getAllByText } = render(<W><JBootScreen systemName="NEXUS" /></W>)
    await act(() => vi.advanceTimersByTimeAsync(4000))
    expect(container.querySelector('[data-boot-phase="4"]')).toBeInTheDocument()
    expect(getAllByText('NEXUS').length).toBeGreaterThan(0)
  })

  it('shows version text at phase 4', async () => {
    const { getByText } = render(<W><JBootScreen version="v9.9.9" /></W>)
    await act(() => vi.advanceTimersByTimeAsync(4000))
    expect(getByText(/v9\.9\.9/)).toBeInTheDocument()
  })

  it('shows ONLINE text at phase 4', async () => {
    const { getByText } = render(<W><JBootScreen /></W>)
    await act(() => vi.advanceTimersByTimeAsync(4000))
    expect(getByText(/ONLINE/)).toBeInTheDocument()
  })

  it('overlay unmounts after full sequence', async () => {
    const { container } = render(<W><JBootScreen /></W>)
    await act(() => vi.advanceTimersByTimeAsync(5000))
    expect(container.querySelector('[data-boot-phase]')).not.toBeInTheDocument()
  })

  it('calls onComplete after sequence finishes', async () => {
    const onComplete = vi.fn()
    render(<W><JBootScreen onComplete={onComplete} /></W>)
    await act(() => vi.advanceTimersByTimeAsync(5000))
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('default systemName is JARVIS', async () => {
    const { getAllByText } = render(<W><JBootScreen /></W>)
    await act(() => vi.advanceTimersByTimeAsync(4000))
    expect(getAllByText('JARVIS').length).toBeGreaterThan(0)
  })

  it('default version is v4.2.1', async () => {
    const { getByText } = render(<W><JBootScreen /></W>)
    await act(() => vi.advanceTimersByTimeAsync(4000))
    expect(getByText(/v4\.2\.1/)).toBeInTheDocument()
  })
})
