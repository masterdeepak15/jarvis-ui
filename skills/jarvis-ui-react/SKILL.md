---
name: jarvis-ui-react
description: Use this skill whenever working with @masterdeepak15/jarvis-ui — the HUD-style React component library. Trigger on any mention of JButton, JInput, JModal, JNodeGraph, JTable, JPagination, JAlert, JFormField, JThemeProvider, JHudBar, JRadialMenu, JCommandPalette, JBootScreen, JSparkline, JGaugeChart, PageShield, JDragWidget, JHudClock, JArcReactor, JHeatmap, JActivityFeed, JKPITicker, JHudCanvas, JDesktop, JWindow, JWindowManager, JTaskbar, JStartMenu, JDock, JMenuBar, JOSNotification, JFileExplorer, JTaskManager, JControlPanel, JOSThemeProvider, or any other J-prefixed component. Also trigger when user says "jarvis ui react", "jarvis theme", "HUD component", "tactical UI", "sci-fi UI", "shield HUD", "movies layout", "rainmeter", "widget canvas", "floating widget", "OS shell", "desktop UI", "draggable window", "file explorer", "task manager", "control panel", or wants to add/fix/use any component from the React library @masterdeepak15/jarvis-ui.
---

# JARVIS UI — Component Skill

HUD-style React component library with 60+ components. Sci-fi / military aesthetic with dark themes, clip-path polygons, animated SVG, and CSS custom properties. Includes a full **OS Shell Kit** — Windows 11 / macOS themed desktop UI with draggable windows, taskbar, dock, and pre-built app shells.

**Live Demo:** https://jarvis-ui-docs.vercel.app/
**npm:** `@masterdeepak15/jarvis-ui`

---

## Layout Style — Ask First!

When a **first-time user** sets up a new page or dashboard, **always ask** which layout style they prefer:

```
"Which layout style do you want?"

  A) TYPICAL     — Sidebar navigation, data tables, stat cards. Clean, information-dense.
  B) MOVIES/HUD  — SHIELD OS / Iron Man cinematic HUD. Floating widgets on a dark canvas.
  C) WINDOWS 11  — Full desktop OS shell with taskbar, draggable windows.
  D) macOS       — Full desktop OS shell with dock, menu bar, draggable windows.
```

## Layout Guides

Read the guide for the chosen style before writing any code:

| Style | Guide | Key Root Component |
|---|---|---|
| **Typical** | [references/layout-typical.md](references/layout-typical.md) | `JPageLayout` + `JSidebar` |
| **Movies / HUD** | [references/layout-movies.md](references/layout-movies.md) | `JHudCanvas` — widgets float at `(x, y)` |
| **SHIELD page example** | [references/layout-shield.md](references/layout-shield.md) | `PageShield` local widgets: RadarWidget, HexCell, TargetLock |
| **Windows 11 OS Shell** | [references/layout-windows.md](references/layout-windows.md) | `JDesktop theme="windows11"` |
| **macOS OS Shell** | [references/layout-macos.md](references/layout-macos.md) | `JDesktop theme="macos"` |

---

## Installation

```bash
npm install @masterdeepak15/jarvis-ui
# or
pnpm add @masterdeepak15/jarvis-ui
```

---

## Setup (Required — do this first)

### 1. Import stylesheet (once, at app root)

```tsx
// main.tsx or index.tsx
import '@masterdeepak15/jarvis-ui/styles'
```

### 2. Wrap with JThemeProvider

```tsx
import { JThemeProvider } from '@masterdeepak15/jarvis-ui'

function App() {
  return (
    <JThemeProvider preset="cyan">
      {/* your app */}
    </JThemeProvider>
  )
}
```

**Presets:** `'cyan'` | `'amber'` | `'green'` | `'red'` | `'purple'` | `'white'`

---

## CRITICAL Design Rules

These rules apply to EVERY component and every line of custom styling:

1. **Colors via CSS variables only** — never hardcode hex values
   ```tsx
   // ✅ correct
   style={{ color: 'var(--j-accent)', background: 'var(--j-bg-card)' }}
   // ❌ wrong
   style={{ color: '#00e5ff', background: '#0a1520' }}
   ```

2. **No border-radius** — use `clip-path` polygons for HUD corners
   ```tsx
   // ✅ correct
   style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
   // ❌ wrong
   style={{ borderRadius: '4px' }}
   ```

3. **Font: Courier New monospace everywhere**
   ```tsx
   style={{ fontFamily: "'Courier New', monospace" }}
   ```

4. **JColor type** (for `color` prop on most components):
   `'cyan'` | `'blue'` | `'amber'` | `'red'` | `'green'` | `'ghost'` | `'white'`

5. **JState type** (for `state` prop on display components):
   `'active'` | `'warning'` | `'error'` | `'success'`

6. **Semantic color tokens for status** — use `var(--j-warn)`, `var(--j-err)`, `var(--j-ok)`, not hardcoded hex like `#febc2e`, `#ff5f57`, `#28c840`.

---

## Component Index

Read the reference file for the component you need. Each file has props, use cases, and working code examples.

### Theme & Layout
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JThemeProvider` | [references/JThemeProvider.md](references/JThemeProvider.md) | Root context — wrap the entire app |
| `JPageLayout` | [references/JPageLayout.md](references/JPageLayout.md) | Full-page layout with sidebar + HUD bars (**Typical mode only**) |
| `JHudBar` | [references/JHudBar.md](references/JHudBar.md) | Top/bottom HUD bar with waveform and ticks |
| `JSidebar` | [references/JSidebar.md](references/JSidebar.md) | Left navigation sidebar (**Typical mode only**) |
| `JNavItem` | [references/JNavItem.md](references/JNavItem.md) | Sidebar navigation item |
| `JHudFrame` | [references/JHudFrame.md](references/JHudFrame.md) | Corner-bracket HUD frame container |
| `JHudFrameCard` | [references/JHudFrame.md](references/JHudFrame.md) | Card with HUD border styling |
| `JCard` | [references/JCard.md](references/JCard.md) | General-purpose card container |
| `JSpinner` | [references/JSpinner.md](references/JSpinner.md) | Arc loading spinner |

### HUD Canvas & Drag Widgets (Movies Mode)
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JHudCanvas` | [references/JHudCanvas.md](references/JHudCanvas.md) | **Root canvas for Movies mode** — floating widget placement with drag support |
| `JDragWidget` | [references/JDragWidget.md](references/JDragWidget.md) | Standalone draggable panel — single widget without full canvas |
| `JHudClock` | [references/JHudClock.md](references/JHudClock.md) | Analog + digital clock with rotating SVG tick ring |
| `JArcReactor` | [references/JArcReactor.md](references/JArcReactor.md) | Iron Man arc reactor power display with petal triangles |
| `JHeatmap` | [references/JHeatmap.md](references/JHeatmap.md) | 2D color-interpolated data density grid |
| `JActivityFeed` | [references/JActivityFeed.md](references/JActivityFeed.md) | Scrolling live event log with level icons and auto-scroll |
| `JKPITicker` | [references/JKPITicker.md](references/JKPITicker.md) | Horizontal scrolling KPI ticker bar — pin to bottom in Movies mode |

### Form Controls
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JButton` | [references/JButton.md](references/JButton.md) | Parallelogram / notch buttons in 7 colors |
| `JInput` | [references/JInput.md](references/JInput.md) | HUD-styled text input |
| `JTextArea` | [references/JTextArea.md](references/JTextArea.md) | Multi-line text input |
| `JSelect` | [references/JSelect.md](references/JSelect.md) | Custom dropdown select |
| `JToggle` | [references/JToggle.md](references/JToggle.md) | On/off toggle switch |
| `JSlider` | [references/JSlider.md](references/JSlider.md) | Range slider |
| `JCheckbox` | [references/JCheckbox.md](references/JCheckbox.md) | Animated checkbox |
| `JRadio` | [references/JRadio.md](references/JRadio.md) | Radio button |
| `JFormField` | [references/JFormField.md](references/JFormField.md) | Form field wrapper with label/hint/error |
| `JDatePicker` | [references/JDatePicker.md](references/JDatePicker.md) | Calendar date picker |
| `JDateRangePicker` | [references/JDateRangePicker.md](references/JDateRangePicker.md) | Dual-month date range picker |
| `JTimePicker` | [references/JTimePicker.md](references/JTimePicker.md) | Time picker (HH:MM) |

### Display & Feedback
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JBadge` | [references/JBadge.md](references/JBadge.md) | Inline badge chip with optional blink |
| `JStatusPill` | [references/JStatusPill.md](references/JStatusPill.md) | Status dot + label pill |
| `JProgress` | [references/JProgress.md](references/JProgress.md) | Linear / segmented progress bar |
| `JAlert` | [references/JAlert.md](references/JAlert.md) | Dismissable alert banner (4 states) |
| `JModal` | [references/JModal.md](references/JModal.md) | Overlay modal dialog |
| `JDivider` | [references/JDivider.md](references/JDivider.md) | Horizontal / vertical divider |
| `JDataRow` | [references/JDataRow.md](references/JDataRow.md) | Key-value data row |
| `JHudLabel` | [references/JHudLabel.md](references/JHudLabel.md) | Labelled data pair (chip/arc/metric variants) |
| `JStatCard` | [references/JStatCard.md](references/JStatCard.md) | Metric stat card with data rows |

### Navigation & Structure
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JTabs` + `JTab` | [references/JTabs.md](references/JTabs.md) | Tab navigation |
| `JAccordion` | [references/JAccordion.md](references/JAccordion.md) | Expand/collapse accordion |
| `JPagination` | [references/JPagination.md](references/JPagination.md) | Page navigation with info and first/last |

### Data & Tables
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JTable` | [references/JTable.md](references/JTable.md) | Data table — place inside a `JHudCanvas` widget in Movies mode |

### Charts (via Recharts)
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JSparkline` | [references/JSparkline.md](references/JSparkline.md) | Mini trend line |
| `JBarChart` | [references/JBarChart.md](references/JBarChart.md) | Vertical bar chart |
| `JLineChart` | [references/JLineChart.md](references/JLineChart.md) | Line / area chart |
| `JDonutChart` | [references/JDonutChart.md](references/JDonutChart.md) | Donut / pie chart |
| `JGaugeChart` | [references/JGaugeChart.md](references/JGaugeChart.md) | Radial gauge with needle |
| `JRadarChart` | [references/JRadarChart.md](references/JRadarChart.md) | Radar / spider chart |

### HUD Visualizations
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JArcMeter` | [references/JArcMeter.md](references/JArcMeter.md) | Animated SVG arc meter |
| `JWaveform` | [references/JWaveform.md](references/JWaveform.md) | Animated audio waveform bars |
| `JOrb` | [references/JOrb.md](references/JOrb.md) | Pulsing orb with glow rings |

### Interactive & Advanced
| Component | Reference | Description |
|-----------|-----------|-------------|
| `JNodeGraph` | [references/JNodeGraph.md](references/JNodeGraph.md) | Draggable node graph with SVG bezier edges |
| `JRadialMenu` + `JRadialItem` | [references/JRadialMenu.md](references/JRadialMenu.md) | Spring fly-out radial navigation ring |
| `JCommandPalette` | [references/JCommandPalette.md](references/JCommandPalette.md) | Spotlight-style command palette |
| `JBootScreen` | [references/JBootScreen.md](references/JBootScreen.md) | 5-phase animated boot sequence overlay |
| `JToastProvider` + `useToast` | [references/JToast.md](references/JToast.md) | Toast notification system |

### OS Shell Kit
| Component | Reference | Description |
|-----------|-----------|-------------|
| All OS Shell components | [references/JOSShell.md](references/JOSShell.md) | Full API: JDesktop, JWindow, JWindowManager, JTaskbar, JStartMenu, JDock, JMenuBar, JOSNotification, JFileExplorer, JTaskManager, JControlPanel |

---

## Common CSS Variables Reference

```css
--j-accent          /* primary accent (theme color) */
--j-accent-50       /* accent at 50% opacity */
--j-accent-18       /* accent at 18% opacity (hover bg) */
--j-bg              /* page background */
--j-bg-card         /* card background */
--j-border          /* border color */
--j-border-dim      /* dim border (inactive) */
--j-text-primary    /* primary text */
--j-text-muted      /* muted/secondary text */
--j-warn            /* warning yellow  (use instead of #febc2e) */
--j-err             /* error red       (use instead of #ff5f57) */
--j-ok              /* success green   (use instead of #28c840) */
--j-cyan            /* cyan color */
--j-amber           /* amber color */
--j-green           /* green color */
--j-red             /* red color */
--j-blue            /* blue color */
```

---

## TypeScript Types Quick Reference

```tsx
import type {
  JColor,           // 'cyan'|'blue'|'amber'|'red'|'green'|'ghost'|'white'
  JSize,            // 'sm'|'md'|'lg'
  JState,           // 'active'|'warning'|'error'|'success'
  JThemePreset,     // 'cyan'|'amber'|'green'|'red'|'purple'|'white'
  NodeDef,          // { id, label, x, y, type?, color?, pulse? }
  EdgeDef,          // { from, to, color?, style?, animDur? }
  NType,            // 'default'|'hub'|'hex'|'diamond'
  EdgeStyle,        // 'solid'|'dashed'
  JCommand,         // { key, label, group?, icon? }
  JTableColumn,     // { key, label, sortable? }
  JTableRow,        // Record<string, any>
  DateRange,        // { from?: Date, to?: Date }
  JWidgetSlot,      // { id, x, y, width?, title?, color?, content }
  JActivityFeedItem,// { id, time?, level?, message, source? }
  JKPITickerItem,   // { label, value, delta?, trend? }
  JHeatmapCell,     // { value, label?, tooltip? }
  // OS Shell Kit
  WindowState,      // { id, appId, title, icon?, x, y, width, height, minimized, maximized, zIndex, content }
  OpenWindowConfig, // { appId, title, icon?, width?, height?, content }
  JDesktopApp,      // { id, icon, label, component, defaultWidth?, defaultHeight? }
  OSNotifyConfig,   // { title, body?, icon?, duration? }
  JFileNode,        // { id, name, type: 'file'|'folder', icon?, children?, meta? }
  JProcess,         // { pid, name, cpu, memory, status: 'running'|'suspended'|'stopped' }
  JControlSection,  // { id, icon, label, component }
} from '@masterdeepak15/jarvis-ui'
```
