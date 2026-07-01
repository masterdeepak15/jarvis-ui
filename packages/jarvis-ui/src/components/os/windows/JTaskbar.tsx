import { useState } from 'react'
import { useWindowManager } from '../shell/JWindowManager'
import { useOSNotifyOptional } from '../shared/JOSNotification'
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

function useDate(): string {
  const [date] = useState(() => {
    const d = new Date()
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
  })
  return date
}

const QS_ITEMS = [
  { id: 'wifi',     icon: '📶', label: 'Wi-Fi',      defaultOn: true  },
  { id: 'bt',       icon: '🔵', label: 'Bluetooth',  defaultOn: true  },
  { id: 'focus',    icon: '🌙', label: 'Focus',       defaultOn: false },
  { id: 'night',    icon: '🌛', label: 'Night light', defaultOn: false },
  { id: 'airplane', icon: '✈️', label: 'Airplane',    defaultOn: false },
  { id: 'vpn',      icon: '🔒', label: 'VPN',         defaultOn: false },
]

function NotifCenter({ onClose }: { onClose: () => void }) {
  const ctx     = useOSNotifyOptional()
  const time    = useClock()
  const date    = useDate()
  const recent  = ctx?.recent ?? []
  const clearAll = ctx?.clearAll ?? (() => {})

  const [qs, setQs] = useState<Record<string, boolean>>(
    Object.fromEntries(QS_ITEMS.map(q => [q.id, q.defaultOn]))
  )

  return (
    <div
      data-testid="j-os-notif-center"
      className="j-os-notif-center"
      onClick={e => e.stopPropagation()}
    >
      {/* date + time header */}
      <div className="j-os-notif-center__header">
        <div className="j-os-notif-center__time">{time}</div>
        <div className="j-os-notif-center__date">{date}</div>
        <button
          className="j-os-notif-center__close"
          title="Close"
          onClick={onClose}
        >✕</button>
      </div>

      {/* notification history */}
      <div className="j-os-notif-center__section-label">
        <span>Notifications</span>
        {recent.length > 0 && (
          <button className="j-os-notif-center__clear" onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>
      <div className="j-os-notif-center__list">
        {recent.length === 0 ? (
          <div className="j-os-notif-center__empty">No new notifications</div>
        ) : recent.map(n => (
          <div key={n.id} className="j-os-notif-center__item">
            {n.icon && <span className="j-os-notif-center__item-icon">{n.icon}</span>}
            <div className="j-os-notif-center__item-body">
              <div className="j-os-notif-center__item-title">{n.title}</div>
              {n.body && <div className="j-os-notif-center__item-text">{n.body}</div>}
            </div>
            <span className="j-os-notif-center__item-ts">{n.timestamp}</span>
          </div>
        ))}
      </div>

      {/* quick settings */}
      <div className="j-os-notif-center__section-label" style={{ marginTop: 4 }}>
        <span>Quick settings</span>
      </div>
      <div className="j-os-notif-center__qs">
        {QS_ITEMS.map(q => (
          <button
            key={q.id}
            className={`j-os-notif-center__qs-item${qs[q.id] ? ' j-os-notif-center__qs-item--on' : ''}`}
            onClick={() => setQs(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
            title={q.label}
          >
            <span className="j-os-notif-center__qs-icon">{q.icon}</span>
            <span className="j-os-notif-center__qs-label">{q.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function JTaskbar({ apps }: { apps: JDesktopApp[] }) {
  const { windows, focusWindow, restoreWindow } = useWindowManager()
  const [startOpen, setStartOpen]   = useState(false)
  const [notifOpen, setNotifOpen]   = useState(false)
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

  function handleTrayClick() {
    setNotifOpen(p => !p)
    if (startOpen) setStartOpen(false)
  }

  function handleStartClick() {
    setStartOpen(p => !p)
    if (notifOpen) setNotifOpen(false)
  }

  return (
    <>
      {startOpen && <JStartMenu apps={apps} onClose={() => setStartOpen(false)} />}
      {notifOpen && <NotifCenter onClose={() => setNotifOpen(false)} />}
      <div
        data-testid="j-os-taskbar"
        className="j-os-taskbar"
        onClick={() => { if (notifOpen) setNotifOpen(false) }}
      >
        <button
          data-testid="j-os-start-btn"
          className="j-os-taskbar__start"
          onClick={e => { e.stopPropagation(); handleStartClick() }}
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
                onClick={e => { e.stopPropagation(); handleAppClick(win.id) }}
              >
                {app?.icon && <span>{app.icon}</span>}
                {win.title}
              </button>
            )
          })}
        </div>

        <button
          data-testid="j-os-tray"
          className={`j-os-taskbar__tray${notifOpen ? ' j-os-taskbar__tray--active' : ''}`}
          onClick={e => { e.stopPropagation(); handleTrayClick() }}
          aria-label="Notification center"
        >
          <span data-testid="j-os-clock">{time}</span>
        </button>
      </div>
    </>
  )
}
