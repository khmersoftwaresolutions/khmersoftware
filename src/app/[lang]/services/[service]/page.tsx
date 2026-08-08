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

type ServiceConfig = {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  accentColor: string;
  accentColor2: string;
  overview: string;
  features: { icon: string; title: string; desc: string }[];
  process: { num: string; title: string; desc: string }[];
  benefits: string[];
  techStack: string[];
};

const SERVICE_DATA: Record<string, ServiceConfig> = {
  custom: {
    badge: 'Custom Development',
    title: 'Custom Software',
    titleHighlight: 'Built for You',
    subtitle: 'From concept to production — we build bespoke enterprise systems, internal tools, and complex platforms tailored exactly to your business processes.',
    accentColor: COLORS.cyan,
    accentColor2: COLORS.blue,
    overview: 'Off-the-shelf software rarely fits perfectly. We design and develop custom software solutions that align precisely with your workflows, data models, and growth plans — no unnecessary features, no missing functionality.',
    features: [
      { icon: '🏗️', title: 'Requirements-First Design', desc: 'We spend time deeply understanding your business before writing a single line of code. Every feature is justified by a real need.' },
      { icon: '⚡', title: '2-Week Sprint Delivery', desc: 'Agile development with live demos every sprint so you always see progress and can steer the direction.' },
      { icon: '🔌', title: 'Legacy System Integration', desc: 'We integrate with your existing ERPs, payment gateways, government APIs, and third-party services seamlessly.' },
      { icon: '📈', title: 'Built to Scale', desc: 'Architecture designed for growth — from 100 to 1 million users without a full rebuild.' },
      { icon: '📚', title: 'Full Documentation', desc: 'Comprehensive technical docs, API references, and user manuals delivered with every project.' },
      { icon: '🛡️', title: '12-Month Warranty', desc: 'Free bug fixes and minor enhancements for a full year after launch — included as standard.' },
    ],
    process: [
      { num: '01', title: 'Discovery & Scoping', desc: 'Stakeholder workshops, user story mapping, and technical feasibility study to define scope and architecture.' },
      { num: '02', title: 'System Design', desc: 'Database schema, API design, infrastructure architecture, and security model review before coding begins.' },
      { num: '03', title: 'Agile Development', desc: '2-week sprints with CI/CD from day one. You see working software, not slide decks.' },
      { num: '04', title: 'QA & Testing', desc: 'Automated unit tests, integration tests, performance benchmarks, and manual UAT sessions.' },
      { num: '05', title: 'Deployment & Handover', desc: 'Zero-downtime production deployment, staff training, and complete documentation handover.' },
    ],
    benefits: ['Exact fit for your business processes', 'Full source code ownership', 'No vendor lock-in', 'Scales with your growth', 'Integrates with existing systems', 'Ongoing support options'],
    techStack: ['React / Next.js', 'Node.js / Python', 'PostgreSQL / MongoDB', 'AWS / Docker', 'TypeScript', 'GraphQL'],
  },
  mobile: {
    badge: 'Mobile Development',
    title: 'Mobile Apps for',
    titleHighlight: 'iOS & Android',
    subtitle: 'Native-quality cross-platform mobile apps that delight users, drive engagement, and perform flawlessly on every device — built for Cambodia\'s mobile-first market.',
    accentColor: COLORS.green,
    accentColor2: COLORS.cyan,
    overview: 'Cambodia has one of the highest smartphone penetration rates in Southeast Asia. We build mobile apps that take full advantage of native device capabilities — offline support, push notifications, biometric auth, GPS — while maintaining a single, maintainable codebase.',
    features: [
      { icon: '📱', title: 'Cross-Platform Native Feel', desc: 'React Native and Flutter apps that feel truly native on both iOS and Android — not a web wrapper.' },
      { icon: '🔕', title: 'Offline-First Architecture', desc: 'Apps that work without internet and sync automatically when connectivity returns — critical for Cambodia\'s rural coverage.' },
      { icon: '🔐', title: 'Biometric Authentication', desc: 'Face ID, Touch ID, and fingerprint login integrated securely following platform security guidelines.' },
      { icon: '🔔', title: 'Push Notifications', desc: 'Targeted push campaigns, transactional alerts, and real-time updates via Firebase.' },
      { icon: '🗺️', title: 'GPS & Maps', desc: 'Location services, route tracking, geofencing, and map integrations for delivery, logistics, and field apps.' },
      { icon: '💳', title: 'Payment Integration', desc: 'Wing, ABA Pay, ACLEDA, Stripe, PayPal — all major Cambodia and international payment methods supported.' },
    ],
    process: [
      { num: '01', title: 'UX Research & Wireframes', desc: 'User interviews, persona definition, journey mapping, and validated wireframes before any design.' },
      { num: '02', title: 'UI Design & Prototype', desc: 'High-fidelity Figma designs with interactive prototype for stakeholder sign-off.' },
      { num: '03', title: 'Development & Testing', desc: 'Agile sprints with device testing on real iOS and Android hardware — not just emulators.' },
      { num: '04', title: 'App Store Submission', desc: 'We handle the full App Store and Google Play submission, review, and listing optimisation.' },
      { num: '05', title: 'Launch & Analytics', desc: 'Firebase Analytics, crash reporting, and A/B testing set up at launch so you have data from day one.' },
    ],
    benefits: ['Single codebase for iOS & Android', 'App Store & Play Store submission handled', 'Offline support built-in', 'Khmer language support', 'Local payment gateway integration', 'Ongoing OTA updates'],
    techStack: ['React Native', 'Flutter', 'Firebase', 'Redux / Zustand', 'Expo', 'Fastlane'],
  },
  web: {
    badge: 'Web Applications',
    title: 'Scalable',
    titleHighlight: 'Web Platforms',
    subtitle: 'High-performance web applications — from customer-facing SaaS products to internal management systems — built on modern, proven web technologies.',
    accentColor: COLORS.blue,
    accentColor2: COLORS.cyan,
    overview: 'We build web applications that handle real-world complexity: multi-tenant SaaS, high-traffic e-commerce platforms, real-time dashboards, and complex internal tools. Every app is optimised for performance, SEO, and long-term maintainability.',
    features: [
      { icon: '⚡', title: 'Sub-Second Load Times', desc: 'Server-side rendering, static generation, edge caching, and image optimisation for exceptional Core Web Vitals scores.' },
      { icon: '🌐', title: 'Multi-Language Support', desc: 'Khmer, English, and additional languages built in from the start — not bolted on later.' },
      { icon: '📊', title: 'Real-Time Dashboards', desc: 'WebSocket-powered live data updates, interactive charts, and drill-down analytics.' },
      { icon: '🔒', title: 'Enterprise Security', desc: 'HTTPS, CSRF protection, rate limiting, input sanitisation, and OWASP Top 10 compliance.' },
      { icon: '♿', title: 'Accessibility (WCAG 2.1)', desc: 'Screen reader support, keyboard navigation, and colour contrast — inclusive design by default.' },
      { icon: '📱', title: 'Fully Responsive', desc: 'Pixel-perfect layouts that work beautifully from 320px phones to 4K monitors.' },
    ],
    process: [
      { num: '01', title: 'Information Architecture', desc: 'Content mapping, user flow design, and navigation structure before any visual design.' },
      { num: '02', title: 'Design System Creation', desc: 'A complete component library with tokens, colours, typography, and patterns.' },
      { num: '03', title: 'Frontend Development', desc: 'Component-driven development with Storybook for isolated, testable UI components.' },
      { num: '04', title: 'Backend & API Integration', desc: 'RESTful or GraphQL APIs, authentication, authorisation, and third-party integrations.' },
      { num: '05', title: 'Performance & SEO Audit', desc: 'Lighthouse score 90+, Core Web Vitals pass, structured data, and sitemap setup.' },
    ],
    benefits: ['Core Web Vitals optimised', 'SEO-ready from launch', 'Multi-tenant architecture', 'CDN and edge caching', 'Progressive Web App capable', 'Full analytics integration'],
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Vercel / AWS'],
  },
  cloud: {
    badge: 'Cloud Infrastructure',
    title: 'Cloud Migration &',
    titleHighlight: 'Infrastructure',
    subtitle: 'Move to the cloud with zero downtime, reduce infrastructure costs, and gain the elasticity to handle anything — from quiet weekdays to viral traffic spikes.',
    accentColor: COLORS.blue,
    accentColor2: COLORS.navy,
    overview: 'We help Cambodian businesses migrate from on-premise servers to cloud infrastructure — or optimise existing cloud setups for cost and performance. AWS-certified architects design solutions that are secure, scalable, and right-sized for your workload.',
    features: [
      { icon: '☁️', title: 'AWS & Multi-Cloud', desc: 'AWS Select Tier Partner. We also work with Google Cloud and Azure — choosing the best fit for your needs.' },
      { icon: '🚀', title: 'Zero-Downtime Migration', desc: 'Blue-green deployments and traffic cutover strategies that keep your business online during migration.' },
      { icon: '💰', title: 'Cost Optimisation', desc: 'Right-sizing, Reserved Instances, Spot usage, and auto-scaling policies to reduce cloud spend by 30–50%.' },
      { icon: '🔐', title: 'Security Hardening', desc: 'VPC design, IAM policies, secrets management, WAF configuration, and compliance controls.' },
      { icon: '📊', title: 'Monitoring & Alerting', desc: 'CloudWatch, Datadog, or Grafana dashboards with intelligent alerting so issues are caught before users notice.' },
      { icon: '💾', title: 'Disaster Recovery', desc: 'Multi-region backups, automated failover, and tested recovery procedures with defined RTOs.' },
    ],
    process: [
      { num: '01', title: 'Cloud Readiness Assessment', desc: 'Audit your current infrastructure, identify dependencies, and produce a migration roadmap.' },
      { num: '02', title: 'Architecture Design', desc: 'VPC, subnets, security groups, IAM, and service selection — designed before any resources are provisioned.' },
      { num: '03', title: 'Staging Migration', desc: 'Mirror production in the cloud, validate data integrity, and run load tests.' },
      { num: '04', title: 'Production Cutover', desc: 'DNS cutover with instant rollback capability — typically completed in a maintenance window.' },
      { num: '05', title: 'Optimisation & Handover', desc: 'Cost review, auto-scaling tuning, runbook documentation, and team training.' },
    ],
    benefits: ['99.99% SLA achievable', 'Auto-scaling on demand', '30–50% cost reduction typical', 'Disaster recovery built-in', 'Global CDN distribution', 'Compliance-ready architecture'],
    techStack: ['AWS (EC2, RDS, Lambda, S3)', 'Terraform', 'Docker / Kubernetes', 'CloudFront', 'RDS / Aurora', 'CloudWatch'],
  },
  devops: {
    badge: 'DevOps Services',
    title: 'CI/CD &',
    titleHighlight: 'DevOps Automation',
    subtitle: 'Ship faster with confidence. We implement the pipelines, automation, and observability infrastructure that lets your team deploy multiple times a day without fear.',
    accentColor: COLORS.green,
    accentColor2: COLORS.blue,
    overview: 'DevOps is not a title — it\'s a culture backed by automation. We implement continuous integration, continuous delivery, infrastructure as code, and comprehensive observability so your team can focus on features, not firefighting.',
    features: [
      { icon: '🔄', title: 'CI/CD Pipelines', desc: 'GitHub Actions, GitLab CI, or Jenkins pipelines with automated testing, security scanning, and deployment gates.' },
      { icon: '📦', title: 'Containerisation', desc: 'Docker images, multi-stage builds, Docker Compose for local dev, and Kubernetes for production orchestration.' },
      { icon: '🏗️', title: 'Infrastructure as Code', desc: 'Terraform and Ansible for reproducible, version-controlled infrastructure that can be recreated in minutes.' },
      { icon: '📈', title: 'Observability Stack', desc: 'Prometheus + Grafana, ELK Stack, or Datadog — metrics, logs, and traces in one place.' },
      { icon: '🔐', title: 'DevSecOps', desc: 'Security scanning integrated into every pipeline — SAST, DAST, dependency vulnerability scanning.' },
      { icon: '⚡', title: 'Feature Flags', desc: 'LaunchDarkly or home-grown feature flag systems for safe, gradual feature rollouts.' },
    ],
    process: [
      { num: '01', title: 'Pipeline Audit', desc: 'Review your current deployment process, identify bottlenecks, and map the desired state.' },
      { num: '02', title: 'CI Pipeline Setup', desc: 'Automated test runs, linting, security scans, and build artefact generation on every PR.' },
      { num: '03', title: 'CD & Environment Strategy', desc: 'Dev → staging → production promotion with environment-specific configs and approval gates.' },
      { num: '04', title: 'Observability Implementation', desc: 'Metrics, logs, and traces instrumented so every deployment can be validated immediately.' },
      { num: '05', title: 'Team Training', desc: 'Hands-on workshops so your team owns and understands the new pipeline.' },
    ],
    benefits: ['Deploy multiple times daily', 'Automated rollback on failure', 'Consistent environments', 'Security built into pipeline', 'Full audit trail', 'Reduced mean time to recovery'],
    techStack: ['GitHub Actions', 'Docker & Kubernetes', 'Terraform', 'Prometheus + Grafana', 'ArgoCD', 'Vault'],
  },
  security: {
    badge: 'Cybersecurity',
    title: 'Security Audits &',
    titleHighlight: 'Penetration Testing',
    subtitle: 'Find your vulnerabilities before attackers do. We conduct comprehensive security assessments and implement hardening measures that protect your business and your users.',
    accentColor: COLORS.navy,
    accentColor2: COLORS.blue,
    overview: 'Cybersecurity is no longer optional — it\'s a business requirement. We provide end-to-end security services from initial risk assessment through to hands-on penetration testing, compliance implementation, and ongoing security monitoring.',
    features: [
      { icon: '🔍', title: 'Penetration Testing', desc: 'Manual and automated testing of your web apps, APIs, mobile apps, and network infrastructure — OWASP-aligned methodology.' },
      { icon: '🛡️', title: 'OWASP Top 10 Remediation', desc: 'Identification and fix of the most common and critical web application security risks.' },
      { icon: '🔐', title: 'Code Security Review', desc: 'Manual review of your codebase for security vulnerabilities, hardcoded secrets, and insecure patterns.' },
      { icon: '📋', title: 'Compliance Assessment', desc: 'Gap analysis against SOC 2, ISO 27001, PCI-DSS, and Cambodia\'s NBC cybersecurity guidelines.' },
      { icon: '🚨', title: 'Incident Response Planning', desc: 'Documented playbooks for common security incidents so your team knows exactly what to do.' },
      { icon: '📊', title: 'Security Monitoring', desc: 'SIEM setup, log analysis, and anomaly detection to catch threats in real time.' },
    ],
    process: [
      { num: '01', title: 'Scoping & Reconnaissance', desc: 'Define the engagement scope, map attack surface, and gather intelligence on the target environment.' },
      { num: '02', title: 'Vulnerability Assessment', desc: 'Automated scanning combined with manual analysis to identify all potential entry points.' },
      { num: '03', title: 'Exploitation Testing', desc: 'Attempt to exploit found vulnerabilities to determine real-world risk — in a controlled, safe manner.' },
      { num: '04', title: 'Report & Findings', desc: 'Detailed report with risk severity ratings, reproduction steps, and prioritised remediation recommendations.' },
      { num: '05', title: 'Remediation Support', desc: 'Developer-facing guidance and optional pair-programming sessions to fix identified issues.' },
    ],
    benefits: ['Certified ethical hackers', 'OWASP-aligned methodology', 'Detailed remediation report', 'Re-test after fixes included', 'NDA and confidentiality guaranteed', 'Compliance-ready documentation'],
    techStack: ['Burp Suite Pro', 'Metasploit', 'OWASP ZAP', 'Nmap / Nessus', 'Wireshark', 'Kali Linux'],
  },
  strategy: {
    badge: 'IT Consulting',
    title: 'Digital Transformation',
    titleHighlight: 'Strategy',
    subtitle: 'Technology decisions made today shape your business for the next decade. We help leadership teams make informed, strategic technology choices aligned with business objectives.',
    accentColor: COLORS.yellow,
    accentColor2: COLORS.green,
    overview: 'Many businesses invest in the wrong technology — not because of bad engineers, but because of a lack of strategic alignment. We work directly with C-suite and leadership teams to build technology roadmaps that drive real business outcomes.',
    features: [
      { icon: '🗺️', title: 'Technology Roadmap', desc: 'A 12–36 month technology roadmap aligned to your business strategy, budget, and team capabilities.' },
      { icon: '🔍', title: 'Technology Audit', desc: 'Comprehensive review of your existing systems, technical debt, vendor contracts, and team capabilities.' },
      { icon: '🏛️', title: 'Architecture Review', desc: 'Expert assessment of your current system architecture with recommendations for scalability and reliability.' },
      { icon: '💰', title: 'Build vs Buy Analysis', desc: 'Rigorous framework for deciding when to build custom, buy off-the-shelf, or adopt open-source.' },
      { icon: '👥', title: 'Team Structure Advisory', desc: 'Guidance on hiring, team composition, outsourcing decisions, and engineering management.' },
      { icon: '🔄', title: 'Digital Transformation Planning', desc: 'Structured programme for moving from legacy systems to modern digital operations.' },
    ],
    process: [
      { num: '01', title: 'Executive Discovery', desc: 'Structured interviews with leadership, department heads, and key technical staff to understand the full picture.' },
      { num: '02', title: 'Current State Assessment', desc: 'Systems inventory, technical debt analysis, process mapping, and competitive landscape review.' },
      { num: '03', title: 'Future State Design', desc: 'Target architecture, technology selection, and high-level solution design for the proposed future state.' },
      { num: '04', title: 'Roadmap & Business Case', desc: 'Phased implementation plan with budget estimates, risk assessment, and ROI projections.' },
      { num: '05', title: 'Implementation Support', desc: 'Optional ongoing advisory during execution to ensure the strategy is delivered as designed.' },
    ],
    benefits: ['C-suite aligned technology decisions', 'Reduced technology risk', 'Clear 3-year roadmap', 'Vendor-neutral advice', 'ROI-focused recommendations', 'Knowledge transfer to your team'],
    techStack: ['Strategic frameworks', 'Architecture patterns', 'Industry benchmarks', 'Risk models', 'TCO analysis', 'OKR alignment'],
  },
  design: {
    badge: 'UI/UX Design',
    title: 'User-Centric',
    titleHighlight: 'Interface Design',
    subtitle: 'Design is not decoration — it\'s how your product works. We create interfaces that are intuitive, beautiful, and tested with real users before a line of code is written.',
    accentColor: COLORS.cyan,
    accentColor2: COLORS.yellow,
    overview: 'Great design reduces support tickets, increases conversion rates, and makes users love your product. We apply a rigorous user-centred design process — from research and personas through wireframes, prototyping, and usability testing — to create interfaces that just work.',
    features: [
      { icon: '🔬', title: 'User Research', desc: 'Interviews, surveys, contextual inquiry, and analytics review to understand real user needs and pain points.' },
      { icon: '🗺️', title: 'Journey Mapping', desc: 'End-to-end user journey maps that surface friction, drop-off points, and opportunities.' },
      { icon: '📐', title: 'Wireframing', desc: 'Low and mid-fidelity wireframes that validate structure and flow before investing in visual design.' },
      { icon: '🎨', title: 'Visual Design System', desc: 'A complete design system with tokens, components, states, and responsive patterns in Figma.' },
      { icon: '▶️', title: 'Interactive Prototyping', desc: 'Clickable Figma prototypes that simulate the real product for stakeholder sign-off and user testing.' },
      { icon: '🧪', title: 'Usability Testing', desc: 'Moderated testing sessions with real users from your target audience — in Khmer and English.' },
    ],
    process: [
      { num: '01', title: 'Research & Discovery', desc: 'User interviews, analytics review, competitor analysis, and heuristic evaluation of existing product.' },
      { num: '02', title: 'Define & Ideate', desc: 'Persona definition, HMW questions, and ideation workshops to generate design solutions.' },
      { num: '03', title: 'Wireframes & Flow', desc: 'Information architecture, navigation design, and annotated wireframes for all key screens.' },
      { num: '04', title: 'Visual Design & System', desc: 'High-fidelity UI with complete design system handoff to developers via Figma.' },
      { num: '05', title: 'Test & Iterate', desc: 'Usability testing, A/B testing recommendations, and design iterations based on real user feedback.' },
    ],
    benefits: ['Research-backed design decisions', 'Bilingual (KH/EN) design', 'Complete Figma handoff', 'Developer-ready design tokens', 'Usability tested', 'Accessibility compliant'],
    techStack: ['Figma', 'FigJam', 'Maze (usability testing)', 'Hotjar', 'Google Analytics', 'Lottie animations'],
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const service = (params.service as string) || 'custom';
  const data = SERVICE_DATA[service] || SERVICE_DATA.custom;

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
    .svc-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
    .svc-feature-card { background: rgba(255,255,255,0.9); border: 1px solid rgba(5,5,69,0.07); border-radius: 18px; padding: clamp(20px,3vw,28px); box-shadow: 0 4px 16px rgba(5,5,69,0.05); transition: all 0.3s ease; }
    .svc-feature-card:hover { transform: translateY(-4px); box-shadow: 0 14px 40px rgba(5,5,69,0.1); }
    .svc-process-card { background: rgba(255,255,255,0.9); border: 1px solid rgba(5,5,69,0.07); border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(5,5,69,0.05); }
    .benefit-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; padding: 7px 14px; border-radius: 100px; background: rgba(255,255,255,0.9); border: 1px solid rgba(5,5,69,0.07); color: rgba(5,5,69,0.7); margin: 4px; transition: all 0.2s; }
    .benefit-tag:hover { border-color: #0ABADF; color: #0ABADF; }
    .tech-chip { display: inline-flex; font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 8px; background: rgba(5,5,69,0.04); color: rgba(5,5,69,0.65); border: 1px solid rgba(5,5,69,0.08); margin: 4px; }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge={data.badge}
        title={data.title}
        titleHighlight={data.titleHighlight}
        subtitle={data.subtitle}
        ctaLabel="Get a Free Quote"
        ctaHref={`/${language}/contact`}
        accentColor={data.accentColor}
        accentColor2={data.accentColor2}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="svc-container">

          {/* Overview */}
          <ScrollReveal>
            <div style={{ padding: '72px 0 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: 48, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: data.accentColor, padding: '6px 14px', background: `${data.accentColor}10`, border: `1px solid ${data.accentColor}20`, borderRadius: 100, marginBottom: 16 }}>Overview</div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,36px)', color: '#0d0d2b', marginBottom: 20, lineHeight: 1.2 }}>What We Deliver</h2>
                <p style={{ color: 'rgba(26,26,46,0.6)', fontSize: 16, lineHeight: 1.8 }}>{data.overview}</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {data.benefits.map((b, i) => <span key={i} className="benefit-tag">✓ {b}</span>)}
              </div>
            </div>
          </ScrollReveal>

          {/* Features */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,36px)', color: '#0d0d2b', marginBottom: 12 }}>
                What's <span style={{ background: `linear-gradient(135deg,${data.accentColor},${data.accentColor2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Included</span>
              </h2>
              <p style={{ color: 'rgba(26,26,46,0.5)', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>Every engagement comes with the following capabilities and deliverables.</p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: 20, marginBottom: 80 }}>
            {data.features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 60} direction="up">
                <div className="svc-feature-card">
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: '#0d0d2b', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.6)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Process */}
          <ScrollReveal>
            <div style={{ background: 'linear-gradient(180deg,#f0f6ff,#f8f9fc)', borderRadius: 24, padding: 'clamp(32px,5vw,56px)', marginBottom: 80 }}>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,36px)', color: '#0d0d2b', marginBottom: 12 }}>How We Work</h2>
                <p style={{ color: 'rgba(26,26,46,0.5)', fontSize: 15 }}>A proven, repeatable process that delivers on time and on budget.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(200px,100%),1fr))', gap: 16 }}>
                {data.process.map((p, i) => (
                  <div key={i} className="svc-process-card" style={{ borderTop: `3px solid ${data.accentColor}` }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, color: data.accentColor, marginBottom: 8, opacity: 0.3 }}>{p.num}</div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: '#0d0d2b', marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(26,26,46,0.55)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Stack */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,3vw,32px)', color: '#0d0d2b', marginBottom: 12 }}>Technologies We Use</h2>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              {data.techStack.map((t, i) => <span key={i} className="tech-chip">{t}</span>)}
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal>
            <div style={{ padding: 'clamp(40px,6vw,64px)', borderRadius: 24, background: `linear-gradient(135deg,#050545,${data.accentColor2})`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: data.accentColor, filter: 'blur(120px)', opacity: 0.1, top: '-100px', right: '-50px', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', marginBottom: 12 }}>Ready to get started?</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>Book a free 30-minute consultation with our experts. No commitment required.</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href={`/${language}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: `linear-gradient(135deg,${data.accentColor},${data.accentColor2})`, color: '#fff', textDecoration: 'none', boxShadow: `0 4px 20px ${data.accentColor}40` }}>
                    Book Free Consultation →
                  </a>
                  <a href={`/${language}/portfolio`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                    View Our Work
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}
