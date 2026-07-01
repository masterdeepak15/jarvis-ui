import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { useOSTheme } from '../shell/JOSThemeProvider'

export interface OSNotifyConfig {
  title:     string
  body?:     string
  icon?:     string
  duration?: number  // ms, default 4000; 0 = persistent
}

export interface OSNotifyRecord {
  id:        string
  title:     string
  body?:     string
  icon?:     string
  timestamp: string  // formatted HH:MM
}

interface NotifEntry extends OSNotifyConfig {
  id: string
}

interface OSNotifyContextValue {
  notify:   (config: OSNotifyConfig) => void
  recent:   OSNotifyRecord[]
  clearAll: () => void
}

const OSNotifyContext = createContext<OSNotifyContextValue | null>(null)

export function useOSNotify(): OSNotifyContextValue {
  const ctx = useContext(OSNotifyContext)
  if (!ctx) throw new Error('useOSNotify must be used inside JOSNotificationProvider')
  return ctx
}

/** Returns null when called outside JOSNotificationProvider (safe for optional consumers). */
export function useOSNotifyOptional(): OSNotifyContextValue | null {
  return useContext(OSNotifyContext)
}

const MAX_VISIBLE = 4
const MAX_RECENT  = 20

export function JOSNotificationProvider({ children }: { children: ReactNode }) {
  const notifIdRef = useRef(1)
  const [queue,   setQueue]   = useState<NotifEntry[]>([])
  const [visible, setVisible] = useState<NotifEntry[]>([])
  const visibleRef = useRef<NotifEntry[]>([])
  const [recent, setRecent]   = useState<OSNotifyRecord[]>([])
  const theme = useOSTheme()

  // Keep visibleRef in sync; use this instead of setVisible directly
  const applyVisible = useCallback((updater: (prev: NotifEntry[]) => NotifEntry[]) => {
    setVisible(prev => {
      const next = updater(prev)
      visibleRef.current = next
      return next
    })
  }, [])

  const dismiss = useCallback((id: string) => {
    applyVisible(prev => prev.filter(n => n.id !== id))
  }, [applyVisible])

  const clearAll = useCallback(() => setRecent([]), [])

  // Drain queue into visible when slots are free
  useEffect(() => {
    if (queue.length > 0 && visible.length < MAX_VISIBLE) {
      const take = Math.min(queue.length, MAX_VISIBLE - visible.length)
      applyVisible(prev => [...prev, ...queue.slice(0, take)])
      setQueue(prev => prev.slice(take))
    }
  }, [queue, visible.length, applyVisible])

  // Auto-dismiss
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    for (const n of visible) {
      const dur = n.duration ?? 4000
      if (dur > 0) {
        timers.push(setTimeout(() => dismiss(n.id), dur))
      }
    }
    return () => timers.forEach(clearTimeout)
  }, [visible, dismiss])

  const notify = useCallback((config: OSNotifyConfig) => {
    const id    = `notif-${notifIdRef.current++}`
    const entry: NotifEntry = { ...config, id }

    if (visibleRef.current.length < MAX_VISIBLE) {
      visibleRef.current = [...visibleRef.current, entry]
      setVisible(prev => [...prev, entry])
    } else {
      setQueue(q => [...q, entry])
    }

    const d = new Date()
    const ts = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
    setRecent(prev => [
      { id, title: config.title, body: config.body, icon: config.icon, timestamp: ts },
      ...prev,
    ].slice(0, MAX_RECENT))
  }, [])

  const stack = (
    <div
      data-testid="j-os-notif-stack"
      data-os-theme={theme}
      className="j-os-notif-stack"
    >
      {visible.map(n => (
        <div key={n.id} className="j-os-notif" role="alert">
          {n.icon && <span className="j-os-notif__icon">{n.icon}</span>}
          <div className="j-os-notif__body">
            <div className="j-os-notif__title">{n.title}</div>
            {n.body && <div className="j-os-notif__text">{n.body}</div>}
          </div>
          <button className="j-os-notif__close" title="Dismiss" onClick={() => dismiss(n.id)}>✕</button>
        </div>
      ))}
    </div>
  )

  return (
    <OSNotifyContext.Provider value={{ notify, recent, clearAll }}>
      {children}
      {createPortal(stack, document.body)}
    </OSNotifyContext.Provider>
  )
}
