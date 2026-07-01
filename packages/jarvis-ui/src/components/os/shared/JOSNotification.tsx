import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { useOSTheme } from '../shell/JOSThemeProvider'

export interface OSNotifyConfig {
  title:     string
  body?:     string
  icon?:     string
  duration?: number  // ms, default 4000; 0 = persistent
}

interface NotifEntry extends OSNotifyConfig {
  id: string
}

interface OSNotifyContextValue {
  notify: (config: OSNotifyConfig) => void
}

const OSNotifyContext = createContext<OSNotifyContextValue | null>(null)

export function useOSNotify(): OSNotifyContextValue {
  const ctx = useContext(OSNotifyContext)
  if (!ctx) throw new Error('useOSNotify must be used inside JOSNotificationProvider')
  return ctx
}

const MAX_VISIBLE = 4
let _notifId = 1

export function JOSNotificationProvider({ children }: { children: ReactNode }) {
  const [queue,   setQueue]   = useState<NotifEntry[]>([])
  const [visible, setVisible] = useState<NotifEntry[]>([])
  const theme = useOSTheme()

  const dismiss = useCallback((id: string) => {
    setVisible(prev => prev.filter(n => n.id !== id))
  }, [])

  // Drain queue into visible when slots are free
  useEffect(() => {
    if (queue.length > 0 && visible.length < MAX_VISIBLE) {
      const take = Math.min(queue.length, MAX_VISIBLE - visible.length)
      setVisible(prev => [...prev, ...queue.slice(0, take)])
      setQueue(prev => prev.slice(take))
    }
  }, [queue, visible.length])

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
    const entry: NotifEntry = { ...config, id: `notif-${_notifId++}` }
    setVisible(prev => {
      if (prev.length < MAX_VISIBLE) return [...prev, entry]
      // queue it
      setQueue(q => [...q, entry])
      return prev
    })
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
    <OSNotifyContext.Provider value={{ notify }}>
      {children}
      {createPortal(stack, document.body)}
    </OSNotifyContext.Provider>
  )
}
