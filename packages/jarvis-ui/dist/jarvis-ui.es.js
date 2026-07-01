import { jsx as o, jsxs as g, Fragment as B } from "react/jsx-runtime";
import W, { useState as $, useEffect as U, useContext as xe, createContext as we, useCallback as E, useRef as L, useLayoutEffect as ma, useMemo as qe, Children as ga, isValidElement as ya, useId as Jn } from "react";
import { createPortal as Gn } from "react-dom";
function Fe(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
  const n = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), a = parseInt(t.slice(4, 6), 16);
  return `${n},${r},${a}`;
}
function va(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
  const n = Math.max(0, parseInt(t.slice(0, 2), 16) - 4), r = Math.max(0, parseInt(t.slice(2, 4), 16) - 2), a = Math.max(0, parseInt(t.slice(4, 6), 16) - 2);
  return `#${n.toString(16).padStart(2, "0")}${r.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`;
}
function ba(e) {
  const t = Fe(e.accent), n = Fe(e.warn), r = Fe(e.err), a = Fe(e.ok), i = Fe(e.bg);
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
  --j-bg-danger:    ${va(e.bg)};
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
const Oe = {
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
}, _t = {
  cyan: { name: "Cyan", preset: "cyan", ...Oe },
  amber: {
    name: "Amber",
    preset: "amber",
    ...Oe,
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
    ...Oe,
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
    ...Oe,
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
    ...Oe,
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
    ...Oe,
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
}, xa = {
  CornerBracket: "j-card-s1",
  Notched: "j-card-s2",
  SideRail: "j-card-s3",
  GlowBorder: "j-card-s4",
  PartialBorder: "j-card-s5",
  DangerPulse: "j-card-s6",
  Hexagonal: "j-card-s7",
  Radar: "j-card-s8",
  DoubleFrame: "j-card-s9"
}, ja = {
  LeftNotch: "j-btn-left-notch",
  RightNotch: "j-btn-right-notch",
  BothNotch: "j-btn-both-notch",
  Parallelogram: "j-btn-parallelogram",
  GhostSkew: "j-btn-ghost-skew",
  BracketFrame: "j-btn-bracket",
  Hexagonal: "j-btn-hex",
  IconSquare: "j-btn-icon-sq",
  ScanFull: "j-btn-scan-full"
}, q = {
  color: (e) => e ? `j-color-${e}` : "",
  size: (e) => e ? `j-size-${e}` : "",
  variant: (e) => e ? `j-variant-${e}` : "",
  state: (e) => e ? `j-state-${e}` : "",
  animSpeed: (e) => e ? `j-anim-${e}` : "",
  cardStyle: (e) => e ? xa[e] : "",
  buttonShape: (e) => e ? ja[e] : "",
  cls: (...e) => e.filter(Boolean).join(" ")
}, Ln = we(null);
function ol({ children: e, preset: t = "cyan", theme: n }) {
  const [r, a] = $(n ?? _t[t]);
  U(() => {
    let c = document.getElementById("jarvis-theme-vars");
    c || (c = document.createElement("style"), c.id = "jarvis-theme-vars", document.head.appendChild(c)), c.textContent = ba(r);
  }, [r]);
  const i = (c) => a(c), s = (c) => a(_t[c]);
  return /* @__PURE__ */ o(Ln.Provider, { value: { theme: r, setTheme: i, setPreset: s }, children: e });
}
function wa() {
  const e = xe(Ln);
  if (!e) throw new Error("useTheme must be used inside JThemeProvider");
  return e;
}
const ka = [
  { preset: "cyan", color: "var(--j-accent)", label: "Cyan" },
  { preset: "amber", color: "var(--j-warn)", label: "Amber" },
  { preset: "green", color: "var(--j-ok)", label: "Green" },
  { preset: "red", color: "var(--j-err)", label: "Red" },
  { preset: "purple", color: _t.purple.accent, label: "Purple" },
  { preset: "white", color: "var(--j-accent-deep)", label: "White" }
];
function il({ compact: e = !1, showCustom: t = !0 }) {
  const { theme: n, setPreset: r, setTheme: a } = wa(), [i, s] = $(!1), [c, l] = $(n.accent), [d, h] = $(n.bg), [u, f] = $(n.bgCard);
  function p(y, w) {
    const v = e ? "20px" : "48px", b = e ? "4px" : "6px";
    return {
      width: v,
      height: e ? "20px" : "32px",
      background: y,
      border: `2px solid ${w ? "var(--j-text-primary)" : "transparent"}`,
      boxShadow: w ? `0 0 12px ${y}` : "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      clipPath: `polygon(${b} 0,100% 0,calc(100% - ${b}) 100%,0 100%)`,
      transition: "all .15s"
    };
  }
  function x() {
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
    /* @__PURE__ */ o("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" }, children: ka.map(({ preset: y, color: w, label: v }) => {
      const b = !i && n.preset === y;
      return /* @__PURE__ */ o(
        "button",
        {
          title: v,
          "aria-pressed": b,
          onClick: () => {
            s(!1), r(y);
          },
          style: p(w, b),
          children: !e && /* @__PURE__ */ o("span", { style: {
            fontSize: "9px",
            fontFamily: "'Courier New', monospace",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: b ? "var(--j-bg)" : w,
            marginTop: "2px"
          }, children: v })
        },
        y
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
            onChange: (y) => l(y.target.value),
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
              onChange: (y) => h(y.target.value),
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
              onChange: (y) => f(y.target.value),
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
          onClick: x,
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
const Sa = [
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
], tn = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10], Na = Array.from({ length: 20 }, (e, t) => ({
  h: 8 + (t * 7 + 3) % 11,
  dur: `${0.8 + t * 13 % 10 / 10}s`,
  dly: `${t * 7 % 10 / 10}s`
}));
function Xe({
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
  return /* @__PURE__ */ g("div", { className: q.cls(
    e === "top" ? "j-hud-bar-top" : "j-hud-bar-bot",
    q.color(t),
    q.animSpeed(n)
  ), children: [
    r && /* @__PURE__ */ o("span", { className: "j-text-xs", children: r }),
    a && /* @__PURE__ */ o("div", { className: "j-dot-seq", children: Sa.map((f, p) => /* @__PURE__ */ o(
      "div",
      {
        className: q.cls("j-d", f === "sq" && "sq", f === "tall" && "tall"),
        style: { animationDelay: `${(p * 0.08).toFixed(2)}s` }
      },
      p
    )) }),
    /* @__PURE__ */ o("div", { style: { flex: 1, height: 1, background: "linear-gradient(90deg,var(--j-accent-25),transparent)" } }),
    s && /* @__PURE__ */ g(B, { children: [
      /* @__PURE__ */ o("div", { className: "j-tick-row", children: Array.from({ length: d }, (f, p) => /* @__PURE__ */ o(
        "div",
        {
          className: q.cls("j-tk", p >= h && "off"),
          style: { height: tn[p % tn.length] }
        },
        p
      )) }),
      /* @__PURE__ */ o("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", flexShrink: 0 } })
    ] }),
    i && /* @__PURE__ */ g(B, { children: [
      /* @__PURE__ */ o("div", { className: "j-waveform", style: { flex: 1, maxWidth: 260 }, children: Na.map((f, p) => /* @__PURE__ */ o(
        "div",
        {
          className: "j-wv",
          style: { height: f.h, "--j-wv-dur": f.dur, "--j-wv-dly": f.dly }
        },
        p
      )) }),
      /* @__PURE__ */ o("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", flexShrink: 0 } })
    ] }),
    u,
    c && /* @__PURE__ */ o("span", { className: "j-text-xs j-blink", children: "● LIVE" }),
    l && /* @__PURE__ */ o("span", { className: "j-text-xs j-blink", style: { color: "var(--j-err)" }, children: "● REC" })
  ] });
}
function At({ size: e = "64px", color: t = "cyan", label: n, showLabel: r = !0 }) {
  const a = parseFloat(e);
  return /* @__PURE__ */ g("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: q.color(t),
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
const Ma = {
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
function sl({ href: e, icon: t, label: n, badge: r, active: a = !1, onClick: i }) {
  const s = {
    ...Ma,
    padding: a ? "10px 14px 10px 16px" : "10px 14px",
    background: a ? "var(--j-accent-08)" : "transparent",
    color: a ? "var(--j-accent)" : "var(--j-text-muted)",
    borderLeft: `2px solid ${a ? "var(--j-accent)" : "transparent"}`,
    boxShadow: a ? "-2px 0 12px var(--j-accent-12)" : "none"
  }, c = /* @__PURE__ */ g(B, { children: [
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
function nn() {
  const e = /* @__PURE__ */ new Date();
  return `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`;
}
function Da({
  systemName: e = "JARVIS",
  version: t = "v4.2.1",
  navLabel: n = "Navigation",
  width: r = "220px",
  color: a = "cyan",
  children: i,
  footer: s
}) {
  const [c, l] = $(nn);
  return U(() => {
    const d = setInterval(() => l(nn()), 1e4);
    return () => clearInterval(d);
  }, []), /* @__PURE__ */ g(
    "aside",
    {
      className: q.cls("j-sidebar", q.color(a)),
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
          /* @__PURE__ */ o(At, { size: "36px", color: a }),
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
function cl({
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
  topBar: p,
  bottomBar: x,
  children: y
}) {
  return /* @__PURE__ */ g("div", { className: "j-root", children: [
    /* @__PURE__ */ o(
      Xe,
      {
        position: "top",
        color: n,
        systemLabel: e,
        showDots: !0,
        showTicks: s,
        showWaveform: c,
        showLive: l,
        showRec: d,
        children: p
      }
    ),
    /* @__PURE__ */ g("div", { className: "j-shell", children: [
      r && /* @__PURE__ */ o(
        Da,
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
        /* @__PURE__ */ o("div", { className: "j-scroll", style: { padding: h, position: "relative", zIndex: 1 }, children: y })
      ] })
    ] }),
    /* @__PURE__ */ o(
      Xe,
      {
        position: "bottom",
        color: n,
        showDots: !1,
        showWaveform: c,
        showTicks: s,
        children: x
      }
    )
  ] });
}
function ll({
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
      Xe,
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
    r && /* @__PURE__ */ o(Xe, { position: "bottom", color: e, showDots: !1, showWaveform: s, children: f })
  ] });
}
function Ca() {
  return /* @__PURE__ */ g(B, { children: [
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
function Oa() {
  return /* @__PURE__ */ g(B, { children: [
    /* @__PURE__ */ o("div", { className: "j-hfc-beta-rail-t" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-beta-rail-b" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-beta-notch-tl" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-beta-notch-br" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-beta-pip-l" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-beta-pip-r" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-scan-h" })
  ] });
}
function Wa() {
  return /* @__PURE__ */ g(B, { children: [
    ["tl1", "tl2", "tr1", "tr2", "bl1", "bl2", "br1", "br2"].map((e) => /* @__PURE__ */ o("div", { className: `j-hfc-g-seg-${e}` }, e)),
    /* @__PURE__ */ o("div", { className: "j-hfc-g-center-ring" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-scan-v" })
  ] });
}
function $a() {
  return /* @__PURE__ */ g(B, { children: [
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
const Ta = {
  Alpha: "j-hfc-alpha",
  Beta: "j-hfc-beta",
  Gamma: "j-hfc-gamma",
  Delta: "j-hfc-delta"
};
function dl({
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
      className: q.cls("j-hfc", Ta[e], q.color(t)),
      style: { width: i, height: s },
      children: [
        e === "Alpha" && /* @__PURE__ */ o(Ca, {}),
        e === "Beta" && /* @__PURE__ */ o(Oa, {}),
        e === "Gamma" && /* @__PURE__ */ o(Wa, {}),
        e === "Delta" && /* @__PURE__ */ o($a, {}),
        e === "Alpha" && /* @__PURE__ */ g(B, { children: [
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
const _a = /* @__PURE__ */ new Set(["LeftNotch", "RightNotch", "BothNotch"]), Ia = /* @__PURE__ */ new Set(["Parallelogram", "GhostSkew", "BracketFrame", "Hexagonal", "IconSquare", "ScanFull"]), Pa = {
  LeftNotch: "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)",
  RightNotch: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)",
  BothNotch: "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))"
};
function ul({
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
  const u = q.buttonShape(e), f = _a.has(e), p = Ia.has(e), x = f ? {
    clipPath: Pa[e],
    border: "1px solid var(--j-accent)"
  } : {};
  return /* @__PURE__ */ g(
    "button",
    {
      type: l,
      disabled: i || a,
      onClick: d,
      className: q.cls("j-btn", u, q.color(t), q.size(n), r ? q.variant(r) : ""),
      style: x,
      "aria-busy": a || void 0,
      children: [
        f && /* @__PURE__ */ o("div", { style: { position: "absolute", inset: 0, background: "var(--j-accent-dim)" } }),
        p && /* @__PURE__ */ o("div", { className: "j-btn-bg-fill" }),
        e === "Parallelogram" && /* @__PURE__ */ o("div", { className: "j-btn-rail" }),
        e === "BracketFrame" && /* @__PURE__ */ g(B, { children: [
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
function Ea({ cardStyle: e }) {
  switch (e) {
    case "CornerBracket":
      return /* @__PURE__ */ g(B, { children: [
        /* @__PURE__ */ o("div", { className: "j-c-tl" }),
        /* @__PURE__ */ o("div", { className: "j-c-tr" }),
        /* @__PURE__ */ o("div", { className: "j-c-bl" }),
        /* @__PURE__ */ o("div", { className: "j-c-br" }),
        /* @__PURE__ */ o("div", { className: "j-inner-border" })
      ] });
    case "Notched":
      return /* @__PURE__ */ g(B, { children: [
        /* @__PURE__ */ o("div", { className: "j-notch-border" }),
        /* @__PURE__ */ o("div", { className: "j-tri-tl" }),
        /* @__PURE__ */ o("div", { className: "j-tri-br" })
      ] });
    case "SideRail":
      return /* @__PURE__ */ g(B, { children: [
        /* @__PURE__ */ o("div", { className: "j-rail" }),
        /* @__PURE__ */ o("div", { className: "j-tab-top" }),
        /* @__PURE__ */ o("div", { className: "j-tab-bot" })
      ] });
    case "GlowBorder":
      return /* @__PURE__ */ o("div", { className: "j-inner-radial" });
    case "PartialBorder":
      return /* @__PURE__ */ g(B, { children: [
        /* @__PURE__ */ o("div", { className: "j-pb-tl" }),
        /* @__PURE__ */ o("div", { className: "j-pb-br" }),
        /* @__PURE__ */ o("div", { className: "j-pb-roving-dot" })
      ] });
    case "DangerPulse":
      return /* @__PURE__ */ o("div", { className: "j-tri-tl" });
    case "Hexagonal":
      return /* @__PURE__ */ o("div", { className: "j-hex-ring" });
    case "Radar":
      return /* @__PURE__ */ g(B, { children: [
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
const rn = {
  paddingBottom: 10,
  marginBottom: 10,
  borderBottom: "1px solid var(--j-border-dim)",
  position: "relative",
  zIndex: 1
}, an = {
  paddingTop: 10,
  marginTop: 10,
  borderTop: "1px solid var(--j-border-dim)",
  position: "relative",
  zIndex: 1
};
function Fa({
  cardStyle: e = "CornerBracket",
  color: t = "cyan",
  header: n,
  footer: r,
  padding: a = "14px 16px",
  children: i
}) {
  const s = q.cls("j-card", q.cardStyle(e), q.color(t));
  return e === "DoubleFrame" ? /* @__PURE__ */ g("div", { className: s, children: [
    /* @__PURE__ */ o("div", { className: "j-df-corner" }),
    /* @__PURE__ */ g("div", { className: "j-inner-frame", children: [
      n && /* @__PURE__ */ o("div", { style: rn, children: n }),
      i,
      r && /* @__PURE__ */ o("div", { style: an, children: r })
    ] })
  ] }) : /* @__PURE__ */ g("div", { className: s, style: { padding: a }, children: [
    /* @__PURE__ */ o(Ea, { cardStyle: e }),
    n && /* @__PURE__ */ o("div", { style: rn, children: n }),
    /* @__PURE__ */ o("div", { style: { position: "relative", zIndex: 1 }, children: i }),
    r && /* @__PURE__ */ o("div", { style: an, children: r })
  ] });
}
const Aa = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }, Ya = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function fl({
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
    height: Aa[l] ?? 38,
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${c ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: c ? "var(--j-err)" : "var(--j-border)",
    color: c ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: Ya[l] ?? 12,
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
const za = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function hl({
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
    fontSize: za[d] ?? 12,
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
const Ba = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }, Ra = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function pl({
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
    height: Ba[c] ?? 38,
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${s ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: s ? "var(--j-err)" : "var(--j-border)",
    color: s ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: Ra[c] ?? 12,
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
function ml({
  checked: e,
  defaultChecked: t = !1,
  onChange: n,
  label: r,
  disabled: a = !1
}) {
  const [i, s] = $(t), c = e !== void 0 ? e : i;
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
function gl({ checked: e, onChange: t, label: n, value: r, name: a, disabled: i = !1 }) {
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
function yl({
  checked: e,
  defaultChecked: t = !1,
  onChange: n,
  label: r,
  disabled: a = !1
}) {
  const [i, s] = $(t), c = e !== void 0 ? e : i;
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
function vl({
  value: e,
  defaultValue: t,
  onChange: n,
  min: r = 0,
  max: a = 100,
  step: i = 1,
  disabled: s = !1,
  showValue: c = !0
}) {
  const [l, d] = $(t ?? r), h = e !== void 0 ? e : l, u = a > r ? (h - r) / (a - r) * 100 : 0;
  function f(p) {
    const x = Number(p.target.value);
    e === void 0 && d(x), n == null || n(x);
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
function bl({ label: e, error: t, hint: n, required: r, children: a }) {
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
function Ha(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const St = {}, Re = {};
function ye(e, t) {
  try {
    const r = (St[e] || (St[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in Re ? Re[r] : on(r, r.split(":"));
  } catch {
    if (e in Re) return Re[e];
    const n = e == null ? void 0 : e.match(Ja);
    return n ? on(e, n.slice(1)) : NaN;
  }
}
const Ja = /([+-]\d\d):?(\d\d)?/;
function on(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), a = +(t[2] || 0) / 60;
  return Re[e] = n * 60 + r > 0 ? n * 60 + r + a : n * 60 - r - a;
}
class fe extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(ye(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), qn(this, t)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new fe(...n, t) : new fe(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new fe(+this, t);
  }
  getTimezoneOffset() {
    const t = -ye(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), mt(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new fe(+new Date(t), this.timeZone);
  }
  //#endregion
}
const sn = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!sn.test(e)) return;
  const t = e.replace(sn, "$1UTC");
  fe.prototype[t] && (e.startsWith("get") ? fe.prototype[e] = function() {
    return this.internal[t]();
  } : (fe.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Ga(this), +this;
  }, fe.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), mt(this), +this;
  }));
});
function mt(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - // Round after converting minutes to seconds to avoid fractional offset
  // precision errors from historical offsets.
  Math.round(-ye(e.timeZone, e) * 60));
}
function Ga(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), qn(e);
}
function qn(e, t) {
  const n = Array.isArray(t) ? La(t) : +e.internal, r = ye(e.timeZone, e), a = r > 0 ? Math.floor(r) : Math.ceil(r), i = /* @__PURE__ */ new Date(+e);
  i.setUTCHours(i.getUTCHours() - 1);
  const s = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), c = -(/* @__PURE__ */ new Date(+i)).getTimezoneOffset(), l = s - c;
  let d = s;
  if (l && s !== a) {
    const C = Date.prototype.getHours.apply(e), D = Array.isArray(t) ? t[3] || 0 : e.internal.getUTCHours();
    if (C !== D) {
      const T = /* @__PURE__ */ new Date(+e), X = s - a;
      X && T.setUTCMinutes(T.getUTCMinutes() + X);
      const H = ye(e.timeZone, T);
      (H > 0 ? Math.floor(H) : Math.ceil(H)) === a && (d = c);
    }
  }
  const h = d - a;
  h && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const f = s > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, p = Math.round(-(ye(e.timeZone, e) * 60)) % 60;
  (p || f) && Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + p + f);
  const x = ye(e.timeZone, e), y = x > 0 ? Math.floor(x) : Math.ceil(x), v = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - y, b = y !== a, j = v - h, M = y - a, S = n - y * 60 * 1e3, m = M > 0 && cn(e) - n === M * 60 * 1e3 && cn(e, S) !== n;
  if (b && j && !m) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + j);
    const C = ye(e.timeZone, e), D = C > 0 ? Math.floor(C) : Math.ceil(C), T = y - D;
    T && j < 0 && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + T);
  }
  mt(e);
  const N = (t ? n : n + p * 1e3) - +e.internal;
  N && Math.abs(N) < 30 * 60 * 1e3 && (Date.prototype.setTime.call(e, +e + N), mt(e));
}
function La(e) {
  return Date.UTC(e[0], e.length > 1 ? e[1] : 0, e.length > 2 ? e[2] : 1, ...e.slice(3));
}
function cn(e, t) {
  const n = new Date(t ?? +e);
  return n.setUTCSeconds(n.getUTCSeconds() - Math.round(-ye(e.timeZone, n) * 60)), +n;
}
class Q extends fe {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Q(...n, t) : new Q(Date.now(), t);
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
    return `${t} GMT${n}${r}${a} (${Ha(this.timeZone, this)})`;
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
    return new Q(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Q(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Xn = 6048e5, qa = 864e5, ln = Symbol.for("constructDateFrom");
function V(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && ln in e ? e[ln](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function z(e, t) {
  return V(t || e, e);
}
function Vn(e, t, n) {
  const r = z(e, n == null ? void 0 : n.in);
  return isNaN(t) ? V(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Un(e, t, n) {
  const r = z(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return V(e, NaN);
  if (!t)
    return r;
  const a = r.getDate(), i = V(e, r.getTime());
  i.setMonth(r.getMonth() + t + 1, 0);
  const s = i.getDate();
  return a >= s ? i : (r.setFullYear(
    i.getFullYear(),
    i.getMonth(),
    a
  ), r);
}
let Xa = {};
function Ke() {
  return Xa;
}
function Ie(e, t) {
  var c, l, d, h;
  const n = Ke(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((h = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : h.weekStartsOn) ?? 0, a = z(e, t == null ? void 0 : t.in), i = a.getDay(), s = (i < r ? 7 : 0) + i - r;
  return a.setDate(a.getDate() - s), a.setHours(0, 0, 0, 0), a;
}
function Ve(e, t) {
  return Ie(e, { ...t, weekStartsOn: 1 });
}
function Kn(e, t) {
  const n = z(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = V(n, 0);
  a.setFullYear(r + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const i = Ve(a), s = V(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const c = Ve(s);
  return n.getTime() >= i.getTime() ? r + 1 : n.getTime() >= c.getTime() ? r : r - 1;
}
function dn(e) {
  const t = z(e), n = new Date(
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
function Pe(e, ...t) {
  const n = V.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Ue(e, t) {
  const n = z(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Yt(e, t, n) {
  const [r, a] = Pe(
    n == null ? void 0 : n.in,
    e,
    t
  ), i = Ue(r), s = Ue(a), c = +i - dn(i), l = +s - dn(s);
  return Math.round((c - l) / qa);
}
function Va(e, t) {
  const n = Kn(e, t), r = V(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Ve(r);
}
function Ua(e, t, n) {
  return Vn(e, t * 7, n);
}
function Ka(e, t, n) {
  return Un(e, t * 12, n);
}
function Qa(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((a) => {
    !r && typeof a == "object" && (r = V.bind(null, a));
    const i = z(a, r);
    (!n || n < i || isNaN(+i)) && (n = i);
  }), V(r, n || NaN);
}
function Za(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((a) => {
    !r && typeof a == "object" && (r = V.bind(null, a));
    const i = z(a, r);
    (!n || n > i || isNaN(+i)) && (n = i);
  }), V(r, n || NaN);
}
function eo(e, t, n) {
  const [r, a] = Pe(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +Ue(r) == +Ue(a);
}
function Qn(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function to(e) {
  return !(!Qn(e) && typeof e != "number" || isNaN(+z(e)));
}
function Zn(e, t, n) {
  const [r, a] = Pe(
    n == null ? void 0 : n.in,
    e,
    t
  ), i = r.getFullYear() - a.getFullYear(), s = r.getMonth() - a.getMonth();
  return i * 12 + s;
}
function no(e, t) {
  const n = z(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function er(e, t) {
  const [n, r] = Pe(e, t.start, t.end);
  return { start: n, end: r };
}
function ro(e, t) {
  const { start: n, end: r } = er(t == null ? void 0 : t.in, e);
  let a = +n > +r;
  const i = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let c = 1;
  const l = [];
  for (; +s <= i; )
    l.push(V(n, s)), s.setMonth(s.getMonth() + c);
  return a ? l.reverse() : l;
}
function ao(e, t) {
  const n = z(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function oo(e, t) {
  const n = z(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function tr(e, t) {
  const n = z(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function io(e, t) {
  const { start: n, end: r } = er(t == null ? void 0 : t.in, e);
  let a = +n > +r;
  const i = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let c = 1;
  const l = [];
  for (; +s <= i; )
    l.push(V(n, s)), s.setFullYear(s.getFullYear() + c);
  return a ? l.reverse() : l;
}
function nr(e, t) {
  var c, l, d, h;
  const n = Ke(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((h = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : h.weekStartsOn) ?? 0, a = z(e, t == null ? void 0 : t.in), i = a.getDay(), s = (i < r ? -7 : 0) + 6 - (i - r);
  return a.setDate(a.getDate() + s), a.setHours(23, 59, 59, 999), a;
}
function so(e, t) {
  return nr(e, { ...t, weekStartsOn: 1 });
}
const co = {
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
}, lo = (e, t, n) => {
  let r;
  const a = co[e];
  return typeof a == "string" ? r = a : t === 1 ? r = a.one : r = a.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Nt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const uo = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, fo = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, ho = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, po = {
  date: Nt({
    formats: uo,
    defaultWidth: "full"
  }),
  time: Nt({
    formats: fo,
    defaultWidth: "full"
  }),
  dateTime: Nt({
    formats: ho,
    defaultWidth: "full"
  })
}, mo = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, go = (e, t, n, r) => mo[e];
function Ae(e) {
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
const yo = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, vo = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, bo = {
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
}, xo = {
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
}, jo = {
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
}, wo = {
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
}, ko = (e, t) => {
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
}, So = {
  ordinalNumber: ko,
  era: Ae({
    values: yo,
    defaultWidth: "wide"
  }),
  quarter: Ae({
    values: vo,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ae({
    values: bo,
    defaultWidth: "wide"
  }),
  day: Ae({
    values: xo,
    defaultWidth: "wide"
  }),
  dayPeriod: Ae({
    values: jo,
    defaultWidth: "wide",
    formattingValues: wo,
    defaultFormattingWidth: "wide"
  })
};
function Ye(e) {
  return (t, n = {}) => {
    const r = n.width, a = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], i = t.match(a);
    if (!i)
      return null;
    const s = i[0], c = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(c) ? Mo(c, (u) => u.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      No(c, (u) => u.test(s))
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
function No(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Mo(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Do(e) {
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
const Co = /^(\d+)(th|st|nd|rd)?/i, Oo = /\d+/i, Wo = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, $o = {
  any: [/^b/i, /^(a|c)/i]
}, To = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, _o = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Io = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Po = {
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
}, Eo = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Fo = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Ao = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Yo = {
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
}, zo = {
  ordinalNumber: Do({
    matchPattern: Co,
    parsePattern: Oo,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ye({
    matchPatterns: Wo,
    defaultMatchWidth: "wide",
    parsePatterns: $o,
    defaultParseWidth: "any"
  }),
  quarter: Ye({
    matchPatterns: To,
    defaultMatchWidth: "wide",
    parsePatterns: _o,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ye({
    matchPatterns: Io,
    defaultMatchWidth: "wide",
    parsePatterns: Po,
    defaultParseWidth: "any"
  }),
  day: Ye({
    matchPatterns: Eo,
    defaultMatchWidth: "wide",
    parsePatterns: Fo,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ye({
    matchPatterns: Ao,
    defaultMatchWidth: "any",
    parsePatterns: Yo,
    defaultParseWidth: "any"
  })
}, _e = {
  code: "en-US",
  formatDistance: lo,
  formatLong: po,
  formatRelative: go,
  localize: So,
  match: zo,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Bo(e, t) {
  const n = z(e, t == null ? void 0 : t.in);
  return Yt(n, tr(n)) + 1;
}
function zt(e, t) {
  const n = z(e, t == null ? void 0 : t.in), r = +Ve(n) - +Va(n);
  return Math.round(r / Xn) + 1;
}
function rr(e, t) {
  var h, u, f, p;
  const n = z(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = Ke(), i = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (h = t == null ? void 0 : t.locale) == null ? void 0 : h.options) == null ? void 0 : u.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((p = (f = a.locale) == null ? void 0 : f.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = V((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, i), s.setHours(0, 0, 0, 0);
  const c = Ie(s, t), l = V((t == null ? void 0 : t.in) || e, 0);
  l.setFullYear(r, 0, i), l.setHours(0, 0, 0, 0);
  const d = Ie(l, t);
  return +n >= +c ? r + 1 : +n >= +d ? r : r - 1;
}
function Ro(e, t) {
  var c, l, d, h;
  const n = Ke(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((h = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, a = rr(e, t), i = V((t == null ? void 0 : t.in) || e, 0);
  return i.setFullYear(a, 0, r), i.setHours(0, 0, 0, 0), Ie(i, t);
}
function Bt(e, t) {
  const n = z(e, t == null ? void 0 : t.in), r = +Ie(n, t) - +Ro(n, t);
  return Math.round(r / Xn) + 1;
}
function Y(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const je = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return Y(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : Y(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return Y(e.getDate(), t.length);
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
    return Y(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return Y(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return Y(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return Y(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), a = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return Y(a, t.length);
  }
}, We = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, un = {
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
    return je.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const a = rr(e, r), i = a > 0 ? a : 1 - a;
    if (t === "YY") {
      const s = i % 100;
      return Y(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(i, { unit: "year" }) : Y(i, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Kn(e);
    return Y(n, t.length);
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
    return Y(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return Y(r, 2);
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
        return Y(r, 2);
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
        return je.M(e, t);
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
        return Y(r + 1, 2);
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
    const a = Bt(e, r);
    return t === "wo" ? n.ordinalNumber(a, { unit: "week" }) : Y(a, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = zt(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : Y(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : je.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Bo(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : Y(r, t.length);
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
        return Y(i, 2);
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
        return Y(i, t.length);
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
        return Y(a, t.length);
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
    switch (r === 12 ? a = We.noon : r === 0 ? a = We.midnight : a = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? a = We.evening : r >= 12 ? a = We.afternoon : r >= 4 ? a = We.morning : a = We.night, t) {
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
    return je.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : je.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : Y(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : Y(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : je.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : je.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return je.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return hn(r);
      case "XXXX":
      case "XX":
        return De(r);
      case "XXXXX":
      case "XXX":
      default:
        return De(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return hn(r);
      case "xxxx":
      case "xx":
        return De(r);
      case "xxxxx":
      case "xxx":
      default:
        return De(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + fn(r, ":");
      case "OOOO":
      default:
        return "GMT" + De(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + fn(r, ":");
      case "zzzz":
      default:
        return "GMT" + De(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return Y(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return Y(+e, t.length);
  }
};
function fn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = Math.trunc(r / 60), i = r % 60;
  return i === 0 ? n + String(a) : n + String(a) + t + Y(i, 2);
}
function hn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + Y(Math.abs(e) / 60, 2) : De(e, t);
}
function De(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = Y(Math.trunc(r / 60), 2), i = Y(r % 60, 2);
  return n + a + t + i;
}
const pn = (e, t) => {
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
}, ar = (e, t) => {
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
}, Ho = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], a = n[2];
  if (!a)
    return pn(e, t);
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
  return i.replace("{{date}}", pn(r, t)).replace("{{time}}", ar(a, t));
}, Jo = {
  p: ar,
  P: Ho
}, Go = /^D+$/, Lo = /^Y+$/, qo = ["D", "DD", "YY", "YYYY"];
function Xo(e) {
  return Go.test(e);
}
function Vo(e) {
  return Lo.test(e);
}
function Uo(e, t, n) {
  const r = Ko(e, t, n);
  if (console.warn(r), qo.includes(e)) throw new RangeError(r);
}
function Ko(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Qo = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Zo = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, ei = /^'([^]*?)'?$/, ti = /''/g, ni = /[a-zA-Z]/;
function He(e, t, n) {
  var h, u, f, p, x, y, w, v;
  const r = Ke(), a = (n == null ? void 0 : n.locale) ?? r.locale ?? _e, i = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((u = (h = n == null ? void 0 : n.locale) == null ? void 0 : h.options) == null ? void 0 : u.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((p = (f = r.locale) == null ? void 0 : f.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((y = (x = n == null ? void 0 : n.locale) == null ? void 0 : x.options) == null ? void 0 : y.weekStartsOn) ?? r.weekStartsOn ?? ((v = (w = r.locale) == null ? void 0 : w.options) == null ? void 0 : v.weekStartsOn) ?? 0, c = z(e, n == null ? void 0 : n.in);
  if (!to(c))
    throw new RangeError("Invalid time value");
  let l = t.match(Zo).map((b) => {
    const j = b[0];
    if (j === "p" || j === "P") {
      const M = Jo[j];
      return M(b, a.formatLong);
    }
    return b;
  }).join("").match(Qo).map((b) => {
    if (b === "''")
      return { isToken: !1, value: "'" };
    const j = b[0];
    if (j === "'")
      return { isToken: !1, value: ri(b) };
    if (un[j])
      return { isToken: !0, value: b };
    if (j.match(ni))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + j + "`"
      );
    return { isToken: !1, value: b };
  });
  a.localize.preprocessor && (l = a.localize.preprocessor(c, l));
  const d = {
    firstWeekContainsDate: i,
    weekStartsOn: s,
    locale: a
  };
  return l.map((b) => {
    if (!b.isToken) return b.value;
    const j = b.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && Vo(j) || !(n != null && n.useAdditionalDayOfYearTokens) && Xo(j)) && Uo(j, t, String(e));
    const M = un[j[0]];
    return M(c, j, a.localize, d);
  }).join("");
}
function ri(e) {
  const t = e.match(ei);
  return t ? t[1].replace(ti, "'") : e;
}
function ai(e, t) {
  const n = z(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = n.getMonth(), i = V(n, 0);
  return i.setFullYear(r, a + 1, 0), i.setHours(0, 0, 0, 0), i.getDate();
}
function oi(e, t) {
  return z(e, t == null ? void 0 : t.in).getMonth();
}
function ii(e, t) {
  return z(e, t == null ? void 0 : t.in).getFullYear();
}
function si(e, t) {
  return +z(e) > +z(t);
}
function ci(e, t) {
  return +z(e) < +z(t);
}
function li(e, t, n) {
  const [r, a] = Pe(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === a.getFullYear() && r.getMonth() === a.getMonth();
}
function di(e, t, n) {
  const [r, a] = Pe(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === a.getFullYear();
}
function ui(e, t, n) {
  const r = z(e, n == null ? void 0 : n.in), a = r.getFullYear(), i = r.getDate(), s = V(e, 0);
  s.setFullYear(a, t, 15), s.setHours(0, 0, 0, 0);
  const c = ai(s);
  return r.setMonth(t, Math.min(i, c)), r;
}
function fi(e, t, n) {
  const r = z(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? V(e, NaN) : (r.setFullYear(t), r);
}
const mn = 5, hi = 4;
function pi(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, a = t.addDays(e, -r + 1), i = t.addDays(a, mn * 7 - 1);
  return t.getMonth(e) === t.getMonth(i) ? mn : hi;
}
function or(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function mi(e, t) {
  const n = or(e, t), r = pi(e, t);
  return t.addDays(n, r * 7 - 1);
}
const ir = {
  ..._e,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let a;
      r && typeof r.format == "function" ? a = r.format.bind(r) : a = (s, c) => He(s, c, { locale: _e, ...n });
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
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (a, i) => He(a, i, { locale: _e, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let a;
      r && typeof r.format == "function" ? a = r.format.bind(r) : a = (s, c) => He(s, c, { locale: _e, ...n });
      let i = a(e, "PPPP");
      return t != null && t.today && (i = `Today, ${i}`), i;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (a, i) => He(a, i, { locale: _e, ...t }), r(e, "cccc");
    }
  }
};
class re {
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
        return Q.tz(this.options.timeZone);
      const r = this.options.Date ?? Date;
      return new r();
    }, this.newDate = (r, a, i) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, a, i) : this.options.timeZone ? new Q(r, a, i, this.options.timeZone) : new Date(r, a, i);
    }, this.addDays = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.addDays ? this.overrides.addDays(r, a) : Vn(r, a);
    }, this.addMonths = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.addMonths ? this.overrides.addMonths(r, a) : Un(r, a);
    }, this.addWeeks = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.addWeeks ? this.overrides.addWeeks(r, a) : Ua(r, a);
    }, this.addYears = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.addYears ? this.overrides.addYears(r, a) : Ka(r, a);
    }, this.differenceInCalendarDays = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, a) : Yt(r, a);
    }, this.differenceInCalendarMonths = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, a) : Zn(r, a);
    }, this.eachMonthOfInterval = (r) => {
      var a;
      return (a = this.overrides) != null && a.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : ro(r);
    }, this.eachYearOfInterval = (r) => {
      var c;
      const a = (c = this.overrides) != null && c.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : io(r), i = new Set(a.map((l) => this.getYear(l)));
      if (i.size === a.length)
        return a;
      const s = [];
      return i.forEach((l) => {
        s.push(new Date(l, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : mi(r, this);
    }, this.endOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfISOWeek ? this.overrides.endOfISOWeek(r) : so(r);
    }, this.endOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfMonth ? this.overrides.endOfMonth(r) : no(r);
    }, this.endOfWeek = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.endOfWeek ? this.overrides.endOfWeek(r, a) : nr(r, this.options);
    }, this.endOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfYear ? this.overrides.endOfYear(r) : oo(r);
    }, this.format = (r, a, i) => {
      var c;
      const s = (c = this.overrides) != null && c.format ? this.overrides.format(r, a, this.options) : He(r, a, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.getISOWeek ? this.overrides.getISOWeek(r) : zt(r);
    }, this.getMonth = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.getMonth ? this.overrides.getMonth(r, this.options) : oi(r, this.options);
    }, this.getYear = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.getYear ? this.overrides.getYear(r, this.options) : ii(r, this.options);
    }, this.getWeek = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.getWeek ? this.overrides.getWeek(r, this.options) : Bt(r, this.options);
    }, this.isAfter = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isAfter ? this.overrides.isAfter(r, a) : si(r, a);
    }, this.isBefore = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isBefore ? this.overrides.isBefore(r, a) : ci(r, a);
    }, this.isDate = (r) => {
      var a;
      return (a = this.overrides) != null && a.isDate ? this.overrides.isDate(r) : Qn(r);
    }, this.isSameDay = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isSameDay ? this.overrides.isSameDay(r, a) : eo(r, a);
    }, this.isSameMonth = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isSameMonth ? this.overrides.isSameMonth(r, a) : li(r, a);
    }, this.isSameYear = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isSameYear ? this.overrides.isSameYear(r, a) : di(r, a);
    }, this.max = (r) => {
      var a;
      return (a = this.overrides) != null && a.max ? this.overrides.max(r) : Qa(r);
    }, this.min = (r) => {
      var a;
      return (a = this.overrides) != null && a.min ? this.overrides.min(r) : Za(r);
    }, this.setMonth = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.setMonth ? this.overrides.setMonth(r, a) : ui(r, a);
    }, this.setYear = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.setYear ? this.overrides.setYear(r, a) : fi(r, a);
    }, this.startOfBroadcastWeek = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : or(r, this);
    }, this.startOfDay = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfDay ? this.overrides.startOfDay(r) : Ue(r);
    }, this.startOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Ve(r);
    }, this.startOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfMonth ? this.overrides.startOfMonth(r) : ao(r);
    }, this.startOfWeek = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Ie(r, this.options);
    }, this.startOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfYear ? this.overrides.startOfYear(r) : tr(r);
    }, this.options = { locale: ir, ...t }, this.overrides = n;
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
    return t && re.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: a } = this.options, i = n == null ? void 0 : n.code;
    if (i && re.yearFirstLocales.has(i))
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
re.yearFirstLocales = /* @__PURE__ */ new Set([
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
const he = new re();
class sr {
  constructor(t, n, r = he) {
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
class gi {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class yi {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function vi(e) {
  return W.createElement("span", { ...e });
}
function bi(e) {
  const { size: t = 24, orientation: n = "left", className: r, style: a } = e;
  return W.createElement(
    "svg",
    { className: r, style: a, width: t, height: t, viewBox: "0 0 24 24" },
    n === "up" && W.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
    n === "down" && W.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
    n === "left" && W.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
    n === "right" && W.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
  );
}
function xi(e) {
  const { day: t, modifiers: n, ...r } = e;
  return W.createElement("td", { ...r });
}
function ji(e) {
  const { day: t, modifiers: n, ...r } = e, a = W.useRef(null);
  return W.useEffect(() => {
    var i;
    n.focused && ((i = a.current) == null || i.focus());
  }, [n.focused]), W.createElement("button", { ref: a, ...r });
}
var O;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(O || (O = {}));
var J;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(J || (J = {}));
var se;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(se || (se = {}));
var ne;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(ne || (ne = {}));
const cr = we(void 0);
function yt() {
  const e = xe(cr);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function wi(e) {
  const { options: t, className: n, ...r } = e, { classNames: a, components: i, styles: s } = yt(), c = [a[O.Dropdown], n].join(" "), l = t == null ? void 0 : t.find(({ value: d }) => d === r.value);
  return W.createElement(
    "span",
    { "data-disabled": r.disabled, className: a[O.DropdownRoot], style: s == null ? void 0 : s[O.DropdownRoot] },
    W.createElement(i.Select, { className: c, ...r }, t == null ? void 0 : t.map(({ value: d, label: h, disabled: u }) => W.createElement(i.Option, { key: d, value: d, disabled: u }, h))),
    W.createElement(
      "span",
      { className: a[O.CaptionLabel], style: s == null ? void 0 : s[O.CaptionLabel], "aria-hidden": !0 },
      l == null ? void 0 : l.label,
      W.createElement(i.Chevron, { orientation: "down", size: 18, className: a[O.Chevron], style: s == null ? void 0 : s[O.Chevron] })
    )
  );
}
function ki(e) {
  return W.createElement("div", { ...e });
}
function Si(e) {
  return W.createElement("div", { ...e });
}
function Ni(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return W.createElement("div", { ...r }, e.children);
}
function Mi(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return W.createElement("div", { ...r });
}
function Di(e) {
  return W.createElement("table", { ...e });
}
function Ci(e) {
  return W.createElement("div", { ...e });
}
function Oi(e) {
  const { components: t } = yt();
  return W.createElement(t.Dropdown, { ...e });
}
function Wi(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: a, ...i } = e, { components: s, classNames: c, styles: l, labels: { labelPrevious: d, labelNext: h } } = yt(), u = E((p) => {
    a && (n == null || n(p));
  }, [a, n]), f = E((p) => {
    r && (t == null || t(p));
  }, [r, t]);
  return W.createElement(
    "nav",
    { ...i },
    W.createElement(
      s.PreviousMonthButton,
      { type: "button", className: c[O.PreviousMonthButton], style: l == null ? void 0 : l[O.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": d(r), onClick: f },
      W.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: c[O.Chevron], style: l == null ? void 0 : l[O.Chevron], orientation: "left" })
    ),
    W.createElement(
      s.NextMonthButton,
      { type: "button", className: c[O.NextMonthButton], style: l == null ? void 0 : l[O.NextMonthButton], tabIndex: a ? void 0 : -1, "aria-disabled": a ? void 0 : !0, "aria-label": h(a), onClick: u },
      W.createElement(s.Chevron, { disabled: a ? void 0 : !0, orientation: "right", className: c[O.Chevron], style: l == null ? void 0 : l[O.Chevron] })
    )
  );
}
function $i(e) {
  return W.createElement("button", { ...e });
}
function Ti(e) {
  return W.createElement("option", { ...e });
}
function _i(e) {
  return W.createElement("button", { ...e });
}
function Ii(e) {
  const { rootRef: t, ...n } = e;
  return W.createElement("div", { ...n, ref: t });
}
function Pi(e) {
  return W.createElement("select", { ...e });
}
function Ei(e) {
  const { week: t, ...n } = e;
  return W.createElement("tr", { ...n });
}
function Fi(e) {
  return W.createElement("th", { ...e });
}
function Ai(e) {
  return W.createElement(
    "thead",
    { "aria-hidden": !0 },
    W.createElement("tr", { ...e })
  );
}
function Yi(e) {
  const { week: t, ...n } = e;
  return W.createElement("th", { ...n });
}
function zi(e) {
  return W.createElement("th", { ...e });
}
function Bi(e) {
  return W.createElement("tbody", { ...e });
}
function Ri(e) {
  const { components: t } = yt();
  return W.createElement(t.Dropdown, { ...e });
}
const Hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CaptionLabel: vi,
  Chevron: bi,
  Day: xi,
  DayButton: ji,
  Dropdown: wi,
  DropdownNav: ki,
  Footer: Si,
  Month: Ni,
  MonthCaption: Mi,
  MonthGrid: Di,
  Months: Ci,
  MonthsDropdown: Oi,
  Nav: Wi,
  NextMonthButton: $i,
  Option: Ti,
  PreviousMonthButton: _i,
  Root: Ii,
  Select: Pi,
  Week: Ei,
  WeekNumber: Yi,
  WeekNumberHeader: zi,
  Weekday: Fi,
  Weekdays: Ai,
  Weeks: Bi,
  YearsDropdown: Ri
}, Symbol.toStringTag, { value: "Module" }));
function ve(e, t, n = !1, r = he) {
  let { from: a, to: i } = e;
  const { differenceInCalendarDays: s, isSameDay: c } = r;
  return a && i ? (s(i, a) < 0 && ([a, i] = [i, a]), s(t, a) >= (n ? 1 : 0) && s(i, t) >= (n ? 1 : 0)) : !n && i ? c(i, t) : !n && a ? c(a, t) : !1;
}
function Rt(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function vt(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Ht(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Jt(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function lr(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function dr(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function be(e, t, n = he) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: a, differenceInCalendarDays: i, isAfter: s } = n;
  return r.some((c) => {
    if (typeof c == "boolean")
      return c;
    if (n.isDate(c))
      return a(e, c);
    if (dr(c, n))
      return c.some((l) => a(e, l));
    if (vt(c))
      return ve(c, e, !1, n);
    if (lr(c))
      return Array.isArray(c.dayOfWeek) ? c.dayOfWeek.includes(e.getDay()) : c.dayOfWeek === e.getDay();
    if (Rt(c)) {
      const l = i(c.before, e), d = i(c.after, e), h = l > 0, u = d < 0;
      return s(c.before, c.after) ? u && h : h || u;
    }
    return Ht(c) ? i(e, c.after) > 0 : Jt(c) ? i(c.before, e) > 0 : typeof c == "function" ? c(e) : !1;
  });
}
function Ji(e, t, n, r, a) {
  const { disabled: i, hidden: s, modifiers: c, showOutsideDays: l, broadcastCalendar: d, today: h = a.today() } = t, { isSameDay: u, isSameMonth: f, startOfMonth: p, isBefore: x, endOfMonth: y, isAfter: w } = a, v = n && p(n), b = r && y(r), j = {
    [J.focused]: [],
    [J.outside]: [],
    [J.disabled]: [],
    [J.hidden]: [],
    [J.today]: []
  }, M = {};
  for (const S of e) {
    const { date: m, displayMonth: k } = S, N = !!(k && !f(m, k)), C = !!(v && x(m, v)), D = !!(b && w(m, b)), T = !!(i && be(m, i, a)), X = !!(s && be(m, s, a)) || C || D || // Broadcast calendar will show outside days as default
    !d && !l && N || d && l === !1 && N, H = u(m, h);
    N && j.outside.push(S), T && j.disabled.push(S), X && j.hidden.push(S), H && j.today.push(S), c && Object.keys(c).forEach((R) => {
      const Z = c == null ? void 0 : c[R];
      Z && be(m, Z, a) && (M[R] ? M[R].push(S) : M[R] = [S]);
    });
  }
  return (S) => {
    const m = {
      [J.focused]: !1,
      [J.disabled]: !1,
      [J.hidden]: !1,
      [J.outside]: !1,
      [J.today]: !1
    }, k = {};
    for (const N in j) {
      const C = j[N];
      m[N] = C.some((D) => D === S);
    }
    for (const N in M)
      k[N] = M[N].some((C) => C === S);
    return {
      ...m,
      // custom modifiers should override all the previous ones
      ...k
    };
  };
}
function Gi(e, t, n = {}) {
  return Object.entries(e).filter(([, a]) => a === !0).reduce((a, [i]) => (n[i] ? a.push(n[i]) : t[J[i]] ? a.push(t[J[i]]) : t[se[i]] && a.push(t[se[i]]), a), [t[O.Day]]);
}
function Li(e) {
  return {
    ...Hi,
    ...e
  };
}
function qi(e) {
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
function Xi() {
  const e = {};
  for (const t in O)
    e[O[t]] = `rdp-${O[t]}`;
  for (const t in J)
    e[J[t]] = `rdp-${J[t]}`;
  for (const t in se)
    e[se[t]] = `rdp-${se[t]}`;
  for (const t in ne)
    e[ne[t]] = `rdp-${ne[t]}`;
  return e;
}
function Vi(e, t, n) {
  return (n ?? new re(t)).formatMonthYear(e);
}
function Ui(e, t, n) {
  return (n ?? new re(t)).format(e, "d");
}
function Ki(e, t = he) {
  return t.format(e, "LLLL");
}
function Qi(e, t, n) {
  return (n ?? new re(t)).format(e, "cccccc");
}
function Zi(e, t = he) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function es() {
  return "";
}
function ts(e, t = he) {
  return t.format(e, "yyyy");
}
const ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Vi,
  formatDay: Ui,
  formatMonthDropdown: Ki,
  formatWeekNumber: Zi,
  formatWeekNumberHeader: es,
  formatWeekdayName: Qi,
  formatYearDropdown: ts
}, Symbol.toStringTag, { value: "Module" }));
function rs(e) {
  return {
    ...ns,
    ...e
  };
}
function ur(e, t, n, r) {
  let a = (r ?? new re(n)).format(e, "PPPP");
  return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
}
function fr(e, t, n) {
  return (n ?? new re(t)).formatMonthYear(e);
}
function hr(e, t, n, r) {
  let a = (r ?? new re(n)).format(e, "PPPP");
  return t != null && t.today && (a = `Today, ${a}`), a;
}
function pr(e) {
  return "Choose the Month";
}
function mr() {
  return "";
}
const as = "Go to the Next Month";
function gr(e, t) {
  return as;
}
function yr(e) {
  return "Go to the Previous Month";
}
function vr(e, t, n) {
  return (n ?? new re(t)).format(e, "cccc");
}
function br(e, t) {
  return `Week ${e}`;
}
function xr(e) {
  return "Week Number";
}
function jr(e) {
  return "Choose the Year";
}
const os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelDayButton: ur,
  labelGrid: fr,
  labelGridcell: hr,
  labelMonthDropdown: pr,
  labelNav: mr,
  labelNext: gr,
  labelPrevious: yr,
  labelWeekNumber: br,
  labelWeekNumberHeader: xr,
  labelWeekday: vr,
  labelYearDropdown: jr
}, Symbol.toStringTag, { value: "Module" })), ie = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function is(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...os,
    ...e ?? {},
    labelDayButton: ie(ur, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: ie(pr, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: ie(gr, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: ie(yr, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: ie(br, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: ie(jr, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: ie(fr, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: ie(hr, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: ie(mr, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: ie(xr, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: ie(vr, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function ss(e, t, n, r, a) {
  const { startOfMonth: i, startOfYear: s, endOfYear: c, eachMonthOfInterval: l, getMonth: d } = a;
  return l({
    start: s(e),
    end: c(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, a), x = d(f), y = t && f < i(t) || n && f > i(n) || !1;
    return { value: x, label: p, disabled: y };
  });
}
function cs(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[O.Day] };
  return Object.entries(e).filter(([, a]) => a === !0).forEach(([a]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[a]
    };
  }), r;
}
function ls(e, t, n, r) {
  const a = r ?? e.today(), i = n ? e.startOfBroadcastWeek(a, e) : t ? e.startOfISOWeek(a) : e.startOfWeek(a), s = [];
  for (let c = 0; c < 7; c++) {
    const l = e.addDays(i, c);
    s.push(l);
  }
  return s;
}
function ds(e, t, n, r, a = !1) {
  if (!e || !t)
    return;
  const { startOfYear: i, endOfYear: s, eachYearOfInterval: c, getYear: l } = r, d = i(e), h = s(t), u = c({ start: d, end: h });
  return a && u.reverse(), u.map((f) => {
    const p = n.formatYearDropdown(f, r);
    return {
      value: l(f),
      label: p,
      disabled: !1
    };
  });
}
function us(e, t = {}) {
  var c;
  const { weekStartsOn: n, locale: r } = t, a = n ?? ((c = r == null ? void 0 : r.options) == null ? void 0 : c.weekStartsOn) ?? 0, i = (l) => {
    const d = typeof l == "number" || typeof l == "string" ? new Date(l) : l;
    return new Q(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, e);
  }, s = (l) => {
    const d = i(l);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => i(Q.tz(e)),
    newDate: (l, d, h) => new Q(l, d, h, 12, 0, 0, e),
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
      const h = i(l), p = ((((d == null ? void 0 : d.weekStartsOn) ?? a) + 6) % 7 - h.getDay() + 7) % 7;
      return h.setDate(h.getDate() + p), h;
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
      const d = i(l.start), h = i(l.end), u = [], f = new Q(d.getFullYear(), d.getMonth(), 1, 12, 0, 0, e), p = h.getFullYear() * 12 + h.getMonth();
      for (; f.getFullYear() * 12 + f.getMonth() <= p; )
        u.push(new Q(f, e)), f.setMonth(f.getMonth() + 1, 1);
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
      const d = i(l.start), h = i(l.end), u = [], f = new Q(d.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; f.getFullYear() <= h.getFullYear(); )
        u.push(new Q(f, e)), f.setFullYear(f.getFullYear() + 1, 0, 1);
      return u;
    },
    getWeek: (l, d) => {
      var u;
      const h = s(l);
      return Bt(h, {
        weekStartsOn: (d == null ? void 0 : d.weekStartsOn) ?? a,
        firstWeekContainsDate: (d == null ? void 0 : d.firstWeekContainsDate) ?? ((u = r == null ? void 0 : r.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (l) => {
      const d = s(l);
      return zt(d);
    },
    differenceInCalendarDays: (l, d) => {
      const h = s(l), u = s(d);
      return Yt(h, u);
    },
    differenceInCalendarMonths: (l, d) => {
      const h = s(l), u = s(d);
      return Zn(h, u);
    }
  };
}
const Qe = (e) => e instanceof HTMLElement ? e : null, Mt = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], fs = (e) => Qe(e.querySelector("[data-animated-month]")), Dt = (e) => Qe(e.querySelector("[data-animated-caption]")), Ct = (e) => Qe(e.querySelector("[data-animated-weeks]")), hs = (e) => Qe(e.querySelector("[data-animated-nav]")), ps = (e) => Qe(e.querySelector("[data-animated-weekdays]"));
function ms(e, t, { classNames: n, months: r, focused: a, dateLib: i }) {
  const s = L(null), c = L(r), l = L(!1);
  ma(() => {
    const d = c.current;
    if (c.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const h = i.isSameMonth(r[0].date, d[0].date), u = i.isAfter(r[0].date, d[0].date), f = u ? n[ne.caption_after_enter] : n[ne.caption_before_enter], p = u ? n[ne.weeks_after_enter] : n[ne.weeks_before_enter], x = s.current, y = e.current.cloneNode(!0);
    if (y instanceof HTMLElement ? (Mt(y).forEach((j) => {
      if (!(j instanceof HTMLElement))
        return;
      const M = fs(j);
      M && j.contains(M) && j.removeChild(M);
      const S = Dt(j);
      S && S.classList.remove(f);
      const m = Ct(j);
      m && m.classList.remove(p);
    }), s.current = y) : s.current = null, l.current || h || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    a)
      return;
    const w = x instanceof HTMLElement ? Mt(x) : [], v = Mt(e.current);
    if (v != null && v.every((b) => b instanceof HTMLElement) && (w != null && w.every((b) => b instanceof HTMLElement))) {
      l.current = !0, e.current.style.isolation = "isolate";
      const b = hs(e.current);
      b && (b.style.zIndex = "1"), v.forEach((j, M) => {
        const S = w[M];
        if (!S)
          return;
        j.style.position = "relative", j.style.overflow = "hidden";
        const m = Dt(j);
        m && m.classList.add(f);
        const k = Ct(j);
        k && k.classList.add(p);
        const N = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), b && (b.style.zIndex = ""), m && m.classList.remove(f), k && k.classList.remove(p), j.style.position = "", j.style.overflow = "", j.contains(S) && j.removeChild(S);
        };
        S.style.pointerEvents = "none", S.style.position = "absolute", S.style.overflow = "hidden", S.setAttribute("aria-hidden", "true");
        const C = ps(S);
        C && (C.style.opacity = "0");
        const D = Dt(S);
        D && (D.classList.add(u ? n[ne.caption_before_exit] : n[ne.caption_after_exit]), D.addEventListener("animationend", N));
        const T = Ct(S);
        T && T.classList.add(u ? n[ne.weeks_before_exit] : n[ne.weeks_after_exit]), j.insertBefore(S, j.firstChild);
      });
    }
  });
}
function gs(e, t, n, r) {
  const a = e[0], i = e[e.length - 1], { ISOWeek: s, fixedWeeks: c, broadcastCalendar: l } = n ?? {}, { addDays: d, differenceInCalendarDays: h, differenceInCalendarMonths: u, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: x, endOfWeek: y, isAfter: w, startOfBroadcastWeek: v, startOfISOWeek: b, startOfWeek: j } = r, M = l ? v(a, r) : s ? b(a) : j(a), S = l ? f(i) : s ? p(x(i)) : y(x(i)), m = t && (l ? f(t) : s ? p(t) : y(t)), k = m && w(S, m) ? m : S, N = h(k, M), C = u(i, a) + 1, D = [];
  for (let H = 0; H <= N; H++) {
    const R = d(M, H);
    D.push(R);
  }
  const X = (l ? 35 : 42) * C;
  if (c && D.length < X) {
    const H = X - D.length;
    for (let R = 0; R < H; R++) {
      const Z = d(D[D.length - 1], 1);
      D.push(Z);
    }
  }
  return D;
}
function ys(e) {
  const t = [];
  return e.reduce((n, r) => {
    const a = r.weeks.reduce((i, s) => i.concat(s.days.slice()), t.slice());
    return n.concat(a.slice());
  }, t.slice());
}
function vs(e, t, n, r) {
  const { numberOfMonths: a = 1 } = n, i = [];
  for (let s = 0; s < a; s++) {
    const c = r.addMonths(e, s);
    if (t && c > t)
      break;
    i.push(c);
  }
  return i;
}
function gn(e, t, n, r) {
  const { month: a, defaultMonth: i, today: s = r.today(), numberOfMonths: c = 1 } = e;
  let l = a || i || s;
  const { differenceInCalendarMonths: d, addMonths: h, startOfMonth: u } = r;
  if (n && d(n, l) < c - 1) {
    const f = -1 * (c - 1);
    l = h(n, f);
  }
  return t && d(l, t) < 0 && (l = t), u(l);
}
function bs(e, t, n, r) {
  const { addDays: a, endOfBroadcastWeek: i, endOfISOWeek: s, endOfMonth: c, endOfWeek: l, getISOWeek: d, getWeek: h, startOfBroadcastWeek: u, startOfISOWeek: f, startOfWeek: p } = r, x = e.reduce((y, w) => {
    const v = n.broadcastCalendar ? u(w, r) : n.ISOWeek ? f(w) : p(w), b = n.broadcastCalendar ? i(w) : n.ISOWeek ? s(c(w)) : l(c(w)), j = t.filter((k) => k >= v && k <= b), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && j.length < M) {
      const k = t.filter((N) => {
        const C = M - j.length;
        return N > b && N <= a(b, C);
      });
      j.push(...k);
    }
    const S = j.reduce((k, N) => {
      const C = n.ISOWeek ? d(N) : h(N), D = k.find((X) => X.weekNumber === C), T = new sr(N, w, r);
      return D ? D.days.push(T) : k.push(new yi(C, [T])), k;
    }, []), m = new gi(w, S);
    return y.push(m), y;
  }, []);
  return n.reverseMonths ? x.reverse() : x;
}
function xs(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: a, startOfDay: i, startOfMonth: s, endOfMonth: c, addYears: l, endOfYear: d, today: h } = t, u = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : !n && u && (n = a(l(e.today ?? h(), -100))), r ? r = c(r) : !r && u && (r = d(e.today ?? h())), [
    n && i(n),
    r && i(r)
  ];
}
function js(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: i = 1 } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: l } = r, d = a ? i : 1, h = s(e);
  if (!t)
    return c(h, d);
  if (!(l(t, e) < i))
    return c(h, d);
}
function ws(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: i } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: l } = r, d = a ? i ?? 1 : 1, h = s(e);
  if (!t)
    return c(h, -d);
  if (!(l(h, t) <= 0))
    return c(h, -d);
}
function ks(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function bt(e, t) {
  const [n, r] = $(e);
  return [t === void 0 ? n : t, r];
}
function Ss(e, t) {
  var M;
  const [n, r] = xs(e, t), { startOfMonth: a, endOfMonth: i } = t, s = gn(e, n, r, t), [c, l] = bt(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  U(() => {
    const S = gn(e, n, r, t);
    l(S);
  }, [e.timeZone]);
  const { months: d, weeks: h, days: u, previousMonth: f, nextMonth: p } = qe(() => {
    const S = vs(c, r, { numberOfMonths: e.numberOfMonths }, t), m = gs(S, e.endMonth ? i(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), k = bs(S, m, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), N = ks(k), C = ys(k), D = ws(c, n, e, t), T = js(c, r, e, t);
    return {
      months: k,
      weeks: N,
      days: C,
      previousMonth: D,
      nextMonth: T
    };
  }, [
    t,
    c.getTime(),
    r == null ? void 0 : r.getTime(),
    n == null ? void 0 : n.getTime(),
    e.disableNavigation,
    e.broadcastCalendar,
    (M = e.endMonth) == null ? void 0 : M.getTime(),
    e.fixedWeeks,
    e.ISOWeek,
    e.numberOfMonths,
    e.pagedNavigation,
    e.reverseMonths
  ]), { disableNavigation: x, onMonthChange: y } = e, w = (S) => h.some((m) => m.days.some((k) => k.isEqualTo(S))), v = (S) => {
    if (x)
      return;
    let m = a(S);
    n && m < a(n) && (m = a(n)), r && m > a(r) && (m = a(r)), l(m), y == null || y(m);
  };
  return {
    months: d,
    weeks: h,
    days: u,
    navStart: n,
    navEnd: r,
    previousMonth: f,
    nextMonth: p,
    goToMonth: v,
    goToDay: (S) => {
      w(S) || v(S.date);
    }
  };
}
var de;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(de || (de = {}));
function yn(e) {
  return !e[J.disabled] && !e[J.hidden] && !e[J.outside];
}
function Ns(e, t, n, r) {
  let a, i = -1;
  for (const s of e) {
    const c = t(s);
    yn(c) && (c[J.focused] && i < de.FocusedModifier ? (a = s, i = de.FocusedModifier) : r != null && r.isEqualTo(s) && i < de.LastFocused ? (a = s, i = de.LastFocused) : n(s.date) && i < de.Selected ? (a = s, i = de.Selected) : c[J.today] && i < de.Today && (a = s, i = de.Today));
  }
  return a || (a = e.find((s) => yn(t(s)))), a;
}
function Ms(e, t, n, r, a, i, s) {
  const { ISOWeek: c, broadcastCalendar: l } = i, { addDays: d, addMonths: h, addWeeks: u, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: x, endOfWeek: y, max: w, min: v, startOfBroadcastWeek: b, startOfISOWeek: j, startOfWeek: M } = s;
  let m = {
    day: d,
    week: u,
    month: h,
    year: f,
    startOfWeek: (k) => l ? b(k, s) : c ? j(k) : M(k),
    endOfWeek: (k) => l ? p(k) : c ? x(k) : y(k)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? m = w([r, m]) : t === "after" && a && (m = v([a, m])), m;
}
function wr(e, t, n, r, a, i, s, c = 0) {
  if (c > 365)
    return;
  const l = Ms(e, t, n.date, r, a, i, s), d = !!(i.disabled && be(l, i.disabled, s)), h = !!(i.hidden && be(l, i.hidden, s)), u = l, f = new sr(l, u, s);
  return !d && !h ? f : wr(e, t, f, r, a, i, s, c + 1);
}
function Ds(e, t, n, r, a) {
  const { autoFocus: i } = e, [s, c] = $(), l = Ns(t.days, n, r || (() => !1), s), [d, h] = $(i ? l : void 0);
  return {
    isFocusTarget: (y) => !!(l != null && l.isEqualTo(y)),
    setFocused: h,
    focused: d,
    blur: () => {
      c(d), h(void 0);
    },
    moveFocus: (y, w) => {
      if (!d)
        return;
      const v = wr(y, w, d, t.navStart, t.navEnd, e, a);
      v && (e.disableNavigation && !t.days.some((j) => j.isEqualTo(v)) || (t.goToDay(v), h(v)));
    }
  };
}
function Cs(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [i, s] = bt(n, a ? n : void 0), c = a ? n : i, { isSameDay: l } = t, d = (p) => (c == null ? void 0 : c.some((x) => l(x, p))) ?? !1, { min: h, max: u } = e;
  return {
    selected: c,
    select: (p, x, y) => {
      let w = [...c ?? []];
      if (d(p)) {
        if ((c == null ? void 0 : c.length) === h || r && (c == null ? void 0 : c.length) === 1)
          return;
        w = c == null ? void 0 : c.filter((v) => !l(v, p));
      } else
        (c == null ? void 0 : c.length) === u ? w = [p] : w = [...w, p];
      return a || s(w), a == null || a(w, p, x, y), w;
    },
    isSelected: d
  };
}
function Os(e, t, n = 0, r = 0, a = !1, i = he) {
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
function Ws(e, t, n = he) {
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
function vn(e, t, n = he) {
  return ve(e, t.from, !1, n) || ve(e, t.to, !1, n) || ve(t, e.from, !1, n) || ve(t, e.to, !1, n);
}
function $s(e, t, n = he) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((c) => typeof c != "function").some((c) => typeof c == "boolean" ? c : n.isDate(c) ? ve(e, c, !1, n) : dr(c, n) ? c.some((l) => ve(e, l, !1, n)) : vt(c) ? c.from && c.to ? vn(e, { from: c.from, to: c.to }, n) : !1 : lr(c) ? Ws(e, c.dayOfWeek, n) : Rt(c) ? n.isAfter(c.before, c.after) ? vn(e, {
    from: n.addDays(c.after, 1),
    to: n.addDays(c.before, -1)
  }, n) : be(e.from, c, n) || be(e.to, c, n) : Ht(c) || Jt(c) ? be(e.from, c, n) || be(e.to, c, n) : !1))
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
function Ts(e, t) {
  const { disabled: n, excludeDisabled: r, resetOnSelect: a, selected: i, required: s, onSelect: c } = e, [l, d] = bt(i, c ? i : void 0), h = c ? i : l;
  return {
    selected: h,
    select: (p, x, y) => {
      const { min: w, max: v } = e;
      let b;
      if (p) {
        const j = h == null ? void 0 : h.from, M = h == null ? void 0 : h.to, S = !!j && !!M, m = !!j && !!M && t.isSameDay(j, M) && t.isSameDay(p, j);
        a && (S || !(h != null && h.from)) ? !s && m ? b = void 0 : b = { from: p, to: void 0 } : b = Os(p, h, w, v, s, t);
      }
      return r && n && (b != null && b.from) && b.to && $s({ from: b.from, to: b.to }, n, t) && (b.from = p, b.to = void 0), c || d(b), c == null || c(b, p, x, y), b;
    },
    isSelected: (p) => h && ve(h, p, !1, t)
  };
}
function _s(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [i, s] = bt(n, a ? n : void 0), c = a ? n : i, { isSameDay: l } = t;
  return {
    selected: c,
    select: (u, f, p) => {
      let x = u;
      return !r && c && c && l(u, c) && (x = void 0), a || s(x), a == null || a(x, u, f, p), x;
    },
    isSelected: (u) => c ? l(c, u) : !1
  };
}
function Is(e, t) {
  const n = _s(e, t), r = Cs(e, t), a = Ts(e, t);
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
function ae(e, t) {
  return e instanceof Q && e.timeZone === t ? e : new Q(e, t);
}
function $e(e, t, n) {
  return ae(e, t);
}
function bn(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? $e(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? $e(r, t) : r) : vt(e) ? {
    ...e,
    from: e.from ? ae(e.from, t) : e.from,
    to: e.to ? ae(e.to, t) : e.to
  } : Rt(e) ? {
    before: $e(e.before, t),
    after: $e(e.after, t)
  } : Ht(e) ? {
    after: $e(e.after, t)
  } : Jt(e) ? {
    before: $e(e.before, t)
  } : e;
}
function Ot(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => bn(r, t)) : bn(e, t));
}
function kr(e) {
  var en;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = ae(t.today, n)), t.month && (t.month = ae(t.month, n)), t.defaultMonth && (t.defaultMonth = ae(t.defaultMonth, n)), t.startMonth && (t.startMonth = ae(t.startMonth, n)), t.endMonth && (t.endMonth = ae(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = ae(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = (en = t.selected) == null ? void 0 : en.map((_) => ae(_, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? ae(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? ae(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = Ot(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Ot(t.hidden, n)), t.modifiers)) {
    const _ = {};
    Object.keys(t.modifiers).forEach((P) => {
      var I;
      _[P] = Ot((I = t.modifiers) == null ? void 0 : I[P], n);
    }), t.modifiers = _;
  }
  const { components: r, formatters: a, labels: i, dateLib: s, locale: c, classNames: l } = qe(() => {
    const _ = { ...ir, ...t.locale }, P = t.broadcastCalendar ? 1 : t.weekStartsOn, I = t.noonSafe && t.timeZone ? us(t.timeZone, {
      weekStartsOn: P,
      locale: _
    }) : void 0, G = t.dateLib && I ? { ...I, ...t.dateLib } : t.dateLib ?? I, A = new re({
      locale: _,
      weekStartsOn: P,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, G);
    return {
      dateLib: A,
      components: Li(t.components),
      formatters: rs(t.formatters),
      labels: is(t.labels, A.options),
      locale: _,
      classNames: { ...Xi(), ...t.classNames }
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
  const { captionLayout: d, mode: h, navLayout: u, numberOfMonths: f = 1, onDayBlur: p, onDayClick: x, onDayFocus: y, onDayKeyDown: w, onDayMouseEnter: v, onDayMouseLeave: b, onNextClick: j, onPrevClick: M, showWeekNumber: S, styles: m } = t, { formatCaption: k, formatDay: N, formatMonthDropdown: C, formatWeekNumber: D, formatWeekNumberHeader: T, formatWeekdayName: X, formatYearDropdown: H } = a, R = Ss(t, s), { days: Z, months: oe, navStart: ke, navEnd: Se, previousMonth: ee, nextMonth: K, goToMonth: te } = R, Ne = Ji(Z, t, ke, Se, s), { isSelected: pe, select: Ee, selected: et } = Is(t, s) ?? {}, { blur: Xt, focused: tt, isFocusTarget: Rr, moveFocus: Vt, setFocused: nt } = Ds(t, R, Ne, pe ?? (() => !1), s), { labelDayButton: Hr, labelGridcell: Jr, labelGrid: Gr, labelMonthDropdown: Lr, labelNav: Ut, labelPrevious: qr, labelNext: Xr, labelWeekday: Vr, labelWeekNumber: Ur, labelWeekNumberHeader: Kr, labelYearDropdown: Qr } = i, Zr = qe(() => ls(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), Kt = h !== void 0 || x !== void 0, xt = E(() => {
    ee && (te(ee), M == null || M(ee));
  }, [ee, te, M]), jt = E(() => {
    K && (te(K), j == null || j(K));
  }, [te, K, j]), ea = E((_, P) => (I) => {
    I.preventDefault(), I.stopPropagation(), nt(_), !P.disabled && (Ee == null || Ee(_.date, P, I), x == null || x(_.date, P, I));
  }, [Ee, x, nt]), ta = E((_, P) => (I) => {
    nt(_), y == null || y(_.date, P, I);
  }, [y, nt]), na = E((_, P) => (I) => {
    Xt(), p == null || p(_.date, P, I);
  }, [Xt, p]), ra = E((_, P) => (I) => {
    const G = {
      ArrowLeft: [
        I.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        I.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [I.shiftKey ? "year" : "week", "after"],
      ArrowUp: [I.shiftKey ? "year" : "week", "before"],
      PageUp: [I.shiftKey ? "year" : "month", "before"],
      PageDown: [I.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (G[I.key]) {
      I.preventDefault(), I.stopPropagation();
      const [A, ce] = G[I.key];
      Vt(A, ce);
    }
    w == null || w(_.date, P, I);
  }, [Vt, w, t.dir]), aa = E((_, P) => (I) => {
    v == null || v(_.date, P, I);
  }, [v]), oa = E((_, P) => (I) => {
    b == null || b(_.date, P, I);
  }, [b]), ia = E((_, P) => (I) => {
    const G = Number(I.target.value), A = s.setMonth(s.startOfMonth(_), G);
    te(s.addMonths(A, -P));
  }, [s, te]), sa = E((_, P) => (I) => {
    const G = Number(I.target.value), A = s.setYear(s.startOfMonth(_), G);
    te(s.addMonths(A, -P));
  }, [s, te]), { className: ca, style: la } = qe(() => ({
    className: [l[O.Root], t.className].filter(Boolean).join(" "),
    style: { ...m == null ? void 0 : m[O.Root], ...t.style }
  }), [l, t.className, t.style, m]), da = qi(t), Qt = (_) => {
    const P = m == null ? void 0 : m[O.Dropdown], I = m == null ? void 0 : m[_];
    if (!(!P && !I))
      return {
        ...P,
        ...I
      };
  }, Zt = L(null);
  ms(Zt, !!t.animate, {
    classNames: l,
    months: oe,
    focused: tt,
    dateLib: s
  });
  const ua = {
    dayPickerProps: t,
    selected: et,
    select: Ee,
    isSelected: pe,
    months: oe,
    nextMonth: K,
    previousMonth: ee,
    goToMonth: te,
    getModifiers: Ne,
    components: r,
    classNames: l,
    styles: m,
    labels: i,
    formatters: a
  };
  return W.createElement(
    cr.Provider,
    { value: ua },
    W.createElement(
      r.Root,
      { rootRef: t.animate ? Zt : void 0, className: ca, style: la, dir: t.dir, id: t.id, lang: t.lang ?? c.code, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...da },
      W.createElement(
        r.Months,
        { className: l[O.Months], style: m == null ? void 0 : m[O.Months] },
        !t.hideNavigation && !u && W.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[O.Nav], style: m == null ? void 0 : m[O.Nav], "aria-label": Ut(), onPreviousClick: xt, onNextClick: jt, previousMonth: ee, nextMonth: K }),
        oe.map((_, P) => {
          const I = t.reverseMonths ? oe.length - 1 - P : P;
          return W.createElement(
            r.Month,
            {
              "data-animated-month": t.animate ? "true" : void 0,
              className: l[O.Month],
              style: m == null ? void 0 : m[O.Month],
              // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
              key: P,
              displayIndex: P,
              calendarMonth: _
            },
            u === "around" && !t.hideNavigation && P === 0 && W.createElement(
              r.PreviousMonthButton,
              { type: "button", className: l[O.PreviousMonthButton], style: m == null ? void 0 : m[O.PreviousMonthButton], tabIndex: ee ? void 0 : -1, "aria-disabled": ee ? void 0 : !0, "aria-label": qr(ee), onClick: xt, "data-animated-button": t.animate ? "true" : void 0 },
              W.createElement(r.Chevron, { disabled: ee ? void 0 : !0, className: l[O.Chevron], style: m == null ? void 0 : m[O.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
            ),
            W.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: l[O.MonthCaption], style: m == null ? void 0 : m[O.MonthCaption], calendarMonth: _, displayIndex: P }, d != null && d.startsWith("dropdown") ? W.createElement(
              r.DropdownNav,
              { className: l[O.Dropdowns], style: m == null ? void 0 : m[O.Dropdowns] },
              (() => {
                const G = d === "dropdown" || d === "dropdown-months" ? W.createElement(r.MonthsDropdown, { key: "month", className: l[O.MonthsDropdown], "aria-label": Lr(), disabled: !!t.disableNavigation, onChange: ia(_.date, I), options: ss(_.date, ke, Se, a, s), style: Qt(O.MonthsDropdown), value: s.getMonth(_.date) }) : W.createElement("span", { key: "month" }, C(_.date, s)), A = d === "dropdown" || d === "dropdown-years" ? W.createElement(r.YearsDropdown, { key: "year", className: l[O.YearsDropdown], "aria-label": Qr(s.options), disabled: !!t.disableNavigation, onChange: sa(_.date, I), options: ds(ke, Se, a, s, !!t.reverseYears), style: Qt(O.YearsDropdown), value: s.getYear(_.date) }) : W.createElement("span", { key: "year" }, H(_.date, s));
                return s.getMonthYearOrder() === "year-first" ? [A, G] : [G, A];
              })(),
              W.createElement("span", { role: "status", "aria-live": "polite", style: {
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
              } }, k(_.date, s.options, s))
            ) : W.createElement(r.CaptionLabel, { className: l[O.CaptionLabel], style: m == null ? void 0 : m[O.CaptionLabel], role: "status", "aria-live": "polite" }, k(_.date, s.options, s))),
            u === "around" && !t.hideNavigation && P === f - 1 && W.createElement(
              r.NextMonthButton,
              { type: "button", className: l[O.NextMonthButton], style: m == null ? void 0 : m[O.NextMonthButton], tabIndex: K ? void 0 : -1, "aria-disabled": K ? void 0 : !0, "aria-label": Xr(K), onClick: jt, "data-animated-button": t.animate ? "true" : void 0 },
              W.createElement(r.Chevron, { disabled: K ? void 0 : !0, className: l[O.Chevron], style: m == null ? void 0 : m[O.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
            ),
            P === f - 1 && u === "after" && !t.hideNavigation && W.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[O.Nav], style: m == null ? void 0 : m[O.Nav], "aria-label": Ut(), onPreviousClick: xt, onNextClick: jt, previousMonth: ee, nextMonth: K }),
            W.createElement(
              r.MonthGrid,
              { role: "grid", "aria-multiselectable": h === "multiple" || h === "range", "aria-label": Gr(_.date, s.options, s) || void 0, className: l[O.MonthGrid], style: m == null ? void 0 : m[O.MonthGrid] },
              !t.hideWeekdays && W.createElement(
                r.Weekdays,
                { "data-animated-weekdays": t.animate ? "true" : void 0, className: l[O.Weekdays], style: m == null ? void 0 : m[O.Weekdays] },
                S && W.createElement(r.WeekNumberHeader, { "aria-label": Kr(s.options), className: l[O.WeekNumberHeader], style: m == null ? void 0 : m[O.WeekNumberHeader], scope: "col" }, T()),
                Zr.map((G) => W.createElement(r.Weekday, { "aria-label": Vr(G, s.options, s), className: l[O.Weekday], key: String(G), style: m == null ? void 0 : m[O.Weekday], scope: "col" }, X(G, s.options, s)))
              ),
              W.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: l[O.Weeks], style: m == null ? void 0 : m[O.Weeks] }, _.weeks.map((G) => W.createElement(
                r.Week,
                { className: l[O.Week], key: G.weekNumber, style: m == null ? void 0 : m[O.Week], week: G },
                S && W.createElement(r.WeekNumber, { week: G, style: m == null ? void 0 : m[O.WeekNumber], "aria-label": Ur(G.weekNumber, {
                  locale: c
                }), className: l[O.WeekNumber], scope: "row", role: "rowheader" }, D(G.weekNumber, s)),
                G.days.map((A) => {
                  const { date: ce } = A, F = Ne(A);
                  if (F[J.focused] = !F.hidden && !!(tt != null && tt.isEqualTo(A)), F[se.selected] = (pe == null ? void 0 : pe(ce)) || F.selected, vt(et)) {
                    const { from: wt, to: kt } = et;
                    F[se.range_start] = !!(wt && kt && s.isSameDay(ce, wt)), F[se.range_end] = !!(wt && kt && s.isSameDay(ce, kt)), F[se.range_middle] = ve(et, ce, !0, s);
                  }
                  const fa = cs(F, m, t.modifiersStyles), ha = Gi(F, l, t.modifiersClassNames), pa = !Kt && !F.hidden ? Jr(ce, F, s.options, s) : void 0;
                  return W.createElement(r.Day, { key: `${A.isoDate}_${A.displayMonthId}`, day: A, modifiers: F, className: ha.join(" "), style: fa, role: "gridcell", "aria-selected": F.selected || void 0, "aria-label": pa, "data-day": A.isoDate, "data-month": A.outside ? A.dateMonthId : void 0, "data-selected": F.selected || void 0, "data-disabled": F.disabled || void 0, "data-hidden": F.hidden || void 0, "data-outside": A.outside || void 0, "data-focused": F.focused || void 0, "data-today": F.today || void 0 }, !F.hidden && Kt ? W.createElement(r.DayButton, { className: l[O.DayButton], style: m == null ? void 0 : m[O.DayButton], type: "button", day: A, modifiers: F, disabled: !F.focused && F.disabled || void 0, "aria-disabled": F.focused && F.disabled || void 0, tabIndex: Rr(A) ? 0 : -1, "aria-label": Hr(ce, F, s.options, s), onClick: ea(A, F), onBlur: na(A, F), onFocus: ta(A, F), onKeyDown: ra(A, F), onMouseEnter: aa(A, F), onMouseLeave: oa(A, F) }, N(ce, s.options, s)) : !F.hidden && N(A.date, s.options, s));
                })
              )))
            )
          );
        })
      ),
      t.footer && W.createElement(r.Footer, { className: l[O.Footer], style: m == null ? void 0 : m[O.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function Ps(e) {
  return e ? e.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}
function xl({
  value: e,
  onChange: t,
  placeholder: n = "Select date",
  disabled: r = !1,
  minDate: a,
  maxDate: i
}) {
  const [s, c] = $(!1), l = L(null);
  U(() => {
    if (!s) return;
    function f(p) {
      l.current && !l.current.contains(p.target) && c(!1);
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
          /* @__PURE__ */ o("span", { children: Ps(e) || n })
        ]
      }
    ),
    s && /* @__PURE__ */ o("div", { style: h, children: /* @__PURE__ */ o(
      kr,
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
function xn(e) {
  return e ? e.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}
function jl({
  value: e,
  onChange: t,
  placeholder: n = "Select range",
  disabled: r = !1
}) {
  const [a, i] = $({}), [s, c] = $(!1), l = L(null), d = e !== void 0 ? e : a;
  U(() => {
    if (!s) return;
    function x(y) {
      l.current && !l.current.contains(y.target) && c(!1);
    }
    return document.addEventListener("mousedown", x), () => document.removeEventListener("mousedown", x);
  }, [s]);
  function h(x) {
    const y = x ?? {};
    e === void 0 && i(y), t == null || t(y);
  }
  const u = d.from ? `${xn(d.from)} — ${d.to ? xn(d.to) : "..."}` : n, f = {
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
          r || c((x) => !x);
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
      kr,
      {
        mode: "range",
        selected: d,
        onSelect: h
      }
    ) })
  ] });
}
function jn(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function wn(e) {
  return String(e).padStart(2, "0");
}
function wl({
  value: e,
  onChange: t,
  disabled: n = !1,
  format: r = "24h"
}) {
  const [a, i] = $(e ? e.split(":")[0] : ""), [s, c] = $(e ? e.split(":")[1] : "");
  U(() => {
    e && (i(e.split(":")[0]), c(e.split(":")[1]));
  }, [e]);
  const l = r === "12h" ? 12 : 23;
  function d(f) {
    const p = jn(parseInt(f || "0", 10), 0, l), x = wn(p);
    i(x), t == null || t(`${x}:${s || "00"}`);
  }
  function h(f) {
    const p = jn(parseInt(f || "0", 10), 0, 59), x = wn(p);
    c(x), t == null || t(`${a || "00"}:${x}`);
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
const kn = {
  cyan: { background: "var(--j-accent-12)", color: "var(--j-cyan)", border: "1px solid var(--j-accent-35)" },
  amber: { background: "var(--j-warn-12)", color: "var(--j-amber)", border: "1px solid var(--j-warn-25)" },
  red: { background: "var(--j-err-12)", color: "var(--j-red)", border: "1px solid var(--j-err-25)" },
  green: { background: "var(--j-ok-12)", color: "var(--j-green)", border: "1px solid var(--j-ok-25)" },
  ghost: { background: "var(--j-accent-05)", color: "var(--j-text-muted)", border: "1px solid var(--j-border-dim)" },
  blue: { background: "var(--j-accent-12)", color: "var(--j-accent)", border: "1px solid var(--j-accent-35)" },
  white: { background: "var(--j-accent-05)", color: "var(--j-text-primary)", border: "1px solid var(--j-border)" }
}, Sn = {
  xs: { fontSize: 8, padding: "2px 7px" },
  sm: { fontSize: 9, padding: "3px 9px" },
  md: { fontSize: 10, padding: "4px 12px" },
  lg: { fontSize: 11, padding: "5px 14px" },
  xl: { fontSize: 12, padding: "6px 16px" }
}, Es = {
  angular: { clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" },
  hex: { clipPath: "polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)", paddingLeft: 14, paddingRight: 14 },
  diamond: { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0 },
  pill: { borderRadius: "999px" }
}, Fs = {
  amber: { background: "var(--j-amber)" },
  red: { background: "var(--j-red)" },
  green: { background: "var(--j-green)" }
};
function Sr({ color: e = "cyan", size: t = "sm", shape: n = "angular", blink: r = !1, showDot: a = !1, children: i }) {
  const s = {
    display: "inline-flex",
    alignItems: "center",
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    fontFamily: "'Courier New', monospace",
    ...kn[e] ?? kn.cyan,
    ...Sn[t] ?? Sn.sm,
    ...Es[n]
  };
  return /* @__PURE__ */ g("span", { className: r ? "j-blink" : void 0, style: s, children: [
    a && /* @__PURE__ */ o(
      "span",
      {
        className: "j-status-dot",
        style: { marginRight: 5, display: "inline-block", flexShrink: 0, ...Fs[e] ?? {} }
      }
    ),
    i
  ] });
}
const Nn = {
  active: { bg: "var(--j-accent-08)", accent: "var(--j-accent)" },
  processing: { bg: "var(--j-accent-08)", accent: "var(--j-accent)" },
  warning: { bg: "var(--j-warn-05)", accent: "var(--j-warn)" },
  error: { bg: "var(--j-err-05)", accent: "var(--j-err)" },
  success: { bg: "var(--j-ok-05)", accent: "var(--j-ok)" },
  idle: { bg: "var(--j-accent-05)", accent: "var(--j-accent-18)" }
}, As = {
  warning: { background: "var(--j-amber)", animationDuration: "1.8s" },
  error: { background: "var(--j-red)", animationDuration: "0.7s" },
  success: { background: "var(--j-green)", animationDuration: "2.5s" },
  idle: { background: "var(--j-accent-25)", animation: "none" }
};
function Ys({ state: e = "active", blink: t = !1, children: n }) {
  const { bg: r, accent: a } = Nn[e] ?? Nn.active;
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
        /* @__PURE__ */ o("span", { className: "j-status-dot", style: As[e] }),
        /* @__PURE__ */ o("span", { style: { fontSize: 11, letterSpacing: "0.08em", color: a }, children: n })
      ]
    }
  );
}
const Mn = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10], zs = {
  warning: "var(--j-amber)",
  error: "var(--j-red)",
  success: "var(--j-green)"
}, Bs = {
  height: 5,
  background: "var(--j-accent-08)",
  clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
  position: "relative",
  overflow: "hidden"
};
function Rs({
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
    const l = Math.round(e / 100 * s), d = zs[n];
    return /* @__PURE__ */ g("div", { children: [
      c,
      /* @__PURE__ */ o("div", { className: "j-tick-row", children: Array.from({ length: s }, (h, u) => /* @__PURE__ */ o(
        "div",
        {
          className: `j-tk${u < l ? "" : " off"}`,
          style: { height: Mn[u % Mn.length], ...d ? { background: d } : {} }
        },
        u
      )) })
    ] });
  }
  return /* @__PURE__ */ g("div", { children: [
    c,
    /* @__PURE__ */ o("div", { style: Bs, children: a ? /* @__PURE__ */ g(B, { children: [
      /* @__PURE__ */ o("div", { style: { position: "absolute", inset: 0, background: "var(--j-accent)", opacity: 0.15, clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)" } }),
      /* @__PURE__ */ o("div", { style: { position: "absolute", top: 0, left: -40, bottom: 0, width: 40, background: "linear-gradient(90deg, transparent, var(--j-accent), transparent)", animation: "j-scan-h 1.4s ease-in-out infinite" } })
    ] }) : /* @__PURE__ */ o("div", { style: { width: `${e}%`, height: "100%", background: "linear-gradient(90deg, var(--j-accent-deep), var(--j-accent))", clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)", transition: "width 0.6s ease-out" } }) })
  ] });
}
const Dn = {
  width: 5,
  height: 5,
  flexShrink: 0,
  background: "var(--j-accent)",
  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  boxShadow: "0 0 6px var(--j-accent)"
};
function kl({ orientation: e = "horizontal", label: t, showDot: n = !0, height: r = "40px", margin: a = "8px 0", opacity: i = 0.3 }) {
  const s = "var(--j-accent)";
  return e === "vertical" ? /* @__PURE__ */ g("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", height: r, margin: "0 8px" }, children: [
    /* @__PURE__ */ o("div", { style: { flex: 1, width: 1, background: `linear-gradient(180deg, transparent, ${s})`, opacity: i } }),
    n && /* @__PURE__ */ o("div", { style: { ...Dn, margin: "6px 0" } }),
    /* @__PURE__ */ o("div", { style: { flex: 1, width: 1, background: `linear-gradient(180deg, ${s}, transparent)`, opacity: i } })
  ] }) : /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", margin: a, width: "100%" }, children: [
    /* @__PURE__ */ o("div", { style: { flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${s})`, opacity: i } }),
    t ? /* @__PURE__ */ o("span", { style: { fontSize: 8, color: s, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0 10px", opacity: 0.7, whiteSpace: "nowrap" }, children: t }) : n && /* @__PURE__ */ o("div", { style: { ...Dn, margin: "0 8px" } }),
    /* @__PURE__ */ o("div", { style: { flex: 1, height: 1, background: `linear-gradient(90deg, ${s}, transparent)`, opacity: i } })
  ] });
}
function Sl({ variant: e = "chip", text: t, subText: n, value: r, color: a = "cyan", showDot: i = !0, showLine: s = !0 }) {
  const c = q.cls("j-hl", `j-hl-${e}`, q.color(a));
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
const Cn = {
  active: "var(--j-accent)",
  processing: "var(--j-accent)",
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "var(--j-accent-35)"
}, On = {
  active: "var(--j-accent-05)",
  processing: "var(--j-accent-05)",
  warning: "var(--j-warn-05)",
  error: "var(--j-err-05)",
  success: "var(--j-ok-05)",
  idle: "var(--j-accent-05)"
}, Hs = {
  warning: "⚠",
  error: "✕",
  success: "✓"
}, Js = {
  error: "j-pulse 0.8s ease-in-out infinite",
  warning: "j-pulse 1.5s ease-in-out infinite"
};
function Nl({ state: e = "active", title: t, children: n, dismissible: r = !1, blink: a = !1, onDismiss: i }) {
  const [s, c] = $(!0);
  if (!s) return null;
  const l = Cn[e] ?? Cn.active, d = On[e] ?? On.active, h = Hs[e] ?? "ℹ", u = Js[e];
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
const Gs = {
  warning: "linear-gradient(90deg, var(--j-warn-12), var(--j-warn))",
  error: "linear-gradient(90deg, var(--j-err-12),  var(--j-err))",
  success: "linear-gradient(90deg, var(--j-ok-12),   var(--j-ok))"
}, Ls = {
  warning: "var(--j-amber)",
  error: "var(--j-red)",
  success: "var(--j-green)"
};
function qs({ label: e, value: t, barPercent: n, state: r = "active" }) {
  const a = Gs[r], i = Ls[r];
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
function rt(e) {
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
function Ml({ open: e, onClose: t, title: n, subTitle: r, closable: a = !0, closeOnBackdrop: i = !0, width: s = "480px", notchSize: c = "18px", children: l, footer: d }) {
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
  return Gn(
    /* @__PURE__ */ g(B, { children: [
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
        /* @__PURE__ */ o("div", { style: rt({ top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 }) }),
        /* @__PURE__ */ o("div", { style: rt({ top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 }) }),
        /* @__PURE__ */ o("div", { style: rt({ bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 }) }),
        /* @__PURE__ */ o("div", { style: rt({ bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 }) }),
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
const Nr = we(null);
function Dl() {
  const e = xe(Nr);
  if (!e) throw new Error("useToast must be used within JToastProvider");
  return e;
}
const Wn = {
  active: "var(--j-accent)",
  processing: "var(--j-accent)",
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "var(--j-accent)"
}, Xs = {
  warning: "⚠",
  error: "✕",
  success: "✓"
}, Vs = {
  error: "j-pulse 0.7s ease-in-out infinite",
  warning: "j-pulse 1.3s ease-in-out infinite"
};
function Us({ id: e, state: t, message: n, title: r, duration: a, onDismiss: i }) {
  const s = Wn[t] ?? Wn.active, c = Xs[t] ?? "ℹ", l = Vs[t];
  return U(() => {
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
function Cl({ children: e }) {
  const [t, n] = $([]), r = L(0);
  function a(s, c, l, d = 4e3) {
    const h = `toast-${++r.current}`;
    return n((u) => [...u, { id: h, state: s, message: c, title: l, duration: d }]), h;
  }
  function i(s) {
    n((c) => c.filter((l) => l.id !== s));
  }
  return /* @__PURE__ */ g(Nr.Provider, { value: { show: a, dismiss: i }, children: [
    e,
    /* @__PURE__ */ o("div", { style: { position: "fixed", bottom: 24, right: 24, zIndex: 2e3, display: "flex", flexDirection: "column-reverse", gap: 8, pointerEvents: "none", width: 320 }, children: t.map((s) => /* @__PURE__ */ o(Us, { ...s, onDismiss: () => i(s.id) }, s.id)) })
  ] });
}
const Ks = {
  warning: "j-text-warn",
  error: "j-text-err",
  success: "j-text-ok"
}, Qs = {
  warning: { background: "var(--j-amber)" },
  error: { background: "var(--j-red)" },
  success: { background: "var(--j-green)" }
};
function Ol({
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
  const p = q.cls("j-text-val", Ks[s] ?? null), x = Qs[s];
  return /* @__PURE__ */ g(Fa, { cardStyle: e, color: t, padding: n, children: [
    /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }, children: [
      /* @__PURE__ */ o("div", { className: "j-text-xs", children: r }),
      c && /* @__PURE__ */ o(Sr, { color: l, size: "xs", children: c })
    ] }),
    /* @__PURE__ */ o("div", { className: p, children: a }),
    i && /* @__PURE__ */ g("div", { className: "j-text-sub", style: { display: "flex", alignItems: "center", gap: 4 }, children: [
      d && /* @__PURE__ */ o("span", { className: "j-status-dot", style: x }),
      i
    ] }),
    h !== void 0 && /* @__PURE__ */ o("div", { style: { marginTop: 8 }, children: /* @__PURE__ */ o(Rs, { value: h, variant: "bar", showPercent: !1 }) }),
    u && u.length > 0 && /* @__PURE__ */ o("div", { style: { marginTop: 8 }, children: u.map((y) => /* @__PURE__ */ o(qs, { label: y.label, value: y.value, barPercent: y.barPercent }, y.label)) }),
    f
  ] });
}
const Mr = we(null);
function Zs() {
  return xe(Mr);
}
function Wl({ activeTab: e, onTabChange: t, children: n }) {
  var h;
  const r = [];
  ga.forEach(n, (u) => {
    if (ya(u) && u.type._isJTab) {
      const f = u.props;
      r.push({ key: f.tabKey, label: f.label, icon: f.icon, badge: f.badge, disabled: f.disabled });
    }
  });
  const [a, i] = $(null), s = ((h = r.find((u) => !u.disabled)) == null ? void 0 : h.key) ?? "", c = e ?? a ?? s;
  function l(u) {
    e === void 0 && i(u), t == null || t(u);
  }
  function d(u, f) {
    var w, v, b, j, M;
    const p = r.filter((S) => !S.disabled), x = p.findIndex((S) => S.key === f);
    let y;
    if (u.key === "ArrowRight") y = (w = p[(x + 1) % p.length]) == null ? void 0 : w.key;
    else if (u.key === "ArrowLeft") y = (v = p[(x - 1 + p.length) % p.length]) == null ? void 0 : v.key;
    else if (u.key === "Home") y = (b = p[0]) == null ? void 0 : b.key;
    else if (u.key === "End") y = (j = p[p.length - 1]) == null ? void 0 : j.key;
    else return;
    u.preventDefault(), y && (l(y), (M = document.getElementById(`tab-${y}`)) == null || M.focus());
  }
  return /* @__PURE__ */ g(Mr.Provider, { value: { activeTab: c, selectTab: l }, children: [
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
              onKeyDown: (p) => d(p, u.key),
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
function ec({ tabKey: e, children: t }) {
  const n = Zs();
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
ec._isJTab = !0;
function tc(e, t) {
  return e === "warning" ? "var(--j-warn)" : e === "error" ? "var(--j-err)" : e === "success" ? "var(--j-ok)" : t === "amber" ? "var(--j-warn)" : t === "red" ? "var(--j-err)" : "var(--j-accent)";
}
function $l({
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
  const [d, h] = $(r), u = Jn(), f = a !== void 0 ? a : d, p = tc(s, c);
  function x() {
    const y = !f;
    a === void 0 && h(y), i == null || i(y);
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
        onClick: x,
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
            background: p,
            boxShadow: `0 0 8px ${p}`,
            clipPath: "polygon(0 6px, 2px 0, 2px 100%, 0 calc(100% - 6px))"
          } }),
          t && /* @__PURE__ */ o("span", { style: {
            fontStyle: "normal",
            fontSize: 13,
            color: p,
            filter: `drop-shadow(0 0 4px ${p})`,
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
            color: p,
            background: `${p}18`,
            padding: "1px 6px",
            clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)"
          }, children: n }),
          /* @__PURE__ */ o("div", { style: {
            width: 8,
            height: 8,
            background: p,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            opacity: f ? 1 : 0.4,
            transform: f ? "rotate(0deg)" : "rotate(45deg)",
            boxShadow: f ? `0 0 8px ${p}` : "none",
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
            background: `linear-gradient(90deg, transparent, ${p}, transparent)`,
            animation: "j-scan-v 3s ease-in-out infinite",
            pointerEvents: "none"
          } }),
          l
        ]
      }
    )
  ] });
}
function nc(e, t, n) {
  const r = Math.floor(n / 2);
  let a = Math.max(1, e - r), i = Math.min(t, a + n - 1);
  a = Math.max(1, i - n + 1);
  const s = [];
  a > 1 && (s.push(1), a > 2 && s.push(-1));
  for (let c = a; c <= i; c++) s.push(c);
  return i < t && (i < t - 1 && s.push(-1), s.push(t)), s;
}
const Dr = {
  padding: "5px 10px",
  fontSize: 11,
  fontFamily: "'Courier New', monospace",
  letterSpacing: "0.08em",
  clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
  cursor: "pointer",
  transition: "all 0.15s",
  border: "none"
};
function at(e) {
  return {
    ...Dr,
    background: "transparent",
    border: `1px solid ${e ? "var(--j-accent-08)" : "var(--j-accent-18)"}`,
    color: e ? "var(--j-accent-18)" : "var(--j-text-muted)",
    cursor: e ? "not-allowed" : "pointer"
  };
}
function rc(e) {
  return {
    ...Dr,
    background: e ? "var(--j-accent-12)" : "transparent",
    border: `1px solid ${e ? "var(--j-accent)" : "var(--j-accent-18)"}`,
    color: e ? "var(--j-accent)" : "var(--j-text-muted)",
    boxShadow: e ? "0 0 8px var(--j-accent-44)" : "none"
  };
}
function Tl({
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
        r && /* @__PURE__ */ o("button", { type: "button", disabled: s, onClick: () => l(1), style: at(s), children: "«" }),
        /* @__PURE__ */ o("button", { type: "button", disabled: s, onClick: () => l(e - 1), style: at(s), children: "‹" }),
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
                onKeyDown: (p) => {
                  (p.key === "Enter" || p.key === " ") && (p.preventDefault(), l(u));
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
          /* @__PURE__ */ o(B, { children: nc(e, n, i).map(
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
                style: rc(d === e),
                children: d
              },
              d
            )
          ) })
        ),
        /* @__PURE__ */ o("button", { type: "button", disabled: c, onClick: () => l(e + 1), style: at(c), children: "›" }),
        r && /* @__PURE__ */ o("button", { type: "button", disabled: c, onClick: () => l(n), style: at(c), children: "»" }),
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
const $n = [6, 10, 14, 14, 10, 6, 8, 12, 16, 16, 12, 8];
function _l({
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
    const p = f < e, x = f === e - 1 && e > 0, y = $n[f % $n.length], w = d ? { width: y, height: 4 } : { width: c, height: y };
    let v, b, j;
    return x ? (v = "linear-gradient(0deg, var(--j-accent-12), var(--j-accent))", b = "0 0 10px var(--j-accent), 0 0 20px var(--j-accent-25)", j = "j-pulse 0.6s ease-in-out infinite") : p ? (v = "var(--j-accent)", b = "0 0 5px var(--j-accent-25)", j = void 0) : (v = "var(--j-accent-05)", b = "none", j = void 0), {
      ...w,
      background: v,
      boxShadow: b,
      clipPath: "polygon(1px 15%, 100% 0, 100% 100%, 1px 85%)",
      transition: "background 0.1s, box-shadow 0.1s",
      ...j ? { animation: j } : {}
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
    /* @__PURE__ */ o("div", { style: d ? { display: "flex", flexDirection: "column-reverse", alignItems: "center", gap: l } : { display: "flex", alignItems: "flex-end", gap: l }, children: Array.from({ length: t }, (f, p) => /* @__PURE__ */ o("div", { "data-testid": `arc-seg-${p}`, style: h(p) }, p)) }),
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
const Tn = [6, 14, 22, 18, 28, 20, 30, 24, 28, 22, 16, 20, 26, 18, 12, 22, 28, 18, 10, 14], _n = [".4s", ".5s", ".6s", ".4s", ".7s", ".5s", ".6s", ".4s", ".8s", ".5s"];
function Il({
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
          height: `${Tn[a % Tn.length]}px`,
          background: "var(--j-accent)",
          "--j-wv-dur": _n[a % _n.length],
          "--j-wv-dly": `${(a * 0.04).toFixed(2)}s`,
          ...n ? {} : { transform: "scaleY(0.15)", animationPlayState: "paused" }
        };
        return /* @__PURE__ */ o("div", { className: "j-wv", style: i }, a);
      })
    }
  );
}
function ac(e) {
  return e === "processing" ? { r1: "2s", r2: "1.2s", r3: "1.8s" } : e === "idle" ? { r1: "8s", r2: "6s", r3: "9s" } : { r1: "4s", r2: "3s", r3: "5s" };
}
function oc(e, t) {
  return e === "idle" ? "Idle" : e === "processing" ? "Processing" : e === "warning" ? "Warning" : e === "error" ? "Error" : t ? "Listening" : "Online";
}
const ic = Array.from({ length: 12 }, (e, t) => t * 30);
function Pl({
  systemName: e = "JARVIS",
  size: t = "160px",
  state: n = "active",
  listening: r = !1,
  onClick: a
}) {
  const i = ac(n), s = oc(n, r);
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
        ic.map((c) => {
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
const sc = 80, cc = 28, Cr = 2, Gt = 3, lc = sc - Cr * 2, It = cc - Gt * 2, In = Gt + It;
function dc(e) {
  if (e.length === 0) return [];
  const t = Math.min(...e), n = Math.max(...e), r = n - t === 0 ? 1 : n - t;
  return e.map((a, i) => ({
    x: Cr + i * (lc / Math.max(e.length - 1, 1)),
    y: Gt + It - It * (a - t) / r
  }));
}
function uc(e, t) {
  if (t !== "auto") return t;
  if (e.length < 2) return "flat";
  const n = Math.min(...e), a = Math.max(...e) - n, i = e[e.length - 1];
  return i > e[0] + a * 0.05 ? "up" : i < e[0] - a * 0.05 ? "down" : "flat";
}
function El({
  data: e,
  width: t = "80px",
  height: n = "28px",
  showArea: r = !0,
  showTrend: a = !1,
  trend: i = "auto",
  colorVar: s
}) {
  const c = dc(e), l = uc(e, i), h = `var(${s ?? (l === "up" ? "--j-ok" : l === "down" ? "--j-err" : "--j-accent")})`, u = c.map((w) => `${w.x.toFixed(1)},${w.y.toFixed(1)}`).join(" "), f = l === "up" ? "▲" : l === "down" ? "▼" : "─", p = l === "up" ? "j-text-ok" : l === "down" ? "j-text-err" : "j-text-accent";
  let x = "";
  if (c.length >= 2) {
    x = `M ${c[0].x.toFixed(1)} ${In} L ${c[0].x.toFixed(1)} ${c[0].y.toFixed(1)}`;
    for (let w = 1; w < c.length; w++)
      x += ` L ${c[w].x.toFixed(1)} ${c[w].y.toFixed(1)}`;
    x += ` L ${c[c.length - 1].x.toFixed(1)} ${In} Z`;
  }
  const y = c[c.length - 1];
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
                  d: x,
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
              y && /* @__PURE__ */ o(
                "circle",
                {
                  cx: y.x,
                  cy: y.y,
                  r: 2,
                  className: "j-sparkline-dot",
                  style: { fill: h }
                }
              )
            ]
          }
        ),
        a && /* @__PURE__ */ o("span", { className: `j-sparkline-trend ${p}`, children: f })
      ]
    }
  );
}
const Pt = 400, Je = 220, me = 36, Or = 8, Ge = 12, Wr = 22, ot = 6, it = Pt - me - Or, st = Je - Ge - Wr;
function ct(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(1);
}
function Fl({
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
        viewBox: `0 0 ${Pt} ${Je}`,
        preserveAspectRatio: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: r === "vertical" ? /* @__PURE__ */ g(B, { children: [
          a && Array.from({ length: c + 1 }, (h, u) => {
            const f = Ge + u * (st / c), p = l - u * (l / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ o(
                "line",
                {
                  x1: me,
                  y1: f,
                  x2: Pt - Or,
                  y2: f,
                  className: "j-chart-grid"
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: me - 4,
                  y: f + 3,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: ct(p)
                }
              )
            ] }, `grid-${u}`);
          }),
          e.map((h, u) => {
            const f = it / e.length - ot, p = l > 0 ? st * (h.value / l) : 0, x = me + u * (it / e.length) + ot / 2, y = Ge + st - p;
            return /* @__PURE__ */ g("g", { className: "j-chart-bar-group", children: [
              /* @__PURE__ */ o(
                "polygon",
                {
                  points: `${x},${y + 6} ${x + 4},${y} ${x + f - 4},${y} ${x + f},${y + 6}`,
                  style: { fill: d }
                }
              ),
              /* @__PURE__ */ o(
                "rect",
                {
                  x,
                  y: y + 5,
                  width: f,
                  height: Math.max(p - 5, 0),
                  className: "j-chart-bar",
                  style: { fill: d },
                  children: /* @__PURE__ */ o("title", { children: `${h.label}: ${h.value}` })
                }
              ),
              /* @__PURE__ */ o(
                "rect",
                {
                  x,
                  y: y + 5,
                  width: f,
                  height: Math.max(p - 5, 0),
                  className: "j-chart-bar-glow",
                  style: { fill: d }
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: x + f / 2,
                  y: Je - 2,
                  className: "j-chart-axis-label",
                  textAnchor: "middle",
                  children: h.label
                }
              ),
              s && p > 10 && /* @__PURE__ */ o(
                "text",
                {
                  x: x + f / 2,
                  y: y - 3,
                  className: "j-chart-value-label",
                  textAnchor: "middle",
                  children: ct(h.value)
                }
              )
            ] }, u);
          })
        ] }) : /* @__PURE__ */ g(B, { children: [
          a && Array.from({ length: c + 1 }, (h, u) => {
            const f = me + u * (it / c), p = u * (l / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ o(
                "line",
                {
                  x1: f,
                  y1: Ge,
                  x2: f,
                  y2: Je - Wr,
                  className: "j-chart-grid"
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: f,
                  y: Je - 2,
                  className: "j-chart-axis-label",
                  textAnchor: "middle",
                  children: ct(p)
                }
              )
            ] }, `grid-${u}`);
          }),
          e.map((h, u) => {
            const f = st / e.length, p = f - ot, x = l > 0 ? it * (h.value / l) : 0, y = Ge + u * f + ot / 2;
            return /* @__PURE__ */ g("g", { className: "j-chart-bar-group", children: [
              /* @__PURE__ */ o(
                "rect",
                {
                  x: me,
                  y,
                  width: x,
                  height: p,
                  className: "j-chart-bar",
                  style: { fill: d },
                  children: /* @__PURE__ */ o("title", { children: `${h.label}: ${h.value}` })
                }
              ),
              /* @__PURE__ */ o(
                "rect",
                {
                  x: me,
                  y,
                  width: x,
                  height: p,
                  className: "j-chart-bar-glow",
                  style: { fill: d }
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: me - 4,
                  y: y + p / 2 + 4,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: h.label
                }
              ),
              s && /* @__PURE__ */ o(
                "text",
                {
                  x: me + x + 4,
                  y: y + p / 2 + 4,
                  className: "j-chart-value-label",
                  textAnchor: "start",
                  children: ct(h.value)
                }
              )
            ] }, u);
          })
        ] })
      }
    )
  ] });
}
const Et = 400, Ft = 200, ht = 36, $r = 8, Le = 10, fc = 20, hc = Et - ht - $r, ze = Ft - Le - fc;
function pc(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(1);
}
function Al({
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
  const l = e.map((w) => w.value), d = Math.min(...l), h = Math.max(...l), u = h - d === 0 ? 1 : h - d, f = `var(${n})`, p = e.map((w, v) => ({
    x: ht + v * (hc / Math.max(e.length - 1, 1)),
    y: Le + ze - ze * (w.value - d) / u
  })), x = p.map((w) => `${w.x.toFixed(1)},${w.y.toFixed(1)}`).join(" ");
  let y = "";
  if (p.length >= 2) {
    y = `M ${p[0].x.toFixed(1)} ${Le + ze}`;
    for (const w of p) y += ` L ${w.x.toFixed(1)} ${w.y.toFixed(1)}`;
    y += ` L ${p[p.length - 1].x.toFixed(1)} ${Le + ze} Z`;
  }
  return /* @__PURE__ */ g("div", { className: "j-chart-wrap", style: { height: t, position: "relative" }, children: [
    /* @__PURE__ */ o("div", { className: "j-chart-scan" }),
    /* @__PURE__ */ g(
      "svg",
      {
        className: "j-chart-svg",
        viewBox: `0 0 ${Et} ${Ft}`,
        preserveAspectRatio: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          s && Array.from({ length: c + 1 }, (w, v) => {
            const b = Le + v * (ze / c), j = h - v * (u / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ o(
                "line",
                {
                  x1: ht,
                  y1: b,
                  x2: Et - $r,
                  y2: b,
                  className: "j-chart-grid"
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: ht - 4,
                  y: b + 3,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: pc(j)
                }
              )
            ] }, `grid-${v}`);
          }),
          r && p.length >= 2 && /* @__PURE__ */ o("path", { d: y, className: "j-chart-area", style: { fill: f } }),
          p.length >= 2 && /* @__PURE__ */ o(
            "polyline",
            {
              points: x,
              className: "j-chart-line",
              style: { stroke: f, fill: "none" }
            }
          ),
          a && p.map((w, v) => /* @__PURE__ */ o(
            "circle",
            {
              cx: w.x,
              cy: w.y,
              r: 3,
              className: "j-chart-dot",
              style: { fill: f }
            },
            v
          )),
          i && e.map((w, v) => /* @__PURE__ */ o(
            "text",
            {
              x: p[v].x,
              y: Ft - 2,
              className: "j-chart-axis-label",
              textAnchor: "middle",
              children: w.label
            },
            `xlbl-${v}`
          ))
        ]
      }
    )
  ] });
}
const Te = 50, Wt = 50;
function Yl({
  data: e,
  size: t = "160px",
  thickness: n = 20,
  centerValue: r = "",
  centerLabel: a = "",
  showLegend: i = !0
}) {
  const s = Te - n / 2 - 2, c = 2 * Math.PI * s, l = e.reduce((u, f) => u + f.value, 0);
  let d = -90;
  const h = e.map((u) => {
    const f = l > 0 ? u.value / l : 0, p = f * c, x = c - p, y = d;
    return d += f * 360, { seg: u, dash: p, gap: x, rotate: y };
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
              cx: Te,
              cy: Wt,
              r: s,
              fill: "none",
              stroke: "var(--j-accent-10)",
              strokeWidth: n
            }
          ),
          l > 0 && h.map(({ seg: u, dash: f, gap: p, rotate: x }, y) => /* @__PURE__ */ o(
            "circle",
            {
              cx: Te,
              cy: Wt,
              r: s,
              fill: "none",
              stroke: u.color ?? "var(--j-accent)",
              strokeWidth: n,
              strokeDasharray: `${f.toFixed(2)} ${p.toFixed(2)}`,
              transform: `rotate(${x} ${Te} ${Wt})`,
              className: "j-chart-donut-seg"
            },
            y
          )),
          r && /* @__PURE__ */ o(
            "text",
            {
              x: Te,
              y: a ? 46 : 54,
              textAnchor: "middle",
              className: "j-chart-donut-center-val",
              children: r
            }
          ),
          a && /* @__PURE__ */ o(
            "text",
            {
              x: Te,
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
const ge = 100, Ce = 95, ue = 72, lt = 210, dt = 120;
function gt(e) {
  return e * Math.PI / 180;
}
function Pn(e, t) {
  if (t <= 0) return "";
  const n = gt(e), r = gt(e + t), a = ge + ue * Math.cos(n), i = Ce + ue * Math.sin(n), s = ge + ue * Math.cos(r), c = Ce + ue * Math.sin(r), l = t > 180 ? 1 : 0;
  return `M ${a.toFixed(2)} ${i.toFixed(2)} A ${ue} ${ue} 0 ${l} 1 ${s.toFixed(2)} ${c.toFixed(2)}`;
}
function $t(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(0);
}
function zl({
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
  const f = Math.max(0, Math.min(1, (e - t) / (n - t || 1))), p = `var(${a})`, x = dt * f, y = gt(lt + f * dt), w = ge + (ue - 2) * Math.cos(y), v = Ce + (ue - 2) * Math.sin(y), b = ue - i / 2 - 2, j = ue + i / 2 + 4;
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
            d: Pn(lt, dt),
            fill: "none",
            stroke: "var(--j-accent-10)",
            strokeWidth: i,
            strokeLinecap: "round"
          }
        ),
        x > 0 && /* @__PURE__ */ o(
          "path",
          {
            d: Pn(lt, x),
            fill: "none",
            stroke: p,
            strokeWidth: i,
            strokeLinecap: "round",
            className: "j-chart-gauge-arc"
          }
        ),
        d && Array.from({ length: u + 1 }, (M, S) => {
          const m = gt(lt + S / u * dt);
          return /* @__PURE__ */ o(
            "line",
            {
              x1: ge + b * Math.cos(m),
              y1: Ce + b * Math.sin(m),
              x2: ge + j * Math.cos(m),
              y2: Ce + j * Math.sin(m),
              stroke: p,
              strokeWidth: 1,
              className: "j-chart-gauge-tick"
            },
            S
          );
        }),
        l && /* @__PURE__ */ g(B, { children: [
          /* @__PURE__ */ o(
            "line",
            {
              x1: ge,
              y1: Ce,
              x2: w,
              y2: v,
              stroke: p,
              strokeWidth: 2,
              strokeLinecap: "round",
              className: "j-chart-gauge-needle"
            }
          ),
          /* @__PURE__ */ o(
            "circle",
            {
              cx: ge,
              cy: Ce,
              r: 5,
              fill: p,
              className: "j-chart-gauge-hub"
            }
          )
        ] }),
        /* @__PURE__ */ o(
          "text",
          {
            x: ge,
            y: 100,
            textAnchor: "middle",
            className: "j-chart-donut-center-val",
            style: { fontFamily: "'Courier New', monospace" },
            children: c ?? $t(e)
          }
        ),
        s && /* @__PURE__ */ o(
          "text",
          {
            x: ge,
            y: 114,
            textAnchor: "middle",
            className: "j-chart-donut-center-lbl",
            style: { fontFamily: "'Courier New', monospace" },
            children: s
          }
        ),
        h && /* @__PURE__ */ g(B, { children: [
          /* @__PURE__ */ o(
            "text",
            {
              x: 14,
              y: 114,
              textAnchor: "start",
              className: "j-chart-axis-label",
              children: $t(t)
            }
          ),
          /* @__PURE__ */ o(
            "text",
            {
              x: 186,
              y: 114,
              textAnchor: "end",
              className: "j-chart-axis-label",
              children: $t(n)
            }
          )
        ] })
      ]
    }
  ) });
}
const Tr = 100, _r = 100, Be = 78;
function mc(e) {
  return e * Math.PI / 180;
}
function gc(e, t) {
  return mc(360 * e / t - 90);
}
function pt(e, t, n) {
  const r = gc(e, t);
  return [Tr + n * Math.cos(r), _r + n * Math.sin(r)];
}
function En(e, t, n) {
  const [r, a] = pt(e, t, n);
  return `${r.toFixed(2)},${a.toFixed(2)}`;
}
function Fn(e) {
  return Math.max(0, Math.min(1, e));
}
function Bl({
  axes: e,
  size: t = "200px",
  colorVar: n = "--j-accent",
  rings: r = 4,
  showLabels: a = !0
}) {
  const i = Math.max(e.length, 3), s = `var(${n},var(--j-accent))`, c = Array.from({ length: r }, (f, p) => {
    const x = Be * (p + 1) / r, y = Array.from({ length: i }, (w, v) => En(v, i, x)).join(" ");
    return /* @__PURE__ */ o("polygon", { points: y, className: "j-chart-radar-web" }, p);
  }), l = Array.from({ length: i }, (f, p) => {
    const [x, y] = pt(p, i, Be);
    return /* @__PURE__ */ o(
      "line",
      {
        x1: Tr,
        y1: _r,
        x2: x,
        y2: y,
        className: "j-chart-radar-spoke"
      },
      p
    );
  }), d = e.map((f, p) => {
    const x = Fn(f.value / ((f.max ?? 100) || 1));
    return En(p, i, Be * x);
  }).join(" "), h = e.map((f, p) => {
    const x = Fn(f.value / ((f.max ?? 100) || 1)), [y, w] = pt(p, i, Be * x);
    return /* @__PURE__ */ o(
      "circle",
      {
        cx: y,
        cy: w,
        r: 3,
        className: "j-chart-dot",
        style: { fill: s }
      },
      p
    );
  }), u = a ? e.map((f, p) => {
    const [x, y] = pt(p, i, Be + 14), w = x < 98 ? "end" : x > 102 ? "start" : "middle";
    return /* @__PURE__ */ o(
      "text",
      {
        x,
        y: y + 4,
        className: "j-chart-axis-label",
        textAnchor: w,
        children: f.label
      },
      p
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
const An = [
  "> LOADING NEURAL CORE............. [OK]",
  "> SPEECH ENGINE INIT.............. [OK]",
  "> SKILL REGISTRY SCAN............. [12 FOUND]",
  "> OLLAMA BRIDGE................... [CONNECTED]",
  "> VOICE PIPELINE.................. [READY]",
  "> MEMORY SUBSYSTEM................ [OK]",
  "> HUD CALIBRATION................. [OK]",
  "> ALL SYSTEMS NOMINAL............. [GO]"
];
function Me(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Rl({
  systemName: e = "JARVIS",
  version: t = "v4.2.1",
  onComplete: n
}) {
  const [r, a] = $(!0), [i, s] = $(0), [c, l] = $(0), [d, h] = $(0);
  if (U(() => {
    let f = !1;
    async function p() {
      if (!f && (s(0), l(0), await Me(100), !f && (l(95), await Me(700), !f && (s(1), await Me(600), !f)))) {
        s(2);
        for (let x = 1; x <= An.length; x++) {
          if (f) return;
          h(x), await Me(180);
        }
        await Me(200), !f && (s(3), await Me(900), !f && (s(4), await Me(800), !f && (a(!1), n == null || n())));
      }
    }
    return p(), () => {
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
        i >= 2 && /* @__PURE__ */ o("div", { style: { position: "absolute", top: "30%", left: "10%", right: "10%" }, children: An.slice(0, d).map((f, p) => /* @__PURE__ */ o(
          "div",
          {
            "data-boot-line": "",
            style: {
              fontSize: 10,
              color: "var(--j-accent-mid)",
              letterSpacing: "0.10em",
              marginBottom: 4,
              animation: "j-slide-in 0.3s ease-out both",
              animationDelay: `${p * 0.12}s`
            },
            children: f
          },
          p
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
          /* @__PURE__ */ o("div", { "data-spinner": "", children: /* @__PURE__ */ o(At, { size: "80px", color: "cyan", label: e, showLabel: !0 }) }),
          /* @__PURE__ */ o("div", { style: {
            fontSize: 11,
            color: "var(--j-accent-mid)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            animation: "j-pulse 1.5s ease-in-out infinite"
          }, children: "INITIALISING SYSTEMS..." })
        ] }),
        i >= 4 && /* @__PURE__ */ g(B, { children: [
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
          /* @__PURE__ */ o("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0 }, children: /* @__PURE__ */ o(Xe, { position: "bottom", showWaveform: !0, showTicks: !0, showRec: !0 }) })
        ] })
      ]
    }
  );
}
const yc = {
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "var(--j-text-muted)",
  active: "var(--j-text-secondary)",
  processing: "var(--j-text-secondary)"
}, vc = {
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "transparent",
  active: "transparent",
  processing: "transparent"
}, bc = {
  warning: "amber",
  error: "red",
  success: "green",
  idle: "ghost",
  active: "cyan",
  processing: "cyan"
};
function xc(e, t) {
  if (!t) return "active";
  const n = String(e[t] ?? "").toLowerCase();
  return n === "warning" || n === "warn" ? "warning" : n === "error" || n === "danger" ? "error" : n === "success" || n === "ok" ? "success" : n === "idle" || n === "offline" ? "idle" : "active";
}
function Hl({
  columns: e,
  rows: t,
  stateColumn: n,
  showFooter: r = !0,
  footerLabel: a
}) {
  const [i, s] = $(-1), c = !t || t.length === 0;
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
        /* @__PURE__ */ o(At, { size: "24px", showLabel: !1 }),
        /* @__PURE__ */ o("span", { style: { fontSize: 10, color: "var(--j-text-dim)", letterSpacing: "0.10em" }, children: "NO DATA" })
      ] }) }) }) : t.map((l, d) => {
        const h = xc(l, n), u = d === i, f = u ? "var(--j-accent-05)" : d % 2 === 0 ? "transparent" : "var(--j-accent-05)", p = vc[h] ?? "transparent";
        return /* @__PURE__ */ o(
          "tr",
          {
            "data-state": h,
            style: { background: f, transition: "background 0.12s", borderLeft: `2px solid ${p === "transparent" && u ? "var(--j-accent-50)" : p}` },
            onMouseEnter: () => s(d),
            onMouseLeave: () => s(-1),
            children: e.map((y) => {
              const w = String(l[y.key] ?? ""), v = yc[h] ?? "var(--j-text-secondary)", b = {
                padding: "8px 14px",
                textAlign: y.align ?? "left",
                borderBottom: "1px solid var(--j-accent-05)",
                color: v
              };
              let j = w;
              return y.key === n ? j = /* @__PURE__ */ o(Ys, { state: h, children: w }) : y.isBadge && (j = /* @__PURE__ */ o(Sr, { color: bc[h] ?? "cyan", children: w })), /* @__PURE__ */ o("td", { style: b, children: j }, y.key);
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
function jc(e = "active") {
  return e === "warning" ? "var(--j-warn)" : e === "error" ? "var(--j-err)" : e === "success" ? "var(--j-ok)" : "var(--j-accent-mid)";
}
function Jl({
  visible: e,
  onClose: t,
  commands: n,
  onExecute: r,
  placeholder: a = "Type a command...",
  isListening: i = !1
}) {
  const [s, c] = $(""), [l, d] = $(0), h = L(null);
  U(() => {
    var S;
    e && (c(""), d(0), (S = h.current) == null || S.focus());
  }, [e]);
  const u = qe(() => {
    if (!s.trim()) return n;
    const S = s.toLowerCase();
    return n.filter(
      (m) => {
        var k;
        return m.label.toLowerCase().includes(S) || m.key.toLowerCase().includes(S) || (((k = m.description) == null ? void 0 : k.toLowerCase().includes(S)) ?? !1);
      }
    );
  }, [n, s]);
  function f(S) {
    c(S.target.value), d(0);
  }
  function p(S) {
    S.key === "ArrowDown" ? (S.preventDefault(), d((m) => Math.min(m + 1, u.length - 1))) : S.key === "ArrowUp" ? (S.preventDefault(), d((m) => Math.max(m - 1, 0))) : S.key === "Enter" ? u[l] && x(u[l]) : S.key === "Escape" && y();
  }
  function x(S) {
    r(S), y();
  }
  function y() {
    c(""), d(0), t();
  }
  function w() {
    var S;
    c(""), d(0), (S = h.current) == null || S.focus();
  }
  if (!e) return null;
  const v = [];
  let b;
  u.forEach((S, m) => {
    const k = S.group !== b;
    b = S.group, v.push({ cmd: S, idx: m, showGroup: k });
  });
  const j = {
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
  }, M = {
    ...j,
    left: "auto",
    right: 0,
    borderWidth: "2px 2px 0 0"
  };
  return /* @__PURE__ */ g(B, { children: [
    /* @__PURE__ */ o(
      "div",
      {
        "data-backdrop": "",
        onClick: y,
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
      /* @__PURE__ */ o("div", { style: j }),
      /* @__PURE__ */ o("div", { style: M }),
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
            onKeyDown: p,
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
      }, children: "NO COMMANDS FOUND" }) : v.map(({ cmd: S, idx: m, showGroup: k }) => {
        const N = m === l, C = jc(S.state ?? "active");
        return /* @__PURE__ */ g("div", { children: [
          k && S.group && /* @__PURE__ */ o("div", { "data-group-header": "", style: {
            padding: "6px 16px 2px",
            fontSize: 8,
            color: "var(--j-text-dim)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            userSelect: "none"
          }, children: S.group }),
          /* @__PURE__ */ g(
            "div",
            {
              "data-cmd": S.key,
              "data-selected": N ? "true" : "false",
              onClick: () => x(S),
              onMouseEnter: () => d(m),
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                cursor: "pointer",
                background: N ? "var(--j-accent-08)" : "transparent",
                borderLeft: `2px solid ${N ? C : "transparent"}`,
                transition: "background 0.1s"
              },
              children: [
                S.icon && /* @__PURE__ */ o("span", { style: { fontSize: 14, color: C, filter: `drop-shadow(0 0 4px ${C})`, flexShrink: 0 }, children: S.icon }),
                /* @__PURE__ */ g("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ o("div", { style: { fontSize: 11, color: N ? "var(--j-text-primary)" : "var(--j-text-secondary)", letterSpacing: "0.06em" }, children: S.label }),
                  S.description && /* @__PURE__ */ o("div", { style: { fontSize: 9, color: "var(--j-text-muted)", letterSpacing: "0.08em", marginTop: 1 }, children: S.description })
                ] }),
                N && /* @__PURE__ */ o("span", { style: { fontSize: 9, color: "var(--j-accent-mid)", letterSpacing: "0.10em", opacity: 0.7, flexShrink: 0 }, children: "ENTER" })
              ]
            }
          )
        ] }, S.key);
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
const Ir = we(null);
function wc() {
  return xe(Ir);
}
function kc(e) {
  return e === "warning" ? "var(--j-warn)" : e === "error" ? "var(--j-err)" : e === "success" ? "var(--j-ok)" : "var(--j-accent)";
}
function Sc(e) {
  return e === "warning" ? "var(--j-warn-25)" : e === "error" ? "var(--j-err-25)" : e === "success" ? "var(--j-ok-25)" : "var(--j-accent-25)";
}
function Nc(e) {
  return e === "warning" ? "var(--j-warn-12)" : e === "error" ? "var(--j-err-12)" : e === "success" ? "var(--j-ok-12)" : "var(--j-accent-12)";
}
function Mc(e, t) {
  const n = (e - 90) * Math.PI / 180;
  return {
    x: Math.round(t * Math.cos(n)),
    y: Math.round(t * Math.sin(n))
  };
}
function Gl({
  open: e,
  onOpenChange: t,
  triggerLabel: n = "MENU",
  radius: r = 90,
  centerSize: a = "64px",
  children: i
}) {
  const [s, c] = $([]), [l, d] = $(e ?? !1), [h, u] = $(null), [f, p] = $(null);
  U(() => {
    e !== void 0 && d(e);
  }, [e]);
  const x = E((v) => {
    c((b) => b.some((j) => j.key === v.key) ? b : [...b, v]);
  }, []);
  function y() {
    const v = !l;
    d(v), v || (u(null), p(null)), t == null || t(v);
  }
  function w() {
    d(!1), u(null), p(null), t == null || t(!1);
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
        /* @__PURE__ */ o(Ir.Provider, { value: x, children: i }),
        s.map((v) => {
          const { x: b, y: j } = Mc(v.angle, r), M = h === v.key, S = kc(v.state), m = Sc(v.state), k = Nc(v.state), N = l ? `translate(calc(-50% + ${b}px), calc(-50% + ${j}px))` : "translate(-50%, -50%)";
          return /* @__PURE__ */ g(
            "div",
            {
              "data-item-key": v.key,
              style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: N,
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
                opacity: l ? 1 : 0,
                cursor: "pointer",
                zIndex: 10
              },
              onMouseEnter: () => {
                u(v.key), p(v.label);
              },
              onMouseLeave: () => {
                u(null), p(null);
              },
              onClick: () => {
                v.onClick(), w();
              },
              children: [
                /* @__PURE__ */ o("div", { style: {
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: M ? k : "var(--j-bg-card)",
                  border: `1.5px solid ${M ? S : m}`,
                  boxShadow: M ? `0 0 16px ${m}, inset 0 0 12px ${k}` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                }, children: /* @__PURE__ */ o("span", { style: {
                  fontSize: 16,
                  fontStyle: "normal",
                  filter: M ? `drop-shadow(0 0 6px ${S})` : "none"
                }, children: v.icon }) }),
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
                      transform: `rotate(${v.angle - 90}deg)`,
                      background: `linear-gradient(90deg, ${m}, transparent)`,
                      opacity: M ? 0.8 : 0.2,
                      transition: "opacity 0.2s",
                      pointerEvents: "none"
                    }
                  }
                )
              ]
            },
            v.key
          );
        }),
        /* @__PURE__ */ g(
          "div",
          {
            "data-trigger": "",
            "data-open": l ? "true" : "false",
            onClick: y,
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
function Ll({
  icon: e = "⊞",
  label: t = "",
  angle: n = 0,
  state: r = "active",
  onClick: a
}) {
  const i = wc();
  return U(() => {
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
const Dc = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)",
  blue: "var(--j-accent)",
  white: "var(--j-text-primary)"
};
function ql({
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
  const [h, u] = $({ x: t, y: n }), [f, p] = $(!1), [x, y] = $(!1), w = L(null), v = L(null), b = Dc[a] ?? "var(--j-accent)", j = E((m) => {
    m.preventDefault(), w.current = { mx: m.clientX, my: m.clientY, px: h.x, py: h.y }, y(!0), m.target.setPointerCapture(m.pointerId);
  }, [h]), M = E((m) => {
    if (!w.current) return;
    const k = w.current.px + m.clientX - w.current.mx, N = w.current.py + m.clientY - w.current.my;
    u({ x: k, y: N }), d == null || d(k, N);
  }, [d]), S = E(() => {
    w.current = null, y(!1);
  }, []);
  return /* @__PURE__ */ g(
    "div",
    {
      ref: v,
      className: s,
      style: {
        position: "absolute",
        left: h.x,
        top: h.y,
        width: r,
        background: "var(--j-bg-card)",
        border: `1px solid ${b}`,
        boxShadow: `0 0 12px ${b}22`,
        fontFamily: "'Courier New', monospace",
        userSelect: "none",
        transition: x ? "none" : "box-shadow .2s",
        zIndex: x ? 100 : 10,
        clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
        ...c
      },
      onPointerMove: M,
      onPointerUp: S,
      children: [
        /* @__PURE__ */ g(
          "div",
          {
            onPointerDown: j,
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px 12px",
              background: `${b}18`,
              borderBottom: f ? "none" : `1px solid ${b}44`,
              cursor: x ? "grabbing" : "grab"
            },
            children: [
              /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", gap: 7 }, children: [
                /* @__PURE__ */ o("svg", { width: 8, height: 8, children: /* @__PURE__ */ o("rect", { width: 8, height: 8, fill: b, opacity: 0.7, transform: "rotate(45 4 4)" }) }),
                /* @__PURE__ */ o("span", { style: { fontSize: 8, color: b, letterSpacing: "0.18em", fontWeight: 700 }, children: e })
              ] }),
              i && /* @__PURE__ */ o(
                "button",
                {
                  onPointerDown: (m) => m.stopPropagation(),
                  onClick: () => p((m) => !m),
                  style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: b,
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
const Cc = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)",
  blue: "var(--j-accent)",
  white: "var(--j-text-primary)"
};
function Xl({
  analog: e = !0,
  color: t = "cyan",
  size: n = 120,
  showDate: r = !0,
  className: a,
  style: i
}) {
  const [s, c] = $(/* @__PURE__ */ new Date());
  U(() => {
    const k = setInterval(() => c(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(k);
  }, []);
  const l = Cc[t] ?? "var(--j-accent)", d = (k) => String(k).padStart(2, "0"), h = `${d(s.getHours())}:${d(s.getMinutes())}:${d(s.getSeconds())}`, u = s.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit", year: "numeric" }).toUpperCase(), f = s.getSeconds() / 60 * 360, p = (s.getMinutes() + s.getSeconds() / 60) / 60 * 360, x = (s.getHours() % 12 + s.getMinutes() / 60) / 12 * 360, y = n / 2, w = n / 2, v = n / 2 - 4, b = (k, N) => ({
    x: y + N * Math.sin(k * Math.PI / 180),
    y: w - N * Math.cos(k * Math.PI / 180)
  }), j = b(x, v * 0.48), M = b(p, v * 0.65), S = b(f, v * 0.8), m = Array.from({ length: 60 }, (k, N) => {
    const C = N / 60 * Math.PI * 2, D = N % 5 === 0, T = v - (D ? 10 : 5);
    return {
      x1: y + v * Math.cos(C),
      y1: w + v * Math.sin(C),
      x2: y + T * Math.cos(C),
      y2: w + T * Math.sin(C),
      major: D
    };
  });
  return /* @__PURE__ */ g("div", { className: a, style: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6, fontFamily: "'Courier New', monospace", ...i }, children: [
    e && /* @__PURE__ */ g("svg", { width: n, height: n, children: [
      /* @__PURE__ */ o("circle", { cx: y, cy: w, r: v, fill: "none", stroke: l, strokeWidth: 1.5, opacity: 0.5 }),
      /* @__PURE__ */ o("circle", { cx: y, cy: w, r: v - 14, fill: "none", stroke: l, strokeWidth: 0.5, opacity: 0.2 }),
      m.map((k, N) => /* @__PURE__ */ o(
        "line",
        {
          x1: k.x1,
          y1: k.y1,
          x2: k.x2,
          y2: k.y2,
          stroke: l,
          strokeWidth: k.major ? 1.5 : 0.6,
          opacity: k.major ? 0.8 : 0.3
        },
        N
      )),
      [0, 3, 6, 9].map((k) => {
        const N = k / 12 * Math.PI * 2, C = v - 18;
        return /* @__PURE__ */ o(
          "text",
          {
            x: y + C * Math.sin(N),
            y: w - C * Math.cos(N) + 4,
            textAnchor: "middle",
            fill: l,
            fontSize: 8,
            fontFamily: "'Courier New'",
            opacity: 0.7,
            children: k === 0 ? "12" : k * 3
          },
          k
        );
      }),
      /* @__PURE__ */ o("line", { x1: y, y1: w, x2: j.x, y2: j.y, stroke: l, strokeWidth: 2.5, strokeLinecap: "round", opacity: 0.9 }),
      /* @__PURE__ */ o("line", { x1: y, y1: w, x2: M.x, y2: M.y, stroke: l, strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.85 }),
      /* @__PURE__ */ o("line", { x1: y, y1: w, x2: S.x, y2: S.y, stroke: "var(--j-err)", strokeWidth: 1, strokeLinecap: "round" }),
      /* @__PURE__ */ o("circle", { cx: y, cy: w, r: 3, fill: l }),
      /* @__PURE__ */ o("circle", { cx: y, cy: w, r: 6, fill: "none", stroke: l, strokeWidth: 0.7, opacity: 0.4 })
    ] }),
    /* @__PURE__ */ o("div", { style: { fontSize: e ? 13 : 22, color: l, letterSpacing: "0.15em", lineHeight: 1 }, children: h }),
    r && /* @__PURE__ */ o("div", { style: { fontSize: 8, color: "var(--j-text-muted)", letterSpacing: "0.12em" }, children: u })
  ] });
}
const Yn = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)",
  blue: "var(--j-accent)"
};
function Vl({
  level: e = 100,
  size: t = 120,
  color: n = "cyan",
  label: r,
  animated: a = !0,
  className: i,
  style: s
}) {
  const c = Yn[n] ?? Yn.cyan, l = t / 2, d = t / 2, h = Math.max(0, Math.min(100, e)) / 100, u = t * 0.46, f = t * 0.34, p = t * 0.22, x = t * 0.1, y = 2 * Math.PI * f, w = y * h, v = y * (1 - h), b = [0, 120, 240].map((S) => {
    const m = S * Math.PI / 180, k = { x: l + p * Math.cos(m - Math.PI / 2), y: d + p * Math.sin(m - Math.PI / 2) }, N = { x: l + x * Math.cos(m - Math.PI / 2 + 0.6), y: d + x * Math.sin(m - Math.PI / 2 + 0.6) }, C = { x: l + x * Math.cos(m - Math.PI / 2 - 0.6), y: d + x * Math.sin(m - Math.PI / 2 - 0.6) };
    return `M ${k.x} ${k.y} L ${N.x} ${N.y} L ${C.x} ${C.y} Z`;
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
          strokeDasharray: `${w} ${v}`,
          strokeDashoffset: y * 0.25,
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
          r: p + 4,
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
      b.map((S, m) => /* @__PURE__ */ o("path", { d: S, fill: c, opacity: 0.7 * h, filter: `url(#arc-glow-${n})` }, m)),
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: x, fill: c, opacity: 0.15 + 0.6 * h }),
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: x, fill: "none", stroke: c, strokeWidth: 1.5, opacity: 0.8 }),
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: x - 3, fill: "none", stroke: c, strokeWidth: 0.7, opacity: 0.4 }),
      a && /* @__PURE__ */ g("circle", { cx: l, cy: d, r: x, fill: c, opacity: 0, children: [
        /* @__PURE__ */ o("animate", { attributeName: "opacity", values: "0;0.3;0", dur: "1.8s", repeatCount: "indefinite" }),
        /* @__PURE__ */ o("animate", { attributeName: "r", values: `${x};${x + 4};${x}`, dur: "1.8s", repeatCount: "indefinite" })
      ] }),
      /* @__PURE__ */ o(
        "text",
        {
          x: l,
          y: d + 4,
          textAnchor: "middle",
          fill: c,
          fontSize: x * 0.9,
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
const zn = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)"
};
function Ul({
  data: e,
  color: t = "cyan",
  cellSize: n = 28,
  gap: r = 3,
  showValue: a = !1,
  title: i,
  className: s,
  style: c
}) {
  const l = zn[t] ?? zn.cyan;
  return /* @__PURE__ */ g("div", { className: s, style: { fontFamily: "'Courier New', monospace", ...c }, children: [
    i && /* @__PURE__ */ o("div", { style: { fontSize: 8, color: l, letterSpacing: "0.18em", marginBottom: 8 }, children: i }),
    /* @__PURE__ */ o("div", { style: { display: "flex", flexDirection: "column", gap: r }, children: e.map((d, h) => /* @__PURE__ */ o("div", { style: { display: "flex", gap: r }, children: d.map((u, f) => {
      const p = Math.max(0, Math.min(100, u.value)) / 100, x = `color-mix(in srgb, ${l} ${Math.round(p * 100)}%, var(--j-bg-card))`, y = p > 0.55 ? "var(--j-bg)" : l;
      return /* @__PURE__ */ o(
        "div",
        {
          title: u.tooltip ?? u.label ?? `${u.value}%`,
          style: {
            width: n,
            height: n,
            background: x,
            border: `1px solid ${l}`,
            borderColor: `color-mix(in srgb, ${l} 35%, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            color: y,
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
const Oc = {
  active: "var(--j-accent)",
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  info: "var(--j-text-muted)"
}, Wc = {
  active: "●",
  warning: "▲",
  error: "✕",
  success: "✓",
  info: "○"
};
function Kl({
  items: e,
  maxRows: t = 8,
  rowHeight: n = 28,
  autoScroll: r = !0,
  showTime: a = !0,
  showSource: i = !0,
  className: s,
  style: c
}) {
  const l = L(null), [d, h] = $(!1);
  U(() => {
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
          const p = Oc[f.level ?? "info"], x = Wc[f.level ?? "info"];
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
                /* @__PURE__ */ o("span", { style: { color: p, fontSize: 8, width: 10, flexShrink: 0 }, children: x }),
                a && f.time && /* @__PURE__ */ o("span", { style: { color: "var(--j-text-muted)", width: 52, flexShrink: 0, fontSize: 8 }, children: f.time }),
                /* @__PURE__ */ o("span", { style: {
                  flex: 1,
                  color: "var(--j-text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }, children: f.message }),
                i && f.source && /* @__PURE__ */ g("span", { style: {
                  color: p,
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
const Bn = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)"
};
function Ql({
  items: e,
  speed: t = 40,
  color: n = "cyan",
  height: r = 32,
  pauseOnHover: a = !0,
  className: i,
  style: s
}) {
  const c = L(null), l = Bn[n] ?? Bn.cyan, d = `ticker-${n}-${e.length}`;
  U(() => {
    const f = c.current;
    if (!f) return;
    const x = f.scrollWidth / 2 / t;
    let y = document.getElementById("j-ticker-style");
    y || (y = document.createElement("style"), y.id = "j-ticker-style", document.head.appendChild(y));
    const w = `@keyframes ${d} { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`;
    y.textContent = (y.textContent ?? "") + w, f.style.animation = `${d} ${x}s linear infinite`;
  }, [e, t, d]);
  const h = (f) => f === "up" ? "var(--j-ok)" : f === "down" ? "var(--j-err)" : "var(--j-text-muted)", u = () => e.map((f, p) => /* @__PURE__ */ g("span", { style: { display: "inline-flex", alignItems: "center", gap: 8, marginRight: 40, flexShrink: 0 }, children: [
    /* @__PURE__ */ o("span", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".15em" }, children: f.label }),
    /* @__PURE__ */ o("span", { style: { fontSize: 11, color: l, letterSpacing: ".1em", fontWeight: 700 }, children: f.value }),
    f.delta && /* @__PURE__ */ g("span", { style: { fontSize: 8, color: h(f.trend), letterSpacing: ".08em" }, children: [
      f.trend === "up" ? "▲" : f.trend === "down" ? "▼" : "–",
      " ",
      f.delta
    ] }),
    /* @__PURE__ */ o("span", { style: { color: "var(--j-border)", fontSize: 10, marginLeft: 8 }, children: "|" })
  ] }, p));
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
const $c = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)",
  blue: "var(--j-accent)"
};
function Zl({
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
  const [d, h] = $(() => {
    const m = {};
    return e.forEach((k) => {
      m[k.id] = { x: k.x, y: k.y };
    }), m;
  }), [u, f] = $({}), [p, x] = $(null), [y, w] = $(e.map((m) => m.id)), v = L(null), b = (m) => a ? Math.round(m / r) * r : m, j = E((m, k) => {
    k.preventDefault();
    const N = d[m] ?? { x: 0, y: 0 };
    v.current = { mx: k.clientX, my: k.clientY, px: N.x, py: N.y }, x(m), w((C) => [...C.filter((D) => D !== m), m]), k.currentTarget.setPointerCapture(k.pointerId);
  }, [d]), M = E((m) => {
    if (!p || !v.current) return;
    const k = b(v.current.px + m.clientX - v.current.mx), N = b(v.current.py + m.clientY - v.current.my);
    h((C) => ({ ...C, [p]: { x: k, y: N } })), l == null || l(p, k, N);
  }, [p, b, l]), S = E(() => {
    x(null), v.current = null;
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
      onPointerMove: M,
      onPointerUp: S,
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
        e.map((m) => {
          const k = d[m.id] ?? { x: m.x, y: m.y }, N = $c[m.color ?? "cyan"] ?? "var(--j-accent)", C = u[m.id], D = y.indexOf(m.id);
          return /* @__PURE__ */ g(
            "div",
            {
              style: {
                position: "absolute",
                left: k.x,
                top: k.y,
                width: m.width ?? 260,
                zIndex: D + 1,
                background: "var(--j-bg-card)",
                border: `1px solid ${N}`,
                boxShadow: p === m.id ? `0 0 20px ${N}44` : `0 0 8px ${N}18`,
                transition: p === m.id ? "none" : "box-shadow .2s",
                clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)"
              },
              children: [
                /* @__PURE__ */ g(
                  "div",
                  {
                    onPointerDown: (T) => j(m.id, T),
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "4px 10px",
                      background: `${N}18`,
                      borderBottom: C ? "none" : `1px solid ${N}44`,
                      cursor: p === m.id ? "grabbing" : "grab",
                      userSelect: "none"
                    },
                    children: [
                      /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                        /* @__PURE__ */ o("svg", { width: 7, height: 7, children: /* @__PURE__ */ o("rect", { width: 7, height: 7, fill: N, opacity: 0.8, transform: "rotate(45 3.5 3.5)" }) }),
                        /* @__PURE__ */ o("span", { style: { fontSize: 8, color: N, letterSpacing: ".18em" }, children: m.title ?? m.id.toUpperCase() })
                      ] }),
                      /* @__PURE__ */ o(
                        "button",
                        {
                          onPointerDown: (T) => T.stopPropagation(),
                          onClick: () => f((T) => ({ ...T, [m.id]: !T[m.id] })),
                          style: { background: "none", border: "none", cursor: "pointer", color: N, fontSize: 9, padding: "0 2px" },
                          children: C ? "▸" : "▾"
                        }
                      )
                    ]
                  }
                ),
                !C && /* @__PURE__ */ o("div", { style: { padding: "8px 10px" }, children: m.content })
              ]
            },
            m.id
          );
        })
      ]
    }
  );
}
function Tc(e) {
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
function _c(e) {
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
function Pr(e) {
  return e === "amber" ? "var(--j-warn)" : e === "red" ? "var(--j-err)" : e === "green" ? "var(--j-ok)" : "var(--j-accent)";
}
function Ic(e) {
  return Pr(e);
}
function Pc(e) {
  return e === "amber" ? "aw" : e === "red" ? "ae" : e === "green" ? "ag" : "a";
}
function le(e) {
  return e.toFixed(2);
}
function ed({
  nodes: e,
  edges: t,
  width: n = "100%",
  height: r = "420px",
  title: a,
  showLegend: i = !0
}) {
  const c = `ng${Jn().replace(/:/g, "")}`, [l, d] = $({}), [h, u] = $(null), f = L(null);
  U(() => {
    d((v) => {
      const b = { ...v };
      return e.forEach((j) => {
        b[j.id] || (b[j.id] = { x: j.x, y: j.y, w: Tc(j), h: _c(j) });
      }), Object.keys(b).forEach((j) => {
        e.some((M) => M.id === j) || delete b[j];
      }), b;
    });
  }, [e]);
  function p(v, b) {
    v.stopPropagation();
    const j = l[b];
    j && (u(b), f.current = { id: b, offX: v.clientX - j.x, offY: v.clientY - j.y });
  }
  function x(v) {
    const b = f.current;
    if (!b) return;
    const { id: j, offX: M, offY: S } = b;
    d((m) => {
      const k = m[j];
      if (!k) return m;
      const N = Math.max(0, v.clientX - M), C = Math.max(0, v.clientY - S);
      return k.x === N && k.y === C ? m : { ...m, [j]: { ...k, x: N, y: C } };
    });
  }
  function y() {
    u(null), f.current = null;
  }
  function w(v, b, j, M) {
    const S = e.find((D) => D.id === j), m = S == null ? void 0 : S.type;
    if (m === "hub" || m === "diamond" || m === "hex")
      return [v.x + v.w / 2, v.y + v.h / 2];
    const k = v.y + v.h / 2, N = b.x + b.w / 2, C = v.x + v.w / 2;
    return M ? N >= C ? [v.x + v.w, k] : [v.x, k] : N < C ? [v.x + v.w, k] : [v.x, k];
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
      onMouseMove: x,
      onMouseUp: y,
      onMouseLeave: y,
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
          t.map((v) => {
            const b = l[v.from], j = l[v.to];
            if (!b || !j) return null;
            const [M, S] = w(b, j, v.from, !0), [m, k] = w(j, b, v.to, !1), N = M + (m - M) * 0.5, C = S, D = m - (m - M) * 0.5, T = k, X = `M ${le(M)} ${le(S)} C ${le(N)} ${le(C)} ${le(D)} ${le(T)} ${le(m)} ${le(k)}`, H = Ic(v.color), R = `ep-${c}-${v.from}-${v.to}`, Z = v.arrow ?? !0 ? `url(#${c}-${Pc(v.color)})` : "none", oe = v.style === "dashed" ? "6,4" : v.style === "dotted" ? "2,4" : void 0;
            return /* @__PURE__ */ g("g", { "data-edge": `${v.from}-${v.to}`, children: [
              /* @__PURE__ */ o("path", { d: X, fill: "none", stroke: H, strokeWidth: 5, strokeOpacity: 0.1 }),
              /* @__PURE__ */ o(
                "path",
                {
                  id: R,
                  d: X,
                  fill: "none",
                  stroke: H,
                  strokeWidth: 1.5,
                  strokeDasharray: oe,
                  markerEnd: Z
                }
              ),
              (v.animated ?? !0) && /* @__PURE__ */ o(
                "circle",
                {
                  r: "3",
                  fill: H,
                  opacity: 0.9,
                  style: { filter: `drop-shadow(0 0 3px ${H})` },
                  children: /* @__PURE__ */ o("animateMotion", { dur: `${v.animDur ?? 2}s`, repeatCount: "indefinite", children: /* @__PURE__ */ o("mpath", { href: `#${R}` }) })
                }
              ),
              v.label && /* @__PURE__ */ o(
                "text",
                {
                  x: le((M + m) / 2),
                  y: le((S + k) / 2 - 10),
                  textAnchor: "middle",
                  fontFamily: "'Courier New',monospace",
                  fontSize: "8",
                  fill: H,
                  letterSpacing: "1",
                  opacity: "0.85",
                  children: v.label
                }
              )
            ] }, R);
          })
        ] }),
        e.map((v) => {
          const b = l[v.id];
          if (!b) return null;
          const j = Pr(v.color), M = h === v.id, S = v.type ?? "chip";
          return /* @__PURE__ */ g(
            "div",
            {
              "data-node-id": v.id,
              "data-node-type": S,
              "data-selected": M ? "true" : "false",
              style: {
                position: "absolute",
                left: b.x,
                top: b.y,
                width: b.w,
                height: b.h,
                zIndex: M ? 20 : 3,
                cursor: "grab",
                touchAction: "none",
                userSelect: "none"
              },
              onMouseDown: (m) => p(m, v.id),
              children: [
                S === "hub" && /* @__PURE__ */ g("div", { style: {
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "var(--j-bg-card)",
                  border: `2px solid ${j}`,
                  boxShadow: `0 0 18px ${j}, inset 0 0 16px var(--j-accent-05)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  filter: M ? "brightness(1.35)" : "none"
                }, children: [
                  /* @__PURE__ */ o("div", { style: {
                    position: "absolute",
                    inset: 5,
                    borderRadius: "50%",
                    border: `1px solid ${j}`,
                    opacity: 0.25,
                    animation: "j-spin 5s linear infinite"
                  } }),
                  /* @__PURE__ */ o("div", { style: { fontSize: 12, fontWeight: 700, color: j, letterSpacing: ".05em", textShadow: `0 0 8px ${j}`, zIndex: 1 }, children: v.label }),
                  v.sub && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".10em", zIndex: 1 }, children: v.sub })
                ] }),
                S === "diamond" && /* @__PURE__ */ g("div", { style: { width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }, children: [
                  /* @__PURE__ */ o("div", { style: {
                    position: "absolute",
                    inset: 0,
                    clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
                    background: "var(--j-bg-card)",
                    border: `2px solid ${j}`,
                    boxShadow: `0 0 12px ${j}`,
                    filter: M ? "brightness(1.3)" : "none"
                  } }),
                  /* @__PURE__ */ g("div", { style: { position: "relative", zIndex: 1, textAlign: "center" }, children: [
                    /* @__PURE__ */ o("div", { style: { fontSize: 8, fontWeight: 700, color: j, letterSpacing: ".12em", textTransform: "uppercase" }, children: v.label }),
                    v.sub && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)" }, children: v.sub })
                  ] })
                ] }),
                S === "hex" && /* @__PURE__ */ g("div", { style: { width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }, children: [
                  /* @__PURE__ */ o("div", { style: {
                    position: "absolute",
                    inset: 0,
                    clipPath: "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)",
                    background: "var(--j-bg-card)",
                    border: `2px solid ${j}`,
                    boxShadow: `0 0 12px ${j}`,
                    filter: M ? "brightness(1.3)" : "none"
                  } }),
                  /* @__PURE__ */ g("div", { style: { position: "relative", zIndex: 1, textAlign: "center" }, children: [
                    /* @__PURE__ */ o("div", { style: { fontSize: 8, fontWeight: 700, color: j, letterSpacing: ".12em" }, children: v.label }),
                    v.sub && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)" }, children: v.sub })
                  ] })
                ] }),
                S === "chip" && /* @__PURE__ */ g("div", { style: {
                  width: "100%",
                  height: "100%",
                  clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                  background: "var(--j-bg-card)",
                  border: `1px solid ${j}`,
                  borderLeft: `3px solid ${j}`,
                  boxShadow: M ? `0 0 16px ${j}` : "0 0 5px var(--j-accent-12)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 12px",
                  position: "relative",
                  overflow: "hidden",
                  filter: M ? "brightness(1.2)" : "none"
                }, children: [
                  /* @__PURE__ */ o("div", { style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: `linear-gradient(90deg,transparent,${j},transparent)`,
                    animation: "j-scan-v 3s ease-in-out infinite"
                  } }),
                  /* @__PURE__ */ o("div", { style: {
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: j,
                    boxShadow: `0 0 5px ${j}`,
                    animation: v.pulse ? "j-pulse 1.4s ease-in-out infinite" : "none"
                  } }),
                  /* @__PURE__ */ g("div", { style: { flex: 1, minWidth: 0 }, children: [
                    /* @__PURE__ */ o("div", { style: {
                      fontSize: 9,
                      fontWeight: 700,
                      color: j,
                      letterSpacing: ".13em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }, children: v.label }),
                    v.sub && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".07em" }, children: v.sub })
                  ] }),
                  v.value && /* @__PURE__ */ o("div", { style: {
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--j-text-primary)",
                    flexShrink: 0,
                    paddingLeft: 8,
                    borderLeft: `1px solid ${j}`
                  }, children: v.value })
                ] })
              ]
            },
            v.id
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
const Er = we("windows11");
function Lt() {
  return xe(Er);
}
function Ec({ theme: e, children: t }) {
  return /* @__PURE__ */ o(Er.Provider, { value: e, children: /* @__PURE__ */ o("div", { "data-os-theme": e, "data-testid": "j-os-root", className: "j-os-root", children: t }) });
}
const Fr = we(null);
function Ze() {
  const e = xe(Fr);
  if (!e) throw new Error("useWindowManager must be used inside JWindowManager");
  return e;
}
let Fc = 1, Ac = 10;
function Yc() {
  return `win-${Fc++}`;
}
function ut() {
  return Ac++;
}
function ft(e, t, n, r, a, i) {
  const s = Math.min(n, a > 0 ? a : n), c = Math.min(r, i > 0 ? i : r);
  return {
    width: s,
    height: c,
    x: a > 0 ? Math.max(0, Math.min(e, a - s)) : e,
    y: i > 0 ? Math.max(0, Math.min(t, i - c)) : t
  };
}
function zc(e, t, n) {
  const a = e.filter((i) => !i.minimized).length % 8;
  return {
    x: Math.min(40 + a * 30, Math.floor(t * 0.5) || 40),
    y: Math.min(40 + a * 30, Math.floor(n * 0.5) || 40)
  };
}
function Bc({ compactBreakpoint: e = 900, children: t }) {
  const [n, r] = $([]), a = L([]), [i, s] = $(null), [c, l] = $({ w: 0, h: 0 }), d = L({ w: 0, h: 0 }), h = c.w > 0 && c.w < e, u = E((m) => {
    r((k) => {
      const N = m(k);
      return a.current = N, N;
    });
  }, []), f = E((m, k) => {
    d.current = { w: m, h: k }, l({ w: m, h: k }), u((N) => N.map((C) => ({
      ...C,
      ...ft(C.x, C.y, C.width, C.height, m, k)
    })));
  }, [u]), p = E((m) => {
    const k = a.current.find((C) => C.appId === m.appId);
    if (k)
      return s(k.id), u((C) => C.map(
        (D) => D.id === k.id ? { ...D, minimized: !1, zIndex: ut() } : D
      )), k.id;
    const N = Yc();
    return u((C) => {
      const { x: D, y: T } = zc(C, d.current.w, d.current.h), X = m.width ?? 640, H = m.height ?? 420, R = ft(D, T, X, H, d.current.w, d.current.h), Z = {
        id: N,
        appId: m.appId,
        title: m.title,
        icon: m.icon,
        ...R,
        minimized: !1,
        maximized: !1,
        zIndex: ut(),
        content: m.content
      };
      return [...C, Z];
    }), s(N), N;
  }, [u]), x = E((m) => {
    u((k) => k.filter((N) => N.id !== m)), s((k) => k === m ? null : k);
  }, [u]), y = E((m) => {
    u((k) => k.map((N) => N.id === m ? { ...N, minimized: !0 } : N)), s((k) => k === m ? null : k);
  }, [u]), w = E((m) => {
    u((k) => k.map((N) => N.id === m ? { ...N, minimized: !1, zIndex: ut() } : N)), s(m);
  }, [u]), v = E((m) => {
    u((k) => k.map((N) => N.id === m ? { ...N, maximized: !N.maximized } : N));
  }, [u]), b = E((m) => {
    s(m), u((k) => k.map((N) => N.id === m ? { ...N, zIndex: ut() } : N));
  }, [u]), j = E((m, k, N) => {
    u((C) => C.map((D) => {
      if (D.id !== m) return D;
      const T = ft(k, N, D.width, D.height, d.current.w, d.current.h);
      return { ...D, ...T };
    }));
  }, [u]), M = E((m, k, N) => {
    u((C) => C.map((D) => {
      if (D.id !== m) return D;
      const T = ft(D.x, D.y, k, N, d.current.w, d.current.h);
      return { ...D, ...T };
    }));
  }, [u]), S = {
    windows: n,
    focusedId: i,
    compactMode: h,
    desktopSize: c,
    openWindow: p,
    closeWindow: x,
    minimizeWindow: y,
    restoreWindow: w,
    maximizeWindow: v,
    focusWindow: b,
    moveWindow: j,
    resizeWindow: M,
    setDesktopSize: f
  };
  return /* @__PURE__ */ o(Fr.Provider, { value: S, children: t });
}
const Rc = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
function Hc({ id: e }) {
  const { windows: t, focusedId: n, compactMode: r, focusWindow: a, closeWindow: i, minimizeWindow: s, maximizeWindow: c, moveWindow: l, resizeWindow: d } = Ze(), h = Lt(), u = L(null), f = t.find((D) => D.id === e);
  if (!f || f.minimized) return null;
  const p = f, x = n === e, y = h === "windows11", w = p.maximized ? y ? { position: "absolute", top: 0, left: 0, right: 0, bottom: "var(--os-taskbar-h)", zIndex: p.zIndex } : { position: "absolute", inset: 0, zIndex: p.zIndex } : { position: "absolute", left: p.x, top: p.y, width: p.width, height: p.height, zIndex: p.zIndex }, v = [
    "j-os-window",
    x ? "j-os-window--focused" : "",
    p.maximized ? "j-os-window--maximized" : ""
  ].filter(Boolean).join(" "), b = L({ active: !1, startX: 0, startY: 0, startWinX: 0, startWinY: 0 });
  function j(D) {
    p.maximized || r || D.target.closest("button") || (D.currentTarget.setPointerCapture(D.pointerId), b.current = { active: !0, startX: D.clientX, startY: D.clientY, startWinX: p.x, startWinY: p.y }, a(e));
  }
  function M(D) {
    if (!b.current.active) return;
    const T = D.clientX - b.current.startX, X = D.clientY - b.current.startY;
    l(e, b.current.startWinX + T, b.current.startWinY + X);
  }
  function S() {
    b.current.active = !1;
  }
  const m = L({ active: !1, dir: "", startX: 0, startY: 0, startW: 0, startH: 0, startWinX: 0, startWinY: 0 });
  function k(D, T) {
    D.stopPropagation(), D.currentTarget.setPointerCapture(D.pointerId), m.current = { active: !0, dir: T, startX: D.clientX, startY: D.clientY, startW: p.width, startH: p.height, startWinX: p.x, startWinY: p.y }, a(e);
  }
  function N(D) {
    if (!m.current.active) return;
    const { dir: T, startX: X, startY: H, startW: R, startH: Z, startWinX: oe, startWinY: ke } = m.current, Se = D.clientX - X, ee = D.clientY - H;
    let K = R, te = Z, Ne = oe, pe = ke;
    T.includes("e") && (K = R + Se), T.includes("s") && (te = Z + ee), T.includes("w") && (K = R - Se, Ne = oe + Se), T.includes("n") && (te = Z - ee, pe = ke + ee), K < 280 && (K = 280, T.includes("w") && (Ne = oe + R - 280)), te < 200 && (te = 200, T.includes("n") && (pe = ke + Z - 200)), l(e, Ne, pe), d(e, K, te);
  }
  function C() {
    m.current.active = !1;
  }
  return /* @__PURE__ */ g(
    "div",
    {
      className: v,
      style: w,
      onPointerDown: () => a(e),
      children: [
        !r && !p.maximized && Rc.map((D) => /* @__PURE__ */ o(
          "div",
          {
            className: `j-os-resize j-os-resize--${D}`,
            onPointerDown: (T) => k(T, D),
            onPointerMove: N,
            onPointerUp: C
          },
          D
        )),
        /* @__PURE__ */ o(
          "div",
          {
            ref: u,
            className: `j-os-titlebar ${!p.maximized && !r ? "j-os-titlebar--draggable" : ""}`,
            onPointerDown: j,
            onPointerMove: M,
            onPointerUp: S,
            children: y ? /* @__PURE__ */ g(B, { children: [
              p.icon && /* @__PURE__ */ o("span", { style: { marginRight: 6, fontSize: 14 }, children: p.icon }),
              /* @__PURE__ */ o("span", { className: "j-os-titlebar__title", children: p.title }),
              /* @__PURE__ */ g("div", { className: "j-os-win-controls", children: [
                /* @__PURE__ */ o("button", { className: "j-os-win-btn", title: "Minimize", onClick: () => s(e), children: "─" }),
                /* @__PURE__ */ o("button", { className: "j-os-win-btn", title: "Maximize", onClick: () => c(e), children: p.maximized ? "❐" : "□" }),
                /* @__PURE__ */ o("button", { className: "j-os-win-btn j-os-win-btn--close", title: "Close", onClick: () => i(e), children: "✕" })
              ] })
            ] }) : /* @__PURE__ */ g(B, { children: [
              /* @__PURE__ */ g("div", { className: "j-os-mac-controls", children: [
                /* @__PURE__ */ o("button", { className: "j-os-mac-btn j-os-mac-btn--close", title: "Close", onClick: () => i(e) }),
                /* @__PURE__ */ o("button", { className: "j-os-mac-btn j-os-mac-btn--minimize", title: "Minimize", onClick: () => s(e) }),
                /* @__PURE__ */ o("button", { className: "j-os-mac-btn j-os-mac-btn--maximize", title: "Maximize", onClick: () => c(e) })
              ] }),
              /* @__PURE__ */ o("span", { className: "j-os-titlebar__title", style: { textAlign: "center" }, children: p.title })
            ] })
          }
        ),
        /* @__PURE__ */ o("div", { className: "j-os-window__body", children: p.content })
      ]
    }
  );
}
const qt = we(null);
function td() {
  const e = xe(qt);
  if (!e) throw new Error("useOSNotify must be used inside JOSNotificationProvider");
  return e;
}
function Jc() {
  return xe(qt);
}
const Tt = 4, Gc = 20;
function nd({ children: e }) {
  const t = L(1), [n, r] = $([]), [a, i] = $([]), s = L([]), [c, l] = $([]), d = Lt(), h = E((y) => {
    i((w) => {
      const v = y(w);
      return s.current = v, v;
    });
  }, []), u = E((y) => {
    h((w) => w.filter((v) => v.id !== y));
  }, [h]), f = E(() => l([]), []);
  U(() => {
    if (n.length > 0 && a.length < Tt) {
      const y = Math.min(n.length, Tt - a.length);
      h((w) => [...w, ...n.slice(0, y)]), r((w) => w.slice(y));
    }
  }, [n, a.length, h]), U(() => {
    const y = [];
    for (const w of a) {
      const v = w.duration ?? 4e3;
      v > 0 && y.push(setTimeout(() => u(w.id), v));
    }
    return () => y.forEach(clearTimeout);
  }, [a, u]);
  const p = E((y) => {
    const w = `notif-${t.current++}`, v = { ...y, id: w };
    s.current.length < Tt ? (s.current = [...s.current, v], i((M) => [...M, v])) : r((M) => [...M, v]);
    const b = /* @__PURE__ */ new Date(), j = `${String(b.getHours()).padStart(2, "0")}:${String(b.getMinutes()).padStart(2, "0")}`;
    l((M) => [
      { id: w, title: y.title, body: y.body, icon: y.icon, timestamp: j },
      ...M
    ].slice(0, Gc));
  }, []), x = /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "j-os-notif-stack",
      "data-os-theme": d,
      className: "j-os-notif-stack",
      children: a.map((y) => /* @__PURE__ */ g("div", { className: "j-os-notif", role: "alert", children: [
        y.icon && /* @__PURE__ */ o("span", { className: "j-os-notif__icon", children: y.icon }),
        /* @__PURE__ */ g("div", { className: "j-os-notif__body", children: [
          /* @__PURE__ */ o("div", { className: "j-os-notif__title", children: y.title }),
          y.body && /* @__PURE__ */ o("div", { className: "j-os-notif__text", children: y.body })
        ] }),
        /* @__PURE__ */ o("button", { className: "j-os-notif__close", title: "Dismiss", onClick: () => u(y.id), children: "✕" })
      ] }, y.id))
    }
  );
  return /* @__PURE__ */ g(qt.Provider, { value: { notify: p, recent: c, clearAll: f }, children: [
    e,
    Gn(x, document.body)
  ] });
}
function Lc({ apps: e, onClose: t }) {
  const { openWindow: n } = Ze();
  function r(a) {
    n({ appId: a.id, title: a.label, icon: a.icon, content: a.component, width: a.defaultWidth, height: a.defaultHeight }), t();
  }
  return /* @__PURE__ */ g("div", { "data-testid": "j-os-startmenu", className: "j-os-startmenu", children: [
    /* @__PURE__ */ o("div", { className: "j-os-startmenu__heading", children: "Pinned" }),
    /* @__PURE__ */ o("div", { className: "j-os-startmenu__pinned", children: e.map((a) => /* @__PURE__ */ g("button", { className: "j-os-startmenu__pin", onClick: () => r(a), children: [
      /* @__PURE__ */ o("span", { className: "j-os-startmenu__pin-icon", children: a.icon }),
      a.label
    ] }, a.id)) })
  ] });
}
function Ar() {
  const [e] = $(() => {
    const t = /* @__PURE__ */ new Date();
    return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
  });
  return e;
}
function qc() {
  const [e] = $(() => (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, { weekday: "long", month: "long", day: "numeric" }));
  return e;
}
const Rn = [
  { id: "wifi", icon: "📶", label: "Wi-Fi", defaultOn: !0 },
  { id: "bt", icon: "🔵", label: "Bluetooth", defaultOn: !0 },
  { id: "focus", icon: "🌙", label: "Focus", defaultOn: !1 },
  { id: "night", icon: "🌛", label: "Night light", defaultOn: !1 },
  { id: "airplane", icon: "✈️", label: "Airplane", defaultOn: !1 },
  { id: "vpn", icon: "🔒", label: "VPN", defaultOn: !1 }
];
function Xc({ onClose: e }) {
  const t = Jc(), n = Ar(), r = qc(), a = (t == null ? void 0 : t.recent) ?? [], i = (t == null ? void 0 : t.clearAll) ?? (() => {
  }), [s, c] = $(
    Object.fromEntries(Rn.map((l) => [l.id, l.defaultOn]))
  );
  return /* @__PURE__ */ g(
    "div",
    {
      "data-testid": "j-os-notif-center",
      className: "j-os-notif-center",
      onClick: (l) => l.stopPropagation(),
      children: [
        /* @__PURE__ */ g("div", { className: "j-os-notif-center__header", children: [
          /* @__PURE__ */ o("div", { className: "j-os-notif-center__time", children: n }),
          /* @__PURE__ */ o("div", { className: "j-os-notif-center__date", children: r }),
          /* @__PURE__ */ o(
            "button",
            {
              className: "j-os-notif-center__close",
              title: "Close",
              onClick: e,
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ g("div", { className: "j-os-notif-center__section-label", children: [
          /* @__PURE__ */ o("span", { children: "Notifications" }),
          a.length > 0 && /* @__PURE__ */ o("button", { className: "j-os-notif-center__clear", onClick: i, children: "Clear all" })
        ] }),
        /* @__PURE__ */ o("div", { className: "j-os-notif-center__list", children: a.length === 0 ? /* @__PURE__ */ o("div", { className: "j-os-notif-center__empty", children: "No new notifications" }) : a.map((l) => /* @__PURE__ */ g("div", { className: "j-os-notif-center__item", children: [
          l.icon && /* @__PURE__ */ o("span", { className: "j-os-notif-center__item-icon", children: l.icon }),
          /* @__PURE__ */ g("div", { className: "j-os-notif-center__item-body", children: [
            /* @__PURE__ */ o("div", { className: "j-os-notif-center__item-title", children: l.title }),
            l.body && /* @__PURE__ */ o("div", { className: "j-os-notif-center__item-text", children: l.body })
          ] }),
          /* @__PURE__ */ o("span", { className: "j-os-notif-center__item-ts", children: l.timestamp })
        ] }, l.id)) }),
        /* @__PURE__ */ o("div", { className: "j-os-notif-center__section-label", style: { marginTop: 4 }, children: /* @__PURE__ */ o("span", { children: "Quick settings" }) }),
        /* @__PURE__ */ o("div", { className: "j-os-notif-center__qs", children: Rn.map((l) => /* @__PURE__ */ g(
          "button",
          {
            className: `j-os-notif-center__qs-item${s[l.id] ? " j-os-notif-center__qs-item--on" : ""}`,
            onClick: () => c((d) => ({ ...d, [l.id]: !d[l.id] })),
            title: l.label,
            children: [
              /* @__PURE__ */ o("span", { className: "j-os-notif-center__qs-icon", children: l.icon }),
              /* @__PURE__ */ o("span", { className: "j-os-notif-center__qs-label", children: l.label })
            ]
          },
          l.id
        )) })
      ]
    }
  );
}
function Vc({ apps: e }) {
  const { windows: t, focusWindow: n, restoreWindow: r } = Ze(), [a, i] = $(!1), [s, c] = $(!1), l = Ar();
  function d(f) {
    const p = t.find((x) => x.id === f);
    p && (p.minimized ? r(f) : n(f));
  }
  function h() {
    c((f) => !f), a && i(!1);
  }
  function u() {
    i((f) => !f), s && c(!1);
  }
  return /* @__PURE__ */ g(B, { children: [
    a && /* @__PURE__ */ o(Lc, { apps: e, onClose: () => i(!1) }),
    s && /* @__PURE__ */ o(Xc, { onClose: () => c(!1) }),
    /* @__PURE__ */ g(
      "div",
      {
        "data-testid": "j-os-taskbar",
        className: "j-os-taskbar",
        onClick: () => {
          s && c(!1);
        },
        children: [
          /* @__PURE__ */ o(
            "button",
            {
              "data-testid": "j-os-start-btn",
              className: "j-os-taskbar__start",
              onClick: (f) => {
                f.stopPropagation(), u();
              },
              "aria-label": "Start",
              children: "⊞"
            }
          ),
          /* @__PURE__ */ o("div", { className: "j-os-taskbar__apps", children: t.map((f) => {
            const p = e.find((x) => x.id === f.appId);
            return /* @__PURE__ */ g(
              "button",
              {
                "data-testid": `taskbar-app-${f.appId}`,
                className: `j-os-taskbar__app${f.minimized ? "" : " j-os-taskbar__app--active"}`,
                onClick: (x) => {
                  x.stopPropagation(), d(f.id);
                },
                children: [
                  (p == null ? void 0 : p.icon) && /* @__PURE__ */ o("span", { children: p.icon }),
                  f.title
                ]
              },
              f.id
            );
          }) }),
          /* @__PURE__ */ o(
            "button",
            {
              "data-testid": "j-os-tray",
              className: `j-os-taskbar__tray${s ? " j-os-taskbar__tray--active" : ""}`,
              onClick: (f) => {
                f.stopPropagation(), h();
              },
              "aria-label": "Notification center",
              children: /* @__PURE__ */ o("span", { "data-testid": "j-os-clock", children: l })
            }
          )
        ]
      }
    )
  ] });
}
function Uc({ apps: e }) {
  const { windows: t, openWindow: n, focusWindow: r, restoreWindow: a } = Ze();
  function i(s) {
    const c = t.find((l) => l.appId === s.id);
    c ? c.minimized ? a(c.id) : r(c.id) : n({ appId: s.id, title: s.label, icon: s.icon, content: s.component, width: s.defaultWidth, height: s.defaultHeight });
  }
  return /* @__PURE__ */ o("div", { "data-testid": "j-os-dock", className: "j-os-dock", children: e.map((s) => {
    const c = t.some((l) => l.appId === s.id);
    return /* @__PURE__ */ g("div", { className: "j-os-dock__item", title: s.label, onClick: () => i(s), children: [
      /* @__PURE__ */ o("span", { className: "j-os-dock__icon", children: s.icon }),
      c && /* @__PURE__ */ o("span", { className: "j-os-dock__dot" })
    ] }, s.id);
  }) });
}
function Kc({ appName: e, menus: t = [] }) {
  const [n, r] = $(null), a = (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  function i(s) {
    r((c) => c === s ? null : s);
  }
  return /* @__PURE__ */ g("div", { "data-testid": "j-os-menubar", className: "j-os-menubar", children: [
    /* @__PURE__ */ o("button", { className: "j-os-menubar__item", onClick: () => r(null) }),
    e && /* @__PURE__ */ o("button", { className: "j-os-menubar__item", style: { fontWeight: 700 }, children: e }),
    t.map((s) => /* @__PURE__ */ g("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ o("button", { className: "j-os-menubar__item", onClick: () => i(s.label), children: s.label }),
      n === s.label && /* @__PURE__ */ o("div", { className: "j-os-menubar__dropdown", children: s.items.map(
        (c, l) => c.divider ? /* @__PURE__ */ o("div", { className: "j-os-menubar__divider" }, l) : /* @__PURE__ */ g(
          "button",
          {
            className: "j-os-menubar__dropdown-item",
            onClick: () => {
              c.onClick(), r(null);
            },
            children: [
              c.label,
              c.shortcut && /* @__PURE__ */ o("span", { className: "j-os-menubar__shortcut", children: c.shortcut })
            ]
          },
          c.label
        )
      ) })
    ] }, s.label)),
    /* @__PURE__ */ o("span", { "data-testid": "j-os-menubar-clock", className: "j-os-menubar__clock", children: a })
  ] });
}
function Qc({ apps: e, wallpaper: t, initialWindows: n }) {
  const { windows: r, openWindow: a, setDesktopSize: i } = Ze(), s = Lt(), c = L(null), l = s === "windows11";
  U(() => {
    const u = c.current;
    if (!u) return;
    const f = new ResizeObserver(([p]) => {
      const { width: x, height: y } = p.contentRect;
      i(Math.round(x), Math.round(y));
    });
    return f.observe(u), () => f.disconnect();
  }, [i]), U(() => {
    if (n != null && n.length)
      for (const u of n) {
        const f = e.find((p) => p.id === u);
        f && a({
          appId: f.id,
          title: f.label,
          icon: f.icon,
          content: f.component,
          width: f.defaultWidth,
          height: f.defaultHeight
        });
      }
  }, []);
  const d = E((u) => {
    a({
      appId: u.id,
      title: u.label,
      icon: u.icon,
      content: u.component,
      width: u.defaultWidth,
      height: u.defaultHeight
    });
  }, [a]);
  return /* @__PURE__ */ g("div", { ref: c, className: "j-os-desktop", style: {
    position: "relative",
    width: "100%",
    height: "100%",
    background: t ?? "var(--os-bg)",
    overflow: "hidden"
  }, children: [
    !l && /* @__PURE__ */ o(Kc, { appName: "Desktop" }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "j-os-desktop__icons",
        style: { top: l ? 12 : "calc(var(--os-menubar-h) + 12px)" },
        children: e.map((u) => /* @__PURE__ */ g(
          "div",
          {
            "data-app-id": u.id,
            className: "j-os-icon",
            onDoubleClick: () => d(u),
            children: [
              /* @__PURE__ */ o("span", { className: "j-os-icon__emoji", children: u.icon }),
              /* @__PURE__ */ o("span", { className: "j-os-icon__label", children: u.label })
            ]
          },
          u.id
        ))
      }
    ),
    r.filter((u) => !u.minimized).map((u) => /* @__PURE__ */ o(Hc, { id: u.id }, u.id)),
    l ? /* @__PURE__ */ o(Vc, { apps: e }) : /* @__PURE__ */ o(Uc, { apps: e })
  ] });
}
function rd({
  theme: e,
  apps: t,
  wallpaper: n,
  compactBreakpoint: r = 900,
  initialWindows: a
}) {
  return /* @__PURE__ */ o(Ec, { theme: e, children: /* @__PURE__ */ o(Bc, { compactBreakpoint: r, children: /* @__PURE__ */ o(Qc, { apps: t, wallpaper: n, initialWindows: a }) }) });
}
function Yr(e) {
  return e.icon ? e.icon : e.type === "folder" ? "📁" : "📄";
}
function zr({ node: e, depth: t, expanded: n, selected: r, onExpand: a, onSelect: i }) {
  const s = n.has(e.id), c = r === e.id;
  function l() {
    a(e.id), i(e);
  }
  return /* @__PURE__ */ g(B, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        "data-testid": `tree-${e.id}`,
        className: `j-os-tree-item${c ? " j-os-tree-item--active" : ""}`,
        style: { paddingLeft: 8 + t * 14 },
        onClick: l,
        children: [
          /* @__PURE__ */ o("span", { className: "j-os-tree-item__caret", children: s ? "▾" : "▸" }),
          /* @__PURE__ */ o("span", { children: Yr(e) }),
          /* @__PURE__ */ o("span", { children: e.name })
        ]
      }
    ),
    s && (e.children ?? []).filter((d) => d.type === "folder").map((d) => /* @__PURE__ */ o(
      zr,
      {
        node: d,
        depth: t + 1,
        expanded: n,
        selected: r,
        onExpand: a,
        onSelect: i
      },
      d.id
    ))
  ] });
}
function Br(e, t) {
  for (const n of e) {
    if (n.id === t) return n;
    if (n.children) {
      const r = Br(n.children, t);
      if (r) return r;
    }
  }
  return null;
}
function Zc(e, t) {
  function n(r, a) {
    for (const i of r) {
      const s = [...a, i];
      if (i.id === t) return s;
      if (i.children) {
        const c = n(i.children, s);
        if (c) return c;
      }
    }
    return null;
  }
  return n(e, []) ?? [];
}
function ad({ tree: e, onOpen: t, onSelect: n, initialPath: r }) {
  const [a, i] = $(new Set(r ?? [])), [s, c] = $(null), [l, d] = $(null);
  function h(b) {
    i((j) => {
      const M = new Set(j);
      return M.has(b) ? M.delete(b) : M.add(b), M;
    });
  }
  function u(b) {
    c(b.id);
  }
  function f(b) {
    d(b.id), n == null || n(b), b.type === "folder" && (h(b.id), c(b.id));
  }
  function p(b) {
    t == null || t(b);
  }
  const x = s ? Br(e, s) : null, y = ((x == null ? void 0 : x.children) ?? []).filter((b) => b.type === "file"), w = s ? Zc(e, s) : [], v = "Home" + (w.length > 0 ? " / " + w.map((b) => b.name).join(" / ") : "");
  return /* @__PURE__ */ g("div", { className: "j-os-fileexplorer", children: [
    /* @__PURE__ */ o("div", { className: "j-os-fileexplorer__breadcrumb", children: /* @__PURE__ */ o("span", { children: v }) }),
    /* @__PURE__ */ g("div", { className: "j-os-fileexplorer__body", children: [
      /* @__PURE__ */ o("div", { className: "j-os-fileexplorer__tree", children: e.map((b) => /* @__PURE__ */ o(
        zr,
        {
          node: b,
          depth: 0,
          expanded: a,
          selected: s,
          onExpand: h,
          onSelect: u
        },
        b.id
      )) }),
      /* @__PURE__ */ o("div", { className: "j-os-fileexplorer__pane", children: y.map((b) => /* @__PURE__ */ g(
        "div",
        {
          className: `j-os-pane-item${l === b.id ? " j-os-pane-item--active" : ""}`,
          onClick: () => f(b),
          onDoubleClick: () => p(b),
          children: [
            /* @__PURE__ */ o("span", { className: "j-os-pane-item__icon", children: Yr(b) }),
            /* @__PURE__ */ o("span", { className: "j-os-pane-item__name", children: b.name })
          ]
        },
        b.id
      )) })
    ] })
  ] });
}
function el(e) {
  return e >= 80 ? "j-os-tm-bar__fill--danger" : e >= 50 ? "j-os-tm-bar__fill--warn" : "";
}
function Hn({ value: e, label: t }) {
  return /* @__PURE__ */ g("div", { className: "j-os-tm-bar", children: [
    /* @__PURE__ */ o("div", { className: "j-os-tm-bar__track", children: /* @__PURE__ */ o("div", { className: `j-os-tm-bar__fill ${el(e)}`, style: { width: `${Math.min(100, e)}%` } }) }),
    /* @__PURE__ */ o("span", { className: "j-os-tm-bar__label", children: t })
  ] });
}
function tl({ status: e }) {
  return /* @__PURE__ */ g("span", { className: `j-os-tm-status j-os-tm-status--${e}`, children: [
    /* @__PURE__ */ o("span", { className: "j-os-tm-status__dot" }),
    e
  ] });
}
function od({ processes: e, onKill: t }) {
  const [n, r] = $("name"), [a, i] = $(!0);
  function s(d) {
    n === d ? i((h) => !h) : (r(d), i(!0));
  }
  const c = [...e].sort((d, h) => {
    let u = d[n], f = h[n];
    return typeof u == "string" && (u = u.toLowerCase()), typeof f == "string" && (f = f.toLowerCase()), u < f ? a ? -1 : 1 : u > f ? a ? 1 : -1 : 0;
  });
  function l({ col: d, label: h }) {
    const u = n === d ? a ? "↑" : "↓" : "";
    return /* @__PURE__ */ g("th", { onClick: () => s(d), children: [
      /* @__PURE__ */ o("span", { children: h }),
      u && /* @__PURE__ */ g("span", { "aria-hidden": "true", children: [
        " ",
        u
      ] })
    ] });
  }
  return /* @__PURE__ */ o("div", { className: "j-os-taskmanager", children: /* @__PURE__ */ o("div", { style: { flex: 1, overflow: "auto" }, children: /* @__PURE__ */ g("table", { className: "j-os-taskmanager__table", children: [
    /* @__PURE__ */ o("thead", { children: /* @__PURE__ */ g("tr", { children: [
      /* @__PURE__ */ o(l, { col: "name", label: "Name" }),
      /* @__PURE__ */ o(l, { col: "pid", label: "PID" }),
      /* @__PURE__ */ o(l, { col: "cpu", label: "CPU" }),
      /* @__PURE__ */ o(l, { col: "memory", label: "Memory" }),
      /* @__PURE__ */ o(l, { col: "status", label: "Status" }),
      t && /* @__PURE__ */ o("th", {})
    ] }) }),
    /* @__PURE__ */ o("tbody", { children: c.map((d) => /* @__PURE__ */ g("tr", { children: [
      /* @__PURE__ */ o("td", { children: d.name }),
      /* @__PURE__ */ o("td", { children: d.pid }),
      /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o(Hn, { value: d.cpu, label: `${d.cpu}%` }) }),
      /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o(Hn, { value: d.memory / 2048 * 100, label: `${d.memory} MB` }) }),
      /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o(tl, { status: d.status }) }),
      t && /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o("button", { className: "j-os-tm-kill", onClick: () => t(d.pid), children: "Kill" }) })
    ] }, d.pid)) })
  ] }) }) });
}
function id({ sections: e, defaultSection: t }) {
  const [n, r] = $(t ?? null), [a, i] = $(""), s = e.filter(
    (l) => l.label.toLowerCase().includes(a.toLowerCase())
  ), c = e.find((l) => l.id === n);
  return /* @__PURE__ */ g("div", { className: "j-os-controlpanel", children: [
    /* @__PURE__ */ o("div", { className: "j-os-controlpanel__search", children: /* @__PURE__ */ o(
      "input",
      {
        type: "text",
        placeholder: "Search settings...",
        value: a,
        onChange: (l) => i(l.target.value)
      }
    ) }),
    /* @__PURE__ */ g("div", { className: "j-os-controlpanel__body", children: [
      /* @__PURE__ */ o("div", { className: "j-os-controlpanel__grid", children: s.map((l) => /* @__PURE__ */ g(
        "button",
        {
          className: `j-os-cp-item${n === l.id ? " j-os-cp-item--active" : ""}`,
          onClick: () => r(l.id),
          children: [
            /* @__PURE__ */ o("span", { className: "j-os-cp-item__icon", children: l.icon }),
            /* @__PURE__ */ o("span", { className: "j-os-cp-item__label", children: l.label })
          ]
        },
        l.id
      )) }),
      /* @__PURE__ */ o("div", { className: "j-os-controlpanel__pane", children: c ? c.component : /* @__PURE__ */ o("div", { style: { color: "var(--os-text-muted)", fontSize: 13, marginTop: 16 }, children: "Select a setting from the left panel." }) })
    ] })
  ] });
}
export {
  $l as JAccordion,
  Kl as JActivityFeed,
  Nl as JAlert,
  _l as JArcMeter,
  Vl as JArcReactor,
  Sr as JBadge,
  Fl as JBarChart,
  Rl as JBootScreen,
  ul as JButton,
  Fa as JCard,
  ml as JCheckbox,
  Jl as JCommandPalette,
  id as JControlPanel,
  qs as JDataRow,
  xl as JDatePicker,
  jl as JDateRangePicker,
  rd as JDesktop,
  kl as JDivider,
  Uc as JDock,
  Yl as JDonutChart,
  ql as JDragWidget,
  ad as JFileExplorer,
  bl as JFormField,
  zl as JGaugeChart,
  Ul as JHeatmap,
  Xe as JHudBar,
  Zl as JHudCanvas,
  Xl as JHudClock,
  ll as JHudFrame,
  dl as JHudFrameCard,
  Sl as JHudLabel,
  fl as JInput,
  Ql as JKPITicker,
  Al as JLineChart,
  Kc as JMenuBar,
  Ml as JModal,
  sl as JNavItem,
  ed as JNodeGraph,
  nd as JOSNotificationProvider,
  Ec as JOSThemeProvider,
  Pl as JOrb,
  cl as JPageLayout,
  Tl as JPagination,
  Rs as JProgress,
  Bl as JRadarChart,
  Ll as JRadialItem,
  Gl as JRadialMenu,
  gl as JRadio,
  pl as JSelect,
  Da as JSidebar,
  vl as JSlider,
  El as JSparkline,
  At as JSpinner,
  Lc as JStartMenu,
  Ol as JStatCard,
  Ys as JStatusPill,
  ec as JTab,
  Hl as JTable,
  Wl as JTabs,
  od as JTaskManager,
  Vc as JTaskbar,
  hl as JTextArea,
  il as JThemePicker,
  ol as JThemeProvider,
  wl as JTimePicker,
  Cl as JToastProvider,
  yl as JToggle,
  Il as JWaveform,
  Hc as JWindow,
  Bc as JWindowManager,
  q as JarvisTokens,
  _t as PRESETS,
  Ir as RadialMenuContext,
  ba as toCss,
  td as useOSNotify,
  Jc as useOSNotifyOptional,
  Lt as useOSTheme,
  wc as useRadialMenu,
  wa as useTheme,
  Dl as useToast,
  Ze as useWindowManager
};
