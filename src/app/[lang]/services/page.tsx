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
const LayersIcon = () => <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const SmartphoneIcon = () => <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/></svg>;
const GlobeIcon = () => <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12" strokeOpacity="0.4"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const CloudIcon = () => <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>;
const GitBranchIcon = () => <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>;
const ShieldIcon = () => <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
const MapIcon = () => <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
const PenToolIcon = () => <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="1.5" fill="currentColor" stroke="none"/></svg>;

const SERVICES = [
  { id: 'custom', title: { en: 'Custom Software', km: '[KM] Custom Software' }, Icon: LayersIcon, color: COLORS.cyan, desc: { en: 'Bespoke enterprise systems, internal tools, and complex platforms tailored exactly to your business processes.', km: '[KM] Bespoke enterprise systems, internal tools, and complex platforms tailored exactly to your business processes.' } },
  { id: 'mobile', title: { en: 'Mobile Apps', km: '[KM] Mobile Apps' }, Icon: SmartphoneIcon, color: COLORS.green, desc: { en: 'Native-quality cross-platform mobile apps for iOS and Android with offline-first architecture.', km: '[KM] Native-quality cross-platform mobile apps for iOS and Android with offline-first architecture.' } },
  { id: 'web', title: { en: 'Web Applications', km: '[KM] Web Applications' }, Icon: GlobeIcon, color: COLORS.blue, desc: { en: 'High-performance, scalable web applications optimized for speed, SEO, and user experience.', km: '[KM] High-performance, scalable web applications optimized for speed, SEO, and user experience.' } },
  { id: 'cloud', title: { en: 'Cloud Migration', km: '[KM] Cloud Migration' }, Icon: CloudIcon, color: COLORS.navy, desc: { en: 'Move to AWS or Google Cloud with zero downtime. Cost optimization and highly available infrastructure.', km: '[KM] Move to AWS or Google Cloud with zero downtime. Cost optimization and highly available infrastructure.' } },
  { id: 'devops', title: { en: 'DevOps Services', km: '[KM] DevOps Services' }, Icon: GitBranchIcon, color: COLORS.yellow, desc: { en: 'CI/CD pipelines, containerization, and infrastructure as code to help your team ship faster.', km: '[KM] CI/CD pipelines, containerization, and infrastructure as code to help your team ship faster.' } },
  { id: 'security', title: { en: 'Cybersecurity', km: '[KM] Cybersecurity' }, Icon: ShieldIcon, color: COLORS.blue, desc: { en: 'Penetration testing, vulnerability assessments, and compliance implementation (PCI-DSS, SOC2).', km: '[KM] Penetration testing, vulnerability assessments, and compliance implementation (PCI-DSS, SOC2).' } },
  { id: 'strategy', title: { en: 'IT Strategy', km: '[KM] IT Strategy' }, Icon: MapIcon, color: COLORS.cyan, desc: { en: 'Technology roadmaps, architecture reviews, and digital transformation consulting for leadership teams.', km: '[KM] Technology roadmaps, architecture reviews, and digital transformation consulting for leadership teams.' } },
  { id: 'design', title: { en: 'UI/UX Design', km: '[KM] UI/UX Design' }, Icon: PenToolIcon, color: COLORS.green, desc: { en: 'Research-backed user interfaces, interactive prototyping, and design system creation.', km: '[KM] Research-backed user interfaces, interactive prototyping, and design system creation.' } },
];

export default function ServicesPage() {
  const params = useParams();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const pageStyles = `
    body { background: #f8f9fc; margin: 0; font-family: var(--font-dm-sans), 'DM Sans', sans-serif; }
    .svc-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
    
    .service-card { background: rgba(255,255,255,0.92); border: 1px solid rgba(5,5,69,0.07); border-radius: 20px; padding: clamp(24px,4vw,32px); box-shadow: 0 4px 16px rgba(5,5,69,0.04); transition: all 0.3s cubic-bezier(0.16,1,0.3,1); display: flex; flex-direction: column; text-decoration: none; color: inherit; }
    .service-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(5,5,69,0.08); border-color: rgba(5,5,69,0.12); }
    
    .ready-product-card { background: white; border: 1px solid rgba(5,5,69,0.07); border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(5,5,69,0.05); }
    
    .feature-tag { display: inline-flex; align-items: center; font-size: 13px; font-weight: 600; padding: 6px 14px; border-radius: 100px; background: rgba(5,5,69,0.04); color: rgba(5,5,69,0.7); margin-bottom: 8px; }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge={language === 'km' ? '[KM] Our Services' : 'Our Services'}
        title={language === 'km' ? '[KM] End-to-End' : 'End-to-End'}
        titleHighlight={language === 'km' ? '[KM] Technology Solutions' : 'Technology Solutions'}
        subtitle={language === 'km' ? '[KM] From strategic consulting and UX design to custom development and cloud infrastructure. We provide everything you need to build, launch, and scale digital products.' : 'From strategic consulting and UX design to custom development and cloud infrastructure. We provide everything you need to build, launch, and scale digital products.'}
        accentColor={COLORS.blue}
        accentColor2={COLORS.cyan}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="svc-container">
          
          {/* Custom Solutions Grid */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', padding: '72px 0 40px' }}>
              <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: COLORS.blue, padding: '6px 14px', background: 'rgba(14,98,162,0.08)', border: '1px solid rgba(14,98,162,0.2)', borderRadius: 100, marginBottom: 16 }}>{language === 'km' ? '[KM] Custom Engineering' : 'Custom Engineering'}</div>
              <h2 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4vw,40px)', color: '#0d0d2b', marginBottom: 16 }}>
                {language === 'km' ? '[KM] Engineering' : 'Engineering'} <span style={{ background: 'linear-gradient(135deg,#0E62A2,#0ABADF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{language === 'km' ? '[KM] Excellence' : 'Excellence'}</span>
              </h2>
              <p style={{ color: 'rgba(26,26,46,0.55)', fontSize: 16, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
                {language === 'km' ? '[KM] We assemble cross-functional teams of engineers, designers, and product managers to tackle your most complex technical challenges. Select a service to learn more.' : 'We assemble cross-functional teams of engineers, designers, and product managers to tackle your most complex technical challenges. Select a service to learn more.'}
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))', gap: 24, marginBottom: 80 }}>
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={i} delay={i * 50} direction="up">
                <a href={`/${language}/services/${svc.id}`} className="service-card">
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${svc.color}15`, border: `1px solid ${svc.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: svc.color, marginBottom: 20 }}>
                    <svc.Icon />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: '#0d0d2b', marginBottom: 12 }}>{svc.title[language as keyof typeof svc.title] || svc.title.en}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.6)', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>{svc.desc[language as keyof typeof svc.desc] || svc.desc.en}</p>
                  <div style={{ fontSize: 13, fontWeight: 700, color: svc.color, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {language === 'km' ? '[KM] Explore Service' : 'Explore Service'} <span>→</span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* Off-the-shelf Software (Sales & Rental) */}
          <ScrollReveal>
            <div style={{ background: 'white', borderRadius: 24, border: '1px solid rgba(5,5,69,0.07)', boxShadow: '0 8px 32px rgba(5,5,69,0.04)', overflow: 'hidden', marginBottom: 80 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))' }}>
                
                {/* Left side content */}
                <div style={{ padding: 'clamp(32px,5vw,56px)' }}>
                  <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: COLORS.green, padding: '6px 14px', background: 'rgba(81,180,28,0.1)', borderRadius: 100, marginBottom: 16 }}>{language === 'km' ? '[KM] Ready-to-use Products' : 'Ready-to-use Products'}</div>
                  <h2 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,34px)', color: '#0d0d2b', marginBottom: 16 }}>
                    {language === 'km' ? '[KM] Software' : 'Software'} <span style={{ color: COLORS.green }}>{language === 'km' ? '[KM] Sales & Rental' : 'Sales & Rental'}</span>
                  </h2>
                  <p style={{ fontSize: 15, color: 'rgba(26,26,46,0.6)', lineHeight: 1.7, marginBottom: 32 }}>
                    {language === 'km' ? '[KM] Don\'t need a custom build? We offer enterprise-grade, pre-built software solutions that are fully localized for Cambodia (Khmer language, local tax compliance, multi-currency).' : 'Don\'t need a custom build? We offer enterprise-grade, pre-built software solutions that are fully localized for Cambodia (Khmer language, local tax compliance, multi-currency).'}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
                    <div className="feature-tag">✓ {language === 'km' ? '[KM] Point of Sale (POS) Systems' : 'Point of Sale (POS) Systems'}</div>
                    <div className="feature-tag">✓ {language === 'km' ? '[KM] ERP & Inventory Management' : 'ERP & Inventory Management'}</div>
                    <div className="feature-tag">✓ {language === 'km' ? '[KM] HR & Payroll Software' : 'HR & Payroll Software'}</div>
                    <div className="feature-tag">✓ {language === 'km' ? '[KM] Accounting (GDT Compliant)' : 'Accounting (GDT Compliant)'}</div>
                  </div>

                  <a 
                    href="https://shop.khmersoftware.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'linear-gradient(135deg,#51B41C,#0ABADF)', color: 'white', textDecoration: 'none', boxShadow: '0 4px 20px rgba(81,180,28,0.3)' }}
                  >
                    {language === 'km' ? '[KM] Visit Software Shop' : 'Visit Software Shop'}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>

                {/* Right side visual */}
                <div style={{ background: `linear-gradient(135deg,${COLORS.navy},${COLORS.blue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative', overflow: 'hidden', minHeight: 320 }}>
                  <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: COLORS.green, filter: 'blur(120px)', opacity: 0.15, top: '-100px', right: '-50px', pointerEvents: 'none' }} />
                  
                  {/* Abstract dashboard graphic */}
                  <div style={{ width: '100%', maxWidth: 360, height: 260, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, backdropFilter: 'blur(10px)', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: 120, height: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 6 }} />
                      <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                      {[1,2,3].map(i => <div key={i} style={{ height: 60, background: 'rgba(255,255,255,0.08)', borderRadius: 8 }} />)}
                    </div>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 8, display: 'flex', alignItems: 'flex-end', padding: 12, gap: 8 }}>
                      {[40, 70, 45, 90, 65, 80, 50].map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 3 ? COLORS.cyan : 'rgba(255,255,255,0.1)', borderRadius: 4 }} />)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={100}>
            <div style={{ marginTop: 80, padding: 'clamp(40px,6vw,64px)', borderRadius: 24, background: 'linear-gradient(135deg,#050545,#0E62A2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: COLORS.cyan, filter: 'blur(120px)', opacity: 0.1, top: '-100px', right: '-50px', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', marginBottom: 12 }}>Not sure which service you need?</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>Book a free technical consultation with our engineering team to discuss your goals.</p>
                <a href={`/${language}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'linear-gradient(135deg,#0ABADF,#0E62A2)', color: '#fff', textDecoration: 'none', boxShadow: '0 4px 20px rgba(10,186,223,0.4)' }}>
                  Book Free Consultation →
                </a>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </main>
    </>
  );
}
