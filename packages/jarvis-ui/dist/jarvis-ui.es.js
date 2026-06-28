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
function Dc({ compact: e = !1, showCustom: t = !0 }) {
  const { theme: n, setPreset: r, setTheme: a } = ca(), [i, s] = W(!1), [c, l] = W(n.accent), [d, f] = W(n.bg), [u, h] = W(n.bgCard);
  function p(v, k) {
    const y = e ? "20px" : "48px", x = e ? "4px" : "6px";
    return {
      width: y,
      height: e ? "20px" : "32px",
      background: v,
      border: `2px solid ${k ? "var(--j-text-primary)" : "transparent"}`,
      boxShadow: k ? `0 0 12px ${v}` : "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      clipPath: `polygon(${x} 0,100% 0,calc(100% - ${x}) 100%,0 100%)`,
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
    /* @__PURE__ */ o("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" }, children: la.map(({ preset: v, color: k, label: y }) => {
      const x = !i && n.preset === v;
      return /* @__PURE__ */ o(
        "button",
        {
          title: y,
          "aria-pressed": x,
          onClick: () => {
            s(!1), r(v);
          },
          style: p(k, x),
          children: !e && /* @__PURE__ */ o("span", { style: {
            fontSize: "9px",
            fontFamily: "'Courier New', monospace",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: x ? "var(--j-bg)" : k,
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
        ] }),
        /* @__PURE__ */ g("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ o("div", { style: { fontSize: "8px", color: "var(--j-text-dim)", marginBottom: "3px" }, children: "Card" }),
          /* @__PURE__ */ o(
            "input",
            {
              type: "color",
              value: u,
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
  tickActive: f = 12,
  children: u
}) {
  return /* @__PURE__ */ g("div", { className: H.cls(
    e === "top" ? "j-hud-bar-top" : "j-hud-bar-bot",
    H.color(t),
    H.animSpeed(n)
  ), children: [
    r && /* @__PURE__ */ o("span", { className: "j-text-xs", children: r }),
    a && /* @__PURE__ */ o("div", { className: "j-dot-seq", children: da.map((h, p) => /* @__PURE__ */ o(
      "div",
      {
        className: H.cls("j-d", h === "sq" && "sq", h === "tall" && "tall"),
        style: { animationDelay: `${(p * 0.08).toFixed(2)}s` }
      },
      p
    )) }),
    /* @__PURE__ */ o("div", { style: { flex: 1, height: 1, background: "linear-gradient(90deg,var(--j-accent-25),transparent)" } }),
    s && /* @__PURE__ */ g(z, { children: [
      /* @__PURE__ */ o("div", { className: "j-tick-row", children: Array.from({ length: d }, (h, p) => /* @__PURE__ */ o(
        "div",
        {
          className: H.cls("j-tk", p >= f && "off"),
          style: { height: Xt[p % Xt.length] }
        },
        p
      )) }),
      /* @__PURE__ */ o("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", flexShrink: 0 } })
    ] }),
    i && /* @__PURE__ */ g(z, { children: [
      /* @__PURE__ */ o("div", { className: "j-waveform", style: { flex: 1, maxWidth: 260 }, children: ua.map((h, p) => /* @__PURE__ */ o(
        "div",
        {
          className: "j-wv",
          style: { height: h.h, "--j-wv-dur": h.dur, "--j-wv-dly": h.dly }
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
function Oc({ href: e, icon: t, label: n, badge: r, active: a = !1, onClick: i }) {
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
function Cc({
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
  contentPadding: f = "12px",
  sidebar: u,
  sidebarFooter: h,
  topBar: p,
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
        children: p
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
          footer: h,
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
        /* @__PURE__ */ o("div", { className: "j-scroll", style: { padding: f, position: "relative", zIndex: 1 }, children: v })
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
function $c({
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
  children: f,
  topContent: u,
  bottomContent: h
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
    /* @__PURE__ */ o("div", { style: { flex: 1, padding: d }, children: f }),
    r && /* @__PURE__ */ o(He, { position: "bottom", color: e, showDots: !1, showWaveform: s, children: h })
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
function Wc({
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
function Tc({
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
  children: f
}) {
  const u = H.buttonShape(e), h = ba.has(e), p = xa.has(e), b = h ? {
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
        h && /* @__PURE__ */ o("div", { style: { position: "absolute", inset: 0, background: "var(--j-accent-dim)" } }),
        p && /* @__PURE__ */ o("div", { className: "j-btn-bg-fill" }),
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
          a ? /* @__PURE__ */ o("span", { style: { letterSpacing: ".2em" }, children: "···" }) : f,
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
const Sa = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }, Ma = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function Pc({
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
    fontSize: Ma[l] ?? 12,
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
const Na = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function Ic({
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
  const f = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${s ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: s ? "var(--j-err)" : "var(--j-border)",
    color: s ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: Na[d] ?? 12,
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
      style: f,
      ...e !== void 0 ? { value: e, onChange: (h) => n == null ? void 0 : n(h.target.value) } : { defaultValue: t }
    }
  );
}
const Da = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }, Oa = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function Ec({
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
  return /* @__PURE__ */ g("select", { disabled: i, style: l, ...t !== void 0 ? { value: t, onChange: (f) => r == null ? void 0 : r(f.target.value) } : { defaultValue: n }, children: [
    a && /* @__PURE__ */ o("option", { value: "", disabled: !0, hidden: !0, children: a }),
    e.map((f) => /* @__PURE__ */ o("option", { value: f.value, disabled: f.disabled, children: f.label }, f.value))
  ] });
}
function Fc({
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
function Ac({ checked: e, onChange: t, label: n, value: r, name: a, disabled: i = !1 }) {
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
function _c({
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
function Yc({
  value: e,
  defaultValue: t,
  onChange: n,
  min: r = 0,
  max: a = 100,
  step: i = 1,
  disabled: s = !1,
  showValue: c = !0
}) {
  const [l, d] = W(t ?? r), f = e !== void 0 ? e : l, u = a > r ? (f - r) / (a - r) * 100 : 0;
  function h(p) {
    const b = Number(p.target.value);
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
          value: f,
          onChange: h,
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
    }, children: f })
  ] });
}
function Bc({ label: e, error: t, hint: n, required: r, children: a }) {
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
  const f = d - a;
  f && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + f);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const h = s > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, p = Math.round(-(pe(e.timeZone, e) * 60)) % 60;
  (p || h) && Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + p + h);
  const b = pe(e.timeZone, e), v = b > 0 ? Math.floor(b) : Math.ceil(b), y = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - v, x = v !== a, j = y - f, M = v - a, w = n - v * 60 * 1e3, m = M > 0 && tn(e) - n === M * 60 * 1e3 && tn(e, w) !== n;
  if (x && j && !m) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + j);
    const C = pe(e.timeZone, e), P = C > 0 ? Math.floor(C) : Math.ceil(C), F = v - P;
    F && j < 0 && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + F);
  }
  lt(e);
  const N = (t ? n : n + p * 1e3) - +e.internal;
  N && Math.abs(N) < 30 * 60 * 1e3 && (Date.prototype.setTime.call(e, +e + N), lt(e));
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
  var c, l, d, f;
  const n = Ve(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((f = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : f.weekStartsOn) ?? 0, a = Y(e, t == null ? void 0 : t.in), i = a.getDay(), s = (i < r ? 7 : 0) + i - r;
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
  var c, l, d, f;
  const n = Ve(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((f = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : f.weekStartsOn) ?? 0, a = Y(e, t == null ? void 0 : t.in), i = a.getDay(), s = (i < r ? -7 : 0) + 6 - (i - r);
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
    const f = t.slice(s.length);
    return { value: d, rest: f };
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
}, Mo = {
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
}, No = {
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
    parsePatterns: Mo,
    defaultParseWidth: "any"
  })
}, De = {
  code: "en-US",
  formatDistance: Xa,
  formatLong: Za,
  formatRelative: to,
  localize: lo,
  match: No,
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
  var f, u, h, p;
  const n = Y(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = Ve(), i = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (f = t == null ? void 0 : t.locale) == null ? void 0 : f.options) == null ? void 0 : u.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((p = (h = a.locale) == null ? void 0 : h.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = J((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, i), s.setHours(0, 0, 0, 0);
  const c = Oe(s, t), l = J((t == null ? void 0 : t.in) || e, 0);
  l.setFullYear(r, 0, i), l.setHours(0, 0, 0, 0);
  const d = Oe(l, t);
  return +n >= +c ? r + 1 : +n >= +d ? r : r - 1;
}
function Oo(e, t) {
  var c, l, d, f;
  const n = Ve(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((f = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1, a = Vn(e, t), i = J((t == null ? void 0 : t.in) || e, 0);
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
  var f, u, h, p, b, v, k, y;
  const r = Ve(), a = (n == null ? void 0 : n.locale) ?? r.locale ?? De, i = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((u = (f = n == null ? void 0 : n.locale) == null ? void 0 : f.options) == null ? void 0 : u.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((p = (h = r.locale) == null ? void 0 : h.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((v = (b = n == null ? void 0 : n.locale) == null ? void 0 : b.options) == null ? void 0 : v.weekStartsOn) ?? r.weekStartsOn ?? ((y = (k = r.locale) == null ? void 0 : k.options) == null ? void 0 : y.weekStartsOn) ?? 0, c = Y(e, n == null ? void 0 : n.in);
  if (!za(c))
    throw new RangeError("Invalid time value");
  let l = t.match(Yo).map((x) => {
    const j = x[0];
    if (j === "p" || j === "P") {
      const M = $o[j];
      return M(x, a.formatLong);
    }
    return x;
  }).join("").match(_o).map((x) => {
    if (x === "''")
      return { isToken: !1, value: "'" };
    const j = x[0];
    if (j === "'")
      return { isToken: !1, value: Ho(x) };
    if (an[j])
      return { isToken: !0, value: x };
    if (j.match(Ro))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + j + "`"
      );
    return { isToken: !1, value: x };
  });
  a.localize.preprocessor && (l = a.localize.preprocessor(c, l));
  const d = {
    firstWeekContainsDate: i,
    weekStartsOn: s,
    locale: a
  };
  return l.map((x) => {
    if (!x.isToken) return x.value;
    const j = x.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && Eo(j) || !(n != null && n.useAdditionalDayOfYearTokens) && Io(j)) && Fo(j, t, String(e));
    const M = an[j[0]];
    return M(c, j, a.localize, d);
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
    O.createElement(i.Select, { className: c, ...r }, t == null ? void 0 : t.map(({ value: d, label: f, disabled: u }) => O.createElement(i.Option, { key: d, value: d, disabled: u }, f))),
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
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: a, ...i } = e, { components: s, classNames: c, styles: l, labels: { labelPrevious: d, labelNext: f } } = ut(), u = q((p) => {
    a && (n == null || n(p));
  }, [a, n]), h = q((p) => {
    r && (t == null || t(p));
  }, [r, t]);
  return O.createElement(
    "nav",
    { ...i },
    O.createElement(
      s.PreviousMonthButton,
      { type: "button", className: c[D.PreviousMonthButton], style: l == null ? void 0 : l[D.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": d(r), onClick: h },
      O.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: c[D.Chevron], style: l == null ? void 0 : l[D.Chevron], orientation: "left" })
    ),
    O.createElement(
      s.NextMonthButton,
      { type: "button", className: c[D.NextMonthButton], style: l == null ? void 0 : l[D.NextMonthButton], tabIndex: a ? void 0 : -1, "aria-disabled": a ? void 0 : !0, "aria-label": f(a), onClick: u },
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
function Mi(e) {
  const { week: t, ...n } = e;
  return O.createElement("th", { ...n });
}
function Ni(e) {
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
  WeekNumber: Mi,
  WeekNumberHeader: Ni,
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
      const l = i(c.before, e), d = i(c.after, e), f = l > 0, u = d < 0;
      return s(c.before, c.after) ? u && f : f || u;
    }
    return Yt(c) ? i(e, c.after) > 0 : Bt(c) ? i(c.before, e) > 0 : typeof c == "function" ? c(e) : !1;
  });
}
function $i(e, t, n, r, a) {
  const { disabled: i, hidden: s, modifiers: c, showOutsideDays: l, broadcastCalendar: d, today: f = a.today() } = t, { isSameDay: u, isSameMonth: h, startOfMonth: p, isBefore: b, endOfMonth: v, isAfter: k } = a, y = n && p(n), x = r && v(r), j = {
    [B.focused]: [],
    [B.outside]: [],
    [B.disabled]: [],
    [B.hidden]: [],
    [B.today]: []
  }, M = {};
  for (const w of e) {
    const { date: m, displayMonth: S } = w, N = !!(S && !h(m, S)), C = !!(y && b(m, y)), P = !!(x && k(m, x)), F = !!(i && ge(m, i, a)), X = !!(s && ge(m, s, a)) || C || P || // Broadcast calendar will show outside days as default
    !d && !l && N || d && l === !1 && N, G = u(m, f);
    N && j.outside.push(w), F && j.disabled.push(w), X && j.hidden.push(w), G && j.today.push(w), c && Object.keys(c).forEach((L) => {
      const ye = c == null ? void 0 : c[L];
      ye && ge(m, ye, a) && (M[L] ? M[L].push(w) : M[L] = [w]);
    });
  }
  return (w) => {
    const m = {
      [B.focused]: !1,
      [B.disabled]: !1,
      [B.hidden]: !1,
      [B.outside]: !1,
      [B.today]: !1
    }, S = {};
    for (const N in j) {
      const C = j[N];
      m[N] = C.some((P) => P === w);
    }
    for (const N in M)
      S[N] = M[N].some((C) => C === w);
    return {
      ...m,
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
  }).map((h) => {
    const p = r.formatMonthDropdown(h, a), b = d(h), v = t && h < i(t) || n && h > i(n) || !1;
    return { value: b, label: p, disabled: v };
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
  const { startOfYear: i, endOfYear: s, eachYearOfInterval: c, getYear: l } = r, d = i(e), f = s(t), u = c({ start: d, end: f });
  return a && u.reverse(), u.map((h) => {
    const p = n.formatYearDropdown(h, r);
    return {
      value: l(h),
      label: p,
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
    newDate: (l, d, f) => new V(l, d, f, 12, 0, 0, e),
    startOfDay: (l) => i(l),
    startOfWeek: (l, d) => {
      const f = i(l), u = (d == null ? void 0 : d.weekStartsOn) ?? a, h = (f.getDay() - u + 7) % 7;
      return f.setDate(f.getDate() - h), f;
    },
    startOfISOWeek: (l) => {
      const d = i(l), f = (d.getDay() - 1 + 7) % 7;
      return d.setDate(d.getDate() - f), d;
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
      const f = i(l), p = ((((d == null ? void 0 : d.weekStartsOn) ?? a) + 6) % 7 - f.getDay() + 7) % 7;
      return f.setDate(f.getDate() + p), f;
    },
    endOfISOWeek: (l) => {
      const d = i(l), f = (7 - d.getDay()) % 7;
      return d.setDate(d.getDate() + f), d;
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
      const d = i(l.start), f = i(l.end), u = [], h = new V(d.getFullYear(), d.getMonth(), 1, 12, 0, 0, e), p = f.getFullYear() * 12 + f.getMonth();
      for (; h.getFullYear() * 12 + h.getMonth() <= p; )
        u.push(new V(h, e)), h.setMonth(h.getMonth() + 1, 1);
      return u;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (l, d) => {
      const f = i(l);
      return f.setDate(f.getDate() + d), f;
    },
    addWeeks: (l, d) => {
      const f = i(l);
      return f.setDate(f.getDate() + d * 7), f;
    },
    addMonths: (l, d) => {
      const f = i(l);
      return f.setMonth(f.getMonth() + d), f;
    },
    addYears: (l, d) => {
      const f = i(l);
      return f.setFullYear(f.getFullYear() + d), f;
    },
    eachYearOfInterval: (l) => {
      const d = i(l.start), f = i(l.end), u = [], h = new V(d.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; h.getFullYear() <= f.getFullYear(); )
        u.push(new V(h, e)), h.setFullYear(h.getFullYear() + 1, 0, 1);
      return u;
    },
    getWeek: (l, d) => {
      var u;
      const f = s(l);
      return At(f, {
        weekStartsOn: (d == null ? void 0 : d.weekStartsOn) ?? a,
        firstWeekContainsDate: (d == null ? void 0 : d.firstWeekContainsDate) ?? ((u = r == null ? void 0 : r.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (l) => {
      const d = s(l);
      return Ft(d);
    },
    differenceInCalendarDays: (l, d) => {
      const f = s(l), u = s(d);
      return Et(f, u);
    },
    differenceInCalendarMonths: (l, d) => {
      const f = s(l), u = s(d);
      return Jn(f, u);
    }
  };
}
const Xe = (e) => e instanceof HTMLElement ? e : null, kt = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Qi = (e) => Xe(e.querySelector("[data-animated-month]")), St = (e) => Xe(e.querySelector("[data-animated-caption]")), Mt = (e) => Xe(e.querySelector("[data-animated-weeks]")), Zi = (e) => Xe(e.querySelector("[data-animated-nav]")), es = (e) => Xe(e.querySelector("[data-animated-weekdays]"));
function ts(e, t, { classNames: n, months: r, focused: a, dateLib: i }) {
  const s = U(null), c = U(r), l = U(!1);
  ea(() => {
    const d = c.current;
    if (c.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const f = i.isSameMonth(r[0].date, d[0].date), u = i.isAfter(r[0].date, d[0].date), h = u ? n[Q.caption_after_enter] : n[Q.caption_before_enter], p = u ? n[Q.weeks_after_enter] : n[Q.weeks_before_enter], b = s.current, v = e.current.cloneNode(!0);
    if (v instanceof HTMLElement ? (kt(v).forEach((j) => {
      if (!(j instanceof HTMLElement))
        return;
      const M = Qi(j);
      M && j.contains(M) && j.removeChild(M);
      const w = St(j);
      w && w.classList.remove(h);
      const m = Mt(j);
      m && m.classList.remove(p);
    }), s.current = v) : s.current = null, l.current || f || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    a)
      return;
    const k = b instanceof HTMLElement ? kt(b) : [], y = kt(e.current);
    if (y != null && y.every((x) => x instanceof HTMLElement) && (k != null && k.every((x) => x instanceof HTMLElement))) {
      l.current = !0, e.current.style.isolation = "isolate";
      const x = Zi(e.current);
      x && (x.style.zIndex = "1"), y.forEach((j, M) => {
        const w = k[M];
        if (!w)
          return;
        j.style.position = "relative", j.style.overflow = "hidden";
        const m = St(j);
        m && m.classList.add(h);
        const S = Mt(j);
        S && S.classList.add(p);
        const N = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), x && (x.style.zIndex = ""), m && m.classList.remove(h), S && S.classList.remove(p), j.style.position = "", j.style.overflow = "", j.contains(w) && j.removeChild(w);
        };
        w.style.pointerEvents = "none", w.style.position = "absolute", w.style.overflow = "hidden", w.setAttribute("aria-hidden", "true");
        const C = es(w);
        C && (C.style.opacity = "0");
        const P = St(w);
        P && (P.classList.add(u ? n[Q.caption_before_exit] : n[Q.caption_after_exit]), P.addEventListener("animationend", N));
        const F = Mt(w);
        F && F.classList.add(u ? n[Q.weeks_before_exit] : n[Q.weeks_after_exit]), j.insertBefore(w, j.firstChild);
      });
    }
  });
}
function ns(e, t, n, r) {
  const a = e[0], i = e[e.length - 1], { ISOWeek: s, fixedWeeks: c, broadcastCalendar: l } = n ?? {}, { addDays: d, differenceInCalendarDays: f, differenceInCalendarMonths: u, endOfBroadcastWeek: h, endOfISOWeek: p, endOfMonth: b, endOfWeek: v, isAfter: k, startOfBroadcastWeek: y, startOfISOWeek: x, startOfWeek: j } = r, M = l ? y(a, r) : s ? x(a) : j(a), w = l ? h(i) : s ? p(b(i)) : v(b(i)), m = t && (l ? h(t) : s ? p(t) : v(t)), S = m && k(w, m) ? m : w, N = f(S, M), C = u(i, a) + 1, P = [];
  for (let G = 0; G <= N; G++) {
    const L = d(M, G);
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
  const { differenceInCalendarMonths: d, addMonths: f, startOfMonth: u } = r;
  if (n && d(n, l) < c - 1) {
    const h = -1 * (c - 1);
    l = f(n, h);
  }
  return t && d(l, t) < 0 && (l = t), u(l);
}
function os(e, t, n, r) {
  const { addDays: a, endOfBroadcastWeek: i, endOfISOWeek: s, endOfMonth: c, endOfWeek: l, getISOWeek: d, getWeek: f, startOfBroadcastWeek: u, startOfISOWeek: h, startOfWeek: p } = r, b = e.reduce((v, k) => {
    const y = n.broadcastCalendar ? u(k, r) : n.ISOWeek ? h(k) : p(k), x = n.broadcastCalendar ? i(k) : n.ISOWeek ? s(c(k)) : l(c(k)), j = t.filter((S) => S >= y && S <= x), M = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && j.length < M) {
      const S = t.filter((N) => {
        const C = M - j.length;
        return N > x && N <= a(x, C);
      });
      j.push(...S);
    }
    const w = j.reduce((S, N) => {
      const C = n.ISOWeek ? d(N) : f(N), P = S.find((X) => X.weekNumber === C), F = new Qn(N, k, r);
      return P ? P.days.push(F) : S.push(new ri(C, [F])), S;
    }, []), m = new ni(k, w);
    return v.push(m), v;
  }, []);
  return n.reverseMonths ? b.reverse() : b;
}
function is(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: a, startOfDay: i, startOfMonth: s, endOfMonth: c, addYears: l, endOfYear: d, today: f } = t, u = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : !n && u && (n = a(l(e.today ?? f(), -100))), r ? r = c(r) : !r && u && (r = d(e.today ?? f())), [
    n && i(n),
    r && i(r)
  ];
}
function ss(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: i = 1 } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: l } = r, d = a ? i : 1, f = s(e);
  if (!t)
    return c(f, d);
  if (!(l(t, e) < i))
    return c(f, d);
}
function cs(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: i } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: l } = r, d = a ? i ?? 1 : 1, f = s(e);
  if (!t)
    return c(f, -d);
  if (!(l(f, t) <= 0))
    return c(f, -d);
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
  var M;
  const [n, r] = is(e, t), { startOfMonth: a, endOfMonth: i } = t, s = dn(e, n, r, t), [c, l] = ht(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  K(() => {
    const w = dn(e, n, r, t);
    l(w);
  }, [e.timeZone]);
  const { months: d, weeks: f, days: u, previousMonth: h, nextMonth: p } = Re(() => {
    const w = as(c, r, { numberOfMonths: e.numberOfMonths }, t), m = ns(w, e.endMonth ? i(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), S = os(w, m, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), N = ls(S), C = rs(S), P = cs(c, n, e, t), F = ss(c, r, e, t);
    return {
      months: S,
      weeks: N,
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
    (M = e.endMonth) == null ? void 0 : M.getTime(),
    e.fixedWeeks,
    e.ISOWeek,
    e.numberOfMonths,
    e.pagedNavigation,
    e.reverseMonths
  ]), { disableNavigation: b, onMonthChange: v } = e, k = (w) => f.some((m) => m.days.some((S) => S.isEqualTo(w))), y = (w) => {
    if (b)
      return;
    let m = a(w);
    n && m < a(n) && (m = a(n)), r && m > a(r) && (m = a(r)), l(m), v == null || v(m);
  };
  return {
    months: d,
    weeks: f,
    days: u,
    navStart: n,
    navEnd: r,
    previousMonth: h,
    nextMonth: p,
    goToMonth: y,
    goToDay: (w) => {
      k(w) || y(w.date);
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
  const { ISOWeek: c, broadcastCalendar: l } = i, { addDays: d, addMonths: f, addWeeks: u, addYears: h, endOfBroadcastWeek: p, endOfISOWeek: b, endOfWeek: v, max: k, min: y, startOfBroadcastWeek: x, startOfISOWeek: j, startOfWeek: M } = s;
  let m = {
    day: d,
    week: u,
    month: f,
    year: h,
    startOfWeek: (S) => l ? x(S, s) : c ? j(S) : M(S),
    endOfWeek: (S) => l ? p(S) : c ? b(S) : v(S)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? m = k([r, m]) : t === "after" && a && (m = y([a, m])), m;
}
function hr(e, t, n, r, a, i, s, c = 0) {
  if (c > 365)
    return;
  const l = fs(e, t, n.date, r, a, i, s), d = !!(i.disabled && ge(l, i.disabled, s)), f = !!(i.hidden && ge(l, i.hidden, s)), u = l, h = new Qn(l, u, s);
  return !d && !f ? h : hr(e, t, h, r, a, i, s, c + 1);
}
function hs(e, t, n, r, a) {
  const { autoFocus: i } = e, [s, c] = W(), l = us(t.days, n, r || (() => !1), s), [d, f] = W(i ? l : void 0);
  return {
    isFocusTarget: (v) => !!(l != null && l.isEqualTo(v)),
    setFocused: f,
    focused: d,
    blur: () => {
      c(d), f(void 0);
    },
    moveFocus: (v, k) => {
      if (!d)
        return;
      const y = hr(v, k, d, t.navStart, t.navEnd, e, a);
      y && (e.disableNavigation && !t.days.some((j) => j.isEqualTo(y)) || (t.goToDay(y), f(y)));
    }
  };
}
function ps(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [i, s] = ht(n, a ? n : void 0), c = a ? n : i, { isSameDay: l } = t, d = (p) => (c == null ? void 0 : c.some((b) => l(b, p))) ?? !1, { min: f, max: u } = e;
  return {
    selected: c,
    select: (p, b, v) => {
      let k = [...c ?? []];
      if (d(p)) {
        if ((c == null ? void 0 : c.length) === f || r && (c == null ? void 0 : c.length) === 1)
          return;
        k = c == null ? void 0 : c.filter((y) => !l(y, p));
      } else
        (c == null ? void 0 : c.length) === u ? k = [p] : k = [...k, p];
      return a || s(k), a == null || a(k, p, b, v), k;
    },
    isSelected: d
  };
}
function ms(e, t, n = 0, r = 0, a = !1, i = de) {
  const { from: s, to: c } = t || {}, { isSameDay: l, isAfter: d, isBefore: f } = i;
  let u;
  if (!s && !c)
    u = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !c)
    l(s, e) ? n === 0 ? u = { from: s, to: e } : a ? u = { from: s, to: void 0 } : u = void 0 : f(e, s) ? u = { from: e, to: s } : u = { from: s, to: e };
  else if (s && c)
    if (l(s, e) && l(c, e))
      a ? u = { from: s, to: c } : u = void 0;
    else if (l(s, e))
      u = { from: s, to: n > 0 ? void 0 : e };
    else if (l(c, e))
      u = { from: e, to: n > 0 ? void 0 : e };
    else if (f(e, s))
      u = { from: e, to: c };
    else if (d(e, s))
      u = { from: s, to: e };
    else if (d(e, c))
      u = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (u != null && u.from && (u != null && u.to)) {
    const h = i.differenceInCalendarDays(u.to, u.from);
    r > 0 && h > r ? u = { from: e, to: void 0 } : n > 1 && h < n && (u = { from: e, to: void 0 });
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
      if (s.some((f) => f(c)))
        return !0;
      c = n.addDays(c, 1);
    }
  }
  return !1;
}
function vs(e, t) {
  const { disabled: n, excludeDisabled: r, resetOnSelect: a, selected: i, required: s, onSelect: c } = e, [l, d] = ht(i, c ? i : void 0), f = c ? i : l;
  return {
    selected: f,
    select: (p, b, v) => {
      const { min: k, max: y } = e;
      let x;
      if (p) {
        const j = f == null ? void 0 : f.from, M = f == null ? void 0 : f.to, w = !!j && !!M, m = !!j && !!M && t.isSameDay(j, M) && t.isSameDay(p, j);
        a && (w || !(f != null && f.from)) ? !s && m ? x = void 0 : x = { from: p, to: void 0 } : x = ms(p, f, k, y, s, t);
      }
      return r && n && (x != null && x.from) && x.to && ys({ from: x.from, to: x.to }, n, t) && (x.from = p, x.to = void 0), c || d(x), c == null || c(x, p, b, v), x;
    },
    isSelected: (p) => f && me(f, p, !1, t)
  };
}
function bs(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [i, s] = ht(n, a ? n : void 0), c = a ? n : i, { isSameDay: l } = t;
  return {
    selected: c,
    select: (u, h, p) => {
      let b = u;
      return !r && c && c && l(u, c) && (b = void 0), a || s(b), a == null || a(b, u, h, p), b;
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
function Me(e, t, n) {
  return ee(e, t);
}
function hn(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? Me(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? Me(r, t) : r) : ft(e) ? {
    ...e,
    from: e.from ? ee(e.from, t) : e.from,
    to: e.to ? ee(e.to, t) : e.to
  } : _t(e) ? {
    before: Me(e.before, t),
    after: Me(e.after, t)
  } : Yt(e) ? {
    after: Me(e.after, t)
  } : Bt(e) ? {
    before: Me(e.before, t)
  } : e;
}
function Nt(e, t, n) {
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
  }), t.disabled !== void 0 && (t.disabled = Nt(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Nt(t.hidden, n)), t.modifiers)) {
    const $ = {};
    Object.keys(t.modifiers).forEach((I) => {
      var T;
      $[I] = Nt((T = t.modifiers) == null ? void 0 : T[I], n);
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
  const { captionLayout: d, mode: f, navLayout: u, numberOfMonths: h = 1, onDayBlur: p, onDayClick: b, onDayFocus: v, onDayKeyDown: k, onDayMouseEnter: y, onDayMouseLeave: x, onNextClick: j, onPrevClick: M, showWeekNumber: w, styles: m } = t, { formatCaption: S, formatDay: N, formatMonthDropdown: C, formatWeekNumber: P, formatWeekNumberHeader: F, formatWeekdayName: X, formatYearDropdown: G } = a, L = ds(t, s), { days: ye, months: be, navStart: pt, navEnd: mt, previousMonth: te, nextMonth: ne, goToMonth: ue } = L, gt = $i(ye, t, pt, mt, s), { isSelected: $e, select: We, selected: Ue } = xs(t, s) ?? {}, { blur: Rt, focused: Ke, isFocusTarget: Dr, moveFocus: Ht, setFocused: Qe } = hs(t, L, gt, $e ?? (() => !1), s), { labelDayButton: Or, labelGridcell: Cr, labelGrid: $r, labelMonthDropdown: Wr, labelNav: Jt, labelPrevious: Tr, labelNext: Pr, labelWeekday: Ir, labelWeekNumber: Er, labelWeekNumberHeader: Fr, labelYearDropdown: Ar } = i, _r = Re(() => Xi(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), Gt = f !== void 0 || b !== void 0, yt = q(() => {
    te && (ue(te), M == null || M(te));
  }, [te, ue, M]), vt = q(() => {
    ne && (ue(ne), j == null || j(ne));
  }, [ue, ne, j]), Yr = q(($, I) => (T) => {
    T.preventDefault(), T.stopPropagation(), Qe($), !I.disabled && (We == null || We($.date, I, T), b == null || b($.date, I, T));
  }, [We, b, Qe]), Br = q(($, I) => (T) => {
    Qe($), v == null || v($.date, I, T);
  }, [v, Qe]), zr = q(($, I) => (T) => {
    Rt(), p == null || p($.date, I, T);
  }, [Rt, p]), Rr = q(($, I) => (T) => {
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
    k == null || k($.date, I, T);
  }, [Ht, k, t.dir]), Hr = q(($, I) => (T) => {
    y == null || y($.date, I, T);
  }, [y]), Jr = q(($, I) => (T) => {
    x == null || x($.date, I, T);
  }, [x]), Gr = q(($, I) => (T) => {
    const R = Number(T.target.value), A = s.setMonth(s.startOfMonth($), R);
    ue(s.addMonths(A, -I));
  }, [s, ue]), qr = q(($, I) => (T) => {
    const R = Number(T.target.value), A = s.setYear(s.startOfMonth($), R);
    ue(s.addMonths(A, -I));
  }, [s, ue]), { className: Lr, style: Vr } = Re(() => ({
    className: [l[D.Root], t.className].filter(Boolean).join(" "),
    style: { ...m == null ? void 0 : m[D.Root], ...t.style }
  }), [l, t.className, t.style, m]), Xr = Pi(t), qt = ($) => {
    const I = m == null ? void 0 : m[D.Dropdown], T = m == null ? void 0 : m[$];
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
    styles: m,
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
        { className: l[D.Months], style: m == null ? void 0 : m[D.Months] },
        !t.hideNavigation && !u && O.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[D.Nav], style: m == null ? void 0 : m[D.Nav], "aria-label": Jt(), onPreviousClick: yt, onNextClick: vt, previousMonth: te, nextMonth: ne }),
        be.map(($, I) => {
          const T = t.reverseMonths ? be.length - 1 - I : I;
          return O.createElement(
            r.Month,
            {
              "data-animated-month": t.animate ? "true" : void 0,
              className: l[D.Month],
              style: m == null ? void 0 : m[D.Month],
              // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
              key: I,
              displayIndex: I,
              calendarMonth: $
            },
            u === "around" && !t.hideNavigation && I === 0 && O.createElement(
              r.PreviousMonthButton,
              { type: "button", className: l[D.PreviousMonthButton], style: m == null ? void 0 : m[D.PreviousMonthButton], tabIndex: te ? void 0 : -1, "aria-disabled": te ? void 0 : !0, "aria-label": Tr(te), onClick: yt, "data-animated-button": t.animate ? "true" : void 0 },
              O.createElement(r.Chevron, { disabled: te ? void 0 : !0, className: l[D.Chevron], style: m == null ? void 0 : m[D.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
            ),
            O.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: l[D.MonthCaption], style: m == null ? void 0 : m[D.MonthCaption], calendarMonth: $, displayIndex: I }, d != null && d.startsWith("dropdown") ? O.createElement(
              r.DropdownNav,
              { className: l[D.Dropdowns], style: m == null ? void 0 : m[D.Dropdowns] },
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
            ) : O.createElement(r.CaptionLabel, { className: l[D.CaptionLabel], style: m == null ? void 0 : m[D.CaptionLabel], role: "status", "aria-live": "polite" }, S($.date, s.options, s))),
            u === "around" && !t.hideNavigation && I === h - 1 && O.createElement(
              r.NextMonthButton,
              { type: "button", className: l[D.NextMonthButton], style: m == null ? void 0 : m[D.NextMonthButton], tabIndex: ne ? void 0 : -1, "aria-disabled": ne ? void 0 : !0, "aria-label": Pr(ne), onClick: vt, "data-animated-button": t.animate ? "true" : void 0 },
              O.createElement(r.Chevron, { disabled: ne ? void 0 : !0, className: l[D.Chevron], style: m == null ? void 0 : m[D.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
            ),
            I === h - 1 && u === "after" && !t.hideNavigation && O.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[D.Nav], style: m == null ? void 0 : m[D.Nav], "aria-label": Jt(), onPreviousClick: yt, onNextClick: vt, previousMonth: te, nextMonth: ne }),
            O.createElement(
              r.MonthGrid,
              { role: "grid", "aria-multiselectable": f === "multiple" || f === "range", "aria-label": $r($.date, s.options, s) || void 0, className: l[D.MonthGrid], style: m == null ? void 0 : m[D.MonthGrid] },
              !t.hideWeekdays && O.createElement(
                r.Weekdays,
                { "data-animated-weekdays": t.animate ? "true" : void 0, className: l[D.Weekdays], style: m == null ? void 0 : m[D.Weekdays] },
                w && O.createElement(r.WeekNumberHeader, { "aria-label": Fr(s.options), className: l[D.WeekNumberHeader], style: m == null ? void 0 : m[D.WeekNumberHeader], scope: "col" }, F()),
                _r.map((R) => O.createElement(r.Weekday, { "aria-label": Ir(R, s.options, s), className: l[D.Weekday], key: String(R), style: m == null ? void 0 : m[D.Weekday], scope: "col" }, X(R, s.options, s)))
              ),
              O.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: l[D.Weeks], style: m == null ? void 0 : m[D.Weeks] }, $.weeks.map((R) => O.createElement(
                r.Week,
                { className: l[D.Week], key: R.weekNumber, style: m == null ? void 0 : m[D.Week], week: R },
                w && O.createElement(r.WeekNumber, { week: R, style: m == null ? void 0 : m[D.WeekNumber], "aria-label": Er(R.weekNumber, {
                  locale: c
                }), className: l[D.WeekNumber], scope: "row", role: "rowheader" }, P(R.weekNumber, s)),
                R.days.map((A) => {
                  const { date: oe } = A, E = gt(A);
                  if (E[B.focused] = !E.hidden && !!(Ke != null && Ke.isEqualTo(A)), E[ae.selected] = ($e == null ? void 0 : $e(oe)) || E.selected, ft(Ue)) {
                    const { from: bt, to: xt } = Ue;
                    E[ae.range_start] = !!(bt && xt && s.isSameDay(oe, bt)), E[ae.range_end] = !!(bt && xt && s.isSameDay(oe, xt)), E[ae.range_middle] = me(Ue, oe, !0, s);
                  }
                  const Kr = Vi(E, m, t.modifiersStyles), Qr = Wi(E, l, t.modifiersClassNames), Zr = !Gt && !E.hidden ? Cr(oe, E, s.options, s) : void 0;
                  return O.createElement(r.Day, { key: `${A.isoDate}_${A.displayMonthId}`, day: A, modifiers: E, className: Qr.join(" "), style: Kr, role: "gridcell", "aria-selected": E.selected || void 0, "aria-label": Zr, "data-day": A.isoDate, "data-month": A.outside ? A.dateMonthId : void 0, "data-selected": E.selected || void 0, "data-disabled": E.disabled || void 0, "data-hidden": E.hidden || void 0, "data-outside": A.outside || void 0, "data-focused": E.focused || void 0, "data-today": E.today || void 0 }, !E.hidden && Gt ? O.createElement(r.DayButton, { className: l[D.DayButton], style: m == null ? void 0 : m[D.DayButton], type: "button", day: A, modifiers: E, disabled: !E.focused && E.disabled || void 0, "aria-disabled": E.focused && E.disabled || void 0, tabIndex: Dr(A) ? 0 : -1, "aria-label": Or(oe, E, s.options, s), onClick: Yr(A, E), onBlur: zr(A, E), onFocus: Br(A, E), onKeyDown: Rr(A, E), onMouseEnter: Hr(A, E), onMouseLeave: Jr(A, E) }, N(oe, s.options, s)) : !E.hidden && N(A.date, s.options, s));
                })
              )))
            )
          );
        })
      ),
      t.footer && O.createElement(r.Footer, { className: l[D.Footer], style: m == null ? void 0 : m[D.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function js(e) {
  return e ? e.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}
function zc({
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
    function h(p) {
      l.current && !l.current.contains(p.target) && c(!1);
    }
    return document.addEventListener("mousedown", h), () => document.removeEventListener("mousedown", h);
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
  }, f = {
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
          r || c((h) => !h);
        },
        children: [
          /* @__PURE__ */ o("span", { style: { fontSize: 10 }, children: "◈" }),
          /* @__PURE__ */ o("span", { children: js(e) || n })
        ]
      }
    ),
    s && /* @__PURE__ */ o("div", { style: f, children: /* @__PURE__ */ o(
      pr,
      {
        mode: "single",
        selected: e,
        onSelect: (h) => {
          t == null || t(h), c(!1);
        },
        disabled: u.length > 0 ? u : void 0
      }
    ) })
  ] });
}
function pn(e) {
  return e ? e.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}
function Rc({
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
  function f(b) {
    const v = b ?? {};
    e === void 0 && i(v), t == null || t(v);
  }
  const u = d.from ? `${pn(d.from)} — ${d.to ? pn(d.to) : "..."}` : n, h = {
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
        style: h,
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
        onSelect: f
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
function Hc({
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
  function d(h) {
    const p = mn(parseInt(h || "0", 10), 0, l), b = gn(p);
    i(b), t == null || t(`${b}:${s || "00"}`);
  }
  function f(h) {
    const p = mn(parseInt(h || "0", 10), 0, 59), b = gn(p);
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
        onChange: (h) => i(h.target.value),
        onBlur: (h) => d(h.target.value),
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
        onChange: (h) => c(h.target.value),
        onBlur: (h) => f(h.target.value),
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
function Ms({ state: e = "active", blink: t = !1, children: n }) {
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
const xn = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10], Ns = {
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
    const l = Math.round(e / 100 * s), d = Ns[n];
    return /* @__PURE__ */ g("div", { children: [
      c,
      /* @__PURE__ */ o("div", { className: "j-tick-row", children: Array.from({ length: s }, (f, u) => /* @__PURE__ */ o(
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
function Jc({ orientation: e = "horizontal", label: t, showDot: n = !0, height: r = "40px", margin: a = "8px 0", opacity: i = 0.3 }) {
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
function Gc({ variant: e = "chip", text: t, subText: n, value: r, color: a = "cyan", showDot: i = !0, showLine: s = !0 }) {
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
function qc({ state: e = "active", title: t, children: n, dismissible: r = !1, blink: a = !1, onDismiss: i }) {
  const [s, c] = W(!0);
  if (!s) return null;
  const l = wn[e] ?? wn.active, d = kn[e] ?? kn.active, f = Cs[e] ?? "ℹ", u = $s[e];
  function h() {
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
        /* @__PURE__ */ o("span", { style: { fontStyle: "normal", fontSize: 13, flexShrink: 0, color: l, textShadow: `0 0 8px ${l}` }, children: f }),
        /* @__PURE__ */ g("div", { style: { flex: 1, fontSize: 11, color: l, letterSpacing: "0.04em", lineHeight: 1.5 }, children: [
          t && /* @__PURE__ */ o("div", { style: { fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 2 }, children: t }),
          n
        ] }),
        r && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: h,
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
function Lc({ open: e, onClose: t, title: n, subTitle: r, closable: a = !0, closeOnBackdrop: i = !0, width: s = "480px", notchSize: c = "18px", children: l, footer: d }) {
  if (!e) return null;
  const f = {
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
      /* @__PURE__ */ g("div", { style: f, children: [
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
function Vc() {
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
function Xc({ children: e }) {
  const [t, n] = W([]), r = U(0);
  function a(s, c, l, d = 4e3) {
    const f = `toast-${++r.current}`;
    return n((u) => [...u, { id: f, state: s, message: c, title: l, duration: d }]), f;
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
function Uc({
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
  barValue: f,
  dataRows: u,
  children: h
}) {
  const p = H.cls("j-text-val", As[s] ?? null), b = _s[s];
  return /* @__PURE__ */ g(ka, { cardStyle: e, color: t, padding: n, children: [
    /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }, children: [
      /* @__PURE__ */ o("div", { className: "j-text-xs", children: r }),
      c && /* @__PURE__ */ o(mr, { color: l, size: "xs", children: c })
    ] }),
    /* @__PURE__ */ o("div", { className: p, children: a }),
    i && /* @__PURE__ */ g("div", { className: "j-text-sub", style: { display: "flex", alignItems: "center", gap: 4 }, children: [
      d && /* @__PURE__ */ o("span", { className: "j-status-dot", style: b }),
      i
    ] }),
    f !== void 0 && /* @__PURE__ */ o("div", { style: { marginTop: 8 }, children: /* @__PURE__ */ o(Os, { value: f, variant: "bar", showPercent: !1 }) }),
    u && u.length > 0 && /* @__PURE__ */ o("div", { style: { marginTop: 8 }, children: u.map((v) => /* @__PURE__ */ o(Ps, { label: v.label, value: v.value, barPercent: v.barPercent }, v.label)) }),
    h
  ] });
}
const yr = Le(null);
function Ys() {
  return qe(yr);
}
function Kc({ activeTab: e, onTabChange: t, children: n }) {
  var f;
  const r = [];
  ta.forEach(n, (u) => {
    if (na(u) && u.type._isJTab) {
      const h = u.props;
      r.push({ key: h.tabKey, label: h.label, icon: h.icon, badge: h.badge, disabled: h.disabled });
    }
  });
  const [a, i] = W(null), s = ((f = r.find((u) => !u.disabled)) == null ? void 0 : f.key) ?? "", c = e ?? a ?? s;
  function l(u) {
    e === void 0 && i(u), t == null || t(u);
  }
  function d(u, h) {
    var k, y, x, j, M;
    const p = r.filter((w) => !w.disabled), b = p.findIndex((w) => w.key === h);
    let v;
    if (u.key === "ArrowRight") v = (k = p[(b + 1) % p.length]) == null ? void 0 : k.key;
    else if (u.key === "ArrowLeft") v = (y = p[(b - 1 + p.length) % p.length]) == null ? void 0 : y.key;
    else if (u.key === "Home") v = (x = p[0]) == null ? void 0 : x.key;
    else if (u.key === "End") v = (j = p[p.length - 1]) == null ? void 0 : j.key;
    else return;
    u.preventDefault(), v && (l(v), (M = document.getElementById(`tab-${v}`)) == null || M.focus());
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
          const h = u.key === c;
          return /* @__PURE__ */ g(
            "button",
            {
              id: `tab-${u.key}`,
              role: "tab",
              type: "button",
              "aria-selected": h,
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
                color: u.disabled ? "var(--j-text-dim)" : h ? "var(--j-accent)" : "var(--j-text-muted)",
                textShadow: h ? "0 0 8px var(--j-accent-50)" : "none",
                opacity: u.disabled ? 0.4 : 1,
                transition: "color 0.15s"
              },
              children: [
                u.icon && /* @__PURE__ */ o("span", { style: {
                  fontStyle: "normal",
                  fontSize: 13,
                  ...h ? { filter: "drop-shadow(0 0 4px var(--j-accent))" } : {}
                }, children: u.icon }),
                /* @__PURE__ */ o("span", { children: u.label }),
                u.badge && /* @__PURE__ */ o("span", { style: {
                  fontSize: 8,
                  padding: "1px 5px",
                  background: "var(--j-accent-12)",
                  color: "var(--j-accent-mid)",
                  clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)"
                }, children: u.badge }),
                h && /* @__PURE__ */ o("div", { style: {
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
function Qc({
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
  const [d, f] = W(r), u = Fn(), h = a !== void 0 ? a : d, p = zs(s, c);
  function b() {
    const v = !h;
    a === void 0 && f(v), i == null || i(v);
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
        "aria-expanded": h,
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
          background: h ? "var(--j-accent-05)" : "transparent",
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
            color: h ? "var(--j-text-primary)" : "var(--j-text-secondary)",
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
            opacity: h ? 1 : 0.4,
            transform: h ? "rotate(0deg)" : "rotate(45deg)",
            boxShadow: h ? `0 0 8px ${p}` : "none",
            transition: "transform 0.3s, opacity 0.2s",
            flexShrink: 0
          } })
        ]
      }
    ),
    h && /* @__PURE__ */ g(
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
function Zc({
  page: e,
  onPageChange: t,
  totalPages: n,
  showFirstLast: r = !1,
  showInfo: a = !0,
  pageSize: i = 5
}) {
  const s = e <= 1, c = e >= n;
  function l(d) {
    const f = Math.max(1, Math.min(n, d));
    f !== e && t(f);
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
          /* @__PURE__ */ o("div", { style: { display: "flex", alignItems: "flex-end", gap: 3 }, children: Array.from({ length: n }, (d, f) => {
            const u = f + 1, h = u === e;
            return /* @__PURE__ */ o(
              "div",
              {
                role: "button",
                tabIndex: 0,
                "aria-label": `Page ${u}`,
                "aria-current": h ? "page" : void 0,
                onClick: () => l(u),
                onKeyDown: (p) => {
                  (p.key === "Enter" || p.key === " ") && (p.preventDefault(), l(u));
                },
                style: {
                  width: 6,
                  height: h ? 18 : 10,
                  background: h ? "var(--j-accent)" : "var(--j-accent-18)",
                  clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 85%)",
                  boxShadow: h ? "0 0 8px var(--j-accent)" : "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  ...h ? { animation: "j-pulse 2s ease-in-out infinite" } : {}
                }
              },
              u
            );
          }) })
        ) : (
          /* Ellipsis mode */
          /* @__PURE__ */ o(z, { children: Rs(e, n, i).map(
            (d, f) => d === -1 ? /* @__PURE__ */ o(
              "span",
              {
                style: { color: "var(--j-text-dim)", fontSize: 10, padding: "0 4px" },
                children: "···"
              },
              `ellipsis-${f}`
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
const Mn = [6, 10, 14, 14, 10, 6, 8, 12, 16, 16, 12, 8];
function el({
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
  function f(h) {
    const p = h < e, b = h === e - 1 && e > 0, v = Mn[h % Mn.length], k = d ? { width: v, height: 4 } : { width: c, height: v };
    let y, x, j;
    return b ? (y = "linear-gradient(0deg, var(--j-accent-12), var(--j-accent))", x = "0 0 10px var(--j-accent), 0 0 20px var(--j-accent-25)", j = "j-pulse 0.6s ease-in-out infinite") : p ? (y = "var(--j-accent)", x = "0 0 5px var(--j-accent-25)", j = void 0) : (y = "var(--j-accent-05)", x = "none", j = void 0), {
      ...k,
      background: y,
      boxShadow: x,
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
    /* @__PURE__ */ o("div", { style: d ? { display: "flex", flexDirection: "column-reverse", alignItems: "center", gap: l } : { display: "flex", alignItems: "flex-end", gap: l }, children: Array.from({ length: t }, (h, p) => /* @__PURE__ */ o("div", { "data-testid": `arc-seg-${p}`, style: f(p) }, p)) }),
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
const Nn = [6, 14, 22, 18, 28, 20, 30, 24, 28, 22, 16, 20, 26, 18, 12, 22, 28, 18, 10, 14], Dn = [".4s", ".5s", ".6s", ".4s", ".7s", ".5s", ".6s", ".4s", ".8s", ".5s"];
function tl({
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
          height: `${Nn[a % Nn.length]}px`,
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
function nl({
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
          const l = c * Math.PI / 180, d = 48, f = 50 + d * Math.sin(l), u = 50 - d * Math.cos(l);
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
                left: `${f.toFixed(1)}%`,
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
function rl({
  data: e,
  width: t = "80px",
  height: n = "28px",
  showArea: r = !0,
  showTrend: a = !1,
  trend: i = "auto",
  colorVar: s
}) {
  const c = Us(e), l = Ks(e, i), f = `var(${s ?? (l === "up" ? "--j-ok" : l === "down" ? "--j-err" : "--j-accent")})`, u = c.map((k) => `${k.x.toFixed(1)},${k.y.toFixed(1)}`).join(" "), h = l === "up" ? "▲" : l === "down" ? "▼" : "─", p = l === "up" ? "j-text-ok" : l === "down" ? "j-text-err" : "j-text-accent";
  let b = "";
  if (c.length >= 2) {
    b = `M ${c[0].x.toFixed(1)} ${On} L ${c[0].x.toFixed(1)} ${c[0].y.toFixed(1)}`;
    for (let k = 1; k < c.length; k++)
      b += ` L ${c[k].x.toFixed(1)} ${c[k].y.toFixed(1)}`;
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
                  style: { fill: f }
                }
              ),
              c.length >= 2 && /* @__PURE__ */ o(
                "polyline",
                {
                  points: u,
                  className: "j-sparkline-line",
                  style: { stroke: f, fill: "none" }
                }
              ),
              v && /* @__PURE__ */ o(
                "circle",
                {
                  cx: v.x,
                  cy: v.y,
                  r: 2,
                  className: "j-sparkline-dot",
                  style: { fill: f }
                }
              )
            ]
          }
        ),
        a && /* @__PURE__ */ o("span", { className: `j-sparkline-trend ${p}`, children: h })
      ]
    }
  );
}
const Wt = 400, Ye = 220, fe = 36, xr = 8, Be = 12, jr = 22, tt = 6, nt = Wt - fe - xr, rt = Ye - Be - jr;
function at(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(1);
}
function al({
  data: e,
  height: t = "220px",
  colorVar: n = "--j-accent",
  orientation: r = "vertical",
  showGrid: a = !0,
  showAxisLabels: i = !0,
  showValues: s = !1,
  gridLines: c = 4
}) {
  const l = e.length > 0 ? Math.max(...e.map((f) => f.value)) : 1, d = `var(${n}, var(--j-accent))`;
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
          a && Array.from({ length: c + 1 }, (f, u) => {
            const h = Be + u * (rt / c), p = l - u * (l / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ o(
                "line",
                {
                  x1: fe,
                  y1: h,
                  x2: Wt - xr,
                  y2: h,
                  className: "j-chart-grid"
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: fe - 4,
                  y: h + 3,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: at(p)
                }
              )
            ] }, `grid-${u}`);
          }),
          e.map((f, u) => {
            const h = nt / e.length - tt, p = l > 0 ? rt * (f.value / l) : 0, b = fe + u * (nt / e.length) + tt / 2, v = Be + rt - p;
            return /* @__PURE__ */ g("g", { className: "j-chart-bar-group", children: [
              /* @__PURE__ */ o(
                "polygon",
                {
                  points: `${b},${v + 6} ${b + 4},${v} ${b + h - 4},${v} ${b + h},${v + 6}`,
                  style: { fill: d }
                }
              ),
              /* @__PURE__ */ o(
                "rect",
                {
                  x: b,
                  y: v + 5,
                  width: h,
                  height: Math.max(p - 5, 0),
                  className: "j-chart-bar",
                  style: { fill: d },
                  children: /* @__PURE__ */ o("title", { children: `${f.label}: ${f.value}` })
                }
              ),
              /* @__PURE__ */ o(
                "rect",
                {
                  x: b,
                  y: v + 5,
                  width: h,
                  height: Math.max(p - 5, 0),
                  className: "j-chart-bar-glow",
                  style: { fill: d }
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: b + h / 2,
                  y: Ye - 2,
                  className: "j-chart-axis-label",
                  textAnchor: "middle",
                  children: f.label
                }
              ),
              s && p > 10 && /* @__PURE__ */ o(
                "text",
                {
                  x: b + h / 2,
                  y: v - 3,
                  className: "j-chart-value-label",
                  textAnchor: "middle",
                  children: at(f.value)
                }
              )
            ] }, u);
          })
        ] }) : /* @__PURE__ */ g(z, { children: [
          a && Array.from({ length: c + 1 }, (f, u) => {
            const h = fe + u * (nt / c), p = u * (l / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ o(
                "line",
                {
                  x1: h,
                  y1: Be,
                  x2: h,
                  y2: Ye - jr,
                  className: "j-chart-grid"
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: h,
                  y: Ye - 2,
                  className: "j-chart-axis-label",
                  textAnchor: "middle",
                  children: at(p)
                }
              )
            ] }, `grid-${u}`);
          }),
          e.map((f, u) => {
            const h = rt / e.length, p = h - tt, b = l > 0 ? nt * (f.value / l) : 0, v = Be + u * h + tt / 2;
            return /* @__PURE__ */ g("g", { className: "j-chart-bar-group", children: [
              /* @__PURE__ */ o(
                "rect",
                {
                  x: fe,
                  y: v,
                  width: b,
                  height: p,
                  className: "j-chart-bar",
                  style: { fill: d },
                  children: /* @__PURE__ */ o("title", { children: `${f.label}: ${f.value}` })
                }
              ),
              /* @__PURE__ */ o(
                "rect",
                {
                  x: fe,
                  y: v,
                  width: b,
                  height: p,
                  className: "j-chart-bar-glow",
                  style: { fill: d }
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: fe - 4,
                  y: v + p / 2 + 4,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: f.label
                }
              ),
              s && /* @__PURE__ */ o(
                "text",
                {
                  x: fe + b + 4,
                  y: v + p / 2 + 4,
                  className: "j-chart-value-label",
                  textAnchor: "start",
                  children: at(f.value)
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
function ol({
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
  const l = e.map((k) => k.value), d = Math.min(...l), f = Math.max(...l), u = f - d === 0 ? 1 : f - d, h = `var(${n})`, p = e.map((k, y) => ({
    x: st + y * (Zs / Math.max(e.length - 1, 1)),
    y: ze + Ee - Ee * (k.value - d) / u
  })), b = p.map((k) => `${k.x.toFixed(1)},${k.y.toFixed(1)}`).join(" ");
  let v = "";
  if (p.length >= 2) {
    v = `M ${p[0].x.toFixed(1)} ${ze + Ee}`;
    for (const k of p) v += ` L ${k.x.toFixed(1)} ${k.y.toFixed(1)}`;
    v += ` L ${p[p.length - 1].x.toFixed(1)} ${ze + Ee} Z`;
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
          s && Array.from({ length: c + 1 }, (k, y) => {
            const x = ze + y * (Ee / c), j = f - y * (u / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ o(
                "line",
                {
                  x1: st,
                  y1: x,
                  x2: Tt - wr,
                  y2: x,
                  className: "j-chart-grid"
                }
              ),
              i && /* @__PURE__ */ o(
                "text",
                {
                  x: st - 4,
                  y: x + 3,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: ec(j)
                }
              )
            ] }, `grid-${y}`);
          }),
          r && p.length >= 2 && /* @__PURE__ */ o("path", { d: v, className: "j-chart-area", style: { fill: h } }),
          p.length >= 2 && /* @__PURE__ */ o(
            "polyline",
            {
              points: b,
              className: "j-chart-line",
              style: { stroke: h, fill: "none" }
            }
          ),
          a && p.map((k, y) => /* @__PURE__ */ o(
            "circle",
            {
              cx: k.x,
              cy: k.y,
              r: 3,
              className: "j-chart-dot",
              style: { fill: h }
            },
            y
          )),
          i && e.map((k, y) => /* @__PURE__ */ o(
            "text",
            {
              x: p[y].x,
              y: Pt - 2,
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
const Ne = 50, Dt = 50;
function il({
  data: e,
  size: t = "160px",
  thickness: n = 20,
  centerValue: r = "",
  centerLabel: a = "",
  showLegend: i = !0
}) {
  const s = Ne - n / 2 - 2, c = 2 * Math.PI * s, l = e.reduce((u, h) => u + h.value, 0);
  let d = -90;
  const f = e.map((u) => {
    const h = l > 0 ? u.value / l : 0, p = h * c, b = c - p, v = d;
    return d += h * 360, { seg: u, dash: p, gap: b, rotate: v };
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
              cx: Ne,
              cy: Dt,
              r: s,
              fill: "none",
              stroke: "var(--j-accent-10)",
              strokeWidth: n
            }
          ),
          l > 0 && f.map(({ seg: u, dash: h, gap: p, rotate: b }, v) => /* @__PURE__ */ o(
            "circle",
            {
              cx: Ne,
              cy: Dt,
              r: s,
              fill: "none",
              stroke: u.color ?? "var(--j-accent)",
              strokeWidth: n,
              strokeDasharray: `${h.toFixed(2)} ${p.toFixed(2)}`,
              transform: `rotate(${b} ${Ne} ${Dt})`,
              className: "j-chart-donut-seg"
            },
            v
          )),
          r && /* @__PURE__ */ o(
            "text",
            {
              x: Ne,
              y: a ? 46 : 54,
              textAnchor: "middle",
              className: "j-chart-donut-center-val",
              children: r
            }
          ),
          a && /* @__PURE__ */ o(
            "text",
            {
              x: Ne,
              y: 58,
              textAnchor: "middle",
              className: "j-chart-donut-center-lbl",
              children: a
            }
          )
        ]
      }
    ),
    i && /* @__PURE__ */ o("div", { className: "j-chart-donut-legend", children: e.map((u, h) => /* @__PURE__ */ g("div", { className: "j-chart-donut-legend-row", children: [
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
    ] }, h)) })
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
function sl({
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
  showMinMax: f = !0,
  ticks: u = 8
}) {
  const h = Math.max(0, Math.min(1, (e - t) / (n - t || 1))), p = `var(${a})`, b = it * h, v = dt(ot + h * it), k = he + (ce - 2) * Math.cos(v), y = we + (ce - 2) * Math.sin(v), x = ce - i / 2 - 2, j = ce + i / 2 + 4;
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
            stroke: p,
            strokeWidth: i,
            strokeLinecap: "round",
            className: "j-chart-gauge-arc"
          }
        ),
        d && Array.from({ length: u + 1 }, (M, w) => {
          const m = dt(ot + w / u * it);
          return /* @__PURE__ */ o(
            "line",
            {
              x1: he + x * Math.cos(m),
              y1: we + x * Math.sin(m),
              x2: he + j * Math.cos(m),
              y2: we + j * Math.sin(m),
              stroke: p,
              strokeWidth: 1,
              className: "j-chart-gauge-tick"
            },
            w
          );
        }),
        l && /* @__PURE__ */ g(z, { children: [
          /* @__PURE__ */ o(
            "line",
            {
              x1: he,
              y1: we,
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
              cx: he,
              cy: we,
              r: 5,
              fill: p,
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
        f && /* @__PURE__ */ g(z, { children: [
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
function cl({
  axes: e,
  size: t = "200px",
  colorVar: n = "--j-accent",
  rings: r = 4,
  showLabels: a = !0
}) {
  const i = Math.max(e.length, 3), s = `var(${n},var(--j-accent))`, c = Array.from({ length: r }, (h, p) => {
    const b = Fe * (p + 1) / r, v = Array.from({ length: i }, (k, y) => $n(y, i, b)).join(" ");
    return /* @__PURE__ */ o("polygon", { points: v, className: "j-chart-radar-web" }, p);
  }), l = Array.from({ length: i }, (h, p) => {
    const [b, v] = ct(p, i, Fe);
    return /* @__PURE__ */ o(
      "line",
      {
        x1: kr,
        y1: Sr,
        x2: b,
        y2: v,
        className: "j-chart-radar-spoke"
      },
      p
    );
  }), d = e.map((h, p) => {
    const b = Wn(h.value / ((h.max ?? 100) || 1));
    return $n(p, i, Fe * b);
  }).join(" "), f = e.map((h, p) => {
    const b = Wn(h.value / ((h.max ?? 100) || 1)), [v, k] = ct(p, i, Fe * b);
    return /* @__PURE__ */ o(
      "circle",
      {
        cx: v,
        cy: k,
        r: 3,
        className: "j-chart-dot",
        style: { fill: s }
      },
      p
    );
  }), u = a ? e.map((h, p) => {
    const [b, v] = ct(p, i, Fe + 14), k = b < 98 ? "end" : b > 102 ? "start" : "middle";
    return /* @__PURE__ */ o(
      "text",
      {
        x: b,
        y: v + 4,
        className: "j-chart-axis-label",
        textAnchor: k,
        children: h.label
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
        f,
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
function ll({
  systemName: e = "JARVIS",
  version: t = "v4.2.1",
  onComplete: n
}) {
  const [r, a] = W(!0), [i, s] = W(0), [c, l] = W(0), [d, f] = W(0);
  if (K(() => {
    let h = !1;
    async function p() {
      if (!h && (s(0), l(0), await xe(100), !h && (l(95), await xe(700), !h && (s(1), await xe(600), !h)))) {
        s(2);
        for (let b = 1; b <= Tn.length; b++) {
          if (h) return;
          f(b), await xe(180);
        }
        await xe(200), !h && (s(3), await xe(900), !h && (s(4), await xe(800), !h && (a(!1), n == null || n())));
      }
    }
    return p(), () => {
      h = !0;
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
        i >= 2 && /* @__PURE__ */ o("div", { style: { position: "absolute", top: "30%", left: "10%", right: "10%" }, children: Tn.slice(0, d).map((h, p) => /* @__PURE__ */ o(
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
            children: h
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
function dl({
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
        const f = ic(l, n), u = d === i, h = u ? "var(--j-accent-05)" : d % 2 === 0 ? "transparent" : "var(--j-accent-05)", p = ac[f] ?? "transparent";
        return /* @__PURE__ */ o(
          "tr",
          {
            "data-state": f,
            style: { background: h, transition: "background 0.12s", borderLeft: `2px solid ${p === "transparent" && u ? "var(--j-accent-50)" : p}` },
            onMouseEnter: () => s(d),
            onMouseLeave: () => s(-1),
            children: e.map((v) => {
              const k = String(l[v.key] ?? ""), y = rc[f] ?? "var(--j-text-secondary)", x = {
                padding: "8px 14px",
                textAlign: v.align ?? "left",
                borderBottom: "1px solid var(--j-accent-05)",
                color: y
              };
              let j = k;
              return v.key === n ? j = /* @__PURE__ */ o(Ms, { state: f, children: k }) : v.isBadge && (j = /* @__PURE__ */ o(mr, { color: oc[f] ?? "cyan", children: k })), /* @__PURE__ */ o("td", { style: x, children: j }, v.key);
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
function ul({
  visible: e,
  onClose: t,
  commands: n,
  onExecute: r,
  placeholder: a = "Type a command...",
  isListening: i = !1
}) {
  const [s, c] = W(""), [l, d] = W(0), f = U(null);
  K(() => {
    var w;
    e && (c(""), d(0), (w = f.current) == null || w.focus());
  }, [e]);
  const u = Re(() => {
    if (!s.trim()) return n;
    const w = s.toLowerCase();
    return n.filter(
      (m) => {
        var S;
        return m.label.toLowerCase().includes(w) || m.key.toLowerCase().includes(w) || (((S = m.description) == null ? void 0 : S.toLowerCase().includes(w)) ?? !1);
      }
    );
  }, [n, s]);
  function h(w) {
    c(w.target.value), d(0);
  }
  function p(w) {
    w.key === "ArrowDown" ? (w.preventDefault(), d((m) => Math.min(m + 1, u.length - 1))) : w.key === "ArrowUp" ? (w.preventDefault(), d((m) => Math.max(m - 1, 0))) : w.key === "Enter" ? u[l] && b(u[l]) : w.key === "Escape" && v();
  }
  function b(w) {
    r(w), v();
  }
  function v() {
    c(""), d(0), t();
  }
  function k() {
    var w;
    c(""), d(0), (w = f.current) == null || w.focus();
  }
  if (!e) return null;
  const y = [];
  let x;
  u.forEach((w, m) => {
    const S = w.group !== x;
    x = w.group, y.push({ cmd: w, idx: m, showGroup: S });
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
            ref: f,
            value: s,
            onChange: h,
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
      }, children: "NO COMMANDS FOUND" }) : y.map(({ cmd: w, idx: m, showGroup: S }) => {
        const N = m === l, C = sc(w.state ?? "active");
        return /* @__PURE__ */ g("div", { children: [
          S && w.group && /* @__PURE__ */ o("div", { "data-group-header": "", style: {
            padding: "6px 16px 2px",
            fontSize: 8,
            color: "var(--j-text-dim)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            userSelect: "none"
          }, children: w.group }),
          /* @__PURE__ */ g(
            "div",
            {
              "data-cmd": w.key,
              "data-selected": N ? "true" : "false",
              onClick: () => b(w),
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
                w.icon && /* @__PURE__ */ o("span", { style: { fontSize: 14, color: C, filter: `drop-shadow(0 0 4px ${C})`, flexShrink: 0 }, children: w.icon }),
                /* @__PURE__ */ g("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ o("div", { style: { fontSize: 11, color: N ? "var(--j-text-primary)" : "var(--j-text-secondary)", letterSpacing: "0.06em" }, children: w.label }),
                  w.description && /* @__PURE__ */ o("div", { style: { fontSize: 9, color: "var(--j-text-muted)", letterSpacing: "0.08em", marginTop: 1 }, children: w.description })
                ] }),
                N && /* @__PURE__ */ o("span", { style: { fontSize: 9, color: "var(--j-accent-mid)", letterSpacing: "0.10em", opacity: 0.7, flexShrink: 0 }, children: "ENTER" })
              ]
            }
          )
        ] }, w.key);
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
const Mr = Le(null);
function cc() {
  return qe(Mr);
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
function fl({
  open: e,
  onOpenChange: t,
  triggerLabel: n = "MENU",
  radius: r = 90,
  centerSize: a = "64px",
  children: i
}) {
  const [s, c] = W([]), [l, d] = W(e ?? !1), [f, u] = W(null), [h, p] = W(null), b = q((y) => {
    c((x) => x.some((j) => j.key === y.key) ? x : [...x, y]);
  }, []);
  function v() {
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
        /* @__PURE__ */ o(Mr.Provider, { value: b, children: i }),
        s.map((y) => {
          const { x, y: j } = fc(y.angle, r), M = f === y.key, w = lc(y.state), m = dc(y.state), S = uc(y.state), N = l ? `translate(calc(-50% + ${x}px), calc(-50% + ${j}px))` : "translate(-50%, -50%)";
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
                  background: M ? S : "var(--j-bg-card)",
                  border: `1.5px solid ${M ? w : m}`,
                  boxShadow: M ? `0 0 16px ${m}, inset 0 0 12px ${S}` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                }, children: /* @__PURE__ */ o("span", { style: {
                  fontSize: 16,
                  fontStyle: "normal",
                  filter: M ? `drop-shadow(0 0 6px ${w})` : "none"
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
        h && l && /* @__PURE__ */ o(
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
            children: h
          }
        )
      ]
    }
  );
}
function hl({
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
  cyan: "var(--j-cyan)",
  amber: "var(--j-amber)",
  green: "var(--j-green)",
  red: "var(--j-red)",
  blue: "var(--j-blue)",
  white: "var(--j-text-primary)"
};
function pl({
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
  const [f, u] = W({ x: t, y: n }), [h, p] = W(!1), [b, v] = W(!1), k = U(null), y = U(null), x = hc[a] ?? "var(--j-accent)", j = q((m) => {
    m.preventDefault(), k.current = { mx: m.clientX, my: m.clientY, px: f.x, py: f.y }, v(!0), m.target.setPointerCapture(m.pointerId);
  }, [f]), M = q((m) => {
    if (!k.current) return;
    const S = k.current.px + m.clientX - k.current.mx, N = k.current.py + m.clientY - k.current.my;
    u({ x: S, y: N }), d == null || d(S, N);
  }, [d]), w = q(() => {
    k.current = null, v(!1);
  }, []);
  return /* @__PURE__ */ g(
    "div",
    {
      ref: y,
      className: s,
      style: {
        position: "absolute",
        left: f.x,
        top: f.y,
        width: r,
        background: "var(--j-bg-card)",
        border: `1px solid ${x}`,
        boxShadow: `0 0 12px ${x}22`,
        fontFamily: "'Courier New', monospace",
        userSelect: "none",
        transition: b ? "none" : "box-shadow .2s",
        zIndex: b ? 100 : 10,
        clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
        ...c
      },
      onPointerMove: M,
      onPointerUp: w,
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
              background: `${x}18`,
              borderBottom: h ? "none" : `1px solid ${x}44`,
              cursor: b ? "grabbing" : "grab"
            },
            children: [
              /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", gap: 7 }, children: [
                /* @__PURE__ */ o("svg", { width: 8, height: 8, children: /* @__PURE__ */ o("rect", { width: 8, height: 8, fill: x, opacity: 0.7, transform: "rotate(45 4 4)" }) }),
                /* @__PURE__ */ o("span", { style: { fontSize: 8, color: x, letterSpacing: "0.18em", fontWeight: 700 }, children: e })
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
                    color: x,
                    fontSize: 9,
                    letterSpacing: ".1em",
                    padding: "0 2px"
                  },
                  children: h ? "▸" : "▾"
                }
              )
            ]
          }
        ),
        !h && /* @__PURE__ */ o("div", { style: { padding: "10px 12px" }, children: l })
      ]
    }
  );
}
const pc = {
  cyan: "var(--j-cyan)",
  amber: "var(--j-amber)",
  green: "var(--j-green)",
  red: "var(--j-red)",
  blue: "var(--j-blue)",
  white: "var(--j-text-primary)"
};
function ml({
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
  const l = pc[t] ?? "var(--j-accent)", d = (S) => String(S).padStart(2, "0"), f = `${d(s.getHours())}:${d(s.getMinutes())}:${d(s.getSeconds())}`, u = s.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit", year: "numeric" }).toUpperCase(), h = s.getSeconds() / 60 * 360, p = (s.getMinutes() + s.getSeconds() / 60) / 60 * 360, b = (s.getHours() % 12 + s.getMinutes() / 60) / 12 * 360, v = n / 2, k = n / 2, y = n / 2 - 4, x = (S, N) => ({
    x: v + N * Math.sin(S * Math.PI / 180),
    y: k - N * Math.cos(S * Math.PI / 180)
  }), j = x(b, y * 0.48), M = x(p, y * 0.65), w = x(h, y * 0.8), m = Array.from({ length: 60 }, (S, N) => {
    const C = N / 60 * Math.PI * 2, P = N % 5 === 0, F = y - (P ? 10 : 5);
    return {
      x1: v + y * Math.cos(C),
      y1: k + y * Math.sin(C),
      x2: v + F * Math.cos(C),
      y2: k + F * Math.sin(C),
      major: P
    };
  });
  return /* @__PURE__ */ g("div", { className: a, style: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6, fontFamily: "'Courier New', monospace", ...i }, children: [
    e && /* @__PURE__ */ g("svg", { width: n, height: n, children: [
      /* @__PURE__ */ o("circle", { cx: v, cy: k, r: y, fill: "none", stroke: l, strokeWidth: 1.5, opacity: 0.5 }),
      /* @__PURE__ */ o("circle", { cx: v, cy: k, r: y - 14, fill: "none", stroke: l, strokeWidth: 0.5, opacity: 0.2 }),
      m.map((S, N) => /* @__PURE__ */ o(
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
        N
      )),
      [0, 3, 6, 9].map((S) => {
        const N = S / 12 * Math.PI * 2, C = y - 18;
        return /* @__PURE__ */ o(
          "text",
          {
            x: v + C * Math.sin(N),
            y: k - C * Math.cos(N) + 4,
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
      /* @__PURE__ */ o("line", { x1: v, y1: k, x2: j.x, y2: j.y, stroke: l, strokeWidth: 2.5, strokeLinecap: "round", opacity: 0.9 }),
      /* @__PURE__ */ o("line", { x1: v, y1: k, x2: M.x, y2: M.y, stroke: l, strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.85 }),
      /* @__PURE__ */ o("line", { x1: v, y1: k, x2: w.x, y2: w.y, stroke: "var(--j-red)", strokeWidth: 1, strokeLinecap: "round" }),
      /* @__PURE__ */ o("circle", { cx: v, cy: k, r: 3, fill: l }),
      /* @__PURE__ */ o("circle", { cx: v, cy: k, r: 6, fill: "none", stroke: l, strokeWidth: 0.7, opacity: 0.4 })
    ] }),
    /* @__PURE__ */ o("div", { style: { fontSize: e ? 13 : 22, color: l, letterSpacing: "0.15em", lineHeight: 1 }, children: f }),
    r && /* @__PURE__ */ o("div", { style: { fontSize: 8, color: "var(--j-text-muted)", letterSpacing: "0.12em" }, children: u })
  ] });
}
const Pn = {
  cyan: "#00e5ff",
  amber: "#f97316",
  green: "#22c55e",
  red: "#ef4444",
  blue: "#3b82f6"
};
function gl({
  level: e = 100,
  size: t = 120,
  color: n = "cyan",
  label: r,
  animated: a = !0,
  className: i,
  style: s
}) {
  const c = Pn[n] ?? Pn.cyan, l = t / 2, d = t / 2, f = Math.max(0, Math.min(100, e)) / 100, u = t * 0.46, h = t * 0.34, p = t * 0.22, b = t * 0.1, v = 2 * Math.PI * h, k = v * f, y = v * (1 - f), x = [0, 120, 240].map((w) => {
    const m = w * Math.PI / 180, S = { x: l + p * Math.cos(m - Math.PI / 2), y: d + p * Math.sin(m - Math.PI / 2) }, N = { x: l + b * Math.cos(m - Math.PI / 2 + 0.6), y: d + b * Math.sin(m - Math.PI / 2 + 0.6) }, C = { x: l + b * Math.cos(m - Math.PI / 2 - 0.6), y: d + b * Math.sin(m - Math.PI / 2 - 0.6) };
    return `M ${S.x} ${S.y} L ${N.x} ${N.y} L ${C.x} ${C.y} Z`;
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
          r: h,
          fill: "none",
          stroke: c,
          strokeWidth: 2.5,
          strokeDasharray: `${k} ${y}`,
          strokeDashoffset: v * 0.25,
          strokeLinecap: "round",
          opacity: 0.85,
          transform: `rotate(-90 ${l} ${d})`,
          filter: `url(#arc-glow-${n})`
        }
      ),
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: h, fill: "none", stroke: c, strokeWidth: 0.5, opacity: 0.15 }),
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
      x.map((w, m) => /* @__PURE__ */ o("path", { d: w, fill: c, opacity: 0.7 * f, filter: `url(#arc-glow-${n})` }, m)),
      /* @__PURE__ */ o("circle", { cx: l, cy: d, r: b, fill: c, opacity: 0.15 + 0.6 * f }),
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
  cyan: ["#002233", "#00e5ff"],
  amber: ["#1a0800", "#f97316"],
  green: ["#001a08", "#22c55e"],
  red: ["#1a0000", "#ef4444"]
};
function mc(e, t, n) {
  const r = (p) => parseInt(p.slice(1), 16), a = r(e) >> 16 & 255, i = r(e) >> 8 & 255, s = r(e) & 255, c = r(t) >> 16 & 255, l = r(t) >> 8 & 255, d = r(t) & 255, f = Math.round(a + (c - a) * n), u = Math.round(i + (l - i) * n), h = Math.round(s + (d - s) * n);
  return `#${f.toString(16).padStart(2, "0")}${u.toString(16).padStart(2, "0")}${h.toString(16).padStart(2, "0")}`;
}
function yl({
  data: e,
  color: t = "cyan",
  cellSize: n = 28,
  gap: r = 3,
  showValue: a = !1,
  title: i,
  className: s,
  style: c
}) {
  const [l, d] = In[t] ?? In.cyan, f = d;
  return /* @__PURE__ */ g("div", { className: s, style: { fontFamily: "'Courier New', monospace", ...c }, children: [
    i && /* @__PURE__ */ o("div", { style: { fontSize: 8, color: f, letterSpacing: "0.18em", marginBottom: 8 }, children: i }),
    /* @__PURE__ */ o("div", { style: { display: "flex", flexDirection: "column", gap: r }, children: e.map((u, h) => /* @__PURE__ */ o("div", { style: { display: "flex", gap: r }, children: u.map((p, b) => {
      const v = Math.max(0, Math.min(100, p.value)) / 100, k = mc(l, d, v), y = v > 0.55 ? "#000" : d;
      return /* @__PURE__ */ o(
        "div",
        {
          title: p.tooltip ?? p.label ?? `${p.value}%`,
          style: {
            width: n,
            height: n,
            background: k,
            border: `1px solid ${f}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            color: y,
            cursor: "default",
            transition: "transform .15s",
            flexShrink: 0
          },
          onMouseEnter: (x) => {
            x.currentTarget.style.transform = "scale(1.15)", x.currentTarget.style.zIndex = "5";
          },
          onMouseLeave: (x) => {
            x.currentTarget.style.transform = "", x.currentTarget.style.zIndex = "";
          },
          children: a ? Math.round(p.value) : p.label ?? ""
        },
        b
      );
    }) }, h)) })
  ] });
}
const gc = {
  active: "var(--j-cyan)",
  warning: "var(--j-amber)",
  error: "var(--j-red)",
  success: "var(--j-green)",
  info: "var(--j-text-muted)"
}, yc = {
  active: "●",
  warning: "▲",
  error: "✕",
  success: "✓",
  info: "○"
};
function vl({
  items: e,
  maxRows: t = 8,
  rowHeight: n = 28,
  autoScroll: r = !0,
  showTime: a = !0,
  showSource: i = !0,
  className: s,
  style: c
}) {
  const l = U(null), [d, f] = W(!1);
  K(() => {
    if (!r || d) return;
    const h = l.current;
    h && (h.scrollTop = h.scrollHeight);
  }, [e, r, d]);
  const u = t * n;
  return /* @__PURE__ */ g("div", { className: s, style: { fontFamily: "'Courier New', monospace", ...c }, children: [
    /* @__PURE__ */ o(
      "div",
      {
        ref: l,
        onMouseEnter: () => f(!0),
        onMouseLeave: () => f(!1),
        style: {
          maxHeight: u,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--j-accent-50) transparent"
        },
        children: e.map((h) => {
          const p = gc[h.level ?? "info"], b = yc[h.level ?? "info"];
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
                /* @__PURE__ */ o("span", { style: { color: p, fontSize: 8, width: 10, flexShrink: 0 }, children: b }),
                a && h.time && /* @__PURE__ */ o("span", { style: { color: "var(--j-text-muted)", width: 52, flexShrink: 0, fontSize: 8 }, children: h.time }),
                /* @__PURE__ */ o("span", { style: {
                  flex: 1,
                  color: "var(--j-text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }, children: h.message }),
                i && h.source && /* @__PURE__ */ g("span", { style: {
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
                  h.source,
                  "]"
                ] })
              ]
            },
            h.id
          );
        })
      }
    ),
    d && /* @__PURE__ */ o("div", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".12em", textAlign: "right", paddingTop: 4 }, children: "⏸ HOVER PAUSED" })
  ] });
}
const En = {
  cyan: "var(--j-cyan)",
  amber: "var(--j-amber)",
  green: "var(--j-green)",
  red: "var(--j-red)"
};
function bl({
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
    const h = c.current;
    if (!h) return;
    const b = h.scrollWidth / 2 / t;
    let v = document.getElementById("j-ticker-style");
    v || (v = document.createElement("style"), v.id = "j-ticker-style", document.head.appendChild(v));
    const k = `@keyframes ${d} { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`;
    v.textContent = (v.textContent ?? "") + k, h.style.animation = `${d} ${b}s linear infinite`;
  }, [e, t, d]);
  const f = (h) => h === "up" ? "var(--j-green)" : h === "down" ? "var(--j-red)" : "var(--j-text-muted)", u = () => e.map((h, p) => /* @__PURE__ */ g("span", { style: { display: "inline-flex", alignItems: "center", gap: 8, marginRight: 40, flexShrink: 0 }, children: [
    /* @__PURE__ */ o("span", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".15em" }, children: h.label }),
    /* @__PURE__ */ o("span", { style: { fontSize: 11, color: l, letterSpacing: ".1em", fontWeight: 700 }, children: h.value }),
    h.delta && /* @__PURE__ */ g("span", { style: { fontSize: 8, color: f(h.trend), letterSpacing: ".08em" }, children: [
      h.trend === "up" ? "▲" : h.trend === "down" ? "▼" : "–",
      " ",
      h.delta
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
const vc = {
  cyan: "var(--j-cyan)",
  amber: "var(--j-amber)",
  green: "var(--j-green)",
  red: "var(--j-red)",
  blue: "var(--j-blue)"
};
function xl({
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
  const [d, f] = W(() => {
    const m = {};
    return e.forEach((S) => {
      m[S.id] = { x: S.x, y: S.y };
    }), m;
  }), [u, h] = W({}), [p, b] = W(null), [v, k] = W(e.map((m) => m.id)), y = U(null), x = (m) => a ? Math.round(m / r) * r : m, j = q((m, S) => {
    S.preventDefault();
    const N = d[m] ?? { x: 0, y: 0 };
    y.current = { mx: S.clientX, my: S.clientY, px: N.x, py: N.y }, b(m), k((C) => [...C.filter((P) => P !== m), m]), S.currentTarget.setPointerCapture(S.pointerId);
  }, [d]), M = q((m) => {
    if (!p || !y.current) return;
    const S = x(y.current.px + m.clientX - y.current.mx), N = x(y.current.py + m.clientY - y.current.my);
    f((C) => ({ ...C, [p]: { x: S, y: N } })), l == null || l(p, S, N);
  }, [p, x, l]), w = q(() => {
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
      onPointerMove: M,
      onPointerUp: w,
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
          const S = d[m.id] ?? { x: m.x, y: m.y }, N = vc[m.color ?? "cyan"] ?? "var(--j-accent)", C = u[m.id], P = v.indexOf(m.id);
          return /* @__PURE__ */ g(
            "div",
            {
              style: {
                position: "absolute",
                left: S.x,
                top: S.y,
                width: m.width ?? 260,
                zIndex: P + 1,
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
                    onPointerDown: (F) => j(m.id, F),
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
                          onPointerDown: (F) => F.stopPropagation(),
                          onClick: () => h((F) => ({ ...F, [m.id]: !F[m.id] })),
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
function bc(e) {
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
function xc(e) {
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
function Nr(e) {
  return e === "amber" ? "var(--j-warn)" : e === "red" ? "var(--j-err)" : e === "green" ? "var(--j-ok)" : "var(--j-accent)";
}
function jc(e) {
  return Nr(e);
}
function wc(e) {
  return e === "amber" ? "aw" : e === "red" ? "ae" : e === "green" ? "ag" : "a";
}
function ie(e) {
  return e.toFixed(2);
}
function jl({
  nodes: e,
  edges: t,
  width: n = "100%",
  height: r = "420px",
  title: a,
  showLegend: i = !0
}) {
  const c = `ng${Fn().replace(/:/g, "")}`, [l, d] = W({}), [f, u] = W(null), h = U(null);
  K(() => {
    d((y) => {
      const x = { ...y };
      return e.forEach((j) => {
        x[j.id] || (x[j.id] = { x: j.x, y: j.y, w: bc(j), h: xc(j) });
      }), Object.keys(x).forEach((j) => {
        e.some((M) => M.id === j) || delete x[j];
      }), x;
    });
  }, [e]);
  function p(y, x) {
    y.stopPropagation();
    const j = l[x];
    j && (u(x), h.current = { id: x, offX: y.clientX - j.x, offY: y.clientY - j.y });
  }
  function b(y) {
    const x = h.current;
    if (!x) return;
    const { id: j, offX: M, offY: w } = x;
    d((m) => {
      const S = m[j];
      if (!S) return m;
      const N = Math.max(0, y.clientX - M), C = Math.max(0, y.clientY - w);
      return S.x === N && S.y === C ? m : { ...m, [j]: { ...S, x: N, y: C } };
    });
  }
  function v() {
    u(null), h.current = null;
  }
  function k(y, x, j, M) {
    const w = e.find((P) => P.id === j), m = w == null ? void 0 : w.type;
    if (m === "hub" || m === "diamond" || m === "hex")
      return [y.x + y.w / 2, y.y + y.h / 2];
    const S = y.y + y.h / 2, N = x.x + x.w / 2, C = y.x + y.w / 2;
    return M ? N >= C ? [y.x + y.w, S] : [y.x, S] : N < C ? [y.x + y.w, S] : [y.x, S];
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
            const x = l[y.from], j = l[y.to];
            if (!x || !j) return null;
            const [M, w] = k(x, j, y.from, !0), [m, S] = k(j, x, y.to, !1), N = M + (m - M) * 0.5, C = w, P = m - (m - M) * 0.5, F = S, X = `M ${ie(M)} ${ie(w)} C ${ie(N)} ${ie(C)} ${ie(P)} ${ie(F)} ${ie(m)} ${ie(S)}`, G = jc(y.color), L = `ep-${c}-${y.from}-${y.to}`, ye = y.arrow ?? !0 ? `url(#${c}-${wc(y.color)})` : "none", be = y.style === "dashed" ? "6,4" : y.style === "dotted" ? "2,4" : void 0;
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
                  x: ie((M + m) / 2),
                  y: ie((w + S) / 2 - 10),
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
          const x = l[y.id];
          if (!x) return null;
          const j = Nr(y.color), M = f === y.id, w = y.type ?? "chip";
          return /* @__PURE__ */ g(
            "div",
            {
              "data-node-id": y.id,
              "data-node-type": w,
              "data-selected": M ? "true" : "false",
              style: {
                position: "absolute",
                left: x.x,
                top: x.y,
                width: x.w,
                height: x.h,
                zIndex: M ? 20 : 3,
                cursor: "grab",
                touchAction: "none",
                userSelect: "none"
              },
              onMouseDown: (m) => p(m, y.id),
              children: [
                w === "hub" && /* @__PURE__ */ g("div", { style: {
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
                w === "diamond" && /* @__PURE__ */ g("div", { style: { width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }, children: [
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
                w === "hex" && /* @__PURE__ */ g("div", { style: { width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }, children: [
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
                w === "chip" && /* @__PURE__ */ g("div", { style: {
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
export {
  Qc as JAccordion,
  vl as JActivityFeed,
  qc as JAlert,
  el as JArcMeter,
  gl as JArcReactor,
  mr as JBadge,
  al as JBarChart,
  ll as JBootScreen,
  Tc as JButton,
  ka as JCard,
  Fc as JCheckbox,
  ul as JCommandPalette,
  Ps as JDataRow,
  zc as JDatePicker,
  Rc as JDateRangePicker,
  Jc as JDivider,
  il as JDonutChart,
  pl as JDragWidget,
  Bc as JFormField,
  sl as JGaugeChart,
  yl as JHeatmap,
  He as JHudBar,
  xl as JHudCanvas,
  ml as JHudClock,
  $c as JHudFrame,
  Wc as JHudFrameCard,
  Gc as JHudLabel,
  Pc as JInput,
  bl as JKPITicker,
  ol as JLineChart,
  Lc as JModal,
  Oc as JNavItem,
  jl as JNodeGraph,
  nl as JOrb,
  Cc as JPageLayout,
  Zc as JPagination,
  Os as JProgress,
  cl as JRadarChart,
  hl as JRadialItem,
  fl as JRadialMenu,
  Ac as JRadio,
  Ec as JSelect,
  ha as JSidebar,
  Yc as JSlider,
  rl as JSparkline,
  It as JSpinner,
  Uc as JStatCard,
  Ms as JStatusPill,
  Bs as JTab,
  dl as JTable,
  Kc as JTabs,
  Ic as JTextArea,
  Dc as JThemePicker,
  Nc as JThemeProvider,
  Hc as JTimePicker,
  Xc as JToastProvider,
  _c as JToggle,
  tl as JWaveform,
  H as JarvisTokens,
  Ct as PRESETS,
  Mr as RadialMenuContext,
  oa as toCss,
  cc as useRadialMenu,
  ca as useTheme,
  Vc as useToast
};
