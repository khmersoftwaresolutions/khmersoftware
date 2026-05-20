'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const COLORS = {
  navy: "#050545",
  blue: "#0E62A2",
  cyan: "#0ABADF",
  green: "#51B41C",
  yellow: "#EDEC3A",
};

const footerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

  .ks-footer {
    position: relative;
    z-index: 2;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 60px 40px 40px;
    background: var(--navy);
  }

  .ks-footer-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .ks-footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 48px;
  }

  .ks-footer-logo {
    font-family: 'DM Sans', sans-serif;
    font-weight: 800;
    font-size: 32px;
    margin-bottom: 14px;
    letter-spacing: -0.5px;
    display: flex;
    align-items: flex-start;
  }

  .ks-footer-logo-text {
    background: linear-gradient(90deg, #0017e3, #ff0008);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .ks-footer-desc {
    color: rgba(255, 255, 255, 0.4);
    font-size: 14px;
    line-height: 1.8;
    max-width: 260px;
  }

  .ks-social-icons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }

  .ks-social-icon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    transition: all 0.2s;
  }

  .ks-social-icon:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--cyan);
  }

  .ks-footer-col h4 {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 16px;
    color: rgba(255, 255, 255, 0.8);
  }

  .ks-footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0;
    margin: 0;
  }

  .ks-footer-links a {
    color: rgba(255, 255, 255, 0.4);
    font-size: 13px;
    text-decoration: none;
    transition: color 0.2s;
  }

  .ks-footer-links a:hover {
    color: var(--cyan);
  }

  .ks-footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .ks-footer-copyright {
    color: rgba(255, 255, 255, 0.3);
    font-size: 13px;
  }

  .ks-footer-legal {
    display: flex;
    gap: 20px;
  }

  .ks-footer-legal a {
    color: rgba(255, 255, 255, 0.3);
    font-size: 13px;
    text-decoration: none;
  }

  .ks-footer-legal a:hover {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 1024px) {
    .ks-footer-grid {
      gap: 32px;
    }
    .ks-footer-container {
      padding: 0 30px;
    }
  }

  @media (max-width: 768px) {
    .ks-footer-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .ks-footer {
      padding: 40px 20px 30px;
    }
    .ks-footer-logo {
      font-size: 18px;
    }
    .ks-footer-desc {
      font-size: 13px;
      max-width: 100%;
    }
    .ks-social-icons {
      margin-top: 16px;
    }
    .ks-footer-col h4 {
      font-size: 13px;
      margin-bottom: 12px;
    }
    .ks-footer-links a {
      font-size: 12px;
    }
    .ks-footer-bottom {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }
    .ks-footer-legal {
      gap: 16px;
    }
  }

  @media (max-width: 480px) {
    .ks-footer {
      padding: 30px 16px 25px;
    }
    .ks-footer-grid {
      gap: 20px;
    }
    .ks-footer-logo {
      font-size: 16px;
    }
    .ks-footer-desc {
      font-size: 12px;
    }
    .ks-social-icons {
      gap: 8px;
    }
    .ks-footer-col h4 {
      font-size: 12px;
      margin-bottom: 10px;
    }
    .ks-footer-links {
      gap: 8px;
    }
    .ks-footer-links a {
      font-size: 11px;
    }
    .ks-footer-copyright {
      font-size: 11px;
    }
    .ks-footer-legal {
      flex-direction: column;
      gap: 12px;
    }
  }
`;

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <>
      <style>{footerStyles}</style>
      <footer className="ks-footer">
        <div className="ks-footer-container">
          <div className="ks-footer-grid">
            {/* Brand column */}
            <div>
              <div className="ks-footer-logo">
                <span className="ks-footer-logo-text">KS</span>
                <img 
                  src="/angkoricon.png" 
                  alt="Angkor Wat" 
                  style={{ 
                    height: '12px', 
                    width: 'auto', 
                    marginLeft: '3px',
                    alignSelf: 'flex-start'
                  }} 
                />
              </div>
              <p className="ks-footer-desc">
                {t('footer.description')}
              </p>
              <div className="ks-social-icons">
                <a href="https://www.facebook.com/khmersoftwaresolutions" target="_blank" rel="noopener noreferrer" className="ks-social-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://t.me/khmersoftwaresolutions" target="_blank" rel="noopener noreferrer" className="ks-social-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Services column */}
            <div className="ks-footer-col">
              <h4>{t('footer.services.title')}</h4>
              <ul className="ks-footer-links">
                <li><a href={`/${language}/services`}>{t('footer.services.softwareSales')}</a></li>
                <li><a href={`/${language}/services`}>{t('footer.services.softwareRental')}</a></li>
                <li><a href={`/${language}/services`}>{t('footer.services.customDev')}</a></li>
                <li><a href={`/${language}/services`}>{t('footer.services.cloud')}</a></li>
                <li><a href={`/${language}/services`}>{t('footer.services.security')}</a></li>
              </ul>
            </div>

            {/* Company column */}
            <div className="ks-footer-col">
              <h4>{t('footer.company.title')}</h4>
              <ul className="ks-footer-links">
                <li><a href={`/${language}/about`}>{t('footer.company.about')}</a></li>
                <li><a href="#">{t('footer.company.blog')}</a></li>
                <li><a href="#">{t('footer.company.careers')}</a></li>
                <li><a href="#">{t('footer.company.partners')}</a></li>
                <li><a href="#">{t('footer.company.press')}</a></li>
              </ul>
            </div>

            {/* Contact column */}
            <div className="ks-footer-col">
              <h4>{t('footer.contact.title')}</h4>
              <ul className="ks-footer-links">
                <li><a href={`mailto:info@khmersoftware.com`}>{t('footer.contact.email')}</a></li>
                <li><a href="tel:+855966039418">{t('footer.contact.phone')}</a></li>
                <li>{t('footer.contact.location')}</li>
                <li>{t('footer.contact.hours')}</li>
                <li>{t('footer.contact.support')}</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="ks-footer-bottom">
            <p className="ks-footer-copyright">
              © 2024 KhmerSoftware. {t('footer.copyright')} · {t('footer.serving')}
            </p>
            <div className="ks-footer-legal">
              <a href="#">{t('footer.legal.privacy')}</a>
              <a href="#">{t('footer.legal.terms')}</a>
              <a href="#">{t('footer.legal.cookies')}</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
