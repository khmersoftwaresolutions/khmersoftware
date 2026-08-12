'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageTransition } from '@/hooks/usePageTransition';
import PageBanner from '@/components/PageBanner';

/* ─── Inline Scroll-Reveal wrapper ─── */
function Reveal({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const initial: Record<string, string> = {
    up: 'translateY(32px)',
    left: 'translateX(-32px)',
    right: 'translateX(32px)',
    fade: 'scale(0.97)',
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : initial[direction],
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Colour palette (matches site theme) ─── */
const C = {
  cyan:     '#0ABADF',
  blue:     '#0E62A2',
  green:    '#51B41C',
  yellow:   '#EDEC3A',
  navy:     '#050545',
  ink:      '#1a1a2e',
  muted:    'rgba(26,26,46,0.55)',
  mutedMed: 'rgba(26,26,46,0.72)',
  bg:       '#f8f9fc',
  white:    '#ffffff',
};

/* ─── SVG icon library ─── */
const LightningIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const EyeIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const DollarIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" />
    <path strokeLinecap="round" d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const ClockIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <polyline strokeLinecap="round" points="12 6 12 12 16 14" />
  </svg>
);
const FlagIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" strokeLinecap="round" />
  </svg>
);
const ZapIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <polygon strokeLinecap="round" strokeLinejoin="round" points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline strokeLinecap="round" strokeLinejoin="round" points="9 12 11 14 15 10" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <polyline strokeLinecap="round" strokeLinejoin="round" points="20 6 9 17 4 12" />
  </svg>
);

/* ─── Stat card ─── */
function StatCard({ val, label, color }: { val: string; label: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: 'center', padding: '28px 20px',
        background: C.white,
        border: `1px solid rgba(0,0,0,0.07)`,
        borderTop: `3px solid ${color}`,
        borderRadius: 16,
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.1),0 0 20px ${color}22` : '0 4px 20px rgba(0,0,0,0.05)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
    >
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, fontWeight: 800, color, lineHeight: 1 }}>{val}</div>
      <div style={{ color: C.muted, fontSize: 13, fontWeight: 500, marginTop: 8, lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

/* ─── Feature card ─── */
function FeatureCard({
  icon: IconComp, title, desc, color,
}: { icon: React.FC; title: string; desc: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 24px',
        background: C.white,
        border: `1px solid ${hovered ? color + '44' : 'rgba(0,0,0,0.07)'}`,
        borderRadius: 20,
        boxShadow: hovered ? `0 20px 48px rgba(0,0,0,0.08),0 0 20px ${color}18` : '0 4px 16px rgba(0,0,0,0.04)',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: `linear-gradient(135deg, ${color}18, ${color}10)`,
        border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color,
      }}>
        <IconComp />
      </div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: C.ink, margin: 0 }}>{title}</h3>
      <p style={{ color: C.mutedMed, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{desc}</p>
    </div>
  );
}

/* ─── Main page ─── */
export default function About() {
  const params = useParams();
  const { t, language, setLanguage } = useLanguage();
  usePageTransition();

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) {
      setLanguage(params.lang as 'en' | 'km');
    }
  }, [params.lang, setLanguage]);

  const stats = [
    { val: '50+',  label: t('about.projectsCompleted'), color: C.cyan   },
    { val: '5+',   label: t('about.yearsExperience'),   color: C.green  },
    { val: '100+', label: t('about.happyClients'),       color: C.yellow },
    { val: '15+',  label: t('about.teamMembers'),        color: C.blue   },
  ];

  const features = [
    { icon: GlobeIcon,  title: t('about.localExpertise'),     desc: t('about.localExpertiseText'),     color: C.cyan   },
    { icon: DollarIcon, title: t('about.affordablePricing'),  desc: t('about.affordablePricingText'),  color: C.green  },
    { icon: ClockIcon,  title: t('about.support247'),         desc: t('about.support247Text'),         color: C.yellow },
    { icon: FlagIcon,   title: t('about.khmerLanguage'),      desc: t('about.khmerLanguageText'),      color: C.blue   },
    { icon: ZapIcon,    title: t('about.fastImplementation'), desc: t('about.fastImplementationText'), color: C.cyan   },
    { icon: ShieldIcon, title: t('about.qualityGuaranteed'),  desc: t('about.qualityGuaranteedText'),  color: C.green  },
  ];

  const values = [
    { label: 'Innovation',   desc: 'We constantly explore new technologies to bring the best solutions.' },
    { label: 'Reliability',  desc: 'Our clients depend on us — we deliver on every commitment.' },
    { label: 'Transparency', desc: 'Open communication and clear pricing, no hidden surprises.' },
    { label: 'Local-First',  desc: 'Built for Cambodia, with Khmer language and local regulations in mind.' },
  ];

  return (
    <>
      {/* ── Dark hero banner (matches other pages) ── */}
      <PageBanner
        badge="About Us"
        title="About"
        titleHighlight="KhmerSoftware"
        subtitle={t('about.subtitle')}
        accentColor={C.cyan}
        accentColor2={C.blue}
      />

      <main style={{ background: C.bg, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 clamp(16px,4vw,40px)' }}>

          {/* ── Our Story ── */}
          <section style={{ paddingTop: 80, paddingBottom: 64 }}>
            <Reveal>
              <div style={{
                background: C.white,
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 28,
                boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
                padding: 'clamp(28px,5vw,56px)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))',
                gap: 48,
                alignItems: 'center',
              }}>
                <div>
                  <div style={{
                    display: 'inline-block', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: C.cyan, padding: '5px 14px',
                    background: `${C.cyan}14`, border: `1px solid ${C.cyan}30`,
                    borderRadius: 100, marginBottom: 20,
                  }}>
                    Our Story
                  </div>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, color: C.ink, marginBottom: 20, lineHeight: 1.2 }}>
                    {t('about.ourStory')}
                  </h2>
                  {[t('about.storyText1'), t('about.storyText2'), t('about.storyText3')].map((txt, i) => (
                    <p key={i} style={{ color: C.mutedMed, fontSize: 15, lineHeight: 1.8, marginBottom: i < 2 ? 14 : 0 }}>
                      {txt}
                    </p>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
                  {stats.map((s, i) => <StatCard key={i} {...s} />)}
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── Mission & Vision ── */}
          <section style={{ paddingBottom: 64 }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: 44 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.blue, marginBottom: 10 }}>Purpose</div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: C.ink }}>
                  Mission &amp;{' '}
                  <span style={{ background: `linear-gradient(135deg,${C.cyan},${C.blue})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vision</span>
                </h2>
              </div>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: 24 }}>
              <Reveal delay={0} direction="left">
                <div style={{ padding: 'clamp(28px,4vw,40px)', background: C.white, border: '1px solid rgba(0,0,0,0.07)', borderRadius: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.05)', height: '100%' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 18, background: `linear-gradient(135deg,${C.cyan},${C.blue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 24, boxShadow: `0 8px 24px ${C.cyan}40` }}>
                    <LightningIcon />
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: C.ink, marginBottom: 14 }}>{t('about.mission')}</h3>
                  <p style={{ color: C.mutedMed, lineHeight: 1.8, fontSize: 15 }}>{t('about.missionText')}</p>
                </div>
              </Reveal>
              <Reveal delay={120} direction="right">
                <div style={{ padding: 'clamp(28px,4vw,40px)', background: C.white, border: '1px solid rgba(0,0,0,0.07)', borderRadius: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.05)', height: '100%' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 18, background: `linear-gradient(135deg,${C.yellow},${C.green})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 24, boxShadow: `0 8px 24px ${C.green}40` }}>
                    <EyeIcon />
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: C.ink, marginBottom: 14 }}>{t('about.vision')}</h3>
                  <p style={{ color: C.mutedMed, lineHeight: 1.8, fontSize: 15 }}>{t('about.visionText')}</p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── Core Values (dark panel) ── */}
          <section style={{ paddingBottom: 64 }}>
            <Reveal>
              <div style={{
                background: `linear-gradient(135deg,${C.navy} 0%,#0a1060 60%,${C.blue} 100%)`,
                borderRadius: 28, padding: 'clamp(32px,5vw,56px)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: C.cyan, filter: 'blur(120px)', opacity: 0.09, top: -100, right: -80, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: C.yellow, filter: 'blur(100px)', opacity: 0.07, bottom: -80, left: 0, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ textAlign: 'center', marginBottom: 44 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.cyan, marginBottom: 10 }}>What We Stand For</div>
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, color: '#fff' }}>Our Core Values</h2>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(220px,100%),1fr))', gap: 20 }}>
                    {values.map((v, i) => (
                      <ValueCard key={i} label={v.label} desc={v.desc} />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── Why Choose Us ── */}
          <section style={{ paddingBottom: 64 }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.cyan, marginBottom: 10 }}>Why Choose Us</div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: C.ink, marginBottom: 12 }}>
                  What Sets Us{' '}
                  <span style={{ background: `linear-gradient(135deg,${C.yellow},${C.green})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Apart</span>
                </h2>
                <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>
                  We combine local expertise with world-class technology to deliver solutions built for Cambodia.
                </p>
              </div>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))', gap: 20 }}>
              {features.map((f, i) => (
                <Reveal key={i} delay={i * 60}>
                  <FeatureCard icon={f.icon} title={f.title} desc={f.desc} color={f.color} />
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <section style={{ paddingBottom: 40 }}>
            <Reveal>
              <CTABlock language={language} t={t} />
            </Reveal>
          </section>

        </div>
      </main>
    </>
  );
}

/* ─── Value card (extracted to avoid inline hook issues) ─── */
function ValueCard({ label, desc }: { label: string; desc: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '24px 20px',
        background: hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? 'rgba(10,186,223,0.5)' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 18,
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(10,186,223,0.2)', border: '1px solid rgba(10,186,223,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ABADF', flexShrink: 0 }}>
          <CheckIcon />
        </div>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>{label}</h4>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>{desc}</p>
    </div>
  );
}

/* ─── CTA block (extracted to avoid inline hover state) ─── */
function CTABlock({ language, t }: { language: string; t: (key: string) => string }) {
  const [btn1Hovered, setBtn1Hovered] = useState(false);
  const [btn2Hovered, setBtn2Hovered] = useState(false);
  return (
    <div style={{
      background: `linear-gradient(135deg,#050545 0%,#0a1060 55%,#0E62A2 100%)`,
      borderRadius: 32, padding: 'clamp(44px,6vw,72px) clamp(24px,6vw,72px)',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: '#0ABADF', filter: 'blur(140px)', opacity: 0.1, top: '-150px', right: '-100px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: '#EDEC3A', filter: 'blur(100px)', opacity: 0.08, bottom: '-80px', left: '10%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0ABADF', marginBottom: 16 }}>Get Started</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
          Ready to{' '}
          <span style={{ background: 'linear-gradient(135deg,#0ABADF,#7AEFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Join</span>
          {' '}Our Success?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 32px' }}>
          Let&apos;s build something remarkable together. Our team is ready to bring your vision to life.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={`/${language}/contact`}
            onMouseEnter={() => setBtn1Hovered(true)}
            onMouseLeave={() => setBtn1Hovered(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 100, fontWeight: 600, fontSize: 15,
              background: 'linear-gradient(135deg,#0ABADF,#0E62A2)',
              color: '#fff', textDecoration: 'none',
              boxShadow: btn1Hovered ? '0 16px 40px rgba(10,186,223,0.6)' : '0 8px 28px rgba(10,186,223,0.4)',
              transform: btn1Hovered ? 'translateY(-3px)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {t('about.getStarted')} →
          </a>
          <a
            href={`/${language}/services`}
            onMouseEnter={() => setBtn2Hovered(true)}
            onMouseLeave={() => setBtn2Hovered(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 100, fontWeight: 600, fontSize: 15,
              background: btn2Hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(255,255,255,0.25)',
              color: '#fff', textDecoration: 'none',
              transform: btn2Hovered ? 'translateY(-3px)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {t('about.viewServices')}
          </a>
        </div>
      </div>
    </div>
  );
}
