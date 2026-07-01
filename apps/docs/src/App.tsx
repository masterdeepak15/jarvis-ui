import { useState, useEffect } from 'react'
import { PageMap } from './PageMap'
import { PageIndiaMap } from './PageIndiaMap'
import { PageShield } from './PageShield'
import { PageDataTable } from './PageDataTable'
import { PageForms } from './PageForms'
import { PageComponents } from './PageComponents'
import { PageWin11 } from './PageWin11'
import { PageMacOS } from './PageMacOS'
import {
  JThemeProvider, JThemePicker, useTheme,
  JPageLayout, JNavItem,
  JButton, JInput, JTextArea, JSelect, JCheckbox, JRadio, JToggle, JSlider, JFormField,
  JBadge, JStatusPill, JProgress, JHudLabel, JDivider, JAlert, JDataRow,
  JCard, JStatCard, JModal, JTabs, JTab, JAccordion, JPagination,
  JArcMeter, JWaveform, JOrb, JSpinner, JHudFrame, JHudFrameCard,
  JSparkline, JBarChart, JLineChart, JDonutChart, JGaugeChart, JRadarChart,
  JBootScreen, JTable, JCommandPalette, JRadialMenu, JRadialItem, JNodeGraph,
  JToastProvider, useToast,
} from '@masterdeepak15/jarvis-ui'
import type { JCommand, JTableColumn, JTableRow, NodeDef, EdgeDef, JChartPoint } from '@masterdeepak15/jarvis-ui'
import '@masterdeepak15/jarvis-ui/styles'

// ─── data ────────────────────────────────────────────────────────────────────

const CHART_POINTS: JChartPoint[] = [
  { label: 'Mon', value: 34 }, { label: 'Tue', value: 58 }, { label: 'Wed', value: 42 },
  { label: 'Thu', value: 71 }, { label: 'Fri', value: 55 }, { label: 'Sat', value: 80 }, { label: 'Sun', value: 63 },
]
const SPARK: number[] = [34, 58, 42, 71, 55, 80, 63, 48, 77, 90]
const DONUT = [
  { label: 'Core',   value: 38, color: '#00e5ff' },
  { label: 'Comms',  value: 24, color: '#f97316' },
  { label: 'Sensor', value: 22, color: '#22c55e' },
  { label: 'Idle',   value: 16, color: '#6366f1' },
]
const RADAR = [
  { label: 'Speed',   value: 82 }, { label: 'Power',   value: 67 },
  { label: 'Range',   value: 54 }, { label: 'Stealth', value: 91 }, { label: 'Armor', value: 73 },
]
const UNIT_COLS: JTableColumn[] = [
  { key: 'id',     label: 'ID',       width: '70px' },
  { key: 'unit',   label: 'UNIT NAME' },
  { key: 'sector', label: 'SECTOR',   width: '90px' },
  { key: 'status', label: 'STATUS',   width: '110px' },
  { key: 'signal', label: 'SIGNAL',   width: '90px' },
  { key: 'fuel',   label: 'FUEL %',   width: '90px' },
]
const UNIT_ROWS: JTableRow[] = [
  { id: 'A-01', unit: 'Alpha Squad',   sector: 'NORTH', status: 'active',  signal: '98%', fuel: '87%' },
  { id: 'B-02', unit: 'Bravo Team',    sector: 'EAST',  status: 'warning', signal: '72%', fuel: '54%' },
  { id: 'C-03', unit: 'Charlie Unit',  sector: 'SOUTH', status: 'error',   signal: '34%', fuel: '21%' },
  { id: 'D-04', unit: 'Delta Force',   sector: 'WEST',  status: 'active',  signal: '99%', fuel: '91%' },
  { id: 'E-05', unit: 'Echo Recon',    sector: 'NORTH', status: 'idle',    signal: '88%', fuel: '76%' },
  { id: 'F-06', unit: 'Foxtrot Base',  sector: 'BASE',  status: 'active',  signal: '100%', fuel: '100%' },
]
const LOG_COLS: JTableColumn[] = [
  { key: 'time',  label: 'TIME',    width: '90px' },
  { key: 'level', label: 'LEVEL',   width: '80px' },
  { key: 'msg',   label: 'MESSAGE' },
  { key: 'src',   label: 'SOURCE',  width: '110px' },
]
const LOG_ROWS: JTableRow[] = [
  { time: '14:03:21', level: 'active',  msg: 'System boot complete. All cores nominal.', src: 'CORE' },
  { time: '14:04:07', level: 'active',  msg: 'Alpha Squad reached waypoint Bravo-7.',   src: 'FIELD' },
  { time: '14:05:33', level: 'warning', msg: 'Signal degraded in eastern sector.',       src: 'COMMS' },
  { time: '14:06:12', level: 'error',   msg: 'Charlie Unit fuel critical — 21%.',        src: 'UNIT-C' },
  { time: '14:07:44', level: 'active',  msg: 'Delta Force confirmed objective secured.', src: 'FIELD' },
  { time: '14:08:55', level: 'warning', msg: 'Unauthorized scan detected on port 4400.', src: 'SECURITY' },
]
const COMMANDS: JCommand[] = [
  { key: 'dash',    label: 'Dashboard',       group: 'Navigate', icon: '⊞' },
  { key: 'units',   label: 'Field Units',      group: 'Navigate', icon: '◈' },
  { key: 'comms',   label: 'Communications',   group: 'Navigate', icon: '📡' },
  { key: 'network', label: 'Network Topology', group: 'Navigate', icon: '◉' },
  { key: 'intel',   label: 'Intelligence',     group: 'Navigate', icon: '⚡' },
  { key: 'controls',label: 'Controls',         group: 'Navigate', icon: '⚙' },
  { key: 'settings',label: 'Settings',         group: 'Navigate', icon: '◐' },
  { key: 'lock',    label: 'Lock System',      group: 'Actions',  icon: '🔒' },
]
// ── Graph 1: tactical field network ──────────────────────────────────────────
const NODES: NodeDef[] = [
  { id: 'hq',    label: 'HQ BASE',    x: 320, y: 160, type: 'hub' },
  { id: 'sa',    label: 'ALPHA',      x: 80,  y: 60,  pulse: true },
  { id: 'sb',    label: 'BRAVO',      x: 80,  y: 160, color: 'amber' },
  { id: 'sc',    label: 'CHARLIE',    x: 80,  y: 270, color: 'red', pulse: true },
  { id: 'sat',   label: 'SATELLITE',  x: 320, y: 20,  type: 'hex', color: 'green' },
  { id: 'relay', label: 'RELAY',      x: 560, y: 100, type: 'diamond' },
  { id: 'out',   label: 'COMMAND',    x: 560, y: 260, type: 'hex', color: 'green' },
]
const EDGES: EdgeDef[] = [
  { from: 'sa', to: 'hq' },
  { from: 'sb', to: 'hq', color: 'amber' },
  { from: 'sc', to: 'hq', color: 'red', style: 'dashed' },
  { from: 'sat', to: 'hq', color: 'green', animDur: 1.2 },
  { from: 'hq', to: 'relay' },
  { from: 'relay', to: 'out', color: 'green', animDur: 1.8 },
]

// ── Graph 2: org hierarchy ────────────────────────────────────────────────────
const ORG_NODES: NodeDef[] = [
  { id: 'ceo',  label: 'DIRECTOR',  x: 300, y: 30,  type: 'hub', color: 'green' },
  { id: 'ops',  label: 'OPS DIV',   x: 100, y: 130, type: 'hex' },
  { id: 'intel',label: 'INTEL DIV', x: 300, y: 130, type: 'hex', color: 'amber' },
  { id: 'tech', label: 'TECH DIV',  x: 500, y: 130, type: 'hex', color: 'green' },
  { id: 'f1',   label: 'UNIT A',    x: 40,  y: 250 },
  { id: 'f2',   label: 'UNIT B',    x: 160, y: 250, color: 'amber' },
  { id: 'f3',   label: 'ANALYST',   x: 260, y: 250, color: 'amber' },
  { id: 'f4',   label: 'SIGINT',    x: 360, y: 250, color: 'amber', pulse: true },
  { id: 'f5',   label: 'SYSTEMS',   x: 460, y: 250, color: 'green' },
  { id: 'f6',   label: 'CYBER',     x: 560, y: 250, color: 'green', pulse: true },
]
const ORG_EDGES: EdgeDef[] = [
  { from: 'ceo', to: 'ops',   color: 'cyan' },
  { from: 'ceo', to: 'intel', color: 'amber' },
  { from: 'ceo', to: 'tech',  color: 'green' },
  { from: 'ops',   to: 'f1', color: 'cyan' },
  { from: 'ops',   to: 'f2', color: 'amber' },
  { from: 'intel', to: 'f3', color: 'amber' },
  { from: 'intel', to: 'f4', color: 'amber', style: 'dashed', animDur: 1.0 },
  { from: 'tech',  to: 'f5', color: 'green' },
  { from: 'tech',  to: 'f6', color: 'green', animDur: 1.2 },
]

// ── Graph 3: microservices topology ──────────────────────────────────────────
const SVC_NODES: NodeDef[] = [
  { id: 'gw',   label: 'GATEWAY',   x: 300, y: 20,  type: 'hub' },
  { id: 'auth', label: 'AUTH SVC',  x: 80,  y: 120, color: 'amber', pulse: true },
  { id: 'api',  label: 'API SVC',   x: 300, y: 120 },
  { id: 'ws',   label: 'WS SVC',    x: 520, y: 120, color: 'green' },
  { id: 'db',   label: 'POSTGRES',  x: 140, y: 250, type: 'diamond', color: 'amber' },
  { id: 'cache',label: 'REDIS',     x: 300, y: 250, type: 'diamond', color: 'green' },
  { id: 'queue',label: 'QUEUE',     x: 460, y: 250, type: 'diamond' },
  { id: 'worker',label: 'WORKER',   x: 560, y: 180, color: 'red', pulse: true },
]
const SVC_EDGES: EdgeDef[] = [
  { from: 'gw',  to: 'auth', color: 'amber', animDur: 0.8 },
  { from: 'gw',  to: 'api' },
  { from: 'gw',  to: 'ws',   color: 'green' },
  { from: 'api', to: 'db',   color: 'amber' },
  { from: 'api', to: 'cache',color: 'green', animDur: 0.6 },
  { from: 'api', to: 'queue',style: 'dashed' },
  { from: 'queue',to: 'worker', color: 'red', animDur: 1.0 },
  { from: 'auth', to: 'cache', color: 'green', style: 'dashed' },
]

// ── Graph 5: NH-90 ITS device flow ────────────────────────────────────────────
const ITS_NODES: NodeDef[] = [
  { id: 'c0',   label: 'CCTV-000', x: 40,  y: 40,  pulse: true },
  { id: 'c1',   label: 'CCTV-001', x: 40,  y: 110 },
  { id: 'c2',   label: 'CCTV-002', x: 40,  y: 180, color: 'amber', pulse: true },
  { id: 'c3',   label: 'CCTV-003', x: 40,  y: 250 },
  { id: 'v1',   label: 'VMS-001',  x: 40,  y: 320, color: 'amber' },
  { id: 'p1',   label: 'PTZ-001',  x: 40,  y: 380, color: 'green' },
  { id: 'hub',  label: 'NH-90',    x: 300, y: 210, type: 'hub' },
  { id: 'toll', label: 'ECB TOLL', x: 520, y: 110, type: 'hex', color: 'red' },
  { id: 'ctrl', label: 'CTRL ROOM',x: 520, y: 310, type: 'hub', color: 'amber' },
]
const ITS_EDGES: EdgeDef[] = [
  { from: 'c0', to: 'hub', animDur: 1.8 },
  { from: 'c1', to: 'hub', animDur: 2.2 },
  { from: 'c2', to: 'hub', color: 'amber', animDur: 1.5 },
  { from: 'c3', to: 'hub', animDur: 2.5 },
  { from: 'v1', to: 'hub', color: 'amber', style: 'dashed', animDur: 2.0 },
  { from: 'p1', to: 'hub', color: 'green', animDur: 1.6 },
  { from: 'hub', to: 'toll', color: 'red',   animDur: 1.2 },
  { from: 'hub', to: 'ctrl', color: 'amber', animDur: 1.4 },
]

// ── Graph 6: alert propagation tree ───────────────────────────────────────────
const ALERT_NODES: NodeDef[] = [
  { id: 'root',  label: 'CCTV-005',  x: 40,  y: 160, color: 'red',   pulse: true },
  { id: 'z3',    label: 'ZONE-3',    x: 200, y: 160, type: 'diamond', color: 'red' },
  { id: 'vms',   label: 'VMS-001',   x: 40,  y: 80,  color: 'amber', pulse: true },
  { id: 'z3v',   label: 'ZONE-3 VMS',x: 200, y: 80,  type: 'diamond', color: 'amber' },
  { id: 'nhub',  label: 'NH-90 HUB', x: 370, y: 120, type: 'hub',    color: 'amber' },
  { id: 'ops',   label: 'OPS CENTER',x: 530, y: 60,  color: 'red' },
  { id: 'log',   label: 'LOG SRV',   x: 530, y: 180, color: 'amber' },
  { id: 'ok1',   label: 'CCTV-006',  x: 40,  y: 280, color: 'green' },
  { id: 'ok2',   label: 'PTZ-001',   x: 40,  y: 360, color: 'green' },
  { id: 'okz',   label: 'ZONE-1',    x: 200, y: 320, type: 'diamond', color: 'green' },
]
const ALERT_EDGES: EdgeDef[] = [
  { from: 'root', to: 'z3',   color: 'red',   animDur: 0.8 },
  { from: 'vms',  to: 'z3v',  color: 'amber', style: 'dashed', animDur: 1.2 },
  { from: 'z3',   to: 'nhub', color: 'red',   animDur: 0.9 },
  { from: 'z3v',  to: 'nhub', color: 'amber', animDur: 1.1 },
  { from: 'nhub', to: 'ops',  color: 'red',   animDur: 0.8 },
  { from: 'nhub', to: 'log',  color: 'amber' },
  { from: 'ok1',  to: 'okz',  color: 'green', animDur: 2.5 },
  { from: 'ok2',  to: 'okz',  color: 'green', animDur: 3.0 },
  { from: 'okz',  to: 'nhub', color: 'green', style: 'dashed', animDur: 3.0 },
]

// ── Graph 4: data pipeline ───────────────────────────────────────────────────
const PIPE_NODES: NodeDef[] = [
  { id: 'src1', label: 'SENSOR A', x: 40,  y: 80,  color: 'green', pulse: true },
  { id: 'src2', label: 'SENSOR B', x: 40,  y: 200, color: 'green', pulse: true },
  { id: 'src3', label: 'FEED C',   x: 40,  y: 310, color: 'amber' },
  { id: 'ingest',label:'INGEST',   x: 180, y: 190, type: 'hex' },
  { id: 'proc', label: 'PROCESS',  x: 330, y: 190, type: 'hub', color: 'amber' },
  { id: 'ml',   label: 'ML MODEL', x: 330, y: 80,  type: 'diamond', color: 'green', pulse: true },
  { id: 'alert',label: 'ALERTS',   x: 480, y: 80,  color: 'red', pulse: true },
  { id: 'store',label: 'STORAGE',  x: 480, y: 190, type: 'diamond' },
  { id: 'dash', label: 'DASHBOARD',x: 590, y: 310, type: 'hex', color: 'green' },
]
const PIPE_EDGES: EdgeDef[] = [
  { from: 'src1', to: 'ingest', color: 'green', animDur: 0.7 },
  { from: 'src2', to: 'ingest', color: 'green', animDur: 0.9 },
  { from: 'src3', to: 'ingest', color: 'amber', animDur: 1.1 },
  { from: 'ingest',to: 'proc' },
  { from: 'proc', to: 'ml',    color: 'green', animDur: 0.8 },
  { from: 'proc', to: 'store', animDur: 1.4 },
  { from: 'ml',   to: 'alert', color: 'red',   animDur: 0.5 },
  { from: 'store',to: 'dash',  color: 'green' },
]

// ─── helpers ─────────────────────────────────────────────────────────────────

function Row({ children, gap = 12, wrap = true }: { children: React.ReactNode; gap?: number; wrap?: boolean }) {
  return <div style={{ display: 'flex', flexWrap: wrap ? 'wrap' : 'nowrap', gap, alignItems: 'flex-start' }}>{children}</div>
}
function Col({ children, gap = 12 }: { children: React.ReactNode; gap?: number }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <div style={{ color: 'var(--j-accent)', fontSize: 9, letterSpacing: '0.2em' }}>▶ {children}</div>
      <div style={{ flex: 1, height: 1, background: 'var(--j-border)' }} />
    </div>
  )
}

// ─── pages ───────────────────────────────────────────────────────────────────

function PageDashboard() {
  return (
    <Col gap={32}>
      <div>
        <SectionTitle>OPERATIONAL OVERVIEW</SectionTitle>
        <Row gap={16}>
          <JStatCard title="ACTIVE UNITS" value="12 / 18" sub="field operational"
            dataRows={[{ label: 'Alpha Sector', value: '4' }, { label: 'Beta Sector', value: '5' }, { label: 'Gamma Sector', value: '3' }]} />
          <JStatCard title="SIGNAL HEALTH" value="94.2%" sub="avg across all units" state="success"
            dataRows={[{ label: 'Strong (>80%)', value: '9' }, { label: 'Weak (<50%)', value: '2' }, { label: 'Lost', value: '1' }]} />
          <JStatCard title="THREAT LEVEL" value="MODERATE" sub="2 active alerts" state="warning"
            dataRows={[{ label: 'Hostile Contacts', value: '3' }, { label: 'Unverified', value: '5' }, { label: 'Resolved', value: '11' }]} />
        </Row>
      </div>

      <div>
        <SectionTitle>SYSTEM VITALS</SectionTitle>
        <Row gap={32}>
          <JArcMeter level={87} label="SHIELDS" />
          <JArcMeter level={54} color="amber" label="FUEL RESERVE" />
          <JArcMeter level={93} color="green" label="POWER GRID" />
          <JArcMeter level={38} color="red" label="HULL INTEGRITY" />
          <Col gap={16}>
            <JGaugeChart value={76} label="EFFICIENCY" size="160px" />
          </Col>
          <Col gap={12}>
            <JHudLabel text="ALTITUDE" value="32,400 FT" />
            <JHudLabel text="VELOCITY" value="MACH 1.8" />
            <JHudLabel text="HEADING"  value="047° NE" />
            <JHudLabel text="UPTIME"   value="14:08:33" variant="callout" />
            <JWaveform barCount={16} />
            <JOrb size="48px" />
          </Col>
        </Row>
      </div>

      <div>
        <SectionTitle>ACTIVITY CHARTS</SectionTitle>
        <Row gap={16}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--j-accent)' }}>MISSION ACTIVITY</span>}>
              <JLineChart data={CHART_POINTS} height="140px" />
            </JCard>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--j-accent)' }}>RESOURCE USAGE</span>}>
              <JBarChart data={CHART_POINTS} height="140px" />
            </JCard>
          </div>
          <div style={{ minWidth: 200 }}>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--j-accent)' }}>ALLOCATION</span>}>
              <JDonutChart data={DONUT} size="160px" />
            </JCard>
          </div>
        </Row>
        <div style={{ marginTop: 16 }}>
          <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--j-accent)' }}>SIGNAL TREND</span>}>
            <JSparkline data={SPARK} height="48px" />
          </JCard>
        </div>
      </div>

      <div>
        <SectionTitle>CAPABILITY RADAR</SectionTitle>
        <Row gap={24}>
          <JRadarChart axes={RADAR} size="220px" />
          <Col gap={10} >
            {RADAR.map(a => (
              <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 80, fontSize: 9, letterSpacing: '0.1em', color: 'var(--j-text-muted)' }}>{a.label}</div>
                <div style={{ flex: 1, width: 160 }}><JProgress value={a.value} /></div>
                <div style={{ width: 36, fontSize: 10, color: 'var(--j-accent)', textAlign: 'right' }}>{a.value}%</div>
              </div>
            ))}
          </Col>
        </Row>
      </div>

      <div>
        <SectionTitle>EVENT LOG</SectionTitle>
        <JTable columns={LOG_COLS} rows={LOG_ROWS} />
      </div>
    </Col>
  )
}

function PageUnits() {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('all')
  return (
    <Col gap={24}>
      <div>
        <SectionTitle>FIELD UNIT STATUS</SectionTitle>
        <Row gap={12}>
          {(['all','active','warning','error','idle'] as const).map(s => (
            <JButton key={s} size="sm" color={filter === s ? 'cyan' : 'ghost'}
              onClick={() => setFilter(s)}>{s.toUpperCase()}</JButton>
          ))}
        </Row>
      </div>

      <Row gap={16}>
        <JStatCard title="ACTIVE" value="3" sub="units in field" state="active"
          dataRows={[{ label: 'Alpha', value: 'NORTH' }, { label: 'Delta', value: 'WEST' }, { label: 'Foxtrot', value: 'BASE' }]} />
        <JStatCard title="WARNINGS" value="2" sub="need attention" state="warning"
          dataRows={[{ label: 'Bravo — signal', value: '72%' }, { label: 'Echo — fuel', value: '76%' }]} />
        <JStatCard title="CRITICAL" value="1" sub="immediate action" state="error"
          dataRows={[{ label: 'Charlie — fuel', value: '21%' }, { label: 'Signal', value: '34%' }]} />
      </Row>

      <JTable columns={UNIT_COLS} rows={UNIT_ROWS} />

      <JPagination page={page} totalPages={4} onPageChange={setPage} />

      <div>
        <SectionTitle>STATUS BREAKDOWN</SectionTitle>
        <Row gap={24}>
          <Col gap={10}>
            {(['active','warning','error','idle','success','processing'] as const).map(s => (
              <Row key={s} gap={12}>
                <JStatusPill state={s}>{s.toUpperCase()}</JStatusPill>
                <div style={{ fontSize: 10, color: 'var(--j-text-muted)', letterSpacing: '0.08em' }}>
                  {s === 'active' ? '3 units' : s === 'warning' ? '2 units' : s === 'error' ? '1 unit' : s === 'idle' ? '1 unit' : '0 units'}
                </div>
              </Row>
            ))}
          </Col>
          <Col gap={8}>
            {(['cyan','amber','green','red','blue','white'] as const).map(c => (
              <JBadge key={c} color={c}>{c.toUpperCase()} BADGE</JBadge>
            ))}
            <JBadge color="red" blink>CRITICAL ALERT</JBadge>
          </Col>
        </Row>
      </div>
    </Col>
  )
}

function PageComms() {
  const [modalOpen, setModalOpen] = useState(false)
  const [accordOpen, setAccordOpen] = useState(false)
  const [tabKey, setTabKey] = useState('active')
  const { show } = useToast()
  return (
    <Col gap={28}>
      <div>
        <SectionTitle>ACTIVE ALERTS</SectionTitle>
        <Col gap={8}>
          <JAlert state="error" dismissible>CRITICAL: Charlie Unit fuel at 21% — immediate extraction required.</JAlert>
          <JAlert state="warning">WARNING: Signal degraded in eastern sector. Rerouting via Relay-3.</JAlert>
          <JAlert state="warning">WARNING: Unauthorized scan detected on port 4400. Firewall engaged.</JAlert>
          <JAlert state="active">INFO: Delta Force confirmed objective Alpha-7 secured at 14:07.</JAlert>
          <JAlert state="success">SUCCESS: Satellite uplink re-established. Data sync complete.</JAlert>
        </Col>
      </div>

      <div>
        <SectionTitle>BROADCAST CHANNEL</SectionTitle>
        <JTabs activeTab={tabKey} onTabChange={setTabKey}>
          <JTab tabKey="active" label="ACTIVE">
            <Col gap={8} >
              <JDataRow label="CHANNEL" value="ENCRYPTED-7" />
              <JDataRow label="FREQUENCY" value="2.4 GHz" />
              <JDataRow label="SIGNAL" value="98% STRONG" state="success" />
              <JDataRow label="UNITS CONNECTED" value="12 / 18" />
              <JDivider />
              <JTextArea placeholder="Broadcast message to all units..." rows={3} />
              <JButton color="cyan" shape="RightNotch">BROADCAST</JButton>
            </Col>
          </JTab>
          <JTab tabKey="logs" label="LOGS">
            <Col gap={8} >
              <JDataRow label="14:08:55" value="Security scan alert — port 4400" state="warning" />
              <JDataRow label="14:07:44" value="Delta confirmed Alpha-7 secured" state="success" />
              <JDataRow label="14:06:12" value="Charlie fuel critical — 21%" state="error" />
              <JDataRow label="14:05:33" value="Signal degraded — eastern sector" state="warning" />
              <JDataRow label="14:04:07" value="Alpha reached waypoint Bravo-7" />
              <JDataRow label="14:03:21" value="System boot complete — all nominal" />
            </Col>
          </JTab>
          <JTab tabKey="priority" label="PRIORITY">
            <Col gap={8}>
              <JDataRow label="P1 — IMMEDIATE" value="Extract Charlie Unit" state="error" />
              <JDataRow label="P2 — URGENT"    value="Repair eastern relay" state="warning" />
              <JDataRow label="P3 — STANDARD"  value="Resupply Bravo Team" />
              <JDataRow label="P4 — LOW"       value="Equipment maintenance" />
            </Col>
          </JTab>
        </JTabs>
      </div>

      <div>
        <SectionTitle>ACCORDION — MISSION BRIEFING</SectionTitle>
        <JAccordion title="OPERATION NIGHTFALL — CLASSIFIED" isOpen={accordOpen} onIsOpenChange={setAccordOpen}>
          <Col gap={8}>
            <JDataRow label="OBJECTIVE"  value="Secure perimeter Alpha-7 to Delta-3" />
            <JDataRow label="DURATION"   value="72 hours maximum" />
            <JDataRow label="AUTHORITY"  value="Command Level 5 clearance" />
            <JDataRow label="EXTRACTION" value="Waypoint Echo — 06:00 local" />
            <JDivider />
            <div style={{ fontSize: 10, color: 'var(--j-text-muted)', lineHeight: 1.8 }}>
              All units proceed with extreme caution. Hostile contacts confirmed in sectors B and C.
              Maintain radio silence unless critical. Extraction window is non-negotiable.
            </div>
          </Col>
        </JAccordion>
      </div>

      <div>
        <SectionTitle>TOAST NOTIFICATIONS</SectionTitle>
        <Row>
          <JButton size="sm" color="cyan"  onClick={() => show('active',  'Broadcast sent to all 12 units.')}>INFO</JButton>
          <JButton size="sm" color="green" onClick={() => show('success', 'Objective Alpha-7 secured.')}>SUCCESS</JButton>
          <JButton size="sm" color="amber" onClick={() => show('warning', 'Signal degraded — eastern sector.')}>WARNING</JButton>
          <JButton size="sm" color="red"   onClick={() => show('error',   'Charlie Unit fuel critical — 21%.')}>CRITICAL</JButton>
        </Row>
      </div>

      <div>
        <SectionTitle>MISSION CONTROL MODAL</SectionTitle>
        <JButton color="cyan" onClick={() => setModalOpen(true)}>OPEN MISSION CONTROL</JButton>
        <JModal open={modalOpen} onClose={() => setModalOpen(false)} title="MISSION CONTROL — OP NIGHTFALL">
          <Col gap={12}>
            <JDataRow label="OPERATION"  value="NIGHTFALL" />
            <JDataRow label="STATUS"     value="ACTIVE" state="active" />
            <JDataRow label="UNITS OUT"  value="12 / 18" />
            <JDataRow label="ETA"        value="00:47:33" />
            <JDataRow label="THREAT"     value="MODERATE" state="warning" />
            <JDivider />
            <Row>
              <JButton color="green" onClick={() => setModalOpen(false)}>CONFIRM</JButton>
              <JButton color="red"   onClick={() => setModalOpen(false)}>ABORT</JButton>
            </Row>
          </Col>
        </JModal>
      </div>
    </Col>
  )
}

function PageNetwork() {
  const [graphTab, setGraphTab] = useState<'tactical'|'org'|'services'|'pipeline'|'its'|'alert'|'live'>('tactical')
  const [liveNodes, setLiveNodes] = useState<NodeDef[]>([
    { id:'l1', label:'NODE-001', x:80,  y:80,  pulse:true },
    { id:'l2', label:'NODE-002', x:80,  y:210 },
    { id:'l3', label:'NODE-003', x:80,  y:330 },
    { id:'lh', label:'HUB',     x:320, y:200, type:'hub' },
    { id:'lo', label:'OUTPUT',  x:520, y:200, type:'hex', color:'green' },
  ])
  const [liveEdges, setLiveEdges] = useState<EdgeDef[]>([
    { from:'l1', to:'lh' }, { from:'l2', to:'lh' }, { from:'l3', to:'lh' },
    { from:'lh', to:'lo', color:'green', animDur:1.2 },
  ])
  const [liveCount, setLiveCount] = useState(5)

  function addLiveNode(type: NodeDef['type'], color: NodeDef['color'], prefix: string) {
    const id  = `ln${liveCount+1}`
    const x   = type==='hub' ? 200+Math.floor(Math.random()*200) : 40+Math.floor(Math.random()*120)
    const y   = 40+Math.floor(Math.random()*360)
    setLiveNodes(p => [...p, { id, label:`${prefix}-${String(liveCount+1).padStart(3,'0')}`, x, y, type, color }])
    setLiveCount(p => p+1)
  }
  function connectRandom() {
    if (liveNodes.length < 2) return
    const a = liveNodes[Math.floor(Math.random()*liveNodes.length)]
    const b = liveNodes[Math.floor(Math.random()*liveNodes.length)]
    if (a.id === b.id) return
    const colors: NodeDef['color'][] = ['cyan','amber','green','red']
    setLiveEdges(p => [...p, { from:a.id, to:b.id, color:colors[Math.floor(Math.random()*colors.length)], animDur:1+Math.random()*2 }])
  }
  function resetLive() {
    setLiveCount(5)
    setLiveNodes([
      { id:'l1', label:'NODE-001', x:80,  y:80,  pulse:true },
      { id:'l2', label:'NODE-002', x:80,  y:210 },
      { id:'l3', label:'NODE-003', x:80,  y:330 },
      { id:'lh', label:'HUB',     x:320, y:200, type:'hub' },
      { id:'lo', label:'OUTPUT',  x:520, y:200, type:'hex', color:'green' },
    ])
    setLiveEdges([
      { from:'l1', to:'lh' }, { from:'l2', to:'lh' }, { from:'l3', to:'lh' },
      { from:'lh', to:'lo', color:'green', animDur:1.2 },
    ])
  }
  return (
    <Col gap={28}>
      {/* ── graph tab selector ──────────────────────────────────────────── */}
      <div>
        <SectionTitle>NODE RELATIONSHIP GRAPHS</SectionTitle>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {([
            { key: 'tactical', label: '◉ TACTICAL'    },
            { key: 'org',      label: '⊞ ORG TREE'   },
            { key: 'services', label: '◈ MICROSERVICES'},
            { key: 'pipeline', label: '▶ PIPELINE'    },
            { key: 'its',      label: '◎ NH-90 ITS'  },
            { key: 'alert',    label: '⚠ ALERT TREE' },
            { key: 'live',     label: '⊕ INTERACTIVE' },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setGraphTab(t.key)} style={{
              padding: '5px 12px', fontFamily: "'Courier New',monospace", fontSize: 8,
              letterSpacing: '0.1em', cursor: 'pointer',
              background: graphTab === t.key ? 'var(--j-accent-18)' : 'var(--j-bg-card)',
              border: `1px solid ${graphTab === t.key ? 'var(--j-accent-50)' : 'var(--j-border-dim)'}`,
              color:  graphTab === t.key ? 'var(--j-accent)' : 'var(--j-text-muted)',
              clipPath: 'polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)',
            }}>{t.label}</button>
          ))}
        </div>
        {graphTab === 'live' && (
          <Row gap={8}>
            <JButton color="cyan"  size="sm" onClick={() => addLiveNode('default', 'cyan',  'NODE')}>+ CHIP</JButton>
            <JButton color="amber" size="sm" onClick={() => addLiveNode('hub',     'amber', 'HUB' )}>+ HUB</JButton>
            <JButton color="green" size="sm" onClick={() => addLiveNode('hex',     'green', 'SRV' )}>+ HEX</JButton>
            <JButton color="red"   size="sm" onClick={connectRandom}>⇄ CONNECT RANDOM</JButton>
            <JButton color="ghost" size="sm" onClick={resetLive}>↺ RESET</JButton>
            <JBadge color="cyan">{liveNodes.length} NODES</JBadge>
            <JBadge color="amber">{liveEdges.length} EDGES</JBadge>
          </Row>
        )}
        <div style={{ marginTop: 4 }}>
          {graphTab === 'tactical'  && <JNodeGraph nodes={NODES}        edges={EDGES}        title="FIELD NETWORK MAP"            height="420px" showLegend />}
          {graphTab === 'org'       && <JNodeGraph nodes={ORG_NODES}    edges={ORG_EDGES}    title="COMMAND STRUCTURE — ORG TREE"  height="380px" showLegend />}
          {graphTab === 'services'  && <JNodeGraph nodes={SVC_NODES}    edges={SVC_EDGES}    title="MICROSERVICES TOPOLOGY"        height="380px" showLegend />}
          {graphTab === 'pipeline'  && <JNodeGraph nodes={PIPE_NODES}   edges={PIPE_EDGES}   title="INTEL DATA PIPELINE"           height="420px" showLegend />}
          {graphTab === 'its'       && <JNodeGraph nodes={ITS_NODES}    edges={ITS_EDGES}    title="NH-90 ITS · DEVICE FLOW"       height="460px" showLegend />}
          {graphTab === 'alert'     && <JNodeGraph nodes={ALERT_NODES}  edges={ALERT_EDGES}  title="FAULT PROPAGATION · NH-90"     height="440px" showLegend />}
          {graphTab === 'live'      && <JNodeGraph nodes={liveNodes}    edges={liveEdges}    title="LIVE GRAPH · DRAG NODES · ADD CONNECTIONS" height="440px" showLegend />}
        </div>
      </div>

      {/* ── connection status ────────────────────────────────────────────── */}
      <div>
        <SectionTitle>CONNECTION STATUS</SectionTitle>
        <Row gap={16}>
          <JHudFrameCard frameStyle="Alpha" title="UPLINK STATUS">
            <Col gap={8}>
              <JDataRow label="SATELLITE"  value="CONNECTED" state="success" />
              <JDataRow label="RELAY-3"    value="ACTIVE"    state="active" />
              <JDataRow label="RELAY-7"    value="DEGRADED"  state="warning" />
              <JDataRow label="DIRECT LOS" value="OFFLINE"   state="error" />
            </Col>
          </JHudFrameCard>
          <JHudFrameCard frameStyle="Beta" title="BANDWIDTH">
            <Col gap={10}>
              <JProgress value={72} label="UPLINK" />
              <JProgress value={45} state="warning" label="DOWNLINK" />
              <JProgress value={88} state="success" label="MESH NETWORK" />
              <JProgress value={23} state="error"   label="LEGACY COMMS" />
            </Col>
          </JHudFrameCard>
        </Row>
      </div>

      {/* ── signal intelligence ──────────────────────────────────────────── */}
      <div>
        <SectionTitle>SIGNAL INTELLIGENCE</SectionTitle>
        <Row gap={24}>
          <JArcMeter level={98}  color="green" label="SATELLITE" />
          <JArcMeter level={76}  label="RELAY-3" />
          <JArcMeter level={45}  color="amber" label="RELAY-7" />
          <JArcMeter level={12}  color="red" label="DIRECT LOS" />
        </Row>
      </div>
    </Col>
  )
}

function PageIntel() {
  return (
    <Col gap={28}>
      <div>
        <SectionTitle>THREAT ASSESSMENT</SectionTitle>
        <Row gap={16}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--j-accent)' }}>THREAT TIMELINE</span>}>
              <JLineChart data={[
                { label: '06:00', value: 12 }, { label: '08:00', value: 28 },
                { label: '10:00', value: 45 }, { label: '12:00', value: 38 },
                { label: '14:00', value: 71 }, { label: '16:00', value: 55 },
              ]} height="140px" />
            </JCard>
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--j-accent)' }}>INCIDENT COUNT</span>}>
              <JBarChart data={[
                { label: 'Mon', value: 3 }, { label: 'Tue', value: 7 },
                { label: 'Wed', value: 2 }, { label: 'Thu', value: 9 },
                { label: 'Fri', value: 5 }, { label: 'Sat', value: 11 }, { label: 'Sun', value: 4 },
              ]} height="140px" />
            </JCard>
          </div>
          <div style={{ minWidth: 180 }}>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--j-accent)' }}>THREAT ORIGIN</span>}>
              <JDonutChart data={[
                { label: 'Cyber',    value: 42, color: '#ef4444' },
                { label: 'Physical', value: 31, color: '#f97316' },
                { label: 'Signal',   value: 18, color: '#6366f1' },
                { label: 'Unknown',  value: 9,  color: '#64748b' },
              ]} size="150px" />
            </JCard>
          </div>
        </Row>
      </div>

      <div>
        <SectionTitle>UNIT CAPABILITY ANALYSIS</SectionTitle>
        <Row gap={24}>
          <JRadarChart axes={RADAR} size="220px" />
          <Col gap={12}>
            <JHudLabel text="COMBAT RATING"  value="ALPHA TIER" variant="callout" />
            <JHudLabel text="RECON SCORE"    value="91 / 100" />
            <JHudLabel text="STEALTH INDEX"  value="HIGH" />
            <JHudLabel text="STAMINA"        value="73%" />
            <JDivider />
            <JGaugeChart value={84} label="OVERALL READINESS" size="160px" />
          </Col>
        </Row>
      </div>

      <div>
        <SectionTitle>SIGNAL TREND</SectionTitle>
        <Row gap={16}>
          <div style={{ flex: 1 }}>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--j-accent)' }}>SIGNAL STRENGTH (48H)</span>}>
              <JSparkline data={[72,65,80,78,55,48,62,71,88,90,84,77,92,95,88,72,68,74,82,90]} height="56px" />
            </JCard>
          </div>
          <div style={{ flex: 1 }}>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--j-accent)' }}>RESOURCE BURN RATE</span>}>
              <JSparkline data={[90,85,82,78,74,71,68,65,60,57,54,50,47,43,40,38,35,32,28,25]} height="56px" />
            </JCard>
          </div>
        </Row>
      </div>
    </Col>
  )
}

function PageControls() {
  const [textVal, setTextVal]     = useState('')
  const [areaVal, setAreaVal]     = useState('')
  const [selectVal, setSelectVal] = useState('alpha')
  const [checked, setChecked]     = useState(true)
  const [radio, setRadio]         = useState('encrypted')
  const [toggled, setToggled]     = useState(true)
  const [slider, setSlider]       = useState(72)
  return (
    <Col gap={28}>
      <div>
        <SectionTitle>TEXT INPUTS</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 640 }}>
          <JFormField label="CALLSIGN">
            <JInput value={textVal} onChange={(v: string) => setTextVal(v)} placeholder="Enter callsign..." />
          </JFormField>
          <JFormField label="UNIT ASSIGNMENT">
            <JSelect value={selectVal} onChange={setSelectVal} options={[
              { value: 'alpha',   label: 'Alpha Squad'  },
              { value: 'bravo',   label: 'Bravo Team'   },
              { value: 'charlie', label: 'Charlie Unit'  },
              { value: 'delta',   label: 'Delta Force'  },
            ]} />
          </JFormField>
          <JFormField label="EMAIL">
            <JInput type="email" placeholder="operator@jarvis.mil" />
          </JFormField>
          <JFormField label="ACCESS CODE" error>
            <JInput type="password" placeholder="••••••••" error />
          </JFormField>
        </div>
        <div style={{ marginTop: 12, maxWidth: 640 }}>
          <JFormField label="MISSION NOTES">
            <JTextArea value={areaVal} onChange={(v: string) => setAreaVal(v)} placeholder="Enter mission details..." rows={4} />
          </JFormField>
        </div>
      </div>

      <div>
        <SectionTitle>TOGGLES & SELECTORS</SectionTitle>
        <Row gap={32}>
          <Col gap={12}>
            <JCheckbox checked={checked}           onChange={setChecked}   label="STEALTH MODE" />
            <JCheckbox checked={false}             onChange={() => {}}     label="NIGHT VISION" />
            <JCheckbox checked={true}              onChange={() => {}}     label="AUTO-TARGET" />
          </Col>
          <Col gap={12}>
            <JRadio value="encrypted" checked={radio === 'encrypted'} onChange={setRadio} label="ENCRYPTED CHANNEL" />
            <JRadio value="open"      checked={radio === 'open'}      onChange={setRadio} label="OPEN CHANNEL" />
            <JRadio value="silent"    checked={radio === 'silent'}    onChange={setRadio} label="RADIO SILENCE" />
          </Col>
          <Col gap={16}>
            <JToggle checked={toggled} onChange={setToggled} label="SYSTEMS ONLINE" />
            <JToggle checked={false}   onChange={() => {}}   label="ENGAGE SHIELD" />
            <JToggle checked={true}    onChange={() => {}}   label="AUTO-FIRE ENABLED" />
          </Col>
        </Row>
      </div>

      <div>
        <SectionTitle>SLIDERS</SectionTitle>
        <Col gap={16} >
          <div style={{ maxWidth: 480 }}>
            <JFormField label={`POWER OUTPUT: ${slider}%`}>
              <JSlider value={slider} onChange={setSlider} min={0} max={100} />
            </JFormField>
          </div>
          <div style={{ maxWidth: 480 }}>
            <JFormField label="SHIELD INTENSITY: 80%">
              <JSlider value={80} onChange={() => {}} min={0} max={100} />
            </JFormField>
          </div>
          <div style={{ maxWidth: 480 }}>
            <JFormField label="WEAPON RANGE: 45%">
              <JSlider value={45} onChange={() => {}} min={0} max={100} />
            </JFormField>
          </div>
        </Col>
      </div>

      <div>
        <SectionTitle>BUTTONS — ALL VARIANTS</SectionTitle>
        <Col gap={12}>
          <Row>
            <JButton color="cyan">CYAN</JButton>
            <JButton color="amber">AMBER</JButton>
            <JButton color="green">GREEN</JButton>
            <JButton color="red">RED</JButton>
            <JButton color="blue">BLUE</JButton>
          </Row>
          <Row>
            <JButton shape="LeftNotch"    color="cyan">LEFT NOTCH</JButton>
            <JButton shape="RightNotch"   color="amber">RIGHT NOTCH</JButton>
            <JButton shape="BothNotch"    color="green">BOTH NOTCH</JButton>
            <JButton shape="Parallelogram" color="blue">PARALLELOGRAM</JButton>
            <JButton shape="Hexagonal"    color="red">HEXAGONAL</JButton>
          </Row>
          <Row>
            <JButton size="sm" color="cyan">SMALL</JButton>
            <JButton size="md" color="cyan">MEDIUM</JButton>
            <JButton size="lg" color="cyan">LARGE</JButton>
          </Row>
        </Col>
      </div>

      <div>
        <SectionTitle>PROGRESS BARS</SectionTitle>
        <Col gap={10} >
          <JProgress value={87} label="SHIELD CAPACITY" />
          <JProgress value={54} state="warning" label="FUEL RESERVE" />
          <JProgress value={23} state="error"   label="HULL INTEGRITY" />
          <JProgress value={93} state="success" label="COMMS UPTIME" />
          <JProgress value={67} variant="ticks" label="TICK STYLE" />
        </Col>
      </div>

      <div>
        <SectionTitle>DIVIDERS</SectionTitle>
        <JDivider />
        <div style={{ height: 8 }} />
        <JDivider label="CLASSIFIED" />
        <div style={{ height: 8 }} />
        <JDivider label="SECTION BREAK" />
      </div>

      <div>
        <SectionTitle>HUD FRAMES</SectionTitle>
        <Row gap={16}>
          {(['Alpha','Beta','Gamma','Delta'] as const).map(s => (
            <JHudFrameCard key={s} frameStyle={s} title={`FRAME — ${s}`}>
              <div style={{ padding: '8px 0', fontSize: 10, color: 'var(--j-text-muted)' }}>
                Style {s} frame container
              </div>
            </JHudFrameCard>
          ))}
        </Row>
        <div style={{ marginTop: 16 }}>
          <JHudFrame>
            <div style={{ padding: '12px 16px', fontSize: 10, color: 'var(--j-text-muted)', letterSpacing: '0.1em' }}>
              JHudFrame — minimal corner bracket framing for any content block
            </div>
          </JHudFrame>
        </div>
      </div>
    </Col>
  )
}

function PageSettings({ onLock }: { onLock: () => void }) {
  const [radial, setRadial]   = useState(false)
  const [palette, setPalette] = useState(false)
  return (
    <Col gap={28}>
      <div>
        <SectionTitle>THEME</SectionTitle>
        <JThemePicker />
      </div>

      <div>
        <SectionTitle>RADIAL MENU</SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <JButton color="cyan" onClick={() => setRadial(p => !p)}>TOGGLE RADIAL MENU</JButton>
          <div style={{ position: 'relative', width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <JRadialMenu open={radial} onOpenChange={setRadial} triggerLabel="SYS" radius={90}>
              <JRadialItem icon="⊞" label="Dashboard" angle={0}   />
              <JRadialItem icon="⚡" label="Power"     angle={72}  />
              <JRadialItem icon="◈" label="Network"   angle={144} />
              <JRadialItem icon="⚙" label="Settings"  angle={216} />
              <JRadialItem icon="🔒" label="Lock"      angle={288} />
            </JRadialMenu>
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>COMMAND PALETTE</SectionTitle>
        <JButton color="blue" onClick={() => setPalette(true)}>OPEN COMMAND PALETTE  ⌘K</JButton>
        <JCommandPalette
          visible={palette}
          onClose={() => setPalette(false)}
          commands={COMMANDS}
          onExecute={(cmd: JCommand) => { setPalette(false) }}
        />
      </div>

      <div>
        <SectionTitle>SPINNER</SectionTitle>
        <Row gap={32}>
          <JSpinner label="SCANNING" />
          <JSpinner label="LOADING" color="amber" />
          <JSpinner label="SYNCING" color="green" />
        </Row>
      </div>

      <div>
        <SectionTitle>SYSTEM ACTIONS</SectionTitle>
        <Row>
          <JButton color="red" shape="LeftNotch" onClick={onLock}>LOCK SYSTEM</JButton>
          <JButton color="amber">REBOOT</JButton>
          <JButton color="green">SAVE CONFIG</JButton>
        </Row>
      </div>
    </Col>
  )
}

// ─── login ───────────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)

  function handleLogin() {
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin() }, 1200)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--j-bg)', fontFamily: "'Courier New', monospace",
    }}>
      <div style={{ width: 360 }}>
        <JHudFrame>
          <div style={{ padding: 32 }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <JOrb size="64px" />
              <div style={{ fontSize: 22, color: 'var(--j-accent)', letterSpacing: '0.25em', marginTop: 16 }}>JARVIS</div>
              <div style={{ fontSize: 9, color: 'var(--j-text-muted)', letterSpacing: '0.2em', marginTop: 4 }}>ADVANCED RECONNAISSANCE & INTELLIGENCE SYSTEM</div>
            </div>

            <JDivider label="AUTHENTICATION REQUIRED" />

            <Col gap={12} >
              <JFormField label="OPERATOR ID">
                <JInput value={user} onChange={(v: string) => setUser(v)} placeholder="Enter operator ID..." />
              </JFormField>
              <JFormField label="ACCESS CODE">
                <JInput type="password" value={pass} onChange={(v: string) => setPass(v)} placeholder="••••••••" />
              </JFormField>
            </Col>

            <div style={{ marginTop: 20 }}>
              {loading
                ? <JSpinner label="AUTHENTICATING..." />
                : <JButton color="cyan" shape="RightNotch" onClick={handleLogin}
                    style={{ width: '100%', justifyContent: 'center' }}>
                    AUTHENTICATE
                  </JButton>
              }
            </div>

            <div style={{ marginTop: 20, display: 'flex', gap: 8, justifyContent: 'center' }}>
              <JBadge color="green">CLEARANCE LVL 5</JBadge>
              <JBadge color="amber">ENCRYPTED</JBadge>
            </div>

            <div style={{ marginTop: 12, textAlign: 'center', fontSize: 9, color: 'var(--j-text-muted)', letterSpacing: '0.1em' }}>
              UNAUTHORIZED ACCESS PROHIBITED — ALL SESSIONS LOGGED
            </div>
          </div>
        </JHudFrame>
      </div>
    </div>
  )
}

// ─── dashboard shell ─────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { key: 'dashboard',  icon: '⊞', label: 'DASHBOARD'   },
  { key: 'shield',     icon: '◎', label: 'SHIELD HUD'  },
  { key: 'win11',      icon: '🪟', label: 'WINDOWS 11'  },
  { key: 'macos',      icon: '🍎', label: 'macOS'       },
  { key: 'map',        icon: '🌐', label: 'TACTICAL MAP' },
  { key: 'india',      icon: '🇮🇳', label: 'INDIA MAP'   },
  { key: 'datatable',  icon: '▣', label: 'DATA TABLE'  },
  { key: 'forms',      icon: '✎', label: 'FORMS'       },
  { key: 'components', icon: '◐', label: 'COMPONENTS'  },
  { key: 'units',      icon: '◈', label: 'FIELD UNITS' },
  { key: 'comms',      icon: '📡', label: 'COMMS'      },
  { key: 'network',    icon: '◉', label: 'NETWORK'     },
  { key: 'intel',      icon: '⚡', label: 'INTELLIGENCE'},
  { key: 'controls',   icon: '⚙', label: 'CONTROLS'   },
  { key: 'settings',   icon: '◐', label: 'SETTINGS'   },
]

function ThemeToggle() {
  const { theme, setPreset } = useTheme()
  const isLight = theme.preset === 'white'
  return (
    <button
      onClick={() => setPreset(isLight ? 'cyan' : 'white')}
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            6,
        padding:        '4px 12px',
        background:     isLight ? 'var(--j-accent-18)' : 'var(--j-bg-card)',
        border:         '1px solid var(--j-border)',
        color:          'var(--j-accent)',
        fontFamily:     "'Courier New', monospace",
        fontSize:       9,
        letterSpacing:  '0.12em',
        cursor:         'pointer',
        clipPath:       'polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)',
        transition:     'all .15s',
      }}
    >
      {isLight ? '◑ DARK MODE' : '◐ LIGHT MODE'}
    </button>
  )
}

function Dashboard({ onLock }: { onLock: () => void }) {
  const [page, setPage] = useState('dashboard')

  // OS Shell pages take the full viewport — bypass JPageLayout entirely
  if (page === 'win11' || page === 'macos') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
        {/* Back button overlay */}
        <button
          onClick={() => setPage('dashboard')}
          style={{
            position: 'absolute', top: page === 'win11' ? 8 : 36, left: 12, zIndex: 9999,
            padding: '4px 12px', cursor: 'pointer', fontSize: 10, letterSpacing: '0.1em',
            fontFamily: "'Courier New', monospace",
            background: 'rgba(0,0,0,0.55)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.25)',
            clipPath: 'polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)',
            backdropFilter: 'blur(4px)',
          }}
        >
          ← BACK
        </button>
        {page === 'win11' && <PageWin11 />}
        {page === 'macos' && <PageMacOS />}
      </div>
    )
  }

  const sidebar = (
    <>
      {NAV_ITEMS.map(n => (
        <JNavItem key={n.key} icon={n.icon} label={n.label} active={page === n.key} onClick={() => setPage(n.key)} />
      ))}
    </>
  )

  const topBar = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', paddingRight: 8 }}>
      <ThemeToggle />
    </div>
  )

  return (
    <JPageLayout systemName="JARVIS" version="v1.0.0" sidebar={sidebar} showRec showLive topBar={topBar}>
      <div style={{ padding: '24px 28px' }}>
        {page === 'dashboard' && <PageDashboard />}
        {page === 'shield'    && <PageShield />}
        {page === 'map'       && <PageMap />}
        {page === 'india'      && <PageIndiaMap />}
        {page === 'datatable'  && <PageDataTable />}
        {page === 'forms'      && <PageForms />}
        {page === 'components' && <PageComponents />}
        {page === 'units'     && <PageUnits />}
        {page === 'comms'     && <PageComms />}
        {page === 'network'   && <PageNetwork />}
        {page === 'intel'     && <PageIntel />}
        {page === 'controls'  && <PageControls />}
        {page === 'settings'  && <PageSettings onLock={onLock} />}
      </div>
    </JPageLayout>
  )
}

// ─── app root ─────────────────────────────────────────────────────────────────

type AppStage = 'boot' | 'login' | 'dashboard'

function AppInner() {
  const [stage, setStage] = useState<AppStage>('boot')
  if (stage === 'boot')      return <JBootScreen systemName="JARVIS" version="v1.0.0" onComplete={() => setStage('login')} />
  if (stage === 'login')     return <LoginPage onLogin={() => setStage('dashboard')} />
  return <Dashboard onLock={() => setStage('login')} />
}

export default function App() {
  return (
    <JThemeProvider preset="cyan">
      <JToastProvider>
        <AppInner />
      </JToastProvider>
    </JThemeProvider>
  )
}
