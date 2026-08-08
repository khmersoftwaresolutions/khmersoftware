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

const JOBS = [
  { title: 'Senior Full-Stack Engineer', dept: 'Engineering', type: 'Full-time', location: 'Phnom Penh / Remote', color: COLORS.cyan, tags: ['React', 'Node.js', 'PostgreSQL', '5+ yrs'], desc: 'Own end-to-end features across web and API for multiple client platforms. You\'ll work in small teams with high autonomy and direct client interaction.' },
  { title: 'React Native Developer', dept: 'Mobile', type: 'Full-time', location: 'Phnom Penh', color: COLORS.green, tags: ['React Native', 'iOS', 'Android', '3+ yrs'], desc: 'Build cross-platform mobile apps for clients across banking, retail, and healthcare. Experience with offline-first architecture is a plus.' },
  { title: 'UI/UX Designer', dept: 'Design', type: 'Full-time', location: 'Phnom Penh / Remote', color: COLORS.yellow, tags: ['Figma', 'User Research', 'Prototyping', '3+ yrs'], desc: 'Lead end-to-end design for client products — from research and wireframes through to high-fidelity UI and developer handoff.' },
  { title: 'DevOps / Cloud Engineer', dept: 'Infrastructure', type: 'Full-time', location: 'Phnom Penh', color: COLORS.blue, tags: ['AWS', 'Kubernetes', 'Terraform', '4+ yrs'], desc: 'Own cloud infrastructure for multiple client environments. You\'ll implement CI/CD pipelines, monitoring, and disaster recovery solutions.' },
  { title: 'Project Manager', dept: 'Delivery', type: 'Full-time', location: 'Phnom Penh', color: COLORS.cyan, tags: ['Agile', 'PMP preferred', 'Enterprise', '4+ yrs'], desc: 'Lead delivery of complex, multi-stakeholder software projects. You\'ll own timelines, client relationships, and sprint ceremonies.' },
  { title: 'Backend Engineer (Python)', dept: 'Engineering', type: 'Full-time', location: 'Phnom Penh / Remote', color: COLORS.green, tags: ['Python', 'Django', 'PostgreSQL', '3+ yrs'], desc: 'Design and build RESTful APIs, background jobs, and data pipelines for enterprise clients across healthcare and finance.' },
];

const PERKS = [
  { icon: '💰', title: 'Competitive Salary', desc: 'Market-rate salaries benchmarked against Singapore and Bangkok — with performance bonuses.' },
  { icon: '🏠', title: 'Remote-Friendly', desc: 'Most roles are fully remote or hybrid. We care about output, not hours at a desk.' },
  { icon: '📚', title: 'Learning Budget', desc: '$1,200 USD / year for courses, certifications, conferences, and books.' },
  { icon: '🏥', title: 'Health Insurance', desc: 'Full private health insurance for you and your immediate family, from day one.' },
  { icon: '⏰', title: 'Flexible Hours', desc: 'Core hours 10am–4pm. Outside of that, work when you\'re most productive.' },
  { icon: '🌴', title: '20 Days Annual Leave', desc: 'Plus all Cambodian public holidays. We believe in proper rest.' },
];

export default function CareersPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [openJob, setOpenJob] = useState<number | null>(null);

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
    .careers-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
    .job-card { background: rgba(255,255,255,0.92); border: 1px solid rgba(5,5,69,0.07); border-radius: 18px; overflow: hidden; box-shadow: 0 4px 16px rgba(5,5,69,0.05); transition: all 0.3s ease; cursor: pointer; }
    .job-card:hover { box-shadow: 0 12px 40px rgba(5,5,69,0.1); }
    .job-tag { display: inline-flex; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 6px; background: rgba(5,5,69,0.05); color: rgba(5,5,69,0.6); margin: 2px; }
    .perk-card { background: rgba(255,255,255,0.92); border: 1px solid rgba(5,5,69,0.07); border-radius: 18px; padding: clamp(20px,3vw,28px); text-align: center; box-shadow: 0 4px 16px rgba(5,5,69,0.05); }
    .apply-btn { display: inline-flex; align-items: center; gap: 8px; padding: '10px 24px'; border-radius: 100px; font-weight: 600; font-size: 13px; background: linear-gradient(135deg,#0ABADF,#0E62A2); color: white; text-decoration: none; border: none; cursor: pointer; }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge="Careers at KhmerSoftware"
        title="Build the Future of"
        titleHighlight="Tech in Cambodia"
        subtitle="Join a team of ambitious engineers, designers, and builders working on projects that matter — for Cambodia's biggest brands and fastest-growing startups."
        accentColor={COLORS.green}
        accentColor2={COLORS.cyan}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="careers-container">
          {/* Culture Section */}
          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: 48, alignItems: 'center', padding: '72px 0 64px' }}>
              <div>
                <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: COLORS.green, padding: '6px 14px', background: 'rgba(81,180,28,0.08)', border: '1px solid rgba(81,180,28,0.2)', borderRadius: 100, marginBottom: 16 }}>Our Culture</div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4vw,40px)', color: '#0d0d2b', marginBottom: 20, lineHeight: 1.2 }}>A Place Where Great Engineers <span style={{ background: 'linear-gradient(135deg,#51B41C,#0ABADF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Thrive</span></h2>
                <p style={{ color: 'rgba(26,26,46,0.6)', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>We believe the best software comes from happy, empowered, and continually-growing engineers. We invest heavily in our team's professional development, wellbeing, and work-life balance.</p>
                <p style={{ color: 'rgba(26,26,46,0.6)', fontSize: 16, lineHeight: 1.8 }}>Small teams, big autonomy. You'll own features end-to-end and have a direct impact on Cambodia's digital economy.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { emoji: '🇰🇭', stat: '70%', label: 'Cambodian team' },
                  { emoji: '⭐', stat: '4.8/5', label: 'Glassdoor rating' },
                  { emoji: '📈', stat: '85%', label: 'Internal promotions' },
                  { emoji: '🔄', stat: '<5%', label: 'Annual turnover' },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'white', border: '1px solid rgba(5,5,69,0.07)', borderRadius: 16, padding: '20px', textAlign: 'center', boxShadow: '0 2px 12px rgba(5,5,69,0.04)' }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{item.emoji}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, color: '#0d0d2b' }}>{item.stat}</div>
                    <div style={{ fontSize: 12, color: 'rgba(26,26,46,0.5)', fontWeight: 600, marginTop: 4 }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Perks */}
          <ScrollReveal>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,36px)', color: '#0d0d2b', marginBottom: 32, textAlign: 'center' }}>
              Benefits & <span style={{ background: 'linear-gradient(135deg,#51B41C,#0ABADF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Perks</span>
            </h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))', gap: 16, marginBottom: 80 }}>
            {PERKS.map((p, i) => (
              <ScrollReveal key={i} delay={i * 60} direction="up">
                <div className="perk-card">
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{p.icon}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: '#0d0d2b', marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.6)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Open Roles */}
          <ScrollReveal>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,36px)', color: '#0d0d2b', marginBottom: 8, textAlign: 'center' }}>
              Open <span style={{ background: 'linear-gradient(135deg,#51B41C,#0ABADF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Positions</span>
            </h2>
            <p style={{ color: 'rgba(26,26,46,0.5)', fontSize: 15, textAlign: 'center', marginBottom: 40 }}>Click any role to see details and apply.</p>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 80 }}>
            {JOBS.map((job, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="job-card" onClick={() => setOpenJob(openJob === i ? null : i)}>
                  <div style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' as const }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${job.color}12`, border: `1px solid ${job.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: job.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: '#0d0d2b', marginBottom: 4 }}>{job.title}</h3>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: job.color, fontWeight: 700 }}>{job.dept}</span>
                        <span style={{ fontSize: 12, color: 'rgba(26,26,46,0.4)' }}>•</span>
                        <span style={{ fontSize: 12, color: 'rgba(26,26,46,0.5)' }}>{job.type}</span>
                        <span style={{ fontSize: 12, color: 'rgba(26,26,46,0.4)' }}>•</span>
                        <span style={{ fontSize: 12, color: 'rgba(26,26,46,0.5)' }}>📍 {job.location}</span>
                      </div>
                    </div>
                    <div style={{ color: job.color, fontSize: 20, transition: 'transform 0.3s', transform: openJob === i ? 'rotate(180deg)' : 'none' }}>▾</div>
                  </div>
                  {/* Expandable details */}
                  <div style={{ overflow: 'hidden', maxHeight: openJob === i ? 300 : 0, transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div style={{ padding: '0 28px 24px', borderTop: '1px solid rgba(5,5,69,0.06)' }}>
                      <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.65)', lineHeight: 1.7, margin: '16px 0' }}>{job.desc}</p>
                      <div style={{ marginBottom: 16 }}>{job.tags.map((t, ti) => <span key={ti} className="job-tag">{t}</span>)}</div>
                      <a href={`/${language}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 100, fontWeight: 600, fontSize: 13, background: `linear-gradient(135deg,${job.color},#0E62A2)`, color: '#fff', textDecoration: 'none' }}>
                        Apply for this Role →
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal>
            <div style={{ padding: 'clamp(40px,6vw,64px)', borderRadius: 24, background: 'linear-gradient(135deg,#050545,#0E62A2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: COLORS.cyan, filter: 'blur(120px)', opacity: 0.1, top: '-100px', right: '-50px', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', marginBottom: 12 }}>Don't see the right role?</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28 }}>Send us your CV anyway. We're always growing and looking for exceptional people.</p>
                <a href={`/${language}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'linear-gradient(135deg,#51B41C,#0ABADF)', color: '#fff', textDecoration: 'none' }}>
                  Send Your CV →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}
