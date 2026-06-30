import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { useEffect } from 'react'
import { JOSThemeProvider } from './JOSThemeProvider'
import { JWindowManager, useWindowManager } from './JWindowManager'
import { JWindow } from './JWindow'
import type { ReactNode } from 'react'

function W({ children, theme = 'windows11' as const }: { children: ReactNode; theme?: 'windows11' | 'macos' }) {
  return (
    <JOSThemeProvider theme={theme}>
      <JWindowManager>
        <SetDesktop w={1200} h={800} />
        {children}
      </JWindowManager>
    </JOSThemeProvider>
  )
}

function SetDesktop({ w, h }: { w: number; h: number }) {
  const { setDesktopSize } = useWindowManager()
  useEffect(() => { setDesktopSize(w, h) }, [w, h, setDesktopSize])
  return null
}

function OpenAndRender({ appId = 'test' }: { appId?: string }) {
  const { openWindow, windows } = useWindowManager()
  useEffect(() => {
    openWindow({ appId, title: 'Test Window', content: <div data-testid="app-content">hello</div> })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId])
  return (
    <>
      {windows.filter(w => !w.minimized).map(w => (
        <JWindow key={w.id} id={w.id} />
      ))}
    </>
  )
}

describe('JWindow', () => {
  it('renders title', () => {
    render(<W><OpenAndRender /></W>)
    expect(screen.getByText('Test Window')).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(<W><OpenAndRender /></W>)
    expect(screen.getByTestId('app-content')).toBeInTheDocument()
  })

  it('windows11 theme — renders win controls (minimize, maximize, close)', () => {
    render(<W theme="windows11"><OpenAndRender /></W>)
    expect(screen.getByTitle('Minimize')).toBeInTheDocument()
    expect(screen.getByTitle('Maximize')).toBeInTheDocument()
    expect(screen.getByTitle('Close')).toBeInTheDocument()
  })

  it('macos theme — renders mac traffic lights', () => {
    render(<W theme="macos"><OpenAndRender /></W>)
    expect(screen.getByTitle('Close')).toBeInTheDocument()
    expect(screen.getByTitle('Minimize')).toBeInTheDocument()
    expect(screen.getByTitle('Maximize')).toBeInTheDocument()
  })

  it('close button calls closeWindow', () => {
    render(<W><OpenAndRender /></W>)
    fireEvent.click(screen.getByTitle('Close'))
    expect(screen.queryByText('Test Window')).not.toBeInTheDocument()
  })

  it('minimize button calls minimizeWindow — removes from DOM', () => {
    render(<W><OpenAndRender /></W>)
    fireEvent.click(screen.getByTitle('Minimize'))
    expect(screen.queryByText('Test Window')).not.toBeInTheDocument()
  })

  it('maximize button toggles maximize', () => {
    const { container } = render(<W><OpenAndRender /></W>)
    fireEvent.click(screen.getByTitle('Maximize'))
    expect(container.querySelector('.j-os-window--maximized')).toBeInTheDocument()
    fireEvent.click(screen.getByTitle('Maximize'))
    expect(container.querySelector('.j-os-window--maximized')).not.toBeInTheDocument()
  })

  it('applies j-os-window--focused class when focused', () => {
    const { container } = render(<W><OpenAndRender /></W>)
    expect(container.querySelector('.j-os-window--focused')).toBeInTheDocument()
  })

  it('resize handles are present in desktop mode', () => {
    const { container } = render(<W><OpenAndRender /></W>)
    expect(container.querySelectorAll('.j-os-resize')).toHaveLength(8)
  })

  it('resize handles are hidden in compact mode', () => {
    const { container } = render(
      <JOSThemeProvider theme="windows11">
        <JWindowManager compactBreakpoint={900}>
          <SetDesktop w={600} h={800} />
          <OpenAndRender />
        </JWindowManager>
      </JOSThemeProvider>
    )
    expect(container.querySelectorAll('.j-os-resize')).toHaveLength(0)
  })
})
