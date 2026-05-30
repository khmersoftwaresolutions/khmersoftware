'use client';

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTransition } from '@/hooks/usePageTransition';

const COLORS = {
  navy: "#050545",
  blue: "#0E62A2",
  cyan: "#0ABADF",
  green: "#51B41C",
  yellow: "#EDEC3A",
};

function AnimatedCounter({ value, suffix = "" }: { value: string | number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const n = parseInt(String(value));
    const duration = 1500;
    const step = Math.ceil(n / (duration / 16));
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + step, n);
      setCount(cur);
      if (cur >= n) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [started, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePageContent() {
  const { t, language } = useLanguage();

  // Initialize page transitions
  usePageTransition();

  const services = [
    {
      icon: "💼",
      title: t('home.services.softwareSales.title'),
      desc: t('home.services.softwareSales.desc'),
      color: COLORS.cyan,
      bg: "rgba(10,186,223,0.1)",
      linkColor: COLORS.cyan,
      key: "sales",
    },
    {
      icon: "⚡",
      title: t('home.services.softwareRental.title'),
      desc: t('home.services.softwareRental.desc'),
      color: COLORS.green,
      bg: "rgba(81,180,28,0.1)",
      linkColor: COLORS.green,
      key: "rental",
    },
    {
      icon: "🔧",
      title: t('home.services.customDevelopment.title'),
      desc: t('home.services.customDevelopment.desc'),
      color: COLORS.yellow,
      bg: "rgba(237,236,58,0.1)",
      linkColor: COLORS.yellow,
      key: "dev",
    },
    {
      icon: "☁️",
      title: t('home.services.cloudInfrastructure.title'),
      desc: t('home.services.cloudInfrastructure.desc'),
      color: COLORS.blue,
      bg: "rgba(14,98,162,0.12)",
      linkColor: "#5BB8FF",
      key: "cloud",
    },
    {
      icon: "🛡️",
      title: t('home.services.cybersecurity.title'),
      desc: t('home.services.cybersecurity.desc'),
      color: "#A855F7",
      bg: "rgba(168,85,247,0.1)",
      linkColor: "#C084FC",
      key: "security",
    },
    {
      icon: "🎓",
      title: t('home.services.trainingSupport.title'),
      desc: t('home.services.trainingSupport.desc'),
      color: COLORS.yellow,
      bg: "rgba(237,236,58,0.08)",
      linkColor: COLORS.yellow,
      key: "training",
    },
  ];

  const testimonials = [
    {
      text: t('home.testimonials.testimonial1.text'),
      name: t('home.testimonials.testimonial1.name'),
      role: t('home.testimonials.testimonial1.role'),
      photo: t('home.testimonials.testimonial1.photo'),
      color: COLORS.cyan,
    },
    {
      text: t('home.testimonials.testimonial2.text'),
      name: t('home.testimonials.testimonial2.name'),
      role: t('home.testimonials.testimonial2.role'),
      photo: t('home.testimonials.testimonial2.photo'),
      color: COLORS.green,
    },
    {
      text: t('home.testimonials.testimonial3.text'),
      name: t('home.testimonials.testimonial3.name'),
      role: t('home.testimonials.testimonial3.role'),
      photo: t('home.testimonials.testimonial3.photo'),
      color: COLORS.yellow,
    },
    {
      text: t('home.testimonials.testimonial4.text'),
      name: t('home.testimonials.testimonial4.name'),
      role: t('home.testimonials.testimonial4.role'),
      photo: t('home.testimonials.testimonial4.photo'),
      color: COLORS.blue,
    },
  ];

  return (
    <>
      {/* Background */}
      <div className="starfield" />

      {/* Orbs */}
      <div className="orb" style={{ width: "min(500px, 80vw)", height: "min(500px, 80vw)", background: COLORS.blue, top: "5%", left: "0%", animation: "pulse-glow 8s ease-in-out infinite" }} />
      <div className="orb" style={{ width: "min(400px, 70vw)", height: "min(400px, 70vw)", background: COLORS.cyan, top: "20%", right: "0%", animation: "pulse-glow 10s ease-in-out 2s infinite" }} />
      <div className="orb" style={{ width: "min(300px, 60vw)", height: "min(300px, 60vw)", background: COLORS.green, bottom: "30%", left: "40%", animation: "pulse-glow 12s ease-in-out 4s infinite" }} />

      {/* ── HERO ────────────────────────────── */}
      <section className="hero section" style={{ overflowX: "hidden" }}>
        {/* Rotating ring decoration */}
        <div style={{ position: "absolute", width: "min(700px, 90vw)", height: "min(700px, 90vw)", borderRadius: "50%", border: "1px solid rgba(10,186,223,0.07)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "rotate-slow 60s linear infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "min(500px, 70vw)", height: "min(500px, 70vw)", borderRadius: "50%", border: "1px dashed rgba(237,236,58,0.06)", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(30deg)", animation: "rotate-slow 40s linear reverse infinite", pointerEvents: "none" }} />

        <div className="hero-badge">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.cyan, display: "inline-block", boxShadow: `0 0 8px ${COLORS.cyan}` }} />
          {t('home.badge')}
        </div>

        <h1>
          <span className="grad-cyan">{t('home.hero.title1')}</span><br />
          {t('home.hero.title2')} <span className="grad-yellow">{t('home.hero.title3')}</span>
        </h1>

        <p>
          {t('home.hero.subtitle')}
        </p>

        <div className="hero-cta">
          <a href={`/${language}/services`} className="btn-primary">
            {t('home.hero.exploreServices')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href={`/${language}/contact`} className="btn-outline">
            {t('home.hero.bookDemo')}
          </a>
        </div>

        {/* Floating screen mockup */}
        <div className="float-anim" style={{ marginTop: 64, width: "100%", maxWidth: "min(760px, 95vw)", position: "relative" }}>
          <div className="glass-bright" style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ background: "rgba(5,5,69,0.6)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["#FF6058", "#FFBD2E", "#28C840"].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
              ))}
              <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "4px 12px", fontSize: 11, color: "rgba(255,255,255,0.4)", maxWidth: 200, margin: "0 auto" }}>
                app.khmersoftware.com
              </div>
            </div>
            <div style={{ padding: "clamp(16px, 4vw, 28px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(120px, 100%), 1fr))", gap: 16 }}>
              {[
                { label: "Active Users", val: "12,847", color: COLORS.cyan, up: "+18%" },
                { label: "Revenue", val: "$94.2K", color: COLORS.green, up: "+32%" },
                { label: "Uptime", val: "99.97%", color: COLORS.yellow, up: "Excellent" },
              ].map((m, i) => (
                <div key={i} className="glass-card" style={{ padding: "clamp(12px, 3vw, 18px)" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>{m.label}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>{m.val}</div>
                  <div style={{ fontSize: 11, color: m.color, marginTop: 4, fontWeight: 600 }}>{m.up}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "0 clamp(16px, 4vw, 28px) clamp(16px, 4vw, 24px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))", gap: 16 }}>
              <div className="glass-card" style={{ padding: "clamp(12px, 3vw, 18px)", height: 120, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Performance trend</div>
                <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={COLORS.cyan} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,50 C20,45 30,20 50,25 C70,30 80,10 100,15 C120,20 130,5 160,8 C180,10 190,6 200,4" stroke={COLORS.cyan} strokeWidth="2" fill="none" />
                  <path d="M0,50 C20,45 30,20 50,25 C70,30 80,10 100,15 C120,20 130,5 160,8 C180,10 190,6 200,4 L200,60 L0,60 Z" fill="url(#lineGrad)" />
                </svg>
              </div>
              <div className="glass-card" style={{ padding: "clamp(12px, 3vw, 18px)", height: 120, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Services</div>
                {[["Cloud", 80, COLORS.cyan], ["Dev", 62, COLORS.green], ["Support", 91, COLORS.yellow]].map(([l, w, c]) => (
                  <div key={String(l)}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 3, color: "rgba(255,255,255,0.5)" }}>
                      <span>{l}</span><span>{w}%</span>
                    </div>
                    <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                      <div style={{ width: `${w}%`, height: "100%", borderRadius: 2, background: String(c) }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Reflection shine */}
          <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "50%", background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)", borderRadius: "24px 24px 0 0", pointerEvents: "none" }} />
        </div>
      </section>

      {/* ── STATS ───────────────────────────── */}
      <section className="section" style={{ padding: "0 clamp(16px, 4vw, 40px) 80px" }}>
        <div className="container">
          <FadeInSection>
            <div className="stats-strip">
              {[
                { val: 50, suffix: "+", label: t('home.stats.projectsDelivered'), color: COLORS.cyan },
                { val: 5, suffix: "+ yrs", label: t('home.stats.yearsInCambodia'), color: COLORS.green },
                { val: 99, suffix: ".9%", label: t('home.stats.platformUptime'), color: COLORS.yellow },
                { val: 24, suffix: "/7", label: t('home.stats.supportCoverage'), color: COLORS.blue },
              ].map((s, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-num" style={{ color: s.color }}>
                    <AnimatedCounter value={s.val} suffix={s.suffix} />
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────── */}
      <section className="section" style={{ padding: "80px clamp(16px, 4vw, 40px)" }}>
        <div className="container">
          <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="section-label">{t('home.services.sectionLabel')}</div>
              <h2 className="section-title">{t('home.services.title')} <span className="grad-cyan">{t('home.services.titleHighlight')}</span></h2>
              <div className="h-line" style={{ margin: "16px auto 0" }} />
            </div>
          </FadeInSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 24 }}>
            {services.map((s, i) => (
              <FadeInSection key={s.key} delay={i * 80}>
                <div className="glass-card" style={{ padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 28px)", position: "relative", overflow: "hidden" }}>
                  <div className="glow-top" style={{ background: `linear-gradient(90deg, transparent, ${s.color}60, transparent)` }} />
                  <div className="service-icon-wrap" style={{ background: s.bg, border: `1px solid ${s.color}30` }}>
                    <span style={{ fontSize: "clamp(20px, 5vw, 24px)" }}>{s.icon}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px, 4vw, 20px)", fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(13px, 3vw, 14px)", lineHeight: 1.7 }}>{s.desc}</p>
                  <a href={`/${language}/services`} className="learn-link" style={{ color: s.linkColor }}>
                    {t('home.services.learnMore')} <span>→</span>
                  </a>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE HIGHLIGHT ───────────────── */}
      <section className="section" style={{ padding: "80px clamp(16px, 4vw, 40px)" }}>
        <div className="container">
          <FadeInSection>
            <div className="feature-row">
              {/* Text side */}
              <div>
                <div className="feature-pill" style={{ background: "rgba(10,186,223,0.1)", color: COLORS.cyan, border: `1px solid ${COLORS.cyan}30` }}>
                  ✦ {t('home.features.cloudNative.title')}
                </div>
                <h2 className="section-title">{t('home.features.cloudNative.mainTitle')} <span className="grad-cyan">{t('home.features.cloudNative.titleHighlight')}</span></h2>
                <div className="h-line" />
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                  {t('home.features.cloudNative.description')}
                </p>
                <ul className="check-list">
                  {[
                    t('home.features.cloudNative.features.autoScaling'),
                    t('home.features.cloudNative.features.localDataCenters'),
                    t('home.features.cloudNative.features.soc2Compliant'),
                    t('home.features.cloudNative.features.stagingEnvironments'),
                  ].map((item, i) => (
                    <li key={i}>
                      <div className="check-icon" style={{ background: "rgba(81,180,28,0.15)", color: COLORS.green }}>✓</div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={`/${language}/services`} className="btn-primary" style={{ marginTop: 32, display: "inline-flex" }}>
                  {t('home.features.cloudNative.viewCloudServices')} →
                </a>
              </div>

              {/* Visual side */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="tech-visual float-anim-slow" style={{
                  width: "100%",
                  maxWidth: "min(400px, 100%)",
                  height: "clamp(250px, 50vw, 300px)",
                  position: "relative"
                }}>
                  {/* Rings */}
                  {[90, 70, 50].map((size, i) => (
                    <div key={i} className="tech-ring" style={{ width: `${size}%`, height: `${size}%`, top: `${(100 - size) / 2}%`, left: `${(100 - size) / 2}%`, borderColor: i === 0 ? "rgba(10,186,223,0.15)" : i === 1 ? "rgba(237,236,58,0.1)" : "rgba(81,180,28,0.1)" }} />
                  ))}
                  {/* Nodes */}
                  {[
                    { top: "5%", left: "50%", color: COLORS.cyan },
                    { top: "50%", left: "90%", color: COLORS.yellow },
                    { top: "95%", left: "50%", color: COLORS.green },
                    { top: "50%", left: "10%", color: COLORS.blue },
                    { top: "20%", left: "75%", color: COLORS.cyan },
                    { top: "80%", left: "25%", color: COLORS.yellow },
                  ].map((n, i) => (
                    <div key={i} className="tech-node" style={{ top: n.top, left: n.left, background: n.color, boxShadow: `0 0 10px ${n.color}, 0 0 20px ${n.color}80` }} />
                  ))}
                  {/* Center */}
                  <div className="tech-center-card glass-bright" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.yellow})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>99.9%</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center" }}>Uptime SLA</div>
                    <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.blue})`, borderRadius: 1 }} />
                    <div style={{ fontSize: 11, color: COLORS.green, fontWeight: 600 }}>● Live</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Second feature row */}
          <FadeInSection delay={100}>
            <div className="feature-row reverse" style={{ marginTop: 100 }}>
              {/* Visual */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { title: "Requirement Analysis", desc: "Deep-dive discovery with your team", icon: "🔍", color: COLORS.cyan, pct: 100 },
                  { title: "Prototype & Design", desc: "Wireframes validated in 2 weeks", icon: "🎨", color: COLORS.yellow, pct: 80 },
                  { title: "Agile Development", desc: "2-week sprints with live demos", icon: "⚙️", color: COLORS.green, pct: 90 },
                  { title: "Deploy & Support", desc: "Seamless go-live + 12-mo warranty", icon: "🚀", color: COLORS.blue, pct: 95 },
                ].map((step, i) => (
                  <div key={i} className="glass-card" style={{ padding: "clamp(14px, 3vw, 20px)", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: "clamp(36px, 5vw, 44px)", height: "clamp(36px, 5vw, 44px)", borderRadius: 12, background: `${step.color}15`, border: `1px solid ${step.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(16px, 4vw, 20px)", flexShrink: 0 }}>
                      {step.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: "clamp(12px, 3vw, 14px)", marginBottom: 4 }}>{step.title}</div>
                      <div style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "rgba(255,255,255,0.5)" }}>{step.desc}</div>
                    </div>
                    <div style={{ fontSize: "clamp(12px, 3vw, 13px)", fontWeight: 700, color: step.color }}>{step.pct}%</div>
                  </div>
                ))}
              </div>

              {/* Text */}
              <div>
                <div className="feature-pill" style={{ background: "rgba(237,236,58,0.1)", color: COLORS.yellow, border: `1px solid ${COLORS.yellow}30` }}>
                  ✦ {t('home.features.developmentProcess.title')}
                </div>
                <h2 className="section-title">{t('home.features.developmentProcess.mainTitle')} <span className="grad-yellow">{t('home.features.developmentProcess.titleHighlight')}</span></h2>
                <div className="h-line" style={{ background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.green})` }} />
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                  {t('home.features.developmentProcess.description')}
                </p>
                <ul className="check-list">
                  {[
                    t('home.features.developmentProcess.features.weekDelivery'),
                    t('home.features.developmentProcess.features.documentation'),
                    t('home.features.developmentProcess.features.warranty'),
                  ].map((item, i) => (
                    <li key={i}>
                      <div className="check-icon" style={{ background: "rgba(237,236,58,0.15)", color: COLORS.yellow }}>✓</div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={`/${language}/contact`} className="btn-primary" style={{ marginTop: 32, display: "inline-flex", background: `linear-gradient(135deg, ${COLORS.yellow}, ${COLORS.green})` }}>
                  {t('home.features.developmentProcess.startProject')} →
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────── */}
      <section className="section" style={{ padding: "80px clamp(16px, 4vw, 40px)" }}>
        <div className="container">
          <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="section-label">{t('home.testimonials.sectionLabel')}</div>
              <h2 className="section-title">{t('home.testimonials.title')} <span className="grad-green">{t('home.testimonials.titleHighlight')}</span></h2>
              <div className="h-line" style={{ margin: "16px auto 0", background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.cyan})` }} />
            </div>
          </FadeInSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 24 }}>
            {testimonials.map((testimonial, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="glass-card testimonial-card" style={{ padding: 0, position: "relative", overflow: "hidden" }}>
                  <div className="glow-top" style={{ background: `linear-gradient(90deg, transparent, ${testimonial.color}50, transparent)` }} />
                  {/* Photo with overlay */}
                  <div style={{ position: "relative", width: "100%", height: "280px" }}>
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(5,5,69,0.95) 0%, rgba(5,5,69,0.7) 50%, transparent 100%)",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>{testimonial.name}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{testimonial.role}</div>
                    </div>
                  </div>
                  {/* Description below */}
                  <div style={{ padding: "20px" }}>
                    <div className="stars" style={{ marginBottom: 12 }}>★★★★★</div>
                    <p className="quote" style={{ fontSize: 14, lineHeight: 1.6 }}>"{testimonial.text}"</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────── */}
      <section className="section" style={{ padding: "40px clamp(16px, 4vw, 40px) 100px" }}>
        <div className="container">
          <FadeInSection>
            <div className="cta-glass" style={{ position: "relative", overflow: "hidden" }}>
              {/* Decorative orb inside */}
              <div style={{ position: "absolute", width: "min(400px, 50vw)", height: "min(400px, 50vw)", borderRadius: "50%", background: COLORS.cyan, filter: "blur(100px)", opacity: 0.08, top: "-100px", right: "0%", pointerEvents: "none" }} />
              <div style={{ position: "absolute", width: "min(300px, 40vw)", height: "min(300px, 40vw)", borderRadius: "50%", background: COLORS.yellow, filter: "blur(80px)", opacity: 0.06, bottom: "-80px", left: "10%", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 2, padding: "20px" }}>
                <div className="section-label" style={{ marginBottom: 8, fontSize: 12 }}>{t('home.cta.sectionLabel')}</div>
                <h2 className="section-title" style={{ marginBottom: 12, fontSize: "clamp(28px, 4vw, 42px)" }}>
                  {t('home.cta.title')} <span className="grad-cyan">{t('home.cta.titleHighlight')}</span><br />{t('home.cta.title2')}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.6, maxWidth: 520, margin: "0 auto 32px", textAlign: "center" }}>
                  {t('home.cta.description')}
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
                  <a href={`/${language}/contact`} className="btn-primary" style={{ fontSize: 15, padding: "14px 32px", minWidth: "160px" }}>
                    {t('home.cta.bookConsultation')} →
                  </a>
                  <a href={`/${language}/services`} className="btn-outline" style={{ fontSize: 15, padding: "14px 32px", minWidth: "160px" }}>
                    {t('home.cta.viewAllServices')}
                  </a>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
} 