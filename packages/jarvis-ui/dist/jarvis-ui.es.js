import { jsx as o, jsxs as g, Fragment as z } from "react/jsx-runtime";
import O, { useState as W, useEffect as K, useContext as qe, createContext as Le, useCallback as q, useRef as U, useLayoutEffect as ea, useMemo as Re, Children as ta, isValidElement as na, useId as Fn } from "react";
import { createPortal as ra } from "react-dom";
function Te(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
  const n = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), a = parseInt(t.slice(4, 6), 16);
  return `${n},${r},${a}`;
}
function aa(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
  const n = Math.max(0, parseInt(t.slice(0, 2), 16) - 4), r = Math.max(0, parseInt(t.slice(2, 4), 16) - 2), a = Math.max(0, parseInt(t.slice(4, 6), 16) - 2);
  return `#${n.toString(16).padStart(2, "0")}${r.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`;
}
function oa(e) {
  const t = Te(e.accent), n = Te(e.warn), r = Te(e.err), a = Te(e.ok), i = Te(e.bg);
  return `:root {
  --j-accent:       ${e.accent};
  --j-accent-mid:   ${e.accentMid};
  --j-accent-dim:   ${e.accentDim};
  --j-accent-deep:  ${e.accentDeep};

  --j-accent-05:    rgba(${t}, 0.05);
  --j-accent-08:    rgba(${t}, 0.08);
  --j-accent-12:    rgba(${t}, 0.12);
  --j-accent-18:    rgba(${t}, 0.18);
  --j-accent-25:    rgba(${t}, 0.25);
  --j-accent-35:    rgba(${t}, 0.35);
  --j-accent-50:    rgba(${t}, 0.50);
  --j-accent-70:    rgba(${t}, 0.70);

  --j-warn:         ${e.warn};
  --j-warn-05:      rgba(${n}, 0.05);
  --j-warn-12:      rgba(${n}, 0.12);
  --j-warn-25:      rgba(${n}, 0.25);
  --j-warn-50:      rgba(${n}, 0.50);

  --j-err:          ${e.err};
  --j-err-05:       rgba(${r}, 0.05);
  --j-err-12:       rgba(${r}, 0.12);
  --j-err-25:       rgba(${r}, 0.25);
  --j-err-50:       rgba(${r}, 0.50);

  --j-ok:           ${e.ok};
  --j-ok-05:        rgba(${a}, 0.05);
  --j-ok-12:        rgba(${a}, 0.12);
  --j-ok-25:        rgba(${a}, 0.25);

  --j-bg:           ${e.bg};
  --j-bg-card:      ${e.bgCard};
  --j-bg-card-alt:  ${e.bgCardAlt};
  --j-bg-danger:    ${aa(e.bg)};
  --j-bg-overlay:   rgba(${i},0.92);

  --j-text-primary:   ${e.textPrimary};
  --j-text-secondary: ${e.textSecondary};
  --j-text-muted:     ${e.textMuted};
  --j-text-dim:       ${e.textDim};

  --j-border-dim:   rgba(${t}, 0.07);
  --j-border:       rgba(${t}, 0.18);
  --j-border-mid:   rgba(${t}, 0.35);
  --j-border-full:  rgba(${t}, 0.70);

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
const ke = {
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
  textSecondary: "#b8cfe0",
  textMuted: "#8aaabb",
  textDim: "#4e6070",
  durScan: "3.5s",
  durPulse: "2.8s",
  durSpin: "4s",
  durShine: "2.4s",
  durCorner: "3.0s",
  notch: "14px",
  notchLg: "20px",
  railW: "3px"
}, Ct = {
  cyan: { name: "Cyan", preset: "cyan", ...ke },
  amber: {
    name: "Amber",
    preset: "amber",
    ...ke,
    accent: "#f97316",
    accentMid: "#fb923c",
    accentDim: "#c2410c",
    accentDeep: "#9a3412",
    bg: "#0f0800",
    bgCard: "#160c02",
    bgCardAlt: "#1a1004",
    textPrimary: "#fff7ed",
    textSecondary: "#ffe0bc",
    textMuted: "#c49060",
    textDim: "#7a5030"
  },
  green: {
    name: "Green",
    preset: "green",
    ...ke,
    accent: "#22c55e",
    accentMid: "#4ade80",
    accentDim: "#15803d",
    accentDeep: "#166534",
    bg: "#010f04",
    bgCard: "#021308",
    bgCardAlt: "#03180a",
    textPrimary: "#f0fdf4",
    textSecondary: "#c0f0cc",
    textMuted: "#70b080",
    textDim: "#3a6040"
  },
  red: {
    name: "Red",
    preset: "red",
    ...ke,
    accent: "#ef4444",
    accentMid: "#f87171",
    accentDim: "#b91c1c",
    accentDeep: "#991b1b",
    bg: "#0f0002",
    bgCard: "#160205",
    bgCardAlt: "#1a0306",
    textPrimary: "#fff1f2",
    textSecondary: "#ffd0cc",
    textMuted: "#c07068",
    textDim: "#703030"
  },
  purple: {
    name: "Purple",
    preset: "purple",
    ...ke,
    accent: "#a855f7",
    accentMid: "#c084fc",
    accentDim: "#7c3aed",
    accentDeep: "#6d28d9",
    bg: "#050010",
    bgCard: "#080018",
    bgCardAlt: "#0a001e",
    textPrimary: "#faf5ff",
    textSecondary: "#e0c8ff",
    textMuted: "#9870c0",
    textDim: "#504070"
  },
  white: {
    name: "White",
    preset: "white",
    ...ke,
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
}, ia = {
  CornerBracket: "j-card-s1",
  Notched: "j-card-s2",
  SideRail: "j-card-s3",
  GlowBorder: "j-card-s4",
  PartialBorder: "j-card-s5",
  DangerPulse: "j-card-s6",
  Hexagonal: "j-card-s7",
  Radar: "j-card-s8",
  DoubleFrame: "j-card-s9"
}, sa = {
  LeftNotch: "j-btn-left-notch",
  RightNotch: "j-btn-right-notch",
  BothNotch: "j-btn-both-notch",
  Parallelogram: "j-btn-parallelogram",
  GhostSkew: "j-btn-ghost-skew",
  BracketFrame: "j-btn-bracket",
  Hexagonal: "j-btn-hex",
  IconSquare: "j-btn-icon-sq",
  ScanFull: "j-btn-scan-full"
}, H = {
  color: (e) => e ? `j-color-${e}` : "",
  size: (e) => e ? `j-size-${e}` : "",
  variant: (e) => e ? `j-variant-${e}` : "",
  state: (e) => e ? `j-state-${e}` : "",
  animSpeed: (e) => e ? `j-anim-${e}` : "",
  cardStyle: (e) => e ? ia[e] : "",
  buttonShape: (e) => e ? sa[e] : "",
  cls: (...e) => e.filter(Boolean).join(" ")
}, An = Le(null);
function Nc({ children: e, preset: t = "cyan", theme: n }) {
  const [r, a] = W(n ?? Ct[t]);
  K(() => {
    let c = document.getElementById("jarvis-theme-vars");
    c || (c = document.createElement("style"), c.id = "jarvis-theme-vars", document.head.appendChild(c)), c.textContent = oa(r);
  }, [r]);
  const i = (c) => a(c), s = (c) => a(Ct[c]);
  return /* @__PURE__ */ o(An.Provider, { value: { theme: r, setTheme: i, setPreset: s }, children: e });
}
function ca() {
  const e = qe(An);
  if (!e) throw new Error("useTheme must be used inside JThemeProvider");
  return e;
}
const la = [
  { preset: "cyan", color: "var(--j-accent)", label: "Cyan" },
  { preset: "amber", color: "var(--j-warn)", label: "Amber" },
  { preset: "green", color: "var(--j-ok)", label: "Green" },
  { preset: "red", color: "var(--j-err)", label: "Red" },
  { preset: "purple", color: Ct.purple.accent, label: "Purple" },
  { preset: "white", color: "var(--j-accent-deep)", label: "White" }
];
function Mc({ compact: e = !1, showCustom: t = !0 }) {
  const { theme: n, setPreset: r, setTheme: a } = ca(), [i, s] = W(!1), [c, l] = W(n.accent), [d, h] = W(n.bg), [u, f] = W(n.bgCard);
  function m(v, w) {
    const y = e ? "20px" : "48px", j = e ? "4px" : "6px";
    return {
      width: y,
      height: e ? "20px" : "32px",
      background: v,
      border: `2px solid ${w ? "var(--j-text-primary)" : "transparent"}`,
      boxShadow: w ? `0 0 12px ${v}` : "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      clipPath: `polygon(${j} 0,100% 0,calc(100% - ${j}) 100%,0 100%)`,
      transition: "all .15s"
    };
  }
  function b() {
    s(!0), a({
      ...n,
      name: "Custom",
      preset: "cyan",
      accent: c,
      accentMid: c,
      accentDim: c,
      bg: d,
      bgCard: u,
      bgCardAlt: u
    });
  }
  return /* @__PURE__ */ g("div", { style: {
    fontFamily: "'Courier New', monospace",
    padding: e ? "0" : "12px 14px"
  }, children: [
    !e && /* @__PURE__ */ o("div", { style: {
      fontSize: "9px",
      color: "var(--j-accent-70)",
      letterSpacing: ".14em",
      textTransform: "uppercase",
      marginBottom: "8px"
    }, children: "Theme" }),
    /* @__PURE__ */ o("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" }, children: la.map(({ preset: v, color: w, label: y }) => {
      const j = !i && n.preset === v;
      return /* @__PURE__ */ o(
        "button",
        {
          title: y,
          "aria-pressed": j,
          onClick: () => {
            s(!1), r(v);
          },
          style: m(w, j),
          children: !e && /* @__PURE__ */ o("span", { style: {
            fontSize: "9px",
            fontFamily: "'Courier New', monospace",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: j ? "var(--j-bg)" : w,
            marginTop: "2px"
          }, children: y })
        },
        v
      );
    }) }),
    t && !e && /* @__PURE__ */ g("div", { style: { marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }, children: [
      /* @__PURE__ */ o("div", { style: {
        fontSize: "9px",
        color: "var(--j-accent-70)",
        letterSpacing: ".14em",
        textTransform: "uppercase",
        marginBottom: "2px"
      }, children: "Custom accent" }),
      /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "color",
            value: c,
            onChange: (v) => l(v.target.value),
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
        /* @__PURE__ */ o("span", { style: {
          fontSize: "10px",
          color: "var(--j-text-muted)",
          fontFamily: "'Courier New', monospace"
        }, children: c })
      ] }),
      /* @__PURE__ */ g("div", { style: { display: "flex", gap: "6px" }, children: [
        /* @__PURE__ */ g("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ o("div", { style: { fontSize: "8px", color: "var(--j-text-dim)", marginBottom: "3px" }, children: "Background" }),
          /* @__PURE__ */ o(
            "input",
            {
              type: "color",
              value: d,
              onChange: (v) => h(v.target.value),
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
        /* @__PURE__ */ g("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ o("div", { style: { fontSize: "8px", color: "var(--j-text-dim)", marginBottom: "3px" }, children: "Card" }),
          /* @__PURE__ */ o(
            "input",
            {
              type: "color",
              value: u,
              onChange: (v) => f(v.target.value),
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
      /* @__PURE__ */ o(
        "button",
        {
          onClick: b,
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
const da = [
  "n",
  "n",
  "sq",
  "n",
  "n",
  "tall",
  "n",
  "sq",
  "n",
  "n",
  "sq",
  "n",
  "tall",
  "n",
  "n",
  "sq",
  "n"
], Xt = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10], ua = Array.from({ length: 20 }, (e, t) => ({
  h: 8 + (t * 7 + 3) % 11,
  dur: `${0.8 + t * 13 % 10 / 10}s`,
  dly: `${t * 7 % 10 / 10}s`
}));
function He({
  position: e = "top",
  color: t = "cyan",
  animSpeed: n = "normal",
  systemLabel: r,
  showDots: a = !0,
  showWaveform: i = !1,
  showTicks: s = !1,
  showLive: c = !1,
  showRec: l = !1,
  tickCount: d = 16,
  tickActive: h = 12,
  children: u
}) {
  return /* @__PURE__ */ g("div", { className: H.cls(
    e === "top" ? "j-hud-bar-top" : "j-hud-bar-bot",
    H.color(t),
    H.animSpeed(n)
  ), children: [
    r && /* @__PURE__ */ o("span", { className: "j-text-xs", children: r }),
    a && /* @__PURE__ */ o("div", { className: "j-dot-seq", children: da.map((f, m) => /* @__PURE__ */ o(
      "div",
      {
        className: H.cls("j-d", f === "sq" && "sq", f === "tall" && "tall"),
        style: { animationDelay: `${(m * 0.08).toFixed(2)}s` }
      },
      m
    )) }),
    /* @__PURE__ */ o("div", { style: { flex: 1, height: 1, background: "linear-gradient(90deg,var(--j-accent-25),transparent)" } }),
    s && /* @__PURE__ */ g(z, { children: [
      /* @__PURE__ */ o("div", { className: "j-tick-row", children: Array.from({ length: d }, (f, m) => /* @__PURE__ */ o(
        "div",
        {
          className: H.cls("j-tk", m >= h && "off"),
          style: { height: Xt[m % Xt.length] }
        },
        m
      )) }),
      /* @__PURE__ */ o("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", flexShrink: 0 } })
    ] }),
    i && /* @__PURE__ */ g(z, { children: [
      /* @__PURE__ */ o("div", { className: "j-waveform", style: { flex: 1, maxWidth: 260 }, children: ua.map((f, m) => /* @__PURE__ */ o(
        "div",
        {
          className: "j-wv",
          style: { height: f.h, "--j-wv-dur": f.dur, "--j-wv-dly": f.dly }
        },
        m
      )) }),
      /* @__PURE__ */ o("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", flexShrink: 0 } })
    ] }),
    u,
    c && /* @__PURE__ */ o("span", { className: "j-text-xs j-blink", children: "● LIVE" }),
    l && /* @__PURE__ */ o("span", { className: "j-text-xs j-blink", style: { color: "var(--j-err)" }, children: "● REC" })
  ] });
}
function It({ size: e = "64px", color: t = "cyan", label: n, showLabel: r = !0 }) {
  const a = parseFloat(e);
  return /* @__PURE__ */ g("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: H.color(t),
        style: { position: "relative", width: e, height: e, flexShrink: 0 },
        children: [
          /* @__PURE__ */ o("div", { style: {
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid transparent",
            borderTopColor: "var(--j-accent)",
            borderBottomColor: "var(--j-accent-25)",
            animation: "j-spin var(--j-dur-spin) linear infinite"
          } }),
          /* @__PURE__ */ o("div", { style: {
            position: "absolute",
            inset: `${Math.round(a * 0.17)}px`,
            borderRadius: "50%",
            border: "1px dashed transparent",
            borderTopColor: "var(--j-accent-dim)",
            borderRightColor: "var(--j-accent-dim)",
            animation: "j-spin-rev 6s linear infinite"
          } }),
          /* @__PURE__ */ o("div", { style: {
            position: "absolute",
            inset: `${Math.round(a * 0.28)}px`,
            borderRadius: "50%",
            border: "1px solid transparent",
            borderTopColor: "var(--j-accent-mid)",
            animation: "j-spin 3s linear infinite"
          } }),
          /* @__PURE__ */ o("div", { style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 8,
            height: 8,
            clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
            background: "var(--j-accent)",
            animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite"
          } })
        ]
      }
    ),
    r && n && /* @__PURE__ */ o("span", { style: {
      fontSize: 9,
      color: "var(--j-accent)",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      fontFamily: "'Courier New', monospace"
    }, children: n })
  ] });
}
const fa = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontFamily: "'Courier New', monospace",
  fontSize: 11,
  letterSpacing: ".10em",
  textTransform: "uppercase",
  textDecoration: "none",
  transition: "all .15s ease",
  cursor: "pointer",
  border: "none",
  width: "100%",
  boxSizing: "border-box",
  clipPath: "polygon(0 0,100% 0,calc(100% - 6px) 100%,0 100%)"
};
function Dc({ href: e, icon: t, label: n, badge: r, active: a = !1, onClick: i }) {
  const s = {
    ...fa,
    padding: a ? "10px 14px 10px 16px" : "10px 14px",
    background: a ? "var(--j-accent-08)" : "transparent",
    color: a ? "var(--j-accent)" : "var(--j-text-muted)",
    borderLeft: `2px solid ${a ? "var(--j-accent)" : "transparent"}`,
    boxShadow: a ? "-2px 0 12px var(--j-accent-12)" : "none"
  }, c = /* @__PURE__ */ g(z, { children: [
    a && /* @__PURE__ */ o("div", { style: {
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: 2,
      height: "60%",
      background: "var(--j-accent)",
      boxShadow: "0 0 8px var(--j-accent)"
    } }),
    t && /* @__PURE__ */ o("span", { style: { fontSize: 14, color: a ? "var(--j-accent)" : "var(--j-text-dim)", flexShrink: 0 }, children: t }),
    n && /* @__PURE__ */ o("span", { style: { flex: 1 }, children: n }),
    r && /* @__PURE__ */ o("span", { style: {
      fontSize: 9,
      letterSpacing: ".06em",
      padding: "2px 6px",
      background: "var(--j-accent-12)",
      color: "var(--j-accent)",
      clipPath: "polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)"
    }, children: r })
  ] });
  return e ? /* @__PURE__ */ o("a", { href: e, style: s, children: c }) : /* @__PURE__ */ o("button", { type: "button", onClick: i, style: s, children: c });
}
function Ut() {
  const e = /* @__PURE__ */ new Date();
  return `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`;
}
function ha({
  systemName: e = "JARVIS",
  version: t = "v4.2.1",
  navLabel: n = "Navigation",
  width: r = "220px",
  color: a = "cyan",
  children: i,
  footer: s
}) {
  const [c, l] = W(Ut);
  return K(() => {
    const d = setInterval(() => l(Ut()), 1e4);
    return () => clearInterval(d);
  }, []), /* @__PURE__ */ g(
    "aside",
    {
      className: H.cls("j-sidebar", H.color(a)),
      style: { width: r, flexShrink: 0 },
      children: [
        /* @__PURE__ */ o("div", { style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg,transparent,var(--j-accent),transparent)",
          opacity: 0.7,
          animation: "j-scan-v var(--j-dur-scan) linear infinite",
          pointerEvents: "none",
          zIndex: 1
        } }),
        /* @__PURE__ */ g("div", { style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 14px 14px",
          borderBottom: "1px solid var(--j-accent-12)",
          gap: 8
        }, children: [
          /* @__PURE__ */ o(It, { size: "36px", color: a }),
          /* @__PURE__ */ o("div", { className: "j-glitch", style: {
            fontSize: 13,
            letterSpacing: ".20em",
            textTransform: "uppercase",
            color: "var(--j-accent)",
            fontFamily: "'Courier New', monospace"
          }, children: e }),
          /* @__PURE__ */ o("div", { style: { fontSize: 8, color: "var(--j-text-dim)", letterSpacing: ".12em" }, children: t }),
          /* @__PURE__ */ o("div", { className: "j-status-dot" })
        ] }),
        n && /* @__PURE__ */ o("div", { style: {
          fontSize: 8,
          color: "var(--j-accent-70)",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          padding: "10px 14px 6px"
        }, children: n }),
        /* @__PURE__ */ o("nav", { style: { flex: 1, overflowY: "auto", overflowX: "hidden" }, children: i }),
        /* @__PURE__ */ o("div", { style: { height: 1, background: "linear-gradient(90deg,transparent,var(--j-accent-25),transparent)", margin: "0 8px" } }),
        s && /* @__PURE__ */ o("div", { style: { padding: "8px 14px" }, children: s }),
        /* @__PURE__ */ g("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 14px",
          fontFamily: "'Courier New', monospace",
          fontSize: 8,
          color: "var(--j-text-dim)",
          letterSpacing: ".08em"
        }, children: [
          /* @__PURE__ */ g("span", { children: [
            "SYS · ",
            c
          ] }),
          /* @__PURE__ */ o("span", { className: "j-blink", style: { color: "var(--j-ok)", letterSpacing: ".10em" }, children: "● LIVE" })
        ] })
      ]
    }
  );
}
function Oc({
  systemName: e = "JARVIS",
  version: t = "v4.2.1",
  color: n = "cyan",
  showSidebar: r = !0,
  sidebarWidth: a = "220px",
  navLabel: i = "Navigation",
  showTicks: s = !1,
  showWaveform: c = !1,
  showLive: l = !0,
  showRec: d = !1,
  contentPadding: h = "12px",
  sidebar: u,
  sidebarFooter: f,
  topBar: m,
  bottomBar: b,
  children: v
}) {
  return /* @__PURE__ */ g("div", { className: "j-root", children: [
    /* @__PURE__ */ o(
      He,
      {
        position: "top",
        color: n,
        systemLabel: e,
        showDots: !0,
        showTicks: s,
        showWaveform: c,
        showLive: l,
        showRec: d,
        children: m
      }
    ),
    /* @__PURE__ */ g("div", { className: "j-shell", children: [
      r && /* @__PURE__ */ o(
        ha,
        {
          systemName: e,
          version: t,
          navLabel: i,
          width: a,
          color: n,
          footer: f,
          children: u
        }
      ),
      /* @__PURE__ */ g("div", { className: "j-content", children: [
        /* @__PURE__ */ g("div", { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }, children: [
          /* @__PURE__ */ o("div", { style: {
            position: "absolute",
            top: 4,
            left: 4,
            width: 16,
            height: 16,
            borderTop: "1px solid var(--j-accent-50)",
            borderLeft: "1px solid var(--j-accent-50)",
            animation: "j-corner-blink var(--j-dur-corner) ease-in-out infinite 0s"
          } }),
          /* @__PURE__ */ o("div", { style: {
            position: "absolute",
            top: 4,
            right: 4,
            width: 16,
            height: 16,
            borderTop: "1px solid var(--j-accent-50)",
            borderRight: "1px solid var(--j-accent-50)",
            animation: "j-corner-blink var(--j-dur-corner) ease-in-out infinite 0.75s"
          } })
        ] }),
        /* @__PURE__ */ o("div", { className: "j-scroll", style: { padding: h, position: "relative", zIndex: 1 }, children: v })
      ] })
    ] }),
    /* @__PURE__ */ o(
      He,
      {
        position: "bottom",
        color: n,
        showDots: !1,
        showWaveform: c,
        showTicks: s,
        children: b
      }
    )
  ] });
}
function Cc({
  color: e = "cyan",
  systemLabel: t = "JARVIS · SYS",
  showTop: n = !0,
  showBottom: r = !0,
  showDots: a = !0,
  showLive: i = !1,
  showWaveform: s = !1,
  showTicks: c = !1,
  showRec: l = !1,
  contentPadding: d = "16px",
  children: h,
  topContent: u,
  bottomContent: f
}) {
  return /* @__PURE__ */ g("div", { className: "j-hud-frame", style: { position: "relative", minHeight: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ o("div", { className: "j-hf-corner tl" }),
    /* @__PURE__ */ o("div", { className: "j-hf-corner tr" }),
    /* @__PURE__ */ o("div", { className: "j-hf-corner bl" }),
    /* @__PURE__ */ o("div", { className: "j-hf-corner br" }),
    /* @__PURE__ */ o("div", { style: {
      position: "absolute",
      top: 8,
      left: 36,
      right: 36,
      height: 1,
      background: "linear-gradient(90deg,transparent,var(--j-accent-25),transparent)",
      opacity: 0.15,
      pointerEvents: "none"
    } }),
    /* @__PURE__ */ o("div", { style: {
      position: "absolute",
      bottom: 8,
      left: 36,
      right: 36,
      height: 1,
      background: "linear-gradient(90deg,transparent,var(--j-accent-25),transparent)",
      opacity: 0.15,
      pointerEvents: "none"
    } }),
    n && /* @__PURE__ */ o(
      He,
      {
        position: "top",
        color: e,
        systemLabel: t,
        showDots: a,
        showLive: i,
        showWaveform: s,
        showTicks: c,
        showRec: l,
        children: u
      }
    ),
    /* @__PURE__ */ o("div", { style: { flex: 1, padding: d }, children: h }),
    r && /* @__PURE__ */ o(He, { position: "bottom", color: e, showDots: !1, showWaveform: s, children: f })
  ] });
}
function pa() {
  return /* @__PURE__ */ g(z, { children: [
    /* @__PURE__ */ g("div", { className: "j-hfc-corner j-hfc-tl", children: [
      /* @__PURE__ */ o("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ o("div", { className: "j-hfc-corner-inner" }),
      /* @__PURE__ */ o("div", { className: "j-hfc-tick-h" }),
      /* @__PURE__ */ o("div", { className: "j-hfc-tick-v" })
    ] }),
    /* @__PURE__ */ g("div", { className: "j-hfc-corner j-hfc-tr", children: [
      /* @__PURE__ */ o("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ o("div", { className: "j-hfc-circ" })
    ] }),
    /* @__PURE__ */ g("div", { className: "j-hfc-corner j-hfc-bl", children: [
      /* @__PURE__ */ o("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ o("div", { className: "j-hfc-circ" })
    ] }),
    /* @__PURE__ */ g("div", { className: "j-hfc-corner j-hfc-br", children: [
      /* @__PURE__ */ o("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ o("div", { className: "j-hfc-corner-inner" }),
      /* @__PURE__ */ o("div", { className: "j-hfc-tick-h" }),
      /* @__PURE__ */ o("div", { className: "j-hfc-tick-v" })
    ] })
  ] });
}
function ma() {
  return /* @__PURE__ */ g(z, { children: [
    /* @__PURE__ */ o("div", { className: "j-hfc-beta-rail-t" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-beta-rail-b" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-beta-notch-tl" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-beta-notch-br" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-beta-pip-l" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-beta-pip-r" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-scan-h" })
  ] });
}
function ga() {
  return /* @__PURE__ */ g(z, { children: [
    ["tl1", "tl2", "tr1", "tr2", "bl1", "bl2", "br1", "br2"].map((e) => /* @__PURE__ */ o("div", { className: `j-hfc-g-seg-${e}` }, e)),
    /* @__PURE__ */ o("div", { className: "j-hfc-g-center-ring" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-scan-v" })
  ] });
}
function ya() {
  return /* @__PURE__ */ g(z, { children: [
    /* @__PURE__ */ o("div", { className: "j-hfc-d-top-bar" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-d-bot-bar" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-d-l-rail" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-d-r-rail" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-d-tl-block" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-d-tr-block" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-d-bl-block" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-d-br-block" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-scan-h" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-scan-v" })
  ] });
}
const va = {
  Alpha: "j-hfc-alpha",
  Beta: "j-hfc-beta",
  Gamma: "j-hfc-gamma",
  Delta: "j-hfc-delta"
};
function $c({
  frameStyle: e = "Alpha",
  color: t = "cyan",
  title: n,
  frameId: r,
  showStatusDot: a = !0,
  width: i = "100%",
  height: s = "100%",
  children: c
}) {
  return /* @__PURE__ */ g(
    "div",
    {
      className: H.cls("j-hfc", va[e], H.color(t)),
      style: { width: i, height: s },
      children: [
        e === "Alpha" && /* @__PURE__ */ o(pa, {}),
        e === "Beta" && /* @__PURE__ */ o(ma, {}),
        e === "Gamma" && /* @__PURE__ */ o(ga, {}),
        e === "Delta" && /* @__PURE__ */ o(ya, {}),
        e === "Alpha" && /* @__PURE__ */ g(z, { children: [
          /* @__PURE__ */ o("div", { className: "j-hfc-scan-h" }),
          /* @__PURE__ */ o("div", { className: "j-hfc-scan-v" })
        ] }),
        n && /* @__PURE__ */ g("div", { className: "j-hfc-title", children: [
          a && /* @__PURE__ */ o("span", { className: "j-hfc-dot" }),
          n
        ] }),
        r && /* @__PURE__ */ o("div", { className: "j-hfc-id", children: r }),
        /* @__PURE__ */ o("div", { className: "j-hfc-body", children: c })
      ]
    }
  );
}
const ba = /* @__PURE__ */ new Set(["LeftNotch", "RightNotch", "BothNotch"]), xa = /* @__PURE__ */ new Set(["Parallelogram", "GhostSkew", "BracketFrame", "Hexagonal", "IconSquare", "ScanFull"]), ja = {
  LeftNotch: "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)",
  RightNotch: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)",
  BothNotch: "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))"
};
function Wc({
  shape: e = "LeftNotch",
  color: t = "cyan",
  size: n = "md",
  variant: r,
  loading: a = !1,
  disabled: i = !1,
  icon: s,
  iconRight: c,
  type: l = "button",
  onClick: d,
  children: h
}) {
  const u = H.buttonShape(e), f = ba.has(e), m = xa.has(e), b = f ? {
    clipPath: ja[e],
    border: "1px solid var(--j-accent)"
  } : {};
  return /* @__PURE__ */ g(
    "button",
    {
      type: l,
      disabled: i || a,
      onClick: d,
      className: H.cls("j-btn", u, H.color(t), H.size(n), r ? H.variant(r) : ""),
      style: b,
      "aria-busy": a || void 0,
      children: [
        f && /* @__PURE__ */ o("div", { style: { position: "absolute", inset: 0, background: "var(--j-accent-dim)" } }),
        m && /* @__PURE__ */ o("div", { className: "j-btn-bg-fill" }),
        e === "Parallelogram" && /* @__PURE__ */ o("div", { className: "j-btn-rail" }),
        e === "BracketFrame" && /* @__PURE__ */ g(z, { children: [
          /* @__PURE__ */ o("div", { className: "j-btn-top-line" }),
          /* @__PURE__ */ o("div", { className: "j-btn-bot-line" })
        ] }),
        /* @__PURE__ */ o("div", { className: "j-btn-shine" }),
        /* @__PURE__ */ o("div", { className: "j-btn-c tl" }),
        /* @__PURE__ */ o("div", { className: "j-btn-c tr" }),
        /* @__PURE__ */ o("div", { className: "j-btn-c bl" }),
        /* @__PURE__ */ o("div", { className: "j-btn-c br" }),
        /* @__PURE__ */ g("div", { className: "j-btn-label", children: [
          !a && s && /* @__PURE__ */ o("span", { children: s }),
          a ? /* @__PURE__ */ o("span", { style: { letterSpacing: ".2em" }, children: "···" }) : h,
          !a && c && /* @__PURE__ */ o("span", { children: c })
        ] })
      ]
    }
  );
}
function wa({ cardStyle: e }) {
  switch (e) {
    case "CornerBracket":
      return /* @__PURE__ */ g(z, { children: [
        /* @__PURE__ */ o("div", { className: "j-c-tl" }),
        /* @__PURE__ */ o("div", { className: "j-c-tr" }),
        /* @__PURE__ */ o("div", { className: "j-c-bl" }),
        /* @__PURE__ */ o("div", { className: "j-c-br" }),
        /* @__PURE__ */ o("div", { className: "j-inner-border" })
      ] });
    case "Notched":
      return /* @__PURE__ */ g(z, { children: [
        /* @__PURE__ */ o("div", { className: "j-notch-border" }),
        /* @__PURE__ */ o("div", { className: "j-tri-tl" }),
        /* @__PURE__ */ o("div", { className: "j-tri-br" })
      ] });
    case "SideRail":
      return /* @__PURE__ */ g(z, { children: [
        /* @__PURE__ */ o("div", { className: "j-rail" }),
        /* @__PURE__ */ o("div", { className: "j-tab-top" }),
        /* @__PURE__ */ o("div", { className: "j-tab-bot" })
      ] });
    case "GlowBorder":
      return /* @__PURE__ */ o("div", { className: "j-inner-radial" });
    case "PartialBorder":
      return /* @__PURE__ */ g(z, { children: [
        /* @__PURE__ */ o("div", { className: "j-pb-tl" }),
        /* @__PURE__ */ o("div", { className: "j-pb-br" }),
        /* @__PURE__ */ o("div", { className: "j-pb-roving-dot" })
      ] });
    case "DangerPulse":
      return /* @__PURE__ */ o("div", { className: "j-tri-tl" });
    case "Hexagonal":
      return /* @__PURE__ */ o("div", { className: "j-hex-ring" });
    case "Radar":
      return /* @__PURE__ */ g(z, { children: [
        /* @__PURE__ */ o("div", { className: "j-radar-sweep" }),
        /* @__PURE__ */ o("div", { className: "j-radar-r1" }),
        /* @__PURE__ */ o("div", { className: "j-radar-r2" }),
        /* @__PURE__ */ o("div", { className: "j-radar-r3" }),
        /* @__PURE__ */ o("div", { className: "j-radar-center" }),
        /* @__PURE__ */ o("div", { className: "j-radar-ping" })
      ] });
    default:
      return null;
  }
}
const Kt = {
  paddingBottom: 10,
  marginBottom: 10,
  borderBottom: "1px solid var(--j-border-dim)",
  position: "relative",
  zIndex: 1
}, Qt = {
  paddingTop: 10,
  marginTop: 10,
  borderTop: "1px solid var(--j-border-dim)",
  position: "relative",
  zIndex: 1
};
function ka({
  cardStyle: e = "CornerBracket",
  color: t = "cyan",
  header: n,
  footer: r,
  padding: a = "14px 16px",
  children: i
}) {
  const s = H.cls("j-card", H.cardStyle(e), H.color(t));
  return e === "DoubleFrame" ? /* @__PURE__ */ g("div", { className: s, children: [
    /* @__PURE__ */ o("div", { className: "j-df-corner" }),
    /* @__PURE__ */ g("div", { className: "j-inner-frame", children: [
      n && /* @__PURE__ */ o("div", { style: Kt, children: n }),
      i,
      r && /* @__PURE__ */ o("div", { style: Qt, children: r })
    ] })
  ] }) : /* @__PURE__ */ g("div", { className: s, style: { padding: a }, children: [
    /* @__PURE__ */ o(wa, { cardStyle: e }),
    n && /* @__PURE__ */ o("div", { style: Kt, children: n }),
    /* @__PURE__ */ o("div", { style: { position: "relative", zIndex: 1 }, children: i }),
    r && /* @__PURE__ */ o("div", { style: Qt, children: r })
  ] });
}
const Sa = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }, Na = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function Tc({
  type: e = "text",
  value: t,
  defaultValue: n,
  onChange: r,
  placeholder: a = "",
  disabled: i = !1,
  readOnly: s = !1,
  error: c = !1,
  size: l = "md"
}) {
  const d = {
    height: Sa[l] ?? 38,
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${c ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: c ? "var(--j-err)" : "var(--j-border)",
    color: c ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: Na[l] ?? 12,
    letterSpacing: ".08em",
    padding: "0 12px",
    outline: "none",
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
    opacity: i ? 0.4 : 1,
    cursor: i ? "not-allowed" : "text",
    boxShadow: c ? "0 0 8px var(--j-err-25)" : "none"
  };
  return /* @__PURE__ */ o(
    "input",
    {
      type: e,
      placeholder: a,
      disabled: i,
      readOnly: s,
      style: d,
      ...t !== void 0 ? { value: t, onChange: (u) => r == null ? void 0 : r(u.target.value) } : { defaultValue: n }
    }
  );
}
const Ma = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function Pc({
  value: e,
  defaultValue: t,
  onChange: n,
  placeholder: r = "",
  disabled: a = !1,
  readOnly: i = !1,
  error: s = !1,
  rows: c = 4,
  resize: l = "none",
  size: d = "md"
}) {
  const h = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${s ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: s ? "var(--j-err)" : "var(--j-border)",
    color: s ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: Ma[d] ?? 12,
    letterSpacing: ".08em",
    padding: "10px 12px",
    outline: "none",
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
    opacity: a ? 0.4 : 1,
    cursor: a ? "not-allowed" : "text",
    resize: l,
    boxShadow: s ? "0 0 8px var(--j-err-25)" : "none"
  };
  return /* @__PURE__ */ o(
    "textarea",
    {
      rows: c,
      placeholder: r,
      disabled: a,
      readOnly: i,
      style: h,
      ...e !== void 0 ? { value: e, onChange: (f) => n == null ? void 0 : n(f.target.value) } : { defaultValue: t }
    }
  );
}
const Da = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }, Oa = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function Ic({
  options: e,
  value: t,
  defaultValue: n,
  onChange: r,
  placeholder: a,
  disabled: i = !1,
  error: s = !1,
  size: c = "md"
}) {
  const l = {
    height: Da[c] ?? 38,
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${s ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: s ? "var(--j-err)" : "var(--j-border)",
    color: s ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: Oa[c] ?? 12,
    letterSpacing: ".08em",
    padding: "0 12px",
    outline: "none",
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
    opacity: i ? 0.4 : 1,
    cursor: i ? "not-allowed" : "pointer",
    boxShadow: s ? "0 0 8px var(--j-err-25)" : "none"
  };
  return /* @__PURE__ */ g("select", { disabled: i, style: l, ...t !== void 0 ? { value: t, onChange: (h) => r == null ? void 0 : r(h.target.value) } : { defaultValue: n }, children: [
    a && /* @__PURE__ */ o("option", { value: "", disabled: !0, hidden: !0, children: a }),
    e.map((h) => /* @__PURE__ */ o("option", { value: h.value, disabled: h.disabled, children: h.label }, h.value))
  ] });
}
function Ec({
  checked: e,
  defaultChecked: t = !1,
  onChange: n,
  label: r,
  disabled: a = !1
}) {
  const [i, s] = W(t), c = e !== void 0 ? e : i;
  function l(d) {
    a || (e === void 0 && s(d.target.checked), n == null || n(d.target.checked));
  }
  return /* @__PURE__ */ g("label", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    cursor: a ? "not-allowed" : "pointer",
    opacity: a ? 0.4 : 1,
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    color: "var(--j-text-primary)",
    userSelect: "none"
  }, children: [
    /* @__PURE__ */ o(
      "input",
      {
        type: "checkbox",
        checked: c,
        onChange: l,
        disabled: a,
        style: { position: "absolute", opacity: 0, width: 0, height: 0 }
      }
    ),
    /* @__PURE__ */ o("div", { style: {
      width: 14,
      height: 14,
      flexShrink: 0,
      background: c ? "var(--j-accent)" : "transparent",
      border: `1px solid ${c ? "var(--j-accent)" : "var(--j-border)"}`,
      clipPath: "polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: c ? "0 0 6px var(--j-accent-25)" : "none",
      transition: "all .15s ease"
    }, children: c && /* @__PURE__ */ o("div", { style: {
      width: 6,
      height: 6,
      background: "var(--j-bg)",
      clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)"
    } }) }),
    r && /* @__PURE__ */ o("span", { children: r })
  ] });
}
function Fc({ checked: e, onChange: t, label: n, value: r, name: a, disabled: i = !1 }) {
  return /* @__PURE__ */ g("label", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    cursor: i ? "not-allowed" : "pointer",
    opacity: i ? 0.4 : 1,
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    color: "var(--j-text-primary)",
    userSelect: "none"
  }, children: [
    /* @__PURE__ */ o(
      "input",
      {
        type: "radio",
        checked: e,
        value: r,
        name: a,
        disabled: i,
        onChange: () => {
          i || t == null || t(r);
        },
        style: { position: "absolute", opacity: 0, width: 0, height: 0 }
      }
    ),
    /* @__PURE__ */ o("div", { style: {
      width: 14,
      height: 14,
      flexShrink: 0,
      border: `1px solid ${e ? "var(--j-accent)" : "var(--j-border)"}`,
      clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all .15s ease"
    }, children: e && /* @__PURE__ */ o("div", { style: {
      width: 6,
      height: 6,
      background: "var(--j-accent)",
      clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
      boxShadow: "0 0 4px var(--j-accent)"
    } }) }),
    n && /* @__PURE__ */ o("span", { children: n })
  ] });
}
function Ac({
  checked: e,
  defaultChecked: t = !1,
  onChange: n,
  label: r,
  disabled: a = !1
}) {
  const [i, s] = W(t), c = e !== void 0 ? e : i;
  function l(d) {
    a || (e === void 0 && s(d.target.checked), n == null || n(d.target.checked));
  }
  return /* @__PURE__ */ g("label", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    cursor: a ? "not-allowed" : "pointer",
    opacity: a ? 0.4 : 1,
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    color: "var(--j-text-primary)",
    userSelect: "none"
  }, children: [
    /* @__PURE__ */ o(
      "input",
      {
        type: "checkbox",
        checked: c,
        onChange: l,
        disabled: a,
        style: { position: "absolute", opacity: 0, width: 0, height: 0 }
      }
    ),
    /* @__PURE__ */ o("div", { style: {
      width: 36,
      height: 18,
      flexShrink: 0,
      position: "relative",
      background: c ? "var(--j-accent-25)" : "var(--j-bg-panel)",
      border: `1px solid ${c ? "var(--j-accent)" : "var(--j-border)"}`,
      clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
      boxShadow: c ? "0 0 8px var(--j-accent-25)" : "none",
      transition: "all .2s ease"
    }, children: /* @__PURE__ */ o("div", { style: {
      position: "absolute",
      top: 2,
      width: 12,
      height: 12,
      left: c ? "calc(100% - 15px)" : "3px",
      background: c ? "var(--j-accent)" : "var(--j-border)",
      clipPath: "polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)",
      boxShadow: c ? "0 0 6px var(--j-accent)" : "none",
      transition: "left .2s ease"
    } }) }),
    r && /* @__PURE__ */ o("span", { children: r })
  ] });
}
function _c({
  value: e,
  defaultValue: t,
  onChange: n,
  min: r = 0,
  max: a = 100,
  step: i = 1,
  disabled: s = !1,
  showValue: c = !0
}) {
  const [l, d] = W(t ?? r), h = e !== void 0 ? e : l, u = a > r ? (h - r) / (a - r) * 100 : 0;
  function f(m) {
    const b = Number(m.target.value);
    e === void 0 && d(b), n == null || n(b);
  }
  return /* @__PURE__ */ g("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "'Courier New', monospace",
    opacity: s ? 0.4 : 1
  }, children: [
    /* @__PURE__ */ g("div", { style: { position: "relative", flex: 1, height: 20 }, children: [
      /* @__PURE__ */ o("div", { style: {
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        height: 2,
        transform: "translateY(-50%)",
        background: "var(--j-border)"
      } }),
      /* @__PURE__ */ o("div", { style: {
        position: "absolute",
        top: "50%",
        left: 0,
        width: `${u}%`,
        height: 2,
        transform: "translateY(-50%)",
        background: "var(--j-accent)",
        boxShadow: "0 0 6px var(--j-accent-25)",
        transition: "width .1s ease"
      } }),
      /* @__PURE__ */ o(
        "input",
        {
          type: "range",
          min: r,
          max: a,
          step: i,
          value: h,
          onChange: f,
          disabled: s,
          style: {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: s ? "not-allowed" : "pointer",
            margin: 0
          }
        }
      ),
      /* @__PURE__ */ o("div", { style: {
        position: "absolute",
        top: "50%",
        left: `${u}%`,
        transform: "translate(-50%, -50%)",
        width: 12,
        height: 12,
        pointerEvents: "none",
        background: "var(--j-accent)",
        clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)",
        boxShadow: "0 0 8px var(--j-accent)"
      } })
    ] }),
    c && /* @__PURE__ */ o("span", { style: {
      fontSize: 11,
      color: "var(--j-accent)",
      letterSpacing: ".06em",
      minWidth: 32,
      textAlign: "right"
    }, children: h })
  ] });
}
function Yc({ label: e, error: t, hint: n, required: r, children: a }) {
  return /* @__PURE__ */ g("div", { style: { display: "flex", flexDirection: "column", gap: 4, fontFamily: "'Courier New', monospace" }, children: [
    e && /* @__PURE__ */ g("label", { style: {
      fontSize: 10,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "var(--j-text-muted)"
    }, children: [
      e,
      r && /* @__PURE__ */ o("span", { style: { color: "var(--j-err)", marginLeft: 2 }, children: "*" })
    ] }),
    a,
    t && /* @__PURE__ */ o("span", { style: { fontSize: 10, color: "var(--j-err)", letterSpacing: ".06em" }, children: t }),
    !t && n && /* @__PURE__ */ o("span", { style: { fontSize: 10, color: "var(--j-text-dim)", letterSpacing: ".06em" }, children: n })
  ] });
}
function Ca(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const jt = {}, Ae = {};
function pe(e, t) {
  try {
    const r = (jt[e] || (jt[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in Ae ? Ae[r] : Zt(r, r.split(":"));
  } catch {
    if (e in Ae) return Ae[e];
    const n = e == null ? void 0 : e.match($a);
    return n ? Zt(e, n.slice(1)) : NaN;
  }
}
const $a = /([+-]\d\d):?(\d\d)?/;
function Zt(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), a = +(t[2] || 0) / 60;
  return Ae[e] = n * 60 + r > 0 ? n * 60 + r + a : n * 60 - r - a;
}
class le extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(pe(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), _n(this, t)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new le(...n, t) : new le(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new le(+this, t);
  }
  getTimezoneOffset() {
    const t = -pe(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), lt(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new le(+new Date(t), this.timeZone);
  }
  //#endregion
}
const en = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!en.test(e)) return;
  const t = e.replace(en, "$1UTC");
  le.prototype[t] && (e.startsWith("get") ? le.prototype[e] = function() {
    return this.internal[t]();
  } : (le.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Wa(this), +this;
  }, le.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), lt(this), +this;
  }));
});
function lt(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - // Round after converting minutes to seconds to avoid fractional offset
  // precision errors from historical offsets.
  Math.round(-pe(e.timeZone, e) * 60));
}
function Wa(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), _n(e);
}
function _n(e, t) {
  const n = Array.isArray(t) ? Ta(t) : +e.internal, r = pe(e.timeZone, e), a = r > 0 ? Math.floor(r) : Math.ceil(r), i = /* @__PURE__ */ new Date(+e);
  i.setUTCHours(i.getUTCHours() - 1);
  const s = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), c = -(/* @__PURE__ */ new Date(+i)).getTimezoneOffset(), l = s - c;
  let d = s;
  if (l && s !== a) {
    const C = Date.prototype.getHours.apply(e), P = Array.isArray(t) ? t[3] || 0 : e.internal.getUTCHours();
    if (C !== P) {
      const F = /* @__PURE__ */ new Date(+e), X = s - a;
      X && F.setUTCMinutes(F.getUTCMinutes() + X);
      const G = pe(e.timeZone, F);
      (G > 0 ? Math.floor(G) : Math.ceil(G)) === a && (d = c);
    }
  }
  const h = d - a;
  h && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const f = s > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, m = Math.round(-(pe(e.timeZone, e) * 60)) % 60;
  (m || f) && Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + m + f);
  const b = pe(e.timeZone, e), v = b > 0 ? Math.floor(b) : Math.ceil(b), y = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - v, j = v !== a, x = y - h, N = v - a, k = n - v * 60 * 1e3, p = N > 0 && tn(e) - n === N * 60 * 1e3 && tn(e, k) !== n;
  if (j && x && !p) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + x);
    const C = pe(e.timeZone, e), P = C > 0 ? Math.floor(C) : Math.ceil(C), F = v - P;
    F && x < 0 && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + F);
  }
  lt(e);
  const M = (t ? n : n + m * 1e3) - +e.internal;
  M && Math.abs(M) < 30 * 60 * 1e3 && (Date.prototype.setTime.call(e, +e + M), lt(e));
}
function Ta(e) {
  return Date.UTC(e[0], e.length > 1 ? e[1] : 0, e.length > 2 ? e[2] : 1, ...e.slice(3));
}
function tn(e, t) {
  const n = new Date(t ?? +e);
  return n.setUTCSeconds(n.getUTCSeconds() - Math.round(-pe(e.timeZone, n) * 60)), +n;
}
class V extends le {
  //#region static
  static tz(t, ...n) {
    return n.length ? new V(...n, t) : new V(Date.now(), t);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [t, n, r] = this.tzComponents(), a = `${t}${n}:${r}`;
    return this.internal.toISOString().slice(0, -1) + a;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [t, n, r, a] = this.internal.toUTCString().split(" ");
    return `${t == null ? void 0 : t.slice(0, -1)} ${r} ${n} ${a}`;
  }
  toTimeString() {
    const t = this.internal.toUTCString().split(" ")[4], [n, r, a] = this.tzComponents();
    return `${t} GMT${n}${r}${a} (${Ca(this.timeZone, this)})`;
  }
  toLocaleString(t, n) {
    return Date.prototype.toLocaleString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  toLocaleDateString(t, n) {
    return Date.prototype.toLocaleDateString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  toLocaleTimeString(t, n) {
    return Date.prototype.toLocaleTimeString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  //#endregion
  //#region private
  tzComponents() {
    const t = this.getTimezoneOffset(), n = t > 0 ? "-" : "+", r = String(Math.floor(Math.abs(t) / 60)).padStart(2, "0"), a = String(Math.abs(t) % 60).padStart(2, "0");
    return [n, r, a];
  }
  //#endregion
  withTimeZone(t) {
    return new V(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new V(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Yn = 6048e5, Pa = 864e5, nn = Symbol.for("constructDateFrom");
function J(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && nn in e ? e[nn](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function Y(e, t) {
  return J(t || e, e);
}
function Bn(e, t, n) {
  const r = Y(e, n == null ? void 0 : n.in);
  return isNaN(t) ? J(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function zn(e, t, n) {
  const r = Y(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return J(e, NaN);
  if (!t)
    return r;
  const a = r.getDate(), i = J(e, r.getTime());
  i.setMonth(r.getMonth() + t + 1, 0);
  const s = i.getDate();
  return a >= s ? i : (r.setFullYear(
    i.getFullYear(),
    i.getMonth(),
    a
  ), r);
}
let Ia = {};
function Ve() {
  return Ia;
}
function Oe(e, t) {
  var c, l, d, h;
  const n = Ve(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((h = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : h.weekStartsOn) ?? 0, a = Y(e, t == null ? void 0 : t.in), i = a.getDay(), s = (i < r ? 7 : 0) + i - r;
  return a.setDate(a.getDate() - s), a.setHours(0, 0, 0, 0), a;
}
function Je(e, t) {
  return Oe(e, { ...t, weekStartsOn: 1 });
}
function Rn(e, t) {
  const n = Y(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = J(n, 0);
  a.setFullYear(r + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const i = Je(a), s = J(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const c = Je(s);
  return n.getTime() >= i.getTime() ? r + 1 : n.getTime() >= c.getTime() ? r : r - 1;
}
function rn(e) {
  const t = Y(e), n = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function Ce(e, ...t) {
  const n = J.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Ge(e, t) {
  const n = Y(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Et(e, t, n) {
  const [r, a] = Ce(
    n == null ? void 0 : n.in,
    e,
    t
  ), i = Ge(r), s = Ge(a), c = +i - rn(i), l = +s - rn(s);
  return Math.round((c - l) / Pa);
}
function Ea(e, t) {
  const n = Rn(e, t), r = J(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Je(r);
}
function Fa(e, t, n) {
  return Bn(e, t * 7, n);
}
function Aa(e, t, n) {
  return zn(e, t * 12, n);
}
function _a(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((a) => {
    !r && typeof a == "object" && (r = J.bind(null, a));
    const i = Y(a, r);
    (!n || n < i || isNaN(+i)) && (n = i);
  }), J(r, n || NaN);
}
function Ya(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((a) => {
    !r && typeof a == "object" && (r = J.bind(null, a));
    const i = Y(a, r);
    (!n || n > i || isNaN(+i)) && (n = i);
  }), J(r, n || NaN);
}
function Ba(e, t, n) {
  const [r, a] = Ce(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +Ge(r) == +Ge(a);
}
function Hn(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function za(e) {
  return !(!Hn(e) && typeof e != "number" || isNaN(+Y(e)));
}
function Jn(e, t, n) {
  const [r, a] = Ce(
    n == null ? void 0 : n.in,
    e,
    t
  ), i = r.getFullYear() - a.getFullYear(), s = r.getMonth() - a.getMonth();
  return i * 12 + s;
}
function Ra(e, t) {
  const n = Y(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Gn(e, t) {
  const [n, r] = Ce(e, t.start, t.end);
  return { start: n, end: r };
}
function Ha(e, t) {
  const { start: n, end: r } = Gn(t == null ? void 0 : t.in, e);
  let a = +n > +r;
  const i = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let c = 1;
  const l = [];
  for (; +s <= i; )
    l.push(J(n, s)), s.setMonth(s.getMonth() + c);
  return a ? l.reverse() : l;
}
function Ja(e, t) {
  const n = Y(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Ga(e, t) {
  const n = Y(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function qn(e, t) {
  const n = Y(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function qa(e, t) {
  const { start: n, end: r } = Gn(t == null ? void 0 : t.in, e);
  let a = +n > +r;
  const i = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let c = 1;
  const l = [];
  for (; +s <= i; )
    l.push(J(n, s)), s.setFullYear(s.getFullYear() + c);
  return a ? l.reverse() : l;
}
function Ln(e, t) {
  var c, l, d, h;
  const n = Ve(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((h = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : h.weekStartsOn) ?? 0, a = Y(e, t == null ? void 0 : t.in), i = a.getDay(), s = (i < r ? -7 : 0) + 6 - (i - r);
  return a.setDate(a.getDate() + s), a.setHours(23, 59, 59, 999), a;
}
function La(e, t) {
  return Ln(e, { ...t, weekStartsOn: 1 });
}
const Va = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, Xa = (e, t, n) => {
  let r;
  const a = Va[e];
  return typeof a == "string" ? r = a : t === 1 ? r = a.one : r = a.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function wt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Ua = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Ka = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Qa = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Za = {
  date: wt({
    formats: Ua,
    defaultWidth: "full"
  }),
  time: wt({
    formats: Ka,
    defaultWidth: "full"
  }),
  dateTime: wt({
    formats: Qa,
    defaultWidth: "full"
  })
}, eo = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, to = (e, t, n, r) => eo[e];
function Pe(e) {
  return (t, n) => {
    const r = n != null && n.context ? String(n.context) : "standalone";
    let a;
    if (r === "formatting" && e.formattingValues) {
      const s = e.defaultFormattingWidth || e.defaultWidth, c = n != null && n.width ? String(n.width) : s;
      a = e.formattingValues[c] || e.formattingValues[s];
    } else {
      const s = e.defaultWidth, c = n != null && n.width ? String(n.width) : e.defaultWidth;
      a = e.values[c] || e.values[s];
    }
    const i = e.argumentCallback ? e.argumentCallback(t) : t;
    return a[i];
  };
}
const no = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, ro = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, ao = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, oo = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, io = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, so = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, co = (e, t) => {
  const n = Number(e), r = n % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, lo = {
  ordinalNumber: co,
  era: Pe({
    values: no,
    defaultWidth: "wide"
  }),
  quarter: Pe({
    values: ro,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Pe({
    values: ao,
    defaultWidth: "wide"
  }),
  day: Pe({
    values: oo,
    defaultWidth: "wide"
  }),
  dayPeriod: Pe({
    values: io,
    defaultWidth: "wide",
    formattingValues: so,
    defaultFormattingWidth: "wide"
  })
};
function Ie(e) {
  return (t, n = {}) => {
    const r = n.width, a = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], i = t.match(a);
    if (!i)
      return null;
    const s = i[0], c = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(c) ? fo(c, (u) => u.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      uo(c, (u) => u.test(s))
    );
    let d;
    d = e.valueCallback ? e.valueCallback(l) : l, d = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(d)
    ) : d;
    const h = t.slice(s.length);
    return { value: d, rest: h };
  };
}
function uo(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function fo(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function ho(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const a = r[0], i = t.match(e.parsePattern);
    if (!i) return null;
    let s = e.valueCallback ? e.valueCallback(i[0]) : i[0];
    s = n.valueCallback ? n.valueCallback(s) : s;
    const c = t.slice(a.length);
    return { value: s, rest: c };
  };
}
const po = /^(\d+)(th|st|nd|rd)?/i, mo = /\d+/i, go = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, yo = {
  any: [/^b/i, /^(a|c)/i]
}, vo = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, bo = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, xo = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, jo = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, wo = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, ko = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, So = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, No = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Mo = {
  ordinalNumber: ho({
    matchPattern: po,
    parsePattern: mo,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ie({
    matchPatterns: go,
    defaultMatchWidth: "wide",
    parsePatterns: yo,
    defaultParseWidth: "any"
  }),
  quarter: Ie({
    matchPatterns: vo,
    defaultMatchWidth: "wide",
    parsePatterns: bo,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ie({
    matchPatterns: xo,
    defaultMatchWidth: "wide",
    parsePatterns: jo,
    defaultParseWidth: "any"
  }),
  day: Ie({
    matchPatterns: wo,
    defaultMatchWidth: "wide",
    parsePatterns: ko,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ie({
    matchPatterns: So,
    defaultMatchWidth: "any",
    parsePatterns: No,
    defaultParseWidth: "any"
  })
}, De = {
  code: "en-US",
  formatDistance: Xa,
  formatLong: Za,
  formatRelative: to,
  localize: lo,
  match: Mo,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Do(e, t) {
  const n = Y(e, t == null ? void 0 : t.in);
  return Et(n, qn(n)) + 1;
}
function Ft(e, t) {
  const n = Y(e, t == null ? void 0 : t.in), r = +Je(n) - +Ea(n);
  return Math.round(r / Yn) + 1;
}
function Vn(e, t) {
  var h, u, f, m;
  const n = Y(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = Ve(), i = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (h = t == null ? void 0 : t.locale) == null ? void 0 : h.options) == null ? void 0 : u.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((m = (f = a.locale) == null ? void 0 : f.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = J((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, i), s.setHours(0, 0, 0, 0);
  const c = Oe(s, t), l = J((t == null ? void 0 : t.in) || e, 0);
  l.setFullYear(r, 0, i), l.setHours(0, 0, 0, 0);
  const d = Oe(l, t);
  return +n >= +c ? r + 1 : +n >= +d ? r : r - 1;
}
function Oo(e, t) {
  var c, l, d, h;
  const n = Ve(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((h = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, a = Vn(e, t), i = J((t == null ? void 0 : t.in) || e, 0);
  return i.setFullYear(a, 0, r), i.setHours(0, 0, 0, 0), Oe(i, t);
}
function At(e, t) {
  const n = Y(e, t == null ? void 0 : t.in), r = +Oe(n, t) - +Oo(n, t);
  return Math.round(r / Yn) + 1;
}
function _(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const ve = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return _(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : _(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return _(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const n = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return _(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return _(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return _(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return _(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), a = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return _(a, t.length);
  }
}, Se = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, an = {
  // Era
  G: function(e, t, n) {
    const r = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return n.era(r, { width: "abbreviated" });
      case "GGGGG":
        return n.era(r, { width: "narrow" });
      case "GGGG":
      default:
        return n.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const r = e.getFullYear(), a = r > 0 ? r : 1 - r;
      return n.ordinalNumber(a, { unit: "year" });
    }
    return ve.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const a = Vn(e, r), i = a > 0 ? a : 1 - a;
    if (t === "YY") {
      const s = i % 100;
      return _(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(i, { unit: "year" }) : _(i, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Rn(e);
    return _(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const n = e.getFullYear();
    return _(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return _(r, 2);
      case "Qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      case "QQQ":
        return n.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return n.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(r);
      case "qq":
        return _(r, 2);
      case "qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      case "qqq":
        return n.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return n.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return ve.M(e, t);
      case "Mo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      case "MMM":
        return n.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return n.month(r, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return n.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "L":
        return String(r + 1);
      case "LL":
        return _(r + 1, 2);
      case "Lo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      case "LLL":
        return n.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return n.month(r, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return n.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, r) {
    const a = At(e, r);
    return t === "wo" ? n.ordinalNumber(a, { unit: "week" }) : _(a, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Ft(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : _(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : ve.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Do(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : _(r, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const r = e.getDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, r) {
    const a = e.getDay(), i = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(i);
      case "ee":
        return _(i, 2);
      case "eo":
        return n.ordinalNumber(i, { unit: "day" });
      case "eee":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, r) {
    const a = e.getDay(), i = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(i);
      case "cc":
        return _(i, t.length);
      case "co":
        return n.ordinalNumber(i, { unit: "day" });
      case "ccc":
        return n.day(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return n.day(a, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return n.day(a, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return n.day(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const r = e.getDay(), a = r === 0 ? 7 : r;
    switch (t) {
      case "i":
        return String(a);
      case "ii":
        return _(a, t.length);
      case "io":
        return n.ordinalNumber(a, { unit: "day" });
      case "iii":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const a = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const r = e.getHours();
    let a;
    switch (r === 12 ? a = Se.noon : r === 0 ? a = Se.midnight : a = r / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const r = e.getHours();
    let a;
    switch (r >= 17 ? a = Se.evening : r >= 12 ? a = Se.afternoon : r >= 4 ? a = Se.morning : a = Se.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let r = e.getHours() % 12;
      return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
    }
    return ve.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : ve.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : _(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : _(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : ve.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : ve.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return ve.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return sn(r);
      case "XXXX":
      case "XX":
        return je(r);
      case "XXXXX":
      case "XXX":
      default:
        return je(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return sn(r);
      case "xxxx":
      case "xx":
        return je(r);
      case "xxxxx":
      case "xxx":
      default:
        return je(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + on(r, ":");
      case "OOOO":
      default:
        return "GMT" + je(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + on(r, ":");
      case "zzzz":
      default:
        return "GMT" + je(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return _(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return _(+e, t.length);
  }
};
function on(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = Math.trunc(r / 60), i = r % 60;
  return i === 0 ? n + String(a) : n + String(a) + t + _(i, 2);
}
function sn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + _(Math.abs(e) / 60, 2) : je(e, t);
}
function je(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = _(Math.trunc(r / 60), 2), i = _(r % 60, 2);
  return n + a + t + i;
}
const cn = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, Xn = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, Co = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], a = n[2];
  if (!a)
    return cn(e, t);
  let i;
  switch (r) {
    case "P":
      i = t.dateTime({ width: "short" });
      break;
    case "PP":
      i = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      i = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      i = t.dateTime({ width: "full" });
      break;
  }
  return i.replace("{{date}}", cn(r, t)).replace("{{time}}", Xn(a, t));
}, $o = {
  p: Xn,
  P: Co
}, Wo = /^D+$/, To = /^Y+$/, Po = ["D", "DD", "YY", "YYYY"];
function Io(e) {
  return Wo.test(e);
}
function Eo(e) {
  return To.test(e);
}
function Fo(e, t, n) {
  const r = Ao(e, t, n);
  if (console.warn(r), Po.includes(e)) throw new RangeError(r);
}
function Ao(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const _o = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Yo = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Bo = /^'([^]*?)'?$/, zo = /''/g, Ro = /[a-zA-Z]/;
function _e(e, t, n) {
  var h, u, f, m, b, v, w, y;
  const r = Ve(), a = (n == null ? void 0 : n.locale) ?? r.locale ?? De, i = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((u = (h = n == null ? void 0 : n.locale) == null ? void 0 : h.options) == null ? void 0 : u.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((m = (f = r.locale) == null ? void 0 : f.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((v = (b = n == null ? void 0 : n.locale) == null ? void 0 : b.options) == null ? void 0 : v.weekStartsOn) ?? r.weekStartsOn ?? ((y = (w = r.locale) == null ? void 0 : w.options) == null ? void 0 : y.weekStartsOn) ?? 0, c = Y(e, n == null ? void 0 : n.in);
  if (!za(c))
    throw new RangeError("Invalid time value");
  let l = t.match(Yo).map((j) => {
    const x = j[0];
    if (x === "p" || x === "P") {
      const N = $o[x];
      return N(j, a.formatLong);
    }
    return j;
  }).join("").match(_o).map((j) => {
    if (j === "''")
      return { isToken: !1, value: "'" };
    const x = j[0];
    if (x === "'")
      return { isToken: !1, value: Ho(j) };
    if (an[x])
      return { isToken: !0, value: j };
    if (x.match(Ro))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + x + "`"
      );
    return { isToken: !1, value: j };
  });
  a.localize.preprocessor && (l = a.localize.preprocessor(c, l));
  const d = {
    firstWeekContainsDate: i,
    weekStartsOn: s,
    locale: a
  };
  return l.map((j) => {
    if (!j.isToken) return j.value;
    const x = j.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && Eo(x) || !(n != null && n.useAdditionalDayOfYearTokens) && Io(x)) && Fo(x, t, String(e));
    const N = an[x[0]];
    return N(c, x, a.localize, d);
  }).join("");
}
function Ho(e) {
  const t = e.match(Bo);
  return t ? t[1].replace(zo, "'") : e;
}
function Jo(e, t) {
  const n = Y(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = n.getMonth(), i = J(n, 0);
  return i.setFullYear(r, a + 1, 0), i.setHours(0, 0, 0, 0), i.getDate();
}
function Go(e, t) {
  return Y(e, t == null ? void 0 : t.in).getMonth();
}
function qo(e, t) {
  return Y(e, t == null ? void 0 : t.in).getFullYear();
}
function Lo(e, t) {
  return +Y(e) > +Y(t);
}
function Vo(e, t) {
  return +Y(e) < +Y(t);
}
function Xo(e, t, n) {
  const [r, a] = Ce(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === a.getFullYear() && r.getMonth() === a.getMonth();
}
function Uo(e, t, n) {
  const [r, a] = Ce(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === a.getFullYear();
}
function Ko(e, t, n) {
  const r = Y(e, n == null ? void 0 : n.in), a = r.getFullYear(), i = r.getDate(), s = J(e, 0);
  s.setFullYear(a, t, 15), s.setHours(0, 0, 0, 0);
  const c = Jo(s);
  return r.setMonth(t, Math.min(i, c)), r;
}
function Qo(e, t, n) {
  const r = Y(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? J(e, NaN) : (r.setFullYear(t), r);
}
const ln = 5, Zo = 4;
function ei(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, a = t.addDays(e, -r + 1), i = t.addDays(a, ln * 7 - 1);
  return t.getMonth(e) === t.getMonth(i) ? ln : Zo;
}
function Un(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function ti(e, t) {
  const n = Un(e, t), r = ei(e, t);
  return t.addDays(n, r * 7 - 1);
}
const Kn = {
  ...De,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let a;
      r && typeof r.format == "function" ? a = r.format.bind(r) : a = (s, c) => _e(s, c, { locale: De, ...n });
      let i = a(e, "PPPP");
      return t.today && (i = `Today, ${i}`), t.selected && (i = `${i}, selected`), i;
    },
    labelMonthDropdown: "Choose the Month",
    labelNext: "Go to the Next Month",
    labelPrevious: "Go to the Previous Month",
    labelWeekNumber: (e) => `Week ${e}`,
    labelYearDropdown: "Choose the Year",
    labelGrid: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (a, i) => _e(a, i, { locale: De, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let a;
      r && typeof r.format == "function" ? a = r.format.bind(r) : a = (s, c) => _e(s, c, { locale: De, ...n });
      let i = a(e, "PPPP");
      return t != null && t.today && (i = `Today, ${i}`), i;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (a, i) => _e(a, i, { locale: De, ...t }), r(e, "cccc");
    }
  }
};
class Z {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.today = () => {
      var a;
      if ((a = this.overrides) != null && a.today)
        return this.overrides.today();
      if (this.options.timeZone)
        return V.tz(this.options.timeZone);
      const r = this.options.Date ?? Date;
      return new r();
    }, this.newDate = (r, a, i) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, a, i) : this.options.timeZone ? new V(r, a, i, this.options.timeZone) : new Date(r, a, i);
    }, this.addDays = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.addDays ? this.overrides.addDays(r, a) : Bn(r, a);
    }, this.addMonths = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.addMonths ? this.overrides.addMonths(r, a) : zn(r, a);
    }, this.addWeeks = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.addWeeks ? this.overrides.addWeeks(r, a) : Fa(r, a);
    }, this.addYears = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.addYears ? this.overrides.addYears(r, a) : Aa(r, a);
    }, this.differenceInCalendarDays = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, a) : Et(r, a);
    }, this.differenceInCalendarMonths = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, a) : Jn(r, a);
    }, this.eachMonthOfInterval = (r) => {
      var a;
      return (a = this.overrides) != null && a.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Ha(r);
    }, this.eachYearOfInterval = (r) => {
      var c;
      const a = (c = this.overrides) != null && c.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : qa(r), i = new Set(a.map((l) => this.getYear(l)));
      if (i.size === a.length)
        return a;
      const s = [];
      return i.forEach((l) => {
        s.push(new Date(l, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : ti(r, this);
    }, this.endOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfISOWeek ? this.overrides.endOfISOWeek(r) : La(r);
    }, this.endOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfMonth ? this.overrides.endOfMonth(r) : Ra(r);
    }, this.endOfWeek = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.endOfWeek ? this.overrides.endOfWeek(r, a) : Ln(r, this.options);
    }, this.endOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfYear ? this.overrides.endOfYear(r) : Ga(r);
    }, this.format = (r, a, i) => {
      var c;
      const s = (c = this.overrides) != null && c.format ? this.overrides.format(r, a, this.options) : _e(r, a, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.getISOWeek ? this.overrides.getISOWeek(r) : Ft(r);
    }, this.getMonth = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.getMonth ? this.overrides.getMonth(r, this.options) : Go(r, this.options);
    }, this.getYear = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.getYear ? this.overrides.getYear(r, this.options) : qo(r, this.options);
    }, this.getWeek = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.getWeek ? this.overrides.getWeek(r, this.options) : At(r, this.options);
    }, this.isAfter = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isAfter ? this.overrides.isAfter(r, a) : Lo(r, a);
    }, this.isBefore = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isBefore ? this.overrides.isBefore(r, a) : Vo(r, a);
    }, this.isDate = (r) => {
      var a;
      return (a = this.overrides) != null && a.isDate ? this.overrides.isDate(r) : Hn(r);
    }, this.isSameDay = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isSameDay ? this.overrides.isSameDay(r, a) : Ba(r, a);
    }, this.isSameMonth = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isSameMonth ? this.overrides.isSameMonth(r, a) : Xo(r, a);
    }, this.isSameYear = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isSameYear ? this.overrides.isSameYear(r, a) : Uo(r, a);
    }, this.max = (r) => {
      var a;
      return (a = this.overrides) != null && a.max ? this.overrides.max(r) : _a(r);
    }, this.min = (r) => {
      var a;
      return (a = this.overrides) != null && a.min ? this.overrides.min(r) : Ya(r);
    }, this.setMonth = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.setMonth ? this.overrides.setMonth(r, a) : Ko(r, a);
    }, this.setYear = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.setYear ? this.overrides.setYear(r, a) : Qo(r, a);
    }, this.startOfBroadcastWeek = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Un(r, this);
    }, this.startOfDay = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfDay ? this.overrides.startOfDay(r) : Ge(r);
    }, this.startOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Je(r);
    }, this.startOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfMonth ? this.overrides.startOfMonth(r) : Ja(r);
    }, this.startOfWeek = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Oe(r, this.options);
    }, this.startOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfYear ? this.overrides.startOfYear(r) : qn(r);
    }, this.options = { locale: Kn, ...t }, this.overrides = n;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals: t = "latn" } = this.options, n = new Intl.NumberFormat("en-US", {
      numberingSystem: t
    }), r = {};
    for (let a = 0; a < 10; a++)
      r[a.toString()] = n.format(a);
    return r;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(t) {
    const n = this.getDigitMap();
    return t.replace(/\d/g, (r) => n[r] || r);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(t) {
    return this.replaceDigits(t.toString());
  }
  /**
   * Returns the preferred ordering for month and year labels for the current
   * locale.
   */
  getMonthYearOrder() {
    var n;
    const t = (n = this.options.locale) == null ? void 0 : n.code;
    return t && Z.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: a } = this.options, i = n == null ? void 0 : n.code;
    if (i && Z.yearFirstLocales.has(i))
      try {
        return new Intl.DateTimeFormat(i, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: a
        }).format(t);
      } catch {
      }
    const s = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, s);
  }
}
Z.yearFirstLocales = /* @__PURE__ */ new Set([
  "eu",
  "hu",
  "ja",
  "ja-Hira",
  "ja-JP",
  "ko",
  "ko-KR",
  "lt",
  "lt-LT",
  "lv",
  "lv-LV",
  "mn",
  "mn-MN",
  "zh",
  "zh-CN",
  "zh-HK",
  "zh-TW"
]);
const de = new Z();
class Qn {
  constructor(t, n, r = de) {
    this.date = t, this.displayMonth = n, this.outside = !!(n && !r.isSameMonth(t, n)), this.dateLib = r, this.isoDate = r.format(t, "yyyy-MM-dd"), this.displayMonthId = r.format(n, "yyyy-MM"), this.dateMonthId = r.format(t, "yyyy-MM");
  }
  /**
   * Checks if this day is equal to another `CalendarDay`, considering both the
   * date and the displayed month.
   *
   * @param day The `CalendarDay` to compare with.
   * @returns `true` if the days are equal, otherwise `false`.
   */
  isEqualTo(t) {
    return this.dateLib.isSameDay(t.date, this.date) && this.dateLib.isSameMonth(t.displayMonth, this.displayMonth);
  }
}
class ni {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class ri {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function ai(e) {
  return O.createElement("span", { ...e });
}
function oi(e) {
  const { size: t = 24, orientation: n = "left", className: r, style: a } = e;
  return O.createElement(
    "svg",
    { className: r, style: a, width: t, height: t, viewBox: "0 0 24 24" },
    n === "up" && O.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
    n === "down" && O.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
    n === "left" && O.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
    n === "right" && O.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
  );
}
function ii(e) {
  const { day: t, modifiers: n, ...r } = e;
  return O.createElement("td", { ...r });
}
function si(e) {
  const { day: t, modifiers: n, ...r } = e, a = O.useRef(null);
  return O.useEffect(() => {
    var i;
    n.focused && ((i = a.current) == null || i.focus());
  }, [n.focused]), O.createElement("button", { ref: a, ...r });
}
var D;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(D || (D = {}));
var B;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(B || (B = {}));
var ae;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(ae || (ae = {}));
var Q;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Q || (Q = {}));
const Zn = Le(void 0);
function ut() {
  const e = qe(Zn);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function ci(e) {
  const { options: t, className: n, ...r } = e, { classNames: a, components: i, styles: s } = ut(), c = [a[D.Dropdown], n].join(" "), l = t == null ? void 0 : t.find(({ value: d }) => d === r.value);
  return O.createElement(
    "span",
    { "data-disabled": r.disabled, className: a[D.DropdownRoot], style: s == null ? void 0 : s[D.DropdownRoot] },
    O.createElement(i.Select, { className: c, ...r }, t == null ? void 0 : t.map(({ value: d, label: h, disabled: u }) => O.createElement(i.Option, { key: d, value: d, disabled: u }, h))),
    O.createElement(
      "span",
      { className: a[D.CaptionLabel], style: s == null ? void 0 : s[D.CaptionLabel], "aria-hidden": !0 },
      l == null ? void 0 : l.label,
      O.createElement(i.Chevron, { orientation: "down", size: 18, className: a[D.Chevron], style: s == null ? void 0 : s[D.Chevron] })
    )
  );
}
function li(e) {
  return O.createElement("div", { ...e });
}
function di(e) {
  return O.createElement("div", { ...e });
}
function ui(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return O.createElement("div", { ...r }, e.children);
}
function fi(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return O.createElement("div", { ...r });
}
function hi(e) {
  return O.createElement("table", { ...e });
}
function pi(e) {
  return O.createElement("div", { ...e });
}
function mi(e) {
  const { components: t } = ut();
  return O.createElement(t.Dropdown, { ...e });
}
function gi(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: a, ...i } = e, { components: s, classNames: c, styles: l, labels: { labelPrevious: d, labelNext: h } } = ut(), u = q((m) => {
    a && (n == null || n(m));
  }, [a, n]), f = q((m) => {
    r && (t == null || t(m));
  }, [r, t]);
  return O.createElement(
    "nav",
    { ...i },
    O.createElement(
      s.PreviousMonthButton,
      { type: "button", className: c[D.PreviousMonthButton], style: l == null ? void 0 : l[D.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": d(r), onClick: f },
      O.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: c[D.Chevron], style: l == null ? void 0 : l[D.Chevron], orientation: "left" })
    ),
    O.createElement(
      s.NextMonthButton,
      { type: "button", className: c[D.NextMonthButton], style: l == null ? void 0 : l[D.NextMonthButton], tabIndex: a ? void 0 : -1, "aria-disabled": a ? void 0 : !0, "aria-label": h(a), onClick: u },
      O.createElement(s.Chevron, { disabled: a ? void 0 : !0, orientation: "right", className: c[D.Chevron], style: l == null ? void 0 : l[D.Chevron] })
    )
  );
}
function yi(e) {
  return O.createElement("button", { ...e });
}
function vi(e) {
  return O.createElement("option", { ...e });
}
function bi(e) {
  return O.createElement("button", { ...e });
}
function xi(e) {
  const { rootRef: t, ...n } = e;
  return O.createElement("div", { ...n, ref: t });
}
function ji(e) {
  return O.createElement("select", { ...e });
}
function wi(e) {
  const { week: t, ...n } = e;
  return O.createElement("tr", { ...n });
}
function ki(e) {
  return O.createElement("th", { ...e });
}
function Si(e) {
  return O.createElement(
    "thead",
    { "aria-hidden": !0 },
    O.createElement("tr", { ...e })
  );
}
function Ni(e) {
  const { week: t, ...n } = e;
  return O.createElement("th", { ...n });
}
function Mi(e) {
  return O.createElement("th", { ...e });
}
function Di(e) {
  return O.createElement("tbody", { ...e });
}
function Oi(e) {
  const { components: t } = ut();
  return O.createElement(t.Dropdown, { ...e });
}
const Ci = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CaptionLabel: ai,
  Chevron: oi,
  Day: ii,
  DayButton: si,
  Dropdown: ci,
  DropdownNav: li,
  Footer: di,
  Month: ui,
  MonthCaption: fi,
  MonthGrid: hi,
  Months: pi,
  MonthsDropdown: mi,
  Nav: gi,
  NextMonthButton: yi,
  Option: vi,
  PreviousMonthButton: bi,
  Root: xi,
  Select: ji,
  Week: wi,
  WeekNumber: Ni,
  WeekNumberHeader: Mi,
  Weekday: ki,
  Weekdays: Si,
  Weeks: Di,
  YearsDropdown: Oi
}, Symbol.toStringTag, { value: "Module" }));
function me(e, t, n = !1, r = de) {
  let { from: a, to: i } = e;
  const { differenceInCalendarDays: s, isSameDay: c } = r;
  return a && i ? (s(i, a) < 0 && ([a, i] = [i, a]), s(t, a) >= (n ? 1 : 0) && s(i, t) >= (n ? 1 : 0)) : !n && i ? c(i, t) : !n && a ? c(a, t) : !1;
}
function _t(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function ft(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Yt(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Bt(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function er(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function tr(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function ge(e, t, n = de) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: a, differenceInCalendarDays: i, isAfter: s } = n;
  return r.some((c) => {
    if (typeof c == "boolean")
      return c;
    if (n.isDate(c))
      return a(e, c);
    if (tr(c, n))
      return c.some((l) => a(e, l));
    if (ft(c))
      return me(c, e, !1, n);
    if (er(c))
      return Array.isArray(c.dayOfWeek) ? c.dayOfWeek.includes(e.getDay()) : c.dayOfWeek === e.getDay();
    if (_t(c)) {
      const l = i(c.before, e), d = i(c.after, e), h = l > 0, u = d < 0;
      return s(c.before, c.after) ? u && h : h || u;
    }
    return Yt(c) ? i(e, c.after) > 0 : Bt(c) ? i(c.before, e) > 0 : typeof c == "function" ? c(e) : !1;
  });
}
function $i(e, t, n, r, a) {
  const { disabled: i, hidden: s, modifiers: c, showOutsideDays: l, broadcastCalendar: d, today: h = a.today() } = t, { isSameDay: u, isSameMonth: f, startOfMonth: m, isBefore: b, endOfMonth: v, isAfter: w } = a, y = n && m(n), j = r && v(r), x = {
    [B.focused]: [],
    [B.outside]: [],
    [B.disabled]: [],
    [B.hidden]: [],
    [B.today]: []
  }, N = {};
  for (const k of e) {
    const { date: p, displayMonth: S } = k, M = !!(S && !f(p, S)), C = !!(y && b(p, y)), P = !!(j && w(p, j)), F = !!(i && ge(p, i, a)), X = !!(s && ge(p, s, a)) || C || P || // Broadcast calendar will show outside days as default
    !d && !l && M || d && l === !1 && M, G = u(p, h);
    M && x.outside.push(k), F && x.disabled.push(k), X && x.hidden.push(k), G && x.today.push(k), c && Object.keys(c).forEach((L) => {
      const ye = c == null ? void 0 : c[L];
      ye && ge(p, ye, a) && (N[L] ? N[L].push(k) : N[L] = [k]);
    });
  }
  return (k) => {
    const p = {
      [B.focused]: !1,
      [B.disabled]: !1,
      [B.hidden]: !1,
      [B.outside]: !1,
      [B.today]: !1
    }, S = {};
    for (const M in x) {
      const C = x[M];
      p[M] = C.some((P) => P === k);
    }
    for (const M in N)
      S[M] = N[M].some((C) => C === k);
    return {
      ...p,
      // custom modifiers should override all the previous ones
      ...S
    };
  };
}
function Wi(e, t, n = {}) {
  return Object.entries(e).filter(([, a]) => a === !0).reduce((a, [i]) => (n[i] ? a.push(n[i]) : t[B[i]] ? a.push(t[B[i]]) : t[ae[i]] && a.push(t[ae[i]]), a), [t[D.Day]]);
}
function Ti(e) {
  return {
    ...Ci,
    ...e
  };
}
function Pi(e) {
  const t = {
    "data-mode": e.mode ?? void 0,
    "data-required": "required" in e ? e.required : void 0,
    "data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
    "data-week-numbers": e.showWeekNumber || void 0,
    "data-broadcast-calendar": e.broadcastCalendar || void 0,
    "data-nav-layout": e.navLayout || void 0
  };
  return Object.entries(e).forEach(([n, r]) => {
    n.startsWith("data-") && (t[n] = r);
  }), t;
}
function Ii() {
  const e = {};
  for (const t in D)
    e[D[t]] = `rdp-${D[t]}`;
  for (const t in B)
    e[B[t]] = `rdp-${B[t]}`;
  for (const t in ae)
    e[ae[t]] = `rdp-${ae[t]}`;
  for (const t in Q)
    e[Q[t]] = `rdp-${Q[t]}`;
  return e;
}
function Ei(e, t, n) {
  return (n ?? new Z(t)).formatMonthYear(e);
}
function Fi(e, t, n) {
  return (n ?? new Z(t)).format(e, "d");
}
function Ai(e, t = de) {
  return t.format(e, "LLLL");
}
function _i(e, t, n) {
  return (n ?? new Z(t)).format(e, "cccccc");
}
function Yi(e, t = de) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Bi() {
  return "";
}
function zi(e, t = de) {
  return t.format(e, "yyyy");
}
const Ri = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Ei,
  formatDay: Fi,
  formatMonthDropdown: Ai,
  formatWeekNumber: Yi,
  formatWeekNumberHeader: Bi,
  formatWeekdayName: _i,
  formatYearDropdown: zi
}, Symbol.toStringTag, { value: "Module" }));
function Hi(e) {
  return {
    ...Ri,
    ...e
  };
}
function nr(e, t, n, r) {
  let a = (r ?? new Z(n)).format(e, "PPPP");
  return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
}
function rr(e, t, n) {
  return (n ?? new Z(t)).formatMonthYear(e);
}
function ar(e, t, n, r) {
  let a = (r ?? new Z(n)).format(e, "PPPP");
  return t != null && t.today && (a = `Today, ${a}`), a;
}
function or(e) {
  return "Choose the Month";
}
function ir() {
  return "";
}
const Ji = "Go to the Next Month";
function sr(e, t) {
  return Ji;
}
function cr(e) {
  return "Go to the Previous Month";
}
function lr(e, t, n) {
  return (n ?? new Z(t)).format(e, "cccc");
}
function dr(e, t) {
  return `Week ${e}`;
}
function ur(e) {
  return "Week Number";
}
function fr(e) {
  return "Choose the Year";
}
const Gi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelDayButton: nr,
  labelGrid: rr,
  labelGridcell: ar,
  labelMonthDropdown: or,
  labelNav: ir,
  labelNext: sr,
  labelPrevious: cr,
  labelWeekNumber: dr,
  labelWeekNumberHeader: ur,
  labelWeekday: lr,
  labelYearDropdown: fr
}, Symbol.toStringTag, { value: "Module" })), re = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function qi(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...Gi,
    ...e ?? {},
    labelDayButton: re(nr, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: re(or, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: re(sr, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: re(cr, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: re(dr, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: re(fr, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: re(rr, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: re(ar, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: re(ir, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: re(ur, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: re(lr, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function Li(e, t, n, r, a) {
  const { startOfMonth: i, startOfYear: s, endOfYear: c, eachMonthOfInterval: l, getMonth: d } = a;
  return l({
    start: s(e),
    end: c(e)
  }).map((f) => {
    const m = r.formatMonthDropdown(f, a), b = d(f), v = t && f < i(t) || n && f > i(n) || !1;
    return { value: b, label: m, disabled: v };
  });
}
function Vi(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[D.Day] };
  return Object.entries(e).filter(([, a]) => a === !0).forEach(([a]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[a]
    };
  }), r;
}
function Xi(e, t, n, r) {
  const a = r ?? e.today(), i = n ? e.startOfBroadcastWeek(a, e) : t ? e.startOfISOWeek(a) : e.startOfWeek(a), s = [];
  for (let c = 0; c < 7; c++) {
    const l = e.addDays(i, c);
    s.push(l);
  }
  return s;
}
function Ui(e, t, n, r, a = !1) {
  if (!e || !t)
    return;
  const { startOfYear: i, endOfYear: s, eachYearOfInterval: c, getYear: l } = r, d = i(e), h = s(t), u = c({ start: d, end: h });
  return a && u.reverse(), u.map((f) => {
    const m = n.formatYearDropdown(f, r);
    return {
      value: l(f),
      label: m,
      disabled: !1
    };
  });
}
function Ki(e, t = {}) {
  var c;
  const { weekStartsOn: n, locale: r } = t, a = n ?? ((c = r == null ? void 0 : r.options) == null ? void 0 : c.weekStartsOn) ?? 0, i = (l) => {
    const d = typeof l == "number" || typeof l == "string" ? new Date(l) : l;
    return new V(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, e);
  }, s = (l) => {
    const d = i(l);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => i(V.tz(e)),
    newDate: (l, d, h) => new V(l, d, h, 12, 0, 0, e),
    startOfDay: (l) => i(l),
    startOfWeek: (l, d) => {
      const h = i(l), u = (d == null ? void 0 : d.weekStartsOn) ?? a, f = (h.getDay() - u + 7) % 7;
      return h.setDate(h.getDate() - f), h;
    },
    startOfISOWeek: (l) => {
      const d = i(l), h = (d.getDay() - 1 + 7) % 7;
      return d.setDate(d.getDate() - h), d;
    },
    startOfMonth: (l) => {
      const d = i(l);
      return d.setDate(1), d;
    },
    startOfYear: (l) => {
      const d = i(l);
      return d.setMonth(0, 1), d;
    },
    endOfWeek: (l, d) => {
      const h = i(l), m = ((((d == null ? void 0 : d.weekStartsOn) ?? a) + 6) % 7 - h.getDay() + 7) % 7;
      return h.setDate(h.getDate() + m), h;
    },
    endOfISOWeek: (l) => {
      const d = i(l), h = (7 - d.getDay()) % 7;
      return d.setDate(d.getDate() + h), d;
    },
    endOfMonth: (l) => {
      const d = i(l);
      return d.setMonth(d.getMonth() + 1, 0), d;
    },
    endOfYear: (l) => {
      const d = i(l);
      return d.setMonth(11, 31), d;
    },
    eachMonthOfInterval: (l) => {
      const d = i(l.start), h = i(l.end), u = [], f = new V(d.getFullYear(), d.getMonth(), 1, 12, 0, 0, e), m = h.getFullYear() * 12 + h.getMonth();
      for (; f.getFullYear() * 12 + f.getMonth() <= m; )
        u.push(new V(f, e)), f.setMonth(f.getMonth() + 1, 1);
      return u;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (l, d) => {
      const h = i(l);
      return h.setDate(h.getDate() + d), h;
    },
    addWeeks: (l, d) => {
      const h = i(l);
      return h.setDate(h.getDate() + d * 7), h;
    },
    addMonths: (l, d) => {
      const h = i(l);
      return h.setMonth(h.getMonth() + d), h;
    },
    addYears: (l, d) => {
      const h = i(l);
      return h.setFullYear(h.getFullYear() + d), h;
    },
    eachYearOfInterval: (l) => {
      const d = i(l.start), h = i(l.end), u = [], f = new V(d.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; f.getFullYear() <= h.getFullYear(); )
        u.push(new V(f, e)), f.setFullYear(f.getFullYear() + 1, 0, 1);
      return u;
    },
    getWeek: (l, d) => {
      var u;
      const h = s(l);
      return At(h, {
        weekStartsOn: (d == null ? void 0 : d.weekStartsOn) ?? a,
        firstWeekContainsDate: (d == null ? void 0 : d.firstWeekContainsDate) ?? ((u = r == null ? void 0 : r.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (l) => {
      const d = s(l);
      return Ft(d);
    },
    differenceInCalendarDays: (l, d) => {
      const h = s(l), u = s(d);
      return Et(h, u);
    },
    differenceInCalendarMonths: (l, d) => {
      const h = s(l), u = s(d);
      return Jn(h, u);
    }
  };
}
const Xe = (e) => e instanceof HTMLElement ? e : null, kt = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Qi = (e) => Xe(e.querySelector("[data-animated-month]")), St = (e) => Xe(e.querySelector("[data-animated-caption]")), Nt = (e) => Xe(e.querySelector("[data-animated-weeks]")), Zi = (e) => Xe(e.querySelector("[data-animated-nav]")), es = (e) => Xe(e.querySelector("[data-animated-weekdays]"));
function ts(e, t, { classNames: n, months: r, focused: a, dateLib: i }) {
  const s = U(null), c = U(r), l = U(!1);
  ea(() => {
    const d = c.current;
    if (c.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const h = i.isSameMonth(r[0].date, d[0].date), u = i.isAfter(r[0].date, d[0].date), f = u ? n[Q.caption_after_enter] : n[Q.caption_before_enter], m = u ? n[Q.weeks_after_enter] : n[Q.weeks_before_enter], b = s.current, v = e.current.cloneNode(!0);
    if (v instanceof HTMLElement ? (kt(v).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const N = Qi(x);
      N && x.contains(N) && x.removeChild(N);
      const k = St(x);
      k && k.classList.remove(f);
      const p = Nt(x);
      p && p.classList.remove(m);
    }), s.current = v) : s.current = null, l.current || h || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    a)
      return;
    const w = b instanceof HTMLElement ? kt(b) : [], y = kt(e.current);
    if (y != null && y.every((j) => j instanceof HTMLElement) && (w != null && w.every((j) => j instanceof HTMLElement))) {
      l.current = !0, e.current.style.isolation = "isolate";
      const j = Zi(e.current);
      j && (j.style.zIndex = "1"), y.forEach((x, N) => {
        const k = w[N];
        if (!k)
          return;
        x.style.position = "relative", x.style.overflow = "hidden";
        const p = St(x);
        p && p.classList.add(f);
        const S = Nt(x);
        S && S.classList.add(m);
        const M = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), j && (j.style.zIndex = ""), p && p.classList.remove(f), S && S.classList.remove(m), x.style.position = "", x.style.overflow = "", x.contains(k) && x.removeChild(k);
        };
        k.style.pointerEvents = "none", k.style.position = "absolute", k.style.overflow = "hidden", k.setAttribute("aria-hidden", "true");
        const C = es(k);
        C && (C.style.opacity = "0");
        const P = St(k);
        P && (P.classList.add(u ? n[Q.caption_before_exit] : n[Q.caption_after_exit]), P.addEventListener("animationend", M));
        const F = Nt(k);
        F && F.classList.add(u ? n[Q.weeks_before_exit] : n[Q.weeks_after_exit]), x.insertBefore(k, x.firstChild);
      });
    }
  });
}
function ns(e, t, n, r) {
  const a = e[0], i = e[e.length - 1], { ISOWeek: s, fixedWeeks: c, broadcastCalendar: l } = n ?? {}, { addDays: d, differenceInCalendarDays: h, differenceInCalendarMonths: u, endOfBroadcastWeek: f, endOfISOWeek: m, endOfMonth: b, endOfWeek: v, isAfter: w, startOfBroadcastWeek: y, startOfISOWeek: j, startOfWeek: x } = r, N = l ? y(a, r) : s ? j(a) : x(a), k = l ? f(i) : s ? m(b(i)) : v(b(i)), p = t && (l ? f(t) : s ? m(t) : v(t)), S = p && w(k, p) ? p : k, M = h(S, N), C = u(i, a) + 1, P = [];
  for (let G = 0; G <= M; G++) {
    const L = d(N, G);
    P.push(L);
  }
  const X = (l ? 35 : 42) * C;
  if (c && P.length < X) {
    const G = X - P.length;
    for (let L = 0; L < G; L++) {
      const ye = d(P[P.length - 1], 1);
      P.push(ye);
    }
  }
  return P;
}
function rs(e) {
  const t = [];
  return e.reduce((n, r) => {
    const a = r.weeks.reduce((i, s) => i.concat(s.days.slice()), t.slice());
    return n.concat(a.slice());
  }, t.slice());
}
function as(e, t, n, r) {
  const { numberOfMonths: a = 1 } = n, i = [];
  for (let s = 0; s < a; s++) {
    const c = r.addMonths(e, s);
    if (t && c > t)
      break;
    i.push(c);
  }
  return i;
}
function dn(e, t, n, r) {
  const { month: a, defaultMonth: i, today: s = r.today(), numberOfMonths: c = 1 } = e;
  let l = a || i || s;
  const { differenceInCalendarMonths: d, addMonths: h, startOfMonth: u } = r;
  if (n && d(n, l) < c - 1) {
    const f = -1 * (c - 1);
    l = h(n, f);
  }
  return t && d(l, t) < 0 && (l = t), u(l);
}
function os(e, t, n, r) {
  const { addDays: a, endOfBroadcastWeek: i, endOfISOWeek: s, endOfMonth: c, endOfWeek: l, getISOWeek: d, getWeek: h, startOfBroadcastWeek: u, startOfISOWeek: f, startOfWeek: m } = r, b = e.reduce((v, w) => {
    const y = n.broadcastCalendar ? u(w, r) : n.ISOWeek ? f(w) : m(w), j = n.broadcastCalendar ? i(w) : n.ISOWeek ? s(c(w)) : l(c(w)), x = t.filter((S) => S >= y && S <= j), N = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < N) {
      const S = t.filter((M) => {
        const C = N - x.length;
        return M > j && M <= a(j, C);
      });
      x.push(...S);
    }
    const k = x.reduce((S, M) => {
      const C = n.ISOWeek ? d(M) : h(M), P = S.find((X) => X.weekNumber === C), F = new Qn(M, w, r);
      return P ? P.days.push(F) : S.push(new ri(C, [F])), S;
    }, []), p = new ni(w, k);
    return v.push(p), v;
  }, []);
  return n.reverseMonths ? b.reverse() : b;
}
function is(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: a, startOfDay: i, startOfMonth: s, endOfMonth: c, addYears: l, endOfYear: d, today: h } = t, u = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : !n && u && (n = a(l(e.today ?? h(), -100))), r ? r = c(r) : !r && u && (r = d(e.today ?? h())), [
    n && i(n),
    r && i(r)
  ];
}
function ss(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: i = 1 } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: l } = r, d = a ? i : 1, h = s(e);
  if (!t)
    return c(h, d);
  if (!(l(t, e) < i))
    return c(h, d);
}
function cs(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: i } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: l } = r, d = a ? i ?? 1 : 1, h = s(e);
  if (!t)
    return c(h, -d);
  if (!(l(h, t) <= 0))
    return c(h, -d);
}
function ls(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function ht(e, t) {
  const [n, r] = W(e);
  return [t === void 0 ? n : t, r];
}
function ds(e, t) {
  var N;
  const [n, r] = is(e, t), { startOfMonth: a, endOfMonth: i } = t, s = dn(e, n, r, t), [c, l] = ht(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  K(() => {
    const k = dn(e, n, r, t);
    l(k);
  }, [e.timeZone]);
  const { months: d, weeks: h, days: u, previousMonth: f, nextMonth: m } = Re(() => {
    const k = as(c, r, { numberOfMonths: e.numberOfMonths }, t), p = ns(k, e.endMonth ? i(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), S = os(k, p, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), M = ls(S), C = rs(S), P = cs(c, n, e, t), F = ss(c, r, e, t);
    return {
      months: S,
      weeks: M,
      days: C,
      previousMonth: P,
      nextMonth: F
    };
  }, [
    t,
    c.getTime(),
    r == null ? void 0 : r.getTime(),
    n == null ? void 0 : n.getTime(),
    e.disableNavigation,
    e.broadcastCalendar,
    (N = e.endMonth) == null ? void 0 : N.getTime(),
    e.fixedWeeks,
    e.ISOWeek,
    e.numberOfMonths,
    e.pagedNavigation,
    e.reverseMonths
  ]), { disableNavigation: b, onMonthChange: v } = e, w = (k) => h.some((p) => p.days.some((S) => S.isEqualTo(k))), y = (k) => {
    if (b)
      return;
    let p = a(k);
    n && p < a(n) && (p = a(n)), r && p > a(r) && (p = a(r)), l(p), v == null || v(p);
  };
  return {
    months: d,
    weeks: h,
    days: u,
    navStart: n,
    navEnd: r,
    previousMonth: f,
    nextMonth: m,
    goToMonth: y,
    goToDay: (k) => {
      w(k) || y(k.date);
    }
  };
}
var se;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(se || (se = {}));
function un(e) {
  return !e[B.disabled] && !e[B.hidden] && !e[B.outside];
}
function us(e, t, n, r) {
  let a, i = -1;
  for (const s of e) {
    const c = t(s);
    un(c) && (c[B.focused] && i < se.FocusedModifier ? (a = s, i = se.FocusedModifier) : r != null && r.isEqualTo(s) && i < se.LastFocused ? (a = s, i = se.LastFocused) : n(s.date) && i < se.Selected ? (a = s, i = se.Selected) : c[B.today] && i < se.Today && (a = s, i = se.Today));
  }
  return a || (a = e.find((s) => un(t(s)))), a;
}
function fs(e, t, n, r, a, i, s) {
  const { ISOWeek: c, broadcastCalendar: l } = i, { addDays: d, addMonths: h, addWeeks: u, addYears: f, endOfBroadcastWeek: m, endOfISOWeek: b, endOfWeek: v, max: w, min: y, startOfBroadcastWeek: j, startOfISOWeek: x, startOfWeek: N } = s;
  let p = {
    day: d,
    week: u,
    month: h,
    year: f,
    startOfWeek: (S) => l ? j(S, s) : c ? x(S) : N(S),
    endOfWeek: (S) => l ? m(S) : c ? b(S) : v(S)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? p = w([r, p]) : t === "after" && a && (p = y([a, p])), p;
}
function hr(e, t, n, r, a, i, s, c = 0) {
  if (c > 365)
    return;
  const l = fs(e, t, n.date, r, a, i, s), d = !!(i.disabled && ge(l, i.disabled, s)), h = !!(i.hidden && ge(l, i.hidden, s)), u = l, f = new Qn(l, u, s);
  return !d && !h ? f : hr(e, t, f, r, a, i, s, c + 1);
}
function hs(e, t, n, r, a) {
  const { autoFocus: i } = e, [s, c] = W(), l = us(t.days, n, r || (() => !1), s), [d, h] = W(i ? l : void 0);
  return {
    isFocusTarget: (v) => !!(l != null && l.isEqualTo(v)),
    setFocused: h,
    focused: d,
    blur: () => {
      c(d), h(void 0);
    },
    moveFocus: (v, w) => {
      if (!d)
        return;
      const y = hr(v, w, d, t.navStart, t.navEnd, e, a);
      y && (e.disableNavigation && !t.days.some((x) => x.isEqualTo(y)) || (t.goToDay(y), h(y)));
    }
  };
}
function ps(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [i, s] = ht(n, a ? n : void 0), c = a ? n : i, { isSameDay: l } = t, d = (m) => (c == null ? void 0 : c.some((b) => l(b, m))) ?? !1, { min: h, max: u } = e;
  return {
    selected: c,
    select: (m, b, v) => {
      let w = [...c ?? []];
      if (d(m)) {
        if ((c == null ? void 0 : c.length) === h || r && (c == null ? void 0 : c.length) === 1)
          return;
        w = c == null ? void 0 : c.filter((y) => !l(y, m));
      } else
        (c == null ? void 0 : c.length) === u ? w = [m] : w = [...w, m];
      return a || s(w), a == null || a(w, m, b, v), w;
    },
    isSelected: d
  };
}
function ms(e, t, n = 0, r = 0, a = !1, i = de) {
  const { from: s, to: c } = t || {}, { isSameDay: l, isAfter: d, isBefore: h } = i;
  let u;
  if (!s && !c)
    u = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !c)
    l(s, e) ? n === 0 ? u = { from: s, to: e } : a ? u = { from: s, to: void 0 } : u = void 0 : h(e, s) ? u = { from: e, to: s } : u = { from: s, to: e };
  else if (s && c)
    if (l(s, e) && l(c, e))
      a ? u = { from: s, to: c } : u = void 0;
    else if (l(s, e))
      u = { from: s, to: n > 0 ? void 0 : e };
    else if (l(c, e))
      u = { from: e, to: n > 0 ? void 0 : e };
    else if (h(e, s))
      u = { from: e, to: c };
    else if (d(e, s))
      u = { from: s, to: e };
    else if (d(e, c))
      u = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (u != null && u.from && (u != null && u.to)) {
    const f = i.differenceInCalendarDays(u.to, u.from);
    r > 0 && f > r ? u = { from: e, to: void 0 } : n > 1 && f < n && (u = { from: e, to: void 0 });
  }
  return u;
}
function gs(e, t, n = de) {
  const r = Array.isArray(t) ? t : [t];
  let a = e.from;
  const i = n.differenceInCalendarDays(e.to, e.from), s = Math.min(i, 6);
  for (let c = 0; c <= s; c++) {
    if (r.includes(a.getDay()))
      return !0;
    a = n.addDays(a, 1);
  }
  return !1;
}
function fn(e, t, n = de) {
  return me(e, t.from, !1, n) || me(e, t.to, !1, n) || me(t, e.from, !1, n) || me(t, e.to, !1, n);
}
function ys(e, t, n = de) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((c) => typeof c != "function").some((c) => typeof c == "boolean" ? c : n.isDate(c) ? me(e, c, !1, n) : tr(c, n) ? c.some((l) => me(e, l, !1, n)) : ft(c) ? c.from && c.to ? fn(e, { from: c.from, to: c.to }, n) : !1 : er(c) ? gs(e, c.dayOfWeek, n) : _t(c) ? n.isAfter(c.before, c.after) ? fn(e, {
    from: n.addDays(c.after, 1),
    to: n.addDays(c.before, -1)
  }, n) : ge(e.from, c, n) || ge(e.to, c, n) : Yt(c) || Bt(c) ? ge(e.from, c, n) || ge(e.to, c, n) : !1))
    return !0;
  const s = r.filter((c) => typeof c == "function");
  if (s.length) {
    let c = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let d = 0; d <= l; d++) {
      if (s.some((h) => h(c)))
        return !0;
      c = n.addDays(c, 1);
    }
  }
  return !1;
}
function vs(e, t) {
  const { disabled: n, excludeDisabled: r, resetOnSelect: a, selected: i, required: s, onSelect: c } = e, [l, d] = ht(i, c ? i : void 0), h = c ? i : l;
  return {
    selected: h,
    select: (m, b, v) => {
      const { min: w, max: y } = e;
      let j;
      if (m) {
        const x = h == null ? void 0 : h.from, N = h == null ? void 0 : h.to, k = !!x && !!N, p = !!x && !!N && t.isSameDay(x, N) && t.isSameDay(m, x);
        a && (k || !(h != null && h.from)) ? !s && p ? j = void 0 : j = { from: m, to: void 0 } : j = ms(m, h, w, y, s, t);
      }
      return r && n && (j != null && j.from) && j.to && ys({ from: j.from, to: j.to }, n, t) && (j.from = m, j.to = void 0), c || d(j), c == null || c(j, m, b, v), j;
    },
    isSelected: (m) => h && me(h, m, !1, t)
  };
}
function bs(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [i, s] = ht(n, a ? n : void 0), c = a ? n : i, { isSameDay: l } = t;
  return {
    selected: c,
    select: (u, f, m) => {
      let b = u;
      return !r && c && c && l(u, c) && (b = void 0), a || s(b), a == null || a(b, u, f, m), b;
    },
    isSelected: (u) => c ? l(c, u) : !1
  };
}
function xs(e, t) {
  const n = bs(e, t), r = ps(e, t), a = vs(e, t);
  switch (e.mode) {
    case "single":
      return n;
    case "multiple":
      return r;
    case "range":
      return a;
    default:
      return;
  }
}
function ee(e, t) {
  return e instanceof V && e.timeZone === t ? e : new V(e, t);
}
function Ne(e, t, n) {
  return ee(e, t);
}
function hn(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? Ne(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? Ne(r, t) : r) : ft(e) ? {
    ...e,
    from: e.from ? ee(e.from, t) : e.from,
    to: e.to ? ee(e.to, t) : e.to
  } : _t(e) ? {
    before: Ne(e.before, t),
    after: Ne(e.after, t)
  } : Yt(e) ? {
    after: Ne(e.after, t)
  } : Bt(e) ? {
    before: Ne(e.before, t)
  } : e;
}
function Mt(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => hn(r, t)) : hn(e, t));
}
function pr(e) {
  var Vt;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = ee(t.today, n)), t.month && (t.month = ee(t.month, n)), t.defaultMonth && (t.defaultMonth = ee(t.defaultMonth, n)), t.startMonth && (t.startMonth = ee(t.startMonth, n)), t.endMonth && (t.endMonth = ee(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = ee(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = (Vt = t.selected) == null ? void 0 : Vt.map(($) => ee($, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? ee(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? ee(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = Mt(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Mt(t.hidden, n)), t.modifiers)) {
    const $ = {};
    Object.keys(t.modifiers).forEach((I) => {
      var T;
      $[I] = Mt((T = t.modifiers) == null ? void 0 : T[I], n);
    }), t.modifiers = $;
  }
  const { components: r, formatters: a, labels: i, dateLib: s, locale: c, classNames: l } = Re(() => {
    const $ = { ...Kn, ...t.locale }, I = t.broadcastCalendar ? 1 : t.weekStartsOn, T = t.noonSafe && t.timeZone ? Ki(t.timeZone, {
      weekStartsOn: I,
      locale: $
    }) : void 0, R = t.dateLib && T ? { ...T, ...t.dateLib } : t.dateLib ?? T, A = new Z({
      locale: $,
      weekStartsOn: I,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, R);
    return {
      dateLib: A,
      components: Ti(t.components),
      formatters: Hi(t.formatters),
      labels: qi(t.labels, A.options),
      locale: $,
      classNames: { ...Ii(), ...t.classNames }
    };
  }, [
    t.locale,
    t.broadcastCalendar,
    t.weekStartsOn,
    t.firstWeekContainsDate,
    t.useAdditionalWeekYearTokens,
    t.useAdditionalDayOfYearTokens,
    t.timeZone,
    t.numerals,
    t.dateLib,
    t.noonSafe,
    t.components,
    t.formatters,
    t.labels,
    t.classNames
  ]);
  t.today || (t = { ...t, today: s.today() });
  const { captionLayout: d, mode: h, navLayout: u, numberOfMonths: f = 1, onDayBlur: m, onDayClick: b, onDayFocus: v, onDayKeyDown: w, onDayMouseEnter: y, onDayMouseLeave: j, onNextClick: x, onPrevClick: N, showWeekNumber: k, styles: p } = t, { formatCaption: S, formatDay: M, formatMonthDropdown: C, formatWeekNumber: P, formatWeekNumberHeader: F, formatWeekdayName: X, formatYearDropdown: G } = a, L = ds(t, s), { days: ye, months: be, navStart: pt, navEnd: mt, previousMonth: te, nextMonth: ne, goToMonth: ue } = L, gt = $i(ye, t, pt, mt, s), { isSelected: $e, select: We, selected: Ue } = xs(t, s) ?? {}, { blur: Rt, focused: Ke, isFocusTarget: Dr, moveFocus: Ht, setFocused: Qe } = hs(t, L, gt, $e ?? (() => !1), s), { labelDayButton: Or, labelGridcell: Cr, labelGrid: $r, labelMonthDropdown: Wr, labelNav: Jt, labelPrevious: Tr, labelNext: Pr, labelWeekday: Ir, labelWeekNumber: Er, labelWeekNumberHeader: Fr, labelYearDropdown: Ar } = i, _r = Re(() => Xi(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), Gt = h !== void 0 || b !== void 0, yt = q(() => {
    te && (ue(te), N == null || N(te));
  }, [te, ue, N]), vt = q(() => {
    ne && (ue(ne), x == null || x(ne));
  }, [ue, ne, x]), Yr = q(($, I) => (T) => {
    T.preventDefault(), T.stopPropagation(), Qe($), !I.disabled && (We == null || We($.date, I, T), b == null || b($.date, I, T));
  }, [We, b, Qe]), Br = q(($, I) => (T) => {
    Qe($), v == null || v($.date, I, T);
  }, [v, Qe]), zr = q(($, I) => (T) => {
    Rt(), m == null || m($.date, I, T);
  }, [Rt, m]), Rr = q(($, I) => (T) => {
    const R = {
      ArrowLeft: [
        T.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        T.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [T.shiftKey ? "year" : "week", "after"],
      ArrowUp: [T.shiftKey ? "year" : "week", "before"],
      PageUp: [T.shiftKey ? "year" : "month", "before"],
      PageDown: [T.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (R[T.key]) {
      T.preventDefault(), T.stopPropagation();
      const [A, oe] = R[T.key];
      Ht(A, oe);
    }
    w == null || w($.date, I, T);
  }, [Ht, w, t.dir]), Hr = q(($, I) => (T) => {
    y == null || y($.date, I, T);
  }, [y]), Jr = q(($, I) => (T) => {
    j == null || j($.date, I, T);
  }, [j]), Gr = q(($, I) => (T) => {
    const R = Number(T.target.value), A = s.setMonth(s.startOfMonth($), R);
    ue(s.addMonths(A, -I));
  }, [s, ue]), qr = q(($, I) => (T) => {
    const R = Number(T.target.value), A = s.setYear(s.startOfMonth($), R);
    ue(s.addMonths(A, -I));
  }, [s, ue]), { className: Lr, style: Vr } = Re(() => ({
    className: [l[D.Root], t.className].filter(Boolean).join(" "),
    style: { ...p == null ? void 0 : p[D.Root], ...t.style }
  }), [l, t.className, t.style, p]), Xr = Pi(t), qt = ($) => {
    const I = p == null ? void 0 : p[D.Dropdown], T = p == null ? void 0 : p[$];
    if (!(!I && !T))
      return {
        ...I,
        ...T
      };
  }, Lt = U(null);
  ts(Lt, !!t.animate, {
    classNames: l,
    months: be,
    focused: Ke,
    dateLib: s
  });
  const Ur = {
    dayPickerProps: t,
    selected: Ue,
    select: We,
    isSelected: $e,
    months: be,
    nextMonth: ne,
    previousMonth: te,
    goToMonth: ue,
    getModifiers: gt,
    components: r,
    classNames: l,
    styles: p,
    labels: i,
    formatters: a
  };
  return O.createElement(
    Zn.Provider,
    { value: Ur },
    O.createElement(
      r.Root,
      { rootRef: t.animate ? Lt : void 0, className: Lr, style: Vr, dir: t.dir, id: t.id, lang: t.lang ?? c.code, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Xr },
      O.createElement(
        r.Months,
        { className: l[D.Months], style: p == null ? void 0 : p[D.Months] },
        !t.hideNavigation && !u && O.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[D.Nav], style: p == null ? void 0 : p[D.Nav], "aria-label": Jt(), onPreviousClick: yt, onNextClick: vt, previousMonth: te, nextMonth: ne }),
        be.map(($, I) => {
          const T = t.reverseMonths ? be.length - 1 - I : I;
          return O.createElement(
            r.Month,
            {
              "data-animated-month": t.animate ? "true" : void 0,
              className: l[D.Month],
              style: p == null ? void 0 : p[D.Month],
              // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
              key: I,
              displayIndex: I,
              calendarMonth: $
            },
            u === "around" && !t.hideNavigation && I === 0 && O.createElement(
              r.PreviousMonthButton,
              { type: "button", className: l[D.PreviousMonthButton], style: p == null ? void 0 : p[D.PreviousMonthButton], tabIndex: te ? void 0 : -1, "aria-disabled": te ? void 0 : !0, "aria-label": Tr(te), onClick: yt, "data-animated-button": t.animate ? "true" : void 0 },
              O.createElement(r.Chevron, { disabled: te ? void 0 : !0, className: l[D.Chevron], style: p == null ? void 0 : p[D.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
            ),
            O.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: l[D.MonthCaption], style: p == null ? void 0 : p[D.MonthCaption], calendarMonth: $, displayIndex: I }, d != null && d.startsWith("dropdown") ? O.createElement(
              r.DropdownNav,
              { className: l[D.Dropdowns], style: p == null ? void 0 : p[D.Dropdowns] },
              (() => {
                const R = d === "dropdown" || d === "dropdown-months" ? O.createElement(r.MonthsDropdown, { key: "month", className: l[D.MonthsDropdown], "aria-label": Wr(), disabled: !!t.disableNavigation, onChange: Gr($.date, T), options: Li($.date, pt, mt, a, s), style: qt(D.MonthsDropdown), value: s.getMonth($.date) }) : O.createElement("span", { key: "month" }, C($.date, s)), A = d === "dropdown" || d === "dropdown-years" ? O.createElement(r.YearsDropdown, { key: "year", className: l[D.YearsDropdown], "aria-label": Ar(s.options), disabled: !!t.disableNavigation, onChange: qr($.date, T), options: Ui(pt, mt, a, s, !!t.reverseYears), style: qt(D.YearsDropdown), value: s.getYear($.date) }) : O.createElement("span", { key: "year" }, G($.date, s));
                return s.getMonthYearOrder() === "year-first" ? [A, R] : [R, A];
              })(),
              O.createElement("span", { role: "status", "aria-live": "polite", style: {
                border: 0,
                clip: "rect(0 0 0 0)",
                height: "1px",
                margin: "-1px",
                overflow: "hidden",
                padding: 0,
                position: "absolute",
                width: "1px",
                whiteSpace: "nowrap",
                wordWrap: "normal"
              } }, S($.date, s.options, s))
            ) : O.createElement(r.CaptionLabel, { className: l[D.CaptionLabel], style: p == null ? void 0 : p[D.CaptionLabel], role: "status", "aria-live": "polite" }, S($.date, s.options, s))),
            u === "around" && !t.hideNavigation && I === f - 1 && O.createElement(
              r.NextMonthButton,
              { type: "button", className: l[D.NextMonthButton], style: p == null ? void 0 : p[D.NextMonthButton], tabIndex: ne ? void 0 : -1, "aria-disabled": ne ? void 0 : !0, "aria-label": Pr(ne), onClick: vt, "data-animated-button": t.animate ? "true" : void 0 },
              O.createElement(r.Chevron, { disabled: ne ? void 0 : !0, className: l[D.Chevron], style: p == null ? void 0 : p[D.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
            ),
            I === f - 1 && u === "after" && !t.hideNavigation && O.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[D.Nav], style: p == null ? void 0 : p[D.Nav], "aria-label": Jt(), onPreviousClick: yt, onNextClick: vt, previousMonth: te, nextMonth: ne }),
            O.createElement(
              r.MonthGrid,
              { role: "grid", "aria-multiselectable": h === "multiple" || h === "range", "aria-label": $r($.date, s.options, s) || void 0, className: l[D.MonthGrid], style: p == null ? void 0 : p[D.MonthGrid] },
              !t.hideWeekdays && O.createElement(
                r.Weekdays,
                { "data-animated-weekdays": t.animate ? "true" : void 0, className: l[D.Weekdays], style: p == null ? void 0 : p[D.Weekdays] },
                k && O.createElement(r.WeekNumberHeader, { "aria-label": Fr(s.options), className: l[D.WeekNumberHeader], style: p == null ? void 0 : p[D.WeekNumberHeader], scope: "col" }, F()),
                _r.map((R) => O.createElement(r.Weekday, { "aria-label": Ir(R, s.options, s), className: l[D.Weekday], key: String(R), style: p == null ? void 0 : p[D.Weekday], scope: "col" }, X(R, s.options, s)))
              ),
              O.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: l[D.Weeks], style: p == null ? void 0 : p[D.Weeks] }, $.weeks.map((R) => O.createElement(
                r.Week,
                { className: l[D.Week], key: R.weekNumber, style: p == null ? void 0 : p[D.Week], week: R },
                k && O.createElement(r.WeekNumber, { week: R, style: p == null ? void 0 : p[D.WeekNumber], "aria-label": Er(R.weekNumber, {
                  locale: c
                }), className: l[D.WeekNumber], scope: "row", role: "rowheader" }, P(R.weekNumber, s)),
                R.days.map((A) => {
                  const { date: oe } = A, E = gt(A);
                  if (E[B.focused] = !E.hidden && !!(Ke != null && Ke.isEqualTo(A)), E[ae.selected] = ($e == null ? void 0 : $e(oe)) || E.selected, ft(Ue)) {
                    const { from: bt, to: xt } = Ue;
                    E[ae.range_start] = !!(bt && xt && s.isSameDay(oe, bt)), E[ae.range_end] = !!(bt && xt && s.isSameDay(oe, xt)), E[ae.range_middle] = me(Ue, oe, !0, s);
                  }
                  const Kr = Vi(E, p, t.modifiersStyles), Qr = Wi(E, l, t.modifiersClassNames), Zr = !Gt && !E.hidden ? Cr(oe, E, s.options, s) : void 0;
                  return O.createElement(r.Day, { key: `${A.isoDate}_${A.displayMonthId}`, day: A, modifiers: E, className: Qr.join(" "), style: Kr, role: "gridcell", "aria-selected": E.selected || void 0, "aria-label": Zr, "data-day": A.isoDate, "data-month": A.outside ? A.dateMonthId : void 0, "data-selected": E.selected || void 0, "data-disabled": E.disabled || void 0, "data-hidden": E.hidden || void 0, "data-outside": A.outside || void 0, "data-focused": E.focused || void 0, "data-today": E.today || void 0 }, !E.hidden && Gt ? O.createElement(r.DayButton, { className: l[D.DayButton], style: p == null ? void 0 : p[D.DayButton], type: "button", day: A, modifiers: E, disabled: !E.focused && E.disabled || void 0, "aria-disabled": E.focused && E.disabled || void 0, tabIndex: Dr(A) ? 0 : -1, "aria-label": Or(oe, E, s.options, s), onClick: Yr(A, E), onBlur: zr(A, E), onFocus: Br(A, E), onKeyDown: Rr(A, E), onMouseEnter: Hr(A, E), onMouseLeave: Jr(A, E) }, M(oe, s.options, s)) : !E.hidden && M(A.date, s.options, s));
                })
              )))
            )
          );
        })
      ),
      t.footer && O.createElement(r.Footer, { className: l[D.Footer], style: p == null ? void 0 : p[D.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function js(e) {
  return e ? e.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}
function Bc({
  value: e,
  onChange: t,
  placeholder: n = "Select date",
  disabled: r = !1,
  minDate: a,
  maxDate: i
}) {
  const [s, c] = W(!1), l = U(null);
  K(() => {
    if (!s) return;
    function f(m) {
      l.current && !l.current.contains(m.target) && c(!1);
    }
    return document.addEventListener("mousedown", f), () => document.removeEventListener("mousedown", f);
  }, [s]);
  const d = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 38,
    padding: "0 12px",
    background: "var(--j-bg-panel)",
    border: "1px solid var(--j-border)",
    color: e ? "var(--j-accent)" : "var(--j-text-dim)",
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: ".08em",
    cursor: r ? "not-allowed" : "pointer",
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
    opacity: r ? 0.4 : 1
  }, h = {
    position: "absolute",
    zIndex: 100,
    top: "100%",
    left: 0,
    marginTop: 4,
    background: "var(--j-bg-overlay, var(--j-bg-panel))",
    border: "1px solid var(--j-border)",
    clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
    padding: "8px 12px",
    color: "var(--j-text-primary)",
    fontFamily: "'Courier New', monospace"
  }, u = [
    ...a ? [{ before: a }] : [],
    ...i ? [{ after: i }] : []
  ];
  return /* @__PURE__ */ g("div", { ref: l, style: { position: "relative", display: "inline-block" }, children: [
    /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        style: d,
        disabled: r,
        onClick: () => {
          r || c((f) => !f);
        },
        children: [
          /* @__PURE__ */ o("span", { style: { fontSize: 10 }, children: "◈" }),
          /* @__PURE__ */ o("span", { children: js(e) || n })
        ]
      }
    ),
    s && /* @__PURE__ */ o("div", { style: h, children: /* @__PURE__ */ o(
      pr,
      {
        mode: "single",
        selected: e,
        onSelect: (f) => {
          t == null || t(f), c(!1);
        },
        disabled: u.length > 0 ? u : void 0
      }
    ) })
  ] });
}
function pn(e) {
  return e ? e.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}
function zc({
  value: e,
  onChange: t,
  placeholder: n = "Select range",
  disabled: r = !1
}) {
  const [a, i] = W({}), [s, c] = W(!1), l = U(null), d = e !== void 0 ? e : a;
  K(() => {
    if (!s) return;
    function b(v) {
      l.current && !l.current.contains(v.target) && c(!1);
    }
    return document.addEventListener("mousedown", b), () => document.removeEventListener("mousedown", b);
  }, [s]);
  function h(b) {
    const v = b ?? {};
    e === void 0 && i(v), t == null || t(v);
  }
  const u = d.from ? `${pn(d.from)} — ${d.to ? pn(d.to) : "..."}` : n, f = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 38,
    padding: "0 12px",
    background: "var(--j-bg-panel)",
    border: "1px solid var(--j-border)",
    color: d.from ? "var(--j-accent)" : "var(--j-text-dim)",
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: ".08em",
    cursor: r ? "not-allowed" : "pointer",
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
    opacity: r ? 0.4 : 1
  };
  return /* @__PURE__ */ g("div", { ref: l, style: { position: "relative", display: "inline-block" }, children: [
    /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        style: f,
        disabled: r,
        onClick: () => {
          r || c((b) => !b);
        },
        children: [
          /* @__PURE__ */ o("span", { style: { fontSize: 10 }, children: "◈" }),
          /* @__PURE__ */ o("span", { children: u })
        ]
      }
    ),
    s && /* @__PURE__ */ o("div", { style: {
      position: "absolute",
      zIndex: 100,
      top: "100%",
      left: 0,
      marginTop: 4,
      background: "var(--j-bg-overlay, var(--j-bg-panel))",
      border: "1px solid var(--j-border)",
      clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
      padding: "8px 12px",
      color: "var(--j-text-primary)",
      fontFamily: "'Courier New', monospace"
    }, children: /* @__PURE__ */ o(
      pr,
      {
        mode: "range",
        selected: d,
        onSelect: h
      }
    ) })
  ] });
}
function mn(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function gn(e) {
  return String(e).padStart(2, "0");
}
function Rc({
  value: e,
  onChange: t,
  disabled: n = !1,
  format: r = "24h"
}) {
  const [a, i] = W(e ? e.split(":")[0] : ""), [s, c] = W(e ? e.split(":")[1] : "");
  K(() => {
    e && (i(e.split(":")[0]), c(e.split(":")[1]));
  }, [e]);
  const l = r === "12h" ? 12 : 23;
  function d(f) {
    const m = mn(parseInt(f || "0", 10), 0, l), b = gn(m);
    i(b), t == null || t(`${b}:${s || "00"}`);
  }
  function h(f) {
    const m = mn(parseInt(f || "0", 10), 0, 59), b = gn(m);
    c(b), t == null || t(`${a || "00"}:${b}`);
  }
  const u = {
    width: 44,
    height: 38,
    textAlign: "center",
    background: "var(--j-bg-panel)",
    border: "1px solid var(--j-border)",
    color: "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: 16,
    letterSpacing: ".1em",
    outline: "none",
    clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)"
  };
  return /* @__PURE__ */ g("div", { style: { display: "inline-flex", alignItems: "center", gap: 4, opacity: n ? 0.4 : 1 }, children: [
    /* @__PURE__ */ o(
      "input",
      {
        type: "number",
        min: 0,
        max: l,
        value: a,
        placeholder: "HH",
        disabled: n,
        onChange: (f) => i(f.target.value),
        onBlur: (f) => d(f.target.value),
        style: u
      }
    ),
    /* @__PURE__ */ o("span", { style: { color: "var(--j-accent)", fontFamily: "'Courier New', monospace", fontSize: 16, userSelect: "none" }, children: ":" }),
    /* @__PURE__ */ o(
      "input",
      {
        type: "number",
        min: 0,
        max: 59,
        value: s,
        placeholder: "MM",
        disabled: n,
        onChange: (f) => c(f.target.value),
        onBlur: (f) => h(f.target.value),
        style: u
      }
    )
  ] });
}
const yn = {
  cyan: { background: "var(--j-accent-12)", color: "var(--j-cyan)", border: "1px solid var(--j-accent-35)" },
  amber: { background: "var(--j-warn-12)", color: "var(--j-amber)", border: "1px solid var(--j-warn-25)" },
  red: { background: "var(--j-err-12)", color: "var(--j-red)", border: "1px solid var(--j-err-25)" },
  green: { background: "var(--j-ok-12)", color: "var(--j-green)", border: "1px solid var(--j-ok-25)" },
  ghost: { background: "var(--j-accent-05)", color: "var(--j-text-muted)", border: "1px solid var(--j-border-dim)" },
  blue: { background: "var(--j-accent-12)", color: "var(--j-accent)", border: "1px solid var(--j-accent-35)" },
  white: { background: "var(--j-accent-05)", color: "var(--j-text-primary)", border: "1px solid var(--j-border)" }
}, vn = {
  xs: { fontSize: 8, padding: "2px 7px" },
  sm: { fontSize: 9, padding: "3px 9px" },
  md: { fontSize: 10, padding: "4px 12px" },
  lg: { fontSize: 11, padding: "5px 14px" },
  xl: { fontSize: 12, padding: "6px 16px" }
}, ws = {
  angular: { clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" },
  hex: { clipPath: "polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)", paddingLeft: 14, paddingRight: 14 },
  diamond: { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0 },
  pill: { borderRadius: "999px" }
}, ks = {
  amber: { background: "var(--j-amber)" },
  red: { background: "var(--j-red)" },
  green: { background: "var(--j-green)" }
};
function mr({ color: e = "cyan", size: t = "sm", shape: n = "angular", blink: r = !1, showDot: a = !1, children: i }) {
  const s = {
    display: "inline-flex",
    alignItems: "center",
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    fontFamily: "'Courier New', monospace",
    ...yn[e] ?? yn.cyan,
    ...vn[t] ?? vn.sm,
    ...ws[n]
  };
  return /* @__PURE__ */ g("span", { className: r ? "j-blink" : void 0, style: s, children: [
    a && /* @__PURE__ */ o(
      "span",
      {
        className: "j-status-dot",
        style: { marginRight: 5, display: "inline-block", flexShrink: 0, ...ks[e] ?? {} }
      }
    ),
    i
  ] });
}
const bn = {
  active: { bg: "var(--j-accent-08)", accent: "var(--j-accent)" },
  processing: { bg: "var(--j-accent-08)", accent: "var(--j-accent)" },
  warning: { bg: "var(--j-warn-05)", accent: "var(--j-warn)" },
  error: { bg: "var(--j-err-05)", accent: "var(--j-err)" },
  success: { bg: "var(--j-ok-05)", accent: "var(--j-ok)" },
  idle: { bg: "var(--j-accent-05)", accent: "var(--j-accent-18)" }
}, Ss = {
  warning: { background: "var(--j-amber)", animationDuration: "1.8s" },
  error: { background: "var(--j-red)", animationDuration: "0.7s" },
  success: { background: "var(--j-green)", animationDuration: "2.5s" },
  idle: { background: "var(--j-accent-25)", animation: "none" }
};
function Ns({ state: e = "active", blink: t = !1, children: n }) {
  const { bg: r, accent: a } = bn[e] ?? bn.active;
  return /* @__PURE__ */ g(
    "div",
    {
      className: t ? "j-blink-slow" : void 0,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 16px 7px 12px",
        background: r,
        borderLeft: `2px solid ${a}`,
        clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
        fontFamily: "'Courier New', monospace"
      },
      children: [
        /* @__PURE__ */ o("span", { className: "j-status-dot", style: Ss[e] }),
        /* @__PURE__ */ o("span", { style: { fontSize: 11, letterSpacing: "0.08em", color: a }, children: n })
      ]
    }
  );
}
const xn = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10], Ms = {
  warning: "var(--j-amber)",
  error: "var(--j-red)",
  success: "var(--j-green)"
}, Ds = {
  height: 5,
  background: "var(--j-accent-08)",
  clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
  position: "relative",
  overflow: "hidden"
};
function Os({
  value: e = 0,
  label: t,
  state: n = "active",
  variant: r = "bar",
  indeterminate: a = !1,
  showPercent: i = !0,
  total: s = 16
}) {
  const c = t && /* @__PURE__ */ g("div", { style: { fontSize: 9, color: "var(--j-accent-50)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 4, display: "flex", justifyContent: "space-between" }, children: [
    /* @__PURE__ */ o("span", { children: t }),
    i && !a && /* @__PURE__ */ g("span", { style: { color: "var(--j-text-primary)" }, children: [
      e,
      "%"
    ] })
  ] });
  if (r === "ticks") {
    const l = Math.round(e / 100 * s), d = Ms[n];
    return /* @__PURE__ */ g("div", { children: [
      c,
      /* @__PURE__ */ o("div", { className: "j-tick-row", children: Array.from({ length: s }, (h, u) => /* @__PURE__ */ o(
        "div",
        {
          className: `j-tk${u < l ? "" : " off"}`,
          style: { height: xn[u % xn.length], ...d ? { background: d } : {} }
        },
        u
      )) })
    ] });
  }
  return /* @__PURE__ */ g("div", { children: [
    c,
    /* @__PURE__ */ o("div", { style: Ds, children: a ? /* @__PURE__ */ g(z, { children: [
      /* @__PURE__ */ o("div", { style: { position: "absolute", inset: 0, background: "var(--j-accent)", opacity: 0.15, clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)" } }),
      /* @__PURE__ */ o("div", { style: { position: "absolute", top: 0, left: -40, bottom: 0, width: 40, background: "linear-gradient(90deg, transparent, var(--j-accent), transparent)", animation: "j-scan-h 1.4s ease-in-out infinite" } })
    ] }) : /* @__PURE__ */ o("div", { style: { width: `${e}%`, height: "100%", background: "linear-gradient(90deg, var(--j-accent-deep), var(--j-accent))", clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)", transition: "width 0.6s ease-out" } }) })
  ] });
}
const jn = {
  width: 5,
  height: 5,
  flexShrink: 0,
  background: "var(--j-accent)",
  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  boxShadow: "0 0 6px var(--j-accent)"
};
function Hc({ orientation: e = "horizontal", label: t, showDot: n = !0, height: r = "40px", margin: a = "8px 0", opacity: i = 0.3 }) {
  const s = "var(--j-accent)";
  return e === "vertical" ? /* @__PURE__ */ g("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", height: r, margin: "0 8px" }, children: [
    /* @__PURE__ */ o("div", { style: { flex: 1, width: 1, background: `linear-gradient(180deg, transparent, ${s})`, opacity: i } }),
    n && /* @__PURE__ */ o("div", { style: { ...jn, margin: "6px 0" } }),
    /* @__PURE__ */ o("div", { style: { flex: 1, width: 1, background: `linear-gradient(180deg, ${s}, transparent)`, opacity: i } })
  ] }) : /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", margin: a, width: "100%" }, children: [
    /* @__PURE__ */ o("div", { style: { flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${s})`, opacity: i } }),
    t ? /* @__PURE__ */ o("span", { style: { fontSize: 8, color: s, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0 10px", opacity: 0.7, whiteSpace: "nowrap" }, children: t }) : n && /* @__PURE__ */ o("div", { style: { ...jn, margin: "0 8px" } }),
    /* @__PURE__ */ o("div", { style: { flex: 1, height: 1, background: `linear-gradient(90deg, ${s}, transparent)`, opacity: i } })
  ] });
}
function Jc({ variant: e = "chip", text: t, subText: n, value: r, color: a = "cyan", showDot: i = !0, showLine: s = !0 }) {
  const c = H.cls("j-hl", `j-hl-${e}`, H.color(a));
  let l;
  switch (e) {
    case "chip":
      l = /* @__PURE__ */ g("div", { className: "j-hl-chip", children: [
        i && /* @__PURE__ */ o("span", { className: "j-hl-pip" }),
        /* @__PURE__ */ o("span", { className: "j-hl-text", children: t }),
        r && /* @__PURE__ */ o("span", { className: "j-hl-val", children: r }),
        s && /* @__PURE__ */ o("div", { className: "j-hl-line-h" })
      ] });
      break;
    case "callout":
      l = /* @__PURE__ */ g("div", { className: "j-hl-callout", children: [
        /* @__PURE__ */ g("div", { className: "j-hl-callout-inner", children: [
          n && /* @__PURE__ */ o("div", { className: "j-hl-sub", children: n }),
          /* @__PURE__ */ o("div", { className: "j-hl-main", children: t })
        ] }),
        s && /* @__PURE__ */ g("div", { className: "j-hl-callout-line", children: [
          /* @__PURE__ */ o("div", { className: "j-hl-line-seg" }),
          /* @__PURE__ */ o("div", { className: "j-hl-line-dot" })
        ] })
      ] });
      break;
    case "circuit":
      l = /* @__PURE__ */ g("div", { className: "j-hl-circuit", children: [
        /* @__PURE__ */ g("div", { className: "j-hl-cir-bracket", children: [
          /* @__PURE__ */ o("div", { className: "j-hl-cir-label", children: t }),
          r && /* @__PURE__ */ o("div", { className: "j-hl-cir-val", children: r })
        ] }),
        s && /* @__PURE__ */ g("div", { className: "j-hl-cir-arm", children: [
          /* @__PURE__ */ o("div", { className: "j-hl-cir-node" }),
          /* @__PURE__ */ o("div", { className: "j-hl-cir-track" }),
          /* @__PURE__ */ o("div", { className: "j-hl-cir-node j-hl-cir-node-end" })
        ] })
      ] });
      break;
    case "badge":
      l = /* @__PURE__ */ g("div", { className: "j-hl-badge", children: [
        /* @__PURE__ */ o("div", { className: "j-hl-badge-ring", children: /* @__PURE__ */ o("span", { className: "j-hl-badge-val", children: r ?? t }) }),
        /* @__PURE__ */ o("div", { className: "j-hl-badge-label", children: t })
      ] });
      break;
    case "panel":
      l = /* @__PURE__ */ g("div", { className: "j-hl-panel", children: [
        /* @__PURE__ */ o("div", { className: "j-hl-panel-top", children: n && /* @__PURE__ */ o("span", { className: "j-hl-panel-sub", children: n }) }),
        /* @__PURE__ */ g("div", { className: "j-hl-panel-body", children: [
          /* @__PURE__ */ o("span", { className: "j-hl-panel-main", children: t }),
          r && /* @__PURE__ */ o("span", { className: "j-hl-panel-val", children: r })
        ] }),
        /* @__PURE__ */ o("div", { className: "j-hl-panel-scan" })
      ] });
      break;
  }
  return /* @__PURE__ */ o("div", { className: c, children: l });
}
const wn = {
  active: "var(--j-accent)",
  processing: "var(--j-accent)",
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "var(--j-accent-35)"
}, kn = {
  active: "var(--j-accent-05)",
  processing: "var(--j-accent-05)",
  warning: "var(--j-warn-05)",
  error: "var(--j-err-05)",
  success: "var(--j-ok-05)",
  idle: "var(--j-accent-05)"
}, Cs = {
  warning: "⚠",
  error: "✕",
  success: "✓"
}, $s = {
  error: "j-pulse 0.8s ease-in-out infinite",
  warning: "j-pulse 1.5s ease-in-out infinite"
};
function Gc({ state: e = "active", title: t, children: n, dismissible: r = !1, blink: a = !1, onDismiss: i }) {
  const [s, c] = W(!0);
  if (!s) return null;
  const l = wn[e] ?? wn.active, d = kn[e] ?? kn.active, h = Cs[e] ?? "ℹ", u = $s[e];
  function f() {
    c(!1), i == null || i();
  }
  return /* @__PURE__ */ g(
    "div",
    {
      className: a ? "j-blink-slow" : void 0,
      style: {
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "10px 14px 10px 16px",
        background: d,
        clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
        fontFamily: "'Courier New', monospace"
      },
      children: [
        /* @__PURE__ */ o("div", { style: {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 2,
          background: l,
          boxShadow: `0 0 8px ${l}`,
          ...u ? { animation: u } : {}
        } }),
        /* @__PURE__ */ o("span", { style: { fontStyle: "normal", fontSize: 13, flexShrink: 0, color: l, textShadow: `0 0 8px ${l}` }, children: h }),
        /* @__PURE__ */ g("div", { style: { flex: 1, fontSize: 11, color: l, letterSpacing: "0.04em", lineHeight: 1.5 }, children: [
          t && /* @__PURE__ */ o("div", { style: { fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 2 }, children: t }),
          n
        ] }),
        r && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: f,
            style: { background: "transparent", border: "none", cursor: "pointer", color: l, opacity: 0.6, fontSize: 14, padding: "0 0 0 8px", flexShrink: 0, fontFamily: "inherit" },
            children: "✕"
          }
        )
      ]
    }
  );
}
const Ws = {
  warning: "linear-gradient(90deg, var(--j-warn-12), var(--j-warn))",
  error: "linear-gradient(90deg, var(--j-err-12),  var(--j-err))",
  success: "linear-gradient(90deg, var(--j-ok-12),   var(--j-ok))"
}, Ts = {
  warning: "var(--j-amber)",
  error: "var(--j-red)",
  success: "var(--j-green)"
};
function Ps({ label: e, value: t, barPercent: n, state: r = "active" }) {
  const a = Ws[r], i = Ts[r];
  return /* @__PURE__ */ g("div", { className: "j-data-row", children: [
    /* @__PURE__ */ o("span", { className: "j-data-key", children: e }),
    n !== void 0 && /* @__PURE__ */ o("div", { className: "j-data-bar", children: /* @__PURE__ */ o(
      "div",
      {
        className: "j-data-bar-fill",
        style: {
          "--j-w": `${n}%`,
          ...a ? { background: a } : {}
        }
      }
    ) }),
    /* @__PURE__ */ o("span", { className: "j-data-val", style: i ? { color: i } : void 0, children: t })
  ] });
}
function Ze(e) {
  return {
    position: "absolute",
    width: 14,
    height: 14,
    borderColor: "var(--j-accent)",
    borderStyle: "solid",
    borderWidth: 0,
    filter: "drop-shadow(0 0 4px var(--j-accent))",
    animation: "j-corner-blink 3s ease-in-out infinite",
    ...e
  };
}
function qc({ open: e, onClose: t, title: n, subTitle: r, closable: a = !0, closeOnBackdrop: i = !0, width: s = "480px", notchSize: c = "18px", children: l, footer: d }) {
  if (!e) return null;
  const h = {
    position: "fixed",
    zIndex: 1001,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: s,
    maxWidth: "calc(100vw - 32px)",
    background: "var(--j-bg-card)",
    overflow: "hidden",
    clipPath: `polygon(${c} 0%, 100% 0%, 100% calc(100% - ${c}), calc(100% - ${c}) 100%, 0% 100%, 0% ${c})`,
    border: "1px solid var(--j-accent)",
    fontFamily: "'Courier New', monospace"
  };
  return ra(
    /* @__PURE__ */ g(z, { children: [
      /* @__PURE__ */ o(
        "div",
        {
          "data-testid": "j-modal-backdrop",
          onClick: i ? t : void 0,
          style: {
            position: "fixed",
            inset: 0,
            zIndex: 1e3,
            background: "var(--j-bg-overlay)",
            backdropFilter: "blur(2px)"
          }
        }
      ),
      /* @__PURE__ */ g("div", { style: h, children: [
        /* @__PURE__ */ o("div", { style: { position: "absolute", left: 0, right: 0, height: 1, top: -1, background: "linear-gradient(90deg, transparent, var(--j-cyan), transparent)", animation: "j-scan-v 3s ease-in-out infinite", pointerEvents: "none" } }),
        /* @__PURE__ */ o("div", { style: Ze({ top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 }) }),
        /* @__PURE__ */ o("div", { style: Ze({ top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 }) }),
        /* @__PURE__ */ o("div", { style: Ze({ bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 }) }),
        /* @__PURE__ */ o("div", { style: Ze({ bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 }) }),
        /* @__PURE__ */ o("div", { style: { position: "absolute", top: 0, left: 0, border: `${c} solid transparent`, borderTopColor: "var(--j-accent)", borderLeftColor: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", pointerEvents: "none" } }),
        /* @__PURE__ */ g("div", { style: { padding: "14px 18px 10px", borderBottom: "1px solid var(--j-accent-12)", display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ g("div", { children: [
            r && /* @__PURE__ */ o("div", { style: { fontSize: 8, color: "var(--j-accent)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 3, opacity: 0.7 }, children: r }),
            /* @__PURE__ */ o("div", { style: { fontSize: 13, fontWeight: 600, color: "var(--j-text-primary)", letterSpacing: "0.10em", textTransform: "uppercase" }, children: n })
          ] }),
          a && /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              onClick: t,
              style: { background: "transparent", border: "none", cursor: "pointer", color: "var(--j-text-muted)", fontSize: 16, padding: 0, fontFamily: "inherit" },
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { style: { padding: "16px 18px", color: "var(--j-text-secondary)", fontSize: 12, lineHeight: 1.6, letterSpacing: "0.04em" }, children: l }),
        d && /* @__PURE__ */ o("div", { style: { padding: "10px 18px 14px", borderTop: "1px solid var(--j-accent-08)", display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }, children: d })
      ] })
    ] }),
    document.body
  );
}
const gr = Le(null);
function Lc() {
  const e = qe(gr);
  if (!e) throw new Error("useToast must be used within JToastProvider");
  return e;
}
const Sn = {
  active: "var(--j-accent)",
  processing: "var(--j-accent)",
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "var(--j-accent)"
}, Is = {
  warning: "⚠",
  error: "✕",
  success: "✓"
}, Es = {
  error: "j-pulse 0.7s ease-in-out infinite",
  warning: "j-pulse 1.3s ease-in-out infinite"
};
function Fs({ id: e, state: t, message: n, title: r, duration: a, onDismiss: i }) {
  const s = Sn[t] ?? Sn.active, c = Is[t] ?? "ℹ", l = Es[t];
  return K(() => {
    if (a <= 0) return;
    const d = setTimeout(i, a);
    return () => clearTimeout(d);
  }, [a, i]), /* @__PURE__ */ g(
    "div",
    {
      onClick: i,
      style: {
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        background: "var(--j-bg-card)",
        border: `1px solid color-mix(in srgb, ${s} 25%, transparent)`,
        clipPath: "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)",
        boxShadow: `0 0 16px color-mix(in srgb, ${s} 18%, transparent)`,
        fontFamily: "'Courier New', monospace",
        animation: "j-slide-in 0.3s ease-out both",
        pointerEvents: "all"
      },
      children: [
        /* @__PURE__ */ o("div", { style: { position: "absolute", top: 0, bottom: 0, left: 0, width: 2, background: s, boxShadow: `0 0 8px ${s}`, ...l ? { animation: l } : {} } }),
        /* @__PURE__ */ o("div", { style: { position: "absolute", left: 0, right: 0, height: 1, top: -1, background: `linear-gradient(90deg, transparent, ${s}, transparent)`, animation: "j-scan-v 2.5s ease-in-out infinite", pointerEvents: "none" } }),
        /* @__PURE__ */ o("div", { style: { position: "absolute", top: 0, right: 0, width: 0, height: 0, border: "8px solid transparent", borderTopColor: s, borderRightColor: s, opacity: 0.5 } }),
        /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 14px 10px 16px" }, children: [
          /* @__PURE__ */ o("span", { style: { fontStyle: "normal", fontSize: 13, color: s, flexShrink: 0, filter: `drop-shadow(0 0 4px ${s})` }, children: c }),
          /* @__PURE__ */ g("div", { style: { flex: 1, minWidth: 0 }, children: [
            r && /* @__PURE__ */ o("div", { style: { fontSize: 9, color: s, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2, fontWeight: 600 }, children: r }),
            /* @__PURE__ */ o("div", { style: { fontSize: 11, color: "var(--j-text-secondary)", letterSpacing: "0.04em", lineHeight: 1.4 }, children: n })
          ] })
        ] }),
        a > 0 && /* @__PURE__ */ o("div", { style: { height: 2, background: `color-mix(in srgb, ${s} 8%, transparent)`, position: "relative", overflow: "hidden" }, children: /* @__PURE__ */ o("div", { style: { position: "absolute", top: 0, left: 0, height: "100%", background: `linear-gradient(90deg, color-mix(in srgb, ${s} 80%, transparent), ${s})`, animation: `j-bar-grow ${a}ms linear forwards`, "--j-w": "100%" } }) })
      ]
    }
  );
}
function Vc({ children: e }) {
  const [t, n] = W([]), r = U(0);
  function a(s, c, l, d = 4e3) {
    const h = `toast-${++r.current}`;
    return n((u) => [...u, { id: h, state: s, message: c, title: l, duration: d }]), h;
  }
  function i(s) {
    n((c) => c.filter((l) => l.id !== s));
  }
  return /* @__PURE__ */ g(gr.Provider, { value: { show: a, dismiss: i }, children: [
    e,
    /* @__PURE__ */ o("div", { style: { position: "fixed", bottom: 24, right: 24, zIndex: 2e3, display: "flex", flexDirection: "column-reverse", gap: 8, pointerEvents: "none", width: 320 }, children: t.map((s) => /* @__PURE__ */ o(Fs, { ...s, onDismiss: () => i(s.id) }, s.id)) })
  ] });
}
const As = {
  warning: "j-text-warn",
  error: "j-text-err",
  success: "j-text-ok"
}, _s = {
  warning: { background: "var(--j-amber)" },
  error: { background: "var(--j-red)" },
  success: { background: "var(--j-green)" }
};
function Xc({
  cardStyle: e = "CornerBracket",
  color: t = "cyan",
  padding: n = "14px 16px",
  title: r,
  value: a,
  sub: i,
  state: s = "active",
  badge: c,
  badgeColor: l = "cyan",
  showStatusDot: d = !1,
  barValue: h,
  dataRows: u,
  children: f
}) {
  const m = H.cls("j-text-val", As[s] ?? null), b = _s[s];
  return /* @__PURE__ */ g(ka, { cardStyle: e, color: t, padding: n, children: [
    /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }, children: [
      /* @__PURE__ */ o("div", { className: "j-text-xs", children: r }),
      c && /* @__PURE__ */ o(mr, { color: l, size: "xs", children: c })
    ] }),
    /* @__PURE__ */ o("div", { className: m, children: a }),
    i && /* @__PURE__ */ g("div", { className: "j-text-sub", style: { display: "flex", alignItems: "center", gap: 4 }, children: [
      d && /* @__PURE__ */ o("span", { className: "j-status-dot", style: b }),
      i
    ] }),
    h !== void 0 && /* @__PURE__ */ o("div", { style: { marginTop: 8 }, children: /* @__PURE__ */ o(Os, { value: h, variant: "bar", showPercent: !1 }) }),
    u && u.length > 0 && /* @__PURE__ */ o("div", { style: { marginTop: 8 }, children: u.map((v) => /* @__PURE__ */ o(Ps, { label: v.label, value: v.value, barPercent: v.barPercent }, v.label)) }),
    f
  ] });
}
const yr = Le(null);
function Ys() {
  return qe(yr);
}
function Uc({ activeTab: e, onTabChange: t, children: n }) {
  var h;
  const r = [];
  ta.forEach(n, (u) => {
    if (na(u) && u.type._isJTab) {
      const f = u.props;
      r.push({ key: f.tabKey, label: f.label, icon: f.icon, badge: f.badge, disabled: f.disabled });
    }
  });
  const [a, i] = W(null), s = ((h = r.find((u) => !u.disabled)) == null ? void 0 : h.key) ?? "", c = e ?? a ?? s;
  function l(u) {
    e === void 0 && i(u), t == null || t(u);
  }
  function d(u, f) {
    var w, y, j, x, N;
    const m = r.filter((k) => !k.disabled), b = m.findIndex((k) => k.key === f);
    let v;
    if (u.key === "ArrowRight") v = (w = m[(b + 1) % m.length]) == null ? void 0 : w.key;
    else if (u.key === "ArrowLeft") v = (y = m[(b - 1 + m.length) % m.length]) == null ? void 0 : y.key;
    else if (u.key === "Home") v = (j = m[0]) == null ? void 0 : j.key;
    else if (u.key === "End") v = (x = m[m.length - 1]) == null ? void 0 : x.key;
    else return;
    u.preventDefault(), v && (l(v), (N = document.getElementById(`tab-${v}`)) == null || N.focus());
  }
  return /* @__PURE__ */ g(yr.Provider, { value: { activeTab: c, selectTab: l }, children: [
    /* @__PURE__ */ o(
      "div",
      {
        role: "tablist",
        style: {
          display: "flex",
          borderBottom: "1px solid var(--j-accent-12)",
          overflowX: "auto",
          gap: 0
        },
        children: r.map((u) => {
          const f = u.key === c;
          return /* @__PURE__ */ g(
            "button",
            {
              id: `tab-${u.key}`,
              role: "tab",
              type: "button",
              "aria-selected": f,
              "aria-controls": `panel-${u.key}`,
              disabled: u.disabled,
              onClick: () => l(u.key),
              onKeyDown: (m) => d(m, u.key),
              style: {
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 18px",
                background: "transparent",
                border: "none",
                cursor: u.disabled ? "not-allowed" : "pointer",
                fontFamily: "'Courier New', monospace",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                color: u.disabled ? "var(--j-text-dim)" : f ? "var(--j-accent)" : "var(--j-text-muted)",
                textShadow: f ? "0 0 8px var(--j-accent-50)" : "none",
                opacity: u.disabled ? 0.4 : 1,
                transition: "color 0.15s"
              },
              children: [
                u.icon && /* @__PURE__ */ o("span", { style: {
                  fontStyle: "normal",
                  fontSize: 13,
                  ...f ? { filter: "drop-shadow(0 0 4px var(--j-accent))" } : {}
                }, children: u.icon }),
                /* @__PURE__ */ o("span", { children: u.label }),
                u.badge && /* @__PURE__ */ o("span", { style: {
                  fontSize: 8,
                  padding: "1px 5px",
                  background: "var(--j-accent-12)",
                  color: "var(--j-accent-mid)",
                  clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)"
                }, children: u.badge }),
                f && /* @__PURE__ */ o("div", { style: {
                  position: "absolute",
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "var(--j-accent)",
                  boxShadow: "0 0 8px var(--j-accent)",
                  overflow: "hidden"
                }, children: /* @__PURE__ */ o("div", { style: {
                  position: "absolute",
                  inset: 0,
                  width: 30,
                  background: "linear-gradient(90deg, transparent, var(--j-text-primary), transparent)",
                  animation: "j-scan-h 2s ease-in-out infinite"
                } }) })
              ]
            },
            u.key
          );
        })
      }
    ),
    /* @__PURE__ */ o("div", { style: { paddingTop: 4 }, children: n })
  ] });
}
function Bs({ tabKey: e, children: t }) {
  const n = Ys();
  return !n || n.activeTab !== e ? null : /* @__PURE__ */ o(
    "div",
    {
      role: "tabpanel",
      id: `panel-${e}`,
      "aria-labelledby": `tab-${e}`,
      children: t
    }
  );
}
Bs._isJTab = !0;
function zs(e, t) {
  return e === "warning" ? "var(--j-warn)" : e === "error" ? "var(--j-err)" : e === "success" ? "var(--j-ok)" : t === "amber" ? "var(--j-warn)" : t === "red" ? "var(--j-err)" : "var(--j-accent)";
}
function Kc({
  title: e,
  icon: t,
  badge: n,
  defaultOpen: r = !1,
  isOpen: a,
  onIsOpenChange: i,
  state: s = "active",
  color: c = "cyan",
  children: l
}) {
  const [d, h] = W(r), u = Fn(), f = a !== void 0 ? a : d, m = zs(s, c);
  function b() {
    const v = !f;
    a === void 0 && h(v), i == null || i(v);
  }
  return /* @__PURE__ */ g("div", { style: {
    border: "1px solid var(--j-accent-12)",
    overflow: "hidden",
    fontFamily: "'Courier New', monospace"
  }, children: [
    /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        id: `accordion-header-${u}`,
        "aria-expanded": f,
        "aria-controls": `accordion-body-${u}`,
        onClick: b,
        style: {
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px 10px 16px",
          cursor: "pointer",
          width: "100%",
          background: f ? "var(--j-accent-05)" : "transparent",
          border: "none",
          fontFamily: "'Courier New', monospace",
          textAlign: "left",
          userSelect: "none",
          transition: "background 0.2s"
        },
        children: [
          /* @__PURE__ */ o("div", { style: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 2,
            background: m,
            boxShadow: `0 0 8px ${m}`,
            clipPath: "polygon(0 6px, 2px 0, 2px 100%, 0 calc(100% - 6px))"
          } }),
          t && /* @__PURE__ */ o("span", { style: {
            fontStyle: "normal",
            fontSize: 13,
            color: m,
            filter: `drop-shadow(0 0 4px ${m})`,
            flexShrink: 0
          }, children: t }),
          /* @__PURE__ */ o("span", { style: {
            flex: 1,
            fontSize: 11,
            color: f ? "var(--j-text-primary)" : "var(--j-text-secondary)",
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            transition: "color 0.2s"
          }, children: e }),
          n && /* @__PURE__ */ o("span", { style: {
            fontSize: 8,
            color: m,
            background: `${m}18`,
            padding: "1px 6px",
            clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)"
          }, children: n }),
          /* @__PURE__ */ o("div", { style: {
            width: 8,
            height: 8,
            background: m,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            opacity: f ? 1 : 0.4,
            transform: f ? "rotate(0deg)" : "rotate(45deg)",
            boxShadow: f ? `0 0 8px ${m}` : "none",
            transition: "transform 0.3s, opacity 0.2s",
            flexShrink: 0
          } })
        ]
      }
    ),
    f && /* @__PURE__ */ g(
      "div",
      {
        id: `accordion-body-${u}`,
        role: "region",
        "aria-labelledby": `accordion-header-${u}`,
        style: {
          position: "relative",
          padding: "12px 14px 12px 16px",
          borderTop: "1px solid var(--j-accent-12)",
          background: "var(--j-accent-05)",
          overflow: "hidden",
          animation: "j-slide-in 0.25s ease-out"
        },
        children: [
          /* @__PURE__ */ o("div", { style: {
            position: "absolute",
            left: 0,
            right: 0,
            height: 1,
            top: -1,
            background: `linear-gradient(90deg, transparent, ${m}, transparent)`,
            animation: "j-scan-v 3s ease-in-out infinite",
            pointerEvents: "none"
          } }),
          l
        ]
      }
    )
  ] });
}
function Rs(e, t, n) {
  const r = Math.floor(n / 2);
  let a = Math.max(1, e - r), i = Math.min(t, a + n - 1);
  a = Math.max(1, i - n + 1);
  const s = [];
  a > 1 && (s.push(1), a > 2 && s.push(-1));
  for (let c = a; c <= i; c++) s.push(c);
  return i < t && (i < t - 1 && s.push(-1), s.push(t)), s;
}
const vr = {
  padding: "5px 10px",
  fontSize: 11,
  fontFamily: "'Courier New', monospace",
  letterSpacing: "0.08em",
  clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
  cursor: "pointer",
  transition: "all 0.15s",
  border: "none"
};
function et(e) {
  return {
    ...vr,
    background: "transparent",
    border: `1px solid ${e ? "var(--j-accent-08)" : "var(--j-accent-18)"}`,
    color: e ? "var(--j-accent-18)" : "var(--j-text-muted)",
    cursor: e ? "not-allowed" : "pointer"
  };
}
function Hs(e) {
  return {
    ...vr,
    background: e ? "var(--j-accent-12)" : "transparent",
    border: `1px solid ${e ? "var(--j-accent)" : "var(--j-accent-18)"}`,
    color: e ? "var(--j-accent)" : "var(--j-text-muted)",
    boxShadow: e ? "0 0 8px var(--j-accent-44)" : "none"
  };
}
function Qc({
  page: e,
  onPageChange: t,
  totalPages: n,
  showFirstLast: r = !1,
  showInfo: a = !0,
  pageSize: i = 5
}) {
  const s = e <= 1, c = e >= n;
  function l(d) {
    const h = Math.max(1, Math.min(n, d));
    h !== e && t(h);
  }
  return /* @__PURE__ */ g(
    "nav",
    {
      "aria-label": "Pagination",
      style: { display: "flex", alignItems: "center", gap: 6, fontFamily: "'Courier New', monospace" },
      children: [
        r && /* @__PURE__ */ o("button", { type: "button", disabled: s, onClick: () => l(1), style: et(s), children: "«" }),
        /* @__PURE__ */ o("button", { type: "button", disabled: s, onClick: () => l(e - 1), style: et(s), children: "‹" }),
        n <= 10 ? (
          /* Tick bar mode */
          /* @__PURE__ */ o("div", { style: { display: "flex", alignItems: "flex-end", gap: 3 }, children: Array.from({ length: n }, (d, h) => {
            const u = h + 1, f = u === e;
            return /* @__PURE__ */ o(
              "div",
              {
                role: "button",
                tabIndex: 0,
                "aria-label": `Page ${u}`,
                "aria-current": f ? "page" : void 0,
                onClick: () => l(u),
                onKeyDown: (m) => {
                  (m.key === "Enter" || m.key === " ") && (m.preventDefault(), l(u));
                },
                style: {
                  width: 6,
                  height: f ? 18 : 10,
                  background: f ? "var(--j-accent)" : "var(--j-accent-18)",
                  clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 85%)",
                  boxShadow: f ? "0 0 8px var(--j-accent)" : "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  ...f ? { animation: "j-pulse 2s ease-in-out infinite" } : {}
                }
              },
              u
            );
          }) })
        ) : (
          /* Ellipsis mode */
          /* @__PURE__ */ o(z, { children: Rs(e, n, i).map(
            (d, h) => d === -1 ? /* @__PURE__ */ o(
              "span",
              {
                style: { color: "var(--j-text-dim)", fontSize: 10, padding: "0 4px" },
                children: "···"
              },
              `ellipsis-${h}`
            ) : /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                "aria-current": d === e ? "page" : void 0,
                onClick: () => l(d),
                style: Hs(d === e),
                children: d
              },
              d
            )
          ) })
        ),
        /* @__PURE__ */ o("button", { type: "button", disabled: c, onClick: () => l(e + 1), style: et(c), children: "›" }),
        r && /* @__PURE__ */ o("button", { type: "button", disabled: c, onClick: () => l(n), style: et(c), children: "»" }),
        a && /* @__PURE__ */ g("span", { style: {
          fontSize: 9,
          color: "var(--j-text-dim)",
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          marginLeft: 8
        }, children: [
          e,
          " / ",
          n
        ] })
      ]
    }
  );
}
const Nn = [6, 10, 14, 14, 10, 6, 8, 12, 16, 16, 12, 8];
function Zc({
  level: e,
  totalArcs: t = 6,
  color: n = "cyan",
  orientation: r = "horizontal",
  showLabel: a = !1,
  label: i = "LEVEL",
  showValue: s = !1,
  arcWidth: c = "8px",
  arcGap: l = "3px"
}) {
  const d = r === "vertical";
  function h(f) {
    const m = f < e, b = f === e - 1 && e > 0, v = Nn[f % Nn.length], w = d ? { width: v, height: 4 } : { width: c, height: v };
    let y, j, x;
    return b ? (y = "linear-gradient(0deg, var(--j-accent-12), var(--j-accent))", j = "0 0 10px var(--j-accent), 0 0 20px var(--j-accent-25)", x = "j-pulse 0.6s ease-in-out infinite") : m ? (y = "var(--j-accent)", j = "0 0 5px var(--j-accent-25)", x = void 0) : (y = "var(--j-accent-05)", j = "none", x = void 0), {
      ...w,
      background: y,
      boxShadow: j,
      clipPath: "polygon(1px 15%, 100% 0, 100% 100%, 1px 85%)",
      transition: "background 0.1s, box-shadow 0.1s",
      ...x ? { animation: x } : {}
    };
  }
  return /* @__PURE__ */ g("div", { style: { display: "inline-flex", flexDirection: "column", alignItems: "center" }, children: [
    a && /* @__PURE__ */ o("div", { style: {
      fontSize: 8,
      color: "var(--j-accent-12)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginBottom: 4,
      textAlign: "center",
      fontFamily: "'Courier New', monospace"
    }, children: i }),
    /* @__PURE__ */ o("div", { style: d ? { display: "flex", flexDirection: "column-reverse", alignItems: "center", gap: l } : { display: "flex", alignItems: "flex-end", gap: l }, children: Array.from({ length: t }, (f, m) => /* @__PURE__ */ o("div", { "data-testid": `arc-seg-${m}`, style: h(m) }, m)) }),
    s && /* @__PURE__ */ g("div", { style: {
      fontSize: 9,
      letterSpacing: "0.10em",
      marginTop: 4,
      textAlign: "center",
      color: e > 0 ? "var(--j-accent)" : "var(--j-text-dim)",
      transition: "color 0.2s",
      fontFamily: "'Courier New', monospace"
    }, children: [
      e,
      " / ",
      t
    ] })
  ] });
}
const Mn = [6, 14, 22, 18, 28, 20, 30, 24, 28, 22, 16, 20, 26, 18, 12, 22, 28, 18, 10, 14], Dn = [".4s", ".5s", ".6s", ".4s", ".7s", ".5s", ".6s", ".4s", ".8s", ".5s"];
function el({
  barCount: e = 20,
  height: t = "32px",
  active: n = !0
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: "j-waveform",
      style: {
        height: t,
        ...n ? {} : { opacity: 0.3 }
      },
      children: Array.from({ length: e }, (r, a) => {
        const i = {
          height: `${Mn[a % Mn.length]}px`,
          background: "var(--j-accent)",
          "--j-wv-dur": Dn[a % Dn.length],
          "--j-wv-dly": `${(a * 0.04).toFixed(2)}s`,
          ...n ? {} : { transform: "scaleY(0.15)", animationPlayState: "paused" }
        };
        return /* @__PURE__ */ o("div", { className: "j-wv", style: i }, a);
      })
    }
  );
}
function Js(e) {
  return e === "processing" ? { r1: "2s", r2: "1.2s", r3: "1.8s" } : e === "idle" ? { r1: "8s", r2: "6s", r3: "9s" } : { r1: "4s", r2: "3s", r3: "5s" };
}
function Gs(e, t) {
  return e === "idle" ? "Idle" : e === "processing" ? "Processing" : e === "warning" ? "Warning" : e === "error" ? "Error" : t ? "Listening" : "Online";
}
const qs = Array.from({ length: 12 }, (e, t) => t * 30);
function tl({
  systemName: e = "JARVIS",
  size: t = "160px",
  state: n = "active",
  listening: r = !1,
  onClick: a
}) {
  const i = Js(n), s = Gs(n, r);
  return /* @__PURE__ */ g(
    "div",
    {
      onClick: a,
      style: {
        position: "relative",
        width: t,
        height: t,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: a ? "pointer" : "default",
        flexShrink: 0,
        fontFamily: "'Courier New', monospace"
      },
      children: [
        /* @__PURE__ */ o("div", { style: {
          position: "absolute",
          borderRadius: "50%",
          inset: 0,
          border: "1px dashed var(--j-accent)",
          opacity: 0.08,
          animation: "j-spin 10s linear infinite"
        } }),
        qs.map((c) => {
          const l = c * Math.PI / 180, d = 48, h = 50 + d * Math.sin(l), u = 50 - d * Math.cos(l);
          return /* @__PURE__ */ o(
            "div",
            {
              "data-testid": "orb-tick",
              style: {
                position: "absolute",
                width: 2,
                height: 4,
                background: "var(--j-accent)",
                opacity: 0.35,
                left: `${h.toFixed(1)}%`,
                top: `${u.toFixed(1)}%`,
                transform: `translate(-50%, -50%) rotate(${c}deg)`
              }
            },
            c
          );
        }),
        /* @__PURE__ */ o("div", { style: {
          position: "absolute",
          borderRadius: "50%",
          inset: 8,
          border: "1px solid var(--j-accent)",
          opacity: 0.35,
          animation: `j-spin ${i.r1} linear infinite`
        } }),
        /* @__PURE__ */ o("div", { style: {
          position: "absolute",
          borderRadius: "50%",
          inset: 16,
          border: "1.5px solid transparent",
          borderTopColor: "var(--j-accent)",
          borderBottomColor: "var(--j-accent)66",
          boxShadow: "0 0 6px var(--j-accent-25)",
          animation: `j-spin ${i.r2} linear infinite`
        } }),
        /* @__PURE__ */ o("div", { style: {
          position: "absolute",
          borderRadius: "50%",
          inset: 24,
          border: "1.5px solid transparent",
          borderTopColor: "var(--j-accent)",
          borderBottomColor: "var(--j-accent)66",
          boxShadow: "0 0 6px var(--j-accent-25)",
          animation: `j-spin-rev ${i.r3} linear infinite`
        } }),
        /* @__PURE__ */ g("div", { style: {
          position: "absolute",
          borderRadius: "50%",
          inset: 32,
          background: "radial-gradient(circle at 38% 36%, var(--j-accent-12), var(--j-bg) 70%)",
          border: "1px solid var(--j-accent)44",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 0 20px var(--j-accent-25), 0 0 16px var(--j-accent-25)",
          overflow: "hidden"
        }, children: [
          /* @__PURE__ */ o("div", { style: {
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, var(--j-accent-25) 0%, transparent 65%)",
            pointerEvents: "none"
          } }),
          /* @__PURE__ */ g("div", { style: { position: "relative", zIndex: 1, textAlign: "center" }, children: [
            /* @__PURE__ */ o(
              "div",
              {
                className: "j-glitch",
                style: {
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--j-text-primary)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  textShadow: "0 0 16px var(--j-accent)",
                  fontFamily: "'Courier New', monospace"
                },
                children: e
              }
            ),
            /* @__PURE__ */ o("div", { style: {
              fontSize: 9,
              color: "var(--j-accent)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginTop: 2,
              fontFamily: "'Courier New', monospace",
              animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite"
            }, children: s })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { style: {
          position: "absolute",
          bottom: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "var(--j-bg)",
          border: "1px solid var(--j-accent)44",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2
        }, children: /* @__PURE__ */ o("div", { style: {
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: r ? "var(--j-accent)" : "var(--j-text-dim)",
          boxShadow: r ? "0 0 12px var(--j-accent), 0 0 24px var(--j-accent-25)" : "none",
          animation: r ? "j-pulse 1.2s ease-in-out infinite" : "none",
          transition: "all 0.3s"
        } }) })
      ]
    }
  );
}
const Ls = 80, Vs = 28, br = 2, zt = 3, Xs = Ls - br * 2, $t = Vs - zt * 2, On = zt + $t;
function Us(e) {
  if (e.length === 0) return [];
  const t = Math.min(...e), n = Math.max(...e), r = n - t === 0 ? 1 : n - t;
  return e.map((a, i) => ({
    x: br + i * (Xs / Math.max(e.length - 1, 1)),
    y: zt + $t - $t * (a - t) / r
  }));
}
function Ks(e, t) {
  if (t !== "auto") return t;
  if (e.length < 2) return "flat";
  const n = Math.min(...e), a = Math.max(...e) - n, i = e[e.length - 1];
  return i > e[0] + a * 0.05 ? "up" : i < e[0] - a * 0.05 ? "down" : "flat";
}
function nl({
  data: e,
  width: t = "80px",
  height: n = "28px",
  showArea: r = !0,
  showTrend: a = !1,
  trend: i = "auto",
  colorVar: s
}) {
  const c = Us(e), l = Ks(e, i), h = `var(${s ?? (l === "up" ? "--j-ok" : l === "down" ? "--j-err" : "--j-accent")})`, u = c.map((w) => `${w.x.toFixed(1)},${w.y.toFixed(1)}`).join(" "), f = l === "up" ? "▲" : l === "down" ? "▼" : "─", m = l === "up" ? "j-text-ok" : l === "down" ? "j-text-err" : "j-text-accent";
  let b = "";
  if (c.length >= 2) {
    b = `M ${c[0].x.toFixed(1)} ${On} L ${c[0].x.toFixed(1)} ${c[0].y.toFixed(1)}`;
    for (let w = 1; w < c.length; w++)
      b += ` L ${c[w].x.toFixed(1)} ${c[w].y.toFixed(1)}`;
    b += ` L ${c[c.length - 1].x.toFixed(1)} ${On} Z`;
  }
  const v = c[c.length - 1];
  return /* @__PURE__ */ g(
    "span",
    {
      className: "j-sparkline-wrap",
      style: { width: t, height: n, display: "inline-block", position: "relative" },
      children: [
        /* @__PURE__ */ g(
          "svg",
          {
            viewBox: "0 0 80 28",
            xmlns: "http://www.w3.org/2000/svg",
            style: { width: "100%", height: "100%" },
            preserveAspectRatio: "none",
            children: [
              r && c.length >= 2 && /* @__PURE__ */ o(
                "path",
                {
                  d: b,
                  className: "j-sparkline-area",
                  style: { fill: h }
                }
              ),
              c.length >= 2 && /* @__PURE__ */ o(
                "polyline",
                {
                  points: u,
                  className: "j-sparkline-line",
                  style: { stroke: h, fill: "none" }
                }
              ),
              v && /* @__PURE__ */ o(
                "circle",
                {
                  cx: v.x,
                  cy: v.y,
                  r: 2,
                  className: "j-sparkline-dot",
                  style: { fill: h }
                }
              )
            ]
          }
        ),
        a && /* @__PURE__ */ o("span", { className: `j-sparkline-trend ${m}`, children: f })
      ]
    }
  );
}
const Wt = 400, Ye = 220, fe = 36, xr = 8, Be = 12, jr = 22, tt = 6, nt = Wt - fe - xr, rt = Ye - Be - jr;
function at(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(1);
}
function rl({
  data: e,
  height: t = "220px",
  colorVar: n = "--j-accent",
  orientation: r = "vertical",
  showGrid: a = !0,
  showAxisLabels: i = !0,
  showValues: s = !1,
  gridLines: c = 4
}) {
  const l = e.length > 0 ? Math.max(...e.map((h) => h.value)) : 1, d = `var(${n}, var(--j-accent))`;
  return /* @__PURE__ */ g("div", { className: "j-chart-wrap", style: { height: t, position: "relative" }, children: [
    /* @__PURE__ */ o("div", { className: "j-chart-scan" }),
    /* @__PURE__ */ o(
      "svg",
      {
        className: "j-chart-svg",
        viewBox: `0 0 ${Wt} ${Ye}`,
        preserveAspectRatio: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: r === "vertical" ? /* @__PURE__ */ g(z, { children: [
          a && Array.from({ length: c + 1 }, (h, u) => {
            const f = Be + u * (rt / c), m = l - u * (l / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ o(
                "line",
                {
                  x1: fe,
                  y1: f,
                  x2: Wt - xr,
                  y2: f,
                  className: "j-chart-grid"
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: fe - 4,
                  y: f + 3,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: at(m)
                }
              )
            ] }, `grid-${u}`);
          }),
          e.map((h, u) => {
            const f = nt / e.length - tt, m = l > 0 ? rt * (h.value / l) : 0, b = fe + u * (nt / e.length) + tt / 2, v = Be + rt - m;
            return /* @__PURE__ */ g("g", { className: "j-chart-bar-group", children: [
              /* @__PURE__ */ o(
                "polygon",
                {
                  points: `${b},${v + 6} ${b + 4},${v} ${b + f - 4},${v} ${b + f},${v + 6}`,
                  style: { fill: d }
                }
              ),
              /* @__PURE__ */ o(
                "rect",
                {
                  x: b,
                  y: v + 5,
                  width: f,
                  height: Math.max(m - 5, 0),
                  className: "j-chart-bar",
                  style: { fill: d },
                  children: /* @__PURE__ */ o("title", { children: `${h.label}: ${h.value}` })
                }
              ),
              /* @__PURE__ */ o(
                "rect",
                {
                  x: b,
                  y: v + 5,
                  width: f,
                  height: Math.max(m - 5, 0),
                  className: "j-chart-bar-glow",
                  style: { fill: d }
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: b + f / 2,
                  y: Ye - 2,
                  className: "j-chart-axis-label",
                  textAnchor: "middle",
                  children: h.label
                }
              ),
              s && m > 10 && /* @__PURE__ */ o(
                "text",
                {
                  x: b + f / 2,
                  y: v - 3,
                  className: "j-chart-value-label",
                  textAnchor: "middle",
                  children: at(h.value)
                }
              )
            ] }, u);
          })
        ] }) : /* @__PURE__ */ g(z, { children: [
          a && Array.from({ length: c + 1 }, (h, u) => {
            const f = fe + u * (nt / c), m = u * (l / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ o(
                "line",
                {
                  x1: f,
                  y1: Be,
                  x2: f,
                  y2: Ye - jr,
                  className: "j-chart-grid"
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: f,
                  y: Ye - 2,
                  className: "j-chart-axis-label",
                  textAnchor: "middle",
                  children: at(m)
                }
              )
            ] }, `grid-${u}`);
          }),
          e.map((h, u) => {
            const f = rt / e.length, m = f - tt, b = l > 0 ? nt * (h.value / l) : 0, v = Be + u * f + tt / 2;
            return /* @__PURE__ */ g("g", { className: "j-chart-bar-group", children: [
              /* @__PURE__ */ o(
                "rect",
                {
                  x: fe,
                  y: v,
                  width: b,
                  height: m,
                  className: "j-chart-bar",
                  style: { fill: d },
                  children: /* @__PURE__ */ o("title", { children: `${h.label}: ${h.value}` })
                }
              ),
              /* @__PURE__ */ o(
                "rect",
                {
                  x: fe,
                  y: v,
                  width: b,
                  height: m,
                  className: "j-chart-bar-glow",
                  style: { fill: d }
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: fe - 4,
                  y: v + m / 2 + 4,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: h.label
                }
              ),
              s && /* @__PURE__ */ o(
                "text",
                {
                  x: fe + b + 4,
                  y: v + m / 2 + 4,
                  className: "j-chart-value-label",
                  textAnchor: "start",
                  children: at(h.value)
                }
              )
            ] }, u);
          })
        ] })
      }
    )
  ] });
}
const Tt = 400, Pt = 200, st = 36, wr = 8, ze = 10, Qs = 20, Zs = Tt - st - wr, Ee = Pt - ze - Qs;
function ec(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(1);
}
function al({
  data: e,
  height: t = "200px",
  colorVar: n = "--j-accent",
  showArea: r = !1,
  showDots: a = !0,
  showAxisLabels: i = !0,
  showGrid: s = !0,
  gridLines: c = 4
}) {
  if (e.length === 0)
    return /* @__PURE__ */ o("div", { className: "j-chart-wrap", style: { height: t, position: "relative" } });
  const l = e.map((w) => w.value), d = Math.min(...l), h = Math.max(...l), u = h - d === 0 ? 1 : h - d, f = `var(${n})`, m = e.map((w, y) => ({
    x: st + y * (Zs / Math.max(e.length - 1, 1)),
    y: ze + Ee - Ee * (w.value - d) / u
  })), b = m.map((w) => `${w.x.toFixed(1)},${w.y.toFixed(1)}`).join(" ");
  let v = "";
  if (m.length >= 2) {
    v = `M ${m[0].x.toFixed(1)} ${ze + Ee}`;
    for (const w of m) v += ` L ${w.x.toFixed(1)} ${w.y.toFixed(1)}`;
    v += ` L ${m[m.length - 1].x.toFixed(1)} ${ze + Ee} Z`;
  }
  return /* @__PURE__ */ g("div", { className: "j-chart-wrap", style: { height: t, position: "relative" }, children: [
    /* @__PURE__ */ o("div", { className: "j-chart-scan" }),
    /* @__PURE__ */ g(
      "svg",
      {
        className: "j-chart-svg",
        viewBox: `0 0 ${Tt} ${Pt}`,
        preserveAspectRatio: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          s && Array.from({ length: c + 1 }, (w, y) => {
            const j = ze + y * (Ee / c), x = h - y * (u / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ o(
                "line",
                {
                  x1: st,
                  y1: j,
                  x2: Tt - wr,
                  y2: j,
                  className: "j-chart-grid"
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: st - 4,
                  y: j + 3,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: ec(x)
                }
              )
            ] }, `grid-${y}`);
          }),
          r && m.length >= 2 && /* @__PURE__ */ o("path", { d: v, className: "j-chart-area", style: { fill: f } }),
          m.length >= 2 && /* @__PURE__ */ o(
            "polyline",
            {
              points: b,
              className: "j-chart-line",
              style: { stroke: f, fill: "none" }
            }
          ),
          a && m.map((w, y) => /* @__PURE__ */ o(
            "circle",
            {
              cx: w.x,
              cy: w.y,
              r: 3,
              className: "j-chart-dot",
              style: { fill: f }
            },
            y
          )),
          i && e.map((w, y) => /* @__PURE__ */ o(
            "text",
            {
              x: m[y].x,
              y: Pt - 2,
              className: "j-chart-axis-label",
              textAnchor: "middle",
              children: w.label
            },
            `xlbl-${y}`
          ))
        ]
      }
    )
  ] });
}
const Me = 50, Dt = 50;
function ol({
  data: e,
  size: t = "160px",
  thickness: n = 20,
  centerValue: r = "",
  centerLabel: a = "",
  showLegend: i = !0
}) {
  const s = Me - n / 2 - 2, c = 2 * Math.PI * s, l = e.reduce((u, f) => u + f.value, 0);
  let d = -90;
  const h = e.map((u) => {
    const f = l > 0 ? u.value / l : 0, m = f * c, b = c - m, v = d;
    return d += f * 360, { seg: u, dash: m, gap: b, rotate: v };
  });
  return /* @__PURE__ */ g("div", { className: "j-chart-donut-wrap", style: { width: t, maxWidth: "100%" }, children: [
    /* @__PURE__ */ g(
      "svg",
      {
        viewBox: "0 0 100 100",
        xmlns: "http://www.w3.org/2000/svg",
        style: { width: "100%", height: "100%" },
        children: [
          /* @__PURE__ */ o(
            "circle",
            {
              cx: Me,
              cy: Dt,
              r: s,
              fill: "none",
              stroke: "var(--j-accent-10)",
              strokeWidth: n
            }
          ),
          l > 0 && h.map(({ seg: u, dash: f, gap: m, rotate: b }, v) => /* @__PURE__ */ o(
            "circle",
            {
              cx: Me,
              cy: Dt,
              r: s,
              fill: "none",
              stroke: u.color ?? "var(--j-accent)",
              strokeWidth: n,
              strokeDasharray: `${f.toFixed(2)} ${m.toFixed(2)}`,
              transform: `rotate(${b} ${Me} ${Dt})`,
              className: "j-chart-donut-seg"
            },
            v
          )),
          r && /* @__PURE__ */ o(
            "text",
            {
              x: Me,
              y: a ? 46 : 54,
              textAnchor: "middle",
              className: "j-chart-donut-center-val",
              children: r
            }
          ),
          a && /* @__PURE__ */ o(
            "text",
            {
              x: Me,
              y: 58,
              textAnchor: "middle",
              className: "j-chart-donut-center-lbl",
              children: a
            }
          )
        ]
      }
    ),
    i && /* @__PURE__ */ o("div", { className: "j-chart-donut-legend", children: e.map((u, f) => /* @__PURE__ */ g("div", { className: "j-chart-donut-legend-row", children: [
      /* @__PURE__ */ o(
        "span",
        {
          className: "j-chart-donut-legend-dot",
          style: { background: u.color ?? "var(--j-accent)" }
        }
      ),
      /* @__PURE__ */ o("span", { className: "j-chart-donut-legend-label", children: u.label }),
      /* @__PURE__ */ g("span", { className: "j-chart-donut-legend-pct", children: [
        l > 0 ? Math.round(u.value / l * 100) : 0,
        "%"
      ] })
    ] }, f)) })
  ] });
}
const he = 100, we = 95, ce = 72, ot = 210, it = 120;
function dt(e) {
  return e * Math.PI / 180;
}
function Cn(e, t) {
  if (t <= 0) return "";
  const n = dt(e), r = dt(e + t), a = he + ce * Math.cos(n), i = we + ce * Math.sin(n), s = he + ce * Math.cos(r), c = we + ce * Math.sin(r), l = t > 180 ? 1 : 0;
  return `M ${a.toFixed(2)} ${i.toFixed(2)} A ${ce} ${ce} 0 ${l} 1 ${s.toFixed(2)} ${c.toFixed(2)}`;
}
function Ot(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(0);
}
function il({
  value: e,
  min: t = 0,
  max: n = 100,
  size: r = "200px",
  colorVar: a = "--j-accent",
  thickness: i = 14,
  label: s = "",
  displayValue: c,
  showNeedle: l = !0,
  showTicks: d = !0,
  showMinMax: h = !0,
  ticks: u = 8
}) {
  const f = Math.max(0, Math.min(1, (e - t) / (n - t || 1))), m = `var(${a})`, b = it * f, v = dt(ot + f * it), w = he + (ce - 2) * Math.cos(v), y = we + (ce - 2) * Math.sin(v), j = ce - i / 2 - 2, x = ce + i / 2 + 4;
  return /* @__PURE__ */ o("div", { style: { width: r, maxWidth: "100%" }, children: /* @__PURE__ */ g(
    "svg",
    {
      viewBox: "0 0 200 120",
      xmlns: "http://www.w3.org/2000/svg",
      style: { width: "100%", height: "100%" },
      children: [
        /* @__PURE__ */ o(
          "path",
          {
            d: Cn(ot, it),
            fill: "none",
            stroke: "var(--j-accent-10)",
            strokeWidth: i,
            strokeLinecap: "round"
          }
        ),
        b > 0 && /* @__PURE__ */ o(
          "path",
          {
            d: Cn(ot, b),
            fill: "none",
            stroke: m,
            strokeWidth: i,
            strokeLinecap: "round",
            className: "j-chart-gauge-arc"
          }
        ),
        d && Array.from({ length: u + 1 }, (N, k) => {
          const p = dt(ot + k / u * it);
          return /* @__PURE__ */ o(
            "line",
            {
              x1: he + j * Math.cos(p),
              y1: we + j * Math.sin(p),
              x2: he + x * Math.cos(p),
              y2: we + x * Math.sin(p),
              stroke: m,
              strokeWidth: 1,
              className: "j-chart-gauge-tick"
            },
            k
          );
        }),
        l && /* @__PURE__ */ g(z, { children: [
          /* @__PURE__ */ o(
            "line",
            {
              x1: he,
              y1: we,
              x2: w,
              y2: y,
              stroke: m,
              strokeWidth: 2,
              strokeLinecap: "round",
              className: "j-chart-gauge-needle"
            }
          ),
          /* @__PURE__ */ o(
            "circle",
            {
              cx: he,
              cy: we,
              r: 5,
              fill: m,
              className: "j-chart-gauge-hub"
            }
          )
        ] }),
        /* @__PURE__ */ o(
          "text",
          {
            x: he,
            y: 100,
            textAnchor: "middle",
            className: "j-chart-donut-center-val",
            style: { fontFamily: "'Courier New', monospace" },
            children: c ?? Ot(e)
          }
        ),
        s && /* @__PURE__ */ o(
          "text",
          {
            x: he,
            y: 114,
            textAnchor: "middle",
            className: "j-chart-donut-center-lbl",
            style: { fontFamily: "'Courier New', monospace" },
            children: s
          }
        ),
        h && /* @__PURE__ */ g(z, { children: [
          /* @__PURE__ */ o(
            "text",
            {
              x: 14,
              y: 114,
              textAnchor: "start",
              className: "j-chart-axis-label",
              children: Ot(t)
            }
          ),
          /* @__PURE__ */ o(
            "text",
            {
              x: 186,
              y: 114,
              textAnchor: "end",
              className: "j-chart-axis-label",
              children: Ot(n)
            }
          )
        ] })
      ]
    }
  ) });
}
const kr = 100, Sr = 100, Fe = 78;
function tc(e) {
  return e * Math.PI / 180;
}
function nc(e, t) {
  return tc(360 * e / t - 90);
}
function ct(e, t, n) {
  const r = nc(e, t);
  return [kr + n * Math.cos(r), Sr + n * Math.sin(r)];
}
function $n(e, t, n) {
  const [r, a] = ct(e, t, n);
  return `${r.toFixed(2)},${a.toFixed(2)}`;
}
function Wn(e) {
  return Math.max(0, Math.min(1, e));
}
function sl({
  axes: e,
  size: t = "200px",
  colorVar: n = "--j-accent",
  rings: r = 4,
  showLabels: a = !0
}) {
  const i = Math.max(e.length, 3), s = `var(${n},var(--j-accent))`, c = Array.from({ length: r }, (f, m) => {
    const b = Fe * (m + 1) / r, v = Array.from({ length: i }, (w, y) => $n(y, i, b)).join(" ");
    return /* @__PURE__ */ o("polygon", { points: v, className: "j-chart-radar-web" }, m);
  }), l = Array.from({ length: i }, (f, m) => {
    const [b, v] = ct(m, i, Fe);
    return /* @__PURE__ */ o(
      "line",
      {
        x1: kr,
        y1: Sr,
        x2: b,
        y2: v,
        className: "j-chart-radar-spoke"
      },
      m
    );
  }), d = e.map((f, m) => {
    const b = Wn(f.value / ((f.max ?? 100) || 1));
    return $n(m, i, Fe * b);
  }).join(" "), h = e.map((f, m) => {
    const b = Wn(f.value / ((f.max ?? 100) || 1)), [v, w] = ct(m, i, Fe * b);
    return /* @__PURE__ */ o(
      "circle",
      {
        cx: v,
        cy: w,
        r: 3,
        className: "j-chart-dot",
        style: { fill: s }
      },
      m
    );
  }), u = a ? e.map((f, m) => {
    const [b, v] = ct(m, i, Fe + 14), w = b < 98 ? "end" : b > 102 ? "start" : "middle";
    return /* @__PURE__ */ o(
      "text",
      {
        x: b,
        y: v + 4,
        className: "j-chart-axis-label",
        textAnchor: w,
        children: f.label
      },
      m
    );
  }) : null;
  return /* @__PURE__ */ o("div", { style: { width: t, maxWidth: "100%", aspectRatio: "1" }, children: /* @__PURE__ */ g(
    "svg",
    {
      viewBox: "0 0 200 200",
      xmlns: "http://www.w3.org/2000/svg",
      style: { width: "100%", height: "100%" },
      children: [
        c,
        l,
        /* @__PURE__ */ o(
          "polygon",
          {
            points: d,
            className: "j-chart-radar-data",
            style: { fill: s, stroke: s }
          }
        ),
        h,
        u
      ]
    }
  ) });
}
const Tn = [
  "> LOADING NEURAL CORE............. [OK]",
  "> SPEECH ENGINE INIT.............. [OK]",
  "> SKILL REGISTRY SCAN............. [12 FOUND]",
  "> OLLAMA BRIDGE................... [CONNECTED]",
  "> VOICE PIPELINE.................. [READY]",
  "> MEMORY SUBSYSTEM................ [OK]",
  "> HUD CALIBRATION................. [OK]",
  "> ALL SYSTEMS NOMINAL............. [GO]"
];
function xe(e) {
  return new Promise((t) => setTimeout(t, e));
}
function cl({
  systemName: e = "JARVIS",
  version: t = "v4.2.1",
  onComplete: n
}) {
  const [r, a] = W(!0), [i, s] = W(0), [c, l] = W(0), [d, h] = W(0);
  if (K(() => {
    let f = !1;
    async function m() {
      if (!f && (s(0), l(0), await xe(100), !f && (l(95), await xe(700), !f && (s(1), await xe(600), !f)))) {
        s(2);
        for (let b = 1; b <= Tn.length; b++) {
          if (f) return;
          h(b), await xe(180);
        }
        await xe(200), !f && (s(3), await xe(900), !f && (s(4), await xe(800), !f && (a(!1), n == null || n())));
      }
    }
    return m(), () => {
      f = !0;
    };
  }, []), !r) return null;
  const u = {
    position: "absolute",
    width: i >= 1 ? 24 : 0,
    height: i >= 1 ? 24 : 0,
    borderColor: "var(--j-accent)",
    borderStyle: "solid",
    borderWidth: 0,
    filter: "drop-shadow(0 0 4px var(--j-accent))",
    transition: "width 0.4s ease-out, height 0.4s ease-out",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ g(
    "div",
    {
      "data-boot-phase": i,
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--j-bg)",
        fontFamily: "'Courier New', monospace",
        overflow: "hidden"
      },
      children: [
        i <= 1 && /* @__PURE__ */ o(
          "div",
          {
            "data-scanline": "",
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              height: 2,
              background: "linear-gradient(90deg,transparent,var(--j-accent),transparent)",
              boxShadow: "0 0 16px var(--j-accent)",
              top: `${c}%`,
              transition: "top 0.8s linear",
              zIndex: 10,
              pointerEvents: "none"
            }
          }
        ),
        /* @__PURE__ */ o("div", { style: { ...u, top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 } }),
        /* @__PURE__ */ o("div", { style: { ...u, top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 } }),
        /* @__PURE__ */ o("div", { style: { ...u, bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 } }),
        /* @__PURE__ */ o("div", { style: { ...u, bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 } }),
        i >= 2 && /* @__PURE__ */ o("div", { style: { position: "absolute", top: "30%", left: "10%", right: "10%" }, children: Tn.slice(0, d).map((f, m) => /* @__PURE__ */ o(
          "div",
          {
            "data-boot-line": "",
            style: {
              fontSize: 10,
              color: "var(--j-accent-mid)",
              letterSpacing: "0.10em",
              marginBottom: 4,
              animation: "j-slide-in 0.3s ease-out both",
              animationDelay: `${m * 0.12}s`
            },
            children: f
          },
          m
        )) }),
        i >= 3 && /* @__PURE__ */ g("div", { style: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          textAlign: "center"
        }, children: [
          /* @__PURE__ */ o("div", { "data-spinner": "", children: /* @__PURE__ */ o(It, { size: "80px", color: "cyan", label: e, showLabel: !0 }) }),
          /* @__PURE__ */ o("div", { style: {
            fontSize: 11,
            color: "var(--j-accent-mid)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            animation: "j-pulse 1.5s ease-in-out infinite"
          }, children: "INITIALISING SYSTEMS..." })
        ] }),
        i >= 4 && /* @__PURE__ */ g(z, { children: [
          /* @__PURE__ */ g("div", { style: { position: "absolute", bottom: "12%", left: 0, right: 0, textAlign: "center" }, children: [
            /* @__PURE__ */ o("div", { style: {
              fontSize: 22,
              fontWeight: 600,
              color: "var(--j-text-primary)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textShadow: "0 0 20px var(--j-accent)",
              animation: "j-glitch 4s ease-in-out infinite"
            }, children: e }),
            /* @__PURE__ */ g("div", { style: {
              fontSize: 9,
              color: "var(--j-accent-mid)",
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              marginTop: 4
            }, children: [
              t,
              " · ONLINE"
            ] })
          ] }),
          /* @__PURE__ */ o("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0 }, children: /* @__PURE__ */ o(He, { position: "bottom", showWaveform: !0, showTicks: !0, showRec: !0 }) })
        ] })
      ]
    }
  );
}
const rc = {
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "var(--j-text-muted)",
  active: "var(--j-text-secondary)",
  processing: "var(--j-text-secondary)"
}, ac = {
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "transparent",
  active: "transparent",
  processing: "transparent"
}, oc = {
  warning: "amber",
  error: "red",
  success: "green",
  idle: "ghost",
  active: "cyan",
  processing: "cyan"
};
function ic(e, t) {
  if (!t) return "active";
  const n = String(e[t] ?? "").toLowerCase();
  return n === "warning" || n === "warn" ? "warning" : n === "error" || n === "danger" ? "error" : n === "success" || n === "ok" ? "success" : n === "idle" || n === "offline" ? "idle" : "active";
}
function ll({
  columns: e,
  rows: t,
  stateColumn: n,
  showFooter: r = !0,
  footerLabel: a
}) {
  const [i, s] = W(-1), c = !t || t.length === 0;
  return /* @__PURE__ */ g("div", { style: {
    position: "relative",
    background: "var(--j-bg-card)",
    border: "1px solid var(--j-accent-12)",
    overflow: "hidden",
    fontFamily: "'Courier New', monospace"
  }, children: [
    /* @__PURE__ */ o("div", { style: { position: "relative", height: 2, background: "linear-gradient(90deg,var(--j-accent),var(--j-accent-08))", overflow: "hidden" }, children: /* @__PURE__ */ o("div", { className: "j-scan-h", style: { position: "absolute", inset: 0, width: 60, background: "linear-gradient(90deg,transparent,var(--j-text-primary),transparent)" } }) }),
    /* @__PURE__ */ o("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ g("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "'Courier New', monospace" }, children: [
      /* @__PURE__ */ o("thead", { children: /* @__PURE__ */ o("tr", { children: e.map((l) => /* @__PURE__ */ o("th", { style: {
        padding: "8px 14px",
        textAlign: l.align ?? "left",
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--j-accent-mid)",
        background: "var(--j-accent-05)",
        borderBottom: "1px solid var(--j-accent-18)",
        whiteSpace: "nowrap",
        ...l.width ? { width: l.width } : {}
      }, children: l.label }, l.key)) }) }),
      /* @__PURE__ */ o("tbody", { children: c ? /* @__PURE__ */ o("tr", { children: /* @__PURE__ */ o("td", { colSpan: e.length, style: { padding: 24 }, children: /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }, children: [
        /* @__PURE__ */ o(It, { size: "24px", showLabel: !1 }),
        /* @__PURE__ */ o("span", { style: { fontSize: 10, color: "var(--j-text-dim)", letterSpacing: "0.10em" }, children: "NO DATA" })
      ] }) }) }) : t.map((l, d) => {
        const h = ic(l, n), u = d === i, f = u ? "var(--j-accent-05)" : d % 2 === 0 ? "transparent" : "var(--j-accent-05)", m = ac[h] ?? "transparent";
        return /* @__PURE__ */ o(
          "tr",
          {
            "data-state": h,
            style: { background: f, transition: "background 0.12s", borderLeft: `2px solid ${m === "transparent" && u ? "var(--j-accent-50)" : m}` },
            onMouseEnter: () => s(d),
            onMouseLeave: () => s(-1),
            children: e.map((v) => {
              const w = String(l[v.key] ?? ""), y = rc[h] ?? "var(--j-text-secondary)", j = {
                padding: "8px 14px",
                textAlign: v.align ?? "left",
                borderBottom: "1px solid var(--j-accent-05)",
                color: y
              };
              let x = w;
              return v.key === n ? x = /* @__PURE__ */ o(Ns, { state: h, children: w }) : v.isBadge && (x = /* @__PURE__ */ o(mr, { color: oc[h] ?? "cyan", children: w })), /* @__PURE__ */ o("td", { style: j, children: x }, v.key);
            })
          },
          d
        );
      }) })
    ] }) }),
    /* @__PURE__ */ o("div", { style: { height: 1, background: "linear-gradient(90deg,var(--j-accent-25),transparent)" } }),
    r && !c && /* @__PURE__ */ g("div", { style: {
      padding: "6px 14px",
      fontSize: 8,
      color: "var(--j-text-dim)",
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      display: "flex",
      justifyContent: "space-between"
    }, children: [
      /* @__PURE__ */ g("span", { children: [
        t.length,
        " RECORDS"
      ] }),
      a && /* @__PURE__ */ o("span", { children: a })
    ] })
  ] });
}
function sc(e = "active") {
  return e === "warning" ? "var(--j-warn)" : e === "error" ? "var(--j-err)" : e === "success" ? "var(--j-ok)" : "var(--j-accent-mid)";
}
function dl({
  visible: e,
  onClose: t,
  commands: n,
  onExecute: r,
  placeholder: a = "Type a command...",
  isListening: i = !1
}) {
  const [s, c] = W(""), [l, d] = W(0), h = U(null);
  K(() => {
    var k;
    e && (c(""), d(0), (k = h.current) == null || k.focus());
  }, [e]);
  const u = Re(() => {
    if (!s.trim()) return n;
    const k = s.toLowerCase();
    return n.filter(
      (p) => {
        var S;
        return p.label.toLowerCase().includes(k) || p.key.toLowerCase().includes(k) || (((S = p.description) == null ? void 0 : S.toLowerCase().includes(k)) ?? !1);
      }
    );
  }, [n, s]);
  function f(k) {
    c(k.target.value), d(0);
  }
  function m(k) {
    k.key === "ArrowDown" ? (k.preventDefault(), d((p) => Math.min(p + 1, u.length - 1))) : k.key === "ArrowUp" ? (k.preventDefault(), d((p) => Math.max(p - 1, 0))) : k.key === "Enter" ? u[l] && b(u[l]) : k.key === "Escape" && v();
  }
  function b(k) {
    r(k), v();
  }
  function v() {
    c(""), d(0), t();
  }
  function w() {
    var k;
    c(""), d(0), (k = h.current) == null || k.focus();
  }
  if (!e) return null;
  const y = [];
  let j;
  u.forEach((k, p) => {
    const S = k.group !== j;
    j = k.group, y.push({ cmd: k, idx: p, showGroup: S });
  });
  const x = {
    position: "absolute",
    top: 0,
    left: 0,
    width: 14,
    height: 14,
    borderColor: "var(--j-accent)",
    borderStyle: "solid",
    borderWidth: "2px 0 0 2px",
    filter: "drop-shadow(0 0 4px var(--j-accent))",
    animation: "j-corner-blink var(--j-dur-corner, 2s) ease-in-out infinite",
    pointerEvents: "none"
  }, N = {
    ...x,
    left: "auto",
    right: 0,
    borderWidth: "2px 2px 0 0"
  };
  return /* @__PURE__ */ g(z, { children: [
    /* @__PURE__ */ o(
      "div",
      {
        "data-backdrop": "",
        onClick: v,
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 3e3,
          background: "var(--j-bg-overlay)",
          backdropFilter: "blur(4px)"
        }
      }
    ),
    /* @__PURE__ */ g("div", { style: {
      position: "fixed",
      zIndex: 3001,
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      width: 560,
      maxWidth: "calc(100vw - 32px)",
      background: "var(--j-bg-card)",
      overflow: "hidden",
      clipPath: "polygon(18px 0%,100% 0%,100% calc(100% - 18px),calc(100% - 18px) 100%,0% 100%,0% 18px)",
      border: "1px solid var(--j-accent-25)",
      boxShadow: "0 0 40px var(--j-accent-12),0 0 80px var(--j-accent-05)",
      fontFamily: "'Courier New', monospace"
    }, children: [
      /* @__PURE__ */ o("div", { style: x }),
      /* @__PURE__ */ o("div", { style: N }),
      /* @__PURE__ */ o(
        "div",
        {
          className: "j-scan-v",
          style: {
            position: "absolute",
            left: 0,
            right: 0,
            height: 1,
            top: -1,
            background: "linear-gradient(90deg,transparent,var(--j-accent),transparent)",
            boxShadow: "0 0 12px var(--j-accent)",
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ g("div", { style: { position: "relative", padding: "12px 16px", borderBottom: "1px solid var(--j-accent-12)" }, children: [
        /* @__PURE__ */ o(
          "div",
          {
            "data-search-icon": "",
            style: {
              position: "absolute",
              left: 28,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 16,
              color: "var(--j-accent-mid)",
              filter: "drop-shadow(0 0 4px var(--j-accent))",
              animation: "j-pulse 2s ease-in-out infinite",
              userSelect: "none",
              pointerEvents: "none"
            },
            children: i ? "🎙" : "⌕"
          }
        ),
        /* @__PURE__ */ o(
          "input",
          {
            ref: h,
            value: s,
            onChange: f,
            onKeyDown: m,
            placeholder: a,
            style: {
              width: "100%",
              padding: "10px 40px 10px 40px",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--j-text-primary)",
              fontSize: 14,
              fontFamily: "'Courier New', monospace",
              letterSpacing: "0.06em",
              boxSizing: "border-box"
            },
            autoComplete: "off",
            spellCheck: !1
          }
        ),
        s && /* @__PURE__ */ o(
          "button",
          {
            "data-clear": "",
            onClick: w,
            style: {
              position: "absolute",
              right: 28,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--j-text-muted)",
              fontSize: 14,
              fontFamily: "inherit",
              padding: "2px 6px"
            },
            children: "✕"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { style: { maxHeight: 360, overflowY: "auto" }, children: u.length === 0 ? /* @__PURE__ */ o("div", { style: {
        padding: 24,
        textAlign: "center",
        fontSize: 11,
        color: "var(--j-text-dim)",
        letterSpacing: "0.10em"
      }, children: "NO COMMANDS FOUND" }) : y.map(({ cmd: k, idx: p, showGroup: S }) => {
        const M = p === l, C = sc(k.state ?? "active");
        return /* @__PURE__ */ g("div", { children: [
          S && k.group && /* @__PURE__ */ o("div", { "data-group-header": "", style: {
            padding: "6px 16px 2px",
            fontSize: 8,
            color: "var(--j-text-dim)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            userSelect: "none"
          }, children: k.group }),
          /* @__PURE__ */ g(
            "div",
            {
              "data-cmd": k.key,
              "data-selected": M ? "true" : "false",
              onClick: () => b(k),
              onMouseEnter: () => d(p),
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                cursor: "pointer",
                background: M ? "var(--j-accent-08)" : "transparent",
                borderLeft: `2px solid ${M ? C : "transparent"}`,
                transition: "background 0.1s"
              },
              children: [
                k.icon && /* @__PURE__ */ o("span", { style: { fontSize: 14, color: C, filter: `drop-shadow(0 0 4px ${C})`, flexShrink: 0 }, children: k.icon }),
                /* @__PURE__ */ g("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ o("div", { style: { fontSize: 11, color: M ? "var(--j-text-primary)" : "var(--j-text-secondary)", letterSpacing: "0.06em" }, children: k.label }),
                  k.description && /* @__PURE__ */ o("div", { style: { fontSize: 9, color: "var(--j-text-muted)", letterSpacing: "0.08em", marginTop: 1 }, children: k.description })
                ] }),
                M && /* @__PURE__ */ o("span", { style: { fontSize: 9, color: "var(--j-accent-mid)", letterSpacing: "0.10em", opacity: 0.7, flexShrink: 0 }, children: "ENTER" })
              ]
            }
          )
        ] }, k.key);
      }) }),
      /* @__PURE__ */ g("div", { style: {
        padding: "6px 16px",
        borderTop: "1px solid var(--j-accent-08)",
        display: "flex",
        gap: 16,
        fontSize: 8,
        color: "var(--j-text-dim)",
        letterSpacing: "0.10em",
        userSelect: "none"
      }, children: [
        /* @__PURE__ */ o("span", { children: "↑↓ NAVIGATE" }),
        /* @__PURE__ */ o("span", { children: "↵ EXECUTE" }),
        /* @__PURE__ */ o("span", { children: "ESC CLOSE" })
      ] })
    ] })
  ] });
}
const Nr = Le(null);
function cc() {
  return qe(Nr);
}
function lc(e) {
  return e === "warning" ? "var(--j-warn)" : e === "error" ? "var(--j-err)" : e === "success" ? "var(--j-ok)" : "var(--j-accent)";
}
function dc(e) {
  return e === "warning" ? "var(--j-warn-25)" : e === "error" ? "var(--j-err-25)" : e === "success" ? "var(--j-ok-25)" : "var(--j-accent-25)";
}
function uc(e) {
  return e === "warning" ? "var(--j-warn-12)" : e === "error" ? "var(--j-err-12)" : e === "success" ? "var(--j-ok-12)" : "var(--j-accent-12)";
}
function fc(e, t) {
  const n = (e - 90) * Math.PI / 180;
  return {
    x: Math.round(t * Math.cos(n)),
    y: Math.round(t * Math.sin(n))
  };
}
function ul({
  open: e,
  onOpenChange: t,
  triggerLabel: n = "MENU",
  radius: r = 90,
  centerSize: a = "64px",
  children: i
}) {
  const [s, c] = W([]), [l, d] = W(e ?? !1), [h, u] = W(null), [f, m] = W(null), b = q((y) => {
    c((j) => j.some((x) => x.key === y.key) ? j : [...j, y]);
  }, []);
  function v() {
    const y = !l;
    d(y), y || (u(null), m(null)), t == null || t(y);
  }
  function w() {
    d(!1), u(null), m(null), t == null || t(!1);
  }
  return /* @__PURE__ */ g(
    "div",
    {
      style: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', monospace"
      },
      children: [
        /* @__PURE__ */ o(Nr.Provider, { value: b, children: i }),
        s.map((y) => {
          const { x: j, y: x } = fc(y.angle, r), N = h === y.key, k = lc(y.state), p = dc(y.state), S = uc(y.state), M = l ? `translate(calc(-50% + ${j}px), calc(-50% + ${x}px))` : "translate(-50%, -50%)";
          return /* @__PURE__ */ g(
            "div",
            {
              "data-item-key": y.key,
              style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: M,
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
                opacity: l ? 1 : 0,
                cursor: "pointer",
                zIndex: 10
              },
              onMouseEnter: () => {
                u(y.key), m(y.label);
              },
              onMouseLeave: () => {
                u(null), m(null);
              },
              onClick: () => {
                y.onClick(), w();
              },
              children: [
                /* @__PURE__ */ o("div", { style: {
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: N ? S : "var(--j-bg-card)",
                  border: `1.5px solid ${N ? k : p}`,
                  boxShadow: N ? `0 0 16px ${p}, inset 0 0 12px ${S}` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                }, children: /* @__PURE__ */ o("span", { style: {
                  fontSize: 16,
                  fontStyle: "normal",
                  filter: N ? `drop-shadow(0 0 6px ${k})` : "none"
                }, children: y.icon }) }),
                l && /* @__PURE__ */ o(
                  "div",
                  {
                    "data-connector": "",
                    style: {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: r - 20,
                      height: 1,
                      transformOrigin: "0 50%",
                      transform: `rotate(${y.angle - 90}deg)`,
                      background: `linear-gradient(90deg, ${p}, transparent)`,
                      opacity: N ? 0.8 : 0.2,
                      transition: "opacity 0.2s",
                      pointerEvents: "none"
                    }
                  }
                )
              ]
            },
            y.key
          );
        }),
        /* @__PURE__ */ g(
          "div",
          {
            "data-trigger": "",
            "data-open": l ? "true" : "false",
            onClick: v,
            style: {
              position: "relative",
              width: a,
              height: a,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 36%, var(--j-accent-18), var(--j-bg) 70%)",
              border: "1.5px solid var(--j-accent-50)",
              boxShadow: "0 0 20px var(--j-accent-12), inset 0 0 16px var(--j-accent-05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 20,
              flexShrink: 0,
              userSelect: "none"
            },
            children: [
              /* @__PURE__ */ o("div", { style: {
                position: "absolute",
                inset: "-4px",
                borderRadius: "50%",
                border: "1px solid var(--j-accent)",
                opacity: 0.3,
                animation: `j-spin ${l ? "2s" : "4s"} linear infinite`
              } }),
              /* @__PURE__ */ o("div", { style: {
                position: "absolute",
                inset: "-10px",
                borderRadius: "50%",
                border: "1px dashed var(--j-accent)",
                opacity: 0.15,
                animation: "j-spin-rev 6s linear infinite"
              } }),
              /* @__PURE__ */ o("div", { style: { position: "relative", zIndex: 1, textAlign: "center" }, children: /* @__PURE__ */ o("div", { style: {
                fontSize: 10,
                fontWeight: 600,
                color: "var(--j-text-primary)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                animation: l ? "j-glitch 3s ease-in-out infinite" : "none"
              }, children: l ? "CLOSE" : n }) })
            ]
          }
        ),
        f && l && /* @__PURE__ */ o(
          "div",
          {
            "data-hover-label": "",
            style: {
              position: "absolute",
              top: "calc(50% + 70px)",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 9,
              color: "var(--j-accent)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              textShadow: "0 0 8px var(--j-accent)",
              animation: "j-pulse 1s ease-in-out infinite"
            },
            children: f
          }
        )
      ]
    }
  );
}
function fl({
  icon: e = "⊞",
  label: t = "",
  angle: n = 0,
  state: r = "active",
  onClick: a
}) {
  const i = cc();
  return K(() => {
    i == null || i({
      key: `${t}-${n}`,
      icon: e,
      label: t,
      angle: n,
      state: r,
      onClick: a ?? (() => {
      })
    });
  }, []), null;
}
const hc = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)",
  blue: "var(--j-accent)",
  white: "var(--j-text-primary)"
};
function hl({
  title: e = "WIDGET",
  defaultX: t = 0,
  defaultY: n = 0,
  width: r = 280,
  color: a = "cyan",
  collapsible: i = !0,
  className: s,
  style: c,
  children: l,
  onMove: d
}) {
  const [h, u] = W({ x: t, y: n }), [f, m] = W(!1), [b, v] = W(!1), w = U(null), y = U(null), j = hc[a] ?? "var(--j-accent)", x = q((p) => {
    p.preventDefault(), w.current = { mx: p.clientX, my: p.clientY, px: h.x, py: h.y }, v(!0), p.target.setPointerCapture(p.pointerId);
  }, [h]), N = q((p) => {
    if (!w.current) return;
    const S = w.current.px + p.clientX - w.current.mx, M = w.current.py + p.clientY - w.current.my;
    u({ x: S, y: M }), d == null || d(S, M);
  }, [d]), k = q(() => {
    w.current = null, v(!1);
  }, []);
  return /* @__PURE__ */ g(
    "div",
    {
      ref: y,
      className: s,
      style: {
        position: "absolute",
        left: h.x,
        top: h.y,
        width: r,
        background: "var(--j-bg-card)",
        border: `1px solid ${j}`,
        boxShadow: `0 0 12px ${j}22`,
        fontFamily: "'Courier New', monospace",
        userSelect: "none",
        transition: b ? "none" : "box-shadow .2s",
        zIndex: b ? 100 : 10,
        clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
        ...c
      },
      onPointerMove: N,
      onPointerUp: k,
      children: [
        /* @__PURE__ */ g(
          "div",
          {
            onPointerDown: x,
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px 12px",
              background: `${j}18`,
              borderBottom: f ? "none" : `1px solid ${j}44`,
              cursor: b ? "grabbing" : "grab"
            },
            children: [
              /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", gap: 7 }, children: [
                /* @__PURE__ */ o("svg", { width: 8, height: 8, children: /* @__PURE__ */ o("rect", { width: 8, height: 8, fill: j, opacity: 0.7, transform: "rotate(45 4 4)" }) }),
                /* @__PURE__ */ o("span", { style: { fontSize: 8, color: j, letterSpacing: "0.18em", fontWeight: 700 }, children: e })
              ] }),
              i && /* @__PURE__ */ o(
                "button",
                {
                  onPointerDown: (p) => p.stopPropagation(),
                  onClick: () => m((p) => !p),
                  style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: j,
                    fontSize: 9,
                    letterSpacing: ".1em",
                    padding: "0 2px"
                  },
                  children: f ? "▸" : "▾"
                }
              )
            ]
          }
        ),
        !f && /* @__PURE__ */ o("div", { style: { padding: "10px 12px" }, children: l })
      ]
    }
  );
}
const pc = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)",
  blue: "var(--j-accent)",
  white: "var(--j-text-primary)"
};
function pl({
  analog: e = !0,
  color: t = "cyan",
  size: n = 120,
  showDate: r = !0,
  className: a,
  style: i
}) {
  const [s, c] = W(/* @__PURE__ */ new Date());
  K(() => {
    const S = setInterval(() => c(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(S);
  }, []);
  const l = pc[t] ?? "var(--j-accent)", d = (S) => String(S).padStart(2, "0"), h = `${d(s.getHours())}:${d(s.getMinutes())}:${d(s.getSeconds())}`, u = s.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit", year: "numeric" }).toUpperCase(), f = s.getSeconds() / 60 * 360, m = (s.getMinutes() + s.getSeconds() / 60) / 60 * 360, b = (s.getHours() % 12 + s.getMinutes() / 60) / 12 * 360, v = n / 2, w = n / 2, y = n / 2 - 4, j = (S, M) => ({
    x: v + M * Math.sin(S * Math.PI / 180),
    y: w - M * Math.cos(S * Math.PI / 180)
  }), x = j(b, y * 0.48), N = j(m, y * 0.65), k = j(f, y * 0.8), p = Array.from({ length: 60 }, (S, M) => {
    const C = M / 60 * Math.PI * 2, P = M % 5 === 0, F = y - (P ? 10 : 5);
    return {
      x1: v + y * Math.cos(C),
      y1: w + y * Math.sin(C),
      x2: v + F * Math.cos(C),
      y2: w + F * Math.sin(C),
      major: P
    };
  });
  return /* @__PURE__ */ g("div", { className: a, style: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6, fontFamily: "'Courier New', monospace", ...i }, children: [
    e && /* @__PURE__ */ g("svg", { width: n, height: n, children: [
      /* @__PURE__ */ o("circle", { cx: v, cy: w, r: y, fill: "none", stroke: l, strokeWidth: 1.5, opacity: 0.5 }),
      /* @__PURE__ */ o("circle", { cx: v, cy: w, r: y - 14, fill: "none", stroke: l, strokeWidth: 0.5, opacity: 0.2 }),
      p.map((S, M) => /* @__PURE__ */ o(
        "line",
        {
          x1: S.x1,
          y1: S.y1,
          x2: S.x2,
          y2: S.y2,
          stroke: l,
          strokeWidth: S.major ? 1.5 : 0.6,
          opacity: S.major ? 0.8 : 0.3
        },
        M
      )),
      [0, 3, 6, 9].map((S) => {
        const M = S / 12 * Math.PI * 2, C = y - 18;
        return /* @__PURE__ */ o(
          "text",
          {
            x: v + C * Math.sin(M),
            y: w - C * Math.cos(M) + 4,
            textAnchor: "middle",
            fill: l,
            fontSize: 8,
            fontFamily: "'Courier New'",
            opacity: 0.7,
            children: S === 0 ? "12" : S * 3
          },
          S
        );
      }),
      /* @__PURE__ */ o("line", { x1: v, y1: w, x2: x.x, y2: x.y, stroke: l, strokeWidth: 2.5, strokeLinecap: "round", opacity: 0.9 }),
      /* @__PURE__ */ o("line", { x1: v, y1: w, x2: N.x, y2: N.y, stroke: l, strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.85 }),
      /* @__PURE__ */ o("line", { x1: v, y1: w, x2: k.x, y2: k.y, stroke: "var(--j-err)", strokeWidth: 1, strokeLinecap: "round" }),
      /* @__PURE__ */ o("circle", { cx: v, cy: w, r: 3, fill: l }),
      /* @__PURE__ */ o("circle", { cx: v, cy: w, r: 6, fill: "none", stroke: l, strokeWidth: 0.7, opacity: 0.4 })
    ] }),
    /* @__PURE__ */ o("div", { style: { fontSize: e ? 13 : 22, color: l, letterSpacing: "0.15em", lineHeight: 1 }, children: h }),
    r && /* @__PURE__ */ o("div", { style: { fontSize: 8, color: "var(--j-text-muted)", letterSpacing: "0.12em" }, children: u })
  ] });
}
const Pn = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)",
  blue: "var(--j-accent)"
};
function ml({
  level: e = 100,
  size: t = 120,
  color: n = "cyan",
  label: r,
  animated: a = !0,
  className: i,
  style: s
}) {
  const c = Pn[n] ?? Pn.cyan, l = t / 2, d = t / 2, h = Math.max(0, Math.min(100, e)) / 100, u = t * 0.46, f = t * 0.34, m = t * 0.22, b = t * 0.1, v = 2 * Math.PI * f, w = v * h, y = v * (1 - h), j = [0, 120, 240].map((k) => {
    const p = k * Math.PI / 180, S = { x: l + m * Math.cos(p - Math.PI / 2), y: d + m * Math.sin(p - Math.PI / 2) }, M = { x: l + b * Math.cos(p - Math.PI / 2 + 0.6), y: d + b * Math.sin(p - Math.PI / 2 + 0.6) }, C = { x: l + b * Math.cos(p - Math.PI / 2 - 0.6), y: d + b * Math.sin(p - Math.PI / 2 - 0.6) };
    return `M ${S.x} ${S.y} L ${M.x} ${M.y} L ${C.x} ${C.y} Z`;
  });
  return /* @__PURE__ */ g("div", { className: i, style: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6, ...s }, children: [
    /* @__PURE__ */ g("svg", { width: t, height: t, children: [
      /* @__PURE__ */ o("defs", { children: /* @__PURE__ */ g("filter", { id: `arc-glow-${n}`, x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
        /* @__PURE__ */ o("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "2", result: "blur" }),
        /* @__PURE__ */ g("feMerge", { children: [
          /* @__PURE__ */ o("feMergeNode", { in: "blur" }),
          /* @__PURE__ */ o("feMergeNode", { in: "SourceGraphic" })
        ] })
      ] }) }),
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: u, fill: "none", stroke: c, strokeWidth: 1, opacity: 0.3 }),
      /* @__PURE__ */ o(
        "circle",
        {
          cx: l,
          cy: d,
          r: u,
          fill: "none",
          stroke: c,
          strokeWidth: 1.5,
          strokeDasharray: "4 8",
          opacity: 0.5,
          children: a && /* @__PURE__ */ o(
            "animateTransform",
            {
              attributeName: "transform",
              type: "rotate",
              values: `0 ${l} ${d};360 ${l} ${d}`,
              dur: "4s",
              repeatCount: "indefinite"
            }
          )
        }
      ),
      /* @__PURE__ */ o(
        "circle",
        {
          cx: l,
          cy: d,
          r: f,
          fill: "none",
          stroke: c,
          strokeWidth: 2.5,
          strokeDasharray: `${w} ${y}`,
          strokeDashoffset: v * 0.25,
          strokeLinecap: "round",
          opacity: 0.85,
          transform: `rotate(-90 ${l} ${d})`,
          filter: `url(#arc-glow-${n})`
        }
      ),
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: f, fill: "none", stroke: c, strokeWidth: 0.5, opacity: 0.15 }),
      /* @__PURE__ */ o(
        "circle",
        {
          cx: l,
          cy: d,
          r: m + 4,
          fill: "none",
          stroke: c,
          strokeWidth: 0.8,
          strokeDasharray: "2 5",
          opacity: 0.4,
          children: a && /* @__PURE__ */ o(
            "animateTransform",
            {
              attributeName: "transform",
              type: "rotate",
              values: `360 ${l} ${d};0 ${l} ${d}`,
              dur: "2.5s",
              repeatCount: "indefinite"
            }
          )
        }
      ),
      j.map((k, p) => /* @__PURE__ */ o("path", { d: k, fill: c, opacity: 0.7 * h, filter: `url(#arc-glow-${n})` }, p)),
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: b, fill: c, opacity: 0.15 + 0.6 * h }),
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: b, fill: "none", stroke: c, strokeWidth: 1.5, opacity: 0.8 }),
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: b - 3, fill: "none", stroke: c, strokeWidth: 0.7, opacity: 0.4 }),
      a && /* @__PURE__ */ g("circle", { cx: l, cy: d, r: b, fill: c, opacity: 0, children: [
        /* @__PURE__ */ o("animate", { attributeName: "opacity", values: "0;0.3;0", dur: "1.8s", repeatCount: "indefinite" }),
        /* @__PURE__ */ o("animate", { attributeName: "r", values: `${b};${b + 4};${b}`, dur: "1.8s", repeatCount: "indefinite" })
      ] }),
      /* @__PURE__ */ o(
        "text",
        {
          x: l,
          y: d + 4,
          textAnchor: "middle",
          fill: c,
          fontSize: b * 0.9,
          fontFamily: "'Courier New'",
          fontWeight: "700",
          children: Math.round(e)
        }
      )
    ] }),
    r && /* @__PURE__ */ o("div", { style: {
      fontSize: 8,
      color: c,
      letterSpacing: "0.18em",
      fontFamily: "'Courier New', monospace"
    }, children: r })
  ] });
}
const In = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)"
};
function gl({
  data: e,
  color: t = "cyan",
  cellSize: n = 28,
  gap: r = 3,
  showValue: a = !1,
  title: i,
  className: s,
  style: c
}) {
  const l = In[t] ?? In.cyan;
  return /* @__PURE__ */ g("div", { className: s, style: { fontFamily: "'Courier New', monospace", ...c }, children: [
    i && /* @__PURE__ */ o("div", { style: { fontSize: 8, color: l, letterSpacing: "0.18em", marginBottom: 8 }, children: i }),
    /* @__PURE__ */ o("div", { style: { display: "flex", flexDirection: "column", gap: r }, children: e.map((d, h) => /* @__PURE__ */ o("div", { style: { display: "flex", gap: r }, children: d.map((u, f) => {
      const m = Math.max(0, Math.min(100, u.value)) / 100, b = `color-mix(in srgb, ${l} ${Math.round(m * 100)}%, var(--j-bg-card))`, v = m > 0.55 ? "var(--j-bg)" : l;
      return /* @__PURE__ */ o(
        "div",
        {
          title: u.tooltip ?? u.label ?? `${u.value}%`,
          style: {
            width: n,
            height: n,
            background: b,
            border: `1px solid ${l}`,
            borderColor: `color-mix(in srgb, ${l} 35%, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            color: v,
            cursor: "default",
            transition: "transform .15s, background .2s, color .2s",
            flexShrink: 0
          },
          onMouseEnter: (w) => {
            w.currentTarget.style.transform = "scale(1.15)", w.currentTarget.style.zIndex = "5";
          },
          onMouseLeave: (w) => {
            w.currentTarget.style.transform = "", w.currentTarget.style.zIndex = "";
          },
          children: a ? Math.round(u.value) : u.label ?? ""
        },
        f
      );
    }) }, h)) })
  ] });
}
const mc = {
  active: "var(--j-accent)",
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  info: "var(--j-text-muted)"
}, gc = {
  active: "●",
  warning: "▲",
  error: "✕",
  success: "✓",
  info: "○"
};
function yl({
  items: e,
  maxRows: t = 8,
  rowHeight: n = 28,
  autoScroll: r = !0,
  showTime: a = !0,
  showSource: i = !0,
  className: s,
  style: c
}) {
  const l = U(null), [d, h] = W(!1);
  K(() => {
    if (!r || d) return;
    const f = l.current;
    f && (f.scrollTop = f.scrollHeight);
  }, [e, r, d]);
  const u = t * n;
  return /* @__PURE__ */ g("div", { className: s, style: { fontFamily: "'Courier New', monospace", ...c }, children: [
    /* @__PURE__ */ o(
      "div",
      {
        ref: l,
        onMouseEnter: () => h(!0),
        onMouseLeave: () => h(!1),
        style: {
          maxHeight: u,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--j-accent-50) transparent"
        },
        children: e.map((f) => {
          const m = mc[f.level ?? "info"], b = gc[f.level ?? "info"];
          return /* @__PURE__ */ g(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                height: n,
                padding: "0 4px",
                borderBottom: "1px solid var(--j-border)",
                fontSize: 9,
                letterSpacing: "0.05em"
              },
              children: [
                /* @__PURE__ */ o("span", { style: { color: m, fontSize: 8, width: 10, flexShrink: 0 }, children: b }),
                a && f.time && /* @__PURE__ */ o("span", { style: { color: "var(--j-text-muted)", width: 52, flexShrink: 0, fontSize: 8 }, children: f.time }),
                /* @__PURE__ */ o("span", { style: {
                  flex: 1,
                  color: "var(--j-text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }, children: f.message }),
                i && f.source && /* @__PURE__ */ g("span", { style: {
                  color: m,
                  opacity: 0.7,
                  fontSize: 7,
                  letterSpacing: ".1em",
                  flexShrink: 0,
                  maxWidth: 64,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }, children: [
                  "[",
                  f.source,
                  "]"
                ] })
              ]
            },
            f.id
          );
        })
      }
    ),
    d && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".12em", textAlign: "right", paddingTop: 4 }, children: "⏸ HOVER PAUSED" })
  ] });
}
const En = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)"
};
function vl({
  items: e,
  speed: t = 40,
  color: n = "cyan",
  height: r = 32,
  pauseOnHover: a = !0,
  className: i,
  style: s
}) {
  const c = U(null), l = En[n] ?? En.cyan, d = `ticker-${n}-${e.length}`;
  K(() => {
    const f = c.current;
    if (!f) return;
    const b = f.scrollWidth / 2 / t;
    let v = document.getElementById("j-ticker-style");
    v || (v = document.createElement("style"), v.id = "j-ticker-style", document.head.appendChild(v));
    const w = `@keyframes ${d} { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`;
    v.textContent = (v.textContent ?? "") + w, f.style.animation = `${d} ${b}s linear infinite`;
  }, [e, t, d]);
  const h = (f) => f === "up" ? "var(--j-ok)" : f === "down" ? "var(--j-err)" : "var(--j-text-muted)", u = () => e.map((f, m) => /* @__PURE__ */ g("span", { style: { display: "inline-flex", alignItems: "center", gap: 8, marginRight: 40, flexShrink: 0 }, children: [
    /* @__PURE__ */ o("span", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".15em" }, children: f.label }),
    /* @__PURE__ */ o("span", { style: { fontSize: 11, color: l, letterSpacing: ".1em", fontWeight: 700 }, children: f.value }),
    f.delta && /* @__PURE__ */ g("span", { style: { fontSize: 8, color: h(f.trend), letterSpacing: ".08em" }, children: [
      f.trend === "up" ? "▲" : f.trend === "down" ? "▼" : "–",
      " ",
      f.delta
    ] }),
    /* @__PURE__ */ o("span", { style: { color: "var(--j-border)", fontSize: 10, marginLeft: 8 }, children: "|" })
  ] }, m));
  return /* @__PURE__ */ g(
    "div",
    {
      className: i,
      style: {
        height: r,
        overflow: "hidden",
        background: "var(--j-bg-card)",
        border: `1px solid ${l}44`,
        display: "flex",
        alignItems: "center",
        ...s
      },
      onMouseEnter: () => a && c.current && (c.current.style.animationPlayState = "paused"),
      onMouseLeave: () => a && c.current && (c.current.style.animationPlayState = "running"),
      children: [
        /* @__PURE__ */ o("div", { style: {
          position: "absolute",
          left: 0,
          width: 40,
          height: r,
          zIndex: 1,
          background: "linear-gradient(to right, var(--j-bg-card), transparent)",
          pointerEvents: "none"
        } }),
        /* @__PURE__ */ g("div", { ref: c, style: { display: "inline-flex", whiteSpace: "nowrap", fontFamily: "'Courier New', monospace", willChange: "transform" }, children: [
          u(),
          u()
        ] }),
        /* @__PURE__ */ o("div", { style: {
          position: "absolute",
          right: 0,
          width: 40,
          height: r,
          zIndex: 1,
          background: "linear-gradient(to left, var(--j-bg-card), transparent)",
          pointerEvents: "none"
        } })
      ]
    }
  );
}
const yc = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)",
  blue: "var(--j-accent)"
};
function bl({
  widgets: e,
  height: t = 600,
  showGrid: n = !0,
  gridSize: r = 20,
  snapToGrid: a = !1,
  background: i,
  className: s,
  style: c,
  onWidgetMove: l
}) {
  const [d, h] = W(() => {
    const p = {};
    return e.forEach((S) => {
      p[S.id] = { x: S.x, y: S.y };
    }), p;
  }), [u, f] = W({}), [m, b] = W(null), [v, w] = W(e.map((p) => p.id)), y = U(null), j = (p) => a ? Math.round(p / r) * r : p, x = q((p, S) => {
    S.preventDefault();
    const M = d[p] ?? { x: 0, y: 0 };
    y.current = { mx: S.clientX, my: S.clientY, px: M.x, py: M.y }, b(p), w((C) => [...C.filter((P) => P !== p), p]), S.currentTarget.setPointerCapture(S.pointerId);
  }, [d]), N = q((p) => {
    if (!m || !y.current) return;
    const S = j(y.current.px + p.clientX - y.current.mx), M = j(y.current.py + p.clientY - y.current.my);
    h((C) => ({ ...C, [m]: { x: S, y: M } })), l == null || l(m, S, M);
  }, [m, j, l]), k = q(() => {
    b(null), y.current = null;
  }, []);
  return /* @__PURE__ */ g(
    "div",
    {
      className: s,
      style: {
        position: "relative",
        width: "100%",
        height: t,
        background: i ?? "var(--j-bg)",
        overflow: "hidden",
        fontFamily: "'Courier New', monospace",
        ...c
      },
      onPointerMove: N,
      onPointerUp: k,
      children: [
        n && /* @__PURE__ */ g(
          "svg",
          {
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.06 },
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ o("defs", { children: /* @__PURE__ */ o("pattern", { id: "hud-grid", width: r, height: r, patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ o("path", { d: `M ${r} 0 L 0 0 0 ${r}`, fill: "none", stroke: "var(--j-accent)", strokeWidth: ".5" }) }) }),
              /* @__PURE__ */ o("rect", { width: "100%", height: "100%", fill: "url(#hud-grid)" })
            ]
          }
        ),
        e.map((p) => {
          const S = d[p.id] ?? { x: p.x, y: p.y }, M = yc[p.color ?? "cyan"] ?? "var(--j-accent)", C = u[p.id], P = v.indexOf(p.id);
          return /* @__PURE__ */ g(
            "div",
            {
              style: {
                position: "absolute",
                left: S.x,
                top: S.y,
                width: p.width ?? 260,
                zIndex: P + 1,
                background: "var(--j-bg-card)",
                border: `1px solid ${M}`,
                boxShadow: m === p.id ? `0 0 20px ${M}44` : `0 0 8px ${M}18`,
                transition: m === p.id ? "none" : "box-shadow .2s",
                clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)"
              },
              children: [
                /* @__PURE__ */ g(
                  "div",
                  {
                    onPointerDown: (F) => x(p.id, F),
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "4px 10px",
                      background: `${M}18`,
                      borderBottom: C ? "none" : `1px solid ${M}44`,
                      cursor: m === p.id ? "grabbing" : "grab",
                      userSelect: "none"
                    },
                    children: [
                      /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                        /* @__PURE__ */ o("svg", { width: 7, height: 7, children: /* @__PURE__ */ o("rect", { width: 7, height: 7, fill: M, opacity: 0.8, transform: "rotate(45 3.5 3.5)" }) }),
                        /* @__PURE__ */ o("span", { style: { fontSize: 8, color: M, letterSpacing: ".18em" }, children: p.title ?? p.id.toUpperCase() })
                      ] }),
                      /* @__PURE__ */ o(
                        "button",
                        {
                          onPointerDown: (F) => F.stopPropagation(),
                          onClick: () => f((F) => ({ ...F, [p.id]: !F[p.id] })),
                          style: { background: "none", border: "none", cursor: "pointer", color: M, fontSize: 9, padding: "0 2px" },
                          children: C ? "▸" : "▾"
                        }
                      )
                    ]
                  }
                ),
                !C && /* @__PURE__ */ o("div", { style: { padding: "8px 10px" }, children: p.content })
              ]
            },
            p.id
          );
        })
      ]
    }
  );
}
function vc(e) {
  switch (e.type) {
    case "hub":
      return 88;
    case "diamond":
      return 80;
    case "hex":
      return 82;
    default:
      return 144;
  }
}
function bc(e) {
  switch (e.type) {
    case "hub":
      return 88;
    case "diamond":
      return 80;
    case "hex":
      return 82;
    default:
      return e.sub ? 48 : 36;
  }
}
function Mr(e) {
  return e === "amber" ? "var(--j-warn)" : e === "red" ? "var(--j-err)" : e === "green" ? "var(--j-ok)" : "var(--j-accent)";
}
function xc(e) {
  return Mr(e);
}
function jc(e) {
  return e === "amber" ? "aw" : e === "red" ? "ae" : e === "green" ? "ag" : "a";
}
function ie(e) {
  return e.toFixed(2);
}
function xl({
  nodes: e,
  edges: t,
  width: n = "100%",
  height: r = "420px",
  title: a,
  showLegend: i = !0
}) {
  const c = `ng${Fn().replace(/:/g, "")}`, [l, d] = W({}), [h, u] = W(null), f = U(null);
  K(() => {
    d((y) => {
      const j = { ...y };
      return e.forEach((x) => {
        j[x.id] || (j[x.id] = { x: x.x, y: x.y, w: vc(x), h: bc(x) });
      }), Object.keys(j).forEach((x) => {
        e.some((N) => N.id === x) || delete j[x];
      }), j;
    });
  }, [e]);
  function m(y, j) {
    y.stopPropagation();
    const x = l[j];
    x && (u(j), f.current = { id: j, offX: y.clientX - x.x, offY: y.clientY - x.y });
  }
  function b(y) {
    const j = f.current;
    if (!j) return;
    const { id: x, offX: N, offY: k } = j;
    d((p) => {
      const S = p[x];
      if (!S) return p;
      const M = Math.max(0, y.clientX - N), C = Math.max(0, y.clientY - k);
      return S.x === M && S.y === C ? p : { ...p, [x]: { ...S, x: M, y: C } };
    });
  }
  function v() {
    u(null), f.current = null;
  }
  function w(y, j, x, N) {
    const k = e.find((P) => P.id === x), p = k == null ? void 0 : k.type;
    if (p === "hub" || p === "diamond" || p === "hex")
      return [y.x + y.w / 2, y.y + y.h / 2];
    const S = y.y + y.h / 2, M = j.x + j.w / 2, C = y.x + y.w / 2;
    return N ? M >= C ? [y.x + y.w, S] : [y.x, S] : M < C ? [y.x + y.w, S] : [y.x, S];
  }
  return /* @__PURE__ */ g(
    "div",
    {
      "data-node-graph": "",
      style: {
        position: "relative",
        width: n,
        height: r,
        background: "var(--j-bg-card)",
        overflow: "hidden",
        border: "1px solid var(--j-accent-18)",
        fontFamily: "'Courier New', monospace"
      },
      onMouseMove: b,
      onMouseUp: v,
      onMouseLeave: v,
      children: [
        /* @__PURE__ */ g("svg", { style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }, children: [
          /* @__PURE__ */ o("defs", { children: /* @__PURE__ */ o("pattern", { id: `${c}-grid`, width: "32", height: "32", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ o("circle", { cx: "0", cy: "0", r: "0.8", fill: "var(--j-accent-18)" }) }) }),
          /* @__PURE__ */ o("rect", { width: "100%", height: "100%", fill: `url(#${c}-grid)` })
        ] }),
        /* @__PURE__ */ g("svg", { style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1, overflow: "visible" }, children: [
          /* @__PURE__ */ g("defs", { children: [
            /* @__PURE__ */ o("marker", { id: `${c}-a`, markerWidth: "7", markerHeight: "7", refX: "5", refY: "3.5", orient: "auto", children: /* @__PURE__ */ o("polygon", { points: "0 0, 7 3.5, 0 7", fill: "var(--j-accent-50)" }) }),
            /* @__PURE__ */ o("marker", { id: `${c}-aw`, markerWidth: "7", markerHeight: "7", refX: "5", refY: "3.5", orient: "auto", children: /* @__PURE__ */ o("polygon", { points: "0 0, 7 3.5, 0 7", fill: "var(--j-warn)" }) }),
            /* @__PURE__ */ o("marker", { id: `${c}-ae`, markerWidth: "7", markerHeight: "7", refX: "5", refY: "3.5", orient: "auto", children: /* @__PURE__ */ o("polygon", { points: "0 0, 7 3.5, 0 7", fill: "var(--j-err)" }) }),
            /* @__PURE__ */ o("marker", { id: `${c}-ag`, markerWidth: "7", markerHeight: "7", refX: "5", refY: "3.5", orient: "auto", children: /* @__PURE__ */ o("polygon", { points: "0 0, 7 3.5, 0 7", fill: "var(--j-ok)" }) })
          ] }),
          t.map((y) => {
            const j = l[y.from], x = l[y.to];
            if (!j || !x) return null;
            const [N, k] = w(j, x, y.from, !0), [p, S] = w(x, j, y.to, !1), M = N + (p - N) * 0.5, C = k, P = p - (p - N) * 0.5, F = S, X = `M ${ie(N)} ${ie(k)} C ${ie(M)} ${ie(C)} ${ie(P)} ${ie(F)} ${ie(p)} ${ie(S)}`, G = xc(y.color), L = `ep-${c}-${y.from}-${y.to}`, ye = y.arrow ?? !0 ? `url(#${c}-${jc(y.color)})` : "none", be = y.style === "dashed" ? "6,4" : y.style === "dotted" ? "2,4" : void 0;
            return /* @__PURE__ */ g("g", { "data-edge": `${y.from}-${y.to}`, children: [
              /* @__PURE__ */ o("path", { d: X, fill: "none", stroke: G, strokeWidth: 5, strokeOpacity: 0.1 }),
              /* @__PURE__ */ o(
                "path",
                {
                  id: L,
                  d: X,
                  fill: "none",
                  stroke: G,
                  strokeWidth: 1.5,
                  strokeDasharray: be,
                  markerEnd: ye
                }
              ),
              (y.animated ?? !0) && /* @__PURE__ */ o(
                "circle",
                {
                  r: "3",
                  fill: G,
                  opacity: 0.9,
                  style: { filter: `drop-shadow(0 0 3px ${G})` },
                  children: /* @__PURE__ */ o("animateMotion", { dur: `${y.animDur ?? 2}s`, repeatCount: "indefinite", children: /* @__PURE__ */ o("mpath", { href: `#${L}` }) })
                }
              ),
              y.label && /* @__PURE__ */ o(
                "text",
                {
                  x: ie((N + p) / 2),
                  y: ie((k + S) / 2 - 10),
                  textAnchor: "middle",
                  fontFamily: "'Courier New',monospace",
                  fontSize: "8",
                  fill: G,
                  letterSpacing: "1",
                  opacity: "0.85",
                  children: y.label
                }
              )
            ] }, L);
          })
        ] }),
        e.map((y) => {
          const j = l[y.id];
          if (!j) return null;
          const x = Mr(y.color), N = h === y.id, k = y.type ?? "chip";
          return /* @__PURE__ */ g(
            "div",
            {
              "data-node-id": y.id,
              "data-node-type": k,
              "data-selected": N ? "true" : "false",
              style: {
                position: "absolute",
                left: j.x,
                top: j.y,
                width: j.w,
                height: j.h,
                zIndex: N ? 20 : 3,
                cursor: "grab",
                touchAction: "none",
                userSelect: "none"
              },
              onMouseDown: (p) => m(p, y.id),
              children: [
                k === "hub" && /* @__PURE__ */ g("div", { style: {
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "var(--j-bg-card)",
                  border: `2px solid ${x}`,
                  boxShadow: `0 0 18px ${x}, inset 0 0 16px var(--j-accent-05)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  filter: N ? "brightness(1.35)" : "none"
                }, children: [
                  /* @__PURE__ */ o("div", { style: {
                    position: "absolute",
                    inset: 5,
                    borderRadius: "50%",
                    border: `1px solid ${x}`,
                    opacity: 0.25,
                    animation: "j-spin 5s linear infinite"
                  } }),
                  /* @__PURE__ */ o("div", { style: { fontSize: 12, fontWeight: 700, color: x, letterSpacing: ".05em", textShadow: `0 0 8px ${x}`, zIndex: 1 }, children: y.label }),
                  y.sub && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".10em", zIndex: 1 }, children: y.sub })
                ] }),
                k === "diamond" && /* @__PURE__ */ g("div", { style: { width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }, children: [
                  /* @__PURE__ */ o("div", { style: {
                    position: "absolute",
                    inset: 0,
                    clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
                    background: "var(--j-bg-card)",
                    border: `2px solid ${x}`,
                    boxShadow: `0 0 12px ${x}`,
                    filter: N ? "brightness(1.3)" : "none"
                  } }),
                  /* @__PURE__ */ g("div", { style: { position: "relative", zIndex: 1, textAlign: "center" }, children: [
                    /* @__PURE__ */ o("div", { style: { fontSize: 8, fontWeight: 700, color: x, letterSpacing: ".12em", textTransform: "uppercase" }, children: y.label }),
                    y.sub && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)" }, children: y.sub })
                  ] })
                ] }),
                k === "hex" && /* @__PURE__ */ g("div", { style: { width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }, children: [
                  /* @__PURE__ */ o("div", { style: {
                    position: "absolute",
                    inset: 0,
                    clipPath: "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)",
                    background: "var(--j-bg-card)",
                    border: `2px solid ${x}`,
                    boxShadow: `0 0 12px ${x}`,
                    filter: N ? "brightness(1.3)" : "none"
                  } }),
                  /* @__PURE__ */ g("div", { style: { position: "relative", zIndex: 1, textAlign: "center" }, children: [
                    /* @__PURE__ */ o("div", { style: { fontSize: 8, fontWeight: 700, color: x, letterSpacing: ".12em" }, children: y.label }),
                    y.sub && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)" }, children: y.sub })
                  ] })
                ] }),
                k === "chip" && /* @__PURE__ */ g("div", { style: {
                  width: "100%",
                  height: "100%",
                  clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                  background: "var(--j-bg-card)",
                  border: `1px solid ${x}`,
                  borderLeft: `3px solid ${x}`,
                  boxShadow: N ? `0 0 16px ${x}` : "0 0 5px var(--j-accent-12)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 12px",
                  position: "relative",
                  overflow: "hidden",
                  filter: N ? "brightness(1.2)" : "none"
                }, children: [
                  /* @__PURE__ */ o("div", { style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: `linear-gradient(90deg,transparent,${x},transparent)`,
                    animation: "j-scan-v 3s ease-in-out infinite"
                  } }),
                  /* @__PURE__ */ o("div", { style: {
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: x,
                    boxShadow: `0 0 5px ${x}`,
                    animation: y.pulse ? "j-pulse 1.4s ease-in-out infinite" : "none"
                  } }),
                  /* @__PURE__ */ g("div", { style: { flex: 1, minWidth: 0 }, children: [
                    /* @__PURE__ */ o("div", { style: {
                      fontSize: 9,
                      fontWeight: 700,
                      color: x,
                      letterSpacing: ".13em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }, children: y.label }),
                    y.sub && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".07em" }, children: y.sub })
                  ] }),
                  y.value && /* @__PURE__ */ o("div", { style: {
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--j-text-primary)",
                    flexShrink: 0,
                    paddingLeft: 8,
                    borderLeft: `1px solid ${x}`
                  }, children: y.value })
                ] })
              ]
            },
            y.id
          );
        }),
        a && /* @__PURE__ */ g(
          "div",
          {
            "data-graph-title": "",
            style: {
              position: "absolute",
              top: 8,
              left: 12,
              zIndex: 30,
              fontSize: 8,
              color: "var(--j-accent)",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 6,
              pointerEvents: "none"
            },
            children: [
              /* @__PURE__ */ o("div", { style: {
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--j-accent)",
                animation: "j-pulse 1.6s ease-in-out infinite"
              } }),
              a
            ]
          }
        ),
        i && /* @__PURE__ */ o("div", { style: { position: "absolute", bottom: 8, right: 10, zIndex: 30, pointerEvents: "none", display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }, children: /* @__PURE__ */ o(
          "div",
          {
            "data-legend": "",
            style: { fontSize: 7, color: "var(--j-accent-50)", letterSpacing: ".11em" },
            children: "DRAG NODES · CONNECTIONS FOLLOW"
          }
        ) })
      ]
    }
  );
}
export {
  Kc as JAccordion,
  yl as JActivityFeed,
  Gc as JAlert,
  Zc as JArcMeter,
  ml as JArcReactor,
  mr as JBadge,
  rl as JBarChart,
  cl as JBootScreen,
  Wc as JButton,
  ka as JCard,
  Ec as JCheckbox,
  dl as JCommandPalette,
  Ps as JDataRow,
  Bc as JDatePicker,
  zc as JDateRangePicker,
  Hc as JDivider,
  ol as JDonutChart,
  hl as JDragWidget,
  Yc as JFormField,
  il as JGaugeChart,
  gl as JHeatmap,
  He as JHudBar,
  bl as JHudCanvas,
  pl as JHudClock,
  Cc as JHudFrame,
  $c as JHudFrameCard,
  Jc as JHudLabel,
  Tc as JInput,
  vl as JKPITicker,
  al as JLineChart,
  qc as JModal,
  Dc as JNavItem,
  xl as JNodeGraph,
  tl as JOrb,
  Oc as JPageLayout,
  Qc as JPagination,
  Os as JProgress,
  sl as JRadarChart,
  fl as JRadialItem,
  ul as JRadialMenu,
  Fc as JRadio,
  Ic as JSelect,
  ha as JSidebar,
  _c as JSlider,
  nl as JSparkline,
  It as JSpinner,
  Xc as JStatCard,
  Ns as JStatusPill,
  Bs as JTab,
  ll as JTable,
  Uc as JTabs,
  Pc as JTextArea,
  Mc as JThemePicker,
  Nc as JThemeProvider,
  Rc as JTimePicker,
  Vc as JToastProvider,
  Ac as JToggle,
  el as JWaveform,
  H as JarvisTokens,
  Ct as PRESETS,
  Nr as RadialMenuContext,
  oa as toCss,
  cc as useRadialMenu,
  ca as useTheme,
  Lc as useToast
};
