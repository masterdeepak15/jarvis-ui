import { useState, useEffect, useCallback, useRef } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { JBadge, JButton, JDataRow, JSpinner } from '@masterdeepak15/jarvis-ui'

// ─── types ────────────────────────────────────────────────────────────────────

interface GeoProps {
  ID_1?: number; ID_2?: number; ID_3?: number
  NAME_1?: string; NAME_2?: string; NAME_3?: string
  TYPE_1?: string; TYPE_2?: string; TYPE_3?: string
}

type DrillLevel = 'states' | 'districts' | 'taluks'

interface Breadcrumb {
  level: DrillLevel
  stateId?: number; stateName?: string
  districtId?: number; districtName?: string
}

// ─── accent shades for choropleth ─────────────────────────────────────────────

const ACCENT = '#00e5ff'
const SHADE_COUNT = 6
function featureShade(i: number, total: number): string {
  const t = total > 1 ? i / (total - 1) : 0.5
  const alpha = 0.06 + t * 0.28
  return `rgba(0,229,255,${alpha.toFixed(2)})`
}

// ─── map fit helper ────────────────────────────────────────────────────────────

function FitBounds({ data }: { data: any }) {
  const map = useMap()
  useEffect(() => {
    if (!data) return
    try {
      const layer = L.geoJSON(data)
      const bounds = layer.getBounds()
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [24, 24], maxZoom: 10 })
    } catch {}
  }, [data, map])
  return null
}

// ─── main component ───────────────────────────────────────────────────────────

export function PageIndiaMap() {
  const [geoData,   setGeoData]   = useState<any>(null)
  const [loading,   setLoading]   = useState(true)
  const [crumb,     setCrumb]     = useState<Breadcrumb>({ level: 'states' })
  const [hovered,   setHovered]   = useState<GeoProps | null>(null)
  const [selected,  setSelected]  = useState<GeoProps | null>(null)
  const [stats,     setStats]     = useState({ total: 0, label: 'States' })
  const geoRef = useRef<L.GeoJSON | null>(null)

  // ─── fetch helper ───────────────────────────────────────────────────────────

  async function load(url: string) {
    setLoading(true)
    setGeoData(null)
    setSelected(null)
    try {
      const res  = await fetch(url)
      const json = await res.json()
      setGeoData(json)
      setStats({ total: json.features?.length ?? 0, label: url.includes('taluks') ? 'Taluks' : url.includes('districts') ? 'Districts' : 'States' })
    } catch (e) {
      console.error('GeoJSON fetch failed', e)
    } finally {
      setLoading(false)
    }
  }

  // initial load
  useEffect(() => { load('/geojson/india-states.geojson') }, [])

  // ─── drill down ─────────────────────────────────────────────────────────────

  function drillState(props: GeoProps) {
    if (!props.ID_1) return
    setCrumb({ level: 'districts', stateId: props.ID_1, stateName: props.NAME_1 })
    setHovered(null)
    load(`/geojson/districts/${props.ID_1}.geojson`)
  }

  function drillDistrict(props: GeoProps) {
    if (!props.ID_1 || !props.ID_2) return
    setCrumb({ level: 'taluks', stateId: props.ID_1, stateName: props.NAME_1, districtId: props.ID_2, districtName: props.NAME_2 })
    setHovered(null)
    load(`/geojson/taluks/${props.ID_1}_${props.ID_2}.geojson`)
  }

  function drillUp(to: DrillLevel) {
    setHovered(null)
    if (to === 'states') {
      setCrumb({ level: 'states' })
      load('/geojson/india-states.geojson')
    } else if (to === 'districts' && crumb.stateId) {
      setCrumb({ level: 'districts', stateId: crumb.stateId, stateName: crumb.stateName })
      load(`/geojson/districts/${crumb.stateId}.geojson`)
    }
  }

  // ─── GeoJSON layer style ────────────────────────────────────────────────────

  const featureCount = geoData?.features?.length ?? 1

  const styleFeature = useCallback((feature: any, idx: number) => ({
    fillColor:   featureShade(idx, featureCount),
    fillOpacity: 1,
    color:       ACCENT,
    weight:      crumb.level === 'states' ? 1 : 0.6,
    opacity:     0.5,
  }), [featureCount, crumb.level])

  const onEachFeature = useCallback((feature: any, layer: L.Layer) => {
    const props: GeoProps = feature.properties ?? {}
    const idx = geoData?.features?.indexOf(feature) ?? 0

    const normal  = { fillColor: featureShade(idx, featureCount), fillOpacity: 1, color: ACCENT, weight: crumb.level==='states'?1:0.6, opacity:0.5 }
    const hover   = { fillColor: `rgba(0,229,255,0.45)`, color: ACCENT, weight: 2, opacity:0.9 }
    const sel     = { fillColor: `rgba(0,229,255,0.60)`, color: ACCENT, weight: 2.5, opacity:1 }

    ;(layer as L.Path).setStyle(normal)

    layer.on({
      mouseover: () => { setHovered(props); (layer as L.Path).setStyle(hover); (layer as L.Path).bringToFront() },
      mouseout:  () => { setHovered(null); (layer as L.Path).setStyle(normal) },
      click:     () => {
        setSelected(props)
        ;(layer as L.Path).setStyle(sel)
        if      (crumb.level === 'states')    drillState(props)
        else if (crumb.level === 'districts') drillDistrict(props)
      },
    })
  }, [geoData, featureCount, crumb.level])

  // ─── derived label ──────────────────────────────────────────────────────────

  const hoveredName = hovered
    ? (hovered.NAME_3 ?? hovered.NAME_2 ?? hovered.NAME_1 ?? '')
    : ''
  const clickHint = crumb.level === 'states' ? 'Click a state to view districts'
    : crumb.level === 'districts' ? 'Click a district to view taluks'
    : 'Taluk level — deepest zoom'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* ─ header ─ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 9, color: 'var(--j-accent)', letterSpacing: '0.18em' }}>▶ INDIA — ADMINISTRATIVE DRILL-DOWN</div>
        <div style={{ flex: 1, height: 1, background: 'var(--j-border)' }} />
        <JBadge color="cyan">{stats.total} {stats.label}</JBadge>
      </div>

      {/* ─ breadcrumb ─ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Courier New',monospace", fontSize: 9 }}>
        <button
          onClick={() => drillUp('states')}
          style={{ background: 'none', border: 'none', color: crumb.level==='states'?'var(--j-accent)':'var(--j-text-muted)', cursor:'pointer', fontFamily:"inherit", fontSize:'inherit', letterSpacing:'0.1em', padding:0, textDecoration: crumb.level!=='states'?'underline':undefined }}
        >
          🇮🇳 INDIA
        </button>
        {crumb.stateName && (
          <>
            <span style={{ color:'var(--j-border-mid)' }}>›</span>
            <button
              onClick={() => crumb.level==='taluks' ? drillUp('districts') : undefined}
              style={{ background:'none', border:'none', color: crumb.level==='districts'?'var(--j-accent)':'var(--j-text-muted)', cursor: crumb.level==='taluks'?'pointer':'default', fontFamily:'inherit', fontSize:'inherit', letterSpacing:'0.1em', padding:0, textDecoration: crumb.level==='taluks'?'underline':undefined }}
            >
              {crumb.stateName}
            </button>
          </>
        )}
        {crumb.districtName && (
          <>
            <span style={{ color:'var(--j-border-mid)' }}>›</span>
            <span style={{ color:'var(--j-accent)' }}>{crumb.districtName}</span>
          </>
        )}
        <div style={{ flex:1 }} />
        <span style={{ color:'var(--j-text-dim)', letterSpacing:'0.08em' }}>{clickHint}</span>
        {crumb.level !== 'states' && (
          <JButton size="sm" color="ghost" onClick={() => drillUp(crumb.level==='taluks'?'districts':'states')}>
            ← BACK
          </JButton>
        )}
      </div>

      {/* ─ map + info panel ─ */}
      <div style={{ display: 'flex', gap: 12, height: 500 }}>

        {/* map */}
        <div className="j-map-container" style={{ flex: 1, minWidth: 0, position: 'relative' }}>
          <MapContainer
            center={[22.5, 82.5]}
            zoom={4}
            style={{ width: '100%', height: '100%', background: '#020d18' }}
            zoomControl={true}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
              maxZoom={18}
              opacity={0.4}
            />

            {geoData && !loading && (
              <GeoJSON
                key={`${crumb.level}-${crumb.stateId}-${crumb.districtId}`}
                data={geoData}
                style={(_f, _l) => ({ fillColor: 'rgba(0,229,255,0.05)', fillOpacity:1, color:ACCENT, weight:1, opacity:0.5 })}
                onEachFeature={onEachFeature}
              />
            )}

            {geoData && <FitBounds data={geoData} />}
          </MapContainer>

          {/* loading overlay */}
          {loading && (
            <div style={{ position:'absolute', inset:0, background:'rgba(2,13,24,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
              <JSpinner label="LOADING GEO DATA..." />
            </div>
          )}

          {/* hover tooltip */}
          {hovered && (
            <div style={{
              position:'absolute', top:10, left:'50%', transform:'translateX(-50%)',
              background:'var(--j-bg-card)', border:'1px solid var(--j-accent-35)',
              padding:'4px 12px', fontFamily:"'Courier New',monospace", fontSize:10,
              color:'var(--j-accent)', letterSpacing:'0.12em', pointerEvents:'none',
              zIndex:1000, whiteSpace:'nowrap',
              clipPath:'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
            }}>
              {hoveredName}
            </div>
          )}

          {/* corner brackets */}
          <div style={{ position:'absolute', top:0, left:0, width:16, height:16, borderTop:'1px solid var(--j-accent)', borderLeft:'1px solid var(--j-accent)', pointerEvents:'none', zIndex:500 }} />
          <div style={{ position:'absolute', bottom:0, right:0, width:16, height:16, borderBottom:'1px solid var(--j-accent)', borderRight:'1px solid var(--j-accent)', pointerEvents:'none', zIndex:500 }} />

          {/* status bar */}
          <div className="j-map-status-bar" style={{ pointerEvents:'none' }}>
            <span>LEVEL: {crumb.level.toUpperCase()}</span>
            <span>|</span>
            <span>FEATURES: {stats.total}</span>
            {crumb.stateName && <><span>|</span><span>STATE: {crumb.stateName.toUpperCase()}</span></>}
            {crumb.districtName && <><span>|</span><span>DIST: {crumb.districtName.toUpperCase()}</span></>}
          </div>
        </div>

        {/* info panel */}
        <div style={{ width: 200, display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ fontSize:8, color:'var(--j-accent-70)', letterSpacing:'0.15em' }}>DRILL-DOWN</div>

          {/* level indicators */}
          {(['states','districts','taluks'] as DrillLevel[]).map((lvl, i) => (
            <div key={lvl} style={{
              padding:'8px 10px',
              background: crumb.level===lvl ? 'var(--j-accent-12)' : 'var(--j-bg-card)',
              border:`1px solid ${crumb.level===lvl?'var(--j-accent-35)':'var(--j-border-dim)'}`,
              fontFamily:"'Courier New',monospace",
              clipPath:'polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)',
              opacity: i > (['states','districts','taluks'].indexOf(crumb.level)) ? 0.4 : 1,
            }}>
              <div style={{ fontSize:7, color:crumb.level===lvl?'var(--j-accent)':'var(--j-text-dim)', letterSpacing:'0.12em' }}>
                LEVEL {i+1}
              </div>
              <div style={{ fontSize:9, color:'var(--j-text-secondary)', marginTop:2, letterSpacing:'0.08em' }}>
                {lvl.toUpperCase()}
              </div>
            </div>
          ))}

          <div style={{ height:1, background:'var(--j-border-dim)', margin:'4px 0' }} />

          {/* selected info */}
          {selected ? (
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              <div style={{ fontSize:8, color:'var(--j-accent-70)', letterSpacing:'0.12em', marginBottom:4 }}>SELECTED</div>
              {selected.NAME_1 && <JDataRow label="STATE"    value={selected.NAME_1} />}
              {selected.NAME_2 && <JDataRow label="DISTRICT" value={selected.NAME_2} />}
              {selected.NAME_3 && <JDataRow label="TALUK"    value={selected.NAME_3} />}
              {selected.TYPE_1 && <JDataRow label="TYPE"     value={selected.TYPE_1} />}
              {selected.TYPE_2 && <JDataRow label="TYPE"     value={selected.TYPE_2} />}
              {selected.TYPE_3 && <JDataRow label="TYPE"     value={selected.TYPE_3} />}
              {selected.ID_1   && <JDataRow label="STATE ID" value={String(selected.ID_1)} />}
              {selected.ID_2   && <JDataRow label="DIST  ID" value={String(selected.ID_2)} />}
              {selected.ID_3   && <JDataRow label="TALUK ID" value={String(selected.ID_3)} />}
            </div>
          ) : (
            <div style={{ fontSize:9, color:'var(--j-text-dim)', letterSpacing:'0.08em', lineHeight:2 }}>
              Click any region<br/>to see details
            </div>
          )}

          {/* choropleth legend */}
          <div style={{ marginTop:'auto' }}>
            <div style={{ fontSize:8, color:'var(--j-accent-70)', letterSpacing:'0.12em', marginBottom:6 }}>DENSITY SCALE</div>
            <div style={{ display:'flex', gap:2 }}>
              {Array.from({ length: SHADE_COUNT }, (_, i) => (
                <div key={i} style={{ flex:1, height:10, background:`rgba(0,229,255,${(0.06 + i*0.05).toFixed(2)})`, border:'1px solid rgba(0,229,255,0.2)' }} />
              ))}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:7, color:'var(--j-text-dim)', marginTop:3 }}>
              <span>LOW</span><span>HIGH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
