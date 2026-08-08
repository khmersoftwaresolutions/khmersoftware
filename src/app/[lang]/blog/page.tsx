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

const CATEGORIES = ['All', 'Engineering', 'Design', 'Business', 'Cloud', 'Security', 'Mobile'];

const POSTS = [
  { title: 'Building a Multi-Tenant SaaS on AWS: Lessons from the Trenches', cat: 'Engineering', readTime: '8 min read', date: 'Aug 2025', color: COLORS.cyan, emoji: '🏗️', excerpt: 'After deploying our 10th multi-tenant application, we\'ve collected hard-won lessons on schema isolation, IAM design, and tenant-aware caching strategies. Here\'s what we wish we\'d known on day one.' },
  { title: 'Why We Switched from REST to GraphQL (and When We Switched Back)', cat: 'Engineering', readTime: '6 min read', date: 'Jul 2025', color: COLORS.blue, emoji: '🔄', excerpt: 'GraphQL promises flexible data fetching, but it comes with real costs in complexity and caching. This is the story of our journey and the decision framework we now use for every new API.' },
  { title: 'Designing for Low-Literacy Users: UX Lessons from Rural Cambodia', cat: 'Design', readTime: '10 min read', date: 'Jul 2025', color: COLORS.yellow, emoji: '🎨', excerpt: 'When building a government services app used by farmers in Kampong Chhnang, we discovered that standard UX patterns completely failed. Here\'s how we redesigned for accessibility in the real world.' },
  { title: 'How We Reduced Cloud Costs by 43% Without Touching a Line of Code', cat: 'Cloud', readTime: '7 min read', date: 'Jun 2025', color: COLORS.green, emoji: '💰', excerpt: 'Reserved Instances, Spot Fleet for batch jobs, S3 Intelligent-Tiering, and one surprisingly impactful change to our NAT Gateway setup. A detailed breakdown of every optimisation.' },
  { title: 'React Native vs Flutter in 2025: A Practitioner\'s Honest Comparison', cat: 'Mobile', readTime: '12 min read', date: 'Jun 2025', color: COLORS.cyan, emoji: '📱', excerpt: 'We\'ve shipped production apps with both. No theoretical comparisons — just real-world experience on performance, developer experience, ecosystem maturity, and hiring.' },
  { title: 'Penetration Testing a Cambodian Bank: What We Found', cat: 'Security', readTime: '9 min read', date: 'May 2025', color: COLORS.navy, emoji: '🔐', excerpt: 'A (sanitised) account of the vulnerabilities we discovered during a recent pen test engagement. Key findings, root causes, and the systematic fixes that followed.' },
  { title: 'The True Cost of Technical Debt: A Framework for Business Leaders', cat: 'Business', readTime: '8 min read', date: 'May 2025', color: COLORS.blue, emoji: '📊', excerpt: 'Technical debt is often invisible to executives until it causes a crisis. Here\'s how we help business leaders quantify, prioritise, and communicate technical debt to boards and investors.' },
  { title: 'Khmer Language Support in Web Apps: A Complete Developer Guide', cat: 'Engineering', readTime: '11 min read', date: 'Apr 2025', color: COLORS.green, emoji: '🇰🇭', excerpt: 'RTL isn\'t the issue — Khmer is complex in different ways. Font rendering, Unicode handling, input methods, and testing strategies for robust Khmer language support in modern web apps.' },
  { title: 'DevOps Culture at 40 People: How We Scaled Our Engineering Practices', cat: 'Engineering', readTime: '7 min read', date: 'Apr 2025', color: COLORS.yellow, emoji: '🚀', excerpt: 'From two engineers sharing a single server to 40 people running 60+ client environments. The specific practices, tools, and cultural shifts that made it work.' },
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
                <div style={{ height: 280, background: `linear-gradient(135deg,${COLORS.cyan}20,${COLORS.blue}20)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 100 }}>
                  {POSTS[0].emoji}
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
                  <div style={{ height: 140, background: `linear-gradient(135deg,${post.color}18,${post.color}06)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, borderBottom: `1px solid ${post.color}12` }}>
                    {post.emoji}
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
