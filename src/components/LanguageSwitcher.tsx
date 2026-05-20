'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLang: 'en' | 'km') => {
    setLanguage(newLang);
    setIsOpen(false);

    // Get current path without language prefix
    const pathWithoutLang = pathname.replace(/^\/(en|km)/, '') || '/';

    // If we're on the homepage, redirect to language-specific homepage
    if (pathname === '/' || pathWithoutLang === '/') {
      router.push(`/${newLang}`);
    } else {
      router.push(`/${newLang}${pathWithoutLang}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    { code: 'km' as const, label: t('languageSwitcher.khmer'), flag: '🇰🇭' },
  ];

  const currentLang = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanuman:wght@400;500;600;700&display=swap');

        .ks-language-switcher {
          position: relative;
          width: 120px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          min-height: 44px;
        }

        .lang-km .ks-language-label {
          font-family: 'Hanuman', sans-serif;
        }

        .lang-km .ks-dropdown-label {
          font-family: 'Hanuman', sans-serif;
        }

        .ks-language-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          min-height: 44px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1.5px solid rgba(10, 186, 223, 0.3);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .ks-language-button:hover {
          border-color: #0ABADF;
          box-shadow: 0 2px 8px rgba(10, 186, 223, 0.3);
          background: rgba(255, 255, 255, 0.08);
        }

        .ks-language-button:focus {
          outline: none;
          border-color: #0ABADF;
          box-shadow: 0 0 0 3px rgba(10, 186, 223, 0.2);
        }

        .ks-language-button-content {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          flex: 1;
        }

        .ks-language-flag {
          font-size: 18px;
          line-height: 1;
        }

        .ks-language-label {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ks-language-arrow {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.5);
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .ks-language-arrow.open {
          transform: rotate(180deg);
          color: #0ABADF;
        }

        .ks-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: rgba(5, 5, 69, 0.95);
          border: 1.5px solid rgba(10, 186, 223, 0.3);
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: all 0.2s ease;
          z-index: 100;
          backdrop-filter: blur(10px);
        }

        .ks-dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .ks-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 14px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .ks-dropdown-item:first-child {
          border-bottom: 1px solid #f3f4f6;
        }

        .ks-dropdown-item:hover {
          background: rgba(10, 186, 223, 0.15);
        }

        .ks-dropdown-item.active {
          background: rgba(10, 186, 223, 0.2);
        }

        .ks-dropdown-item.active .ks-dropdown-label {
          color: #0ABADF;
          font-weight: 600;
        }

        .ks-dropdown-flag {
          font-size: 18px;
          line-height: 1;
        }

        .ks-dropdown-label {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
        }

        .ks-check-icon {
          margin-left: auto;
          color: #0ABADF;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .ks-language-switcher {
            width: 110px;
          }

          .ks-language-label {
            font-size: 13px;
          }
        }
      `}</style>

      <div className={`ks-language-switcher ${language === 'km' ? 'lang-km' : ''}`} ref={dropdownRef} style={{ position: 'relative', width: '120px', minHeight: '44px' }}>
        <button
          type="button"
          className="ks-language-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            width: '100%',
            minHeight: '44px',
            padding: '10px 14px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1.5px solid rgba(10, 186, 223, 0.3)',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
            color: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <div className="ks-language-button-content">

            <span className="ks-language-label">{currentLang.label}</span>
          </div>
          <div className={`ks-language-arrow ${isOpen ? 'open' : ''}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>

        <div className={`ks-dropdown-menu ${isOpen ? 'open' : ''}`} role="listbox" style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: '0',
          right: '0',
          background: 'rgba(5, 5, 69, 0.95)',
          border: '1.5px solid rgba(10, 186, 223, 0.3)',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          opacity: isOpen ? '1' : '0',
          visibility: isOpen ? 'visible' : 'hidden',
          transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'all 0.2s ease',
          zIndex: '100',
          backdropFilter: 'blur(10px)'
        }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`ks-dropdown-item ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
              role="option"
              aria-selected={language === lang.code}
            >

              <span className="ks-dropdown-label">{lang.label}</span>
              {language === lang.code && (
                <svg
                  className="ks-check-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
