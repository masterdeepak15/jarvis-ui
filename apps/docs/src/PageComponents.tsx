import { useState } from 'react'
import {
  JAlert, JModal, JStatCard, JHudLabel, JHudBar, JAccordion,
  JRadialMenu, JRadialItem, JTabs, JTab, JDivider, JBadge,
  JButton, JProgress, JDataRow, useToast,
} from '@masterdeepak15/jarvis-ui'
import { JSparkline } from '@masterdeepak15/jarvis-ui'
import { JGaugeChart } from '@masterdeepak15/jarvis-ui'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize:8, color:'var(--j-accent)', letterSpacing:'0.16em', marginBottom:10 }}>▸ {children}</div>
}

// ─── JALERT ──────────────────────────────────────────────────────────────────

function TabAlerts() {
  const [dismissed, setDismissed] = useState<Record<string,boolean>>({})
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      <SectionLabel>JAlert — All States</SectionLabel>
      {(['active','warning','error','success'] as const).map(state => (
        !dismissed[state] && (
          <JAlert key={state} state={state} title={state.toUpperCase()}
            dismissible onDismiss={() => setDismissed(p => ({ ...p, [state]:true }))}>
            {state==='active'  && 'System operational — all units reporting nominal.'}
            {state==='warning' && 'Signal degraded on RELAY-7 — switching to backup route.'}
            {state==='error'   && 'CCTV-003 offline — last contact 04:32 UTC. Investigate immediately.'}
            {state==='success' && 'Mission Alpha-7 complete — all units returned safely.'}
          </JAlert>
        )
      ))}
      {Object.keys(dismissed).length > 0 && (
        <JButton size="sm" color="ghost" onClick={() => setDismissed({})}>RESET ALERTS</JButton>
      )}

      <JDivider label="BLINK" />
      <SectionLabel>Blinking (critical attention)</SectionLabel>
      <JAlert state="error" title="CRITICAL — PERIMETER BREACH" blink>
        Zone 4 sensor triggered. Immediate response required. Lock down sectors B and C.
      </JAlert>
      <JAlert state="warning" title="FUEL LOW — ECHO-05" blink>
        ECHO-05 fuel at 21% — immediate refuel window required within 40 minutes.
      </JAlert>
    </div>
  )
}

// ─── JMODAL ──────────────────────────────────────────────────────────────────

function TabModal() {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <SectionLabel>JModal — Trigger Examples</SectionLabel>
      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
        <JButton color="cyan"  size="sm" onClick={() => setOpen1(true)}>OPEN CONFIRM MODAL</JButton>
        <JButton color="amber" size="sm" onClick={() => setOpen2(true)}>OPEN ALERT MODAL</JButton>
        <JButton color="red"   size="sm" onClick={() => setOpen3(true)}>OPEN DANGER MODAL</JButton>
      </div>

      <JModal open={open1} onClose={() => setOpen1(false)}
        title="MISSION CONFIRMATION" subTitle="NH-90 ITS SYSTEM"
        footer={
          <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
            <JButton color="ghost" size="sm" onClick={() => setOpen1(false)}>CANCEL</JButton>
            <JButton color="cyan"  size="sm" onClick={() => setOpen1(false)}>CONFIRM</JButton>
          </div>
        }>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <JDataRow label="MISSION"  value="OPERATION NIGHTFALL" />
          <JDataRow label="UNITS"    value="ALPHA-01, BRAVO-02, CHARLIE-03" />
          <JDataRow label="SECTOR"   value="ZONE-4 NORTH" />
          <JDataRow label="DURATION" value="6H 30M" />
          <JDivider />
          <div style={{ fontSize:10, color:'var(--j-text-muted)', lineHeight:1.8 }}>
            Confirm launch authorization for all assigned units. This action cannot be undone.
          </div>
        </div>
      </JModal>

      <JModal open={open2} onClose={() => setOpen2(false)}
        title="RELAY-7 DEGRADED" subTitle="SIGNAL ALERT"
        footer={<JButton color="amber" size="sm" onClick={() => setOpen2(false)}>ACKNOWLEDGE</JButton>}>
        <JAlert state="warning" title="SIGNAL DEGRADED">
          Relay-7 signal dropped to 45%. Backup routing activated via Relay-3. Monitor closely.
        </JAlert>
      </JModal>

      <JModal open={open3} onClose={() => setOpen3(false)} width="420px"
        title="ABORT MISSION" subTitle="DESTRUCTIVE ACTION"
        footer={
          <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
            <JButton color="ghost" size="sm" onClick={() => setOpen3(false)}>CANCEL</JButton>
            <JButton color="red"   size="sm" onClick={() => setOpen3(false)}>ABORT NOW</JButton>
          </div>
        }>
        <JAlert state="error" title="IRREVERSIBLE ACTION" blink>
          Aborting will recall all deployed units immediately. All mission data will be transmitted to HQ.
        </JAlert>
      </JModal>
    </div>
  )
}

// ─── JSTATCARD ───────────────────────────────────────────────────────────────

function TabStatCard() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <SectionLabel>JStatCard — Pre-built Metric Card</SectionLabel>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
        <JStatCard title="ACTIVE UNITS"    value="23" sub="of 28 deployed"
          state="active" badge="ONLINE" badgeColor="cyan" showStatusDot barValue={82}
          dataRows={[{ label:'ALPHA', value:'8' },{ label:'BRAVO', value:'7' },{ label:'DELTA', value:'8' }]} />

        <JStatCard title="SIGNAL STRENGTH" value="94%" sub="avg across all relays"
          state="active" badge="STRONG" badgeColor="green" barValue={94} color="green"
          dataRows={[{ label:'SATELLITE', value:'99%' },{ label:'RELAY-3', value:'88%' }]} />

        <JStatCard title="THREAT LEVEL"    value="MODERATE" sub="Zone 4 elevated"
          state="warning" badge="MONITOR" badgeColor="amber" barValue={55} color="amber"
          dataRows={[{ label:'INCIDENTS', value:'7' },{ label:'ACTIVE', value:'2' }]} />

        <JStatCard title="SYSTEM FAULT"    value="CCTV-003" sub="Forest Zone offline"
          state="error" badge="OFFLINE" badgeColor="red" barValue={21} color="red"
          dataRows={[{ label:'LAST PING', value:'04:32 UTC' },{ label:'DURATION', value:'2h 14m' }]} />
      </div>
    </div>
  )
}

// ─── JHUDLABEL + JHUDBAR ─────────────────────────────────────────────────────

function TabHudElements() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <SectionLabel>JHudLabel — Inline Display Labels</SectionLabel>
      <div style={{ display:'flex', flexWrap:'wrap', gap:16, alignItems:'flex-start' }}>
        <JHudLabel variant="chip"   text="ALPHA-01"  subText="ACTIVE"     value="98%" />
        <JHudLabel variant="chip"   text="BRAVO-02"  subText="WARNING"    value="72%" color="amber" />
        <JHudLabel variant="chip"   text="CHARLIE-03" subText="CRITICAL"  value="34%" color="red" />
        <JHudLabel variant="chip"   text="ECHO-05"   subText="STANDBY"    value="0%"  color="ghost" />
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:16 }}>
        <JHudLabel variant="arc"    text="UPTIME"    value="99.4%"  color="green" />
        <JHudLabel variant="arc"    text="SIGNAL"    value="94%"    />
        <JHudLabel variant="arc"    text="THREAT"    value="55%"    color="amber" />
        <JHudLabel variant="arc"    text="CRITICAL"  value="21%"    color="red" />
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:16 }}>
        <JHudLabel variant="metric" text="TOTAL UNITS"    value="28"        subText="deployed" />
        <JHudLabel variant="metric" text="ONLINE"         value="23"        subText="active"   color="green" />
        <JHudLabel variant="metric" text="INCIDENTS"      value="7"         subText="today"    color="amber" />
        <JHudLabel variant="metric" text="CRITICAL FAULTS" value="1"        subText="unresolved" color="red" />
      </div>

      <JDivider label="JHUDBAR" />
      <SectionLabel>JHudBar — Header/Footer Strip</SectionLabel>
      <div style={{ position:'relative', height:36, overflow:'hidden', border:'1px solid var(--j-border-dim)' }}>
        <JHudBar position="top" systemLabel="JARVIS-HUD" showDots showLive showRec tickCount={12} tickActive={9} />
      </div>
      <div style={{ position:'relative', height:36, overflow:'hidden', border:'1px solid var(--j-border-dim)' }}>
        <JHudBar position="bottom" color="amber" systemLabel="NH-90 ITS" showWaveform showDots />
      </div>
      <div style={{ position:'relative', height:36, overflow:'hidden', border:'1px solid var(--j-border-dim)' }}>
        <JHudBar position="top" color="green" showTicks tickCount={16} tickActive={12} systemLabel="SIGNAL MONITOR" />
      </div>
    </div>
  )
}

// ─── JACCORDION ──────────────────────────────────────────────────────────────

function TabAccordion() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:8, maxWidth:600 }}>
      <SectionLabel>JAccordion — Collapsible Sections</SectionLabel>
      <JAccordion title="UNIT STATUS REPORT" icon="◈" badge="8 UNITS" defaultOpen>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {[
            { id:'ALPHA-01', status:'ACTIVE',  signal:98, fuel:87 },
            { id:'BRAVO-02', status:'WARNING', signal:72, fuel:54 },
            { id:'CHARLIE-03',status:'ERROR',  signal:34, fuel:21 },
          ].map(u => (
            <div key={u.id} style={{ display:'flex', gap:12, alignItems:'center' }}>
              <span style={{ fontSize:9, color:'var(--j-text-muted)', width:90, letterSpacing:'0.1em' }}>{u.id}</span>
              <JProgress value={u.signal} state={u.signal>70?'active':u.signal>40?'warning':'error'} />
              <span style={{ fontSize:8, color:'var(--j-text-dim)', width:30 }}>{u.signal}%</span>
            </div>
          ))}
        </div>
      </JAccordion>

      <JAccordion title="THREAT ASSESSMENT" icon="⚠" state="warning" badge="MODERATE">
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <JDataRow label="HOSTILE ZONE ALPHA" value="ACTIVE — HIGH"    />
          <JDataRow label="HOSTILE ZONE BRAVO" value="ACTIVE — MODERATE"/>
          <JDataRow label="RESTRICTED AIRSPACE" value="CLOSED"          />
        </div>
      </JAccordion>

      <JAccordion title="COMMS NETWORK" icon="📡" color="green">
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <JDataRow label="SATELLITE UPLINK"  value="CONNECTED" state="active" />
          <JDataRow label="RELAY-3"           value="ACTIVE"    state="active" />
          <JDataRow label="RELAY-7"           value="DEGRADED"  state="warning" />
          <JDataRow label="DIRECT LOS"        value="OFFLINE"   state="error" />
        </div>
      </JAccordion>

      <JAccordion title="SYSTEM FAULTS — 1 CRITICAL" icon="⊘" state="error">
        <JAlert state="error" title="CCTV-003 OFFLINE">
          Forest Zone Entry camera offline for 2h 14m. No backup coverage available.
        </JAlert>
      </JAccordion>
    </div>
  )
}

// ─── JRADIALMENU ─────────────────────────────────────────────────────────────

function TabRadialMenu() {
  const [last, setLast] = useState<string|null>(null)
  const { show } = useToast()

  function act(label: string) {
    setLast(label)
    show('active', `Action: ${label}`)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <SectionLabel>JRadialMenu — Circular Action Menu</SectionLabel>
      <div style={{ display:'flex', gap:40, flexWrap:'wrap', alignItems:'flex-start' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
          <div style={{ fontSize:8, color:'var(--j-text-muted)', letterSpacing:'0.1em' }}>DEFAULT (CYAN)</div>
          <div style={{ width:260, height:260, display:'flex', alignItems:'center', justifyContent:'center',
            background:'var(--j-bg-card)', border:'1px solid var(--j-border-dim)' }}>
            <JRadialMenu triggerLabel="ACTIONS" radius={90}>
              <JRadialItem icon="◉" label="SCAN"    angle={0}   onClick={() => act('SCAN')} />
              <JRadialItem icon="⊕" label="LOCK"    angle={60}  onClick={() => act('LOCK')} />
              <JRadialItem icon="◈" label="DEPLOY"  angle={120} onClick={() => act('DEPLOY')} />
              <JRadialItem icon="⊘" label="ABORT"   angle={180} state="error"   onClick={() => act('ABORT')} />
              <JRadialItem icon="⚡" label="BOOST"  angle={240} state="warning" onClick={() => act('BOOST')} />
              <JRadialItem icon="◐" label="STATUS"  angle={300} onClick={() => act('STATUS')} />
            </JRadialMenu>
          </div>
          {last && <JBadge color="cyan">LAST: {last}</JBadge>}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:9, color:'var(--j-text-muted)', lineHeight:2, letterSpacing:'0.08em', paddingTop:40 }}>
          <div>• Click center to open/close</div>
          <div>• 6 items at 60° intervals</div>
          <div>• <span style={{ color:'var(--j-accent)' }}>angle</span> = degrees (0 = top)</div>
          <div>• <span style={{ color:'var(--j-accent)' }}>state</span> = active | warning | error</div>
          <div>• <span style={{ color:'var(--j-accent)' }}>radius</span> = distance from center</div>
        </div>
      </div>
    </div>
  )
}

// ─── JSPARKLINE + JGAUGECHART ─────────────────────────────────────────────────

function TabChartExtra() {
  const signal  = [45,52,48,61,74,68,82,79,88,92,86,94]
  const threat  = [12,18,28,45,38,55,71,60,44,38,29,35]
  const uptime  = [99,100,98,100,97,100,100,99,96,100,99,98]
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <SectionLabel>JSparkline — Inline Signal Trend</SectionLabel>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12 }}>
        {[
          { label:'SIGNAL STRENGTH', data:signal, area:true,  trend:'up'   as const },
          { label:'THREAT LEVEL',    data:threat, area:true,  trend:'up'   as const, color:'--j-warn' },
          { label:'UPTIME',          data:uptime, area:false, trend:'flat' as const, color:'--j-ok'   },
        ].map(s => (
          <div key={s.label} style={{ background:'var(--j-bg-card)', border:'1px solid var(--j-border-dim)',
            padding:'10px 14px', clipPath:'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>
            <div style={{ fontSize:8, color:'var(--j-text-muted)', letterSpacing:'0.12em', marginBottom:6 }}>{s.label}</div>
            <JSparkline data={s.data} width="100%" height="48px" showArea={s.area}
              showTrend trend={s.trend} colorVar={s.color} />
            <div style={{ fontSize:9, color:'var(--j-accent)', textAlign:'right', marginTop:4, letterSpacing:'0.1em' }}>
              {s.data[s.data.length-1]}{s.color === '--j-ok' ? '%' : ''}
            </div>
          </div>
        ))}
      </div>

      <JDivider label="JGAUGECHART" />
      <SectionLabel>JGaugeChart — Circular Gauge</SectionLabel>
      <div style={{ display:'flex', gap:24, flexWrap:'wrap', justifyContent:'center' }}>
        <JGaugeChart value={94} label="SIGNAL"   size="160px" showTicks showMinMax />
        <JGaugeChart value={72} label="FUEL"     size="160px" showNeedle colorVar="--j-warn" />
        <JGaugeChart value={55} label="THREAT"   size="160px" showTicks  colorVar="--j-warn" />
        <JGaugeChart value={12} label="POWER"    size="160px" showNeedle colorVar="--j-err"  />
        <JGaugeChart value={99} label="UPTIME"   size="160px" showTicks  colorVar="--j-ok" displayValue="99.4%" />
      </div>
    </div>
  )
}

// ─── main export ──────────────────────────────────────────────────────────────

export function PageComponents() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
        <div style={{ fontSize:9, color:'var(--j-accent)', letterSpacing:'0.18em' }}>▶ COMPONENTS</div>
        <div style={{ flex:1, height:1, background:'var(--j-border)' }} />
        <JBadge color="cyan">JAlert · JModal · JStatCard · JHudLabel · JHudBar · JAccordion · JRadialMenu · JSparkline · JGaugeChart</JBadge>
      </div>

      <JTabs>
        <JTab tabKey="alerts"    label="ALERTS"      icon="⚠"><TabAlerts /></JTab>
        <JTab tabKey="modal"     label="MODAL"       icon="⊞"><TabModal /></JTab>
        <JTab tabKey="statcard"  label="STAT CARDS"  icon="◉"><TabStatCard /></JTab>
        <JTab tabKey="hudlabel"  label="HUD LABELS"  icon="◐"><TabHudElements /></JTab>
        <JTab tabKey="accordion" label="ACCORDION"   icon="◈"><TabAccordion /></JTab>
        <JTab tabKey="radial"    label="RADIAL MENU" icon="⊕"><TabRadialMenu /></JTab>
        <JTab tabKey="charts"    label="SPARKLINE + GAUGE" icon="◎"><TabChartExtra /></JTab>
      </JTabs>
    </div>
  )
}
