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

/* ── SVG Icons ── */
const CheckIcon = () => <svg width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'><path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' /><polyline points='22 4 12 14.01 9 11.01' /></svg>;
const ShieldIcon = () => <svg width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/></svg>;
const ChartIcon = () => <svg width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'><line x1='18' y1='20' x2='18' y2='10'/><line x1='12' y1='20' x2='12' y2='4'/><line x1='6' y1='20' x2='6' y2='14'/></svg>;
const CodeIcon = () => <svg width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'><polyline points='16 18 22 12 16 6'/><polyline points='8 6 2 12 8 18'/></svg>;
const CloudIcon = () => <svg width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'><path d='M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z'/></svg>;
const MobileIcon = () => <svg width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'><rect x='5' y='2' width='14' height='20' rx='2'/><line x1='12' y1='18' x2='12.01' y2='18'/></svg>;
const WebIcon = () => <svg width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='12' r='10'/><line x1='2' y1='12' x2='22' y2='12'/><path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/></svg>;
const SettingsIcon = () => <svg width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='12' r='3'/><path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'/></svg>;
const UsersIcon = () => <svg width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/><circle cx='9' cy='7' r='4'/><path d='M23 21v-2a4 4 0 0 0-3-3.87'/><path d='M16 3.13a4 4 0 0 1 0 7.75'/></svg>;
const DocIcon = () => <svg width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/><polyline points='14 2 14 8 20 8'/><line x1='16' y1='13' x2='8' y2='13'/><line x1='16' y1='17' x2='8' y2='17'/><polyline points='10 9 9 9 8 9'/></svg>;
type Localized = string | { en?: string; km?: string };

function getText(val: Localized | undefined, lang: string): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  return (lang === 'km' ? val.km : val.en) || val.en || val.km || '';
}

type ServiceConfig = {
  badge: Localized;
  title: Localized;
  titleHighlight: Localized;
  subtitle: Localized;
  accentColor: string;
  accentColor2: string;
  overview: Localized;
  features: { Icon: React.FC; title: Localized; desc: Localized }[];
  process: { num: string; title: Localized; desc: Localized }[];
  benefits: Localized[];
  techStack: string[];
};

const SERVICE_DATA: Record<string, ServiceConfig> = {
  custom: {
    badge: { en: 'Custom Development', km: "[KM] Custom Development" },
    title: { en: 'Custom Software', km: "[KM] Custom Software" },
    titleHighlight: { en: 'Built for You', km: "[KM] Built for You" },
    subtitle: { en: 'From concept to production — we build bespoke enterprise systems, internal tools, and complex platforms tailored exactly to your business processes.', km: "[KM] From concept to production — we build bespoke enterprise systems, internal tools, and complex platforms tailored exactly to your business processes." },
    accentColor: COLORS.cyan,
    accentColor2: COLORS.blue,
    overview: { en: 'Off-the-shelf software rarely fits perfectly. We design and develop custom software solutions that align precisely with your workflows, data models, and growth plans — no unnecessary features, no missing functionality.', km: "[KM] Off-the-shelf software rarely fits perfectly. We design and develop custom software solutions that align precisely with your workflows, data models, and growth plans — no unnecessary features, no missing functionality." },
    features: [
      { Icon: CodeIcon, title: { en: 'Requirements-First Design', km: "[KM] Requirements-First Design" }, desc: 'We spend time deeply understanding your business before writing a single line of code. Every feature is justified by a real need.' },
      { Icon: CheckIcon, title: { en: '2-Week Sprint Delivery', km: "[KM] 2-Week Sprint Delivery" }, desc: 'Agile development with live demos every sprint so you always see progress and can steer the direction.' },
      { Icon: SettingsIcon, title: { en: 'Legacy System Integration', km: "[KM] Legacy System Integration" }, desc: 'We integrate with your existing ERPs, payment gateways, government APIs, and third-party services seamlessly.' },
      { Icon: ChartIcon, title: { en: 'Built to Scale', km: "[KM] Built to Scale" }, desc: 'Architecture designed for growth — from 100 to 1 million users without a full rebuild.' },
      { Icon: DocIcon, title: { en: 'Full Documentation', km: "[KM] Full Documentation" }, desc: 'Comprehensive technical docs, API references, and user manuals delivered with every project.' },
      { Icon: ShieldIcon, title: { en: '12-Month Warranty', km: "[KM] 12-Month Warranty" }, desc: 'Free bug fixes and minor enhancements for a full year after launch — included as standard.' },
    ],
    process: [
      { num: '01', title: { en: 'Discovery & Scoping', km: "[KM] Discovery & Scoping" }, desc: 'Stakeholder workshops, user story mapping, and technical feasibility study to define scope and architecture.' },
      { num: '02', title: { en: 'System Design', km: "[KM] System Design" }, desc: 'Database schema, API design, infrastructure architecture, and security model review before coding begins.' },
      { num: '03', title: { en: 'Agile Development', km: "[KM] Agile Development" }, desc: '2-week sprints with CI/CD from day one. You see working software, not slide decks.' },
      { num: '04', title: { en: 'QA & Testing', km: "[KM] QA & Testing" }, desc: 'Automated unit tests, integration tests, performance benchmarks, and manual UAT sessions.' },
      { num: '05', title: { en: 'Deployment & Handover', km: "[KM] Deployment & Handover" }, desc: 'Zero-downtime production deployment, staff training, and complete documentation handover.' },
    ],
    benefits: [{ en: 'Exact fit for your business processes', km: "[KM] Exact fit for your business processes" }, { en: 'Full source code ownership', km: "[KM] Full source code ownership" }, { en: 'No vendor lock-in', km: "[KM] No vendor lock-in" }, { en: 'Scales with your growth', km: "[KM] Scales with your growth" }, { en: 'Integrates with existing systems', km: "[KM] Integrates with existing systems" }, { en: 'Ongoing support options', km: "[KM] Ongoing support options" }],
    techStack: ['React / Next.js', 'Node.js / Python', 'PostgreSQL / MongoDB', 'AWS / Docker', 'TypeScript', 'GraphQL'],
  },
  mobile: {
    badge: { en: 'Mobile Development', km: "[KM] Mobile Development" },
    title: { en: 'Mobile Apps for', km: "[KM] Mobile Apps for" },
    titleHighlight: { en: 'iOS & Android', km: "[KM] iOS & Android" },
    subtitle: { en: 'Native-quality cross-platform mobile apps that delight users, drive engagement, and perform flawlessly on every device — built for Cambodia\'s mobile-first market.', km: "[KM] Native-quality cross-platform mobile apps that delight users, drive engagement, and perform flawlessly on every device — built for Cambodia's mobile-first market." },
    accentColor: COLORS.green,
    accentColor2: COLORS.cyan,
    overview: { en: 'Cambodia has one of the highest smartphone penetration rates in Southeast Asia. We build mobile apps that take full advantage of native device capabilities — offline support, push notifications, biometric auth, GPS — while maintaining a single, maintainable codebase.', km: "[KM] Cambodia has one of the highest smartphone penetration rates in Southeast Asia. We build mobile apps that take full advantage of native device capabilities — offline support, push notifications, biometric auth, GPS — while maintaining a single, maintainable codebase." },
    features: [
      { Icon: MobileIcon, title: { en: 'Cross-Platform Native Feel', km: "[KM] Cross-Platform Native Feel" }, desc: 'React Native and Flutter apps that feel truly native on both iOS and Android — not a web wrapper.' },
      { Icon: MobileIcon, title: { en: 'Offline-First Architecture', km: "[KM] Offline-First Architecture" }, desc: 'Apps that work without internet and sync automatically when connectivity returns — critical for Cambodia\'s rural coverage.' },
      { Icon: ShieldIcon, title: { en: 'Biometric Authentication', km: "[KM] Biometric Authentication" }, desc: 'Face ID, Touch ID, and fingerprint login integrated securely following platform security guidelines.' },
      { Icon: CheckIcon, title: { en: 'Push Notifications', km: "[KM] Push Notifications" }, desc: 'Targeted push campaigns, transactional alerts, and real-time updates via Firebase.' },
      { Icon: WebIcon, title: { en: 'GPS & Maps', km: "[KM] GPS & Maps" }, desc: 'Location services, route tracking, geofencing, and map integrations for delivery, logistics, and field apps.' },
      { Icon: CheckIcon, title: { en: 'Payment Integration', km: "[KM] Payment Integration" }, desc: 'Wing, ABA Pay, ACLEDA, Stripe, PayPal — all major Cambodia and international payment methods supported.' },
    ],
    process: [
      { num: '01', title: { en: 'UX Research & Wireframes', km: "[KM] UX Research & Wireframes" }, desc: 'User interviews, persona definition, journey mapping, and validated wireframes before any design.' },
      { num: '02', title: { en: 'UI Design & Prototype', km: "[KM] UI Design & Prototype" }, desc: 'High-fidelity Figma designs with interactive prototype for stakeholder sign-off.' },
      { num: '03', title: { en: 'Development & Testing', km: "[KM] Development & Testing" }, desc: 'Agile sprints with device testing on real iOS and Android hardware — not just emulators.' },
      { num: '04', title: { en: 'App Store Submission', km: "[KM] App Store Submission" }, desc: 'We handle the full App Store and Google Play submission, review, and listing optimisation.' },
      { num: '05', title: { en: 'Launch & Analytics', km: "[KM] Launch & Analytics" }, desc: 'Firebase Analytics, crash reporting, and A/B testing set up at launch so you have data from day one.' },
    ],
    benefits: [{ en: 'Single codebase for iOS & Android', km: "[KM] Single codebase for iOS & Android" }, { en: 'App Store & Play Store submission handled', km: "[KM] App Store & Play Store submission handled" }, { en: 'Offline support built-in', km: "[KM] Offline support built-in" }, { en: 'Khmer language support', km: "[KM] Khmer language support" }, { en: 'Local payment gateway integration', km: "[KM] Local payment gateway integration" }, { en: 'Ongoing OTA updates', km: "[KM] Ongoing OTA updates" }],
    techStack: ['React Native', 'Flutter', 'Firebase', 'Redux / Zustand', 'Expo', 'Fastlane'],
  },
  web: {
    badge: { en: 'Web Applications', km: "[KM] Web Applications" },
    title: { en: 'Scalable', km: "[KM] Scalable" },
    titleHighlight: { en: 'Web Platforms', km: "[KM] Web Platforms" },
    subtitle: { en: 'High-performance web applications — from customer-facing SaaS products to internal management systems — built on modern, proven web technologies.', km: "[KM] High-performance web applications — from customer-facing SaaS products to internal management systems — built on modern, proven web technologies." },
    accentColor: COLORS.blue,
    accentColor2: COLORS.cyan,
    overview: { en: 'We build web applications that handle real-world complexity: multi-tenant SaaS, high-traffic e-commerce platforms, real-time dashboards, and complex internal tools. Every app is optimised for performance, SEO, and long-term maintainability.', km: "[KM] We build web applications that handle real-world complexity: multi-tenant SaaS, high-traffic e-commerce platforms, real-time dashboards, and complex internal tools. Every app is optimised for performance, SEO, and long-term maintainability." },
    features: [
      { Icon: CheckIcon, title: { en: 'Sub-Second Load Times', km: "[KM] Sub-Second Load Times" }, desc: 'Server-side rendering, static generation, edge caching, and image optimisation for exceptional Core Web Vitals scores.' },
      { Icon: WebIcon, title: { en: 'Multi-Language Support', km: "[KM] Multi-Language Support" }, desc: 'Khmer, English, and additional languages built in from the start — not bolted on later.' },
      { Icon: ChartIcon, title: { en: 'Real-Time Dashboards', km: "[KM] Real-Time Dashboards" }, desc: 'WebSocket-powered live data updates, interactive charts, and drill-down analytics.' },
      { Icon: ShieldIcon, title: { en: 'Enterprise Security', km: "[KM] Enterprise Security" }, desc: 'HTTPS, CSRF protection, rate limiting, input sanitisation, and OWASP Top 10 compliance.' },
      { Icon: CheckIcon, title: { en: 'Accessibility (WCAG 2.1)', km: "[KM] Accessibility (WCAG 2.1)" }, desc: 'Screen reader support, keyboard navigation, and colour contrast — inclusive design by default.' },
      { Icon: MobileIcon, title: { en: 'Fully Responsive', km: "[KM] Fully Responsive" }, desc: 'Pixel-perfect layouts that work beautifully from 320px phones to 4K monitors.' },
    ],
    process: [
      { num: '01', title: { en: 'Information Architecture', km: "[KM] Information Architecture" }, desc: 'Content mapping, user flow design, and navigation structure before any visual design.' },
      { num: '02', title: { en: 'Design System Creation', km: "[KM] Design System Creation" }, desc: 'A complete component library with tokens, colours, typography, and patterns.' },
      { num: '03', title: { en: 'Frontend Development', km: "[KM] Frontend Development" }, desc: 'Component-driven development with Storybook for isolated, testable UI components.' },
      { num: '04', title: { en: 'Backend & API Integration', km: "[KM] Backend & API Integration" }, desc: 'RESTful or GraphQL APIs, authentication, authorisation, and third-party integrations.' },
      { num: '05', title: { en: 'Performance & SEO Audit', km: "[KM] Performance & SEO Audit" }, desc: 'Lighthouse score 90+, Core Web Vitals pass, structured data, and sitemap setup.' },
    ],
    benefits: [{ en: 'Core Web Vitals optimised', km: "[KM] Core Web Vitals optimised" }, { en: 'SEO-ready from launch', km: "[KM] SEO-ready from launch" }, { en: 'Multi-tenant architecture', km: "[KM] Multi-tenant architecture" }, { en: 'CDN and edge caching', km: "[KM] CDN and edge caching" }, { en: 'Progressive Web App capable', km: "[KM] Progressive Web App capable" }, { en: 'Full analytics integration', km: "[KM] Full analytics integration" }],
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Vercel / AWS'],
  },
  cloud: {
    badge: { en: 'Cloud Infrastructure', km: "[KM] Cloud Infrastructure" },
    title: { en: 'Cloud Migration &', km: "[KM] Cloud Migration &" },
    titleHighlight: { en: 'Infrastructure', km: "[KM] Infrastructure" },
    subtitle: { en: 'Move to the cloud with zero downtime, reduce infrastructure costs, and gain the elasticity to handle anything — from quiet weekdays to viral traffic spikes.', km: "[KM] Move to the cloud with zero downtime, reduce infrastructure costs, and gain the elasticity to handle anything — from quiet weekdays to viral traffic spikes." },
    accentColor: COLORS.blue,
    accentColor2: COLORS.navy,
    overview: { en: 'We help Cambodian businesses migrate from on-premise servers to cloud infrastructure — or optimise existing cloud setups for cost and performance. AWS-certified architects design solutions that are secure, scalable, and right-sized for your workload.', km: "[KM] We help Cambodian businesses migrate from on-premise servers to cloud infrastructure — or optimise existing cloud setups for cost and performance. AWS-certified architects design solutions that are secure, scalable, and right-sized for your workload." },
    features: [
      { Icon: CloudIcon, title: { en: 'AWS & Multi-Cloud', km: "[KM] AWS & Multi-Cloud" }, desc: 'AWS Select Tier Partner. We also work with Google Cloud and Azure — choosing the best fit for your needs.' },
      { Icon: CloudIcon, title: { en: 'Zero-Downtime Migration', km: "[KM] Zero-Downtime Migration" }, desc: 'Blue-green deployments and traffic cutover strategies that keep your business online during migration.' },
      { Icon: ChartIcon, title: { en: 'Cost Optimisation', km: "[KM] Cost Optimisation" }, desc: 'Right-sizing, Reserved Instances, Spot usage, and auto-scaling policies to reduce cloud spend by 30–50%.' },
      { Icon: ShieldIcon, title: { en: 'Security Hardening', km: "[KM] Security Hardening" }, desc: 'VPC design, IAM policies, secrets management, WAF configuration, and compliance controls.' },
      { Icon: ChartIcon, title: { en: 'Monitoring & Alerting', km: "[KM] Monitoring & Alerting" }, desc: 'CloudWatch, Datadog, or Grafana dashboards with intelligent alerting so issues are caught before users notice.' },
      { Icon: CloudIcon, title: { en: 'Disaster Recovery', km: "[KM] Disaster Recovery" }, desc: 'Multi-region backups, automated failover, and tested recovery procedures with defined RTOs.' },
    ],
    process: [
      { num: '01', title: { en: 'Cloud Readiness Assessment', km: "[KM] Cloud Readiness Assessment" }, desc: 'Audit your current infrastructure, identify dependencies, and produce a migration roadmap.' },
      { num: '02', title: { en: 'Architecture Design', km: "[KM] Architecture Design" }, desc: 'VPC, subnets, security groups, IAM, and service selection — designed before any resources are provisioned.' },
      { num: '03', title: { en: 'Staging Migration', km: "[KM] Staging Migration" }, desc: 'Mirror production in the cloud, validate data integrity, and run load tests.' },
      { num: '04', title: { en: 'Production Cutover', km: "[KM] Production Cutover" }, desc: 'DNS cutover with instant rollback capability — typically completed in a maintenance window.' },
      { num: '05', title: { en: 'Optimisation & Handover', km: "[KM] Optimisation & Handover" }, desc: 'Cost review, auto-scaling tuning, runbook documentation, and team training.' },
    ],
    benefits: [{ en: '99.99% SLA achievable', km: "[KM] 99.99% SLA achievable" }, { en: 'Auto-scaling on demand', km: "[KM] Auto-scaling on demand" }, { en: '30–50% cost reduction typical', km: "[KM] 30–50% cost reduction typical" }, { en: 'Disaster recovery built-in', km: "[KM] Disaster recovery built-in" }, { en: 'Global CDN distribution', km: "[KM] Global CDN distribution" }, { en: 'Compliance-ready architecture', km: "[KM] Compliance-ready architecture" }],
    techStack: ['AWS (EC2, RDS, Lambda, S3)', 'Terraform', 'Docker / Kubernetes', 'CloudFront', 'RDS / Aurora', 'CloudWatch'],
  },
  devops: {
    badge: { en: 'DevOps Services', km: "[KM] DevOps Services" },
    title: { en: 'CI/CD &', km: "[KM] CI/CD &" },
    titleHighlight: { en: 'DevOps Automation', km: "[KM] DevOps Automation" },
    subtitle: { en: 'Ship faster with confidence. We implement the pipelines, automation, and observability infrastructure that lets your team deploy multiple times a day without fear.', km: "[KM] Ship faster with confidence. We implement the pipelines, automation, and observability infrastructure that lets your team deploy multiple times a day without fear." },
    accentColor: COLORS.green,
    accentColor2: COLORS.blue,
    overview: { en: 'DevOps is not a title — it\'s a culture backed by automation. We implement continuous integration, continuous delivery, infrastructure as code, and comprehensive observability so your team can focus on features, not firefighting.', km: "[KM] DevOps is not a title — it's a culture backed by automation. We implement continuous integration, continuous delivery, infrastructure as code, and comprehensive observability so your team can focus on features, not firefighting." },
    features: [
      { Icon: SettingsIcon, title: { en: 'CI/CD Pipelines', km: "[KM] CI/CD Pipelines" }, desc: 'GitHub Actions, GitLab CI, or Jenkins pipelines with automated testing, security scanning, and deployment gates.' },
      { Icon: CloudIcon, title: { en: 'Containerisation', km: "[KM] Containerisation" }, desc: 'Docker images, multi-stage builds, Docker Compose for local dev, and Kubernetes for production orchestration.' },
      { Icon: CodeIcon, title: { en: 'Infrastructure as Code', km: "[KM] Infrastructure as Code" }, desc: 'Terraform and Ansible for reproducible, version-controlled infrastructure that can be recreated in minutes.' },
      { Icon: ChartIcon, title: { en: 'Observability Stack', km: "[KM] Observability Stack" }, desc: 'Prometheus + Grafana, ELK Stack, or Datadog — metrics, logs, and traces in one place.' },
      { Icon: ShieldIcon, title: { en: 'DevSecOps', km: "[KM] DevSecOps" }, desc: 'Security scanning integrated into every pipeline — SAST, DAST, dependency vulnerability scanning.' },
      { Icon: CheckIcon, title: { en: 'Feature Flags', km: "[KM] Feature Flags" }, desc: 'LaunchDarkly or home-grown feature flag systems for safe, gradual feature rollouts.' },
    ],
    process: [
      { num: '01', title: { en: 'Pipeline Audit', km: "[KM] Pipeline Audit" }, desc: 'Review your current deployment process, identify bottlenecks, and map the desired state.' },
      { num: '02', title: { en: 'CI Pipeline Setup', km: "[KM] CI Pipeline Setup" }, desc: 'Automated test runs, linting, security scans, and build artefact generation on every PR.' },
      { num: '03', title: { en: 'CD & Environment Strategy', km: "[KM] CD & Environment Strategy" }, desc: 'Dev → staging → production promotion with environment-specific configs and approval gates.' },
      { num: '04', title: { en: 'Observability Implementation', km: "[KM] Observability Implementation" }, desc: 'Metrics, logs, and traces instrumented so every deployment can be validated immediately.' },
      { num: '05', title: { en: 'Team Training', km: "[KM] Team Training" }, desc: 'Hands-on workshops so your team owns and understands the new pipeline.' },
    ],
    benefits: [{ en: 'Deploy multiple times daily', km: "[KM] Deploy multiple times daily" }, { en: 'Automated rollback on failure', km: "[KM] Automated rollback on failure" }, { en: 'Consistent environments', km: "[KM] Consistent environments" }, { en: 'Security built into pipeline', km: "[KM] Security built into pipeline" }, { en: 'Full audit trail', km: "[KM] Full audit trail" }, { en: 'Reduced mean time to recovery', km: "[KM] Reduced mean time to recovery" }],
    techStack: ['GitHub Actions', 'Docker & Kubernetes', 'Terraform', 'Prometheus + Grafana', 'ArgoCD', 'Vault'],
  },
  security: {
    badge: { en: 'Cybersecurity', km: "[KM] Cybersecurity" },
    title: { en: 'Security Audits &', km: "[KM] Security Audits &" },
    titleHighlight: { en: 'Penetration Testing', km: "[KM] Penetration Testing" },
    subtitle: { en: 'Find your vulnerabilities before attackers do. We conduct comprehensive security assessments and implement hardening measures that protect your business and your users.', km: "[KM] Find your vulnerabilities before attackers do. We conduct comprehensive security assessments and implement hardening measures that protect your business and your users." },
    accentColor: COLORS.navy,
    accentColor2: COLORS.blue,
    overview: { en: 'Cybersecurity is no longer optional — it\'s a business requirement. We provide end-to-end security services from initial risk assessment through to hands-on penetration testing, compliance implementation, and ongoing security monitoring.', km: "[KM] Cybersecurity is no longer optional — it's a business requirement. We provide end-to-end security services from initial risk assessment through to hands-on penetration testing, compliance implementation, and ongoing security monitoring." },
    features: [
      { Icon: DocIcon, title: { en: 'Penetration Testing', km: "[KM] Penetration Testing" }, desc: 'Manual and automated testing of your web apps, APIs, mobile apps, and network infrastructure — OWASP-aligned methodology.' },
      { Icon: ShieldIcon, title: { en: 'OWASP Top 10 Remediation', km: "[KM] OWASP Top 10 Remediation" }, desc: 'Identification and fix of the most common and critical web application security risks.' },
      { Icon: ShieldIcon, title: { en: 'Code Security Review', km: "[KM] Code Security Review" }, desc: 'Manual review of your codebase for security vulnerabilities, hardcoded secrets, and insecure patterns.' },
      { Icon: DocIcon, title: { en: 'Compliance Assessment', km: "[KM] Compliance Assessment" }, desc: 'Gap analysis against SOC 2, ISO 27001, PCI-DSS, and Cambodia\'s NBC cybersecurity guidelines.' },
      { Icon: ShieldIcon, title: { en: 'Incident Response Planning', km: "[KM] Incident Response Planning" }, desc: 'Documented playbooks for common security incidents so your team knows exactly what to do.' },
      { Icon: ChartIcon, title: { en: 'Security Monitoring', km: "[KM] Security Monitoring" }, desc: 'SIEM setup, log analysis, and anomaly detection to catch threats in real time.' },
    ],
    process: [
      { num: '01', title: { en: 'Scoping & Reconnaissance', km: "[KM] Scoping & Reconnaissance" }, desc: 'Define the engagement scope, map attack surface, and gather intelligence on the target environment.' },
      { num: '02', title: { en: 'Vulnerability Assessment', km: "[KM] Vulnerability Assessment" }, desc: 'Automated scanning combined with manual analysis to identify all potential entry points.' },
      { num: '03', title: { en: 'Exploitation Testing', km: "[KM] Exploitation Testing" }, desc: 'Attempt to exploit found vulnerabilities to determine real-world risk — in a controlled, safe manner.' },
      { num: '04', title: { en: 'Report & Findings', km: "[KM] Report & Findings" }, desc: 'Detailed report with risk severity ratings, reproduction steps, and prioritised remediation recommendations.' },
      { num: '05', title: { en: 'Remediation Support', km: "[KM] Remediation Support" }, desc: 'Developer-facing guidance and optional pair-programming sessions to fix identified issues.' },
    ],
    benefits: [{ en: 'Certified ethical hackers', km: "[KM] Certified ethical hackers" }, { en: 'OWASP-aligned methodology', km: "[KM] OWASP-aligned methodology" }, { en: 'Detailed remediation report', km: "[KM] Detailed remediation report" }, { en: 'Re-test after fixes included', km: "[KM] Re-test after fixes included" }, { en: 'NDA and confidentiality guaranteed', km: "[KM] NDA and confidentiality guaranteed" }, { en: 'Compliance-ready documentation', km: "[KM] Compliance-ready documentation" }],
    techStack: ['Burp Suite Pro', 'Metasploit', 'OWASP ZAP', 'Nmap / Nessus', 'Wireshark', 'Kali Linux'],
  },
  strategy: {
    badge: { en: 'IT Consulting', km: "ប្រឹក្សាយោបល់ផ្នែកព័ត៌មានវិទ្យា" },
    title: { en: 'Digital Transformation', km: "[KM] Digital Transformation" },
    titleHighlight: { en: 'Strategy', km: "[KM] Strategy" },
    subtitle: { en: 'Technology decisions made today shape your business for the next decade. We help leadership teams make informed, strategic technology choices aligned with business objectives.', km: "[KM] Technology decisions made today shape your business for the next decade. We help leadership teams make informed, strategic technology choices aligned with business objectives." },
    accentColor: COLORS.yellow,
    accentColor2: COLORS.green,
    overview: { en: 'Many businesses invest in the wrong technology — not because of bad engineers, but because of a lack of strategic alignment. We work directly with C-suite and leadership teams to build technology roadmaps that drive real business outcomes.', km: "[KM] Many businesses invest in the wrong technology — not because of bad engineers, but because of a lack of strategic alignment. We work directly with C-suite and leadership teams to build technology roadmaps that drive real business outcomes." },
    features: [
      { Icon: WebIcon, title: { en: 'Technology Roadmap', km: "ផែនការបច្ចេកវិទ្យា" }, desc: { en: 'A 12–36 month technology roadmap aligned to your business strategy, budget, and team capabilities.', km: "[KM] A 12–36 month technology roadmap aligned to your business strategy, budget, and team capabilities." } },
      { Icon: DocIcon, title: { en: 'Technology Audit', km: "[KM] Technology Audit" }, desc: 'Comprehensive review of your existing systems, technical debt, vendor contracts, and team capabilities.' },
      { Icon: WebIcon, title: { en: 'Architecture Review', km: "[KM] Architecture Review" }, desc: 'Expert assessment of your current system architecture with recommendations for scalability and reliability.' },
      { Icon: ChartIcon, title: { en: 'Build vs Buy Analysis', km: "[KM] Build vs Buy Analysis" }, desc: 'Rigorous framework for deciding when to build custom, buy off-the-shelf, or adopt open-source.' },
      { Icon: UsersIcon, title: { en: 'Team Structure Advisory', km: "[KM] Team Structure Advisory" }, desc: 'Guidance on hiring, team composition, outsourcing decisions, and engineering management.' },
      { Icon: SettingsIcon, title: { en: 'Digital Transformation Planning', km: "[KM] Digital Transformation Planning" }, desc: 'Structured programme for moving from legacy systems to modern digital operations.' },
    ],
    process: [
      { num: '01', title: { en: 'Executive Discovery', km: "[KM] Executive Discovery" }, desc: 'Structured interviews with leadership, department heads, and key technical staff to understand the full picture.' },
      { num: '02', title: { en: 'Current State Assessment', km: "[KM] Current State Assessment" }, desc: 'Systems inventory, technical debt analysis, process mapping, and competitive landscape review.' },
      { num: '03', title: { en: 'Future State Design', km: "[KM] Future State Design" }, desc: 'Target architecture, technology selection, and high-level solution design for the proposed future state.' },
      { num: '04', title: { en: 'Roadmap & Business Case', km: "[KM] Roadmap & Business Case" }, desc: 'Phased implementation plan with budget estimates, risk assessment, and ROI projections.' },
      { num: '05', title: { en: 'Implementation Support', km: "[KM] Implementation Support" }, desc: 'Optional ongoing advisory during execution to ensure the strategy is delivered as designed.' },
    ],
    benefits: [{ en: 'C-suite aligned technology decisions', km: "[KM] C-suite aligned technology decisions" }, { en: 'Reduced technology risk', km: "[KM] Reduced technology risk" }, { en: 'Clear 3-year roadmap', km: "[KM] Clear 3-year roadmap" }, { en: 'Vendor-neutral advice', km: "[KM] Vendor-neutral advice" }, { en: 'ROI-focused recommendations', km: "[KM] ROI-focused recommendations" }, { en: 'Knowledge transfer to your team', km: "[KM] Knowledge transfer to your team" }],
    techStack: ['Strategic frameworks', 'Architecture patterns', 'Industry benchmarks', 'Risk models', 'TCO analysis', 'OKR alignment'],
  },
  design: {
    badge: { en: 'UI/UX Design', km: "ការរចនា UI/UX" },
    title: { en: 'User-Centric', km: "[KM] User-Centric" },
    titleHighlight: { en: 'Interface Design', km: "[KM] Interface Design" },
    subtitle: { en: 'Design is not decoration — it\'s how your product works. We create interfaces that are intuitive, beautiful, and tested with real users before a line of code is written.', km: "[KM] Design is not decoration — it's how your product works. We create interfaces that are intuitive, beautiful, and tested with real users before a line of code is written." },
    accentColor: COLORS.cyan,
    accentColor2: COLORS.yellow,
    overview: { en: 'Great design reduces support tickets, increases conversion rates, and makes users love your product. We apply a rigorous user-centred design process — from research and personas through wireframes, prototyping, and usability testing — to create interfaces that just work.', km: "[KM] Great design reduces support tickets, increases conversion rates, and makes users love your product. We apply a rigorous user-centred design process — from research and personas through wireframes, prototyping, and usability testing — to create interfaces that just work." },
    features: [
      { Icon: CheckIcon, title: { en: 'User Research', km: "ការស្រាវជ្រាវអ្នកប្រើប្រាស់" }, desc: { en: 'Interviews, surveys, contextual inquiry, and analytics review to understand real user needs and pain points.', km: "[KM] Interviews, surveys, contextual inquiry, and analytics review to understand real user needs and pain points." } },
      { Icon: WebIcon, title: { en: 'Journey Mapping', km: "[KM] Journey Mapping" }, desc: 'End-to-end user journey maps that surface friction, drop-off points, and opportunities.' },
      { Icon: WebIcon, title: { en: 'Wireframing', km: "[KM] Wireframing" }, desc: 'Low and mid-fidelity wireframes that validate structure and flow before investing in visual design.' },
      { Icon: WebIcon, title: { en: 'Visual Design System', km: "[KM] Visual Design System" }, desc: 'A complete design system with tokens, components, states, and responsive patterns in Figma.' },
      { Icon: WebIcon, title: { en: 'Interactive Prototyping', km: "[KM] Interactive Prototyping" }, desc: 'Clickable Figma prototypes that simulate the real product for stakeholder sign-off and user testing.' },
      { Icon: CheckIcon, title: { en: 'Usability Testing', km: "[KM] Usability Testing" }, desc: 'Moderated testing sessions with real users from your target audience — in Khmer and English.' },
    ],
    process: [
      { num: '01', title: { en: 'Research & Discovery', km: "[KM] Research & Discovery" }, desc: 'User interviews, analytics review, competitor analysis, and heuristic evaluation of existing product.' },
      { num: '02', title: { en: 'Define & Ideate', km: "[KM] Define & Ideate" }, desc: 'Persona definition, HMW questions, and ideation workshops to generate design solutions.' },
      { num: '03', title: { en: 'Wireframes & Flow', km: "[KM] Wireframes & Flow" }, desc: 'Information architecture, navigation design, and annotated wireframes for all key screens.' },
      { num: '04', title: { en: 'Visual Design & System', km: "[KM] Visual Design & System" }, desc: 'High-fidelity UI with complete design system handoff to developers via Figma.' },
      { num: '05', title: { en: 'Test & Iterate', km: "[KM] Test & Iterate" }, desc: 'Usability testing, A/B testing recommendations, and design iterations based on real user feedback.' },
    ],
    benefits: [{ en: 'Research-backed design decisions', km: "[KM] Research-backed design decisions" }, { en: 'Bilingual (KH/EN) design', km: "[KM] Bilingual (KH/EN) design" }, { en: 'Complete Figma handoff', km: "[KM] Complete Figma handoff" }, { en: 'Developer-ready design tokens', km: "[KM] Developer-ready design tokens" }, { en: 'Usability tested', km: "[KM] Usability tested" }, { en: 'Accessibility compliant', km: "[KM] Accessibility compliant" }],
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
        badge={getText(data.badge, language)}
        title={getText(data.title, language)}
        titleHighlight={getText(data.titleHighlight, language)}
        subtitle={getText(data.subtitle, language)}
        ctaLabel={language === 'km' ? 'ស្នើសុំការពិគ្រោះឥតគិតថ្លៃ' : 'Get a Free Quote'}
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
                <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: data.accentColor, padding: '6px 14px', background: `${data.accentColor}10`, border: `1px solid ${data.accentColor}20`, borderRadius: 100, marginBottom: 16 }}>
                  {language === 'km' ? 'ទិដ្ឋភាពទូទៅ' : 'Overview'}
                </div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,36px)', color: '#0d0d2b', marginBottom: 20, lineHeight: 1.2 }}>
                  {language === 'km' ? 'អ្វីដែលយើងផ្តល់ជូន' : 'What We Deliver'}
                </h2>
                <p style={{ color: 'rgba(26,26,46,0.6)', fontSize: 16, lineHeight: 1.8 }}>{getText(data.overview, language)}</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {data.benefits.map((b, i) => <span key={i} className="benefit-tag">✓ {getText(b, language)}</span>)}
              </div>
            </div>
          </ScrollReveal>

          {/* Features */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,36px)', color: '#0d0d2b', marginBottom: 12 }}>
                {language === 'km' ? 'អ្វីដែលបាន' : "What's"}{' '}
                <span style={{ background: `linear-gradient(135deg,${data.accentColor},${data.accentColor2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {language === 'km' ? 'រួមបញ្ចូល' : 'Included'}
                </span>
              </h2>
              <p style={{ color: 'rgba(26,26,46,0.5)', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>
                {language === 'km' ? 'គ្រប់កិច្ចសហការទាំងអស់រួមបញ្ចូលសមត្ថភាព និងលទ្ធផលការងារដូចខាងក្រោម។' : 'Every engagement comes with the following capabilities and deliverables.'}
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: 20, marginBottom: 80 }}>
            {data.features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 60} direction="up">
                <div className="svc-feature-card">
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${data.accentColor}15, ${data.accentColor2}10)`, border: `1px solid ${data.accentColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: data.accentColor, marginBottom: 20 }}>
                    <f.Icon />
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: '#0d0d2b', marginBottom: 8 }}>{getText(f.title, language)}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.6)', lineHeight: 1.6, margin: 0 }}>{getText(f.desc, language)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Process */}
          <ScrollReveal>
            <div style={{ background: 'linear-gradient(180deg,#f0f6ff,#f8f9fc)', borderRadius: 24, padding: 'clamp(32px,5vw,56px)', marginBottom: 80 }}>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(24px,3.5vw,36px)', color: '#0d0d2b', marginBottom: 12 }}>
                  {language === 'km' ? 'របៀបដែលយើងធ្វើការ' : 'How We Work'}
                </h2>
                <p style={{ color: 'rgba(26,26,46,0.5)', fontSize: 15 }}>
                  {language === 'km' ? 'ដំណើរការប្រកបដោយប្រសិទ្ធភាពដែលធានាបាននូវការបញ្ចប់ទាន់ពេលវេលា និងតាមថវិកា។' : 'A proven, repeatable process that delivers on time and on budget.'}
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(200px,100%),1fr))', gap: 16 }}>
                {data.process.map((p, i) => (
                  <div key={i} className="svc-process-card" style={{ borderTop: `3px solid ${data.accentColor}` }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, color: data.accentColor, marginBottom: 8, opacity: 0.3 }}>{p.num}</div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: '#0d0d2b', marginBottom: 8 }}>{getText(p.title, language)}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(26,26,46,0.55)', lineHeight: 1.6, margin: 0 }}>{getText(p.desc, language)}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Stack */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,3vw,32px)', color: '#0d0d2b', marginBottom: 12 }}>
                {language === 'km' ? 'បច្ចេកវិទ្យាដែលយើងប្រើប្រាស់' : 'Technologies We Use'}
              </h2>
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
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', marginBottom: 12 }}>
                  {language === 'km' ? 'ត្រៀមខ្លួនដើម្បីចាប់ផ្តើមហើយឬនៅ?' : 'Ready to get started?'}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
                  {language === 'km' ? 'កក់ការពិគ្រោះយោបល់រយៈពេល ៣០ នាទីដោយឥតគិតថ្លៃជាមួយអ្នកជំនាញរបស់យើង។ មិនមានការតម្រូវឱ្យមានការសន្យាឡើយ។' : 'Book a free 30-minute consultation with our experts. No commitment required.'}
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href={`/${language}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: `linear-gradient(135deg,${data.accentColor},${data.accentColor2})`, color: '#fff', textDecoration: 'none', boxShadow: `0 4px 20px ${data.accentColor}40` }}>
                    {language === 'km' ? 'កក់ការពិគ្រោះឥតគិតថ្លៃ →' : 'Book Free Consultation →'}
                  </a>
                  <a href={`/${language}/portfolio`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                    {language === 'km' ? 'មើលស្នាដៃរបស់យើង' : 'View Our Work'}
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
