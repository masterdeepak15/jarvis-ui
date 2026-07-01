import { useEffect, useRef, useCallback } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { JOSThemeProvider, useOSTheme } from './JOSThemeProvider'
import { JWindowManager, useWindowManager } from './JWindowManager'
import { JWindow } from './JWindow'
// Imported lazily to avoid circular — these are defined in tasks 5 & 6
import { JTaskbar } from '../windows/JTaskbar'
import { JDock }    from '../macos/JDock'
import { JMenuBar } from '../macos/JMenuBar'

export interface JDesktopApp {
  id:             string
  icon:           string
  label:          string
  component:      ReactNode
  defaultWidth?:  number
  defaultHeight?: number
}

export interface JDesktopProps {
  theme:               'windows11' | 'macos'
  apps:                JDesktopApp[]
  wallpaper?:          string
  compactBreakpoint?:  number
  initialWindows?:     string[]
}

function JDesktopInner({ apps, wallpaper, initialWindows }: Omit<JDesktopProps, 'theme' | 'compactBreakpoint'>) {
  const { windows, openWindow, setDesktopSize } = useWindowManager()
  const theme = useOSTheme()
  const ref   = useRef<HTMLDivElement>(null)
  const isWin = theme === 'windows11'

  // ResizeObserver — inject desktop bounds into the window manager
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setDesktopSize(Math.round(width), Math.round(height))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [setDesktopSize])

  // Open initial windows on mount — run once only (eslint: exhaustive-deps intentionally skipped)
  useEffect(() => {
    if (!initialWindows?.length) return
    for (const appId of initialWindows) {
      const app = apps.find(a => a.id === appId)
      if (app) {
        openWindow({
          appId:   app.id,
          title:   app.label,
          icon:    app.icon,
          content: app.component,
          width:   app.defaultWidth,
          height:  app.defaultHeight,
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDblClick = useCallback((app: JDesktopApp) => {
    openWindow({
      appId:   app.id,
      title:   app.label,
      icon:    app.icon,
      content: app.component,
      width:   app.defaultWidth,
      height:  app.defaultHeight,
    })
  }, [openWindow])

  const desktopStyle: CSSProperties = {
    position:   'relative',
    width:      '100%',
    height:     '100%',
    background: wallpaper ?? 'var(--os-bg)',
    overflow:   'hidden',
  }

  return (
    <div ref={ref} className="j-os-desktop" style={desktopStyle}>
      {/* macOS menu bar at top */}
      {!isWin && <JMenuBar appName="Desktop" />}

      {/* Desktop icons */}
      <div
        className="j-os-desktop__icons"
        style={{ top: isWin ? 12 : 'calc(var(--os-menubar-h) + 12px)' } as CSSProperties}
      >
        {apps.map(app => (
          <div
            key={app.id}
            data-app-id={app.id}
            className="j-os-icon"
            onDoubleClick={() => handleDblClick(app)}
          >
            <span className="j-os-icon__emoji">{app.icon}</span>
            <span className="j-os-icon__label">{app.label}</span>
          </div>
        ))}
      </div>

      {/* Open (non-minimized) windows */}
      {windows.filter(w => !w.minimized).map(w => (
        <JWindow key={w.id} id={w.id} />
      ))}

      {/* Chrome: taskbar (Windows) or dock (macOS) */}
      {isWin ? <JTaskbar apps={apps} /> : <JDock apps={apps} />}
    </div>
  )
}

export function JDesktop({
  theme,
  apps,
  wallpaper,
  compactBreakpoint = 900,
  initialWindows,
}: JDesktopProps) {
  return (
    <JOSThemeProvider theme={theme}>
      <JWindowManager compactBreakpoint={compactBreakpoint}>
        <JDesktopInner apps={apps} wallpaper={wallpaper} initialWindows={initialWindows} />
      </JWindowManager>
    </JOSThemeProvider>
  )
}
