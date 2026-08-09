'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import PageBanner from '@/components/PageBanner';

const COLORS = {
  navy: '#050545',
  ink: '#0d0d2b',
  blue: '#0E62A2',
  accent: '#0ABADF',
  border: 'rgba(5,5,69,0.08)',
  muted: 'rgba(26,26,46,0.6)',
};

// Muted, professional per-department accent — used only as a thin marker, never as a glow
const DEPT_COLOR: Record<string, string> = {
  Engineering: '#0E62A2',
  Mobile: '#3B7D4F',
  Design: '#946B1F',
  Infrastructure: '#3F4E9C',
  Delivery: '#0E62A2',
};

function ScrollReveal({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' | 'fade' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const t: Record<string, string> = { up: 'translateY(24px)', left: 'translateX(-24px)', right: 'translateX(24px)', fade: 'scale(0.98)' };
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : t[direction], transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

type Job = {
  title: string;
  dept: string;
  type: string;
  location: string;
  deadline: string;
  tags: string[];
  desc: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
};

const JOBS: Job[] = [
  {
    title: 'Senior Full-Stack Engineer',
    dept: 'Engineering',
    type: 'Full-time',
    location: 'Phnom Penh / Remote',
    deadline: '2026-06-12',
    tags: ['React', 'Node.js', 'PostgreSQL', '5+ yrs'],
    desc: 'Own end-to-end features across web and API for multiple client platforms. You\'ll work in small teams with high autonomy and direct client interaction.',
    responsibilities: [
      'Design, build, and ship features across the full stack, from database schema to production UI.',
      'Partner directly with clients and product stakeholders to scope work and set realistic delivery timelines.',
      'Review pull requests and mentor mid-level engineers on architecture and code quality.',
      'Identify performance bottlenecks and lead remediation across services and data layers.',
      'Contribute to technical planning for new client engagements, including estimation and risk assessment.',
    ],
    requirements: [
      '5+ years building production web applications with a modern JavaScript or TypeScript stack.',
      'Strong command of React and a Node.js-based backend framework.',
      'Working knowledge of relational databases (PostgreSQL or similar) and query optimization.',
      'Comfortable owning a feature from technical design through deployment and monitoring.',
      'Clear written and verbal communication for direct client-facing work.',
    ],
    niceToHave: [
      'Experience with infrastructure-as-code and CI/CD pipelines.',
      'Prior work in a consultancy or agency delivering multiple concurrent client projects.',
    ],
  },
  {
    title: 'React Native Developer',
    dept: 'Mobile',
    type: 'Full-time',
    location: 'Phnom Penh',
    deadline: '2026-05-28',
    tags: ['React Native', 'iOS', 'Android', '3+ yrs'],
    desc: 'Build cross-platform mobile apps for clients across banking, retail, and healthcare. Experience with offline-first architecture is a plus.',
    responsibilities: [
      'Develop and maintain cross-platform mobile applications using React Native.',
      'Implement offline-first data sync strategies for clients operating in low-connectivity environments.',
      'Work closely with backend engineers to define and consume REST and GraphQL APIs.',
      'Profile and optimize app performance across a range of device tiers.',
      'Coordinate with QA to define test plans and resolve platform-specific issues.',
    ],
    requirements: [
      '3+ years shipping production React Native applications on iOS and Android.',
      'Solid understanding of native module integration and platform-specific build tooling.',
      'Experience with state management patterns at scale (Redux, Zustand, or similar).',
      'Familiarity with app store submission and release processes for both platforms.',
    ],
    niceToHave: [
      'Exposure to native iOS (Swift) or Android (Kotlin) development.',
      'Experience in regulated industries such as banking or healthcare.',
    ],
  },
  {
    title: 'UI/UX Designer',
    dept: 'Design',
    type: 'Full-time',
    location: 'Phnom Penh / Remote',
    deadline: '2026-04-30',
    tags: ['Figma', 'User Research', 'Prototyping', '3+ yrs'],
    desc: 'Lead end-to-end design for client products — from research and wireframes through to high-fidelity UI and developer handoff.',
    responsibilities: [
      'Lead discovery and research to translate client requirements into clear product goals.',
      'Produce wireframes, prototypes, and high-fidelity UI for web and mobile products.',
      'Maintain and evolve design systems shared across multiple client engagements.',
      'Facilitate usability testing and iterate on designs based on findings.',
      'Partner with engineering during implementation to ensure design fidelity.',
    ],
    requirements: [
      '3+ years of product design experience with a strong portfolio of shipped work.',
      'Expert-level proficiency in Figma, including component and variant systems.',
      'Demonstrated experience conducting user research and usability testing.',
      'Ability to present and defend design decisions to non-design stakeholders.',
    ],
    niceToHave: [
      'Basic front-end coding literacy (HTML/CSS) for closer collaboration with engineers.',
      'Experience designing for both consumer and enterprise audiences.',
    ],
  },
  {
    title: 'DevOps / Cloud Engineer',
    dept: 'Infrastructure',
    type: 'Full-time',
    location: 'Phnom Penh',
    deadline: '2026-07-03',
    tags: ['AWS', 'Kubernetes', 'Terraform', '4+ yrs'],
    desc: 'Own cloud infrastructure for multiple client environments. You\'ll implement CI/CD pipelines, monitoring, and disaster recovery solutions.',
    responsibilities: [
      'Design and maintain cloud infrastructure across multiple client AWS accounts.',
      'Build and improve CI/CD pipelines to support frequent, reliable deployments.',
      'Implement monitoring, alerting, and incident response processes.',
      'Define and test disaster recovery and backup strategies for production systems.',
      'Enforce infrastructure security best practices and support client compliance audits.',
    ],
    requirements: [
      '4+ years in a DevOps, SRE, or cloud infrastructure role.',
      'Hands-on experience with AWS core services and Kubernetes in production.',
      'Proficiency with infrastructure-as-code tooling, particularly Terraform.',
      'Experience building CI/CD pipelines with tools such as GitHub Actions, GitLab CI, or Jenkins.',
    ],
    niceToHave: [
      'Relevant AWS certification (Solutions Architect or DevOps Engineer).',
      'Experience supporting clients in regulated or compliance-heavy industries.',
    ],
  },
  {
    title: 'Project Manager',
    dept: 'Delivery',
    type: 'Full-time',
    location: 'Phnom Penh',
    deadline: '2026-05-08',
    tags: ['Agile', 'PMP preferred', 'Enterprise', '4+ yrs'],
    desc: 'Lead delivery of complex, multi-stakeholder software projects. You\'ll own timelines, client relationships, and sprint ceremonies.',
    responsibilities: [
      'Own delivery of software projects from kickoff through launch and handover.',
      'Manage client relationships, including expectation-setting and status reporting.',
      'Run sprint planning, standups, and retrospectives across cross-functional teams.',
      'Track scope, budget, and timeline, escalating risks before they become blockers.',
      'Coordinate across engineering, design, and QA to keep delivery on schedule.',
    ],
    requirements: [
      '4+ years managing software delivery projects, ideally in a client-services setting.',
      'Strong working knowledge of Agile and Scrum methodologies.',
      'Proven ability to manage multiple concurrent projects and stakeholders.',
      'Excellent written and verbal communication skills in English.',
    ],
    niceToHave: [
      'PMP or equivalent project management certification.',
      'Experience with enterprise clients in finance, healthcare, or retail.',
    ],
  },
  {
    title: 'Backend Engineer (Python)',
    dept: 'Engineering',
    type: 'Full-time',
    location: 'Phnom Penh / Remote',
    deadline: '2026-06-25',
    tags: ['Python', 'Django', 'PostgreSQL', '3+ yrs'],
    desc: 'Design and build RESTful APIs, background jobs, and data pipelines for enterprise clients across healthcare and finance.',
    responsibilities: [
      'Design and implement RESTful APIs serving web and mobile clients.',
      'Build and maintain background job processing and data pipelines.',
      'Write and maintain automated tests to ensure system reliability.',
      'Optimize database schemas and queries for performance at scale.',
      'Participate in code reviews and contribute to backend architecture decisions.',
    ],
    requirements: [
      '3+ years of production experience with Python and Django or a comparable framework.',
      'Strong understanding of relational database design, particularly PostgreSQL.',
      'Experience designing and documenting RESTful APIs.',
      'Familiarity with automated testing practices and CI pipelines.',
    ],
    niceToHave: [
      'Experience in healthcare or financial services with data compliance requirements.',
      'Exposure to asynchronous task queues such as Celery.',
    ],
  },
];

// Clean 20x20 line icons — no emoji, single stroke, consistent weight
const PERK_ICONS: Record<string, React.ReactNode> = {
  salary: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M9.5 15.5c.4.8 1.3 1.3 2.5 1.3 1.7 0 2.8-.8 2.8-2s-1-1.7-2.8-2c-1.8-.3-2.8-.9-2.8-2s1.1-2 2.8-2c1.2 0 2.1.5 2.5 1.3" />
      <path d="M12 6.8v1M12 16.2v1" />
    </svg>
  ),
  remote: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16.5V20" />
    </svg>
  ),
  learning: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6.2c1.6-.9 3.3-1.2 5-1.2 1.3 0 2.6.3 3 .7.4-.4 1.7-.7 3-.7 1.7 0 3.4.3 5 1.2v12.1c-1.6-.9-3.3-1.2-5-1.2-1.3 0-2.6.2-3 .6-.4-.4-1.7-.6-3-.6-1.7 0-3.4.3-5 1.2z" />
      <path d="M12 5.7v12.1" />
    </svg>
  ),
  health: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5 9 7l3 4 3-6 5 7.5" /><rect x="3.5" y="12.5" width="17" height="6.5" rx="1.5" />
    </svg>
  ),
  hours: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" />
    </svg>
  ),
  leave: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" /><path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
    </svg>
  ),
};

const PERKS = [
  { icon: 'salary', title: 'Competitive Salary', desc: 'Market-rate salaries benchmarked against Singapore and Bangkok — with performance bonuses.' },
  { icon: 'remote', title: 'Remote-Friendly', desc: 'Most roles are fully remote or hybrid. We care about output, not hours at a desk.' },
  { icon: 'learning', title: 'Learning Budget', desc: '$1,200 USD / year for courses, certifications, conferences, and books.' },
  { icon: 'health', title: 'Health Insurance', desc: 'Full private health insurance for you and your immediate family, from day one.' },
  { icon: 'hours', title: 'Flexible Hours', desc: 'Core hours 10am–4pm. Outside of that, work when you\'re most productive.' },
  { icon: 'leave', title: '20 Days Annual Leave', desc: 'Plus all Cambodian public holidays. We believe in proper rest.' },
];

const STATS = [
  { stat: '70%', label: 'Cambodian team' },
  { stat: '4.8/5', label: 'Glassdoor rating' },
  { stat: '85%', label: 'Internal promotions' },
  { stat: '<5%', label: 'Annual turnover' },
];

function isClosed(deadline: string) {
  return new Date(deadline).getTime() < Date.now();
}

export default function CareersPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [openJob, setOpenJob] = useState<number | null>(null);

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
    .careers-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }

    .stat-card { background: #ffffff; border: 1px solid ${COLORS.border}; border-radius: 12px; padding: 22px 16px; text-align: center; }
    .stat-card .stat-num { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 26px; color: ${COLORS.ink}; }
    .stat-card .stat-label { font-size: 12.5px; color: ${COLORS.muted}; font-weight: 500; margin-top: 6px; }

    .job-card { background: #ffffff; border: 1px solid ${COLORS.border}; border-radius: 14px; overflow: hidden; transition: border-color 0.25s ease, box-shadow 0.25s ease; cursor: pointer; }
    .job-card:hover { border-color: rgba(5,5,69,0.18); box-shadow: 0 8px 24px rgba(5,5,69,0.06); }
    .job-tag { display: inline-flex; font-size: 12px; font-weight: 600; padding: 5px 11px; border-radius: 6px; background: rgba(5,5,69,0.045); color: rgba(5,5,69,0.68); }

    .perk-card { background: #ffffff; border: 1px solid ${COLORS.border}; border-radius: 14px; padding: clamp(22px,3vw,28px); transition: border-color 0.25s ease, box-shadow 0.25s ease; }
    .perk-card:hover { border-color: rgba(5,5,69,0.18); box-shadow: 0 8px 24px rgba(5,5,69,0.06); }
    .perk-icon { width: 42px; height: 42px; border-radius: 10px; background: rgba(14,98,162,0.07); color: ${COLORS.blue}; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }

    .apply-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 26px; border-radius: 8px; font-weight: 600; font-size: 13.5px; background: ${COLORS.navy}; color: white; text-decoration: none; border: none; cursor: pointer; transition: background 0.2s ease; }
    .apply-btn:hover { background: ${COLORS.blue}; }

    .closed-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 5px; background: rgba(26,26,46,0.06); color: rgba(26,26,46,0.55); }
    .closed-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 26px; border-radius: 8px; font-weight: 600; font-size: 13.5px; background: rgba(5,5,69,0.05); color: rgba(26,26,46,0.4); border: 1px solid ${COLORS.border}; cursor: not-allowed; }

    .detail-heading { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; color: ${COLORS.ink}; margin: 22px 0 10px; }
    .detail-list { margin: 0; padding-left: 18px; }
    .detail-list li { font-size: 14.5px; color: rgba(26,26,46,0.72); line-height: 1.75; margin-bottom: 6px; }

    .section-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: ${COLORS.blue}; margin-bottom: 14px; }
    .section-heading { font-family: 'Syne', sans-serif; font-weight: 700; font-size: clamp(24px,3.6vw,34px); color: ${COLORS.ink}; letter-spacing: -0.01em; }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge="Careers at KhmerSoftware"
        title="Build the Future of"
        titleHighlight="Tech in Cambodia"
        subtitle="Join a team of ambitious engineers, designers, and builders working on projects that matter — for Cambodia's biggest brands and fastest-growing startups."
        accentColor={COLORS.blue}
        accentColor2={COLORS.accent}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="careers-container">
          {/* Culture Section */}
          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: 48, alignItems: 'center', padding: '72px 0 64px' }}>
              <div>
                <div className="section-eyebrow">Our Culture</div>
                <h2 className="section-heading" style={{ marginBottom: 20, lineHeight: 1.2 }}>
                  A Place Where Great Engineers Thrive
                </h2>
                <p style={{ color: COLORS.muted, fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>We believe the best software comes from happy, empowered, and continually-growing engineers. We invest heavily in our team's professional development, wellbeing, and work-life balance.</p>
                <p style={{ color: COLORS.muted, fontSize: 16, lineHeight: 1.8 }}>Small teams, big autonomy. You'll own features end-to-end and have a direct impact on Cambodia's digital economy.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {STATS.map((item, i) => (
                  <div key={i} className="stat-card">
                    <div className="stat-num">{item.stat}</div>
                    <div className="stat-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Perks */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div className="section-eyebrow">Why Join Us</div>
              <h2 className="section-heading">Benefits & Perks</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))', gap: 16, marginBottom: 80 }}>
            {PERKS.map((p, i) => (
              <ScrollReveal key={i} delay={i * 50} direction="up">
                <div className="perk-card">
                  <div className="perk-icon">{PERK_ICONS[p.icon]}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: COLORS.ink, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Open Roles */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              <div className="section-eyebrow">Careers</div>
              <h2 className="section-heading">Open Positions</h2>
            </div>
            <p style={{ color: 'rgba(26,26,46,0.5)', fontSize: 14.5, textAlign: 'center', marginBottom: 40 }}>Click any role to see details and apply.</p>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 80 }}>
            {JOBS.map((job, i) => {
              const dc = DEPT_COLOR[job.dept] ?? COLORS.blue;
              return (
                <ScrollReveal key={i} delay={i * 40}>
                  <div className="job-card" onClick={() => setOpenJob(openJob === i ? null : i)}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: 4, background: dc, flexShrink: 0 }} />
                      <div style={{ flex: 1, padding: '28px 32px', display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' as const }}>
                        <div style={{ flex: 1, minWidth: 280 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.ink, margin: 0 }}>{job.title}</h3>
                            <span style={{ fontSize: 12, color: dc, fontWeight: 700, padding: '3px 10px', background: `${dc}12`, borderRadius: 5 }}>{job.dept}</span>
                            {isClosed(job.deadline) && (
                              <span className="closed-badge">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="M9 12l2 2 4-4"></path></svg>
                                Applications Closed
                              </span>
                            )}
                          </div>

                          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
                            <span style={{ fontSize: 13, color: 'rgba(26,26,46,0.6)', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                              {job.type}
                            </span>
                            <span style={{ fontSize: 13, color: 'rgba(26,26,46,0.6)', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                              {job.location}
                            </span>
                            <span style={{ fontSize: 13, color: 'rgba(26,26,46,0.5)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                              Closed {job.deadline}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {job.tags.map((t, ti) => <span key={ti} className="job-tag">{t}</span>)}
                          </div>
                        </div>

                        <div style={{ color: 'rgba(26,26,46,0.4)', width: 36, height: 36, borderRadius: '50%', border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s ease', transform: openJob === i ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>
                    </div>

                    {/* Expandable details */}
                    <div style={{ overflow: 'hidden', maxHeight: openJob === i ? 1600 : 0, transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                      <div style={{ padding: '0 32px 28px 36px', borderTop: `1px solid ${COLORS.border}` }}>
                        <p style={{ fontSize: 15, color: 'rgba(26,26,46,0.75)', lineHeight: 1.8, margin: '22px 0', maxWidth: 840 }}>{job.desc}</p>

                        <div style={{ maxWidth: 840 }}>
                          <div className="detail-heading">Responsibilities</div>
                          <ul className="detail-list">
                            {job.responsibilities.map((r, ri) => <li key={ri}>{r}</li>)}
                          </ul>

                          <div className="detail-heading">Requirements</div>
                          <ul className="detail-list">
                            {job.requirements.map((r, ri) => <li key={ri}>{r}</li>)}
                          </ul>

                          <div className="detail-heading">Nice to Have</div>
                          <ul className="detail-list">
                            {job.niceToHave.map((r, ri) => <li key={ri}>{r}</li>)}
                          </ul>
                        </div>

                        <div style={{ marginTop: 24 }}>
                          {isClosed(job.deadline) ? (
                            <span className="closed-btn" onClick={(e) => e.stopPropagation()}>
                              Applications Closed
                            </span>
                          ) : (
                            <a
                              href={`/${language}/contact`}
                              className="apply-btn"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Apply for this Position
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* CTA */}
          <ScrollReveal>
            <div style={{ padding: 'clamp(40px,6vw,56px)', borderRadius: 16, background: COLORS.navy, textAlign: 'center' }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(22px,3.6vw,30px)', color: '#fff', marginBottom: 12 }}>Don't see the right role?</h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15.5, marginBottom: 26 }}>Send us your CV anyway. We're always growing and looking for exceptional people.</p>
              <a href={`/${language}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 30px', borderRadius: 8, fontWeight: 600, fontSize: 13.5, background: '#fff', color: COLORS.navy, textDecoration: 'none' }}>
                Send Your CV →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}