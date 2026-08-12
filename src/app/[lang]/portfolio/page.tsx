'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import PageBanner from '@/components/PageBanner';

const COLORS = { navy: '#050545', blue: '#0E62A2', cyan: '#0ABADF', green: '#51B41C', yellow: '#EDEC3A' };

function ScrollReveal({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' | 'fade' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const t: Record<string, string> = { up: 'translateY(36px)', left: 'translateX(-36px)', right: 'translateX(36px)', fade: 'scale(0.96)' };
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : t[direction], transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── SVG Icons ── */
const CreditCardIcon = () => <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const BriefcaseIcon = () => <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>;
const ShoppingCartIcon = () => <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const MapPinIcon = () => <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const BuildingIcon = () => <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const LandmarkIcon = () => <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>;
const BookOpenIcon = () => <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const PackageIcon = () => <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>;
const StoreIcon = () => <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l1-6h16l1 6"/><path d="M21 9v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9"/><path d="M9 9v3a3 3 0 0 0 6 0V9"/></svg>;

function IconBox({ color, Icon, size = 80 }: { color: string; Icon: React.FC; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 22, background: `linear-gradient(135deg, ${color}22, ${color}0d)`, border: `1.5px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
      <Icon />
    </div>
  );
}

const FILTERS = ['All', 'Web App', 'Mobile', 'E-Commerce', 'Government', 'Healthcare', 'Finance'];

type Project = { title: string; industry: string; type: string; color: string; Icon: React.FC; desc: string; tech: string[]; results: string[] };

const PROJECTS: Project[] = [
  { title: 'NagaWorld Digital Wallet', industry: 'Finance', type: 'Web App', color: COLORS.cyan, Icon: CreditCardIcon, desc: 'A full-featured digital wallet platform with KYC verification, QR payments, and real-time transaction analytics for 50,000+ users.', tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'], results: ['50K+ users', '99.99% uptime', '<200ms API'] },
  { title: 'MekongPharma ERP', industry: 'Healthcare', type: 'Web App', color: COLORS.green, Icon: BriefcaseIcon, desc: 'End-to-end ERP system covering inventory, patient prescriptions, billing, and supplier management for a 12-branch pharmacy chain.', tech: ['Next.js', 'Python', 'MongoDB', 'Docker'], results: ['12 branches', '40% cost saving', 'Real-time sync'] },
  { title: 'AgroCambodia Marketplace', industry: 'E-Commerce', type: 'Web App', color: COLORS.yellow, Icon: ShoppingCartIcon, desc: 'B2B agricultural marketplace connecting 3,000+ farmers directly with buyers, featuring live price feeds and logistics tracking.', tech: ['Vue.js', 'Node.js', 'MySQL', 'Redis'], results: ['3K+ farmers', '$2M GMV/mo', 'Mobile-first'] },
  { title: 'PhnomPenh City App', industry: 'Government', type: 'Mobile', color: COLORS.blue, Icon: MapPinIcon, desc: 'A citizen services mobile app for Phnom Penh Municipality — report issues, pay fees, access permits, and track public transport.', tech: ['React Native', 'Go', 'PostgreSQL', 'AWS'], results: ['200K downloads', '4.7★ rating', 'Khmer & English'] },
  { title: 'SiemReap Hotel Suite', industry: 'E-Commerce', type: 'Web App', color: COLORS.cyan, Icon: BuildingIcon, desc: 'Property management system + online booking engine for a 5-star resort group, integrated with Agoda, Booking.com, and AirBnB.', tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'], results: ['30% booking uplift', 'OTA sync', 'Revenue analytics'] },
  { title: 'ACLEDA Mobile Banking', industry: 'Finance', type: 'Mobile', color: COLORS.green, Icon: LandmarkIcon, desc: 'Rebuilt mobile banking application with biometric login, P2P transfers, bill payment, and NBC-compliant KYC flows.', tech: ['Flutter', 'Java', 'Oracle DB', 'AWS'], results: ['500K+ installs', 'Biometric auth', 'NBC compliant'] },
  { title: 'KhmerLearn LMS', industry: 'Healthcare', type: 'Web App', color: COLORS.yellow, Icon: BookOpenIcon, desc: 'A bilingual (Khmer/English) learning management system for 20 universities across Cambodia, with video streaming and assessments.', tech: ['React', 'Django', 'PostgreSQL', 'CloudFront'], results: ['20 universities', '100K students', '4K+ courses'] },
  { title: 'CambodiaPost Tracker', industry: 'Government', type: 'Mobile', color: COLORS.blue, Icon: PackageIcon, desc: 'National parcel tracking app with real-time GPS updates, automated SMS notifications, and a public API for e-commerce integration.', tech: ['React Native', 'Node.js', 'MongoDB', 'GCP'], results: ['1M+ parcels/mo', 'Real-time GPS', 'Public API'] },
  { title: 'Sorya Mall POS', industry: 'E-Commerce', type: 'Web App', color: COLORS.cyan, Icon: StoreIcon, desc: 'Cloud POS system with loyalty rewards, inventory sync, sales analytics, and franchise management for 50+ retail outlets.', tech: ['React', 'Node.js', 'MySQL', 'Redis'], results: ['50+ outlets', 'Offline mode', 'Real-time reports'] },
];

export default function PortfolioPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === filter || p.industry === filter);

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
    .port-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
    .port-card { background: rgba(255,255,255,0.92); border: 1px solid rgba(5,5,69,0.07); border-radius: 20px; overflow: hidden; box-shadow: 0 4px 16px rgba(5,5,69,0.06); transition: all 0.3s ease; display: flex; flex-direction: column; }
    .port-card:hover { transform: translateY(-6px); box-shadow: 0 20px 56px rgba(5,5,69,0.12); }
    .filter-btn { padding: 8px 18px; border-radius: 100px; border: 1.5px solid rgba(5,5,69,0.1); background: white; color: rgba(5,5,69,0.6); font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.25s ease; }
    .filter-btn:hover, .filter-btn.active { background: #050545; color: white; border-color: #050545; }
    .tech-badge { display: inline-flex; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 6px; background: rgba(5,5,69,0.06); color: rgba(5,5,69,0.6); margin: 2px; }
    .result-badge { display: inline-flex; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 100px; background: rgba(81,180,28,0.1); color: #51B41C; margin: 2px; }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge="Our Work"
        title="Projects That"
        titleHighlight="Speak for Themselves"
        subtitle="A selection of impactful projects we've delivered across Cambodia and Southeast Asia — each one solving a real business challenge with measurable results."
        accentColor={COLORS.cyan}
        accentColor2={COLORS.blue}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="port-container">
          {/* Stats banner */}
          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(180px,100%),1fr))', gap: 0, borderRadius: 20, overflow: 'hidden', background: 'white', border: '1px solid rgba(5,5,69,0.06)', boxShadow: '0 4px 24px rgba(5,5,69,0.06)', margin: '48px 0' }}>
              {[
                { val: '50+', label: 'Projects Delivered', color: COLORS.cyan },
                { val: '5+', label: 'Years Experience', color: COLORS.green },
                { val: '98%', label: 'Client Satisfaction', color: COLORS.yellow },
                { val: '12', label: 'Industries Served', color: COLORS.blue },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: 'clamp(20px,4vw,36px) 20px', borderRight: i < 3 ? '1px solid rgba(5,5,69,0.05)' : 'none' }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: 'rgba(26,26,46,0.5)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Filter Bar */}
          <ScrollReveal delay={50}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
              {FILTERS.map(f => (
                <button key={f} className={`filter-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </ScrollReveal>

          {/* Project Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(340px,100%),1fr))', gap: 24 }}>
            {filtered.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 60} direction="up">
                <div className="port-card">
                  {/* Banner */}
                  <div style={{ height: 160, background: `linear-gradient(135deg, ${p.color}12, ${p.color}05)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: `1px solid ${p.color}15` }}>
                    <div style={{ position: 'absolute', top: 14, left: 14, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 100, background: `${p.color}15`, color: p.color }}>{p.industry}</div>
                    <div style={{ position: 'absolute', top: 14, right: 14, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 100, background: 'rgba(5,5,69,0.06)', color: 'rgba(5,5,69,0.5)' }}>{p.type}</div>
                    <IconBox color={p.color} Icon={p.Icon} size={76} />
                  </div>
                  {/* Content */}
                  <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: '#0d0d2b', marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.6)', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{p.desc}</p>
                    {/* Tech */}
                    <div style={{ marginBottom: 14 }}>{p.tech.map((t, ti) => <span key={ti} className="tech-badge">{t}</span>)}</div>
                    {/* Results */}
                    <div style={{ paddingTop: 14, borderTop: '1px solid rgba(5,5,69,0.06)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: 'rgba(26,26,46,0.4)', marginBottom: 8 }}>Key Results</div>
                      {p.results.map((r, ri) => <span key={ri} className="result-badge">✓ {r}</span>)}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={100}>
            <div style={{ marginTop: 80, padding: 'clamp(40px,6vw,64px)', borderRadius: 24, background: 'linear-gradient(135deg,#050545,#0E62A2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: COLORS.cyan, filter: 'blur(120px)', opacity: 0.1, top: '-100px', right: '-50px', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', marginBottom: 12 }}>Ready to be our next success story?</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>Let's discuss your project and see how we can deliver measurable results for your business.</p>
                <a href={`/${language}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'linear-gradient(135deg,#0ABADF,#0E62A2)', color: '#fff', textDecoration: 'none', boxShadow: '0 4px 20px rgba(10,186,223,0.4)' }}>
                  Start Your Project →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}
