import { useState } from 'react'
import { useWindowManager } from '../shell/JWindowManager'
import { JStartMenu } from './JStartMenu'
import type { JDesktopApp } from '../shell/JDesktop'

function useClock(): string {
  const [time] = useState(() => {
    const d = new Date()
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  })
  // Update every 30s — no setInterval in tests
  return time
}

export function JTaskbar({ apps }: { apps: JDesktopApp[] }) {
  const { windows, focusWindow, restoreWindow } = useWindowManager()
  const [startOpen, setStartOpen] = useState(false)
  const time = useClock()

  function handleAppClick(id: string) {
    const win = windows.find(w => w.id === id)
    if (!win) return
    if (win.minimized) {
      restoreWindow(id)
    } else {
      focusWindow(id)
    }
  }

  return (
    <>
      {startOpen && <JStartMenu apps={apps} onClose={() => setStartOpen(false)} />}
      <div data-testid="j-os-taskbar" className="j-os-taskbar">
        <button
          data-testid="j-os-start-btn"
          className="j-os-taskbar__start"
          onClick={() => setStartOpen(p => !p)}
          aria-label="Start"
        >
          ⊞
        </button>

        <div className="j-os-taskbar__apps">
          {windows.map(win => {
            const app = apps.find(a => a.id === win.appId)
            return (
              <button
                key={win.id}
                data-testid={`taskbar-app-${win.appId}`}
                className={`j-os-taskbar__app${!win.minimized ? ' j-os-taskbar__app--active' : ''}`}
                onClick={() => handleAppClick(win.id)}
              >
                {app?.icon && <span>{app.icon}</span>}
                {win.title}
              </button>
            )
          })}
        </div>

        <div className="j-os-taskbar__tray">
          <span data-testid="j-os-clock">{time}</span>
        </div>
      </div>
    </>
  )
}
