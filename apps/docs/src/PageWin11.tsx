import { useRef, useEffect, useCallback, useState } from 'react'
import {
  JOSThemeProvider, JWindowManager, useWindowManager,
  JWindow, JTaskbar, JOSNotificationProvider, useOSNotify,
  JFileExplorer, JTaskManager, JControlPanel,
  JToggle, JSlider, JFormField,
} from '@masterdeepak15/jarvis-ui'
import type { JDesktopApp, JFileNode, JProcess, JControlSection } from '@masterdeepak15/jarvis-ui'

// ─── sample data ─────────────────────────────────────────────────────────────

const fileTree: JFileNode[] = [
  { id: 'desktop', name: 'Desktop', type: 'folder', icon: '🖥️', children: [
    { id: 'de1', name: 'resume.pdf',    type: 'file', icon: '📄' },
    { id: 'de2', name: 'budget.xlsx',   type: 'file', icon: '📊' },
  ]},
  { id: 'documents', name: 'Documents', type: 'folder', icon: '📁', children: [
    { id: 'doc1', name: 'Report Q1.docx',     type: 'file', icon: '📝' },
    { id: 'doc2', name: 'Presentation.pptx',  type: 'file', icon: '📑' },
    { id: 'doc3', name: 'Notes.txt',           type: 'file', icon: '📄' },
    { id: 'subf', name: 'Archives', type: 'folder', icon: '📁', children: [
      { id: 'arc1', name: 'backup_2024.zip', type: 'file', icon: '🗜️' },
    ]},
  ]},
  { id: 'downloads', name: 'Downloads', type: 'folder', icon: '⬇️', children: [
    { id: 'dl1', name: 'setup.exe',  type: 'file', icon: '⚙️' },
    { id: 'dl2', name: 'image.png',  type: 'file', icon: '🖼️' },
    { id: 'dl3', name: 'movie.mp4',  type: 'file', icon: '🎬' },
  ]},
  { id: 'pictures', name: 'Pictures', type: 'folder', icon: '🖼️', children: [
    { id: 'p1', name: 'vacation.jpg',   type: 'file', icon: '📸' },
    { id: 'p2', name: 'screenshot.png', type: 'file', icon: '🖼️' },
  ]},
]

const processes: JProcess[] = [
  { pid: 1024, name: 'System',          cpu: 0.5,  memory: 128,   status: 'running'   },
  { pid: 2048, name: 'Explorer',        cpu: 1.2,  memory: 256,   status: 'running'   },
  { pid: 3072, name: 'Chrome',          cpu: 14.4, memory: 1240,  status: 'running'   },
  { pid: 4096, name: 'Code',            cpu: 5.8,  memory: 680,   status: 'running'   },
  { pid: 5120, name: 'SearchIndexer',   cpu: 8.3,  memory: 450,   status: 'running'   },
  { pid: 6144, name: 'Antivirus',       cpu: 2.1,  memory: 320,   status: 'running'   },
  { pid: 7168, name: 'RuntimeBroker',   cpu: 0.2,  memory: 98,    status: 'suspended' },
  { pid: 8192, name: 'OneDrive',        cpu: 0.8,  memory: 210,   status: 'running'   },
  { pid: 9216, name: 'WindowsUpdate',   cpu: 0.0,  memory: 64,    status: 'stopped'   },
]

// ─── control panel panes ─────────────────────────────────────────────────────

const paneStyle: React.CSSProperties = {
  padding: 20,
  fontFamily: "'Segoe UI', system-ui, sans-serif",
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

function SystemPane() {
  const [darkMode, setDarkMode] = useState(true)
  const [animations, setAnimations] = useState(true)
  const [transparency, setTransparency] = useState(true)
  const [brightness, setBrightness] = useState(80)
  return (
    <div style={paneStyle}>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>System Settings</div>
      <div style={rowStyle}><span>Dark mode</span><JToggle checked={darkMode} onChange={setDarkMode} /></div>
      <div style={rowStyle}><span>Animations</span><JToggle checked={animations} onChange={setAnimations} /></div>
      <div style={rowStyle}><span>Transparency</span><JToggle checked={transparency} onChange={setTransparency} /></div>
      <div style={{ paddingTop: 16 }}>
        <JFormField label={`Brightness: ${brightness}%`}>
          <JSlider value={brightness} onChange={setBrightness} min={10} max={100} />
        </JFormField>
      </div>
    </div>
  )
}

function NetworkPane() {
  const [wifi, setWifi]   = useState(true)
  const [bt, setBt]       = useState(true)
  const [vpn, setVpn]     = useState(false)
  return (
    <div style={paneStyle}>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Network & Internet</div>
      <div style={rowStyle}><span>Wi-Fi</span><JToggle checked={wifi} onChange={setWifi} /></div>
      <div style={rowStyle}><span>Bluetooth</span><JToggle checked={bt} onChange={setBt} /></div>
      <div style={rowStyle}><span>VPN</span><JToggle checked={vpn} onChange={setVpn} /></div>
      <div style={{ marginTop: 16, padding: 12, background: 'var(--os-surface-alt)', borderRadius: 4, fontSize: 12 }}>
        <div style={{ color: 'var(--os-text-muted)' }}>Connected to</div>
        <div style={{ fontWeight: 600 }}>JARVIS-HQ-5G</div>
        <div style={{ color: 'var(--os-text-muted)', fontSize: 11 }}>192.168.1.105 · 5GHz · WPA3</div>
      </div>
    </div>
  )
}

function DisplayPane() {
  const [scale, setScale] = useState(100)
  const [refresh, setRefresh] = useState(60)
  return (
    <div style={paneStyle}>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Display</div>
      <div style={{ marginBottom: 16 }}>
        <JFormField label={`Scale: ${scale}%`}>
          <JSlider value={scale} onChange={setScale} min={100} max={200} />
        </JFormField>
      </div>
      <div style={rowStyle}><span>Resolution</span><span style={{ color: 'var(--os-text-muted)' }}>1920 × 1080</span></div>
      <div style={rowStyle}><span>Refresh rate</span>
        <select value={refresh} onChange={e => setRefresh(Number(e.target.value))}
          style={{ background: 'var(--os-surface)', border: '1px solid var(--os-border)', color: 'var(--os-text)', padding: '2px 8px', borderRadius: 4, fontFamily: 'inherit', fontSize: 12 }}>
          <option value={60}>60 Hz</option>
          <option value={120}>120 Hz</option>
          <option value={144}>144 Hz</option>
        </select>
      </div>
      <div style={rowStyle}><span>HDR</span><span style={{ color: 'var(--os-text-muted)' }}>Not supported</span></div>
    </div>
  )
}

function NotifyPane() {
  const { notify } = useOSNotify()
  const [idx, setIdx] = useState(0)
  const messages = [
    { title: 'Update Available',     body: 'Windows 11 24H2 is ready to install.',      icon: '⊞' },
    { title: 'Mail',                  body: '3 new messages from JARVIS Team',             icon: '✉️' },
    { title: 'OneDrive',              body: 'Sync complete — 12 files updated',            icon: '☁️' },
    { title: 'Security Alert',        body: 'Firewall blocked 2 connection attempts',      icon: '🛡️' },
    { title: 'Reminder',              body: 'Stand-up meeting starts in 5 minutes',        icon: '📅' },
  ]
  const btnStyle: React.CSSProperties = {
    padding: '8px 16px', cursor: 'pointer', borderRadius: 4, fontSize: 12,
    background: 'var(--os-accent)', color: '#fff', border: 'none',
    fontFamily: "'Segoe UI', sans-serif", fontWeight: 600,
  }
  return (
    <div style={paneStyle}>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Notifications &amp; Demo</div>
      <div style={{ marginBottom: 16, fontSize: 12, color: 'var(--os-text-muted)' }}>
        Click the button to send a Windows 11 toast notification to the corner of the screen.
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {messages.map((m, i) => (
          <button key={i} style={{ ...btnStyle, background: idx === i ? 'var(--os-accent)' : 'var(--os-surface-alt)', color: 'var(--os-text)' }}
            onClick={() => { notify({ title: m.title, body: m.body, icon: m.icon, duration: 5000 }); setIdx(i) }}>
            {m.icon} {m.title}
          </button>
        ))}
      </div>
    </div>
  )
}

const controlSections: JControlSection[] = [
  { id: 'system',  icon: '⚙️', label: 'System',     component: <SystemPane /> },
  { id: 'display', icon: '🖥️', label: 'Display',     component: <DisplayPane /> },
  { id: 'network', icon: '📶', label: 'Network',     component: <NetworkPane /> },
  { id: 'notify',  icon: '🔔', label: 'Notifications', component: <NotifyPane /> },
]

// ─── apps list ───────────────────────────────────────────────────────────────

const win11Apps: JDesktopApp[] = [
  {
    id: 'explorer', icon: '📁', label: 'File Explorer',
    defaultWidth: 720, defaultHeight: 480,
    component: <JFileExplorer tree={fileTree} />,
  },
  {
    id: 'taskmanager', icon: '📊', label: 'Task Manager',
    defaultWidth: 760, defaultHeight: 540,
    component: <JTaskManager processes={processes} />,
  },
  {
    id: 'settings', icon: '⚙️', label: 'Settings',
    defaultWidth: 860, defaultHeight: 580,
    component: <JControlPanel sections={controlSections} defaultSection="notify" />,
  },
]

// ─── desktop content ─────────────────────────────────────────────────────────

const WALLPAPER = 'linear-gradient(135deg, #0f1b2d 0%, #1a1040 35%, #0d2137 65%, #0a1520 100%)'

function Win11DesktopInner() {
  const { windows, openWindow, setDesktopSize } = useWindowManager()
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

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%', background: WALLPAPER, overflow: 'hidden' }}>
      {/* Desktop icons — top-left grid */}
      <div style={{ position: 'absolute', top: 24, left: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: 8 }}>
        {win11Apps.map(app => (
          <div key={app.id} onDoubleClick={() => openApp(app)}
            style={{ cursor: 'pointer', textAlign: 'center', padding: '8px 4px', userSelect: 'none', borderRadius: 4 }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
            <div style={{ fontSize: 36, lineHeight: 1 }}>{app.icon}</div>
            <div style={{ fontSize: 9, color: '#fff', marginTop: 4, fontFamily: "'Segoe UI', sans-serif", textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
              {app.label}
            </div>
          </div>
        ))}
      </div>

      {/* Open windows */}
      {windows.filter(w => !w.minimized).map(w => <JWindow key={w.id} id={w.id} />)}

      {/* Taskbar (centered, Windows 11 style) */}
      <JTaskbar apps={win11Apps} />
    </div>
  )
}

// ─── page export ─────────────────────────────────────────────────────────────

export function PageWin11() {
  return (
    <JOSThemeProvider theme="windows11">
      <JOSNotificationProvider>
        <JWindowManager>
          <Win11DesktopInner />
        </JWindowManager>
      </JOSNotificationProvider>
    </JOSThemeProvider>
  )
}
