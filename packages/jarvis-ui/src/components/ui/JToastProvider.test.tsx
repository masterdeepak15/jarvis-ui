import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JToastProvider, useToast } from './JToastProvider'
import type { JState } from '../../theme/JarvisTokens'
import type { ReactNode } from 'react'

function W({ children }: { children: ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

function AutoShow({ state, message, title, duration }: { state: JState; message: string; title?: string; duration?: number }) {
  const { show } = useToast()
  React.useEffect(() => { show(state, message, title, duration) }, [])
  return null
}

function ManualControl() {
  const { show, dismiss } = useToast()
  const idRef = React.useRef('')
  return (
    <>
      <button onClick={() => { idRef.current = show('active', 'Persistent', undefined, 0) }}>Add</button>
      <button onClick={() => dismiss(idRef.current)}>Remove</button>
    </>
  )
}

describe('JToastProvider + useToast', () => {
  it('show() adds toast message to DOM', () => {
    render(
      <W>
        <JToastProvider>
          <AutoShow state="active" message="Hello World" duration={0} />
        </JToastProvider>
      </W>
    )
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('show() with title renders title', () => {
    render(
      <W>
        <JToastProvider>
          <AutoShow state="warning" message="Check disk" title="WARNING" duration={0} />
        </JToastProvider>
      </W>
    )
    expect(screen.getByText('WARNING')).toBeInTheDocument()
    expect(screen.getByText('Check disk')).toBeInTheDocument()
  })

  it('dismiss(id) removes toast from DOM', () => {
    render(
      <W>
        <JToastProvider>
          <ManualControl />
        </JToastProvider>
      </W>
    )
    fireEvent.click(screen.getByText('Add'))
    expect(screen.getByText('Persistent')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Remove'))
    expect(screen.queryByText('Persistent')).not.toBeInTheDocument()
  })

  it('duration > 0 auto-dismisses after timeout', async () => {
    vi.useFakeTimers()
    render(
      <W>
        <JToastProvider>
          <AutoShow state="active" message="Timed Out" duration={3000} />
        </JToastProvider>
      </W>
    )
    expect(screen.getByText('Timed Out')).toBeInTheDocument()
    await act(async () => { vi.advanceTimersByTime(3100) })
    expect(screen.queryByText('Timed Out')).not.toBeInTheDocument()
    vi.useRealTimers()
  })

  it('duration=0 does NOT auto-dismiss', async () => {
    vi.useFakeTimers()
    render(
      <W>
        <JToastProvider>
          <AutoShow state="active" message="Stays" duration={0} />
        </JToastProvider>
      </W>
    )
    await act(async () => { vi.advanceTimersByTime(10000) })
    expect(screen.getByText('Stays')).toBeInTheDocument()
    vi.useRealTimers()
  })

  it('useToast() outside JToastProvider throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    function Bad() { useToast(); return null }
    expect(() => render(<Bad />)).toThrow('useToast must be used within JToastProvider')
    spy.mockRestore()
  })

  it('multiple toasts stack in DOM', () => {
    function MultiShow() {
      const { show } = useToast()
      React.useEffect(() => {
        show('active',  'First',  undefined, 0)
        show('warning', 'Second', undefined, 0)
        show('error',   'Third',  undefined, 0)
      }, [])
      return null
    }
    render(
      <W>
        <JToastProvider>
          <MultiShow />
        </JToastProvider>
      </W>
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('Third')).toBeInTheDocument()
  })
})
