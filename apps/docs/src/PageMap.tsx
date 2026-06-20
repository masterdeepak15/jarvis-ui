import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { JBadge, JStatusPill, JDataRow, JDivider, JHudLabel } from '@masterdeepak15/jarvis-ui'

// ─── geo data ─────────────────────────────────────────────────────────────────

export interface UnitMarker {
  id: string
  callsign: string
  lat: number
  lng: number
  state: 'active' | 'warning' | 'error' | 'idle'
  sector: string
  signal: number
  fuel: number
  altitude?: string
  speed?: string
  mission: string
  color: string
}

export const FIELD_UNITS: UnitMarker[] = [
  { id: 'HQ',  callsign: 'FOXTROT BASE',  lat: 40.7128,   lng: -74.0060,  state: 'active',  sector: 'BASE',     signal: 100, fuel: 100, mission: 'Command & Control',      color: '#00e5ff',  altitude: 'N/A',       speed: '0 KPH'    },
  { id: 'A01', callsign: 'ALPHA-01',       lat: 51.5074,   lng: -0.1278,   state: 'active',  sector: 'NORTH-EU', signal: 98,  fuel: 87,  mission: 'Area Recon — Zone 7',    color: '#00e5ff',  altitude: '32,400 FT', speed: '850 KPH'  },
  { id: 'B02', callsign: 'BRAVO-02',       lat: 30.0444,   lng: 31.2357,   state: 'warning', sector: 'EAST-AF',  signal: 72,  fuel: 54,  mission: 'Signal Intercept',       color: '#f97316',  altitude: '18,200 FT', speed: '620 KPH'  },
  { id: 'C03', callsign: 'CHARLIE-03',     lat: 19.0760,   lng: 72.8777,   state: 'error',   sector: 'SOUTH-AS', signal: 34,  fuel: 21,  mission: 'Extraction — URGENT',    color: '#ef4444',  altitude: '4,800 FT',  speed: '240 KPH'  },
  { id: 'D04', callsign: 'DELTA-04',       lat: 37.5665,   lng: 126.9780,  state: 'active',  sector: 'EAST-AS',  signal: 99,  fuel: 91,  mission: 'Objective Alpha-7',      color: '#00e5ff',  altitude: '28,600 FT', speed: '920 KPH'  },
  { id: 'E05', callsign: 'ECHO-05',        lat: -33.8688,  lng: 151.2093,  state: 'idle',    sector: 'SOUTH-PA', signal: 88,  fuel: 76,  mission: 'Standby — Refueling',    color: '#8aaabb',  altitude: '0 FT',      speed: '0 KPH'    },
  { id: 'F06', callsign: 'FALCON-06',      lat: -1.2921,   lng: 36.8219,   state: 'active',  sector: 'EAST-AF',  signal: 91,  fuel: 68,  mission: 'Border Surveillance',    color: '#00e5ff',  altitude: '22,000 FT', speed: '780 KPH'  },
  { id: 'G07', callsign: 'GHOST-07',       lat: 55.7558,   lng: 37.6176,   state: 'warning', sector: 'NORTH-EU', signal: 61,  fuel: 44,  mission: 'Deep Cover — Silent',    color: '#f97316',  altitude: '6,200 FT',  speed: '310 KPH'  },
]

export const THREAT_ZONES = [
  { id: 'T1', lat: 33.6844,   lng: 73.0479,   radius: 800000, label: 'HOSTILE ZONE ALPHA',   color: '#ef4444', intensity: 'HIGH'     },
  { id: 'T2', lat: 15.5527,   lng: 32.5324,   radius: 600000, label: 'HOSTILE ZONE BRAVO',   color: '#f97316', intensity: 'MODERATE' },
  { id: 'T3', lat: 34.5553,   lng: 69.2075,   radius: 500000, label: 'RESTRICTED AIRSPACE',  color: '#f97316', intensity: 'MODERATE' },
  { id: 'T4', lat: 23.6850,   lng: 90.3563,   radius: 300000, label: 'CONTESTED ZONE',       color: '#f97316', intensity: 'LOW'      },
]

export const ROUTES = [
  { id: 'R1', points: [[40.7128, -74.0060], [51.5074, -0.1278]]         as [number, number][], label: 'HQ → ALPHA'   },
  { id: 'R2', points: [[40.7128, -74.0060], [30.0444, 31.2357]]         as [number, number][], label: 'HQ → BRAVO'   },
  { id: 'R3', points: [[40.7128, -74.0060], [37.5665, 126.9780]]        as [number, number][], label: 'HQ → DELTA'   },
  { id: 'R4', points: [[30.0444, 31.2357],  [-1.2921, 36.8219]]         as [number, number][], label: 'BRAVO → FALCON' },
  { id: 'R5', points: [[19.0760, 72.8777],  [15.5527, 32.5324]]         as [number, number][], label: 'CHARLIE → Evac' },
]

const STATE_COLORS: Record<string, string> = {
  active:  '#00e5ff',
  warning: '#f97316',
  error:   '#ef4444',
  idle:    '#8aaabb',
}

// ─── custom HUD marker ─────────────────────────────────────────────────────────

function makeHudIcon(unit: UnitMarker, selected: boolean) {
  const c = STATE_COLORS[unit.state] ?? '#00e5ff'
  const isHQ = unit.id === 'HQ'
  const size = isHQ ? 44 : 32
  const pulse = unit.state === 'active' || unit.state === 'error'

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <defs>
        <filter id="glow-${unit.id}">
          <feGaussianBlur stdDeviation="${selected ? 4 : 2}" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        ${pulse ? `
        <style>
          @keyframes pulse-ring-${unit.id} {
            0%   { stroke-opacity:0.9; r:${size/2 - 4}; }
            100% { stroke-opacity:0;   r:${size/2 + 6}; }
          }
          .ring-${unit.id} { animation: pulse-ring-${unit.id} 1.8s ease-out infinite; }
        </style>` : ''}
      </defs>
      ${pulse ? `<circle class="ring-${unit.id}" cx="${size/2}" cy="${size/2}" r="${size/2 - 4}" fill="none" stroke="${c}" stroke-width="1"/>` : ''}
      ${isHQ
        ? `<polygon points="${size/2},4 ${size-4},${size/2} ${size/2},${size-4} 4,${size/2}"
             fill="none" stroke="${c}" stroke-width="${selected ? 2.5 : 1.5}"
             filter="url(#glow-${unit.id})"
             opacity="${selected ? 1 : 0.85}"/>`
        : `<polygon points="${size/2},4 ${size-4},${size-4} 4,${size-4}"
             fill="${c}22" stroke="${c}" stroke-width="${selected ? 2.5 : 1.5}"
             filter="url(#glow-${unit.id})"
             opacity="${selected ? 1 : 0.85}"/>`
      }
      <text x="${size/2}" y="${size/2 + (isHQ ? 4 : 5)}" text-anchor="middle"
        font-family="Courier New,monospace" font-size="${isHQ ? 10 : 8}"
        fill="${c}" font-weight="bold">${unit.id === 'HQ' ? 'HQ' : unit.id.slice(0,1)}</text>
    </svg>`

  return L.divIcon({
    html: svg,
    className: 'j-leaflet-marker j-marker-drop',
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor:[0, -size / 2],
  })
}

// ─── map controller ────────────────────────────────────────────────────────────

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => { map.setView(center, zoom, { animate: true }) }, [center, zoom])
  return null
}

// ─── popup card ───────────────────────────────────────────────────────────────

function UnitPopup({ unit }: { unit: UnitMarker }) {
  return (
    <div style={{
      background: 'var(--j-bg-card)',
      border: `1px solid ${STATE_COLORS[unit.state]}55`,
      padding: '12px 14px',
      fontFamily: "'Courier New', monospace",
      minWidth: 220,
      boxShadow: `0 0 20px ${STATE_COLORS[unit.state]}33`,
      clipPath: 'polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ fontSize: 9, color: STATE_COLORS[unit.state], letterSpacing: '0.15em' }}>{unit.callsign}</div>
        <JStatusPill state={unit.state}>{unit.state.toUpperCase()}</JStatusPill>
      </div>
      <div style={{ marginBottom: 8, display: 'flex', gap: 6 }}>
        <JBadge color={unit.state === 'active' ? 'cyan' : unit.state === 'warning' ? 'amber' : unit.state === 'error' ? 'red' : 'white'}>{unit.sector}</JBadge>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <JDataRow label="MISSION"   value={unit.mission} />
        <JDataRow label="SIGNAL"    value={`${unit.signal}%`} state={unit.signal > 70 ? 'active' : unit.signal > 40 ? 'warning' : 'error'} />
        <JDataRow label="FUEL"      value={`${unit.fuel}%`}   state={unit.fuel   > 50 ? 'active' : unit.fuel   > 25 ? 'warning' : 'error'} />
        {unit.altitude && <JDataRow label="ALT"  value={unit.altitude} />}
        {unit.speed    && <JDataRow label="SPEED" value={unit.speed} />}
        <JDataRow label="COORDS" value={`${unit.lat.toFixed(4)}°, ${unit.lng.toFixed(4)}°`} />
      </div>
    </div>
  )
}

// ─── main map page ─────────────────────────────────────────────────────────────

export function PageMap() {
  const [selected, setSelected] = useState<string | null>(null)
  const [showThreat, setShowThreat] = useState(true)
  const [showRoutes, setShowRoutes] = useState(true)
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 10])
  const [mapZoom,   setMapZoom]   = useState(2)
  const [tileStyle, setTileStyle] = useState<'dark' | 'sat'>('dark')
  const [coords, setCoords] = useState('')

  const TILE_DARK = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  const TILE_SAT  = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

  function flyTo(unit: UnitMarker) {
    setSelected(unit.id)
    setMapCenter([unit.lat, unit.lng])
    setMapZoom(6)
  }

  const activeCount  = FIELD_UNITS.filter(u => u.state === 'active').length
  const warningCount = FIELD_UNITS.filter(u => u.state === 'warning').length
  const errorCount   = FIELD_UNITS.filter(u => u.state === 'error').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ─ header bar ─ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 9, color: 'var(--j-accent)', letterSpacing: '0.18em' }}>▶ GLOBAL TACTICAL MAP</div>
        <div style={{ flex: 1, height: 1, background: 'var(--j-border)' }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <JBadge color="cyan">{activeCount} ACTIVE</JBadge>
          <JBadge color="amber">{warningCount} WARNING</JBadge>
          <JBadge color="red"  >{errorCount} CRITICAL</JBadge>
        </div>
      </div>

      {/* ─ map + sidebar layout ─ */}
      <div style={{ display: 'flex', gap: 12, height: 520 }}>

        {/* map */}
        <div className="j-map-container" style={{ flex: 1, position: 'relative', minWidth: 0 }}>
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ width: '100%', height: '100%', background: '#020d18' }}
            zoomControl={false}
            attributionControl={false}
            whenReady={(e: any) => {
              e.target.on('mousemove', (ev: any) => {
                const { lat, lng } = ev.latlng
                setCoords(`${lat.toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? 'E' : 'W'}`)
              })
            }}
          >
            <MapController center={mapCenter} zoom={mapZoom} />

            <TileLayer
              key={tileStyle}
              url={tileStyle === 'dark' ? TILE_DARK : TILE_SAT}
              subdomains="abcd"
              maxZoom={19}
              opacity={tileStyle === 'dark' ? 0.75 : 0.5}
            />

            {/* threat zones */}
            {showThreat && THREAT_ZONES.map(zone => (
              <Circle
                key={zone.id}
                center={[zone.lat, zone.lng]}
                radius={zone.radius}
                pathOptions={{
                  color:       zone.color,
                  fillColor:   zone.color,
                  fillOpacity: 0.07,
                  weight:      1,
                  dashArray:   '6 4',
                  opacity:     0.6,
                }}
              >
                <Tooltip className="j-leaflet-tooltip" permanent={false} sticky>
                  {zone.label} — {zone.intensity}
                </Tooltip>
              </Circle>
            ))}

            {/* comm routes */}
            {showRoutes && ROUTES.map(r => (
              <Polyline
                key={r.id}
                positions={r.points}
                pathOptions={{
                  color:     '#00e5ff',
                  weight:    1,
                  dashArray: '4 8',
                  opacity:   0.35,
                }}
              >
                <Tooltip className="j-leaflet-tooltip">{r.label}</Tooltip>
              </Polyline>
            ))}

            {/* field unit markers */}
            {FIELD_UNITS.map(unit => (
              <Marker
                key={unit.id}
                position={[unit.lat, unit.lng]}
                icon={makeHudIcon(unit, selected === unit.id)}
                eventHandlers={{ click: () => setSelected(s => s === unit.id ? null : unit.id) }}
              >
                <Popup className="j-leaflet-popup" maxWidth={260} minWidth={220}>
                  <UnitPopup unit={unit} />
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* HUD controls — top right */}
          <div className="j-map-controls top-right">
            <button className={`j-map-btn ${tileStyle === 'dark' ? 'active' : ''}`} title="Dark Map"
              onClick={() => setTileStyle('dark')}>◧</button>
            <button className={`j-map-btn ${tileStyle === 'sat' ? 'active' : ''}`} title="Satellite"
              onClick={() => setTileStyle('sat')}>⊞</button>
            <button className={`j-map-btn ${showThreat ? 'active' : ''}`} title="Toggle Threat Zones"
              onClick={() => setShowThreat(p => !p)}>⊘</button>
            <button className={`j-map-btn ${showRoutes ? 'active' : ''}`} title="Toggle Routes"
              onClick={() => setShowRoutes(p => !p)}>◈</button>
            <button className="j-map-btn" title="Reset View"
              onClick={() => { setMapCenter([20, 10]); setMapZoom(2); setSelected(null) }}>⊕</button>
          </div>

          {/* legend — bottom left */}
          <div className="j-map-legend bottom-left">
            <div className="j-map-legend-title">UNIT STATUS</div>
            {(['active','warning','error','idle'] as const).map(s => (
              <div key={s} className="j-map-legend-item">
                <div className="j-map-legend-swatch" style={{ background: STATE_COLORS[s] }} />
                <span style={{ color: STATE_COLORS[s], fontSize: 8, letterSpacing: '0.1em' }}>{s.toUpperCase()}</span>
              </div>
            ))}
            <div style={{ marginTop: 6 }}>
              <div className="j-map-legend-title" style={{ marginBottom: 4 }}>OVERLAYS</div>
              <div className="j-map-legend-item">
                <div style={{ width: 16, height: 1, borderTop: '1px dashed #f97316', marginRight: 2 }} />
                <span style={{ fontSize: 8, color: '#f97316' }}>THREAT ZONE</span>
              </div>
              <div className="j-map-legend-item">
                <div style={{ width: 16, height: 1, borderTop: '1px dashed #00e5ff33', marginRight: 2 }} />
                <span style={{ fontSize: 8, color: 'var(--j-text-muted)' }}>COMM ROUTE</span>
              </div>
            </div>
          </div>

          {/* status bar — bottom */}
          <div className="j-map-status-bar" style={{ pointerEvents: 'none' }}>
            <span>SYS:ONLINE</span>
            <span>|</span>
            <span>SAT:LOCKED</span>
            <span>|</span>
            <span>{coords || '-- ----.----°, -- ----.----°'}</span>
            <span style={{ marginLeft: 'auto' }}>
              {FIELD_UNITS.length} UNITS TRACKED
            </span>
          </div>
        </div>

        {/* unit list sidebar */}
        <div style={{
          width: 210,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          overflowY: 'auto',
          paddingRight: 4,
        }}>
          <div style={{ fontSize: 8, color: 'var(--j-accent-70)', letterSpacing: '0.15em', marginBottom: 4 }}>
            UNIT ROSTER
          </div>
          {FIELD_UNITS.map(unit => (
            <button
              key={unit.id}
              onClick={() => flyTo(unit)}
              style={{
                background:  selected === unit.id ? `${STATE_COLORS[unit.state]}18` : 'var(--j-bg-card)',
                border:      `1px solid ${selected === unit.id ? STATE_COLORS[unit.state] + '88' : 'var(--j-border-dim)'}`,
                padding:     '8px 10px',
                cursor:      'pointer',
                textAlign:   'left',
                fontFamily:  "'Courier New', monospace",
                clipPath:    'polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)',
                transition:  'all .15s',
                boxShadow:   selected === unit.id ? `0 0 10px ${STATE_COLORS[unit.state]}22` : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <span style={{ fontSize: 9, color: STATE_COLORS[unit.state], letterSpacing: '0.1em' }}>{unit.callsign}</span>
                <span style={{ fontSize: 7, color: 'var(--j-text-muted)', letterSpacing: '0.06em' }}>{unit.id}</span>
              </div>
              <div style={{ fontSize: 8, color: 'var(--j-text-muted)', letterSpacing: '0.06em', marginBottom: 4 }}>
                {unit.sector}
              </div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <div style={{ flex: 1, height: 2, background: 'var(--j-bg-card-alt)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${unit.signal}%`, background: STATE_COLORS[unit.state], opacity: 0.7 }} />
                </div>
                <span style={{ fontSize: 7, color: 'var(--j-text-dim)', width: 24, textAlign: 'right' }}>{unit.signal}%</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ─ unit data grid below map ─ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {FIELD_UNITS.filter(u => u.id !== 'HQ').slice(0, 4).map(unit => (
          <div key={unit.id} onClick={() => flyTo(unit)} style={{
            background: 'var(--j-bg-card)',
            border: `1px solid ${selected === unit.id ? STATE_COLORS[unit.state] + '66' : 'var(--j-border-dim)'}`,
            padding: '10px 12px',
            cursor: 'pointer',
            fontFamily: "'Courier New', monospace",
            clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
            transition: 'all .15s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 9, color: STATE_COLORS[unit.state], letterSpacing: '0.1em' }}>{unit.callsign}</span>
              <JStatusPill state={unit.state}>{unit.state.toUpperCase()}</JStatusPill>
            </div>
            <div style={{ fontSize: 8, color: 'var(--j-text-muted)', marginBottom: 6 }}>{unit.mission}</div>
            <JDivider />
            <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <JDataRow label="SIG" value={`${unit.signal}%`} />
              <JDataRow label="FUEL" value={`${unit.fuel}%`} />
              {unit.altitude && <JDataRow label="ALT" value={unit.altitude} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
