"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import RevealHeading from "./RevealHeading";

// ── Constants ─────────────────────────────────────────────────────────────────
const LEETCODE_URL = "https://leetcode.com/u/Kunal016/";
const GITHUB_URL = "https://github.com/kunalgupta016";

const DIFF = [
  { key: "easySolved",   label: "Easy",   color: "#00b8a3", bg: "rgba(0,184,163,0.1)"   },
  { key: "mediumSolved", label: "Medium", color: "#ffc01e", bg: "rgba(255,192,30,0.1)"  },
  { key: "hardSolved",   label: "Hard",   color: "#ef4743", bg: "rgba(239,71,67,0.1)"   },
];

// GitHub contribution level → color (dark-mode green palette)
const GH_COLORS = [
  "rgba(255,255,255,0.04)",  // 0 — empty
  "#1a4d2e",                  // 1 — low
  "#1e8a40",                  // 2 — medium
  "#2ea84f",                  // 3 — high
  "#4ade80",                  // 4 — very high
];

// ── Animated count-up ─────────────────────────────────────────────────────────
function useCountUp(target, duration = 1400, started = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started || !target) return;
    let t0 = null;
    const frame = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [target, started, duration]);
  return val;
}

// ── Multi-colour donut (conic-gradient) ───────────────────────────────────────
function MultiDonut({ easy, medium, hard, total, animate }) {
  const SIZE = 148;
  const INNER = 96;

  const easyPct   = total ? (easy   / total) * 100 : 0;
  const mediumPct = total ? (medium / total) * 100 : 0;
  const hardPct   = total ? (hard   / total) * 100 : 0;

  // Small gap between segments (0.6deg)
  const GAP = 0.6;
  const easyEnd   = easyPct;
  const medStart  = easyEnd + GAP;
  const medEnd    = medStart + mediumPct;
  const hardStart = medEnd + GAP;
  const hardEnd   = hardStart + hardPct;

  const gradient = animate
    ? `conic-gradient(
        #00b8a3 0% ${easyEnd}%,
        transparent ${easyEnd}% ${medStart}%,
        #ffc01e ${medStart}% ${medEnd}%,
        transparent ${medEnd}% ${hardStart}%,
        #ef4743 ${hardStart}% ${hardEnd}%,
        rgba(255,255,255,0.05) ${hardEnd}% 100%
      )`
    : "conic-gradient(rgba(255,255,255,0.05) 0% 100%)";

  const count = useCountUp(total, 1200, animate);

  return (
    <div
      style={{
        position: "relative",
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        background: gradient,
        transition: "background 1.4s cubic-bezier(0.4,0,0.2,1)",
        flexShrink: 0,
        boxShadow: animate
          ? "0 0 28px rgba(0,184,163,0.12), 0 0 12px rgba(255,192,30,0.08)"
          : "none",
      }}
    >
      {/* Inner circle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: INNER,
          height: INNER,
          borderRadius: "50%",
          backgroundColor: "var(--bg-elevated)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1,
          }}
        >
          {count}
        </span>
        <span
          style={{
            fontSize: "0.62rem",
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          solved
        </span>
      </div>
    </div>
  );
}

// ── Difficulty row ────────────────────────────────────────────────────────────
function DiffRow({ label, solved, total, color, bg, animate }) {
  const pct = total ? Math.min((solved / total) * 100, 100) : 0;
  const count = useCountUp(solved, 1200, animate);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: color,
              boxShadow: `0 0 6px ${color}`,
            }}
          />
          <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
            {label}
          </span>
        </div>
        <span
          style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            color,
            fontFamily: "var(--font-mono), monospace",
          }}
        >
          {count} <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.75rem" }}>solved</span>
        </span>
      </div>
      {/* Progress bar */}
      <div
        style={{
          height: 5,
          borderRadius: "var(--radius-full)",
          background: bg,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "var(--radius-full)",
            background: color,
            boxShadow: `0 0 6px ${color}60`,
            width: animate ? `${pct}%` : "0%",
            transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

// ── Stat card (right column) ──────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color = "var(--accent)", delay, animate }) {
  const numVal = typeof value === "number" ? value : null;
  const count  = useCountUp(numVal ?? 0, 1200, animate && numVal !== null);
  const display = numVal !== null ? count.toLocaleString() : value;

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, x: 20 }}
      animate={animate ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{ padding: "20px 22px", borderRadius: "var(--radius-lg)", flex: 1 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: "1.1rem" }}>{icon}</span>
        <span
          style={{
            fontSize: "0.7rem",
            fontFamily: "var(--font-mono), monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "1.9rem",
          fontWeight: 700,
          color,
          lineHeight: 1,
          textShadow: `0 0 20px ${color}50`,
        }}
      >
        {display}
      </div>
      {sub && (
        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4 }}>
          {sub}
        </div>
      )}
    </motion.div>
  );
}

// ── GitHub Heatmap ────────────────────────────────────────────────────────────
function GithubHeatmap({ contributions }) {
  // Group by week (Sunday-first columns), last 53 weeks
  const weeks = useMemo(() => {
    if (!contributions.length) return [];
    const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
    const cols = [];
    let week = [];
    sorted.forEach((day) => {
      const dow = new Date(day.date).getUTCDay(); // 0=Sun
      if (dow === 0 && week.length) {
        cols.push(week);
        week = [];
      }
      week.push(day);
    });
    if (week.length) cols.push(week);
    return cols.slice(-53);
  }, [contributions]);

  // Month labels
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const firstDay = week[0];
      if (!firstDay) return;
      const month = new Date(firstDay.date).getUTCMonth();
      if (month !== lastMonth) {
        labels.push({ wi, label: new Date(firstDay.date).toLocaleString("en", { month: "short" }) });
        lastMonth = month;
      }
    });
    return labels;
  }, [weeks]);

  const CELL = 11;
  const GAP  = 3;

  if (!weeks.length) return null;

  return (
    <div style={{ overflowX: "auto", paddingBottom: 4 }}>
      {/* Month labels */}
      <div style={{ display: "flex", marginBottom: 4, paddingLeft: 2 }}>
        {monthLabels.map(({ wi, label }) => (
          <div
            key={`${wi}-${label}`}
            style={{
              position: "absolute",
              left: wi * (CELL + GAP),
              fontSize: "0.68rem",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono), monospace",
              whiteSpace: "nowrap",
            }}
          />
        ))}
        {/* Render month labels inline via positional trick */}
        <div style={{ position: "relative", height: 14, width: weeks.length * (CELL + GAP) }}>
          {monthLabels.map(({ wi, label }) => (
            <span
              key={`${wi}-${label}`}
              style={{
                position: "absolute",
                left: wi * (CELL + GAP),
                fontSize: "0.68rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono), monospace",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "flex", gap: GAP }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            {/* Pad to 7 rows */}
            {Array.from({ length: 7 }).map((_, di) => {
              const day = week.find((d) => new Date(d.date).getUTCDay() === di);
              const level = day?.level ?? 0;
              const count = day?.count ?? 0;
              return (
                <div
                  key={di}
                  title={day ? `${day.date}: ${count} contribution${count !== 1 ? "s" : ""}` : ""}
                  style={{
                    width: CELL,
                    height: CELL,
                    borderRadius: 2,
                    backgroundColor: GH_COLORS[level] ?? GH_COLORS[0],
                    cursor: count > 0 ? "default" : "default",
                    transition: "transform 0.1s ease",
                    boxShadow: level >= 3 ? `0 0 4px ${GH_COLORS[level]}80` : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (level > 0) e.currentTarget.style.transform = "scale(1.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginTop: 10,
          justifyContent: "flex-end",
        }}
      >
        <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Less</span>
        {GH_COLORS.map((c, i) => (
          <div
            key={i}
            style={{ width: CELL, height: CELL, borderRadius: 2, backgroundColor: c }}
          />
        ))}
        <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>More</span>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function LeetCodeStats() {
  const [lcData, setLcData]   = useState(null);
  const [ghData, setGhData]   = useState(null);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    Promise.all([
      fetch("/api/leetcode").then((r) => r.json()),
      fetch("/api/github").then((r) => r.json()),
    ])
      .then(([lc, gh]) => { setLcData(lc); setGhData(gh); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const lc = lcData ?? {
    totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0,
    ranking: 0, currentStreak: 0, totalActiveDays: 0, maxStreak: 0,
  };
  const ghContributions = ghData?.contributions ?? [];
  const ghTotal         = ghData?.total ?? 0;

  const animate = inView && !loading;

  return (
    <section id="leetcode" ref={sectionRef} className="section-padding section-tone-b">
      <div className="container-main">

        {/* ── Heading ── */}
        <RevealHeading
          eyebrow="( 03 ) — Competitive Programming"
          text="Coding"
          accent="Profile"
          style={{
            fontFamily: "var(--font-serif), sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 48,
          }}
        />

        {/* ── LEETCODE ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 32 }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono), monospace",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: 16,
            }}
          >
            CODING PROFILE
          </div>

          <div className="lc-row" style={{ display: "flex", gap: 16, alignItems: "stretch" }}>

            {/* ── LEFT: LeetCode card ── */}
            <div
              className="glass-card lc-main-card"
              style={{ padding: "28px 28px", borderRadius: "var(--radius-lg)", flex: "1 1 auto" }}
            >
              {/* Card header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {/* LeetCode icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffc01e">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "var(--font-serif), sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    LeetCode
                  </span>
                  {lc.ranking && (
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontFamily: "var(--font-mono), monospace",
                        color: "var(--text-muted)",
                        backgroundColor: "var(--bg-surface)",
                        border: "1px solid var(--border)",
                        padding: "2px 8px",
                        borderRadius: "var(--radius-full)",
                      }}
                    >
                      #{lc.ranking.toLocaleString()}
                    </span>
                  )}
                </div>
                <a
                  href={LEETCODE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffc01e")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  Profile ↗
                </a>
              </div>

              {/* Donut + difficulty rows */}
              <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
                <MultiDonut
                  easy={lc.easySolved}
                  medium={lc.mediumSolved}
                  hard={lc.hardSolved}
                  total={lc.totalSolved}
                  animate={animate}
                />
                <div style={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column", gap: 14 }}>
                  {DIFF.map((d) => (
                    <DiffRow
                      key={d.key}
                      label={d.label}
                      solved={lc[d.key]}
                      total={lc.totalSolved}
                      color={d.color}
                      bg={d.bg}
                      animate={animate}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Stat cards stack ── */}
            <div
              className="lc-stat-col"
              style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 180 }}
            >
              <StatCard
                icon="🔥"
                label="Current Streak"
                value={lc.currentStreak}
                sub="consecutive days"
                color="#ff5a36"
                delay={0}
                animate={animate}
              />
              <StatCard
                icon="📅"
                label="Active Days"
                value={lc.totalActiveDays}
                sub="total active"
                color="var(--accent)"
                delay={0.08}
                animate={animate}
              />
              <StatCard
                icon="🏆"
                label="Max Streak"
                value={lc.maxStreak}
                sub="consecutive days"
                color="#ffc01e"
                delay={0.16}
                animate={animate}
              />
            </div>
          </div>
        </motion.div>

        {/* ── GITHUB SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono), monospace",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              GITHUB ACTIVITIES
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {ghTotal > 0 && (
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono), monospace",
                  }}
                >
                  {ghTotal.toLocaleString()} contributions in the last year
                </span>
              )}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4ade80")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                Profile ↗
              </a>
            </div>
          </div>

          <div
            className="glass-card"
            style={{ padding: "24px 24px 20px", borderRadius: "var(--radius-lg)" }}
          >
            {/* GitHub card header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--text-secondary)">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span
                style={{
                  fontFamily: "var(--font-serif), sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                kunalgupta016
              </span>
            </div>

            {loading || !ghContributions.length ? (
              <div
                style={{
                  height: 100,
                  borderRadius: "var(--radius-md)",
                  background:
                    "linear-gradient(90deg, var(--bg-elevated) 25%, var(--bg-surface) 50%, var(--bg-elevated) 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            ) : (
              <GithubHeatmap contributions={ghContributions} />
            )}
          </div>
        </motion.div>
      </div>

      {/* Responsive */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .lc-row {
            flex-direction: column !important;
          }
          .lc-stat-col {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            min-width: unset !important;
          }
          .lc-main-card {
            padding: 20px 16px !important;
          }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </section>
  );
}
