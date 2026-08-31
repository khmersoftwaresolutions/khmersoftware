'use client';

import React, { useEffect, useRef, useState } from 'react';

interface PageBannerProps {
  badge: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  accentColor?: string;
  accentColor2?: string;
}

export default function PageBanner({
  badge,
  title,
  titleHighlight,
  subtitle,
  ctaLabel,
  ctaHref,
  accentColor = '#ff0008',
  accentColor2 = '#0017e3',
}: PageBannerProps) {
  const [visible, setVisible] = useState(false);
  const [mouse, setMouse] = useState({ px: 0.5, py: 0.5 });

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    const onMove = (e: MouseEvent) => setMouse({ px: e.clientX / window.innerWidth, py: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', onMove);
    return () => { clearTimeout(t); window.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: 'clamp(320px, 45vh, 480px)',
      background: `linear-gradient(135deg, #050545 0%, #0a1060 55%, ${accentColor2} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingTop: 100,
      paddingBottom: 60,
    }}>
      {/* Animated background blobs */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        transform: `translateX(${(mouse.px - 0.5) * -18}px) translateY(${(mouse.py - 0.5) * -10}px)`,
        transition: 'transform 0.4s ease',
      }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: accentColor, filter: 'blur(140px)', opacity: 0.12, top: '-200px', right: '-100px' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: '#EDEC3A', filter: 'blur(120px)', opacity: 0.07, bottom: '-120px', left: '5%' }} />
      </div>

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        padding: '0 clamp(20px, 6vw, 80px)', maxWidth: 800, margin: '0 auto',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 18px', borderRadius: 100,
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
          border: `1px solid ${accentColor}40`, color: accentColor,
          fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
          marginBottom: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.7s ease 0.1s',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, display: 'inline-block' }} />
          {badge}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-syne), 'Syne', sans-serif", fontWeight: 800,
          fontSize: 'clamp(28px, 5vw, 54px)', lineHeight: 1.1,
          color: '#ffffff', marginBottom: 20,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s ease 0.25s',
        }}>
          {title}{' '}
          {titleHighlight && (
            <span style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor2})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{titleHighlight}</span>
          )}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(14px, 1.8vw, 17px)', color: 'rgba(255,255,255,0.65)',
          lineHeight: 1.8, marginBottom: ctaLabel ? 36 : 0, maxWidth: 600, margin: '0 auto',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s ease 0.4s',
        }}>
          {subtitle}
        </p>

        {/* CTA */}
        {ctaLabel && ctaHref && (
          <div style={{
            marginTop: 32,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease 0.55s',
          }}>
            <a href={ctaHref} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 32px', borderRadius: 100, fontWeight: 600, fontSize: 14,
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor2})`,
              color: '#fff', textDecoration: 'none',
              boxShadow: `0 4px 20px ${accentColor}40`,
              transition: 'all 0.3s ease',
            }}>
              {ctaLabel} →
            </a>
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, transparent, rgba(248,249,252,0.15))', pointerEvents: 'none' }} />
    </section>
  );
}
