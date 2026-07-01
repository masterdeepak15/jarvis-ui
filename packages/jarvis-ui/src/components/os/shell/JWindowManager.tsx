import { createContext, useContext, useState, useCallback, useRef } from 'react'
import type { ReactNode } from 'react'

export interface WindowState {
  id:        string
  appId:     string
  title:     string
  icon?:     string
  x:         number
  y:         number
  width:     number
  height:    number
  minimized: boolean
  maximized: boolean
  zIndex:    number
  content:   ReactNode
}

export interface OpenWindowConfig {
  appId:    string
  title:    string
  icon?:    string
  width?:   number
  height?:  number
  content:  ReactNode
}

export interface WindowManagerContextValue {
  windows:        WindowState[]
  focusedId:      string | null
  compactMode:    boolean
  desktopSize:    { w: number; h: number }
  openWindow:     (config: OpenWindowConfig) => string
  closeWindow:    (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow:  (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow:    (id: string) => void
  moveWindow:     (id: string, x: number, y: number) => void
  resizeWindow:   (id: string, w: number, h: number) => void
  setDesktopSize: (w: number, h: number) => void
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null)

export function useWindowManager(): WindowManagerContextValue {
  const ctx = useContext(WindowManagerContext)
  if (!ctx) throw new Error('useWindowManager must be used inside JWindowManager')
  return ctx
}

let _nextId = 1
let _nextZ  = 10
function genId(): string   { return `win-${_nextId++}` }
function nextZ(): number   { return _nextZ++ }

function clampWindow(
  x: number, y: number, w: number, h: number,
  dw: number, dh: number
): Pick<WindowState, 'x' | 'y' | 'width' | 'height'> {
  const width  = Math.min(w, dw > 0 ? dw : w)
  const height = Math.min(h, dh > 0 ? dh : h)
  return {
    width, height,
    x: dw > 0 ? Math.max(0, Math.min(x, dw - width))  : x,
    y: dh > 0 ? Math.max(0, Math.min(y, dh - height)) : y,
  }
}

function cascadePos(
  windows: WindowState[], dw: number, dh: number
): { x: number; y: number } {
  const active = windows.filter(w => !w.minimized).length
  const slot = active % 8
  return {
    x: Math.min(40 + slot * 30, Math.floor(dw * 0.5) || 40),
    y: Math.min(40 + slot * 30, Math.floor(dh * 0.5) || 40),
  }
}

export interface JWindowManagerProps {
  compactBreakpoint?: number
  children:           ReactNode
}

export function JWindowManager({ compactBreakpoint = 900, children }: JWindowManagerProps) {
  const [windows,     setWindows]   = useState<WindowState[]>([])
  const windowsRef = useRef<WindowState[]>([])
  const [focusedId,   setFocusedId] = useState<string | null>(null)
  const [desktopSize, setDesktopSt] = useState({ w: 0, h: 0 })
  const desktopSizeRef = useRef({ w: 0, h: 0 })

  const compactMode = desktopSize.w > 0 && desktopSize.w < compactBreakpoint

  // Helper: update windows state AND keep ref in sync
  const applyWindows = useCallback((updater: (prev: WindowState[]) => WindowState[]) => {
    setWindows(prev => {
      const next = updater(prev)
      windowsRef.current = next
      return next
    })
  }, [])

  const setDesktopSize = useCallback((w: number, h: number) => {
    desktopSizeRef.current = { w, h }
    setDesktopSt({ w, h })
    applyWindows(prev => prev.map(win => ({
      ...win,
      ...clampWindow(win.x, win.y, win.width, win.height, w, h),
    })))
  }, [applyWindows])

  const openWindow = useCallback((config: OpenWindowConfig): string => {
    // Use ref for synchronous duplicate check — avoids closure staleness
    const existing = windowsRef.current.find(w => w.appId === config.appId)
    if (existing) {
      setFocusedId(existing.id)
      applyWindows(prev => prev.map(w =>
        w.id === existing.id ? { ...w, minimized: false, zIndex: nextZ() } : w
      ))
      return existing.id
    }
    const id = genId()
    applyWindows(prev => {
      const { x, y } = cascadePos(prev, desktopSizeRef.current.w, desktopSizeRef.current.h)
      const w = config.width  ?? 640
      const h = config.height ?? 420
      const clamped = clampWindow(x, y, w, h, desktopSizeRef.current.w, desktopSizeRef.current.h)
      const win: WindowState = {
        id, appId: config.appId, title: config.title, icon: config.icon,
        ...clamped,
        minimized: false, maximized: false,
        zIndex: nextZ(),
        content: config.content,
      }
      return [...prev, win]
    })
    setFocusedId(id)
    return id
  }, [applyWindows])

  const closeWindow = useCallback((id: string) => {
    applyWindows(prev => prev.filter(w => w.id !== id))
    setFocusedId(prev => prev === id ? null : prev)
  }, [applyWindows])

  const minimizeWindow = useCallback((id: string) => {
    applyWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w))
    setFocusedId(prev => prev === id ? null : prev)
  }, [applyWindows])

  const restoreWindow = useCallback((id: string) => {
    applyWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: false, zIndex: nextZ() } : w))
    setFocusedId(id)
  }, [applyWindows])

  const maximizeWindow = useCallback((id: string) => {
    applyWindows(prev => prev.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w))
  }, [applyWindows])

  const focusWindow = useCallback((id: string) => {
    setFocusedId(id)
    applyWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZ() } : w))
  }, [applyWindows])

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    applyWindows(prev => prev.map(w => {
      if (w.id !== id) return w
      const clamped = clampWindow(x, y, w.width, w.height, desktopSizeRef.current.w, desktopSizeRef.current.h)
      return { ...w, ...clamped }
    }))
  }, [applyWindows])

  const resizeWindow = useCallback((id: string, nw: number, nh: number) => {
    applyWindows(prev => prev.map(w => {
      if (w.id !== id) return w
      const clamped = clampWindow(w.x, w.y, nw, nh, desktopSizeRef.current.w, desktopSizeRef.current.h)
      return { ...w, ...clamped }
    }))
  }, [applyWindows])

  const value: WindowManagerContextValue = {
    windows, focusedId, compactMode, desktopSize,
    openWindow, closeWindow, minimizeWindow, restoreWindow,
    maximizeWindow, focusWindow, moveWindow, resizeWindow, setDesktopSize,
  }

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  )
}
