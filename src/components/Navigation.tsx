'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
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
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .ks-nav.scrolled {
    background: rgba(5, 5, 69, 0.75);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      0 4px 30px rgba(0, 0, 0, 0.35),
      0 1px 0 rgba(255, 255, 255, 0.06) inset;
  }

  .ks-nav.top {
    background: rgba(5, 5, 69, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .ks-nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    height: 64px;
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
    background: linear-gradient(90deg, #0017e3, #ff0008);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: baseline;
    gap: 0px;
    flex-shrink: 0;
    letter-spacing: -0.5px;
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
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 50px;
    transition: all 0.25s ease;
    white-space: nowrap;
  }

  /* Khmer font styles for navigation */
  .lang-km .ks-link {
    font-family: 'Hanuman', sans-serif;
    font-weight: 500;
  }

  .lang-km .ks-logo {
    font-family: 'Hanuman', sans-serif;
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
    color: #fff;
    background: rgba(255, 255, 255, 0.07);
  }

  .ks-link.active {
    color: #0ABADF;
    background: rgba(10, 186, 223, 0.1);
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
    background: #0ABADF;
    box-shadow: 0 0 6px #0ABADF;
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
    background: linear-gradient(135deg, #0ABADF, #0E62A2);
    border: none;
    padding: 9px 22px;
    border-radius: 50px;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    box-shadow:
      0 4px 16px rgba(10, 186, 223, 0.35),
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
    box-shadow: 0 8px 28px rgba(10, 186, 223, 0.5);
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
    padding: 6px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    transition: all 0.2s;
  }
  .ks-hamburger:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  .ks-hamburger span {
    display: block;
    width: 20px;
    height: 1.5px;
    background: rgba(255, 255, 255, 0.8);
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
    top: 64px;
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
    background: rgba(5, 5, 69, 0.92);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    padding: 20px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .ks-mobile-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
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
    color: #fff;
    background: rgba(255, 255, 255, 0.07);
  }
  .ks-mobile-link.active {
    color: #0ABADF;
    background: rgba(10, 186, 223, 0.08);
    border: 1px solid rgba(10, 186, 223, 0.2);
  }
  .ks-mobile-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.06);
    margin: 8px 0;
  }
  .ks-mobile-cta {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    background: linear-gradient(135deg, #0ABADF, #0E62A2);
    padding: 13px 20px;
    border-radius: 12px;
    text-align: center;
    margin-top: 8px;
    box-shadow: 0 4px 20px rgba(10, 186, 223, 0.35);
    display: block;
    transition: all 0.3s;
  }

  .lang-km .ks-mobile-cta {
    font-family: 'Hanuman', sans-serif;
    font-weight: 600;
  }
  .ks-mobile-cta:hover {
    box-shadow: 0 8px 30px rgba(10, 186, 223, 0.5);
    transform: translateY(-1px);
  }

  /* Language switcher */
  .ks-language-switcher {
    position: relative;
    display: inline-block;
  }
  .ks-select {
    appearance: none;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    padding: 8px 36px 8px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
    min-width: 120px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .lang-km .ks-select {
    font-family: 'Hanuman', sans-serif;
    font-weight: 500;
  }
  .ks-select:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  .ks-select:focus {
    outline: none;
    border-color: var(--cyan);
    box-shadow: 0 0 0 3px rgba(10, 186, 223, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15);
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
    color: rgba(255, 255, 255, 0.6);
    transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .ks-language-switcher:hover .ks-select-arrow {
    color: var(--cyan);
    transform: translateY(-50%) scale(1.1);
  }
  .ks-select option {
    background: var(--navy);
    color: rgba(255, 255, 255, 0.9);
    padding: 8px 12px;
  }
  .ks-select option:hover {
    background: rgba(10, 186, 223, 0.1);
    color: #fff;
  }

  /* Progress bar */
  .ks-progress {
    position: absolute;
    bottom: 0; left: 0;
    height: 2px;
    background: linear-gradient(90deg, #0ABADF, #51B41C, #EDEC3A);
    transition: width 0.1s linear;
    box-shadow: 0 0 8px rgba(10, 186, 223, 0.6);
  }

  @media (max-width: 1024px) {
    .ks-nav-inner { padding: 0 30px; gap: 24px; }
    .ks-links { gap: 24px; }
    .ks-cta { padding: 8px 18px; font-size: 13px; }
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
      height: 64px;
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
      top: 64px;
    }
  }

  @media (max-width: 480px) {
    .ks-nav-inner {
      padding: 0 16px;
      height: 52px;
      gap: 12px;
    }
    .ks-logo { font-size: 28px; }
    .ks-language-switcher .ks-select {
      min-width: 70px;
      padding: 5px 20px 5px 8px;
      font-size: 11px;
    }
    .ks-mobile-menu {
      top: 52px;
    }
    .ks-mobile-inner {
      padding: 16px 20px 20px;
    }
  }
`;

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoClicked, setLogoClicked] = useState(false);
  const { t, language } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
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
    return () => {
      document.body.style.overflow = '';
    };
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const navLinks = [
    { href: '/', label: t('navigation.home') },
    { href: `/${language}/services`, label: t('navigation.services') },
    { href: `/${language}/about`, label: t('navigation.about') },
    { href: `/${language}/contact`, label: t('navigation.contact') },
  ];

  return (
    <>
      <style>{navStyles}</style>

      <nav className={`ks-nav ${scrolled ? 'scrolled' : 'top'}`}>
        <div className="ks-nav-inner">

          {/* Logo */}
          <Link 
            href="/" 
            className="ks-logo" 
            style={{ alignItems: 'flex-start' }}
            onClick={() => setLogoClicked(!logoClicked)}
          >
            KS
            <img 
              src="/angkoricon.png" 
              alt="Angkor Wat" 
              style={{ 
                height: '15px', 
                width: 'auto', 
                marginLeft: '4px',
                alignSelf: 'flex-start',
                transition: 'filter 0.3s ease',
                filter: logoClicked ? 'hue-rotate(180deg)' : 'none'
              }} 
              className="angkor-icon"
            />
          </Link>
          {/* Desktop links */}
          <ul className="ks-links">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`ks-link ${isActive(link.href) ? 'active' : ''}`}
                >
                  {link.label}
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

        {/* Scroll progress bar */}
        <div className="ks-progress" style={{ width: `${scrollProgress}%` }} />
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
            backdropFilter: 'blur(4px)'
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