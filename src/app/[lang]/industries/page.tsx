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
const ShoppingCartIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const LandmarkIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>;
const HeartPulseIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const GraduationCapIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const BuildingIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const TruckIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const PlaneIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>;
const HomeIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const LeafIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.07c-.83 1.18.67 2.43 1.7 1.46C7.83 18.33 11 16 15.5 16H18a3 3 0 0 0 3-3A7 7 0 0 0 17 8z"/><line x1="3.82" y1="19.07" x2="12" y2="12"/></svg>;
const WifiIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>;
const UtensilsIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><line x1="7" y1="2" x2="7" y2="11"/><path d="M21 15V2a5 5 0 0 0-5 5v6h3v2a2 2 0 0 1-2 2v3"/></svg>;
const MonitorIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;

const INDUSTRIES = [
  { Icon: ShoppingCartIcon, title: 'E-Commerce & Retail', color: COLORS.cyan, clients: '12+ clients', desc: 'Multi-vendor marketplaces, POS systems, inventory management, and omnichannel retail platforms tailored for Cambodia\'s growing consumer market.', solutions: ['Multi-vendor marketplace', 'POS & inventory system', 'Customer loyalty platform', 'Analytics dashboard'] },
  { Icon: LandmarkIcon, title: 'Banking & Finance', color: COLORS.blue, clients: '8+ clients', desc: 'Core banking integrations, digital wallets, loan management systems, and compliance-ready fintech platforms meeting NBC regulations.', solutions: ['Digital wallet gateway', 'Loan management system', 'KYC verification platform', 'Transaction analytics'] },
  { Icon: HeartPulseIcon, title: 'Healthcare', color: COLORS.green, clients: '6+ clients', desc: 'Hospital information systems, patient management, telemedicine platforms, and health data analytics built to international standards.', solutions: ['Hospital information system', 'Telemedicine platform', 'Patient record management', 'Medical billing'] },
  { Icon: GraduationCapIcon, title: 'Education & EdTech', color: COLORS.yellow, clients: '10+ clients', desc: 'Learning management systems, school administration platforms, e-learning apps, and student performance analytics for Cambodian institutions.', solutions: ['LMS platform', 'School admin system', 'E-learning mobile app', 'Student analytics'] },
  { Icon: BuildingIcon, title: 'Government & Public Sector', color: COLORS.navy, clients: '5+ clients', desc: 'Citizen service portals, digital ID systems, tax management platforms, and e-governance solutions meeting GDA compliance standards.', solutions: ['Citizen service portal', 'Digital ID integration', 'Tax management system', 'Document management'] },
  { Icon: TruckIcon, title: 'Logistics & Supply Chain', color: COLORS.cyan, clients: '7+ clients', desc: 'Fleet management, warehouse automation, last-mile delivery tracking, and supply chain visibility platforms for Cambodia\'s logistics sector.', solutions: ['Fleet management system', 'Last-mile tracking', 'Warehouse automation', 'Supply chain visibility'] },
  { Icon: PlaneIcon, title: 'Tourism & Hospitality', color: COLORS.blue, clients: '9+ clients', desc: 'Booking engines, hotel property management systems, travel aggregation platforms, and guest experience apps for Cambodia\'s tourism industry.', solutions: ['Hotel PMS', 'Online booking engine', 'Tour management platform', 'Guest loyalty app'] },
  { Icon: HomeIcon, title: 'Real Estate', color: COLORS.green, clients: '4+ clients', desc: 'Property listing platforms, CRM for real estate agencies, rental management systems, and investment analytics dashboards.', solutions: ['Property listing portal', 'Agency CRM', 'Rental management', 'Investment dashboard'] },
  { Icon: LeafIcon, title: 'Agriculture & AgriTech', color: COLORS.yellow, clients: '3+ clients', desc: 'Farm management systems, crop monitoring dashboards, supply chain traceability, and market price data platforms for Cambodian farmers.', solutions: ['Farm management app', 'Crop monitoring', 'Market price tracker', 'Supply traceability'] },
  { Icon: WifiIcon, title: 'Telecommunications', color: COLORS.cyan, clients: '4+ clients', desc: 'Billing systems, customer self-service portals, network monitoring dashboards, and CRM integrations for telco operators in Cambodia.', solutions: ['Billing platform', 'Customer self-service', 'Network monitoring', 'CRM integration'] },
  { Icon: UtensilsIcon, title: 'Food & Restaurant', color: COLORS.blue, clients: '11+ clients', desc: 'Restaurant POS, food delivery platforms, kitchen display systems, table reservation apps, and menu management solutions.', solutions: ['Restaurant POS', 'Delivery platform', 'Kitchen display system', 'Reservation system'] },
  { Icon: MonitorIcon, title: 'Media & Publishing', color: COLORS.green, clients: '5+ clients', desc: 'Content management systems, video streaming platforms, digital publishing tools, and audience analytics for Cambodian media houses.', solutions: ['CMS platform', 'Video streaming', 'Audience analytics', 'Ad management'] },
];


export default function IndustriesPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
    .ind-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
    .ind-card { background: rgba(255,255,255,0.9); border: 1px solid rgba(5,5,69,0.07); border-radius: 20px; padding: 28px; box-shadow: 0 4px 16px rgba(5,5,69,0.05); transition: all 0.35s ease; cursor: pointer; }
    .ind-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(5,5,69,0.1); }
    .solution-tag { display: inline-flex; align-items: center; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 100px; background: rgba(10,186,223,0.08); color: #0ABADF; margin: 3px; }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge="Industries We Serve"
        title="Deep Expertise Across"
        titleHighlight="Every Sector"
        subtitle="We don't build generic software. We build domain-specific solutions informed by years of experience across Cambodia's most critical industries."
        ctaLabel="Discuss Your Industry"
        ctaHref={`/${language}/contact`}
        accentColor={COLORS.blue}
        accentColor2={COLORS.cyan}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="ind-container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', padding: '72px 0 48px' }}>
              <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: COLORS.blue, padding: '6px 14px', background: 'rgba(14,98,162,0.08)', border: '1px solid rgba(14,98,162,0.2)', borderRadius: 100, marginBottom: 16 }}>12 Industries</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4vw,40px)', color: '#0d0d2b', marginBottom: 16 }}>
                We Know Your <span style={{ background: 'linear-gradient(135deg,#0E62A2,#0ABADF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Business Domain</span>
              </h2>
              <p style={{ color: 'rgba(26,26,46,0.55)', fontSize: 16, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
                Click any industry to explore the specific solutions and case studies we've delivered in that sector.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(340px,100%),1fr))', gap: 20 }}>
            {INDUSTRIES.map((ind, i) => (
              <ScrollReveal key={i} delay={i * 50} direction="up">
                <div
                  className="ind-card"
                  onClick={() => setActive(active === i ? null : i)}
                  style={{ borderColor: active === i ? `${ind.color}40` : undefined, background: active === i ? `${ind.color}05` : undefined }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${ind.color}12`, border: `1px solid ${ind.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ind.color, flexShrink: 0 }}>
                      <ind.Icon />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: '#0d0d2b', marginBottom: 2 }}>{ind.title}</h3>
                      <span style={{ fontSize: 11, color: ind.color, fontWeight: 600, background: `${ind.color}10`, padding: '2px 8px', borderRadius: 100 }}>{ind.clients}</span>
                    </div>
                    <div style={{ color: ind.color, fontSize: 18, transition: 'transform 0.3s', transform: active === i ? 'rotate(180deg)' : 'none' }}>▾</div>
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(26,26,46,0.6)', lineHeight: 1.6, marginBottom: active === i ? 16 : 0 }}>{ind.desc}</p>

                  {/* Expanded solutions */}
                  <div style={{ overflow: 'hidden', maxHeight: active === i ? 120 : 0, transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div style={{ paddingTop: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: 'rgba(26,26,46,0.4)', marginBottom: 8 }}>Key Solutions</div>
                      <div>{ind.solutions.map((s, si) => <span key={si} className="solution-tag" style={{ background: `${ind.color}10`, color: ind.color }}>✓ {s}</span>)}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <ScrollReveal delay={100}>
            <div style={{ marginTop: 80, padding: 'clamp(40px,6vw,64px)', borderRadius: 24, background: 'linear-gradient(135deg,#050545,#0E62A2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: COLORS.cyan, filter: 'blur(120px)', opacity: 0.1, top: '-100px', right: '-50px', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', marginBottom: 12 }}>Don't see your industry?</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>We've worked across many more sectors. Tell us about your business and we'll tailor a solution for you.</p>
                <a href={`/${language}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'linear-gradient(135deg,#0ABADF,#0E62A2)', color: '#fff', textDecoration: 'none', boxShadow: '0 4px 20px rgba(10,186,223,0.4)' }}>
                  Talk to Our Team →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}
