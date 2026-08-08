'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=Hanuman:wght@400;500;600;700&display=swap');

  .ks-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .ks-nav.hidden-nav {
    transform: translateY(-100%);
  }

  .ks-nav.scrolled {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.12);
  }

  .ks-nav.top {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  }

  .ks-nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
  }

  /* Logo */
  .ks-logo {
    font-family: 'DM Sans', sans-serif;
    font-weight: 800;
    font-size: 48px;
    text-decoration: none;
    display: flex;
    align-items: baseline;
    gap: 0px;
    flex-shrink: 0;
    letter-spacing: -0.5px;
  }

  .ks-logo-text {
    background: linear-gradient(90deg, #0017e3, #ff0008);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Desktop links */
  .ks-links {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
    justify-content: center;
  }

  .ks-link {
    position: relative;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: rgba(20, 20, 50, 0.65);
    text-decoration: none;
    padding: 9px 18px;
    border-radius: 50px;
    transition: all 0.25s ease;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
  }

  /* Khmer font styles for navigation */
  .lang-km .ks-link {
    font-family: 'Hanuman', sans-serif;
    font-weight: 500;
  }

  /* Logo always uses English font */
  .lang-km .ks-logo {
    font-family: 'DM Sans', sans-serif;
  }

  .lang-km .ks-cta {
    font-family: 'Hanuman', sans-serif;
  }

  .lang-km .ks-mobile-link {
    font-family: 'Hanuman', sans-serif;
  }

  .lang-km .ks-mobile-cta {
    font-family: 'Hanuman', sans-serif;
  }

  .ks-link:hover {
    color: #0017e3;
    background: rgba(0, 23, 227, 0.06);
  }

  .ks-link.active {
    color: #FF0008;
    background: rgba(255, 0, 8, 0.1);
  }

  .ks-link.active::after {
    content: '';
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #FF0008;
    box-shadow: 0 0 6px #FF0008;
  }

  /* Mega Menu */
  .ks-mega-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #ffffff;
    border-top: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 999;
  }

  .ks-mega-menu.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .ks-mega-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
  
  .ks-mega-col h4 {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: rgba(20,20,50, 0.5);
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .ks-mega-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ks-mega-link {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    text-decoration: none;
    padding: 12px;
    border-radius: 12px;
    transition: all 0.2s;
    margin-left: -12px;
  }

  .ks-mega-link:hover {
    background: rgba(255, 0, 8, 0.05);
  }

  .ks-mega-simple-link {
    display: block;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.2s;
    margin-left: -12px;
    color: #141432;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
  }

  .ks-mega-simple-link:hover {
    background: rgba(255, 0, 8, 0.05);
    color: #FF0008;
  }

  .ks-mega-link-text h5 {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #141432;
    margin: 0 0 4px;
    transition: color 0.2s;
  }
  
  .ks-mega-link:hover .ks-mega-link-text h5 {
    color: #FF0008;
  }

  .ks-mega-link-text p {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: rgba(20, 20, 50, 0.6);
    margin: 0;
    line-height: 1.5;
  }

  .ks-mega-featured-card {
    background: linear-gradient(135deg, #050545 0%, #0017E3 100%);
    border-radius: 16px;
    padding: 32px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  .ks-mega-featured-card h4 {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 12px 0;
    text-transform: none;
    letter-spacing: 0;
  }

  .ks-mega-featured-card p {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 24px 0;
    line-height: 1.6;
  }

  .ks-mega-about p {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: rgba(20, 20, 50, 0.65);
    margin: 0 0 24px 0;
    line-height: 1.7;
  }

  .nav-item-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
  }

  /* Right side */
  .ks-nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  /* CTA button */
  .ks-cta {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #0017E3, #FF0008);
    border: none;
    padding: 11px 26px;
    border-radius: 50px;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    box-shadow:
      0 4px 16px rgba(0, 23, 227, 0.35),
      0 1px 0 rgba(255, 255, 255, 0.2) inset;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    white-space: nowrap;
  }

  .lang-km .ks-cta {
    font-family: 'Hanuman', sans-serif;
    font-weight: 600;
  }

  .ks-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0, 23, 227, 0.5);
  }

  .ks-cta svg {
    transition: transform 0.2s;
  }
  .ks-cta:hover svg {
    transform: translateX(3px);
  }

  /* Hamburger */
  .ks-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 8px;
    background: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: all 0.2s;
  }
  .ks-hamburger:hover {
    background: rgba(0, 0, 0, 0.08);
  }
  .ks-hamburger span {
    display: block;
    width: 20px;
    height: 1.5px;
    background: rgba(20, 20, 50, 0.7);
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center;
  }
  .ks-hamburger.open span:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }
  .ks-hamburger.open span:nth-child(2) {
    opacity: 0; transform: scaleX(0);
  }
  .ks-hamburger.open span:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }

  /* Mobile drawer */
  .ks-mobile-menu {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    z-index: 1000;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s ease;
    max-height: 0;
    opacity: 0;
  }
  .ks-mobile-menu.open {
    max-height: 600px;
    opacity: 1;
  }
  .ks-mobile-inner {
    background: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    padding: 20px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .ks-mobile-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: rgba(20, 20, 50, 0.65);
    text-decoration: none;
    padding: 12px 16px;
    border-radius: 12px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .lang-km .ks-mobile-link {
    font-family: 'Hanuman', sans-serif;
    font-weight: 500;
  }
  .ks-mobile-link:hover {
    color: #0017e3;
    background: rgba(0, 23, 227, 0.05);
  }
  .ks-mobile-link.active {
    color: #FF0008;
    background: rgba(255, 0, 8, 0.08);
    border: 1px solid rgba(255, 0, 8, 0.2);
  }
  .ks-mobile-divider {
    height: 1px;
    background: rgba(0, 0, 0, 0.08);
    margin: 8px 0;
  }
  .ks-mobile-cta {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    background: linear-gradient(135deg, #0017E3, #FF0008);
    padding: 13px 20px;
    border-radius: 12px;
    text-align: center;
    margin-top: 8px;
    box-shadow: 0 4px 20px rgba(0, 23, 227, 0.35);
    display: block;
    transition: all 0.3s;
  }

  .lang-km .ks-mobile-cta {
    font-family: 'Hanuman', sans-serif;
    font-weight: 600;
  }
  .ks-mobile-cta:hover {
    box-shadow: 0 8px 30px rgba(0, 23, 227, 0.5);
    transform: translateY(-1px);
  }

  /* Language switcher */
  .ks-language-switcher {
    position: relative;
    display: inline-block;
  }
  .ks-select {
    appearance: none;
    background: rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 12px;
    padding: 8px 36px 8px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: rgba(20, 20, 50, 0.75);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
    min-width: 120px;
  }

  .lang-km .ks-select {
    font-family: 'Hanuman', sans-serif;
    font-weight: 500;
  }
  .ks-select:hover {
    background: rgba(0, 0, 0, 0.07);
    border-color: rgba(0, 0, 0, 0.2);
    color: #141432;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  .ks-select:focus {
    outline: none;
    border-color: #FF0008;
    box-shadow: 0 0 0 3px rgba(255, 0, 8, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  .ks-select:active {
    transform: translateY(0);
  }
  .ks-select-arrow {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: rgba(20, 20, 50, 0.45);
    transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .ks-language-switcher:hover .ks-select-arrow {
    color: #FF0008;
    transform: translateY(-50%) scale(1.1);
  }
  .ks-select option {
    background: #ffffff;
    color: #141432;
    padding: 8px 12px;
  }

  /* ── Logo animation keyframes ── */
  @keyframes ks-icon-pop {
    0%   { transform: scale(1) rotate(0deg); }
    30%  { transform: scale(1.6) rotate(-10deg); }
    60%  { transform: scale(1.3) rotate(6deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  @keyframes ks-ripple {
    0%   { transform: translate(-50%, -50%) scale(0.3); opacity: 0.9; }
    100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
  }
  @keyframes ks-spark {
    0%   { opacity: 1; transform: translate(0, 0) scale(1); }
    100% { opacity: 0; transform: var(--ks-tx) scale(0.2); }
  }
  .angkor-icon {
    transition: filter 0.4s ease;
    transform-origin: center center;
    position: relative;
    z-index: 2;
  }
  .angkor-icon.pop {
    animation: ks-icon-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  @media (max-width: 1024px) {
    .ks-nav-inner { padding: 0 30px; gap: 24px; height: 72px; }
    .ks-links { gap: 24px; }
    .ks-cta { padding: 9px 20px; font-size: 13px; }
    .ks-logo { font-size: 20px; }
    .ks-language-switcher .ks-select { 
      min-width: 90px; 
      padding: 6px 28px 6px 12px; 
      font-size: 12px; 
    }
  }

  @media (max-width: 768px) {
    .ks-nav-inner {
      padding: 0 20px;
      height: 72px;
      gap: 16px;
    }
    .ks-links { display: none !important; }
    .ks-cta.desktop { display: none !important; }
    .ks-hamburger { display: flex; }
    .ks-logo { font-size: 32px; }
    .ks-language-switcher .ks-select {
      min-width: 80px;
      padding: 6px 24px 6px 10px;
      font-size: 12px;
    }
    .ks-mobile-menu {
      top: 72px;
    }
  }

  @media (max-width: 480px) {
    .ks-nav-inner {
      padding: 0 16px;
      height: 64px;
      gap: 12px;
    }
    .ks-logo { font-size: 28px; }
    .ks-language-switcher .ks-select {
      min-width: 70px;
      padding: 5px 20px 5px 8px;
      font-size: 11px;
    }
    .ks-mobile-menu {
      top: 64px;
    }
    .ks-mobile-inner {
      padding: 16px 20px 20px;
    }
  }
`;

// Spark directions: angle in degrees + travel distance in px
const SPARK_CONFIG = [
  { angle: -60,  dist: 18, color: '#ff4d4d' },
  { angle: -20,  dist: 20, color: '#0017e3' },
  { angle:  20,  dist: 18, color: '#ff4d4d' },
  { angle:  60,  dist: 20, color: '#0017e3' },
  { angle: 180,  dist: 16, color: '#ff4d4d' },
  { angle: 220,  dist: 18, color: '#0017e3' },
  { angle: -100, dist: 15, color: '#ff4d4d' },
  { angle: 100,  dist: 17, color: '#0017e3' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [logoClicked, setLogoClicked] = useState(false);
  const [logoAnimating, setLogoAnimating] = useState(false);
  const logoResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Mega menu state
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { t, language } = useLanguage();
  const pathname = usePathname();

  const handleMouseEnter = (menuId: string | null) => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(menuId);
  };

  const handleMouseLeave = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150); // slight delay to allow moving to submenu
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > lastScrollY.current && y > 80) {
        setNavHidden(true);  // scrolling down — hide
      } else {
        setNavHidden(false); // scrolling up — show
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as Element;
        if (!target.closest('.ks-nav') && !target.closest('.ks-mobile-menu')) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLogoClick = useCallback(() => {
    const next = !logoClicked;
    setLogoClicked(next);

    // Trigger the pop + sparks on every click
    setLogoAnimating(false);
    // Use rAF to force a re-render cycle so the animation class re-applies
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLogoAnimating(true);
        setTimeout(() => setLogoAnimating(false), 600);
      });
    });

    // Auto-reset the glow after 3 seconds
    if (logoResetRef.current) clearTimeout(logoResetRef.current);
    if (next) {
      logoResetRef.current = setTimeout(() => setLogoClicked(false), 3000);
    }
  }, [logoClicked]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const navLinks = [
    { href: '/', label: t('navigation.home'), menu: null },
    { href: `/${language}/services`, label: t('navigation.services'), menu: 'services' },
    { href: `/${language}/technologies`, label: t('navigation.technologies'), menu: 'technologies' },
    { href: `/${language}/industries`, label: t('navigation.industries'), menu: null },
    { href: `/${language}/portfolio`, label: t('navigation.portfolio'), menu: null },
    { href: `/${language}/about`, label: t('navigation.about'), menu: 'company' },
  ];

  // Mega Menu Data
  const MEGA_MENUS: Record<string, any> = {
    services: {
      type: "columns-with-card",
      columns: [
        {
          title: "Development",
          links: [
            { href: `/${language}/services/custom`, label: "Custom Software", desc: "Tailored enterprise solutions" },
            { href: `/${language}/services/mobile`, label: "Mobile Apps", desc: "iOS & Android development" },
            { href: `/${language}/services/web`, label: "Web Applications", desc: "Scalable web platforms" }
          ]
        },
        {
          title: "Cloud & Security",
          links: [
            { href: `/${language}/services/cloud`, label: "Cloud Migration", desc: "AWS, Azure & Google Cloud" },
            { href: `/${language}/services/devops`, label: "DevOps Services", desc: "CI/CD & automation" },
            { href: `/${language}/services/security`, label: "Cybersecurity", desc: "Audits & penetration testing" }
          ]
        },
        {
          title: "Consulting",
          links: [
            { href: `/${language}/services/strategy`, label: "IT Strategy", desc: "Digital transformation roadmap" },
            { href: `/${language}/services/design`, label: "UI/UX Design", desc: "User-centric interface design" }
          ]
        }
      ],
      featuredCard: {
        title: "Digital Transformation",
        desc: "Book a free consultation with our experts to discuss your project requirements and architecture.",
        buttonText: "Book Consultation",
        href: `/${language}/contact`
      }
    },
    technologies: {
      type: "simple-grid",
      columns: [
        {
          title: "Frontend",
          links: [
            { href: `/${language}/technologies`, label: "React & Next.js" },
            { href: `/${language}/technologies`, label: "Vue & Nuxt" },
            { href: `/${language}/technologies`, label: "Tailwind CSS" }
          ]
        },
        {
          title: "Backend",
          links: [
            { href: `/${language}/technologies`, label: "Node.js" },
            { href: `/${language}/technologies`, label: "Python & Django" },
            { href: `/${language}/technologies`, label: "Go" }
          ]
        },
        {
          title: "Database & Cloud",
          links: [
            { href: `/${language}/technologies`, label: "PostgreSQL" },
            { href: `/${language}/technologies`, label: "MongoDB" },
            { href: `/${language}/technologies`, label: "AWS & Docker" }
          ]
        }
      ]
    },
    company: {
      type: "about-mixed",
      about: {
        title: "KhmerSoftware",
        desc: "We are Cambodia's leading software development agency, specializing in custom enterprise solutions and digital transformation.",
        href: `/${language}/about`
      },
      columns: [
        {
          title: "Company",
          links: [
            { href: `/${language}/about`, label: "Our Story" },
            { href: `/${language}/team`, label: "Leadership Team" },
            { href: `/${language}/careers`, label: "Careers" }
          ]
        },
        {
          title: "Resources",
          links: [
            { href: `/${language}/blog`, label: "Blog" },
            { href: `/${language}/case-studies`, label: "Case Studies" },
            { href: `/${language}/contact`, label: "Contact Us" }
          ]
        }
      ]
    }
  };

  return (
    <>
      <style>{navStyles}</style>

      <nav className={`ks-nav ${scrolled ? 'scrolled' : 'top'}${navHidden ? ' hidden-nav' : ''}`}>
        <div className="ks-nav-inner">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="ks-logo"
            style={{ alignItems: 'flex-start' }}
            onClick={handleLogoClick}
          >
            <span className="ks-logo-text">KS</span>

            {/* Icon wrapper — holds ripples, sparks, and the image */}
            <div style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'flex-start',
              marginLeft: '4px',
            }}>
              {/* Ripple rings (visible while logoClicked is true) */}
              {logoClicked && [0, 1, 2].map(i => (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    border: `1.5px solid ${i % 2 === 0 ? '#ff4d4d' : '#0017e3'}`,
                    pointerEvents: 'none',
                    animation: `ks-ripple 0.75s ease-out forwards ${i * 0.11}s`,
                  }}
                />
              ))}

              {/* Spark particles (burst on every click, fade out quickly) */}
              {logoAnimating && SPARK_CONFIG.map(({ angle, dist, color }, i) => {
                const rad = (angle * Math.PI) / 180;
                const tx = `translate(calc(-50% + ${Math.cos(rad) * dist}px), calc(-50% + ${Math.sin(rad) * dist}px))`;
                return (
                  <span
                    key={i}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 3,
                      height: 3,
                      borderRadius: '50%',
                      background: color,
                      pointerEvents: 'none',
                      zIndex: 3,
                      ['--ks-tx' as string]: tx,
                      animation: `ks-spark 0.55s ease-out forwards ${i * 0.03}s`,
                    }}
                  />
                );
              })}

              {/* The actual icon image */}
              <img
                src="/angkoricon.png"
                alt="Angkor Wat"
                className={`angkor-icon${logoAnimating ? ' pop' : ''}`}
                style={{
                  height: '15px',
                  width: 'auto',
                  alignSelf: 'flex-start',
                  filter: logoClicked
                    ? 'grayscale(0%) brightness(1)'
                    : 'grayscale(100%) brightness(1.1) opacity(0.9)',
                }}
              />
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="ks-links">
            {navLinks.map(link => (
              <li 
                key={link.href} 
                className="nav-item-wrapper"
                onMouseEnter={() => handleMouseEnter(link.menu)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={link.href}
                  className={`ks-link ${isActive(link.href) ? 'active' : ''}`}
                  onClick={() => setActiveMegaMenu(null)}
                >
                  {link.label}
                  {link.menu && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6, opacity: 0.5 }}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="ks-nav-right">
            <LanguageSwitcher />

            <Link href={`/${language}/contact`} className="ks-cta desktop">
              Get Started
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Hamburger */}
            <button
              className={`ks-hamburger ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(v => !v)}
              aria-label="Toggle navigation"
              aria-expanded={isMobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mega Menu Container */}
        <div 
          className={`ks-mega-menu ${activeMegaMenu && MEGA_MENUS[activeMegaMenu] ? 'open' : ''}`}
          onMouseEnter={() => handleMouseEnter(activeMegaMenu)}
          onMouseLeave={handleMouseLeave}
        >
          {activeMegaMenu && MEGA_MENUS[activeMegaMenu] && (
            <div className="ks-mega-inner" style={{
              gridTemplateColumns: MEGA_MENUS[activeMegaMenu].type === 'simple-grid' ? 'repeat(3, 1fr)' : 
                                  MEGA_MENUS[activeMegaMenu].type === 'about-mixed' ? '2fr 1fr 1fr' : 'repeat(4, 1fr)'
            }}>
              
              {/* If About-Mixed layout */}
              {MEGA_MENUS[activeMegaMenu].type === 'about-mixed' && (
                <div className="ks-mega-about" style={{ paddingRight: 40, borderRight: '1px solid rgba(0,0,0,0.05)' }}>
                  <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: '#141432', marginBottom: 12 }}>
                    {MEGA_MENUS[activeMegaMenu].about.title}
                  </h4>
                  <p>{MEGA_MENUS[activeMegaMenu].about.desc}</p>
                  <Link href={MEGA_MENUS[activeMegaMenu].about.href} style={{ color: '#FF0008', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }} onClick={() => setActiveMegaMenu(null)}>
                    Read more
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                </div>
              )}

              {/* Standard columns rendering */}
              {MEGA_MENUS[activeMegaMenu].columns.map((col: any, idx: number) => (
                <div key={idx} className="ks-mega-col">
                  <h4>{col.title}</h4>
                  <ul>
                    {col.links.map((link: any, linkIdx: number) => (
                      <li key={linkIdx}>
                        {link.desc ? (
                          <Link href={link.href} className="ks-mega-link" onClick={() => setActiveMegaMenu(null)}>
                            <div className="ks-mega-link-text">
                              <h5>{link.label}</h5>
                              <p>{link.desc}</p>
                            </div>
                          </Link>
                        ) : (
                          <Link href={link.href} className="ks-mega-simple-link" onClick={() => setActiveMegaMenu(null)}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* If Columns-with-Card layout */}
              {MEGA_MENUS[activeMegaMenu].type === 'columns-with-card' && (
                <div className="ks-mega-col">
                  <div className="ks-mega-featured-card">
                    <h4>{MEGA_MENUS[activeMegaMenu].featuredCard.title}</h4>
                    <p>{MEGA_MENUS[activeMegaMenu].featuredCard.desc}</p>
                    <Link href={MEGA_MENUS[activeMegaMenu].featuredCard.href} className="ks-cta" style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 20px', boxShadow: 'none' }} onClick={() => setActiveMegaMenu(null)}>
                      {MEGA_MENUS[activeMegaMenu].featuredCard.buttonText}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`ks-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <div className="ks-mobile-inner">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`ks-mobile-link ${isActive(link.href) ? 'active' : ''}`}
            >
              {link.label}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.4 }}>
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}

          <div className="ks-mobile-divider" />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0 8px' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontFamily: "'DM Sans', sans-serif" }}>Language</span>
            <LanguageSwitcher />
          </div>

          <Link href={`/${language}/contact`} className="ks-mobile-cta">
            Book Free Consultation →
          </Link>
        </div>
      </div>
    </>
  );
}