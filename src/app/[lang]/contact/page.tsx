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
const UsersIcon = () => <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const WrenchIcon = () => <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
const RocketIcon = () => <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
const NewspaperIcon = () => <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg>;

const DEPARTMENTS = [
  { name: 'New Business', Icon: UsersIcon, desc: 'Discuss a new project, request a proposal, or schedule a technical consultation.', email: 'sales@khmersoftware.com', color: COLORS.cyan },
  { name: 'Technical Support', Icon: WrenchIcon, desc: 'Existing clients requesting maintenance, bug fixes, or server emergencies.', email: 'support@khmersoftware.com', color: COLORS.green },
  { name: 'Careers', Icon: RocketIcon, desc: 'Join our team. Send your CV, portfolio, or inquire about open positions.', email: 'careers@khmersoftware.com', color: COLORS.yellow },
  { name: 'Press & Media', Icon: NewspaperIcon, desc: 'Interview requests, brand assets, and public relations inquiries.', email: 'press@khmersoftware.com', color: COLORS.blue },
];

const FAQS = [
  { q: 'How quickly can you start a new project?', a: 'Depending on the complexity and our current pipeline, we typically begin the Discovery phase within 1-2 weeks of signing an agreement.' },
  { q: 'Do you provide ongoing maintenance?', a: 'Yes. Every custom software project includes a 12-month warranty, and we offer comprehensive SLA-based maintenance contracts after that.' },
  { q: 'Will you sign a Non-Disclosure Agreement (NDA)?', a: 'Absolutely. We are happy to sign an NDA before you share any sensitive business information or intellectual property.' },
  { q: 'Do you work with international clients?', a: 'Yes, about 40% of our clients are based outside of Cambodia (Singapore, Australia, USA). We are accustomed to remote collaboration and timezone management.' },
];

export default function ContactPage() {
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', company: '', interest: '', budget: '', message: '' });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (params.lang && (params.lang === 'en' || params.lang === 'km')) setLanguage(params.lang as 'en' | 'km');
  }, [params.lang, setLanguage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', interest: '', budget: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    body { background: #f8f9fc; margin: 0; font-family: 'DM Sans', sans-serif; }
    .contact-container { max-width: 1180px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); }
    
    .dept-card { background: rgba(255,255,255,0.92); border: 1px solid rgba(5,5,69,0.07); border-radius: 18px; padding: 24px; box-shadow: 0 4px 16px rgba(5,5,69,0.04); transition: all 0.3s; }
    .dept-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(5,5,69,0.08); }
    
    .form-input { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1.5px solid rgba(5,5,69,0.1); background: rgba(255,255,255,0.8); font-size: 15px; color: #0d0d2b; font-family: 'DM Sans', sans-serif; transition: all 0.2s; box-sizing: border-box; }
    .form-input:focus { border-color: #0ABADF; outline: none; background: #fff; box-shadow: 0 0 0 4px rgba(10,186,223,0.1); }
    .form-label { display: block; font-size: 13px; font-weight: 600; color: rgba(5,5,69,0.7); margin-bottom: 6px; }
    
    .office-card { background: white; border: 1px solid rgba(5,5,69,0.07); border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(5,5,69,0.05); }
    .faq-item { border-bottom: 1px solid rgba(5,5,69,0.07); }
    .faq-btn { width: 100%; text-align: left; background: none; border: none; padding: 20px 0; font-size: 16px; font-weight: 600; color: #0d0d2b; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-family: 'DM Sans', sans-serif; }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <PageBanner
        badge="Contact Us"
        title="Let's Start a"
        titleHighlight="Conversation"
        subtitle="Whether you're looking to build a new product, scale an existing platform, or augment your engineering team — we're here to help."
        accentColor={COLORS.blue}
        accentColor2={COLORS.cyan}
      />

      <main style={{ background: '#f8f9fc', paddingBottom: 80 }}>
        <div className="contact-container">
          
          {/* Departments Grid */}
          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(250px,100%),1fr))', gap: 20, marginTop: -40, position: 'relative', zIndex: 10 }}>
              {DEPARTMENTS.map((dept, i) => (
                <div key={i} className="dept-card">
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${dept.color}12`, border: `1px solid ${dept.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: dept.color, marginBottom: 16 }}>
                    <dept.Icon />
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: '#0d0d2b', marginBottom: 8 }}>{dept.name}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(26,26,46,0.6)', lineHeight: 1.6, marginBottom: 16 }}>{dept.desc}</p>
                  <a href={`mailto:${dept.email}`} style={{ fontSize: 13, fontWeight: 700, color: dept.color, textDecoration: 'none' }}>{dept.email} →</a>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Form Section */}
          <div style={{ maxWidth: 800, margin: '80px auto' }}>
            
            <ScrollReveal direction="up">
              <div style={{ background: 'white', borderRadius: 24, padding: 'clamp(24px,5vw,48px)', border: '1px solid rgba(5,5,69,0.07)', boxShadow: '0 8px 32px rgba(5,5,69,0.04)' }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,3vw,30px)', color: '#0d0d2b', marginBottom: 8 }}>Send a Message</h2>
                <p style={{ fontSize: 15, color: 'rgba(26,26,46,0.55)', marginBottom: 32 }}>Fill out the form below and our team will get back to you within 24 hours.</p>
                
                {submitted ? (
                  <div style={{ padding: 32, background: 'rgba(81,180,28,0.08)', borderRadius: 16, border: '1px solid rgba(81,180,28,0.2)', textAlign: 'center' }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: '#0d0d2b', marginBottom: 8 }}>Message Sent Successfully!</h3>
                    <p style={{ fontSize: 14, color: 'rgba(26,26,46,0.6)' }}>Thank you for reaching out. A member of our team will review your inquiry and contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label className="form-label">Full Name *</label>
                        <input type="text" className="form-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="form-label">Work Email *</label>
                        <input type="email" className="form-input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@company.com" />
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label className="form-label">Company Name</label>
                        <input type="text" className="form-input" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Acme Corp" />
                      </div>
                      <div>
                        <label className="form-label">Budget Range</label>
                        <select className="form-input" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
                          <option value="">Select a range...</option>
                          <option value="under_10k">Under $10,000</option>
                          <option value="10k_50k">$10,000 - $50,000</option>
                          <option value="50k_100k">$50,000 - $100,000</option>
                          <option value="over_100k">$100,000+</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="form-label">Primary Interest</label>
                      <select className="form-input" required value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})}>
                        <option value="">What can we help you with?</option>
                        <option value="web">Web Application Development</option>
                        <option value="mobile">Mobile App Development</option>
                        <option value="cloud">Cloud Migration & DevOps</option>
                        <option value="design">UI/UX Design</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Message *</label>
                      <textarea className="form-input" required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Tell us about your project goals, timeline, and requirements..."></textarea>
                    </div>

                    <button type="submit" disabled={submitting} style={{ padding: '16px 32px', borderRadius: 12, background: 'linear-gradient(135deg,#050545,#0E62A2)', color: 'white', fontWeight: 700, fontSize: 15, border: 'none', cursor: submitting ? 'wait' : 'pointer', fontFamily: "'DM Sans', sans-serif", opacity: submitting ? 0.8 : 1, transition: 'all 0.2s', marginTop: 8 }}>
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <p style={{ fontSize: 12, color: 'rgba(26,26,46,0.4)', textAlign: 'center', marginTop: 4 }}>By submitting, you agree to our Privacy Policy and Terms of Service.</p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* FAQ Section */}
          <ScrollReveal>
            <div style={{ background: 'white', borderRadius: 24, padding: 'clamp(32px,5vw,64px)', border: '1px solid rgba(5,5,69,0.07)', boxShadow: '0 8px 32px rgba(5,5,69,0.03)', maxWidth: 800, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(22px,3vw,30px)', color: '#0d0d2b', marginBottom: 8 }}>Frequently Asked Questions</h2>
                <p style={{ fontSize: 15, color: 'rgba(26,26,46,0.55)' }}>Everything you need to know before reaching out.</p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {FAQS.map((faq, i) => (
                  <div key={i} className="faq-item">
                    <button className="faq-btn" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                      <span>{faq.q}</span>
                      <span style={{ color: COLORS.cyan, transition: 'transform 0.3s', transform: activeFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                    </button>
                    <div style={{ overflow: 'hidden', maxHeight: activeFaq === i ? 200 : 0, transition: 'max-height 0.3s ease' }}>
                      <p style={{ paddingBottom: 24, fontSize: 14, color: 'rgba(26,26,46,0.65)', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </main>
    </>
  );
}
