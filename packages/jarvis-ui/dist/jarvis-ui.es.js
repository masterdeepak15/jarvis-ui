import { jsx as o, jsxs as g, Fragment as B } from "react/jsx-runtime";
import W, { useState as $, useEffect as U, useContext as je, createContext as we, useCallback as E, useRef as q, useLayoutEffect as fa, useMemo as Le, Children as ha, isValidElement as pa, useId as Bn } from "react";
import { createPortal as Rn } from "react-dom";
function Fe(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
  const n = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), a = parseInt(t.slice(4, 6), 16);
  return `${n},${r},${a}`;
}
function ma(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
  const n = Math.max(0, parseInt(t.slice(0, 2), 16) - 4), r = Math.max(0, parseInt(t.slice(2, 4), 16) - 2), a = Math.max(0, parseInt(t.slice(4, 6), 16) - 2);
  return `#${n.toString(16).padStart(2, "0")}${r.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`;
}
function ga(e) {
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
  --j-bg-danger:    ${ma(e.bg)};
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
}, Tt = {
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
}, ya = {
  CornerBracket: "j-card-s1",
  Notched: "j-card-s2",
  SideRail: "j-card-s3",
  GlowBorder: "j-card-s4",
  PartialBorder: "j-card-s5",
  DangerPulse: "j-card-s6",
  Hexagonal: "j-card-s7",
  Radar: "j-card-s8",
  DoubleFrame: "j-card-s9"
}, va = {
  LeftNotch: "j-btn-left-notch",
  RightNotch: "j-btn-right-notch",
  BothNotch: "j-btn-both-notch",
  Parallelogram: "j-btn-parallelogram",
  GhostSkew: "j-btn-ghost-skew",
  BracketFrame: "j-btn-bracket",
  Hexagonal: "j-btn-hex",
  IconSquare: "j-btn-icon-sq",
  ScanFull: "j-btn-scan-full"
}, L = {
  color: (e) => e ? `j-color-${e}` : "",
  size: (e) => e ? `j-size-${e}` : "",
  variant: (e) => e ? `j-variant-${e}` : "",
  state: (e) => e ? `j-state-${e}` : "",
  animSpeed: (e) => e ? `j-anim-${e}` : "",
  cardStyle: (e) => e ? ya[e] : "",
  buttonShape: (e) => e ? va[e] : "",
  cls: (...e) => e.filter(Boolean).join(" ")
}, Hn = we(null);
function Qc({ children: e, preset: t = "cyan", theme: n }) {
  const [r, a] = $(n ?? Tt[t]);
  U(() => {
    let c = document.getElementById("jarvis-theme-vars");
    c || (c = document.createElement("style"), c.id = "jarvis-theme-vars", document.head.appendChild(c)), c.textContent = ga(r);
  }, [r]);
  const i = (c) => a(c), s = (c) => a(Tt[c]);
  return /* @__PURE__ */ o(Hn.Provider, { value: { theme: r, setTheme: i, setPreset: s }, children: e });
}
function ba() {
  const e = je(Hn);
  if (!e) throw new Error("useTheme must be used inside JThemeProvider");
  return e;
}
const xa = [
  { preset: "cyan", color: "var(--j-accent)", label: "Cyan" },
  { preset: "amber", color: "var(--j-warn)", label: "Amber" },
  { preset: "green", color: "var(--j-ok)", label: "Green" },
  { preset: "red", color: "var(--j-err)", label: "Red" },
  { preset: "purple", color: Tt.purple.accent, label: "Purple" },
  { preset: "white", color: "var(--j-accent-deep)", label: "White" }
];
function Zc({ compact: e = !1, showCustom: t = !0 }) {
  const { theme: n, setPreset: r, setTheme: a } = ba(), [i, s] = $(!1), [c, l] = $(n.accent), [d, h] = $(n.bg), [u, f] = $(n.bgCard);
  function p(x, k) {
    const y = e ? "20px" : "48px", b = e ? "4px" : "6px";
    return {
      width: y,
      height: e ? "20px" : "32px",
      background: x,
      border: `2px solid ${k ? "var(--j-text-primary)" : "transparent"}`,
      boxShadow: k ? `0 0 12px ${x}` : "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      clipPath: `polygon(${b} 0,100% 0,calc(100% - ${b}) 100%,0 100%)`,
      transition: "all .15s"
    };
  }
  function v() {
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
    /* @__PURE__ */ o("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" }, children: xa.map(({ preset: x, color: k, label: y }) => {
      const b = !i && n.preset === x;
      return /* @__PURE__ */ o(
        "button",
        {
          title: y,
          "aria-pressed": b,
          onClick: () => {
            s(!1), r(x);
          },
          style: p(k, b),
          children: !e && /* @__PURE__ */ o("span", { style: {
            fontSize: "9px",
            fontFamily: "'Courier New', monospace",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: b ? "var(--j-bg)" : k,
            marginTop: "2px"
          }, children: y })
        },
        x
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
            onChange: (x) => l(x.target.value),
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
              onChange: (x) => h(x.target.value),
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
              onChange: (x) => f(x.target.value),
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
const ja = [
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
], Zt = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10], wa = Array.from({ length: 20 }, (e, t) => ({
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
  return /* @__PURE__ */ g("div", { className: L.cls(
    e === "top" ? "j-hud-bar-top" : "j-hud-bar-bot",
    L.color(t),
    L.animSpeed(n)
  ), children: [
    r && /* @__PURE__ */ o("span", { className: "j-text-xs", children: r }),
    a && /* @__PURE__ */ o("div", { className: "j-dot-seq", children: ja.map((f, p) => /* @__PURE__ */ o(
      "div",
      {
        className: L.cls("j-d", f === "sq" && "sq", f === "tall" && "tall"),
        style: { animationDelay: `${(p * 0.08).toFixed(2)}s` }
      },
      p
    )) }),
    /* @__PURE__ */ o("div", { style: { flex: 1, height: 1, background: "linear-gradient(90deg,var(--j-accent-25),transparent)" } }),
    s && /* @__PURE__ */ g(B, { children: [
      /* @__PURE__ */ o("div", { className: "j-tick-row", children: Array.from({ length: d }, (f, p) => /* @__PURE__ */ o(
        "div",
        {
          className: L.cls("j-tk", p >= h && "off"),
          style: { height: Zt[p % Zt.length] }
        },
        p
      )) }),
      /* @__PURE__ */ o("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", flexShrink: 0 } })
    ] }),
    i && /* @__PURE__ */ g(B, { children: [
      /* @__PURE__ */ o("div", { className: "j-waveform", style: { flex: 1, maxWidth: 260 }, children: wa.map((f, p) => /* @__PURE__ */ o(
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
function Ft({ size: e = "64px", color: t = "cyan", label: n, showLabel: r = !0 }) {
  const a = parseFloat(e);
  return /* @__PURE__ */ g("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: L.color(t),
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
const ka = {
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
function el({ href: e, icon: t, label: n, badge: r, active: a = !1, onClick: i }) {
  const s = {
    ...ka,
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
function en() {
  const e = /* @__PURE__ */ new Date();
  return `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`;
}
function Sa({
  systemName: e = "JARVIS",
  version: t = "v4.2.1",
  navLabel: n = "Navigation",
  width: r = "220px",
  color: a = "cyan",
  children: i,
  footer: s
}) {
  const [c, l] = $(en);
  return U(() => {
    const d = setInterval(() => l(en()), 1e4);
    return () => clearInterval(d);
  }, []), /* @__PURE__ */ g(
    "aside",
    {
      className: L.cls("j-sidebar", L.color(a)),
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
          /* @__PURE__ */ o(Ft, { size: "36px", color: a }),
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
function tl({
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
  bottomBar: v,
  children: x
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
        Sa,
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
        /* @__PURE__ */ o("div", { className: "j-scroll", style: { padding: h, position: "relative", zIndex: 1 }, children: x })
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
        children: v
      }
    )
  ] });
}
function nl({
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
function Na() {
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
function Ma() {
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
function Da() {
  return /* @__PURE__ */ g(B, { children: [
    ["tl1", "tl2", "tr1", "tr2", "bl1", "bl2", "br1", "br2"].map((e) => /* @__PURE__ */ o("div", { className: `j-hfc-g-seg-${e}` }, e)),
    /* @__PURE__ */ o("div", { className: "j-hfc-g-center-ring" }),
    /* @__PURE__ */ o("div", { className: "j-hfc-scan-v" })
  ] });
}
function Ca() {
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
const Oa = {
  Alpha: "j-hfc-alpha",
  Beta: "j-hfc-beta",
  Gamma: "j-hfc-gamma",
  Delta: "j-hfc-delta"
};
function rl({
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
      className: L.cls("j-hfc", Oa[e], L.color(t)),
      style: { width: i, height: s },
      children: [
        e === "Alpha" && /* @__PURE__ */ o(Na, {}),
        e === "Beta" && /* @__PURE__ */ o(Ma, {}),
        e === "Gamma" && /* @__PURE__ */ o(Da, {}),
        e === "Delta" && /* @__PURE__ */ o(Ca, {}),
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
const Wa = /* @__PURE__ */ new Set(["LeftNotch", "RightNotch", "BothNotch"]), $a = /* @__PURE__ */ new Set(["Parallelogram", "GhostSkew", "BracketFrame", "Hexagonal", "IconSquare", "ScanFull"]), Ta = {
  LeftNotch: "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)",
  RightNotch: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)",
  BothNotch: "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))"
};
function al({
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
  const u = L.buttonShape(e), f = Wa.has(e), p = $a.has(e), v = f ? {
    clipPath: Ta[e],
    border: "1px solid var(--j-accent)"
  } : {};
  return /* @__PURE__ */ g(
    "button",
    {
      type: l,
      disabled: i || a,
      onClick: d,
      className: L.cls("j-btn", u, L.color(t), L.size(n), r ? L.variant(r) : ""),
      style: v,
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
function Ia({ cardStyle: e }) {
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
const tn = {
  paddingBottom: 10,
  marginBottom: 10,
  borderBottom: "1px solid var(--j-border-dim)",
  position: "relative",
  zIndex: 1
}, nn = {
  paddingTop: 10,
  marginTop: 10,
  borderTop: "1px solid var(--j-border-dim)",
  position: "relative",
  zIndex: 1
};
function Pa({
  cardStyle: e = "CornerBracket",
  color: t = "cyan",
  header: n,
  footer: r,
  padding: a = "14px 16px",
  children: i
}) {
  const s = L.cls("j-card", L.cardStyle(e), L.color(t));
  return e === "DoubleFrame" ? /* @__PURE__ */ g("div", { className: s, children: [
    /* @__PURE__ */ o("div", { className: "j-df-corner" }),
    /* @__PURE__ */ g("div", { className: "j-inner-frame", children: [
      n && /* @__PURE__ */ o("div", { style: tn, children: n }),
      i,
      r && /* @__PURE__ */ o("div", { style: nn, children: r })
    ] })
  ] }) : /* @__PURE__ */ g("div", { className: s, style: { padding: a }, children: [
    /* @__PURE__ */ o(Ia, { cardStyle: e }),
    n && /* @__PURE__ */ o("div", { style: tn, children: n }),
    /* @__PURE__ */ o("div", { style: { position: "relative", zIndex: 1 }, children: i }),
    r && /* @__PURE__ */ o("div", { style: nn, children: r })
  ] });
}
const _a = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }, Ea = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function ol({
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
    height: _a[l] ?? 38,
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${c ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: c ? "var(--j-err)" : "var(--j-border)",
    color: c ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: Ea[l] ?? 12,
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
const Fa = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function il({
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
    fontSize: Fa[d] ?? 12,
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
const Ya = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }, Aa = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function sl({
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
    height: Ya[c] ?? 38,
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${s ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: s ? "var(--j-err)" : "var(--j-border)",
    color: s ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: Aa[c] ?? 12,
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
function cl({
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
function ll({ checked: e, onChange: t, label: n, value: r, name: a, disabled: i = !1 }) {
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
function dl({
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
function ul({
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
    const v = Number(p.target.value);
    e === void 0 && d(v), n == null || n(v);
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
function fl({ label: e, error: t, hint: n, required: r, children: a }) {
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
function za(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const kt = {}, Re = {};
function ye(e, t) {
  try {
    const r = (kt[e] || (kt[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in Re ? Re[r] : rn(r, r.split(":"));
  } catch {
    if (e in Re) return Re[e];
    const n = e == null ? void 0 : e.match(Ba);
    return n ? rn(e, n.slice(1)) : NaN;
  }
}
const Ba = /([+-]\d\d):?(\d\d)?/;
function rn(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), a = +(t[2] || 0) / 60;
  return Re[e] = n * 60 + r > 0 ? n * 60 + r + a : n * 60 - r - a;
}
class fe extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(ye(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Jn(this, t)) : this.setTime(Date.now());
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
    return Date.prototype.setTime.apply(this, arguments), pt(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new fe(+new Date(t), this.timeZone);
  }
  //#endregion
}
const an = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!an.test(e)) return;
  const t = e.replace(an, "$1UTC");
  fe.prototype[t] && (e.startsWith("get") ? fe.prototype[e] = function() {
    return this.internal[t]();
  } : (fe.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Ra(this), +this;
  }, fe.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), pt(this), +this;
  }));
});
function pt(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - // Round after converting minutes to seconds to avoid fractional offset
  // precision errors from historical offsets.
  Math.round(-ye(e.timeZone, e) * 60));
}
function Ra(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Jn(e);
}
function Jn(e, t) {
  const n = Array.isArray(t) ? Ha(t) : +e.internal, r = ye(e.timeZone, e), a = r > 0 ? Math.floor(r) : Math.ceil(r), i = /* @__PURE__ */ new Date(+e);
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
  const v = ye(e.timeZone, e), x = v > 0 ? Math.floor(v) : Math.ceil(v), y = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - x, b = x !== a, j = y - h, M = x - a, S = n - x * 60 * 1e3, m = M > 0 && on(e) - n === M * 60 * 1e3 && on(e, S) !== n;
  if (b && j && !m) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + j);
    const C = ye(e.timeZone, e), D = C > 0 ? Math.floor(C) : Math.ceil(C), T = x - D;
    T && j < 0 && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + T);
  }
  pt(e);
  const N = (t ? n : n + p * 1e3) - +e.internal;
  N && Math.abs(N) < 30 * 60 * 1e3 && (Date.prototype.setTime.call(e, +e + N), pt(e));
}
function Ha(e) {
  return Date.UTC(e[0], e.length > 1 ? e[1] : 0, e.length > 2 ? e[2] : 1, ...e.slice(3));
}
function on(e, t) {
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
    return `${t} GMT${n}${r}${a} (${za(this.timeZone, this)})`;
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
const Gn = 6048e5, Ja = 864e5, sn = Symbol.for("constructDateFrom");
function V(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && sn in e ? e[sn](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function z(e, t) {
  return V(t || e, e);
}
function qn(e, t, n) {
  const r = z(e, n == null ? void 0 : n.in);
  return isNaN(t) ? V(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ln(e, t, n) {
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
let Ga = {};
function Ke() {
  return Ga;
}
function Pe(e, t) {
  var c, l, d, h;
  const n = Ke(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((h = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : h.weekStartsOn) ?? 0, a = z(e, t == null ? void 0 : t.in), i = a.getDay(), s = (i < r ? 7 : 0) + i - r;
  return a.setDate(a.getDate() - s), a.setHours(0, 0, 0, 0), a;
}
function Ve(e, t) {
  return Pe(e, { ...t, weekStartsOn: 1 });
}
function Xn(e, t) {
  const n = z(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = V(n, 0);
  a.setFullYear(r + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const i = Ve(a), s = V(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const c = Ve(s);
  return n.getTime() >= i.getTime() ? r + 1 : n.getTime() >= c.getTime() ? r : r - 1;
}
function cn(e) {
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
function _e(e, ...t) {
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
  const [r, a] = _e(
    n == null ? void 0 : n.in,
    e,
    t
  ), i = Ue(r), s = Ue(a), c = +i - cn(i), l = +s - cn(s);
  return Math.round((c - l) / Ja);
}
function qa(e, t) {
  const n = Xn(e, t), r = V(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Ve(r);
}
function La(e, t, n) {
  return qn(e, t * 7, n);
}
function Xa(e, t, n) {
  return Ln(e, t * 12, n);
}
function Va(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((a) => {
    !r && typeof a == "object" && (r = V.bind(null, a));
    const i = z(a, r);
    (!n || n < i || isNaN(+i)) && (n = i);
  }), V(r, n || NaN);
}
function Ua(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((a) => {
    !r && typeof a == "object" && (r = V.bind(null, a));
    const i = z(a, r);
    (!n || n > i || isNaN(+i)) && (n = i);
  }), V(r, n || NaN);
}
function Ka(e, t, n) {
  const [r, a] = _e(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +Ue(r) == +Ue(a);
}
function Vn(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Qa(e) {
  return !(!Vn(e) && typeof e != "number" || isNaN(+z(e)));
}
function Un(e, t, n) {
  const [r, a] = _e(
    n == null ? void 0 : n.in,
    e,
    t
  ), i = r.getFullYear() - a.getFullYear(), s = r.getMonth() - a.getMonth();
  return i * 12 + s;
}
function Za(e, t) {
  const n = z(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Kn(e, t) {
  const [n, r] = _e(e, t.start, t.end);
  return { start: n, end: r };
}
function eo(e, t) {
  const { start: n, end: r } = Kn(t == null ? void 0 : t.in, e);
  let a = +n > +r;
  const i = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let c = 1;
  const l = [];
  for (; +s <= i; )
    l.push(V(n, s)), s.setMonth(s.getMonth() + c);
  return a ? l.reverse() : l;
}
function to(e, t) {
  const n = z(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function no(e, t) {
  const n = z(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Qn(e, t) {
  const n = z(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function ro(e, t) {
  const { start: n, end: r } = Kn(t == null ? void 0 : t.in, e);
  let a = +n > +r;
  const i = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let c = 1;
  const l = [];
  for (; +s <= i; )
    l.push(V(n, s)), s.setFullYear(s.getFullYear() + c);
  return a ? l.reverse() : l;
}
function Zn(e, t) {
  var c, l, d, h;
  const n = Ke(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((h = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : h.weekStartsOn) ?? 0, a = z(e, t == null ? void 0 : t.in), i = a.getDay(), s = (i < r ? -7 : 0) + 6 - (i - r);
  return a.setDate(a.getDate() + s), a.setHours(23, 59, 59, 999), a;
}
function ao(e, t) {
  return Zn(e, { ...t, weekStartsOn: 1 });
}
const oo = {
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
}, io = (e, t, n) => {
  let r;
  const a = oo[e];
  return typeof a == "string" ? r = a : t === 1 ? r = a.one : r = a.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function St(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const so = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, co = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, lo = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, uo = {
  date: St({
    formats: so,
    defaultWidth: "full"
  }),
  time: St({
    formats: co,
    defaultWidth: "full"
  }),
  dateTime: St({
    formats: lo,
    defaultWidth: "full"
  })
}, fo = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, ho = (e, t, n, r) => fo[e];
function Ye(e) {
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
const po = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, mo = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, go = {
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
}, yo = {
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
}, vo = {
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
}, bo = {
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
}, xo = (e, t) => {
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
}, jo = {
  ordinalNumber: xo,
  era: Ye({
    values: po,
    defaultWidth: "wide"
  }),
  quarter: Ye({
    values: mo,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ye({
    values: go,
    defaultWidth: "wide"
  }),
  day: Ye({
    values: yo,
    defaultWidth: "wide"
  }),
  dayPeriod: Ye({
    values: vo,
    defaultWidth: "wide",
    formattingValues: bo,
    defaultFormattingWidth: "wide"
  })
};
function Ae(e) {
  return (t, n = {}) => {
    const r = n.width, a = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], i = t.match(a);
    if (!i)
      return null;
    const s = i[0], c = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(c) ? ko(c, (u) => u.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      wo(c, (u) => u.test(s))
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
function wo(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function ko(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function So(e) {
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
const No = /^(\d+)(th|st|nd|rd)?/i, Mo = /\d+/i, Do = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Co = {
  any: [/^b/i, /^(a|c)/i]
}, Oo = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Wo = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, $o = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, To = {
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
}, Io = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Po = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, _o = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Eo = {
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
}, Fo = {
  ordinalNumber: So({
    matchPattern: No,
    parsePattern: Mo,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ae({
    matchPatterns: Do,
    defaultMatchWidth: "wide",
    parsePatterns: Co,
    defaultParseWidth: "any"
  }),
  quarter: Ae({
    matchPatterns: Oo,
    defaultMatchWidth: "wide",
    parsePatterns: Wo,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ae({
    matchPatterns: $o,
    defaultMatchWidth: "wide",
    parsePatterns: To,
    defaultParseWidth: "any"
  }),
  day: Ae({
    matchPatterns: Io,
    defaultMatchWidth: "wide",
    parsePatterns: Po,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ae({
    matchPatterns: _o,
    defaultMatchWidth: "any",
    parsePatterns: Eo,
    defaultParseWidth: "any"
  })
}, Ie = {
  code: "en-US",
  formatDistance: io,
  formatLong: uo,
  formatRelative: ho,
  localize: jo,
  match: Fo,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Yo(e, t) {
  const n = z(e, t == null ? void 0 : t.in);
  return Yt(n, Qn(n)) + 1;
}
function At(e, t) {
  const n = z(e, t == null ? void 0 : t.in), r = +Ve(n) - +qa(n);
  return Math.round(r / Gn) + 1;
}
function er(e, t) {
  var h, u, f, p;
  const n = z(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = Ke(), i = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (h = t == null ? void 0 : t.locale) == null ? void 0 : h.options) == null ? void 0 : u.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((p = (f = a.locale) == null ? void 0 : f.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = V((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, i), s.setHours(0, 0, 0, 0);
  const c = Pe(s, t), l = V((t == null ? void 0 : t.in) || e, 0);
  l.setFullYear(r, 0, i), l.setHours(0, 0, 0, 0);
  const d = Pe(l, t);
  return +n >= +c ? r + 1 : +n >= +d ? r : r - 1;
}
function Ao(e, t) {
  var c, l, d, h;
  const n = Ke(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((h = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, a = er(e, t), i = V((t == null ? void 0 : t.in) || e, 0);
  return i.setFullYear(a, 0, r), i.setHours(0, 0, 0, 0), Pe(i, t);
}
function zt(e, t) {
  const n = z(e, t == null ? void 0 : t.in), r = +Pe(n, t) - +Ao(n, t);
  return Math.round(r / Gn) + 1;
}
function A(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const xe = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return A(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : A(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return A(e.getDate(), t.length);
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
    return A(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return A(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return A(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return A(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), a = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return A(a, t.length);
  }
}, We = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, ln = {
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
    return xe.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const a = er(e, r), i = a > 0 ? a : 1 - a;
    if (t === "YY") {
      const s = i % 100;
      return A(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(i, { unit: "year" }) : A(i, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Xn(e);
    return A(n, t.length);
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
    return A(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return A(r, 2);
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
        return A(r, 2);
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
        return xe.M(e, t);
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
        return A(r + 1, 2);
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
    const a = zt(e, r);
    return t === "wo" ? n.ordinalNumber(a, { unit: "week" }) : A(a, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = At(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : A(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : xe.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Yo(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : A(r, t.length);
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
        return A(i, 2);
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
        return A(i, t.length);
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
        return A(a, t.length);
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
    return xe.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : xe.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : A(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : A(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : xe.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : xe.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return xe.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return un(r);
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
        return un(r);
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
        return "GMT" + dn(r, ":");
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
        return "GMT" + dn(r, ":");
      case "zzzz":
      default:
        return "GMT" + De(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return A(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return A(+e, t.length);
  }
};
function dn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = Math.trunc(r / 60), i = r % 60;
  return i === 0 ? n + String(a) : n + String(a) + t + A(i, 2);
}
function un(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + A(Math.abs(e) / 60, 2) : De(e, t);
}
function De(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = A(Math.trunc(r / 60), 2), i = A(r % 60, 2);
  return n + a + t + i;
}
const fn = (e, t) => {
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
}, tr = (e, t) => {
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
}, zo = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], a = n[2];
  if (!a)
    return fn(e, t);
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
  return i.replace("{{date}}", fn(r, t)).replace("{{time}}", tr(a, t));
}, Bo = {
  p: tr,
  P: zo
}, Ro = /^D+$/, Ho = /^Y+$/, Jo = ["D", "DD", "YY", "YYYY"];
function Go(e) {
  return Ro.test(e);
}
function qo(e) {
  return Ho.test(e);
}
function Lo(e, t, n) {
  const r = Xo(e, t, n);
  if (console.warn(r), Jo.includes(e)) throw new RangeError(r);
}
function Xo(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Vo = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Uo = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Ko = /^'([^]*?)'?$/, Qo = /''/g, Zo = /[a-zA-Z]/;
function He(e, t, n) {
  var h, u, f, p, v, x, k, y;
  const r = Ke(), a = (n == null ? void 0 : n.locale) ?? r.locale ?? Ie, i = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((u = (h = n == null ? void 0 : n.locale) == null ? void 0 : h.options) == null ? void 0 : u.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((p = (f = r.locale) == null ? void 0 : f.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((x = (v = n == null ? void 0 : n.locale) == null ? void 0 : v.options) == null ? void 0 : x.weekStartsOn) ?? r.weekStartsOn ?? ((y = (k = r.locale) == null ? void 0 : k.options) == null ? void 0 : y.weekStartsOn) ?? 0, c = z(e, n == null ? void 0 : n.in);
  if (!Qa(c))
    throw new RangeError("Invalid time value");
  let l = t.match(Uo).map((b) => {
    const j = b[0];
    if (j === "p" || j === "P") {
      const M = Bo[j];
      return M(b, a.formatLong);
    }
    return b;
  }).join("").match(Vo).map((b) => {
    if (b === "''")
      return { isToken: !1, value: "'" };
    const j = b[0];
    if (j === "'")
      return { isToken: !1, value: ei(b) };
    if (ln[j])
      return { isToken: !0, value: b };
    if (j.match(Zo))
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
    (!(n != null && n.useAdditionalWeekYearTokens) && qo(j) || !(n != null && n.useAdditionalDayOfYearTokens) && Go(j)) && Lo(j, t, String(e));
    const M = ln[j[0]];
    return M(c, j, a.localize, d);
  }).join("");
}
function ei(e) {
  const t = e.match(Ko);
  return t ? t[1].replace(Qo, "'") : e;
}
function ti(e, t) {
  const n = z(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = n.getMonth(), i = V(n, 0);
  return i.setFullYear(r, a + 1, 0), i.setHours(0, 0, 0, 0), i.getDate();
}
function ni(e, t) {
  return z(e, t == null ? void 0 : t.in).getMonth();
}
function ri(e, t) {
  return z(e, t == null ? void 0 : t.in).getFullYear();
}
function ai(e, t) {
  return +z(e) > +z(t);
}
function oi(e, t) {
  return +z(e) < +z(t);
}
function ii(e, t, n) {
  const [r, a] = _e(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === a.getFullYear() && r.getMonth() === a.getMonth();
}
function si(e, t, n) {
  const [r, a] = _e(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === a.getFullYear();
}
function ci(e, t, n) {
  const r = z(e, n == null ? void 0 : n.in), a = r.getFullYear(), i = r.getDate(), s = V(e, 0);
  s.setFullYear(a, t, 15), s.setHours(0, 0, 0, 0);
  const c = ti(s);
  return r.setMonth(t, Math.min(i, c)), r;
}
function li(e, t, n) {
  const r = z(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? V(e, NaN) : (r.setFullYear(t), r);
}
const hn = 5, di = 4;
function ui(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, a = t.addDays(e, -r + 1), i = t.addDays(a, hn * 7 - 1);
  return t.getMonth(e) === t.getMonth(i) ? hn : di;
}
function nr(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function fi(e, t) {
  const n = nr(e, t), r = ui(e, t);
  return t.addDays(n, r * 7 - 1);
}
const rr = {
  ...Ie,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let a;
      r && typeof r.format == "function" ? a = r.format.bind(r) : a = (s, c) => He(s, c, { locale: Ie, ...n });
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
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (a, i) => He(a, i, { locale: Ie, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let a;
      r && typeof r.format == "function" ? a = r.format.bind(r) : a = (s, c) => He(s, c, { locale: Ie, ...n });
      let i = a(e, "PPPP");
      return t != null && t.today && (i = `Today, ${i}`), i;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (a, i) => He(a, i, { locale: Ie, ...t }), r(e, "cccc");
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
      return (i = this.overrides) != null && i.addDays ? this.overrides.addDays(r, a) : qn(r, a);
    }, this.addMonths = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.addMonths ? this.overrides.addMonths(r, a) : Ln(r, a);
    }, this.addWeeks = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.addWeeks ? this.overrides.addWeeks(r, a) : La(r, a);
    }, this.addYears = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.addYears ? this.overrides.addYears(r, a) : Xa(r, a);
    }, this.differenceInCalendarDays = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, a) : Yt(r, a);
    }, this.differenceInCalendarMonths = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, a) : Un(r, a);
    }, this.eachMonthOfInterval = (r) => {
      var a;
      return (a = this.overrides) != null && a.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : eo(r);
    }, this.eachYearOfInterval = (r) => {
      var c;
      const a = (c = this.overrides) != null && c.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : ro(r), i = new Set(a.map((l) => this.getYear(l)));
      if (i.size === a.length)
        return a;
      const s = [];
      return i.forEach((l) => {
        s.push(new Date(l, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : fi(r, this);
    }, this.endOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfISOWeek ? this.overrides.endOfISOWeek(r) : ao(r);
    }, this.endOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfMonth ? this.overrides.endOfMonth(r) : Za(r);
    }, this.endOfWeek = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.endOfWeek ? this.overrides.endOfWeek(r, a) : Zn(r, this.options);
    }, this.endOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfYear ? this.overrides.endOfYear(r) : no(r);
    }, this.format = (r, a, i) => {
      var c;
      const s = (c = this.overrides) != null && c.format ? this.overrides.format(r, a, this.options) : He(r, a, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.getISOWeek ? this.overrides.getISOWeek(r) : At(r);
    }, this.getMonth = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.getMonth ? this.overrides.getMonth(r, this.options) : ni(r, this.options);
    }, this.getYear = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.getYear ? this.overrides.getYear(r, this.options) : ri(r, this.options);
    }, this.getWeek = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.getWeek ? this.overrides.getWeek(r, this.options) : zt(r, this.options);
    }, this.isAfter = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isAfter ? this.overrides.isAfter(r, a) : ai(r, a);
    }, this.isBefore = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isBefore ? this.overrides.isBefore(r, a) : oi(r, a);
    }, this.isDate = (r) => {
      var a;
      return (a = this.overrides) != null && a.isDate ? this.overrides.isDate(r) : Vn(r);
    }, this.isSameDay = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isSameDay ? this.overrides.isSameDay(r, a) : Ka(r, a);
    }, this.isSameMonth = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isSameMonth ? this.overrides.isSameMonth(r, a) : ii(r, a);
    }, this.isSameYear = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.isSameYear ? this.overrides.isSameYear(r, a) : si(r, a);
    }, this.max = (r) => {
      var a;
      return (a = this.overrides) != null && a.max ? this.overrides.max(r) : Va(r);
    }, this.min = (r) => {
      var a;
      return (a = this.overrides) != null && a.min ? this.overrides.min(r) : Ua(r);
    }, this.setMonth = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.setMonth ? this.overrides.setMonth(r, a) : ci(r, a);
    }, this.setYear = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.setYear ? this.overrides.setYear(r, a) : li(r, a);
    }, this.startOfBroadcastWeek = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : nr(r, this);
    }, this.startOfDay = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfDay ? this.overrides.startOfDay(r) : Ue(r);
    }, this.startOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Ve(r);
    }, this.startOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfMonth ? this.overrides.startOfMonth(r) : to(r);
    }, this.startOfWeek = (r, a) => {
      var i;
      return (i = this.overrides) != null && i.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Pe(r, this.options);
    }, this.startOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfYear ? this.overrides.startOfYear(r) : Qn(r);
    }, this.options = { locale: rr, ...t }, this.overrides = n;
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
class ar {
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
class hi {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class pi {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function mi(e) {
  return W.createElement("span", { ...e });
}
function gi(e) {
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
function yi(e) {
  const { day: t, modifiers: n, ...r } = e;
  return W.createElement("td", { ...r });
}
function vi(e) {
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
const or = we(void 0);
function gt() {
  const e = je(or);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function bi(e) {
  const { options: t, className: n, ...r } = e, { classNames: a, components: i, styles: s } = gt(), c = [a[O.Dropdown], n].join(" "), l = t == null ? void 0 : t.find(({ value: d }) => d === r.value);
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
function xi(e) {
  return W.createElement("div", { ...e });
}
function ji(e) {
  return W.createElement("div", { ...e });
}
function wi(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return W.createElement("div", { ...r }, e.children);
}
function ki(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return W.createElement("div", { ...r });
}
function Si(e) {
  return W.createElement("table", { ...e });
}
function Ni(e) {
  return W.createElement("div", { ...e });
}
function Mi(e) {
  const { components: t } = gt();
  return W.createElement(t.Dropdown, { ...e });
}
function Di(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: a, ...i } = e, { components: s, classNames: c, styles: l, labels: { labelPrevious: d, labelNext: h } } = gt(), u = E((p) => {
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
function Ci(e) {
  return W.createElement("button", { ...e });
}
function Oi(e) {
  return W.createElement("option", { ...e });
}
function Wi(e) {
  return W.createElement("button", { ...e });
}
function $i(e) {
  const { rootRef: t, ...n } = e;
  return W.createElement("div", { ...n, ref: t });
}
function Ti(e) {
  return W.createElement("select", { ...e });
}
function Ii(e) {
  const { week: t, ...n } = e;
  return W.createElement("tr", { ...n });
}
function Pi(e) {
  return W.createElement("th", { ...e });
}
function _i(e) {
  return W.createElement(
    "thead",
    { "aria-hidden": !0 },
    W.createElement("tr", { ...e })
  );
}
function Ei(e) {
  const { week: t, ...n } = e;
  return W.createElement("th", { ...n });
}
function Fi(e) {
  return W.createElement("th", { ...e });
}
function Yi(e) {
  return W.createElement("tbody", { ...e });
}
function Ai(e) {
  const { components: t } = gt();
  return W.createElement(t.Dropdown, { ...e });
}
const zi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CaptionLabel: mi,
  Chevron: gi,
  Day: yi,
  DayButton: vi,
  Dropdown: bi,
  DropdownNav: xi,
  Footer: ji,
  Month: wi,
  MonthCaption: ki,
  MonthGrid: Si,
  Months: Ni,
  MonthsDropdown: Mi,
  Nav: Di,
  NextMonthButton: Ci,
  Option: Oi,
  PreviousMonthButton: Wi,
  Root: $i,
  Select: Ti,
  Week: Ii,
  WeekNumber: Ei,
  WeekNumberHeader: Fi,
  Weekday: Pi,
  Weekdays: _i,
  Weeks: Yi,
  YearsDropdown: Ai
}, Symbol.toStringTag, { value: "Module" }));
function ve(e, t, n = !1, r = he) {
  let { from: a, to: i } = e;
  const { differenceInCalendarDays: s, isSameDay: c } = r;
  return a && i ? (s(i, a) < 0 && ([a, i] = [i, a]), s(t, a) >= (n ? 1 : 0) && s(i, t) >= (n ? 1 : 0)) : !n && i ? c(i, t) : !n && a ? c(a, t) : !1;
}
function Bt(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function yt(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Rt(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Ht(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function ir(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function sr(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function be(e, t, n = he) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: a, differenceInCalendarDays: i, isAfter: s } = n;
  return r.some((c) => {
    if (typeof c == "boolean")
      return c;
    if (n.isDate(c))
      return a(e, c);
    if (sr(c, n))
      return c.some((l) => a(e, l));
    if (yt(c))
      return ve(c, e, !1, n);
    if (ir(c))
      return Array.isArray(c.dayOfWeek) ? c.dayOfWeek.includes(e.getDay()) : c.dayOfWeek === e.getDay();
    if (Bt(c)) {
      const l = i(c.before, e), d = i(c.after, e), h = l > 0, u = d < 0;
      return s(c.before, c.after) ? u && h : h || u;
    }
    return Rt(c) ? i(e, c.after) > 0 : Ht(c) ? i(c.before, e) > 0 : typeof c == "function" ? c(e) : !1;
  });
}
function Bi(e, t, n, r, a) {
  const { disabled: i, hidden: s, modifiers: c, showOutsideDays: l, broadcastCalendar: d, today: h = a.today() } = t, { isSameDay: u, isSameMonth: f, startOfMonth: p, isBefore: v, endOfMonth: x, isAfter: k } = a, y = n && p(n), b = r && x(r), j = {
    [J.focused]: [],
    [J.outside]: [],
    [J.disabled]: [],
    [J.hidden]: [],
    [J.today]: []
  }, M = {};
  for (const S of e) {
    const { date: m, displayMonth: w } = S, N = !!(w && !f(m, w)), C = !!(y && v(m, y)), D = !!(b && k(m, b)), T = !!(i && be(m, i, a)), X = !!(s && be(m, s, a)) || C || D || // Broadcast calendar will show outside days as default
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
    }, w = {};
    for (const N in j) {
      const C = j[N];
      m[N] = C.some((D) => D === S);
    }
    for (const N in M)
      w[N] = M[N].some((C) => C === S);
    return {
      ...m,
      // custom modifiers should override all the previous ones
      ...w
    };
  };
}
function Ri(e, t, n = {}) {
  return Object.entries(e).filter(([, a]) => a === !0).reduce((a, [i]) => (n[i] ? a.push(n[i]) : t[J[i]] ? a.push(t[J[i]]) : t[se[i]] && a.push(t[se[i]]), a), [t[O.Day]]);
}
function Hi(e) {
  return {
    ...zi,
    ...e
  };
}
function Ji(e) {
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
function Gi() {
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
function qi(e, t, n) {
  return (n ?? new re(t)).formatMonthYear(e);
}
function Li(e, t, n) {
  return (n ?? new re(t)).format(e, "d");
}
function Xi(e, t = he) {
  return t.format(e, "LLLL");
}
function Vi(e, t, n) {
  return (n ?? new re(t)).format(e, "cccccc");
}
function Ui(e, t = he) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Ki() {
  return "";
}
function Qi(e, t = he) {
  return t.format(e, "yyyy");
}
const Zi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: qi,
  formatDay: Li,
  formatMonthDropdown: Xi,
  formatWeekNumber: Ui,
  formatWeekNumberHeader: Ki,
  formatWeekdayName: Vi,
  formatYearDropdown: Qi
}, Symbol.toStringTag, { value: "Module" }));
function es(e) {
  return {
    ...Zi,
    ...e
  };
}
function cr(e, t, n, r) {
  let a = (r ?? new re(n)).format(e, "PPPP");
  return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
}
function lr(e, t, n) {
  return (n ?? new re(t)).formatMonthYear(e);
}
function dr(e, t, n, r) {
  let a = (r ?? new re(n)).format(e, "PPPP");
  return t != null && t.today && (a = `Today, ${a}`), a;
}
function ur(e) {
  return "Choose the Month";
}
function fr() {
  return "";
}
const ts = "Go to the Next Month";
function hr(e, t) {
  return ts;
}
function pr(e) {
  return "Go to the Previous Month";
}
function mr(e, t, n) {
  return (n ?? new re(t)).format(e, "cccc");
}
function gr(e, t) {
  return `Week ${e}`;
}
function yr(e) {
  return "Week Number";
}
function vr(e) {
  return "Choose the Year";
}
const ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelDayButton: cr,
  labelGrid: lr,
  labelGridcell: dr,
  labelMonthDropdown: ur,
  labelNav: fr,
  labelNext: hr,
  labelPrevious: pr,
  labelWeekNumber: gr,
  labelWeekNumberHeader: yr,
  labelWeekday: mr,
  labelYearDropdown: vr
}, Symbol.toStringTag, { value: "Module" })), ie = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function rs(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...ns,
    ...e ?? {},
    labelDayButton: ie(cr, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: ie(ur, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: ie(hr, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: ie(pr, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: ie(gr, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: ie(vr, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: ie(lr, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: ie(dr, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: ie(fr, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: ie(yr, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: ie(mr, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function as(e, t, n, r, a) {
  const { startOfMonth: i, startOfYear: s, endOfYear: c, eachMonthOfInterval: l, getMonth: d } = a;
  return l({
    start: s(e),
    end: c(e)
  }).map((f) => {
    const p = r.formatMonthDropdown(f, a), v = d(f), x = t && f < i(t) || n && f > i(n) || !1;
    return { value: v, label: p, disabled: x };
  });
}
function os(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[O.Day] };
  return Object.entries(e).filter(([, a]) => a === !0).forEach(([a]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[a]
    };
  }), r;
}
function is(e, t, n, r) {
  const a = r ?? e.today(), i = n ? e.startOfBroadcastWeek(a, e) : t ? e.startOfISOWeek(a) : e.startOfWeek(a), s = [];
  for (let c = 0; c < 7; c++) {
    const l = e.addDays(i, c);
    s.push(l);
  }
  return s;
}
function ss(e, t, n, r, a = !1) {
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
function cs(e, t = {}) {
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
      return zt(h, {
        weekStartsOn: (d == null ? void 0 : d.weekStartsOn) ?? a,
        firstWeekContainsDate: (d == null ? void 0 : d.firstWeekContainsDate) ?? ((u = r == null ? void 0 : r.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (l) => {
      const d = s(l);
      return At(d);
    },
    differenceInCalendarDays: (l, d) => {
      const h = s(l), u = s(d);
      return Yt(h, u);
    },
    differenceInCalendarMonths: (l, d) => {
      const h = s(l), u = s(d);
      return Un(h, u);
    }
  };
}
const Qe = (e) => e instanceof HTMLElement ? e : null, Nt = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], ls = (e) => Qe(e.querySelector("[data-animated-month]")), Mt = (e) => Qe(e.querySelector("[data-animated-caption]")), Dt = (e) => Qe(e.querySelector("[data-animated-weeks]")), ds = (e) => Qe(e.querySelector("[data-animated-nav]")), us = (e) => Qe(e.querySelector("[data-animated-weekdays]"));
function fs(e, t, { classNames: n, months: r, focused: a, dateLib: i }) {
  const s = q(null), c = q(r), l = q(!1);
  fa(() => {
    const d = c.current;
    if (c.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const h = i.isSameMonth(r[0].date, d[0].date), u = i.isAfter(r[0].date, d[0].date), f = u ? n[ne.caption_after_enter] : n[ne.caption_before_enter], p = u ? n[ne.weeks_after_enter] : n[ne.weeks_before_enter], v = s.current, x = e.current.cloneNode(!0);
    if (x instanceof HTMLElement ? (Nt(x).forEach((j) => {
      if (!(j instanceof HTMLElement))
        return;
      const M = ls(j);
      M && j.contains(M) && j.removeChild(M);
      const S = Mt(j);
      S && S.classList.remove(f);
      const m = Dt(j);
      m && m.classList.remove(p);
    }), s.current = x) : s.current = null, l.current || h || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    a)
      return;
    const k = v instanceof HTMLElement ? Nt(v) : [], y = Nt(e.current);
    if (y != null && y.every((b) => b instanceof HTMLElement) && (k != null && k.every((b) => b instanceof HTMLElement))) {
      l.current = !0, e.current.style.isolation = "isolate";
      const b = ds(e.current);
      b && (b.style.zIndex = "1"), y.forEach((j, M) => {
        const S = k[M];
        if (!S)
          return;
        j.style.position = "relative", j.style.overflow = "hidden";
        const m = Mt(j);
        m && m.classList.add(f);
        const w = Dt(j);
        w && w.classList.add(p);
        const N = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), b && (b.style.zIndex = ""), m && m.classList.remove(f), w && w.classList.remove(p), j.style.position = "", j.style.overflow = "", j.contains(S) && j.removeChild(S);
        };
        S.style.pointerEvents = "none", S.style.position = "absolute", S.style.overflow = "hidden", S.setAttribute("aria-hidden", "true");
        const C = us(S);
        C && (C.style.opacity = "0");
        const D = Mt(S);
        D && (D.classList.add(u ? n[ne.caption_before_exit] : n[ne.caption_after_exit]), D.addEventListener("animationend", N));
        const T = Dt(S);
        T && T.classList.add(u ? n[ne.weeks_before_exit] : n[ne.weeks_after_exit]), j.insertBefore(S, j.firstChild);
      });
    }
  });
}
function hs(e, t, n, r) {
  const a = e[0], i = e[e.length - 1], { ISOWeek: s, fixedWeeks: c, broadcastCalendar: l } = n ?? {}, { addDays: d, differenceInCalendarDays: h, differenceInCalendarMonths: u, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: v, endOfWeek: x, isAfter: k, startOfBroadcastWeek: y, startOfISOWeek: b, startOfWeek: j } = r, M = l ? y(a, r) : s ? b(a) : j(a), S = l ? f(i) : s ? p(v(i)) : x(v(i)), m = t && (l ? f(t) : s ? p(t) : x(t)), w = m && k(S, m) ? m : S, N = h(w, M), C = u(i, a) + 1, D = [];
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
function ps(e) {
  const t = [];
  return e.reduce((n, r) => {
    const a = r.weeks.reduce((i, s) => i.concat(s.days.slice()), t.slice());
    return n.concat(a.slice());
  }, t.slice());
}
function ms(e, t, n, r) {
  const { numberOfMonths: a = 1 } = n, i = [];
  for (let s = 0; s < a; s++) {
    const c = r.addMonths(e, s);
    if (t && c > t)
      break;
    i.push(c);
  }
  return i;
}
function pn(e, t, n, r) {
  const { month: a, defaultMonth: i, today: s = r.today(), numberOfMonths: c = 1 } = e;
  let l = a || i || s;
  const { differenceInCalendarMonths: d, addMonths: h, startOfMonth: u } = r;
  if (n && d(n, l) < c - 1) {
    const f = -1 * (c - 1);
    l = h(n, f);
  }
  return t && d(l, t) < 0 && (l = t), u(l);
}
function gs(e, t, n, r) {
  const { addDays: a, endOfBroadcastWeek: i, endOfISOWeek: s, endOfMonth: c, endOfWeek: l, getISOWeek: d, getWeek: h, startOfBroadcastWeek: u, startOfISOWeek: f, startOfWeek: p } = r, v = e.reduce((x, k) => {
    const y = n.broadcastCalendar ? u(k, r) : n.ISOWeek ? f(k) : p(k), b = n.broadcastCalendar ? i(k) : n.ISOWeek ? s(c(k)) : l(c(k)), j = t.filter((w) => w >= y && w <= b), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && j.length < M) {
      const w = t.filter((N) => {
        const C = M - j.length;
        return N > b && N <= a(b, C);
      });
      j.push(...w);
    }
    const S = j.reduce((w, N) => {
      const C = n.ISOWeek ? d(N) : h(N), D = w.find((X) => X.weekNumber === C), T = new ar(N, k, r);
      return D ? D.days.push(T) : w.push(new pi(C, [T])), w;
    }, []), m = new hi(k, S);
    return x.push(m), x;
  }, []);
  return n.reverseMonths ? v.reverse() : v;
}
function ys(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: a, startOfDay: i, startOfMonth: s, endOfMonth: c, addYears: l, endOfYear: d, today: h } = t, u = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : !n && u && (n = a(l(e.today ?? h(), -100))), r ? r = c(r) : !r && u && (r = d(e.today ?? h())), [
    n && i(n),
    r && i(r)
  ];
}
function vs(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: i = 1 } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: l } = r, d = a ? i : 1, h = s(e);
  if (!t)
    return c(h, d);
  if (!(l(t, e) < i))
    return c(h, d);
}
function bs(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: i } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: l } = r, d = a ? i ?? 1 : 1, h = s(e);
  if (!t)
    return c(h, -d);
  if (!(l(h, t) <= 0))
    return c(h, -d);
}
function xs(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function vt(e, t) {
  const [n, r] = $(e);
  return [t === void 0 ? n : t, r];
}
function js(e, t) {
  var M;
  const [n, r] = ys(e, t), { startOfMonth: a, endOfMonth: i } = t, s = pn(e, n, r, t), [c, l] = vt(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  U(() => {
    const S = pn(e, n, r, t);
    l(S);
  }, [e.timeZone]);
  const { months: d, weeks: h, days: u, previousMonth: f, nextMonth: p } = Le(() => {
    const S = ms(c, r, { numberOfMonths: e.numberOfMonths }, t), m = hs(S, e.endMonth ? i(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), w = gs(S, m, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), N = xs(w), C = ps(w), D = bs(c, n, e, t), T = vs(c, r, e, t);
    return {
      months: w,
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
  ]), { disableNavigation: v, onMonthChange: x } = e, k = (S) => h.some((m) => m.days.some((w) => w.isEqualTo(S))), y = (S) => {
    if (v)
      return;
    let m = a(S);
    n && m < a(n) && (m = a(n)), r && m > a(r) && (m = a(r)), l(m), x == null || x(m);
  };
  return {
    months: d,
    weeks: h,
    days: u,
    navStart: n,
    navEnd: r,
    previousMonth: f,
    nextMonth: p,
    goToMonth: y,
    goToDay: (S) => {
      k(S) || y(S.date);
    }
  };
}
var de;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(de || (de = {}));
function mn(e) {
  return !e[J.disabled] && !e[J.hidden] && !e[J.outside];
}
function ws(e, t, n, r) {
  let a, i = -1;
  for (const s of e) {
    const c = t(s);
    mn(c) && (c[J.focused] && i < de.FocusedModifier ? (a = s, i = de.FocusedModifier) : r != null && r.isEqualTo(s) && i < de.LastFocused ? (a = s, i = de.LastFocused) : n(s.date) && i < de.Selected ? (a = s, i = de.Selected) : c[J.today] && i < de.Today && (a = s, i = de.Today));
  }
  return a || (a = e.find((s) => mn(t(s)))), a;
}
function ks(e, t, n, r, a, i, s) {
  const { ISOWeek: c, broadcastCalendar: l } = i, { addDays: d, addMonths: h, addWeeks: u, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: v, endOfWeek: x, max: k, min: y, startOfBroadcastWeek: b, startOfISOWeek: j, startOfWeek: M } = s;
  let m = {
    day: d,
    week: u,
    month: h,
    year: f,
    startOfWeek: (w) => l ? b(w, s) : c ? j(w) : M(w),
    endOfWeek: (w) => l ? p(w) : c ? v(w) : x(w)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? m = k([r, m]) : t === "after" && a && (m = y([a, m])), m;
}
function br(e, t, n, r, a, i, s, c = 0) {
  if (c > 365)
    return;
  const l = ks(e, t, n.date, r, a, i, s), d = !!(i.disabled && be(l, i.disabled, s)), h = !!(i.hidden && be(l, i.hidden, s)), u = l, f = new ar(l, u, s);
  return !d && !h ? f : br(e, t, f, r, a, i, s, c + 1);
}
function Ss(e, t, n, r, a) {
  const { autoFocus: i } = e, [s, c] = $(), l = ws(t.days, n, r || (() => !1), s), [d, h] = $(i ? l : void 0);
  return {
    isFocusTarget: (x) => !!(l != null && l.isEqualTo(x)),
    setFocused: h,
    focused: d,
    blur: () => {
      c(d), h(void 0);
    },
    moveFocus: (x, k) => {
      if (!d)
        return;
      const y = br(x, k, d, t.navStart, t.navEnd, e, a);
      y && (e.disableNavigation && !t.days.some((j) => j.isEqualTo(y)) || (t.goToDay(y), h(y)));
    }
  };
}
function Ns(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [i, s] = vt(n, a ? n : void 0), c = a ? n : i, { isSameDay: l } = t, d = (p) => (c == null ? void 0 : c.some((v) => l(v, p))) ?? !1, { min: h, max: u } = e;
  return {
    selected: c,
    select: (p, v, x) => {
      let k = [...c ?? []];
      if (d(p)) {
        if ((c == null ? void 0 : c.length) === h || r && (c == null ? void 0 : c.length) === 1)
          return;
        k = c == null ? void 0 : c.filter((y) => !l(y, p));
      } else
        (c == null ? void 0 : c.length) === u ? k = [p] : k = [...k, p];
      return a || s(k), a == null || a(k, p, v, x), k;
    },
    isSelected: d
  };
}
function Ms(e, t, n = 0, r = 0, a = !1, i = he) {
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
function Ds(e, t, n = he) {
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
function gn(e, t, n = he) {
  return ve(e, t.from, !1, n) || ve(e, t.to, !1, n) || ve(t, e.from, !1, n) || ve(t, e.to, !1, n);
}
function Cs(e, t, n = he) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((c) => typeof c != "function").some((c) => typeof c == "boolean" ? c : n.isDate(c) ? ve(e, c, !1, n) : sr(c, n) ? c.some((l) => ve(e, l, !1, n)) : yt(c) ? c.from && c.to ? gn(e, { from: c.from, to: c.to }, n) : !1 : ir(c) ? Ds(e, c.dayOfWeek, n) : Bt(c) ? n.isAfter(c.before, c.after) ? gn(e, {
    from: n.addDays(c.after, 1),
    to: n.addDays(c.before, -1)
  }, n) : be(e.from, c, n) || be(e.to, c, n) : Rt(c) || Ht(c) ? be(e.from, c, n) || be(e.to, c, n) : !1))
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
function Os(e, t) {
  const { disabled: n, excludeDisabled: r, resetOnSelect: a, selected: i, required: s, onSelect: c } = e, [l, d] = vt(i, c ? i : void 0), h = c ? i : l;
  return {
    selected: h,
    select: (p, v, x) => {
      const { min: k, max: y } = e;
      let b;
      if (p) {
        const j = h == null ? void 0 : h.from, M = h == null ? void 0 : h.to, S = !!j && !!M, m = !!j && !!M && t.isSameDay(j, M) && t.isSameDay(p, j);
        a && (S || !(h != null && h.from)) ? !s && m ? b = void 0 : b = { from: p, to: void 0 } : b = Ms(p, h, k, y, s, t);
      }
      return r && n && (b != null && b.from) && b.to && Cs({ from: b.from, to: b.to }, n, t) && (b.from = p, b.to = void 0), c || d(b), c == null || c(b, p, v, x), b;
    },
    isSelected: (p) => h && ve(h, p, !1, t)
  };
}
function Ws(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [i, s] = vt(n, a ? n : void 0), c = a ? n : i, { isSameDay: l } = t;
  return {
    selected: c,
    select: (u, f, p) => {
      let v = u;
      return !r && c && c && l(u, c) && (v = void 0), a || s(v), a == null || a(v, u, f, p), v;
    },
    isSelected: (u) => c ? l(c, u) : !1
  };
}
function $s(e, t) {
  const n = Ws(e, t), r = Ns(e, t), a = Os(e, t);
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
function yn(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? $e(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? $e(r, t) : r) : yt(e) ? {
    ...e,
    from: e.from ? ae(e.from, t) : e.from,
    to: e.to ? ae(e.to, t) : e.to
  } : Bt(e) ? {
    before: $e(e.before, t),
    after: $e(e.after, t)
  } : Rt(e) ? {
    after: $e(e.after, t)
  } : Ht(e) ? {
    before: $e(e.before, t)
  } : e;
}
function Ct(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => yn(r, t)) : yn(e, t));
}
function xr(e) {
  var Qt;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = ae(t.today, n)), t.month && (t.month = ae(t.month, n)), t.defaultMonth && (t.defaultMonth = ae(t.defaultMonth, n)), t.startMonth && (t.startMonth = ae(t.startMonth, n)), t.endMonth && (t.endMonth = ae(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = ae(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = (Qt = t.selected) == null ? void 0 : Qt.map((I) => ae(I, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? ae(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? ae(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = Ct(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Ct(t.hidden, n)), t.modifiers)) {
    const I = {};
    Object.keys(t.modifiers).forEach((_) => {
      var P;
      I[_] = Ct((P = t.modifiers) == null ? void 0 : P[_], n);
    }), t.modifiers = I;
  }
  const { components: r, formatters: a, labels: i, dateLib: s, locale: c, classNames: l } = Le(() => {
    const I = { ...rr, ...t.locale }, _ = t.broadcastCalendar ? 1 : t.weekStartsOn, P = t.noonSafe && t.timeZone ? cs(t.timeZone, {
      weekStartsOn: _,
      locale: I
    }) : void 0, G = t.dateLib && P ? { ...P, ...t.dateLib } : t.dateLib ?? P, Y = new re({
      locale: I,
      weekStartsOn: _,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, G);
    return {
      dateLib: Y,
      components: Hi(t.components),
      formatters: es(t.formatters),
      labels: rs(t.labels, Y.options),
      locale: I,
      classNames: { ...Gi(), ...t.classNames }
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
  const { captionLayout: d, mode: h, navLayout: u, numberOfMonths: f = 1, onDayBlur: p, onDayClick: v, onDayFocus: x, onDayKeyDown: k, onDayMouseEnter: y, onDayMouseLeave: b, onNextClick: j, onPrevClick: M, showWeekNumber: S, styles: m } = t, { formatCaption: w, formatDay: N, formatMonthDropdown: C, formatWeekNumber: D, formatWeekNumberHeader: T, formatWeekdayName: X, formatYearDropdown: H } = a, R = js(t, s), { days: Z, months: oe, navStart: ke, navEnd: Se, previousMonth: ee, nextMonth: K, goToMonth: te } = R, Ne = Bi(Z, t, ke, Se, s), { isSelected: pe, select: Ee, selected: et } = $s(t, s) ?? {}, { blur: qt, focused: tt, isFocusTarget: Ar, moveFocus: Lt, setFocused: nt } = Ss(t, R, Ne, pe ?? (() => !1), s), { labelDayButton: zr, labelGridcell: Br, labelGrid: Rr, labelMonthDropdown: Hr, labelNav: Xt, labelPrevious: Jr, labelNext: Gr, labelWeekday: qr, labelWeekNumber: Lr, labelWeekNumberHeader: Xr, labelYearDropdown: Vr } = i, Ur = Le(() => is(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), Vt = h !== void 0 || v !== void 0, bt = E(() => {
    ee && (te(ee), M == null || M(ee));
  }, [ee, te, M]), xt = E(() => {
    K && (te(K), j == null || j(K));
  }, [te, K, j]), Kr = E((I, _) => (P) => {
    P.preventDefault(), P.stopPropagation(), nt(I), !_.disabled && (Ee == null || Ee(I.date, _, P), v == null || v(I.date, _, P));
  }, [Ee, v, nt]), Qr = E((I, _) => (P) => {
    nt(I), x == null || x(I.date, _, P);
  }, [x, nt]), Zr = E((I, _) => (P) => {
    qt(), p == null || p(I.date, _, P);
  }, [qt, p]), ea = E((I, _) => (P) => {
    const G = {
      ArrowLeft: [
        P.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        P.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [P.shiftKey ? "year" : "week", "after"],
      ArrowUp: [P.shiftKey ? "year" : "week", "before"],
      PageUp: [P.shiftKey ? "year" : "month", "before"],
      PageDown: [P.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (G[P.key]) {
      P.preventDefault(), P.stopPropagation();
      const [Y, ce] = G[P.key];
      Lt(Y, ce);
    }
    k == null || k(I.date, _, P);
  }, [Lt, k, t.dir]), ta = E((I, _) => (P) => {
    y == null || y(I.date, _, P);
  }, [y]), na = E((I, _) => (P) => {
    b == null || b(I.date, _, P);
  }, [b]), ra = E((I, _) => (P) => {
    const G = Number(P.target.value), Y = s.setMonth(s.startOfMonth(I), G);
    te(s.addMonths(Y, -_));
  }, [s, te]), aa = E((I, _) => (P) => {
    const G = Number(P.target.value), Y = s.setYear(s.startOfMonth(I), G);
    te(s.addMonths(Y, -_));
  }, [s, te]), { className: oa, style: ia } = Le(() => ({
    className: [l[O.Root], t.className].filter(Boolean).join(" "),
    style: { ...m == null ? void 0 : m[O.Root], ...t.style }
  }), [l, t.className, t.style, m]), sa = Ji(t), Ut = (I) => {
    const _ = m == null ? void 0 : m[O.Dropdown], P = m == null ? void 0 : m[I];
    if (!(!_ && !P))
      return {
        ..._,
        ...P
      };
  }, Kt = q(null);
  fs(Kt, !!t.animate, {
    classNames: l,
    months: oe,
    focused: tt,
    dateLib: s
  });
  const ca = {
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
    or.Provider,
    { value: ca },
    W.createElement(
      r.Root,
      { rootRef: t.animate ? Kt : void 0, className: oa, style: ia, dir: t.dir, id: t.id, lang: t.lang ?? c.code, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...sa },
      W.createElement(
        r.Months,
        { className: l[O.Months], style: m == null ? void 0 : m[O.Months] },
        !t.hideNavigation && !u && W.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[O.Nav], style: m == null ? void 0 : m[O.Nav], "aria-label": Xt(), onPreviousClick: bt, onNextClick: xt, previousMonth: ee, nextMonth: K }),
        oe.map((I, _) => {
          const P = t.reverseMonths ? oe.length - 1 - _ : _;
          return W.createElement(
            r.Month,
            {
              "data-animated-month": t.animate ? "true" : void 0,
              className: l[O.Month],
              style: m == null ? void 0 : m[O.Month],
              // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
              key: _,
              displayIndex: _,
              calendarMonth: I
            },
            u === "around" && !t.hideNavigation && _ === 0 && W.createElement(
              r.PreviousMonthButton,
              { type: "button", className: l[O.PreviousMonthButton], style: m == null ? void 0 : m[O.PreviousMonthButton], tabIndex: ee ? void 0 : -1, "aria-disabled": ee ? void 0 : !0, "aria-label": Jr(ee), onClick: bt, "data-animated-button": t.animate ? "true" : void 0 },
              W.createElement(r.Chevron, { disabled: ee ? void 0 : !0, className: l[O.Chevron], style: m == null ? void 0 : m[O.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
            ),
            W.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: l[O.MonthCaption], style: m == null ? void 0 : m[O.MonthCaption], calendarMonth: I, displayIndex: _ }, d != null && d.startsWith("dropdown") ? W.createElement(
              r.DropdownNav,
              { className: l[O.Dropdowns], style: m == null ? void 0 : m[O.Dropdowns] },
              (() => {
                const G = d === "dropdown" || d === "dropdown-months" ? W.createElement(r.MonthsDropdown, { key: "month", className: l[O.MonthsDropdown], "aria-label": Hr(), disabled: !!t.disableNavigation, onChange: ra(I.date, P), options: as(I.date, ke, Se, a, s), style: Ut(O.MonthsDropdown), value: s.getMonth(I.date) }) : W.createElement("span", { key: "month" }, C(I.date, s)), Y = d === "dropdown" || d === "dropdown-years" ? W.createElement(r.YearsDropdown, { key: "year", className: l[O.YearsDropdown], "aria-label": Vr(s.options), disabled: !!t.disableNavigation, onChange: aa(I.date, P), options: ss(ke, Se, a, s, !!t.reverseYears), style: Ut(O.YearsDropdown), value: s.getYear(I.date) }) : W.createElement("span", { key: "year" }, H(I.date, s));
                return s.getMonthYearOrder() === "year-first" ? [Y, G] : [G, Y];
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
              } }, w(I.date, s.options, s))
            ) : W.createElement(r.CaptionLabel, { className: l[O.CaptionLabel], style: m == null ? void 0 : m[O.CaptionLabel], role: "status", "aria-live": "polite" }, w(I.date, s.options, s))),
            u === "around" && !t.hideNavigation && _ === f - 1 && W.createElement(
              r.NextMonthButton,
              { type: "button", className: l[O.NextMonthButton], style: m == null ? void 0 : m[O.NextMonthButton], tabIndex: K ? void 0 : -1, "aria-disabled": K ? void 0 : !0, "aria-label": Gr(K), onClick: xt, "data-animated-button": t.animate ? "true" : void 0 },
              W.createElement(r.Chevron, { disabled: K ? void 0 : !0, className: l[O.Chevron], style: m == null ? void 0 : m[O.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
            ),
            _ === f - 1 && u === "after" && !t.hideNavigation && W.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[O.Nav], style: m == null ? void 0 : m[O.Nav], "aria-label": Xt(), onPreviousClick: bt, onNextClick: xt, previousMonth: ee, nextMonth: K }),
            W.createElement(
              r.MonthGrid,
              { role: "grid", "aria-multiselectable": h === "multiple" || h === "range", "aria-label": Rr(I.date, s.options, s) || void 0, className: l[O.MonthGrid], style: m == null ? void 0 : m[O.MonthGrid] },
              !t.hideWeekdays && W.createElement(
                r.Weekdays,
                { "data-animated-weekdays": t.animate ? "true" : void 0, className: l[O.Weekdays], style: m == null ? void 0 : m[O.Weekdays] },
                S && W.createElement(r.WeekNumberHeader, { "aria-label": Xr(s.options), className: l[O.WeekNumberHeader], style: m == null ? void 0 : m[O.WeekNumberHeader], scope: "col" }, T()),
                Ur.map((G) => W.createElement(r.Weekday, { "aria-label": qr(G, s.options, s), className: l[O.Weekday], key: String(G), style: m == null ? void 0 : m[O.Weekday], scope: "col" }, X(G, s.options, s)))
              ),
              W.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: l[O.Weeks], style: m == null ? void 0 : m[O.Weeks] }, I.weeks.map((G) => W.createElement(
                r.Week,
                { className: l[O.Week], key: G.weekNumber, style: m == null ? void 0 : m[O.Week], week: G },
                S && W.createElement(r.WeekNumber, { week: G, style: m == null ? void 0 : m[O.WeekNumber], "aria-label": Lr(G.weekNumber, {
                  locale: c
                }), className: l[O.WeekNumber], scope: "row", role: "rowheader" }, D(G.weekNumber, s)),
                G.days.map((Y) => {
                  const { date: ce } = Y, F = Ne(Y);
                  if (F[J.focused] = !F.hidden && !!(tt != null && tt.isEqualTo(Y)), F[se.selected] = (pe == null ? void 0 : pe(ce)) || F.selected, yt(et)) {
                    const { from: jt, to: wt } = et;
                    F[se.range_start] = !!(jt && wt && s.isSameDay(ce, jt)), F[se.range_end] = !!(jt && wt && s.isSameDay(ce, wt)), F[se.range_middle] = ve(et, ce, !0, s);
                  }
                  const la = os(F, m, t.modifiersStyles), da = Ri(F, l, t.modifiersClassNames), ua = !Vt && !F.hidden ? Br(ce, F, s.options, s) : void 0;
                  return W.createElement(r.Day, { key: `${Y.isoDate}_${Y.displayMonthId}`, day: Y, modifiers: F, className: da.join(" "), style: la, role: "gridcell", "aria-selected": F.selected || void 0, "aria-label": ua, "data-day": Y.isoDate, "data-month": Y.outside ? Y.dateMonthId : void 0, "data-selected": F.selected || void 0, "data-disabled": F.disabled || void 0, "data-hidden": F.hidden || void 0, "data-outside": Y.outside || void 0, "data-focused": F.focused || void 0, "data-today": F.today || void 0 }, !F.hidden && Vt ? W.createElement(r.DayButton, { className: l[O.DayButton], style: m == null ? void 0 : m[O.DayButton], type: "button", day: Y, modifiers: F, disabled: !F.focused && F.disabled || void 0, "aria-disabled": F.focused && F.disabled || void 0, tabIndex: Ar(Y) ? 0 : -1, "aria-label": zr(ce, F, s.options, s), onClick: Kr(Y, F), onBlur: Zr(Y, F), onFocus: Qr(Y, F), onKeyDown: ea(Y, F), onMouseEnter: ta(Y, F), onMouseLeave: na(Y, F) }, N(ce, s.options, s)) : !F.hidden && N(Y.date, s.options, s));
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
function Ts(e) {
  return e ? e.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}
function hl({
  value: e,
  onChange: t,
  placeholder: n = "Select date",
  disabled: r = !1,
  minDate: a,
  maxDate: i
}) {
  const [s, c] = $(!1), l = q(null);
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
          /* @__PURE__ */ o("span", { children: Ts(e) || n })
        ]
      }
    ),
    s && /* @__PURE__ */ o("div", { style: h, children: /* @__PURE__ */ o(
      xr,
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
function vn(e) {
  return e ? e.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}
function pl({
  value: e,
  onChange: t,
  placeholder: n = "Select range",
  disabled: r = !1
}) {
  const [a, i] = $({}), [s, c] = $(!1), l = q(null), d = e !== void 0 ? e : a;
  U(() => {
    if (!s) return;
    function v(x) {
      l.current && !l.current.contains(x.target) && c(!1);
    }
    return document.addEventListener("mousedown", v), () => document.removeEventListener("mousedown", v);
  }, [s]);
  function h(v) {
    const x = v ?? {};
    e === void 0 && i(x), t == null || t(x);
  }
  const u = d.from ? `${vn(d.from)} — ${d.to ? vn(d.to) : "..."}` : n, f = {
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
          r || c((v) => !v);
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
      xr,
      {
        mode: "range",
        selected: d,
        onSelect: h
      }
    ) })
  ] });
}
function bn(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function xn(e) {
  return String(e).padStart(2, "0");
}
function ml({
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
    const p = bn(parseInt(f || "0", 10), 0, l), v = xn(p);
    i(v), t == null || t(`${v}:${s || "00"}`);
  }
  function h(f) {
    const p = bn(parseInt(f || "0", 10), 0, 59), v = xn(p);
    c(v), t == null || t(`${a || "00"}:${v}`);
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
const jn = {
  cyan: { background: "var(--j-accent-12)", color: "var(--j-cyan)", border: "1px solid var(--j-accent-35)" },
  amber: { background: "var(--j-warn-12)", color: "var(--j-amber)", border: "1px solid var(--j-warn-25)" },
  red: { background: "var(--j-err-12)", color: "var(--j-red)", border: "1px solid var(--j-err-25)" },
  green: { background: "var(--j-ok-12)", color: "var(--j-green)", border: "1px solid var(--j-ok-25)" },
  ghost: { background: "var(--j-accent-05)", color: "var(--j-text-muted)", border: "1px solid var(--j-border-dim)" },
  blue: { background: "var(--j-accent-12)", color: "var(--j-accent)", border: "1px solid var(--j-accent-35)" },
  white: { background: "var(--j-accent-05)", color: "var(--j-text-primary)", border: "1px solid var(--j-border)" }
}, wn = {
  xs: { fontSize: 8, padding: "2px 7px" },
  sm: { fontSize: 9, padding: "3px 9px" },
  md: { fontSize: 10, padding: "4px 12px" },
  lg: { fontSize: 11, padding: "5px 14px" },
  xl: { fontSize: 12, padding: "6px 16px" }
}, Is = {
  angular: { clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" },
  hex: { clipPath: "polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)", paddingLeft: 14, paddingRight: 14 },
  diamond: { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0 },
  pill: { borderRadius: "999px" }
}, Ps = {
  amber: { background: "var(--j-amber)" },
  red: { background: "var(--j-red)" },
  green: { background: "var(--j-green)" }
};
function jr({ color: e = "cyan", size: t = "sm", shape: n = "angular", blink: r = !1, showDot: a = !1, children: i }) {
  const s = {
    display: "inline-flex",
    alignItems: "center",
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    fontFamily: "'Courier New', monospace",
    ...jn[e] ?? jn.cyan,
    ...wn[t] ?? wn.sm,
    ...Is[n]
  };
  return /* @__PURE__ */ g("span", { className: r ? "j-blink" : void 0, style: s, children: [
    a && /* @__PURE__ */ o(
      "span",
      {
        className: "j-status-dot",
        style: { marginRight: 5, display: "inline-block", flexShrink: 0, ...Ps[e] ?? {} }
      }
    ),
    i
  ] });
}
const kn = {
  active: { bg: "var(--j-accent-08)", accent: "var(--j-accent)" },
  processing: { bg: "var(--j-accent-08)", accent: "var(--j-accent)" },
  warning: { bg: "var(--j-warn-05)", accent: "var(--j-warn)" },
  error: { bg: "var(--j-err-05)", accent: "var(--j-err)" },
  success: { bg: "var(--j-ok-05)", accent: "var(--j-ok)" },
  idle: { bg: "var(--j-accent-05)", accent: "var(--j-accent-18)" }
}, _s = {
  warning: { background: "var(--j-amber)", animationDuration: "1.8s" },
  error: { background: "var(--j-red)", animationDuration: "0.7s" },
  success: { background: "var(--j-green)", animationDuration: "2.5s" },
  idle: { background: "var(--j-accent-25)", animation: "none" }
};
function Es({ state: e = "active", blink: t = !1, children: n }) {
  const { bg: r, accent: a } = kn[e] ?? kn.active;
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
        /* @__PURE__ */ o("span", { className: "j-status-dot", style: _s[e] }),
        /* @__PURE__ */ o("span", { style: { fontSize: 11, letterSpacing: "0.08em", color: a }, children: n })
      ]
    }
  );
}
const Sn = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10], Fs = {
  warning: "var(--j-amber)",
  error: "var(--j-red)",
  success: "var(--j-green)"
}, Ys = {
  height: 5,
  background: "var(--j-accent-08)",
  clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
  position: "relative",
  overflow: "hidden"
};
function As({
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
    const l = Math.round(e / 100 * s), d = Fs[n];
    return /* @__PURE__ */ g("div", { children: [
      c,
      /* @__PURE__ */ o("div", { className: "j-tick-row", children: Array.from({ length: s }, (h, u) => /* @__PURE__ */ o(
        "div",
        {
          className: `j-tk${u < l ? "" : " off"}`,
          style: { height: Sn[u % Sn.length], ...d ? { background: d } : {} }
        },
        u
      )) })
    ] });
  }
  return /* @__PURE__ */ g("div", { children: [
    c,
    /* @__PURE__ */ o("div", { style: Ys, children: a ? /* @__PURE__ */ g(B, { children: [
      /* @__PURE__ */ o("div", { style: { position: "absolute", inset: 0, background: "var(--j-accent)", opacity: 0.15, clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)" } }),
      /* @__PURE__ */ o("div", { style: { position: "absolute", top: 0, left: -40, bottom: 0, width: 40, background: "linear-gradient(90deg, transparent, var(--j-accent), transparent)", animation: "j-scan-h 1.4s ease-in-out infinite" } })
    ] }) : /* @__PURE__ */ o("div", { style: { width: `${e}%`, height: "100%", background: "linear-gradient(90deg, var(--j-accent-deep), var(--j-accent))", clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)", transition: "width 0.6s ease-out" } }) })
  ] });
}
const Nn = {
  width: 5,
  height: 5,
  flexShrink: 0,
  background: "var(--j-accent)",
  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  boxShadow: "0 0 6px var(--j-accent)"
};
function gl({ orientation: e = "horizontal", label: t, showDot: n = !0, height: r = "40px", margin: a = "8px 0", opacity: i = 0.3 }) {
  const s = "var(--j-accent)";
  return e === "vertical" ? /* @__PURE__ */ g("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", height: r, margin: "0 8px" }, children: [
    /* @__PURE__ */ o("div", { style: { flex: 1, width: 1, background: `linear-gradient(180deg, transparent, ${s})`, opacity: i } }),
    n && /* @__PURE__ */ o("div", { style: { ...Nn, margin: "6px 0" } }),
    /* @__PURE__ */ o("div", { style: { flex: 1, width: 1, background: `linear-gradient(180deg, ${s}, transparent)`, opacity: i } })
  ] }) : /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", margin: a, width: "100%" }, children: [
    /* @__PURE__ */ o("div", { style: { flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${s})`, opacity: i } }),
    t ? /* @__PURE__ */ o("span", { style: { fontSize: 8, color: s, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0 10px", opacity: 0.7, whiteSpace: "nowrap" }, children: t }) : n && /* @__PURE__ */ o("div", { style: { ...Nn, margin: "0 8px" } }),
    /* @__PURE__ */ o("div", { style: { flex: 1, height: 1, background: `linear-gradient(90deg, ${s}, transparent)`, opacity: i } })
  ] });
}
function yl({ variant: e = "chip", text: t, subText: n, value: r, color: a = "cyan", showDot: i = !0, showLine: s = !0 }) {
  const c = L.cls("j-hl", `j-hl-${e}`, L.color(a));
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
const Mn = {
  active: "var(--j-accent)",
  processing: "var(--j-accent)",
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "var(--j-accent-35)"
}, Dn = {
  active: "var(--j-accent-05)",
  processing: "var(--j-accent-05)",
  warning: "var(--j-warn-05)",
  error: "var(--j-err-05)",
  success: "var(--j-ok-05)",
  idle: "var(--j-accent-05)"
}, zs = {
  warning: "⚠",
  error: "✕",
  success: "✓"
}, Bs = {
  error: "j-pulse 0.8s ease-in-out infinite",
  warning: "j-pulse 1.5s ease-in-out infinite"
};
function vl({ state: e = "active", title: t, children: n, dismissible: r = !1, blink: a = !1, onDismiss: i }) {
  const [s, c] = $(!0);
  if (!s) return null;
  const l = Mn[e] ?? Mn.active, d = Dn[e] ?? Dn.active, h = zs[e] ?? "ℹ", u = Bs[e];
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
const Rs = {
  warning: "linear-gradient(90deg, var(--j-warn-12), var(--j-warn))",
  error: "linear-gradient(90deg, var(--j-err-12),  var(--j-err))",
  success: "linear-gradient(90deg, var(--j-ok-12),   var(--j-ok))"
}, Hs = {
  warning: "var(--j-amber)",
  error: "var(--j-red)",
  success: "var(--j-green)"
};
function Js({ label: e, value: t, barPercent: n, state: r = "active" }) {
  const a = Rs[r], i = Hs[r];
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
function bl({ open: e, onClose: t, title: n, subTitle: r, closable: a = !0, closeOnBackdrop: i = !0, width: s = "480px", notchSize: c = "18px", children: l, footer: d }) {
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
  return Rn(
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
const wr = we(null);
function xl() {
  const e = je(wr);
  if (!e) throw new Error("useToast must be used within JToastProvider");
  return e;
}
const Cn = {
  active: "var(--j-accent)",
  processing: "var(--j-accent)",
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "var(--j-accent)"
}, Gs = {
  warning: "⚠",
  error: "✕",
  success: "✓"
}, qs = {
  error: "j-pulse 0.7s ease-in-out infinite",
  warning: "j-pulse 1.3s ease-in-out infinite"
};
function Ls({ id: e, state: t, message: n, title: r, duration: a, onDismiss: i }) {
  const s = Cn[t] ?? Cn.active, c = Gs[t] ?? "ℹ", l = qs[t];
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
function jl({ children: e }) {
  const [t, n] = $([]), r = q(0);
  function a(s, c, l, d = 4e3) {
    const h = `toast-${++r.current}`;
    return n((u) => [...u, { id: h, state: s, message: c, title: l, duration: d }]), h;
  }
  function i(s) {
    n((c) => c.filter((l) => l.id !== s));
  }
  return /* @__PURE__ */ g(wr.Provider, { value: { show: a, dismiss: i }, children: [
    e,
    /* @__PURE__ */ o("div", { style: { position: "fixed", bottom: 24, right: 24, zIndex: 2e3, display: "flex", flexDirection: "column-reverse", gap: 8, pointerEvents: "none", width: 320 }, children: t.map((s) => /* @__PURE__ */ o(Ls, { ...s, onDismiss: () => i(s.id) }, s.id)) })
  ] });
}
const Xs = {
  warning: "j-text-warn",
  error: "j-text-err",
  success: "j-text-ok"
}, Vs = {
  warning: { background: "var(--j-amber)" },
  error: { background: "var(--j-red)" },
  success: { background: "var(--j-green)" }
};
function wl({
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
  const p = L.cls("j-text-val", Xs[s] ?? null), v = Vs[s];
  return /* @__PURE__ */ g(Pa, { cardStyle: e, color: t, padding: n, children: [
    /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }, children: [
      /* @__PURE__ */ o("div", { className: "j-text-xs", children: r }),
      c && /* @__PURE__ */ o(jr, { color: l, size: "xs", children: c })
    ] }),
    /* @__PURE__ */ o("div", { className: p, children: a }),
    i && /* @__PURE__ */ g("div", { className: "j-text-sub", style: { display: "flex", alignItems: "center", gap: 4 }, children: [
      d && /* @__PURE__ */ o("span", { className: "j-status-dot", style: v }),
      i
    ] }),
    h !== void 0 && /* @__PURE__ */ o("div", { style: { marginTop: 8 }, children: /* @__PURE__ */ o(As, { value: h, variant: "bar", showPercent: !1 }) }),
    u && u.length > 0 && /* @__PURE__ */ o("div", { style: { marginTop: 8 }, children: u.map((x) => /* @__PURE__ */ o(Js, { label: x.label, value: x.value, barPercent: x.barPercent }, x.label)) }),
    f
  ] });
}
const kr = we(null);
function Us() {
  return je(kr);
}
function kl({ activeTab: e, onTabChange: t, children: n }) {
  var h;
  const r = [];
  ha.forEach(n, (u) => {
    if (pa(u) && u.type._isJTab) {
      const f = u.props;
      r.push({ key: f.tabKey, label: f.label, icon: f.icon, badge: f.badge, disabled: f.disabled });
    }
  });
  const [a, i] = $(null), s = ((h = r.find((u) => !u.disabled)) == null ? void 0 : h.key) ?? "", c = e ?? a ?? s;
  function l(u) {
    e === void 0 && i(u), t == null || t(u);
  }
  function d(u, f) {
    var k, y, b, j, M;
    const p = r.filter((S) => !S.disabled), v = p.findIndex((S) => S.key === f);
    let x;
    if (u.key === "ArrowRight") x = (k = p[(v + 1) % p.length]) == null ? void 0 : k.key;
    else if (u.key === "ArrowLeft") x = (y = p[(v - 1 + p.length) % p.length]) == null ? void 0 : y.key;
    else if (u.key === "Home") x = (b = p[0]) == null ? void 0 : b.key;
    else if (u.key === "End") x = (j = p[p.length - 1]) == null ? void 0 : j.key;
    else return;
    u.preventDefault(), x && (l(x), (M = document.getElementById(`tab-${x}`)) == null || M.focus());
  }
  return /* @__PURE__ */ g(kr.Provider, { value: { activeTab: c, selectTab: l }, children: [
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
function Ks({ tabKey: e, children: t }) {
  const n = Us();
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
Ks._isJTab = !0;
function Qs(e, t) {
  return e === "warning" ? "var(--j-warn)" : e === "error" ? "var(--j-err)" : e === "success" ? "var(--j-ok)" : t === "amber" ? "var(--j-warn)" : t === "red" ? "var(--j-err)" : "var(--j-accent)";
}
function Sl({
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
  const [d, h] = $(r), u = Bn(), f = a !== void 0 ? a : d, p = Qs(s, c);
  function v() {
    const x = !f;
    a === void 0 && h(x), i == null || i(x);
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
        onClick: v,
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
function Zs(e, t, n) {
  const r = Math.floor(n / 2);
  let a = Math.max(1, e - r), i = Math.min(t, a + n - 1);
  a = Math.max(1, i - n + 1);
  const s = [];
  a > 1 && (s.push(1), a > 2 && s.push(-1));
  for (let c = a; c <= i; c++) s.push(c);
  return i < t && (i < t - 1 && s.push(-1), s.push(t)), s;
}
const Sr = {
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
    ...Sr,
    background: "transparent",
    border: `1px solid ${e ? "var(--j-accent-08)" : "var(--j-accent-18)"}`,
    color: e ? "var(--j-accent-18)" : "var(--j-text-muted)",
    cursor: e ? "not-allowed" : "pointer"
  };
}
function ec(e) {
  return {
    ...Sr,
    background: e ? "var(--j-accent-12)" : "transparent",
    border: `1px solid ${e ? "var(--j-accent)" : "var(--j-accent-18)"}`,
    color: e ? "var(--j-accent)" : "var(--j-text-muted)",
    boxShadow: e ? "0 0 8px var(--j-accent-44)" : "none"
  };
}
function Nl({
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
          /* @__PURE__ */ o(B, { children: Zs(e, n, i).map(
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
                style: ec(d === e),
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
const On = [6, 10, 14, 14, 10, 6, 8, 12, 16, 16, 12, 8];
function Ml({
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
    const p = f < e, v = f === e - 1 && e > 0, x = On[f % On.length], k = d ? { width: x, height: 4 } : { width: c, height: x };
    let y, b, j;
    return v ? (y = "linear-gradient(0deg, var(--j-accent-12), var(--j-accent))", b = "0 0 10px var(--j-accent), 0 0 20px var(--j-accent-25)", j = "j-pulse 0.6s ease-in-out infinite") : p ? (y = "var(--j-accent)", b = "0 0 5px var(--j-accent-25)", j = void 0) : (y = "var(--j-accent-05)", b = "none", j = void 0), {
      ...k,
      background: y,
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
const Wn = [6, 14, 22, 18, 28, 20, 30, 24, 28, 22, 16, 20, 26, 18, 12, 22, 28, 18, 10, 14], $n = [".4s", ".5s", ".6s", ".4s", ".7s", ".5s", ".6s", ".4s", ".8s", ".5s"];
function Dl({
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
          height: `${Wn[a % Wn.length]}px`,
          background: "var(--j-accent)",
          "--j-wv-dur": $n[a % $n.length],
          "--j-wv-dly": `${(a * 0.04).toFixed(2)}s`,
          ...n ? {} : { transform: "scaleY(0.15)", animationPlayState: "paused" }
        };
        return /* @__PURE__ */ o("div", { className: "j-wv", style: i }, a);
      })
    }
  );
}
function tc(e) {
  return e === "processing" ? { r1: "2s", r2: "1.2s", r3: "1.8s" } : e === "idle" ? { r1: "8s", r2: "6s", r3: "9s" } : { r1: "4s", r2: "3s", r3: "5s" };
}
function nc(e, t) {
  return e === "idle" ? "Idle" : e === "processing" ? "Processing" : e === "warning" ? "Warning" : e === "error" ? "Error" : t ? "Listening" : "Online";
}
const rc = Array.from({ length: 12 }, (e, t) => t * 30);
function Cl({
  systemName: e = "JARVIS",
  size: t = "160px",
  state: n = "active",
  listening: r = !1,
  onClick: a
}) {
  const i = tc(n), s = nc(n, r);
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
        rc.map((c) => {
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
const ac = 80, oc = 28, Nr = 2, Jt = 3, ic = ac - Nr * 2, It = oc - Jt * 2, Tn = Jt + It;
function sc(e) {
  if (e.length === 0) return [];
  const t = Math.min(...e), n = Math.max(...e), r = n - t === 0 ? 1 : n - t;
  return e.map((a, i) => ({
    x: Nr + i * (ic / Math.max(e.length - 1, 1)),
    y: Jt + It - It * (a - t) / r
  }));
}
function cc(e, t) {
  if (t !== "auto") return t;
  if (e.length < 2) return "flat";
  const n = Math.min(...e), a = Math.max(...e) - n, i = e[e.length - 1];
  return i > e[0] + a * 0.05 ? "up" : i < e[0] - a * 0.05 ? "down" : "flat";
}
function Ol({
  data: e,
  width: t = "80px",
  height: n = "28px",
  showArea: r = !0,
  showTrend: a = !1,
  trend: i = "auto",
  colorVar: s
}) {
  const c = sc(e), l = cc(e, i), h = `var(${s ?? (l === "up" ? "--j-ok" : l === "down" ? "--j-err" : "--j-accent")})`, u = c.map((k) => `${k.x.toFixed(1)},${k.y.toFixed(1)}`).join(" "), f = l === "up" ? "▲" : l === "down" ? "▼" : "─", p = l === "up" ? "j-text-ok" : l === "down" ? "j-text-err" : "j-text-accent";
  let v = "";
  if (c.length >= 2) {
    v = `M ${c[0].x.toFixed(1)} ${Tn} L ${c[0].x.toFixed(1)} ${c[0].y.toFixed(1)}`;
    for (let k = 1; k < c.length; k++)
      v += ` L ${c[k].x.toFixed(1)} ${c[k].y.toFixed(1)}`;
    v += ` L ${c[c.length - 1].x.toFixed(1)} ${Tn} Z`;
  }
  const x = c[c.length - 1];
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
                  d: v,
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
              x && /* @__PURE__ */ o(
                "circle",
                {
                  cx: x.x,
                  cy: x.y,
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
const Pt = 400, Je = 220, me = 36, Mr = 8, Ge = 12, Dr = 22, ot = 6, it = Pt - me - Mr, st = Je - Ge - Dr;
function ct(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(1);
}
function Wl({
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
                  x2: Pt - Mr,
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
            const f = it / e.length - ot, p = l > 0 ? st * (h.value / l) : 0, v = me + u * (it / e.length) + ot / 2, x = Ge + st - p;
            return /* @__PURE__ */ g("g", { className: "j-chart-bar-group", children: [
              /* @__PURE__ */ o(
                "polygon",
                {
                  points: `${v},${x + 6} ${v + 4},${x} ${v + f - 4},${x} ${v + f},${x + 6}`,
                  style: { fill: d }
                }
              ),
              /* @__PURE__ */ o(
                "rect",
                {
                  x: v,
                  y: x + 5,
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
                  x: v,
                  y: x + 5,
                  width: f,
                  height: Math.max(p - 5, 0),
                  className: "j-chart-bar-glow",
                  style: { fill: d }
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: v + f / 2,
                  y: Je - 2,
                  className: "j-chart-axis-label",
                  textAnchor: "middle",
                  children: h.label
                }
              ),
              s && p > 10 && /* @__PURE__ */ o(
                "text",
                {
                  x: v + f / 2,
                  y: x - 3,
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
                  y2: Je - Dr,
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
            const f = st / e.length, p = f - ot, v = l > 0 ? it * (h.value / l) : 0, x = Ge + u * f + ot / 2;
            return /* @__PURE__ */ g("g", { className: "j-chart-bar-group", children: [
              /* @__PURE__ */ o(
                "rect",
                {
                  x: me,
                  y: x,
                  width: v,
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
                  y: x,
                  width: v,
                  height: p,
                  className: "j-chart-bar-glow",
                  style: { fill: d }
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: me - 4,
                  y: x + p / 2 + 4,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: h.label
                }
              ),
              s && /* @__PURE__ */ o(
                "text",
                {
                  x: me + v + 4,
                  y: x + p / 2 + 4,
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
const _t = 400, Et = 200, ft = 36, Cr = 8, qe = 10, lc = 20, dc = _t - ft - Cr, ze = Et - qe - lc;
function uc(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(1);
}
function $l({
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
  const l = e.map((k) => k.value), d = Math.min(...l), h = Math.max(...l), u = h - d === 0 ? 1 : h - d, f = `var(${n})`, p = e.map((k, y) => ({
    x: ft + y * (dc / Math.max(e.length - 1, 1)),
    y: qe + ze - ze * (k.value - d) / u
  })), v = p.map((k) => `${k.x.toFixed(1)},${k.y.toFixed(1)}`).join(" ");
  let x = "";
  if (p.length >= 2) {
    x = `M ${p[0].x.toFixed(1)} ${qe + ze}`;
    for (const k of p) x += ` L ${k.x.toFixed(1)} ${k.y.toFixed(1)}`;
    x += ` L ${p[p.length - 1].x.toFixed(1)} ${qe + ze} Z`;
  }
  return /* @__PURE__ */ g("div", { className: "j-chart-wrap", style: { height: t, position: "relative" }, children: [
    /* @__PURE__ */ o("div", { className: "j-chart-scan" }),
    /* @__PURE__ */ g(
      "svg",
      {
        className: "j-chart-svg",
        viewBox: `0 0 ${_t} ${Et}`,
        preserveAspectRatio: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          s && Array.from({ length: c + 1 }, (k, y) => {
            const b = qe + y * (ze / c), j = h - y * (u / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ o(
                "line",
                {
                  x1: ft,
                  y1: b,
                  x2: _t - Cr,
                  y2: b,
                  className: "j-chart-grid"
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: ft - 4,
                  y: b + 3,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: uc(j)
                }
              )
            ] }, `grid-${y}`);
          }),
          r && p.length >= 2 && /* @__PURE__ */ o("path", { d: x, className: "j-chart-area", style: { fill: f } }),
          p.length >= 2 && /* @__PURE__ */ o(
            "polyline",
            {
              points: v,
              className: "j-chart-line",
              style: { stroke: f, fill: "none" }
            }
          ),
          a && p.map((k, y) => /* @__PURE__ */ o(
            "circle",
            {
              cx: k.x,
              cy: k.y,
              r: 3,
              className: "j-chart-dot",
              style: { fill: f }
            },
            y
          )),
          i && e.map((k, y) => /* @__PURE__ */ o(
            "text",
            {
              x: p[y].x,
              y: Et - 2,
              className: "j-chart-axis-label",
              textAnchor: "middle",
              children: k.label
            },
            `xlbl-${y}`
          ))
        ]
      }
    )
  ] });
}
const Te = 50, Ot = 50;
function Tl({
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
    const f = l > 0 ? u.value / l : 0, p = f * c, v = c - p, x = d;
    return d += f * 360, { seg: u, dash: p, gap: v, rotate: x };
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
              cy: Ot,
              r: s,
              fill: "none",
              stroke: "var(--j-accent-10)",
              strokeWidth: n
            }
          ),
          l > 0 && h.map(({ seg: u, dash: f, gap: p, rotate: v }, x) => /* @__PURE__ */ o(
            "circle",
            {
              cx: Te,
              cy: Ot,
              r: s,
              fill: "none",
              stroke: u.color ?? "var(--j-accent)",
              strokeWidth: n,
              strokeDasharray: `${f.toFixed(2)} ${p.toFixed(2)}`,
              transform: `rotate(${v} ${Te} ${Ot})`,
              className: "j-chart-donut-seg"
            },
            x
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
function mt(e) {
  return e * Math.PI / 180;
}
function In(e, t) {
  if (t <= 0) return "";
  const n = mt(e), r = mt(e + t), a = ge + ue * Math.cos(n), i = Ce + ue * Math.sin(n), s = ge + ue * Math.cos(r), c = Ce + ue * Math.sin(r), l = t > 180 ? 1 : 0;
  return `M ${a.toFixed(2)} ${i.toFixed(2)} A ${ue} ${ue} 0 ${l} 1 ${s.toFixed(2)} ${c.toFixed(2)}`;
}
function Wt(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(0);
}
function Il({
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
  const f = Math.max(0, Math.min(1, (e - t) / (n - t || 1))), p = `var(${a})`, v = dt * f, x = mt(lt + f * dt), k = ge + (ue - 2) * Math.cos(x), y = Ce + (ue - 2) * Math.sin(x), b = ue - i / 2 - 2, j = ue + i / 2 + 4;
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
            d: In(lt, dt),
            fill: "none",
            stroke: "var(--j-accent-10)",
            strokeWidth: i,
            strokeLinecap: "round"
          }
        ),
        v > 0 && /* @__PURE__ */ o(
          "path",
          {
            d: In(lt, v),
            fill: "none",
            stroke: p,
            strokeWidth: i,
            strokeLinecap: "round",
            className: "j-chart-gauge-arc"
          }
        ),
        d && Array.from({ length: u + 1 }, (M, S) => {
          const m = mt(lt + S / u * dt);
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
              x2: k,
              y2: y,
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
            children: c ?? Wt(e)
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
              children: Wt(t)
            }
          ),
          /* @__PURE__ */ o(
            "text",
            {
              x: 186,
              y: 114,
              textAnchor: "end",
              className: "j-chart-axis-label",
              children: Wt(n)
            }
          )
        ] })
      ]
    }
  ) });
}
const Or = 100, Wr = 100, Be = 78;
function fc(e) {
  return e * Math.PI / 180;
}
function hc(e, t) {
  return fc(360 * e / t - 90);
}
function ht(e, t, n) {
  const r = hc(e, t);
  return [Or + n * Math.cos(r), Wr + n * Math.sin(r)];
}
function Pn(e, t, n) {
  const [r, a] = ht(e, t, n);
  return `${r.toFixed(2)},${a.toFixed(2)}`;
}
function _n(e) {
  return Math.max(0, Math.min(1, e));
}
function Pl({
  axes: e,
  size: t = "200px",
  colorVar: n = "--j-accent",
  rings: r = 4,
  showLabels: a = !0
}) {
  const i = Math.max(e.length, 3), s = `var(${n},var(--j-accent))`, c = Array.from({ length: r }, (f, p) => {
    const v = Be * (p + 1) / r, x = Array.from({ length: i }, (k, y) => Pn(y, i, v)).join(" ");
    return /* @__PURE__ */ o("polygon", { points: x, className: "j-chart-radar-web" }, p);
  }), l = Array.from({ length: i }, (f, p) => {
    const [v, x] = ht(p, i, Be);
    return /* @__PURE__ */ o(
      "line",
      {
        x1: Or,
        y1: Wr,
        x2: v,
        y2: x,
        className: "j-chart-radar-spoke"
      },
      p
    );
  }), d = e.map((f, p) => {
    const v = _n(f.value / ((f.max ?? 100) || 1));
    return Pn(p, i, Be * v);
  }).join(" "), h = e.map((f, p) => {
    const v = _n(f.value / ((f.max ?? 100) || 1)), [x, k] = ht(p, i, Be * v);
    return /* @__PURE__ */ o(
      "circle",
      {
        cx: x,
        cy: k,
        r: 3,
        className: "j-chart-dot",
        style: { fill: s }
      },
      p
    );
  }), u = a ? e.map((f, p) => {
    const [v, x] = ht(p, i, Be + 14), k = v < 98 ? "end" : v > 102 ? "start" : "middle";
    return /* @__PURE__ */ o(
      "text",
      {
        x: v,
        y: x + 4,
        className: "j-chart-axis-label",
        textAnchor: k,
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
const En = [
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
function _l({
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
        for (let v = 1; v <= En.length; v++) {
          if (f) return;
          h(v), await Me(180);
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
        i >= 2 && /* @__PURE__ */ o("div", { style: { position: "absolute", top: "30%", left: "10%", right: "10%" }, children: En.slice(0, d).map((f, p) => /* @__PURE__ */ o(
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
          /* @__PURE__ */ o("div", { "data-spinner": "", children: /* @__PURE__ */ o(Ft, { size: "80px", color: "cyan", label: e, showLabel: !0 }) }),
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
const pc = {
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "var(--j-text-muted)",
  active: "var(--j-text-secondary)",
  processing: "var(--j-text-secondary)"
}, mc = {
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "transparent",
  active: "transparent",
  processing: "transparent"
}, gc = {
  warning: "amber",
  error: "red",
  success: "green",
  idle: "ghost",
  active: "cyan",
  processing: "cyan"
};
function yc(e, t) {
  if (!t) return "active";
  const n = String(e[t] ?? "").toLowerCase();
  return n === "warning" || n === "warn" ? "warning" : n === "error" || n === "danger" ? "error" : n === "success" || n === "ok" ? "success" : n === "idle" || n === "offline" ? "idle" : "active";
}
function El({
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
        /* @__PURE__ */ o(Ft, { size: "24px", showLabel: !1 }),
        /* @__PURE__ */ o("span", { style: { fontSize: 10, color: "var(--j-text-dim)", letterSpacing: "0.10em" }, children: "NO DATA" })
      ] }) }) }) : t.map((l, d) => {
        const h = yc(l, n), u = d === i, f = u ? "var(--j-accent-05)" : d % 2 === 0 ? "transparent" : "var(--j-accent-05)", p = mc[h] ?? "transparent";
        return /* @__PURE__ */ o(
          "tr",
          {
            "data-state": h,
            style: { background: f, transition: "background 0.12s", borderLeft: `2px solid ${p === "transparent" && u ? "var(--j-accent-50)" : p}` },
            onMouseEnter: () => s(d),
            onMouseLeave: () => s(-1),
            children: e.map((x) => {
              const k = String(l[x.key] ?? ""), y = pc[h] ?? "var(--j-text-secondary)", b = {
                padding: "8px 14px",
                textAlign: x.align ?? "left",
                borderBottom: "1px solid var(--j-accent-05)",
                color: y
              };
              let j = k;
              return x.key === n ? j = /* @__PURE__ */ o(Es, { state: h, children: k }) : x.isBadge && (j = /* @__PURE__ */ o(jr, { color: gc[h] ?? "cyan", children: k })), /* @__PURE__ */ o("td", { style: b, children: j }, x.key);
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
function vc(e = "active") {
  return e === "warning" ? "var(--j-warn)" : e === "error" ? "var(--j-err)" : e === "success" ? "var(--j-ok)" : "var(--j-accent-mid)";
}
function Fl({
  visible: e,
  onClose: t,
  commands: n,
  onExecute: r,
  placeholder: a = "Type a command...",
  isListening: i = !1
}) {
  const [s, c] = $(""), [l, d] = $(0), h = q(null);
  U(() => {
    var S;
    e && (c(""), d(0), (S = h.current) == null || S.focus());
  }, [e]);
  const u = Le(() => {
    if (!s.trim()) return n;
    const S = s.toLowerCase();
    return n.filter(
      (m) => {
        var w;
        return m.label.toLowerCase().includes(S) || m.key.toLowerCase().includes(S) || (((w = m.description) == null ? void 0 : w.toLowerCase().includes(S)) ?? !1);
      }
    );
  }, [n, s]);
  function f(S) {
    c(S.target.value), d(0);
  }
  function p(S) {
    S.key === "ArrowDown" ? (S.preventDefault(), d((m) => Math.min(m + 1, u.length - 1))) : S.key === "ArrowUp" ? (S.preventDefault(), d((m) => Math.max(m - 1, 0))) : S.key === "Enter" ? u[l] && v(u[l]) : S.key === "Escape" && x();
  }
  function v(S) {
    r(S), x();
  }
  function x() {
    c(""), d(0), t();
  }
  function k() {
    var S;
    c(""), d(0), (S = h.current) == null || S.focus();
  }
  if (!e) return null;
  const y = [];
  let b;
  u.forEach((S, m) => {
    const w = S.group !== b;
    b = S.group, y.push({ cmd: S, idx: m, showGroup: w });
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
        onClick: x,
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
            onClick: k,
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
      }, children: "NO COMMANDS FOUND" }) : y.map(({ cmd: S, idx: m, showGroup: w }) => {
        const N = m === l, C = vc(S.state ?? "active");
        return /* @__PURE__ */ g("div", { children: [
          w && S.group && /* @__PURE__ */ o("div", { "data-group-header": "", style: {
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
              onClick: () => v(S),
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
const $r = we(null);
function bc() {
  return je($r);
}
function xc(e) {
  return e === "warning" ? "var(--j-warn)" : e === "error" ? "var(--j-err)" : e === "success" ? "var(--j-ok)" : "var(--j-accent)";
}
function jc(e) {
  return e === "warning" ? "var(--j-warn-25)" : e === "error" ? "var(--j-err-25)" : e === "success" ? "var(--j-ok-25)" : "var(--j-accent-25)";
}
function wc(e) {
  return e === "warning" ? "var(--j-warn-12)" : e === "error" ? "var(--j-err-12)" : e === "success" ? "var(--j-ok-12)" : "var(--j-accent-12)";
}
function kc(e, t) {
  const n = (e - 90) * Math.PI / 180;
  return {
    x: Math.round(t * Math.cos(n)),
    y: Math.round(t * Math.sin(n))
  };
}
function Yl({
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
  const v = E((y) => {
    c((b) => b.some((j) => j.key === y.key) ? b : [...b, y]);
  }, []);
  function x() {
    const y = !l;
    d(y), y || (u(null), p(null)), t == null || t(y);
  }
  function k() {
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
        /* @__PURE__ */ o($r.Provider, { value: v, children: i }),
        s.map((y) => {
          const { x: b, y: j } = kc(y.angle, r), M = h === y.key, S = xc(y.state), m = jc(y.state), w = wc(y.state), N = l ? `translate(calc(-50% + ${b}px), calc(-50% + ${j}px))` : "translate(-50%, -50%)";
          return /* @__PURE__ */ g(
            "div",
            {
              "data-item-key": y.key,
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
                u(y.key), p(y.label);
              },
              onMouseLeave: () => {
                u(null), p(null);
              },
              onClick: () => {
                y.onClick(), k();
              },
              children: [
                /* @__PURE__ */ o("div", { style: {
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: M ? w : "var(--j-bg-card)",
                  border: `1.5px solid ${M ? S : m}`,
                  boxShadow: M ? `0 0 16px ${m}, inset 0 0 12px ${w}` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                }, children: /* @__PURE__ */ o("span", { style: {
                  fontSize: 16,
                  fontStyle: "normal",
                  filter: M ? `drop-shadow(0 0 6px ${S})` : "none"
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
                      background: `linear-gradient(90deg, ${m}, transparent)`,
                      opacity: M ? 0.8 : 0.2,
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
            onClick: x,
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
function Al({
  icon: e = "⊞",
  label: t = "",
  angle: n = 0,
  state: r = "active",
  onClick: a
}) {
  const i = bc();
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
const Sc = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)",
  blue: "var(--j-accent)",
  white: "var(--j-text-primary)"
};
function zl({
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
  const [h, u] = $({ x: t, y: n }), [f, p] = $(!1), [v, x] = $(!1), k = q(null), y = q(null), b = Sc[a] ?? "var(--j-accent)", j = E((m) => {
    m.preventDefault(), k.current = { mx: m.clientX, my: m.clientY, px: h.x, py: h.y }, x(!0), m.target.setPointerCapture(m.pointerId);
  }, [h]), M = E((m) => {
    if (!k.current) return;
    const w = k.current.px + m.clientX - k.current.mx, N = k.current.py + m.clientY - k.current.my;
    u({ x: w, y: N }), d == null || d(w, N);
  }, [d]), S = E(() => {
    k.current = null, x(!1);
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
        border: `1px solid ${b}`,
        boxShadow: `0 0 12px ${b}22`,
        fontFamily: "'Courier New', monospace",
        userSelect: "none",
        transition: v ? "none" : "box-shadow .2s",
        zIndex: v ? 100 : 10,
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
              cursor: v ? "grabbing" : "grab"
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
const Nc = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)",
  blue: "var(--j-accent)",
  white: "var(--j-text-primary)"
};
function Bl({
  analog: e = !0,
  color: t = "cyan",
  size: n = 120,
  showDate: r = !0,
  className: a,
  style: i
}) {
  const [s, c] = $(/* @__PURE__ */ new Date());
  U(() => {
    const w = setInterval(() => c(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(w);
  }, []);
  const l = Nc[t] ?? "var(--j-accent)", d = (w) => String(w).padStart(2, "0"), h = `${d(s.getHours())}:${d(s.getMinutes())}:${d(s.getSeconds())}`, u = s.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit", year: "numeric" }).toUpperCase(), f = s.getSeconds() / 60 * 360, p = (s.getMinutes() + s.getSeconds() / 60) / 60 * 360, v = (s.getHours() % 12 + s.getMinutes() / 60) / 12 * 360, x = n / 2, k = n / 2, y = n / 2 - 4, b = (w, N) => ({
    x: x + N * Math.sin(w * Math.PI / 180),
    y: k - N * Math.cos(w * Math.PI / 180)
  }), j = b(v, y * 0.48), M = b(p, y * 0.65), S = b(f, y * 0.8), m = Array.from({ length: 60 }, (w, N) => {
    const C = N / 60 * Math.PI * 2, D = N % 5 === 0, T = y - (D ? 10 : 5);
    return {
      x1: x + y * Math.cos(C),
      y1: k + y * Math.sin(C),
      x2: x + T * Math.cos(C),
      y2: k + T * Math.sin(C),
      major: D
    };
  });
  return /* @__PURE__ */ g("div", { className: a, style: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6, fontFamily: "'Courier New', monospace", ...i }, children: [
    e && /* @__PURE__ */ g("svg", { width: n, height: n, children: [
      /* @__PURE__ */ o("circle", { cx: x, cy: k, r: y, fill: "none", stroke: l, strokeWidth: 1.5, opacity: 0.5 }),
      /* @__PURE__ */ o("circle", { cx: x, cy: k, r: y - 14, fill: "none", stroke: l, strokeWidth: 0.5, opacity: 0.2 }),
      m.map((w, N) => /* @__PURE__ */ o(
        "line",
        {
          x1: w.x1,
          y1: w.y1,
          x2: w.x2,
          y2: w.y2,
          stroke: l,
          strokeWidth: w.major ? 1.5 : 0.6,
          opacity: w.major ? 0.8 : 0.3
        },
        N
      )),
      [0, 3, 6, 9].map((w) => {
        const N = w / 12 * Math.PI * 2, C = y - 18;
        return /* @__PURE__ */ o(
          "text",
          {
            x: x + C * Math.sin(N),
            y: k - C * Math.cos(N) + 4,
            textAnchor: "middle",
            fill: l,
            fontSize: 8,
            fontFamily: "'Courier New'",
            opacity: 0.7,
            children: w === 0 ? "12" : w * 3
          },
          w
        );
      }),
      /* @__PURE__ */ o("line", { x1: x, y1: k, x2: j.x, y2: j.y, stroke: l, strokeWidth: 2.5, strokeLinecap: "round", opacity: 0.9 }),
      /* @__PURE__ */ o("line", { x1: x, y1: k, x2: M.x, y2: M.y, stroke: l, strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.85 }),
      /* @__PURE__ */ o("line", { x1: x, y1: k, x2: S.x, y2: S.y, stroke: "var(--j-err)", strokeWidth: 1, strokeLinecap: "round" }),
      /* @__PURE__ */ o("circle", { cx: x, cy: k, r: 3, fill: l }),
      /* @__PURE__ */ o("circle", { cx: x, cy: k, r: 6, fill: "none", stroke: l, strokeWidth: 0.7, opacity: 0.4 })
    ] }),
    /* @__PURE__ */ o("div", { style: { fontSize: e ? 13 : 22, color: l, letterSpacing: "0.15em", lineHeight: 1 }, children: h }),
    r && /* @__PURE__ */ o("div", { style: { fontSize: 8, color: "var(--j-text-muted)", letterSpacing: "0.12em" }, children: u })
  ] });
}
const Fn = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)",
  blue: "var(--j-accent)"
};
function Rl({
  level: e = 100,
  size: t = 120,
  color: n = "cyan",
  label: r,
  animated: a = !0,
  className: i,
  style: s
}) {
  const c = Fn[n] ?? Fn.cyan, l = t / 2, d = t / 2, h = Math.max(0, Math.min(100, e)) / 100, u = t * 0.46, f = t * 0.34, p = t * 0.22, v = t * 0.1, x = 2 * Math.PI * f, k = x * h, y = x * (1 - h), b = [0, 120, 240].map((S) => {
    const m = S * Math.PI / 180, w = { x: l + p * Math.cos(m - Math.PI / 2), y: d + p * Math.sin(m - Math.PI / 2) }, N = { x: l + v * Math.cos(m - Math.PI / 2 + 0.6), y: d + v * Math.sin(m - Math.PI / 2 + 0.6) }, C = { x: l + v * Math.cos(m - Math.PI / 2 - 0.6), y: d + v * Math.sin(m - Math.PI / 2 - 0.6) };
    return `M ${w.x} ${w.y} L ${N.x} ${N.y} L ${C.x} ${C.y} Z`;
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
          strokeDasharray: `${k} ${y}`,
          strokeDashoffset: x * 0.25,
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
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: v, fill: c, opacity: 0.15 + 0.6 * h }),
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: v, fill: "none", stroke: c, strokeWidth: 1.5, opacity: 0.8 }),
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: v - 3, fill: "none", stroke: c, strokeWidth: 0.7, opacity: 0.4 }),
      a && /* @__PURE__ */ g("circle", { cx: l, cy: d, r: v, fill: c, opacity: 0, children: [
        /* @__PURE__ */ o("animate", { attributeName: "opacity", values: "0;0.3;0", dur: "1.8s", repeatCount: "indefinite" }),
        /* @__PURE__ */ o("animate", { attributeName: "r", values: `${v};${v + 4};${v}`, dur: "1.8s", repeatCount: "indefinite" })
      ] }),
      /* @__PURE__ */ o(
        "text",
        {
          x: l,
          y: d + 4,
          textAnchor: "middle",
          fill: c,
          fontSize: v * 0.9,
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
const Yn = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)"
};
function Hl({
  data: e,
  color: t = "cyan",
  cellSize: n = 28,
  gap: r = 3,
  showValue: a = !1,
  title: i,
  className: s,
  style: c
}) {
  const l = Yn[t] ?? Yn.cyan;
  return /* @__PURE__ */ g("div", { className: s, style: { fontFamily: "'Courier New', monospace", ...c }, children: [
    i && /* @__PURE__ */ o("div", { style: { fontSize: 8, color: l, letterSpacing: "0.18em", marginBottom: 8 }, children: i }),
    /* @__PURE__ */ o("div", { style: { display: "flex", flexDirection: "column", gap: r }, children: e.map((d, h) => /* @__PURE__ */ o("div", { style: { display: "flex", gap: r }, children: d.map((u, f) => {
      const p = Math.max(0, Math.min(100, u.value)) / 100, v = `color-mix(in srgb, ${l} ${Math.round(p * 100)}%, var(--j-bg-card))`, x = p > 0.55 ? "var(--j-bg)" : l;
      return /* @__PURE__ */ o(
        "div",
        {
          title: u.tooltip ?? u.label ?? `${u.value}%`,
          style: {
            width: n,
            height: n,
            background: v,
            border: `1px solid ${l}`,
            borderColor: `color-mix(in srgb, ${l} 35%, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            color: x,
            cursor: "default",
            transition: "transform .15s, background .2s, color .2s",
            flexShrink: 0
          },
          onMouseEnter: (k) => {
            k.currentTarget.style.transform = "scale(1.15)", k.currentTarget.style.zIndex = "5";
          },
          onMouseLeave: (k) => {
            k.currentTarget.style.transform = "", k.currentTarget.style.zIndex = "";
          },
          children: a ? Math.round(u.value) : u.label ?? ""
        },
        f
      );
    }) }, h)) })
  ] });
}
const Mc = {
  active: "var(--j-accent)",
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  info: "var(--j-text-muted)"
}, Dc = {
  active: "●",
  warning: "▲",
  error: "✕",
  success: "✓",
  info: "○"
};
function Jl({
  items: e,
  maxRows: t = 8,
  rowHeight: n = 28,
  autoScroll: r = !0,
  showTime: a = !0,
  showSource: i = !0,
  className: s,
  style: c
}) {
  const l = q(null), [d, h] = $(!1);
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
          const p = Mc[f.level ?? "info"], v = Dc[f.level ?? "info"];
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
                /* @__PURE__ */ o("span", { style: { color: p, fontSize: 8, width: 10, flexShrink: 0 }, children: v }),
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
const An = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)"
};
function Gl({
  items: e,
  speed: t = 40,
  color: n = "cyan",
  height: r = 32,
  pauseOnHover: a = !0,
  className: i,
  style: s
}) {
  const c = q(null), l = An[n] ?? An.cyan, d = `ticker-${n}-${e.length}`;
  U(() => {
    const f = c.current;
    if (!f) return;
    const v = f.scrollWidth / 2 / t;
    let x = document.getElementById("j-ticker-style");
    x || (x = document.createElement("style"), x.id = "j-ticker-style", document.head.appendChild(x));
    const k = `@keyframes ${d} { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`;
    x.textContent = (x.textContent ?? "") + k, f.style.animation = `${d} ${v}s linear infinite`;
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
const Cc = {
  cyan: "var(--j-accent)",
  amber: "var(--j-warn)",
  green: "var(--j-ok)",
  red: "var(--j-err)",
  blue: "var(--j-accent)"
};
function ql({
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
    return e.forEach((w) => {
      m[w.id] = { x: w.x, y: w.y };
    }), m;
  }), [u, f] = $({}), [p, v] = $(null), [x, k] = $(e.map((m) => m.id)), y = q(null), b = (m) => a ? Math.round(m / r) * r : m, j = E((m, w) => {
    w.preventDefault();
    const N = d[m] ?? { x: 0, y: 0 };
    y.current = { mx: w.clientX, my: w.clientY, px: N.x, py: N.y }, v(m), k((C) => [...C.filter((D) => D !== m), m]), w.currentTarget.setPointerCapture(w.pointerId);
  }, [d]), M = E((m) => {
    if (!p || !y.current) return;
    const w = b(y.current.px + m.clientX - y.current.mx), N = b(y.current.py + m.clientY - y.current.my);
    h((C) => ({ ...C, [p]: { x: w, y: N } })), l == null || l(p, w, N);
  }, [p, b, l]), S = E(() => {
    v(null), y.current = null;
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
          const w = d[m.id] ?? { x: m.x, y: m.y }, N = Cc[m.color ?? "cyan"] ?? "var(--j-accent)", C = u[m.id], D = x.indexOf(m.id);
          return /* @__PURE__ */ g(
            "div",
            {
              style: {
                position: "absolute",
                left: w.x,
                top: w.y,
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
function Oc(e) {
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
function Wc(e) {
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
function Tr(e) {
  return e === "amber" ? "var(--j-warn)" : e === "red" ? "var(--j-err)" : e === "green" ? "var(--j-ok)" : "var(--j-accent)";
}
function $c(e) {
  return Tr(e);
}
function Tc(e) {
  return e === "amber" ? "aw" : e === "red" ? "ae" : e === "green" ? "ag" : "a";
}
function le(e) {
  return e.toFixed(2);
}
function Ll({
  nodes: e,
  edges: t,
  width: n = "100%",
  height: r = "420px",
  title: a,
  showLegend: i = !0
}) {
  const c = `ng${Bn().replace(/:/g, "")}`, [l, d] = $({}), [h, u] = $(null), f = q(null);
  U(() => {
    d((y) => {
      const b = { ...y };
      return e.forEach((j) => {
        b[j.id] || (b[j.id] = { x: j.x, y: j.y, w: Oc(j), h: Wc(j) });
      }), Object.keys(b).forEach((j) => {
        e.some((M) => M.id === j) || delete b[j];
      }), b;
    });
  }, [e]);
  function p(y, b) {
    y.stopPropagation();
    const j = l[b];
    j && (u(b), f.current = { id: b, offX: y.clientX - j.x, offY: y.clientY - j.y });
  }
  function v(y) {
    const b = f.current;
    if (!b) return;
    const { id: j, offX: M, offY: S } = b;
    d((m) => {
      const w = m[j];
      if (!w) return m;
      const N = Math.max(0, y.clientX - M), C = Math.max(0, y.clientY - S);
      return w.x === N && w.y === C ? m : { ...m, [j]: { ...w, x: N, y: C } };
    });
  }
  function x() {
    u(null), f.current = null;
  }
  function k(y, b, j, M) {
    const S = e.find((D) => D.id === j), m = S == null ? void 0 : S.type;
    if (m === "hub" || m === "diamond" || m === "hex")
      return [y.x + y.w / 2, y.y + y.h / 2];
    const w = y.y + y.h / 2, N = b.x + b.w / 2, C = y.x + y.w / 2;
    return M ? N >= C ? [y.x + y.w, w] : [y.x, w] : N < C ? [y.x + y.w, w] : [y.x, w];
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
      onMouseMove: v,
      onMouseUp: x,
      onMouseLeave: x,
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
            const b = l[y.from], j = l[y.to];
            if (!b || !j) return null;
            const [M, S] = k(b, j, y.from, !0), [m, w] = k(j, b, y.to, !1), N = M + (m - M) * 0.5, C = S, D = m - (m - M) * 0.5, T = w, X = `M ${le(M)} ${le(S)} C ${le(N)} ${le(C)} ${le(D)} ${le(T)} ${le(m)} ${le(w)}`, H = $c(y.color), R = `ep-${c}-${y.from}-${y.to}`, Z = y.arrow ?? !0 ? `url(#${c}-${Tc(y.color)})` : "none", oe = y.style === "dashed" ? "6,4" : y.style === "dotted" ? "2,4" : void 0;
            return /* @__PURE__ */ g("g", { "data-edge": `${y.from}-${y.to}`, children: [
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
              (y.animated ?? !0) && /* @__PURE__ */ o(
                "circle",
                {
                  r: "3",
                  fill: H,
                  opacity: 0.9,
                  style: { filter: `drop-shadow(0 0 3px ${H})` },
                  children: /* @__PURE__ */ o("animateMotion", { dur: `${y.animDur ?? 2}s`, repeatCount: "indefinite", children: /* @__PURE__ */ o("mpath", { href: `#${R}` }) })
                }
              ),
              y.label && /* @__PURE__ */ o(
                "text",
                {
                  x: le((M + m) / 2),
                  y: le((S + w) / 2 - 10),
                  textAnchor: "middle",
                  fontFamily: "'Courier New',monospace",
                  fontSize: "8",
                  fill: H,
                  letterSpacing: "1",
                  opacity: "0.85",
                  children: y.label
                }
              )
            ] }, R);
          })
        ] }),
        e.map((y) => {
          const b = l[y.id];
          if (!b) return null;
          const j = Tr(y.color), M = h === y.id, S = y.type ?? "chip";
          return /* @__PURE__ */ g(
            "div",
            {
              "data-node-id": y.id,
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
              onMouseDown: (m) => p(m, y.id),
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
                  /* @__PURE__ */ o("div", { style: { fontSize: 12, fontWeight: 700, color: j, letterSpacing: ".05em", textShadow: `0 0 8px ${j}`, zIndex: 1 }, children: y.label }),
                  y.sub && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".10em", zIndex: 1 }, children: y.sub })
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
                    /* @__PURE__ */ o("div", { style: { fontSize: 8, fontWeight: 700, color: j, letterSpacing: ".12em", textTransform: "uppercase" }, children: y.label }),
                    y.sub && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)" }, children: y.sub })
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
                    /* @__PURE__ */ o("div", { style: { fontSize: 8, fontWeight: 700, color: j, letterSpacing: ".12em" }, children: y.label }),
                    y.sub && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)" }, children: y.sub })
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
                    animation: y.pulse ? "j-pulse 1.4s ease-in-out infinite" : "none"
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
                    }, children: y.label }),
                    y.sub && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".07em" }, children: y.sub })
                  ] }),
                  y.value && /* @__PURE__ */ o("div", { style: {
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--j-text-primary)",
                    flexShrink: 0,
                    paddingLeft: 8,
                    borderLeft: `1px solid ${j}`
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
const Ir = we("windows11");
function Gt() {
  return je(Ir);
}
function Ic({ theme: e, children: t }) {
  return /* @__PURE__ */ o(Ir.Provider, { value: e, children: /* @__PURE__ */ o("div", { "data-os-theme": e, "data-testid": "j-os-root", className: "j-os-root", children: t }) });
}
const Pr = we(null);
function Ze() {
  const e = je(Pr);
  if (!e) throw new Error("useWindowManager must be used inside JWindowManager");
  return e;
}
let Pc = 1;
function _c() {
  return `win-${Pc++}`;
}
function ut(e, t, n, r, a, i) {
  const s = Math.min(n, a > 0 ? a : n), c = Math.min(r, i > 0 ? i : r);
  return {
    width: s,
    height: c,
    x: a > 0 ? Math.max(0, Math.min(e, a - s)) : e,
    y: i > 0 ? Math.max(0, Math.min(t, i - c)) : t
  };
}
function Ec(e, t, n) {
  const a = e.filter((i) => !i.minimized).length % 8;
  return {
    x: Math.min(40 + a * 30, Math.floor(t * 0.5) || 40),
    y: Math.min(40 + a * 30, Math.floor(n * 0.5) || 40)
  };
}
function Fc({ compactBreakpoint: e = 900, children: t }) {
  const [n, r] = $([]), a = q([]), [i, s] = $(null), [c, l] = $({ w: 0, h: 0 }), d = q({ w: 0, h: 0 }), h = c.w > 0 && c.w < e, u = E((m) => {
    r((w) => {
      const N = m(w);
      return a.current = N, N;
    });
  }, []), f = E((m, w) => {
    d.current = { w: m, h: w }, l({ w: m, h: w }), u((N) => N.map((C) => ({
      ...C,
      ...ut(C.x, C.y, C.width, C.height, m, w)
    })));
  }, [u]), p = E((m) => {
    const w = a.current.find((C) => C.appId === m.appId);
    if (w)
      return s(w.id), u((C) => C.map(
        (D) => D.id === w.id ? { ...D, minimized: !1, zIndex: Date.now() } : D
      )), w.id;
    const N = _c();
    return u((C) => {
      const { x: D, y: T } = Ec(C, d.current.w, d.current.h), X = m.width ?? 640, H = m.height ?? 420, R = ut(D, T, X, H, d.current.w, d.current.h), Z = {
        id: N,
        appId: m.appId,
        title: m.title,
        icon: m.icon,
        ...R,
        minimized: !1,
        maximized: !1,
        zIndex: Date.now(),
        content: m.content
      };
      return [...C, Z];
    }), s(N), N;
  }, [u]), v = E((m) => {
    u((w) => w.filter((N) => N.id !== m)), s((w) => w === m ? null : w);
  }, [u]), x = E((m) => {
    u((w) => w.map((N) => N.id === m ? { ...N, minimized: !0 } : N)), s((w) => w === m ? null : w);
  }, [u]), k = E((m) => {
    u((w) => w.map((N) => N.id === m ? { ...N, minimized: !1, zIndex: Date.now() } : N)), s(m);
  }, [u]), y = E((m) => {
    u((w) => w.map((N) => N.id === m ? { ...N, maximized: !N.maximized } : N));
  }, [u]), b = E((m) => {
    s(m), u((w) => w.map((N) => N.id === m ? { ...N, zIndex: Date.now() } : N));
  }, [u]), j = E((m, w, N) => {
    u((C) => C.map((D) => {
      if (D.id !== m) return D;
      const T = ut(w, N, D.width, D.height, d.current.w, d.current.h);
      return { ...D, ...T };
    }));
  }, [u]), M = E((m, w, N) => {
    u((C) => C.map((D) => {
      if (D.id !== m) return D;
      const T = ut(D.x, D.y, w, N, d.current.w, d.current.h);
      return { ...D, ...T };
    }));
  }, [u]), S = {
    windows: n,
    focusedId: i,
    compactMode: h,
    desktopSize: c,
    openWindow: p,
    closeWindow: v,
    minimizeWindow: x,
    restoreWindow: k,
    maximizeWindow: y,
    focusWindow: b,
    moveWindow: j,
    resizeWindow: M,
    setDesktopSize: f
  };
  return /* @__PURE__ */ o(Pr.Provider, { value: S, children: t });
}
const Yc = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
function Ac({ id: e }) {
  const { windows: t, focusedId: n, compactMode: r, focusWindow: a, closeWindow: i, minimizeWindow: s, maximizeWindow: c, moveWindow: l, resizeWindow: d } = Ze(), h = Gt(), u = q(null), f = t.find((D) => D.id === e);
  if (!f || f.minimized) return null;
  const p = f, v = n === e, x = h === "windows11", k = p.maximized ? { position: "absolute", inset: 0, zIndex: p.zIndex } : { position: "absolute", left: p.x, top: p.y, width: p.width, height: p.height, zIndex: p.zIndex }, y = [
    "j-os-window",
    v ? "j-os-window--focused" : "",
    p.maximized ? "j-os-window--maximized" : ""
  ].filter(Boolean).join(" "), b = q({ active: !1, startX: 0, startY: 0, startWinX: 0, startWinY: 0 });
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
  const m = q({ active: !1, dir: "", startX: 0, startY: 0, startW: 0, startH: 0, startWinX: 0, startWinY: 0 });
  function w(D, T) {
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
      className: y,
      style: k,
      onPointerDown: () => a(e),
      children: [
        !r && !p.maximized && Yc.map((D) => /* @__PURE__ */ o(
          "div",
          {
            className: `j-os-resize j-os-resize--${D}`,
            onPointerDown: (T) => w(T, D),
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
            children: x ? /* @__PURE__ */ g(B, { children: [
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
function zc({ apps: e, onClose: t }) {
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
function Bc() {
  const [e] = $(() => {
    const t = /* @__PURE__ */ new Date();
    return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
  });
  return e;
}
function Rc({ apps: e }) {
  const { windows: t, focusWindow: n, restoreWindow: r } = Ze(), [a, i] = $(!1), s = Bc();
  function c(l) {
    const d = t.find((h) => h.id === l);
    d && (d.minimized ? r(l) : n(l));
  }
  return /* @__PURE__ */ g(B, { children: [
    a && /* @__PURE__ */ o(zc, { apps: e, onClose: () => i(!1) }),
    /* @__PURE__ */ g("div", { "data-testid": "j-os-taskbar", className: "j-os-taskbar", children: [
      /* @__PURE__ */ o(
        "button",
        {
          "data-testid": "j-os-start-btn",
          className: "j-os-taskbar__start",
          onClick: () => i((l) => !l),
          "aria-label": "Start",
          children: "⊞"
        }
      ),
      /* @__PURE__ */ o("div", { className: "j-os-taskbar__apps", children: t.map((l) => {
        const d = e.find((h) => h.id === l.appId);
        return /* @__PURE__ */ g(
          "button",
          {
            "data-testid": `taskbar-app-${l.appId}`,
            className: `j-os-taskbar__app${l.minimized ? "" : " j-os-taskbar__app--active"}`,
            onClick: () => c(l.id),
            children: [
              (d == null ? void 0 : d.icon) && /* @__PURE__ */ o("span", { children: d.icon }),
              l.title
            ]
          },
          l.id
        );
      }) }),
      /* @__PURE__ */ o("div", { className: "j-os-taskbar__tray", children: /* @__PURE__ */ o("span", { "data-testid": "j-os-clock", children: s }) })
    ] })
  ] });
}
function Hc({ apps: e }) {
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
function Jc({ appName: e, menus: t = [] }) {
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
function Gc({ apps: e, wallpaper: t, initialWindows: n }) {
  const { windows: r, openWindow: a, setDesktopSize: i } = Ze(), s = Gt(), c = q(null), l = s === "windows11";
  U(() => {
    const u = c.current;
    if (!u) return;
    const f = new ResizeObserver(([p]) => {
      const { width: v, height: x } = p.contentRect;
      i(Math.round(v), Math.round(x));
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
    !l && /* @__PURE__ */ o(Jc, { appName: "Desktop" }),
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
    r.filter((u) => !u.minimized).map((u) => /* @__PURE__ */ o(Ac, { id: u.id }, u.id)),
    l ? /* @__PURE__ */ o(Rc, { apps: e }) : /* @__PURE__ */ o(Hc, { apps: e })
  ] });
}
function Xl({
  theme: e,
  apps: t,
  wallpaper: n,
  compactBreakpoint: r = 900,
  initialWindows: a
}) {
  return /* @__PURE__ */ o(Ic, { theme: e, children: /* @__PURE__ */ o(Fc, { compactBreakpoint: r, children: /* @__PURE__ */ o(Gc, { apps: t, wallpaper: n, initialWindows: a }) }) });
}
const _r = we(null);
function Vl() {
  const e = je(_r);
  if (!e) throw new Error("useOSNotify must be used inside JOSNotificationProvider");
  return e;
}
const $t = 4;
function Ul({ children: e }) {
  const t = q(1), [n, r] = $([]), [a, i] = $([]), s = q([]), c = Gt(), l = E((f) => {
    i((p) => {
      const v = f(p);
      return s.current = v, v;
    });
  }, []), d = E((f) => {
    l((p) => p.filter((v) => v.id !== f));
  }, [l]);
  U(() => {
    if (n.length > 0 && a.length < $t) {
      const f = Math.min(n.length, $t - a.length);
      l((p) => [...p, ...n.slice(0, f)]), r((p) => p.slice(f));
    }
  }, [n, a.length, l]), U(() => {
    const f = [];
    for (const p of a) {
      const v = p.duration ?? 4e3;
      v > 0 && f.push(setTimeout(() => d(p.id), v));
    }
    return () => f.forEach(clearTimeout);
  }, [a, d]);
  const h = E((f) => {
    const p = { ...f, id: `notif-${t.current++}` };
    s.current.length < $t ? (s.current = [...s.current, p], i((v) => [...v, p])) : r((v) => [...v, p]);
  }, []), u = /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "j-os-notif-stack",
      "data-os-theme": c,
      className: "j-os-notif-stack",
      children: a.map((f) => /* @__PURE__ */ g("div", { className: "j-os-notif", role: "alert", children: [
        f.icon && /* @__PURE__ */ o("span", { className: "j-os-notif__icon", children: f.icon }),
        /* @__PURE__ */ g("div", { className: "j-os-notif__body", children: [
          /* @__PURE__ */ o("div", { className: "j-os-notif__title", children: f.title }),
          f.body && /* @__PURE__ */ o("div", { className: "j-os-notif__text", children: f.body })
        ] }),
        /* @__PURE__ */ o("button", { className: "j-os-notif__close", title: "Dismiss", onClick: () => d(f.id), children: "✕" })
      ] }, f.id))
    }
  );
  return /* @__PURE__ */ g(_r.Provider, { value: { notify: h }, children: [
    e,
    Rn(u, document.body)
  ] });
}
function Er(e) {
  return e.icon ? e.icon : e.type === "folder" ? "📁" : "📄";
}
function Fr({ node: e, depth: t, expanded: n, selected: r, onExpand: a, onSelect: i }) {
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
          /* @__PURE__ */ o("span", { children: Er(e) }),
          /* @__PURE__ */ o("span", { children: e.name })
        ]
      }
    ),
    s && (e.children ?? []).filter((d) => d.type === "folder").map((d) => /* @__PURE__ */ o(
      Fr,
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
function Yr(e, t) {
  for (const n of e) {
    if (n.id === t) return n;
    if (n.children) {
      const r = Yr(n.children, t);
      if (r) return r;
    }
  }
  return null;
}
function qc(e, t) {
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
function Kl({ tree: e, onOpen: t, onSelect: n, initialPath: r }) {
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
  const v = s ? Yr(e, s) : null, x = ((v == null ? void 0 : v.children) ?? []).filter((b) => b.type === "file"), k = s ? qc(e, s) : [], y = "Home" + (k.length > 0 ? " / " + k.map((b) => b.name).join(" / ") : "");
  return /* @__PURE__ */ g("div", { className: "j-os-fileexplorer", children: [
    /* @__PURE__ */ o("div", { className: "j-os-fileexplorer__breadcrumb", children: /* @__PURE__ */ o("span", { children: y }) }),
    /* @__PURE__ */ g("div", { className: "j-os-fileexplorer__body", children: [
      /* @__PURE__ */ o("div", { className: "j-os-fileexplorer__tree", children: e.map((b) => /* @__PURE__ */ o(
        Fr,
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
      /* @__PURE__ */ o("div", { className: "j-os-fileexplorer__pane", children: x.map((b) => /* @__PURE__ */ g(
        "div",
        {
          className: `j-os-pane-item${l === b.id ? " j-os-pane-item--active" : ""}`,
          onClick: () => f(b),
          onDoubleClick: () => p(b),
          children: [
            /* @__PURE__ */ o("span", { className: "j-os-pane-item__icon", children: Er(b) }),
            /* @__PURE__ */ o("span", { className: "j-os-pane-item__name", children: b.name })
          ]
        },
        b.id
      )) })
    ] })
  ] });
}
function Lc(e) {
  return e >= 80 ? "j-os-tm-bar__fill--danger" : e >= 50 ? "j-os-tm-bar__fill--warn" : "";
}
function zn({ value: e, label: t }) {
  return /* @__PURE__ */ g("div", { className: "j-os-tm-bar", children: [
    /* @__PURE__ */ o("div", { className: "j-os-tm-bar__track", children: /* @__PURE__ */ o("div", { className: `j-os-tm-bar__fill ${Lc(e)}`, style: { width: `${Math.min(100, e)}%` } }) }),
    /* @__PURE__ */ o("span", { className: "j-os-tm-bar__label", children: t })
  ] });
}
function Xc({ status: e }) {
  return /* @__PURE__ */ g("span", { className: `j-os-tm-status j-os-tm-status--${e}`, children: [
    /* @__PURE__ */ o("span", { className: "j-os-tm-status__dot" }),
    e
  ] });
}
function Ql({ processes: e, onKill: t }) {
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
      /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o(zn, { value: d.cpu, label: `${d.cpu}%` }) }),
      /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o(zn, { value: d.memory / 2048 * 100, label: `${d.memory} MB` }) }),
      /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o(Xc, { status: d.status }) }),
      t && /* @__PURE__ */ o("td", { children: /* @__PURE__ */ o("button", { className: "j-os-tm-kill", onClick: () => t(d.pid), children: "Kill" }) })
    ] }, d.pid)) })
  ] }) }) });
}
function Zl({ sections: e, defaultSection: t }) {
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
  Sl as JAccordion,
  Jl as JActivityFeed,
  vl as JAlert,
  Ml as JArcMeter,
  Rl as JArcReactor,
  jr as JBadge,
  Wl as JBarChart,
  _l as JBootScreen,
  al as JButton,
  Pa as JCard,
  cl as JCheckbox,
  Fl as JCommandPalette,
  Zl as JControlPanel,
  Js as JDataRow,
  hl as JDatePicker,
  pl as JDateRangePicker,
  Xl as JDesktop,
  gl as JDivider,
  Hc as JDock,
  Tl as JDonutChart,
  zl as JDragWidget,
  Kl as JFileExplorer,
  fl as JFormField,
  Il as JGaugeChart,
  Hl as JHeatmap,
  Xe as JHudBar,
  ql as JHudCanvas,
  Bl as JHudClock,
  nl as JHudFrame,
  rl as JHudFrameCard,
  yl as JHudLabel,
  ol as JInput,
  Gl as JKPITicker,
  $l as JLineChart,
  Jc as JMenuBar,
  bl as JModal,
  el as JNavItem,
  Ll as JNodeGraph,
  Ul as JOSNotificationProvider,
  Ic as JOSThemeProvider,
  Cl as JOrb,
  tl as JPageLayout,
  Nl as JPagination,
  As as JProgress,
  Pl as JRadarChart,
  Al as JRadialItem,
  Yl as JRadialMenu,
  ll as JRadio,
  sl as JSelect,
  Sa as JSidebar,
  ul as JSlider,
  Ol as JSparkline,
  Ft as JSpinner,
  zc as JStartMenu,
  wl as JStatCard,
  Es as JStatusPill,
  Ks as JTab,
  El as JTable,
  kl as JTabs,
  Ql as JTaskManager,
  Rc as JTaskbar,
  il as JTextArea,
  Zc as JThemePicker,
  Qc as JThemeProvider,
  ml as JTimePicker,
  jl as JToastProvider,
  dl as JToggle,
  Dl as JWaveform,
  Ac as JWindow,
  Fc as JWindowManager,
  L as JarvisTokens,
  Tt as PRESETS,
  $r as RadialMenuContext,
  ga as toCss,
  Vl as useOSNotify,
  Gt as useOSTheme,
  bc as useRadialMenu,
  ba as useTheme,
  xl as useToast,
  Ze as useWindowManager
};
