'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import PageBanner from '@/components/PageBanner';

const COLORS = {
  navy: '#050545',
  blue: '#0E62A2',
  cyan: '#0ABADF',
  green: '#51B41C',
  yellow: '#EDEC3A',
};

function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const t: Record<string, string> = {
    up: 'translateY(36px)',
    left: 'translateX(-36px)',
    right: 'translateX(36px)',
    fade: 'scale(0.96)',
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : t[direction],
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({
        rx: -dy * strength,
        ry: dx * strength,
        gx: ((e.clientX - rect.left) / rect.width) * 100,
        gy: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    [strength]
  );

  const onLeave = useCallback(() => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 }), []);

  return { ref, tilt, onMove, onLeave };
}

function TiltCard({
  children,
  style = {},
  className = '',
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const { ref, tilt, onMove, onLeave } = useTilt(8);
  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

/* ── SVG Icons for Values ── */
const TargetIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const HandshakeIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const MegaphoneIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8a2 2 0 0 1 0 4" />
    <path d="M10 8H6l-4 4h8V8zm0 0l8-4v12l-8-4" />
    <line x1="9" y1="16" x2="9" y2="20" />
  </svg>
);
const TrendingUpIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

type Localized = string | { en?: string; km?: string };

function getText(val: Localized | undefined, lang: string): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  return (lang === 'km' ? val.km : val.en) || val.en || val.km || '';
}

type TeamMember = {
  name: Localized;
  role: Localized;
  department: string;
  photo: string;
  color: string;
  quote: Localized;
  bio: Localized;
  skills: Localized[];
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: { en: 'Heang Chihav', km: 'ហ៊ាង ជីហាវ' },
    role: { en: 'Manager, KhmerSoftware', km: 'អ្នកគ្រប់គ្រង ក្រុមហ៊ុន ខ្មែរសូហ្វវែរ' },
    department: 'Management',
    photo: 'https://i.imgur.com/PUPWAl1.jpeg',
    color: COLORS.cyan,
    quote: {
      en: "The management system developed by KhmerSoftware has high stability and can handle tens of thousands of operations per day without issues. It's the best technology investment for our organization.",
      km: "ប្រព័ន្ធគ្រប់គ្រងដែលអភិវឌ្ឍដោយ ខ្មែរសូហ្វវែរ មានស្ថិរភាពខ្ពស់ និងអាចគាំទ្រប្រតិបត្តិការរាប់ម៉ឺនក្នុងមួយថ្ងៃដោយគ្មានបញ្ហា។ វាជាការវិនិយោគបច្ចេកវិទ្យាដ៏ល្អបំផុតសម្រាប់ស្ថាប័នរបស់យើង។",
    },
    bio: {
      en: "Oversees business operations, strategic partnerships, and enterprise client delivery across all industries in Cambodia.",
      km: "គ្រប់គ្រងប្រតិបត្តិការអាជីវកម្ម ភាពជាដៃគូយុទ្ធសាស្ត្រ និងការប្រគល់គម្រោងសហគ្រាសនៅទូទាំងឧស្សាហកម្មទាំងអស់នៅកម្ពុជា។",
    },
    skills: ['Strategic Management', 'Enterprise Systems', 'Operations', 'Client Delivery'],
  },
  {
    name: { en: 'Sak Sreynich', km: 'សាក់ ស្រីនិច' },
    role: { en: 'Prompt Engineer, KhmerSoftware', km: 'Prompt Engineer ក្រុមហ៊ុន ខ្មែរសូហ្វវែរ' },
    department: 'Engineering',
    photo: 'https://i.imgur.com/iqBV580.jpeg',
    color: COLORS.green,
    quote: {
      en: "Migrating to cloud systems with the KhmerSoftware team helped us save 40% on IT costs. The team has high professional expertise and completed projects ahead of schedule.",
      km: "ការផ្លាស់ប្តូរទៅប្រើប្រាស់ប្រព័ន្ធក្លោដ (Cloud) ជាមួយក្រុមការងារ ខ្មែរសូហ្វវែរ បានជួយសន្សំសំចៃថវិកាផ្នែក IT របស់យើងរហូតដល់ 40%។ ក្រុមការងារមានវិជ្ជាជីវៈខ្ពស់ និងបញ្ចប់គម្រោងមុនកាលកំណត់។",
    },
    bio: {
      en: "Specializes in generative AI prompt engineering, intelligent agent workflows, and cost-efficient cloud system optimization.",
      km: "មានជំនាញក្នុងការរៀបចំ prompt សម្រាប់ AI បង្កើតលំហូរការងារឆ្លាតវៃ និងការបង្កើនប្រសិទ្ធភាពប្រព័ន្ធក្លោដដោយសន្សំសំចៃថ្លៃដើម។",
    },
    skills: ['Prompt Engineering', 'AI & LLMs', 'Cloud Optimization', 'Automation'],
  },
  {
    name: { en: 'Roeurm Sopheak', km: 'រឿម សុភ័ក្រ' },
    role: { en: 'Operations Manager, KhmerSoftware', km: 'អ្នកគ្រប់គ្រងប្រតិបត្តិការ ក្រុមហ៊ុន ខ្មែរសូហ្វវែរ' },
    department: 'Operations',
    photo: 'https://i.imgur.com/c2wlGqK.jpeg',
    color: COLORS.yellow,
    quote: {
      en: "Their technical support service is truly fast and highly responsible 24/7. All complex technical issues are resolved immediately with high efficiency.",
      km: "សេវាកម្មគាំទ្របច្ចេកទេសរបស់ពួកគេពិតជាលឿនរហ័ស និងមានទំនួលខុសត្រូវខ្ពស់ ២៤/៧។ រាល់បញ្ហាបច្ចេកទេសស្មុគស្មាញទាំងអស់ ត្រូវបានដោះស្រាយភ្លាមៗ ប្រកបដោយប្រសិទ្ធភាព។",
    },
    bio: {
      en: "Leads technical support excellence, continuous system reliability, quality assurance, and SLA-guaranteed project operations.",
      km: "ដឹកនាំផ្នែកសេវាកម្មគាំទ្របច្ចេកទេស ស្ថិរភាពប្រព័ន្ធបន្ត ការធានាគុណភាព (QA) និងប្រតិបត្តិការគម្រោងធានាតាមកិច្ចសន្យា SLA។",
    },
    skills: ['Operations', '24/7 Support', 'Quality Assurance', 'SLA Management'],
  },
  {
    name: { en: 'Leam Rien', km: 'លាម រៀន' },
    role: { en: 'UI/UX Designer, KhmerSoftware', km: 'អ្នករចនាបទផ្ទាំងប្រើប្រាស់ (UI/UX Designer) ក្រុមហ៊ុន ខ្មែរសូហ្វវែរ' },
    department: 'Design',
    photo: 'https://i.imgur.com/J75cVHp.jpeg',
    color: COLORS.blue,
    quote: {
      en: "The software UI/UX design is attractive, easy to use, and clearly reflects our business identity. I'm extremely satisfied with this work.",
      km: "ការរចនាផ្ទៃកម្មវិធី (UI/UX) មានភាពទាក់ទាញ ងាយស្រួលប្រើប្រាស់ និងឆ្លុះបញ្ចាំងពីអត្តសញ្ញាណអាជីវកម្មរបស់យើងបានយ៉ាងច្បាស់លាស់។ ខ្ញុំពិតជាពេញចិត្តនឹងស្នាដៃនេះខ្លាំងណាស់។",
    },
    bio: {
      en: "Crafts intuitive, elegant user interfaces and accessible digital experiences tailored for Cambodian and international users.",
      km: "រចនាផ្ទៃមុខកម្មវិធីដែលងាយស្រួលប្រើប្រាស់ មានភាពទាក់ទាញ និងស្របតាមតម្រូវការរបស់អ្នកប្រើប្រាស់ទាំងក្នុងស្រុក និងអន្តរជាតិ។",
    },
    skills: ['UI/UX Design', 'Figma', 'Design Systems', 'User Research'],
  },
];

const VALUES = [
  {
    Icon: TargetIcon,
    title: { en: 'Outcome-Focused', km: 'ផ្តោតលើលទ្ធផល' },
    desc: {
      en: 'We measure success by the results we create for your business — not lines of code written.',
      km: 'យើងវាស់ស្ទង់ភាពជោគជ័យដោយលទ្ធផលដែលយើងបង្កើតសម្រាប់អាជីវកម្មរបស់អ្នក — មិនមែនចំនួនបន្ទាត់កូដដែលបានសរសេរនោះទេ។',
    },
  },
  {
    Icon: HandshakeIcon,
    title: { en: 'Partnership Mindset', km: 'ផ្នត់គំនិតភាពជាដៃគូ' },
    desc: {
      en: 'We behave like a member of your team, not a vendor. Your success is our success.',
      km: 'យើងធ្វើសកម្មភាពដូចជាសមាជិកនៃក្រុមរបស់អ្នក មិនមែនជាអ្នកលក់ទេ។ ភាពជោគជ័យរបស់អ្នកគឺជាភាពជោគជ័យរបស់យើង។',
    },
  },
  {
    Icon: MegaphoneIcon,
    title: { en: 'Radical Transparency', km: 'តម្លាភាពពិតប្រាកដ' },
    desc: {
      en: 'No surprises. We communicate early and often about risks, timelines, and trade-offs.',
      km: 'គ្មានការភ្ញាក់ផ្អើលទេ។ យើងទំនាក់ទំនងឱ្យបានឆាប់ និងជារឿយៗអំពីហានិភ័យ កាលវិភាគ និងការផ្លាស់ប្តូរ។',
    },
  },
  {
    Icon: TrendingUpIcon,
    title: { en: 'Continuous Growth', km: 'ការលូតលាស់បន្ត' },
    desc: {
      en: 'Every engineer on our team dedicates 20% of their time to learning and improving their craft.',
      km: 'វិស្វករគ្រប់រូបនៅលើក្រុមរបស់យើងចំណាយ ២០% នៃពេលវេលារបស់ពួកគេដើម្បីរៀន និងកែលម្អជំនាញរបស់ពួកគេ។',
    },
  },
];

export default function TeamPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) {
      setLanguage(params.lang as 'en' | 'km');
    }
  }, [params.lang, setLanguage]);

  const filteredMembers =
    filter === 'All'
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.department.toLowerCase() === filter.toLowerCase());

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
    .team-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 40px); }

    .filter-btn {
      padding: 8px 20px;
      border-radius: 100px;
      border: 1.5px solid rgba(5,5,69,0.1);
      background: #ffffff;
      color: rgba(5,5,69,0.65);
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .filter-btn:hover, .filter-btn.active {
      background: #050545;
      color: #ffffff;
      border-color: #050545;
    }

    .member-card {
      background: #ffffff;
      border: 1px solid rgba(5,5,69,0.08);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(5,5,69,0.05);
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .member-card:hover {
      box-shadow: 0 16px 44px rgba(5,5,69,0.12);
    }

    .glow-top {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      z-index: 10;
    }

    .skill-tag {
      display: inline-flex;
      font-size: 11.5px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 100px;
      background: rgba(5,5,69,0.045);
      color: rgba(5,5,69,0.7);
      margin: 2px;
    }

    .stars {
      color: #f59e0b;
      letter-spacing: 2px;
      font-size: 14px;
    }

    .value-card {
      background: rgba(255,255,255,0.92);
      border: 1px solid rgba(5,5,69,0.07);
      border-radius: 20px;
      padding: 30px 24px;
      text-align: center;
      box-shadow: 0 4px 16px rgba(5,5,69,0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .value-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(5,5,69,0.09);
    }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge={language === 'km' ? 'ក្រុមការងាររបស់យើង' : 'Our Team'}
        title={language === 'km' ? 'ជួបជាមួយ' : 'Meet Our'}
        titleHighlight={language === 'km' ? 'ក្រុមជំនាញ' : 'Expert Team'}
        subtitle={
          language === 'km'
            ? 'ក្រុមវិស្វករ អ្នកគ្រប់គ្រង និងអ្នករចនាជំនាញខ្ពស់ដែលបានប្តេជ្ញាចិត្តក្នុងការផ្តល់ជូននូវដំណោះស្រាយសូហ្វវែរដ៏ល្អឥតខ្ចោះសម្រាប់អាជីវកម្មរបស់អ្នក។'
            : 'Our dedicated engineers, managers, and designers committed to delivering world-class software solutions and 24/7 reliability for your business.'
        }
        accentColor={COLORS.cyan}
        accentColor2={COLORS.blue}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="team-container">
          {/* ── STATS STRIP ─────────────────────── */}
          <ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
                borderRadius: 20,
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid rgba(5,5,69,0.07)',
                boxShadow: '0 6px 28px rgba(5,5,69,0.06)',
                margin: '48px 0',
              }}
            >
              {[
                { val: '40+', label: { en: 'Team Members', km: 'សមាជិកក្រុម' }, color: COLORS.cyan },
                { val: '100+', label: { en: 'Completed Projects', km: 'គម្រោងបានបញ្ចប់' }, color: COLORS.green },
                { val: '99.9%', label: { en: 'Client Satisfaction', km: 'ការពេញចិត្តរបស់អតិថិជន' }, color: COLORS.yellow },
                { val: '24/7', label: { en: 'Dedicated Support', km: 'ការគាំទ្រ ២៤/៧' }, color: COLORS.blue },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: 'center',
                    padding: 'clamp(22px, 4vw, 36px) 20px',
                    borderRight: i < 3 ? '1px solid rgba(5,5,69,0.06)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 'clamp(28px, 4vw, 44px)',
                      color: s.color,
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'rgba(26,26,46,0.55)',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                    }}
                  >
                    {getText(s.label, language)}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* ── FILTER BUTTONS ──────────────────── */}
          <ScrollReveal>
            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginBottom: 44,
              }}
            >
              {[
                { id: 'All', label: { en: 'All Members', km: 'ទាំងអស់' } },
                { id: 'Management', label: { en: 'Management', km: 'ការគ្រប់គ្រង' } },
                { id: 'Engineering', label: { en: 'Engineering & AI', km: 'វិស្វកម្ម & AI' } },
                { id: 'Operations', label: { en: 'Operations', km: 'ប្រតិបត្តិការ' } },
                { id: 'Design', label: { en: 'Design', km: 'ការរចនា' } },
              ].map((f) => (
                <button
                  key={f.id}
                  className={`filter-btn${filter === f.id ? ' active' : ''}`}
                  onClick={() => setFilter(f.id)}
                >
                  {getText(f.label, language)}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* ── TEAM CARDS GRID ─────────────────── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
              gap: 28,
              marginBottom: 80,
            }}
          >
            {filteredMembers.map((member, i) => (
              <ScrollReveal key={getText(member.name, 'en')} delay={i * 80} direction="up">
                <TiltCard className="member-card" style={{ position: 'relative' }}>
                  <div
                    className="glow-top"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${member.color}80, transparent)`,
                    }}
                  />

                  {/* Photo Header with gradient overlay */}
                  <div style={{ position: 'relative', width: '100%', height: 260, overflow: 'hidden' }}>
                    <img
                      src={member.photo}
                      alt={getText(member.name, language)}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, rgba(5,5,69,0.92) 0%, rgba(5,5,69,0.4) 50%, transparent 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '20px',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontWeight: 700,
                          fontSize: 20,
                          color: '#ffffff',
                          margin: 0,
                        }}
                      >
                        {getText(member.name, language)}
                      </h3>
                      <div
                        style={{
                          fontSize: 12.5,
                          color: member.color,
                          fontWeight: 600,
                          marginTop: 4,
                        }}
                      >
                        {getText(member.role, language)}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div
                    style={{
                      padding: '22px 20px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div className="stars" style={{ marginBottom: 12 }}>
                        ★★★★★
                      </div>
                      <p
                        style={{
                          fontSize: 13.5,
                          color: 'rgba(26,26,46,0.72)',
                          lineHeight: 1.65,
                          fontStyle: 'italic',
                          margin: '0 0 16px',
                        }}
                      >
                        &ldquo;{getText(member.quote, language)}&rdquo;
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          color: 'rgba(26,26,46,0.6)',
                          lineHeight: 1.6,
                          margin: '0 0 16px',
                        }}
                      >
                        {getText(member.bio, language)}
                      </p>
                    </div>

                    <div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {member.skills.map((s, si) => (
                          <span key={si} className="skill-tag">
                            ✓ {getText(s, language)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          {/* ── CORE VALUES ─────────────────────── */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div
                style={{
                  display: 'inline-block',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const,
                  color: COLORS.blue,
                  padding: '6px 14px',
                  background: 'rgba(14,98,162,0.08)',
                  border: '1px solid rgba(14,98,162,0.2)',
                  borderRadius: 100,
                  marginBottom: 14,
                }}
              >
                {language === 'km' ? 'គោលការណ៍របស់យើង' : 'Our Principles'}
              </div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(24px, 4vw, 38px)',
                  color: '#0d0d2b',
                  marginBottom: 12,
                }}
              >
                {language === 'km' ? 'តម្លៃស្នូល' : 'Our'}{' '}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.blue})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {language === 'km' ? 'របស់ក្រុមហ៊ុន' : 'Core Values'}
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
              gap: 20,
              marginBottom: 80,
            }}
          >
            {VALUES.map((v, i) => (
              <ScrollReveal key={i} delay={i * 70} direction="up">
                <div className="value-card">
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${COLORS.cyan}15, ${COLORS.blue}10)`,
                      border: `1px solid ${COLORS.cyan}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: COLORS.cyan,
                      margin: '0 auto 16px',
                    }}
                  >
                    <v.Icon />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#0d0d2b',
                      marginBottom: 8,
                    }}
                  >
                    {getText(v.title, language)}
                  </h3>
                  <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.6)', lineHeight: 1.6, margin: 0 }}>
                    {getText(v.desc, language)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* ── CTA ─────────────────────────────── */}
          <ScrollReveal>
            <div
              style={{
                padding: 'clamp(40px, 6vw, 64px)',
                borderRadius: 24,
                background: 'linear-gradient(135deg, #050545, #0E62A2)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 400,
                  height: 400,
                  borderRadius: '50%',
                  background: COLORS.cyan,
                  filter: 'blur(120px)',
                  opacity: 0.1,
                  top: '-100px',
                  right: '-50px',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(22px, 4vw, 34px)',
                    color: '#fff',
                    marginBottom: 12,
                  }}
                >
                  {language === 'km' ? 'ចង់ចូលរួមជាមួយក្រុមការងារយើង?' : 'Want to join our team?'}
                </h2>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: 16,
                    marginBottom: 28,
                    lineHeight: 1.6,
                    maxWidth: 600,
                    margin: '0 auto 28px',
                  }}
                >
                  {language === 'km'
                    ? 'យើងតែងតែស្វែងរកវិស្វករ អ្នករចនា និងអ្នកគ្រប់គ្រងគម្រោងដែលមានទេពកោសល្យដើម្បីចូលរួមជាមួយក្រុមដែលកំពុងរីកចម្រើនរបស់យើង។'
                    : "We're always looking for talented engineers, designers, and project managers to join our growing team."}
                </p>
                <a
                  href={`/${language}/careers`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '13px 32px',
                    borderRadius: 100,
                    fontWeight: 600,
                    fontSize: 14,
                    background: 'linear-gradient(135deg, #0ABADF, #0E62A2)',
                    color: '#fff',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(10,186,223,0.4)',
                  }}
                >
                  {language === 'km' ? 'មើលឱកាសការងារ →' : 'View Open Positions →'}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}
