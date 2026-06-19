import { jsx as n, jsxs as s } from "react/jsx-runtime";
import { createContext as S, useState as u, useEffect as w, useContext as P } from "react";
function b(e) {
  let r = e.replace("#", "");
  r.length === 3 && (r = r[0] + r[0] + r[1] + r[1] + r[2] + r[2]);
  const t = parseInt(r.slice(0, 2), 16), a = parseInt(r.slice(2, 4), 16), c = parseInt(r.slice(4, 6), 16);
  return `${t},${a},${c}`;
}
function k(e) {
  let r = e.replace("#", "");
  r.length === 3 && (r = r[0] + r[0] + r[1] + r[1] + r[2] + r[2]);
  const t = Math.max(0, parseInt(r.slice(0, 2), 16) - 4), a = Math.max(0, parseInt(r.slice(2, 4), 16) - 2), c = Math.max(0, parseInt(r.slice(4, 6), 16) - 2);
  return `#${t.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${c.toString(16).padStart(2, "0")}`;
}
function T(e) {
  const r = b(e.accent), t = b(e.warn), a = b(e.err), c = b(e.ok), l = b(e.bg);
  return `:root {
  --j-accent:       ${e.accent};
  --j-accent-mid:   ${e.accentMid};
  --j-accent-dim:   ${e.accentDim};
  --j-accent-deep:  ${e.accentDeep};

  --j-accent-05:    rgba(${r}, 0.05);
  --j-accent-08:    rgba(${r}, 0.08);
  --j-accent-12:    rgba(${r}, 0.12);
  --j-accent-18:    rgba(${r}, 0.18);
  --j-accent-25:    rgba(${r}, 0.25);
  --j-accent-35:    rgba(${r}, 0.35);
  --j-accent-50:    rgba(${r}, 0.50);
  --j-accent-70:    rgba(${r}, 0.70);

  --j-warn:         ${e.warn};
  --j-warn-05:      rgba(${t}, 0.05);
  --j-warn-12:      rgba(${t}, 0.12);
  --j-warn-25:      rgba(${t}, 0.25);
  --j-warn-50:      rgba(${t}, 0.50);

  --j-err:          ${e.err};
  --j-err-05:       rgba(${a}, 0.05);
  --j-err-12:       rgba(${a}, 0.12);
  --j-err-25:       rgba(${a}, 0.25);
  --j-err-50:       rgba(${a}, 0.50);

  --j-ok:           ${e.ok};
  --j-ok-05:        rgba(${c}, 0.05);
  --j-ok-12:        rgba(${c}, 0.12);
  --j-ok-25:        rgba(${c}, 0.25);

  --j-bg:           ${e.bg};
  --j-bg-card:      ${e.bgCard};
  --j-bg-card-alt:  ${e.bgCardAlt};
  --j-bg-danger:    ${k(e.bg)};
  --j-bg-overlay:   rgba(${l},0.92);

  --j-text-primary:   ${e.textPrimary};
  --j-text-secondary: ${e.textSecondary};
  --j-text-muted:     ${e.textMuted};
  --j-text-dim:       ${e.textDim};

  --j-border-dim:   rgba(${r}, 0.07);
  --j-border:       rgba(${r}, 0.18);
  --j-border-mid:   rgba(${r}, 0.35);
  --j-border-full:  rgba(${r}, 0.70);

  --j-dur-scan:     ${e.durScan};
  --j-dur-pulse:    ${e.durPulse};
  --j-dur-spin:     ${e.durSpin};
  --j-dur-shine:    ${e.durShine};
  --j-dur-corner:   ${e.durCorner};

  --j-notch:        ${e.notch};
  --j-notch-lg:     ${e.notchLg};
  --j-rail-w:       ${e.railW};
}`;
}
const d = {
  accent: "#00e5ff",
  accentMid: "#22d3ee",
  accentDim: "#0e7490",
  accentDeep: "#0891b2",
  warn: "#f97316",
  err: "#ef4444",
  ok: "#22c55e",
  bg: "#020d18",
  bgCard: "#030f1e",
  bgCardAlt: "#04111f",
  textPrimary: "#e0f7ff",
  textSecondary: "#94a3b8",
  textMuted: "#475569",
  textDim: "#334155",
  durScan: "3.5s",
  durPulse: "2.8s",
  durSpin: "4s",
  durShine: "2.4s",
  durCorner: "3.0s",
  notch: "14px",
  notchLg: "20px",
  railW: "3px"
}, j = {
  cyan: { name: "Cyan", preset: "cyan", ...d },
  amber: {
    name: "Amber",
    preset: "amber",
    ...d,
    accent: "#f97316",
    accentMid: "#fb923c",
    accentDim: "#c2410c",
    accentDeep: "#9a3412",
    bg: "#0f0800",
    bgCard: "#160c02",
    bgCardAlt: "#1a1004",
    textPrimary: "#fff7ed"
  },
  green: {
    name: "Green",
    preset: "green",
    ...d,
    accent: "#22c55e",
    accentMid: "#4ade80",
    accentDim: "#15803d",
    accentDeep: "#166534",
    bg: "#010f04",
    bgCard: "#021308",
    bgCardAlt: "#03180a",
    textPrimary: "#f0fdf4"
  },
  red: {
    name: "Red",
    preset: "red",
    ...d,
    accent: "#ef4444",
    accentMid: "#f87171",
    accentDim: "#b91c1c",
    accentDeep: "#991b1b",
    bg: "#0f0002",
    bgCard: "#160205",
    bgCardAlt: "#1a0306",
    textPrimary: "#fff1f2"
  },
  purple: {
    name: "Purple",
    preset: "purple",
    ...d,
    accent: "#a855f7",
    accentMid: "#c084fc",
    accentDim: "#7c3aed",
    accentDeep: "#6d28d9",
    bg: "#050010",
    bgCard: "#080018",
    bgCardAlt: "#0a001e",
    textPrimary: "#faf5ff"
  },
  white: {
    name: "White",
    preset: "white",
    ...d,
    accent: "#0891b2",
    accentMid: "#06b6d4",
    accentDim: "#0e7490",
    accentDeep: "#164e63",
    bg: "#f0f9ff",
    bgCard: "#ffffff",
    bgCardAlt: "#f8fafc",
    textPrimary: "#0c1a2e",
    textSecondary: "#334155",
    textMuted: "#64748b",
    textDim: "#94a3b8",
    warn: "#d97706",
    err: "#dc2626",
    ok: "#16a34a"
  }
}, D = {
  CornerBracket: "j-card-s1",
  Notched: "j-card-s2",
  SideRail: "j-card-s3",
  GlowBorder: "j-card-s4",
  PartialBorder: "j-card-s5",
  DangerPulse: "j-card-s6",
  Hexagonal: "j-card-s7",
  Radar: "j-card-s8",
  DoubleFrame: "j-card-s9"
}, A = {
  LeftNotch: "j-btn-left-notch",
  RightNotch: "j-btn-right-notch",
  BothNotch: "j-btn-both-notch",
  Parallelogram: "j-btn-parallelogram",
  GhostSkew: "j-btn-ghost-skew",
  BracketFrame: "j-btn-bracket",
  Hexagonal: "j-btn-hex",
  IconSquare: "j-btn-icon-sq",
  ScanFull: "j-btn-scan-full"
}, I = {
  color: (e) => e ? `j-color-${e}` : "",
  size: (e) => e ? `j-size-${e}` : "",
  variant: (e) => e ? `j-variant-${e}` : "",
  state: (e) => e ? `j-state-${e}` : "",
  animSpeed: (e) => e ? `j-anim-${e}` : "",
  cardStyle: (e) => e ? D[e] : "",
  buttonShape: (e) => e ? A[e] : "",
  cls: (...e) => e.filter(Boolean).join(" ")
}, h = S(null);
function R({ children: e, preset: r = "cyan", theme: t }) {
  const [a, c] = u(t ?? j[r]);
  w(() => {
    let o = document.getElementById("jarvis-theme-vars");
    o || (o = document.createElement("style"), o.id = "jarvis-theme-vars", document.head.appendChild(o)), o.textContent = T(a);
  }, [a]);
  const l = (o) => c(o), x = (o) => c(j[o]);
  return /* @__PURE__ */ n(h.Provider, { value: { theme: a, setTheme: l, setPreset: x }, children: e });
}
function B() {
  const e = P(h);
  if (!e) throw new Error("useTheme must be used inside JThemeProvider");
  return e;
}
const M = [
  { preset: "cyan", color: "var(--j-accent)", label: "Cyan" },
  { preset: "amber", color: "var(--j-warn)", label: "Amber" },
  { preset: "green", color: "var(--j-ok)", label: "Green" },
  { preset: "red", color: "var(--j-err)", label: "Red" },
  { preset: "purple", color: "#a855f7", label: "Purple" },
  { preset: "white", color: "var(--j-accent-deep)", label: "White" }
];
function N({ compact: e = !1, showCustom: r = !0 }) {
  const { theme: t, setPreset: a, setTheme: c } = B(), [l, x] = u(t.accent), [o, y] = u(t.bg), [f, $] = u(t.bgCard);
  function C(i, p) {
    const m = e ? "20px" : "48px", g = e ? "4px" : "6px";
    return {
      width: m,
      height: e ? "20px" : "32px",
      background: i,
      border: `2px solid ${p ? "var(--j-text-primary)" : "transparent"}`,
      boxShadow: p ? `0 0 12px ${i}` : "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      clipPath: `polygon(${g} 0,100% 0,calc(100% - ${g}) 100%,0 100%)`,
      transition: "all .15s"
    };
  }
  function v() {
    c({
      ...t,
      name: "Custom",
      preset: "cyan",
      accent: l,
      accentMid: l,
      accentDim: l,
      bg: o,
      bgCard: f,
      bgCardAlt: f
    });
  }
  return /* @__PURE__ */ s("div", { style: {
    fontFamily: "'Courier New', monospace",
    padding: e ? "0" : "12px 14px"
  }, children: [
    !e && /* @__PURE__ */ n("div", { style: {
      fontSize: "9px",
      color: "var(--j-accent-70)",
      letterSpacing: ".14em",
      textTransform: "uppercase",
      marginBottom: "8px"
    }, children: "Theme" }),
    /* @__PURE__ */ n("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" }, children: M.map(({ preset: i, color: p, label: m }) => {
      const g = t.preset === i;
      return /* @__PURE__ */ n(
        "button",
        {
          title: m,
          onClick: () => a(i),
          style: C(p, g),
          children: !e && /* @__PURE__ */ n("span", { style: {
            fontSize: "9px",
            fontFamily: "'Courier New', monospace",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: g ? "var(--j-bg)" : p,
            marginTop: "2px"
          }, children: m })
        },
        i
      );
    }) }),
    r && !e && /* @__PURE__ */ s("div", { style: { marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }, children: [
      /* @__PURE__ */ n("div", { style: {
        fontSize: "9px",
        color: "var(--j-accent-70)",
        letterSpacing: ".14em",
        textTransform: "uppercase",
        marginBottom: "2px"
      }, children: "Custom accent" }),
      /* @__PURE__ */ s("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
        /* @__PURE__ */ n(
          "input",
          {
            type: "color",
            value: l,
            onChange: (i) => x(i.target.value),
            style: {
              width: "36px",
              height: "28px",
              background: "transparent",
              border: "1px solid var(--j-border)",
              cursor: "pointer",
              clipPath: "polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)"
            }
          }
        ),
        /* @__PURE__ */ n("span", { style: {
          fontSize: "10px",
          color: "var(--j-text-muted)",
          fontFamily: "'Courier New', monospace"
        }, children: l })
      ] }),
      /* @__PURE__ */ s("div", { style: { display: "flex", gap: "6px" }, children: [
        /* @__PURE__ */ s("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ n("div", { style: { fontSize: "8px", color: "var(--j-text-dim)", marginBottom: "3px" }, children: "Background" }),
          /* @__PURE__ */ n(
            "input",
            {
              type: "color",
              value: o,
              onChange: (i) => y(i.target.value),
              style: {
                width: "100%",
                height: "24px",
                background: "transparent",
                border: "1px solid var(--j-border)",
                cursor: "pointer"
              }
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ n("div", { style: { fontSize: "8px", color: "var(--j-text-dim)", marginBottom: "3px" }, children: "Card" }),
          /* @__PURE__ */ n(
            "input",
            {
              type: "color",
              value: f,
              onChange: (i) => $(i.target.value),
              style: {
                width: "100%",
                height: "24px",
                background: "transparent",
                border: "1px solid var(--j-border)",
                cursor: "pointer"
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ n(
        "button",
        {
          onClick: v,
          style: {
            padding: "7px 14px",
            background: "var(--j-accent-12)",
            border: "1px solid var(--j-border)",
            color: "var(--j-accent)",
            fontFamily: "'Courier New', monospace",
            fontSize: "10px",
            letterSpacing: ".10em",
            textTransform: "uppercase",
            cursor: "pointer",
            clipPath: "polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)"
          },
          children: "Apply Custom"
        }
      )
    ] })
  ] });
}
export {
  N as JThemePicker,
  R as JThemeProvider,
  I as JarvisTokens,
  j as PRESETS,
  T as toCss,
  B as useTheme
};
