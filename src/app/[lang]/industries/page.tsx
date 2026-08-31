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
const ShoppingCartIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const LandmarkIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>;
const HeartPulseIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const GraduationCapIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const BuildingIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const TruckIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const PlaneIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>;
const HomeIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const LeafIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.07c-.83 1.18.67 2.43 1.7 1.46C7.83 18.33 11 16 15.5 16H18a3 3 0 0 0 3-3A7 7 0 0 0 17 8z"/><line x1="3.82" y1="19.07" x2="12" y2="12"/></svg>;
const WifiIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>;
const UtensilsIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><line x1="7" y1="2" x2="7" y2="11"/><path d="M21 15V2a5 5 0 0 0-5 5v6h3v2a2 2 0 0 1-2 2v3"/></svg>;
const MonitorIcon = () => <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;

type Localized = string | { en?: string; km?: string };

function getText(val: Localized | undefined, lang: string): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  return (lang === 'km' ? val.km : val.en) || val.en || val.km || '';
}

type Industry = {
  Icon: React.FC;
  title: Localized;
  color: string;
  clients: Localized;
  desc: Localized;
  solutions: Localized[];
};

const INDUSTRIES: Industry[] = [
  { Icon: ShoppingCartIcon, title: { en: 'E-Commerce & Retail', km: "ពាណិជ្ជកម្មអេឡិចត្រូនិក និងការលក់រាយ" }, color: COLORS.cyan, clients: { en: '12+ clients', km: "១២+ អតិថិជន" }, desc: { en: 'Multi-vendor marketplaces, POS systems, inventory management, and omnichannel retail platforms tailored for Cambodia\'s growing consumer market.', km: "ទីផ្សារពហុអ្នកលក់, ប្រព័ន្ធ POS, ការគ្រប់គ្រងស្តុក និងវេទិកាលក់រាយគ្រប់បណ្តាញដែលត្រូវបានកែសម្រួលសម្រាប់ទីផ្សារអ្នកប្រើប្រាស់ដែលកំពុងរីកចម្រើនរបស់កម្ពុជា។" }, solutions: [{ en: 'Multi-vendor marketplace', km: 'ទីផ្សារពហុអ្នកលក់' }, { en: 'POS & inventory system', km: 'ប្រព័ន្ធ POS និងស្តុកទំនិញ' }, { en: 'Customer loyalty platform', km: 'វេទិកាភាពស្មោះត្រង់របស់អតិថិជន' }, { en: 'Analytics dashboard', km: 'ផ្ទាំងគ្រប់គ្រងវិភាគ' }] },
  { Icon: LandmarkIcon, title: { en: 'Banking & Finance', km: "ធនាគារ និងហិរញ្ញវត្ថុ" }, color: COLORS.blue, clients: { en: '8+ clients', km: "៨+ អតិថិជន" }, desc: { en: 'Core banking integrations, digital wallets, loan management systems, and compliance-ready fintech platforms meeting NBC regulations.', km: "ការរួមបញ្ចូលធនាគារស្នូល, កាបូបឌីជីថល, ប្រព័ន្ធគ្រប់គ្រងប្រាក់កម្ចី និងវេទិកាហិរញ្ញវត្ថុបច្ចេកវិទ្យាស្របតាមបទប្បញ្ញត្តិរបស់ NBC។" }, solutions: [{ en: 'Digital wallet gateway', km: 'ច្រកទ្វារកាបូបឌីជីថល' }, { en: 'Loan management system', km: 'ប្រព័ន្ធគ្រប់គ្រងប្រាក់កម្ចី' }, { en: 'KYC verification platform', km: 'វេទិកាផ្ទៀងផ្ទាត់ KYC' }, { en: 'Transaction analytics', km: 'ការវិភាគប្រតិបត្តិការ' }] },
  { Icon: HeartPulseIcon, title: { en: 'Healthcare', km: "សុខាភិបាល" }, color: COLORS.green, clients: { en: '6+ clients', km: "៦+ អតិថិជន" }, desc: { en: 'Hospital information systems, patient management, telemedicine platforms, and health data analytics built to international standards.', km: "ប្រព័ន្ធព័ត៌មានមន្ទីរពេទ្យ, ការគ្រប់គ្រងអ្នកជំងឺ, វេទិកាព្យាបាលពីចម្ងាយ និងការវិភាគទិន្នន័យសុខភាពដែលបង្កើតឡើងតាមស្តង់ដារអន្តរជាតិ។" }, solutions: [{ en: 'Hospital information system', km: 'ប្រព័ន្ធព័ត៌មានមន្ទីរពេទ្យ' }, { en: 'Telemedicine platform', km: 'វេទិកាព្យាបាលពីចម្ងាយ' }, { en: 'Patient record management', km: 'ការគ្រប់គ្រងកំណត់ត្រាអ្នកជំងឺ' }, { en: 'Medical billing', km: 'ការទូទាត់វេជ្ជសាស្ត្រ' }] },
  { Icon: GraduationCapIcon, title: { en: 'Education & EdTech', km: "ការអប់រំ និង EdTech" }, color: COLORS.yellow, clients: { en: '10+ clients', km: "១០+ អតិថិជន" }, desc: { en: 'Learning management systems, school administration platforms, e-learning apps, and student performance analytics for Cambodian institutions.', km: "ប្រព័ន្ធគ្រប់គ្រងការរៀនសូត្រ, វេទិការដ្ឋបាលសាលារៀន, កម្មវិធីរៀនតាមអេឡិចត្រូនិក និងការវិភាគសមត្ថភាពសិស្សសម្រាប់ស្ថាប័នកម្ពុជា។" }, solutions: [{ en: 'LMS platform', km: 'វេទិកា LMS' }, { en: 'School admin system', km: 'ប្រព័ន្ធរដ្ឋបាលសាលា' }, { en: 'E-learning mobile app', km: 'កម្មវិធីទូរស័ព្ទរៀនតាមអនឡាញ' }, { en: 'Student analytics', km: 'ការវិភាគសិស្ស' }] },
  { Icon: BuildingIcon, title: { en: 'Government & Public Sector', km: "រដ្ឋាភិបាល និងវិស័យសាធារណៈ" }, color: COLORS.navy, clients: { en: '5+ clients', km: "៥+ អតិថិជន" }, desc: { en: 'Citizen service portals, digital ID systems, tax management platforms, and e-governance solutions meeting GDA compliance standards.', km: "វិបផតថលសេវាប្រជាពលរដ្ឋ, ប្រព័ន្ធអត្តសញ្ញាណប័ណ្ណឌីជីថល, វេទិកាគ្រប់គ្រងពន្ធ និងដំណោះស្រាយអភិបាលកិច្ចអេឡិចត្រូនិកស្របតាមស្តង់ដារអនុលោមភាពរបស់ GDA។" }, solutions: [{ en: 'Citizen service portal', km: 'វិបផតថលសេវាប្រជាពលរដ្ឋ' }, { en: 'Digital ID integration', km: 'ការរួមបញ្ចូលអត្តសញ្ញាណប័ណ្ណឌីជីថល' }, { en: 'Tax management system', km: 'ប្រព័ន្ធគ្រប់គ្រងពន្ធ' }, { en: 'Document management', km: 'ការគ្រប់គ្រងឯកសារ' }] },
  { Icon: TruckIcon, title: { en: 'Logistics & Supply Chain', km: "ឡូជីស្ទិក និងខ្សែសង្វាក់ផ្គត់ផ្គង់" }, color: COLORS.cyan, clients: { en: '7+ clients', km: "៧+ អតិថិជន" }, desc: { en: 'Fleet management, warehouse automation, last-mile delivery tracking, and supply chain visibility platforms for Cambodia\'s logistics sector.', km: "ការគ្រប់គ្រងកងនាវា, ស្វ័យប្រវត្តិកម្មឃ្លាំង, ការតាមដានការដឹកជញ្ជូនដំណាក់កាលចុងក្រោយ និងវេទិកាមើលឃើញខ្សែសង្វាក់ផ្គត់ផ្គង់សម្រាប់វិស័យភស្តុភារកម្មកម្ពុជា។" }, solutions: [{ en: 'Fleet management system', km: 'ប្រព័ន្ធគ្រប់គ្រងកងនាវា' }, { en: 'Last-mile tracking', km: 'ការតាមដានការដឹកជញ្ជូនដំណាក់កាលចុងក្រោយ' }, { en: 'Warehouse automation', km: 'ស្វ័យប្រវត្តិកម្មឃ្លាំង' }, { en: 'Supply chain visibility', km: 'ភាពមើលឃើញខ្សែសង្វាក់ផ្គត់ផ្គង់' }] },
  { Icon: PlaneIcon, title: { en: 'Tourism & Hospitality', km: "ទេសចរណ៍ និងបដិសណ្ឋារកិច្ច" }, color: COLORS.blue, clients: { en: '9+ clients', km: "៩+ អតិថិជន" }, desc: { en: 'Booking engines, hotel property management systems, travel aggregation platforms, and guest experience apps for Cambodia\'s tourism industry.', km: "ប្រព័ន្ធកក់សំបុត្រ, ប្រព័ន្ធគ្រប់គ្រងអចលនទ្រព្យសណ្ឋាគារ, វេទិកាប្រមូលផ្តុំការធ្វើដំណើរ និងកម្មវិធីបទពិសោធន៍ភ្ញៀវសម្រាប់ឧស្សាហកម្មទេសចរណ៍កម្ពុជា។" }, solutions: [{ en: 'Hotel PMS', km: 'PMS សណ្ឋាគារ' }, { en: 'Online booking engine', km: 'ម៉ាស៊ីនកក់អនឡាញ' }, { en: 'Tour management platform', km: 'វេទិកាគ្រប់គ្រងដំណើរកម្សាន្ត' }, { en: 'Guest loyalty app', km: 'កម្មវិធីភាពស្មោះត្រង់របស់ភ្ញៀវ' }] },
  { Icon: HomeIcon, title: { en: 'Real Estate', km: "អចលនទ្រព្យ" }, color: COLORS.green, clients: { en: '4+ clients', km: "៤+ អតិថិជន" }, desc: { en: 'Property listing platforms, CRM for real estate agencies, rental management systems, and investment analytics dashboards.', km: "វេទិកាចុះបញ្ជីអចលនទ្រព្យ, CRM សម្រាប់ភ្នាក់ងារអចលនទ្រព្យ, ប្រព័ន្ធគ្រប់គ្រងការជួល និងផ្ទាំងគ្រប់គ្រងវិភាគការវិនិយោគ។" }, solutions: [{ en: 'Property listing portal', km: 'វិបផតថលចុះបញ្ជីអចលនទ្រព្យ' }, { en: 'Agency CRM', km: 'CRM ភ្នាក់ងារ' }, { en: 'Rental management', km: 'ការគ្រប់គ្រងការជួល' }, { en: 'Investment dashboard', km: 'ផ្ទាំងគ្រប់គ្រងការវិនិយោគ' }] },
  { Icon: LeafIcon, title: { en: 'Agriculture & AgriTech', km: "កសិកម្ម និង AgriTech" }, color: COLORS.yellow, clients: { en: '3+ clients', km: "៣+ អតិថិជន" }, desc: { en: 'Farm management systems, crop monitoring dashboards, supply chain traceability, and market price data platforms for Cambodian farmers.', km: "ប្រព័ន្ធគ្រប់គ្រងកសិដ្ឋាន, ផ្ទាំងគ្រប់គ្រងការត្រួតពិនិត្យដំណាំ, ការតាមដានប្រភពដើមខ្សែសង្វាក់ផ្គត់ផ្គង់ និងវេទិកាទិន្នន័យតម្លៃទីផ្សារសម្រាប់កសិករកម្ពុជា។" }, solutions: [{ en: 'Farm management app', km: 'កម្មវិធីគ្រប់គ្រងកសិដ្ឋាន' }, { en: 'Crop monitoring', km: 'ការត្រួតពិនិត្យដំណាំ' }, { en: 'Market price tracker', km: 'ការតាមដានតម្លៃទីផ្សារ' }, { en: 'Supply traceability', km: 'ការតាមដានប្រភពដើមផ្គត់ផ្គង់' }] },
  { Icon: WifiIcon, title: { en: 'Telecommunications', km: "ទូរគមនាគមន៍" }, color: COLORS.cyan, clients: { en: '4+ clients', km: "៤+ អតិថិជន" }, desc: { en: 'Billing systems, customer self-service portals, network monitoring dashboards, and CRM integrations for telco operators in Cambodia.', km: "ប្រព័ន្ធទូទាត់ប្រាក់, វិបផតថលសេវាស្វ័យប្រវត្តិសម្រាប់អតិថិជន, ផ្ទាំងគ្រប់គ្រងការត្រួតពិនិត្យបណ្តាញ និងការរួមបញ្ចូល CRM សម្រាប់ប្រតិបត្តិករទូរគមនាគមន៍នៅកម្ពុជា។" }, solutions: [{ en: 'Billing platform', km: 'វេទិកាទូទាត់ប្រាក់' }, { en: 'Customer self-service', km: 'សេវាកម្មស្វ័យប្រវត្តិរបស់អតិថិជន' }, { en: 'Network monitoring', km: 'ការត្រួតពិនិត្យបណ្តាញ' }, { en: 'CRM integration', km: 'ការរួមបញ្ចូល CRM' }] },
  { Icon: UtensilsIcon, title: { en: 'Food & Restaurant', km: "ម្ហូបអាហារ និងភោជនីយដ្ឋាន" }, color: COLORS.blue, clients: { en: '11+ clients', km: "១១+ អតិថិជន" }, desc: { en: 'Restaurant POS, food delivery platforms, kitchen display systems, table reservation apps, and menu management solutions.', km: "POS ភោជនីយដ្ឋាន, វេទិកាដឹកជញ្ជូនអាហារ, ប្រព័ន្ធបង្ហាញផ្ទះបាយ, កម្មវិធីកក់តុ និងដំណោះស្រាយគ្រប់គ្រងបញ្ជីមុខម្ហូប។" }, solutions: [{ en: 'Restaurant POS', km: 'POS ភោជនីយដ្ឋាន' }, { en: 'Delivery platform', km: 'វេទិកាដឹកជញ្ជូន' }, { en: 'Kitchen display system', km: 'ប្រព័ន្ធបង្ហាញផ្ទះបាយ' }, { en: 'Reservation system', km: 'ប្រព័ន្ធកក់តុ' }] },
  { Icon: MonitorIcon, title: { en: 'Media & Publishing', km: "ប្រព័ន្ធផ្សព្វផ្សាយ និងការបោះពុម្ពផ្សាយ" }, color: COLORS.green, clients: { en: '5+ clients', km: "៥+ អតិថិជន" }, desc: { en: 'Content management systems, video streaming platforms, digital publishing tools, and audience analytics for Cambodian media houses.', km: "ប្រព័ន្ធគ្រប់គ្រងមាតិកា, វេទិកាផ្សាយវីដេអូ, ឧបករណ៍បោះពុម្ពឌីជីថល និងការវិភាគទស្សនិកជនសម្រាប់ស្ថាប័នប្រព័ន្ធផ្សព្វផ្សាយកម្ពុជា។" }, solutions: [{ en: 'CMS platform', km: 'វេទិកា CMS' }, { en: 'Video streaming', km: 'ការផ្សាយវីដេអូ' }, { en: 'Audience analytics', km: 'ការវិភាគទស្សនិកជន' }, { en: 'Ad management', km: 'ការគ្រប់គ្រងការផ្សាយពាណិជ្ជកម្ម' }] },
];

export default function IndustriesPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
    .ind-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
    .ind-card { background: rgba(255,255,255,0.9); border: 1px solid rgba(5,5,69,0.07); border-radius: 20px; padding: 28px; box-shadow: 0 4px 16px rgba(5,5,69,0.05); transition: all 0.35s ease; cursor: pointer; }
    .ind-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(5,5,69,0.1); }
    .solution-tag { display: inline-flex; align-items: center; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 100px; background: rgba(10,186,223,0.08); color: #0ABADF; margin: 3px; }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge={language === 'km' ? "ឧស្សាហកម្មដែលយើងបម្រើ" : "Industries We Serve"}
        title={language === 'km' ? "ជំនាញស៊ីជម្រៅនៅទូទាំង" : "Deep Expertise Across"}
        titleHighlight={language === 'km' ? "គ្រប់វិស័យ" : "Every Sector"}
        subtitle={language === 'km' ? "យើងមិនកសាងសូហ្វវែរទូទៅទេ។ យើងកសាងដំណោះស្រាយជាក់លាក់តាមវិស័យដោយផ្អែកលើបទពិសោធន៍ជាច្រើនឆ្នាំនៅទូទាំងឧស្សាហកម្មដ៏សំខាន់បំផុតរបស់កម្ពុជា។" : "We don't build generic software. We build domain-specific solutions informed by years of experience across Cambodia's most critical industries."}
        ctaLabel={language === 'km' ? "ពិភាក្សាអំពីឧស្សាហកម្មរបស់អ្នក" : "Discuss Your Industry"}
        ctaHref={`/${language}/contact`}
        accentColor={COLORS.blue}
        accentColor2={COLORS.cyan}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="ind-container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', padding: '72px 0 48px' }}>
              <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: COLORS.blue, padding: '6px 14px', background: 'rgba(14,98,162,0.08)', border: '1px solid rgba(14,98,162,0.2)', borderRadius: 100, marginBottom: 16 }}>{language === 'km' ? "១២ ឧស្សាហកម្ម" : "12 Industries"}</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4vw,40px)', color: '#0d0d2b', marginBottom: 16 }}>
                {language === 'km' ? 'យើងដឹងពី' : 'We Know Your'} <span style={{ background: 'linear-gradient(135deg,#0E62A2,#0ABADF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{language === 'km' ? 'វិស័យអាជីវកម្មរបស់អ្នក' : 'Business Domain'}</span>
              </h2>
              <p style={{ color: 'rgba(26,26,46,0.55)', fontSize: 16, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
                {language === 'km' ? "ចុចលើឧស្សាហកម្មណាមួយដើម្បីស្វែងយល់ពីដំណោះស្រាយជាក់លាក់ និងករណីសិក្សាដែលយើងបានប្រគល់នៅក្នុងវិស័យនោះ។" : "Click any industry to explore the specific solutions and case studies we've delivered in that sector."}
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(340px,100%),1fr))', gap: 20 }}>
            {INDUSTRIES.map((ind, i) => (
              <ScrollReveal key={i} delay={i * 50} direction="up">
                <div
                  className="ind-card"
                  onClick={() => setActive(active === i ? null : i)}
                  style={{ borderColor: active === i ? `${ind.color}40` : undefined, background: active === i ? `${ind.color}05` : undefined }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${ind.color}12`, border: `1px solid ${ind.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ind.color, flexShrink: 0 }}>
                      <ind.Icon />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: '#0d0d2b', marginBottom: 2 }}>{getText(ind.title, language)}</h3>
                      <span style={{ fontSize: 11, color: ind.color, fontWeight: 600, background: `${ind.color}10`, padding: '2px 8px', borderRadius: 100 }}>{getText(ind.clients, language)}</span>
                    </div>
                    <div style={{ color: ind.color, fontSize: 18, transition: 'transform 0.3s', transform: active === i ? 'rotate(180deg)' : 'none' }}>▾</div>
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(26,26,46,0.6)', lineHeight: 1.6, marginBottom: active === i ? 16 : 0 }}>{getText(ind.desc, language)}</p>

                  {/* Expanded solutions */}
                  <div style={{ overflow: 'hidden', maxHeight: active === i ? 120 : 0, transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div style={{ paddingTop: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: 'rgba(26,26,46,0.4)', marginBottom: 8 }}>{language === 'km' ? "ដំណោះស្រាយសំខាន់ៗ" : "Key Solutions"}</div>
                      <div>{ind.solutions.map((s, si) => <span key={si} className="solution-tag" style={{ background: `${ind.color}10`, color: ind.color }}>✓ {getText(s, language)}</span>)}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <ScrollReveal delay={100}>
            <div style={{ marginTop: 80, padding: 'clamp(40px,6vw,64px)', borderRadius: 24, background: 'linear-gradient(135deg,#050545,#0E62A2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: COLORS.cyan, filter: 'blur(120px)', opacity: 0.1, top: '-100px', right: '-50px', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,34px)', color: '#fff', marginBottom: 12 }}>{language === 'km' ? "មិនឃើញឧស្សាហកម្មរបស់អ្នក?" : "Don't see your industry?"}</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>{language === 'km' ? "យើងបានធ្វើការនៅទូទាំងវិស័យជាច្រើនទៀត។ ប្រាប់យើងអំពីអាជីវកម្មរបស់អ្នក ហើយយើងនឹងរៀបចំដំណោះស្រាយសម្រាប់អ្នក។" : "We've worked across many more sectors. Tell us about your business and we'll tailor a solution for you."}</p>
                <a href={`/${language}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14, background: 'linear-gradient(135deg,#0ABADF,#0E62A2)', color: '#fff', textDecoration: 'none', boxShadow: '0 4px 20px rgba(10,186,223,0.4)' }}>
                  {language === 'km' ? "និយាយជាមួយក្រុមរបស់យើង →" : "Talk to Our Team →"}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}
