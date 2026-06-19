import { jsx as d, jsxs as k, Fragment as G } from "react/jsx-runtime";
import p, { createContext as _t, useState as q, useEffect as we, useContext as Bt, useCallback as U, useRef as be, useLayoutEffect as Gn, useMemo as _e } from "react";
function Se(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
  const n = parseInt(t.slice(0, 2), 16), r = parseInt(t.slice(2, 4), 16), a = parseInt(t.slice(4, 6), 16);
  return `${n},${r},${a}`;
}
function Jn(e) {
  let t = e.replace("#", "");
  t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
  const n = Math.max(0, parseInt(t.slice(0, 2), 16) - 4), r = Math.max(0, parseInt(t.slice(2, 4), 16) - 2), a = Math.max(0, parseInt(t.slice(4, 6), 16) - 2);
  return `#${n.toString(16).padStart(2, "0")}${r.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`;
}
function Vn(e) {
  const t = Se(e.accent), n = Se(e.warn), r = Se(e.err), a = Se(e.ok), o = Se(e.bg);
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
  --j-bg-danger:    ${Jn(e.bg)};
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
const me = {
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
}, nt = {
  cyan: { name: "Cyan", preset: "cyan", ...me },
  amber: {
    name: "Amber",
    preset: "amber",
    ...me,
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
    ...me,
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
    ...me,
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
    ...me,
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
    ...me,
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
}, Qn = {
  CornerBracket: "j-card-s1",
  Notched: "j-card-s2",
  SideRail: "j-card-s3",
  GlowBorder: "j-card-s4",
  PartialBorder: "j-card-s5",
  DangerPulse: "j-card-s6",
  Hexagonal: "j-card-s7",
  Radar: "j-card-s8",
  DoubleFrame: "j-card-s9"
}, Xn = {
  LeftNotch: "j-btn-left-notch",
  RightNotch: "j-btn-right-notch",
  BothNotch: "j-btn-both-notch",
  Parallelogram: "j-btn-parallelogram",
  GhostSkew: "j-btn-ghost-skew",
  BracketFrame: "j-btn-bracket",
  Hexagonal: "j-btn-hex",
  IconSquare: "j-btn-icon-sq",
  ScanFull: "j-btn-scan-full"
}, z = {
  color: (e) => e ? `j-color-${e}` : "",
  size: (e) => e ? `j-size-${e}` : "",
  variant: (e) => e ? `j-variant-${e}` : "",
  state: (e) => e ? `j-state-${e}` : "",
  animSpeed: (e) => e ? `j-anim-${e}` : "",
  cardStyle: (e) => e ? Qn[e] : "",
  buttonShape: (e) => e ? Xn[e] : "",
  cls: (...e) => e.filter(Boolean).join(" ")
}, $t = _t(null);
function fs({ children: e, preset: t = "cyan", theme: n }) {
  const [r, a] = q(n ?? nt[t]);
  we(() => {
    let i = document.getElementById("jarvis-theme-vars");
    i || (i = document.createElement("style"), i.id = "jarvis-theme-vars", document.head.appendChild(i)), i.textContent = Vn(r);
  }, [r]);
  const o = (i) => a(i), s = (i) => a(nt[i]);
  return /* @__PURE__ */ d($t.Provider, { value: { theme: r, setTheme: o, setPreset: s }, children: e });
}
function Un() {
  const e = Bt($t);
  if (!e) throw new Error("useTheme must be used inside JThemeProvider");
  return e;
}
const Zn = [
  { preset: "cyan", color: "var(--j-accent)", label: "Cyan" },
  { preset: "amber", color: "var(--j-warn)", label: "Amber" },
  { preset: "green", color: "var(--j-ok)", label: "Green" },
  { preset: "red", color: "var(--j-err)", label: "Red" },
  { preset: "purple", color: nt.purple.accent, label: "Purple" },
  { preset: "white", color: "var(--j-accent-deep)", label: "White" }
];
function hs({ compact: e = !1, showCustom: t = !0 }) {
  const { theme: n, setPreset: r, setTheme: a } = Un(), [o, s] = q(!1), [i, c] = q(n.accent), [l, u] = q(n.bg), [f, m] = q(n.bgCard);
  function y(x, D) {
    const N = e ? "20px" : "48px", b = e ? "4px" : "6px";
    return {
      width: N,
      height: e ? "20px" : "32px",
      background: x,
      border: `2px solid ${D ? "var(--j-text-primary)" : "transparent"}`,
      boxShadow: D ? `0 0 12px ${x}` : "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      clipPath: `polygon(${b} 0,100% 0,calc(100% - ${b}) 100%,0 100%)`,
      transition: "all .15s"
    };
  }
  function w() {
    s(!0), a({
      ...n,
      name: "Custom",
      preset: "cyan",
      accent: i,
      accentMid: i,
      accentDim: i,
      bg: l,
      bgCard: f,
      bgCardAlt: f
    });
  }
  return /* @__PURE__ */ k("div", { style: {
    fontFamily: "'Courier New', monospace",
    padding: e ? "0" : "12px 14px"
  }, children: [
    !e && /* @__PURE__ */ d("div", { style: {
      fontSize: "9px",
      color: "var(--j-accent-70)",
      letterSpacing: ".14em",
      textTransform: "uppercase",
      marginBottom: "8px"
    }, children: "Theme" }),
    /* @__PURE__ */ d("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap" }, children: Zn.map(({ preset: x, color: D, label: N }) => {
      const b = !o && n.preset === x;
      return /* @__PURE__ */ d(
        "button",
        {
          title: N,
          "aria-pressed": b,
          onClick: () => {
            s(!1), r(x);
          },
          style: y(D, b),
          children: !e && /* @__PURE__ */ d("span", { style: {
            fontSize: "9px",
            fontFamily: "'Courier New', monospace",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: b ? "var(--j-bg)" : D,
            marginTop: "2px"
          }, children: N })
        },
        x
      );
    }) }),
    t && !e && /* @__PURE__ */ k("div", { style: { marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }, children: [
      /* @__PURE__ */ d("div", { style: {
        fontSize: "9px",
        color: "var(--j-accent-70)",
        letterSpacing: ".14em",
        textTransform: "uppercase",
        marginBottom: "2px"
      }, children: "Custom accent" }),
      /* @__PURE__ */ k("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
        /* @__PURE__ */ d(
          "input",
          {
            type: "color",
            value: i,
            onChange: (x) => c(x.target.value),
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
        /* @__PURE__ */ d("span", { style: {
          fontSize: "10px",
          color: "var(--j-text-muted)",
          fontFamily: "'Courier New', monospace"
        }, children: i })
      ] }),
      /* @__PURE__ */ k("div", { style: { display: "flex", gap: "6px" }, children: [
        /* @__PURE__ */ k("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ d("div", { style: { fontSize: "8px", color: "var(--j-text-dim)", marginBottom: "3px" }, children: "Background" }),
          /* @__PURE__ */ d(
            "input",
            {
              type: "color",
              value: l,
              onChange: (x) => u(x.target.value),
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
        /* @__PURE__ */ k("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ d("div", { style: { fontSize: "8px", color: "var(--j-text-dim)", marginBottom: "3px" }, children: "Card" }),
          /* @__PURE__ */ d(
            "input",
            {
              type: "color",
              value: f,
              onChange: (x) => m(x.target.value),
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
      /* @__PURE__ */ d(
        "button",
        {
          onClick: w,
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
const Kn = [
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
], gt = [12, 8, 14, 10, 6, 14, 16, 10, 12, 8, 16, 10], Ln = Array.from({ length: 20 }, (e, t) => ({
  h: 8 + (t * 7 + 3) % 11,
  dur: `${0.8 + t * 13 % 10 / 10}s`,
  dly: `${t * 7 % 10 / 10}s`
}));
function Be({
  position: e = "top",
  color: t = "cyan",
  animSpeed: n = "normal",
  systemLabel: r,
  showDots: a = !0,
  showWaveform: o = !1,
  showTicks: s = !1,
  showLive: i = !1,
  showRec: c = !1,
  tickCount: l = 16,
  tickActive: u = 12,
  children: f
}) {
  return /* @__PURE__ */ k("div", { className: z.cls(
    e === "top" ? "j-hud-bar-top" : "j-hud-bar-bot",
    z.color(t),
    z.animSpeed(n)
  ), children: [
    r && /* @__PURE__ */ d("span", { className: "j-text-xs", children: r }),
    a && /* @__PURE__ */ d("div", { className: "j-dot-seq", children: Kn.map((m, y) => /* @__PURE__ */ d(
      "div",
      {
        className: z.cls("j-d", m === "sq" && "sq", m === "tall" && "tall"),
        style: { animationDelay: `${(y * 0.08).toFixed(2)}s` }
      },
      y
    )) }),
    /* @__PURE__ */ d("div", { style: { flex: 1, height: 1, background: "linear-gradient(90deg,var(--j-accent-25),transparent)" } }),
    s && /* @__PURE__ */ k(G, { children: [
      /* @__PURE__ */ d("div", { className: "j-tick-row", children: Array.from({ length: l }, (m, y) => /* @__PURE__ */ d(
        "div",
        {
          className: z.cls("j-tk", y >= u && "off"),
          style: { height: gt[y % gt.length] }
        },
        y
      )) }),
      /* @__PURE__ */ d("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", flexShrink: 0 } })
    ] }),
    o && /* @__PURE__ */ k(G, { children: [
      /* @__PURE__ */ d("div", { className: "j-waveform", style: { flex: 1, maxWidth: 260 }, children: Ln.map((m, y) => /* @__PURE__ */ d(
        "div",
        {
          className: "j-wv",
          style: { height: m.h, "--j-wv-dur": m.dur, "--j-wv-dly": m.dly }
        },
        y
      )) }),
      /* @__PURE__ */ d("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--j-accent)", animation: "j-pulse var(--j-dur-pulse) ease-in-out infinite", flexShrink: 0 } })
    ] }),
    f,
    i && /* @__PURE__ */ d("span", { className: "j-text-xs j-blink", children: "● LIVE" }),
    c && /* @__PURE__ */ d("span", { className: "j-text-xs j-blink", style: { color: "var(--j-err)" }, children: "● REC" })
  ] });
}
function er({ size: e = "64px", color: t = "cyan", label: n, showLabel: r = !0 }) {
  const a = parseFloat(e);
  return /* @__PURE__ */ k("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ k(
      "div",
      {
        className: z.color(t),
        style: { position: "relative", width: e, height: e, flexShrink: 0 },
        children: [
          /* @__PURE__ */ d("div", { style: {
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid transparent",
            borderTopColor: "var(--j-accent)",
            borderBottomColor: "var(--j-accent-25)",
            animation: "j-spin var(--j-dur-spin) linear infinite"
          } }),
          /* @__PURE__ */ d("div", { style: {
            position: "absolute",
            inset: `${Math.round(a * 0.17)}px`,
            borderRadius: "50%",
            border: "1px dashed transparent",
            borderTopColor: "var(--j-accent-dim)",
            borderRightColor: "var(--j-accent-dim)",
            animation: "j-spin-rev 6s linear infinite"
          } }),
          /* @__PURE__ */ d("div", { style: {
            position: "absolute",
            inset: `${Math.round(a * 0.28)}px`,
            borderRadius: "50%",
            border: "1px solid transparent",
            borderTopColor: "var(--j-accent-mid)",
            animation: "j-spin 3s linear infinite"
          } }),
          /* @__PURE__ */ d("div", { style: {
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
    r && n && /* @__PURE__ */ d("span", { style: {
      fontSize: 9,
      color: "var(--j-accent)",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      fontFamily: "'Courier New', monospace"
    }, children: n })
  ] });
}
const tr = {
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
function ms({ href: e, icon: t, label: n, badge: r, active: a = !1, onClick: o }) {
  const s = {
    ...tr,
    padding: a ? "10px 14px 10px 16px" : "10px 14px",
    background: a ? "var(--j-accent-08)" : "transparent",
    color: a ? "var(--j-accent)" : "var(--j-text-muted)",
    borderLeft: `2px solid ${a ? "var(--j-accent)" : "transparent"}`,
    boxShadow: a ? "-2px 0 12px var(--j-accent-12)" : "none"
  }, i = /* @__PURE__ */ k(G, { children: [
    a && /* @__PURE__ */ d("div", { style: {
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: 2,
      height: "60%",
      background: "var(--j-accent)",
      boxShadow: "0 0 8px var(--j-accent)"
    } }),
    t && /* @__PURE__ */ d("span", { style: { fontSize: 14, color: a ? "var(--j-accent)" : "var(--j-text-dim)", flexShrink: 0 }, children: t }),
    n && /* @__PURE__ */ d("span", { style: { flex: 1 }, children: n }),
    r && /* @__PURE__ */ d("span", { style: {
      fontSize: 9,
      letterSpacing: ".06em",
      padding: "2px 6px",
      background: "var(--j-accent-12)",
      color: "var(--j-accent)",
      clipPath: "polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)"
    }, children: r })
  ] });
  return e ? /* @__PURE__ */ d("a", { href: e, style: s, children: i }) : /* @__PURE__ */ d("button", { type: "button", onClick: o, style: s, children: i });
}
function pt() {
  const e = /* @__PURE__ */ new Date();
  return `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`;
}
function nr({
  systemName: e = "JARVIS",
  version: t = "v4.2.1",
  navLabel: n = "Navigation",
  width: r = "220px",
  color: a = "cyan",
  children: o,
  footer: s
}) {
  const [i, c] = q(pt);
  return we(() => {
    const l = setInterval(() => c(pt()), 1e4);
    return () => clearInterval(l);
  }, []), /* @__PURE__ */ k(
    "aside",
    {
      className: z.cls("j-sidebar", z.color(a)),
      style: { width: r, flexShrink: 0 },
      children: [
        /* @__PURE__ */ d("div", { style: {
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
        /* @__PURE__ */ k("div", { style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 14px 14px",
          borderBottom: "1px solid var(--j-accent-12)",
          gap: 8
        }, children: [
          /* @__PURE__ */ d(er, { size: "36px", color: a }),
          /* @__PURE__ */ d("div", { className: "j-glitch", style: {
            fontSize: 13,
            letterSpacing: ".20em",
            textTransform: "uppercase",
            color: "var(--j-accent)",
            fontFamily: "'Courier New', monospace"
          }, children: e }),
          /* @__PURE__ */ d("div", { style: { fontSize: 8, color: "var(--j-text-dim)", letterSpacing: ".12em" }, children: t }),
          /* @__PURE__ */ d("div", { className: "j-status-dot" })
        ] }),
        n && /* @__PURE__ */ d("div", { style: {
          fontSize: 8,
          color: "var(--j-accent-70)",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          padding: "10px 14px 6px"
        }, children: n }),
        /* @__PURE__ */ d("nav", { style: { flex: 1, overflowY: "auto", overflowX: "hidden" }, children: o }),
        /* @__PURE__ */ d("div", { style: { height: 1, background: "linear-gradient(90deg,transparent,var(--j-accent-25),transparent)", margin: "0 8px" } }),
        s && /* @__PURE__ */ d("div", { style: { padding: "8px 14px" }, children: s }),
        /* @__PURE__ */ k("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 14px",
          fontFamily: "'Courier New', monospace",
          fontSize: 8,
          color: "var(--j-text-dim)",
          letterSpacing: ".08em"
        }, children: [
          /* @__PURE__ */ k("span", { children: [
            "SYS · ",
            i
          ] }),
          /* @__PURE__ */ d("span", { className: "j-blink", style: { color: "var(--j-ok)", letterSpacing: ".10em" }, children: "● LIVE" })
        ] })
      ]
    }
  );
}
function ys({
  systemName: e = "JARVIS",
  version: t = "v4.2.1",
  color: n = "cyan",
  showSidebar: r = !0,
  sidebarWidth: a = "220px",
  navLabel: o = "Navigation",
  showTicks: s = !1,
  showWaveform: i = !1,
  showLive: c = !0,
  showRec: l = !1,
  contentPadding: u = "12px",
  sidebar: f,
  sidebarFooter: m,
  topBar: y,
  bottomBar: w,
  children: x
}) {
  return /* @__PURE__ */ k("div", { className: "j-root", children: [
    /* @__PURE__ */ d(
      Be,
      {
        position: "top",
        color: n,
        systemLabel: e,
        showDots: !0,
        showTicks: s,
        showWaveform: i,
        showLive: c,
        showRec: l,
        children: y
      }
    ),
    /* @__PURE__ */ k("div", { className: "j-shell", children: [
      r && /* @__PURE__ */ d(
        nr,
        {
          systemName: e,
          version: t,
          navLabel: o,
          width: a,
          color: n,
          footer: m,
          children: f
        }
      ),
      /* @__PURE__ */ k("div", { className: "j-content", children: [
        /* @__PURE__ */ k("div", { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }, children: [
          /* @__PURE__ */ d("div", { style: {
            position: "absolute",
            top: 4,
            left: 4,
            width: 16,
            height: 16,
            borderTop: "1px solid var(--j-accent-50)",
            borderLeft: "1px solid var(--j-accent-50)",
            animation: "j-corner-blink var(--j-dur-corner) ease-in-out infinite 0s"
          } }),
          /* @__PURE__ */ d("div", { style: {
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
        /* @__PURE__ */ d("div", { className: "j-scroll", style: { padding: u, position: "relative", zIndex: 1 }, children: x })
      ] })
    ] }),
    /* @__PURE__ */ d(
      Be,
      {
        position: "bottom",
        color: n,
        showDots: !1,
        showWaveform: i,
        showTicks: s,
        children: w
      }
    )
  ] });
}
function gs({
  color: e = "cyan",
  systemLabel: t = "JARVIS · SYS",
  showTop: n = !0,
  showBottom: r = !0,
  showDots: a = !0,
  showLive: o = !1,
  showWaveform: s = !1,
  showTicks: i = !1,
  showRec: c = !1,
  contentPadding: l = "16px",
  children: u,
  topContent: f,
  bottomContent: m
}) {
  return /* @__PURE__ */ k("div", { className: "j-hud-frame", style: { position: "relative", minHeight: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ d("div", { className: "j-hf-corner tl" }),
    /* @__PURE__ */ d("div", { className: "j-hf-corner tr" }),
    /* @__PURE__ */ d("div", { className: "j-hf-corner bl" }),
    /* @__PURE__ */ d("div", { className: "j-hf-corner br" }),
    /* @__PURE__ */ d("div", { style: {
      position: "absolute",
      top: 8,
      left: 36,
      right: 36,
      height: 1,
      background: "linear-gradient(90deg,transparent,var(--j-accent-25),transparent)",
      opacity: 0.15,
      pointerEvents: "none"
    } }),
    /* @__PURE__ */ d("div", { style: {
      position: "absolute",
      bottom: 8,
      left: 36,
      right: 36,
      height: 1,
      background: "linear-gradient(90deg,transparent,var(--j-accent-25),transparent)",
      opacity: 0.15,
      pointerEvents: "none"
    } }),
    n && /* @__PURE__ */ d(
      Be,
      {
        position: "top",
        color: e,
        systemLabel: t,
        showDots: a,
        showLive: o,
        showWaveform: s,
        showTicks: i,
        showRec: c,
        children: f
      }
    ),
    /* @__PURE__ */ d("div", { style: { flex: 1, padding: l }, children: u }),
    r && /* @__PURE__ */ d(Be, { position: "bottom", color: e, showDots: !1, showWaveform: s, children: m })
  ] });
}
function rr() {
  return /* @__PURE__ */ k(G, { children: [
    /* @__PURE__ */ k("div", { className: "j-hfc-corner j-hfc-tl", children: [
      /* @__PURE__ */ d("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ d("div", { className: "j-hfc-corner-inner" }),
      /* @__PURE__ */ d("div", { className: "j-hfc-tick-h" }),
      /* @__PURE__ */ d("div", { className: "j-hfc-tick-v" })
    ] }),
    /* @__PURE__ */ k("div", { className: "j-hfc-corner j-hfc-tr", children: [
      /* @__PURE__ */ d("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ d("div", { className: "j-hfc-circ" })
    ] }),
    /* @__PURE__ */ k("div", { className: "j-hfc-corner j-hfc-bl", children: [
      /* @__PURE__ */ d("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ d("div", { className: "j-hfc-circ" })
    ] }),
    /* @__PURE__ */ k("div", { className: "j-hfc-corner j-hfc-br", children: [
      /* @__PURE__ */ d("div", { className: "j-hfc-corner-outer" }),
      /* @__PURE__ */ d("div", { className: "j-hfc-corner-inner" }),
      /* @__PURE__ */ d("div", { className: "j-hfc-tick-h" }),
      /* @__PURE__ */ d("div", { className: "j-hfc-tick-v" })
    ] })
  ] });
}
function ar() {
  return /* @__PURE__ */ k(G, { children: [
    /* @__PURE__ */ d("div", { className: "j-hfc-beta-rail-t" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-beta-rail-b" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-beta-notch-tl" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-beta-notch-br" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-beta-pip-l" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-beta-pip-r" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-scan-h" })
  ] });
}
function or() {
  return /* @__PURE__ */ k(G, { children: [
    ["tl1", "tl2", "tr1", "tr2", "bl1", "bl2", "br1", "br2"].map((e) => /* @__PURE__ */ d("div", { className: `j-hfc-g-seg-${e}` }, e)),
    /* @__PURE__ */ d("div", { className: "j-hfc-g-center-ring" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-scan-v" })
  ] });
}
function sr() {
  return /* @__PURE__ */ k(G, { children: [
    /* @__PURE__ */ d("div", { className: "j-hfc-d-top-bar" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-d-bot-bar" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-d-l-rail" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-d-r-rail" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-d-tl-block" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-d-tr-block" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-d-bl-block" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-d-br-block" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-scan-h" }),
    /* @__PURE__ */ d("div", { className: "j-hfc-scan-v" })
  ] });
}
const ir = {
  Alpha: "j-hfc-alpha",
  Beta: "j-hfc-beta",
  Gamma: "j-hfc-gamma",
  Delta: "j-hfc-delta"
};
function ps({
  frameStyle: e = "Alpha",
  color: t = "cyan",
  title: n,
  frameId: r,
  showStatusDot: a = !0,
  width: o = "100%",
  height: s = "100%",
  children: i
}) {
  return /* @__PURE__ */ k(
    "div",
    {
      className: z.cls("j-hfc", ir[e], z.color(t)),
      style: { width: o, height: s },
      children: [
        e === "Alpha" && /* @__PURE__ */ d(rr, {}),
        e === "Beta" && /* @__PURE__ */ d(ar, {}),
        e === "Gamma" && /* @__PURE__ */ d(or, {}),
        e === "Delta" && /* @__PURE__ */ d(sr, {}),
        e === "Alpha" && /* @__PURE__ */ k(G, { children: [
          /* @__PURE__ */ d("div", { className: "j-hfc-scan-h" }),
          /* @__PURE__ */ d("div", { className: "j-hfc-scan-v" })
        ] }),
        n && /* @__PURE__ */ k("div", { className: "j-hfc-title", children: [
          a && /* @__PURE__ */ d("span", { className: "j-hfc-dot" }),
          n
        ] }),
        r && /* @__PURE__ */ d("div", { className: "j-hfc-id", children: r }),
        /* @__PURE__ */ d("div", { className: "j-hfc-body", children: i })
      ]
    }
  );
}
const cr = /* @__PURE__ */ new Set(["LeftNotch", "RightNotch", "BothNotch"]), lr = /* @__PURE__ */ new Set(["Parallelogram", "GhostSkew", "BracketFrame", "Hexagonal", "IconSquare", "ScanFull"]), dr = {
  LeftNotch: "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)",
  RightNotch: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)",
  BothNotch: "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))"
};
function bs({
  shape: e = "LeftNotch",
  color: t = "cyan",
  size: n = "md",
  variant: r,
  loading: a = !1,
  disabled: o = !1,
  icon: s,
  iconRight: i,
  type: c = "button",
  onClick: l,
  children: u
}) {
  const f = z.buttonShape(e), m = cr.has(e), y = lr.has(e), w = m ? {
    clipPath: dr[e],
    border: "1px solid var(--j-accent)"
  } : {};
  return /* @__PURE__ */ k(
    "button",
    {
      type: c,
      disabled: o || a,
      onClick: l,
      className: z.cls("j-btn", f, z.color(t), z.size(n), r ? z.variant(r) : ""),
      style: w,
      "aria-busy": a || void 0,
      children: [
        m && /* @__PURE__ */ d("div", { style: { position: "absolute", inset: 0, background: "var(--j-accent-dim)" } }),
        y && /* @__PURE__ */ d("div", { className: "j-btn-bg-fill" }),
        e === "Parallelogram" && /* @__PURE__ */ d("div", { className: "j-btn-rail" }),
        e === "BracketFrame" && /* @__PURE__ */ k(G, { children: [
          /* @__PURE__ */ d("div", { className: "j-btn-top-line" }),
          /* @__PURE__ */ d("div", { className: "j-btn-bot-line" })
        ] }),
        /* @__PURE__ */ d("div", { className: "j-btn-shine" }),
        /* @__PURE__ */ d("div", { className: "j-btn-c tl" }),
        /* @__PURE__ */ d("div", { className: "j-btn-c tr" }),
        /* @__PURE__ */ d("div", { className: "j-btn-c bl" }),
        /* @__PURE__ */ d("div", { className: "j-btn-c br" }),
        /* @__PURE__ */ k("div", { className: "j-btn-label", children: [
          !a && s && /* @__PURE__ */ d("span", { children: s }),
          a ? /* @__PURE__ */ d("span", { style: { letterSpacing: ".2em" }, children: "···" }) : u,
          !a && i && /* @__PURE__ */ d("span", { children: i })
        ] })
      ]
    }
  );
}
function ur({ cardStyle: e }) {
  switch (e) {
    case "CornerBracket":
      return /* @__PURE__ */ k(G, { children: [
        /* @__PURE__ */ d("div", { className: "j-c-tl" }),
        /* @__PURE__ */ d("div", { className: "j-c-tr" }),
        /* @__PURE__ */ d("div", { className: "j-c-bl" }),
        /* @__PURE__ */ d("div", { className: "j-c-br" }),
        /* @__PURE__ */ d("div", { className: "j-inner-border" })
      ] });
    case "Notched":
      return /* @__PURE__ */ k(G, { children: [
        /* @__PURE__ */ d("div", { className: "j-notch-border" }),
        /* @__PURE__ */ d("div", { className: "j-tri-tl" }),
        /* @__PURE__ */ d("div", { className: "j-tri-br" })
      ] });
    case "SideRail":
      return /* @__PURE__ */ k(G, { children: [
        /* @__PURE__ */ d("div", { className: "j-rail" }),
        /* @__PURE__ */ d("div", { className: "j-tab-top" }),
        /* @__PURE__ */ d("div", { className: "j-tab-bot" })
      ] });
    case "GlowBorder":
      return /* @__PURE__ */ d("div", { className: "j-inner-radial" });
    case "PartialBorder":
      return /* @__PURE__ */ k(G, { children: [
        /* @__PURE__ */ d("div", { className: "j-pb-tl" }),
        /* @__PURE__ */ d("div", { className: "j-pb-br" }),
        /* @__PURE__ */ d("div", { className: "j-pb-roving-dot" })
      ] });
    case "DangerPulse":
      return /* @__PURE__ */ d("div", { className: "j-tri-tl" });
    case "Hexagonal":
      return /* @__PURE__ */ d("div", { className: "j-hex-ring" });
    case "Radar":
      return /* @__PURE__ */ k(G, { children: [
        /* @__PURE__ */ d("div", { className: "j-radar-sweep" }),
        /* @__PURE__ */ d("div", { className: "j-radar-r1" }),
        /* @__PURE__ */ d("div", { className: "j-radar-r2" }),
        /* @__PURE__ */ d("div", { className: "j-radar-r3" }),
        /* @__PURE__ */ d("div", { className: "j-radar-center" }),
        /* @__PURE__ */ d("div", { className: "j-radar-ping" })
      ] });
    default:
      return null;
  }
}
const bt = {
  paddingBottom: 10,
  marginBottom: 10,
  borderBottom: "1px solid var(--j-border-dim)",
  position: "relative",
  zIndex: 1
}, vt = {
  paddingTop: 10,
  marginTop: 10,
  borderTop: "1px solid var(--j-border-dim)",
  position: "relative",
  zIndex: 1
};
function vs({
  cardStyle: e = "CornerBracket",
  color: t = "cyan",
  header: n,
  footer: r,
  padding: a = "14px 16px",
  children: o
}) {
  const s = z.cls("j-card", z.cardStyle(e), z.color(t));
  return e === "DoubleFrame" ? /* @__PURE__ */ k("div", { className: s, children: [
    /* @__PURE__ */ d("div", { className: "j-df-corner" }),
    /* @__PURE__ */ k("div", { className: "j-inner-frame", children: [
      n && /* @__PURE__ */ d("div", { style: bt, children: n }),
      o,
      r && /* @__PURE__ */ d("div", { style: vt, children: r })
    ] })
  ] }) : /* @__PURE__ */ k("div", { className: s, style: { padding: a }, children: [
    /* @__PURE__ */ d(ur, { cardStyle: e }),
    n && /* @__PURE__ */ d("div", { style: bt, children: n }),
    /* @__PURE__ */ d("div", { style: { position: "relative", zIndex: 1 }, children: o }),
    r && /* @__PURE__ */ d("div", { style: vt, children: r })
  ] });
}
const fr = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }, hr = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function ws({
  type: e = "text",
  value: t,
  defaultValue: n,
  onChange: r,
  placeholder: a = "",
  disabled: o = !1,
  readOnly: s = !1,
  error: i = !1,
  size: c = "md"
}) {
  const l = {
    height: fr[c] ?? 38,
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${i ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: i ? "var(--j-err)" : "var(--j-border)",
    color: i ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: hr[c] ?? 12,
    letterSpacing: ".08em",
    padding: "0 12px",
    outline: "none",
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
    opacity: o ? 0.4 : 1,
    cursor: o ? "not-allowed" : "text",
    boxShadow: i ? "0 0 8px var(--j-err-25)" : "none"
  };
  return /* @__PURE__ */ d(
    "input",
    {
      type: e,
      placeholder: a,
      disabled: o,
      readOnly: s,
      style: l,
      ...t !== void 0 ? { value: t, onChange: (f) => r == null ? void 0 : r(f.target.value) } : { defaultValue: n }
    }
  );
}
const mr = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function xs({
  value: e,
  defaultValue: t,
  onChange: n,
  placeholder: r = "",
  disabled: a = !1,
  readOnly: o = !1,
  error: s = !1,
  rows: i = 4,
  resize: c = "none",
  size: l = "md"
}) {
  const u = {
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${s ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: s ? "var(--j-err)" : "var(--j-border)",
    color: s ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: mr[l] ?? 12,
    letterSpacing: ".08em",
    padding: "10px 12px",
    outline: "none",
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
    opacity: a ? 0.4 : 1,
    cursor: a ? "not-allowed" : "text",
    resize: c,
    boxShadow: s ? "0 0 8px var(--j-err-25)" : "none"
  };
  return /* @__PURE__ */ d(
    "textarea",
    {
      rows: i,
      placeholder: r,
      disabled: a,
      readOnly: o,
      style: u,
      ...e !== void 0 ? { value: e, onChange: (m) => n == null ? void 0 : n(m.target.value) } : { defaultValue: t }
    }
  );
}
const yr = { xs: 28, sm: 32, md: 38, lg: 44, xl: 50 }, gr = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 };
function ks({
  options: e,
  value: t,
  defaultValue: n,
  onChange: r,
  placeholder: a,
  disabled: o = !1,
  error: s = !1,
  size: i = "md"
}) {
  const c = {
    height: yr[i] ?? 38,
    width: "100%",
    boxSizing: "border-box",
    background: "var(--j-bg-panel)",
    border: `1px solid ${s ? "var(--j-err)" : "var(--j-border)"}`,
    borderColor: s ? "var(--j-err)" : "var(--j-border)",
    color: s ? "var(--j-err)" : "var(--j-accent)",
    fontFamily: "'Courier New', monospace",
    fontSize: gr[i] ?? 12,
    letterSpacing: ".08em",
    padding: "0 12px",
    outline: "none",
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
    opacity: o ? 0.4 : 1,
    cursor: o ? "not-allowed" : "pointer",
    boxShadow: s ? "0 0 8px var(--j-err-25)" : "none"
  };
  return /* @__PURE__ */ k("select", { disabled: o, style: c, ...t !== void 0 ? { value: t, onChange: (u) => r == null ? void 0 : r(u.target.value) } : { defaultValue: n }, children: [
    a && /* @__PURE__ */ d("option", { value: "", disabled: !0, hidden: !0, children: a }),
    e.map((u) => /* @__PURE__ */ d("option", { value: u.value, disabled: u.disabled, children: u.label }, u.value))
  ] });
}
function Ms({
  checked: e,
  defaultChecked: t = !1,
  onChange: n,
  label: r,
  disabled: a = !1
}) {
  const [o, s] = q(t), i = e !== void 0 ? e : o;
  function c(l) {
    a || (e === void 0 && s(l.target.checked), n == null || n(l.target.checked));
  }
  return /* @__PURE__ */ k("label", { style: {
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
    /* @__PURE__ */ d(
      "input",
      {
        type: "checkbox",
        checked: i,
        onChange: c,
        disabled: a,
        style: { position: "absolute", opacity: 0, width: 0, height: 0 }
      }
    ),
    /* @__PURE__ */ d("div", { style: {
      width: 14,
      height: 14,
      flexShrink: 0,
      background: i ? "var(--j-accent)" : "transparent",
      border: `1px solid ${i ? "var(--j-accent)" : "var(--j-border)"}`,
      clipPath: "polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: i ? "0 0 6px var(--j-accent-25)" : "none",
      transition: "all .15s ease"
    }, children: i && /* @__PURE__ */ d("div", { style: {
      width: 6,
      height: 6,
      background: "var(--j-bg)",
      clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)"
    } }) }),
    r && /* @__PURE__ */ d("span", { children: r })
  ] });
}
function Ds({ checked: e, onChange: t, label: n, value: r, name: a, disabled: o = !1 }) {
  return /* @__PURE__ */ k("label", { style: {
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
    /* @__PURE__ */ d(
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
    /* @__PURE__ */ d("div", { style: {
      width: 14,
      height: 14,
      flexShrink: 0,
      border: `1px solid ${e ? "var(--j-accent)" : "var(--j-border)"}`,
      clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all .15s ease"
    }, children: e && /* @__PURE__ */ d("div", { style: {
      width: 6,
      height: 6,
      background: "var(--j-accent)",
      clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
      boxShadow: "0 0 4px var(--j-accent)"
    } }) }),
    n && /* @__PURE__ */ d("span", { children: n })
  ] });
}
function Ss({
  checked: e,
  defaultChecked: t = !1,
  onChange: n,
  label: r,
  disabled: a = !1
}) {
  const [o, s] = q(t), i = e !== void 0 ? e : o;
  function c(l) {
    a || (e === void 0 && s(l.target.checked), n == null || n(l.target.checked));
  }
  return /* @__PURE__ */ k("label", { style: {
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
    /* @__PURE__ */ d(
      "input",
      {
        type: "checkbox",
        checked: i,
        onChange: c,
        disabled: a,
        style: { position: "absolute", opacity: 0, width: 0, height: 0 }
      }
    ),
    /* @__PURE__ */ d("div", { style: {
      width: 36,
      height: 18,
      flexShrink: 0,
      position: "relative",
      background: i ? "var(--j-accent-25)" : "var(--j-bg-panel)",
      border: `1px solid ${i ? "var(--j-accent)" : "var(--j-border)"}`,
      clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
      boxShadow: i ? "0 0 8px var(--j-accent-25)" : "none",
      transition: "all .2s ease"
    }, children: /* @__PURE__ */ d("div", { style: {
      position: "absolute",
      top: 2,
      width: 12,
      height: 12,
      left: i ? "calc(100% - 15px)" : "3px",
      background: i ? "var(--j-accent)" : "var(--j-border)",
      clipPath: "polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)",
      boxShadow: i ? "0 0 6px var(--j-accent)" : "none",
      transition: "left .2s ease"
    } }) }),
    r && /* @__PURE__ */ d("span", { children: r })
  ] });
}
function js({
  value: e,
  defaultValue: t,
  onChange: n,
  min: r = 0,
  max: a = 100,
  step: o = 1,
  disabled: s = !1,
  showValue: i = !0
}) {
  const [c, l] = q(t ?? r), u = e !== void 0 ? e : c, f = a > r ? (u - r) / (a - r) * 100 : 0;
  function m(y) {
    const w = Number(y.target.value);
    e === void 0 && l(w), n == null || n(w);
  }
  return /* @__PURE__ */ k("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "'Courier New', monospace",
    opacity: s ? 0.4 : 1
  }, children: [
    /* @__PURE__ */ k("div", { style: { position: "relative", flex: 1, height: 20 }, children: [
      /* @__PURE__ */ d("div", { style: {
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        height: 2,
        transform: "translateY(-50%)",
        background: "var(--j-border)"
      } }),
      /* @__PURE__ */ d("div", { style: {
        position: "absolute",
        top: "50%",
        left: 0,
        width: `${f}%`,
        height: 2,
        transform: "translateY(-50%)",
        background: "var(--j-accent)",
        boxShadow: "0 0 6px var(--j-accent-25)",
        transition: "width .1s ease"
      } }),
      /* @__PURE__ */ d(
        "input",
        {
          type: "range",
          min: r,
          max: a,
          step: o,
          value: u,
          onChange: m,
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
      /* @__PURE__ */ d("div", { style: {
        position: "absolute",
        top: "50%",
        left: `${f}%`,
        transform: "translate(-50%, -50%)",
        width: 12,
        height: 12,
        pointerEvents: "none",
        background: "var(--j-accent)",
        clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)",
        boxShadow: "0 0 8px var(--j-accent)"
      } })
    ] }),
    i && /* @__PURE__ */ d("span", { style: {
      fontSize: 11,
      color: "var(--j-accent)",
      letterSpacing: ".06em",
      minWidth: 32,
      textAlign: "right"
    }, children: u })
  ] });
}
function Ns({ label: e, error: t, hint: n, required: r, children: a }) {
  return /* @__PURE__ */ k("div", { style: { display: "flex", flexDirection: "column", gap: 4, fontFamily: "'Courier New', monospace" }, children: [
    e && /* @__PURE__ */ k("label", { style: {
      fontSize: 10,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "var(--j-text-muted)"
    }, children: [
      e,
      r && /* @__PURE__ */ d("span", { style: { color: "var(--j-err)", marginLeft: 2 }, children: "*" })
    ] }),
    a,
    t && /* @__PURE__ */ d("span", { style: { fontSize: 10, color: "var(--j-err)", letterSpacing: ".06em" }, children: t }),
    !t && n && /* @__PURE__ */ d("span", { style: { fontSize: 10, color: "var(--j-text-dim)", letterSpacing: ".06em" }, children: n })
  ] });
}
function pr(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Ue = {}, Oe = {};
function ce(e, t) {
  try {
    const r = (Ue[e] || (Ue[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in Oe ? Oe[r] : wt(r, r.split(":"));
  } catch {
    if (e in Oe) return Oe[e];
    const n = e == null ? void 0 : e.match(br);
    return n ? wt(e, n.slice(1)) : NaN;
  }
}
const br = /([+-]\d\d):?(\d\d)?/;
function wt(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), a = +(t[2] || 0) / 60;
  return Oe[e] = n * 60 + r > 0 ? n * 60 + r + a : n * 60 - r - a;
}
class oe extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(ce(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), At(this, t)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new oe(...n, t) : new oe(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new oe(+this, t);
  }
  getTimezoneOffset() {
    const t = -ce(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), $e(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new oe(+new Date(t), this.timeZone);
  }
  //#endregion
}
const xt = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!xt.test(e)) return;
  const t = e.replace(xt, "$1UTC");
  oe.prototype[t] && (e.startsWith("get") ? oe.prototype[e] = function() {
    return this.internal[t]();
  } : (oe.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), vr(this), +this;
  }, oe.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), $e(this), +this;
  }));
});
function $e(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - // Round after converting minutes to seconds to avoid fractional offset
  // precision errors from historical offsets.
  Math.round(-ce(e.timeZone, e) * 60));
}
function vr(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), At(e);
}
function At(e, t) {
  const n = Array.isArray(t) ? wr(t) : +e.internal, r = ce(e.timeZone, e), a = r > 0 ? Math.floor(r) : Math.ceil(r), o = /* @__PURE__ */ new Date(+e);
  o.setUTCHours(o.getUTCHours() - 1);
  const s = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), i = -(/* @__PURE__ */ new Date(+o)).getTimezoneOffset(), c = s - i;
  let l = s;
  if (c && s !== a) {
    const _ = Date.prototype.getHours.apply(e), I = Array.isArray(t) ? t[3] || 0 : e.internal.getUTCHours();
    if (_ !== I) {
      const H = /* @__PURE__ */ new Date(+e), K = s - a;
      K && H.setUTCMinutes(H.getUTCMinutes() + K);
      const J = ce(e.timeZone, H);
      (J > 0 ? Math.floor(J) : Math.ceil(J)) === a && (l = i);
    }
  }
  const u = l - a;
  u && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + u);
  const f = /* @__PURE__ */ new Date(+e);
  f.setUTCSeconds(0);
  const m = s > 0 ? f.getSeconds() : (f.getSeconds() - 60) % 60, y = Math.round(-(ce(e.timeZone, e) * 60)) % 60;
  (y || m) && Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + y + m);
  const w = ce(e.timeZone, e), x = w > 0 ? Math.floor(w) : Math.ceil(w), N = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - x, b = x !== a, v = N - u, W = x - a, M = n - x * 60 * 1e3, h = W > 0 && kt(e) - n === W * 60 * 1e3 && kt(e, M) !== n;
  if (b && v && !h) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v);
    const _ = ce(e.timeZone, e), I = _ > 0 ? Math.floor(_) : Math.ceil(_), H = x - I;
    H && v < 0 && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + H);
  }
  $e(e);
  const Y = (t ? n : n + y * 1e3) - +e.internal;
  Y && Math.abs(Y) < 30 * 60 * 1e3 && (Date.prototype.setTime.call(e, +e + Y), $e(e));
}
function wr(e) {
  return Date.UTC(e[0], e.length > 1 ? e[1] : 0, e.length > 2 ? e[2] : 1, ...e.slice(3));
}
function kt(e, t) {
  const n = new Date(t ?? +e);
  return n.setUTCSeconds(n.getUTCSeconds() - Math.round(-ce(e.timeZone, n) * 60)), +n;
}
class R extends oe {
  //#region static
  static tz(t, ...n) {
    return n.length ? new R(...n, t) : new R(Date.now(), t);
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
    return `${t} GMT${n}${r}${a} (${pr(this.timeZone, this)})`;
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
    return new R(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new R(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ht = 6048e5, xr = 864e5, Mt = Symbol.for("constructDateFrom");
function A(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Mt in e ? e[Mt](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function F(e, t) {
  return A(t || e, e);
}
function zt(e, t, n) {
  const r = F(e, n == null ? void 0 : n.in);
  return isNaN(t) ? A(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function qt(e, t, n) {
  const r = F(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return A(e, NaN);
  if (!t)
    return r;
  const a = r.getDate(), o = A(e, r.getTime());
  o.setMonth(r.getMonth() + t + 1, 0);
  const s = o.getDate();
  return a >= s ? o : (r.setFullYear(
    o.getFullYear(),
    o.getMonth(),
    a
  ), r);
}
let kr = {};
function Pe() {
  return kr;
}
function ve(e, t) {
  var i, c, l, u;
  const n = Pe(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, a = F(e, t == null ? void 0 : t.in), o = a.getDay(), s = (o < r ? 7 : 0) + o - r;
  return a.setDate(a.getDate() - s), a.setHours(0, 0, 0, 0), a;
}
function Ce(e, t) {
  return ve(e, { ...t, weekStartsOn: 1 });
}
function Rt(e, t) {
  const n = F(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = A(n, 0);
  a.setFullYear(r + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const o = Ce(a), s = A(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = Ce(s);
  return n.getTime() >= o.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function Dt(e) {
  const t = F(e), n = new Date(
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
function xe(e, ...t) {
  const n = A.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Te(e, t) {
  const n = F(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function rt(e, t, n) {
  const [r, a] = xe(
    n == null ? void 0 : n.in,
    e,
    t
  ), o = Te(r), s = Te(a), i = +o - Dt(o), c = +s - Dt(s);
  return Math.round((i - c) / xr);
}
function Mr(e, t) {
  const n = Rt(e, t), r = A(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Ce(r);
}
function Dr(e, t, n) {
  return zt(e, t * 7, n);
}
function Sr(e, t, n) {
  return qt(e, t * 12, n);
}
function jr(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((a) => {
    !r && typeof a == "object" && (r = A.bind(null, a));
    const o = F(a, r);
    (!n || n < o || isNaN(+o)) && (n = o);
  }), A(r, n || NaN);
}
function Nr(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((a) => {
    !r && typeof a == "object" && (r = A.bind(null, a));
    const o = F(a, r);
    (!n || n > o || isNaN(+o)) && (n = o);
  }), A(r, n || NaN);
}
function Or(e, t, n) {
  const [r, a] = xe(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +Te(r) == +Te(a);
}
function Gt(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Wr(e) {
  return !(!Gt(e) && typeof e != "number" || isNaN(+F(e)));
}
function Jt(e, t, n) {
  const [r, a] = xe(
    n == null ? void 0 : n.in,
    e,
    t
  ), o = r.getFullYear() - a.getFullYear(), s = r.getMonth() - a.getMonth();
  return o * 12 + s;
}
function Cr(e, t) {
  const n = F(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Vt(e, t) {
  const [n, r] = xe(e, t.start, t.end);
  return { start: n, end: r };
}
function Tr(e, t) {
  const { start: n, end: r } = Vt(t == null ? void 0 : t.in, e);
  let a = +n > +r;
  const o = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const c = [];
  for (; +s <= o; )
    c.push(A(n, s)), s.setMonth(s.getMonth() + i);
  return a ? c.reverse() : c;
}
function Pr(e, t) {
  const n = F(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Yr(e, t) {
  const n = F(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Qt(e, t) {
  const n = F(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Er(e, t) {
  const { start: n, end: r } = Vt(t == null ? void 0 : t.in, e);
  let a = +n > +r;
  const o = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +s <= o; )
    c.push(A(n, s)), s.setFullYear(s.getFullYear() + i);
  return a ? c.reverse() : c;
}
function Xt(e, t) {
  var i, c, l, u;
  const n = Pe(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, a = F(e, t == null ? void 0 : t.in), o = a.getDay(), s = (o < r ? -7 : 0) + 6 - (o - r);
  return a.setDate(a.getDate() + s), a.setHours(23, 59, 59, 999), a;
}
function Fr(e, t) {
  return Xt(e, { ...t, weekStartsOn: 1 });
}
const Ir = {
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
}, _r = (e, t, n) => {
  let r;
  const a = Ir[e];
  return typeof a == "string" ? r = a : t === 1 ? r = a.one : r = a.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Ze(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Br = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, $r = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Ar = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Hr = {
  date: Ze({
    formats: Br,
    defaultWidth: "full"
  }),
  time: Ze({
    formats: $r,
    defaultWidth: "full"
  }),
  dateTime: Ze({
    formats: Ar,
    defaultWidth: "full"
  })
}, zr = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, qr = (e, t, n, r) => zr[e];
function je(e) {
  return (t, n) => {
    const r = n != null && n.context ? String(n.context) : "standalone";
    let a;
    if (r === "formatting" && e.formattingValues) {
      const s = e.defaultFormattingWidth || e.defaultWidth, i = n != null && n.width ? String(n.width) : s;
      a = e.formattingValues[i] || e.formattingValues[s];
    } else {
      const s = e.defaultWidth, i = n != null && n.width ? String(n.width) : e.defaultWidth;
      a = e.values[i] || e.values[s];
    }
    const o = e.argumentCallback ? e.argumentCallback(t) : t;
    return a[o];
  };
}
const Rr = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Gr = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Jr = {
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
}, Vr = {
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
}, Qr = {
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
}, Xr = {
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
}, Ur = (e, t) => {
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
}, Zr = {
  ordinalNumber: Ur,
  era: je({
    values: Rr,
    defaultWidth: "wide"
  }),
  quarter: je({
    values: Gr,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: je({
    values: Jr,
    defaultWidth: "wide"
  }),
  day: je({
    values: Vr,
    defaultWidth: "wide"
  }),
  dayPeriod: je({
    values: Qr,
    defaultWidth: "wide",
    formattingValues: Xr,
    defaultFormattingWidth: "wide"
  })
};
function Ne(e) {
  return (t, n = {}) => {
    const r = n.width, a = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], o = t.match(a);
    if (!o)
      return null;
    const s = o[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? Lr(i, (f) => f.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      Kr(i, (f) => f.test(s))
    );
    let l;
    l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(l)
    ) : l;
    const u = t.slice(s.length);
    return { value: l, rest: u };
  };
}
function Kr(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Lr(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function ea(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const a = r[0], o = t.match(e.parsePattern);
    if (!o) return null;
    let s = e.valueCallback ? e.valueCallback(o[0]) : o[0];
    s = n.valueCallback ? n.valueCallback(s) : s;
    const i = t.slice(a.length);
    return { value: s, rest: i };
  };
}
const ta = /^(\d+)(th|st|nd|rd)?/i, na = /\d+/i, ra = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, aa = {
  any: [/^b/i, /^(a|c)/i]
}, oa = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, sa = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ia = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, ca = {
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
}, la = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, da = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, ua = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, fa = {
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
}, ha = {
  ordinalNumber: ea({
    matchPattern: ta,
    parsePattern: na,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ne({
    matchPatterns: ra,
    defaultMatchWidth: "wide",
    parsePatterns: aa,
    defaultParseWidth: "any"
  }),
  quarter: Ne({
    matchPatterns: oa,
    defaultMatchWidth: "wide",
    parsePatterns: sa,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ne({
    matchPatterns: ia,
    defaultMatchWidth: "wide",
    parsePatterns: ca,
    defaultParseWidth: "any"
  }),
  day: Ne({
    matchPatterns: la,
    defaultMatchWidth: "wide",
    parsePatterns: da,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ne({
    matchPatterns: ua,
    defaultMatchWidth: "any",
    parsePatterns: fa,
    defaultParseWidth: "any"
  })
}, pe = {
  code: "en-US",
  formatDistance: _r,
  formatLong: Hr,
  formatRelative: qr,
  localize: Zr,
  match: ha,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function ma(e, t) {
  const n = F(e, t == null ? void 0 : t.in);
  return rt(n, Qt(n)) + 1;
}
function at(e, t) {
  const n = F(e, t == null ? void 0 : t.in), r = +Ce(n) - +Mr(n);
  return Math.round(r / Ht) + 1;
}
function Ut(e, t) {
  var u, f, m, y;
  const n = F(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = Pe(), o = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((f = (u = t == null ? void 0 : t.locale) == null ? void 0 : u.options) == null ? void 0 : f.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((y = (m = a.locale) == null ? void 0 : m.options) == null ? void 0 : y.firstWeekContainsDate) ?? 1, s = A((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, o), s.setHours(0, 0, 0, 0);
  const i = ve(s, t), c = A((t == null ? void 0 : t.in) || e, 0);
  c.setFullYear(r, 0, o), c.setHours(0, 0, 0, 0);
  const l = ve(c, t);
  return +n >= +i ? r + 1 : +n >= +l ? r : r - 1;
}
function ya(e, t) {
  var i, c, l, u;
  const n = Pe(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, a = Ut(e, t), o = A((t == null ? void 0 : t.in) || e, 0);
  return o.setFullYear(a, 0, r), o.setHours(0, 0, 0, 0), ve(o, t);
}
function ot(e, t) {
  const n = F(e, t == null ? void 0 : t.in), r = +ve(n, t) - +ya(n, t);
  return Math.round(r / Ht) + 1;
}
function E(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const ue = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return E(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : E(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return E(e.getDate(), t.length);
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
    return E(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return E(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return E(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return E(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), a = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return E(a, t.length);
  }
}, ye = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, St = {
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
    return ue.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const a = Ut(e, r), o = a > 0 ? a : 1 - a;
    if (t === "YY") {
      const s = o % 100;
      return E(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : E(o, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Rt(e);
    return E(n, t.length);
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
    return E(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return E(r, 2);
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
        return E(r, 2);
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
        return ue.M(e, t);
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
        return E(r + 1, 2);
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
    const a = ot(e, r);
    return t === "wo" ? n.ordinalNumber(a, { unit: "week" }) : E(a, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = at(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : E(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : ue.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = ma(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : E(r, t.length);
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
        return E(o, 2);
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
        return E(o, t.length);
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
        return E(a, t.length);
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
    switch (r === 12 ? a = ye.noon : r === 0 ? a = ye.midnight : a = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? a = ye.evening : r >= 12 ? a = ye.afternoon : r >= 4 ? a = ye.morning : a = ye.night, t) {
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
    return ue.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : ue.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : E(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : E(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : ue.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : ue.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return ue.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return Nt(r);
      case "XXXX":
      case "XX":
        return fe(r);
      case "XXXXX":
      case "XXX":
      default:
        return fe(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return Nt(r);
      case "xxxx":
      case "xx":
        return fe(r);
      case "xxxxx":
      case "xxx":
      default:
        return fe(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + jt(r, ":");
      case "OOOO":
      default:
        return "GMT" + fe(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + jt(r, ":");
      case "zzzz":
      default:
        return "GMT" + fe(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return E(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return E(+e, t.length);
  }
};
function jt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = Math.trunc(r / 60), o = r % 60;
  return o === 0 ? n + String(a) : n + String(a) + t + E(o, 2);
}
function Nt(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + E(Math.abs(e) / 60, 2) : fe(e, t);
}
function fe(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = E(Math.trunc(r / 60), 2), o = E(r % 60, 2);
  return n + a + t + o;
}
const Ot = (e, t) => {
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
}, Zt = (e, t) => {
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
}, ga = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], a = n[2];
  if (!a)
    return Ot(e, t);
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
  return o.replace("{{date}}", Ot(r, t)).replace("{{time}}", Zt(a, t));
}, pa = {
  p: Zt,
  P: ga
}, ba = /^D+$/, va = /^Y+$/, wa = ["D", "DD", "YY", "YYYY"];
function xa(e) {
  return ba.test(e);
}
function ka(e) {
  return va.test(e);
}
function Ma(e, t, n) {
  const r = Da(e, t, n);
  if (console.warn(r), wa.includes(e)) throw new RangeError(r);
}
function Da(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Sa = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, ja = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Na = /^'([^]*?)'?$/, Oa = /''/g, Wa = /[a-zA-Z]/;
function We(e, t, n) {
  var u, f, m, y, w, x, D, N;
  const r = Pe(), a = (n == null ? void 0 : n.locale) ?? r.locale ?? pe, o = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((f = (u = n == null ? void 0 : n.locale) == null ? void 0 : u.options) == null ? void 0 : f.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((y = (m = r.locale) == null ? void 0 : m.options) == null ? void 0 : y.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((x = (w = n == null ? void 0 : n.locale) == null ? void 0 : w.options) == null ? void 0 : x.weekStartsOn) ?? r.weekStartsOn ?? ((N = (D = r.locale) == null ? void 0 : D.options) == null ? void 0 : N.weekStartsOn) ?? 0, i = F(e, n == null ? void 0 : n.in);
  if (!Wr(i))
    throw new RangeError("Invalid time value");
  let c = t.match(ja).map((b) => {
    const v = b[0];
    if (v === "p" || v === "P") {
      const W = pa[v];
      return W(b, a.formatLong);
    }
    return b;
  }).join("").match(Sa).map((b) => {
    if (b === "''")
      return { isToken: !1, value: "'" };
    const v = b[0];
    if (v === "'")
      return { isToken: !1, value: Ca(b) };
    if (St[v])
      return { isToken: !0, value: b };
    if (v.match(Wa))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + v + "`"
      );
    return { isToken: !1, value: b };
  });
  a.localize.preprocessor && (c = a.localize.preprocessor(i, c));
  const l = {
    firstWeekContainsDate: o,
    weekStartsOn: s,
    locale: a
  };
  return c.map((b) => {
    if (!b.isToken) return b.value;
    const v = b.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && ka(v) || !(n != null && n.useAdditionalDayOfYearTokens) && xa(v)) && Ma(v, t, String(e));
    const W = St[v[0]];
    return W(i, v, a.localize, l);
  }).join("");
}
function Ca(e) {
  const t = e.match(Na);
  return t ? t[1].replace(Oa, "'") : e;
}
function Ta(e, t) {
  const n = F(e, t == null ? void 0 : t.in), r = n.getFullYear(), a = n.getMonth(), o = A(n, 0);
  return o.setFullYear(r, a + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
function Pa(e, t) {
  return F(e, t == null ? void 0 : t.in).getMonth();
}
function Ya(e, t) {
  return F(e, t == null ? void 0 : t.in).getFullYear();
}
function Ea(e, t) {
  return +F(e) > +F(t);
}
function Fa(e, t) {
  return +F(e) < +F(t);
}
function Ia(e, t, n) {
  const [r, a] = xe(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === a.getFullYear() && r.getMonth() === a.getMonth();
}
function _a(e, t, n) {
  const [r, a] = xe(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === a.getFullYear();
}
function Ba(e, t, n) {
  const r = F(e, n == null ? void 0 : n.in), a = r.getFullYear(), o = r.getDate(), s = A(e, 0);
  s.setFullYear(a, t, 15), s.setHours(0, 0, 0, 0);
  const i = Ta(s);
  return r.setMonth(t, Math.min(o, i)), r;
}
function $a(e, t, n) {
  const r = F(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? A(e, NaN) : (r.setFullYear(t), r);
}
const Wt = 5, Aa = 4;
function Ha(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, a = t.addDays(e, -r + 1), o = t.addDays(a, Wt * 7 - 1);
  return t.getMonth(e) === t.getMonth(o) ? Wt : Aa;
}
function Kt(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function za(e, t) {
  const n = Kt(e, t), r = Ha(e, t);
  return t.addDays(n, r * 7 - 1);
}
const Lt = {
  ...pe,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let a;
      r && typeof r.format == "function" ? a = r.format.bind(r) : a = (s, i) => We(s, i, { locale: pe, ...n });
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
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (a, o) => We(a, o, { locale: pe, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let a;
      r && typeof r.format == "function" ? a = r.format.bind(r) : a = (s, i) => We(s, i, { locale: pe, ...n });
      let o = a(e, "PPPP");
      return t != null && t.today && (o = `Today, ${o}`), o;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (a, o) => We(a, o, { locale: pe, ...t }), r(e, "cccc");
    }
  }
};
class X {
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
        return R.tz(this.options.timeZone);
      const r = this.options.Date ?? Date;
      return new r();
    }, this.newDate = (r, a, o) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, a, o) : this.options.timeZone ? new R(r, a, o, this.options.timeZone) : new Date(r, a, o);
    }, this.addDays = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addDays ? this.overrides.addDays(r, a) : zt(r, a);
    }, this.addMonths = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addMonths ? this.overrides.addMonths(r, a) : qt(r, a);
    }, this.addWeeks = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addWeeks ? this.overrides.addWeeks(r, a) : Dr(r, a);
    }, this.addYears = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.addYears ? this.overrides.addYears(r, a) : Sr(r, a);
    }, this.differenceInCalendarDays = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, a) : rt(r, a);
    }, this.differenceInCalendarMonths = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, a) : Jt(r, a);
    }, this.eachMonthOfInterval = (r) => {
      var a;
      return (a = this.overrides) != null && a.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Tr(r);
    }, this.eachYearOfInterval = (r) => {
      var i;
      const a = (i = this.overrides) != null && i.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Er(r), o = new Set(a.map((c) => this.getYear(c)));
      if (o.size === a.length)
        return a;
      const s = [];
      return o.forEach((c) => {
        s.push(new Date(c, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : za(r, this);
    }, this.endOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Fr(r);
    }, this.endOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfMonth ? this.overrides.endOfMonth(r) : Cr(r);
    }, this.endOfWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.endOfWeek ? this.overrides.endOfWeek(r, a) : Xt(r, this.options);
    }, this.endOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.endOfYear ? this.overrides.endOfYear(r) : Yr(r);
    }, this.format = (r, a, o) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, a, this.options) : We(r, a, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.getISOWeek ? this.overrides.getISOWeek(r) : at(r);
    }, this.getMonth = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.getMonth ? this.overrides.getMonth(r, this.options) : Pa(r, this.options);
    }, this.getYear = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.getYear ? this.overrides.getYear(r, this.options) : Ya(r, this.options);
    }, this.getWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.getWeek ? this.overrides.getWeek(r, this.options) : ot(r, this.options);
    }, this.isAfter = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isAfter ? this.overrides.isAfter(r, a) : Ea(r, a);
    }, this.isBefore = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isBefore ? this.overrides.isBefore(r, a) : Fa(r, a);
    }, this.isDate = (r) => {
      var a;
      return (a = this.overrides) != null && a.isDate ? this.overrides.isDate(r) : Gt(r);
    }, this.isSameDay = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isSameDay ? this.overrides.isSameDay(r, a) : Or(r, a);
    }, this.isSameMonth = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isSameMonth ? this.overrides.isSameMonth(r, a) : Ia(r, a);
    }, this.isSameYear = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.isSameYear ? this.overrides.isSameYear(r, a) : _a(r, a);
    }, this.max = (r) => {
      var a;
      return (a = this.overrides) != null && a.max ? this.overrides.max(r) : jr(r);
    }, this.min = (r) => {
      var a;
      return (a = this.overrides) != null && a.min ? this.overrides.min(r) : Nr(r);
    }, this.setMonth = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.setMonth ? this.overrides.setMonth(r, a) : Ba(r, a);
    }, this.setYear = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.setYear ? this.overrides.setYear(r, a) : $a(r, a);
    }, this.startOfBroadcastWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Kt(r, this);
    }, this.startOfDay = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfDay ? this.overrides.startOfDay(r) : Te(r);
    }, this.startOfISOWeek = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Ce(r);
    }, this.startOfMonth = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfMonth ? this.overrides.startOfMonth(r) : Pr(r);
    }, this.startOfWeek = (r, a) => {
      var o;
      return (o = this.overrides) != null && o.startOfWeek ? this.overrides.startOfWeek(r, this.options) : ve(r, this.options);
    }, this.startOfYear = (r) => {
      var a;
      return (a = this.overrides) != null && a.startOfYear ? this.overrides.startOfYear(r) : Qt(r);
    }, this.options = { locale: Lt, ...t }, this.overrides = n;
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
    return t && X.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: a } = this.options, o = n == null ? void 0 : n.code;
    if (o && X.yearFirstLocales.has(o))
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
X.yearFirstLocales = /* @__PURE__ */ new Set([
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
const se = new X();
class en {
  constructor(t, n, r = se) {
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
class qa {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Ra {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Ga(e) {
  return p.createElement("span", { ...e });
}
function Ja(e) {
  const { size: t = 24, orientation: n = "left", className: r, style: a } = e;
  return p.createElement(
    "svg",
    { className: r, style: a, width: t, height: t, viewBox: "0 0 24 24" },
    n === "up" && p.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
    n === "down" && p.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
    n === "left" && p.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
    n === "right" && p.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
  );
}
function Va(e) {
  const { day: t, modifiers: n, ...r } = e;
  return p.createElement("td", { ...r });
}
function Qa(e) {
  const { day: t, modifiers: n, ...r } = e, a = p.useRef(null);
  return p.useEffect(() => {
    var o;
    n.focused && ((o = a.current) == null || o.focus());
  }, [n.focused]), p.createElement("button", { ref: a, ...r });
}
var g;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(g || (g = {}));
var B;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(B || (B = {}));
var ne;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(ne || (ne = {}));
var Q;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Q || (Q = {}));
const tn = _t(void 0);
function Ae() {
  const e = Bt(tn);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Xa(e) {
  const { options: t, className: n, ...r } = e, { classNames: a, components: o, styles: s } = Ae(), i = [a[g.Dropdown], n].join(" "), c = t == null ? void 0 : t.find(({ value: l }) => l === r.value);
  return p.createElement(
    "span",
    { "data-disabled": r.disabled, className: a[g.DropdownRoot], style: s == null ? void 0 : s[g.DropdownRoot] },
    p.createElement(o.Select, { className: i, ...r }, t == null ? void 0 : t.map(({ value: l, label: u, disabled: f }) => p.createElement(o.Option, { key: l, value: l, disabled: f }, u))),
    p.createElement(
      "span",
      { className: a[g.CaptionLabel], style: s == null ? void 0 : s[g.CaptionLabel], "aria-hidden": !0 },
      c == null ? void 0 : c.label,
      p.createElement(o.Chevron, { orientation: "down", size: 18, className: a[g.Chevron], style: s == null ? void 0 : s[g.Chevron] })
    )
  );
}
function Ua(e) {
  return p.createElement("div", { ...e });
}
function Za(e) {
  return p.createElement("div", { ...e });
}
function Ka(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return p.createElement("div", { ...r }, e.children);
}
function La(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return p.createElement("div", { ...r });
}
function eo(e) {
  return p.createElement("table", { ...e });
}
function to(e) {
  return p.createElement("div", { ...e });
}
function no(e) {
  const { components: t } = Ae();
  return p.createElement(t.Dropdown, { ...e });
}
function ro(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: a, ...o } = e, { components: s, classNames: i, styles: c, labels: { labelPrevious: l, labelNext: u } } = Ae(), f = U((y) => {
    a && (n == null || n(y));
  }, [a, n]), m = U((y) => {
    r && (t == null || t(y));
  }, [r, t]);
  return p.createElement(
    "nav",
    { ...o },
    p.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[g.PreviousMonthButton], style: c == null ? void 0 : c[g.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: m },
      p.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[g.Chevron], style: c == null ? void 0 : c[g.Chevron], orientation: "left" })
    ),
    p.createElement(
      s.NextMonthButton,
      { type: "button", className: i[g.NextMonthButton], style: c == null ? void 0 : c[g.NextMonthButton], tabIndex: a ? void 0 : -1, "aria-disabled": a ? void 0 : !0, "aria-label": u(a), onClick: f },
      p.createElement(s.Chevron, { disabled: a ? void 0 : !0, orientation: "right", className: i[g.Chevron], style: c == null ? void 0 : c[g.Chevron] })
    )
  );
}
function ao(e) {
  return p.createElement("button", { ...e });
}
function oo(e) {
  return p.createElement("option", { ...e });
}
function so(e) {
  return p.createElement("button", { ...e });
}
function io(e) {
  const { rootRef: t, ...n } = e;
  return p.createElement("div", { ...n, ref: t });
}
function co(e) {
  return p.createElement("select", { ...e });
}
function lo(e) {
  const { week: t, ...n } = e;
  return p.createElement("tr", { ...n });
}
function uo(e) {
  return p.createElement("th", { ...e });
}
function fo(e) {
  return p.createElement(
    "thead",
    { "aria-hidden": !0 },
    p.createElement("tr", { ...e })
  );
}
function ho(e) {
  const { week: t, ...n } = e;
  return p.createElement("th", { ...n });
}
function mo(e) {
  return p.createElement("th", { ...e });
}
function yo(e) {
  return p.createElement("tbody", { ...e });
}
function go(e) {
  const { components: t } = Ae();
  return p.createElement(t.Dropdown, { ...e });
}
const po = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CaptionLabel: Ga,
  Chevron: Ja,
  Day: Va,
  DayButton: Qa,
  Dropdown: Xa,
  DropdownNav: Ua,
  Footer: Za,
  Month: Ka,
  MonthCaption: La,
  MonthGrid: eo,
  Months: to,
  MonthsDropdown: no,
  Nav: ro,
  NextMonthButton: ao,
  Option: oo,
  PreviousMonthButton: so,
  Root: io,
  Select: co,
  Week: lo,
  WeekNumber: ho,
  WeekNumberHeader: mo,
  Weekday: uo,
  Weekdays: fo,
  Weeks: yo,
  YearsDropdown: go
}, Symbol.toStringTag, { value: "Module" }));
function le(e, t, n = !1, r = se) {
  let { from: a, to: o } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return a && o ? (s(o, a) < 0 && ([a, o] = [o, a]), s(t, a) >= (n ? 1 : 0) && s(o, t) >= (n ? 1 : 0)) : !n && o ? i(o, t) : !n && a ? i(a, t) : !1;
}
function st(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function He(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function it(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function ct(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function nn(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function rn(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function de(e, t, n = se) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: a, differenceInCalendarDays: o, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return a(e, i);
    if (rn(i, n))
      return i.some((c) => a(e, c));
    if (He(i))
      return le(i, e, !1, n);
    if (nn(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (st(i)) {
      const c = o(i.before, e), l = o(i.after, e), u = c > 0, f = l < 0;
      return s(i.before, i.after) ? f && u : u || f;
    }
    return it(i) ? o(e, i.after) > 0 : ct(i) ? o(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function bo(e, t, n, r, a) {
  const { disabled: o, hidden: s, modifiers: i, showOutsideDays: c, broadcastCalendar: l, today: u = a.today() } = t, { isSameDay: f, isSameMonth: m, startOfMonth: y, isBefore: w, endOfMonth: x, isAfter: D } = a, N = n && y(n), b = r && x(r), v = {
    [B.focused]: [],
    [B.outside]: [],
    [B.disabled]: [],
    [B.hidden]: [],
    [B.today]: []
  }, W = {};
  for (const M of e) {
    const { date: h, displayMonth: O } = M, Y = !!(O && !m(h, O)), _ = !!(N && w(h, N)), I = !!(b && D(h, b)), H = !!(o && de(h, o, a)), K = !!(s && de(h, s, a)) || _ || I || // Broadcast calendar will show outside days as default
    !l && !c && Y || l && c === !1 && Y, J = f(h, u);
    Y && v.outside.push(M), H && v.disabled.push(M), K && v.hidden.push(M), J && v.today.push(M), i && Object.keys(i).forEach((V) => {
      const he = i == null ? void 0 : i[V];
      he && de(h, he, a) && (W[V] ? W[V].push(M) : W[V] = [M]);
    });
  }
  return (M) => {
    const h = {
      [B.focused]: !1,
      [B.disabled]: !1,
      [B.hidden]: !1,
      [B.outside]: !1,
      [B.today]: !1
    }, O = {};
    for (const Y in v) {
      const _ = v[Y];
      h[Y] = _.some((I) => I === M);
    }
    for (const Y in W)
      O[Y] = W[Y].some((_) => _ === M);
    return {
      ...h,
      // custom modifiers should override all the previous ones
      ...O
    };
  };
}
function vo(e, t, n = {}) {
  return Object.entries(e).filter(([, a]) => a === !0).reduce((a, [o]) => (n[o] ? a.push(n[o]) : t[B[o]] ? a.push(t[B[o]]) : t[ne[o]] && a.push(t[ne[o]]), a), [t[g.Day]]);
}
function wo(e) {
  return {
    ...po,
    ...e
  };
}
function xo(e) {
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
function ko() {
  const e = {};
  for (const t in g)
    e[g[t]] = `rdp-${g[t]}`;
  for (const t in B)
    e[B[t]] = `rdp-${B[t]}`;
  for (const t in ne)
    e[ne[t]] = `rdp-${ne[t]}`;
  for (const t in Q)
    e[Q[t]] = `rdp-${Q[t]}`;
  return e;
}
function Mo(e, t, n) {
  return (n ?? new X(t)).formatMonthYear(e);
}
function Do(e, t, n) {
  return (n ?? new X(t)).format(e, "d");
}
function So(e, t = se) {
  return t.format(e, "LLLL");
}
function jo(e, t, n) {
  return (n ?? new X(t)).format(e, "cccccc");
}
function No(e, t = se) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Oo() {
  return "";
}
function Wo(e, t = se) {
  return t.format(e, "yyyy");
}
const Co = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Mo,
  formatDay: Do,
  formatMonthDropdown: So,
  formatWeekNumber: No,
  formatWeekNumberHeader: Oo,
  formatWeekdayName: jo,
  formatYearDropdown: Wo
}, Symbol.toStringTag, { value: "Module" }));
function To(e) {
  return {
    ...Co,
    ...e
  };
}
function an(e, t, n, r) {
  let a = (r ?? new X(n)).format(e, "PPPP");
  return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
}
function on(e, t, n) {
  return (n ?? new X(t)).formatMonthYear(e);
}
function sn(e, t, n, r) {
  let a = (r ?? new X(n)).format(e, "PPPP");
  return t != null && t.today && (a = `Today, ${a}`), a;
}
function cn(e) {
  return "Choose the Month";
}
function ln() {
  return "";
}
const Po = "Go to the Next Month";
function dn(e, t) {
  return Po;
}
function un(e) {
  return "Go to the Previous Month";
}
function fn(e, t, n) {
  return (n ?? new X(t)).format(e, "cccc");
}
function hn(e, t) {
  return `Week ${e}`;
}
function mn(e) {
  return "Week Number";
}
function yn(e) {
  return "Choose the Year";
}
const Yo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelDayButton: an,
  labelGrid: on,
  labelGridcell: sn,
  labelMonthDropdown: cn,
  labelNav: ln,
  labelNext: dn,
  labelPrevious: un,
  labelWeekNumber: hn,
  labelWeekNumberHeader: mn,
  labelWeekday: fn,
  labelYearDropdown: yn
}, Symbol.toStringTag, { value: "Module" })), te = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function Eo(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...Yo,
    ...e ?? {},
    labelDayButton: te(an, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: te(cn, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: te(dn, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: te(un, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: te(hn, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: te(yn, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: te(on, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: te(sn, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: te(ln, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: te(mn, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: te(fn, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function Fo(e, t, n, r, a) {
  const { startOfMonth: o, startOfYear: s, endOfYear: i, eachMonthOfInterval: c, getMonth: l } = a;
  return c({
    start: s(e),
    end: i(e)
  }).map((m) => {
    const y = r.formatMonthDropdown(m, a), w = l(m), x = t && m < o(t) || n && m > o(n) || !1;
    return { value: w, label: y, disabled: x };
  });
}
function Io(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[g.Day] };
  return Object.entries(e).filter(([, a]) => a === !0).forEach(([a]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[a]
    };
  }), r;
}
function _o(e, t, n, r) {
  const a = r ?? e.today(), o = n ? e.startOfBroadcastWeek(a, e) : t ? e.startOfISOWeek(a) : e.startOfWeek(a), s = [];
  for (let i = 0; i < 7; i++) {
    const c = e.addDays(o, i);
    s.push(c);
  }
  return s;
}
function Bo(e, t, n, r, a = !1) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: s, eachYearOfInterval: i, getYear: c } = r, l = o(e), u = s(t), f = i({ start: l, end: u });
  return a && f.reverse(), f.map((m) => {
    const y = n.formatYearDropdown(m, r);
    return {
      value: c(m),
      label: y,
      disabled: !1
    };
  });
}
function $o(e, t = {}) {
  var i;
  const { weekStartsOn: n, locale: r } = t, a = n ?? ((i = r == null ? void 0 : r.options) == null ? void 0 : i.weekStartsOn) ?? 0, o = (c) => {
    const l = typeof c == "number" || typeof c == "string" ? new Date(c) : c;
    return new R(l.getFullYear(), l.getMonth(), l.getDate(), 12, 0, 0, e);
  }, s = (c) => {
    const l = o(c);
    return new Date(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => o(R.tz(e)),
    newDate: (c, l, u) => new R(c, l, u, 12, 0, 0, e),
    startOfDay: (c) => o(c),
    startOfWeek: (c, l) => {
      const u = o(c), f = (l == null ? void 0 : l.weekStartsOn) ?? a, m = (u.getDay() - f + 7) % 7;
      return u.setDate(u.getDate() - m), u;
    },
    startOfISOWeek: (c) => {
      const l = o(c), u = (l.getDay() - 1 + 7) % 7;
      return l.setDate(l.getDate() - u), l;
    },
    startOfMonth: (c) => {
      const l = o(c);
      return l.setDate(1), l;
    },
    startOfYear: (c) => {
      const l = o(c);
      return l.setMonth(0, 1), l;
    },
    endOfWeek: (c, l) => {
      const u = o(c), y = ((((l == null ? void 0 : l.weekStartsOn) ?? a) + 6) % 7 - u.getDay() + 7) % 7;
      return u.setDate(u.getDate() + y), u;
    },
    endOfISOWeek: (c) => {
      const l = o(c), u = (7 - l.getDay()) % 7;
      return l.setDate(l.getDate() + u), l;
    },
    endOfMonth: (c) => {
      const l = o(c);
      return l.setMonth(l.getMonth() + 1, 0), l;
    },
    endOfYear: (c) => {
      const l = o(c);
      return l.setMonth(11, 31), l;
    },
    eachMonthOfInterval: (c) => {
      const l = o(c.start), u = o(c.end), f = [], m = new R(l.getFullYear(), l.getMonth(), 1, 12, 0, 0, e), y = u.getFullYear() * 12 + u.getMonth();
      for (; m.getFullYear() * 12 + m.getMonth() <= y; )
        f.push(new R(m, e)), m.setMonth(m.getMonth() + 1, 1);
      return f;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (c, l) => {
      const u = o(c);
      return u.setDate(u.getDate() + l), u;
    },
    addWeeks: (c, l) => {
      const u = o(c);
      return u.setDate(u.getDate() + l * 7), u;
    },
    addMonths: (c, l) => {
      const u = o(c);
      return u.setMonth(u.getMonth() + l), u;
    },
    addYears: (c, l) => {
      const u = o(c);
      return u.setFullYear(u.getFullYear() + l), u;
    },
    eachYearOfInterval: (c) => {
      const l = o(c.start), u = o(c.end), f = [], m = new R(l.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; m.getFullYear() <= u.getFullYear(); )
        f.push(new R(m, e)), m.setFullYear(m.getFullYear() + 1, 0, 1);
      return f;
    },
    getWeek: (c, l) => {
      var f;
      const u = s(c);
      return ot(u, {
        weekStartsOn: (l == null ? void 0 : l.weekStartsOn) ?? a,
        firstWeekContainsDate: (l == null ? void 0 : l.firstWeekContainsDate) ?? ((f = r == null ? void 0 : r.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (c) => {
      const l = s(c);
      return at(l);
    },
    differenceInCalendarDays: (c, l) => {
      const u = s(c), f = s(l);
      return rt(u, f);
    },
    differenceInCalendarMonths: (c, l) => {
      const u = s(c), f = s(l);
      return Jt(u, f);
    }
  };
}
const Ye = (e) => e instanceof HTMLElement ? e : null, Ke = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Ao = (e) => Ye(e.querySelector("[data-animated-month]")), Le = (e) => Ye(e.querySelector("[data-animated-caption]")), et = (e) => Ye(e.querySelector("[data-animated-weeks]")), Ho = (e) => Ye(e.querySelector("[data-animated-nav]")), zo = (e) => Ye(e.querySelector("[data-animated-weekdays]"));
function qo(e, t, { classNames: n, months: r, focused: a, dateLib: o }) {
  const s = be(null), i = be(r), c = be(!1);
  Gn(() => {
    const l = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const u = o.isSameMonth(r[0].date, l[0].date), f = o.isAfter(r[0].date, l[0].date), m = f ? n[Q.caption_after_enter] : n[Q.caption_before_enter], y = f ? n[Q.weeks_after_enter] : n[Q.weeks_before_enter], w = s.current, x = e.current.cloneNode(!0);
    if (x instanceof HTMLElement ? (Ke(x).forEach((v) => {
      if (!(v instanceof HTMLElement))
        return;
      const W = Ao(v);
      W && v.contains(W) && v.removeChild(W);
      const M = Le(v);
      M && M.classList.remove(m);
      const h = et(v);
      h && h.classList.remove(y);
    }), s.current = x) : s.current = null, c.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    a)
      return;
    const D = w instanceof HTMLElement ? Ke(w) : [], N = Ke(e.current);
    if (N != null && N.every((b) => b instanceof HTMLElement) && (D != null && D.every((b) => b instanceof HTMLElement))) {
      c.current = !0, e.current.style.isolation = "isolate";
      const b = Ho(e.current);
      b && (b.style.zIndex = "1"), N.forEach((v, W) => {
        const M = D[W];
        if (!M)
          return;
        v.style.position = "relative", v.style.overflow = "hidden";
        const h = Le(v);
        h && h.classList.add(m);
        const O = et(v);
        O && O.classList.add(y);
        const Y = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), b && (b.style.zIndex = ""), h && h.classList.remove(m), O && O.classList.remove(y), v.style.position = "", v.style.overflow = "", v.contains(M) && v.removeChild(M);
        };
        M.style.pointerEvents = "none", M.style.position = "absolute", M.style.overflow = "hidden", M.setAttribute("aria-hidden", "true");
        const _ = zo(M);
        _ && (_.style.opacity = "0");
        const I = Le(M);
        I && (I.classList.add(f ? n[Q.caption_before_exit] : n[Q.caption_after_exit]), I.addEventListener("animationend", Y));
        const H = et(M);
        H && H.classList.add(f ? n[Q.weeks_before_exit] : n[Q.weeks_after_exit]), v.insertBefore(M, v.firstChild);
      });
    }
  });
}
function Ro(e, t, n, r) {
  const a = e[0], o = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: f, endOfBroadcastWeek: m, endOfISOWeek: y, endOfMonth: w, endOfWeek: x, isAfter: D, startOfBroadcastWeek: N, startOfISOWeek: b, startOfWeek: v } = r, W = c ? N(a, r) : s ? b(a) : v(a), M = c ? m(o) : s ? y(w(o)) : x(w(o)), h = t && (c ? m(t) : s ? y(t) : x(t)), O = h && D(M, h) ? h : M, Y = u(O, W), _ = f(o, a) + 1, I = [];
  for (let J = 0; J <= Y; J++) {
    const V = l(W, J);
    I.push(V);
  }
  const K = (c ? 35 : 42) * _;
  if (i && I.length < K) {
    const J = K - I.length;
    for (let V = 0; V < J; V++) {
      const he = l(I[I.length - 1], 1);
      I.push(he);
    }
  }
  return I;
}
function Go(e) {
  const t = [];
  return e.reduce((n, r) => {
    const a = r.weeks.reduce((o, s) => o.concat(s.days.slice()), t.slice());
    return n.concat(a.slice());
  }, t.slice());
}
function Jo(e, t, n, r) {
  const { numberOfMonths: a = 1 } = n, o = [];
  for (let s = 0; s < a; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    o.push(i);
  }
  return o;
}
function Ct(e, t, n, r) {
  const { month: a, defaultMonth: o, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let c = a || o || s;
  const { differenceInCalendarMonths: l, addMonths: u, startOfMonth: f } = r;
  if (n && l(n, c) < i - 1) {
    const m = -1 * (i - 1);
    c = u(n, m);
  }
  return t && l(c, t) < 0 && (c = t), f(c);
}
function Vo(e, t, n, r) {
  const { addDays: a, endOfBroadcastWeek: o, endOfISOWeek: s, endOfMonth: i, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: f, startOfISOWeek: m, startOfWeek: y } = r, w = e.reduce((x, D) => {
    const N = n.broadcastCalendar ? f(D, r) : n.ISOWeek ? m(D) : y(D), b = n.broadcastCalendar ? o(D) : n.ISOWeek ? s(i(D)) : c(i(D)), v = t.filter((O) => O >= N && O <= b), W = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && v.length < W) {
      const O = t.filter((Y) => {
        const _ = W - v.length;
        return Y > b && Y <= a(b, _);
      });
      v.push(...O);
    }
    const M = v.reduce((O, Y) => {
      const _ = n.ISOWeek ? l(Y) : u(Y), I = O.find((K) => K.weekNumber === _), H = new en(Y, D, r);
      return I ? I.days.push(H) : O.push(new Ra(_, [H])), O;
    }, []), h = new qa(D, M);
    return x.push(h), x;
  }, []);
  return n.reverseMonths ? w.reverse() : w;
}
function Qo(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: a, startOfDay: o, startOfMonth: s, endOfMonth: i, addYears: c, endOfYear: l, today: u } = t, f = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : !n && f && (n = a(c(e.today ?? u(), -100))), r ? r = i(r) : !r && f && (r = l(e.today ?? u())), [
    n && o(n),
    r && o(r)
  ];
}
function Xo(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: o = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, l = a ? o : 1, u = s(e);
  if (!t)
    return i(u, l);
  if (!(c(t, e) < o))
    return i(u, l);
}
function Uo(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: a, numberOfMonths: o } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, l = a ? o ?? 1 : 1, u = s(e);
  if (!t)
    return i(u, -l);
  if (!(c(u, t) <= 0))
    return i(u, -l);
}
function Zo(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function ze(e, t) {
  const [n, r] = q(e);
  return [t === void 0 ? n : t, r];
}
function Ko(e, t) {
  var W;
  const [n, r] = Qo(e, t), { startOfMonth: a, endOfMonth: o } = t, s = Ct(e, n, r, t), [i, c] = ze(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  we(() => {
    const M = Ct(e, n, r, t);
    c(M);
  }, [e.timeZone]);
  const { months: l, weeks: u, days: f, previousMonth: m, nextMonth: y } = _e(() => {
    const M = Jo(i, r, { numberOfMonths: e.numberOfMonths }, t), h = Ro(M, e.endMonth ? o(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), O = Vo(M, h, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), Y = Zo(O), _ = Go(O), I = Uo(i, n, e, t), H = Xo(i, r, e, t);
    return {
      months: O,
      weeks: Y,
      days: _,
      previousMonth: I,
      nextMonth: H
    };
  }, [
    t,
    i.getTime(),
    r == null ? void 0 : r.getTime(),
    n == null ? void 0 : n.getTime(),
    e.disableNavigation,
    e.broadcastCalendar,
    (W = e.endMonth) == null ? void 0 : W.getTime(),
    e.fixedWeeks,
    e.ISOWeek,
    e.numberOfMonths,
    e.pagedNavigation,
    e.reverseMonths
  ]), { disableNavigation: w, onMonthChange: x } = e, D = (M) => u.some((h) => h.days.some((O) => O.isEqualTo(M))), N = (M) => {
    if (w)
      return;
    let h = a(M);
    n && h < a(n) && (h = a(n)), r && h > a(r) && (h = a(r)), c(h), x == null || x(h);
  };
  return {
    months: l,
    weeks: u,
    days: f,
    navStart: n,
    navEnd: r,
    previousMonth: m,
    nextMonth: y,
    goToMonth: N,
    goToDay: (M) => {
      D(M) || N(M.date);
    }
  };
}
var ae;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(ae || (ae = {}));
function Tt(e) {
  return !e[B.disabled] && !e[B.hidden] && !e[B.outside];
}
function Lo(e, t, n, r) {
  let a, o = -1;
  for (const s of e) {
    const i = t(s);
    Tt(i) && (i[B.focused] && o < ae.FocusedModifier ? (a = s, o = ae.FocusedModifier) : r != null && r.isEqualTo(s) && o < ae.LastFocused ? (a = s, o = ae.LastFocused) : n(s.date) && o < ae.Selected ? (a = s, o = ae.Selected) : i[B.today] && o < ae.Today && (a = s, o = ae.Today));
  }
  return a || (a = e.find((s) => Tt(t(s)))), a;
}
function es(e, t, n, r, a, o, s) {
  const { ISOWeek: i, broadcastCalendar: c } = o, { addDays: l, addMonths: u, addWeeks: f, addYears: m, endOfBroadcastWeek: y, endOfISOWeek: w, endOfWeek: x, max: D, min: N, startOfBroadcastWeek: b, startOfISOWeek: v, startOfWeek: W } = s;
  let h = {
    day: l,
    week: f,
    month: u,
    year: m,
    startOfWeek: (O) => c ? b(O, s) : i ? v(O) : W(O),
    endOfWeek: (O) => c ? y(O) : i ? w(O) : x(O)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? h = D([r, h]) : t === "after" && a && (h = N([a, h])), h;
}
function gn(e, t, n, r, a, o, s, i = 0) {
  if (i > 365)
    return;
  const c = es(e, t, n.date, r, a, o, s), l = !!(o.disabled && de(c, o.disabled, s)), u = !!(o.hidden && de(c, o.hidden, s)), f = c, m = new en(c, f, s);
  return !l && !u ? m : gn(e, t, m, r, a, o, s, i + 1);
}
function ts(e, t, n, r, a) {
  const { autoFocus: o } = e, [s, i] = q(), c = Lo(t.days, n, r || (() => !1), s), [l, u] = q(o ? c : void 0);
  return {
    isFocusTarget: (x) => !!(c != null && c.isEqualTo(x)),
    setFocused: u,
    focused: l,
    blur: () => {
      i(l), u(void 0);
    },
    moveFocus: (x, D) => {
      if (!l)
        return;
      const N = gn(x, D, l, t.navStart, t.navEnd, e, a);
      N && (e.disableNavigation && !t.days.some((v) => v.isEqualTo(N)) || (t.goToDay(N), u(N)));
    }
  };
}
function ns(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [o, s] = ze(n, a ? n : void 0), i = a ? n : o, { isSameDay: c } = t, l = (y) => (i == null ? void 0 : i.some((w) => c(w, y))) ?? !1, { min: u, max: f } = e;
  return {
    selected: i,
    select: (y, w, x) => {
      let D = [...i ?? []];
      if (l(y)) {
        if ((i == null ? void 0 : i.length) === u || r && (i == null ? void 0 : i.length) === 1)
          return;
        D = i == null ? void 0 : i.filter((N) => !c(N, y));
      } else
        (i == null ? void 0 : i.length) === f ? D = [y] : D = [...D, y];
      return a || s(D), a == null || a(D, y, w, x), D;
    },
    isSelected: l
  };
}
function rs(e, t, n = 0, r = 0, a = !1, o = se) {
  const { from: s, to: i } = t || {}, { isSameDay: c, isAfter: l, isBefore: u } = o;
  let f;
  if (!s && !i)
    f = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    c(s, e) ? n === 0 ? f = { from: s, to: e } : a ? f = { from: s, to: void 0 } : f = void 0 : u(e, s) ? f = { from: e, to: s } : f = { from: s, to: e };
  else if (s && i)
    if (c(s, e) && c(i, e))
      a ? f = { from: s, to: i } : f = void 0;
    else if (c(s, e))
      f = { from: s, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      f = { from: e, to: n > 0 ? void 0 : e };
    else if (u(e, s))
      f = { from: e, to: i };
    else if (l(e, s))
      f = { from: s, to: e };
    else if (l(e, i))
      f = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (f != null && f.from && (f != null && f.to)) {
    const m = o.differenceInCalendarDays(f.to, f.from);
    r > 0 && m > r ? f = { from: e, to: void 0 } : n > 1 && m < n && (f = { from: e, to: void 0 });
  }
  return f;
}
function as(e, t, n = se) {
  const r = Array.isArray(t) ? t : [t];
  let a = e.from;
  const o = n.differenceInCalendarDays(e.to, e.from), s = Math.min(o, 6);
  for (let i = 0; i <= s; i++) {
    if (r.includes(a.getDay()))
      return !0;
    a = n.addDays(a, 1);
  }
  return !1;
}
function Pt(e, t, n = se) {
  return le(e, t.from, !1, n) || le(e, t.to, !1, n) || le(t, e.from, !1, n) || le(t, e.to, !1, n);
}
function os(e, t, n = se) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? le(e, i, !1, n) : rn(i, n) ? i.some((c) => le(e, c, !1, n)) : He(i) ? i.from && i.to ? Pt(e, { from: i.from, to: i.to }, n) : !1 : nn(i) ? as(e, i.dayOfWeek, n) : st(i) ? n.isAfter(i.before, i.after) ? Pt(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : de(e.from, i, n) || de(e.to, i, n) : it(i) || ct(i) ? de(e.from, i, n) || de(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let l = 0; l <= c; l++) {
      if (s.some((u) => u(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function ss(e, t) {
  const { disabled: n, excludeDisabled: r, resetOnSelect: a, selected: o, required: s, onSelect: i } = e, [c, l] = ze(o, i ? o : void 0), u = i ? o : c;
  return {
    selected: u,
    select: (y, w, x) => {
      const { min: D, max: N } = e;
      let b;
      if (y) {
        const v = u == null ? void 0 : u.from, W = u == null ? void 0 : u.to, M = !!v && !!W, h = !!v && !!W && t.isSameDay(v, W) && t.isSameDay(y, v);
        a && (M || !(u != null && u.from)) ? !s && h ? b = void 0 : b = { from: y, to: void 0 } : b = rs(y, u, D, N, s, t);
      }
      return r && n && (b != null && b.from) && b.to && os({ from: b.from, to: b.to }, n, t) && (b.from = y, b.to = void 0), i || l(b), i == null || i(b, y, w, x), b;
    },
    isSelected: (y) => u && le(u, y, !1, t)
  };
}
function is(e, t) {
  const { selected: n, required: r, onSelect: a } = e, [o, s] = ze(n, a ? n : void 0), i = a ? n : o, { isSameDay: c } = t;
  return {
    selected: i,
    select: (f, m, y) => {
      let w = f;
      return !r && i && i && c(f, i) && (w = void 0), a || s(w), a == null || a(w, f, m, y), w;
    },
    isSelected: (f) => i ? c(i, f) : !1
  };
}
function cs(e, t) {
  const n = is(e, t), r = ns(e, t), a = ss(e, t);
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
function Z(e, t) {
  return e instanceof R && e.timeZone === t ? e : new R(e, t);
}
function ge(e, t, n) {
  return Z(e, t);
}
function Yt(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? ge(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? ge(r, t) : r) : He(e) ? {
    ...e,
    from: e.from ? Z(e.from, t) : e.from,
    to: e.to ? Z(e.to, t) : e.to
  } : st(e) ? {
    before: ge(e.before, t),
    after: ge(e.after, t)
  } : it(e) ? {
    after: ge(e.after, t)
  } : ct(e) ? {
    before: ge(e.before, t)
  } : e;
}
function tt(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => Yt(r, t)) : Yt(e, t));
}
function pn(e) {
  var yt;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = Z(t.today, n)), t.month && (t.month = Z(t.month, n)), t.defaultMonth && (t.defaultMonth = Z(t.defaultMonth, n)), t.startMonth && (t.startMonth = Z(t.startMonth, n)), t.endMonth && (t.endMonth = Z(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = Z(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = (yt = t.selected) == null ? void 0 : yt.map((S) => Z(S, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? Z(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? Z(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = tt(t.disabled, n)), t.hidden !== void 0 && (t.hidden = tt(t.hidden, n)), t.modifiers)) {
    const S = {};
    Object.keys(t.modifiers).forEach((C) => {
      var j;
      S[C] = tt((j = t.modifiers) == null ? void 0 : j[C], n);
    }), t.modifiers = S;
  }
  const { components: r, formatters: a, labels: o, dateLib: s, locale: i, classNames: c } = _e(() => {
    const S = { ...Lt, ...t.locale }, C = t.broadcastCalendar ? 1 : t.weekStartsOn, j = t.noonSafe && t.timeZone ? $o(t.timeZone, {
      weekStartsOn: C,
      locale: S
    }) : void 0, $ = t.dateLib && j ? { ...j, ...t.dateLib } : t.dateLib ?? j, P = new X({
      locale: S,
      weekStartsOn: C,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, $);
    return {
      dateLib: P,
      components: wo(t.components),
      formatters: To(t.formatters),
      labels: Eo(t.labels, P.options),
      locale: S,
      classNames: { ...ko(), ...t.classNames }
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
  const { captionLayout: l, mode: u, navLayout: f, numberOfMonths: m = 1, onDayBlur: y, onDayClick: w, onDayFocus: x, onDayKeyDown: D, onDayMouseEnter: N, onDayMouseLeave: b, onNextClick: v, onPrevClick: W, showWeekNumber: M, styles: h } = t, { formatCaption: O, formatDay: Y, formatMonthDropdown: _, formatWeekNumber: I, formatWeekNumberHeader: H, formatWeekdayName: K, formatYearDropdown: J } = a, V = Ko(t, s), { days: he, months: ke, navStart: qe, navEnd: Re, previousMonth: L, nextMonth: ee, goToMonth: ie } = V, Ge = bo(he, t, qe, Re, s), { isSelected: Me, select: De, selected: Ee } = cs(t, s) ?? {}, { blur: lt, focused: Fe, isFocusTarget: bn, moveFocus: dt, setFocused: Ie } = ts(t, V, Ge, Me ?? (() => !1), s), { labelDayButton: vn, labelGridcell: wn, labelGrid: xn, labelMonthDropdown: kn, labelNav: ut, labelPrevious: Mn, labelNext: Dn, labelWeekday: Sn, labelWeekNumber: jn, labelWeekNumberHeader: Nn, labelYearDropdown: On } = o, Wn = _e(() => _o(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), ft = u !== void 0 || w !== void 0, Je = U(() => {
    L && (ie(L), W == null || W(L));
  }, [L, ie, W]), Ve = U(() => {
    ee && (ie(ee), v == null || v(ee));
  }, [ie, ee, v]), Cn = U((S, C) => (j) => {
    j.preventDefault(), j.stopPropagation(), Ie(S), !C.disabled && (De == null || De(S.date, C, j), w == null || w(S.date, C, j));
  }, [De, w, Ie]), Tn = U((S, C) => (j) => {
    Ie(S), x == null || x(S.date, C, j);
  }, [x, Ie]), Pn = U((S, C) => (j) => {
    lt(), y == null || y(S.date, C, j);
  }, [lt, y]), Yn = U((S, C) => (j) => {
    const $ = {
      ArrowLeft: [
        j.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        j.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [j.shiftKey ? "year" : "week", "after"],
      ArrowUp: [j.shiftKey ? "year" : "week", "before"],
      PageUp: [j.shiftKey ? "year" : "month", "before"],
      PageDown: [j.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if ($[j.key]) {
      j.preventDefault(), j.stopPropagation();
      const [P, re] = $[j.key];
      dt(P, re);
    }
    D == null || D(S.date, C, j);
  }, [dt, D, t.dir]), En = U((S, C) => (j) => {
    N == null || N(S.date, C, j);
  }, [N]), Fn = U((S, C) => (j) => {
    b == null || b(S.date, C, j);
  }, [b]), In = U((S, C) => (j) => {
    const $ = Number(j.target.value), P = s.setMonth(s.startOfMonth(S), $);
    ie(s.addMonths(P, -C));
  }, [s, ie]), _n = U((S, C) => (j) => {
    const $ = Number(j.target.value), P = s.setYear(s.startOfMonth(S), $);
    ie(s.addMonths(P, -C));
  }, [s, ie]), { className: Bn, style: $n } = _e(() => ({
    className: [c[g.Root], t.className].filter(Boolean).join(" "),
    style: { ...h == null ? void 0 : h[g.Root], ...t.style }
  }), [c, t.className, t.style, h]), An = xo(t), ht = (S) => {
    const C = h == null ? void 0 : h[g.Dropdown], j = h == null ? void 0 : h[S];
    if (!(!C && !j))
      return {
        ...C,
        ...j
      };
  }, mt = be(null);
  qo(mt, !!t.animate, {
    classNames: c,
    months: ke,
    focused: Fe,
    dateLib: s
  });
  const Hn = {
    dayPickerProps: t,
    selected: Ee,
    select: De,
    isSelected: Me,
    months: ke,
    nextMonth: ee,
    previousMonth: L,
    goToMonth: ie,
    getModifiers: Ge,
    components: r,
    classNames: c,
    styles: h,
    labels: o,
    formatters: a
  };
  return p.createElement(
    tn.Provider,
    { value: Hn },
    p.createElement(
      r.Root,
      { rootRef: t.animate ? mt : void 0, className: Bn, style: $n, dir: t.dir, id: t.id, lang: t.lang ?? i.code, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...An },
      p.createElement(
        r.Months,
        { className: c[g.Months], style: h == null ? void 0 : h[g.Months] },
        !t.hideNavigation && !f && p.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[g.Nav], style: h == null ? void 0 : h[g.Nav], "aria-label": ut(), onPreviousClick: Je, onNextClick: Ve, previousMonth: L, nextMonth: ee }),
        ke.map((S, C) => {
          const j = t.reverseMonths ? ke.length - 1 - C : C;
          return p.createElement(
            r.Month,
            {
              "data-animated-month": t.animate ? "true" : void 0,
              className: c[g.Month],
              style: h == null ? void 0 : h[g.Month],
              // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
              key: C,
              displayIndex: C,
              calendarMonth: S
            },
            f === "around" && !t.hideNavigation && C === 0 && p.createElement(
              r.PreviousMonthButton,
              { type: "button", className: c[g.PreviousMonthButton], style: h == null ? void 0 : h[g.PreviousMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": Mn(L), onClick: Je, "data-animated-button": t.animate ? "true" : void 0 },
              p.createElement(r.Chevron, { disabled: L ? void 0 : !0, className: c[g.Chevron], style: h == null ? void 0 : h[g.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
            ),
            p.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: c[g.MonthCaption], style: h == null ? void 0 : h[g.MonthCaption], calendarMonth: S, displayIndex: C }, l != null && l.startsWith("dropdown") ? p.createElement(
              r.DropdownNav,
              { className: c[g.Dropdowns], style: h == null ? void 0 : h[g.Dropdowns] },
              (() => {
                const $ = l === "dropdown" || l === "dropdown-months" ? p.createElement(r.MonthsDropdown, { key: "month", className: c[g.MonthsDropdown], "aria-label": kn(), disabled: !!t.disableNavigation, onChange: In(S.date, j), options: Fo(S.date, qe, Re, a, s), style: ht(g.MonthsDropdown), value: s.getMonth(S.date) }) : p.createElement("span", { key: "month" }, _(S.date, s)), P = l === "dropdown" || l === "dropdown-years" ? p.createElement(r.YearsDropdown, { key: "year", className: c[g.YearsDropdown], "aria-label": On(s.options), disabled: !!t.disableNavigation, onChange: _n(S.date, j), options: Bo(qe, Re, a, s, !!t.reverseYears), style: ht(g.YearsDropdown), value: s.getYear(S.date) }) : p.createElement("span", { key: "year" }, J(S.date, s));
                return s.getMonthYearOrder() === "year-first" ? [P, $] : [$, P];
              })(),
              p.createElement("span", { role: "status", "aria-live": "polite", style: {
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
              } }, O(S.date, s.options, s))
            ) : p.createElement(r.CaptionLabel, { className: c[g.CaptionLabel], style: h == null ? void 0 : h[g.CaptionLabel], role: "status", "aria-live": "polite" }, O(S.date, s.options, s))),
            f === "around" && !t.hideNavigation && C === m - 1 && p.createElement(
              r.NextMonthButton,
              { type: "button", className: c[g.NextMonthButton], style: h == null ? void 0 : h[g.NextMonthButton], tabIndex: ee ? void 0 : -1, "aria-disabled": ee ? void 0 : !0, "aria-label": Dn(ee), onClick: Ve, "data-animated-button": t.animate ? "true" : void 0 },
              p.createElement(r.Chevron, { disabled: ee ? void 0 : !0, className: c[g.Chevron], style: h == null ? void 0 : h[g.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
            ),
            C === m - 1 && f === "after" && !t.hideNavigation && p.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[g.Nav], style: h == null ? void 0 : h[g.Nav], "aria-label": ut(), onPreviousClick: Je, onNextClick: Ve, previousMonth: L, nextMonth: ee }),
            p.createElement(
              r.MonthGrid,
              { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": xn(S.date, s.options, s) || void 0, className: c[g.MonthGrid], style: h == null ? void 0 : h[g.MonthGrid] },
              !t.hideWeekdays && p.createElement(
                r.Weekdays,
                { "data-animated-weekdays": t.animate ? "true" : void 0, className: c[g.Weekdays], style: h == null ? void 0 : h[g.Weekdays] },
                M && p.createElement(r.WeekNumberHeader, { "aria-label": Nn(s.options), className: c[g.WeekNumberHeader], style: h == null ? void 0 : h[g.WeekNumberHeader], scope: "col" }, H()),
                Wn.map(($) => p.createElement(r.Weekday, { "aria-label": Sn($, s.options, s), className: c[g.Weekday], key: String($), style: h == null ? void 0 : h[g.Weekday], scope: "col" }, K($, s.options, s)))
              ),
              p.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: c[g.Weeks], style: h == null ? void 0 : h[g.Weeks] }, S.weeks.map(($) => p.createElement(
                r.Week,
                { className: c[g.Week], key: $.weekNumber, style: h == null ? void 0 : h[g.Week], week: $ },
                M && p.createElement(r.WeekNumber, { week: $, style: h == null ? void 0 : h[g.WeekNumber], "aria-label": jn($.weekNumber, {
                  locale: i
                }), className: c[g.WeekNumber], scope: "row", role: "rowheader" }, I($.weekNumber, s)),
                $.days.map((P) => {
                  const { date: re } = P, T = Ge(P);
                  if (T[B.focused] = !T.hidden && !!(Fe != null && Fe.isEqualTo(P)), T[ne.selected] = (Me == null ? void 0 : Me(re)) || T.selected, He(Ee)) {
                    const { from: Qe, to: Xe } = Ee;
                    T[ne.range_start] = !!(Qe && Xe && s.isSameDay(re, Qe)), T[ne.range_end] = !!(Qe && Xe && s.isSameDay(re, Xe)), T[ne.range_middle] = le(Ee, re, !0, s);
                  }
                  const zn = Io(T, h, t.modifiersStyles), qn = vo(T, c, t.modifiersClassNames), Rn = !ft && !T.hidden ? wn(re, T, s.options, s) : void 0;
                  return p.createElement(r.Day, { key: `${P.isoDate}_${P.displayMonthId}`, day: P, modifiers: T, className: qn.join(" "), style: zn, role: "gridcell", "aria-selected": T.selected || void 0, "aria-label": Rn, "data-day": P.isoDate, "data-month": P.outside ? P.dateMonthId : void 0, "data-selected": T.selected || void 0, "data-disabled": T.disabled || void 0, "data-hidden": T.hidden || void 0, "data-outside": P.outside || void 0, "data-focused": T.focused || void 0, "data-today": T.today || void 0 }, !T.hidden && ft ? p.createElement(r.DayButton, { className: c[g.DayButton], style: h == null ? void 0 : h[g.DayButton], type: "button", day: P, modifiers: T, disabled: !T.focused && T.disabled || void 0, "aria-disabled": T.focused && T.disabled || void 0, tabIndex: bn(P) ? 0 : -1, "aria-label": vn(re, T, s.options, s), onClick: Cn(P, T), onBlur: Pn(P, T), onFocus: Tn(P, T), onKeyDown: Yn(P, T), onMouseEnter: En(P, T), onMouseLeave: Fn(P, T) }, Y(re, s.options, s)) : !T.hidden && Y(P.date, s.options, s));
                })
              )))
            )
          );
        })
      ),
      t.footer && p.createElement(r.Footer, { className: c[g.Footer], style: h == null ? void 0 : h[g.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function ls(e) {
  return e ? e.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}
function Os({
  value: e,
  onChange: t,
  placeholder: n = "Select date",
  disabled: r = !1,
  minDate: a,
  maxDate: o
}) {
  const [s, i] = q(!1), c = be(null);
  we(() => {
    if (!s) return;
    function m(y) {
      c.current && !c.current.contains(y.target) && i(!1);
    }
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [s]);
  const l = {
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
  }, u = {
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
  }, f = [
    ...a ? [{ before: a }] : [],
    ...o ? [{ after: o }] : []
  ];
  return /* @__PURE__ */ k("div", { ref: c, style: { position: "relative", display: "inline-block" }, children: [
    /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        style: l,
        disabled: r,
        onClick: () => {
          r || i((m) => !m);
        },
        children: [
          /* @__PURE__ */ d("span", { style: { fontSize: 10 }, children: "◈" }),
          /* @__PURE__ */ d("span", { children: ls(e) || n })
        ]
      }
    ),
    s && /* @__PURE__ */ d("div", { style: u, children: /* @__PURE__ */ d(
      pn,
      {
        mode: "single",
        selected: e,
        onSelect: (m) => {
          t == null || t(m), i(!1);
        },
        disabled: f.length > 0 ? f : void 0
      }
    ) })
  ] });
}
function Et(e) {
  return e ? e.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}
function Ws({
  value: e,
  onChange: t,
  placeholder: n = "Select range",
  disabled: r = !1
}) {
  const [a, o] = q({}), [s, i] = q(!1), c = be(null), l = e !== void 0 ? e : a;
  we(() => {
    if (!s) return;
    function w(x) {
      c.current && !c.current.contains(x.target) && i(!1);
    }
    return document.addEventListener("mousedown", w), () => document.removeEventListener("mousedown", w);
  }, [s]);
  function u(w) {
    const x = w ?? {};
    e === void 0 && o(x), t == null || t(x);
  }
  const f = l.from ? `${Et(l.from)} — ${l.to ? Et(l.to) : "..."}` : n, m = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 38,
    padding: "0 12px",
    background: "var(--j-bg-panel)",
    border: "1px solid var(--j-border)",
    color: l.from ? "var(--j-accent)" : "var(--j-text-dim)",
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    letterSpacing: ".08em",
    cursor: r ? "not-allowed" : "pointer",
    clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
    opacity: r ? 0.4 : 1
  };
  return /* @__PURE__ */ k("div", { ref: c, style: { position: "relative", display: "inline-block" }, children: [
    /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        style: m,
        disabled: r,
        onClick: () => {
          r || i((w) => !w);
        },
        children: [
          /* @__PURE__ */ d("span", { style: { fontSize: 10 }, children: "◈" }),
          /* @__PURE__ */ d("span", { children: f })
        ]
      }
    ),
    s && /* @__PURE__ */ d("div", { style: {
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
    }, children: /* @__PURE__ */ d(
      pn,
      {
        mode: "range",
        selected: l,
        onSelect: u
      }
    ) })
  ] });
}
function Ft(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function It(e) {
  return String(e).padStart(2, "0");
}
function Cs({
  value: e,
  onChange: t,
  disabled: n = !1,
  format: r = "24h"
}) {
  const [a, o] = q(e ? e.split(":")[0] : ""), [s, i] = q(e ? e.split(":")[1] : "");
  we(() => {
    e && (o(e.split(":")[0]), i(e.split(":")[1]));
  }, [e]);
  const c = r === "12h" ? 12 : 23;
  function l(m) {
    const y = Ft(parseInt(m || "0", 10), 0, c), w = It(y);
    o(w), t == null || t(`${w}:${s || "00"}`);
  }
  function u(m) {
    const y = Ft(parseInt(m || "0", 10), 0, 59), w = It(y);
    i(w), t == null || t(`${a || "00"}:${w}`);
  }
  const f = {
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
  return /* @__PURE__ */ k("div", { style: { display: "inline-flex", alignItems: "center", gap: 4, opacity: n ? 0.4 : 1 }, children: [
    /* @__PURE__ */ d(
      "input",
      {
        type: "number",
        min: 0,
        max: c,
        value: a,
        placeholder: "HH",
        disabled: n,
        onChange: (m) => o(m.target.value),
        onBlur: (m) => l(m.target.value),
        style: f
      }
    ),
    /* @__PURE__ */ d("span", { style: { color: "var(--j-accent)", fontFamily: "'Courier New', monospace", fontSize: 16, userSelect: "none" }, children: ":" }),
    /* @__PURE__ */ d(
      "input",
      {
        type: "number",
        min: 0,
        max: 59,
        value: s,
        placeholder: "MM",
        disabled: n,
        onChange: (m) => i(m.target.value),
        onBlur: (m) => u(m.target.value),
        style: f
      }
    )
  ] });
}
export {
  bs as JButton,
  vs as JCard,
  Ms as JCheckbox,
  Os as JDatePicker,
  Ws as JDateRangePicker,
  Ns as JFormField,
  Be as JHudBar,
  gs as JHudFrame,
  ps as JHudFrameCard,
  ws as JInput,
  ms as JNavItem,
  ys as JPageLayout,
  Ds as JRadio,
  ks as JSelect,
  nr as JSidebar,
  js as JSlider,
  er as JSpinner,
  xs as JTextArea,
  hs as JThemePicker,
  fs as JThemeProvider,
  Cs as JTimePicker,
  Ss as JToggle,
  z as JarvisTokens,
  nt as PRESETS,
  Vn as toCss,
  Un as useTheme
};
