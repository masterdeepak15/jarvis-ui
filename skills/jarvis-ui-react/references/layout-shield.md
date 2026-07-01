# SHIELD HUD Page — PageShield

> See [layout-movies.md](layout-movies.md) first — this page follows the widget-first mental model exactly.

`PageShield` is the canonical example of a Movies-mode dashboard. Use it as a reference when building any HUD page.

---

## What It Shows

A full-screen SHIELD OS HUD with radar, arc meters, activity feed, KPI ticker, and hex cells — all floating on `JHudCanvas`.

---

## Local Widgets (PageShield-specific)

These are defined locally inside PageShield, not exported from the library. Replicate or adapt them in your own HUD pages.

### `RadarWidget`

An animated canvas radar with rotating sweep line, random blip generation, and ring overlays.

```tsx
// canvas-based, self-animating
function RadarWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    let raf: number
    const blips: Blip[] = []

    function draw() {
      // clears canvas, draws rings, draws blips, draws sweep line
      // reads live theme colors via getComputedStyle — never hardcoded hex
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--j-accent').trim()
      // ... draw loop
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={canvasRef} width={240} height={240} />
}
```

**Key rule:** always read colors via `getComputedStyle(document.documentElement).getPropertyValue('--j-accent')` each frame — not hardcoded `#00e5ff`. This makes the radar respond to theme switching.

### `RotatingRingSVG`

SVG ring with a rotating arc pointer.

```tsx
function RotatingRingSVG({ speed = 2 }: { speed?: number }) {
  // uses CSS animation: rotate {speed}s linear infinite
  return (
    <svg viewBox="0 0 100 100" width={80} height={80}>
      <circle cx="50" cy="50" r="44" fill="none"
        stroke="var(--j-accent)" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="50" y1="6" x2="50" y2="20"
        stroke="var(--j-accent)" strokeWidth="2"
        style={{ transformOrigin: '50px 50px',
                 animation: `spin ${speed}s linear infinite` }} />
    </svg>
  )
}
```

### `TargetLock`

A hexagonal SVG target reticle with optional pulsing animation.

```tsx
function TargetLock({ active = false }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 72 72" width={72} height={72}
         className={active ? 'target-lock--active' : undefined}>
      {/* hexagon path + crosshairs */}
      <path d="M36 4 L62 20 L62 52 L36 68 L10 52 L10 20 Z"
        fill="none" stroke="var(--j-accent)" strokeWidth="1.5" />
      <line x1="36" y1="8"  x2="36" y2="18" stroke="var(--j-accent)" strokeWidth="1" />
      <line x1="36" y1="54" x2="36" y2="64" stroke="var(--j-accent)" strokeWidth="1" />
      <line x1="8"  y1="36" x2="18" y2="36" stroke="var(--j-accent)" strokeWidth="1" />
      <line x1="54" y1="36" x2="64" y2="36" stroke="var(--j-accent)" strokeWidth="1" />
    </svg>
  )
}
```

### `HexCell`

Small hexagonal data cell for the bottom strip — value + label + state color.

```tsx
function HexCell({ value, label, state = 'ok' }:
  { value: string; label: string; state?: 'ok' | 'warn' | 'err' }) {
  const color = state === 'err'  ? 'var(--j-err)'
              : state === 'warn' ? 'var(--j-warn)'
              : 'var(--j-ok)'
  return (
    <div style={{ textAlign: 'center', color }}>
      <svg viewBox="0 0 60 52" width={60} height={52}>
        <path d="M30 2 L56 16 L56 36 L30 50 L4 36 L4 16 Z"
          fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
      <div style={{ fontSize: 18, fontWeight: 700, marginTop: -8 }}>{value}</div>
      <div style={{ fontSize: 9, letterSpacing: '0.15em', opacity: 0.7 }}>{label}</div>
    </div>
  )
}
```

---

## PageShield Layout

Uses all 7 zones from `layout-movies.md`. Key widget positions:

| Widget ID | x | y | w | Zone |
|---|---|---|---|---|
| clock | 32 | 28 | 160 | Top-left |
| power | 32 | 220 | 160 | Left col |
| meters | 32 | 400 | 200 | Left col |
| radar | 260 | 28 | 340 | Center |
| ring | 310 | 60 | 240 | Center (overlay) |
| alerts | 640 | 28 | 280 | Top-right |
| log | 640 | 120 | 280 | Right col |
| contacts | 640 | 380 | 280 | Right col |
| targets | 260–520 | 420 | 90ea | Bottom strip |
| ticker | fixed | bottom:0 | 100% | Bottom bar |
