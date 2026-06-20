# JARVIS UI

> HUD-style React component library — sci-fi / military aesthetic with dark themes, animated SVG, radial menus, draggable node graphs, and 50+ components.

[![npm](https://img.shields.io/npm/v/@masterdeepak15/jarvis-ui)](https://www.npmjs.com/package/@masterdeepak15/jarvis-ui)
[![license](https://img.shields.io/badge/license-MIT-green)](./packages/jarvis-ui/LICENSE)
[![demo](https://img.shields.io/badge/live%20demo-jarvis--ui--docs.vercel.app-00e5ff?style=flat&logo=vercel&logoColor=white)](https://jarvis-ui-docs.vercel.app/)

## Live Demo

**[https://jarvis-ui-docs.vercel.app/](https://jarvis-ui-docs.vercel.app/)**

The demo showcases every component with interactive examples:

| Page | What's inside |
|------|--------------|
| Dashboard | JStatCard, JBarChart, JLineChart, JDonutChart, JRadarChart, JArcMeter, JWaveform, JOrb |
| Tactical Map | Leaflet map with field units, threat zones, routes + Google Maps tab |
| India Map | Drill-down GeoJSON map — States → Districts → Taluks |
| Data Table | 100-row NH-90 ITS data — client-side sort/filter/paginate + server-side simulation |
| Forms | JInput, JTextArea, JSelect, JToggle, JSlider, JCheckbox, JRadio, JDatePicker, JTimePicker |
| Components | JAlert, JModal, JStatCard, JHudLabel, JHudBar, JAccordion, JRadialMenu, JSparkline, JGaugeChart |
| Field Units | JTable, JCommandPalette, JBootScreen |
| Network | JNodeGraph — 7 examples: tactical, org tree, microservices, pipeline, NH-90 ITS, alert tree, interactive |

---

## Installation

```bash
npm install @masterdeepak15/jarvis-ui
# or
pnpm add @masterdeepak15/jarvis-ui
```

```tsx
// main.tsx
import '@masterdeepak15/jarvis-ui/styles'
import { JThemeProvider } from '@masterdeepak15/jarvis-ui'

function App() {
  return <JThemeProvider>{/* your app */}</JThemeProvider>
}
```

See [`packages/jarvis-ui/README.md`](./packages/jarvis-ui/README.md) for the full component reference and API docs.

---

## Repo Structure

```
jarvis-ui/
├── packages/jarvis-ui/   ← React component library (published to npm)
└── apps/docs/            ← Live demo app (deployed to Vercel)
```

---

## License

MIT © [Deepak Chougale](https://github.com/masterdeepak15)
