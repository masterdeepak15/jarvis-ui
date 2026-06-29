# JActivityFeed

A scrolling live event log — timestamped, level-tagged messages with source labels. Auto-scrolls to bottom on new items. Pauses on hover. Designed as a **right-column comms/log instrument** in Movies-mode layouts.

## Import

```tsx
import { JActivityFeed } from '@masterdeepak15/jarvis-ui'
import type { JActivityFeedItem } from '@masterdeepak15/jarvis-ui'
```

---

## Types

```tsx
interface JActivityFeedItem {
  id: string
  time?: string                                              // e.g. '14:02'
  level?: 'active' | 'warning' | 'error' | 'success' | 'info'
  message: string
  source?: string                                            // e.g. 'RADAR', 'ENG'
}
```

**Level → icon + color:**

| Level | Icon | Color |
|---|---|---|
| `active` | ● | `var(--j-cyan)` |
| `warning` | ▲ | `var(--j-amber)` |
| `error` | ✕ | `var(--j-red)` |
| `success` | ✓ | `var(--j-green)` |
| `info` | ○ | `var(--j-text-muted)` |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `JActivityFeedItem[]` | — | Log entries — oldest first, newest last |
| `maxRows` | `number` | `8` | Max visible rows before scroll |
| `rowHeight` | `number` | `28` | Row height in px |
| `autoScroll` | `boolean` | `true` | Auto-scroll to bottom on new items |
| `showTime` | `boolean` | `true` | Show timestamp column |
| `showSource` | `boolean` | `true` | Show source tag on right |
| `className` | `string` | — | Extra CSS class |
| `style` | `CSSProperties` | — | Extra styles |

---

## Examples

### Basic event log

```tsx
const events: JActivityFeedItem[] = [
  { id: '1', time: '14:02', level: 'warning', message: 'Sector 7 breach detected',  source: 'RADAR' },
  { id: '2', time: '14:01', level: 'success', message: 'Agent check-in confirmed',  source: 'COMMS' },
  { id: '3', time: '13:59', level: 'error',   message: 'Engine 2 temperature spike', source: 'ENG'  },
  { id: '4', time: '13:58', level: 'active',  message: 'Target lock acquired',        source: 'TGT'  },
  { id: '5', time: '13:57', level: 'info',    message: 'Stealth field recalibrating', source: 'SYS'  },
]

<JActivityFeed items={events} maxRows={6} autoScroll />
```

### Live real-time feed

```tsx
const [log, setLog] = useState<JActivityFeedItem[]>([])

useEffect(() => {
  const t = setInterval(() => {
    setLog(prev => [...prev, {
      id: Date.now().toString(),
      time: new Date().toTimeString().slice(0, 5),
      level: 'active',
      message: `Ping received from node-${Math.floor(Math.random() * 99)}`,
      source: 'NET',
    }])
  }, 1500)
  return () => clearInterval(t)
}, [])

<JActivityFeed items={log} maxRows={8} autoScroll />
```

### Compact — no timestamp, no source

```tsx
<JActivityFeed
  items={alerts}
  maxRows={5}
  showTime={false}
  showSource={false}
  rowHeight={24}
/>
```

### Inside JHudCanvas — right column

```tsx
{
  id: 'log',
  x: 650, y: 28,
  width: 280,
  color: 'amber',
  title: 'ACTIVITY LOG',
  content: <JActivityFeed items={log} maxRows={8} autoScroll />,
}
```

### CI/CD build log

```tsx
const ciLog: JActivityFeedItem[] = builds.map(b => ({
  id: b.id,
  time: b.startedAt,
  level: b.status === 'success' ? 'success' : b.status === 'failed' ? 'error' : 'active',
  message: `${b.repo}#${b.branch} — ${b.commit.slice(0, 7)}`,
  source: b.runner,
}))

<JActivityFeed items={ciLog} maxRows={10} autoScroll />
```

---

## Notes

- Items are ordered oldest → newest. `autoScroll` fires on every `items` change and scrolls to `scrollHeight`.
- Hovering pauses auto-scroll. A `⏸ HOVER PAUSED` label appears bottom-right.
- Scrollbar uses `scrollbar-width: thin` with transparent track for HUD aesthetics.
- Visible height = `maxRows × rowHeight` px — control the widget footprint with both props.
- Long messages truncate with `text-overflow: ellipsis`. Source labels cap at 64px.
