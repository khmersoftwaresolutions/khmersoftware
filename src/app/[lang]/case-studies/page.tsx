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
const LandmarkIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>;
const BuildingIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const ShoppingCartIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const TruckIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const HeartPulseIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const CreditCardIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;

function IconBox({ color, Icon, size = 80 }: { color: string; Icon: React.FC; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size > 80 ? 24 : 18, background: `linear-gradient(135deg, ${color}22, ${color}0d)`, border: `1.5px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
      <Icon />
    </div>
  );
}

const FILTERS = ['All', 'Finance', 'Healthcare', 'Government', 'E-Commerce', 'Logistics'];

const CASES = [
  {
    client: 'MajorBank Cambodia',
    industry: 'Finance',
    Icon: LandmarkIcon,
    color: COLORS.cyan,
    title: 'Digital Banking Platform for 500K Customers',
    challenge: 'MajorBank needed to replace a 15-year-old core banking UI with a modern mobile-first digital banking experience — without any downtime during the transition.',
    solution: 'We built a strangler-fig migration, gradually replacing modules of the legacy system with a new React Native mobile app and Next.js web portal — both powered by a new GraphQL API layer sitting in front of the unchanged core banking system.',
    results: [
      { metric: '500K+', desc: 'Active users at launch' },
      { metric: '4.8★', desc: 'App Store rating' },
      { metric: '0 min', desc: 'Downtime during migration' },
      { metric: '62%', desc: 'Reduction in support tickets' },
    ],
    tech: ['React Native', 'Next.js', 'GraphQL', 'AWS', 'PostgreSQL'],
    duration: '14 months',
  },
  {
    client: 'Ministry of Health Cambodia',
    industry: 'Government',
    Icon: BuildingIcon,
    color: COLORS.blue,
    title: 'National Health Information System',
    challenge: 'Cambodia\'s 1,200+ health facilities were using paper records and 12 incompatible software systems. Patient data could not be shared across facilities, leading to duplicated tests and delayed diagnoses.',
    solution: 'We designed and built a national health information platform on AWS GovCloud, with offline-capable tablets for rural clinics, biometric patient identification, and a central analytics dashboard for Ministry policymakers.',
    results: [
      { metric: '1,200+', desc: 'Health facilities onboarded' },
      { metric: '3.2M', desc: 'Patient records digitised' },
      { metric: '40%', desc: 'Reduction in duplicate tests' },
      { metric: '99.9%', desc: 'System uptime' },
    ],
    tech: ['React', 'Django', 'PostgreSQL', 'AWS GovCloud', 'Flutter'],
    duration: '24 months',
  },
  {
    client: 'RetailCo (Confidential)',
    industry: 'E-Commerce',
    Icon: ShoppingCartIcon,
    color: COLORS.green,
    title: 'E-Commerce Platform Scaling from 0 to 2M Users',
    challenge: 'A fast-growing Cambodian retailer launched an e-commerce platform that worked at 10,000 users but collapsed under load during promotions. Their peak traffic was 200x normal volume.',
    solution: 'Complete re-architecture to event-driven microservices on Kubernetes, with Redis caching, ElasticSearch for product search, a CDN for static assets, and database read replicas. We implemented auto-scaling policies that handle 300x normal traffic with no pre-provisioning.',
    results: [
      { metric: '2M+', desc: 'Concurrent users handled' },
      { metric: '99.99%', desc: 'Uptime during peak sale' },
      { metric: '120ms', desc: 'P95 API response time' },
      { metric: '45%', desc: 'Infrastructure cost reduction' },
    ],
    tech: ['Next.js', 'Kubernetes', 'Redis', 'Elasticsearch', 'PostgreSQL'],
    duration: '8 months',
  },
  {
    client: 'PhnomPenh Logistics Group',
    industry: 'Logistics',
    Icon: TruckIcon,
    color: COLORS.yellow,
    title: 'Real-Time Fleet Management & Last-Mile Delivery',
    challenge: 'Managing 450 delivery vehicles with paper manifests, WhatsApp for dispatch, and no customer visibility was creating 23% failed delivery rates and severe operational inefficiency.',
    solution: 'Built a driver mobile app (offline-capable), a dispatcher web console, and a customer tracking portal — all communicating via WebSockets for real-time GPS updates. Integrated with Wing and ABA Pay for cashless collections.',
    results: [
      { metric: '450', desc: 'Vehicles tracked live' },
      { metric: '23%→6%', desc: 'Failed delivery rate' },
      { metric: '35%', desc: 'Increase in deliveries/driver' },
      { metric: '4.9★', desc: 'Customer satisfaction score' },
    ],
    tech: ['React Native', 'Node.js', 'WebSockets', 'MongoDB', 'GCP Maps'],
    duration: '6 months',
  },
  {
    client: 'KhmerHealth Private Hospital',
    industry: 'Healthcare',
    Icon: HeartPulseIcon,
    color: COLORS.cyan,
    title: 'Hospital Information System & Patient Portal',
    challenge: 'A private hospital chain was running billing, appointments, pharmacy, and lab results on 4 separate systems that couldn\'t share data — leading to billing errors and patient safety risks.',
    solution: 'Designed and built an integrated HIS covering patient registration, appointments, ward management, pharmacy, laboratory, radiology, and billing — with a patient-facing mobile app for records access and appointment booking.',
    results: [
      { metric: '60%', desc: 'Reduction in billing errors' },
      { metric: '4x', desc: 'Faster patient discharge' },
      { metric: '12', desc: 'Departments integrated' },
      { metric: 'HL7 FHIR', desc: 'Standards compliant' },
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'HL7 FHIR', 'AWS'],
    duration: '18 months',
  },
  {
    client: 'AngkorFinance',
    industry: 'Finance',
    Icon: CreditCardIcon,
    color: COLORS.blue,
    title: 'Microfinance Loan Origination Platform',
    challenge: 'Processing rural loan applications took 3–5 days with paper forms, manual credit scoring, and branch-only approval processes — leaving potential borrowers underserved.',
    solution: 'Built a mobile-first loan origination platform with digital application, AI-assisted credit scoring using alternative data, biometric KYC, and automated workflow routing. Field officers can process applications offline in villages.',
    results: [
      { metric: '3 days→4 hours', desc: 'Loan approval time' },
      { metric: '3x', desc: 'Applications processed' },
      { metric: '28%', desc: 'Reduction in default rate' },
      { metric: '$12M', desc: 'Loans disbursed monthly' },
    ],
    tech: ['Flutter', 'Python', 'TensorFlow', 'PostgreSQL', 'AWS'],
    duration: '10 months',
  },
];

export default function CaseStudiesPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const filtered = filter === 'All' ? CASES : CASES.filter(c => c.industry === filter);

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
    .cs-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
    .cs-card { background: rgba(255,255,255,0.92); border: 1px solid rgba(5,5,69,0.07); border-radius: 22px; overflow: hidden; box-shadow: 0 4px 16px rgba(5,5,69,0.05); transition: all 0.3s ease; }
    .cs-card:hover { box-shadow: 0 16px 48px rgba(5,5,69,0.1); }
    .filter-btn { padding: 8px 18px; border-radius: 100px; border: 1.5px solid rgba(5,5,69,0.1); background: white; color: rgba(5,5,69,0.6); font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.25s ease; }
    .filter-btn:hover, .filter-btn.active { background: #050545; color: white; border-color: #050545; }
    .tech-chip { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 6px; background: rgba(5,5,69,0.05); color: rgba(5,5,69,0.6); margin: 2px; display: inline-flex; }
    .metric-box { text-align: center; padding: 16px 8px; background: rgba(5,5,69,0.02); border-radius: 12px; border: 1px solid rgba(5,5,69,0.05); }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge="Case Studies"
        title="Real Projects."
        titleHighlight="Real Results."
        subtitle="An in-depth look at how we've solved complex challenges for Cambodia's leading organisations — with honest accounts of the problems, our approach, and the outcomes."
        accentColor={COLORS.blue}
        accentColor2={COLORS.cyan}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="cs-container">
          {/* Filter */}
          <ScrollReveal>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', padding: '48px 0 40px' }}>
              {FILTERS.map(f => (
                <button key={f} className={`filter-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </ScrollReveal>

          {/* Case Study Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {filtered.map((cs, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="cs-card">
                  {/* Header */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))' }}>
                    {/* Left: icon banner */}
                    <div style={{ minHeight: 200, background: `linear-gradient(135deg,${cs.color}12,${cs.color}05)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32, borderRight: `1px solid ${cs.color}15` }}>
                      <IconBox color={cs.color} Icon={cs.Icon} size={88} />
                      <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: cs.color, textAlign: 'center' }}>{cs.industry}</div>
                      <div style={{ fontSize: 12, color: 'rgba(26,26,46,0.45)', textAlign: 'center' }}>⏱ {cs.duration}</div>
                    </div>
                    {/* Right: title + challenge */}
                    <div style={{ padding: 'clamp(24px,4vw,36px)' }}>
                      <div style={{ fontSize: 12, color: 'rgba(26,26,46,0.45)', marginBottom: 8 }}>{cs.client}</div>
                      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(18px,3vw,24px)', color: '#0d0d2b', marginBottom: 20, lineHeight: 1.3 }}>{cs.title}</h2>
                      {/* Results */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100px,100%),1fr))', gap: 10 }}>
                        {cs.results.map((r, ri) => (
                          <div key={ri} className="metric-box">
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(16px,2.5vw,22px)', color: cs.color, marginBottom: 4 }}>{r.metric}</div>
                            <div style={{ fontSize: 11, color: 'rgba(26,26,46,0.5)', lineHeight: 1.4 }}>{r.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expandable detail */}
                  <div style={{ padding: '0 clamp(24px,4vw,36px)' }}>
                    <button onClick={() => setOpen(open === i ? null : i)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '16px 0', color: cs.color, fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
                      {open === i ? '▴ Hide Details' : '▾ Read Full Case Study'}
                    </button>
                  </div>

                  <div style={{ overflow: 'hidden', maxHeight: open === i ? 600 : 0, transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div style={{ padding: '0 clamp(24px,4vw,36px) 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 32, borderTop: '1px solid rgba(5,5,69,0.06)' }}>
                      <div style={{ paddingTop: 24 }}>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: '#0d0d2b', marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>The Challenge</h3>
                        <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.65)', lineHeight: 1.7 }}>{cs.challenge}</p>
                      </div>
                      <div style={{ paddingTop: 24 }}>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: '#0d0d2b', marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Our Solution</h3>
                        <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.65)', lineHeight: 1.7, marginBottom: 16 }}>{cs.solution}</p>
                        <div>{cs.tech.map((t, ti) => <span key={ti} className="tech-chip">{t}</span>)}</div>
                      </div>
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
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', marginBottom: 12 }}>Let's write your success story</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28 }}>Bring your challenge to us. We'll help you figure out if we're the right team to solve it.</p>
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
