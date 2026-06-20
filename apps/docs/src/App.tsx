import { useState, useEffect } from 'react'
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
  return (
    <Col gap={28}>
      <div>
        <SectionTitle>NETWORK TOPOLOGY</SectionTitle>
        <JNodeGraph nodes={NODES} edges={EDGES} title="FIELD NETWORK MAP" height="420px" showLegend />
      </div>

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
  { key: 'dashboard', icon: '⊞', label: 'DASHBOARD' },
  { key: 'units',     icon: '◈', label: 'FIELD UNITS' },
  { key: 'comms',     icon: '📡', label: 'COMMS' },
  { key: 'network',   icon: '◉', label: 'NETWORK' },
  { key: 'intel',     icon: '⚡', label: 'INTELLIGENCE' },
  { key: 'controls',  icon: '⚙', label: 'CONTROLS' },
  { key: 'settings',  icon: '◐', label: 'SETTINGS' },
]

function Dashboard({ onLock }: { onLock: () => void }) {
  const [page, setPage] = useState('dashboard')

  const sidebar = (
    <>
      {NAV_ITEMS.map(n => (
        <JNavItem key={n.key} icon={n.icon} label={n.label} active={page === n.key} onClick={() => setPage(n.key)} />
      ))}
    </>
  )

  return (
    <JPageLayout systemName="JARVIS" version="v1.0.0" sidebar={sidebar} showRec showLive>
      <div style={{ padding: '24px 28px' }}>
        {page === 'dashboard' && <PageDashboard />}
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
