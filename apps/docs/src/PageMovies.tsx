import {
  JHudCanvas,
  JHudClock,
  JArcReactor,
  JArcMeter,
  JHeatmap,
  JActivityFeed,
  JKPITicker,
  JDataRow,
  JAlert,
  JWaveform,
  JNodeGraph,
} from '@masterdeepak15/jarvis-ui'
import type { JActivityFeedItem, JKPITickerItem, JHeatmapCell, NodeDef, EdgeDef } from '@masterdeepak15/jarvis-ui'

// ─── data ─────────────────────────────────────────────────────────────────────

const feedItems: JActivityFeedItem[] = [
  { id: '1', time: '14:03', level: 'active',  message: 'System boot complete — all cores nominal.',  source: 'CORE'     },
  { id: '2', time: '14:04', level: 'active',  message: 'Alpha Squad reached waypoint Bravo-7.',       source: 'FIELD'    },
  { id: '3', time: '14:05', level: 'warning', message: 'Signal degraded in eastern sector.',          source: 'COMMS'    },
  { id: '4', time: '14:06', level: 'error',   message: 'Charlie Unit fuel critical — 21%.',           source: 'UNIT-C'   },
  { id: '5', time: '14:07', level: 'active',  message: 'Delta Force confirmed objective Alpha-7.',    source: 'FIELD'    },
  { id: '6', time: '14:08', level: 'warning', message: 'Unauthorized scan on port 4400.',             source: 'SECURITY' },
  { id: '7', time: '14:09', level: 'active',  message: 'Satellite uplink re-established.',            source: 'SAT'      },
  { id: '8', time: '14:10', level: 'error',   message: 'Relay-3 failover triggered.',                 source: 'NET'      },
]

const kpiItems: JKPITickerItem[] = [
  { label: 'ALTITUDE',   value: '32,400 FT',  trend: 'up'   },
  { label: 'VELOCITY',   value: 'MACH 1.8',   trend: 'flat' },
  { label: 'HEADING',    value: '047° NE',     trend: 'flat' },
  { label: 'SHIELDS',    value: '87%',         delta: '+2',   trend: 'up'   },
  { label: 'FUEL',       value: '54%',         delta: '-8',   trend: 'down' },
  { label: 'HULL',       value: '96%',         trend: 'flat' },
  { label: 'CONTACTS',   value: '3 HOSTILE',  trend: 'up'   },
  { label: 'UPTIME',     value: '14:10:33',   trend: 'flat' },
  { label: 'TEMP',       value: '42°C',        delta: '+1',   trend: 'up'   },
  { label: 'COMMS',      value: '98% STRONG', trend: 'flat' },
  { label: 'SATELLITES', value: '4 LOCKED',   trend: 'flat' },
  { label: 'ETA BASE',   value: '00:47:12',   trend: 'down' },
]

// 8×8 sensor grid — heat map of signal density across sectors
const heatmapData: JHeatmapCell[][] = Array.from({ length: 8 }, (_, row) =>
  Array.from({ length: 8 }, (_, col) => {
    const v = Math.round(10 + Math.abs(Math.sin((row + col) * 0.7 + row * 0.3)) * 90)
    return { value: v }
  })
)

const nodes: NodeDef[] = [
  { id: 'hq',    label: 'HQ BASE',   x: 240, y: 130, type: 'hub'     },
  { id: 'sa',    label: 'ALPHA',     x: 60,  y: 40,  pulse: true      },
  { id: 'sb',    label: 'BRAVO',     x: 60,  y: 130, color: 'amber'   },
  { id: 'sc',    label: 'CHARLIE',   x: 60,  y: 220, color: 'red', pulse: true },
  { id: 'sat',   label: 'SATELLITE', x: 240, y: 20,  type: 'hex', color: 'green' },
  { id: 'relay', label: 'RELAY',     x: 420, y: 80,  type: 'diamond'  },
  { id: 'cmd',   label: 'COMMAND',   x: 420, y: 200, type: 'hex', color: 'green' },
]
const edges: EdgeDef[] = [
  { from: 'sa',  to: 'hq'                                         },
  { from: 'sb',  to: 'hq',    color: 'amber'                      },
  { from: 'sc',  to: 'hq',    color: 'red',   style: 'dashed'     },
  { from: 'sat', to: 'hq',    color: 'green', animDur: 1.2        },
  { from: 'hq',  to: 'relay'                                      },
  { from: 'relay',to:'cmd',   color: 'green', animDur: 1.8        },
]

// ─── page ─────────────────────────────────────────────────────────────────────

export function PageMovies() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#060e18', position: 'relative' }}>
      <JHudCanvas
        height="100vh"
        showGrid
        widgets={[

          // ── TOP-LEFT: identity & clock ──────────────────────────────────────
          {
            id: 'clock',
            x: 28, y: 24,
            width: 160,
            color: 'cyan',
            title: 'SYSTEM CLOCK',
            content: <JHudClock analog size={120} showDate />,
          },

          // ── LEFT COLUMN: system meters ──────────────────────────────────────
          {
            id: 'reactor',
            x: 28, y: 220,
            width: 160,
            color: 'cyan',
            title: 'ARC REACTOR',
            content: <JArcReactor level={87} size={110} label="POWER" />,
          },
          {
            id: 'meters',
            x: 28, y: 400,
            width: 208,
            color: 'cyan',
            title: 'SYSTEM VITALS',
            content: (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <JArcMeter level={87} label="SHIELDS" color="cyan" />
                <JArcMeter level={67} label="ENGINES" color="green" />
                <JArcMeter level={54} label="FUEL"    color="amber" />
                <JArcMeter level={96} label="HULL"    color="cyan" />
              </div>
            ),
          },

          // ── CENTER: primary instrument (tab-switch: heatmap ↔ node graph) ───
          {
            id: 'center-heatmap',
            x: 264, y: 24,
            width: 340,
            color: 'cyan',
            title: 'SECTOR DENSITY MATRIX',
            content: (
              <JHeatmap
                data={heatmapData}
                color="cyan"
                cellSize={34}
                gap={3}
                showValue={false}
                title=""
              />
            ),
          },
          {
            id: 'center-graph',
            x: 264, y: 320,
            width: 340,
            color: 'green',
            title: 'FIELD NETWORK MAP',
            content: (
              <JNodeGraph
                nodes={nodes}
                edges={edges}
                height="260px"
                showLegend={false}
              />
            ),
          },

          // ── TOP-RIGHT: alerts & comms ────────────────────────────────────────
          {
            id: 'alert',
            x: 636, y: 24,
            width: 288,
            color: 'amber',
            title: 'ACTIVE ALERT',
            content: (
              <JAlert state="warning">
                Signal degraded in eastern sector. Rerouting via Relay-3.
              </JAlert>
            ),
          },
          {
            id: 'waveform',
            x: 636, y: 130,
            width: 288,
            color: 'cyan',
            title: 'COMMS SIGNAL',
            content: <JWaveform barCount={20} />,
          },

          // ── RIGHT COLUMN: live activity feed ─────────────────────────────────
          {
            id: 'log',
            x: 636, y: 216,
            width: 288,
            color: 'cyan',
            title: 'ACTIVITY LOG',
            content: <JActivityFeed items={feedItems} maxRows={6} autoScroll showTime showSource />,
          },

          // ── RIGHT COLUMN LOWER: contact counts ──────────────────────────────
          {
            id: 'contacts',
            x: 636, y: 476,
            width: 288,
            color: 'green',
            title: 'CONTACT REPORT',
            content: (
              <>
                <JDataRow label="HOSTILE"  value="3"  state="error"   />
                <JDataRow label="NEUTRAL"  value="5"                  />
                <JDataRow label="FRIENDLY" value="12" state="success" />
                <JDataRow label="UNKNOWN"  value="2"  state="warning" />
              </>
            ),
          },
        ]}
      />

      {/* KPI ticker — full-width, fixed bottom, outside canvas */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50 }}>
        <JKPITicker items={kpiItems} color="cyan" height={32} pauseOnHover />
      </div>
    </div>
  )
}
