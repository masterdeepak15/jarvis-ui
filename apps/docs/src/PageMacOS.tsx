import { useRef, useEffect, useCallback, useState } from 'react'
import {
  JOSThemeProvider, JWindowManager, useWindowManager,
  JWindow, JDock, JMenuBar, JOSNotificationProvider, useOSNotify,
  JFileExplorer, JTaskManager, JControlPanel,
  JToggle, JSlider, JFormField,
} from '@masterdeepak15/jarvis-ui'
import type { JDesktopApp, JFileNode, JProcess, JControlSection, JMenuBarMenu } from '@masterdeepak15/jarvis-ui'

// ─── sample data ─────────────────────────────────────────────────────────────

const fileTree: JFileNode[] = [
  { id: 'home', name: 'Home', type: 'folder', icon: '🏠', children: [
    { id: 'desktop', name: 'Desktop', type: 'folder', icon: '🖥️', children: [
      { id: 'de1', name: 'untitled.txt', type: 'file', icon: '📄' },
    ]},
    { id: 'documents', name: 'Documents', type: 'folder', icon: '📁', children: [
      { id: 'doc1', name: 'Project Proposal.pages', type: 'file', icon: '📝' },
      { id: 'doc2', name: 'Budget 2025.numbers',   type: 'file', icon: '📊' },
      { id: 'doc3', name: 'Keynote Draft.key',      type: 'file', icon: '📑' },
    ]},
    { id: 'downloads', name: 'Downloads', type: 'folder', icon: '⬇️', children: [
      { id: 'dl1', name: 'XcodeInstaller.dmg', type: 'file', icon: '💿' },
      { id: 'dl2', name: 'screenshot.png',     type: 'file', icon: '🖼️' },
    ]},
    { id: 'pictures', name: 'Pictures', type: 'folder', icon: '🖼️', children: [
      { id: 'p1', name: 'IMG_0042.heic', type: 'file', icon: '📸' },
      { id: 'p2', name: 'IMG_0043.heic', type: 'file', icon: '📸' },
    ]},
  ]},
  { id: 'applications', name: 'Applications', type: 'folder', icon: '🗂️', children: [
    { id: 'app1', name: 'Safari.app',   type: 'file', icon: '🧭' },
    { id: 'app2', name: 'Xcode.app',    type: 'file', icon: '⚒️' },
    { id: 'app3', name: 'Terminal.app', type: 'file', icon: '⬛' },
  ]},
]

const processes: JProcess[] = [
  { pid: 1,    name: 'kernel_task',       cpu: 2.1,  memory: 640,   status: 'running'   },
  { pid: 412,  name: 'WindowServer',      cpu: 3.4,  memory: 512,   status: 'running'   },
  { pid: 876,  name: 'Safari',            cpu: 8.2,  memory: 980,   status: 'running'   },
  { pid: 1024, name: 'Xcode',             cpu: 22.5, memory: 2400,  status: 'running'   },
  { pid: 1440, name: 'Spotlight',         cpu: 1.8,  memory: 180,   status: 'running'   },
  { pid: 2048, name: 'Photos Library',    cpu: 0.3,  memory: 120,   status: 'running'   },
  { pid: 2560, name: 'iCloud Drive',      cpu: 0.6,  memory: 96,    status: 'running'   },
  { pid: 3072, name: 'AirPlayReceiver',   cpu: 0.0,  memory: 48,    status: 'suspended' },
  { pid: 3584, name: 'fontd',             cpu: 0.0,  memory: 32,    status: 'stopped'   },
]

// ─── control panel panes ─────────────────────────────────────────────────────

const paneStyle: React.CSSProperties = {
  padding: 20,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
  color: 'var(--os-text)',
  fontSize: 13,
  lineHeight: 1.6,
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid var(--os-border)',
}

function AppearancePane() {
  const [darkMode, setDarkMode]     = useState(true)
  const [sidebar, setSidebar]       = useState(true)
  const [transparency, setTrans]    = useState(true)
  return (
    <div style={paneStyle}>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Appearance</div>
      <div style={rowStyle}><span>Dark Mode</span><JToggle checked={darkMode} onChange={setDarkMode} /></div>
      <div style={rowStyle}><span>Sidebar icons</span><JToggle checked={sidebar} onChange={setSidebar} /></div>
      <div style={rowStyle}><span>Reduce transparency</span><JToggle checked={transparency} onChange={setTrans} /></div>
      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
        {['Blue', 'Graphite', 'Red', 'Orange', 'Yellow', 'Green', 'Purple'].map((c, i) => {
          const colors = ['#0a84ff','#8e8e93','#ff3b30','#ff9500','#ffcc00','#34c759','#af52de']
          return (
            <div key={c} style={{ width: 24, height: 24, borderRadius: '50%', background: colors[i], cursor: 'pointer', border: i === 0 ? '2px solid #fff' : 'none' }} title={c} />
          )
        })}
      </div>
    </div>
  )
}

function PrivacyPane() {
  const [location, setLocation]   = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [siri, setSiri]           = useState(true)
  const [camera, setCamera]       = useState(false)
  return (
    <div style={paneStyle}>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Privacy &amp; Security</div>
      <div style={rowStyle}><span>Location Services</span><JToggle checked={location} onChange={setLocation} /></div>
      <div style={rowStyle}><span>Analytics &amp; Improvements</span><JToggle checked={analytics} onChange={setAnalytics} /></div>
      <div style={rowStyle}><span>Siri &amp; Dictation</span><JToggle checked={siri} onChange={setSiri} /></div>
      <div style={rowStyle}><span>Camera Access</span><JToggle checked={camera} onChange={setCamera} /></div>
    </div>
  )
}

function SoundPane() {
  const [volume, setVolume]   = useState(65)
  const [alert, setAlert]     = useState(80)
  const [mute, setMute]       = useState(false)
  return (
    <div style={paneStyle}>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Sound</div>
      <div style={{ marginBottom: 16 }}>
        <JFormField label={`Output volume: ${volume}%`}>
          <JSlider value={volume} onChange={setVolume} min={0} max={100} />
        </JFormField>
      </div>
      <div style={{ marginBottom: 16 }}>
        <JFormField label={`Alert volume: ${alert}%`}>
          <JSlider value={alert} onChange={setAlert} min={0} max={100} />
        </JFormField>
      </div>
      <div style={rowStyle}><span>Mute</span><JToggle checked={mute} onChange={setMute} /></div>
    </div>
  )
}

function NotifyPane() {
  const { notify } = useOSNotify()
  const messages = [
    { title: 'Software Update',  body: 'macOS Sequoia 15.3 is available.',       icon: '⚙️' },
    { title: 'Mail',              body: '5 new messages in your inbox',            icon: '✉️' },
    { title: 'Calendar',          body: 'JARVIS standup starts in 5 minutes',      icon: '📅' },
    { title: 'Messages',          body: 'Tony: System is back online ✓',           icon: '💬' },
    { title: 'Reminder',          body: "Don't forget: deploy at 18:00",           icon: '⏰' },
  ]
  const btnStyle: React.CSSProperties = {
    padding: '7px 14px', cursor: 'pointer', borderRadius: 8, fontSize: 12,
    background: 'var(--os-surface-alt)', color: 'var(--os-text)',
    border: '1px solid var(--os-border)', fontFamily: 'inherit',
    display: 'flex', alignItems: 'center', gap: 6,
  }
  return (
    <div style={paneStyle}>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Notifications Demo</div>
      <div style={{ marginBottom: 16, fontSize: 12, color: 'var(--os-text-muted)' }}>
        Click to send a macOS-style notification to the top-right corner.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {messages.map((m, i) => (
          <button key={i} style={btnStyle} onClick={() => notify({ title: m.title, body: m.body, icon: m.icon, duration: 5000 })}>
            <span style={{ fontSize: 16 }}>{m.icon}</span>
            <span style={{ fontWeight: 600 }}>{m.title}</span>
            <span style={{ color: 'var(--os-text-muted)', marginLeft: 4 }}>— {m.body}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const controlSections: JControlSection[] = [
  { id: 'appearance', icon: '🎨', label: 'Appearance',           component: <AppearancePane /> },
  { id: 'sound',      icon: '🔊', label: 'Sound',                component: <SoundPane /> },
  { id: 'privacy',    icon: '🔒', label: 'Privacy & Security',   component: <PrivacyPane /> },
  { id: 'notify',     icon: '🔔', label: 'Notifications',        component: <NotifyPane /> },
]

// ─── apps list ───────────────────────────────────────────────────────────────

const macApps: JDesktopApp[] = [
  {
    id: 'finder', icon: '📁', label: 'Finder',
    defaultWidth: 720, defaultHeight: 480,
    component: <JFileExplorer tree={fileTree} />,
  },
  {
    id: 'activity', icon: '📊', label: 'Activity Monitor',
    defaultWidth: 760, defaultHeight: 540,
    component: <JTaskManager processes={processes} />,
  },
  {
    id: 'prefs', icon: '⚙️', label: 'System Preferences',
    defaultWidth: 860, defaultHeight: 580,
    component: <JControlPanel sections={controlSections} defaultSection="notify" />,
  },
]

// ─── desktop content ─────────────────────────────────────────────────────────

const WALLPAPER = 'linear-gradient(160deg, #0e3460 0%, #1a5276 25%, #0b3d5e 50%, #1c2833 100%)'

// Dock wrapper height: dock is 64px + 8px gap = 72px; add 8px buffer = 80px total
// We slide it down by (80 - 4)px so only a 4px hover strip is visible at the bottom
const DOCK_ZONE_H = 80

function MacDesktopInner() {
  const { windows, openWindow, setDesktopSize } = useWindowManager()
  const [dockVisible, setDockVisible] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setDesktopSize(Math.round(entry.contentRect.width), Math.round(entry.contentRect.height))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [setDesktopSize])

  const openApp = useCallback((app: JDesktopApp) => {
    openWindow({ appId: app.id, title: app.label, icon: app.icon, content: app.component, width: app.defaultWidth, height: app.defaultHeight })
  }, [openWindow])

  const menus: JMenuBarMenu[] = [
    {
      label: 'File',
      items: [
        { label: 'New Window',    shortcut: '⌘N', onClick: () => openApp(macApps[0]) },
        { label: 'Close Window',  shortcut: '⌘W', onClick: () => {} },
        { divider: true, label: '', onClick: () => {} },
        { label: 'Quit Finder',   shortcut: '⌘Q', onClick: () => {} },
      ],
    },
    {
      label: 'Go',
      items: macApps.map(a => ({ label: a.label, onClick: () => openApp(a) })),
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize',   shortcut: '⌘M', onClick: () => {} },
        { label: 'Zoom',                        onClick: () => {} },
        { divider: true, label: '', onClick: () => {} },
        ...macApps.map(a => ({ label: `Open ${a.label}`, onClick: () => openApp(a) })),
      ],
    },
  ]

  return (
    // position:absolute inset:0 — anchors to parent boundaries directly, no height:100% chain
    <div ref={ref} style={{ position: 'absolute', inset: 0, background: WALLPAPER, overflow: 'hidden' }}>

      {/* Menu bar — fixed 24px strip at top */}
      <JMenuBar appName="Finder" menus={menus} />

      {/* Desktop area — below menu bar; extends to bottom since dock auto-hides over windows */}
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, bottom: 0 }}>

        {/* Desktop icons — top-right vertical column */}
        <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          {macApps.map(app => (
            <div key={app.id} onDoubleClick={() => openApp(app)}
              style={{ cursor: 'pointer', textAlign: 'center', padding: '8px 12px', userSelect: 'none', borderRadius: 6 }}
              onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
              <div style={{ fontSize: 42, lineHeight: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }}>{app.icon}</div>
              <div style={{ fontSize: 10, color: '#fff', marginTop: 4, fontFamily: '-apple-system, sans-serif', textShadow: '0 1px 3px rgba(0,0,0,0.8)', maxWidth: 72 }}>
                {app.label}
              </div>
            </div>
          ))}
        </div>

        {/* Open (non-minimized) windows */}
        {windows.filter(w => !w.minimized).map(w => <JWindow key={w.id} id={w.id} />)}
      </div>

      {/* Dock auto-hide zone — slides down leaving a 4px hover strip at the screen bottom.
          Moving mouse into that strip reveals the dock; leaving hides it again. */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: DOCK_ZONE_H,
          zIndex: 1001,
          transform: dockVisible ? 'translateY(0)' : `translateY(${DOCK_ZONE_H - 16}px)`,
          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onMouseEnter={() => setDockVisible(true)}
        onMouseLeave={() => setDockVisible(false)}
      >
        {/* JDock uses position:absolute bottom:8px within this container */}
        <JDock apps={macApps} />
      </div>
    </div>
  )
}

// ─── page export ─────────────────────────────────────────────────────────────

export function PageMacOS() {
  return (
    <JOSThemeProvider theme="macos">
      <JOSNotificationProvider>
        <JWindowManager>
          <MacDesktopInner />
        </JWindowManager>
      </JOSNotificationProvider>
    </JOSThemeProvider>
  )
}
