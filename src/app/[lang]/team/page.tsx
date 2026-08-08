'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import PageBanner from '@/components/PageBanner';

const COLORS = { navy: '#050545', blue: '#0017E3', cyan: '#FF0008', green: '#0E62A2', yellow: '#D30000' };

function ScrollReveal({ children, delay = 0, direction = 'up', style }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' | 'fade', style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const t: Record<string, string> = { up: 'translateY(36px)', left: 'translateX(-36px)', right: 'translateX(36px)', fade: 'scale(0.96)' };
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : t[direction], transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

const TEAM = [
  { name: 'Sophea Chan', role: 'CEO & Co-Founder', emoji: '👨‍💼', color: COLORS.cyan, bio: 'Formerly VP of Engineering at a Singapore fintech, Sophea returned to Cambodia to build the country\'s leading software firm. He holds a BSc in Computer Science from RUPP and an MBA from INSEAD.', skills: ['Strategic Vision', 'Enterprise Architecture', 'Fintech', 'Fundraising'] },
  { name: 'Dara Lim', role: 'CTO & Co-Founder', emoji: '🧑‍💻', color: COLORS.blue, bio: 'Full-stack architect with 12 years building high-traffic platforms. Dara leads our engineering culture, technical hiring, and architecture decisions across all client engagements.', skills: ['System Architecture', 'Cloud Infrastructure', 'React/Node.js', 'Team Leadership'] },
  { name: 'Sreymom Prak', role: 'Head of Design', emoji: '🎨', color: COLORS.yellow, bio: 'UX researcher and visual designer trained in Singapore and Berlin. Sreymom leads our design practice and ensures every product we ship is both beautiful and genuinely usable.', skills: ['UX Research', 'Figma', 'Design Systems', 'Usability Testing'] },
  { name: 'Kosal Khim', role: 'Head of Mobile', emoji: '📱', color: COLORS.green, bio: 'React Native and Flutter specialist who has published 15+ apps on the App Store and Play Store. Kosal leads our mobile team across iOS, Android, and cross-platform projects.', skills: ['React Native', 'Flutter', 'iOS/Android', 'Firebase'] },
  { name: 'Nita Ros', role: 'Head of Project Delivery', emoji: '📋', color: COLORS.cyan, bio: 'PMP-certified project manager who has delivered 30+ enterprise projects across banking, healthcare, and government. Nita ensures we always deliver on time and on budget.', skills: ['Agile / Scrum', 'Risk Management', 'Client Relations', 'Enterprise PM'] },
  { name: 'Visal Meas', role: 'Lead Security Engineer', emoji: '🔐', color: COLORS.blue, bio: 'OSCP-certified penetration tester and security architect. Visal has audited systems for Cambodia\'s largest banks and government agencies, keeping sensitive data safe.', skills: ['Penetration Testing', 'OWASP', 'DevSecOps', 'Compliance'] },
  { name: 'Chantrea Vong', role: 'Head of Cloud & DevOps', emoji: '☁️', color: COLORS.yellow, bio: 'AWS-certified solutions architect managing infrastructure for clients processing millions of transactions daily. Chantrea drives our cloud-first and IaC methodologies.', skills: ['AWS / GCP', 'Terraform', 'Kubernetes', 'CI/CD'] },
  { name: 'Ratana Sok', role: 'Backend Lead', emoji: '⚙️', color: COLORS.green, bio: 'Expert in high-performance backend systems, API design, and database optimisation. Ratana has built systems serving 500K+ concurrent users for Cambodia\'s largest platforms.', skills: ['Node.js', 'Python', 'PostgreSQL', 'System Design'] },
];

const VALUES = [
  { icon: '🎯', title: 'Outcome-Focused', desc: 'We measure success by the results we create for your business — not lines of code written.' },
  { icon: '🤝', title: 'Partnership Mindset', desc: 'We behave like a member of your team, not a vendor. Your success is our success.' },
  { icon: '📣', title: 'Radical Transparency', desc: 'No surprises. We communicate early and often about risks, timelines, and trade-offs.' },
  { icon: '🌱', title: 'Continuous Growth', desc: 'Every engineer on our team dedicates 20% of their time to learning and improving their craft.' },
];

export default function TeamPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
    .team-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
    .team-card { background: rgba(255,255,255,0.92); border: 1px solid rgba(5,5,69,0.07); border-radius: 20px; overflow: hidden; box-shadow: 0 4px 16px rgba(5,5,69,0.05); transition: all 0.3s ease; }
    .team-card:hover { transform: translateY(-6px); box-shadow: 0 20px 56px rgba(5,5,69,0.1); }
    .skill-tag { display: inline-flex; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 100px; background: rgba(5,5,69,0.05); color: rgba(5,5,69,0.6); margin: 2px; }
    .value-card { background: rgba(255,255,255,0.92); border: 1px solid rgba(5,5,69,0.07); border-radius: 18px; padding: 28px; text-align: center; box-shadow: 0 4px 16px rgba(5,5,69,0.05); }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge="Leadership Team"
        title="The People Behind"
        titleHighlight="Every Project"
        subtitle="We're a team of 40+ engineers, designers, and strategists — united by a shared passion for using technology to solve Cambodia's most complex business challenges."
        accentColor={COLORS.cyan}
        accentColor2={COLORS.blue}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="team-container">
          {/* Stats */}
          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(180px,100%),1fr))', borderRadius: 20, overflow: 'hidden', background: 'white', border: '1px solid rgba(5,5,69,0.06)', boxShadow: '0 4px 24px rgba(5,5,69,0.06)', margin: '48px 0' }}>
              {[
                { val: '40+', label: 'Team Members', color: COLORS.cyan },
                { val: '12', label: 'Nationalities', color: COLORS.green },
                { val: '8', label: 'AWS Certifications', color: COLORS.yellow },
                { val: '4', label: 'Office Locations', color: COLORS.blue },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: 'clamp(20px,4vw,36px) 20px', borderRight: i < 3 ? '1px solid rgba(5,5,69,0.05)' : 'none' }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: 'rgba(26,26,46,0.5)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Values */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,38px)', color: '#0d0d2b', marginBottom: 12 }}>
                Our <span style={{ background: 'linear-gradient(135deg,#0017E3,#FF0008)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Core Values</span>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(240px,100%),1fr))', gap: 20, marginBottom: 80 }}>
            {VALUES.map((v, i) => (
              <ScrollReveal key={i} delay={i * 70} direction="up">
                <div className="value-card">
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{v.icon}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: '#0d0d2b', marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.6)', lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Leadership */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,38px)', color: '#0d0d2b', marginBottom: 12 }}>Meet the <span style={{ background: 'linear-gradient(135deg,#0017E3,#FF0008)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Leadership</span></h2>
              <p style={{ color: 'rgba(26,26,46,0.55)', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>Our leadership team brings together decades of experience across software, finance, design, and technology consulting.</p>
            </div>
          </ScrollReveal>

          <style>{`
            .expert-scroll-container::-webkit-scrollbar { display: none; }
          `}</style>
          <div className="expert-scroll-container" style={{ display: 'flex', gap: 24, marginBottom: 80, overflowX: 'auto', paddingBottom: 32, scrollSnapType: 'x mandatory', msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            {TEAM.map((member, i) => (
              <div key={i} style={{ width: 'min(360px, 85vw)', flexShrink: 0, scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column' }}>
                <ScrollReveal delay={i * 60} direction="up" style={{ height: '100%' }}>
                  <div className="team-card" style={{ height: '100%' }}>
                    {/* Header banner */}
                    <div style={{ height: 120, background: `linear-gradient(135deg,${member.color}20,${member.color}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, borderBottom: `1px solid ${member.color}15` }}>
                      {member.emoji}
                    </div>
                    <div style={{ padding: 24 }}>
                      <div style={{ marginBottom: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: member.color }}>{member.role}</span>
                      </div>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: '#0d0d2b', marginBottom: 12 }}>{member.name}</h3>
                      <p style={{ fontSize: 13, color: 'rgba(26,26,46,0.6)', lineHeight: 1.65, marginBottom: 16 }}>{member.bio}</p>
                      <div>{member.skills.map((s, si) => <span key={si} className="skill-tag">{s}</span>)}</div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal>
            <div style={{ padding: 'clamp(40px,6vw,64px)', borderRadius: 24, background: 'linear-gradient(135deg,#050545,#0E62A2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: COLORS.cyan, filter: 'blur(120px)', opacity: 0.1, top: '-100px', right: '-50px', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', marginBottom: 12 }}>Want to join our team?</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>We're always looking for talented engineers, designers, and project managers to join our growing team.</p>
                <a href={`/${language}/careers`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'linear-gradient(135deg,#0ABADF,#0E62A2)', color: '#fff', textDecoration: 'none', boxShadow: '0 4px 20px rgba(10,186,223,0.4)' }}>
                  View Open Positions →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}
