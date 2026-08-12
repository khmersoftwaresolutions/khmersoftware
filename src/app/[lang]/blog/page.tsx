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
const ServerIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="6" cy="18" r="1" fill="currentColor" stroke="none"/></svg>;
const CodeIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const PenToolIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="1.5" fill="currentColor" stroke="none"/></svg>;
const CloudIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/></svg>;
const SmartphoneIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="0.5" fill="currentColor"/><line x1="9" y1="6" x2="15" y2="6" strokeOpacity="0.5"/></svg>;
const ShieldIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
const BarChartIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>;
const GlobeIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12" strokeOpacity="0.4"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const ZapIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;

function IconBox({ color, Icon, size = 72 }: { color: string; Icon: React.FC; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size > 80 ? 24 : 18, background: `linear-gradient(135deg, ${color}22, ${color}0d)`, border: `1.5px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
      <Icon />
    </div>
  );
}

const CATEGORIES = ['All', 'Engineering', 'Design', 'Business', 'Cloud', 'Security', 'Mobile'];

type Post = { title: string; cat: string; readTime: string; date: string; color: string; Icon: React.FC; excerpt: string };

const POSTS: Post[] = [
  { title: 'Building a Multi-Tenant SaaS on AWS: Lessons from the Trenches', cat: 'Engineering', readTime: '8 min read', date: 'Aug 2025', color: COLORS.cyan, Icon: ServerIcon, excerpt: 'After deploying our 10th multi-tenant application, we\'ve collected hard-won lessons on schema isolation, IAM design, and tenant-aware caching strategies. Here\'s what we wish we\'d known on day one.' },
  { title: 'Why We Switched from REST to GraphQL (and When We Switched Back)', cat: 'Engineering', readTime: '6 min read', date: 'Jul 2025', color: COLORS.blue, Icon: CodeIcon, excerpt: 'GraphQL promises flexible data fetching, but it comes with real costs in complexity and caching. This is the story of our journey and the decision framework we now use for every new API.' },
  { title: 'Designing for Low-Literacy Users: UX Lessons from Rural Cambodia', cat: 'Design', readTime: '10 min read', date: 'Jul 2025', color: COLORS.yellow, Icon: PenToolIcon, excerpt: 'When building a government services app used by farmers in Kampong Chhnang, we discovered that standard UX patterns completely failed. Here\'s how we redesigned for accessibility in the real world.' },
  { title: 'How We Reduced Cloud Costs by 43% Without Touching a Line of Code', cat: 'Cloud', readTime: '7 min read', date: 'Jun 2025', color: COLORS.green, Icon: CloudIcon, excerpt: 'Reserved Instances, Spot Fleet for batch jobs, S3 Intelligent-Tiering, and one surprisingly impactful change to our NAT Gateway setup. A detailed breakdown of every optimisation.' },
  { title: 'React Native vs Flutter in 2025: A Practitioner\'s Honest Comparison', cat: 'Mobile', readTime: '12 min read', date: 'Jun 2025', color: COLORS.cyan, Icon: SmartphoneIcon, excerpt: 'We\'ve shipped production apps with both. No theoretical comparisons — just real-world experience on performance, developer experience, ecosystem maturity, and hiring.' },
  { title: 'Penetration Testing a Cambodian Bank: What We Found', cat: 'Security', readTime: '9 min read', date: 'May 2025', color: COLORS.navy, Icon: ShieldIcon, excerpt: 'A (sanitised) account of the vulnerabilities we discovered during a recent pen test engagement. Key findings, root causes, and the systematic fixes that followed.' },
  { title: 'The True Cost of Technical Debt: A Framework for Business Leaders', cat: 'Business', readTime: '8 min read', date: 'May 2025', color: COLORS.blue, Icon: BarChartIcon, excerpt: 'Technical debt is often invisible to executives until it causes a crisis. Here\'s how we help business leaders quantify, prioritise, and communicate technical debt to boards and investors.' },
  { title: 'Khmer Language Support in Web Apps: A Complete Developer Guide', cat: 'Engineering', readTime: '11 min read', date: 'Apr 2025', color: COLORS.green, Icon: GlobeIcon, excerpt: 'RTL isn\'t the issue — Khmer is complex in different ways. Font rendering, Unicode handling, input methods, and testing strategies for robust Khmer language support in modern web apps.' },
  { title: 'DevOps Culture at 40 People: How We Scaled Our Engineering Practices', cat: 'Engineering', readTime: '7 min read', date: 'Apr 2025', color: COLORS.yellow, Icon: ZapIcon, excerpt: 'From two engineers sharing a single server to 40 people running 60+ client environments. The specific practices, tools, and cultural shifts that made it work.' },
];

export default function BlogPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const filtered = filter === 'All' ? POSTS : POSTS.filter(p => p.cat === filter);

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
    .blog-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
    .blog-card { background: rgba(255,255,255,0.92); border: 1px solid rgba(5,5,69,0.07); border-radius: 20px; overflow: hidden; box-shadow: 0 4px 16px rgba(5,5,69,0.05); transition: all 0.3s ease; cursor: pointer; display: flex; flex-direction: column; }
    .blog-card:hover { transform: translateY(-6px); box-shadow: 0 20px 56px rgba(5,5,69,0.1); }
    .filter-btn { padding: 8px 18px; border-radius: 100px; border: 1.5px solid rgba(5,5,69,0.1); background: white; color: rgba(5,5,69,0.6); font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.25s ease; }
    .filter-btn:hover, .filter-btn.active { background: #050545; color: white; border-color: #050545; }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge="Engineering Blog"
        title="Insights From"
        titleHighlight="Our Engineers"
        subtitle="Deep technical articles, case studies, and lessons learned from building software for Cambodia's most demanding businesses — written by the engineers who built it."
        accentColor={COLORS.cyan}
        accentColor2={COLORS.blue}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="blog-container">
          {/* Filter */}
          <ScrollReveal>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', padding: '48px 0 40px' }}>
              {CATEGORIES.map(f => (
                <button key={f} className={`filter-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </ScrollReveal>

          {/* Featured post */}
          {filter === 'All' && (
            <ScrollReveal>
              <div style={{ background: 'white', border: '1px solid rgba(5,5,69,0.07)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 40px rgba(5,5,69,0.08)', marginBottom: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))' }}>
                <div style={{ minHeight: 240, background: `linear-gradient(135deg,${POSTS[0].color}12,${POSTS[0].color}05)`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid rgba(5,5,69,0.05)' }}>
                  <IconBox color={POSTS[0].color} Icon={POSTS[0].Icon} size={96} />
                </div>
                <div style={{ padding: 'clamp(24px,4vw,40px)' }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 100, background: `${COLORS.cyan}12`, color: COLORS.cyan }}>{POSTS[0].cat}</span>
                    <span style={{ fontSize: 12, color: 'rgba(26,26,46,0.4)' }}>{POSTS[0].readTime} · {POSTS[0].date}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(20px,3vw,28px)', color: '#0d0d2b', marginBottom: 16, lineHeight: 1.3 }}>{POSTS[0].title}</h2>
                  <p style={{ fontSize: 15, color: 'rgba(26,26,46,0.6)', lineHeight: 1.7, marginBottom: 24 }}>{POSTS[0].excerpt}</p>
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 14, color: COLORS.cyan, textDecoration: 'none' }}>
                    Read Article →
                  </a>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Post grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 24 }}>
            {(filter === 'All' ? filtered.slice(1) : filtered).map((post, i) => (
              <ScrollReveal key={post.title} delay={i * 60}>
                <div className="blog-card">
                  <div style={{ height: 148, background: `linear-gradient(135deg,${post.color}12,${post.color}05)`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `1px solid ${post.color}12` }}>
                    <IconBox color={post.color} Icon={post.Icon} size={68} />
                  </div>
                  <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center', flexWrap: 'wrap' as const }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 100, background: `${post.color}10`, color: post.color }}>{post.cat}</span>
                      <span style={{ fontSize: 11, color: 'rgba(26,26,46,0.4)' }}>{post.readTime} · {post.date}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: '#0d0d2b', marginBottom: 10, lineHeight: 1.3, flex: 1 }}>{post.title}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(26,26,46,0.6)', lineHeight: 1.6, marginBottom: 16 }}>{post.excerpt.substring(0, 120)}...</p>
                    <a href="#" style={{ fontSize: 13, fontWeight: 700, color: post.color, textDecoration: 'none' }}>Read More →</a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Newsletter CTA */}
          <ScrollReveal delay={100}>
            <div style={{ marginTop: 80, padding: 'clamp(40px,6vw,64px)', borderRadius: 24, background: 'linear-gradient(135deg,#050545,#0E62A2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: COLORS.cyan, filter: 'blur(120px)', opacity: 0.1, top: '-100px', right: '-50px', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', marginBottom: 12 }}>Subscribe to our newsletter</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28 }}>One article per week — deep dives on engineering, design, and building software in Cambodia.</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <input type="email" placeholder="your@email.com" style={{ padding: '13px 20px', borderRadius: 100, border: 'none', fontSize: 14, width: 260, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
                  <button style={{ padding: '13px 28px', borderRadius: 100, background: 'linear-gradient(135deg,#0ABADF,#0E62A2)', color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Subscribe</button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}
