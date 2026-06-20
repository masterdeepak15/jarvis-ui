import { useState, useEffect, useCallback } from 'react'
import {
  JTable, JPagination, JInput, JSelect, JButton, JBadge,
  JStatusPill, JProgress, JSpinner, JDataRow, JTabs, JTab,
} from '@masterdeepak15/jarvis-ui'
import type { JTableColumn } from '@masterdeepak15/jarvis-ui'

// ─── 100 dummy NH-90 ITS device records ──────────────────────────────────────

const LOCS = [
  'Haridwar Toll Entry','Bypass Junction','Shivalik Nagar Overpass','BHEL Road Junction',
  'Raiwala Check Post','Forest Zone Entry','Motichur Bridge','Chilla Range Gate',
  'Neel Dhara Viewpoint','Kaudiyala Bend','Brahmanwala Village','NH-72A Junction',
  'Doiwala Underpass','ISBT Bypass Entry','Rispana River Bridge','Prem Nagar Chowk',
  'Raipur Road Intersection','Dehradun City Entry','Clock Tower Junction','Mussoorie Bypass Exit',
]
const TYPES   = ['CCTV','VMS','PTZ','TOLL','CCTV','CCTV','CCTV','CCTV','CCTV','PTZ']
const STATUSES= ['Active','Active','Active','Active','Active','Active','Warning','Warning','Error','Error']

interface DeviceRow { [key: string]: string | number }

const ALL_DATA: DeviceRow[] = Array.from({ length: 100 }, (_, i) => {
  const st  = STATUSES[i % STATUSES.length]
  const typ = TYPES[i % TYPES.length]
  return {
    id:       `${typ[0]}N${String(i).padStart(3,'0')}`,
    device:   `${typ}-${String(i).padStart(3,'0')}`,
    location: LOCS[i % LOCS.length],
    type:     typ,
    status:   st,
    health:   st === 'Error' ? 0 : st === 'Warning' ? 60 + (i % 30) : 90 + (i % 10),
    km:       Math.floor(i / 2),
    uptime:   st === 'Error' ? '0.0%' : `${95 + (i % 5)}.${i % 10}%`,
    ping:     st === 'Error' ? '—' : `${(i % 20) + 1}ms`,
  }
})

const COLS: JTableColumn[] = [
  { key: 'id',       label: 'ID',       width: '90px' },
  { key: 'device',   label: 'DEVICE' },
  { key: 'location', label: 'LOCATION' },
  { key: 'type',     label: 'TYPE',     width: '70px' },
  { key: 'status',   label: 'STATUS',   width: '110px' },
  { key: 'health',   label: 'HEALTH',   width: '130px' },
  { key: 'km',       label: 'KM',       width: '50px' },
  { key: 'uptime',   label: 'UPTIME',   width: '80px' },
  { key: 'ping',     label: 'PING',     width: '60px' },
]

// ─── helpers ──────────────────────────────────────────────────────────────────

function stateOf(st: string): 'active'|'warning'|'error'|'idle' {
  return st === 'Error' ? 'error' : st === 'Warning' ? 'warning' : 'active'
}
function typeColor(t: string): 'cyan'|'amber'|'green'|'red' {
  if (t === 'VMS')  return 'amber'
  if (t === 'PTZ')  return 'green'
  if (t === 'TOLL') return 'red'
  return 'cyan'
}
function statusColor(st: string) {
  if (st === 'Error')   return 'var(--j-err)'
  if (st === 'Warning') return 'var(--j-warn)'
  return 'var(--j-ok)'
}

// ─── custom table cell renderer ───────────────────────────────────────────────

function Cell({ col, row }: { col: JTableColumn; row: DeviceRow }) {
  const val = String(row[col.key] ?? '')
  if (col.key === 'status')
    return <JStatusPill state={stateOf(val)}>{val.toUpperCase()}</JStatusPill>
  if (col.key === 'type')
    return <JBadge color={typeColor(val)}>{val}</JBadge>
  if (col.key === 'health') {
    const n = Number(val)
    return (
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <div style={{ flex:1, maxWidth:60 }}>
          <JProgress value={n} state={n >= 80 ? 'active' : n >= 50 ? 'warning' : 'error'} />
        </div>
        <span style={{ fontSize:9, color:'var(--j-text-muted)', width:28, textAlign:'right' }}>{val}%</span>
      </div>
    )
  }
  return <>{val}</>
}

// ─── sortable header table ─────────────────────────────────────────────────────

function HudTable({
  rows, sortCol, sortAsc, onSort, emptyMsg = 'NO RECORDS MATCH',
}: {
  rows: DeviceRow[]; sortCol: string|null; sortAsc: boolean
  onSort: (col: string) => void; emptyMsg?: string
}) {
  return (
    <div style={{ background:'var(--j-bg-card)', border:'1px solid var(--j-border-dim)', overflow:'hidden' }}>
      <div style={{ height:2, background:'linear-gradient(90deg,var(--j-accent),var(--j-accent-08))' }} />
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:"'Courier New',monospace", fontSize:11 }}>
          <thead>
            <tr>
              {COLS.map(col => (
                <th key={col.key}
                  onClick={() => onSort(col.key)}
                  style={{
                    padding:'8px 12px', textAlign:'left', cursor:'pointer', userSelect:'none',
                    whiteSpace:'nowrap', width: col.width,
                    color:'var(--j-accent-mid)', fontSize:8, fontWeight:600,
                    letterSpacing:'0.14em', textTransform:'uppercase',
                    background:'var(--j-accent-05)', borderBottom:'1px solid var(--j-accent-18)',
                  }}>
                  {col.label}
                  <span style={{ marginLeft:4, color: sortCol===col.key ? 'var(--j-accent)' : 'var(--j-accent-25)' }}>
                    {sortCol===col.key ? (sortAsc?'▲':'▼') : '⇅'}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={COLS.length} style={{ padding:24, textAlign:'center', color:'var(--j-text-dim)', fontSize:10, letterSpacing:'0.1em' }}>
                  {emptyMsg}
                </td>
              </tr>
            )}
            {rows.map((row, ri) => {
              const state = stateOf(String(row.status))
              const borderColor = state==='error'?'var(--j-err)':state==='warning'?'var(--j-warn)':'transparent'
              return (
                <tr key={ri} style={{
                  background: ri%2===0 ? 'transparent' : 'var(--j-accent-05)',
                  borderLeft:`2px solid ${borderColor}`,
                  transition:'background .1s',
                }}>
                  {COLS.map(col => (
                    <td key={col.key} style={{
                      padding:'7px 12px',
                      borderBottom:'1px solid var(--j-accent-05)',
                      color: state==='error'?'var(--j-err)':state==='warning'?'var(--j-warn)':'var(--j-text-secondary)',
                      fontSize:11, fontFamily:"'Courier New',monospace",
                    }}>
                      <Cell col={col} row={row} />
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div style={{ height:1, background:'linear-gradient(90deg,var(--j-accent-25),transparent)' }} />
    </div>
  )
}

// ─── CLIENT-SIDE TAB ──────────────────────────────────────────────────────────

function TabClientSide() {
  const [search,   setSearch]   = useState('')
  const [status,   setStatus]   = useState('')
  const [type,     setType]     = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [page,     setPage]     = useState(1)
  const [sortCol,  setSortCol]  = useState<string|null>(null)
  const [sortAsc,  setSortAsc]  = useState(true)

  const filtered = useCallback(() => {
    let q = ALL_DATA as DeviceRow[]
    if (search.trim()) {
      const s = search.toLowerCase()
      q = q.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(s)))
    }
    if (status) q = q.filter(r => r.status === status)
    if (type)   q = q.filter(r => r.type   === type)
    if (sortCol) {
      q = [...q].sort((a,b) => {
        const av = String(a[sortCol]??''), bv = String(b[sortCol]??'')
        return sortAsc ? av.localeCompare(bv, undefined, { numeric:true }) : bv.localeCompare(av, undefined, { numeric:true })
      })
    }
    return q
  }, [search, status, type, sortCol, sortAsc])

  const allFiltered = filtered()
  const totalPages  = Math.max(1, Math.ceil(allFiltered.length / pageSize))
  const safePage    = Math.min(page, totalPages)
  const pageRows    = allFiltered.slice((safePage-1)*pageSize, safePage*pageSize)

  const activeCount  = allFiltered.filter(r => r.status === 'Active').length
  const warningCount = allFiltered.filter(r => r.status === 'Warning').length
  const errorCount   = allFiltered.filter(r => r.status === 'Error').length

  function handleSort(col: string) {
    if (sortCol === col) setSortAsc(p => !p)
    else { setSortCol(col); setSortAsc(true) }
    setPage(1)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      {/* controls */}
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'flex-end' }}>
        <div style={{ flex:1, minWidth:180 }}>
          <JInput placeholder="Search devices, location, ID..." value={search} onChange={setSearch} />
        </div>
        <JSelect value={status} onChange={setStatus}
          options={[
            { value:'', label:'ALL STATUS' },
            { value:'Active',  label:'Active' },
            { value:'Warning', label:'Warning' },
            { value:'Error',   label:'Error' },
          ]} />
        <JSelect value={type} onChange={setType}
          options={[
            { value:'', label:'ALL TYPES' },
            { value:'CCTV', label:'CCTV' },
            { value:'VMS',  label:'VMS'  },
            { value:'PTZ',  label:'PTZ'  },
            { value:'TOLL', label:'TOLL' },
          ]} />
        <JSelect value={String(pageSize)} onChange={v => { setPageSize(Number(v)); setPage(1) }}
          options={[
            { value:'5',  label:'5 / page' },
            { value:'10', label:'10 / page' },
            { value:'20', label:'20 / page' },
            { value:'50', label:'50 / page' },
          ]} />
        <div style={{ display:'flex', gap:6 }}>
          <JBadge color="cyan">{allFiltered.length} RECORDS</JBadge>
          <JBadge color="green">{activeCount} ONLINE</JBadge>
          {warningCount > 0 && <JBadge color="amber">{warningCount} WARN</JBadge>}
          {errorCount   > 0 && <JBadge color="red">{errorCount} OFFLINE</JBadge>}
        </div>
        {sortCol && (
          <button onClick={() => { setSortCol(null); setSortAsc(true) }} style={{
            background:'none', border:'1px solid var(--j-err-25)', color:'var(--j-err)',
            fontFamily:"'Courier New',monospace", fontSize:8, padding:'4px 8px', cursor:'pointer',
            letterSpacing:'0.1em',
          }}>✕ CLEAR SORT</button>
        )}
      </div>

      <HudTable rows={pageRows} sortCol={sortCol} sortAsc={sortAsc} onSort={handleSort} />

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
        <span style={{ fontSize:8, color:'var(--j-text-dim)', letterSpacing:'0.1em' }}>
          SHOWING {allFiltered.length===0?0:(safePage-1)*pageSize+1}–{Math.min(safePage*pageSize, allFiltered.length)} OF {allFiltered.length}
        </span>
        <JPagination page={safePage} totalPages={totalPages} onPageChange={setPage} showFirstLast showInfo />
      </div>
    </div>
  )
}

// ─── SERVER-SIDE TAB ──────────────────────────────────────────────────────────

function TabServerSide() {
  const [search,  setSearch]  = useState('')
  const [status,  setStatus]  = useState('')
  const [page,    setPage]    = useState(1)
  const [loading, setLoading] = useState(false)
  const [rows,    setRows]    = useState<DeviceRow[]>([])
  const [total,   setTotal]   = useState(0)
  const [latency, setLatency] = useState(0)
  const [logs,    setLogs]    = useState<string[]>(['Initialized · Ready'])
  const PAGE_SIZE = 10

  async function fetchData(p: number, q: string, st: string) {
    setLoading(true)
    addLog(`→ GET /api/devices?page=${p}&q=${encodeURIComponent(q)}&status=${st}`)

    const t0 = Date.now()
    await new Promise(r => setTimeout(r, 50 + Math.random() * 200))

    let data = ALL_DATA as DeviceRow[]
    if (q.trim()) { const s = q.toLowerCase(); data = data.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(s))) }
    if (st)        data = data.filter(r => r.status === st)

    const total_ = data.length
    const totalPg = Math.max(1, Math.ceil(total_ / PAGE_SIZE))
    const safePg  = Math.min(p, totalPg)
    const pageRows = data.slice((safePg-1)*PAGE_SIZE, safePg*PAGE_SIZE)
    const ms = Date.now() - t0

    setRows(pageRows); setTotal(total_); setLatency(ms); setLoading(false)
    addLog(`← 200 OK · ${total_} total · ${pageRows.length} rows · ${ms}ms`)
  }

  function addLog(msg: string) {
    setLogs(prev => [...prev.slice(-9), `[${new Date().toLocaleTimeString()}] ${msg}`])
  }

  useEffect(() => { fetchData(page, search, status) }, [page])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      {/* controls */}
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'flex-end' }}>
        <div style={{ flex:1, minWidth:220 }}>
          <JInput placeholder="Search (triggers server call)..." value={search} onChange={setSearch} />
        </div>
        <JSelect value={status} onChange={setStatus}
          options={[{ value:'', label:'ALL STATUS' },{ value:'Active', label:'Active' },{ value:'Warning', label:'Warning' },{ value:'Error', label:'Error' }]} />
        <JButton color="cyan" size="sm" onClick={() => { setPage(1); fetchData(1, search, status) }}>⟳ FETCH</JButton>
        {loading && <JSpinner label="QUERYING..." />}
        <div style={{ display:'flex', gap:6, marginLeft:'auto' }}>
          <JBadge color="cyan">TOTAL: {total}</JBadge>
          <JBadge color="amber">PAGE {page}/{totalPages}</JBadge>
          <JBadge color="green">{latency}ms</JBadge>
        </div>
      </div>

      {/* server log */}
      <div style={{
        background:'var(--j-bg)', border:'1px solid var(--j-accent-12)',
        padding:'6px 12px', fontFamily:'monospace', fontSize:9,
        color:'var(--j-text-muted)', maxHeight:56, overflowY:'auto',
      }}>
        {logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>

      <HudTable rows={rows} sortCol={null} sortAsc={true} onSort={() => {}} emptyMsg="NO RESULTS — TRY A DIFFERENT QUERY" />

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
        <span style={{ fontSize:8, color:'var(--j-text-dim)', letterSpacing:'0.1em' }}>
          LATENCY: {latency}ms · SERVER PAGINATED
        </span>
        <JPagination page={page} totalPages={totalPages} onPageChange={p => setPage(p)} showFirstLast showInfo />
      </div>
    </div>
  )
}

// ─── JTABLE DIRECT TAB ────────────────────────────────────────────────────────

function TabDirect() {
  const simpleCols: JTableColumn[] = [
    { key: 'id',     label: 'ID',     width:'90px' },
    { key: 'device', label: 'DEVICE' },
    { key: 'type',   label: 'TYPE' },
    { key: 'status', label: 'STATUS' },
    { key: 'health', label: 'HEALTH' },
    { key: 'uptime', label: 'UPTIME' },
    { key: 'ping',   label: 'PING' },
  ]
  const rows = ALL_DATA.slice(0, 8).map(r => ({ ...r }))
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ fontSize:9, color:'var(--j-text-muted)', letterSpacing:'0.1em', lineHeight:2 }}>
        Using <span style={{ color:'var(--j-accent)' }}>JTable</span> directly. Pass{' '}
        <span style={{ color:'var(--j-accent)' }}>columns</span> + <span style={{ color:'var(--j-accent)' }}>rows</span> props.
        Set <span style={{ color:'var(--j-accent)' }}>stateColumn</span> for automatic row coloring by status.
      </div>
      <JTable columns={simpleCols} rows={rows} stateColumn="status" footerLabel="NH-90 · ITS DEVICE STATUS · 8 RECORDS" />

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
        {(['Active','Warning','Error'] as const).map(st => {
          const count = ALL_DATA.filter(r => r.status === st).length
          return (
            <div key={st} style={{
              background:'var(--j-bg-card)', border:`1px solid ${statusColor(st)}33`,
              padding:'10px 14px', fontFamily:"'Courier New',monospace",
              clipPath:'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
            }}>
              <JDataRow label={st.toUpperCase()} value={`${count} devices`}
                state={st === 'Active' ? 'active' : st === 'Warning' ? 'warning' : 'error'} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── main export ──────────────────────────────────────────────────────────────

export function PageDataTable() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
        <div style={{ fontSize:9, color:'var(--j-accent)', letterSpacing:'0.18em' }}>▶ TABLE + PAGINATION</div>
        <div style={{ flex:1, height:1, background:'var(--j-border)' }} />
        <JBadge color="cyan">100 NH-90 ITS Records</JBadge>
      </div>

      <JTabs>
        <JTab tabKey="client" label="CLIENT-SIDE" icon="◈"><TabClientSide /></JTab>
        <JTab tabKey="server" label="SERVER-SIDE" icon="◎"><TabServerSide /></JTab>
        <JTab tabKey="direct" label="JTABLE DIRECT" icon="▣"><TabDirect /></JTab>
      </JTabs>
    </div>
  )
}
