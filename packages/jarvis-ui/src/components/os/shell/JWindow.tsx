import { useRef } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import { useWindowManager } from './JWindowManager'
import { useOSTheme } from './JOSThemeProvider'

type ResizeDir = 'n' | 's' | 'e' | 'w' | 'nw' | 'ne' | 'sw' | 'se'

const RESIZE_DIRS: ResizeDir[] = ['n', 's', 'e', 'w', 'nw', 'ne', 'sw', 'se']

export interface JWindowProps {
  id: string
}

export function JWindow({ id }: JWindowProps) {
  const { windows, focusedId, compactMode, focusWindow, closeWindow, minimizeWindow, maximizeWindow, moveWindow, resizeWindow } = useWindowManager()
  const theme = useOSTheme()
  const titlebarRef = useRef<HTMLDivElement>(null)

  const win = windows.find(w => w.id === id)
  if (!win || win.minimized) return null

  const focused   = focusedId === id
  const isWindows = theme === 'windows11'

  const wrapStyle: CSSProperties = win.maximized
    ? { position: 'absolute', inset: 0, zIndex: win.zIndex }
    : { position: 'absolute', left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.zIndex }

  const wrapClass = [
    'j-os-window',
    focused       ? 'j-os-window--focused'   : '',
    win.maximized ? 'j-os-window--maximized' : '',
  ].filter(Boolean).join(' ')

  // ── Drag ───────────────────────────────────────────────────────────────
  const drag = useRef({ active: false, startX: 0, startY: 0, startWinX: 0, startWinY: 0 })

  function onTitlePointerDown(e: PointerEvent<HTMLDivElement>) {
    if (win.maximized || compactMode) return
    if ((e.target as HTMLElement).closest('button')) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { active: true, startX: e.clientX, startY: e.clientY, startWinX: win.x, startWinY: win.y }
    focusWindow(id)
  }

  function onTitlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX
    const dy = e.clientY - drag.current.startY
    moveWindow(id, drag.current.startWinX + dx, drag.current.startWinY + dy)
  }

  function onTitlePointerUp() { drag.current.active = false }

  // ── Resize ─────────────────────────────────────────────────────────────
  const resize = useRef({ active: false, dir: '' as ResizeDir, startX: 0, startY: 0, startW: 0, startH: 0, startWinX: 0, startWinY: 0 })

  function onResizePointerDown(e: PointerEvent<HTMLDivElement>, dir: ResizeDir) {
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    resize.current = { active: true, dir, startX: e.clientX, startY: e.clientY, startW: win.width, startH: win.height, startWinX: win.x, startWinY: win.y }
    focusWindow(id)
  }

  function onResizePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!resize.current.active) return
    const { dir, startX, startY, startW, startH, startWinX, startWinY } = resize.current
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    let newW = startW, newH = startH, newX = startWinX, newY = startWinY
    if (dir.includes('e')) newW = startW + dx
    if (dir.includes('s')) newH = startH + dy
    if (dir.includes('w')) { newW = startW - dx; newX = startWinX + dx }
    if (dir.includes('n')) { newH = startH - dy; newY = startWinY + dy }
    if (newW < 280) { newW = 280; if (dir.includes('w')) newX = startWinX + startW - 280 }
    if (newH < 200) { newH = 200; if (dir.includes('n')) newY = startWinY + startH - 200 }
    moveWindow(id, newX, newY)
    resizeWindow(id, newW, newH)
  }

  function onResizePointerUp() { resize.current.active = false }

  return (
    <div
      className={wrapClass}
      style={wrapStyle}
      onPointerDown={() => focusWindow(id)}
    >
      {/* Resize handles — hidden in compact or maximized */}
      {!compactMode && !win.maximized && RESIZE_DIRS.map(dir => (
        <div
          key={dir}
          className={`j-os-resize j-os-resize--${dir}`}
          onPointerDown={e => onResizePointerDown(e, dir)}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
        />
      ))}

      {/* Title bar */}
      <div
        ref={titlebarRef}
        className={`j-os-titlebar ${!win.maximized && !compactMode ? 'j-os-titlebar--draggable' : ''}`}
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
      >
        {isWindows ? (
          <>
            {win.icon && <span style={{ marginRight: 6, fontSize: 14 }}>{win.icon}</span>}
            <span className="j-os-titlebar__title">{win.title}</span>
            <div className="j-os-win-controls">
              <button className="j-os-win-btn"                    title="Minimize" onClick={() => minimizeWindow(id)}>─</button>
              <button className="j-os-win-btn"                    title="Maximize" onClick={() => maximizeWindow(id)}>{win.maximized ? '❐' : '□'}</button>
              <button className="j-os-win-btn j-os-win-btn--close" title="Close"   onClick={() => closeWindow(id)}>✕</button>
            </div>
          </>
        ) : (
          <>
            <div className="j-os-mac-controls">
              <button className="j-os-mac-btn j-os-mac-btn--close"    title="Close"    onClick={() => closeWindow(id)} />
              <button className="j-os-mac-btn j-os-mac-btn--minimize" title="Minimize" onClick={() => minimizeWindow(id)} />
              <button className="j-os-mac-btn j-os-mac-btn--maximize" title="Maximize" onClick={() => maximizeWindow(id)} />
            </div>
            <span className="j-os-titlebar__title" style={{ textAlign: 'center' }}>{win.title}</span>
          </>
        )}
      </div>

      {/* Body */}
      <div className="j-os-window__body">
        {win.content}
      </div>
    </div>
  )
}
