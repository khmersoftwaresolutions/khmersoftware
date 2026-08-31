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
const LandmarkIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>;
const BuildingIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const ShoppingCartIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const TruckIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const HeartPulseIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const CreditCardIcon = () => <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;

function IconBox({ color, Icon, size = 80 }: { color: string; Icon: React.FC; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size > 80 ? 24 : 18, background: `linear-gradient(135deg, ${color}22, ${color}0d)`, border: `1.5px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
      <Icon />
    </div>
  );
}

const FILTERS = [
  { id: 'All', en: 'All', km: 'ទាំងអស់' },
  { id: 'Finance', en: 'Finance', km: 'ហិរញ្ញវត្ថុ' },
  { id: 'Healthcare', en: 'Healthcare', km: 'សុខាភិបាល' },
  { id: 'Government', en: 'Government', km: 'រដ្ឋាភិបាល' },
  { id: 'E-Commerce', en: 'E-Commerce', km: 'ពាណិជ្ជកម្មអេឡិចត្រូនិក' },
  { id: 'Logistics', en: 'Logistics', km: 'ឡូជីស្ទិក' }
];

type Localized = string | { en?: string; km?: string };

function getText(val: Localized | undefined, lang: string): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  return (lang === 'km' ? val.km : val.en) || val.en || val.km || '';
}

type CaseStudy = {
  client: Localized;
  industry: Localized;
  Icon: React.FC;
  color: string;
  title: Localized;
  challenge: Localized;
  solution: Localized;
  results: { metric: Localized; desc: Localized }[];
  tech: string[];
  duration: Localized;
};

const CASES: CaseStudy[] = [
  {
    client: { en: 'MajorBank Cambodia', km: "ធនាគារ MajorBank កម្ពុជា" },
    industry: { en: 'Finance', km: "ហិរញ្ញវត្ថុ" },
    Icon: LandmarkIcon,
    color: COLORS.cyan,
    title: { en: 'Digital Banking Platform for 500K Customers', km: "វេទិកាធនាគារឌីជីថលសម្រាប់អតិថិជន ៥០០ ពាន់នាក់" },
    challenge: { en: 'MajorBank needed to replace a 15-year-old core banking UI with a modern mobile-first digital banking experience — without any downtime during the transition.', km: "MajorBank ត្រូវការជំនួសប្រព័ន្ធធនាគារចាស់អាយុ ១៥ ឆ្នាំជាមួយនឹងបទពិសោធន៍ធនាគារឌីជីថលតាមទូរស័ព្ទដៃដ៏ទំនើប — ដោយមិនមានការរំខានសេវាកម្មក្នុងអំឡុងពេលផ្លាស់ប្តូរ។" },
    solution: { en: 'We built a strangler-fig migration, gradually replacing modules of the legacy system with a new React Native mobile app and Next.js web portal — both powered by a new GraphQL API layer sitting in front of the unchanged core banking system.', km: "យើងបានបង្កើតការផ្លាស់ប្តូរបែប strangler-fig ដោយជំនួសម៉ូឌុលនៃប្រព័ន្ធចាស់ៗបន្តិចម្តងៗជាមួយកម្មវិធីទូរស័ព្ទ React Native និងវិបផតថល Next.js — ដែលដំណើរការដោយស្រទាប់ API GraphQL ថ្មីនៅពីមុខប្រព័ន្ធធនាគារស្នូលដែលមិនផ្លាស់ប្តូរ។" },
    results: [
      { metric: { en: '500K+', km: "៥០០ ពាន់+" }, desc: { en: 'Active users at launch', km: "អ្នកប្រើប្រាស់សកម្មនៅពេលសម្ពោធ" } },
      { metric: { en: '4.8★', km: "៤.៨★" }, desc: { en: 'App Store rating', km: "ចំណាត់ថ្នាក់ App Store" } },
      { metric: { en: '0 min', km: "០ នាទី" }, desc: { en: 'Downtime during migration', km: "ពេលវេលាអសកម្មអំឡុងពេលផ្លាស់ប្តូរ" } },
      { metric: { en: '62%', km: "៦២%" }, desc: { en: 'Reduction in support tickets', km: "ការកាត់បន្ថយការស្នើសុំជំនួយ" } },
    ],
    tech: ['React Native', 'Next.js', 'GraphQL', 'AWS', 'PostgreSQL'],
    duration: { en: '14 months', km: "១៤ ខែ" },
  },
  {
    client: { en: 'Ministry of Health Cambodia', km: "ក្រសួងសុខាភិបាលកម្ពុជា" },
    industry: { en: 'Government', km: "រដ្ឋាភិបាល" },
    Icon: BuildingIcon,
    color: COLORS.blue,
    title: { en: 'National Health Information System', km: "ប្រព័ន្ធព័ត៌មានសុខាភិបាលជាតិ" },
    challenge: { en: 'Cambodia\'s 1,200+ health facilities were using paper records and 12 incompatible software systems. Patient data could not be shared across facilities, leading to duplicated tests and delayed diagnoses.', km: "មណ្ឌលសុខភាពជាង ១,២០០ របស់កម្ពុជាកំពុងប្រើប្រាស់កំណត់ត្រាក្រដាស និងប្រព័ន្ធកម្មវិធីមិនស៊ីគ្នាចំនួន ១២។ ទិន្នន័យអ្នកជំងឺមិនអាចចែករំលែករវាងមណ្ឌលបានទេ ដែលនាំឱ្យមានការពិនិត្យស្ទួន និងការពន្យារពេលការធ្វើរោគវិនិច្ឆ័យ។" },
    solution: { en: 'We designed and built a national health information platform on AWS GovCloud, with offline-capable tablets for rural clinics, biometric patient identification, and a central analytics dashboard for Ministry policymakers.', km: "យើងបានរចនា និងបង្កើតវេទិកាព័ត៌មានសុខាភិបាលជាតិនៅលើ AWS GovCloud ជាមួយនឹងថេប្លេតដែលអាចប្រើក្រៅបណ្តាញសម្រាប់គ្លីនិកជនបទ ការកំណត់អត្តសញ្ញាណអ្នកជំងឺដោយជីវមាត្រ និងផ្ទាំងគ្រប់គ្រងវិភាគកណ្តាលសម្រាប់អ្នកធ្វើគោលនយោបាយក្រសួង។" },
    results: [
      { metric: { en: '1,200+', km: "១,២០០+" }, desc: { en: 'Health facilities onboarded', km: "មណ្ឌលសុខភាពដែលបានដាក់បញ្ចូល" } },
      { metric: { en: '3.2M', km: "៣.២ លាន" }, desc: { en: 'Patient records digitised', km: "កំណត់ត្រាអ្នកជំងឺត្រូវបានធ្វើឌីជីថល" } },
      { metric: { en: '40%', km: "៤០%" }, desc: { en: 'Reduction in duplicate tests', km: "ការកាត់បន្ថយការពិនិត្យស្ទួន" } },
      { metric: { en: '99.9%', km: "៩៩.៩%" }, desc: { en: 'System uptime', km: "ពេលវេលាដំណើរការប្រព័ន្ធ" } },
    ],
    tech: ['React', 'Django', 'PostgreSQL', 'AWS GovCloud', 'Flutter'],
    duration: { en: '24 months', km: "២៤ ខែ" },
  },
  {
    client: { en: 'RetailCo (Confidential)', km: "RetailCo (សម្ងាត់)" },
    industry: { en: 'E-Commerce', km: "ពាណិជ្ជកម្មអេឡិចត្រូនិក" },
    Icon: ShoppingCartIcon,
    color: COLORS.green,
    title: { en: 'E-Commerce Platform Scaling from 0 to 2M Users', km: "វេទិកាពាណិជ្ជកម្មអេឡិចត្រូនិកដែលពង្រីកពី ០ ដល់ ២ លានអ្នកប្រើប្រាស់" },
    challenge: { en: 'A fast-growing Cambodian retailer launched an e-commerce platform that worked at 10,000 users but collapsed under load during promotions. Their peak traffic was 200x normal volume.', km: "អ្នកលក់រាយកម្ពុជាដែលកំពុងរីកចម្រើនយ៉ាងឆាប់រហ័សបានបើកដំណើរការវេទិកាពាណិជ្ជកម្មអេឡិចត្រូនិកដែលដំណើរការនៅអ្នកប្រើប្រាស់ ១០,០០០ នាក់ ប៉ុន្តែបានដួលរលំក្រោមបន្ទុកអំឡុងពេលប្រូម៉ូសិន។ ចរាចរណ៍កំពូលរបស់ពួកគេគឺ ២០០ ដងនៃបរិមាណធម្មតា។" },
    solution: { en: 'Complete re-architecture to event-driven microservices on Kubernetes, with Redis caching, ElasticSearch for product search, a CDN for static assets, and database read replicas. We implemented auto-scaling policies that handle 300x normal traffic with no pre-provisioning.', km: "ការរៀបចំស្ថាបត្យកម្មឡើងវិញពេញលេញទៅជា microservices ផ្អែកលើព្រឹត្តិការណ៍នៅលើ Kubernetes ជាមួយ Redis caching, ElasticSearch សម្រាប់ការស្វែងរកផលិតផល, CDN សម្រាប់ទ្រព្យសម្បត្តិឋិតិវន្ត និងការចម្លងការអានមូលដ្ឋានទិន្នន័យ។ យើងបានអនុវត្តគោលនយោបាយពង្រីកដោយស្វ័យប្រវត្តិដែលគ្រប់គ្រងចរាចរណ៍ធម្មតា ៣០០ ដងដោយមិនចាំបាច់មានការផ្តល់ជូនជាមុន។" },
    results: [
      { metric: { en: '2M+', km: "២ លាន+" }, desc: { en: 'Concurrent users handled', km: "អ្នកប្រើប្រាស់ដំណាលគ្នាដែលបានគ្រប់គ្រង" } },
      { metric: { en: '99.99%', km: "៩៩.៩៩%" }, desc: { en: 'Uptime during peak sale', km: "ពេលវេលាដំណើរការអំឡុងពេលលក់កំពូល" } },
      { metric: { en: '120ms', km: "១២០ms" }, desc: { en: 'P95 API response time', km: "ពេលវេលាឆ្លើយតប P95 API" } },
      { metric: { en: '45%', km: "៤៥%" }, desc: { en: 'Infrastructure cost reduction', km: "ការកាត់បន្ថយថ្លៃដើមហេដ្ឋារចនាសម្ព័ន្ធ" } },
    ],
    tech: ['Next.js', 'Kubernetes', 'Redis', 'Elasticsearch', 'PostgreSQL'],
    duration: { en: '8 months', km: "៨ ខែ" },
  },
  {
    client: { en: 'PhnomPenh Logistics Group', km: "ក្រុមឡូជីស្ទិកភ្នំពេញ" },
    industry: { en: 'Logistics', km: "ឡូជីស្ទិក" },
    Icon: TruckIcon,
    color: COLORS.yellow,
    title: { en: 'Real-Time Fleet Management & Last-Mile Delivery', km: "ការគ្រប់គ្រងកងនាវា និងការដឹកជញ្ជូនដំណាក់កាលចុងក្រោយតាមពេលវេលាជាក់ស្តែង" },
    challenge: { en: 'Managing 450 delivery vehicles with paper manifests, WhatsApp for dispatch, and no customer visibility was creating 23% failed delivery rates and severe operational inefficiency.', km: "ការគ្រប់គ្រងយានជំនិះដឹកជញ្ជូន ៤៥០ គ្រឿងដោយប្រើឯកសារក្រដាស, WhatsApp សម្រាប់បញ្ជូន និងគ្មានភាពមើលឃើញសម្រាប់អតិថិជន បានបង្កើតអត្រាដឹកជញ្ជូនបរាជ័យ ២៣% និងអសមត្ថភាពប្រតិបត្តិការធ្ងន់ធ្ងរ។" },
    solution: { en: 'Built a driver mobile app (offline-capable), a dispatcher web console, and a customer tracking portal — all communicating via WebSockets for real-time GPS updates. Integrated with Wing and ABA Pay for cashless collections.', km: "បង្កើតកម្មវិធីទូរស័ព្ទដៃសម្រាប់អ្នកបើកបរ (អាចប្រើក្រៅបណ្តាញ), កុងសូលគេហទំព័រសម្រាប់អ្នកបញ្ជូន និងវិបផតថលតាមដានអតិថិជន — ទាំងអស់ទំនាក់ទំនងតាមរយៈ WebSockets សម្រាប់ការធ្វើបច្ចុប្បន្នភាព GPS តាមពេលវេលាជាក់ស្តែង។ បានរួមបញ្ចូលជាមួយ Wing និង ABA Pay សម្រាប់ការប្រមូលប្រាក់ដោយមិនប្រើសាច់ប្រាក់។" },
    results: [
      { metric: { en: '450', km: "៤៥០" }, desc: { en: 'Vehicles tracked live', km: "យានជំនិះតាមដានផ្ទាល់" } },
      { metric: { en: '23%→6%', km: "២៣%→៦%" }, desc: { en: 'Failed delivery rate', km: "អត្រាដឹកជញ្ជូនបរាជ័យ" } },
      { metric: { en: '35%', km: "៣៥%" }, desc: { en: 'Increase in deliveries/driver', km: "ការកើនឡើងនៃការដឹកជញ្ជូន/អ្នកបើកបរ" } },
      { metric: { en: '4.9★', km: "៤.៩★" }, desc: { en: 'Customer satisfaction score', km: "ពិន្ទុពេញចិត្តរបស់អតិថិជន" } },
    ],
    tech: ['React Native', 'Node.js', 'WebSockets', 'MongoDB', 'GCP Maps'],
    duration: { en: '6 months', km: "៦ ខែ" },
  },
  {
    client: { en: 'KhmerHealth Private Hospital', km: "មន្ទីរពេទ្យឯកជនខ្មែរសុខភាព" },
    industry: { en: 'Healthcare', km: "សុខាភិបាល" },
    Icon: HeartPulseIcon,
    color: COLORS.cyan,
    title: { en: 'Hospital Information System & Patient Portal', km: "ប្រព័ន្ធព័ត៌មានមន្ទីរពេទ្យ និងវិបផតថលអ្នកជំងឺ" },
    challenge: { en: 'A private hospital chain was running billing, appointments, pharmacy, and lab results on 4 separate systems that couldn\'t share data — leading to billing errors and patient safety risks.', km: "បណ្តាញមន្ទីរពេទ្យឯកជនមួយកំពុងដំណើរការការទូទាត់, ការណាត់ជួប, ឱសថស្ថាន និងលទ្ធផលមន្ទីរពិសោធន៍នៅលើប្រព័ន្ធដាច់ដោយឡែកចំនួន ៤ ដែលមិនអាចចែករំលែកទិន្នន័យបាន — ដែលនាំឱ្យមានកំហុសក្នុងការទូទាត់ និងហានិភ័យសុវត្ថិភាពអ្នកជំងឺ។" },
    solution: { en: 'Designed and built an integrated HIS covering patient registration, appointments, ward management, pharmacy, laboratory, radiology, and billing — with a patient-facing mobile app for records access and appointment booking.', km: "បានរចនា និងបង្កើត HIS រួមបញ្ចូលដែលគ្របដណ្តប់លើការចុះឈ្មោះអ្នកជំងឺ, ការណាត់ជួប, ការគ្រប់គ្រងវួដ, ឱសថស្ថាន, មន្ទីរពិសោធន៍, កាំរស្មីវិទ្យុ និងការទូទាត់ — ជាមួយនឹងកម្មវិធីទូរស័ព្ទដៃសម្រាប់អ្នកជំងឺដើម្បីចូលប្រើកំណត់ត្រា និងការកក់ការណាត់ជួប។" },
    results: [
      { metric: { en: '60%', km: "៦០%" }, desc: { en: 'Reduction in billing errors', km: "ការកាត់បន្ថយការខុសឆ្គងក្នុងការទូទាត់" } },
      { metric: { en: '4x', km: "៤ដង" }, desc: { en: 'Faster patient discharge', km: "ការចេញពីមន្ទីរពេទ្យលឿនជាងមុន" } },
      { metric: { en: '12', km: "១២" }, desc: { en: 'Departments integrated', km: "នាយកដ្ឋានដែលបានរួមបញ្ចូល" } },
      { metric: { en: 'HL7 FHIR', km: "HL7 FHIR" }, desc: { en: 'Standards compliant', km: "អនុលោមតាមស្តង់ដារ" } },
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'HL7 FHIR', 'AWS'],
    duration: { en: '18 months', km: "១៨ ខែ" },
  },
  {
    client: { en: 'AngkorFinance', km: "អង្គរហិរញ្ញវត្ថុ" },
    industry: { en: 'Finance', km: "ហិរញ្ញវត្ថុ" },
    Icon: CreditCardIcon,
    color: COLORS.blue,
    title: { en: 'Microfinance Loan Origination Platform', km: "វេទិកាផ្តល់ប្រាក់កម្ចីមីក្រូហិរញ្ញវត្ថុ" },
    challenge: { en: 'Processing rural loan applications took 3–5 days with paper forms, manual credit scoring, and branch-only approval processes — leaving potential borrowers underserved.', km: "ការដំណើរការសំណើកម្ចីនៅជនបទចំណាយពេល ៣–៥ ថ្ងៃដោយប្រើទម្រង់ក្រដាស, ការវាយតម្លៃឥណទានដោយដៃ, និងដំណើរការអនុម័តតែនៅសាខា — ដែលធ្វើឱ្យអ្នកខ្ចីដែលមានសក្តានុពលមិនទទួលបានសេវាគ្រប់គ្រាន់។" },
    solution: { en: 'Built a mobile-first loan origination platform with digital application, AI-assisted credit scoring using alternative data, biometric KYC, and automated workflow routing. Field officers can process applications offline in villages.', km: "បានបង្កើតវេទិកាបង្កើតប្រាក់កម្ចីតាមទូរស័ព្ទដៃជាមួយនឹងពាក្យសុំឌីជីថល, ការវាយតម្លៃឥណទានដោយជំនួយ AI ដោយប្រើទិន្នន័យជំនួស, KYC ជីវមាត្រ និងការកំណត់ផ្លូវការងារដោយស្វ័យប្រវត្តិ។ មន្ត្រីវាលអាចដំណើរការពាក្យសុំក្រៅបណ្តាញនៅក្នុងភូមិ។" },
    results: [
      { metric: { en: '3 days→4 hours', km: "៣ថ្ងៃ→៤ម៉ោង" }, desc: { en: 'Loan approval time', km: "ពេលវេលាអនុម័តកម្ចី" } },
      { metric: { en: '3x', km: "៣ដង" }, desc: { en: 'Applications processed', km: "ពាក្យសុំដែលបានដំណើរការ" } },
      { metric: { en: '28%', km: "២៨%" }, desc: { en: 'Reduction in default rate', km: "ការកាត់បន្ថយអត្រាខកខានសង" } },
      { metric: { en: '$12M', km: "$១២ លាន" }, desc: { en: 'Loans disbursed monthly', km: "ប្រាក់កម្ចីដែលបានផ្តល់ជារៀងរាល់ខែ" } },
    ],
    tech: ['Flutter', 'Python', 'TensorFlow', 'PostgreSQL', 'AWS'],
    duration: { en: '10 months', km: "១០ ខែ" },
  },
];

export default function CaseStudiesPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const filtered = filter === 'All' ? CASES : CASES.filter(c => getText(c.industry, 'en') === filter);

  const pageStyles = `
    body { background: #f8f9fc; margin: 0; font-family: var(--font-dm-sans), 'DM Sans', sans-serif; }
    .cs-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
    .cs-card { background: rgba(255,255,255,0.92); border: 1px solid rgba(5,5,69,0.07); border-radius: 22px; overflow: hidden; box-shadow: 0 4px 16px rgba(5,5,69,0.05); transition: all 0.3s ease; }
    .cs-card:hover { box-shadow: 0 16px 48px rgba(5,5,69,0.1); }
    .filter-btn { padding: 8px 18px; border-radius: 100px; border: 1.5px solid rgba(5,5,69,0.1); background: white; color: rgba(5,5,69,0.6); font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.25s ease; }
    .filter-btn:hover, .filter-btn.active { background: #050545; color: white; border-color: #050545; }
    .tech-chip { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 6px; background: rgba(5,5,69,0.05); color: rgba(5,5,69,0.6); margin: 2px; display: inline-flex; }
    .metric-box { text-align: center; padding: 16px 8px; background: rgba(5,5,69,0.02); border-radius: 12px; border: 1px solid rgba(5,5,69,0.05); }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge={language === 'km' ? "ករណីសិក្សា" : "Case Studies"}
        title={language === 'km' ? "គម្រោងជាក់ស្តែង" : "Real Projects."}
        titleHighlight={language === 'km' ? "លទ្ធផលជាក់ស្តែង" : "Real Results."}
        subtitle={language === 'km' ? "ការក្រឡេកមើលយ៉ាងស៊ីជម្រៅអំពីរបៀបដែលយើងបានដោះស្រាយបញ្ហាប្រឈមដ៏ស្មុគស្មាញសម្រាប់ស្ថាប័នឈានមុខគេរបស់កម្ពុជា។" : "An in-depth look at how we've solved complex challenges for Cambodia's leading organisations — with honest accounts of the problems, our approach, and the outcomes."}
        accentColor={COLORS.blue}
        accentColor2={COLORS.cyan}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="cs-container">
          {/* Filter */}
          <ScrollReveal>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', padding: '48px 0 40px' }}>
              {FILTERS.map(f => (
                <button key={f.id} className={`filter-btn${filter === f.id ? ' active' : ''}`} onClick={() => setFilter(f.id)}>{f[language as keyof typeof f] || f.en}</button>
              ))}
            </div>
          </ScrollReveal>

          {/* Case Study Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {filtered.map((cs, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="cs-card">
                  {/* Header */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))' }}>
                    {/* Left: icon banner */}
                    <div style={{ minHeight: 200, background: `linear-gradient(135deg,${cs.color}12,${cs.color}05)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32, borderRight: `1px solid ${cs.color}15` }}>
                      <IconBox color={cs.color} Icon={cs.Icon} size={88} />
                      <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: cs.color, textAlign: 'center' }}>{getText(cs.industry, language)}</div>
                      <div style={{ fontSize: 12, color: 'rgba(26,26,46,0.45)', textAlign: 'center' }}>⏱ {getText(cs.duration, language)}</div>
                    </div>
                    {/* Right: title + challenge */}
                    <div style={{ padding: 'clamp(24px,4vw,36px)' }}>
                      <div style={{ fontSize: 12, color: 'rgba(26,26,46,0.45)', marginBottom: 8 }}>{getText(cs.client, language)}</div>
                      <h2 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(18px,3vw,24px)', color: '#0d0d2b', marginBottom: 20, lineHeight: 1.3 }}>{getText(cs.title, language)}</h2>
                      {/* Results */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100px,100%),1fr))', gap: 10 }}>
                        {cs.results.map((r, ri) => (
                          <div key={ri} className="metric-box">
                            <div style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(16px,2.5vw,22px)', color: cs.color, marginBottom: 4 }}>{getText(r.metric, language)}</div>
                            <div style={{ fontSize: 11, color: 'rgba(26,26,46,0.5)', lineHeight: 1.4 }}>{getText(r.desc, language)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expandable detail */}
                  <div style={{ padding: '0 clamp(24px,4vw,36px)' }}>
                    <button onClick={() => setOpen(open === i ? null : i)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '16px 0', color: cs.color, fontWeight: 700, fontSize: 14, fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                      {open === i ? (language === 'km' ? '▴ លាក់ព័ត៌មានលម្អិត' : '▴ Hide Details') : (language === 'km' ? '▾ អានករណីសិក្សាពេញលេញ' : '▾ Read Full Case Study')}
                    </button>
                  </div>

                  <div style={{ overflow: 'hidden', maxHeight: open === i ? 600 : 0, transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div style={{ padding: '0 clamp(24px,4vw,36px) 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 32, borderTop: '1px solid rgba(5,5,69,0.06)' }}>
                      <div style={{ paddingTop: 24 }}>
                        <h3 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: '#0d0d2b', marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>
                          {language === 'km' ? 'បញ្ហាប្រឈម' : 'The Challenge'}
                        </h3>
                        <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.65)', lineHeight: 1.7 }}>{getText(cs.challenge, language)}</p>
                      </div>
                      <div style={{ paddingTop: 24 }}>
                        <h3 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: '#0d0d2b', marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>
                          {language === 'km' ? 'ដំណោះស្រាយរបស់យើង' : 'Our Solution'}
                        </h3>
                        <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.65)', lineHeight: 1.7, marginBottom: 16 }}>{getText(cs.solution, language)}</p>
                        <div>{cs.tech.map((t, ti) => <span key={ti} className="tech-chip">{t}</span>)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={100}>
            <div style={{ marginTop: 80, padding: 'clamp(40px,6vw,64px)', borderRadius: 24, background: 'linear-gradient(135deg,#050545,#0E62A2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: COLORS.cyan, filter: 'blur(120px)', opacity: 0.1, top: '-100px', right: '-50px', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', marginBottom: 12 }}>
                  {language === 'km' ? 'សូមឱ្យយើងសរសេររឿងរ៉ាវជោគជ័យរបស់អ្នក' : "Let's write your success story"}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28 }}>
                  {language === 'km' ? 'នាំយកបញ្ហាប្រឈមរបស់អ្នកមកកាន់យើង។ យើងនឹងជួយអ្នកស្វែងយល់ថាយើងជាក្រុមត្រឹមត្រូវដើម្បីដោះស្រាយវា។' : "Bring your challenge to us. We'll help you figure out if we're the right team to solve it."}
                </p>
                <a href={`/${language}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'linear-gradient(135deg,#0ABADF,#0E62A2)', color: '#fff', textDecoration: 'none', boxShadow: '0 4px 20px rgba(10,186,223,0.4)' }}>
                  {language === 'km' ? 'ពិភាក្សាជាមួយក្រុមការងារ →' : 'Talk to Our Team →'}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}
