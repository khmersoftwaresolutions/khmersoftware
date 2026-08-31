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
    title: { en: 'Frontend Development', km: "ការអភិវឌ្ឍ Frontend" },
    icon: '🖥️',
    color: COLORS.cyan,
    desc: { en: 'We craft blazing-fast, pixel-perfect user interfaces using the latest frontend frameworks and design systems.', km: "យើងបង្កើតចំណុចប្រទាក់អ្នកប្រើប្រាស់ដែលលឿនបំផុត និងល្អឥតខ្ចោះដោយប្រើ frameworks និងប្រព័ន្ធរចនាចុងក្រោយបង្អស់។" },
    techs: [
      { name: { en: 'React & Next.js', km: "React និង Next.js" }, detail: { en: 'Server-side rendering, static generation, and full-stack React apps', km: "ការបង្ហាញលើម៉ាស៊ីនមេ ការបង្កើតទំព័រឋិតិវន្ត និងកម្មវិធី React ពេញលេញ" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: { en: 'Vue & Nuxt', km: "Vue និង Nuxt" }, detail: { en: 'Progressive framework for building modern web applications', km: "Framework ទំនើបសម្រាប់ការកសាងកម្មវិធីគេហទំព័រ" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
      { name: { en: 'TypeScript', km: "TypeScript" }, detail: { en: 'Type-safe JavaScript for large-scale application development', km: "JavaScript មានសុវត្ថិភាពសម្រាប់ការអភិវឌ្ឍកម្មវិធីខ្នាតធំ" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: { en: 'Tailwind CSS', km: "Tailwind CSS" }, detail: { en: 'Utility-first CSS framework for rapid UI development', km: "CSS framework សម្រាប់ការអភិវឌ្ឍ UI យ៉ាងឆាប់រហ័ស" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    title: { en: 'Backend & APIs', km: "Backend និង APIs" },
    icon: '⚙️',
    color: COLORS.green,
    desc: { en: 'Scalable, secure server-side solutions built with performance and maintainability at their core.', km: "ដំណោះស្រាយម៉ាស៊ីនមេដែលមានសុវត្ថិភាព និងអាចពង្រីកបាន ដែលកសាងឡើងដោយផ្តោតលើដំណើរការ និងភាពងាយស្រួលថែទាំ។" },
    techs: [
      { name: { en: 'Node.js', km: "Node.js" }, detail: { en: 'High-performance JavaScript runtime for scalable backend services', km: "បរិស្ថានដំណើរការ JavaScript ខ្ពស់សម្រាប់សេវាកម្ម backend" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: { en: 'Python & Django', km: "Python និង Django" }, detail: { en: 'Rapid development with clean, pragmatic design', km: "ការអភិវឌ្ឍរហ័សជាមួយនឹងការរចនាច្បាស់លាស់ និងអនុវត្តជាក់ស្តែង" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: { en: 'Go', km: "Go" }, detail: { en: 'Compiled, concurrent language for high-throughput microservices', km: "ភាសាសរសេរកូដសម្រាប់ដំណើរការក្នុងពេលតែមួយ និង microservices ខ្ពស់" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg' },
      { name: { en: 'GraphQL & REST', km: "GraphQL និង REST" }, detail: { en: 'Flexible API design for web and mobile clients', km: "ការរចនា API ប្រកបដោយភាពបត់បែនសម្រាប់អតិថិជនគេហទំព័រ និងទូរស័ព្ទ" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' },
    ],
  },
  {
    title: { en: 'Cloud & DevOps', km: "ក្លោដ និង DevOps" },
    icon: '☁️',
    color: COLORS.blue,
    desc: { en: 'Cloud-native infrastructure that scales automatically and never sleeps — with zero-downtime deployments.', km: "ហេដ្ឋារចនាសម្ព័ន្ធក្លោដដែលពង្រីកដោយស្វ័យប្រវត្តិ និងមិនដែលឈប់សម្រាក — ជាមួយនឹងការដាក់ឱ្យប្រើប្រាស់ដោយគ្មានការផ្អាកដំណើរការ។" },
    techs: [
      { name: { en: 'AWS', km: "AWS" }, detail: { en: 'EC2, RDS, Lambda, S3, CloudFront and the full AWS ecosystem', km: "EC2, RDS, Lambda, S3, CloudFront និងប្រព័ន្ធអេកូឡូស៊ី AWS ពេញលេញ" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { name: { en: 'Docker & Kubernetes', km: "Docker និង Kubernetes" }, detail: { en: 'Container orchestration for production-grade microservices', km: "ការគ្រប់គ្រង Container សម្រាប់ microservices កម្រិតផលិតកម្ម" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: { en: 'CI/CD Pipelines', km: "CI/CD Pipelines" }, detail: { en: 'GitHub Actions, Jenkins — automated test and deploy workflows', km: "GitHub Actions, Jenkins — លំហូរការងារធ្វើតេស្ត និងដាក់ឱ្យប្រើប្រាស់ដោយស្វ័យប្រវត្តិ" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: { en: 'Terraform', km: "Terraform" }, detail: { en: 'Infrastructure as code for reproducible cloud environments', km: "ហេដ្ឋារចនាសម្ព័ន្ធជាកូដសម្រាប់បរិស្ថានក្លោដដែលអាចផលិតឡើងវិញបាន" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg' },
    ],
  },
  {
    title: { en: 'Databases & Storage', km: "មូលដ្ឋានទិន្នន័យ និងការផ្ទុក" },
    icon: '🗄️',
    color: COLORS.yellow,
    desc: { en: 'From relational to NoSQL and time-series — we choose the right storage technology for your data model.', km: "ពីទំនាក់ទំនងទៅ NoSQL និងស៊េរីពេលវេលា — យើងជ្រើសរើសបច្ចេកវិទ្យាផ្ទុកត្រឹមត្រូវសម្រាប់គំរូទិន្នន័យរបស់អ្នក។" },
    techs: [
      { name: { en: 'PostgreSQL', km: "PostgreSQL" }, detail: { en: 'The world\'s most advanced open-source relational database', km: "[KM] The world\\'s most advanced open-source relational database" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: { en: 'MongoDB', km: "MongoDB" }, detail: { en: 'Flexible document database for modern applications', km: "មូលដ្ឋានទិន្នន័យឯកសារដែលអាចបត់បែនបានសម្រាប់កម្មវិធីទំនើប" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: { en: 'Redis', km: "Redis" }, detail: { en: 'In-memory caching and real-time data structures', km: "Caching ក្នុងអង្គចងចាំ និងរចនាសម្ព័ន្ធទិន្នន័យជាក់ស្តែង" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
      { name: { en: 'MySQL', km: "MySQL" }, detail: { en: 'Reliable, proven relational database used across Cambodia\'s enterprise sector', km: "[KM] Reliable, proven relational database used across Cambodia\\'s enterprise sector" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    ],
  },
  {
    title: { en: 'Mobile Development', km: "ការអភិវឌ្ឍទូរស័ព្ទចល័ត" },
    icon: '📱',
    color: COLORS.cyan,
    desc: { en: 'Native and cross-platform mobile apps that deliver a seamless experience on iOS and Android.', km: "កម្មវិធីទូរស័ព្ទ Native និង cross-platform ដែលផ្តល់នូវបទពិសោធន៍រលូននៅលើ iOS និង Android។" },
    techs: [
      { name: { en: 'React Native', km: "React Native" }, detail: { en: 'Cross-platform mobile apps sharing code with your web app', km: "កម្មវិធីទូរស័ព្ទ Cross-platform ដែលចែករំលែកកូដជាមួយកម្មវិធីគេហទំព័ររបស់អ្នក" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: { en: 'Flutter', km: "Flutter" }, detail: { en: 'Google\'s UI toolkit for natively compiled mobile, web and desktop', km: "[KM] Google\\'s UI toolkit for natively compiled mobile, web and desktop" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
      { name: { en: 'Swift (iOS)', km: "Swift (iOS)" }, detail: { en: 'Native iOS development for maximum performance', km: "ការអភិវឌ្ឍ iOS ដើមសម្រាប់ដំណើរការអតិបរមា" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg' },
      { name: { en: 'Kotlin (Android)', km: "Kotlin (Android)" }, detail: { en: 'Modern, concise Android development', km: "ការអភិវឌ្ឍ Android ទំនើប និងខ្លី" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg' },
    ],
  },
  {
    title: { en: 'AI & Data', km: "បញ្ញាសិប្បនិម្មិត (AI) និងទិន្នន័យ" },
    icon: '🤖',
    color: COLORS.green,
    desc: { en: 'Intelligent features powered by machine learning — from predictive analytics to natural language processing.', km: "មុខងារឆ្លាតវៃដែលដំណើរការដោយការរៀនរបស់ម៉ាស៊ីន (Machine Learning) — ពីការវិភាគទស្សន៍ទាយរហូតដល់ដំណើរការភាសាធម្មជាតិ។" },
    techs: [
      { name: { en: 'TensorFlow & PyTorch', km: "TensorFlow និង PyTorch" }, detail: { en: 'Deep learning frameworks for custom AI model development', km: "Frameworks សម្រាប់ការរៀនស៊ីជម្រៅ ដើម្បីអភិវឌ្ឍគំរូ AI តាមតម្រូវការ" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
      { name: { en: 'OpenAI APIs', km: "OpenAI APIs" }, detail: { en: 'GPT-4 integration for chatbots, summarization and content generation', km: "ការរួមបញ្ចូល GPT-4 សម្រាប់ chatbots ការសង្ខេប និងការបង្កើតមាតិកា" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: { en: 'Apache Spark', km: "Apache Spark" }, detail: { en: 'Large-scale data processing for analytics pipelines', km: "ដំណើរការទិន្នន័យខ្នាតធំសម្រាប់បណ្តាញវិភាគ" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg' },
      { name: { en: 'Elasticsearch', km: "Elasticsearch" }, detail: { en: 'Full-text search and analytics engine', km: "ម៉ាស៊ីនស្វែងរកអត្ថបទពេញលេញ និងការវិភាគ" }, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg' },
    ],
  },
];

type Localized = string | { en?: string; km?: string };

function getText(val: Localized | undefined, lang: string): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  return (lang === 'km' ? val.km : val.en) || val.en || val.km || '';
}

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
        badge={language === 'km' ? "បច្ចេកវិទ្យារបស់យើង" : "Our Technology Stack"}
        title={language === 'km' ? "បង្កើតឡើងដោយ" : "Built With"}
        titleHighlight={language === 'km' ? "ឧបករណ៍ស្តង់ដារពិភពលោក" : "World-Class Tools"}
        subtitle={language === 'km' ? "យើងជ្រើសរើសបច្ចេកវិទ្យាល្អបំផុតសម្រាប់រាល់បញ្ហាប្រឈម — មិនមែនគ្រាន់តែជាការពេញនិយមនោះទេ។ នេះគឺជាបច្ចេកវិទ្យាដែលយើងប្រើដើម្បីកសាងសូហ្វវែរដែលអាចទុកចិត្តបាន និងអាចពង្រីកបាន។" : "We choose the best technology for each challenge — not the most popular. Here's the curated stack we use to build reliable, scalable software across Cambodia and beyond."}
        ctaLabel={language === 'km' ? "ពិភាក្សាអំពីបច្ចេកវិទ្យារបស់អ្នក" : "Discuss Your Stack"}
        ctaHref={`/${language}/contact`}
        accentColor={COLORS.cyan}
        accentColor2={COLORS.blue}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="tech-page-container">
          {/* Intro */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', padding: '72px 0 48px' }}>
              <div className="tech-section-label">{language === 'km' ? "ហេតុអ្វីវាសំខាន់" : "Why it matters"}</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4vw,40px)', color: '#0d0d2b', marginBottom: 16 }}>
                {language === 'km' ? "បច្ចេកវិទ្យាដែល" : "Technology That"}{' '}
                <span style={{ background: 'linear-gradient(135deg,#0ABADF,#0E62A2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {language === 'km' ? "រីកចម្រើនជាមួយអ្នក" : "Scales With You"}
                </span>
              </h2>
              <p style={{ color: 'rgba(26,26,46,0.55)', fontSize: 16, maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
                {language === 'km' ? "គ្រប់បច្ចេកវិទ្យានៅក្នុង stack របស់យើងត្រូវបានជ្រើសរើសបន្ទាប់ពីការវាយតម្លៃយ៉ាងម៉ត់ចត់សម្រាប់ដំណើរការ សន្តិសុខ ការគាំទ្រពីសហគមន៍ និងភាពងាយស្រួលថែទាំរយៈពេលវែង។" : "Every technology in our stack was chosen after rigorous evaluation for performance, security, community support, and long-term maintainability."}
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
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: '#0d0d2b', marginBottom: 4 }}>{getText(cat.title, language)}</h3>
                      <p style={{ color: 'rgba(26,26,46,0.55)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{getText(cat.desc, language)}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', width: 48, height: 4, borderRadius: 2, background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
                  </div>
                  {/* Tech grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px,100%),1fr))', gap: 12 }}>
                    {cat.techs.map((tech, ti) => (
                      <div key={ti} className="tech-item">
                        <img src={tech.logo} alt={getText(tech.name, language)} style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: '#0d0d2b', marginBottom: 3 }}>{getText(tech.name, language)}</div>
                          <div style={{ fontSize: 12, color: 'rgba(26,26,46,0.5)', lineHeight: 1.5 }}>{getText(tech.detail, language)}</div>
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
