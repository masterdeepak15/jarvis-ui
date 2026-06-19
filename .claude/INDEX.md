# JarvisUI React — AI Memory Index
> Updated: 2026-06-19 | Session #1

## What Is This?
A React + TypeScript port of `Jarvis_theme_Blazer_v1` — a HUD-themed UI component library with 55+ components, 6 color presets, and full runtime theme customisation. Ships as npm package `jarvis-ui` with a companion Vite demo/docs app in the same pnpm workspace monorepo.

**Stack:** React 18 + TypeScript | Vite | Tailwind CSS | pnpm workspaces | Recharts | react-leaflet | @react-google-maps/api

---

## 🗂️ Memory Files

| File | Purpose | Read When |
|---|---|---|
| [AGENT.md](AGENT.md) | Rules + live project state | Every session — mandatory |
| [SESSION.md](SESSION.md) | Current session progress | Every session — mandatory |
| [TASKS.md](TASKS.md) | Task queue (backlog/active/done) | Picking up work |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design + components | Understanding the system |
| [CODEBASE_MAP.md](CODEBASE_MAP.md) | Annotated file tree + key functions | Navigating code |
| [DECISIONS.md](DECISIONS.md) | ADR log — technical decisions | Before changing architecture |
| [CONTEXT/frontend.md](CONTEXT/frontend.md) | Component library patterns + theming | Any component work |

---

## 📋 Current Status
**Active Task:** Design complete — ready to start implementation (T-1: scaffold monorepo)  
**Last Session:** 2026-06-19 — Design spec written, .claude/ memory initialized  
**Open Tasks:** 61 backlog | 0 active | 0 blocked

---

## ⚡ Quick Start For New Agents
1. Read this file ✓
2. Read `AGENT.md` → understand rules + **The Golden Rule** (read Blazor file before every component)
3. Read `SESSION.md` → see exactly what's in progress and next steps
4. Read `TASKS.md` → pick up from T-1 (scaffold pnpm workspace monorepo)
5. Read `CONTEXT/frontend.md` → understand component patterns before writing any TSX
6. Start — update `SESSION.md` immediately

---

## 🗺️ Key Paths

| What | Path |
|---|---|
| Blazor source (read before every component) | `D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\` |
| Blazor CSS files (copy verbatim) | `D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI\wwwroot\css\` |
| Blazor GeoJSON files (copy to library) | `D:\Claude\HUD Theme\Jarvis_theme_Blazer_v1\JarvisUI.Docs\wwwroot\geo\` |
| React library (build here) | `D:\Claude\HUD Theme\HUDtheme\packages\jarvis-ui\` |
| React demo app (build here) | `D:\Claude\HUD Theme\HUDtheme\apps\docs\` |
| Design spec | `docs/superpowers/specs/2026-06-19-jarvis-ui-react-design.md` |
