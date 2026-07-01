import { useState } from 'react'

export interface JProcess {
  pid:    number
  name:   string
  cpu:    number
  memory: number
  status: 'running' | 'suspended' | 'stopped'
}

export interface JTaskManagerProps {
  processes: JProcess[]
  onKill?:   (pid: number) => void
}

type SortKey = 'name' | 'pid' | 'cpu' | 'memory' | 'status'

function barColorClass(value: number): string {
  if (value >= 80) return 'j-os-tm-bar__fill--danger'
  if (value >= 50) return 'j-os-tm-bar__fill--warn'
  return ''
}

function ResourceBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="j-os-tm-bar">
      <div className="j-os-tm-bar__track">
        <div className={`j-os-tm-bar__fill ${barColorClass(value)}`} style={{ width: `${Math.min(100, value)}%` }} />
      </div>
      <span className="j-os-tm-bar__label">{label}</span>
    </div>
  )
}

function StatusBadge({ status }: { status: JProcess['status'] }) {
  return (
    <span className={`j-os-tm-status j-os-tm-status--${status}`}>
      <span className="j-os-tm-status__dot" />
      {status}
    </span>
  )
}

export function JTaskManager({ processes, onKill }: JTaskManagerProps) {
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortAsc, setSortAsc] = useState(true)

  function handleSort(key: SortKey) {
    if (sortKey === key) { setSortAsc(p => !p) }
    else { setSortKey(key); setSortAsc(true) }
  }

  const sorted = [...processes].sort((a, b) => {
    let va: string | number = a[sortKey]
    let vb: string | number = b[sortKey]
    if (typeof va === 'string') va = va.toLowerCase()
    if (typeof vb === 'string') vb = vb.toLowerCase()
    if (va < vb) return sortAsc ? -1 : 1
    if (va > vb) return sortAsc ? 1 : -1
    return 0
  })

  function SortTh({ col, label }: { col: SortKey; label: string }) {
    const arrow = sortKey === col ? (sortAsc ? '↑' : '↓') : ''
    return (
      <th onClick={() => handleSort(col)}>
        <span>{label}</span>
        {arrow && <span aria-hidden="true"> {arrow}</span>}
      </th>
    )
  }

  return (
    <div className="j-os-taskmanager">
      <div style={{ flex: 1, overflow: 'auto' }}>
        <table className="j-os-taskmanager__table">
          <thead>
            <tr>
              <SortTh col="name"   label="Name"   />
              <SortTh col="pid"    label="PID"    />
              <SortTh col="cpu"    label="CPU"    />
              <SortTh col="memory" label="Memory" />
              <SortTh col="status" label="Status" />
              {onKill && <th></th>}
            </tr>
          </thead>
          <tbody>
            {sorted.map(p => (
              <tr key={p.pid}>
                <td>{p.name}</td>
                <td>{p.pid}</td>
                <td><ResourceBar value={p.cpu} label={`${p.cpu}%`} /></td>
                <td><ResourceBar value={(p.memory / 2048) * 100} label={`${p.memory} MB`} /></td>
                <td><StatusBadge status={p.status} /></td>
                {onKill && (
                  <td>
                    <button className="j-os-tm-kill" onClick={() => onKill(p.pid)}>Kill</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
