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

type Localized = string | { en?: string; km?: string };

function getText(val: Localized | undefined, lang: string): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  return (lang === 'km' ? val.km : val.en) || val.en || val.km || '';
}

type Job = {
  title: Localized;
  dept: Localized;
  type: Localized;
  location: Localized;
  deadline: string;
  tags: string[];
  desc: Localized;
  responsibilities: Localized[];
  requirements: Localized[];
  niceToHave: Localized[];
};

const JOBS: Job[] = [
  {
    title: { en: 'Senior Full-Stack Engineer', km: "វិស្វករ Full-Stack ជាន់ខ្ពស់" },
    dept: { en: 'Engineering', km: "វិស្វកម្ម" },
    type: { en: 'Full-time', km: "ពេញម៉ោង" },
    location: { en: 'Phnom Penh / Remote', km: "ភ្នំពេញ / ធ្វើការពីចម្ងាយ" },
    deadline: '2026-06-12',
    tags: ['React', 'Node.js', 'PostgreSQL', '5+ yrs'],
    desc: { en: 'Own end-to-end features across web and API for multiple client platforms. You\'ll work in small teams with high autonomy and direct client interaction.', km: "ទទួលខុសត្រូវលើមុខងារពីដើមដល់ចប់សម្រាប់គេហទំព័រ និង API សម្រាប់វេទិកាអតិថិជនជាច្រើន។ អ្នកនឹងធ្វើការក្នុងក្រុមតូចៗដែលមានស្វ័យភាពខ្ពស់ និងអន្តរកម្មផ្ទាល់ជាមួយអតិថិជន។" },
    responsibilities: [
      { en: 'Design, build, and ship features across the full stack, from database schema to production UI.', km: "រចនា កសាង និងបញ្ចេញមុខងារនៅទូទាំង full stack ពី schema មូលដ្ឋានទិន្នន័យដល់ UI ផលិតកម្ម។" },
      { en: 'Partner directly with clients and product stakeholders to scope work and set realistic delivery timelines.', km: "សហការផ្ទាល់ជាមួយអតិថិជន និងអ្នកពាក់ព័ន្ធផលិតផលដើម្បីកំណត់ទំហំការងារ និងពេលវេលាប្រគល់គម្រោងជាក់ស្តែង។" },
      { en: 'Review pull requests and mentor mid-level engineers on architecture and code quality.', km: "ពិនិត្យ pull requests និងណែនាំវិស្វករកម្រិតមធ្យមស្តីពីស្ថាបត្យកម្ម និងគុណភាពកូដ។" },
      { en: 'Identify performance bottlenecks and lead remediation across services and data layers.', km: "កំណត់បញ្ហាដំណើរការ និងដឹកនាំការដោះស្រាយនៅទូទាំងសេវាកម្ម និងស្រទាប់ទិន្នន័យ។" },
      { en: 'Contribute to technical planning for new client engagements, including estimation and risk assessment.', km: "ចូលរួមក្នុងការធ្វើផែនការបច្ចេកទេសសម្រាប់គម្រោងអតិថិជនថ្មី រួមទាំងការប៉ាន់ប្រមាណ និងការវាយតម្លៃហានិភ័យ។" }
    ],
    requirements: [
      { en: '5+ years building production web applications with a modern JavaScript or TypeScript stack.', km: "បទពិសោធន៍ ៥+ ឆ្នាំក្នុងការកសាងកម្មវិធីគេហទំព័រជាមួយ JavaScript ឬ TypeScript ទំនើប។" },
      { en: 'Strong command of React and a Node.js-based backend framework.', km: "មានសមត្ថភាពខ្លាំងលើ React និង framework ផ្នែកខាងក្រោយផ្អែកលើ Node.js។" },
      { en: 'Working knowledge of relational databases (PostgreSQL or similar) and query optimization.', km: "ចំណេះដឹងទូលំទូលាយអំពីមូលដ្ឋានទិន្នន័យ (PostgreSQL ឬស្រដៀងគ្នា) និងការធ្វើឱ្យប្រសើរឡើងនូវ query។" },
      { en: 'Comfortable owning a feature from technical design through deployment and monitoring.', km: "មានផាសុកភាពក្នុងការទទួលខុសត្រូវមុខងារពីការរចនាបច្ចេកទេសរហូតដល់ការដាក់ឱ្យប្រើប្រាស់ និងការត្រួតពិនិត្យ។" },
      { en: 'Clear written and verbal communication for direct client-facing work.', km: "មានការប្រាស្រ័យទាក់ទងច្បាស់លាស់ទាំងសំណេរ និងពាក្យសំដីសម្រាប់ការងារប្រឈមមុខនឹងអតិថិជនផ្ទាល់។" }
    ],
    niceToHave: [
      { en: 'Experience with infrastructure-as-code and CI/CD pipelines.', km: "មានបទពិសោធន៍ជាមួយហេដ្ឋារចនាសម្ព័ន្ធជាកូដ (IaC) និង CI/CD pipelines។" },
      { en: 'Prior work in a consultancy or agency delivering multiple concurrent client projects.', km: "ការងារពីមុននៅក្នុងក្រុមហ៊ុនប្រឹក្សា ឬភ្នាក់ងារដែលប្រគល់គម្រោងអតិថិជនច្រើនក្នុងពេលតែមួយ។" }
    ],
  },
  {
    title: { en: 'React Native Developer', km: "អ្នកអភិវឌ្ឍន៍ React Native" },
    dept: { en: 'Mobile', km: "ទូរស័ព្ទ" },
    type: { en: 'Full-time', km: "ពេញម៉ោង" },
    location: { en: 'Phnom Penh', km: "ភ្នំពេញ" },
    deadline: '2026-05-28',
    tags: ['React Native', 'iOS', 'Android', '3+ yrs'],
    desc: { en: 'Build cross-platform mobile apps for clients across banking, retail, and healthcare. Experience with offline-first architecture is a plus.', km: "កសាងកម្មវិធីទូរស័ព្ទសម្រាប់អតិថិជននៅទូទាំងវិស័យធនាគារ លក់រាយ និងសុខាភិបាល។ បទពិសោធន៍ជាមួយស្ថាបត្យកម្ម offline-first គឺជាអត្ថប្រយោជន៍មួយ។" },
    responsibilities: [
      { en: 'Develop and maintain cross-platform mobile applications using React Native.', km: "អភិវឌ្ឍ និងថែទាំកម្មវិធីទូរស័ព្ទឆ្លងប្រព័ន្ធប្រតិបត្តិការដោយប្រើ React Native។" },
      { en: 'Implement offline-first data sync strategies for clients operating in low-connectivity environments.', km: "អនុវត្តយុទ្ធសាស្ត្រធ្វើសមកាលកម្មទិន្នន័យ offline-first សម្រាប់អតិថិជនដែលប្រតិបត្តិការក្នុងបរិស្ថានដែលមិនសូវមានការតភ្ជាប់អ៊ិនធឺណិត។" },
      { en: 'Work closely with backend engineers to define and consume REST and GraphQL APIs.', km: "ធ្វើការយ៉ាងជិតស្និទ្ធជាមួយវិស្វករផ្នែកខាងក្រោយដើម្បីកំណត់ និងប្រើប្រាស់ REST និង GraphQL APIs។" },
      { en: 'Profile and optimize app performance across a range of device tiers.', km: "ត្រួតពិនិត្យ និងធ្វើឱ្យប្រសើរឡើងនូវដំណើរការកម្មវិធីនៅទូទាំងឧបករណ៍ជាច្រើនកម្រិត។" },
      { en: 'Coordinate with QA to define test plans and resolve platform-specific issues.', km: "សម្របសម្រួលជាមួយក្រុមធានាគុណភាព (QA) ដើម្បីកំណត់ផែនការធ្វើតេស្ត និងដោះស្រាយបញ្ហាជាក់លាក់នៃប្រព័ន្ធប្រតិបត្តិការ។" }
    ],
    requirements: [
      { en: '3+ years shipping production React Native applications on iOS and Android.', km: "បទពិសោធន៍ ៣+ ឆ្នាំក្នុងការបញ្ចេញកម្មវិធី React Native នៅលើ iOS និង Android។" },
      { en: 'Solid understanding of native module integration and platform-specific build tooling.', km: "មានការយល់ដឹងច្បាស់លាស់អំពីការរួមបញ្ចូលម៉ូឌុលដើម និងឧបករណ៍បង្កើតជាក់លាក់នៃប្រព័ន្ធប្រតិបត្តិការ។" },
      { en: 'Experience with state management patterns at scale (Redux, Zustand, or similar).', km: "បទពិសោធន៍ជាមួយការគ្រប់គ្រង state (Redux, Zustand ឬស្រដៀងគ្នា) ក្នុងទំហំធំ។" },
      { en: 'Familiarity with app store submission and release processes for both platforms.', km: "ស្គាល់អំពីដំណើរការបញ្ជូន និងបញ្ចេញកម្មវិធីនៅលើ app store សម្រាប់ប្រព័ន្ធប្រតិបត្តិការទាំងពីរ។" }
    ],
    niceToHave: [
      { en: 'Exposure to native iOS (Swift) or Android (Kotlin) development.', km: "មានបទពិសោធន៍ក្នុងការអភិវឌ្ឍ iOS (Swift) ឬ Android (Kotlin) ដើម។" },
      { en: 'Experience in regulated industries such as banking or healthcare.', km: "បទពិសោធន៍ក្នុងឧស្សាហកម្មដែលមានការគ្រប់គ្រងខ្លាំងដូចជា ធនាគារ ឬសុខាភិបាល។" }
    ],
  },
  {
    title: { en: 'UI/UX Designer', km: "អ្នករចនា UI/UX" },
    dept: { en: 'Design', km: "ការរចនា" },
    type: { en: 'Full-time', km: "ពេញម៉ោង" },
    location: { en: 'Phnom Penh / Remote', km: "ភ្នំពេញ / ធ្វើការពីចម្ងាយ" },
    deadline: '2026-04-30',
    tags: ['Figma', 'User Research', 'Prototyping', '3+ yrs'],
    desc: { en: 'Lead end-to-end design for client products — from research and wireframes through to high-fidelity UI and developer handoff.', km: "ដឹកនាំការរចនាពីដើមដល់ចប់សម្រាប់ផលិតផលអតិថិជន — ពីការស្រាវជ្រាវ និង wireframes រហូតដល់ UI គុណភាពខ្ពស់ និងការប្រគល់ឱ្យអ្នកអភិវឌ្ឍន៍។" },
    responsibilities: [
      { en: 'Lead discovery and research to translate client requirements into clear product goals.', km: "ដឹកនាំការស្វែងយល់ និងការស្រាវជ្រាវដើម្បីបកប្រែតម្រូវការអតិថិជនទៅជាគោលដៅផលិតផលច្បាស់លាស់។" },
      { en: 'Produce wireframes, prototypes, and high-fidelity UI for web and mobile products.', km: "ផលិត wireframes គំរូ និង UI គុណភាពខ្ពស់សម្រាប់ផលិតផលគេហទំព័រ និងទូរស័ព្ទ។" },
      { en: 'Maintain and evolve design systems shared across multiple client engagements.', km: "ថែទាំ និងអភិវឌ្ឍប្រព័ន្ធរចនាដែលចែករំលែកនៅទូទាំងគម្រោងអតិថិជនជាច្រើន។" },
      { en: 'Facilitate usability testing and iterate on designs based on findings.', km: "សម្របសម្រួលការធ្វើតេស្តភាពងាយស្រួលប្រើប្រាស់ និងធ្វើការកែលម្អលើការរចនាដោយផ្អែកលើការរកឃើញ។" },
      { en: 'Partner with engineering during implementation to ensure design fidelity.', km: "សហការជាមួយវិស្វកម្មក្នុងអំឡុងពេលអនុវត្តដើម្បីធានាភាពត្រឹមត្រូវនៃការរចនា។" }
    ],
    requirements: [
      { en: '3+ years of product design experience with a strong portfolio of shipped work.', km: "បទពិសោធន៍ ៣+ ឆ្នាំនៃការរចនាផលិតផល ជាមួយស្នាដៃដ៏រឹងមាំដែលបានចេញផ្សាយ។" },
      { en: 'Expert-level proficiency in Figma, including component and variant systems.', km: "ជំនាញកម្រិតអ្នកជំនាញនៅក្នុង Figma រួមទាំងប្រព័ន្ធសមាសធាតុ និងប្រព័ន្ធ variant។" },
      { en: 'Demonstrated experience conducting user research and usability testing.', km: "បទពិសោធន៍ដែលបង្ហាញឱ្យឃើញក្នុងការធ្វើការស្រាវជ្រាវអ្នកប្រើប្រាស់ និងការធ្វើតេស្តភាពងាយស្រួលប្រើប្រាស់។" },
      { en: 'Ability to present and defend design decisions to non-design stakeholders.', km: "សមត្ថភាពក្នុងការបង្ហាញ និងការពារការសម្រេចចិត្តលើការរចនាដល់អ្នកពាក់ព័ន្ធដែលមិនមែនជាអ្នករចនា។" }
    ],
    niceToHave: [
      { en: 'Basic front-end coding literacy (HTML/CSS) for closer collaboration with engineers.', km: "ចំណេះដឹងសរសេរកូដ front-end ជាមូលដ្ឋាន (HTML/CSS) សម្រាប់កិច្ចសហការកាន់តែជិតស្និទ្ធជាមួយវិស្វករ។" },
      { en: 'Experience designing for both consumer and enterprise audiences.', km: "បទពិសោធន៍ក្នុងការរចនាសម្រាប់ទាំងទស្សនិកជនអ្នកប្រើប្រាស់ទូទៅ និងសហគ្រាស។" }
    ],
  },
  {
    title: { en: 'DevOps / Cloud Engineer', km: "វិស្វករ DevOps / Cloud" },
    dept: { en: 'Infrastructure', km: "ហេដ្ឋារចនាសម្ព័ន្ធ" },
    type: { en: 'Full-time', km: "ពេញម៉ោង" },
    location: { en: 'Phnom Penh', km: "ភ្នំពេញ" },
    deadline: '2026-07-03',
    tags: ['AWS', 'Kubernetes', 'Terraform', '4+ yrs'],
    desc: { en: 'Own cloud infrastructure for multiple client environments. You\'ll implement CI/CD pipelines, monitoring, and disaster recovery solutions.', km: "គ្រប់គ្រងហេដ្ឋារចនាសម្ព័ន្ធ cloud សម្រាប់បរិស្ថានអតិថិជនច្រើន។ អ្នកនឹងអនុវត្ត CI/CD pipelines ការត្រួតពិនិត្យ និងដំណោះស្រាយសង្គ្រោះទិន្នន័យពេលមានគ្រោះមហន្តរាយ។" },
    responsibilities: [
      { en: 'Design and maintain cloud infrastructure across multiple client AWS accounts.', km: "រចនា និងថែទាំហេដ្ឋារចនាសម្ព័ន្ធ cloud នៅទូទាំងគណនី AWS របស់អតិថិជនជាច្រើន។" },
      { en: 'Build and improve CI/CD pipelines to support frequent, reliable deployments.', km: "កសាង និងកែលម្អ CI/CD pipelines ដើម្បីគាំទ្រការដាក់ឱ្យប្រើប្រាស់ញឹកញាប់ និងអាចទុកចិត្តបាន។" },
      { en: 'Implement monitoring, alerting, and incident response processes.', km: "អនុវត្តដំណើរការត្រួតពិនិត្យ ការដាស់តឿន និងការឆ្លើយតបចំពោះឧប្បត្តិហេតុ។" },
      { en: 'Define and test disaster recovery and backup strategies for production systems.', km: "កំណត់ និងសាកល្បងយុទ្ធសាស្ត្រសង្គ្រោះពេលមានគ្រោះមហន្តរាយ និងការបម្រុងទុកសម្រាប់ប្រព័ន្ធផលិតកម្ម។" },
      { en: 'Enforce infrastructure security best practices and support client compliance audits.', km: "អនុវត្តការអនុវត្តល្អបំផុតលើសុវត្ថិភាពហេដ្ឋារចនាសម្ព័ន្ធ និងគាំទ្រសវនកម្មអនុលោមភាពរបស់អតិថិជន។" }
    ],
    requirements: [
      { en: '4+ years in a DevOps, SRE, or cloud infrastructure role.', km: "បទពិសោធន៍ ៤+ ឆ្នាំក្នុងតួនាទី DevOps, SRE, ឬហេដ្ឋារចនាសម្ព័ន្ធ cloud។" },
      { en: 'Hands-on experience with AWS core services and Kubernetes in production.', km: "បទពិសោធន៍ជាក់ស្តែងជាមួយសេវាកម្មស្នូលរបស់ AWS និង Kubernetes ក្នុងការផលិត។" },
      { en: 'Proficiency with infrastructure-as-code tooling, particularly Terraform.', km: "ជំនាញលើឧបករណ៍ហេដ្ឋារចនាសម្ព័ន្ធជាកូដ (IaC) ជាពិសេស Terraform។" },
      { en: 'Experience building CI/CD pipelines with tools such as GitHub Actions, GitLab CI, or Jenkins.', km: "បទពិសោធន៍ក្នុងការបង្កើត CI/CD pipelines ជាមួយឧបករណ៍ដូចជា GitHub Actions, GitLab CI, ឬ Jenkins។" }
    ],
    niceToHave: [
      { en: 'Relevant AWS certification (Solutions Architect or DevOps Engineer).', km: "មានវិញ្ញាបនបត្រ AWS ពាក់ព័ន្ធ (ស្ថាបត្យករដំណោះស្រាយ ឬវិស្វករ DevOps)។" },
      { en: 'Experience supporting clients in regulated or compliance-heavy industries.', km: "បទពិសោធន៍ក្នុងការគាំទ្រអតិថិជនក្នុងឧស្សាហកម្មដែលមានការគ្រប់គ្រង និងអនុលោមភាពខ្លាំង។" }
    ],
  },
  {
    title: { en: 'Project Manager', km: "អ្នកគ្រប់គ្រងគម្រោង" },
    dept: { en: 'Delivery', km: "ការប្រគល់គម្រោង" },
    type: { en: 'Full-time', km: "ពេញម៉ោង" },
    location: { en: 'Phnom Penh', km: "ភ្នំពេញ" },
    deadline: '2026-05-08',
    tags: ['Agile', 'PMP preferred', 'Enterprise', '4+ yrs'],
    desc: { en: 'Lead delivery of complex, multi-stakeholder software projects. You\'ll own timelines, client relationships, and sprint ceremonies.', km: "ដឹកនាំការផ្តល់គម្រោងសូហ្វវែរដ៏ស្មុគស្មាញ និងមានអ្នកពាក់ព័ន្ធច្រើន។ អ្នកនឹងគ្រប់គ្រងកាលវិភាគ ទំនាក់ទំនងអតិថិជន និងកម្មវិធី sprint ។" },
    responsibilities: [
      { en: 'Own delivery of software projects from kickoff through launch and handover.', km: "គ្រប់គ្រងការប្រគល់គម្រោងសូហ្វវែរចាប់ពីការចាប់ផ្តើម រហូតដល់ការដាក់ឱ្យដំណើរការ និងការប្រគល់។" },
      { en: 'Manage client relationships, including expectation-setting and status reporting.', km: "គ្រប់គ្រងទំនាក់ទំនងអតិថិជន រួមទាំងការកំណត់ការរំពឹងទុក និងការរាយការណ៍អំពីស្ថានភាព។" },
      { en: 'Run sprint planning, standups, and retrospectives across cross-functional teams.', km: "ដំណើរការការរៀបចំផែនការ sprint ការប្រជុំប្រចាំថ្ងៃ និងការវាយតម្លៃអតីតកាលនៅទូទាំងក្រុមចម្រុះ។" },
      { en: 'Track scope, budget, and timeline, escalating risks before they become blockers.', km: "តាមដានវិសាលភាព ថវិកា និងកាលវិភាគ ដោយលើកឡើងពីហានិភ័យមុនពេលវាអាក់ខានដល់ការងារ។" },
      { en: 'Coordinate across engineering, design, and QA to keep delivery on schedule.', km: "សម្របសម្រួលជាមួយវិស្វកម្ម ការរចនា និង QA ដើម្បីរក្សាការប្រគល់គម្រោងតាមកាលវិភាគ។" }
    ],
    requirements: [
      { en: '4+ years managing software delivery projects, ideally in a client-services setting.', km: "បទពិសោធន៍ ៤+ ឆ្នាំក្នុងការគ្រប់គ្រងគម្រោងប្រគល់សូហ្វវែរ គួរតែនៅក្នុងបរិបទសេវាកម្មអតិថិជន។" },
      { en: 'Strong working knowledge of Agile and Scrum methodologies.', km: "មានចំណេះដឹងការងារខ្លាំងលើវិធីសាស្ត្រ Agile និង Scrum។" },
      { en: 'Proven ability to manage multiple concurrent projects and stakeholders.', km: "មានសមត្ថភាពដែលបង្ហាញឱ្យឃើញក្នុងការគ្រប់គ្រងគម្រោង និងអ្នកពាក់ព័ន្ធច្រើនក្នុងពេលតែមួយ។" },
      { en: 'Excellent written and verbal communication skills in English.', km: "ជំនាញប្រាស្រ័យទាក់ទងជាភាសាអង់គ្លេសទាំងសំណេរ និងពាក្យសំដីបានល្អប្រសើរ។" }
    ],
    niceToHave: [
      { en: 'PMP or equivalent project management certification.', km: "មានវិញ្ញាបនបត្រ PMP ឬវិញ្ញាបនបត្រគ្រប់គ្រងគម្រោងដែលស្មើនឹងនេះ។" },
      { en: 'Experience with enterprise clients in finance, healthcare, or retail.', km: "បទពិសោធន៍ជាមួយអតិថិជនសហគ្រាសក្នុងវិស័យហិរញ្ញវត្ថុ សុខាភិបាល ឬការលក់រាយ។" }
    ],
  },
  {
    title: { en: 'Backend Engineer (Python)', km: "វិស្វករ Backend (Python)" },
    dept: { en: 'Engineering', km: "វិស្វកម្ម" },
    type: { en: 'Full-time', km: "ពេញម៉ោង" },
    location: { en: 'Phnom Penh / Remote', km: "ភ្នំពេញ / ធ្វើការពីចម្ងាយ" },
    deadline: '2026-06-25',
    tags: ['Python', 'Django', 'PostgreSQL', '3+ yrs'],
    desc: { en: 'Design and build RESTful APIs, background jobs, and data pipelines for enterprise clients across healthcare and finance.', km: "[KM] Design and build RESTful APIs, background jobs, and data pipelines for enterprise clients across healthcare and finance." },
    responsibilities: [
      { en: 'Design and implement RESTful APIs serving web and mobile clients.', km: "[KM] Design and implement RESTful APIs serving web and mobile clients." },
      { en: 'Build and maintain background job processing and data pipelines.', km: "[KM] Build and maintain background job processing and data pipelines." },
      { en: 'Write and maintain automated tests to ensure system reliability.', km: "[KM] Write and maintain automated tests to ensure system reliability." },
      { en: 'Optimize database schemas and queries for performance at scale.', km: "[KM] Optimize database schemas and queries for performance at scale." },
      { en: 'Participate in code reviews and contribute to backend architecture decisions.', km: "[KM] Participate in code reviews and contribute to backend architecture decisions." }
    ],
    requirements: [
      { en: '3+ years of production experience with Python and Django or a comparable framework.', km: "[KM] 3+ years of production experience with Python and Django or a comparable framework." },
      { en: 'Strong understanding of relational database design, particularly PostgreSQL.', km: "[KM] Strong understanding of relational database design, particularly PostgreSQL." },
      { en: 'Experience designing and documenting RESTful APIs.', km: "[KM] Experience designing and documenting RESTful APIs." },
      { en: 'Familiarity with automated testing practices and CI pipelines.', km: "[KM] Familiarity with automated testing practices and CI pipelines." }
    ],
    niceToHave: [
      { en: 'Experience in healthcare or financial services with data compliance requirements.', km: "[KM] Experience in healthcare or financial services with data compliance requirements." },
      { en: 'Exposure to asynchronous task queues such as Celery.', km: "[KM] Exposure to asynchronous task queues such as Celery." }
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
  { icon: 'salary', title: { en: 'Competitive Salary', km: "ប្រាក់ខែសមរម្យ" }, desc: { en: 'Market-rate salaries benchmarked against Singapore and Bangkok — with performance bonuses.', km: "[KM] Market-rate salaries benchmarked against Singapore and Bangkok — with performance bonuses." } },
  { icon: 'remote', title: { en: 'Remote-Friendly', km: "[KM] Remote-Friendly" }, desc: { en: 'Most roles are fully remote or hybrid. We care about output, not hours at a desk.', km: "[KM] Most roles are fully remote or hybrid. We care about output, not hours at a desk." } },
  { icon: 'learning', title: { en: 'Learning Budget', km: "ថវិកាសិក្សា" }, desc: { en: '$1,200 USD / year for courses, certifications, conferences, and books.', km: "[KM] $1,200 USD / year for courses, certifications, conferences, and books." } },
  { icon: 'health', title: { en: 'Health Insurance', km: "ការធានារ៉ាប់រងសុខភាព" }, desc: { en: 'Full private health insurance for you and your immediate family, from day one.', km: "[KM] Full private health insurance for you and your immediate family, from day one." } },
  { icon: 'hours', title: { en: 'Flexible Hours', km: "[KM] Flexible Hours" }, desc: { en: 'Core hours 10am–4pm. Outside of that, work when you\'re most productive.', km: "[KM] Core hours 10am–4pm. Outside of that, work when you're most productive." } },
  { icon: 'leave', title: { en: '20 Days Annual Leave', km: "[KM] 20 Days Annual Leave" }, desc: { en: 'Plus all Cambodian public holidays. We believe in proper rest.', km: "[KM] Plus all Cambodian public holidays. We believe in proper rest." } },
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
        badge={language === 'km' ? "ឱកាសការងារនៅ KhmerSoftware" : "Careers at KhmerSoftware"}
        title={language === 'km' ? "កសាងអនាគតនៃ" : "Build the Future of"}
        titleHighlight={language === 'km' ? "បច្ចេកវិទ្យានៅកម្ពុជា" : "Tech in Cambodia"}
        subtitle={language === 'km' ? "ចូលរួមជាមួយក្រុមវិស្វករ អ្នករចនា និងអ្នកកសាងដ៏មានមហិច្ឆតាដែលកំពុងធ្វើការលើគម្រោងសំខាន់ៗ — សម្រាប់ម៉ាកល្បីៗ និងក្រុមហ៊ុន startup របស់កម្ពុជា។" : "Join a team of ambitious engineers, designers, and builders working on projects that matter — for Cambodia's biggest brands and fastest-growing startups."}
        accentColor={COLORS.blue}
        accentColor2={COLORS.accent}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="careers-container">
          {/* Culture Section */}
          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: 48, alignItems: 'center', padding: '72px 0 64px' }}>
              <div>
                <div className="section-eyebrow">{language === 'km' ? "វប្បធម៌របស់យើង" : "Our Culture"}</div>
                <h2 className="section-heading" style={{ marginBottom: 20, lineHeight: 1.2 }}>
                  {language === 'km' ? "កន្លែងដែលវិស្វករឆ្នើមរីកចម្រើន" : "A Place Where Great Engineers Thrive"}
                </h2>
                <p style={{ color: COLORS.muted, fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
                  {language === 'km' ? "យើងជឿជាក់ថាសូហ្វវែរល្អបំផុតកើតចេញពីវិស្វករដែលមានសុភមង្គល មានអំណាច និងរីកចម្រើនឥតឈប់ឈរ។ យើងវិនិយោគយ៉ាងច្រើនលើការអភិវឌ្ឍជំនាញវិជ្ជាជីវៈ សុខុមាលភាព និងតុល្យភាពការងារ-ជីវិតរបស់ក្រុមយើង។" : "We believe the best software comes from happy, empowered, and continually-growing engineers. We invest heavily in our team's professional development, wellbeing, and work-life balance."}
                </p>
                <p style={{ color: COLORS.muted, fontSize: 16, lineHeight: 1.8 }}>
                  {language === 'km' ? "ក្រុមតូចៗ ស្វ័យភាពធំ។ អ្នកនឹងទទួលខុសត្រូវមុខងារពីដើមដល់ចប់ និងមានឥទ្ធិពលផ្ទាល់លើសេដ្ឋកិច្ចឌីជីថលរបស់កម្ពុជា។" : "Small teams, big autonomy. You'll own features end-to-end and have a direct impact on Cambodia's digital economy."}
                </p>
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
              <div className="section-eyebrow">{language === 'km' ? "ហេតុអ្វីចូលរួមជាមួយយើង" : "Why Join Us"}</div>
              <h2 className="section-heading">{language === 'km' ? 'អត្ថប្រយោជន៍ និងអត្ថប្រយោជន៍ផ្សេងៗ' : 'Benefits & Perks'}</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))', gap: 16, marginBottom: 80 }}>
            {PERKS.map((p, i) => (
              <ScrollReveal key={i} delay={i * 50} direction="up">
                <div className="perk-card">
                  <div className="perk-icon">{PERK_ICONS[p.icon]}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: COLORS.ink, marginBottom: 8 }}>{getText(p.title, language)}</h3>
                  <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.6, margin: 0 }}>{getText(p.desc, language)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Open Roles */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              <div className="section-eyebrow">{language === 'km' ? "ឱកាសការងារ" : "Careers"}</div>
              <h2 className="section-heading">{language === 'km' ? "មុខតំណែងបើកចំហ" : "Open Positions"}</h2>
            </div>
            <p style={{ color: 'rgba(26,26,46,0.5)', fontSize: 14.5, textAlign: 'center', marginBottom: 40 }}>
              {language === 'km' ? "ចុចលើមុខតំណែងណាមួយដើម្បីមើលព័ត៌មានលម្អិត និងដាក់ពាក្យ។" : "Click any role to see details and apply."}
            </p>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 80 }}>
            {JOBS.map((job, i) => {
              const deptEn = getText(job.dept, 'en');
              const dc = DEPT_COLOR[deptEn] ?? COLORS.blue;
              return (
                <ScrollReveal key={i} delay={i * 40}>
                  <div className="job-card" onClick={() => setOpenJob(openJob === i ? null : i)}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: 4, background: dc, flexShrink: 0 }} />
                      <div style={{ flex: 1, padding: '28px 32px', display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' as const }}>
                        <div style={{ flex: 1, minWidth: 280 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.ink, margin: 0 }}>{getText(job.title, language)}</h3>
                            <span style={{ fontSize: 12, color: dc, fontWeight: 700, padding: '3px 10px', background: `${dc}12`, borderRadius: 5 }}>{getText(job.dept, language)}</span>
                            {isClosed(job.deadline) && (
                              <span className="closed-badge">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="M9 12l2 2 4-4"></path></svg>
                                {language === 'km' ? 'បានបិទការទទួលពាក្យ' : 'Applications Closed'}
                              </span>
                            )}
                          </div>

                          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
                            <span style={{ fontSize: 13, color: 'rgba(26,26,46,0.6)', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                              {getText(job.type, language)}
                            </span>
                            <span style={{ fontSize: 13, color: 'rgba(26,26,46,0.6)', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                              {getText(job.location, language)}
                            </span>
                            <span style={{ fontSize: 13, color: 'rgba(26,26,46,0.5)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                              {language === 'km' ? 'ផុតកំណត់ ' : 'Closed '} {job.deadline}
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
                        <p style={{ fontSize: 15, color: 'rgba(26,26,46,0.75)', lineHeight: 1.8, margin: '22px 0', maxWidth: 840 }}>{getText(job.desc, language)}</p>

                        <div style={{ maxWidth: 840 }}>
                          <div className="detail-heading">{language === 'km' ? 'ទំនួលខុសត្រូវ' : 'Responsibilities'}</div>
                          <ul className="detail-list">
                            {job.responsibilities.map((r, ri) => <li key={ri}>{getText(r, language)}</li>)}
                          </ul>

                          <div className="detail-heading">{language === 'km' ? 'តម្រូវការ' : 'Requirements'}</div>
                          <ul className="detail-list">
                            {job.requirements.map((r, ri) => <li key={ri}>{getText(r, language)}</li>)}
                          </ul>

                          <div className="detail-heading">{language === 'km' ? 'ចំណុចបន្ថែមដែលមានប្រៀប' : 'Nice to Have'}</div>
                          <ul className="detail-list">
                            {job.niceToHave.map((r, ri) => <li key={ri}>{getText(r, language)}</li>)}
                          </ul>
                        </div>

                        <div style={{ marginTop: 24 }}>
                          {isClosed(job.deadline) ? (
                            <span className="closed-btn" onClick={(e) => e.stopPropagation()}>
                              {language === 'km' ? 'បានបិទការទទួលពាក្យ' : 'Applications Closed'}
                            </span>
                          ) : (
                            <a
                              href={`/${language}/contact`}
                              className="apply-btn"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {language === 'km' ? 'ដាក់ពាក្យសម្រាប់មុខតំណែងនេះ' : 'Apply for this Position'}
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
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(22px,3.6vw,30px)', color: '#fff', marginBottom: 12 }}>
                {language === 'km' ? 'មិនឃើញមុខតំណែងសមស្របមែនទេ?' : "Don't see the right role?"}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15.5, marginBottom: 26 }}>
                {language === 'km' ? 'ផ្ញើប្រវត្តិរូប (CV) របស់អ្នកមកយើង។ យើងតែងតែរីកចម្រើន និងស្វែងរកបុគ្គលិកឆ្នើម។' : "Send us your CV anyway. We're always growing and looking for exceptional people."}
              </p>
              <a href={`/${language}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 30px', borderRadius: 8, fontWeight: 600, fontSize: 13.5, background: '#fff', color: COLORS.navy, textDecoration: 'none' }}>
                {language === 'km' ? 'ផ្ញើប្រវត្តិរូបរបស់អ្នក →' : 'Send Your CV →'}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}