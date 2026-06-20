import { jsx as i, jsxs as g, Fragment as B } from "react/jsx-runtime";
import M, { useState as E, useEffect as re, useContext as qe, createContext as Ve, useCallback as X, useRef as ge, useLayoutEffect as Ur, useMemo as Re, Children as Qr, isValidElement as Zr, useId as En } from "react";
import { createPortal as ea } from "react-dom";
function $e(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
  const n = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), a = parseInt(t.slice(4, 6), 16);
  return `${n},${r},${a}`;
}
function ta(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
  const n = Math.max(0, parseInt(t.slice(0, 2), 16) - 4), r = Math.max(0, parseInt(t.slice(2, 4), 16) - 2), a = Math.max(0, parseInt(t.slice(4, 6), 16) - 2);
  return `#${n.toString(16).padStart(2, "0")}${r.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`;
}
function na(e) {
  const t = $e(e.accent), n = $e(e.warn), r = $e(e.err), a = $e(e.ok), o = $e(e.bg);
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
  --j-bg-danger:    ${ta(e.bg)};
  --j-bg-overlay:   rgba(${o},0.92);

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
}, ra = {
  CornerBracket: "j-card-s1",
  Notched: "j-card-s2",
  SideRail: "j-card-s3",
  GlowBorder: "j-card-s4",
  PartialBorder: "j-card-s5",
  DangerPulse: "j-card-s6",
  Hexagonal: "j-card-s7",
  Radar: "j-card-s8",
  DoubleFrame: "j-card-s9"
}, aa = {
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
  cardStyle: (e) => e ? ra[e] : "",
  buttonShape: (e) => e ? aa[e] : "",
  cls: (...e) => e.filter(Boolean).join(" ")
}, Pn = Ve(null);
function yc({ children: e, preset: t = "cyan", theme: n }) {
  const [r, a] = E(n ?? Ct[t]);
  re(() => {
    let c = document.getElementById("jarvis-theme-vars");
    c || (c = document.createElement("style"), c.id = "jarvis-theme-vars", document.head.appendChild(c)), c.textContent = na(r);
  }, [r]);
  const o = (c) => a(c), s = (c) => a(Ct[c]);
  return /* @__PURE__ */ i(Pn.Provider, { value: { theme: r, setTheme: o, setPreset: s }, children: e });
}
function oa() {
  const e = qe(Pn);
  if (!e) throw new Error("useTheme must be used inside JThemeProvider");
  return e;
}
const ia = [
  { preset: "cyan", color: "var(--j-accent)", label: "Cyan" },
  { preset: "amber", color: "var(--j-warn)", label: "Amber" },
  { preset: "green", color: "var(--j-ok)", label: "Green" },
  { preset: "red", color: "var(--j-err)", label: "Red" },
  { preset: "purple", color: Ct.purple.accent, label: "Purple" },
  { preset: "white", color: "var(--j-accent-deep)", label: "White" }
];
function vc({ compact: e = !1, showCustom: t = !0 }) {
  const { theme: n, setPreset: r, setTheme: a } = oa(), [o, s] = E(!1), [c, l] = E(n.accent), [d, f] = E(n.bg), [u, h] = E(n.bgCard);
  function p(b, k) {
    const y = e ? "20px" : "48px", j = e ? "4px" : "6px";
    return {
      width: y,
      height: e ? "20px" : "32px",
      background: b,
      border: `2px solid ${k ? "var(--j-text-primary)" : "transparent"}`,
      boxShadow: k ? `0 0 12px ${b}` : "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      clipPath: `polygon(${j} 0,100% 0,calc(100% - ${j}) 100%,0 100%)`,
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
    !e && /* @__PURE__ */ i("div", { style: {
      fontSize: "9px",
      color: "var(--j-accent-70)",
      letterSpacing: ".14em",
      textTransform: "uppercase",
      marginBottom: "8px"
    }, children: "Theme" }),
    /* @__PURE__ */ i("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" }, children: ia.map(({ preset: b, color: k, label: y }) => {
      const j = !o && n.preset === b;
      return /* @__PURE__ */ i(
        "button",
        {
          title: y,
          "aria-pressed": j,
          onClick: () => {
            s(!1), r(b);
          },
          style: p(k, j),
          children: !e && /* @__PURE__ */ i("span", { style: {
            fontSize: "9px",
            fontFamily: "'Courier New', monospace",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: j ? "var(--j-bg)" : k,
            marginTop: "2px"
          }, children: y })
        },
        b
      );
    }) }),
    t && !e && /* @__PURE__ */ g("div", { style: { marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }, children: [
      /* @__PURE__ */ i("div", { style: {
        fontSize: "9px",
        color: "var(--j-accent-70)",
        letterSpacing: ".14em",
        textTransform: "uppercase",
        marginBottom: "2px"
      }, children: "Custom accent" }),
      /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "color",
            value: c,
            onChange: (b) => l(b.target.value),
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
        /* @__PURE__ */ i("span", { style: {
          fontSize: "10px",
          color: "var(--j-text-muted)",
          fontFamily: "'Courier New', monospace"
        }, children: c })
      ] }),
      /* @__PURE__ */ g("div", { style: { display: "flex", gap: "6px" }, children: [
        /* @__PURE__ */ g("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ i("div", { style: { fontSize: "8px", color: "var(--j-text-dim)", marginBottom: "3px" }, children: "Background" }),
          /* @__PURE__ */ i(
            "input",
            {
              type: "color",
              value: d,
              onChange: (b) => f(b.target.value),
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
          /* @__PURE__ */ i("div", { style: { fontSize: "8px", color: "var(--j-text-dim)", marginBottom: "3px" }, children: "Card" }),
          /* @__PURE__ */ i(
            "input",
            {
              type: "color",
              value: u,
              onChange: (b) => h(b.target.value),
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
      /* @__PURE__ */ i(
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
const sa = [
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
], Xt = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10], ca = Array.from({ length: 20 }, (e, t) => ({
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
  showWaveform: o = !1,
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
    r && /* @__PURE__ */ i("span", { className: "j-text-xs", children: r }),
    a && /* @__PURE__ */ i("div", { className: "j-dot-seq", children: sa.map((h, p) => /* @__PURE__ */ i(
      "div",
      {
        className: H.cls("j-d", h === "sq" && "sq", h === "tall" && "tall"),
        style: { animationDelay: `${(p * 0.08).toFixed(2)}s` }
      },
      p
    )) }),
    /* @__PURE__ */ i("div", { style: { flex: 1, height: 1, background: "linear-gradient(90deg,var(--j-accent-25),transparent)" } }),
    s && /* @__PURE__ */ g(B, { children: [
      /* @__PURE__ */ i("div", { className: "j-tick-row", children: Array.from({ length: d }, (h, p) => /* @__PURE__ */ i(
        "div",
        {
          className: H.cls("j-tk", p >= f && "off"),
          style: { height: Xt[p % Xt.length] }
        },
        p
      )) }),
      /* @__PURE__ */ i("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", flexShrink: 0 } })
    ] }),
    o && /* @__PURE__ */ g(B, { children: [
      /* @__PURE__ */ i("div", { className: "j-waveform", style: { flex: 1, maxWidth: 260 }, children: ca.map((h, p) => /* @__PURE__ */ i(
        "div",
        {
          className: "j-wv",
          style: { height: h.h, "--j-wv-dur": h.dur, "--j-wv-dly": h.dly }
        },
        p
      )) }),
      /* @__PURE__ */ i("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", flexShrink: 0 } })
    ] }),
    u,
    c && /* @__PURE__ */ i("span", { className: "j-text-xs j-blink", children: "● LIVE" }),
    l && /* @__PURE__ */ i("span", { className: "j-text-xs j-blink", style: { color: "var(--j-err)" }, children: "● REC" })
  ] });
}
function Pt({ size: e = "64px", color: t = "cyan", label: n, showLabel: r = !0 }) {
  const a = parseFloat(e);
  return /* @__PURE__ */ g("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: H.color(t),
        style: { position: "relative", width: e, height: e, flexShrink: 0 },
        children: [
          /* @__PURE__ */ i("div", { style: {
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid transparent",
            borderTopColor: "var(--j-accent)",
            borderBottomColor: "var(--j-accent-25)",
            animation: "j-spin var(--j-dur-spin) linear infinite"
          } }),
          /* @__PURE__ */ i("div", { style: {
            position: "absolute",
            inset: `${Math.round(a * 0.17)}px`,
            borderRadius: "50%",
            border: "1px dashed transparent",
            borderTopColor: "var(--j-accent-dim)",
            borderRightColor: "var(--j-accent-dim)",
            animation: "j-spin-rev 6s linear infinite"
          } }),
          /* @__PURE__ */ i("div", { style: {
            position: "absolute",
            inset: `${Math.round(a * 0.28)}px`,
            borderRadius: "50%",
            border: "1px solid transparent",
            borderTopColor: "var(--j-accent-mid)",
            animation: "j-spin 3s linear infinite"
          } }),
          /* @__PURE__ */ i("div", { style: {
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
    r && n && /* @__PURE__ */ i("span", { style: {
      fontSize: 9,
      color: "var(--j-accent)",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      fontFamily: "'Courier New', monospace"
    }, children: n })
  ] });
}
const la = {
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
function bc({ href: e, icon: t, label: n, badge: r, active: a = !1, onClick: o }) {
  const s = {
    ...la,
    padding: a ? "10px 14px 10px 16px" : "10px 14px",
    background: a ? "var(--j-accent-08)" : "transparent",
    color: a ? "var(--j-accent)" : "var(--j-text-muted)",
    borderLeft: `2px solid ${a ? "var(--j-accent)" : "transparent"}`,
    boxShadow: a ? "-2px 0 12px var(--j-accent-12)" : "none"
  }, c = /* @__PURE__ */ g(B, { children: [
    a && /* @__PURE__ */ i("div", { style: {
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: 2,
      height: "60%",
      background: "var(--j-accent)",
      boxShadow: "0 0 8px var(--j-accent)"
    } }),
    t && /* @__PURE__ */ i("span", { style: { fontSize: 14, color: a ? "var(--j-accent)" : "var(--j-text-dim)", flexShrink: 0 }, children: t }),
    n && /* @__PURE__ */ i("span", { style: { flex: 1 }, children: n }),
    r && /* @__PURE__ */ i("span", { style: {
      fontSize: 9,
      letterSpacing: ".06em",
      padding: "2px 6px",
      background: "var(--j-accent-12)",
      color: "var(--j-accent)",
      clipPath: "polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)"
    }, children: r })
  ] });
  return e ? /* @__PURE__ */ i("a", { href: e, style: s, children: c }) : /* @__PURE__ */ i("button", { type: "button", onClick: o, style: s, children: c });
}
function Kt() {
  const e = /* @__PURE__ */ new Date();
  return `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`;
}
function da({
  systemName: e = "JARVIS",
  version: t = "v4.2.1",
  navLabel: n = "Navigation",
  width: r = "220px",
  color: a = "cyan",
  children: o,
  footer: s
}) {
  const [c, l] = E(Kt);
  return re(() => {
    const d = setInterval(() => l(Kt()), 1e4);
    return () => clearInterval(d);
  }, []), /* @__PURE__ */ g(
    "aside",
    {
      className: H.cls("j-sidebar", H.color(a)),
      style: { width: r, flexShrink: 0 },
      children: [
        /* @__PURE__ */ i("div", { style: {
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
          /* @__PURE__ */ i(Pt, { size: "36px", color: a }),
          /* @__PURE__ */ i("div", { className: "j-glitch", style: {
            fontSize: 13,
            letterSpacing: ".20em",
            textTransform: "uppercase",
            color: "var(--j-accent)",
            fontFamily: "'Courier New', monospace"
          }, children: e }),
          /* @__PURE__ */ i("div", { style: { fontSize: 8, color: "var(--j-text-dim)", letterSpacing: ".12em" }, children: t }),
          /* @__PURE__ */ i("div", { className: "j-status-dot" })
        ] }),
        n && /* @__PURE__ */ i("div", { style: {
          fontSize: 8,
          color: "var(--j-accent-70)",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          padding: "10px 14px 6px"
        }, children: n }),
        /* @__PURE__ */ i("nav", { style: { flex: 1, overflowY: "auto", overflowX: "hidden" }, children: o }),
        /* @__PURE__ */ i("div", { style: { height: 1, background: "linear-gradient(90deg,transparent,var(--j-accent-25),transparent)", margin: "0 8px" } }),
        s && /* @__PURE__ */ i("div", { style: { padding: "8px 14px" }, children: s }),
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
          /* @__PURE__ */ i("span", { className: "j-blink", style: { color: "var(--j-ok)", letterSpacing: ".10em" }, children: "● LIVE" })
        ] })
      ]
    }
  );
}
function xc({
  systemName: e = "JARVIS",
  version: t = "v4.2.1",
  color: n = "cyan",
  showSidebar: r = !0,
  sidebarWidth: a = "220px",
  navLabel: o = "Navigation",
  showTicks: s = !1,
  showWaveform: c = !1,
  showLive: l = !0,
  showRec: d = !1,
  contentPadding: f = "12px",
  sidebar: u,
  sidebarFooter: h,
  topBar: p,
  bottomBar: x,
  children: b
}) {
  return /* @__PURE__ */ g("div", { className: "j-root", children: [
    /* @__PURE__ */ i(
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
      r && /* @__PURE__ */ i(
        da,
        {
          systemName: e,
          version: t,
          navLabel: o,
          width: a,
          color: n,
          footer: h,
          children: u
        }
      ),
      /* @__PURE__ */ g("div", { className: "j-content", children: [
        /* @__PURE__ */ g("div", { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }, children: [
          /* @__PURE__ */ i("div", { style: {
            position: "absolute",
            top: 4,
            left: 4,
            width: 16,
            height: 16,
            borderTop: "1px solid var(--j-accent-50)",
            borderLeft: "1px solid var(--j-accent-50)",
            animation: "j-corner-blink var(--j-dur-corner) ease-in-out infinite 0s"
          } }),
          /* @__PURE__ */ i("div", { style: {
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
        /* @__PURE__ */ i("div", { className: "j-scroll", style: { padding: f, position: "relative", zIndex: 1 }, children: b })
      ] })
    ] }),
    /* @__PURE__ */ i(
      He,
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
function jc({
  color: e = "cyan",
  systemLabel: t = "JARVIS · SYS",
  showTop: n = !0,
  showBottom: r = !0,
  showDots: a = !0,
  showLive: o = !1,
  showWaveform: s = !1,
  showTicks: c = !1,
  showRec: l = !1,
  contentPadding: d = "16px",
  children: f,
  topContent: u,
  bottomContent: h
}) {
  return /* @__PURE__ */ g("div", { className: "j-hud-frame", style: { position: "relative", minHeight: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ i("div", { className: "j-hf-corner tl" }),
    /* @__PURE__ */ i("div", { className: "j-hf-corner tr" }),
    /* @__PURE__ */ i("div", { className: "j-hf-corner bl" }),
    /* @__PURE__ */ i("div", { className: "j-hf-corner br" }),
    /* @__PURE__ */ i("div", { style: {
      position: "absolute",
      top: 8,
      left: 36,
      right: 36,
      height: 1,
      background: "linear-gradient(90deg,transparent,var(--j-accent-25),transparent)",
      opacity: 0.15,
      pointerEvents: "none"
    } }),
    /* @__PURE__ */ i("div", { style: {
      position: "absolute",
      bottom: 8,
      left: 36,
      right: 36,
      height: 1,
      background: "linear-gradient(90deg,transparent,var(--j-accent-25),transparent)",
      opacity: 0.15,
      pointerEvents: "none"
    } }),
    n && /* @__PURE__ */ i(
      He,
      {
        position: "top",
        color: e,
        systemLabel: t,
        showDots: a,
        showLive: o,
        showWaveform: s,
        showTicks: c,
        showRec: l,
        children: u
      }
    ),
    /* @__PURE__ */ i("div", { style: { flex: 1, padding: d }, children: f }),
    r && /* @__PURE__ */ i(He, { position: "bottom", color: e, showDots: !1, showWaveform: s, children: h })
  ] });
}
function ua() {
  return /* @__PURE__ */ g(B, { children: [
    /* @__PURE__ */ g("div", { className: "j-hfc-corner j-hfc-tl", children: [
      /* @__PURE__ */ i("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ i("div", { className: "j-hfc-corner-inner" }),
      /* @__PURE__ */ i("div", { className: "j-hfc-tick-h" }),
      /* @__PURE__ */ i("div", { className: "j-hfc-tick-v" })
    ] }),
    /* @__PURE__ */ g("div", { className: "j-hfc-corner j-hfc-tr", children: [
      /* @__PURE__ */ i("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ i("div", { className: "j-hfc-circ" })
    ] }),
    /* @__PURE__ */ g("div", { className: "j-hfc-corner j-hfc-bl", children: [
      /* @__PURE__ */ i("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ i("div", { className: "j-hfc-circ" })
    ] }),
    /* @__PURE__ */ g("div", { className: "j-hfc-corner j-hfc-br", children: [
      /* @__PURE__ */ i("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ i("div", { className: "j-hfc-corner-inner" }),
      /* @__PURE__ */ i("div", { className: "j-hfc-tick-h" }),
      /* @__PURE__ */ i("div", { className: "j-hfc-tick-v" })
    ] })
  ] });
}
function fa() {
  return /* @__PURE__ */ g(B, { children: [
    /* @__PURE__ */ i("div", { className: "j-hfc-beta-rail-t" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-beta-rail-b" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-beta-notch-tl" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-beta-notch-br" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-beta-pip-l" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-beta-pip-r" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-scan-h" })
  ] });
}
function ha() {
  return /* @__PURE__ */ g(B, { children: [
    ["tl1", "tl2", "tr1", "tr2", "bl1", "bl2", "br1", "br2"].map((e) => /* @__PURE__ */ i("div", { className: `j-hfc-g-seg-${e}` }, e)),
    /* @__PURE__ */ i("div", { className: "j-hfc-g-center-ring" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-scan-v" })
  ] });
}
function pa() {
  return /* @__PURE__ */ g(B, { children: [
    /* @__PURE__ */ i("div", { className: "j-hfc-d-top-bar" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-d-bot-bar" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-d-l-rail" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-d-r-rail" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-d-tl-block" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-d-tr-block" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-d-bl-block" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-d-br-block" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-scan-h" }),
    /* @__PURE__ */ i("div", { className: "j-hfc-scan-v" })
  ] });
}
const ma = {
  Alpha: "j-hfc-alpha",
  Beta: "j-hfc-beta",
  Gamma: "j-hfc-gamma",
  Delta: "j-hfc-delta"
};
function wc({
  frameStyle: e = "Alpha",
  color: t = "cyan",
  title: n,
  frameId: r,
  showStatusDot: a = !0,
  width: o = "100%",
  height: s = "100%",
  children: c
}) {
  return /* @__PURE__ */ g(
    "div",
    {
      className: H.cls("j-hfc", ma[e], H.color(t)),
      style: { width: o, height: s },
      children: [
        e === "Alpha" && /* @__PURE__ */ i(ua, {}),
        e === "Beta" && /* @__PURE__ */ i(fa, {}),
        e === "Gamma" && /* @__PURE__ */ i(ha, {}),
        e === "Delta" && /* @__PURE__ */ i(pa, {}),
        e === "Alpha" && /* @__PURE__ */ g(B, { children: [
          /* @__PURE__ */ i("div", { className: "j-hfc-scan-h" }),
          /* @__PURE__ */ i("div", { className: "j-hfc-scan-v" })
        ] }),
        n && /* @__PURE__ */ g("div", { className: "j-hfc-title", children: [
          a && /* @__PURE__ */ i("span", { className: "j-hfc-dot" }),
          n
        ] }),
        r && /* @__PURE__ */ i("div", { className: "j-hfc-id", children: r }),
        /* @__PURE__ */ i("div", { className: "j-hfc-body", children: c })
      ]
    }
  );
}
const ga = /* @__PURE__ */ new Set(["LeftNotch", "RightNotch", "BothNotch"]), ya = /* @__PURE__ */ new Set(["Parallelogram", "GhostSkew", "BracketFrame", "Hexagonal", "IconSquare", "ScanFull"]), va = {
  LeftNotch: "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)",
  RightNotch: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)",
  BothNotch: "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))"
};
function kc({
  shape: e = "LeftNotch",
  color: t = "cyan",
  size: n = "md",
  variant: r,
  loading: a = !1,
  disabled: o = !1,
  icon: s,
  iconRight: c,
  type: l = "button",
  onClick: d,
  children: f
}) {
  const u = H.buttonShape(e), h = ga.has(e), p = ya.has(e), x = h ? {
    clipPath: va[e],
    border: "1px solid var(--j-accent)"
  } : {};
  return /* @__PURE__ */ g(
    "button",
    {
      type: l,
      disabled: o || a,
      onClick: d,
      className: H.cls("j-btn", u, H.color(t), H.size(n), r ? H.variant(r) : ""),
      style: x,
      "aria-busy": a || void 0,
      children: [
        h && /* @__PURE__ */ i("div", { style: { position: "absolute", inset: 0, background: "var(--j-accent-dim)" } }),
        p && /* @__PURE__ */ i("div", { className: "j-btn-bg-fill" }),
        e === "Parallelogram" && /* @__PURE__ */ i("div", { className: "j-btn-rail" }),
        e === "BracketFrame" && /* @__PURE__ */ g(B, { children: [
          /* @__PURE__ */ i("div", { className: "j-btn-top-line" }),
          /* @__PURE__ */ i("div", { className: "j-btn-bot-line" })
        ] }),
        /* @__PURE__ */ i("div", { className: "j-btn-shine" }),
        /* @__PURE__ */ i("div", { className: "j-btn-c tl" }),
        /* @__PURE__ */ i("div", { className: "j-btn-c tr" }),
        /* @__PURE__ */ i("div", { className: "j-btn-c bl" }),
        /* @__PURE__ */ i("div", { className: "j-btn-c br" }),
        /* @__PURE__ */ g("div", { className: "j-btn-label", children: [
          !a && s && /* @__PURE__ */ i("span", { children: s }),
          a ? /* @__PURE__ */ i("span", { style: { letterSpacing: ".2em" }, children: "···" }) : f,
          !a && c && /* @__PURE__ */ i("span", { children: c })
        ] })
      ]
    }
  );
}
function ba({ cardStyle: e }) {
  switch (e) {
    case "CornerBracket":
      return /* @__PURE__ */ g(B, { children: [
        /* @__PURE__ */ i("div", { className: "j-c-tl" }),
        /* @__PURE__ */ i("div", { className: "j-c-tr" }),
        /* @__PURE__ */ i("div", { className: "j-c-bl" }),
        /* @__PURE__ */ i("div", { className: "j-c-br" }),
        /* @__PURE__ */ i("div", { className: "j-inner-border" })
      ] });
    case "Notched":
      return /* @__PURE__ */ g(B, { children: [
        /* @__PURE__ */ i("div", { className: "j-notch-border" }),
        /* @__PURE__ */ i("div", { className: "j-tri-tl" }),
        /* @__PURE__ */ i("div", { className: "j-tri-br" })
      ] });
    case "SideRail":
      return /* @__PURE__ */ g(B, { children: [
        /* @__PURE__ */ i("div", { className: "j-rail" }),
        /* @__PURE__ */ i("div", { className: "j-tab-top" }),
        /* @__PURE__ */ i("div", { className: "j-tab-bot" })
      ] });
    case "GlowBorder":
      return /* @__PURE__ */ i("div", { className: "j-inner-radial" });
    case "PartialBorder":
      return /* @__PURE__ */ g(B, { children: [
        /* @__PURE__ */ i("div", { className: "j-pb-tl" }),
        /* @__PURE__ */ i("div", { className: "j-pb-br" }),
        /* @__PURE__ */ i("div", { className: "j-pb-roving-dot" })
      ] });
    case "DangerPulse":
      return /* @__PURE__ */ i("div", { className: "j-tri-tl" });
    case "Hexagonal":
      return /* @__PURE__ */ i("div", { className: "j-hex-ring" });
    case "Radar":
      return /* @__PURE__ */ g(B, { children: [
        /* @__PURE__ */ i("div", { className: "j-radar-sweep" }),
        /* @__PURE__ */ i("div", { className: "j-radar-r1" }),
        /* @__PURE__ */ i("div", { className: "j-radar-r2" }),
        /* @__PURE__ */ i("div", { className: "j-radar-r3" }),
        /* @__PURE__ */ i("div", { className: "j-radar-center" }),
        /* @__PURE__ */ i("div", { className: "j-radar-ping" })
      ] });
    default:
      return null;
  }
}
const Ut = {
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
function xa({
  cardStyle: e = "CornerBracket",
  color: t = "cyan",
  header: n,
  footer: r,
  padding: a = "14px 16px",
  children: o
}) {
  const s = H.cls("j-card", H.cardStyle(e), H.color(t));
  return e === "DoubleFrame" ? /* @__PURE__ */ g("div", { className: s, children: [
    /* @__PURE__ */ i("div", { className: "j-df-corner" }),
    /* @__PURE__ */ g("div", { className: "j-inner-frame", children: [
      n && /* @__PURE__ */ i("div", { style: Ut, children: n }),
      o,
      r && /* @__PURE__ */ i("div", { style: Qt, children: r })
    ] })
  ] }) : /* @__PURE__ */ g("div", { className: s, style: { padding: a }, children: [
    /* @__PURE__ */ i(ba, { cardStyle: e }),
    n && /* @__PURE__ */ i("div", { style: Ut, children: n }),
    /* @__PURE__ */ i("div", { style: { position: "relative", zIndex: 1 }, children: o }),
    r && /* @__PURE__ */ i("div", { style: Qt, children: r })
  ] });
}
const ja = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }, wa = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function Sc({
  type: e = "text",
  value: t,
  defaultValue: n,
  onChange: r,
  placeholder: a = "",
  disabled: o = !1,
  readOnly: s = !1,
  error: c = !1,
  size: l = "md"
}) {
  const d = {
    height: ja[l] ?? 38,
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${c ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: c ? "var(--j-err)" : "var(--j-border)",
    color: c ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: wa[l] ?? 12,
    letterSpacing: ".08em",
    padding: "0 12px",
    outline: "none",
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
    opacity: o ? 0.4 : 1,
    cursor: o ? "not-allowed" : "text",
    boxShadow: c ? "0 0 8px var(--j-err-25)" : "none"
  };
  return /* @__PURE__ */ i(
    "input",
    {
      type: e,
      placeholder: a,
      disabled: o,
      readOnly: s,
      style: d,
      ...t !== void 0 ? { value: t, onChange: (u) => r == null ? void 0 : r(u.target.value) } : { defaultValue: n }
    }
  );
}
const ka = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function Nc({
  value: e,
  defaultValue: t,
  onChange: n,
  placeholder: r = "",
  disabled: a = !1,
  readOnly: o = !1,
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
    fontSize: ka[d] ?? 12,
    letterSpacing: ".08em",
    padding: "10px 12px",
    outline: "none",
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
    opacity: a ? 0.4 : 1,
    cursor: a ? "not-allowed" : "text",
    resize: l,
    boxShadow: s ? "0 0 8px var(--j-err-25)" : "none"
  };
  return /* @__PURE__ */ i(
    "textarea",
    {
      rows: c,
      placeholder: r,
      disabled: a,
      readOnly: o,
      style: f,
      ...e !== void 0 ? { value: e, onChange: (h) => n == null ? void 0 : n(h.target.value) } : { defaultValue: t }
    }
  );
}
const Sa = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }, Na = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function Mc({
  options: e,
  value: t,
  defaultValue: n,
  onChange: r,
  placeholder: a,
  disabled: o = !1,
  error: s = !1,
  size: c = "md"
}) {
  const l = {
    height: Sa[c] ?? 38,
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${s ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: s ? "var(--j-err)" : "var(--j-border)",
    color: s ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: Na[c] ?? 12,
    letterSpacing: ".08em",
    padding: "0 12px",
    outline: "none",
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
    opacity: o ? 0.4 : 1,
    cursor: o ? "not-allowed" : "pointer",
    boxShadow: s ? "0 0 8px var(--j-err-25)" : "none"
  };
  return /* @__PURE__ */ g("select", { disabled: o, style: l, ...t !== void 0 ? { value: t, onChange: (f) => r == null ? void 0 : r(f.target.value) } : { defaultValue: n }, children: [
    a && /* @__PURE__ */ i("option", { value: "", disabled: !0, hidden: !0, children: a }),
    e.map((f) => /* @__PURE__ */ i("option", { value: f.value, disabled: f.disabled, children: f.label }, f.value))
  ] });
}
function Dc({
  checked: e,
  defaultChecked: t = !1,
  onChange: n,
  label: r,
  disabled: a = !1
}) {
  const [o, s] = E(t), c = e !== void 0 ? e : o;
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
    /* @__PURE__ */ i(
      "input",
      {
        type: "checkbox",
        checked: c,
        onChange: l,
        disabled: a,
        style: { position: "absolute", opacity: 0, width: 0, height: 0 }
      }
    ),
    /* @__PURE__ */ i("div", { style: {
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
    }, children: c && /* @__PURE__ */ i("div", { style: {
      width: 6,
      height: 6,
      background: "var(--j-bg)",
      clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)"
    } }) }),
    r && /* @__PURE__ */ i("span", { children: r })
  ] });
}
function Oc({ checked: e, onChange: t, label: n, value: r, name: a, disabled: o = !1 }) {
  return /* @__PURE__ */ g("label", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    cursor: o ? "not-allowed" : "pointer",
    opacity: o ? 0.4 : 1,
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    color: "var(--j-text-primary)",
    userSelect: "none"
  }, children: [
    /* @__PURE__ */ i(
      "input",
      {
        type: "radio",
        checked: e,
        value: r,
        name: a,
        disabled: o,
        onChange: () => {
          o || t == null || t(r);
        },
        style: { position: "absolute", opacity: 0, width: 0, height: 0 }
      }
    ),
    /* @__PURE__ */ i("div", { style: {
      width: 14,
      height: 14,
      flexShrink: 0,
      border: `1px solid ${e ? "var(--j-accent)" : "var(--j-border)"}`,
      clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all .15s ease"
    }, children: e && /* @__PURE__ */ i("div", { style: {
      width: 6,
      height: 6,
      background: "var(--j-accent)",
      clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
      boxShadow: "0 0 4px var(--j-accent)"
    } }) }),
    n && /* @__PURE__ */ i("span", { children: n })
  ] });
}
function Cc({
  checked: e,
  defaultChecked: t = !1,
  onChange: n,
  label: r,
  disabled: a = !1
}) {
  const [o, s] = E(t), c = e !== void 0 ? e : o;
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
    /* @__PURE__ */ i(
      "input",
      {
        type: "checkbox",
        checked: c,
        onChange: l,
        disabled: a,
        style: { position: "absolute", opacity: 0, width: 0, height: 0 }
      }
    ),
    /* @__PURE__ */ i("div", { style: {
      width: 36,
      height: 18,
      flexShrink: 0,
      position: "relative",
      background: c ? "var(--j-accent-25)" : "var(--j-bg-panel)",
      border: `1px solid ${c ? "var(--j-accent)" : "var(--j-border)"}`,
      clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
      boxShadow: c ? "0 0 8px var(--j-accent-25)" : "none",
      transition: "all .2s ease"
    }, children: /* @__PURE__ */ i("div", { style: {
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
    r && /* @__PURE__ */ i("span", { children: r })
  ] });
}
function Wc({
  value: e,
  defaultValue: t,
  onChange: n,
  min: r = 0,
  max: a = 100,
  step: o = 1,
  disabled: s = !1,
  showValue: c = !0
}) {
  const [l, d] = E(t ?? r), f = e !== void 0 ? e : l, u = a > r ? (f - r) / (a - r) * 100 : 0;
  function h(p) {
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
      /* @__PURE__ */ i("div", { style: {
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        height: 2,
        transform: "translateY(-50%)",
        background: "var(--j-border)"
      } }),
      /* @__PURE__ */ i("div", { style: {
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
      /* @__PURE__ */ i(
        "input",
        {
          type: "range",
          min: r,
          max: a,
          step: o,
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
      /* @__PURE__ */ i("div", { style: {
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
    c && /* @__PURE__ */ i("span", { style: {
      fontSize: 11,
      color: "var(--j-accent)",
      letterSpacing: ".06em",
      minWidth: 32,
      textAlign: "right"
    }, children: f })
  ] });
}
function Tc({ label: e, error: t, hint: n, required: r, children: a }) {
  return /* @__PURE__ */ g("div", { style: { display: "flex", flexDirection: "column", gap: 4, fontFamily: "'Courier New', monospace" }, children: [
    e && /* @__PURE__ */ g("label", { style: {
      fontSize: 10,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "var(--j-text-muted)"
    }, children: [
      e,
      r && /* @__PURE__ */ i("span", { style: { color: "var(--j-err)", marginLeft: 2 }, children: "*" })
    ] }),
    a,
    t && /* @__PURE__ */ i("span", { style: { fontSize: 10, color: "var(--j-err)", letterSpacing: ".06em" }, children: t }),
    !t && n && /* @__PURE__ */ i("span", { style: { fontSize: 10, color: "var(--j-text-dim)", letterSpacing: ".06em" }, children: n })
  ] });
}
function Ma(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const jt = {}, Ye = {};
function he(e, t) {
  try {
    const r = (jt[e] || (jt[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in Ye ? Ye[r] : Zt(r, r.split(":"));
  } catch {
    if (e in Ye) return Ye[e];
    const n = e == null ? void 0 : e.match(Da);
    return n ? Zt(e, n.slice(1)) : NaN;
  }
}
const Da = /([+-]\d\d):?(\d\d)?/;
function Zt(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), a = +(t[2] || 0) / 60;
  return Ye[e] = n * 60 + r > 0 ? n * 60 + r + a : n * 60 - r - a;
}
class ce extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(he(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), In(this, t)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new ce(...n, t) : new ce(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new ce(+this, t);
  }
  getTimezoneOffset() {
    const t = -he(this.timeZone, this);
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
    return new ce(+new Date(t), this.timeZone);
  }
  //#endregion
}
const en = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!en.test(e)) return;
  const t = e.replace(en, "$1UTC");
  ce.prototype[t] && (e.startsWith("get") ? ce.prototype[e] = function() {
    return this.internal[t]();
  } : (ce.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Oa(this), +this;
  }, ce.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), lt(this), +this;
  }));
});
function lt(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - // Round after converting minutes to seconds to avoid fractional offset
  // precision errors from historical offsets.
  Math.round(-he(e.timeZone, e) * 60));
}
function Oa(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), In(e);
}
function In(e, t) {
  const n = Array.isArray(t) ? Ca(t) : +e.internal, r = he(e.timeZone, e), a = r > 0 ? Math.floor(r) : Math.ceil(r), o = /* @__PURE__ */ new Date(+e);
  o.setUTCHours(o.getUTCHours() - 1);
  const s = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), c = -(/* @__PURE__ */ new Date(+o)).getTimezoneOffset(), l = s - c;
  let d = s;
  if (l && s !== a) {
    const T = Date.prototype.getHours.apply(e), F = Array.isArray(t) ? t[3] || 0 : e.internal.getUTCHours();
    if (T !== F) {
      const R = /* @__PURE__ */ new Date(+e), L = s - a;
      L && R.setUTCMinutes(R.getUTCMinutes() + L);
      const G = he(e.timeZone, R);
      (G > 0 ? Math.floor(G) : Math.ceil(G)) === a && (d = c);
    }
  }
  const f = d - a;
  f && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + f);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const h = s > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, p = Math.round(-(he(e.timeZone, e) * 60)) % 60;
  (p || h) && Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + p + h);
  const x = he(e.timeZone, e), b = x > 0 ? Math.floor(x) : Math.ceil(x), y = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - b, j = b !== a, v = y - f, S = b - a, w = n - b * 60 * 1e3, m = S > 0 && tn(e) - n === S * 60 * 1e3 && tn(e, w) !== n;
  if (j && v && !m) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const T = he(e.timeZone, e), F = T > 0 ? Math.floor(T) : Math.ceil(T), R = b - F;
    R && v < 0 && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + R);
  }
  lt(e);
  const O = (t ? n : n + p * 1e3) - +e.internal;
  O && Math.abs(O) < 30 * 60 * 1e3 && (Date.prototype.setTime.call(e, +e + O), lt(e));
}
function Ca(e) {
  return Date.UTC(e[0], e.length > 1 ? e[1] : 0, e.length > 2 ? e[2] : 1, ...e.slice(3));
}
function tn(e, t) {
  const n = new Date(t ?? +e);
  return n.setUTCSeconds(n.getUTCSeconds() - Math.round(-he(e.timeZone, n) * 60)), +n;
}
class V extends ce {
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
    return `${t} GMT${n}${r}${a} (${Ma(this.timeZone, this)})`;
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
const Fn = 6048e5, Wa = 864e5, nn = Symbol.for("constructDateFrom");
function J(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && nn in e ? e[nn](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function _(e, t) {
  return J(t || e, e);
}
function Yn(e, t, n) {
  const r = _(e, n == null ? void 0 : n.in);
  return isNaN(t) ? J(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function _n(e, t, n) {
  const r = _(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return J(e, NaN);
  if (!t)
    return r;
  const a = r.getDate(), o = J(e, r.getTime());
  o.setMonth(r.getMonth() + t + 1, 0);
  const s = o.getDate();
  return a >= s ? o : (r.setFullYear(
    o.getFullYear(),
    o.getMonth(),
    a
  ), r);
}
let Ta = {};
function Le() {
  return Ta;
}
function Oe(e, t) {
  var c, l, d, f;
  const n = Le(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((f = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : f.weekStartsOn) ?? 0, a = _(e, t == null ? void 0 : t.in), o = a.getDay(), s = (o < r ? 7 : 0) + o - r;
  return a.setDate(a.getDate() - s), a.setHours(0, 0, 0, 0), a;
}
function Je(e, t) {
  return Oe(e, { ...t, weekStartsOn: 1 });
}
function An(e, t) {
  const n = _(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = J(n, 0);
  a.setFullYear(r + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const o = Je(a), s = J(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const c = Je(s);
  return n.getTime() >= o.getTime() ? r + 1 : n.getTime() >= c.getTime() ? r : r - 1;
}
function rn(e) {
  const t = _(e), n = new Date(
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
  const n = _(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function It(e, t, n) {
  const [r, a] = Ce(
    n == null ? void 0 : n.in,
    e,
    t
  ), o = Ge(r), s = Ge(a), c = +o - rn(o), l = +s - rn(s);
  return Math.round((c - l) / Wa);
}
function $a(e, t) {
  const n = An(e, t), r = J(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Je(r);
}
function Ea(e, t, n) {
  return Yn(e, t * 7, n);
}
function Pa(e, t, n) {
  return _n(e, t * 12, n);
}
function Ia(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((a) => {
    !r && typeof a == "object" && (r = J.bind(null, a));
    const o = _(a, r);
    (!n || n < o || isNaN(+o)) && (n = o);
  }), J(r, n || NaN);
}
function Fa(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((a) => {
    !r && typeof a == "object" && (r = J.bind(null, a));
    const o = _(a, r);
    (!n || n > o || isNaN(+o)) && (n = o);
  }), J(r, n || NaN);
}
function Ya(e, t, n) {
  const [r, a] = Ce(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +Ge(r) == +Ge(a);
}
function Bn(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function _a(e) {
  return !(!Bn(e) && typeof e != "number" || isNaN(+_(e)));
}
function zn(e, t, n) {
  const [r, a] = Ce(
    n == null ? void 0 : n.in,
    e,
    t
  ), o = r.getFullYear() - a.getFullYear(), s = r.getMonth() - a.getMonth();
  return o * 12 + s;
}
function Aa(e, t) {
  const n = _(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Rn(e, t) {
  const [n, r] = Ce(e, t.start, t.end);
  return { start: n, end: r };
}
function Ba(e, t) {
  const { start: n, end: r } = Rn(t == null ? void 0 : t.in, e);
  let a = +n > +r;
  const o = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let c = 1;
  const l = [];
  for (; +s <= o; )
    l.push(J(n, s)), s.setMonth(s.getMonth() + c);
  return a ? l.reverse() : l;
}
function za(e, t) {
  const n = _(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Ra(e, t) {
  const n = _(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Hn(e, t) {
  const n = _(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Ha(e, t) {
  const { start: n, end: r } = Rn(t == null ? void 0 : t.in, e);
  let a = +n > +r;
  const o = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let c = 1;
  const l = [];
  for (; +s <= o; )
    l.push(J(n, s)), s.setFullYear(s.getFullYear() + c);
  return a ? l.reverse() : l;
}
function Jn(e, t) {
  var c, l, d, f;
  const n = Le(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((f = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : f.weekStartsOn) ?? 0, a = _(e, t == null ? void 0 : t.in), o = a.getDay(), s = (o < r ? -7 : 0) + 6 - (o - r);
  return a.setDate(a.getDate() + s), a.setHours(23, 59, 59, 999), a;
}
function Ja(e, t) {
  return Jn(e, { ...t, weekStartsOn: 1 });
}
const Ga = {
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
}, qa = (e, t, n) => {
  let r;
  const a = Ga[e];
  return typeof a == "string" ? r = a : t === 1 ? r = a.one : r = a.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function wt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Va = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, La = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Xa = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Ka = {
  date: wt({
    formats: Va,
    defaultWidth: "full"
  }),
  time: wt({
    formats: La,
    defaultWidth: "full"
  }),
  dateTime: wt({
    formats: Xa,
    defaultWidth: "full"
  })
}, Ua = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Qa = (e, t, n, r) => Ua[e];
function Ee(e) {
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
    const o = e.argumentCallback ? e.argumentCallback(t) : t;
    return a[o];
  };
}
const Za = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, eo = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, to = {
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
}, no = {
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
}, ro = {
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
}, ao = {
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
}, oo = (e, t) => {
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
}, io = {
  ordinalNumber: oo,
  era: Ee({
    values: Za,
    defaultWidth: "wide"
  }),
  quarter: Ee({
    values: eo,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ee({
    values: to,
    defaultWidth: "wide"
  }),
  day: Ee({
    values: no,
    defaultWidth: "wide"
  }),
  dayPeriod: Ee({
    values: ro,
    defaultWidth: "wide",
    formattingValues: ao,
    defaultFormattingWidth: "wide"
  })
};
function Pe(e) {
  return (t, n = {}) => {
    const r = n.width, a = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], o = t.match(a);
    if (!o)
      return null;
    const s = o[0], c = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(c) ? co(c, (u) => u.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      so(c, (u) => u.test(s))
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
function so(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function co(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function lo(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const a = r[0], o = t.match(e.parsePattern);
    if (!o) return null;
    let s = e.valueCallback ? e.valueCallback(o[0]) : o[0];
    s = n.valueCallback ? n.valueCallback(s) : s;
    const c = t.slice(a.length);
    return { value: s, rest: c };
  };
}
const uo = /^(\d+)(th|st|nd|rd)?/i, fo = /\d+/i, ho = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, po = {
  any: [/^b/i, /^(a|c)/i]
}, mo = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, go = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, yo = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, vo = {
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
}, bo = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, xo = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, jo = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, wo = {
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
}, ko = {
  ordinalNumber: lo({
    matchPattern: uo,
    parsePattern: fo,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Pe({
    matchPatterns: ho,
    defaultMatchWidth: "wide",
    parsePatterns: po,
    defaultParseWidth: "any"
  }),
  quarter: Pe({
    matchPatterns: mo,
    defaultMatchWidth: "wide",
    parsePatterns: go,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Pe({
    matchPatterns: yo,
    defaultMatchWidth: "wide",
    parsePatterns: vo,
    defaultParseWidth: "any"
  }),
  day: Pe({
    matchPatterns: bo,
    defaultMatchWidth: "wide",
    parsePatterns: xo,
    defaultParseWidth: "any"
  }),
  dayPeriod: Pe({
    matchPatterns: jo,
    defaultMatchWidth: "any",
    parsePatterns: wo,
    defaultParseWidth: "any"
  })
}, De = {
  code: "en-US",
  formatDistance: qa,
  formatLong: Ka,
  formatRelative: Qa,
  localize: io,
  match: ko,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function So(e, t) {
  const n = _(e, t == null ? void 0 : t.in);
  return It(n, Hn(n)) + 1;
}
function Ft(e, t) {
  const n = _(e, t == null ? void 0 : t.in), r = +Je(n) - +$a(n);
  return Math.round(r / Fn) + 1;
}
function Gn(e, t) {
  var f, u, h, p;
  const n = _(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = Le(), o = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (f = t == null ? void 0 : t.locale) == null ? void 0 : f.options) == null ? void 0 : u.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((p = (h = a.locale) == null ? void 0 : h.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = J((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, o), s.setHours(0, 0, 0, 0);
  const c = Oe(s, t), l = J((t == null ? void 0 : t.in) || e, 0);
  l.setFullYear(r, 0, o), l.setHours(0, 0, 0, 0);
  const d = Oe(l, t);
  return +n >= +c ? r + 1 : +n >= +d ? r : r - 1;
}
function No(e, t) {
  var c, l, d, f;
  const n = Le(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((l = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : l.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((f = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1, a = Gn(e, t), o = J((t == null ? void 0 : t.in) || e, 0);
  return o.setFullYear(a, 0, r), o.setHours(0, 0, 0, 0), Oe(o, t);
}
function Yt(e, t) {
  const n = _(e, t == null ? void 0 : t.in), r = +Oe(n, t) - +No(n, t);
  return Math.round(r / Fn) + 1;
}
function Y(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const ve = {
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
    const a = Gn(e, r), o = a > 0 ? a : 1 - a;
    if (t === "YY") {
      const s = o % 100;
      return Y(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : Y(o, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = An(e);
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
    const a = Yt(e, r);
    return t === "wo" ? n.ordinalNumber(a, { unit: "week" }) : Y(a, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Ft(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : Y(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : ve.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = So(e);
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
    const a = e.getDay(), o = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(o);
      case "ee":
        return Y(o, 2);
      case "eo":
        return n.ordinalNumber(o, { unit: "day" });
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
    const a = e.getDay(), o = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(o);
      case "cc":
        return Y(o, t.length);
      case "co":
        return n.ordinalNumber(o, { unit: "day" });
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
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : Y(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : Y(r, t.length);
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
    return Y(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return Y(+e, t.length);
  }
};
function on(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = Math.trunc(r / 60), o = r % 60;
  return o === 0 ? n + String(a) : n + String(a) + t + Y(o, 2);
}
function sn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + Y(Math.abs(e) / 60, 2) : je(e, t);
}
function je(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = Y(Math.trunc(r / 60), 2), o = Y(r % 60, 2);
  return n + a + t + o;
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
}, qn = (e, t) => {
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
}, Mo = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], a = n[2];
  if (!a)
    return cn(e, t);
  let o;
  switch (r) {
    case "P":
      o = t.dateTime({ width: "short" });
      break;
    case "PP":
      o = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      o = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      o = t.dateTime({ width: "full" });
      break;
  }
  return o.replace("{{date}}", cn(r, t)).replace("{{time}}", qn(a, t));
}, Do = {
  p: qn,
  P: Mo
}, Oo = /^D+$/, Co = /^Y+$/, Wo = ["D", "DD", "YY", "YYYY"];
function To(e) {
  return Oo.test(e);
}
function $o(e) {
  return Co.test(e);
}
function Eo(e, t, n) {
  const r = Po(e, t, n);
  if (console.warn(r), Wo.includes(e)) throw new RangeError(r);
}
function Po(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Io = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Fo = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Yo = /^'([^]*?)'?$/, _o = /''/g, Ao = /[a-zA-Z]/;
function _e(e, t, n) {
  var f, u, h, p, x, b, k, y;
  const r = Le(), a = (n == null ? void 0 : n.locale) ?? r.locale ?? De, o = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((u = (f = n == null ? void 0 : n.locale) == null ? void 0 : f.options) == null ? void 0 : u.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((p = (h = r.locale) == null ? void 0 : h.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((b = (x = n == null ? void 0 : n.locale) == null ? void 0 : x.options) == null ? void 0 : b.weekStartsOn) ?? r.weekStartsOn ?? ((y = (k = r.locale) == null ? void 0 : k.options) == null ? void 0 : y.weekStartsOn) ?? 0, c = _(e, n == null ? void 0 : n.in);
  if (!_a(c))
    throw new RangeError("Invalid time value");
  let l = t.match(Fo).map((j) => {
    const v = j[0];
    if (v === "p" || v === "P") {
      const S = Do[v];
      return S(j, a.formatLong);
    }
    return j;
  }).join("").match(Io).map((j) => {
    if (j === "''")
      return { isToken: !1, value: "'" };
    const v = j[0];
    if (v === "'")
      return { isToken: !1, value: Bo(j) };
    if (an[v])
      return { isToken: !0, value: j };
    if (v.match(Ao))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + v + "`"
      );
    return { isToken: !1, value: j };
  });
  a.localize.preprocessor && (l = a.localize.preprocessor(c, l));
  const d = {
    firstWeekContainsDate: o,
    weekStartsOn: s,
    locale: a
  };
  return l.map((j) => {
    if (!j.isToken) return j.value;
    const v = j.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && $o(v) || !(n != null && n.useAdditionalDayOfYearTokens) && To(v)) && Eo(v, t, String(e));
    const S = an[v[0]];
    return S(c, v, a.localize, d);
  }).join("");
}
function Bo(e) {
  const t = e.match(Yo);
  return t ? t[1].replace(_o, "'") : e;
}
function zo(e, t) {
  const n = _(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = n.getMonth(), o = J(n, 0);
  return o.setFullYear(r, a + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
function Ro(e, t) {
  return _(e, t == null ? void 0 : t.in).getMonth();
}
function Ho(e, t) {
  return _(e, t == null ? void 0 : t.in).getFullYear();
}
function Jo(e, t) {
  return +_(e) > +_(t);
}
function Go(e, t) {
  return +_(e) < +_(t);
}
function qo(e, t, n) {
  const [r, a] = Ce(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === a.getFullYear() && r.getMonth() === a.getMonth();
}
function Vo(e, t, n) {
  const [r, a] = Ce(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === a.getFullYear();
}
function Lo(e, t, n) {
  const r = _(e, n == null ? void 0 : n.in), a = r.getFullYear(), o = r.getDate(), s = J(e, 0);
  s.setFullYear(a, t, 15), s.setHours(0, 0, 0, 0);
  const c = zo(s);
  return r.setMonth(t, Math.min(o, c)), r;
}
function Xo(e, t, n) {
  const r = _(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? J(e, NaN) : (r.setFullYear(t), r);
}
const ln = 5, Ko = 4;
function Uo(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, a = t.addDays(e, -r + 1), o = t.addDays(a, ln * 7 - 1);
  return t.getMonth(e) === t.getMonth(o) ? ln : Ko;
}
function Vn(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function Qo(e, t) {
  const n = Vn(e, t), r = Uo(e, t);
  return t.addDays(n, r * 7 - 1);
}
const Ln = {
  ...De,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let a;
      r && typeof r.format == "function" ? a = r.format.bind(r) : a = (s, c) => _e(s, c, { locale: De, ...n });
      let o = a(e, "PPPP");
      return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
    },
    labelMonthDropdown: "Choose the Month",
    labelNext: "Go to the Next Month",
    labelPrevious: "Go to the Previous Month",
    labelWeekNumber: (e) => `Week ${e}`,
    labelYearDropdown: "Choose the Year",
    labelGrid: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (a, o) => _e(a, o, { locale: De, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let a;
      r && typeof r.format == "function" ? a = r.format.bind(r) : a = (s, c) => _e(s, c, { locale: De, ...n });
      let o = a(e, "PPPP");
      return t != null && t.today && (o = `Today, ${o}`), o;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (a, o) => _e(a, o, { locale: De, ...t }), r(e, "cccc");
    }
  }
};
class U {
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
    }, this.newDate = (r, a, o) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, a, o) : this.options.timeZone ? new V(r, a, o, this.options.timeZone) : new Date(r, a, o);
    }, this.addDays = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addDays ? this.overrides.addDays(r, a) : Yn(r, a);
    }, this.addMonths = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addMonths ? this.overrides.addMonths(r, a) : _n(r, a);
    }, this.addWeeks = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addWeeks ? this.overrides.addWeeks(r, a) : Ea(r, a);
    }, this.addYears = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addYears ? this.overrides.addYears(r, a) : Pa(r, a);
    }, this.differenceInCalendarDays = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, a) : It(r, a);
    }, this.differenceInCalendarMonths = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, a) : zn(r, a);
    }, this.eachMonthOfInterval = (r) => {
      var a;
      return (a = this.overrides) != null && a.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Ba(r);
    }, this.eachYearOfInterval = (r) => {
      var c;
      const a = (c = this.overrides) != null && c.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Ha(r), o = new Set(a.map((l) => this.getYear(l)));
      if (o.size === a.length)
        return a;
      const s = [];
      return o.forEach((l) => {
        s.push(new Date(l, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Qo(r, this);
    }, this.endOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Ja(r);
    }, this.endOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfMonth ? this.overrides.endOfMonth(r) : Aa(r);
    }, this.endOfWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.endOfWeek ? this.overrides.endOfWeek(r, a) : Jn(r, this.options);
    }, this.endOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfYear ? this.overrides.endOfYear(r) : Ra(r);
    }, this.format = (r, a, o) => {
      var c;
      const s = (c = this.overrides) != null && c.format ? this.overrides.format(r, a, this.options) : _e(r, a, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.getISOWeek ? this.overrides.getISOWeek(r) : Ft(r);
    }, this.getMonth = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.getMonth ? this.overrides.getMonth(r, this.options) : Ro(r, this.options);
    }, this.getYear = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.getYear ? this.overrides.getYear(r, this.options) : Ho(r, this.options);
    }, this.getWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.getWeek ? this.overrides.getWeek(r, this.options) : Yt(r, this.options);
    }, this.isAfter = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isAfter ? this.overrides.isAfter(r, a) : Jo(r, a);
    }, this.isBefore = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isBefore ? this.overrides.isBefore(r, a) : Go(r, a);
    }, this.isDate = (r) => {
      var a;
      return (a = this.overrides) != null && a.isDate ? this.overrides.isDate(r) : Bn(r);
    }, this.isSameDay = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isSameDay ? this.overrides.isSameDay(r, a) : Ya(r, a);
    }, this.isSameMonth = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isSameMonth ? this.overrides.isSameMonth(r, a) : qo(r, a);
    }, this.isSameYear = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isSameYear ? this.overrides.isSameYear(r, a) : Vo(r, a);
    }, this.max = (r) => {
      var a;
      return (a = this.overrides) != null && a.max ? this.overrides.max(r) : Ia(r);
    }, this.min = (r) => {
      var a;
      return (a = this.overrides) != null && a.min ? this.overrides.min(r) : Fa(r);
    }, this.setMonth = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.setMonth ? this.overrides.setMonth(r, a) : Lo(r, a);
    }, this.setYear = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.setYear ? this.overrides.setYear(r, a) : Xo(r, a);
    }, this.startOfBroadcastWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Vn(r, this);
    }, this.startOfDay = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfDay ? this.overrides.startOfDay(r) : Ge(r);
    }, this.startOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Je(r);
    }, this.startOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfMonth ? this.overrides.startOfMonth(r) : za(r);
    }, this.startOfWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Oe(r, this.options);
    }, this.startOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfYear ? this.overrides.startOfYear(r) : Hn(r);
    }, this.options = { locale: Ln, ...t }, this.overrides = n;
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
    return t && U.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: a } = this.options, o = n == null ? void 0 : n.code;
    if (o && U.yearFirstLocales.has(o))
      try {
        return new Intl.DateTimeFormat(o, {
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
U.yearFirstLocales = /* @__PURE__ */ new Set([
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
const le = new U();
class Xn {
  constructor(t, n, r = le) {
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
class Zo {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class ei {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function ti(e) {
  return M.createElement("span", { ...e });
}
function ni(e) {
  const { size: t = 24, orientation: n = "left", className: r, style: a } = e;
  return M.createElement(
    "svg",
    { className: r, style: a, width: t, height: t, viewBox: "0 0 24 24" },
    n === "up" && M.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
    n === "down" && M.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
    n === "left" && M.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
    n === "right" && M.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
  );
}
function ri(e) {
  const { day: t, modifiers: n, ...r } = e;
  return M.createElement("td", { ...r });
}
function ai(e) {
  const { day: t, modifiers: n, ...r } = e, a = M.useRef(null);
  return M.useEffect(() => {
    var o;
    n.focused && ((o = a.current) == null || o.focus());
  }, [n.focused]), M.createElement("button", { ref: a, ...r });
}
var N;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(N || (N = {}));
var A;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(A || (A = {}));
var ne;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(ne || (ne = {}));
var K;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(K || (K = {}));
const Kn = Ve(void 0);
function ut() {
  const e = qe(Kn);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function oi(e) {
  const { options: t, className: n, ...r } = e, { classNames: a, components: o, styles: s } = ut(), c = [a[N.Dropdown], n].join(" "), l = t == null ? void 0 : t.find(({ value: d }) => d === r.value);
  return M.createElement(
    "span",
    { "data-disabled": r.disabled, className: a[N.DropdownRoot], style: s == null ? void 0 : s[N.DropdownRoot] },
    M.createElement(o.Select, { className: c, ...r }, t == null ? void 0 : t.map(({ value: d, label: f, disabled: u }) => M.createElement(o.Option, { key: d, value: d, disabled: u }, f))),
    M.createElement(
      "span",
      { className: a[N.CaptionLabel], style: s == null ? void 0 : s[N.CaptionLabel], "aria-hidden": !0 },
      l == null ? void 0 : l.label,
      M.createElement(o.Chevron, { orientation: "down", size: 18, className: a[N.Chevron], style: s == null ? void 0 : s[N.Chevron] })
    )
  );
}
function ii(e) {
  return M.createElement("div", { ...e });
}
function si(e) {
  return M.createElement("div", { ...e });
}
function ci(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return M.createElement("div", { ...r }, e.children);
}
function li(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return M.createElement("div", { ...r });
}
function di(e) {
  return M.createElement("table", { ...e });
}
function ui(e) {
  return M.createElement("div", { ...e });
}
function fi(e) {
  const { components: t } = ut();
  return M.createElement(t.Dropdown, { ...e });
}
function hi(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: a, ...o } = e, { components: s, classNames: c, styles: l, labels: { labelPrevious: d, labelNext: f } } = ut(), u = X((p) => {
    a && (n == null || n(p));
  }, [a, n]), h = X((p) => {
    r && (t == null || t(p));
  }, [r, t]);
  return M.createElement(
    "nav",
    { ...o },
    M.createElement(
      s.PreviousMonthButton,
      { type: "button", className: c[N.PreviousMonthButton], style: l == null ? void 0 : l[N.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": d(r), onClick: h },
      M.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: c[N.Chevron], style: l == null ? void 0 : l[N.Chevron], orientation: "left" })
    ),
    M.createElement(
      s.NextMonthButton,
      { type: "button", className: c[N.NextMonthButton], style: l == null ? void 0 : l[N.NextMonthButton], tabIndex: a ? void 0 : -1, "aria-disabled": a ? void 0 : !0, "aria-label": f(a), onClick: u },
      M.createElement(s.Chevron, { disabled: a ? void 0 : !0, orientation: "right", className: c[N.Chevron], style: l == null ? void 0 : l[N.Chevron] })
    )
  );
}
function pi(e) {
  return M.createElement("button", { ...e });
}
function mi(e) {
  return M.createElement("option", { ...e });
}
function gi(e) {
  return M.createElement("button", { ...e });
}
function yi(e) {
  const { rootRef: t, ...n } = e;
  return M.createElement("div", { ...n, ref: t });
}
function vi(e) {
  return M.createElement("select", { ...e });
}
function bi(e) {
  const { week: t, ...n } = e;
  return M.createElement("tr", { ...n });
}
function xi(e) {
  return M.createElement("th", { ...e });
}
function ji(e) {
  return M.createElement(
    "thead",
    { "aria-hidden": !0 },
    M.createElement("tr", { ...e })
  );
}
function wi(e) {
  const { week: t, ...n } = e;
  return M.createElement("th", { ...n });
}
function ki(e) {
  return M.createElement("th", { ...e });
}
function Si(e) {
  return M.createElement("tbody", { ...e });
}
function Ni(e) {
  const { components: t } = ut();
  return M.createElement(t.Dropdown, { ...e });
}
const Mi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CaptionLabel: ti,
  Chevron: ni,
  Day: ri,
  DayButton: ai,
  Dropdown: oi,
  DropdownNav: ii,
  Footer: si,
  Month: ci,
  MonthCaption: li,
  MonthGrid: di,
  Months: ui,
  MonthsDropdown: fi,
  Nav: hi,
  NextMonthButton: pi,
  Option: mi,
  PreviousMonthButton: gi,
  Root: yi,
  Select: vi,
  Week: bi,
  WeekNumber: wi,
  WeekNumberHeader: ki,
  Weekday: xi,
  Weekdays: ji,
  Weeks: Si,
  YearsDropdown: Ni
}, Symbol.toStringTag, { value: "Module" }));
function pe(e, t, n = !1, r = le) {
  let { from: a, to: o } = e;
  const { differenceInCalendarDays: s, isSameDay: c } = r;
  return a && o ? (s(o, a) < 0 && ([a, o] = [o, a]), s(t, a) >= (n ? 1 : 0) && s(o, t) >= (n ? 1 : 0)) : !n && o ? c(o, t) : !n && a ? c(a, t) : !1;
}
function _t(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function ft(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function At(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Bt(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Un(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Qn(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function me(e, t, n = le) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: a, differenceInCalendarDays: o, isAfter: s } = n;
  return r.some((c) => {
    if (typeof c == "boolean")
      return c;
    if (n.isDate(c))
      return a(e, c);
    if (Qn(c, n))
      return c.some((l) => a(e, l));
    if (ft(c))
      return pe(c, e, !1, n);
    if (Un(c))
      return Array.isArray(c.dayOfWeek) ? c.dayOfWeek.includes(e.getDay()) : c.dayOfWeek === e.getDay();
    if (_t(c)) {
      const l = o(c.before, e), d = o(c.after, e), f = l > 0, u = d < 0;
      return s(c.before, c.after) ? u && f : f || u;
    }
    return At(c) ? o(e, c.after) > 0 : Bt(c) ? o(c.before, e) > 0 : typeof c == "function" ? c(e) : !1;
  });
}
function Di(e, t, n, r, a) {
  const { disabled: o, hidden: s, modifiers: c, showOutsideDays: l, broadcastCalendar: d, today: f = a.today() } = t, { isSameDay: u, isSameMonth: h, startOfMonth: p, isBefore: x, endOfMonth: b, isAfter: k } = a, y = n && p(n), j = r && b(r), v = {
    [A.focused]: [],
    [A.outside]: [],
    [A.disabled]: [],
    [A.hidden]: [],
    [A.today]: []
  }, S = {};
  for (const w of e) {
    const { date: m, displayMonth: D } = w, O = !!(D && !h(m, D)), T = !!(y && x(m, y)), F = !!(j && k(m, j)), R = !!(o && me(m, o, a)), L = !!(s && me(m, s, a)) || T || F || // Broadcast calendar will show outside days as default
    !d && !l && O || d && l === !1 && O, G = u(m, f);
    O && v.outside.push(w), R && v.disabled.push(w), L && v.hidden.push(w), G && v.today.push(w), c && Object.keys(c).forEach((q) => {
      const ye = c == null ? void 0 : c[q];
      ye && me(m, ye, a) && (S[q] ? S[q].push(w) : S[q] = [w]);
    });
  }
  return (w) => {
    const m = {
      [A.focused]: !1,
      [A.disabled]: !1,
      [A.hidden]: !1,
      [A.outside]: !1,
      [A.today]: !1
    }, D = {};
    for (const O in v) {
      const T = v[O];
      m[O] = T.some((F) => F === w);
    }
    for (const O in S)
      D[O] = S[O].some((T) => T === w);
    return {
      ...m,
      // custom modifiers should override all the previous ones
      ...D
    };
  };
}
function Oi(e, t, n = {}) {
  return Object.entries(e).filter(([, a]) => a === !0).reduce((a, [o]) => (n[o] ? a.push(n[o]) : t[A[o]] ? a.push(t[A[o]]) : t[ne[o]] && a.push(t[ne[o]]), a), [t[N.Day]]);
}
function Ci(e) {
  return {
    ...Mi,
    ...e
  };
}
function Wi(e) {
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
function Ti() {
  const e = {};
  for (const t in N)
    e[N[t]] = `rdp-${N[t]}`;
  for (const t in A)
    e[A[t]] = `rdp-${A[t]}`;
  for (const t in ne)
    e[ne[t]] = `rdp-${ne[t]}`;
  for (const t in K)
    e[K[t]] = `rdp-${K[t]}`;
  return e;
}
function $i(e, t, n) {
  return (n ?? new U(t)).formatMonthYear(e);
}
function Ei(e, t, n) {
  return (n ?? new U(t)).format(e, "d");
}
function Pi(e, t = le) {
  return t.format(e, "LLLL");
}
function Ii(e, t, n) {
  return (n ?? new U(t)).format(e, "cccccc");
}
function Fi(e, t = le) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Yi() {
  return "";
}
function _i(e, t = le) {
  return t.format(e, "yyyy");
}
const Ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: $i,
  formatDay: Ei,
  formatMonthDropdown: Pi,
  formatWeekNumber: Fi,
  formatWeekNumberHeader: Yi,
  formatWeekdayName: Ii,
  formatYearDropdown: _i
}, Symbol.toStringTag, { value: "Module" }));
function Bi(e) {
  return {
    ...Ai,
    ...e
  };
}
function Zn(e, t, n, r) {
  let a = (r ?? new U(n)).format(e, "PPPP");
  return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
}
function er(e, t, n) {
  return (n ?? new U(t)).formatMonthYear(e);
}
function tr(e, t, n, r) {
  let a = (r ?? new U(n)).format(e, "PPPP");
  return t != null && t.today && (a = `Today, ${a}`), a;
}
function nr(e) {
  return "Choose the Month";
}
function rr() {
  return "";
}
const zi = "Go to the Next Month";
function ar(e, t) {
  return zi;
}
function or(e) {
  return "Go to the Previous Month";
}
function ir(e, t, n) {
  return (n ?? new U(t)).format(e, "cccc");
}
function sr(e, t) {
  return `Week ${e}`;
}
function cr(e) {
  return "Week Number";
}
function lr(e) {
  return "Choose the Year";
}
const Ri = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelDayButton: Zn,
  labelGrid: er,
  labelGridcell: tr,
  labelMonthDropdown: nr,
  labelNav: rr,
  labelNext: ar,
  labelPrevious: or,
  labelWeekNumber: sr,
  labelWeekNumberHeader: cr,
  labelWeekday: ir,
  labelYearDropdown: lr
}, Symbol.toStringTag, { value: "Module" })), te = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function Hi(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...Ri,
    ...e ?? {},
    labelDayButton: te(Zn, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: te(nr, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: te(ar, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: te(or, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: te(sr, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: te(lr, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: te(er, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: te(tr, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: te(rr, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: te(cr, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: te(ir, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function Ji(e, t, n, r, a) {
  const { startOfMonth: o, startOfYear: s, endOfYear: c, eachMonthOfInterval: l, getMonth: d } = a;
  return l({
    start: s(e),
    end: c(e)
  }).map((h) => {
    const p = r.formatMonthDropdown(h, a), x = d(h), b = t && h < o(t) || n && h > o(n) || !1;
    return { value: x, label: p, disabled: b };
  });
}
function Gi(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[N.Day] };
  return Object.entries(e).filter(([, a]) => a === !0).forEach(([a]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[a]
    };
  }), r;
}
function qi(e, t, n, r) {
  const a = r ?? e.today(), o = n ? e.startOfBroadcastWeek(a, e) : t ? e.startOfISOWeek(a) : e.startOfWeek(a), s = [];
  for (let c = 0; c < 7; c++) {
    const l = e.addDays(o, c);
    s.push(l);
  }
  return s;
}
function Vi(e, t, n, r, a = !1) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: s, eachYearOfInterval: c, getYear: l } = r, d = o(e), f = s(t), u = c({ start: d, end: f });
  return a && u.reverse(), u.map((h) => {
    const p = n.formatYearDropdown(h, r);
    return {
      value: l(h),
      label: p,
      disabled: !1
    };
  });
}
function Li(e, t = {}) {
  var c;
  const { weekStartsOn: n, locale: r } = t, a = n ?? ((c = r == null ? void 0 : r.options) == null ? void 0 : c.weekStartsOn) ?? 0, o = (l) => {
    const d = typeof l == "number" || typeof l == "string" ? new Date(l) : l;
    return new V(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, e);
  }, s = (l) => {
    const d = o(l);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => o(V.tz(e)),
    newDate: (l, d, f) => new V(l, d, f, 12, 0, 0, e),
    startOfDay: (l) => o(l),
    startOfWeek: (l, d) => {
      const f = o(l), u = (d == null ? void 0 : d.weekStartsOn) ?? a, h = (f.getDay() - u + 7) % 7;
      return f.setDate(f.getDate() - h), f;
    },
    startOfISOWeek: (l) => {
      const d = o(l), f = (d.getDay() - 1 + 7) % 7;
      return d.setDate(d.getDate() - f), d;
    },
    startOfMonth: (l) => {
      const d = o(l);
      return d.setDate(1), d;
    },
    startOfYear: (l) => {
      const d = o(l);
      return d.setMonth(0, 1), d;
    },
    endOfWeek: (l, d) => {
      const f = o(l), p = ((((d == null ? void 0 : d.weekStartsOn) ?? a) + 6) % 7 - f.getDay() + 7) % 7;
      return f.setDate(f.getDate() + p), f;
    },
    endOfISOWeek: (l) => {
      const d = o(l), f = (7 - d.getDay()) % 7;
      return d.setDate(d.getDate() + f), d;
    },
    endOfMonth: (l) => {
      const d = o(l);
      return d.setMonth(d.getMonth() + 1, 0), d;
    },
    endOfYear: (l) => {
      const d = o(l);
      return d.setMonth(11, 31), d;
    },
    eachMonthOfInterval: (l) => {
      const d = o(l.start), f = o(l.end), u = [], h = new V(d.getFullYear(), d.getMonth(), 1, 12, 0, 0, e), p = f.getFullYear() * 12 + f.getMonth();
      for (; h.getFullYear() * 12 + h.getMonth() <= p; )
        u.push(new V(h, e)), h.setMonth(h.getMonth() + 1, 1);
      return u;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (l, d) => {
      const f = o(l);
      return f.setDate(f.getDate() + d), f;
    },
    addWeeks: (l, d) => {
      const f = o(l);
      return f.setDate(f.getDate() + d * 7), f;
    },
    addMonths: (l, d) => {
      const f = o(l);
      return f.setMonth(f.getMonth() + d), f;
    },
    addYears: (l, d) => {
      const f = o(l);
      return f.setFullYear(f.getFullYear() + d), f;
    },
    eachYearOfInterval: (l) => {
      const d = o(l.start), f = o(l.end), u = [], h = new V(d.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; h.getFullYear() <= f.getFullYear(); )
        u.push(new V(h, e)), h.setFullYear(h.getFullYear() + 1, 0, 1);
      return u;
    },
    getWeek: (l, d) => {
      var u;
      const f = s(l);
      return Yt(f, {
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
      return It(f, u);
    },
    differenceInCalendarMonths: (l, d) => {
      const f = s(l), u = s(d);
      return zn(f, u);
    }
  };
}
const Xe = (e) => e instanceof HTMLElement ? e : null, kt = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Xi = (e) => Xe(e.querySelector("[data-animated-month]")), St = (e) => Xe(e.querySelector("[data-animated-caption]")), Nt = (e) => Xe(e.querySelector("[data-animated-weeks]")), Ki = (e) => Xe(e.querySelector("[data-animated-nav]")), Ui = (e) => Xe(e.querySelector("[data-animated-weekdays]"));
function Qi(e, t, { classNames: n, months: r, focused: a, dateLib: o }) {
  const s = ge(null), c = ge(r), l = ge(!1);
  Ur(() => {
    const d = c.current;
    if (c.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const f = o.isSameMonth(r[0].date, d[0].date), u = o.isAfter(r[0].date, d[0].date), h = u ? n[K.caption_after_enter] : n[K.caption_before_enter], p = u ? n[K.weeks_after_enter] : n[K.weeks_before_enter], x = s.current, b = e.current.cloneNode(!0);
    if (b instanceof HTMLElement ? (kt(b).forEach((v) => {
      if (!(v instanceof HTMLElement))
        return;
      const S = Xi(v);
      S && v.contains(S) && v.removeChild(S);
      const w = St(v);
      w && w.classList.remove(h);
      const m = Nt(v);
      m && m.classList.remove(p);
    }), s.current = b) : s.current = null, l.current || f || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    a)
      return;
    const k = x instanceof HTMLElement ? kt(x) : [], y = kt(e.current);
    if (y != null && y.every((j) => j instanceof HTMLElement) && (k != null && k.every((j) => j instanceof HTMLElement))) {
      l.current = !0, e.current.style.isolation = "isolate";
      const j = Ki(e.current);
      j && (j.style.zIndex = "1"), y.forEach((v, S) => {
        const w = k[S];
        if (!w)
          return;
        v.style.position = "relative", v.style.overflow = "hidden";
        const m = St(v);
        m && m.classList.add(h);
        const D = Nt(v);
        D && D.classList.add(p);
        const O = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), j && (j.style.zIndex = ""), m && m.classList.remove(h), D && D.classList.remove(p), v.style.position = "", v.style.overflow = "", v.contains(w) && v.removeChild(w);
        };
        w.style.pointerEvents = "none", w.style.position = "absolute", w.style.overflow = "hidden", w.setAttribute("aria-hidden", "true");
        const T = Ui(w);
        T && (T.style.opacity = "0");
        const F = St(w);
        F && (F.classList.add(u ? n[K.caption_before_exit] : n[K.caption_after_exit]), F.addEventListener("animationend", O));
        const R = Nt(w);
        R && R.classList.add(u ? n[K.weeks_before_exit] : n[K.weeks_after_exit]), v.insertBefore(w, v.firstChild);
      });
    }
  });
}
function Zi(e, t, n, r) {
  const a = e[0], o = e[e.length - 1], { ISOWeek: s, fixedWeeks: c, broadcastCalendar: l } = n ?? {}, { addDays: d, differenceInCalendarDays: f, differenceInCalendarMonths: u, endOfBroadcastWeek: h, endOfISOWeek: p, endOfMonth: x, endOfWeek: b, isAfter: k, startOfBroadcastWeek: y, startOfISOWeek: j, startOfWeek: v } = r, S = l ? y(a, r) : s ? j(a) : v(a), w = l ? h(o) : s ? p(x(o)) : b(x(o)), m = t && (l ? h(t) : s ? p(t) : b(t)), D = m && k(w, m) ? m : w, O = f(D, S), T = u(o, a) + 1, F = [];
  for (let G = 0; G <= O; G++) {
    const q = d(S, G);
    F.push(q);
  }
  const L = (l ? 35 : 42) * T;
  if (c && F.length < L) {
    const G = L - F.length;
    for (let q = 0; q < G; q++) {
      const ye = d(F[F.length - 1], 1);
      F.push(ye);
    }
  }
  return F;
}
function es(e) {
  const t = [];
  return e.reduce((n, r) => {
    const a = r.weeks.reduce((o, s) => o.concat(s.days.slice()), t.slice());
    return n.concat(a.slice());
  }, t.slice());
}
function ts(e, t, n, r) {
  const { numberOfMonths: a = 1 } = n, o = [];
  for (let s = 0; s < a; s++) {
    const c = r.addMonths(e, s);
    if (t && c > t)
      break;
    o.push(c);
  }
  return o;
}
function dn(e, t, n, r) {
  const { month: a, defaultMonth: o, today: s = r.today(), numberOfMonths: c = 1 } = e;
  let l = a || o || s;
  const { differenceInCalendarMonths: d, addMonths: f, startOfMonth: u } = r;
  if (n && d(n, l) < c - 1) {
    const h = -1 * (c - 1);
    l = f(n, h);
  }
  return t && d(l, t) < 0 && (l = t), u(l);
}
function ns(e, t, n, r) {
  const { addDays: a, endOfBroadcastWeek: o, endOfISOWeek: s, endOfMonth: c, endOfWeek: l, getISOWeek: d, getWeek: f, startOfBroadcastWeek: u, startOfISOWeek: h, startOfWeek: p } = r, x = e.reduce((b, k) => {
    const y = n.broadcastCalendar ? u(k, r) : n.ISOWeek ? h(k) : p(k), j = n.broadcastCalendar ? o(k) : n.ISOWeek ? s(c(k)) : l(c(k)), v = t.filter((D) => D >= y && D <= j), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && v.length < S) {
      const D = t.filter((O) => {
        const T = S - v.length;
        return O > j && O <= a(j, T);
      });
      v.push(...D);
    }
    const w = v.reduce((D, O) => {
      const T = n.ISOWeek ? d(O) : f(O), F = D.find((L) => L.weekNumber === T), R = new Xn(O, k, r);
      return F ? F.days.push(R) : D.push(new ei(T, [R])), D;
    }, []), m = new Zo(k, w);
    return b.push(m), b;
  }, []);
  return n.reverseMonths ? x.reverse() : x;
}
function rs(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: a, startOfDay: o, startOfMonth: s, endOfMonth: c, addYears: l, endOfYear: d, today: f } = t, u = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : !n && u && (n = a(l(e.today ?? f(), -100))), r ? r = c(r) : !r && u && (r = d(e.today ?? f())), [
    n && o(n),
    r && o(r)
  ];
}
function as(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: o = 1 } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: l } = r, d = a ? o : 1, f = s(e);
  if (!t)
    return c(f, d);
  if (!(l(t, e) < o))
    return c(f, d);
}
function os(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: o } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: l } = r, d = a ? o ?? 1 : 1, f = s(e);
  if (!t)
    return c(f, -d);
  if (!(l(f, t) <= 0))
    return c(f, -d);
}
function is(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function ht(e, t) {
  const [n, r] = E(e);
  return [t === void 0 ? n : t, r];
}
function ss(e, t) {
  var S;
  const [n, r] = rs(e, t), { startOfMonth: a, endOfMonth: o } = t, s = dn(e, n, r, t), [c, l] = ht(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  re(() => {
    const w = dn(e, n, r, t);
    l(w);
  }, [e.timeZone]);
  const { months: d, weeks: f, days: u, previousMonth: h, nextMonth: p } = Re(() => {
    const w = ts(c, r, { numberOfMonths: e.numberOfMonths }, t), m = Zi(w, e.endMonth ? o(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), D = ns(w, m, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), O = is(D), T = es(D), F = os(c, n, e, t), R = as(c, r, e, t);
    return {
      months: D,
      weeks: O,
      days: T,
      previousMonth: F,
      nextMonth: R
    };
  }, [
    t,
    c.getTime(),
    r == null ? void 0 : r.getTime(),
    n == null ? void 0 : n.getTime(),
    e.disableNavigation,
    e.broadcastCalendar,
    (S = e.endMonth) == null ? void 0 : S.getTime(),
    e.fixedWeeks,
    e.ISOWeek,
    e.numberOfMonths,
    e.pagedNavigation,
    e.reverseMonths
  ]), { disableNavigation: x, onMonthChange: b } = e, k = (w) => f.some((m) => m.days.some((D) => D.isEqualTo(w))), y = (w) => {
    if (x)
      return;
    let m = a(w);
    n && m < a(n) && (m = a(n)), r && m > a(r) && (m = a(r)), l(m), b == null || b(m);
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
var ie;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(ie || (ie = {}));
function un(e) {
  return !e[A.disabled] && !e[A.hidden] && !e[A.outside];
}
function cs(e, t, n, r) {
  let a, o = -1;
  for (const s of e) {
    const c = t(s);
    un(c) && (c[A.focused] && o < ie.FocusedModifier ? (a = s, o = ie.FocusedModifier) : r != null && r.isEqualTo(s) && o < ie.LastFocused ? (a = s, o = ie.LastFocused) : n(s.date) && o < ie.Selected ? (a = s, o = ie.Selected) : c[A.today] && o < ie.Today && (a = s, o = ie.Today));
  }
  return a || (a = e.find((s) => un(t(s)))), a;
}
function ls(e, t, n, r, a, o, s) {
  const { ISOWeek: c, broadcastCalendar: l } = o, { addDays: d, addMonths: f, addWeeks: u, addYears: h, endOfBroadcastWeek: p, endOfISOWeek: x, endOfWeek: b, max: k, min: y, startOfBroadcastWeek: j, startOfISOWeek: v, startOfWeek: S } = s;
  let m = {
    day: d,
    week: u,
    month: f,
    year: h,
    startOfWeek: (D) => l ? j(D, s) : c ? v(D) : S(D),
    endOfWeek: (D) => l ? p(D) : c ? x(D) : b(D)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? m = k([r, m]) : t === "after" && a && (m = y([a, m])), m;
}
function dr(e, t, n, r, a, o, s, c = 0) {
  if (c > 365)
    return;
  const l = ls(e, t, n.date, r, a, o, s), d = !!(o.disabled && me(l, o.disabled, s)), f = !!(o.hidden && me(l, o.hidden, s)), u = l, h = new Xn(l, u, s);
  return !d && !f ? h : dr(e, t, h, r, a, o, s, c + 1);
}
function ds(e, t, n, r, a) {
  const { autoFocus: o } = e, [s, c] = E(), l = cs(t.days, n, r || (() => !1), s), [d, f] = E(o ? l : void 0);
  return {
    isFocusTarget: (b) => !!(l != null && l.isEqualTo(b)),
    setFocused: f,
    focused: d,
    blur: () => {
      c(d), f(void 0);
    },
    moveFocus: (b, k) => {
      if (!d)
        return;
      const y = dr(b, k, d, t.navStart, t.navEnd, e, a);
      y && (e.disableNavigation && !t.days.some((v) => v.isEqualTo(y)) || (t.goToDay(y), f(y)));
    }
  };
}
function us(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [o, s] = ht(n, a ? n : void 0), c = a ? n : o, { isSameDay: l } = t, d = (p) => (c == null ? void 0 : c.some((x) => l(x, p))) ?? !1, { min: f, max: u } = e;
  return {
    selected: c,
    select: (p, x, b) => {
      let k = [...c ?? []];
      if (d(p)) {
        if ((c == null ? void 0 : c.length) === f || r && (c == null ? void 0 : c.length) === 1)
          return;
        k = c == null ? void 0 : c.filter((y) => !l(y, p));
      } else
        (c == null ? void 0 : c.length) === u ? k = [p] : k = [...k, p];
      return a || s(k), a == null || a(k, p, x, b), k;
    },
    isSelected: d
  };
}
function fs(e, t, n = 0, r = 0, a = !1, o = le) {
  const { from: s, to: c } = t || {}, { isSameDay: l, isAfter: d, isBefore: f } = o;
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
    const h = o.differenceInCalendarDays(u.to, u.from);
    r > 0 && h > r ? u = { from: e, to: void 0 } : n > 1 && h < n && (u = { from: e, to: void 0 });
  }
  return u;
}
function hs(e, t, n = le) {
  const r = Array.isArray(t) ? t : [t];
  let a = e.from;
  const o = n.differenceInCalendarDays(e.to, e.from), s = Math.min(o, 6);
  for (let c = 0; c <= s; c++) {
    if (r.includes(a.getDay()))
      return !0;
    a = n.addDays(a, 1);
  }
  return !1;
}
function fn(e, t, n = le) {
  return pe(e, t.from, !1, n) || pe(e, t.to, !1, n) || pe(t, e.from, !1, n) || pe(t, e.to, !1, n);
}
function ps(e, t, n = le) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((c) => typeof c != "function").some((c) => typeof c == "boolean" ? c : n.isDate(c) ? pe(e, c, !1, n) : Qn(c, n) ? c.some((l) => pe(e, l, !1, n)) : ft(c) ? c.from && c.to ? fn(e, { from: c.from, to: c.to }, n) : !1 : Un(c) ? hs(e, c.dayOfWeek, n) : _t(c) ? n.isAfter(c.before, c.after) ? fn(e, {
    from: n.addDays(c.after, 1),
    to: n.addDays(c.before, -1)
  }, n) : me(e.from, c, n) || me(e.to, c, n) : At(c) || Bt(c) ? me(e.from, c, n) || me(e.to, c, n) : !1))
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
function ms(e, t) {
  const { disabled: n, excludeDisabled: r, resetOnSelect: a, selected: o, required: s, onSelect: c } = e, [l, d] = ht(o, c ? o : void 0), f = c ? o : l;
  return {
    selected: f,
    select: (p, x, b) => {
      const { min: k, max: y } = e;
      let j;
      if (p) {
        const v = f == null ? void 0 : f.from, S = f == null ? void 0 : f.to, w = !!v && !!S, m = !!v && !!S && t.isSameDay(v, S) && t.isSameDay(p, v);
        a && (w || !(f != null && f.from)) ? !s && m ? j = void 0 : j = { from: p, to: void 0 } : j = fs(p, f, k, y, s, t);
      }
      return r && n && (j != null && j.from) && j.to && ps({ from: j.from, to: j.to }, n, t) && (j.from = p, j.to = void 0), c || d(j), c == null || c(j, p, x, b), j;
    },
    isSelected: (p) => f && pe(f, p, !1, t)
  };
}
function gs(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [o, s] = ht(n, a ? n : void 0), c = a ? n : o, { isSameDay: l } = t;
  return {
    selected: c,
    select: (u, h, p) => {
      let x = u;
      return !r && c && c && l(u, c) && (x = void 0), a || s(x), a == null || a(x, u, h, p), x;
    },
    isSelected: (u) => c ? l(c, u) : !1
  };
}
function ys(e, t) {
  const n = gs(e, t), r = us(e, t), a = ms(e, t);
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
function Q(e, t) {
  return e instanceof V && e.timeZone === t ? e : new V(e, t);
}
function Ne(e, t, n) {
  return Q(e, t);
}
function hn(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? Ne(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? Ne(r, t) : r) : ft(e) ? {
    ...e,
    from: e.from ? Q(e.from, t) : e.from,
    to: e.to ? Q(e.to, t) : e.to
  } : _t(e) ? {
    before: Ne(e.before, t),
    after: Ne(e.after, t)
  } : At(e) ? {
    after: Ne(e.after, t)
  } : Bt(e) ? {
    before: Ne(e.before, t)
  } : e;
}
function Mt(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => hn(r, t)) : hn(e, t));
}
function ur(e) {
  var Lt;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = Q(t.today, n)), t.month && (t.month = Q(t.month, n)), t.defaultMonth && (t.defaultMonth = Q(t.defaultMonth, n)), t.startMonth && (t.startMonth = Q(t.startMonth, n)), t.endMonth && (t.endMonth = Q(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = Q(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = (Lt = t.selected) == null ? void 0 : Lt.map((C) => Q(C, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? Q(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? Q(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = Mt(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Mt(t.hidden, n)), t.modifiers)) {
    const C = {};
    Object.keys(t.modifiers).forEach(($) => {
      var W;
      C[$] = Mt((W = t.modifiers) == null ? void 0 : W[$], n);
    }), t.modifiers = C;
  }
  const { components: r, formatters: a, labels: o, dateLib: s, locale: c, classNames: l } = Re(() => {
    const C = { ...Ln, ...t.locale }, $ = t.broadcastCalendar ? 1 : t.weekStartsOn, W = t.noonSafe && t.timeZone ? Li(t.timeZone, {
      weekStartsOn: $,
      locale: C
    }) : void 0, z = t.dateLib && W ? { ...W, ...t.dateLib } : t.dateLib ?? W, I = new U({
      locale: C,
      weekStartsOn: $,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, z);
    return {
      dateLib: I,
      components: Ci(t.components),
      formatters: Bi(t.formatters),
      labels: Hi(t.labels, I.options),
      locale: C,
      classNames: { ...Ti(), ...t.classNames }
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
  const { captionLayout: d, mode: f, navLayout: u, numberOfMonths: h = 1, onDayBlur: p, onDayClick: x, onDayFocus: b, onDayKeyDown: k, onDayMouseEnter: y, onDayMouseLeave: j, onNextClick: v, onPrevClick: S, showWeekNumber: w, styles: m } = t, { formatCaption: D, formatDay: O, formatMonthDropdown: T, formatWeekNumber: F, formatWeekNumberHeader: R, formatWeekdayName: L, formatYearDropdown: G } = a, q = ss(t, s), { days: ye, months: be, navStart: pt, navEnd: mt, previousMonth: Z, nextMonth: ee, goToMonth: de } = q, gt = Di(ye, t, pt, mt, s), { isSelected: We, select: Te, selected: Ke } = ys(t, s) ?? {}, { blur: Rt, focused: Ue, isFocusTarget: Sr, moveFocus: Ht, setFocused: Qe } = ds(t, q, gt, We ?? (() => !1), s), { labelDayButton: Nr, labelGridcell: Mr, labelGrid: Dr, labelMonthDropdown: Or, labelNav: Jt, labelPrevious: Cr, labelNext: Wr, labelWeekday: Tr, labelWeekNumber: $r, labelWeekNumberHeader: Er, labelYearDropdown: Pr } = o, Ir = Re(() => qi(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), Gt = f !== void 0 || x !== void 0, yt = X(() => {
    Z && (de(Z), S == null || S(Z));
  }, [Z, de, S]), vt = X(() => {
    ee && (de(ee), v == null || v(ee));
  }, [de, ee, v]), Fr = X((C, $) => (W) => {
    W.preventDefault(), W.stopPropagation(), Qe(C), !$.disabled && (Te == null || Te(C.date, $, W), x == null || x(C.date, $, W));
  }, [Te, x, Qe]), Yr = X((C, $) => (W) => {
    Qe(C), b == null || b(C.date, $, W);
  }, [b, Qe]), _r = X((C, $) => (W) => {
    Rt(), p == null || p(C.date, $, W);
  }, [Rt, p]), Ar = X((C, $) => (W) => {
    const z = {
      ArrowLeft: [
        W.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        W.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [W.shiftKey ? "year" : "week", "after"],
      ArrowUp: [W.shiftKey ? "year" : "week", "before"],
      PageUp: [W.shiftKey ? "year" : "month", "before"],
      PageDown: [W.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (z[W.key]) {
      W.preventDefault(), W.stopPropagation();
      const [I, ae] = z[W.key];
      Ht(I, ae);
    }
    k == null || k(C.date, $, W);
  }, [Ht, k, t.dir]), Br = X((C, $) => (W) => {
    y == null || y(C.date, $, W);
  }, [y]), zr = X((C, $) => (W) => {
    j == null || j(C.date, $, W);
  }, [j]), Rr = X((C, $) => (W) => {
    const z = Number(W.target.value), I = s.setMonth(s.startOfMonth(C), z);
    de(s.addMonths(I, -$));
  }, [s, de]), Hr = X((C, $) => (W) => {
    const z = Number(W.target.value), I = s.setYear(s.startOfMonth(C), z);
    de(s.addMonths(I, -$));
  }, [s, de]), { className: Jr, style: Gr } = Re(() => ({
    className: [l[N.Root], t.className].filter(Boolean).join(" "),
    style: { ...m == null ? void 0 : m[N.Root], ...t.style }
  }), [l, t.className, t.style, m]), qr = Wi(t), qt = (C) => {
    const $ = m == null ? void 0 : m[N.Dropdown], W = m == null ? void 0 : m[C];
    if (!(!$ && !W))
      return {
        ...$,
        ...W
      };
  }, Vt = ge(null);
  Qi(Vt, !!t.animate, {
    classNames: l,
    months: be,
    focused: Ue,
    dateLib: s
  });
  const Vr = {
    dayPickerProps: t,
    selected: Ke,
    select: Te,
    isSelected: We,
    months: be,
    nextMonth: ee,
    previousMonth: Z,
    goToMonth: de,
    getModifiers: gt,
    components: r,
    classNames: l,
    styles: m,
    labels: o,
    formatters: a
  };
  return M.createElement(
    Kn.Provider,
    { value: Vr },
    M.createElement(
      r.Root,
      { rootRef: t.animate ? Vt : void 0, className: Jr, style: Gr, dir: t.dir, id: t.id, lang: t.lang ?? c.code, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...qr },
      M.createElement(
        r.Months,
        { className: l[N.Months], style: m == null ? void 0 : m[N.Months] },
        !t.hideNavigation && !u && M.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[N.Nav], style: m == null ? void 0 : m[N.Nav], "aria-label": Jt(), onPreviousClick: yt, onNextClick: vt, previousMonth: Z, nextMonth: ee }),
        be.map((C, $) => {
          const W = t.reverseMonths ? be.length - 1 - $ : $;
          return M.createElement(
            r.Month,
            {
              "data-animated-month": t.animate ? "true" : void 0,
              className: l[N.Month],
              style: m == null ? void 0 : m[N.Month],
              // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
              key: $,
              displayIndex: $,
              calendarMonth: C
            },
            u === "around" && !t.hideNavigation && $ === 0 && M.createElement(
              r.PreviousMonthButton,
              { type: "button", className: l[N.PreviousMonthButton], style: m == null ? void 0 : m[N.PreviousMonthButton], tabIndex: Z ? void 0 : -1, "aria-disabled": Z ? void 0 : !0, "aria-label": Cr(Z), onClick: yt, "data-animated-button": t.animate ? "true" : void 0 },
              M.createElement(r.Chevron, { disabled: Z ? void 0 : !0, className: l[N.Chevron], style: m == null ? void 0 : m[N.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
            ),
            M.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: l[N.MonthCaption], style: m == null ? void 0 : m[N.MonthCaption], calendarMonth: C, displayIndex: $ }, d != null && d.startsWith("dropdown") ? M.createElement(
              r.DropdownNav,
              { className: l[N.Dropdowns], style: m == null ? void 0 : m[N.Dropdowns] },
              (() => {
                const z = d === "dropdown" || d === "dropdown-months" ? M.createElement(r.MonthsDropdown, { key: "month", className: l[N.MonthsDropdown], "aria-label": Or(), disabled: !!t.disableNavigation, onChange: Rr(C.date, W), options: Ji(C.date, pt, mt, a, s), style: qt(N.MonthsDropdown), value: s.getMonth(C.date) }) : M.createElement("span", { key: "month" }, T(C.date, s)), I = d === "dropdown" || d === "dropdown-years" ? M.createElement(r.YearsDropdown, { key: "year", className: l[N.YearsDropdown], "aria-label": Pr(s.options), disabled: !!t.disableNavigation, onChange: Hr(C.date, W), options: Vi(pt, mt, a, s, !!t.reverseYears), style: qt(N.YearsDropdown), value: s.getYear(C.date) }) : M.createElement("span", { key: "year" }, G(C.date, s));
                return s.getMonthYearOrder() === "year-first" ? [I, z] : [z, I];
              })(),
              M.createElement("span", { role: "status", "aria-live": "polite", style: {
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
              } }, D(C.date, s.options, s))
            ) : M.createElement(r.CaptionLabel, { className: l[N.CaptionLabel], style: m == null ? void 0 : m[N.CaptionLabel], role: "status", "aria-live": "polite" }, D(C.date, s.options, s))),
            u === "around" && !t.hideNavigation && $ === h - 1 && M.createElement(
              r.NextMonthButton,
              { type: "button", className: l[N.NextMonthButton], style: m == null ? void 0 : m[N.NextMonthButton], tabIndex: ee ? void 0 : -1, "aria-disabled": ee ? void 0 : !0, "aria-label": Wr(ee), onClick: vt, "data-animated-button": t.animate ? "true" : void 0 },
              M.createElement(r.Chevron, { disabled: ee ? void 0 : !0, className: l[N.Chevron], style: m == null ? void 0 : m[N.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
            ),
            $ === h - 1 && u === "after" && !t.hideNavigation && M.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: l[N.Nav], style: m == null ? void 0 : m[N.Nav], "aria-label": Jt(), onPreviousClick: yt, onNextClick: vt, previousMonth: Z, nextMonth: ee }),
            M.createElement(
              r.MonthGrid,
              { role: "grid", "aria-multiselectable": f === "multiple" || f === "range", "aria-label": Dr(C.date, s.options, s) || void 0, className: l[N.MonthGrid], style: m == null ? void 0 : m[N.MonthGrid] },
              !t.hideWeekdays && M.createElement(
                r.Weekdays,
                { "data-animated-weekdays": t.animate ? "true" : void 0, className: l[N.Weekdays], style: m == null ? void 0 : m[N.Weekdays] },
                w && M.createElement(r.WeekNumberHeader, { "aria-label": Er(s.options), className: l[N.WeekNumberHeader], style: m == null ? void 0 : m[N.WeekNumberHeader], scope: "col" }, R()),
                Ir.map((z) => M.createElement(r.Weekday, { "aria-label": Tr(z, s.options, s), className: l[N.Weekday], key: String(z), style: m == null ? void 0 : m[N.Weekday], scope: "col" }, L(z, s.options, s)))
              ),
              M.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: l[N.Weeks], style: m == null ? void 0 : m[N.Weeks] }, C.weeks.map((z) => M.createElement(
                r.Week,
                { className: l[N.Week], key: z.weekNumber, style: m == null ? void 0 : m[N.Week], week: z },
                w && M.createElement(r.WeekNumber, { week: z, style: m == null ? void 0 : m[N.WeekNumber], "aria-label": $r(z.weekNumber, {
                  locale: c
                }), className: l[N.WeekNumber], scope: "row", role: "rowheader" }, F(z.weekNumber, s)),
                z.days.map((I) => {
                  const { date: ae } = I, P = gt(I);
                  if (P[A.focused] = !P.hidden && !!(Ue != null && Ue.isEqualTo(I)), P[ne.selected] = (We == null ? void 0 : We(ae)) || P.selected, ft(Ke)) {
                    const { from: bt, to: xt } = Ke;
                    P[ne.range_start] = !!(bt && xt && s.isSameDay(ae, bt)), P[ne.range_end] = !!(bt && xt && s.isSameDay(ae, xt)), P[ne.range_middle] = pe(Ke, ae, !0, s);
                  }
                  const Lr = Gi(P, m, t.modifiersStyles), Xr = Oi(P, l, t.modifiersClassNames), Kr = !Gt && !P.hidden ? Mr(ae, P, s.options, s) : void 0;
                  return M.createElement(r.Day, { key: `${I.isoDate}_${I.displayMonthId}`, day: I, modifiers: P, className: Xr.join(" "), style: Lr, role: "gridcell", "aria-selected": P.selected || void 0, "aria-label": Kr, "data-day": I.isoDate, "data-month": I.outside ? I.dateMonthId : void 0, "data-selected": P.selected || void 0, "data-disabled": P.disabled || void 0, "data-hidden": P.hidden || void 0, "data-outside": I.outside || void 0, "data-focused": P.focused || void 0, "data-today": P.today || void 0 }, !P.hidden && Gt ? M.createElement(r.DayButton, { className: l[N.DayButton], style: m == null ? void 0 : m[N.DayButton], type: "button", day: I, modifiers: P, disabled: !P.focused && P.disabled || void 0, "aria-disabled": P.focused && P.disabled || void 0, tabIndex: Sr(I) ? 0 : -1, "aria-label": Nr(ae, P, s.options, s), onClick: Fr(I, P), onBlur: _r(I, P), onFocus: Yr(I, P), onKeyDown: Ar(I, P), onMouseEnter: Br(I, P), onMouseLeave: zr(I, P) }, O(ae, s.options, s)) : !P.hidden && O(I.date, s.options, s));
                })
              )))
            )
          );
        })
      ),
      t.footer && M.createElement(r.Footer, { className: l[N.Footer], style: m == null ? void 0 : m[N.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function vs(e) {
  return e ? e.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}
function $c({
  value: e,
  onChange: t,
  placeholder: n = "Select date",
  disabled: r = !1,
  minDate: a,
  maxDate: o
}) {
  const [s, c] = E(!1), l = ge(null);
  re(() => {
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
    ...o ? [{ after: o }] : []
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
          /* @__PURE__ */ i("span", { style: { fontSize: 10 }, children: "◈" }),
          /* @__PURE__ */ i("span", { children: vs(e) || n })
        ]
      }
    ),
    s && /* @__PURE__ */ i("div", { style: f, children: /* @__PURE__ */ i(
      ur,
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
function Ec({
  value: e,
  onChange: t,
  placeholder: n = "Select range",
  disabled: r = !1
}) {
  const [a, o] = E({}), [s, c] = E(!1), l = ge(null), d = e !== void 0 ? e : a;
  re(() => {
    if (!s) return;
    function x(b) {
      l.current && !l.current.contains(b.target) && c(!1);
    }
    return document.addEventListener("mousedown", x), () => document.removeEventListener("mousedown", x);
  }, [s]);
  function f(x) {
    const b = x ?? {};
    e === void 0 && o(b), t == null || t(b);
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
          r || c((x) => !x);
        },
        children: [
          /* @__PURE__ */ i("span", { style: { fontSize: 10 }, children: "◈" }),
          /* @__PURE__ */ i("span", { children: u })
        ]
      }
    ),
    s && /* @__PURE__ */ i("div", { style: {
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
    }, children: /* @__PURE__ */ i(
      ur,
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
function Pc({
  value: e,
  onChange: t,
  disabled: n = !1,
  format: r = "24h"
}) {
  const [a, o] = E(e ? e.split(":")[0] : ""), [s, c] = E(e ? e.split(":")[1] : "");
  re(() => {
    e && (o(e.split(":")[0]), c(e.split(":")[1]));
  }, [e]);
  const l = r === "12h" ? 12 : 23;
  function d(h) {
    const p = mn(parseInt(h || "0", 10), 0, l), x = gn(p);
    o(x), t == null || t(`${x}:${s || "00"}`);
  }
  function f(h) {
    const p = mn(parseInt(h || "0", 10), 0, 59), x = gn(p);
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
    /* @__PURE__ */ i(
      "input",
      {
        type: "number",
        min: 0,
        max: l,
        value: a,
        placeholder: "HH",
        disabled: n,
        onChange: (h) => o(h.target.value),
        onBlur: (h) => d(h.target.value),
        style: u
      }
    ),
    /* @__PURE__ */ i("span", { style: { color: "var(--j-accent)", fontFamily: "'Courier New', monospace", fontSize: 16, userSelect: "none" }, children: ":" }),
    /* @__PURE__ */ i(
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
}, bs = {
  angular: { clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" },
  hex: { clipPath: "polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)", paddingLeft: 14, paddingRight: 14 },
  diamond: { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0 },
  pill: { borderRadius: "999px" }
}, xs = {
  amber: { background: "var(--j-amber)" },
  red: { background: "var(--j-red)" },
  green: { background: "var(--j-green)" }
};
function fr({ color: e = "cyan", size: t = "sm", shape: n = "angular", blink: r = !1, showDot: a = !1, children: o }) {
  const s = {
    display: "inline-flex",
    alignItems: "center",
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    fontFamily: "'Courier New', monospace",
    ...yn[e] ?? yn.cyan,
    ...vn[t] ?? vn.sm,
    ...bs[n]
  };
  return /* @__PURE__ */ g("span", { className: r ? "j-blink" : void 0, style: s, children: [
    a && /* @__PURE__ */ i(
      "span",
      {
        className: "j-status-dot",
        style: { marginRight: 5, display: "inline-block", flexShrink: 0, ...xs[e] ?? {} }
      }
    ),
    o
  ] });
}
const bn = {
  active: { bg: "var(--j-accent-08)", accent: "var(--j-accent)" },
  processing: { bg: "var(--j-accent-08)", accent: "var(--j-accent)" },
  warning: { bg: "var(--j-warn-05)", accent: "var(--j-warn)" },
  error: { bg: "var(--j-err-05)", accent: "var(--j-err)" },
  success: { bg: "var(--j-ok-05)", accent: "var(--j-ok)" },
  idle: { bg: "var(--j-accent-05)", accent: "var(--j-accent-18)" }
}, js = {
  warning: { background: "var(--j-amber)", animationDuration: "1.8s" },
  error: { background: "var(--j-red)", animationDuration: "0.7s" },
  success: { background: "var(--j-green)", animationDuration: "2.5s" },
  idle: { background: "var(--j-accent-25)", animation: "none" }
};
function ws({ state: e = "active", blink: t = !1, children: n }) {
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
        /* @__PURE__ */ i("span", { className: "j-status-dot", style: js[e] }),
        /* @__PURE__ */ i("span", { style: { fontSize: 11, letterSpacing: "0.08em", color: a }, children: n })
      ]
    }
  );
}
const xn = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10], ks = {
  warning: "var(--j-amber)",
  error: "var(--j-red)",
  success: "var(--j-green)"
}, Ss = {
  height: 5,
  background: "var(--j-accent-08)",
  clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
  position: "relative",
  overflow: "hidden"
};
function Ns({
  value: e = 0,
  label: t,
  state: n = "active",
  variant: r = "bar",
  indeterminate: a = !1,
  showPercent: o = !0,
  total: s = 16
}) {
  const c = t && /* @__PURE__ */ g("div", { style: { fontSize: 9, color: "var(--j-accent-50)", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 4, display: "flex", justifyContent: "space-between" }, children: [
    /* @__PURE__ */ i("span", { children: t }),
    o && !a && /* @__PURE__ */ g("span", { style: { color: "var(--j-text-primary)" }, children: [
      e,
      "%"
    ] })
  ] });
  if (r === "ticks") {
    const l = Math.round(e / 100 * s), d = ks[n];
    return /* @__PURE__ */ g("div", { children: [
      c,
      /* @__PURE__ */ i("div", { className: "j-tick-row", children: Array.from({ length: s }, (f, u) => /* @__PURE__ */ i(
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
    /* @__PURE__ */ i("div", { style: Ss, children: a ? /* @__PURE__ */ g(B, { children: [
      /* @__PURE__ */ i("div", { style: { position: "absolute", inset: 0, background: "var(--j-accent)", opacity: 0.15, clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)" } }),
      /* @__PURE__ */ i("div", { style: { position: "absolute", top: 0, left: -40, bottom: 0, width: 40, background: "linear-gradient(90deg, transparent, var(--j-accent), transparent)", animation: "j-scan-h 1.4s ease-in-out infinite" } })
    ] }) : /* @__PURE__ */ i("div", { style: { width: `${e}%`, height: "100%", background: "linear-gradient(90deg, var(--j-accent-deep), var(--j-accent))", clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)", transition: "width 0.6s ease-out" } }) })
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
function Ic({ orientation: e = "horizontal", label: t, showDot: n = !0, height: r = "40px", margin: a = "8px 0", opacity: o = 0.3 }) {
  const s = "var(--j-accent)";
  return e === "vertical" ? /* @__PURE__ */ g("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", height: r, margin: "0 8px" }, children: [
    /* @__PURE__ */ i("div", { style: { flex: 1, width: 1, background: `linear-gradient(180deg, transparent, ${s})`, opacity: o } }),
    n && /* @__PURE__ */ i("div", { style: { ...jn, margin: "6px 0" } }),
    /* @__PURE__ */ i("div", { style: { flex: 1, width: 1, background: `linear-gradient(180deg, ${s}, transparent)`, opacity: o } })
  ] }) : /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", margin: a, width: "100%" }, children: [
    /* @__PURE__ */ i("div", { style: { flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${s})`, opacity: o } }),
    t ? /* @__PURE__ */ i("span", { style: { fontSize: 8, color: s, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0 10px", opacity: 0.7, whiteSpace: "nowrap" }, children: t }) : n && /* @__PURE__ */ i("div", { style: { ...jn, margin: "0 8px" } }),
    /* @__PURE__ */ i("div", { style: { flex: 1, height: 1, background: `linear-gradient(90deg, ${s}, transparent)`, opacity: o } })
  ] });
}
function Fc({ variant: e = "chip", text: t, subText: n, value: r, color: a = "cyan", showDot: o = !0, showLine: s = !0 }) {
  const c = H.cls("j-hl", `j-hl-${e}`, H.color(a));
  let l;
  switch (e) {
    case "chip":
      l = /* @__PURE__ */ g("div", { className: "j-hl-chip", children: [
        o && /* @__PURE__ */ i("span", { className: "j-hl-pip" }),
        /* @__PURE__ */ i("span", { className: "j-hl-text", children: t }),
        r && /* @__PURE__ */ i("span", { className: "j-hl-val", children: r }),
        s && /* @__PURE__ */ i("div", { className: "j-hl-line-h" })
      ] });
      break;
    case "callout":
      l = /* @__PURE__ */ g("div", { className: "j-hl-callout", children: [
        /* @__PURE__ */ g("div", { className: "j-hl-callout-inner", children: [
          n && /* @__PURE__ */ i("div", { className: "j-hl-sub", children: n }),
          /* @__PURE__ */ i("div", { className: "j-hl-main", children: t })
        ] }),
        s && /* @__PURE__ */ g("div", { className: "j-hl-callout-line", children: [
          /* @__PURE__ */ i("div", { className: "j-hl-line-seg" }),
          /* @__PURE__ */ i("div", { className: "j-hl-line-dot" })
        ] })
      ] });
      break;
    case "circuit":
      l = /* @__PURE__ */ g("div", { className: "j-hl-circuit", children: [
        /* @__PURE__ */ g("div", { className: "j-hl-cir-bracket", children: [
          /* @__PURE__ */ i("div", { className: "j-hl-cir-label", children: t }),
          r && /* @__PURE__ */ i("div", { className: "j-hl-cir-val", children: r })
        ] }),
        s && /* @__PURE__ */ g("div", { className: "j-hl-cir-arm", children: [
          /* @__PURE__ */ i("div", { className: "j-hl-cir-node" }),
          /* @__PURE__ */ i("div", { className: "j-hl-cir-track" }),
          /* @__PURE__ */ i("div", { className: "j-hl-cir-node j-hl-cir-node-end" })
        ] })
      ] });
      break;
    case "badge":
      l = /* @__PURE__ */ g("div", { className: "j-hl-badge", children: [
        /* @__PURE__ */ i("div", { className: "j-hl-badge-ring", children: /* @__PURE__ */ i("span", { className: "j-hl-badge-val", children: r ?? t }) }),
        /* @__PURE__ */ i("div", { className: "j-hl-badge-label", children: t })
      ] });
      break;
    case "panel":
      l = /* @__PURE__ */ g("div", { className: "j-hl-panel", children: [
        /* @__PURE__ */ i("div", { className: "j-hl-panel-top", children: n && /* @__PURE__ */ i("span", { className: "j-hl-panel-sub", children: n }) }),
        /* @__PURE__ */ g("div", { className: "j-hl-panel-body", children: [
          /* @__PURE__ */ i("span", { className: "j-hl-panel-main", children: t }),
          r && /* @__PURE__ */ i("span", { className: "j-hl-panel-val", children: r })
        ] }),
        /* @__PURE__ */ i("div", { className: "j-hl-panel-scan" })
      ] });
      break;
  }
  return /* @__PURE__ */ i("div", { className: c, children: l });
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
}, Ms = {
  warning: "⚠",
  error: "✕",
  success: "✓"
}, Ds = {
  error: "j-pulse 0.8s ease-in-out infinite",
  warning: "j-pulse 1.5s ease-in-out infinite"
};
function Yc({ state: e = "active", title: t, children: n, dismissible: r = !1, blink: a = !1, onDismiss: o }) {
  const [s, c] = E(!0);
  if (!s) return null;
  const l = wn[e] ?? wn.active, d = kn[e] ?? kn.active, f = Ms[e] ?? "ℹ", u = Ds[e];
  function h() {
    c(!1), o == null || o();
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
        /* @__PURE__ */ i("div", { style: {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 2,
          background: l,
          boxShadow: `0 0 8px ${l}`,
          ...u ? { animation: u } : {}
        } }),
        /* @__PURE__ */ i("span", { style: { fontStyle: "normal", fontSize: 13, flexShrink: 0, color: l, textShadow: `0 0 8px ${l}` }, children: f }),
        /* @__PURE__ */ g("div", { style: { flex: 1, fontSize: 11, color: l, letterSpacing: "0.04em", lineHeight: 1.5 }, children: [
          t && /* @__PURE__ */ i("div", { style: { fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 2 }, children: t }),
          n
        ] }),
        r && /* @__PURE__ */ i(
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
const Os = {
  warning: "linear-gradient(90deg, var(--j-warn-12), var(--j-warn))",
  error: "linear-gradient(90deg, var(--j-err-12),  var(--j-err))",
  success: "linear-gradient(90deg, var(--j-ok-12),   var(--j-ok))"
}, Cs = {
  warning: "var(--j-amber)",
  error: "var(--j-red)",
  success: "var(--j-green)"
};
function Ws({ label: e, value: t, barPercent: n, state: r = "active" }) {
  const a = Os[r], o = Cs[r];
  return /* @__PURE__ */ g("div", { className: "j-data-row", children: [
    /* @__PURE__ */ i("span", { className: "j-data-key", children: e }),
    n !== void 0 && /* @__PURE__ */ i("div", { className: "j-data-bar", children: /* @__PURE__ */ i(
      "div",
      {
        className: "j-data-bar-fill",
        style: {
          "--j-w": `${n}%`,
          ...a ? { background: a } : {}
        }
      }
    ) }),
    /* @__PURE__ */ i("span", { className: "j-data-val", style: o ? { color: o } : void 0, children: t })
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
function _c({ open: e, onClose: t, title: n, subTitle: r, closable: a = !0, closeOnBackdrop: o = !0, width: s = "480px", notchSize: c = "18px", children: l, footer: d }) {
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
  return ea(
    /* @__PURE__ */ g(B, { children: [
      /* @__PURE__ */ i(
        "div",
        {
          "data-testid": "j-modal-backdrop",
          onClick: o ? t : void 0,
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
        /* @__PURE__ */ i("div", { style: { position: "absolute", left: 0, right: 0, height: 1, top: -1, background: "linear-gradient(90deg, transparent, var(--j-cyan), transparent)", animation: "j-scan-v 3s ease-in-out infinite", pointerEvents: "none" } }),
        /* @__PURE__ */ i("div", { style: Ze({ top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 }) }),
        /* @__PURE__ */ i("div", { style: Ze({ top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 }) }),
        /* @__PURE__ */ i("div", { style: Ze({ bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 }) }),
        /* @__PURE__ */ i("div", { style: Ze({ bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 }) }),
        /* @__PURE__ */ i("div", { style: { position: "absolute", top: 0, left: 0, border: `${c} solid transparent`, borderTopColor: "var(--j-accent)", borderLeftColor: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", pointerEvents: "none" } }),
        /* @__PURE__ */ g("div", { style: { padding: "14px 18px 10px", borderBottom: "1px solid var(--j-accent-12)", display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ g("div", { children: [
            r && /* @__PURE__ */ i("div", { style: { fontSize: 8, color: "var(--j-accent)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 3, opacity: 0.7 }, children: r }),
            /* @__PURE__ */ i("div", { style: { fontSize: 13, fontWeight: 600, color: "var(--j-text-primary)", letterSpacing: "0.10em", textTransform: "uppercase" }, children: n })
          ] }),
          a && /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: t,
              style: { background: "transparent", border: "none", cursor: "pointer", color: "var(--j-text-muted)", fontSize: 16, padding: 0, fontFamily: "inherit" },
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { style: { padding: "16px 18px", color: "var(--j-text-secondary)", fontSize: 12, lineHeight: 1.6, letterSpacing: "0.04em" }, children: l }),
        d && /* @__PURE__ */ i("div", { style: { padding: "10px 18px 14px", borderTop: "1px solid var(--j-accent-08)", display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }, children: d })
      ] })
    ] }),
    document.body
  );
}
const hr = Ve(null);
function Ac() {
  const e = qe(hr);
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
}, Ts = {
  warning: "⚠",
  error: "✕",
  success: "✓"
}, $s = {
  error: "j-pulse 0.7s ease-in-out infinite",
  warning: "j-pulse 1.3s ease-in-out infinite"
};
function Es({ id: e, state: t, message: n, title: r, duration: a, onDismiss: o }) {
  const s = Sn[t] ?? Sn.active, c = Ts[t] ?? "ℹ", l = $s[t];
  return re(() => {
    if (a <= 0) return;
    const d = setTimeout(o, a);
    return () => clearTimeout(d);
  }, [a, o]), /* @__PURE__ */ g(
    "div",
    {
      onClick: o,
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
        /* @__PURE__ */ i("div", { style: { position: "absolute", top: 0, bottom: 0, left: 0, width: 2, background: s, boxShadow: `0 0 8px ${s}`, ...l ? { animation: l } : {} } }),
        /* @__PURE__ */ i("div", { style: { position: "absolute", left: 0, right: 0, height: 1, top: -1, background: `linear-gradient(90deg, transparent, ${s}, transparent)`, animation: "j-scan-v 2.5s ease-in-out infinite", pointerEvents: "none" } }),
        /* @__PURE__ */ i("div", { style: { position: "absolute", top: 0, right: 0, width: 0, height: 0, border: "8px solid transparent", borderTopColor: s, borderRightColor: s, opacity: 0.5 } }),
        /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 14px 10px 16px" }, children: [
          /* @__PURE__ */ i("span", { style: { fontStyle: "normal", fontSize: 13, color: s, flexShrink: 0, filter: `drop-shadow(0 0 4px ${s})` }, children: c }),
          /* @__PURE__ */ g("div", { style: { flex: 1, minWidth: 0 }, children: [
            r && /* @__PURE__ */ i("div", { style: { fontSize: 9, color: s, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2, fontWeight: 600 }, children: r }),
            /* @__PURE__ */ i("div", { style: { fontSize: 11, color: "var(--j-text-secondary)", letterSpacing: "0.04em", lineHeight: 1.4 }, children: n })
          ] })
        ] }),
        a > 0 && /* @__PURE__ */ i("div", { style: { height: 2, background: `color-mix(in srgb, ${s} 8%, transparent)`, position: "relative", overflow: "hidden" }, children: /* @__PURE__ */ i("div", { style: { position: "absolute", top: 0, left: 0, height: "100%", background: `linear-gradient(90deg, color-mix(in srgb, ${s} 80%, transparent), ${s})`, animation: `j-bar-grow ${a}ms linear forwards`, "--j-w": "100%" } }) })
      ]
    }
  );
}
function Bc({ children: e }) {
  const [t, n] = E([]), r = ge(0);
  function a(s, c, l, d = 4e3) {
    const f = `toast-${++r.current}`;
    return n((u) => [...u, { id: f, state: s, message: c, title: l, duration: d }]), f;
  }
  function o(s) {
    n((c) => c.filter((l) => l.id !== s));
  }
  return /* @__PURE__ */ g(hr.Provider, { value: { show: a, dismiss: o }, children: [
    e,
    /* @__PURE__ */ i("div", { style: { position: "fixed", bottom: 24, right: 24, zIndex: 2e3, display: "flex", flexDirection: "column-reverse", gap: 8, pointerEvents: "none", width: 320 }, children: t.map((s) => /* @__PURE__ */ i(Es, { ...s, onDismiss: () => o(s.id) }, s.id)) })
  ] });
}
const Ps = {
  warning: "j-text-warn",
  error: "j-text-err",
  success: "j-text-ok"
}, Is = {
  warning: { background: "var(--j-amber)" },
  error: { background: "var(--j-red)" },
  success: { background: "var(--j-green)" }
};
function zc({
  cardStyle: e = "CornerBracket",
  color: t = "cyan",
  padding: n = "14px 16px",
  title: r,
  value: a,
  sub: o,
  state: s = "active",
  badge: c,
  badgeColor: l = "cyan",
  showStatusDot: d = !1,
  barValue: f,
  dataRows: u,
  children: h
}) {
  const p = H.cls("j-text-val", Ps[s] ?? null), x = Is[s];
  return /* @__PURE__ */ g(xa, { cardStyle: e, color: t, padding: n, children: [
    /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }, children: [
      /* @__PURE__ */ i("div", { className: "j-text-xs", children: r }),
      c && /* @__PURE__ */ i(fr, { color: l, size: "xs", children: c })
    ] }),
    /* @__PURE__ */ i("div", { className: p, children: a }),
    o && /* @__PURE__ */ g("div", { className: "j-text-sub", style: { display: "flex", alignItems: "center", gap: 4 }, children: [
      d && /* @__PURE__ */ i("span", { className: "j-status-dot", style: x }),
      o
    ] }),
    f !== void 0 && /* @__PURE__ */ i("div", { style: { marginTop: 8 }, children: /* @__PURE__ */ i(Ns, { value: f, variant: "bar", showPercent: !1 }) }),
    u && u.length > 0 && /* @__PURE__ */ i("div", { style: { marginTop: 8 }, children: u.map((b) => /* @__PURE__ */ i(Ws, { label: b.label, value: b.value, barPercent: b.barPercent }, b.label)) }),
    h
  ] });
}
const pr = Ve(null);
function Fs() {
  return qe(pr);
}
function Rc({ activeTab: e, onTabChange: t, children: n }) {
  var f;
  const r = [];
  Qr.forEach(n, (u) => {
    if (Zr(u) && u.type._isJTab) {
      const h = u.props;
      r.push({ key: h.tabKey, label: h.label, icon: h.icon, badge: h.badge, disabled: h.disabled });
    }
  });
  const [a, o] = E(null), s = ((f = r.find((u) => !u.disabled)) == null ? void 0 : f.key) ?? "", c = e ?? a ?? s;
  function l(u) {
    e === void 0 && o(u), t == null || t(u);
  }
  function d(u, h) {
    var k, y, j, v, S;
    const p = r.filter((w) => !w.disabled), x = p.findIndex((w) => w.key === h);
    let b;
    if (u.key === "ArrowRight") b = (k = p[(x + 1) % p.length]) == null ? void 0 : k.key;
    else if (u.key === "ArrowLeft") b = (y = p[(x - 1 + p.length) % p.length]) == null ? void 0 : y.key;
    else if (u.key === "Home") b = (j = p[0]) == null ? void 0 : j.key;
    else if (u.key === "End") b = (v = p[p.length - 1]) == null ? void 0 : v.key;
    else return;
    u.preventDefault(), b && (l(b), (S = document.getElementById(`tab-${b}`)) == null || S.focus());
  }
  return /* @__PURE__ */ g(pr.Provider, { value: { activeTab: c, selectTab: l }, children: [
    /* @__PURE__ */ i(
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
                u.icon && /* @__PURE__ */ i("span", { style: {
                  fontStyle: "normal",
                  fontSize: 13,
                  ...h ? { filter: "drop-shadow(0 0 4px var(--j-accent))" } : {}
                }, children: u.icon }),
                /* @__PURE__ */ i("span", { children: u.label }),
                u.badge && /* @__PURE__ */ i("span", { style: {
                  fontSize: 8,
                  padding: "1px 5px",
                  background: "var(--j-accent-12)",
                  color: "var(--j-accent-mid)",
                  clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)"
                }, children: u.badge }),
                h && /* @__PURE__ */ i("div", { style: {
                  position: "absolute",
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "var(--j-accent)",
                  boxShadow: "0 0 8px var(--j-accent)",
                  overflow: "hidden"
                }, children: /* @__PURE__ */ i("div", { style: {
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
    /* @__PURE__ */ i("div", { style: { paddingTop: 4 }, children: n })
  ] });
}
function Ys({ tabKey: e, children: t }) {
  const n = Fs();
  return !n || n.activeTab !== e ? null : /* @__PURE__ */ i(
    "div",
    {
      role: "tabpanel",
      id: `panel-${e}`,
      "aria-labelledby": `tab-${e}`,
      children: t
    }
  );
}
Ys._isJTab = !0;
function _s(e, t) {
  return e === "warning" ? "var(--j-warn)" : e === "error" ? "var(--j-err)" : e === "success" ? "var(--j-ok)" : t === "amber" ? "var(--j-warn)" : t === "red" ? "var(--j-err)" : "var(--j-accent)";
}
function Hc({
  title: e,
  icon: t,
  badge: n,
  defaultOpen: r = !1,
  isOpen: a,
  onIsOpenChange: o,
  state: s = "active",
  color: c = "cyan",
  children: l
}) {
  const [d, f] = E(r), u = En(), h = a !== void 0 ? a : d, p = _s(s, c);
  function x() {
    const b = !h;
    a === void 0 && f(b), o == null || o(b);
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
        onClick: x,
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
          /* @__PURE__ */ i("div", { style: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 2,
            background: p,
            boxShadow: `0 0 8px ${p}`,
            clipPath: "polygon(0 6px, 2px 0, 2px 100%, 0 calc(100% - 6px))"
          } }),
          t && /* @__PURE__ */ i("span", { style: {
            fontStyle: "normal",
            fontSize: 13,
            color: p,
            filter: `drop-shadow(0 0 4px ${p})`,
            flexShrink: 0
          }, children: t }),
          /* @__PURE__ */ i("span", { style: {
            flex: 1,
            fontSize: 11,
            color: h ? "var(--j-text-primary)" : "var(--j-text-secondary)",
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            transition: "color 0.2s"
          }, children: e }),
          n && /* @__PURE__ */ i("span", { style: {
            fontSize: 8,
            color: p,
            background: `${p}18`,
            padding: "1px 6px",
            clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)"
          }, children: n }),
          /* @__PURE__ */ i("div", { style: {
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
          /* @__PURE__ */ i("div", { style: {
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
function As(e, t, n) {
  const r = Math.floor(n / 2);
  let a = Math.max(1, e - r), o = Math.min(t, a + n - 1);
  a = Math.max(1, o - n + 1);
  const s = [];
  a > 1 && (s.push(1), a > 2 && s.push(-1));
  for (let c = a; c <= o; c++) s.push(c);
  return o < t && (o < t - 1 && s.push(-1), s.push(t)), s;
}
const mr = {
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
    ...mr,
    background: "transparent",
    border: `1px solid ${e ? "var(--j-accent-08)" : "var(--j-accent-18)"}`,
    color: e ? "var(--j-accent-18)" : "var(--j-text-muted)",
    cursor: e ? "not-allowed" : "pointer"
  };
}
function Bs(e) {
  return {
    ...mr,
    background: e ? "var(--j-accent-12)" : "transparent",
    border: `1px solid ${e ? "var(--j-accent)" : "var(--j-accent-18)"}`,
    color: e ? "var(--j-accent)" : "var(--j-text-muted)",
    boxShadow: e ? "0 0 8px var(--j-accent-44)" : "none"
  };
}
function Jc({
  page: e,
  onPageChange: t,
  totalPages: n,
  showFirstLast: r = !1,
  showInfo: a = !0,
  pageSize: o = 5
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
        r && /* @__PURE__ */ i("button", { type: "button", disabled: s, onClick: () => l(1), style: et(s), children: "«" }),
        /* @__PURE__ */ i("button", { type: "button", disabled: s, onClick: () => l(e - 1), style: et(s), children: "‹" }),
        n <= 10 ? (
          /* Tick bar mode */
          /* @__PURE__ */ i("div", { style: { display: "flex", alignItems: "flex-end", gap: 3 }, children: Array.from({ length: n }, (d, f) => {
            const u = f + 1, h = u === e;
            return /* @__PURE__ */ i(
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
          /* @__PURE__ */ i(B, { children: As(e, n, o).map(
            (d, f) => d === -1 ? /* @__PURE__ */ i(
              "span",
              {
                style: { color: "var(--j-text-dim)", fontSize: 10, padding: "0 4px" },
                children: "···"
              },
              `ellipsis-${f}`
            ) : /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                "aria-current": d === e ? "page" : void 0,
                onClick: () => l(d),
                style: Bs(d === e),
                children: d
              },
              d
            )
          ) })
        ),
        /* @__PURE__ */ i("button", { type: "button", disabled: c, onClick: () => l(e + 1), style: et(c), children: "›" }),
        r && /* @__PURE__ */ i("button", { type: "button", disabled: c, onClick: () => l(n), style: et(c), children: "»" }),
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
function Gc({
  level: e,
  totalArcs: t = 6,
  color: n = "cyan",
  orientation: r = "horizontal",
  showLabel: a = !1,
  label: o = "LEVEL",
  showValue: s = !1,
  arcWidth: c = "8px",
  arcGap: l = "3px"
}) {
  const d = r === "vertical";
  function f(h) {
    const p = h < e, x = h === e - 1 && e > 0, b = Nn[h % Nn.length], k = d ? { width: b, height: 4 } : { width: c, height: b };
    let y, j, v;
    return x ? (y = "linear-gradient(0deg, var(--j-accent-12), var(--j-accent))", j = "0 0 10px var(--j-accent), 0 0 20px var(--j-accent-25)", v = "j-pulse 0.6s ease-in-out infinite") : p ? (y = "var(--j-accent)", j = "0 0 5px var(--j-accent-25)", v = void 0) : (y = "var(--j-accent-05)", j = "none", v = void 0), {
      ...k,
      background: y,
      boxShadow: j,
      clipPath: "polygon(1px 15%, 100% 0, 100% 100%, 1px 85%)",
      transition: "background 0.1s, box-shadow 0.1s",
      ...v ? { animation: v } : {}
    };
  }
  return /* @__PURE__ */ g("div", { style: { display: "inline-flex", flexDirection: "column", alignItems: "center" }, children: [
    a && /* @__PURE__ */ i("div", { style: {
      fontSize: 8,
      color: "var(--j-accent-12)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginBottom: 4,
      textAlign: "center",
      fontFamily: "'Courier New', monospace"
    }, children: o }),
    /* @__PURE__ */ i("div", { style: d ? { display: "flex", flexDirection: "column-reverse", alignItems: "center", gap: l } : { display: "flex", alignItems: "flex-end", gap: l }, children: Array.from({ length: t }, (h, p) => /* @__PURE__ */ i("div", { "data-testid": `arc-seg-${p}`, style: f(p) }, p)) }),
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
function qc({
  barCount: e = 20,
  height: t = "32px",
  active: n = !0
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: "j-waveform",
      style: {
        height: t,
        ...n ? {} : { opacity: 0.3 }
      },
      children: Array.from({ length: e }, (r, a) => {
        const o = {
          height: `${Mn[a % Mn.length]}px`,
          background: "var(--j-accent)",
          "--j-wv-dur": Dn[a % Dn.length],
          "--j-wv-dly": `${(a * 0.04).toFixed(2)}s`,
          ...n ? {} : { transform: "scaleY(0.15)", animationPlayState: "paused" }
        };
        return /* @__PURE__ */ i("div", { className: "j-wv", style: o }, a);
      })
    }
  );
}
function zs(e) {
  return e === "processing" ? { r1: "2s", r2: "1.2s", r3: "1.8s" } : e === "idle" ? { r1: "8s", r2: "6s", r3: "9s" } : { r1: "4s", r2: "3s", r3: "5s" };
}
function Rs(e, t) {
  return e === "idle" ? "Idle" : e === "processing" ? "Processing" : e === "warning" ? "Warning" : e === "error" ? "Error" : t ? "Listening" : "Online";
}
const Hs = Array.from({ length: 12 }, (e, t) => t * 30);
function Vc({
  systemName: e = "JARVIS",
  size: t = "160px",
  state: n = "active",
  listening: r = !1,
  onClick: a
}) {
  const o = zs(n), s = Rs(n, r);
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
        /* @__PURE__ */ i("div", { style: {
          position: "absolute",
          borderRadius: "50%",
          inset: 0,
          border: "1px dashed var(--j-accent)",
          opacity: 0.08,
          animation: "j-spin 10s linear infinite"
        } }),
        Hs.map((c) => {
          const l = c * Math.PI / 180, d = 48, f = 50 + d * Math.sin(l), u = 50 - d * Math.cos(l);
          return /* @__PURE__ */ i(
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
        /* @__PURE__ */ i("div", { style: {
          position: "absolute",
          borderRadius: "50%",
          inset: 8,
          border: "1px solid var(--j-accent)",
          opacity: 0.35,
          animation: `j-spin ${o.r1} linear infinite`
        } }),
        /* @__PURE__ */ i("div", { style: {
          position: "absolute",
          borderRadius: "50%",
          inset: 16,
          border: "1.5px solid transparent",
          borderTopColor: "var(--j-accent)",
          borderBottomColor: "var(--j-accent)66",
          boxShadow: "0 0 6px var(--j-accent-25)",
          animation: `j-spin ${o.r2} linear infinite`
        } }),
        /* @__PURE__ */ i("div", { style: {
          position: "absolute",
          borderRadius: "50%",
          inset: 24,
          border: "1.5px solid transparent",
          borderTopColor: "var(--j-accent)",
          borderBottomColor: "var(--j-accent)66",
          boxShadow: "0 0 6px var(--j-accent-25)",
          animation: `j-spin-rev ${o.r3} linear infinite`
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
          /* @__PURE__ */ i("div", { style: {
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, var(--j-accent-25) 0%, transparent 65%)",
            pointerEvents: "none"
          } }),
          /* @__PURE__ */ g("div", { style: { position: "relative", zIndex: 1, textAlign: "center" }, children: [
            /* @__PURE__ */ i(
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
            /* @__PURE__ */ i("div", { style: {
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
        /* @__PURE__ */ i("div", { style: {
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
        }, children: /* @__PURE__ */ i("div", { style: {
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
const Js = 80, Gs = 28, gr = 2, zt = 3, qs = Js - gr * 2, Wt = Gs - zt * 2, On = zt + Wt;
function Vs(e) {
  if (e.length === 0) return [];
  const t = Math.min(...e), n = Math.max(...e), r = n - t === 0 ? 1 : n - t;
  return e.map((a, o) => ({
    x: gr + o * (qs / Math.max(e.length - 1, 1)),
    y: zt + Wt - Wt * (a - t) / r
  }));
}
function Ls(e, t) {
  if (t !== "auto") return t;
  if (e.length < 2) return "flat";
  const n = Math.min(...e), a = Math.max(...e) - n, o = e[e.length - 1];
  return o > e[0] + a * 0.05 ? "up" : o < e[0] - a * 0.05 ? "down" : "flat";
}
function Lc({
  data: e,
  width: t = "80px",
  height: n = "28px",
  showArea: r = !0,
  showTrend: a = !1,
  trend: o = "auto",
  colorVar: s
}) {
  const c = Vs(e), l = Ls(e, o), f = `var(${s ?? (l === "up" ? "--j-ok" : l === "down" ? "--j-err" : "--j-accent")})`, u = c.map((k) => `${k.x.toFixed(1)},${k.y.toFixed(1)}`).join(" "), h = l === "up" ? "▲" : l === "down" ? "▼" : "─", p = l === "up" ? "j-text-ok" : l === "down" ? "j-text-err" : "j-text-accent";
  let x = "";
  if (c.length >= 2) {
    x = `M ${c[0].x.toFixed(1)} ${On} L ${c[0].x.toFixed(1)} ${c[0].y.toFixed(1)}`;
    for (let k = 1; k < c.length; k++)
      x += ` L ${c[k].x.toFixed(1)} ${c[k].y.toFixed(1)}`;
    x += ` L ${c[c.length - 1].x.toFixed(1)} ${On} Z`;
  }
  const b = c[c.length - 1];
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
              r && c.length >= 2 && /* @__PURE__ */ i(
                "path",
                {
                  d: x,
                  className: "j-sparkline-area",
                  style: { fill: f }
                }
              ),
              c.length >= 2 && /* @__PURE__ */ i(
                "polyline",
                {
                  points: u,
                  className: "j-sparkline-line",
                  style: { stroke: f, fill: "none" }
                }
              ),
              b && /* @__PURE__ */ i(
                "circle",
                {
                  cx: b.x,
                  cy: b.y,
                  r: 2,
                  className: "j-sparkline-dot",
                  style: { fill: f }
                }
              )
            ]
          }
        ),
        a && /* @__PURE__ */ i("span", { className: `j-sparkline-trend ${p}`, children: h })
      ]
    }
  );
}
const Tt = 400, Ae = 220, ue = 36, yr = 8, Be = 12, vr = 22, tt = 6, nt = Tt - ue - yr, rt = Ae - Be - vr;
function at(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(1);
}
function Xc({
  data: e,
  height: t = "220px",
  colorVar: n = "--j-accent",
  orientation: r = "vertical",
  showGrid: a = !0,
  showAxisLabels: o = !0,
  showValues: s = !1,
  gridLines: c = 4
}) {
  const l = e.length > 0 ? Math.max(...e.map((f) => f.value)) : 1, d = `var(${n}, var(--j-accent))`;
  return /* @__PURE__ */ g("div", { className: "j-chart-wrap", style: { height: t, position: "relative" }, children: [
    /* @__PURE__ */ i("div", { className: "j-chart-scan" }),
    /* @__PURE__ */ i(
      "svg",
      {
        className: "j-chart-svg",
        viewBox: `0 0 ${Tt} ${Ae}`,
        preserveAspectRatio: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: r === "vertical" ? /* @__PURE__ */ g(B, { children: [
          a && Array.from({ length: c + 1 }, (f, u) => {
            const h = Be + u * (rt / c), p = l - u * (l / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ i(
                "line",
                {
                  x1: ue,
                  y1: h,
                  x2: Tt - yr,
                  y2: h,
                  className: "j-chart-grid"
                }
              ),
              o && /* @__PURE__ */ i(
                "text",
                {
                  x: ue - 4,
                  y: h + 3,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: at(p)
                }
              )
            ] }, `grid-${u}`);
          }),
          e.map((f, u) => {
            const h = nt / e.length - tt, p = l > 0 ? rt * (f.value / l) : 0, x = ue + u * (nt / e.length) + tt / 2, b = Be + rt - p;
            return /* @__PURE__ */ g("g", { className: "j-chart-bar-group", children: [
              /* @__PURE__ */ i(
                "polygon",
                {
                  points: `${x},${b + 6} ${x + 4},${b} ${x + h - 4},${b} ${x + h},${b + 6}`,
                  style: { fill: d }
                }
              ),
              /* @__PURE__ */ i(
                "rect",
                {
                  x,
                  y: b + 5,
                  width: h,
                  height: Math.max(p - 5, 0),
                  className: "j-chart-bar",
                  style: { fill: d },
                  children: /* @__PURE__ */ i("title", { children: `${f.label}: ${f.value}` })
                }
              ),
              /* @__PURE__ */ i(
                "rect",
                {
                  x,
                  y: b + 5,
                  width: h,
                  height: Math.max(p - 5, 0),
                  className: "j-chart-bar-glow",
                  style: { fill: d }
                }
              ),
              o && /* @__PURE__ */ i(
                "text",
                {
                  x: x + h / 2,
                  y: Ae - 2,
                  className: "j-chart-axis-label",
                  textAnchor: "middle",
                  children: f.label
                }
              ),
              s && p > 10 && /* @__PURE__ */ i(
                "text",
                {
                  x: x + h / 2,
                  y: b - 3,
                  className: "j-chart-value-label",
                  textAnchor: "middle",
                  children: at(f.value)
                }
              )
            ] }, u);
          })
        ] }) : /* @__PURE__ */ g(B, { children: [
          a && Array.from({ length: c + 1 }, (f, u) => {
            const h = ue + u * (nt / c), p = u * (l / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ i(
                "line",
                {
                  x1: h,
                  y1: Be,
                  x2: h,
                  y2: Ae - vr,
                  className: "j-chart-grid"
                }
              ),
              o && /* @__PURE__ */ i(
                "text",
                {
                  x: h,
                  y: Ae - 2,
                  className: "j-chart-axis-label",
                  textAnchor: "middle",
                  children: at(p)
                }
              )
            ] }, `grid-${u}`);
          }),
          e.map((f, u) => {
            const h = rt / e.length, p = h - tt, x = l > 0 ? nt * (f.value / l) : 0, b = Be + u * h + tt / 2;
            return /* @__PURE__ */ g("g", { className: "j-chart-bar-group", children: [
              /* @__PURE__ */ i(
                "rect",
                {
                  x: ue,
                  y: b,
                  width: x,
                  height: p,
                  className: "j-chart-bar",
                  style: { fill: d },
                  children: /* @__PURE__ */ i("title", { children: `${f.label}: ${f.value}` })
                }
              ),
              /* @__PURE__ */ i(
                "rect",
                {
                  x: ue,
                  y: b,
                  width: x,
                  height: p,
                  className: "j-chart-bar-glow",
                  style: { fill: d }
                }
              ),
              o && /* @__PURE__ */ i(
                "text",
                {
                  x: ue - 4,
                  y: b + p / 2 + 4,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: f.label
                }
              ),
              s && /* @__PURE__ */ i(
                "text",
                {
                  x: ue + x + 4,
                  y: b + p / 2 + 4,
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
const $t = 400, Et = 200, st = 36, br = 8, ze = 10, Xs = 20, Ks = $t - st - br, Ie = Et - ze - Xs;
function Us(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(1);
}
function Kc({
  data: e,
  height: t = "200px",
  colorVar: n = "--j-accent",
  showArea: r = !1,
  showDots: a = !0,
  showAxisLabels: o = !0,
  showGrid: s = !0,
  gridLines: c = 4
}) {
  if (e.length === 0)
    return /* @__PURE__ */ i("div", { className: "j-chart-wrap", style: { height: t, position: "relative" } });
  const l = e.map((k) => k.value), d = Math.min(...l), f = Math.max(...l), u = f - d === 0 ? 1 : f - d, h = `var(${n})`, p = e.map((k, y) => ({
    x: st + y * (Ks / Math.max(e.length - 1, 1)),
    y: ze + Ie - Ie * (k.value - d) / u
  })), x = p.map((k) => `${k.x.toFixed(1)},${k.y.toFixed(1)}`).join(" ");
  let b = "";
  if (p.length >= 2) {
    b = `M ${p[0].x.toFixed(1)} ${ze + Ie}`;
    for (const k of p) b += ` L ${k.x.toFixed(1)} ${k.y.toFixed(1)}`;
    b += ` L ${p[p.length - 1].x.toFixed(1)} ${ze + Ie} Z`;
  }
  return /* @__PURE__ */ g("div", { className: "j-chart-wrap", style: { height: t, position: "relative" }, children: [
    /* @__PURE__ */ i("div", { className: "j-chart-scan" }),
    /* @__PURE__ */ g(
      "svg",
      {
        className: "j-chart-svg",
        viewBox: `0 0 ${$t} ${Et}`,
        preserveAspectRatio: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          s && Array.from({ length: c + 1 }, (k, y) => {
            const j = ze + y * (Ie / c), v = f - y * (u / c);
            return /* @__PURE__ */ g("g", { children: [
              /* @__PURE__ */ i(
                "line",
                {
                  x1: st,
                  y1: j,
                  x2: $t - br,
                  y2: j,
                  className: "j-chart-grid"
                }
              ),
              o && /* @__PURE__ */ i(
                "text",
                {
                  x: st - 4,
                  y: j + 3,
                  className: "j-chart-axis-label",
                  textAnchor: "end",
                  children: Us(v)
                }
              )
            ] }, `grid-${y}`);
          }),
          r && p.length >= 2 && /* @__PURE__ */ i("path", { d: b, className: "j-chart-area", style: { fill: h } }),
          p.length >= 2 && /* @__PURE__ */ i(
            "polyline",
            {
              points: x,
              className: "j-chart-line",
              style: { stroke: h, fill: "none" }
            }
          ),
          a && p.map((k, y) => /* @__PURE__ */ i(
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
          o && e.map((k, y) => /* @__PURE__ */ i(
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
const Me = 50, Dt = 50;
function Uc({
  data: e,
  size: t = "160px",
  thickness: n = 20,
  centerValue: r = "",
  centerLabel: a = "",
  showLegend: o = !0
}) {
  const s = Me - n / 2 - 2, c = 2 * Math.PI * s, l = e.reduce((u, h) => u + h.value, 0);
  let d = -90;
  const f = e.map((u) => {
    const h = l > 0 ? u.value / l : 0, p = h * c, x = c - p, b = d;
    return d += h * 360, { seg: u, dash: p, gap: x, rotate: b };
  });
  return /* @__PURE__ */ g("div", { className: "j-chart-donut-wrap", style: { width: t, maxWidth: "100%" }, children: [
    /* @__PURE__ */ g(
      "svg",
      {
        viewBox: "0 0 100 100",
        xmlns: "http://www.w3.org/2000/svg",
        style: { width: "100%", height: "100%" },
        children: [
          /* @__PURE__ */ i(
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
          l > 0 && f.map(({ seg: u, dash: h, gap: p, rotate: x }, b) => /* @__PURE__ */ i(
            "circle",
            {
              cx: Me,
              cy: Dt,
              r: s,
              fill: "none",
              stroke: u.color ?? "var(--j-accent)",
              strokeWidth: n,
              strokeDasharray: `${h.toFixed(2)} ${p.toFixed(2)}`,
              transform: `rotate(${x} ${Me} ${Dt})`,
              className: "j-chart-donut-seg"
            },
            b
          )),
          r && /* @__PURE__ */ i(
            "text",
            {
              x: Me,
              y: a ? 46 : 54,
              textAnchor: "middle",
              className: "j-chart-donut-center-val",
              children: r
            }
          ),
          a && /* @__PURE__ */ i(
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
    o && /* @__PURE__ */ i("div", { className: "j-chart-donut-legend", children: e.map((u, h) => /* @__PURE__ */ g("div", { className: "j-chart-donut-legend-row", children: [
      /* @__PURE__ */ i(
        "span",
        {
          className: "j-chart-donut-legend-dot",
          style: { background: u.color ?? "var(--j-accent)" }
        }
      ),
      /* @__PURE__ */ i("span", { className: "j-chart-donut-legend-label", children: u.label }),
      /* @__PURE__ */ g("span", { className: "j-chart-donut-legend-pct", children: [
        l > 0 ? Math.round(u.value / l * 100) : 0,
        "%"
      ] })
    ] }, h)) })
  ] });
}
const fe = 100, we = 95, se = 72, ot = 210, it = 120;
function dt(e) {
  return e * Math.PI / 180;
}
function Cn(e, t) {
  if (t <= 0) return "";
  const n = dt(e), r = dt(e + t), a = fe + se * Math.cos(n), o = we + se * Math.sin(n), s = fe + se * Math.cos(r), c = we + se * Math.sin(r), l = t > 180 ? 1 : 0;
  return `M ${a.toFixed(2)} ${o.toFixed(2)} A ${se} ${se} 0 ${l} 1 ${s.toFixed(2)} ${c.toFixed(2)}`;
}
function Ot(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}K` : e.toFixed(0);
}
function Qc({
  value: e,
  min: t = 0,
  max: n = 100,
  size: r = "200px",
  colorVar: a = "--j-accent",
  thickness: o = 14,
  label: s = "",
  displayValue: c,
  showNeedle: l = !0,
  showTicks: d = !0,
  showMinMax: f = !0,
  ticks: u = 8
}) {
  const h = Math.max(0, Math.min(1, (e - t) / (n - t || 1))), p = `var(${a})`, x = it * h, b = dt(ot + h * it), k = fe + (se - 2) * Math.cos(b), y = we + (se - 2) * Math.sin(b), j = se - o / 2 - 2, v = se + o / 2 + 4;
  return /* @__PURE__ */ i("div", { style: { width: r, maxWidth: "100%" }, children: /* @__PURE__ */ g(
    "svg",
    {
      viewBox: "0 0 200 120",
      xmlns: "http://www.w3.org/2000/svg",
      style: { width: "100%", height: "100%" },
      children: [
        /* @__PURE__ */ i(
          "path",
          {
            d: Cn(ot, it),
            fill: "none",
            stroke: "var(--j-accent-10)",
            strokeWidth: o,
            strokeLinecap: "round"
          }
        ),
        x > 0 && /* @__PURE__ */ i(
          "path",
          {
            d: Cn(ot, x),
            fill: "none",
            stroke: p,
            strokeWidth: o,
            strokeLinecap: "round",
            className: "j-chart-gauge-arc"
          }
        ),
        d && Array.from({ length: u + 1 }, (S, w) => {
          const m = dt(ot + w / u * it);
          return /* @__PURE__ */ i(
            "line",
            {
              x1: fe + j * Math.cos(m),
              y1: we + j * Math.sin(m),
              x2: fe + v * Math.cos(m),
              y2: we + v * Math.sin(m),
              stroke: p,
              strokeWidth: 1,
              className: "j-chart-gauge-tick"
            },
            w
          );
        }),
        l && /* @__PURE__ */ g(B, { children: [
          /* @__PURE__ */ i(
            "line",
            {
              x1: fe,
              y1: we,
              x2: k,
              y2: y,
              stroke: p,
              strokeWidth: 2,
              strokeLinecap: "round",
              className: "j-chart-gauge-needle"
            }
          ),
          /* @__PURE__ */ i(
            "circle",
            {
              cx: fe,
              cy: we,
              r: 5,
              fill: p,
              className: "j-chart-gauge-hub"
            }
          )
        ] }),
        /* @__PURE__ */ i(
          "text",
          {
            x: fe,
            y: 100,
            textAnchor: "middle",
            className: "j-chart-donut-center-val",
            style: { fontFamily: "'Courier New', monospace" },
            children: c ?? Ot(e)
          }
        ),
        s && /* @__PURE__ */ i(
          "text",
          {
            x: fe,
            y: 114,
            textAnchor: "middle",
            className: "j-chart-donut-center-lbl",
            style: { fontFamily: "'Courier New', monospace" },
            children: s
          }
        ),
        f && /* @__PURE__ */ g(B, { children: [
          /* @__PURE__ */ i(
            "text",
            {
              x: 14,
              y: 114,
              textAnchor: "start",
              className: "j-chart-axis-label",
              children: Ot(t)
            }
          ),
          /* @__PURE__ */ i(
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
const xr = 100, jr = 100, Fe = 78;
function Qs(e) {
  return e * Math.PI / 180;
}
function Zs(e, t) {
  return Qs(360 * e / t - 90);
}
function ct(e, t, n) {
  const r = Zs(e, t);
  return [xr + n * Math.cos(r), jr + n * Math.sin(r)];
}
function Wn(e, t, n) {
  const [r, a] = ct(e, t, n);
  return `${r.toFixed(2)},${a.toFixed(2)}`;
}
function Tn(e) {
  return Math.max(0, Math.min(1, e));
}
function Zc({
  axes: e,
  size: t = "200px",
  colorVar: n = "--j-accent",
  rings: r = 4,
  showLabels: a = !0
}) {
  const o = Math.max(e.length, 3), s = `var(${n},var(--j-accent))`, c = Array.from({ length: r }, (h, p) => {
    const x = Fe * (p + 1) / r, b = Array.from({ length: o }, (k, y) => Wn(y, o, x)).join(" ");
    return /* @__PURE__ */ i("polygon", { points: b, className: "j-chart-radar-web" }, p);
  }), l = Array.from({ length: o }, (h, p) => {
    const [x, b] = ct(p, o, Fe);
    return /* @__PURE__ */ i(
      "line",
      {
        x1: xr,
        y1: jr,
        x2: x,
        y2: b,
        className: "j-chart-radar-spoke"
      },
      p
    );
  }), d = e.map((h, p) => {
    const x = Tn(h.value / ((h.max ?? 100) || 1));
    return Wn(p, o, Fe * x);
  }).join(" "), f = e.map((h, p) => {
    const x = Tn(h.value / ((h.max ?? 100) || 1)), [b, k] = ct(p, o, Fe * x);
    return /* @__PURE__ */ i(
      "circle",
      {
        cx: b,
        cy: k,
        r: 3,
        className: "j-chart-dot",
        style: { fill: s }
      },
      p
    );
  }), u = a ? e.map((h, p) => {
    const [x, b] = ct(p, o, Fe + 14), k = x < 98 ? "end" : x > 102 ? "start" : "middle";
    return /* @__PURE__ */ i(
      "text",
      {
        x,
        y: b + 4,
        className: "j-chart-axis-label",
        textAnchor: k,
        children: h.label
      },
      p
    );
  }) : null;
  return /* @__PURE__ */ i("div", { style: { width: t, maxWidth: "100%", aspectRatio: "1" }, children: /* @__PURE__ */ g(
    "svg",
    {
      viewBox: "0 0 200 200",
      xmlns: "http://www.w3.org/2000/svg",
      style: { width: "100%", height: "100%" },
      children: [
        c,
        l,
        /* @__PURE__ */ i(
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
const $n = [
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
function el({
  systemName: e = "JARVIS",
  version: t = "v4.2.1",
  onComplete: n
}) {
  const [r, a] = E(!0), [o, s] = E(0), [c, l] = E(0), [d, f] = E(0);
  if (re(() => {
    let h = !1;
    async function p() {
      if (!h && (s(0), l(0), await xe(100), !h && (l(95), await xe(700), !h && (s(1), await xe(600), !h)))) {
        s(2);
        for (let x = 1; x <= $n.length; x++) {
          if (h) return;
          f(x), await xe(180);
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
    width: o >= 1 ? 24 : 0,
    height: o >= 1 ? 24 : 0,
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
      "data-boot-phase": o,
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--j-bg)",
        fontFamily: "'Courier New', monospace",
        overflow: "hidden"
      },
      children: [
        o <= 1 && /* @__PURE__ */ i(
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
        /* @__PURE__ */ i("div", { style: { ...u, top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 } }),
        /* @__PURE__ */ i("div", { style: { ...u, top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 } }),
        /* @__PURE__ */ i("div", { style: { ...u, bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 } }),
        /* @__PURE__ */ i("div", { style: { ...u, bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 } }),
        o >= 2 && /* @__PURE__ */ i("div", { style: { position: "absolute", top: "30%", left: "10%", right: "10%" }, children: $n.slice(0, d).map((h, p) => /* @__PURE__ */ i(
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
        o >= 3 && /* @__PURE__ */ g("div", { style: {
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
          /* @__PURE__ */ i("div", { "data-spinner": "", children: /* @__PURE__ */ i(Pt, { size: "80px", color: "cyan", label: e, showLabel: !0 }) }),
          /* @__PURE__ */ i("div", { style: {
            fontSize: 11,
            color: "var(--j-accent-mid)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            animation: "j-pulse 1.5s ease-in-out infinite"
          }, children: "INITIALISING SYSTEMS..." })
        ] }),
        o >= 4 && /* @__PURE__ */ g(B, { children: [
          /* @__PURE__ */ g("div", { style: { position: "absolute", bottom: "12%", left: 0, right: 0, textAlign: "center" }, children: [
            /* @__PURE__ */ i("div", { style: {
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
          /* @__PURE__ */ i("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0 }, children: /* @__PURE__ */ i(He, { position: "bottom", showWaveform: !0, showTicks: !0, showRec: !0 }) })
        ] })
      ]
    }
  );
}
const ec = {
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "var(--j-text-muted)",
  active: "var(--j-text-secondary)",
  processing: "var(--j-text-secondary)"
}, tc = {
  warning: "var(--j-warn)",
  error: "var(--j-err)",
  success: "var(--j-ok)",
  idle: "transparent",
  active: "transparent",
  processing: "transparent"
}, nc = {
  warning: "amber",
  error: "red",
  success: "green",
  idle: "ghost",
  active: "cyan",
  processing: "cyan"
};
function rc(e, t) {
  if (!t) return "active";
  const n = String(e[t] ?? "").toLowerCase();
  return n === "warning" || n === "warn" ? "warning" : n === "error" || n === "danger" ? "error" : n === "success" || n === "ok" ? "success" : n === "idle" || n === "offline" ? "idle" : "active";
}
function tl({
  columns: e,
  rows: t,
  stateColumn: n,
  showFooter: r = !0,
  footerLabel: a
}) {
  const [o, s] = E(-1), c = !t || t.length === 0;
  return /* @__PURE__ */ g("div", { style: {
    position: "relative",
    background: "var(--j-bg-card)",
    border: "1px solid var(--j-accent-12)",
    overflow: "hidden",
    fontFamily: "'Courier New', monospace"
  }, children: [
    /* @__PURE__ */ i("div", { style: { position: "relative", height: 2, background: "linear-gradient(90deg,var(--j-accent),var(--j-accent-08))", overflow: "hidden" }, children: /* @__PURE__ */ i("div", { className: "j-scan-h", style: { position: "absolute", inset: 0, width: 60, background: "linear-gradient(90deg,transparent,var(--j-text-primary),transparent)" } }) }),
    /* @__PURE__ */ i("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ g("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "'Courier New', monospace" }, children: [
      /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ i("tr", { children: e.map((l) => /* @__PURE__ */ i("th", { style: {
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
      /* @__PURE__ */ i("tbody", { children: c ? /* @__PURE__ */ i("tr", { children: /* @__PURE__ */ i("td", { colSpan: e.length, style: { padding: 24 }, children: /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }, children: [
        /* @__PURE__ */ i(Pt, { size: "24px", showLabel: !1 }),
        /* @__PURE__ */ i("span", { style: { fontSize: 10, color: "var(--j-text-dim)", letterSpacing: "0.10em" }, children: "NO DATA" })
      ] }) }) }) : t.map((l, d) => {
        const f = rc(l, n), u = d === o, h = u ? "var(--j-accent-05)" : d % 2 === 0 ? "transparent" : "var(--j-accent-05)", p = tc[f] ?? "transparent";
        return /* @__PURE__ */ i(
          "tr",
          {
            "data-state": f,
            style: { background: h, transition: "background 0.12s", borderLeft: `2px solid ${p === "transparent" && u ? "var(--j-accent-50)" : p}` },
            onMouseEnter: () => s(d),
            onMouseLeave: () => s(-1),
            children: e.map((b) => {
              const k = String(l[b.key] ?? ""), y = ec[f] ?? "var(--j-text-secondary)", j = {
                padding: "8px 14px",
                textAlign: b.align ?? "left",
                borderBottom: "1px solid var(--j-accent-05)",
                color: y
              };
              let v = k;
              return b.key === n ? v = /* @__PURE__ */ i(ws, { state: f, children: k }) : b.isBadge && (v = /* @__PURE__ */ i(fr, { color: nc[f] ?? "cyan", children: k })), /* @__PURE__ */ i("td", { style: j, children: v }, b.key);
            })
          },
          d
        );
      }) })
    ] }) }),
    /* @__PURE__ */ i("div", { style: { height: 1, background: "linear-gradient(90deg,var(--j-accent-25),transparent)" } }),
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
      a && /* @__PURE__ */ i("span", { children: a })
    ] })
  ] });
}
function ac(e = "active") {
  return e === "warning" ? "var(--j-warn)" : e === "error" ? "var(--j-err)" : e === "success" ? "var(--j-ok)" : "var(--j-accent-mid)";
}
function nl({
  visible: e,
  onClose: t,
  commands: n,
  onExecute: r,
  placeholder: a = "Type a command...",
  isListening: o = !1
}) {
  const [s, c] = E(""), [l, d] = E(0), f = ge(null);
  re(() => {
    var w;
    e && (c(""), d(0), (w = f.current) == null || w.focus());
  }, [e]);
  const u = Re(() => {
    if (!s.trim()) return n;
    const w = s.toLowerCase();
    return n.filter(
      (m) => {
        var D;
        return m.label.toLowerCase().includes(w) || m.key.toLowerCase().includes(w) || (((D = m.description) == null ? void 0 : D.toLowerCase().includes(w)) ?? !1);
      }
    );
  }, [n, s]);
  function h(w) {
    c(w.target.value), d(0);
  }
  function p(w) {
    w.key === "ArrowDown" ? (w.preventDefault(), d((m) => Math.min(m + 1, u.length - 1))) : w.key === "ArrowUp" ? (w.preventDefault(), d((m) => Math.max(m - 1, 0))) : w.key === "Enter" ? u[l] && x(u[l]) : w.key === "Escape" && b();
  }
  function x(w) {
    r(w), b();
  }
  function b() {
    c(""), d(0), t();
  }
  function k() {
    var w;
    c(""), d(0), (w = f.current) == null || w.focus();
  }
  if (!e) return null;
  const y = [];
  let j;
  u.forEach((w, m) => {
    const D = w.group !== j;
    j = w.group, y.push({ cmd: w, idx: m, showGroup: D });
  });
  const v = {
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
  }, S = {
    ...v,
    left: "auto",
    right: 0,
    borderWidth: "2px 2px 0 0"
  };
  return /* @__PURE__ */ g(B, { children: [
    /* @__PURE__ */ i(
      "div",
      {
        "data-backdrop": "",
        onClick: b,
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
      /* @__PURE__ */ i("div", { style: v }),
      /* @__PURE__ */ i("div", { style: S }),
      /* @__PURE__ */ i(
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
        /* @__PURE__ */ i(
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
            children: o ? "🎙" : "⌕"
          }
        ),
        /* @__PURE__ */ i(
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
        s && /* @__PURE__ */ i(
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
      /* @__PURE__ */ i("div", { style: { maxHeight: 360, overflowY: "auto" }, children: u.length === 0 ? /* @__PURE__ */ i("div", { style: {
        padding: 24,
        textAlign: "center",
        fontSize: 11,
        color: "var(--j-text-dim)",
        letterSpacing: "0.10em"
      }, children: "NO COMMANDS FOUND" }) : y.map(({ cmd: w, idx: m, showGroup: D }) => {
        const O = m === l, T = ac(w.state ?? "active");
        return /* @__PURE__ */ g("div", { children: [
          D && w.group && /* @__PURE__ */ i("div", { "data-group-header": "", style: {
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
              "data-selected": O ? "true" : "false",
              onClick: () => x(w),
              onMouseEnter: () => d(m),
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                cursor: "pointer",
                background: O ? "var(--j-accent-08)" : "transparent",
                borderLeft: `2px solid ${O ? T : "transparent"}`,
                transition: "background 0.1s"
              },
              children: [
                w.icon && /* @__PURE__ */ i("span", { style: { fontSize: 14, color: T, filter: `drop-shadow(0 0 4px ${T})`, flexShrink: 0 }, children: w.icon }),
                /* @__PURE__ */ g("div", { style: { flex: 1, minWidth: 0 }, children: [
                  /* @__PURE__ */ i("div", { style: { fontSize: 11, color: O ? "var(--j-text-primary)" : "var(--j-text-secondary)", letterSpacing: "0.06em" }, children: w.label }),
                  w.description && /* @__PURE__ */ i("div", { style: { fontSize: 9, color: "var(--j-text-muted)", letterSpacing: "0.08em", marginTop: 1 }, children: w.description })
                ] }),
                O && /* @__PURE__ */ i("span", { style: { fontSize: 9, color: "var(--j-accent-mid)", letterSpacing: "0.10em", opacity: 0.7, flexShrink: 0 }, children: "ENTER" })
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
        /* @__PURE__ */ i("span", { children: "↑↓ NAVIGATE" }),
        /* @__PURE__ */ i("span", { children: "↵ EXECUTE" }),
        /* @__PURE__ */ i("span", { children: "ESC CLOSE" })
      ] })
    ] })
  ] });
}
const wr = Ve(null);
function oc() {
  return qe(wr);
}
function ic(e) {
  return e === "warning" ? "var(--j-warn)" : e === "error" ? "var(--j-err)" : e === "success" ? "var(--j-ok)" : "var(--j-accent)";
}
function sc(e) {
  return e === "warning" ? "var(--j-warn-25)" : e === "error" ? "var(--j-err-25)" : e === "success" ? "var(--j-ok-25)" : "var(--j-accent-25)";
}
function cc(e) {
  return e === "warning" ? "var(--j-warn-12)" : e === "error" ? "var(--j-err-12)" : e === "success" ? "var(--j-ok-12)" : "var(--j-accent-12)";
}
function lc(e, t) {
  const n = (e - 90) * Math.PI / 180;
  return {
    x: Math.round(t * Math.cos(n)),
    y: Math.round(t * Math.sin(n))
  };
}
function rl({
  open: e,
  onOpenChange: t,
  triggerLabel: n = "MENU",
  radius: r = 90,
  centerSize: a = "64px",
  children: o
}) {
  const [s, c] = E([]), [l, d] = E(e ?? !1), [f, u] = E(null), [h, p] = E(null), x = X((y) => {
    c((j) => j.some((v) => v.key === y.key) ? j : [...j, y]);
  }, []);
  function b() {
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
        /* @__PURE__ */ i(wr.Provider, { value: x, children: o }),
        s.map((y) => {
          const { x: j, y: v } = lc(y.angle, r), S = f === y.key, w = ic(y.state), m = sc(y.state), D = cc(y.state), O = l ? `translate(calc(-50% + ${j}px), calc(-50% + ${v}px))` : "translate(-50%, -50%)";
          return /* @__PURE__ */ g(
            "div",
            {
              "data-item-key": y.key,
              style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: O,
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
                /* @__PURE__ */ i("div", { style: {
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: S ? D : "var(--j-bg-card)",
                  border: `1.5px solid ${S ? w : m}`,
                  boxShadow: S ? `0 0 16px ${m}, inset 0 0 12px ${D}` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                }, children: /* @__PURE__ */ i("span", { style: {
                  fontSize: 16,
                  fontStyle: "normal",
                  filter: S ? `drop-shadow(0 0 6px ${w})` : "none"
                }, children: y.icon }) }),
                l && /* @__PURE__ */ i(
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
                      opacity: S ? 0.8 : 0.2,
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
            onClick: b,
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
              /* @__PURE__ */ i("div", { style: {
                position: "absolute",
                inset: "-4px",
                borderRadius: "50%",
                border: "1px solid var(--j-accent)",
                opacity: 0.3,
                animation: `j-spin ${l ? "2s" : "4s"} linear infinite`
              } }),
              /* @__PURE__ */ i("div", { style: {
                position: "absolute",
                inset: "-10px",
                borderRadius: "50%",
                border: "1px dashed var(--j-accent)",
                opacity: 0.15,
                animation: "j-spin-rev 6s linear infinite"
              } }),
              /* @__PURE__ */ i("div", { style: { position: "relative", zIndex: 1, textAlign: "center" }, children: /* @__PURE__ */ i("div", { style: {
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
        h && l && /* @__PURE__ */ i(
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
function al({
  icon: e = "⊞",
  label: t = "",
  angle: n = 0,
  state: r = "active",
  onClick: a
}) {
  const o = oc();
  return re(() => {
    o == null || o({
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
function dc(e) {
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
function uc(e) {
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
function kr(e) {
  return e === "amber" ? "var(--j-warn)" : e === "red" ? "var(--j-err)" : e === "green" ? "var(--j-ok)" : "var(--j-accent)";
}
function fc(e) {
  return kr(e);
}
function hc(e) {
  return e === "amber" ? "aw" : e === "red" ? "ae" : e === "green" ? "ag" : "a";
}
function oe(e) {
  return e.toFixed(2);
}
function ol({
  nodes: e,
  edges: t,
  width: n = "100%",
  height: r = "420px",
  title: a,
  showLegend: o = !0
}) {
  const c = `ng${En().replace(/:/g, "")}`, [l, d] = E({}), [f, u] = E(null), h = ge(null);
  re(() => {
    d((y) => {
      const j = { ...y };
      return e.forEach((v) => {
        j[v.id] || (j[v.id] = { x: v.x, y: v.y, w: dc(v), h: uc(v) });
      }), Object.keys(j).forEach((v) => {
        e.some((S) => S.id === v) || delete j[v];
      }), j;
    });
  }, [e]);
  function p(y, j) {
    y.stopPropagation();
    const v = l[j];
    v && (u(j), h.current = { id: j, offX: y.clientX - v.x, offY: y.clientY - v.y });
  }
  function x(y) {
    const j = h.current;
    if (!j) return;
    const { id: v, offX: S, offY: w } = j;
    d((m) => {
      const D = m[v];
      if (!D) return m;
      const O = Math.max(0, y.clientX - S), T = Math.max(0, y.clientY - w);
      return D.x === O && D.y === T ? m : { ...m, [v]: { ...D, x: O, y: T } };
    });
  }
  function b() {
    u(null), h.current = null;
  }
  function k(y, j, v, S) {
    const w = e.find((F) => F.id === v), m = w == null ? void 0 : w.type;
    if (m === "hub" || m === "diamond" || m === "hex")
      return [y.x + y.w / 2, y.y + y.h / 2];
    const D = y.y + y.h / 2, O = j.x + j.w / 2, T = y.x + y.w / 2;
    return S ? O >= T ? [y.x + y.w, D] : [y.x, D] : O < T ? [y.x + y.w, D] : [y.x, D];
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
      onMouseUp: b,
      onMouseLeave: b,
      children: [
        /* @__PURE__ */ g("svg", { style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }, children: [
          /* @__PURE__ */ i("defs", { children: /* @__PURE__ */ i("pattern", { id: `${c}-grid`, width: "32", height: "32", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ i("circle", { cx: "0", cy: "0", r: "0.8", fill: "var(--j-accent-18)" }) }) }),
          /* @__PURE__ */ i("rect", { width: "100%", height: "100%", fill: `url(#${c}-grid)` })
        ] }),
        /* @__PURE__ */ g("svg", { style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1, overflow: "visible" }, children: [
          /* @__PURE__ */ g("defs", { children: [
            /* @__PURE__ */ i("marker", { id: `${c}-a`, markerWidth: "7", markerHeight: "7", refX: "5", refY: "3.5", orient: "auto", children: /* @__PURE__ */ i("polygon", { points: "0 0, 7 3.5, 0 7", fill: "var(--j-accent-50)" }) }),
            /* @__PURE__ */ i("marker", { id: `${c}-aw`, markerWidth: "7", markerHeight: "7", refX: "5", refY: "3.5", orient: "auto", children: /* @__PURE__ */ i("polygon", { points: "0 0, 7 3.5, 0 7", fill: "var(--j-warn)" }) }),
            /* @__PURE__ */ i("marker", { id: `${c}-ae`, markerWidth: "7", markerHeight: "7", refX: "5", refY: "3.5", orient: "auto", children: /* @__PURE__ */ i("polygon", { points: "0 0, 7 3.5, 0 7", fill: "var(--j-err)" }) }),
            /* @__PURE__ */ i("marker", { id: `${c}-ag`, markerWidth: "7", markerHeight: "7", refX: "5", refY: "3.5", orient: "auto", children: /* @__PURE__ */ i("polygon", { points: "0 0, 7 3.5, 0 7", fill: "var(--j-ok)" }) })
          ] }),
          t.map((y) => {
            const j = l[y.from], v = l[y.to];
            if (!j || !v) return null;
            const [S, w] = k(j, v, y.from, !0), [m, D] = k(v, j, y.to, !1), O = S + (m - S) * 0.5, T = w, F = m - (m - S) * 0.5, R = D, L = `M ${oe(S)} ${oe(w)} C ${oe(O)} ${oe(T)} ${oe(F)} ${oe(R)} ${oe(m)} ${oe(D)}`, G = fc(y.color), q = `ep-${c}-${y.from}-${y.to}`, ye = y.arrow ?? !0 ? `url(#${c}-${hc(y.color)})` : "none", be = y.style === "dashed" ? "6,4" : y.style === "dotted" ? "2,4" : void 0;
            return /* @__PURE__ */ g("g", { "data-edge": `${y.from}-${y.to}`, children: [
              /* @__PURE__ */ i("path", { d: L, fill: "none", stroke: G, strokeWidth: 5, strokeOpacity: 0.1 }),
              /* @__PURE__ */ i(
                "path",
                {
                  id: q,
                  d: L,
                  fill: "none",
                  stroke: G,
                  strokeWidth: 1.5,
                  strokeDasharray: be,
                  markerEnd: ye
                }
              ),
              (y.animated ?? !0) && /* @__PURE__ */ i(
                "circle",
                {
                  r: "3",
                  fill: G,
                  opacity: 0.9,
                  style: { filter: `drop-shadow(0 0 3px ${G})` },
                  children: /* @__PURE__ */ i("animateMotion", { dur: `${y.animDur ?? 2}s`, repeatCount: "indefinite", children: /* @__PURE__ */ i("mpath", { href: `#${q}` }) })
                }
              ),
              y.label && /* @__PURE__ */ i(
                "text",
                {
                  x: oe((S + m) / 2),
                  y: oe((w + D) / 2 - 10),
                  textAnchor: "middle",
                  fontFamily: "'Courier New',monospace",
                  fontSize: "8",
                  fill: G,
                  letterSpacing: "1",
                  opacity: "0.85",
                  children: y.label
                }
              )
            ] }, q);
          })
        ] }),
        e.map((y) => {
          const j = l[y.id];
          if (!j) return null;
          const v = kr(y.color), S = f === y.id, w = y.type ?? "chip";
          return /* @__PURE__ */ g(
            "div",
            {
              "data-node-id": y.id,
              "data-node-type": w,
              "data-selected": S ? "true" : "false",
              style: {
                position: "absolute",
                left: j.x,
                top: j.y,
                width: j.w,
                height: j.h,
                zIndex: S ? 20 : 3,
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
                  border: `2px solid ${v}`,
                  boxShadow: `0 0 18px ${v}, inset 0 0 16px var(--j-accent-05)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  filter: S ? "brightness(1.35)" : "none"
                }, children: [
                  /* @__PURE__ */ i("div", { style: {
                    position: "absolute",
                    inset: 5,
                    borderRadius: "50%",
                    border: `1px solid ${v}`,
                    opacity: 0.25,
                    animation: "j-spin 5s linear infinite"
                  } }),
                  /* @__PURE__ */ i("div", { style: { fontSize: 12, fontWeight: 700, color: v, letterSpacing: ".05em", textShadow: `0 0 8px ${v}`, zIndex: 1 }, children: y.label }),
                  y.sub && /* @__PURE__ */ i("div", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".10em", zIndex: 1 }, children: y.sub })
                ] }),
                w === "diamond" && /* @__PURE__ */ g("div", { style: { width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }, children: [
                  /* @__PURE__ */ i("div", { style: {
                    position: "absolute",
                    inset: 0,
                    clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
                    background: "var(--j-bg-card)",
                    border: `2px solid ${v}`,
                    boxShadow: `0 0 12px ${v}`,
                    filter: S ? "brightness(1.3)" : "none"
                  } }),
                  /* @__PURE__ */ g("div", { style: { position: "relative", zIndex: 1, textAlign: "center" }, children: [
                    /* @__PURE__ */ i("div", { style: { fontSize: 8, fontWeight: 700, color: v, letterSpacing: ".12em", textTransform: "uppercase" }, children: y.label }),
                    y.sub && /* @__PURE__ */ i("div", { style: { fontSize: 7, color: "var(--j-text-muted)" }, children: y.sub })
                  ] })
                ] }),
                w === "hex" && /* @__PURE__ */ g("div", { style: { width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }, children: [
                  /* @__PURE__ */ i("div", { style: {
                    position: "absolute",
                    inset: 0,
                    clipPath: "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)",
                    background: "var(--j-bg-card)",
                    border: `2px solid ${v}`,
                    boxShadow: `0 0 12px ${v}`,
                    filter: S ? "brightness(1.3)" : "none"
                  } }),
                  /* @__PURE__ */ g("div", { style: { position: "relative", zIndex: 1, textAlign: "center" }, children: [
                    /* @__PURE__ */ i("div", { style: { fontSize: 8, fontWeight: 700, color: v, letterSpacing: ".12em" }, children: y.label }),
                    y.sub && /* @__PURE__ */ i("div", { style: { fontSize: 7, color: "var(--j-text-muted)" }, children: y.sub })
                  ] })
                ] }),
                w === "chip" && /* @__PURE__ */ g("div", { style: {
                  width: "100%",
                  height: "100%",
                  clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                  background: "var(--j-bg-card)",
                  border: `1px solid ${v}`,
                  borderLeft: `3px solid ${v}`,
                  boxShadow: S ? `0 0 16px ${v}` : "0 0 5px var(--j-accent-12)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 12px",
                  position: "relative",
                  overflow: "hidden",
                  filter: S ? "brightness(1.2)" : "none"
                }, children: [
                  /* @__PURE__ */ i("div", { style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: `linear-gradient(90deg,transparent,${v},transparent)`,
                    animation: "j-scan-v 3s ease-in-out infinite"
                  } }),
                  /* @__PURE__ */ i("div", { style: {
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: v,
                    boxShadow: `0 0 5px ${v}`,
                    animation: y.pulse ? "j-pulse 1.4s ease-in-out infinite" : "none"
                  } }),
                  /* @__PURE__ */ g("div", { style: { flex: 1, minWidth: 0 }, children: [
                    /* @__PURE__ */ i("div", { style: {
                      fontSize: 9,
                      fontWeight: 700,
                      color: v,
                      letterSpacing: ".13em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }, children: y.label }),
                    y.sub && /* @__PURE__ */ i("div", { style: { fontSize: 7, color: "var(--j-text-muted)", letterSpacing: ".07em" }, children: y.sub })
                  ] }),
                  y.value && /* @__PURE__ */ i("div", { style: {
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--j-text-primary)",
                    flexShrink: 0,
                    paddingLeft: 8,
                    borderLeft: `1px solid ${v}`
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
              /* @__PURE__ */ i("div", { style: {
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
        o && /* @__PURE__ */ i("div", { style: { position: "absolute", bottom: 8, right: 10, zIndex: 30, pointerEvents: "none", display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }, children: /* @__PURE__ */ i(
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
  Hc as JAccordion,
  Yc as JAlert,
  Gc as JArcMeter,
  fr as JBadge,
  Xc as JBarChart,
  el as JBootScreen,
  kc as JButton,
  xa as JCard,
  Dc as JCheckbox,
  nl as JCommandPalette,
  Ws as JDataRow,
  $c as JDatePicker,
  Ec as JDateRangePicker,
  Ic as JDivider,
  Uc as JDonutChart,
  Tc as JFormField,
  Qc as JGaugeChart,
  He as JHudBar,
  jc as JHudFrame,
  wc as JHudFrameCard,
  Fc as JHudLabel,
  Sc as JInput,
  Kc as JLineChart,
  _c as JModal,
  bc as JNavItem,
  ol as JNodeGraph,
  Vc as JOrb,
  xc as JPageLayout,
  Jc as JPagination,
  Ns as JProgress,
  Zc as JRadarChart,
  al as JRadialItem,
  rl as JRadialMenu,
  Oc as JRadio,
  Mc as JSelect,
  da as JSidebar,
  Wc as JSlider,
  Lc as JSparkline,
  Pt as JSpinner,
  zc as JStatCard,
  ws as JStatusPill,
  Ys as JTab,
  tl as JTable,
  Rc as JTabs,
  Nc as JTextArea,
  vc as JThemePicker,
  yc as JThemeProvider,
  Pc as JTimePicker,
  Bc as JToastProvider,
  Cc as JToggle,
  qc as JWaveform,
  H as JarvisTokens,
  Ct as PRESETS,
  wr as RadialMenuContext,
  na as toCss,
  oc as useRadialMenu,
  oa as useTheme,
  Ac as useToast
};
