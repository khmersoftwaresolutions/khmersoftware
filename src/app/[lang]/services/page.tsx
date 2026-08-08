'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import PageBanner from '@/components/PageBanner';

const COLORS = { navy: '#050545', blue: '#0017E3', cyan: '#FF0008', green: '#0E62A2', yellow: '#D30000' };

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

const SERVICES = [
  { id: 'custom', title: 'Custom Software', icon: '🏗️', color: COLORS.cyan, desc: 'Bespoke enterprise systems, internal tools, and complex platforms tailored exactly to your business processes.' },
  { id: 'mobile', title: 'Mobile Apps', icon: '📱', color: COLORS.green, desc: 'Native-quality cross-platform mobile apps for iOS and Android with offline-first architecture.' },
  { id: 'web', title: 'Web Applications', icon: '🌐', color: COLORS.blue, desc: 'High-performance, scalable web applications optimized for speed, SEO, and user experience.' },
  { id: 'cloud', title: 'Cloud Migration', icon: '☁️', color: COLORS.navy, desc: 'Move to AWS or Google Cloud with zero downtime. Cost optimization and highly available infrastructure.' },
  { id: 'devops', title: 'DevOps Services', icon: '🔄', color: COLORS.yellow, desc: 'CI/CD pipelines, containerization, and infrastructure as code to help your team ship faster.' },
  { id: 'security', title: 'Cybersecurity', icon: '🔐', color: COLORS.blue, desc: 'Penetration testing, vulnerability assessments, and compliance implementation (PCI-DSS, SOC2).' },
  { id: 'strategy', title: 'IT Strategy', icon: '🗺️', color: COLORS.cyan, desc: 'Technology roadmaps, architecture reviews, and digital transformation consulting for leadership teams.' },
  { id: 'design', title: 'UI/UX Design', icon: '🎨', color: COLORS.green, desc: 'Research-backed user interfaces, interactive prototyping, and design system creation.' },
];

export default function ServicesPage() {
  const params = useParams();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
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
        badge="Our Services"
        title="End-to-End"
        titleHighlight="Technology Solutions"
        subtitle="From strategic consulting and UX design to custom development and cloud infrastructure. We provide everything you need to build, launch, and scale digital products."
        accentColor={COLORS.blue}
        accentColor2={COLORS.cyan}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="svc-container">
          
          {/* Custom Solutions Grid */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', padding: '72px 0 40px' }}>
              <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: COLORS.blue, padding: '6px 14px', background: 'rgba(14,98,162,0.08)', border: '1px solid rgba(14,98,162,0.2)', borderRadius: 100, marginBottom: 16 }}>Custom Engineering</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4vw,40px)', color: '#0d0d2b', marginBottom: 16 }}>
                Engineering <span style={{ background: 'linear-gradient(135deg,#0E62A2,#0ABADF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Excellence</span>
              </h2>
              <p style={{ color: 'rgba(26,26,46,0.55)', fontSize: 16, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
                We assemble cross-functional teams of engineers, designers, and product managers to tackle your most complex technical challenges. Select a service to learn more.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))', gap: 24, marginBottom: 80 }}>
            {SERVICES.map((svc, i) => (
              <ScrollReveal key={i} delay={i * 50} direction="up">
                <a href={`/${language}/services/${svc.id}`} className="service-card">
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${svc.color}15`, border: `1px solid ${svc.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 20 }}>
                    {svc.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: '#0d0d2b', marginBottom: 12 }}>{svc.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.6)', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>{svc.desc}</p>
                  <div style={{ fontSize: 13, fontWeight: 700, color: svc.color, display: 'flex', alignItems: 'center', gap: 6 }}>
                    Explore Service <span>→</span>
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
                  <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: COLORS.green, padding: '6px 14px', background: 'rgba(81,180,28,0.1)', borderRadius: 100, marginBottom: 16 }}>Ready-to-use Products</div>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,34px)', color: '#0d0d2b', marginBottom: 16 }}>
                    Software <span style={{ color: COLORS.green }}>Sales & Rental</span>
                  </h2>
                  <p style={{ fontSize: 15, color: 'rgba(26,26,46,0.6)', lineHeight: 1.7, marginBottom: 32 }}>
                    Don't need a custom build? We offer enterprise-grade, pre-built software solutions that are fully localized for Cambodia (Khmer language, local tax compliance, multi-currency).
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
                    <div className="feature-tag">✓ Point of Sale (POS) Systems</div>
                    <div className="feature-tag">✓ ERP & Inventory Management</div>
                    <div className="feature-tag">✓ HR & Payroll Software</div>
                    <div className="feature-tag">✓ Accounting (GDT Compliant)</div>
                  </div>

                  <a 
                    href="https://shop.khmersoftware.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'linear-gradient(135deg,#51B41C,#0ABADF)', color: 'white', textDecoration: 'none', boxShadow: '0 4px 20px rgba(81,180,28,0.3)' }}
                  >
                    Visit Software Shop
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
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', marginBottom: 12 }}>Not sure which service you need?</h2>
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
