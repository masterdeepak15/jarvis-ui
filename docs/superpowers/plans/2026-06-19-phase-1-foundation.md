# JarvisUI React — Phase 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the pnpm workspace monorepo, copy all CSS files from the Blazor project, implement the complete theme system (JarvisTheme, JarvisTokens, JThemeContext, JThemePicker), configure the Vite library build, and scaffold the docs app — producing a working npm-publishable package with a live theme switcher.

**Architecture:** pnpm workspace with `packages/jarvis-ui` (library, Vite lib mode, ESM+CJS) and `apps/docs` (Vite app). The theme system is a React Context that injects a `<style id="jarvis-theme-vars">` tag with 80+ CSS custom properties — exact port of `JThemeProvider.razor`. All HUD styling comes from 4 CSS files copied verbatim from the Blazor project at `D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\wwwroot\css\`.

**Tech Stack:** React 18 + TypeScript 5 · Vite 5 · Tailwind CSS 3 · Vitest + React Testing Library · pnpm workspaces

## Global Constraints

- Read the Blazor source file BEFORE implementing any React equivalent — the Blazor file is the spec
- All colors via `var(--j-*)` CSS variables only — no hardcoded hex values in TSX
- No `border-radius` on HUD components — use `clip-path` polygons (matches Blazor)
- Font: `'Courier New', 'Lucida Console', monospace` everywhere
- CSS files copied verbatim — do not edit them
- Blazor source root: `D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\`
- Repo root: `D:\Claude\HUD Theme\HUDtheme\`
- Button shape CSS classes differ from their enum names — use exact Blazor mappings (see Task 4)

---

## This plan is Part 1 of 5

| Plan | Covers |
|---|---|
| **Plan 1 (this)** | Monorepo scaffold · CSS files · Theme system · JThemePicker · Docs skeleton |
| Plan 2 | JPageLayout · JSidebar · JHudBar (layout shell) |
| Plan 3 | JButton · JCard · JInput · all form components |
| Plan 4 | JTable · JToast · JModal · JSpinner · JOrb · special components |
| Plan 5 | Charts (Recharts) · Maps (Leaflet + Google Maps) · complete docs pages |

---

## File Map

```
HUDtheme/
├── pnpm-workspace.yaml                         [CREATE]
├── package.json                                [CREATE]
│
├── packages/jarvis-ui/
│   ├── package.json                            [CREATE]
│   ├── vite.config.ts                          [CREATE]
│   ├── tailwind.config.ts                      [CREATE]
│   ├── tsconfig.json                           [CREATE]
│   ├── src/
│   │   ├── test-setup.ts                       [CREATE]
│   │   ├── styles/
│   │   │   ├── jarvis-theme.css                [COPY from Blazor]
│   │   │   ├── jarvis-ui.css                   [COPY from Blazor]
│   │   │   ├── jarvis-charts.css               [COPY from Blazor]
│   │   │   └── jarvis-maps.css                 [COPY from Blazor]
│   │   ├── theme/
│   │   │   ├── JarvisTheme.ts                  [CREATE]
│   │   │   ├── JarvisTheme.test.ts             [CREATE]
│   │   │   ├── JarvisTokens.ts                 [CREATE]
│   │   │   ├── JarvisTokens.test.ts            [CREATE]
│   │   │   ├── JThemeContext.tsx               [CREATE]
│   │   │   └── JThemeContext.test.tsx          [CREATE]
│   │   ├── components/
│   │   │   └── theme/
│   │   │       ├── JThemePicker.tsx            [CREATE]
│   │   │       └── JThemePicker.test.tsx       [CREATE]
│   │   └── index.ts                            [CREATE]
│
└── apps/docs/
    ├── package.json                            [CREATE]
    ├── vite.config.ts                          [CREATE]
    ├── tailwind.config.ts                      [CREATE]
    ├── tsconfig.json                           [CREATE]
    ├── index.html                              [CREATE]
    └── src/
        ├── main.tsx                            [CREATE]
        └── App.tsx                             [CREATE]
```

---

### Task 1: Scaffold pnpm workspace monorepo

**Files:**
- Create: `HUDtheme/pnpm-workspace.yaml`
- Create: `HUDtheme/package.json`
- Create: `HUDtheme/packages/jarvis-ui/package.json`
- Create: `HUDtheme/packages/jarvis-ui/vite.config.ts`
- Create: `HUDtheme/packages/jarvis-ui/tailwind.config.ts`
- Create: `HUDtheme/packages/jarvis-ui/tsconfig.json`
- Create: `HUDtheme/packages/jarvis-ui/src/test-setup.ts`

**Interfaces:**
- Produces: `jarvis-ui` package installable via `pnpm --filter jarvis-ui <cmd>`

- [ ] **Step 1: Create workspace root files**

`HUDtheme/pnpm-workspace.yaml`:
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

`HUDtheme/package.json`:
```json
{
  "name": "jarvis-ui-monorepo",
  "private": true,
  "scripts": {
    "dev:lib": "pnpm --filter jarvis-ui dev",
    "dev:docs": "pnpm --filter docs dev",
    "build:lib": "pnpm --filter jarvis-ui build",
    "build:docs": "pnpm --filter docs build",
    "test": "pnpm --filter jarvis-ui test"
  }
}
```

- [ ] **Step 2: Create library package.json**

`HUDtheme/packages/jarvis-ui/package.json`:
```json
{
  "name": "jarvis-ui",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/jarvis-ui.cjs.js",
  "module": "./dist/jarvis-ui.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/jarvis-ui.es.js",
      "require": "./dist/jarvis-ui.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/jarvis-ui.css"
  },
  "files": ["dist"],
  "scripts": {
    "dev": "vite build --watch",
    "build": "vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^14.3.0",
    "@testing-library/user-event": "^14.5.0",
    "@types/leaflet": "^1.9.8",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.20",
    "jsdom": "^24.1.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "vite-plugin-dts": "^4.0.0",
    "vitest": "^2.0.0"
  },
  "dependencies": {
    "@react-google-maps/api": "^2.19.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1",
    "recharts": "^2.12.0"
  }
}
```

- [ ] **Step 3: Create vite.config.ts**

`HUDtheme/packages/jarvis-ui/vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'], insertTypesEntry: true, exclude: ['src/**/*.test.*'] }),
  ],
  css: {
    postcss: { plugins: [tailwindcss, autoprefixer] },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'JarvisUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `jarvis-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        assetFileNames: 'jarvis-ui[extname]',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

- [ ] **Step 4: Create tailwind.config.ts and tsconfig.json**

`HUDtheme/packages/jarvis-ui/tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
} satisfies Config
```

`HUDtheme/packages/jarvis-ui/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["src"],
  "exclude": ["src/**/*.test.*", "node_modules", "dist"]
}
```

- [ ] **Step 5: Create test setup file**

`HUDtheme/packages/jarvis-ui/src/test-setup.ts`:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Install dependencies**

Run from `HUDtheme/`:
```bash
pnpm install
```

Expected: `node_modules` created in both root and `packages/jarvis-ui/`. No errors.

- [ ] **Step 7: Commit**

```bash
git add pnpm-workspace.yaml package.json packages/jarvis-ui/
git commit -m "feat: scaffold pnpm workspace monorepo with jarvis-ui library package"
```

---

### Task 2: Copy CSS files from Blazor

**Files:**
- Create: `packages/jarvis-ui/src/styles/jarvis-theme.css` (copy)
- Create: `packages/jarvis-ui/src/styles/jarvis-ui.css` (copy)
- Create: `packages/jarvis-ui/src/styles/jarvis-charts.css` (copy)
- Create: `packages/jarvis-ui/src/styles/jarvis-maps.css` (copy)

**Interfaces:**
- Produces: CSS files at `src/styles/*.css` — imported in `src/index.ts` to be bundled into `dist/jarvis-ui.css`

- [ ] **Step 1: Copy all 4 CSS files**

Copy from the Blazor project (these are pure standard CSS — no Blazor-specific syntax):

```
D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\wwwroot\css\jarvis-theme.css
  → D:\Claude\HUD Theme\HUDtheme\packages\jarvis-ui\src\styles\jarvis-theme.css

D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\wwwroot\css\jarvis-ui.css
  → D:\Claude\HUD Theme\HUDtheme\packages\jarvis-ui\src\styles\jarvis-ui.css

D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\wwwroot\css\jarvis-charts.css
  → D:\Claude\HUD Theme\HUDtheme\packages\jarvis-ui\src\styles\jarvis-charts.css

D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\wwwroot\css\jarvis-maps.css
  → D:\Claude\HUD Theme\HUDtheme\packages\jarvis-ui\src\styles\jarvis-maps.css
```

PowerShell command:
```powershell
$src = "D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\wwwroot\css"
$dst = "D:\Claude\HUD Theme\HUDtheme\packages\jarvis-ui\src\styles"
New-Item -ItemType Directory -Force $dst
Copy-Item "$src\jarvis-theme.css" "$dst\jarvis-theme.css"
Copy-Item "$src\jarvis-ui.css" "$dst\jarvis-ui.css"
Copy-Item "$src\jarvis-charts.css" "$dst\jarvis-charts.css"
Copy-Item "$src\jarvis-maps.css" "$dst\jarvis-maps.css"
```

- [ ] **Step 2: Verify files copied**

```bash
ls packages/jarvis-ui/src/styles/
```

Expected: 4 files listed — `jarvis-theme.css`, `jarvis-ui.css`, `jarvis-charts.css`, `jarvis-maps.css`.

- [ ] **Step 3: Commit**

```bash
git add packages/jarvis-ui/src/styles/
git commit -m "feat: copy HUD CSS files verbatim from Blazor project"
```

---

### Task 3: Implement JarvisTheme.ts + tests

**Files:**
- Create: `packages/jarvis-ui/src/theme/JarvisTheme.test.ts`
- Create: `packages/jarvis-ui/src/theme/JarvisTheme.ts`

**Interfaces:**
- Produces:
  - `JarvisTheme` interface
  - `JThemePreset` type: `'cyan' | 'amber' | 'green' | 'red' | 'purple' | 'white'`
  - `PRESETS: Record<JThemePreset, JarvisTheme>` — 6 preset objects
  - `toCss(theme: JarvisTheme): string` — generates full CSS `:root` block

- [ ] **Step 1: Write the failing tests**

`packages/jarvis-ui/src/theme/JarvisTheme.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { toCss, PRESETS } from './JarvisTheme'

describe('PRESETS', () => {
  it('has exactly 6 presets', () => {
    expect(Object.keys(PRESETS)).toHaveLength(6)
    expect(Object.keys(PRESETS)).toEqual(['cyan', 'amber', 'green', 'red', 'purple', 'white'])
  })

  it('cyan preset has correct accent', () => {
    expect(PRESETS.cyan.accent).toBe('#00e5ff')
  })

  it('amber preset has correct accent', () => {
    expect(PRESETS.amber.accent).toBe('#f97316')
  })

  it('green preset has correct accent', () => {
    expect(PRESETS.green.accent).toBe('#22c55e')
  })

  it('red preset has correct accent', () => {
    expect(PRESETS.red.accent).toBe('#ef4444')
  })

  it('purple preset has correct accent', () => {
    expect(PRESETS.purple.accent).toBe('#a855f7')
  })

  it('white preset has light background', () => {
    expect(PRESETS.white.bg).toBe('#f0f9ff')
    expect(PRESETS.white.textPrimary).toBe('#0c1a2e')
  })

  it('all presets have animation duration properties', () => {
    Object.values(PRESETS).forEach((preset) => {
      expect(preset.durScan).toBe('3.5s')
      expect(preset.durPulse).toBe('2.8s')
      expect(preset.notch).toBe('14px')
    })
  })
})

describe('toCss', () => {
  it('generates --j-accent variable', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-accent:')
    expect(css).toContain('#00e5ff')
  })

  it('generates opacity variants for accent (rgba format r,g,b space alpha)', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-accent-05:')
    expect(css).toContain('rgba(0,229,255, 0.05)')
    expect(css).toContain('--j-accent-50:')
    expect(css).toContain('rgba(0,229,255, 0.50)')
    expect(css).toContain('--j-accent-70:')
    expect(css).toContain('rgba(0,229,255, 0.70)')
  })

  it('generates warn opacity variants', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-warn:')
    expect(css).toContain('--j-warn-05:')
    expect(css).toContain('--j-warn-50:')
  })

  it('generates background variables', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-bg:')
    expect(css).toContain('#020d18')
    expect(css).toContain('--j-bg-card:')
    expect(css).toContain('--j-bg-card-alt:')
    expect(css).toContain('--j-bg-danger:')
    expect(css).toContain('--j-bg-overlay:')
  })

  it('generates border variables derived from accent', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-border-dim:')
    expect(css).toContain('rgba(0,229,255, 0.07)')
    expect(css).toContain('--j-border:')
    expect(css).toContain('rgba(0,229,255, 0.18)')
  })

  it('generates text variables', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-text-primary:')
    expect(css).toContain('#e0f7ff')
    expect(css).toContain('--j-text-secondary:')
    expect(css).toContain('--j-text-muted:')
    expect(css).toContain('--j-text-dim:')
  })

  it('generates animation duration variables', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-dur-scan:')
    expect(css).toContain('3.5s')
    expect(css).toContain('--j-dur-pulse:')
    expect(css).toContain('2.8s')
    expect(css).toContain('--j-dur-spin:')
    expect(css).toContain('--j-dur-shine:')
    expect(css).toContain('--j-dur-corner:')
  })

  it('generates shape token variables', () => {
    const css = toCss(PRESETS.cyan)
    expect(css).toContain('--j-notch:')
    expect(css).toContain('14px')
    expect(css).toContain('--j-notch-lg:')
    expect(css).toContain('20px')
    expect(css).toContain('--j-rail-w:')
    expect(css).toContain('3px')
  })

  it('wraps output in :root block', () => {
    const css = toCss(PRESETS.cyan)
    expect(css.trim()).toMatch(/^:root\s*\{/)
    expect(css.trim()).toMatch(/\}\s*$/)
  })

  it('generates correct amber rgba from amber accent', () => {
    const css = toCss(PRESETS.amber)
    // amber accent #f97316 → rgb(249,115,22)
    expect(css).toContain('rgba(249,115,22, 0.05)')
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd packages/jarvis-ui && pnpm test
```

Expected: FAIL with "Cannot find module './JarvisTheme'"

- [ ] **Step 3: Implement JarvisTheme.ts**

`packages/jarvis-ui/src/theme/JarvisTheme.ts`:
```ts
export type JThemePreset = 'cyan' | 'amber' | 'green' | 'red' | 'purple' | 'white'

export interface JarvisTheme {
  name: string
  preset: JThemePreset
  accent: string
  accentMid: string
  accentDim: string
  accentDeep: string
  warn: string
  err: string
  ok: string
  bg: string
  bgCard: string
  bgCardAlt: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  textDim: string
  durScan: string
  durPulse: string
  durSpin: string
  durShine: string
  durCorner: string
  notch: string
  notchLg: string
  railW: string
}

function hexToRgb(hex: string): string {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2]
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `${r},${g},${b}`
}

function darkenBg(hex: string): string {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2]
  const r = Math.max(0, parseInt(h.slice(0, 2), 16) - 4)
  const g = Math.max(0, parseInt(h.slice(2, 4), 16) - 2)
  const b = Math.max(0, parseInt(h.slice(4, 6), 16) - 2)
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}

export function toCss(t: JarvisTheme): string {
  const a = hexToRgb(t.accent)
  const w = hexToRgb(t.warn)
  const e = hexToRgb(t.err)
  const o = hexToRgb(t.ok)
  const bgRgb = hexToRgb(t.bg)

  return `:root {
  --j-accent:       ${t.accent};
  --j-accent-mid:   ${t.accentMid};
  --j-accent-dim:   ${t.accentDim};
  --j-accent-deep:  ${t.accentDeep};

  --j-accent-05:    rgba(${a}, 0.05);
  --j-accent-08:    rgba(${a}, 0.08);
  --j-accent-12:    rgba(${a}, 0.12);
  --j-accent-18:    rgba(${a}, 0.18);
  --j-accent-25:    rgba(${a}, 0.25);
  --j-accent-35:    rgba(${a}, 0.35);
  --j-accent-50:    rgba(${a}, 0.50);
  --j-accent-70:    rgba(${a}, 0.70);

  --j-warn:         ${t.warn};
  --j-warn-05:      rgba(${w}, 0.05);
  --j-warn-12:      rgba(${w}, 0.12);
  --j-warn-25:      rgba(${w}, 0.25);
  --j-warn-50:      rgba(${w}, 0.50);

  --j-err:          ${t.err};
  --j-err-05:       rgba(${e}, 0.05);
  --j-err-12:       rgba(${e}, 0.12);
  --j-err-25:       rgba(${e}, 0.25);
  --j-err-50:       rgba(${e}, 0.50);

  --j-ok:           ${t.ok};
  --j-ok-05:        rgba(${o}, 0.05);
  --j-ok-12:        rgba(${o}, 0.12);
  --j-ok-25:        rgba(${o}, 0.25);

  --j-bg:           ${t.bg};
  --j-bg-card:      ${t.bgCard};
  --j-bg-card-alt:  ${t.bgCardAlt};
  --j-bg-danger:    ${darkenBg(t.bg)};
  --j-bg-overlay:   rgba(${bgRgb},0.92);

  --j-text-primary:   ${t.textPrimary};
  --j-text-secondary: ${t.textSecondary};
  --j-text-muted:     ${t.textMuted};
  --j-text-dim:       ${t.textDim};

  --j-border-dim:   rgba(${a}, 0.07);
  --j-border:       rgba(${a}, 0.18);
  --j-border-mid:   rgba(${a}, 0.35);
  --j-border-full:  rgba(${a}, 0.70);

  --j-dur-scan:     ${t.durScan};
  --j-dur-pulse:    ${t.durPulse};
  --j-dur-spin:     ${t.durSpin};
  --j-dur-shine:    ${t.durShine};
  --j-dur-corner:   ${t.durCorner};

  --j-notch:        ${t.notch};
  --j-notch-lg:     ${t.notchLg};
  --j-rail-w:       ${t.railW};
}`
}

const BASE: Omit<JarvisTheme, 'name' | 'preset'> = {
  accent:        '#00e5ff',
  accentMid:     '#22d3ee',
  accentDim:     '#0e7490',
  accentDeep:    '#0891b2',
  warn:          '#f97316',
  err:           '#ef4444',
  ok:            '#22c55e',
  bg:            '#020d18',
  bgCard:        '#030f1e',
  bgCardAlt:     '#04111f',
  textPrimary:   '#e0f7ff',
  textSecondary: '#94a3b8',
  textMuted:     '#475569',
  textDim:       '#334155',
  durScan:       '3.5s',
  durPulse:      '2.8s',
  durSpin:       '4s',
  durShine:      '2.4s',
  durCorner:     '3.0s',
  notch:         '14px',
  notchLg:       '20px',
  railW:         '3px',
}

export const PRESETS: Record<JThemePreset, JarvisTheme> = {
  cyan:   { name: 'Cyan',   preset: 'cyan',   ...BASE },
  amber:  { name: 'Amber',  preset: 'amber',  ...BASE,
    accent: '#f97316', accentMid: '#fb923c', accentDim: '#c2410c', accentDeep: '#9a3412',
    bg: '#0f0800', bgCard: '#160c02', bgCardAlt: '#1a1004',
    textPrimary: '#fff7ed',
  },
  green:  { name: 'Green',  preset: 'green',  ...BASE,
    accent: '#22c55e', accentMid: '#4ade80', accentDim: '#15803d', accentDeep: '#166534',
    bg: '#010f04', bgCard: '#021308', bgCardAlt: '#03180a',
    textPrimary: '#f0fdf4',
  },
  red:    { name: 'Red',    preset: 'red',    ...BASE,
    accent: '#ef4444', accentMid: '#f87171', accentDim: '#b91c1c', accentDeep: '#991b1b',
    bg: '#0f0002', bgCard: '#160205', bgCardAlt: '#1a0306',
    textPrimary: '#fff1f2',
  },
  purple: { name: 'Purple', preset: 'purple', ...BASE,
    accent: '#a855f7', accentMid: '#c084fc', accentDim: '#7c3aed', accentDeep: '#6d28d9',
    bg: '#050010', bgCard: '#080018', bgCardAlt: '#0a001e',
    textPrimary: '#faf5ff',
  },
  white:  { name: 'White',  preset: 'white',  ...BASE,
    accent: '#0891b2', accentMid: '#06b6d4', accentDim: '#0e7490', accentDeep: '#164e63',
    bg: '#f0f9ff', bgCard: '#ffffff', bgCardAlt: '#f8fafc',
    textPrimary: '#0c1a2e', textSecondary: '#334155',
    textMuted: '#64748b', textDim: '#94a3b8',
    warn: '#d97706', err: '#dc2626', ok: '#16a34a',
  },
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
cd packages/jarvis-ui && pnpm test
```

Expected: All tests PASS. If any rgba format assertion fails, check the exact spacing in `toCss` — the format must be `rgba(r,g,b, 0.05)` (space before alpha, no spaces in rgb).

- [ ] **Step 5: Commit**

```bash
git add packages/jarvis-ui/src/theme/
git commit -m "feat: implement JarvisTheme with 6 presets and toCss CSS variable generation"
```

---

### Task 4: Implement JarvisTokens.ts + tests

**Files:**
- Create: `packages/jarvis-ui/src/theme/JarvisTokens.test.ts`
- Create: `packages/jarvis-ui/src/theme/JarvisTokens.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `JColor`, `JSize`, `JVariant`, `JState`, `JAnimSpeed`, `JCardStyle`, `JButtonShape` type aliases
  - `JarvisTokens` object with `color()`, `size()`, `variant()`, `state()`, `animSpeed()`, `cardStyle()`, `buttonShape()`, `cls()` methods

> ⚠️ CRITICAL: Button shape CSS class names do NOT match the enum names. Use exact values from Blazor `JarvisTokens.cs`:
> - `BracketFrame` → `j-btn-bracket` (NOT `j-btn-bracket-frame`)
> - `Hexagonal` (button) → `j-btn-hex` (NOT `j-btn-hexagonal`)
> - `IconSquare` → `j-btn-icon-sq` (NOT `j-btn-icon-square`)

- [ ] **Step 1: Write the failing tests**

`packages/jarvis-ui/src/theme/JarvisTokens.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { JarvisTokens } from './JarvisTokens'

describe('JarvisTokens.color', () => {
  it('maps cyan → j-color-cyan', () => expect(JarvisTokens.color('cyan')).toBe('j-color-cyan'))
  it('maps amber → j-color-amber', () => expect(JarvisTokens.color('amber')).toBe('j-color-amber'))
  it('maps ghost → j-color-ghost', () => expect(JarvisTokens.color('ghost')).toBe('j-color-ghost'))
  it('returns empty string for undefined', () => expect(JarvisTokens.color(undefined)).toBe(''))
})

describe('JarvisTokens.size', () => {
  it('maps xs → j-size-xs', () => expect(JarvisTokens.size('xs')).toBe('j-size-xs'))
  it('maps md → j-size-md', () => expect(JarvisTokens.size('md')).toBe('j-size-md'))
  it('maps xl → j-size-xl', () => expect(JarvisTokens.size('xl')).toBe('j-size-xl'))
  it('returns empty string for undefined', () => expect(JarvisTokens.size(undefined)).toBe(''))
})

describe('JarvisTokens.variant', () => {
  it('maps solid → j-variant-solid', () => expect(JarvisTokens.variant('solid')).toBe('j-variant-solid'))
  it('maps danger → j-variant-danger', () => expect(JarvisTokens.variant('danger')).toBe('j-variant-danger'))
})

describe('JarvisTokens.state', () => {
  it('maps active → j-state-active', () => expect(JarvisTokens.state('active')).toBe('j-state-active'))
  it('maps error → j-state-error', () => expect(JarvisTokens.state('error')).toBe('j-state-error'))
  it('maps processing → j-state-processing', () => expect(JarvisTokens.state('processing')).toBe('j-state-processing'))
  it('returns empty string for undefined', () => expect(JarvisTokens.state(undefined)).toBe(''))
})

describe('JarvisTokens.animSpeed', () => {
  it('maps normal → j-anim-normal', () => expect(JarvisTokens.animSpeed('normal')).toBe('j-anim-normal'))
  it('maps off → j-anim-off', () => expect(JarvisTokens.animSpeed('off')).toBe('j-anim-off'))
})

describe('JarvisTokens.cardStyle', () => {
  it('maps CornerBracket → j-card-s1', () => expect(JarvisTokens.cardStyle('CornerBracket')).toBe('j-card-s1'))
  it('maps Notched → j-card-s2', () => expect(JarvisTokens.cardStyle('Notched')).toBe('j-card-s2'))
  it('maps SideRail → j-card-s3', () => expect(JarvisTokens.cardStyle('SideRail')).toBe('j-card-s3'))
  it('maps GlowBorder → j-card-s4', () => expect(JarvisTokens.cardStyle('GlowBorder')).toBe('j-card-s4'))
  it('maps PartialBorder → j-card-s5', () => expect(JarvisTokens.cardStyle('PartialBorder')).toBe('j-card-s5'))
  it('maps DangerPulse → j-card-s6', () => expect(JarvisTokens.cardStyle('DangerPulse')).toBe('j-card-s6'))
  it('maps Hexagonal → j-card-s7', () => expect(JarvisTokens.cardStyle('Hexagonal')).toBe('j-card-s7'))
  it('maps Radar → j-card-s8', () => expect(JarvisTokens.cardStyle('Radar')).toBe('j-card-s8'))
  it('maps DoubleFrame → j-card-s9', () => expect(JarvisTokens.cardStyle('DoubleFrame')).toBe('j-card-s9'))
  it('returns empty string for undefined', () => expect(JarvisTokens.cardStyle(undefined)).toBe(''))
})

describe('JarvisTokens.buttonShape', () => {
  it('maps LeftNotch → j-btn-left-notch', () => expect(JarvisTokens.buttonShape('LeftNotch')).toBe('j-btn-left-notch'))
  it('maps RightNotch → j-btn-right-notch', () => expect(JarvisTokens.buttonShape('RightNotch')).toBe('j-btn-right-notch'))
  it('maps BothNotch → j-btn-both-notch', () => expect(JarvisTokens.buttonShape('BothNotch')).toBe('j-btn-both-notch'))
  it('maps Parallelogram → j-btn-parallelogram', () => expect(JarvisTokens.buttonShape('Parallelogram')).toBe('j-btn-parallelogram'))
  it('maps GhostSkew → j-btn-ghost-skew', () => expect(JarvisTokens.buttonShape('GhostSkew')).toBe('j-btn-ghost-skew'))
  it('maps BracketFrame → j-btn-bracket (NOT j-btn-bracket-frame)', () => expect(JarvisTokens.buttonShape('BracketFrame')).toBe('j-btn-bracket'))
  it('maps Hexagonal → j-btn-hex (NOT j-btn-hexagonal)', () => expect(JarvisTokens.buttonShape('Hexagonal')).toBe('j-btn-hex'))
  it('maps IconSquare → j-btn-icon-sq (NOT j-btn-icon-square)', () => expect(JarvisTokens.buttonShape('IconSquare')).toBe('j-btn-icon-sq'))
  it('maps ScanFull → j-btn-scan-full', () => expect(JarvisTokens.buttonShape('ScanFull')).toBe('j-btn-scan-full'))
})

describe('JarvisTokens.cls', () => {
  it('joins strings with spaces', () => {
    expect(JarvisTokens.cls('a', 'b', 'c')).toBe('a b c')
  })
  it('filters out falsy values', () => {
    expect(JarvisTokens.cls('a', false, null, undefined, '', 'b')).toBe('a b')
  })
  it('returns empty string when all values are falsy', () => {
    expect(JarvisTokens.cls(false, null, undefined)).toBe('')
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd packages/jarvis-ui && pnpm test
```

Expected: FAIL with "Cannot find module './JarvisTokens'"

- [ ] **Step 3: Implement JarvisTokens.ts**

`packages/jarvis-ui/src/theme/JarvisTokens.ts`:
```ts
export type JColor     = 'cyan' | 'blue' | 'amber' | 'red' | 'green' | 'ghost' | 'white'
export type JSize      = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type JVariant   = 'solid' | 'outline' | 'ghost' | 'danger' | 'scan'
export type JState     = 'idle' | 'active' | 'processing' | 'warning' | 'error' | 'success'
export type JAnimSpeed = 'off' | 'slow' | 'normal' | 'fast'

export type JCardStyle =
  | 'CornerBracket' | 'Notched'    | 'SideRail'  | 'GlowBorder'
  | 'PartialBorder' | 'DangerPulse'| 'Hexagonal' | 'Radar' | 'DoubleFrame'

export type JButtonShape =
  | 'LeftNotch' | 'RightNotch' | 'BothNotch'   | 'Parallelogram'
  | 'GhostSkew' | 'BracketFrame'| 'Hexagonal'  | 'IconSquare' | 'ScanFull'

const CARD_STYLE_MAP: Record<JCardStyle, string> = {
  CornerBracket: 'j-card-s1',
  Notched:       'j-card-s2',
  SideRail:      'j-card-s3',
  GlowBorder:    'j-card-s4',
  PartialBorder: 'j-card-s5',
  DangerPulse:   'j-card-s6',
  Hexagonal:     'j-card-s7',
  Radar:         'j-card-s8',
  DoubleFrame:   'j-card-s9',
}

const BUTTON_SHAPE_MAP: Record<JButtonShape, string> = {
  LeftNotch:     'j-btn-left-notch',
  RightNotch:    'j-btn-right-notch',
  BothNotch:     'j-btn-both-notch',
  Parallelogram: 'j-btn-parallelogram',
  GhostSkew:     'j-btn-ghost-skew',
  BracketFrame:  'j-btn-bracket',
  Hexagonal:     'j-btn-hex',
  IconSquare:    'j-btn-icon-sq',
  ScanFull:      'j-btn-scan-full',
}

export const JarvisTokens = {
  color:       (c?: JColor)      => c  ? `j-color-${c}` : '',
  size:        (s?: JSize)       => s  ? `j-size-${s}` : '',
  variant:     (v?: JVariant)    => v  ? `j-variant-${v}` : '',
  state:       (s?: JState)      => s  ? `j-state-${s}` : '',
  animSpeed:   (a?: JAnimSpeed)  => a  ? `j-anim-${a}` : '',
  cardStyle:   (cs?: JCardStyle)    => cs  ? CARD_STYLE_MAP[cs] : '',
  buttonShape: (bs?: JButtonShape)  => bs  ? BUTTON_SHAPE_MAP[bs] : '',
  cls: (...parts: (string | false | null | undefined)[]) =>
    parts.filter(Boolean).join(' '),
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
cd packages/jarvis-ui && pnpm test
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/jarvis-ui/src/theme/JarvisTokens.ts packages/jarvis-ui/src/theme/JarvisTokens.test.ts
git commit -m "feat: implement JarvisTokens enum-to-CSS-class resolvers"
```

---

### Task 5: Implement JThemeContext.tsx + tests

**Files:**
- Create: `packages/jarvis-ui/src/theme/JThemeContext.test.tsx`
- Create: `packages/jarvis-ui/src/theme/JThemeContext.tsx`

**Interfaces:**
- Consumes: `JarvisTheme`, `JThemePreset`, `PRESETS`, `toCss` from `./JarvisTheme`
- Produces:
  - `JThemeProvider` component: `({ children, preset?, theme? }: JThemeProviderProps) => JSX.Element`
  - `useTheme(): { theme: JarvisTheme, setTheme: (t: JarvisTheme) => void, setPreset: (p: JThemePreset) => void }`

- [ ] **Step 1: Write the failing tests**

`packages/jarvis-ui/src/theme/JThemeContext.test.tsx`:
```tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { JThemeProvider, useTheme } from './JThemeContext'
import { PRESETS } from './JarvisTheme'

function ThemeDisplay() {
  const { theme, setPreset, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme-name">{theme.name}</span>
      <span data-testid="theme-accent">{theme.accent}</span>
      <button onClick={() => setPreset('amber')}>Switch Amber</button>
      <button onClick={() => setTheme({ ...PRESETS.green })}>Switch Green</button>
    </div>
  )
}

beforeEach(() => {
  document.getElementById('jarvis-theme-vars')?.remove()
})

describe('JThemeProvider', () => {
  it('renders children', () => {
    render(<JThemeProvider><span>hello</span></JThemeProvider>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('provides cyan theme by default', () => {
    render(<JThemeProvider><ThemeDisplay /></JThemeProvider>)
    expect(screen.getByTestId('theme-name')).toHaveTextContent('Cyan')
    expect(screen.getByTestId('theme-accent')).toHaveTextContent('#00e5ff')
  })

  it('accepts preset prop', () => {
    render(<JThemeProvider preset="amber"><ThemeDisplay /></JThemeProvider>)
    expect(screen.getByTestId('theme-name')).toHaveTextContent('Amber')
    expect(screen.getByTestId('theme-accent')).toHaveTextContent('#f97316')
  })

  it('accepts theme prop', () => {
    render(<JThemeProvider theme={PRESETS.purple}><ThemeDisplay /></JThemeProvider>)
    expect(screen.getByTestId('theme-name')).toHaveTextContent('Purple')
  })

  it('injects <style id="jarvis-theme-vars"> into document.head', () => {
    render(<JThemeProvider><div /></JThemeProvider>)
    const style = document.getElementById('jarvis-theme-vars')
    expect(style).not.toBeNull()
    expect(style?.tagName).toBe('STYLE')
  })

  it('style tag contains --j-accent CSS variable', () => {
    render(<JThemeProvider><div /></JThemeProvider>)
    const style = document.getElementById('jarvis-theme-vars')
    expect(style?.textContent).toContain('--j-accent:')
    expect(style?.textContent).toContain('#00e5ff')
  })

  it('updates style tag when setPreset is called', async () => {
    const user = userEvent.setup()
    render(<JThemeProvider><ThemeDisplay /></JThemeProvider>)
    await user.click(screen.getByText('Switch Amber'))
    const style = document.getElementById('jarvis-theme-vars')
    expect(style?.textContent).toContain('#f97316')
    expect(screen.getByTestId('theme-accent')).toHaveTextContent('#f97316')
  })

  it('updates style tag when setTheme is called', async () => {
    const user = userEvent.setup()
    render(<JThemeProvider><ThemeDisplay /></JThemeProvider>)
    await user.click(screen.getByText('Switch Green'))
    const style = document.getElementById('jarvis-theme-vars')
    expect(style?.textContent).toContain('#22c55e')
  })

  it('reuses existing style tag rather than creating a second one', async () => {
    const user = userEvent.setup()
    render(<JThemeProvider><ThemeDisplay /></JThemeProvider>)
    await user.click(screen.getByText('Switch Amber'))
    await user.click(screen.getByText('Switch Green'))
    const styleTags = document.querySelectorAll('#jarvis-theme-vars')
    expect(styleTags).toHaveLength(1)
  })
})

describe('useTheme', () => {
  it('throws when used outside JThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ThemeDisplay />)).toThrow('useTheme must be used inside JThemeProvider')
    spy.mockRestore()
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd packages/jarvis-ui && pnpm test
```

Expected: FAIL with "Cannot find module './JThemeContext'"

- [ ] **Step 3: Implement JThemeContext.tsx**

`packages/jarvis-ui/src/theme/JThemeContext.tsx`:
```tsx
import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { JarvisTheme, JThemePreset, PRESETS, toCss } from './JarvisTheme'

interface ThemeContextValue {
  theme: JarvisTheme
  setTheme: (theme: JarvisTheme) => void
  setPreset: (preset: JThemePreset) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface JThemeProviderProps {
  children: ReactNode
  preset?: JThemePreset
  theme?: JarvisTheme
}

export function JThemeProvider({ children, preset = 'cyan', theme: initialTheme }: JThemeProviderProps) {
  const [theme, setThemeState] = useState<JarvisTheme>(initialTheme ?? PRESETS[preset])

  useEffect(() => {
    let style = document.getElementById('jarvis-theme-vars') as HTMLStyleElement | null
    if (!style) {
      style = document.createElement('style')
      style.id = 'jarvis-theme-vars'
      document.head.appendChild(style)
    }
    style.textContent = toCss(theme)
  }, [theme])

  const setTheme = (t: JarvisTheme) => setThemeState(t)
  const setPreset = (p: JThemePreset) => setThemeState(PRESETS[p])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, setPreset }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside JThemeProvider')
  return ctx
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
cd packages/jarvis-ui && pnpm test
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/jarvis-ui/src/theme/JThemeContext.tsx packages/jarvis-ui/src/theme/JThemeContext.test.tsx
git commit -m "feat: implement JThemeContext with JThemeProvider and useTheme hook"
```

---

### Task 6: Implement JThemePicker + smoke test

**Files:**
- Create: `packages/jarvis-ui/src/components/theme/JThemePicker.test.tsx`
- Create: `packages/jarvis-ui/src/components/theme/JThemePicker.tsx`

**Interfaces:**
- Consumes: `useTheme()` from `../../theme/JThemeContext`, `PRESETS`, `JThemePreset` from `../../theme/JarvisTheme`
- Produces: `JThemePicker` component — `({ compact?, showCustom? }: JThemePickerProps) => JSX.Element`

> Read `JarvisUI/Components/JThemePicker.razor` before implementing. The React version uses `useTheme()` directly instead of the Blazor `Provider` ref pattern — no cascading parameter needed.

- [ ] **Step 1: Write the smoke tests**

`packages/jarvis-ui/src/components/theme/JThemePicker.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { JThemeProvider } from '../../theme/JThemeContext'
import { JThemePicker } from './JThemePicker'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <JThemeProvider>{children}</JThemeProvider>
}

describe('JThemePicker', () => {
  it('renders without crashing', () => {
    render(<Wrapper><JThemePicker /></Wrapper>)
  })

  it('renders all 6 preset swatch buttons', () => {
    render(<Wrapper><JThemePicker /></Wrapper>)
    const buttons = screen.getAllByRole('button')
    const swatchButtons = buttons.filter(b => b.getAttribute('title'))
    expect(swatchButtons).toHaveLength(6)
    expect(swatchButtons.map(b => b.getAttribute('title'))).toEqual(
      ['Cyan', 'Amber', 'Green', 'Red', 'Purple', 'White']
    )
  })

  it('renders custom accent input when showCustom=true (default)', () => {
    render(<Wrapper><JThemePicker /></Wrapper>)
    const colorInputs = screen.getAllByDisplayValue(/./)
    expect(colorInputs.some(i => i.getAttribute('type') === 'color')).toBe(true)
  })

  it('does not render custom controls when showCustom=false', () => {
    render(<Wrapper><JThemePicker showCustom={false} /></Wrapper>)
    const applyButtons = screen.queryByText(/apply/i)
    expect(applyButtons).toBeNull()
  })

  it('clicking a swatch calls setPreset and updates theme', async () => {
    const user = userEvent.setup()
    function Display() {
      const { theme } = useTheme()
      return <span data-testid="accent">{theme.accent}</span>
    }
    const { useTheme } = await import('../../theme/JThemeContext')
    render(
      <JThemeProvider>
        <JThemePicker />
        <Display />
      </JThemeProvider>
    )
    const amberSwatch = screen.getByTitle('Amber')
    await user.click(amberSwatch)
    expect(screen.getByTestId('accent')).toHaveTextContent('#f97316')
  })

  it('compact mode renders smaller swatch buttons without labels', () => {
    render(<Wrapper><JThemePicker compact /></Wrapper>)
    const buttons = screen.getAllByRole('button').filter(b => b.getAttribute('title'))
    // In compact mode, no label text spans inside buttons
    buttons.forEach(b => {
      expect(b.querySelector('span')).toBeNull()
    })
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd packages/jarvis-ui && pnpm test
```

Expected: FAIL with "Cannot find module './JThemePicker'"

- [ ] **Step 3: Implement JThemePicker.tsx**

`packages/jarvis-ui/src/components/theme/JThemePicker.tsx`:
```tsx
import { useState } from 'react'
import { useTheme } from '../../theme/JThemeContext'
import { PRESETS, JThemePreset } from '../../theme/JarvisTheme'

interface JThemePickerProps {
  compact?: boolean
  showCustom?: boolean
}

const SWATCH_COLORS: Record<JThemePreset, string> = {
  cyan:   '#00e5ff',
  amber:  '#f97316',
  green:  '#22c55e',
  red:    '#ef4444',
  purple: '#a855f7',
  white:  '#0891b2',
}

const PRESET_LABELS: Record<JThemePreset, string> = {
  cyan:   'Cyan',
  amber:  'Amber',
  green:  'Green',
  red:    'Red',
  purple: 'Purple',
  white:  'White',
}

export function JThemePicker({ compact = false, showCustom = true }: JThemePickerProps) {
  const { theme, setPreset, setTheme } = useTheme()
  const [customAccent, setCustomAccent] = useState(theme.accent)
  const [customBg, setCustomBg] = useState(theme.bg)
  const [customCard, setCustomCard] = useState(theme.bgCard)

  const presets = Object.keys(PRESETS) as JThemePreset[]
  const swatchSize = compact ? 20 : 48
  const swatchH = compact ? 20 : 32
  const notch = compact ? 4 : 6

  return (
    <div style={{ fontFamily: "'Courier New', monospace", padding: compact ? 0 : '12px 14px' }}>
      {!compact && (
        <div style={{ fontSize: 9, color: 'var(--j-accent-70)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
          Theme
        </div>
      )}

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {presets.map((preset) => {
          const active = theme.preset === preset
          const color = SWATCH_COLORS[preset]
          return (
            <button
              key={preset}
              title={PRESET_LABELS[preset]}
              onClick={() => setPreset(preset)}
              style={{
                width: swatchSize,
                height: swatchH,
                background: color,
                border: `2px solid ${active ? 'var(--j-text-primary)' : 'transparent'}`,
                boxShadow: active ? `0 0 12px ${color}` : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                clipPath: `polygon(${notch}px 0,100% 0,calc(100% - ${notch}px) 100%,0 100%)`,
                transition: 'all .15s',
              }}
            >
              {!compact && (
                <span style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: active ? 'var(--j-bg)' : color, marginTop: 2 }}>
                  {PRESET_LABELS[preset]}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {showCustom && !compact && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 9, color: 'var(--j-accent-70)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 2 }}>
            Custom accent
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="color"
              value={customAccent}
              onChange={(e) => setCustomAccent(e.target.value)}
              style={{ width: 36, height: 28, background: 'transparent', border: '1px solid var(--j-border)', cursor: 'pointer', clipPath: 'polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)' }}
            />
            <span style={{ fontSize: 10, color: 'var(--j-text-muted)' }}>{customAccent}</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 8, color: 'var(--j-text-dim)', marginBottom: 3 }}>Background</div>
              <input type="color" value={customBg} onChange={(e) => setCustomBg(e.target.value)} style={{ width: '100%', height: 24, background: 'transparent', border: '1px solid var(--j-border)', cursor: 'pointer' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 8, color: 'var(--j-text-dim)', marginBottom: 3 }}>Card</div>
              <input type="color" value={customCard} onChange={(e) => setCustomCard(e.target.value)} style={{ width: '100%', height: 24, background: 'transparent', border: '1px solid var(--j-border)', cursor: 'pointer' }} />
            </div>
          </div>
          <button
            onClick={() => setTheme({
              ...theme,
              name: 'Custom',
              accent: customAccent, accentMid: customAccent,
              accentDim: customAccent, accentDeep: customAccent,
              bg: customBg, bgCard: customCard, bgCardAlt: customCard,
            })}
            style={{ padding: '7px 14px', background: 'var(--j-accent-12)', border: '1px solid var(--j-border)', color: 'var(--j-accent)', fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', cursor: 'pointer', clipPath: 'polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)' }}
          >
            Apply Custom
          </button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
cd packages/jarvis-ui && pnpm test
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/jarvis-ui/src/components/
git commit -m "feat: implement JThemePicker with 6 preset swatches and custom color inputs"
```

---

### Task 7: Configure barrel export + Vite library build

**Files:**
- Create: `packages/jarvis-ui/src/index.ts`

**Interfaces:**
- Produces: `dist/jarvis-ui.es.js`, `dist/jarvis-ui.cjs.js`, `dist/jarvis-ui.css`, `dist/index.d.ts`
- Consumers import: `import { JThemeProvider, JThemePicker, useTheme } from 'jarvis-ui'` and `import 'jarvis-ui/styles'`

- [ ] **Step 1: Create barrel export**

`packages/jarvis-ui/src/index.ts`:
```ts
// Styles — consumers import once: import 'jarvis-ui/styles'
import './styles/jarvis-theme.css'
import './styles/jarvis-ui.css'
import './styles/jarvis-charts.css'
import './styles/jarvis-maps.css'

// Theme system
export type { JarvisTheme, JThemePreset } from './theme/JarvisTheme'
export { PRESETS, toCss } from './theme/JarvisTheme'
export type { JColor, JSize, JVariant, JState, JAnimSpeed, JCardStyle, JButtonShape } from './theme/JarvisTokens'
export { JarvisTokens } from './theme/JarvisTokens'
export { JThemeProvider, useTheme } from './theme/JThemeContext'

// Components — theme
export { JThemePicker } from './components/theme/JThemePicker'
```

- [ ] **Step 2: Run the library build**

```bash
cd packages/jarvis-ui && pnpm build
```

Expected output (no errors):
```
dist/jarvis-ui.es.js       (ES module)
dist/jarvis-ui.cjs.js      (CommonJS)
dist/jarvis-ui.css         (all 4 CSS files merged)
dist/index.d.ts            (TypeScript declarations)
```

If you see TypeScript errors about unused variables, add `// eslint-disable-next-line` comments or adjust tsconfig.

- [ ] **Step 3: Verify dist output**

```bash
ls packages/jarvis-ui/dist/
```

Expected: 4+ files including `jarvis-ui.es.js`, `jarvis-ui.cjs.js`, `jarvis-ui.css`, `index.d.ts`.

- [ ] **Step 4: Commit**

```bash
git add packages/jarvis-ui/src/index.ts
git commit -m "feat: add barrel export and verify Vite library build produces dist output"
```

---

### Task 8: Scaffold apps/docs and verify end-to-end

**Files:**
- Create: `apps/docs/package.json`
- Create: `apps/docs/vite.config.ts`
- Create: `apps/docs/tailwind.config.ts`
- Create: `apps/docs/tsconfig.json`
- Create: `apps/docs/index.html`
- Create: `apps/docs/src/main.tsx`
- Create: `apps/docs/src/App.tsx`

**Interfaces:**
- Consumes: `jarvis-ui` via pnpm workspace symlink (`workspace:*`)
- Produces: running Vite app at `http://localhost:5174` with live theme picker

- [ ] **Step 1: Create docs app package files**

`apps/docs/package.json`:
```json
{
  "name": "docs",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "jarvis-ui": "workspace:*",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.5.3",
    "vite": "^5.4.10"
  }
}
```

`apps/docs/vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: { plugins: [tailwindcss, autoprefixer] },
  },
  server: { port: 5174 },
})
```

`apps/docs/tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: { extend: {} },
  plugins: [],
} satisfies Config
```

`apps/docs/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

- [ ] **Step 2: Create HTML entry and React entry**

`apps/docs/index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JarvisUI Docs</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`apps/docs/src/main.tsx`:
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { JThemeProvider } from 'jarvis-ui'
import 'jarvis-ui/styles'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JThemeProvider preset="cyan">
      <App />
    </JThemeProvider>
  </React.StrictMode>
)
```

`apps/docs/src/App.tsx`:
```tsx
import { JThemePicker, useTheme } from 'jarvis-ui'

function ThemeInfo() {
  const { theme } = useTheme()
  return (
    <div style={{ fontSize: 10, color: 'var(--j-text-muted)', letterSpacing: '0.08em', marginTop: 16 }}>
      ACTIVE: {theme.name.toUpperCase()} — ACCENT: {theme.accent}
    </div>
  )
}

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--j-bg)',
      color: 'var(--j-text-primary)',
      fontFamily: "'Courier New', 'Lucida Console', monospace",
      padding: 32,
    }}>
      <div style={{ fontSize: 22, color: 'var(--j-accent)', letterSpacing: '0.16em', marginBottom: 4 }}>
        JARVIS UI
      </div>
      <div style={{ fontSize: 10, color: 'var(--j-text-muted)', letterSpacing: '0.12em', marginBottom: 32 }}>
        REACT COMPONENT LIBRARY — PHASE 1 FOUNDATION
      </div>

      <div style={{ border: '1px solid var(--j-border)', padding: 16, maxWidth: 320 }}>
        <JThemePicker />
      </div>

      <ThemeInfo />
    </div>
  )
}
```

- [ ] **Step 3: Install workspace deps and run**

From `HUDtheme/` root:
```bash
pnpm install
pnpm dev:docs
```

Expected: Vite starts at `http://localhost:5174`. Browser shows:
- Dark HUD background (`#020d18`)
- "JARVIS UI" title in cyan (`#00e5ff`)
- Theme picker with 6 coloured swatches
- Clicking a swatch instantly changes the background and accent colours
- "ACTIVE ACCENT" line updates to reflect the selected theme

If `jarvis-ui/styles` import fails, run `pnpm build:lib` first to generate `dist/`.

> **Note for dev:** In development the docs app imports from the `packages/jarvis-ui/src/` source directly via pnpm workspace resolution. For production use `pnpm build:lib` then `pnpm build:docs`.

- [ ] **Step 4: Commit**

```bash
git add apps/docs/
git commit -m "feat: scaffold docs app and verify end-to-end theme switching works"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by |
|---|---|
| pnpm workspace monorepo | Task 1 |
| 4 CSS files copied verbatim from Blazor | Task 2 |
| JarvisTheme type + 6 presets + toCss() | Task 3 |
| JarvisTokens enum resolvers | Task 4 |
| JThemeProvider React context + useTheme hook | Task 5 |
| JThemePicker — 6 swatches + custom color inputs | Task 6 |
| Vite library build (ESM + CJS) | Task 7 |
| package.json exports (`.` and `./styles`) | Task 1 + 7 |
| apps/docs scaffold | Task 8 |
| Tailwind configured in both packages | Task 1 + 8 |
| TypeScript declarations output | Task 7 (vite-plugin-dts) |

**Placeholder scan:** No TBD, TODO, or incomplete steps found.

**Type consistency check:**
- `JThemeProvider` in Task 5 accepts `preset?: JThemePreset` and `theme?: JarvisTheme` — matches what `main.tsx` in Task 8 passes
- `useTheme()` returns `{ theme, setTheme, setPreset }` — matches what `JThemePicker` and `ThemeInfo` consume in Tasks 6 and 8
- `PRESETS` in Task 3 is `Record<JThemePreset, JarvisTheme>` — `JThemeProvider` reads `PRESETS[preset]` in Task 5 ✓
- `toCss` signature: `(t: JarvisTheme) => string` — called with `theme` (a `JarvisTheme`) in Task 5 ✓
- Button shape `BracketFrame` → `j-btn-bracket` — test and implementation agree ✓
