import { useState } from 'react'
import {
  JThemePicker, useTheme,
  JButton, JInput, JTextArea, JSelect, JCheckbox, JRadio, JToggle, JSlider, JFormField,
  JBadge, JStatusPill, JProgress, JHudLabel, JDivider, JAlert, JDataRow,
  JCard, JStatCard, JModal, JTabs, JTab, JAccordion, JPagination,
  JArcMeter, JWaveform, JOrb,
  JSparkline, JBarChart, JLineChart, JDonutChart, JGaugeChart, JRadarChart,
  JHudFrame, JHudFrameCard, JSpinner,
  JBootScreen, JTable, JCommandPalette, JRadialMenu, JRadialItem, JNodeGraph,
  JToastProvider, useToast,
} from '@masterdeepak15/jarvis-ui'
import type { JCommand, JTableColumn, JTableRow, NodeDef, EdgeDef, JChartPoint } from '@masterdeepak15/jarvis-ui'

const CHART_POINTS: JChartPoint[] = [
  { label: 'Jan', value: 12 }, { label: 'Feb', value: 28 }, { label: 'Mar', value: 18 },
  { label: 'Apr', value: 45 }, { label: 'May', value: 33 }, { label: 'Jun', value: 61 },
]
const SPARKLINE_DATA = [12, 28, 18, 45, 33, 61, 54, 72]
const DONUT_DATA = [
  { label: 'Core', value: 40, color: '#00e5ff' },
  { label: 'Net',  value: 25, color: '#f97316' },
  { label: 'IO',   value: 20, color: '#22c55e' },
  { label: 'Idle', value: 15, color: '#ef4444' },
]
const RADAR_AXES = [
  { label: 'Speed',   value: 80 },
  { label: 'Power',   value: 65 },
  { label: 'Range',   value: 50 },
  { label: 'Stealth', value: 90 },
  { label: 'Armor',   value: 70 },
]
const TABLE_COLS: JTableColumn[] = [
  { key: 'id',     label: 'ID',       width: '60px' },
  { key: 'unit',   label: 'UNIT' },
  { key: 'status', label: 'STATUS',   width: '100px' },
  { key: 'signal', label: 'SIGNAL %', width: '100px' },
]
const TABLE_ROWS: JTableRow[] = [
  { id: 'A-01', unit: 'Alpha Squad', status: 'active',  signal: 98 },
  { id: 'B-02', unit: 'Bravo Team',  status: 'warning', signal: 72 },
  { id: 'C-03', unit: 'Charlie Unit', status: 'error',  signal: 34 },
  { id: 'D-04', unit: 'Delta Force', status: 'idle',    signal: 100 },
]
const COMMANDS: JCommand[] = [
  { key: 'dash',  label: 'Dashboard',       group: 'Navigate', icon: '⊞' },
  { key: 'nodes', label: 'Node Graph',       group: 'Navigate', icon: '◈' },
  { key: 'theme', label: 'Change Theme',     group: 'Actions',  icon: '◐' },
  { key: 'boot',  label: 'Reboot System',    group: 'Actions',  icon: '⟳' },
  { key: 'alert', label: 'Broadcast Alert',  group: 'Actions',  icon: '⚡' },
]
const NODES: NodeDef[] = [
  { id: 'hub', label: 'CORE',     x: 280, y: 140, type: 'hub' },
  { id: 'n1',  label: 'SENSOR A', x: 60,  y: 50,  pulse: true },
  { id: 'n2',  label: 'SENSOR B', x: 60,  y: 160, color: 'amber' },
  { id: 'n3',  label: 'CAMERA',   x: 60,  y: 260, type: 'diamond', color: 'green' },
  { id: 'out', label: 'OUTPUT',   x: 500, y: 140, type: 'hex', color: 'green' },
  { id: 'wrn', label: 'ALERT',    x: 380, y: 270, type: 'diamond', color: 'red', pulse: true },
]
const EDGES: EdgeDef[] = [
  { from: 'n1', to: 'hub' },
  { from: 'n2', to: 'hub', color: 'amber' },
  { from: 'n3', to: 'hub', color: 'green' },
  { from: 'hub', to: 'out', color: 'green', animDur: 1.4 },
  { from: 'hub', to: 'wrn', color: 'red', style: 'dashed' },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ color: 'var(--j-accent)', fontSize: 10, letterSpacing: '0.2em', fontWeight: 700 }}>
          ▶ {title}
        </div>
        <div style={{ flex: 1, height: 1, background: 'var(--j-border)' }} />
      </div>
      {children}
    </div>
  )
}

function Row({ children, gap = 12 }: { children: React.ReactNode; gap?: number }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap, alignItems: 'center' }}>{children}</div>
}

function ToastDemo() {
  const { show } = useToast()
  return (
    <Row>
      <JButton size="sm" color="cyan"  onClick={() => show('active',  'System online.')}>INFO</JButton>
      <JButton size="sm" color="green" onClick={() => show('success', 'Operation complete.')}>SUCCESS</JButton>
      <JButton size="sm" color="amber" onClick={() => show('warning', 'Warning: Low power.')}>WARN</JButton>
      <JButton size="sm" color="red"   onClick={() => show('error',   'Critical failure.')}>ERROR</JButton>
    </Row>
  )
}

function ThemeInfo() {
  const { theme } = useTheme()
  return (
    <div style={{ fontSize: 9, color: 'var(--j-text-muted)', letterSpacing: '0.1em', marginTop: 8 }}>
      ACTIVE: {theme.name.toUpperCase()} — ACCENT: {theme.accent}
    </div>
  )
}

export default function App() {
  const [textVal, setTextVal]     = useState('')
  const [selectVal, setSelectVal] = useState('alpha')
  const [checked, setChecked]     = useState(true)
  const [radio, setRadio]         = useState('a')
  const [toggled, setToggled]     = useState(true)
  const [slider, setSlider]       = useState(60)
  const [modalOpen, setModalOpen] = useState(false)
  const [tabKey, setTabKey]       = useState('status')
  const [page, setPage]           = useState(1)
  const [palette, setPalette]     = useState(false)
  const [radial, setRadial]       = useState(false)
  const [boot, setBoot]           = useState(false)
  const [booted, setBooted]       = useState(false)
  const [accordOpen, setAccordOpen] = useState(false)

  return (
    <JToastProvider>
      {boot && !booted && (
        <JBootScreen
          systemName="JARVIS"
          version="v1.0.0"
          onComplete={() => { setBooted(true); setBoot(false) }}
        />
      )}

      <div style={{
        minHeight: '100vh',
        background: 'var(--j-bg)',
        color: 'var(--j-text-primary)',
        fontFamily: "'Courier New', monospace",
        padding: '32px 40px',
        maxWidth: 900,
        margin: '0 auto',
      }}>

        {/* Header */}
        <div style={{ marginBottom: 48, borderBottom: '1px solid var(--j-border)', paddingBottom: 24 }}>
          <div style={{ fontSize: 28, color: 'var(--j-accent)', letterSpacing: '0.2em', fontWeight: 700 }}>
            JARVIS UI
          </div>
          <div style={{ fontSize: 10, color: 'var(--j-text-muted)', letterSpacing: '0.15em', marginTop: 4, marginBottom: 16 }}>
            HUD-STYLE REACT COMPONENT LIBRARY — LIVE SHOWCASE
          </div>
          <Row gap={16}>
            <JBadge color="cyan">v1.0.0</JBadge>
            <JBadge color="green">50+ COMPONENTS</JBadge>
            <JBadge color="amber">OPEN SOURCE</JBadge>
          </Row>
          <div style={{ marginTop: 12, fontSize: 10, color: 'var(--j-text-muted)' }}>
            npm install @masterdeepak15/jarvis-ui
          </div>
        </div>

        {/* Theme */}
        <Section title="THEME">
          <JThemePicker />
          <ThemeInfo />
        </Section>

        {/* Buttons */}
        <Section title="BUTTONS">
          <Row>
            <JButton color="cyan">DEFAULT</JButton>
            <JButton color="amber">AMBER</JButton>
            <JButton color="green">GREEN</JButton>
            <JButton color="red">RED</JButton>
            <JButton color="blue">BLUE</JButton>
          </Row>
          <div style={{ marginTop: 10 }} />
          <Row>
            <JButton shape="LeftNotch"  color="cyan">LEFT NOTCH</JButton>
            <JButton shape="RightNotch" color="amber">RIGHT NOTCH</JButton>
            <JButton shape="Hexagonal"  color="green">HEX</JButton>
            <JButton size="sm"          color="red">SMALL</JButton>
            <JButton size="lg"          color="blue">LARGE</JButton>
          </Row>
        </Section>

        {/* Form Controls */}
        <Section title="FORM CONTROLS">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 640 }}>
            <JFormField label="CALLSIGN">
              <JInput value={textVal} onChange={v => setTextVal(v)} placeholder="Enter callsign..." />
            </JFormField>
            <JFormField label="UNIT">
              <JSelect
                value={selectVal}
                onChange={setSelectVal}
                options={[
                  { value: 'alpha', label: 'Alpha Squad' },
                  { value: 'bravo', label: 'Bravo Team' },
                  { value: 'delta', label: 'Delta Force' },
                ]}
              />
            </JFormField>
          </div>
          <div style={{ marginTop: 12 }}>
            <JFormField label="MISSION BRIEF">
              <JTextArea placeholder="Enter mission details..." rows={3} />
            </JFormField>
          </div>
          <div style={{ marginTop: 16 }} />
          <Row gap={24}>
            <JCheckbox checked={checked} onChange={setChecked} label="STEALTH MODE" />
            <JRadio value="a" checked={radio === 'a'} onChange={setRadio} label="CHANNEL A" />
            <JRadio value="b" checked={radio === 'b'} onChange={setRadio} label="CHANNEL B" />
          </Row>
          <div style={{ marginTop: 16 }} />
          <Row gap={32}>
            <JToggle checked={toggled} onChange={setToggled} label="SYSTEMS ONLINE" />
            <div style={{ width: 240 }}>
              <JFormField label={`POWER: ${slider}%`}>
                <JSlider value={slider} onChange={setSlider} min={0} max={100} />
              </JFormField>
            </div>
          </Row>
        </Section>

        {/* Badges & Status */}
        <Section title="BADGES & STATUS">
          <Row>
            {(['cyan','amber','green','red','blue','white'] as const).map(c => (
              <JBadge key={c} color={c}>{c.toUpperCase()}</JBadge>
            ))}
            <JBadge color="red" blink>ALERT</JBadge>
          </Row>
          <div style={{ marginTop: 12 }} />
          <Row>
            {(['active','warning','error','idle','success'] as const).map(s => (
              <JStatusPill key={s} state={s}>{s.toUpperCase()}</JStatusPill>
            ))}
          </Row>
        </Section>

        {/* Progress & Labels */}
        <Section title="PROGRESS & LABELS">
          <div style={{ maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <JProgress value={72} label="SHIELDS" />
            <JProgress value={45} state="warning" label="FUEL" />
            <JProgress value={88} state="success" label="COMMS" variant="ticks" />
          </div>
          <div style={{ marginTop: 16 }} />
          <Row gap={24}>
            <JHudLabel text="ALTITUDE" value="32,000 FT" />
            <JHudLabel text="VELOCITY" value="MACH 2.1" />
            <JHudLabel text="HEADING"  value="270° W" />
            <JHudLabel text="STATUS"   value="NOMINAL" variant="callout" />
          </Row>
        </Section>

        {/* Alerts */}
        <Section title="ALERTS">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 520 }}>
            <JAlert state="active">System update available.</JAlert>
            <JAlert state="warning">Warning: Signal degraded.</JAlert>
            <JAlert state="success">Mission objective complete.</JAlert>
            <JAlert state="error" dismissible>Critical: Hull breach detected.</JAlert>
          </div>
          <div style={{ marginTop: 16 }}>
            <JDivider label="CLASSIFIED" />
          </div>
        </Section>

        {/* HUD Visualizations */}
        <Section title="HUD VISUALIZATIONS">
          <Row gap={32}>
            <JArcMeter level={72} label="SHIELDS" />
            <JArcMeter level={45} color="amber" label="FUEL" />
            <JArcMeter level={93} color="green" label="POWER" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <JWaveform barCount={20} />
              <JOrb size="56px" />
              <JSpinner label="SCANNING" />
            </div>
          </Row>
        </Section>

        {/* Cards */}
        <Section title="CARDS & FRAMES">
          <Row gap={16}>
            <JStatCard
              title="UNIT STATUS"
              value="12 / 17"
              sub="units operational"
              dataRows={[
                { label: 'Active', value: '12' },
                { label: 'Standby', value: '4' },
                { label: 'Offline', value: '1' },
              ]}
            />
            <JHudFrameCard frameStyle="Alpha" title="SENSOR DATA">
              <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <JDataRow label="TEMP"     value="38°C" />
                <JDataRow label="PRESSURE" value="1013 hPa" />
                <JDataRow label="HUMIDITY" value="62%" />
              </div>
            </JHudFrameCard>
            <JCard>
              <div style={{ padding: 12, fontSize: 11, color: 'var(--j-text-muted)' }}>
                JCard — general purpose container
              </div>
            </JCard>
          </Row>
          <div style={{ marginTop: 16 }}>
            <JHudFrame>
              <div style={{ padding: '12px 16px', fontSize: 11, color: 'var(--j-text-muted)', letterSpacing: '0.1em' }}>
                JHudFrame — corner bracket framing container
              </div>
            </JHudFrame>
          </div>
        </Section>

        {/* Charts */}
        <Section title="CHARTS">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 720 }}>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em' }}>ACTIVITY</span>}>
              <JLineChart data={CHART_POINTS} height="120px" />
            </JCard>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em' }}>OUTPUT</span>}>
              <JBarChart data={CHART_POINTS} height="120px" />
            </JCard>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em' }}>ALLOCATION</span>}>
              <JDonutChart data={DONUT_DATA} size="140px" />
            </JCard>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em' }}>CAPABILITY</span>}>
              <JRadarChart axes={RADAR_AXES} size="160px" />
            </JCard>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <JCard header={<span style={{ fontSize: 10, letterSpacing: '0.1em' }}>TREND</span>}>
              <div style={{ width: 300 }}>
                <JSparkline data={SPARKLINE_DATA} height="40px" />
              </div>
            </JCard>
            <JGaugeChart value={78} label="EFFICIENCY" size="180px" />
          </div>
        </Section>

        {/* Navigation */}
        <Section title="NAVIGATION — TABS, ACCORDION, PAGINATION">
          <JTabs activeTab={tabKey} onTabChange={setTabKey}>
            <JTab tabKey="status" label="STATUS">
              <div style={{ padding: '16px 0', fontSize: 11, color: 'var(--j-text-muted)' }}>
                All systems nominal. 12 units active.
              </div>
            </JTab>
            <JTab tabKey="comms" label="COMMS">
              <div style={{ padding: '16px 0', fontSize: 11, color: 'var(--j-text-muted)' }}>
                Encrypted channel active. Signal: 98%.
              </div>
            </JTab>
            <JTab tabKey="intel" label="INTEL">
              <div style={{ padding: '16px 0', fontSize: 11, color: 'var(--j-text-muted)' }}>
                3 active threats detected in sector 7.
              </div>
            </JTab>
          </JTabs>
          <div style={{ marginTop: 20 }}>
            <JAccordion
              title="MISSION BRIEFING"
              isOpen={accordOpen}
              onIsOpenChange={setAccordOpen}
            >
              <div style={{ padding: '12px 0', fontSize: 11, color: 'var(--j-text-muted)' }}>
                Objective: Secure perimeter. Eliminate hostile units. Evacuate civilians. Duration: 4 hours.
              </div>
            </JAccordion>
          </div>
          <div style={{ marginTop: 20 }}>
            <JPagination page={page} totalPages={8} onPageChange={setPage} />
          </div>
        </Section>

        {/* Table */}
        <Section title="DATA TABLE">
          <JTable columns={TABLE_COLS} rows={TABLE_ROWS} />
        </Section>

        {/* Interactive */}
        <Section title="INTERACTIVE — MODAL, COMMAND PALETTE, RADIAL MENU, TOAST">
          <Row gap={12}>
            <JButton color="cyan"  onClick={() => setModalOpen(true)}>OPEN MODAL</JButton>
            <JButton color="blue"  onClick={() => setPalette(true)}>COMMAND PALETTE</JButton>
            <JButton color="amber" onClick={() => setRadial(p => !p)}>RADIAL MENU</JButton>
            <JButton color="green" onClick={() => { setBooted(false); setBoot(true) }}>BOOT SCREEN</JButton>
          </Row>

          <div style={{ marginTop: 20 }}>
            <ToastDemo />
          </div>

          <div style={{ marginTop: 24, position: 'relative', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <JRadialMenu open={radial} onOpenChange={setRadial} triggerLabel="SYS" radius={90}>
              <JRadialItem icon="⊞" label="Dashboard" angle={0}   />
              <JRadialItem icon="⚡" label="Power"     angle={72}  />
              <JRadialItem icon="◈" label="Network"   angle={144} />
              <JRadialItem icon="⚙" label="Settings"  angle={216} />
              <JRadialItem icon="⟳" label="Refresh"   angle={288} />
            </JRadialMenu>
          </div>
        </Section>

        {/* Node Graph */}
        <Section title="NODE GRAPH">
          <JNodeGraph
            nodes={NODES}
            edges={EDGES}
            title="SYSTEM TOPOLOGY"
            height="340px"
            showLegend
          />
        </Section>

        {/* Modal */}
        <JModal open={modalOpen} onClose={() => setModalOpen(false)} title="MISSION CONTROL">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <JDataRow label="OBJECTIVE" value="Secure Alpha-7" />
            <JDataRow label="STATUS"    value="IN PROGRESS" state="warning" />
            <JDataRow label="ETA"       value="00:47:33" />
            <JDivider />
            <JButton color="green" onClick={() => setModalOpen(false)}>CONFIRM</JButton>
          </div>
        </JModal>

        {/* Command Palette */}
        <JCommandPalette
          visible={palette}
          onClose={() => setPalette(false)}
          commands={COMMANDS}
          onExecute={cmd => { setPalette(false); console.log('execute:', cmd.key) }}
        />

        {/* Footer */}
        <div style={{ borderTop: '1px solid var(--j-border)', paddingTop: 24, marginTop: 16, fontSize: 9, color: 'var(--j-text-muted)', letterSpacing: '0.1em' }}>
          @MASTERDEEPAK15/JARVIS-UI — MIT LICENSE — github.com/masterdeepak15/jarvis-ui
        </div>
      </div>
    </JToastProvider>
  )
}
