import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { JWindowManager, useWindowManager } from './JWindowManager'
import type { ReactNode } from 'react'

// Expose context value so we can call it in tests
function HookReader({ onRender }: { onRender: (v: ReturnType<typeof useWindowManager>) => void }) {
  const ctx = useWindowManager()
  onRender(ctx)
  return null
}

function W({ children }: { children: ReactNode }) {
  return (
    <JWindowManager>
      {/* Give it a non-zero desktop size */}
      <SetDesktop w={1200} h={800} />
      {children}
    </JWindowManager>
  )
}

function SetDesktop({ w, h }: { w: number; h: number }) {
  const { setDesktopSize } = useWindowManager()
  // Set once on mount
  act(() => { setDesktopSize(w, h) })
  return null
}

const CONTENT = <div>app content</div>

describe('JWindowManager', () => {
  it('starts with no windows', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    expect(ctx!.windows).toHaveLength(0)
  })

  it('openWindow adds a window', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    act(() => { ctx!.openWindow({ appId: 'a', title: 'App A', content: CONTENT }) })
    expect(ctx!.windows).toHaveLength(1)
    expect(ctx!.windows[0].title).toBe('App A')
    expect(ctx!.windows[0].appId).toBe('a')
  })

  it('openWindow returns a unique id', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id1: string, id2: string
    act(() => { id1 = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { id2 = ctx!.openWindow({ appId: 'b', title: 'B', content: CONTENT }) })
    expect(id1!).not.toBe(id2!)
  })

  it('openWindow with same appId focuses existing window instead of opening duplicate', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    act(() => { ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    expect(ctx!.windows).toHaveLength(1)
  })

  it('closeWindow removes the window', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.closeWindow(id!) })
    expect(ctx!.windows).toHaveLength(0)
  })

  it('minimizeWindow sets minimized=true', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.minimizeWindow(id!) })
    expect(ctx!.windows[0].minimized).toBe(true)
  })

  it('restoreWindow clears minimized', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.minimizeWindow(id!) })
    act(() => { ctx!.restoreWindow(id!) })
    expect(ctx!.windows[0].minimized).toBe(false)
  })

  it('maximizeWindow toggles maximized', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.maximizeWindow(id!) })
    expect(ctx!.windows[0].maximized).toBe(true)
    act(() => { ctx!.maximizeWindow(id!) })
    expect(ctx!.windows[0].maximized).toBe(false)
  })

  it('focusWindow sets focusedId', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.focusWindow(id!) })
    expect(ctx!.focusedId).toBe(id!)
  })

  it('moveWindow updates x and y', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', content: CONTENT }) })
    act(() => { ctx!.moveWindow(id!, 300, 200) })
    expect(ctx!.windows[0].x).toBe(300)
    expect(ctx!.windows[0].y).toBe(200)
  })

  it('moveWindow clamps to desktop bounds', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', width: 400, height: 300, content: CONTENT }) })
    // Move beyond right/bottom edge — desktop is 1200x800
    act(() => { ctx!.moveWindow(id!, 2000, 2000) })
    const w = ctx!.windows[0]
    expect(w.x).toBeLessThanOrEqual(1200 - w.width)
    expect(w.y).toBeLessThanOrEqual(800 - w.height)
  })

  it('setDesktopSize re-clamps windows that overflow new bounds', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(<W><HookReader onRender={v => { ctx = v }} /></W>)
    let id: string
    // Open window at right edge
    act(() => { id = ctx!.openWindow({ appId: 'a', title: 'A', width: 400, height: 300, content: CONTENT }) })
    act(() => { ctx!.moveWindow(id!, 800, 400) })
    // Shrink desktop so window overflows
    act(() => { ctx!.setDesktopSize(600, 500) })
    const w = ctx!.windows[0]
    expect(w.x + w.width).toBeLessThanOrEqual(600)
    expect(w.y + w.height).toBeLessThanOrEqual(500)
  })

  it('compactMode is false when desktopSize.w >= compactBreakpoint', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(
      <JWindowManager compactBreakpoint={900}>
        <HookReader onRender={v => { ctx = v }} />
      </JWindowManager>
    )
    act(() => { ctx!.setDesktopSize(1200, 800) })
    expect(ctx!.compactMode).toBe(false)
  })

  it('compactMode is true when desktopSize.w < compactBreakpoint', () => {
    let ctx: ReturnType<typeof useWindowManager> | null = null
    render(
      <JWindowManager compactBreakpoint={900}>
        <HookReader onRender={v => { ctx = v }} />
      </JWindowManager>
    )
    act(() => { ctx!.setDesktopSize(600, 800) })
    expect(ctx!.compactMode).toBe(true)
  })
})
