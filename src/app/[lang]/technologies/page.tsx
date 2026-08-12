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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
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

const TECH_CATEGORIES = [
  {
    title: 'Frontend Development',
    icon: '🖥️',
    color: COLORS.cyan,
    desc: 'We craft blazing-fast, pixel-perfect user interfaces using the latest frontend frameworks and design systems.',
    techs: [
      { name: 'React & Next.js', detail: 'Server-side rendering, static generation, and full-stack React apps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Vue & Nuxt', detail: 'Progressive framework for building modern web applications', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
      { name: 'TypeScript', detail: 'Type-safe JavaScript for large-scale application development', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'Tailwind CSS', detail: 'Utility-first CSS framework for rapid UI development', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: '⚙️',
    color: COLORS.green,
    desc: 'Scalable, secure server-side solutions built with performance and maintainability at their core.',
    techs: [
      { name: 'Node.js', detail: 'High-performance JavaScript runtime for scalable backend services', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Python & Django', detail: 'Rapid development with clean, pragmatic design', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'Go', detail: 'Compiled, concurrent language for high-throughput microservices', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg' },
      { name: 'GraphQL & REST', detail: 'Flexible API design for web and mobile clients', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: '☁️',
    color: COLORS.blue,
    desc: 'Cloud-native infrastructure that scales automatically and never sleeps — with zero-downtime deployments.',
    techs: [
      { name: 'AWS', detail: 'EC2, RDS, Lambda, S3, CloudFront and the full AWS ecosystem', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { name: 'Docker & Kubernetes', detail: 'Container orchestration for production-grade microservices', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'CI/CD Pipelines', detail: 'GitHub Actions, Jenkins — automated test and deploy workflows', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: 'Terraform', detail: 'Infrastructure as code for reproducible cloud environments', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg' },
    ],
  },
  {
    title: 'Databases & Storage',
    icon: '🗄️',
    color: COLORS.yellow,
    desc: 'From relational to NoSQL and time-series — we choose the right storage technology for your data model.',
    techs: [
      { name: 'PostgreSQL', detail: 'The world\'s most advanced open-source relational database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB', detail: 'Flexible document database for modern applications', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'Redis', detail: 'In-memory caching and real-time data structures', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
      { name: 'MySQL', detail: 'Reliable, proven relational database used across Cambodia\'s enterprise sector', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    ],
  },
  {
    title: 'Mobile Development',
    icon: '📱',
    color: COLORS.cyan,
    desc: 'Native and cross-platform mobile apps that deliver a seamless experience on iOS and Android.',
    techs: [
      { name: 'React Native', detail: 'Cross-platform mobile apps sharing code with your web app', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Flutter', detail: 'Google\'s UI toolkit for natively compiled mobile, web and desktop', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
      { name: 'Swift (iOS)', detail: 'Native iOS development for maximum performance', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg' },
      { name: 'Kotlin (Android)', detail: 'Modern, concise Android development', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg' },
    ],
  },
  {
    title: 'AI & Data',
    icon: '🤖',
    color: COLORS.green,
    desc: 'Intelligent features powered by machine learning — from predictive analytics to natural language processing.',
    techs: [
      { name: 'TensorFlow & PyTorch', detail: 'Deep learning frameworks for custom AI model development', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
      { name: 'OpenAI APIs', detail: 'GPT-4 integration for chatbots, summarization and content generation', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'Apache Spark', detail: 'Large-scale data processing for analytics pipelines', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg' },
      { name: 'Elasticsearch', detail: 'Full-text search and analytics engine', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg' },
    ],
  },
];

export default function TechnologiesPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
    .tech-page-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
    .tech-section-label { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #0ABADF; padding: 6px 14px; background: rgba(10,186,223,0.08); border: 1px solid rgba(10,186,223,0.2); border-radius: 100px; margin-bottom: 16px; }
    .tech-cat-card { background: rgba(255,255,255,0.9); border: 1px solid rgba(5,5,69,0.07); border-radius: 24px; padding: clamp(24px,4vw,40px); box-shadow: 0 4px 24px rgba(5,5,69,0.06); transition: box-shadow 0.3s; }
    .tech-cat-card:hover { box-shadow: 0 12px 48px rgba(5,5,69,0.1); }
    .tech-item { display: flex; align-items: flex-start; gap: 14px; padding: 16px; border-radius: 14px; background: rgba(5,5,69,0.02); border: 1px solid rgba(5,5,69,0.06); transition: all 0.3s ease; cursor: default; }
    .tech-item:hover { background: rgba(10,186,223,0.04); border-color: rgba(10,186,223,0.2); transform: translateY(-2px); }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge="Our Technology Stack"
        title="Built With"
        titleHighlight="World-Class Tools"
        subtitle="We choose the best technology for each challenge — not the most popular. Here's the curated stack we use to build reliable, scalable software across Cambodia and beyond."
        ctaLabel="Discuss Your Stack"
        ctaHref={`/${language}/contact`}
        accentColor={COLORS.cyan}
        accentColor2={COLORS.blue}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="tech-page-container">
          {/* Intro */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', padding: '72px 0 48px' }}>
              <div className="tech-section-label">Why it matters</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4vw,40px)', color: '#0d0d2b', marginBottom: 16 }}>
                Technology That <span style={{ background: 'linear-gradient(135deg,#0ABADF,#0E62A2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Scales With You</span>
              </h2>
              <p style={{ color: 'rgba(26,26,46,0.55)', fontSize: 16, maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
                Every technology in our stack was chosen after rigorous evaluation for performance, security, community support, and long-term maintainability.
              </p>
            </div>
          </ScrollReveal>

          {/* Tech Categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {TECH_CATEGORIES.map((cat, ci) => (
              <ScrollReveal key={ci} delay={ci * 60} direction={ci % 2 === 0 ? 'left' : 'right'}>
                <div className="tech-cat-card">
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: `${cat.color}15`, border: `1px solid ${cat.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>{cat.icon}</div>
                    <div>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: '#0d0d2b', marginBottom: 4 }}>{cat.title}</h3>
                      <p style={{ color: 'rgba(26,26,46,0.55)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{cat.desc}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', width: 48, height: 4, borderRadius: 2, background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
                  </div>
                  {/* Tech grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px,100%),1fr))', gap: 12 }}>
                    {cat.techs.map((tech, ti) => (
                      <div key={ti} className="tech-item">
                        <img src={tech.logo} alt={tech.name} style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: '#0d0d2b', marginBottom: 3 }}>{tech.name}</div>
                          <div style={{ fontSize: 12, color: 'rgba(26,26,46,0.5)', lineHeight: 1.5 }}>{tech.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={100}>
            <div style={{ marginTop: 80, padding: 'clamp(40px,6vw,64px)', borderRadius: 24, background: 'linear-gradient(135deg,#050545,#0E62A2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: '#0ABADF', filter: 'blur(120px)', opacity: 0.1, top: '-100px', right: '-50px', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,36px)', color: '#fff', marginBottom: 12 }}>Not sure which stack is right for you?</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>Our architects will help you choose the right technology for your use case — for free.</p>
                <a href={`/${language}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'linear-gradient(135deg,#0ABADF,#0E62A2)', color: '#fff', textDecoration: 'none', boxShadow: '0 4px 20px rgba(10,186,223,0.4)' }}>
                  Get a Free Consultation →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}
