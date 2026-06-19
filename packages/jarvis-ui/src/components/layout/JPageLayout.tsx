import type { ReactNode } from 'react'
import type { JColor } from '../../theme/JarvisTokens'
import { JHudBar } from './JHudBar'
import { JSidebar } from './JSidebar'

export interface JPageLayoutProps {
  systemName?:     string
  version?:        string
  color?:          JColor
  showSidebar?:    boolean
  sidebarWidth?:   string
  navLabel?:       string
  showTicks?:      boolean
  showWaveform?:   boolean
  showLive?:       boolean
  showRec?:        boolean
  contentPadding?: string
  sidebar?:        ReactNode
  sidebarFooter?:  ReactNode
  topBar?:         ReactNode
  bottomBar?:      ReactNode
  children?:       ReactNode
}

export function JPageLayout({
  systemName     = 'JARVIS',
  version        = 'v4.2.1',
  color          = 'cyan',
  showSidebar    = true,
  sidebarWidth   = '220px',
  navLabel       = 'Navigation',
  showTicks      = false,
  showWaveform   = false,
  showLive       = true,
  showRec        = false,
  contentPadding = '12px',
  sidebar,
  sidebarFooter,
  topBar,
  bottomBar,
  children,
}: JPageLayoutProps) {
  return (
    <div className="j-root">
      {/* Top HUD bar */}
      <JHudBar
        position="top"
        color={color}
        systemLabel={systemName}
        showDots
        showTicks={showTicks}
        showWaveform={showWaveform}
        showLive={showLive}
        showRec={showRec}
      >
        {topBar}
      </JHudBar>

      {/* Main shell */}
      <div className="j-shell">
        {showSidebar && (
          <JSidebar
            systemName={systemName}
            version={version}
            navLabel={navLabel}
            width={sidebarWidth}
            color={color}
            footer={sidebarFooter}
          >
            {sidebar}
          </JSidebar>
        )}

        {/* Content area */}
        <div className="j-content">
          {/* Corner bracket decorations */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}>
            {/* TL corner */}
            <div style={{
              position: 'absolute', top: 4, left: 4,
              width: 16, height: 16,
              borderTop: '1px solid var(--j-accent-50)',
              borderLeft: '1px solid var(--j-accent-50)',
              animation: 'j-corner-blink var(--j-dur-corner) ease-in-out infinite 0s',
            }} />
            {/* TR corner */}
            <div style={{
              position: 'absolute', top: 4, right: 4,
              width: 16, height: 16,
              borderTop: '1px solid var(--j-accent-50)',
              borderRight: '1px solid var(--j-accent-50)',
              animation: 'j-corner-blink var(--j-dur-corner) ease-in-out infinite 0.75s',
            }} />
          </div>

          {/* Scrollable content */}
          <div className="j-scroll" style={{ padding: contentPadding, position: 'relative', zIndex: 1 }}>
            {children}
          </div>
        </div>
      </div>

      {/* Bottom HUD bar */}
      <JHudBar
        position="bottom"
        color={color}
        showDots={false}
        showWaveform={showWaveform}
        showTicks={showTicks}
      >
        {bottomBar}
      </JHudBar>
    </div>
  )
}
