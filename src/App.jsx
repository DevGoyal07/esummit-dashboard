import { useState, useEffect } from "react";
import {
  IndianRupee, Ticket, Building2, Users, TrendingUp, Zap,
  ArrowUpRight, ArrowUp, BedDouble, GraduationCap, MapPin,
  BarChart2, Activity, Tag, Award, Radio,
  Percent, UserCheck, Megaphone, Sparkles, ChevronRight,
  Star,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";

/* ─────────────────────────── DESIGN TOKENS ─────────────────────────────── */
const T = {
  bg:         "#0a0a0a",
  surface:    "rgba(18,18,18,0.75)",
  border:     "rgba(255,255,255,0.06)",
  borderMid:  "rgba(255,255,255,0.1)",
  text:       "#ffffff",
  muted:      "#71717a",
  subtle:     "#3f3f46",
  emerald:    "#10b981",
  emeraldDim: "rgba(16,185,129,0.13)",
  cyan:       "#22d3ee",
  cyanDim:    "rgba(34,211,238,0.12)",
  violet:     "#8b5cf6",
  violetDim:  "rgba(139,92,246,0.13)",
  indigo:     "#818cf8",
  indigoDim:  "rgba(129,140,248,0.12)",
  amber:      "#f59e0b",
  amberDim:   "rgba(245,158,11,0.12)",
  rose:       "#fb7185",
  roseDim:    "rgba(251,113,133,0.12)",
};

/* ─────────────────────────── DATA ───────────────────────────────────────── */
const kpis = [
  { icon: IndianRupee, label: "Total Inflow",     value: "₹21,24,348", delta: "+65.9%", sub: "vs ₹12.8L in 2025",  accent: T.emerald, dim: T.emeraldDim },
  { icon: Ticket,      label: "Passes Sold",      value: "1,613",       delta: "+97.9%", sub: "vs 815 in 2025",     accent: T.cyan,    dim: T.cyanDim    },
  { icon: Building2,   label: "Accommodation",    value: "388 Slots",   delta: "+29.3%", sub: "vs 300 in 2025",     accent: T.violet,  dim: T.violetDim  },
  { icon: Users,       label: "Student Audience", value: "1,433",       delta: "+160%",  sub: "vs 551 in 2025",     accent: T.amber,   dim: T.amberDim   },
];

const passData = [
  { name: "College Student",    value: 1021, revenue: 764729, price: 749  },
  { name: "Competition",        value: 91,   revenue: 54509,  price: 599  },
  { name: "3-Day Professional", value: 74,   revenue: 164576, price: 2225 },
  { name: "Day 2 Professional", value: 53,   revenue: 50297,  price: 949  },
  { name: "School Student",     value: 320, revenue: 71680,  price: 224  },
  { name: "Day 1 Professional", value: 27,   revenue: 25623,  price: 949  },
  { name: "Day 3 Professional", value: 23,   revenue: 21827,  price: 949  },
];
const PIE_COLORS = [T.emerald, T.cyan, T.violet, T.amber, "#e879f9", "#f97316", "#38bdf8"];

const audienceData = [
  { year: "2025", Students: 551,  Professionals: 264 },
  { year: "2026", Students: 1433, Professionals: 180 },
];

const yoyRevenueData = [
  { year: "2025", Passes: 6.83, Accommodation: 6.00 },
  { year: "2026", Passes: 9.59, Accommodation: 6.70, Combos: 4.95 },
];

const revenueSplitData = [
  { name: "Passes Only",        value: 958661, pct: 45.1, color: T.emerald },
  { name: "Accommodation Only", value: 670036, pct: 31.5, color: T.violet  },
  { name: "Combo Deals",        value: 495651, pct: 23.3, color: T.cyan    },
];

const collegeData = [
  { name: "VIT Vellore",        passes: 42 },
  { name: "Mahendra Eng.",      passes: 42 },
  { name: "IIT Madras (BS)",    passes: 38 },
  { name: "Dhanalakshmi S.",    passes: 33 },
  { name: "Amrita Vishwa",      passes: 25 },
  { name: "Thiagarajar",        passes: 24 },
  { name: "KL University",      passes: 21 },
  { name: "Kumaraguru",         passes: 18 },
  { name: "SRM Valliammai",     passes: 18 },
  { name: "Saveetha Eng.",      passes: 15 },
  { name: "PSG Tech",           passes: 14 },
];

const topCitiesData = [
  { name: "Chennai",     passes: 556 },
  { name: "Coimbatore",  passes: 80  },
  { name: "Bangalore",   passes: 72  },
  { name: "Madurai",     passes: 54  },
  { name: "Salem",       passes: 51  },
  { name: "Hyderabad",   passes: 40  },
  { name: "Mysuru",      passes: 31  },
  { name: "Dindigul",    passes: 17  },
  { name: "Kanchipuram", passes: 16  },
  { name: "Vellore",     passes: 15  },
];

const eventData = [
  { name: "Ethletics",         participants: 248 },
  { name: "BizQuiz",           participants: 210 },
  { name: "Product Construct", participants: 186 },
  { name: "Stocks Are High",   participants: 150 },
  { name: "Expo Attendee",     participants: 105 },
  { name: "Invaso",            participants: 103 },
  { name: "Boardroom",         participants: 74  },
  { name: "Riskify",           participants: 48  },
  { name: "Design Blitz",      participants: 46  },
  { name: "Startup Expo",      participants: 35  },
  { name: "Pitch Arena",       participants: 24  },
  { name: "Investinder",       participants: 21  },
  { name: "I-Summit",          participants: 20  },
  { name: "E-Awards",          participants: 20  },
  { name: "Expert Edge",       participants: 17  },
  { name: "Bootcamp",          participants: 14  },
];

const gradYearData = [
  { year: "2026", count: 105, pct: 10.3 },
  { year: "2027", count: 342, pct: 33.7 },
  { year: "2028", count: 361, pct: 35.6 },
  { year: "2029", count: 297, pct: 29.2 },
];

const initiatives = [
  {
    icon: Percent,
    accent: T.emerald,
    dim: T.emeraldDim,
    badge: "Tiered Discount",
    title: "Contingent Discount Program",
    conversion: 347,
    convLabel: "Passes Generated",
    description:
      "Group-based collegiate outreach. Representatives received certificates, accommodation assistance, and social media features to drive institutional adoption.",
    mechanicType: "table",
    tiers: [
      { range: "4 – 10 passes",  discount: "10% Off" },
      { range: "10 – 15 passes", discount: "15% Off" },
      { range: "15 – 25 passes", discount: "20% Off" },
      { range: "25+ passes",     discount: "30% Off" },
    ],
  },
  {
    icon: UserCheck,
    accent: T.violet,
    dim: T.violetDim,
    badge: "Affiliate Network",
    title: "Outreach Executive (OE) Network",
    conversion: 70,
    convLabel: "Passes Generated",
    description:
      "Decentralized student sales network. Top performers secured deep-tech startup internships and LoRs from E-Cell IITM.",
    mechanicType: "tags",
    tags: ["Sales Training", "Affiliate Tracking", "Free All-Access Pass"],
  },
  {
    icon: Megaphone,
    accent: T.cyan,
    dim: T.cyanDim,
    badge: "Creator Economy",
    title: "Influencers Conclave",
    conversion: 56,
    convLabel: "Passes Generated",
    description:
      "Creator economy partnerships. Leveraged targeted social media reels combined with custom follower coupon codes for high-conversion reach.",
    mechanicType: "tags",
    tags: ["Affiliate Codes", "High-Visibility Reels", "Creator Networks"],
  },
];

/* ─────────────────────────── GLASSMORPHISM CARD ────────────────────────── */
const Card = ({ children, className = "", style = {} }) => (
  <div
    className={`relative rounded-2xl overflow-hidden ${className}`}
    style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      ...style,
    }}
  >
    {children}
  </div>
);

const CardInner = ({ children, className = "" }) => (
  <div className={`p-5 flex flex-col gap-4 h-full ${className}`}>{children}</div>
);

/* ─────────────────────────── SECTION LABEL ─────────────────────────────── */
const SectionLabel = ({ icon: Icon, label, accent = T.emerald }) => (
  <div className="flex items-center gap-2.5 mb-1">
    <div className="p-1.5 rounded-lg" style={{ background: `${accent}18`, border: `1px solid ${accent}25` }}>
      <Icon size={13} style={{ color: accent }} />
    </div>
    <span style={{ color: T.muted, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
      {label}
    </span>
  </div>
);

/* ─────────────────────────── GLASS TOOLTIP ─────────────────────────────── */
const GlassTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(10,10,10,0.95)", border: `1px solid ${T.borderMid}`,
      backdropFilter: "blur(20px)", borderRadius: 12, padding: "10px 14px",
      boxShadow: "0 20px 48px rgba(0,0,0,0.7)", minWidth: 148,
    }}>
      {label && <p style={{ color: T.muted, fontSize: 11, fontWeight: 600, marginBottom: 7, borderBottom: `1px solid ${T.border}`, paddingBottom: 6 }}>{label}</p>}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-1.5">
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color || T.emerald, flexShrink: 0 }} />
            <span style={{ color: T.muted, fontSize: 11 }}>{p.name}</span>
          </div>
          <span style={{ color: T.text, fontSize: 12, fontWeight: 700 }}>
            {formatter ? formatter(p.value, p.name) : (typeof p.value === "number" ? p.value.toLocaleString("en-IN") : p.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

const PassTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: "rgba(10,10,10,0.95)", border: `1px solid ${T.borderMid}`,
      backdropFilter: "blur(20px)", borderRadius: 12, padding: "10px 14px",
      boxShadow: "0 20px 48px rgba(0,0,0,0.7)", minWidth: 190,
    }}>
      <p style={{ color: T.text, fontSize: 12, fontWeight: 700, marginBottom: 8, borderBottom: `1px solid ${T.border}`, paddingBottom: 8 }}>{d.name}</p>
      {[
        { label: "Passes",       val: d.value?.toLocaleString(),               color: T.cyan    },
        { label: "Revenue",      val: `₹${d.revenue?.toLocaleString("en-IN")}`, color: T.emerald },
        { label: "Price / pass", val: `₹${d.price?.toLocaleString("en-IN")}`,   color: T.amber   },
      ].map(r => (
        <div key={r.label} className="flex justify-between gap-4 mt-1.5">
          <span style={{ color: T.muted, fontSize: 11 }}>{r.label}</span>
          <span style={{ color: r.color, fontSize: 11, fontWeight: 700 }}>{r.val}</span>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────── KPI CARD ──────────────────────────────────── */
const KpiCard = ({ icon: Icon, label, value, delta, sub, accent, dim, delay }) => {
  const [up, setUp] = useState(false);
  useEffect(() => { const t = setTimeout(() => setUp(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <Card style={{ transition: "opacity 0.55s ease, transform 0.55s ease", opacity: up ? 1 : 0, transform: up ? "none" : "translateY(14px)" }}>
      <CardInner>
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-xl" style={{ background: dim, border: `1px solid ${accent}22` }}>
            <Icon size={15} style={{ color: accent }} />
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: T.emeraldDim, border: `1px solid ${T.emerald}25` }}>
            <ArrowUp size={10} style={{ color: T.emerald }} />
            <span style={{ color: T.emerald, fontSize: 11, fontWeight: 700 }}>{delta}</span>
          </div>
        </div>
        <div>
          <p style={{ color: T.muted, fontSize: 11, fontWeight: 500, letterSpacing: "0.08em" }}>{label}</p>
          <p style={{ color: T.text, fontSize: "1.42rem", fontWeight: 700, lineHeight: 1.15, marginTop: 4, letterSpacing: "-0.025em", fontVariantNumeric: "tabular-nums" }}>
            {value}
          </p>
        </div>
        <p style={{ color: T.subtle, fontSize: 11, borderTop: `1px solid ${T.border}`, paddingTop: 10, marginTop: "auto" }}>{sub}</p>
      </CardInner>
    </Card>
  );
};

/* ─────────────────────────── MINI BAR ──────────────────────────────────── */
const MiniBar = ({ value, max, color }) => (
  <div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
    <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 99 }} />
  </div>
);

/* ─────────────────────────── INITIATIVE CARD ───────────────────────────── */
const InitiativeCard = ({ icon: Icon, accent, dim, badge, title, conversion, convLabel, description, mechanicType, tiers, tags }, idx) => {
  const total = 347 + 70 + 56;
  const pct = Math.round((conversion / total) * 100);

  return (
    <Card key={title} style={{
      transition: `opacity 0.6s ease ${idx * 100}ms, transform 0.6s ease ${idx * 100}ms`,
    }}>
      {/* Top accent stripe */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, position: "absolute", top: 0, left: 0, right: 0 }} />

      <CardInner>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: dim, border: `1px solid ${accent}25` }}>
              <Icon size={16} style={{ color: accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 99, background: `${accent}12`, color: accent, border: `1px solid ${accent}22`, letterSpacing: "0.08em" }}>
                  {badge}
                </span>
              </div>
              <h3 style={{ color: T.text, fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                {title}
              </h3>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p style={{ color: accent, fontSize: "1.5rem", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>
              {conversion}
            </p>
            <p style={{ color: T.muted, fontSize: 10, marginTop: 2 }}>{convLabel}</p>
          </div>
        </div>

        {/* Conversion progress */}
        <div>
          <div className="flex justify-between mb-1.5">
            <span style={{ color: T.subtle, fontSize: 10.5 }}>Share of initiative conversions</span>
            <span style={{ color: accent, fontSize: 10.5, fontWeight: 700 }}>{pct}%</span>
          </div>
          <div style={{ width: "100%", height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${accent}, ${accent}88)`, borderRadius: 99 }} />
          </div>
        </div>

        {/* Description */}
        <p style={{ color: T.muted, fontSize: 12.5, lineHeight: 1.6 }}>{description}</p>

        {/* Mechanic */}
        <div>
          <p style={{ color: T.subtle, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
            Campaign Mechanics
          </p>

          {mechanicType === "table" && tiers && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {tiers.map(tier => (
                <div key={tier.range} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px", borderRadius: 8, background: `${accent}0a`, border: `1px solid ${accent}18` }}>
                  <span style={{ color: T.muted, fontSize: 11 }}>{tier.range}</span>
                  <span style={{ color: accent, fontSize: 11, fontWeight: 700 }}>{tier.discount}</span>
                </div>
              ))}
            </div>
          )}

          {mechanicType === "tags" && tags && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {tags.map(tag => (
                <div key={tag} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 99, background: `${accent}0e`, border: `1px solid ${accent}20` }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                  <span style={{ color: accent, fontSize: 11, fontWeight: 500 }}>{tag}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardInner>
    </Card>
  );
};

/* ─────────────────────────── AXIS + GRID SHARED PROPS ──────────────────── */
const axisStyle = { fill: T.muted, fontSize: 11, fontFamily: "inherit" };
const gridProps = { stroke: "rgba(255,255,255,0.04)", strokeOpacity: 1, vertical: false };

/* ─────────────────────────── MAIN COMPONENT ────────────────────────────── */
export default function ESummitDashboard() {
  const [pulse, setPulse] = useState(true);
  useEffect(() => { const id = setInterval(() => setPulse(p => !p), 1000); return () => clearInterval(id); }, []);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text, fontFamily: "'Inter','SF Pro Display',-apple-system,sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 20px 56px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", paddingBottom: 22, borderBottom: `1px solid ${T.border}` }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
              <Zap size={13} style={{ color: T.emerald }} fill={T.emerald} />
              <span style={{ color: T.emerald, fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>E-Cell IIT Madras</span>
            </div>
            <h1 style={{ fontSize: "clamp(1.4rem,2.4vw,1.95rem)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              E-Summit '26{" "}
              <span style={{ background: "linear-gradient(120deg, #22d3ee 0%, #818cf8 55%, #10b981 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Sales Command Center
              </span>
            </h1>
            <p style={{ color: T.muted, fontSize: 13, marginTop: 7 }}>Final performance report · E-Summit 2026 vs 2025</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 99, background: T.emeraldDim, border: `1px solid ${T.emerald}30`, flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.emerald, opacity: pulse ? 1 : 0.12, boxShadow: pulse ? `0 0 7px ${T.emerald}` : "none", transition: "opacity 0.4s, box-shadow 0.4s" }} />
            <span style={{ color: T.emerald, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em" }}>Live Status: Active</span>
          </div>
        </div>

        {/* ── KPIs ───────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }} className="kpi-grid">
          {kpis.map((k, i) => <KpiCard key={k.label} {...k} delay={i * 70} />)}
        </div>

        {/* ── AUDIENCE + PASS DONUT ──────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Card>
            <CardInner>
              <SectionLabel icon={Activity} label="Audience Evolution 2025 → 2026" accent={T.cyan} />
              <p style={{ color: T.subtle, fontSize: 12, marginTop: -8 }}>Composition shift — student-first strategy validated</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={audienceData} barCategoryGap="40%" barGap={4}>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="year" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={32} />
                  <Tooltip content={<GlassTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                  <Legend wrapperStyle={{ fontSize: 11, color: T.muted, paddingTop: 8 }} />
                  <Bar dataKey="Students"      fill={T.cyan}   radius={[4,4,0,0]} maxBarSize={52} />
                  <Bar dataKey="Professionals" fill={T.violet} radius={[4,4,0,0]} maxBarSize={52} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { val: "+160%",  lbl: "Student YoY",       accent: T.emerald },
                  { val: "−31.8%", lbl: "Professional Shift", accent: T.rose    },
                ].map(d => (
                  <div key={d.lbl} style={{ background: `${d.accent}0d`, border: `1px solid ${d.accent}18`, borderRadius: 12, padding: "10px 14px" }}>
                    <p style={{ color: d.accent, fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{d.val}</p>
                    <p style={{ color: T.muted, fontSize: 11, marginTop: 2 }}>{d.lbl}</p>
                  </div>
                ))}
              </div>
            </CardInner>
          </Card>

          <Card>
            <CardInner>
              <SectionLabel icon={BarChart2} label="Pass Revenue Breakdown" accent={T.violet} />
              <p style={{ color: T.subtle, fontSize: 12, marginTop: -8 }}>Hover each slice for pricing detail</p>
              <div style={{ display: "flex", gap: 16, alignItems: "center", flex: 1 }}>
                <div style={{ flexShrink: 0 }}>
                  <ResponsiveContainer width={165} height={165}>
                    <PieChart>
                      <Pie data={passData} cx="50%" cy="50%" innerRadius={46} outerRadius={76} paddingAngle={2} dataKey="value" stroke="none">
                        {passData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<PassTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
                  {passData.map((d, i) => (
                    <div key={d.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: PIE_COLORS[i % PIE_COLORS.length], flexShrink: 0 }} />
                          <span style={{ color: T.muted, fontSize: 10.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 108 }}>{d.name}</span>
                        </div>
                        <span style={{ color: T.text, fontSize: 11, fontWeight: 600, flexShrink: 0, marginLeft: 4 }}>{d.value}</span>
                      </div>
                      <MiniBar value={d.value} max={1021} color={PIE_COLORS[i % PIE_COLORS.length]} />
                    </div>
                  ))}
                </div>
              </div>
            </CardInner>
          </Card>
        </div>

        {/* ── REVENUE SPLIT + YOY ────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 12 }}>
          <Card>
            <CardInner>
              <SectionLabel icon={IndianRupee} label="Revenue Split 2026" accent={T.emerald} />
              <p style={{ color: T.subtle, fontSize: 12, marginTop: -8 }}>₹21,24,348 across three streams</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1, justifyContent: "center" }}>
                {revenueSplitData.map(d => (
                  <div key={d.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
                        <span style={{ color: T.muted, fontSize: 12 }}>{d.name}</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ color: T.text, fontSize: 12, fontWeight: 600 }}>₹{(d.value / 100000).toFixed(2)}L</span>
                        <span style={{ color: T.subtle, fontSize: 10, marginLeft: 6 }}>{d.pct}%</span>
                      </div>
                    </div>
                    <div style={{ width: "100%", height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ width: `${d.pct * (100 / 45.1)}%`, height: "100%", background: d.color, borderRadius: 99 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: T.muted, fontSize: 12 }}>Total Revenue</span>
                <span style={{ color: T.text, fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em" }}>₹21,24,348</span>
              </div>
            </CardInner>
          </Card>

          <Card>
            <CardInner>
              <SectionLabel icon={TrendingUp} label="YoY Revenue Comparison — 2025 vs 2026" accent={T.cyan} />
              <p style={{ color: T.subtle, fontSize: 12, marginTop: -8 }}>Total inflow in Lakhs (₹L) — stacked by stream</p>
              <ResponsiveContainer width="100%" height={215}>
                <BarChart data={yoyRevenueData} barCategoryGap="40%">
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="year" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={28} tickFormatter={v => `${v}L`} />
                  <Tooltip content={<GlassTooltip formatter={(v) => `₹${Number(v).toFixed(2)}L`} />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                  <Legend wrapperStyle={{ fontSize: 11, color: T.muted, paddingTop: 8 }} />
                  <Bar dataKey="Passes"        stackId="a" fill={T.emerald} radius={[0,0,0,0]} maxBarSize={68} />
                  <Bar dataKey="Accommodation" stackId="a" fill={T.violet}  radius={[0,0,0,0]} maxBarSize={68} />
                  <Bar dataKey="Combos"        stackId="a" fill={T.cyan}    radius={[4,4,0,0]} maxBarSize={68} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { val: "+65.9%", lbl: "Total Inflow",     accent: T.emerald },
                  { val: "+40.4%", lbl: "Pass Revenue",     accent: T.cyan    },
                  { val: "₹4.95L", lbl: "New: Combo Deals", accent: T.violet  },
                ].map(d => (
                  <div key={d.lbl} style={{ background: `${d.accent}0d`, border: `1px solid ${d.accent}18`, borderRadius: 12, padding: "9px 12px", textAlign: "center" }}>
                    <p style={{ color: d.accent, fontSize: "0.95rem", fontWeight: 700 }}>{d.val}</p>
                    <p style={{ color: T.subtle, fontSize: 10, marginTop: 2 }}>{d.lbl}</p>
                  </div>
                ))}
              </div>
            </CardInner>
          </Card>
        </div>

        {/* ── GROWTH INITIATIVES ─────────────────────────────────── */}
        <div>
          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 3, height: 14, borderRadius: 99, background: `linear-gradient(180deg, ${T.emerald}, ${T.cyan})` }} />
                <span style={{ color: T.muted, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Performance Analytics
                </span>
              </div>
              <h2 style={{ color: T.text, fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-0.025em" }}>
                Growth Initiatives &{" "}
                <span style={{ background: `linear-gradient(90deg, ${T.emerald}, ${T.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Campaign ROI
                </span>
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 99, border: `1px solid ${T.border}` }}>
              <Sparkles size={11} style={{ color: T.muted }} />
              <span style={{ color: T.muted, fontSize: 11 }}>473 passes from initiatives</span>
            </div>
          </div>

          {/* Aggregate metrics strip */}
          <Card style={{ marginBottom: 12 }}>
            <div style={{ padding: "14px 20px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0 }}>
              {[
                { label: "Total Initiative Conversions", value: "473",    sub: "Contingent + OE + Influencers",    accent: T.emerald },
                { label: "% of Total Passes",            value: "35.6%",  sub: "1,328 passes total",               accent: T.cyan    },
                { label: "Top Performing Channel",       value: "Contingent", sub: "347 passes · 73.4% share",     accent: T.violet  },
              ].map((m, i) => (
                <div key={m.label} style={{ padding: "0 20px", borderLeft: i > 0 ? `1px solid ${T.border}` : "none" }}>
                  <p style={{ color: T.muted, fontSize: 11, marginBottom: 4 }}>{m.label}</p>
                  <p style={{ color: m.accent, fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.025em" }}>{m.value}</p>
                  <p style={{ color: T.subtle, fontSize: 10.5, marginTop: 3 }}>{m.sub}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Three initiative cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }} className="init-grid">
            {initiatives.map((init, idx) => InitiativeCard(init, idx))}
          </div>
        </div>

        {/* ── HEATMAP + COLLEGES ─────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Card>
            <CardInner>
              <SectionLabel icon={MapPin} label="Top 10 Performing Cities" accent={T.emerald} />
              <p style={{ color: T.subtle, fontSize: 12, marginTop: -8 }}>Pass distribution by city — Chennai leads with a dominant 556 passes</p>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={topCitiesData} layout="vertical" barCategoryGap="20%" margin={{ top: 0, right: 24, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cityBarGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor={T.emerald} stopOpacity={1}   />
                      <stop offset="100%" stopColor={T.cyan}    stopOpacity={0.75} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    type="number"
                    tick={axisStyle}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => v === 0 ? "" : v}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={96}
                    tick={{ ...axisStyle, fontSize: 11.5, fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<GlassTooltip formatter={(v) => `${v} passes`} />}
                    cursor={{ fill: "rgba(255,255,255,0.025)" }}
                  />
                  <Bar dataKey="passes" fill="url(#cityBarGrad)" radius={[0, 5, 5, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </CardInner>
          </Card>

          <Card>
            <CardInner>
              <SectionLabel icon={GraduationCap} label="Top 10 External Colleges" accent={T.amber} />
              <p style={{ color: T.subtle, fontSize: 12, marginTop: -8 }}>Pass volume by institution — outreach penetration</p>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={collegeData} layout="vertical" barCategoryGap="18%">
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeOpacity={1} horizontal={false} vertical={false} />
                  <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} domain={[0, 48]} />
                  <YAxis type="category" dataKey="name" width={132} tick={{ ...axisStyle, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<GlassTooltip formatter={(v) => `${v} passes`} />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                  <Bar dataKey="passes" radius={[0,4,4,0]} maxBarSize={16}>
                    {collegeData.map((_, i) => (
                      <Cell key={i} fill={i < 2 ? T.amber : i < 5 ? `rgba(245,158,11,${0.65 - i * 0.05})` : "rgba(245,158,11,0.32)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardInner>
          </Card>
        </div>

        {/* ── ACCOMMODATION + GRAD YEAR ───────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 12 }}>
          <Card>
            <CardInner>
              <SectionLabel icon={BedDouble} label="Accommodation — 2026" accent={T.violet} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flex: 1 }}>
                {[
                  { label: "Price / Slot",  value: "₹2,699", sub: "per person",     accent: T.cyan    },
                  { label: "Total Booked",  value: "388",     sub: "+29.3% vs 2025", accent: T.emerald },
                  { label: "Male Slots",    value: "278",     sub: "71.6% of total", accent: T.violet  },
                  { label: "Female Slots",  value: "110",     sub: "28.4% of total", accent: T.amber   },
                ].map(s => (
                  <div key={s.label} style={{ background: `${s.accent}0a`, border: `1px solid ${s.accent}18`, borderRadius: 14, padding: "14px 16px" }}>
                    <p style={{ color: s.accent, fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{s.value}</p>
                    <p style={{ color: T.muted, fontSize: 11, fontWeight: 500, marginTop: 4 }}>{s.label}</p>
                    <p style={{ color: T.subtle, fontSize: 10, marginTop: 2 }}>{s.sub}</p>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: T.muted, fontSize: 11 }}>Gender distribution</span>
                  <span style={{ color: T.subtle, fontSize: 11 }}>278M · 110F</span>
                </div>
                <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden", display: "flex" }}>
                  <div style={{ width: `${(278/388)*100}%`, height: "100%", background: `linear-gradient(90deg, ${T.violet}, ${T.cyan})`, borderRadius: "99px 0 0 99px" }} />
                  <div style={{ flex: 1, height: "100%", background: T.amber, borderRadius: "0 99px 99px 0", opacity: 0.7 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                  <span style={{ color: T.subtle, fontSize: 10 }}>Male 71.6%</span>
                  <span style={{ color: T.subtle, fontSize: 10 }}>Female 28.4%</span>
                </div>
              </div>
            </CardInner>
          </Card>

          <Card>
            <CardInner>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                <div>
                  <SectionLabel icon={Users} label="Target Persona — Graduation Year" accent={T.cyan} />
                  <p style={{ color: T.subtle, fontSize: 12, marginTop: -8 }}>2027–28 cohort = 69.3% of student audience</p>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  {[{y:"2027",p:"33.7%"},{y:"2028",p:"35.6%"}].map(d => (
                    <span key={d.y} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 99, fontWeight: 700, background: T.cyanDim, color: T.cyan, border: `1px solid ${T.cyan}25` }}>
                      {d.y}: {d.p}
                    </span>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={gradYearData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor={T.cyan} stopOpacity={0.22} />
                      <stop offset="100%" stopColor={T.cyan} stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="year" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={28} />
                  <Tooltip content={<GlassTooltip formatter={(v) => `${v} students`} />} cursor={{ stroke: T.cyan, strokeWidth: 1, strokeDasharray: "4 3" }} />
                  <Area type="monotone" dataKey="count" stroke={T.cyan} strokeWidth={2} fill="url(#cyanGrad)"
                    dot={{ fill: T.cyan, strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: T.text, stroke: T.cyan, strokeWidth: 2 }} name="Students" />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {gradYearData.map(d => (
                  <div key={d.year} style={{ background: d.count >= 340 ? T.cyanDim : "rgba(255,255,255,0.02)", border: `1px solid ${d.count >= 340 ? T.cyan + "28" : T.border}`, borderRadius: 12, padding: 10, textAlign: "center" }}>
                    <p style={{ color: d.count >= 340 ? T.cyan : T.muted, fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{d.count}</p>
                    <p style={{ color: T.subtle, fontSize: 10, marginTop: 2 }}>Grad {d.year}</p>
                    {d.count >= 340 && <p style={{ color: T.cyan, fontSize: 9, fontWeight: 700, marginTop: 3, letterSpacing: "0.08em" }}>PEAK</p>}
                  </div>
                ))}
              </div>
            </CardInner>
          </Card>
        </div>

        {/* ── POPULAR EVENTS ─────────────────────────────────────── */}
        <Card>
          <CardInner>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <SectionLabel icon={Award} label="Popular Events — Participation Breakdown" accent={T.rose} />
                <p style={{ color: T.subtle, fontSize: 12, marginTop: -8 }}>Event-wise attendee count across all E-Summit '26 activities</p>
              </div>
              <div style={{ display: "flex", items: "center", gap: 8, flexShrink: 0 }}>
                {[
                  { val: "16",  lbl: "Events",       accent: T.rose  },
                  { val: "248", lbl: "Peak (Ethletics)", accent: T.amber },
                  { val: "1,390", lbl: "Total Slots", accent: T.muted },
                ].map(m => (
                  <div key={m.lbl} style={{ padding: "5px 12px", borderRadius: 8, background: `${m.accent}0d`, border: `1px solid ${m.accent}18`, textAlign: "center" }}>
                    <p style={{ color: m.accent === T.muted ? T.text : m.accent, fontSize: "0.92rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{m.val}</p>
                    <p style={{ color: T.subtle, fontSize: 9.5, marginTop: 1, whiteSpace: "nowrap" }}>{m.lbl}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20, alignItems: "start" }}>
              {/* Left — horizontal bar chart for top 8 */}
              <div>
                <p style={{ color: T.subtle, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Top Events by Participation</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={eventData.slice(0, 8)}
                    layout="vertical"
                    barCategoryGap="22%"
                    margin={{ top: 0, right: 28, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="eventBarGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%"   stopColor={T.rose}  stopOpacity={1}    />
                        <stop offset="100%" stopColor={T.amber} stopOpacity={0.75} />
                      </linearGradient>
                    </defs>
                    <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => v === 0 ? "" : v} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={120}
                      tick={{ ...axisStyle, fontSize: 11.5, fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<GlassTooltip formatter={(v) => `${v} participants`} />}
                      cursor={{ fill: "rgba(255,255,255,0.025)" }}
                    />
                    <Bar dataKey="participants" fill="url(#eventBarGrad)" radius={[0, 5, 5, 0]} maxBarSize={20} name="Participants" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Right — ranked list for remaining 8 events */}
              <div>
                <p style={{ color: T.subtle, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>All Other Events</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {eventData.slice(8).map((ev, i) => {
                    const pct = (ev.participants / 248) * 100;
                    return (
                      <div key={ev.name}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <span style={{ color: T.subtle, fontSize: 10, fontVariantNumeric: "tabular-nums", minWidth: 14, textAlign: "right" }}>
                              {i + 9}
                            </span>
                            <span style={{ color: T.muted, fontSize: 11.5 }}>{ev.name}</span>
                          </div>
                          <span style={{ color: T.text, fontSize: 11.5, fontWeight: 600 }}>{ev.participants}</span>
                        </div>
                        <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{
                            width: `${pct}%`,
                            height: "100%",
                            borderRadius: 99,
                            background: `rgba(251,113,133,${0.25 + (pct / 100) * 0.45})`,
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardInner>
        </Card>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 18, borderTop: `1px solid ${T.border}`, fontSize: 11, color: T.subtle }}>
          <span>E-Cell IIT Madras · E-Summit 2026 · Sales & Demographics Report</span>
          <span>SRO Core Application</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px)  { .kpi-grid  { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 720px)  { .init-grid { grid-template-columns: 1fr !important; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 99px; }
      `}</style>
    </div>
  );
}