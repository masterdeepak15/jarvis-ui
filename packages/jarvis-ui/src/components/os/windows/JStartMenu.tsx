import { useWindowManager } from '../shell/JWindowManager'
import type { JDesktopApp } from '../shell/JDesktop'

export interface JStartMenuProps {
  apps:    JDesktopApp[]
  onClose: () => void
}

export function JStartMenu({ apps, onClose }: JStartMenuProps) {
  const { openWindow } = useWindowManager()

  function launch(app: JDesktopApp) {
    openWindow({ appId: app.id, title: app.label, icon: app.icon, content: app.component, width: app.defaultWidth, height: app.defaultHeight })
    onClose()
  }

  return (
    <div data-testid="j-os-startmenu" className="j-os-startmenu">
      <div className="j-os-startmenu__heading">Pinned</div>
      <div className="j-os-startmenu__pinned">
        {apps.map(app => (
          <button key={app.id} className="j-os-startmenu__pin" onClick={() => launch(app)}>
            <span className="j-os-startmenu__pin-icon">{app.icon}</span>
            {app.label}
          </button>
        ))}
      </div>
    </div>
  )
}
