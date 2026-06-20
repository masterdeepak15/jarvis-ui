import { useState } from 'react'
import {
  JInput, JTextArea, JSelect, JToggle, JSlider, JCheckbox, JRadio,
  JFormField, JDatePicker, JTimePicker, JDateRangePicker,
  JButton, JBadge, JDivider, JDataRow, JTabs, JTab,
} from '@masterdeepak15/jarvis-ui'
import type { DateRange } from '@masterdeepak15/jarvis-ui'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize:8, color:'var(--j-accent)', letterSpacing:'0.16em', marginBottom:10, marginTop:4 }}>
      ▸ {children}
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:12 }}>{children}</div>
}

// ─── Forms tab ────────────────────────────────────────────────────────────────

function TabInputs() {
  const [v1, setV1] = useState(''); const [v2, setV2] = useState('')
  const [v3, setV3] = useState('NH-90-CTRL-001')
  const [ta1, setTa1] = useState(''); const [ta2, setTa2] = useState('Mission briefing data loaded.')
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <SectionLabel>JInput — Types & States</SectionLabel>
      <Grid>
        <JInput placeholder="Enter callsign..." value={v1} onChange={setV1} />
        <JInput placeholder="Access code..." value={v2} onChange={setV2} type="password" />
        <JInput value={v3} onChange={setV3} disabled />
        <JInput placeholder="Error state..." error />
      </Grid>

      <JDivider label="JTEXTAREA" />
      <SectionLabel>JTextArea — Multi-line</SectionLabel>
      <Grid>
        <JTextArea placeholder="Enter mission briefing..." value={ta1} onChange={setTa1} rows={4} />
        <JTextArea value={ta2} onChange={setTa2} rows={4} color="amber" />
        <JTextArea placeholder="Read only..." readOnly value="Classified intelligence report — eyes only." rows={3} />
        <JTextArea placeholder="Error state..." error rows={3} />
      </Grid>
    </div>
  )
}

function TabSelectToggle() {
  const [sel1, setSel1] = useState('alpha')
  const [sel2, setSel2] = useState('')
  const [tog1, setTog1] = useState(true)
  const [tog2, setTog2] = useState(false)
  const [tog3, setTog3] = useState(false)
  const [tog4, setTog4] = useState(true)
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <SectionLabel>JSelect — Dropdown</SectionLabel>
      <Grid>
        <JSelect value={sel1} onChange={setSel1}
          options={[
            { value:'alpha',   label:'ALPHA SECTOR' },
            { value:'bravo',   label:'BRAVO SECTOR' },
            { value:'charlie', label:'CHARLIE SECTOR' },
          ]} />
        <JSelect value={sel2} onChange={setSel2} color="amber"
          options={[
            { value:'',        label:'ALL STATUSES' },
            { value:'active',  label:'Active' },
            { value:'warning', label:'Warning' },
            { value:'error',   label:'Error' },
          ]} />
        <JSelect value="" onChange={() => {}} disabled
          options={[{ value:'', label:'SYSTEM LOCKED' }]} />
      </Grid>

      <JDivider label="JTOGGLE" />
      <SectionLabel>JToggle — Switch Controls</SectionLabel>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:10 }}>
        <JToggle checked={tog1} onChange={setTog1} label="NIGHT VISION" />
        <JToggle checked={tog2} onChange={setTog2} label="AUTO LOCK"    color="amber" />
        <JToggle checked={tog3} onChange={setTog3} label="RADAR SWEEP"  color="green" />
        <JToggle checked={tog4} onChange={setTog4} label="SIGNAL BOOST" color="red" />
        <JToggle checked={true}  onChange={() => {}} label="DISABLED ON"  disabled />
        <JToggle checked={false} onChange={() => {}} label="DISABLED OFF" disabled />
      </div>
    </div>
  )
}

function TabSliderCheck() {
  const [gain,   setGain]   = useState(72)
  const [freq,   setFreq]   = useState(240)
  const [thresh, setThresh] = useState(3.5)
  const [cb1,    setCb1]    = useState(true)
  const [cb2,    setCb2]    = useState(false)
  const [cb3,    setCb3]    = useState(true)
  const [radio,  setRadio]  = useState('level2')
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <SectionLabel>JSlider — Range Controls</SectionLabel>
      <div style={{ display:'flex', flexDirection:'column', gap:12, maxWidth:480 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:8, color:'var(--j-text-muted)', width:70, letterSpacing:'0.1em' }}>GAIN</span>
          <div style={{ flex:1 }}><JSlider value={gain} onChange={setGain} min={0} max={100} showValue /></div>
          <JBadge color="cyan">{gain}%</JBadge>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:8, color:'var(--j-text-muted)', width:70, letterSpacing:'0.1em' }}>FREQUENCY</span>
          <div style={{ flex:1 }}><JSlider value={freq} onChange={setFreq} min={100} max={500} step={10} color="amber" showValue /></div>
          <JBadge color="amber">{freq} Hz</JBadge>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:8, color:'var(--j-text-muted)', width:70, letterSpacing:'0.1em' }}>THRESHOLD</span>
          <div style={{ flex:1 }}><JSlider value={thresh} onChange={setThresh} min={0} max={10} step={0.5} color="red" showValue /></div>
          <JBadge color="red">{thresh}</JBadge>
        </div>
      </div>

      <JDivider label="JCHECKBOX + JRADIO" />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
        <div>
          <SectionLabel>JCheckbox</SectionLabel>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <JCheckbox checked={cb1} onChange={setCb1} label="ENABLE RADAR" />
            <JCheckbox checked={cb2} onChange={setCb2} label="AUTO LOCK"  color="green" />
            <JCheckbox checked={cb3} onChange={setCb3} label="NIGHT MODE" color="amber" />
            <JCheckbox checked={true} onChange={() => {}} label="DISABLED" disabled />
          </div>
        </div>
        <div>
          <SectionLabel>JRadio — Alert Level</SectionLabel>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[
              { value:'level1', label:'LEVEL 1 — LOW'      },
              { value:'level2', label:'LEVEL 2 — MODERATE' },
              { value:'level3', label:'LEVEL 3 — HIGH'     },
              { value:'level4', label:'LEVEL 4 — CRITICAL', color:'red' as const },
            ].map(opt => (
              <JRadio key={opt.value} name="alert-level" value={opt.value} label={opt.label}
                color={opt.color ?? 'cyan'}
                checked={radio === opt.value} onChange={setRadio} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TabFormField() {
  const [coord, setCoord] = useState('')
  const [target, setTarget] = useState('')
  const [notes, setNotes] = useState('')
  const [hasError, setHasError] = useState(false)
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14, maxWidth:560 }}>
      <SectionLabel>JFormField — Label Wrapper with Validation</SectionLabel>
      <JFormField label="COORDINATES" hint="Format: Lat, Lng (decimal degrees)">
        <JInput placeholder="28.6139, 77.2090" value={coord} onChange={setCoord} />
      </JFormField>
      <JFormField label="TARGET ID" error={hasError ? 'Required — enter a valid target ID' : undefined}>
        <JInput placeholder="TGT-000" value={target} onChange={v => { setTarget(v); setHasError(false) }}
          error={hasError} />
      </JFormField>
      <JFormField label="MISSION NOTES" hint="Multi-line field — max 500 characters">
        <JTextArea value={notes} onChange={setNotes} rows={4}
          placeholder="Enter mission briefing, objectives and special instructions..." />
      </JFormField>
      <div style={{ display:'flex', gap:8 }}>
        <JButton color="cyan" size="sm" onClick={() => { if (!target) setHasError(true) }}>
          VALIDATE
        </JButton>
        <JButton color="ghost" size="sm" onClick={() => { setCoord(''); setTarget(''); setNotes(''); setHasError(false) }}>
          CLEAR
        </JButton>
      </div>
      <JDivider />
      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        <JDataRow label="COORDS"  value={coord  || '—'} />
        <JDataRow label="TARGET"  value={target || '—'} state={hasError ? 'error' : target ? 'active' : undefined} />
        <JDataRow label="NOTES"   value={notes  ? `${notes.length} chars` : '—'} />
      </div>
    </div>
  )
}

function TabDateTime() {
  const [date,  setDate]  = useState<Date|undefined>(undefined)
  const [time,  setTime]  = useState('14:30')
  const [range, setRange] = useState<DateRange>({})
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <SectionLabel>JDatePicker</SectionLabel>
      <div style={{ display:'flex', gap:20, flexWrap:'wrap', alignItems:'flex-start' }}>
        <div>
          <div style={{ fontSize:8, color:'var(--j-text-muted)', letterSpacing:'0.1em', marginBottom:8 }}>DEFAULT (CYAN)</div>
          <JDatePicker value={date} onChange={setDate} />
        </div>
        <div>
          <div style={{ fontSize:8, color:'var(--j-text-muted)', letterSpacing:'0.1em', marginBottom:8 }}>AMBER — MIN TODAY</div>
          <JDatePicker value={date} onChange={setDate} color="amber" minDate={new Date()} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:30 }}>
          <JDataRow label="SELECTED DATE" value={date ? date.toLocaleDateString() : '—'} />
        </div>
      </div>

      <JDivider label="JTIMEPICKER" />
      <SectionLabel>JTimePicker</SectionLabel>
      <div style={{ display:'flex', gap:20, flexWrap:'wrap', alignItems:'flex-start' }}>
        <div>
          <div style={{ fontSize:8, color:'var(--j-text-muted)', letterSpacing:'0.1em', marginBottom:8 }}>DEFAULT</div>
          <JTimePicker value={time} onChange={setTime} />
        </div>
        <div>
          <div style={{ fontSize:8, color:'var(--j-text-muted)', letterSpacing:'0.1em', marginBottom:8 }}>GREEN</div>
          <JTimePicker value={time} onChange={setTime} color="green" />
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:30 }}>
          <JDataRow label="SELECTED TIME" value={time || '—'} />
        </div>
      </div>

      <JDivider label="JDATERANGEPICKER" />
      <SectionLabel>JDateRangePicker — Dual-Month Range</SectionLabel>
      <JDateRangePicker value={range} onChange={setRange} />
      <div style={{ display:'flex', gap:16 }}>
        <JDataRow label="FROM" value={range.from ? range.from.toLocaleDateString() : '—'} />
        <JDataRow label="TO"   value={range.to   ? range.to.toLocaleDateString()   : '—'} />
      </div>
    </div>
  )
}

// ─── main export ──────────────────────────────────────────────────────────────

export function PageForms() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
        <div style={{ fontSize:9, color:'var(--j-accent)', letterSpacing:'0.18em' }}>▶ FORM CONTROLS</div>
        <div style={{ flex:1, height:1, background:'var(--j-border)' }} />
        <JBadge color="cyan">JInput · JTextArea · JSelect · JToggle · JSlider · JCheckbox · JRadio · JFormField · DatePickers</JBadge>
      </div>

      <JTabs>
        <JTab tabKey="inputs"    label="INPUT + TEXTAREA"  icon="✎"><TabInputs /></JTab>
        <JTab tabKey="select"    label="SELECT + TOGGLE"   icon="◐"><TabSelectToggle /></JTab>
        <JTab tabKey="slider"    label="SLIDER + CHECKBOX" icon="⊟"><TabSliderCheck /></JTab>
        <JTab tabKey="formfield" label="FORMFIELD"         icon="⊞"><TabFormField /></JTab>
        <JTab tabKey="datetime"  label="DATE + TIME"       icon="📅"><TabDateTime /></JTab>
      </JTabs>
    </div>
  )
}
