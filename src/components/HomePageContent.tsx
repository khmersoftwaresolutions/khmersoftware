'use client';

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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

const TECHNOLOGY_STACK = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
];

const techStyles = `
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.tech-marquee-wrapper {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 100%;
  display: flex;
  padding: 20px 0;
}
.tech-marquee-wrapper::before,
.tech-marquee-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  width: 200px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}
.tech-marquee-wrapper::before {
  left: 0;
  background: linear-gradient(to right, #ffffff, transparent);
}
.tech-marquee-wrapper::after {
  right: 0;
  background: linear-gradient(to left, #ffffff, transparent);
}
.tech-marquee-content {
  display: flex;
  width: max-content;
  animation: marquee 35s linear infinite;
}
.tech-marquee-content:hover {
  animation-play-state: paused;
}
.tech-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  width: 100px;
  height: 100px;
  border-radius: 20px;
  margin: 0 16px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}
.tech-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: rgba(10, 186, 223, 0.3);
}
.tech-card img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.7);
  transition: all 0.3s ease;
}
.tech-card:hover img {
  filter: grayscale(0%) opacity(1);
  transform: scale(1.1);
}
`;

export default function HomePageContent() {
  const { t, language } = useLanguage();
  const [slide, setSlide] = useState(0);
  const [hoverZone, setHoverZone] = useState<'prev' | 'next' | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const SLIDES = [
    {
      img: '/hero-slide-1.png',
      badge: t('home.badge'),
      title1: t('home.hero.title1'),
      title2: t('home.hero.title2'),
      title3: t('home.hero.title3'),
    },
    {
      img: '/hero-slide-2.png',
      badge: 'Cambodia\'s Leading Dev Team',
      title1: 'Expert Software',
      title2: 'Built for',
      title3: 'Your Business',
    },
    {
      img: '/hero-slide-3.png',
      badge: 'Digital Transformation',
      title1: 'Powering the Future',
      title2: 'of Cambodian',
      title3: 'Technology',
    },
  ];

  const goTo = (i: number) => setSlide((i + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    slideTimer.current = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000);
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, [SLIDES.length]);

  const resetTimer = () => {
    if (slideTimer.current) clearInterval(slideTimer.current);
    slideTimer.current = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000);
  };

  const services = [
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>,
      title: t('home.services.softwareSales.title'),
      desc: t('home.services.softwareSales.desc'),
      color: COLORS.cyan,
      bg: "rgba(10,186,223,0.1)",
      linkColor: COLORS.cyan,
      key: "sales",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
      title: t('home.services.softwareRental.title'),
      desc: t('home.services.softwareRental.desc'),
      color: COLORS.green,
      bg: "rgba(81,180,28,0.1)",
      linkColor: COLORS.green,
      key: "rental",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
      title: t('home.services.customDevelopment.title'),
      desc: t('home.services.customDevelopment.desc'),
      color: COLORS.yellow,
      bg: "rgba(237,236,58,0.1)",
      linkColor: COLORS.yellow,
      key: "dev",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
      title: t('home.services.cloudInfrastructure.title'),
      desc: t('home.services.cloudInfrastructure.desc'),
      color: COLORS.blue,
      bg: "rgba(14,98,162,0.1)",
      linkColor: COLORS.blue,
      key: "cloud",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
      title: t('home.services.cybersecurity.title'),
      desc: t('home.services.cybersecurity.desc'),
      color: COLORS.navy,
      bg: "rgba(5,5,69,0.1)",
      linkColor: COLORS.navy,
      key: "security",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
      title: t('home.services.trainingSupport.title'),
      desc: t('home.services.trainingSupport.desc'),
      color: COLORS.cyan,
      bg: "rgba(10,186,223,0.1)",
      linkColor: COLORS.cyan,
      key: "support",
    }
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
      <style>{techStyles}</style>
      {/* ── HERO CAROUSEL ──────────────────────────── */}
      <section style={{ position: 'relative', width: '100%', height: 'min(90vh, 700px)', overflow: 'hidden', marginBottom: 'clamp(40px, 6vw, 80px)' }}>
        {/* Slides */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${s.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === slide ? 1 : 0,
              transition: 'opacity 0.9s ease',
              zIndex: i === slide ? 1 : 0,
            }}
          >
            {/* Dark overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(5,5,69,0.82) 0%, rgba(10,186,223,0.18) 100%)' }} />

            {/* Content */}
            <div style={{
              position: 'relative', zIndex: 2, height: '100%',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', padding: '0 clamp(20px, 6vw, 80px)',
            }}>
              {/* Badge */}
              <div className="hero-badge" style={{ marginBottom: 24, opacity: i === slide ? 1 : 0, transform: i === slide ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.2s' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.cyan, display: 'inline-block', boxShadow: `0 0 8px ${COLORS.cyan}` }} />
                {s.badge}
              </div>

              {/* Title */}
              <h1 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 'clamp(32px, 6vw, 72px)', lineHeight: 1.1,
                color: '#fff', marginBottom: 20, maxWidth: 800,
                opacity: i === slide ? 1 : 0, transform: i === slide ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s ease 0.35s',
              }}>
                <span className="grad-cyan">{s.title1}</span><br />
                {s.title2} <span className="grad-yellow">{s.title3}</span>
              </h1>

              {/* Subtitle (only slide 0 uses translation) */}
              <p style={{
                fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.72)',
                maxWidth: 560, lineHeight: 1.7, marginBottom: 36,
                opacity: i === slide ? 1 : 0, transform: i === slide ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s ease 0.5s',
              }}>
                {i === 0 ? t('home.hero.subtitle') : i === 1 ? 'Our experienced team delivers tailored solutions that grow with your business.' : 'Connecting Cambodian businesses to the digital future with cutting-edge technology.'}
              </p>

              {/* CTA Buttons */}
              <div className="hero-cta" style={{ opacity: i === slide ? 1 : 0, transform: i === slide ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease 0.65s' }}>
                <a href={`/${language}/services`} className="btn-primary">
                  {t('home.hero.exploreServices')}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <a href={`/${language}/contact`} className="btn-outline">
                  {t('home.hero.bookDemo')}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Left hover zone — Back */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, width: '50%', height: '100%',
            zIndex: 10, cursor: 'none',
          }}
          onMouseEnter={() => setHoverZone('prev')}
          onMouseLeave={() => setHoverZone(null)}
          onMouseMove={e => {
            const parent = e.currentTarget.parentElement!.getBoundingClientRect();
            setCursorPos({ x: e.clientX - parent.left, y: e.clientY - parent.top });
          }}
          onClick={() => { goTo(slide - 1); resetTimer(); }}
        />

        {/* Right hover zone — Next */}
        <div
          style={{
            position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
            zIndex: 10, cursor: 'none',
          }}
          onMouseEnter={() => setHoverZone('next')}
          onMouseLeave={() => setHoverZone(null)}
          onMouseMove={e => {
            const parent = e.currentTarget.parentElement!.getBoundingClientRect();
            setCursorPos({ x: e.clientX - parent.left, y: e.clientY - parent.top });
          }}
          onClick={() => { goTo(slide + 1); resetTimer(); }}
        />

        {/* Custom round cursor label */}
        {hoverZone && (
          <div
            style={{
              position: 'absolute',
              left: cursorPos.x,
              top: cursorPos.y,
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
              pointerEvents: 'none',
              width: 90, height: 90,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 4,
              color: '#ffffff',
              textTransform: 'uppercase',
              fontSize: 12, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.1em',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              animation: 'fadeInCursor 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>{hoverZone === 'prev' ? '←' : '→'}</span>
            <span>{hoverZone === 'prev' ? 'Back' : 'Next'}</span>
          </div>
        )}

        {/* Dot indicators */}
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetTimer(); }}
              style={{
                width: i === slide ? 28 : 8, height: 8,
                borderRadius: 4, border: 'none', cursor: 'pointer',
                background: i === slide ? COLORS.cyan : 'rgba(255,255,255,0.35)',
                transition: 'all 0.35s ease',
                padding: 0,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
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
                  <p style={{ color: "rgba(26,26,46,0.6)", fontSize: "clamp(13px, 3vw, 14px)", lineHeight: 1.7 }}>{s.desc}</p>
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
                <p style={{ color: "rgba(26,26,46,0.6)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
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
                    <div style={{ fontSize: 12, color: "rgba(26,26,46,0.5)", textAlign: "center" }}>Uptime SLA</div>
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
                  { title: "Requirement Analysis", desc: "Deep-dive discovery with your team", icon: "01", color: COLORS.cyan, pct: 100 },
                  { title: "Prototype & Design", desc: "Wireframes validated in 2 weeks", icon: "02", color: COLORS.yellow, pct: 80 },
                  { title: "Agile Development", desc: "2-week sprints with live demos", icon: "03", color: COLORS.green, pct: 90 },
                  { title: "Deploy & Support", desc: "Seamless go-live + 12-mo warranty", icon: "04", color: COLORS.blue, pct: 95 },
                ].map((step, i) => (
                  <div key={i} className="glass-card" style={{ padding: "clamp(14px, 3vw, 20px)", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: "clamp(36px, 5vw, 44px)", height: "clamp(36px, 5vw, 44px)", borderRadius: 12, background: `${step.color}15`, border: `1px solid ${step.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(16px, 4vw, 20px)", flexShrink: 0 }}>
                      {step.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: "clamp(12px, 3vw, 14px)", marginBottom: 4 }}>{step.title}</div>
                      <div style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "rgba(26,26,46,0.5)" }}>{step.desc}</div>
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
                <p style={{ color: "rgba(26,26,46,0.6)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
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

      {/* ── TECHNOLOGY STACK ────────────────── */}
      <section className="section" style={{ padding: "80px 0", background: "rgba(0, 0, 0, 0.01)", borderTop: "1px solid rgba(0,0,0,0.03)", borderBottom: "1px solid rgba(0,0,0,0.03)" }}>
        <div className="container">
          <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="section-label">{t('home.technologyStack.sectionLabel')}</div>
              <h2 className="section-title">{t('home.technologyStack.title')} <span className="grad-blue">{t('home.technologyStack.titleHighlight')}</span></h2>
              <div className="h-line" style={{ margin: "16px auto 0", background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.cyan})` }} />
              <p style={{ color: "rgba(26,26,46,0.6)", fontSize: 16, maxWidth: 600, margin: "20px auto 0", lineHeight: 1.6 }}>
                {t('home.technologyStack.description')}
              </p>
            </div>
          </FadeInSection>
        </div>

        <FadeInSection delay={100}>
          <div className="tech-marquee-wrapper">
            <div className="tech-marquee-content">
              {/* Double array for seamless loop */}
              {[...TECHNOLOGY_STACK, ...TECHNOLOGY_STACK].map((tech, i) => (
                <div key={i} className="tech-card" title={tech.name}>
                  <img src={tech.logo} alt={tech.name} />
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
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
                <p style={{ color: "rgba(26,26,46,0.6)", fontSize: 16, lineHeight: 1.6, maxWidth: 520, margin: "0 auto 32px", textAlign: "center" }}>
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