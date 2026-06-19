import { jsx as e, jsxs as c, Fragment as g } from "react/jsx-runtime";
import { createContext as I, useState as y, useEffect as A, useContext as B } from "react";
function N(t) {
  let a = t.replace("#", "");
  a.length === 3 && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]);
  const r = parseInt(a.slice(0, 2), 16), i = parseInt(a.slice(2, 4), 16), n = parseInt(a.slice(4, 6), 16);
  return `${r},${i},${n}`;
}
function E(t) {
  let a = t.replace("#", "");
  a.length === 3 && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]);
  const r = Math.max(0, parseInt(a.slice(0, 2), 16) - 4), i = Math.max(0, parseInt(a.slice(2, 4), 16) - 2), n = Math.max(0, parseInt(a.slice(4, 6), 16) - 2);
  return `#${r.toString(16).padStart(2, "0")}${i.toString(16).padStart(2, "0")}${n.toString(16).padStart(2, "0")}`;
}
function R(t) {
  const a = N(t.accent), r = N(t.warn), i = N(t.err), n = N(t.ok), l = N(t.bg);
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
  --j-warn-05:      rgba(${r}, 0.05);
  --j-warn-12:      rgba(${r}, 0.12);
  --j-warn-25:      rgba(${r}, 0.25);
  --j-warn-50:      rgba(${r}, 0.50);

  --j-err:          ${t.err};
  --j-err-05:       rgba(${i}, 0.05);
  --j-err-12:       rgba(${i}, 0.12);
  --j-err-25:       rgba(${i}, 0.25);
  --j-err-50:       rgba(${i}, 0.50);

  --j-ok:           ${t.ok};
  --j-ok-05:        rgba(${n}, 0.05);
  --j-ok-12:        rgba(${n}, 0.12);
  --j-ok-25:        rgba(${n}, 0.25);

  --j-bg:           ${t.bg};
  --j-bg-card:      ${t.bgCard};
  --j-bg-card-alt:  ${t.bgCardAlt};
  --j-bg-danger:    ${E(t.bg)};
  --j-bg-overlay:   rgba(${l},0.92);

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
}`;
}
const x = {
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
}, w = {
  cyan: { name: "Cyan", preset: "cyan", ...x },
  amber: {
    name: "Amber",
    preset: "amber",
    ...x,
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
    ...x,
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
    ...x,
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
    ...x,
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
    ...x,
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
}, z = {
  CornerBracket: "j-card-s1",
  Notched: "j-card-s2",
  SideRail: "j-card-s3",
  GlowBorder: "j-card-s4",
  PartialBorder: "j-card-s5",
  DangerPulse: "j-card-s6",
  Hexagonal: "j-card-s7",
  Radar: "j-card-s8",
  DoubleFrame: "j-card-s9"
}, M = {
  LeftNotch: "j-btn-left-notch",
  RightNotch: "j-btn-right-notch",
  BothNotch: "j-btn-both-notch",
  Parallelogram: "j-btn-parallelogram",
  GhostSkew: "j-btn-ghost-skew",
  BracketFrame: "j-btn-bracket",
  Hexagonal: "j-btn-hex",
  IconSquare: "j-btn-icon-sq",
  ScanFull: "j-btn-scan-full"
}, f = {
  color: (t) => t ? `j-color-${t}` : "",
  size: (t) => t ? `j-size-${t}` : "",
  variant: (t) => t ? `j-variant-${t}` : "",
  state: (t) => t ? `j-state-${t}` : "",
  animSpeed: (t) => t ? `j-anim-${t}` : "",
  cardStyle: (t) => t ? z[t] : "",
  buttonShape: (t) => t ? M[t] : "",
  cls: (...t) => t.filter(Boolean).join(" ")
}, P = I(null);
function Q({ children: t, preset: a = "cyan", theme: r }) {
  const [i, n] = y(r ?? w[a]);
  A(() => {
    let o = document.getElementById("jarvis-theme-vars");
    o || (o = document.createElement("style"), o.id = "jarvis-theme-vars", document.head.appendChild(o)), o.textContent = R(i);
  }, [i]);
  const l = (o) => n(o), s = (o) => n(w[o]);
  return /* @__PURE__ */ e(P.Provider, { value: { theme: i, setTheme: l, setPreset: s }, children: t });
}
function F() {
  const t = B(P);
  if (!t) throw new Error("useTheme must be used inside JThemeProvider");
  return t;
}
const J = [
  { preset: "cyan", color: "var(--j-accent)", label: "Cyan" },
  { preset: "amber", color: "var(--j-warn)", label: "Amber" },
  { preset: "green", color: "var(--j-ok)", label: "Green" },
  { preset: "red", color: "var(--j-err)", label: "Red" },
  { preset: "purple", color: w.purple.accent, label: "Purple" },
  { preset: "white", color: "var(--j-accent-deep)", label: "White" }
];
function Z({ compact: t = !1, showCustom: a = !0 }) {
  const { theme: r, setPreset: i, setTheme: n } = F(), [l, s] = y(!1), [o, u] = y(r.accent), [m, b] = y(r.bg), [j, p] = y(r.bgCard);
  function h(d, S) {
    const $ = t ? "20px" : "48px", v = t ? "4px" : "6px";
    return {
      width: $,
      height: t ? "20px" : "32px",
      background: d,
      border: `2px solid ${S ? "var(--j-text-primary)" : "transparent"}`,
      boxShadow: S ? `0 0 12px ${d}` : "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      clipPath: `polygon(${v} 0,100% 0,calc(100% - ${v}) 100%,0 100%)`,
      transition: "all .15s"
    };
  }
  function k() {
    s(!0), n({
      ...r,
      name: "Custom",
      preset: "cyan",
      accent: o,
      accentMid: o,
      accentDim: o,
      bg: m,
      bgCard: j,
      bgCardAlt: j
    });
  }
  return /* @__PURE__ */ c("div", { style: {
    fontFamily: "'Courier New', monospace",
    padding: t ? "0" : "12px 14px"
  }, children: [
    !t && /* @__PURE__ */ e("div", { style: {
      fontSize: "9px",
      color: "var(--j-accent-70)",
      letterSpacing: ".14em",
      textTransform: "uppercase",
      marginBottom: "8px"
    }, children: "Theme" }),
    /* @__PURE__ */ e("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" }, children: J.map(({ preset: d, color: S, label: $ }) => {
      const v = !l && r.preset === d;
      return /* @__PURE__ */ e(
        "button",
        {
          title: $,
          "aria-pressed": v,
          onClick: () => {
            s(!1), i(d);
          },
          style: h(S, v),
          children: !t && /* @__PURE__ */ e("span", { style: {
            fontSize: "9px",
            fontFamily: "'Courier New', monospace",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: v ? "var(--j-bg)" : S,
            marginTop: "2px"
          }, children: $ })
        },
        d
      );
    }) }),
    a && !t && /* @__PURE__ */ c("div", { style: { marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }, children: [
      /* @__PURE__ */ e("div", { style: {
        fontSize: "9px",
        color: "var(--j-accent-70)",
        letterSpacing: ".14em",
        textTransform: "uppercase",
        marginBottom: "2px"
      }, children: "Custom accent" }),
      /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "color",
            value: o,
            onChange: (d) => u(d.target.value),
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
        /* @__PURE__ */ e("span", { style: {
          fontSize: "10px",
          color: "var(--j-text-muted)",
          fontFamily: "'Courier New', monospace"
        }, children: o })
      ] }),
      /* @__PURE__ */ c("div", { style: { display: "flex", gap: "6px" }, children: [
        /* @__PURE__ */ c("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ e("div", { style: { fontSize: "8px", color: "var(--j-text-dim)", marginBottom: "3px" }, children: "Background" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "color",
              value: m,
              onChange: (d) => b(d.target.value),
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
        /* @__PURE__ */ c("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ e("div", { style: { fontSize: "8px", color: "var(--j-text-dim)", marginBottom: "3px" }, children: "Card" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "color",
              value: j,
              onChange: (d) => p(d.target.value),
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
      /* @__PURE__ */ e(
        "button",
        {
          onClick: k,
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
const L = [
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
], T = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10], _ = Array.from({ length: 20 }, (t, a) => ({
  h: 8 + (a * 7 + 3) % 11,
  dur: `${0.8 + a * 13 % 10 / 10}s`,
  dly: `${a * 7 % 10 / 10}s`
}));
function C({
  position: t = "top",
  color: a = "cyan",
  animSpeed: r = "normal",
  systemLabel: i,
  showDots: n = !0,
  showWaveform: l = !1,
  showTicks: s = !1,
  showLive: o = !1,
  showRec: u = !1,
  tickCount: m = 16,
  tickActive: b = 12,
  children: j
}) {
  return /* @__PURE__ */ c("div", { className: f.cls(
    t === "top" ? "j-hud-bar-top" : "j-hud-bar-bot",
    f.color(a),
    f.animSpeed(r)
  ), children: [
    i && /* @__PURE__ */ e("span", { className: "j-text-xs", children: i }),
    n && /* @__PURE__ */ e("div", { className: "j-dot-seq", children: L.map((p, h) => /* @__PURE__ */ e(
      "div",
      {
        className: f.cls("j-d", p === "sq" && "sq", p === "tall" && "tall"),
        style: { animationDelay: `${(h * 0.08).toFixed(2)}s` }
      },
      h
    )) }),
    /* @__PURE__ */ e("div", { style: { flex: 1, height: 1, background: "linear-gradient(90deg,var(--j-accent-25),transparent)" } }),
    s && /* @__PURE__ */ c(g, { children: [
      /* @__PURE__ */ e("div", { className: "j-tick-row", children: Array.from({ length: m }, (p, h) => /* @__PURE__ */ e(
        "div",
        {
          className: f.cls("j-tk", h >= b && "off"),
          style: { height: T[h % T.length] }
        },
        h
      )) }),
      /* @__PURE__ */ e("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", flexShrink: 0 } })
    ] }),
    l && /* @__PURE__ */ c(g, { children: [
      /* @__PURE__ */ e("div", { className: "j-waveform", style: { flex: 1, maxWidth: 260 }, children: _.map((p, h) => /* @__PURE__ */ e(
        "div",
        {
          className: "j-wv",
          style: { height: p.h, "--j-wv-dur": p.dur, "--j-wv-dly": p.dly }
        },
        h
      )) }),
      /* @__PURE__ */ e("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", flexShrink: 0 } })
    ] }),
    j,
    o && /* @__PURE__ */ e("span", { className: "j-text-xs j-blink", children: "● LIVE" }),
    u && /* @__PURE__ */ e("span", { className: "j-text-xs j-blink", style: { color: "var(--j-err)" }, children: "● REC" })
  ] });
}
function H({ size: t = "64px", color: a = "cyan", label: r, showLabel: i = !0 }) {
  const n = parseFloat(t);
  return /* @__PURE__ */ c("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ c(
      "div",
      {
        className: f.color(a),
        style: { position: "relative", width: t, height: t, flexShrink: 0 },
        children: [
          /* @__PURE__ */ e("div", { style: {
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid transparent",
            borderTopColor: "var(--j-accent)",
            borderBottomColor: "var(--j-accent-25)",
            animation: "j-spin var(--j-dur-spin) linear infinite"
          } }),
          /* @__PURE__ */ e("div", { style: {
            position: "absolute",
            inset: `${Math.round(n * 0.17)}px`,
            borderRadius: "50%",
            border: "1px dashed transparent",
            borderTopColor: "var(--j-accent-dim)",
            borderRightColor: "var(--j-accent-dim)",
            animation: "j-spin-rev 6s linear infinite"
          } }),
          /* @__PURE__ */ e("div", { style: {
            position: "absolute",
            inset: `${Math.round(n * 0.28)}px`,
            borderRadius: "50%",
            border: "1px solid transparent",
            borderTopColor: "var(--j-accent-mid)",
            animation: "j-spin 3s linear infinite"
          } }),
          /* @__PURE__ */ e("div", { style: {
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
    i && r && /* @__PURE__ */ e("span", { style: {
      fontSize: 9,
      color: "var(--j-accent)",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      fontFamily: "'Courier New', monospace"
    }, children: r })
  ] });
}
const q = {
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
function ee({ href: t, icon: a, label: r, badge: i, active: n = !1, onClick: l }) {
  const s = {
    ...q,
    padding: n ? "10px 14px 10px 16px" : "10px 14px",
    background: n ? "var(--j-accent-08)" : "transparent",
    color: n ? "var(--j-accent)" : "var(--j-text-muted)",
    borderLeft: `2px solid ${n ? "var(--j-accent)" : "transparent"}`,
    boxShadow: n ? "-2px 0 12px var(--j-accent-12)" : "none"
  }, o = /* @__PURE__ */ c(g, { children: [
    n && /* @__PURE__ */ e("div", { style: {
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: 2,
      height: "60%",
      background: "var(--j-accent)",
      boxShadow: "0 0 8px var(--j-accent)"
    } }),
    a && /* @__PURE__ */ e("span", { style: { fontSize: 14, color: n ? "var(--j-accent)" : "var(--j-text-dim)", flexShrink: 0 }, children: a }),
    r && /* @__PURE__ */ e("span", { style: { flex: 1 }, children: r }),
    i && /* @__PURE__ */ e("span", { style: {
      fontSize: 9,
      letterSpacing: ".06em",
      padding: "2px 6px",
      background: "var(--j-accent-12)",
      color: "var(--j-accent)",
      clipPath: "polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)"
    }, children: i })
  ] });
  return t ? /* @__PURE__ */ e("a", { href: t, style: s, children: o }) : /* @__PURE__ */ e("button", { type: "button", onClick: l, style: s, children: o });
}
function D() {
  const t = /* @__PURE__ */ new Date();
  return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function G({
  systemName: t = "JARVIS",
  version: a = "v4.2.1",
  navLabel: r = "Navigation",
  width: i = "220px",
  color: n = "cyan",
  children: l,
  footer: s
}) {
  const [o, u] = y(D);
  return A(() => {
    const m = setInterval(() => u(D()), 1e4);
    return () => clearInterval(m);
  }, []), /* @__PURE__ */ c(
    "aside",
    {
      className: f.cls("j-sidebar", f.color(n)),
      style: { width: i, flexShrink: 0 },
      children: [
        /* @__PURE__ */ e("div", { style: {
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
        /* @__PURE__ */ c("div", { style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 14px 14px",
          borderBottom: "1px solid var(--j-accent-12)",
          gap: 8
        }, children: [
          /* @__PURE__ */ e(H, { size: "36px", color: n }),
          /* @__PURE__ */ e("div", { className: "j-glitch", style: {
            fontSize: 13,
            letterSpacing: ".20em",
            textTransform: "uppercase",
            color: "var(--j-accent)",
            fontFamily: "'Courier New', monospace"
          }, children: t }),
          /* @__PURE__ */ e("div", { style: { fontSize: 8, color: "var(--j-text-dim)", letterSpacing: ".12em" }, children: a }),
          /* @__PURE__ */ e("div", { className: "j-status-dot" })
        ] }),
        r && /* @__PURE__ */ e("div", { style: {
          fontSize: 8,
          color: "var(--j-accent-70)",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          padding: "10px 14px 6px"
        }, children: r }),
        /* @__PURE__ */ e("nav", { style: { flex: 1, overflowY: "auto", overflowX: "hidden" }, children: l }),
        /* @__PURE__ */ e("div", { style: { height: 1, background: "linear-gradient(90deg,transparent,var(--j-accent-25),transparent)", margin: "0 8px" } }),
        s && /* @__PURE__ */ e("div", { style: { padding: "8px 14px" }, children: s }),
        /* @__PURE__ */ c("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 14px",
          fontFamily: "'Courier New', monospace",
          fontSize: 8,
          color: "var(--j-text-dim)",
          letterSpacing: ".08em"
        }, children: [
          /* @__PURE__ */ c("span", { children: [
            "SYS · ",
            o
          ] }),
          /* @__PURE__ */ e("span", { className: "j-blink", style: { color: "var(--j-ok)", letterSpacing: ".10em" }, children: "● LIVE" })
        ] })
      ]
    }
  );
}
function te({
  systemName: t = "JARVIS",
  version: a = "v4.2.1",
  color: r = "cyan",
  showSidebar: i = !0,
  sidebarWidth: n = "220px",
  navLabel: l = "Navigation",
  showTicks: s = !1,
  showWaveform: o = !1,
  showLive: u = !0,
  showRec: m = !1,
  contentPadding: b = "12px",
  sidebar: j,
  sidebarFooter: p,
  topBar: h,
  bottomBar: k,
  children: d
}) {
  return /* @__PURE__ */ c("div", { className: "j-root", children: [
    /* @__PURE__ */ e(
      C,
      {
        position: "top",
        color: r,
        systemLabel: t,
        showDots: !0,
        showTicks: s,
        showWaveform: o,
        showLive: u,
        showRec: m,
        children: h
      }
    ),
    /* @__PURE__ */ c("div", { className: "j-shell", children: [
      i && /* @__PURE__ */ e(
        G,
        {
          systemName: t,
          version: a,
          navLabel: l,
          width: n,
          color: r,
          footer: p,
          children: j
        }
      ),
      /* @__PURE__ */ c("div", { className: "j-content", children: [
        /* @__PURE__ */ c("div", { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }, children: [
          /* @__PURE__ */ e("div", { style: {
            position: "absolute",
            top: 4,
            left: 4,
            width: 16,
            height: 16,
            borderTop: "1px solid var(--j-accent-50)",
            borderLeft: "1px solid var(--j-accent-50)",
            animation: "j-corner-blink var(--j-dur-corner) ease-in-out infinite 0s"
          } }),
          /* @__PURE__ */ e("div", { style: {
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
        /* @__PURE__ */ e("div", { className: "j-scroll", style: { padding: b, position: "relative", zIndex: 1 }, children: d })
      ] })
    ] }),
    /* @__PURE__ */ e(
      C,
      {
        position: "bottom",
        color: r,
        showDots: !1,
        showWaveform: o,
        showTicks: s,
        children: k
      }
    )
  ] });
}
function ae({
  color: t = "cyan",
  systemLabel: a = "JARVIS · SYS",
  showTop: r = !0,
  showBottom: i = !0,
  showDots: n = !0,
  showLive: l = !1,
  showWaveform: s = !1,
  showTicks: o = !1,
  showRec: u = !1,
  contentPadding: m = "16px",
  children: b,
  topContent: j,
  bottomContent: p
}) {
  return /* @__PURE__ */ c("div", { className: "j-hud-frame", style: { position: "relative", minHeight: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ e("div", { className: "j-hf-corner tl" }),
    /* @__PURE__ */ e("div", { className: "j-hf-corner tr" }),
    /* @__PURE__ */ e("div", { className: "j-hf-corner bl" }),
    /* @__PURE__ */ e("div", { className: "j-hf-corner br" }),
    /* @__PURE__ */ e("div", { style: {
      position: "absolute",
      top: 8,
      left: 36,
      right: 36,
      height: 1,
      background: "linear-gradient(90deg,transparent,var(--j-accent-25),transparent)",
      opacity: 0.15,
      pointerEvents: "none"
    } }),
    /* @__PURE__ */ e("div", { style: {
      position: "absolute",
      bottom: 8,
      left: 36,
      right: 36,
      height: 1,
      background: "linear-gradient(90deg,transparent,var(--j-accent-25),transparent)",
      opacity: 0.15,
      pointerEvents: "none"
    } }),
    r && /* @__PURE__ */ e(
      C,
      {
        position: "top",
        color: t,
        systemLabel: a,
        showDots: n,
        showLive: l,
        showWaveform: s,
        showTicks: o,
        showRec: u,
        children: j
      }
    ),
    /* @__PURE__ */ e("div", { style: { flex: 1, padding: m }, children: b }),
    i && /* @__PURE__ */ e(C, { position: "bottom", color: t, showDots: !1, showWaveform: s, children: p })
  ] });
}
function Y() {
  return /* @__PURE__ */ c(g, { children: [
    /* @__PURE__ */ c("div", { className: "j-hfc-corner j-hfc-tl", children: [
      /* @__PURE__ */ e("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ e("div", { className: "j-hfc-corner-inner" }),
      /* @__PURE__ */ e("div", { className: "j-hfc-tick-h" }),
      /* @__PURE__ */ e("div", { className: "j-hfc-tick-v" })
    ] }),
    /* @__PURE__ */ c("div", { className: "j-hfc-corner j-hfc-tr", children: [
      /* @__PURE__ */ e("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ e("div", { className: "j-hfc-circ" })
    ] }),
    /* @__PURE__ */ c("div", { className: "j-hfc-corner j-hfc-bl", children: [
      /* @__PURE__ */ e("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ e("div", { className: "j-hfc-circ" })
    ] }),
    /* @__PURE__ */ c("div", { className: "j-hfc-corner j-hfc-br", children: [
      /* @__PURE__ */ e("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ e("div", { className: "j-hfc-corner-inner" }),
      /* @__PURE__ */ e("div", { className: "j-hfc-tick-h" }),
      /* @__PURE__ */ e("div", { className: "j-hfc-tick-v" })
    ] })
  ] });
}
function V() {
  return /* @__PURE__ */ c(g, { children: [
    /* @__PURE__ */ e("div", { className: "j-hfc-beta-rail-t" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-beta-rail-b" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-beta-notch-tl" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-beta-notch-br" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-beta-pip-l" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-beta-pip-r" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-scan-h" })
  ] });
}
function W() {
  return /* @__PURE__ */ c(g, { children: [
    ["tl1", "tl2", "tr1", "tr2", "bl1", "bl2", "br1", "br2"].map((t) => /* @__PURE__ */ e("div", { className: `j-hfc-g-seg-${t}` }, t)),
    /* @__PURE__ */ e("div", { className: "j-hfc-g-center-ring" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-scan-v" })
  ] });
}
function O() {
  return /* @__PURE__ */ c(g, { children: [
    /* @__PURE__ */ e("div", { className: "j-hfc-d-top-bar" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-d-bot-bar" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-d-l-rail" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-d-r-rail" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-d-tl-block" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-d-tr-block" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-d-bl-block" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-d-br-block" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-scan-h" }),
    /* @__PURE__ */ e("div", { className: "j-hfc-scan-v" })
  ] });
}
const K = {
  Alpha: "j-hfc-alpha",
  Beta: "j-hfc-beta",
  Gamma: "j-hfc-gamma",
  Delta: "j-hfc-delta"
};
function re({
  frameStyle: t = "Alpha",
  color: a = "cyan",
  title: r,
  frameId: i,
  showStatusDot: n = !0,
  width: l = "100%",
  height: s = "100%",
  children: o
}) {
  return /* @__PURE__ */ c(
    "div",
    {
      className: f.cls("j-hfc", K[t], f.color(a)),
      style: { width: l, height: s },
      children: [
        t === "Alpha" && /* @__PURE__ */ e(Y, {}),
        t === "Beta" && /* @__PURE__ */ e(V, {}),
        t === "Gamma" && /* @__PURE__ */ e(W, {}),
        t === "Delta" && /* @__PURE__ */ e(O, {}),
        t === "Alpha" && /* @__PURE__ */ c(g, { children: [
          /* @__PURE__ */ e("div", { className: "j-hfc-scan-h" }),
          /* @__PURE__ */ e("div", { className: "j-hfc-scan-v" })
        ] }),
        r && /* @__PURE__ */ c("div", { className: "j-hfc-title", children: [
          n && /* @__PURE__ */ e("span", { className: "j-hfc-dot" }),
          r
        ] }),
        i && /* @__PURE__ */ e("div", { className: "j-hfc-id", children: i }),
        /* @__PURE__ */ e("div", { className: "j-hfc-body", children: o })
      ]
    }
  );
}
export {
  C as JHudBar,
  ae as JHudFrame,
  re as JHudFrameCard,
  ee as JNavItem,
  te as JPageLayout,
  G as JSidebar,
  H as JSpinner,
  Z as JThemePicker,
  Q as JThemeProvider,
  f as JarvisTokens,
  w as PRESETS,
  R as toCss,
  F as useTheme
};
