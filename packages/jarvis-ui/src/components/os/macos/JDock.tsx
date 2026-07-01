import { useWindowManager } from '../shell/JWindowManager'
import type { JDesktopApp } from '../shell/JDesktop'

export function JDock({ apps }: { apps: JDesktopApp[] }) {
  const { windows, openWindow, focusWindow, restoreWindow } = useWindowManager()

  function handleClick(app: JDesktopApp) {
    const existing = windows.find(w => w.appId === app.id)
    if (existing) {
      if (existing.minimized) restoreWindow(existing.id)
      else focusWindow(existing.id)
    } else {
      openWindow({ appId: app.id, title: app.label, icon: app.icon, content: app.component, width: app.defaultWidth, height: app.defaultHeight })
    }
  }

  return (
    <div data-testid="j-os-dock" className="j-os-dock">
      {apps.map(app => {
        const isRunning = windows.some(w => w.appId === app.id)
        return (
          <div key={app.id} className="j-os-dock__item" title={app.label} onClick={() => handleClick(app)}>
            <span className="j-os-dock__icon">{app.icon}</span>
            {isRunning && <span className="j-os-dock__dot" />}
          </div>
        )
      })}
    </div>
  )
}
