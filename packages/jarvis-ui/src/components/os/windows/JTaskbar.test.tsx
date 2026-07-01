import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useEffect } from 'react'
import { JOSThemeProvider } from '../shell/JOSThemeProvider'
import { JWindowManager, useWindowManager } from '../shell/JWindowManager'
import { JTaskbar } from './JTaskbar'
import type { JDesktopApp } from '../shell/JDesktop'
import type { ReactNode } from 'react'

const apps: JDesktopApp[] = [
  { id: 'files', icon: '📁', label: 'Files',     component: <div>files</div> },
  { id: 'tasks', icon: '📊', label: 'Processes', component: <div>tasks</div> },
]

// Opens a window via useEffect (React 18/19 pattern — no act() in render)
function OpenWindow({ appId }: { appId: string }) {
  const { openWindow } = useWindowManager()
  const app = apps.find(a => a.id === appId)!
  useEffect(() => {
    openWindow({ appId: app.id, title: app.label, icon: app.icon, content: app.component })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId])
  return null
}

function W({ children }: { children: ReactNode }) {
  return (
    <JOSThemeProvider theme="windows11">
      <JWindowManager>{children}</JWindowManager>
    </JOSThemeProvider>
  )
}

describe('JTaskbar', () => {
  it('renders start button', () => {
    render(<W><JTaskbar apps={apps} /></W>)
    expect(screen.getByTestId('j-os-start-btn')).toBeInTheDocument()
  })

  it('clicking start button opens start menu', () => {
    render(<W><JTaskbar apps={apps} /></W>)
    fireEvent.click(screen.getByTestId('j-os-start-btn'))
    expect(screen.getByTestId('j-os-startmenu')).toBeInTheDocument()
  })

  it('clicking start button again closes start menu', () => {
    render(<W><JTaskbar apps={apps} /></W>)
    fireEvent.click(screen.getByTestId('j-os-start-btn'))
    fireEvent.click(screen.getByTestId('j-os-start-btn'))
    expect(screen.queryByTestId('j-os-startmenu')).not.toBeInTheDocument()
  })

  it('open windows appear as app buttons in taskbar', () => {
    render(<W><OpenWindow appId="files" /><JTaskbar apps={apps} /></W>)
    expect(screen.getByTestId('taskbar-app-files')).toBeInTheDocument()
  })

  it('clicking minimized app button restores it', () => {
    function Setup() {
      const { openWindow, minimizeWindow, windows } = useWindowManager()
      useEffect(() => {
        openWindow({ appId: 'files', title: 'Files', content: <div data-testid="files-content">f</div> })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      const id = windows[0]?.id
      useEffect(() => {
        if (id) minimizeWindow(id)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [id])
      return <JTaskbar apps={apps} />
    }
    render(<W><Setup /></W>)
    fireEvent.click(screen.getByTestId('taskbar-app-files'))
    expect(screen.queryByText('files-content')).toBeDefined()
  })

  it('renders clock in tray', () => {
    render(<W><JTaskbar apps={apps} /></W>)
    expect(screen.getByTestId('j-os-clock')).toBeInTheDocument()
  })
})
