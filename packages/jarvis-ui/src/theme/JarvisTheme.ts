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
