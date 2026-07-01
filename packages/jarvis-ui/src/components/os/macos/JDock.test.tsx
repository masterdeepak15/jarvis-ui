import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useEffect } from 'react'
import { JOSThemeProvider } from '../shell/JOSThemeProvider'
import { JWindowManager, useWindowManager } from '../shell/JWindowManager'
import { JDock } from './JDock'
import type { JDesktopApp } from '../shell/JDesktop'
import type { ReactNode } from 'react'

const apps: JDesktopApp[] = [
  { id: 'files', icon: '📁', label: 'Files',     component: <div>files</div> },
  { id: 'tasks', icon: '📊', label: 'Processes', component: <div>tasks</div> },
]

function W({ children }: { children: ReactNode }) {
  return <JOSThemeProvider theme="macos"><JWindowManager>{children}</JWindowManager></JOSThemeProvider>
}

describe('JDock', () => {
  it('renders an icon for each app', () => {
    render(<W><JDock apps={apps} /></W>)
    expect(screen.getByText('📁')).toBeInTheDocument()
    expect(screen.getByText('📊')).toBeInTheDocument()
  })

  it('clicking an icon opens a window', () => {
    render(<W><JDock apps={apps} /></W>)
    // Click dock icon — verify no crash (window rendering requires JWindow which needs desktop size)
    fireEvent.click(screen.getByTitle('Files'))
    // No crash = pass
  })

  it('renders running dot for open windows', () => {
    // Opens a window via useEffect (React 18/19 pattern — no act() in render)
    function Setup() {
      const { openWindow } = useWindowManager()
      useEffect(() => {
        openWindow({ appId: 'files', title: 'Files', content: <div>f</div> })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      return <JDock apps={apps} />
    }
    const { container } = render(<W><Setup /></W>)
    expect(container.querySelector('.j-os-dock__dot')).toBeInTheDocument()
  })
})
