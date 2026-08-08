'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const COLORS = {
  navy: "#050545",
  blue: "#0017E3",
  cyan: "#FF0008",
  green: "#0E62A2",
  yellow: "#D30000",
};

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0, px: 0.5, py: 0.5 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
        px: e.clientX / window.innerWidth,
        py: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}

function useScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return pct;
}

function useTilt(strength = 15) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({
      rx: -dy * strength,
      ry: dx * strength,
      gx: ((e.clientX - rect.left) / rect.width) * 100,
      gy: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, [strength]);

  const onLeave = useCallback(() => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 }), []);

  return { ref, tilt, onMove, onLeave };
}

// ─── Components ──────────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = "" }: { value: string | number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const n = parseInt(String(value));
    const duration = 1800;
    const step = Math.ceil(n / (duration / 16));
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + step, n);
      setCount(cur);
      if (cur >= n) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [started, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function ScrollReveal({ children, delay = 0, direction = "up", className = "", style = {} }: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "fade"; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    fade: "scale(0.96)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function TiltCard({ children, style = {}, className = "" }: {
  children: React.ReactNode; style?: React.CSSProperties; className?: string;
}) {
  const { ref, tilt, onMove, onLeave } = useTilt(10);
  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        transform: `perspective(600px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
        transition: "transform 0.15s ease",
        willChange: "transform",
        background: style.background,
        "--gx": `${tilt.gx}%`,
        "--gy": `${tilt.gy}%`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const TECHNOLOGY_STACK = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
];

const INDUSTRIES = [
  { label: "E-Commerce", icon: "🛒", color: COLORS.cyan },
  { label: "Banking & Finance", icon: "🏦", color: COLORS.blue },
  { label: "Healthcare", icon: "🏥", color: COLORS.green },
  { label: "Education", icon: "🎓", color: COLORS.yellow },
  { label: "Government", icon: "🏛️", color: COLORS.navy },
  { label: "Retail & POS", icon: "🏪", color: COLORS.cyan },
  { label: "Logistics", icon: "🚚", color: COLORS.green },
  { label: "Tourism & Hotels", icon: "✈️", color: COLORS.blue },
  { label: "Real Estate", icon: "🏗️", color: COLORS.yellow },
  { label: "Agriculture", icon: "🌾", color: COLORS.green },
  { label: "Telecommunications", icon: "📡", color: COLORS.cyan },
  { label: "Media & Publishing", icon: "📺", color: COLORS.navy },
];

const WHY_US_ITEMS = [
  {
    icon: "🏆",
    title: "5+ Years Cambodia Expertise",
    desc: "Deep understanding of local market dynamics, regulatory requirements, and business culture across Cambodia and Southeast Asia.",
    stat: "5+",
    statLabel: "Years",
    color: COLORS.cyan,
  },
  {
    icon: "⚡",
    title: "Rapid Delivery, Zero Compromise",
    desc: "Our agile methodology combines speed with quality — delivering working software in 2-week sprints with live demos every cycle.",
    stat: "2wk",
    statLabel: "Sprint",
    color: COLORS.yellow,
  },
  {
    icon: "🛡️",
    title: "Enterprise-Grade Security",
    desc: "Every system we build follows OWASP standards, end-to-end encryption, and is audited against SOC 2 Type II compliance frameworks.",
    stat: "SOC2",
    statLabel: "Compliant",
    color: COLORS.green,
  },
  {
    icon: "🌐",
    title: "Bilingual Tech Team",
    desc: "Our engineers are fluent in Khmer and English, enabling seamless communication with local government bodies and international partners.",
    stat: "2",
    statLabel: "Languages",
    color: COLORS.blue,
  },
  {
    icon: "🔄",
    title: "Lifetime Support & SLA",
    desc: "12-month post-launch warranty as standard, with tiered SLA options ensuring 99.9% uptime and sub-4-hour critical response time.",
    stat: "99.9%",
    statLabel: "Uptime SLA",
    color: COLORS.cyan,
  },
  {
    icon: "💡",
    title: "Innovation-First Culture",
    desc: "We continuously invest in R&D — from AI-powered analytics to blockchain integration — keeping your platform ahead of the competition.",
    stat: "R&D",
    statLabel: "Focused",
    color: COLORS.yellow,
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery & Requirement Analysis",
    desc: "We start with deep-dive workshops to understand your business goals, user journeys, and technical constraints. This phase produces a detailed specification document, risk assessment, and project roadmap.",
    details: ["Stakeholder interviews", "Competitive landscape review", "Technical feasibility study", "Project scope & timeline definition"],
    color: COLORS.cyan,
    duration: "1–2 weeks",
  },
  {
    num: "02",
    title: "UX Design & Prototype",
    desc: "Our designers craft wireframes and interactive prototypes that are validated with real users before a single line of code is written — saving costly rework down the line.",
    details: ["User journey mapping", "Figma prototype", "Usability testing", "Design system definition"],
    color: COLORS.yellow,
    duration: "2–3 weeks",
  },
  {
    num: "03",
    title: "Agile Development & QA",
    desc: "Development proceeds in 2-week sprints with live demo sessions. Every sprint delivers working, tested software. Our QA team runs automated + manual tests at every stage.",
    details: ["2-week sprint cycles", "CI/CD pipeline from day 1", "Unit & integration tests", "Performance benchmarking"],
    color: COLORS.green,
    duration: "4–16 weeks",
  },
  {
    num: "04",
    title: "Deployment & Go-Live",
    desc: "We manage the full deployment pipeline — from staging environments to production — with zero-downtime releases and a dedicated go-live war room.",
    details: ["Blue-green deployments", "Load testing & scaling", "Staff training sessions", "Launch monitoring 24/7"],
    color: COLORS.blue,
    duration: "1 week",
  },
  {
    num: "05",
    title: "Ongoing Support & Growth",
    desc: "Post-launch, our team provides proactive monitoring, feature enhancements, and strategic consultation to ensure your platform grows with your business.",
    details: ["12-month warranty included", "Dedicated account manager", "Monthly performance reports", "Priority feature requests"],
    color: COLORS.cyan,
    duration: "Ongoing",
  },
];

const METRICS = [
  { label: "Active Client Projects", value: 18, suffix: "", icon: "📁", color: COLORS.cyan },
  { label: "Lines of Code Shipped", value: 2400000, suffix: "+", icon: "💻", color: COLORS.green },
  { label: "Avg. Client Satisfaction", value: 98, suffix: "%", icon: "⭐", color: COLORS.yellow },
  { label: "Engineers On Staff", value: 32, suffix: "+", icon: "👨‍💻", color: COLORS.blue },
  { label: "API Requests / Day", value: 12, suffix: "M+", icon: "🔗", color: COLORS.cyan },
  { label: "Deployments This Month", value: 47, suffix: "", icon: "🚀", color: COLORS.green },
];

const AWARDS = [
  { name: "AWS Partner", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", badge: "Select Tier" },
  { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg", badge: "Certified Partner" },
  { name: "Microsoft Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg", badge: "Solutions Partner" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", badge: "Verified Publisher" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const techStyles = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marqueeReverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(2deg); }
}
@keyframes floatSlow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
@keyframes fadeInCursor {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(10,186,223,0.4); }
  50% { box-shadow: 0 0 0 12px rgba(10,186,223,0); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes rotateRing {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes counterPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.04); }
  100% { transform: scale(1); }
}
@keyframes particleDrift {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(-120px) translateX(30px); opacity: 0; }
}
@keyframes borderRotate {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
@keyframes blinkDot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
@keyframes progressLine {
  from { width: 0%; }
  to { width: 100%; }
}

/* ── Layout Utilities ── */
.section { position: relative; }
.container { max-width: 1180px; margin: 0 auto; }

/* ── Typography ── */
.section-label {
  display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; color: ${COLORS.cyan}; padding: 6px 14px;
  background: rgba(10,186,223,0.08); border: 1px solid rgba(10,186,223,0.2);
  border-radius: 100px; margin-bottom: 16px;
}
.section-title {
  font-family: 'Syne', sans-serif; font-size: clamp(28px, 4vw, 44px);
  font-weight: 800; line-height: 1.15; color: #0d0d2b; margin-bottom: 0;
}
.grad-cyan { background: linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.blue}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.grad-yellow { background: linear-gradient(135deg, ${COLORS.yellow}, ${COLORS.navy}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.grad-blue { background: linear-gradient(135deg, ${COLORS.blue}, ${COLORS.cyan}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.grad-green { background: linear-gradient(135deg, ${COLORS.green}, ${COLORS.blue}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

.h-line {
  width: 60px; height: 3px; border-radius: 2px; margin: 16px 0;
  background: linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.blue});
}

/* ── Cards ── */
.glass-card {
  background: rgba(255,255,255,0.85); border: 1px solid rgba(255,255,255,0.9);
  border-radius: 20px; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 4px 24px rgba(5,5,69,0.06), 0 1px 4px rgba(5,5,69,0.04);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.glass-card:hover { box-shadow: 0 12px 40px rgba(5,5,69,0.1), 0 2px 8px rgba(5,5,69,0.06); }

.glass-dark {
  background: rgba(5,5,69,0.92); border: 1px solid rgba(10,186,223,0.2);
  border-radius: 20px; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 40px rgba(5,5,69,0.4);
}

.glass-bright {
  background: rgba(255,255,255,0.95); border: 1px solid rgba(255,255,255,1);
  border-radius: 16px; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(5,5,69,0.08);
}

.glow-top {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, ${COLORS.cyan}60, transparent);
}

/* ── Hero Badge ── */
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 20px; border-radius: 100px;
  background: rgba(255,255,255,0.1); backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.9);
  font-size: 13px; font-weight: 500; letter-spacing: 0.02em;
}

/* ── Buttons ── */
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 100px; font-weight: 600; font-size: 14px;
  background: linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.blue});
  color: #fff; text-decoration: none; transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(10,186,223,0.35);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(10,186,223,0.5); }

.btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 100px; font-weight: 600; font-size: 14px;
  background: transparent; color: #fff; text-decoration: none;
  border: 1.5px solid rgba(255,255,255,0.35); transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}
.btn-outline:hover { border-color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.1); }

/* ── Stats ── */
.stats-strip {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
  gap: 0; border-radius: 20px; overflow: hidden;
  background: rgba(255,255,255,0.8); border: 1px solid rgba(5,5,69,0.06);
  box-shadow: 0 4px 24px rgba(5,5,69,0.06);
}
.stat-item {
  padding: clamp(24px, 4vw, 40px) clamp(16px, 3vw, 28px); text-align: center;
  border-right: 1px solid rgba(5,5,69,0.05); transition: background 0.3s ease;
  position: relative;
}
.stat-item:last-child { border-right: none; }
.stat-item:hover { background: rgba(10,186,223,0.04); }
.stat-num { font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 52px); font-weight: 800; line-height: 1; margin-bottom: 8px; }
.stat-label { font-size: clamp(12px, 2vw, 13px); color: rgba(26,26,46,0.5); font-weight: 500; letter-spacing: 0.02em; text-transform: uppercase; }

/* ── Service Cards ── */
.service-icon-wrap {
  width: 52px; height: 52px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 18px; transition: transform 0.3s ease;
}
.glass-card:hover .service-icon-wrap { transform: scale(1.1) rotate(-3deg); }
.learn-link {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; text-decoration: none; margin-top: 20px;
  transition: gap 0.2s ease;
}
.learn-link:hover { gap: 10px; }

/* ── Feature Rows ── */
.feature-row { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 80px); align-items: center; }
.feature-row.reverse { }
@media (max-width: 768px) { .feature-row { grid-template-columns: 1fr; } }
.feature-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 16px;
}
.check-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.check-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: rgba(26,26,46,0.75); line-height: 1.5; }
.check-icon { width: 22px; height: 22px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }

/* ── Tech Marquee ── */
.tech-marquee-wrapper {
  overflow: hidden; white-space: nowrap; position: relative;
  width: 100%; display: flex; padding: 20px 0;
}
.tech-marquee-wrapper::before, .tech-marquee-wrapper::after {
  content: ''; position: absolute; top: 0; width: 200px; height: 100%; z-index: 2; pointer-events: none;
}
.tech-marquee-wrapper::before { left: 0; background: linear-gradient(to right, #f8f9fc, transparent); }
.tech-marquee-wrapper::after { right: 0; background: linear-gradient(to left, #f8f9fc, transparent); }
.tech-marquee-content { display: flex; width: max-content; animation: marquee 35s linear infinite; }
.tech-marquee-content:hover { animation-play-state: paused; }
.tech-marquee-content-reverse { display: flex; width: max-content; animation: marqueeReverse 40s linear infinite; }
.tech-marquee-content-reverse:hover { animation-play-state: paused; }
.tech-card {
  display: flex; align-items: center; justify-content: center;
  background: #ffffff; border: 1px solid rgba(0,0,0,0.05);
  width: 100px; height: 100px; border-radius: 20px; margin: 0 16px;
  transition: all 0.3s cubic-bezier(0.23,1,0.32,1); box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}
.tech-card:hover { transform: translateY(-8px); box-shadow: 0 12px 24px rgba(0,0,0,0.08); border-color: rgba(10,186,223,0.3); }
.tech-card img { width: 50px; height: 50px; object-fit: contain; filter: grayscale(100%) opacity(0.7); transition: all 0.3s ease; }
.tech-card:hover img { filter: grayscale(0%) opacity(1); transform: scale(1.1); }

/* ── Process Timeline ── */
.timeline-line {
  position: absolute; left: 28px; top: 60px; bottom: 0; width: 2px;
  background: linear-gradient(to bottom, ${COLORS.cyan}, ${COLORS.blue}, ${COLORS.cyan});
}
.timeline-step { display: flex; gap: 32px; position: relative; }

/* ── Industry Pills ── */
.industry-pill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 20px; border-radius: 100px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 0.3s ease; border: 1.5px solid rgba(5,5,69,0.1);
  background: white; color: rgba(5,5,69,0.7); white-space: nowrap;
  box-shadow: 0 2px 8px rgba(5,5,69,0.04);
}
.industry-pill:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(10,186,223,0.2); border-color: ${COLORS.cyan}; color: ${COLORS.cyan}; }

/* ── Metrics Dashboard ── */
.metric-card {
  padding: 24px; border-radius: 16px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.3s ease;
}
.metric-card:hover { background: rgba(255,255,255,0.1); transform: translateY(-3px); }

/* ── Testimonials ── */
.testimonial-card { }
.stars { color: ${COLORS.yellow}; font-size: 14px; letter-spacing: 2px; }
.quote { color: rgba(26,26,46,0.65); font-style: italic; line-height: 1.7; }

/* ── CTA ── */
.cta-glass {
  padding: clamp(40px, 6vw, 72px); text-align: center; border-radius: 28px;
  background: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.95);
  backdrop-filter: blur(24px); box-shadow: 0 8px 48px rgba(5,5,69,0.08);
}

/* ── Animated tech rings ── */
.tech-ring { position: absolute; border-radius: 50%; border: 1px solid; animation: rotateRing 12s linear infinite; }
.tech-node { position: absolute; width: 10px; height: 10px; border-radius: 50%; animation: float 3s ease-in-out infinite; transform: translate(-50%, -50%); }
.tech-center-card {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: min(140px, 40%); padding: 20px; border-radius: 20px;
}
.float-anim-slow { animation: floatSlow 6s ease-in-out infinite; }

/* ── Progress bar ── */
.scroll-progress-bar {
  position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
  background: linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.yellow}, ${COLORS.green});
  transition: width 0.1s linear; pointer-events: none;
  box-shadow: 0 0 8px rgba(10,186,223,0.6);
}

/* ── Award card ── */
.award-card {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 28px 24px; border-radius: 20px; background: white;
  border: 1px solid rgba(5,5,69,0.06); box-shadow: 0 4px 20px rgba(5,5,69,0.05);
  transition: all 0.3s ease;
}
.award-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(5,5,69,0.1); border-color: rgba(10,186,223,0.3); }

/* ── Why Us Cards ── */
.why-card {
  padding: clamp(24px, 4vw, 36px); border-radius: 20px; cursor: default;
  background: rgba(255,255,255,0.9); border: 1px solid rgba(5,5,69,0.07);
  box-shadow: 0 4px 20px rgba(5,5,69,0.05); position: relative; overflow: hidden;
  transition: box-shadow 0.3s ease;
}
.why-card::before {
  content: ''; position: absolute; inset: 0; opacity: 0;
  background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(10,186,223,0.08) 0%, transparent 70%);
  transition: opacity 0.3s ease;
}
.why-card:hover::before { opacity: 1; }
.why-card:hover { box-shadow: 0 12px 48px rgba(5,5,69,0.12); }

/* ── Responsive ── */
@media (max-width: 640px) {
  .stats-strip { grid-template-columns: 1fr 1fr; }
  .stat-item:nth-child(2n) { border-right: none; }
  .stat-item { border-bottom: 1px solid rgba(5,5,69,0.05); }
}
`;

// ─── Main Component ──────────────────────────────────────────────────────────

export default function HomePageContent() {
  const { t, language } = useLanguage();
  const [slide, setSlide] = useState(0);
  const [hoverZone, setHoverZone] = useState<'prev' | 'next' | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeIndustry, setActiveIndustry] = useState<number>(0);
  const [isHoveringIndustry, setIsHoveringIndustry] = useState(false);

  useEffect(() => {
    if (isHoveringIndustry) return;
    const timer = setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % INDUSTRIES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isHoveringIndustry]);

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const mouse = useMousePosition();
  const scrollPct = useScrollProgress();

  const SLIDES = [
    {
      img: '/hero-slide-1.png',
      badge: t('home.badge'),
      title1: t('home.hero.title1'),
      title2: t('home.hero.title2'),
      title3: t('home.hero.title3'),
    },
    {
      img: '/hero-slide-2.png',
      badge: "Cambodia's Leading Dev Team",
      title1: 'Expert Software',
      title2: 'Built for',
      title3: 'Your Business',
    },
    {
      img: '/hero-slide-3.png',
      badge: 'Digital Transformation',
      title1: 'Powering the Future',
      title2: 'of Cambodian',
      title3: 'Technology',
    },
  ];

  const goTo = (i: number) => setSlide((i + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    slideTimer.current = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5500);
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, [SLIDES.length]);

  const resetTimer = () => {
    if (slideTimer.current) clearInterval(slideTimer.current);
    slideTimer.current = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5500);
  };

  const services = [
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>,
      title: t('home.services.softwareSales.title'),
      desc: t('home.services.softwareSales.desc'),
      color: COLORS.cyan, bg: "rgba(10,186,223,0.1)", linkColor: COLORS.cyan, key: "sales",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
      title: t('home.services.softwareRental.title'),
      desc: t('home.services.softwareRental.desc'),
      color: COLORS.green, bg: "rgba(81,180,28,0.1)", linkColor: COLORS.green, key: "rental",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
      title: t('home.services.customDevelopment.title'),
      desc: t('home.services.customDevelopment.desc'),
      color: COLORS.yellow, bg: "rgba(237,236,58,0.1)", linkColor: COLORS.yellow, key: "dev",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
      title: t('home.services.cloudInfrastructure.title'),
      desc: t('home.services.cloudInfrastructure.desc'),
      color: COLORS.blue, bg: "rgba(14,98,162,0.1)", linkColor: COLORS.blue, key: "cloud",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
      title: t('home.services.cybersecurity.title'),
      desc: t('home.services.cybersecurity.desc'),
      color: COLORS.navy, bg: "rgba(5,5,69,0.1)", linkColor: COLORS.navy, key: "security",
    },
    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
      title: t('home.services.trainingSupport.title'),
      desc: t('home.services.trainingSupport.desc'),
      color: COLORS.cyan, bg: "rgba(10,186,223,0.1)", linkColor: COLORS.cyan, key: "support",
    },
  ];

  const testimonials = [
    { text: t('home.testimonials.testimonial1.text'), name: t('home.testimonials.testimonial1.name'), role: t('home.testimonials.testimonial1.role'), photo: t('home.testimonials.testimonial1.photo'), color: COLORS.cyan },
    { text: t('home.testimonials.testimonial2.text'), name: t('home.testimonials.testimonial2.name'), role: t('home.testimonials.testimonial2.role'), photo: t('home.testimonials.testimonial2.photo'), color: COLORS.green },
    { text: t('home.testimonials.testimonial3.text'), name: t('home.testimonials.testimonial3.name'), role: t('home.testimonials.testimonial3.role'), photo: t('home.testimonials.testimonial3.photo'), color: COLORS.yellow },
    { text: t('home.testimonials.testimonial4.text'), name: t('home.testimonials.testimonial4.name'), role: t('home.testimonials.testimonial4.role'), photo: t('home.testimonials.testimonial4.photo'), color: COLORS.blue },
  ];

  return (
    <>
      <style>{techStyles}</style>

      {/* ── SCROLL PROGRESS BAR ─────────────────── */}
      <div className="scroll-progress-bar" style={{ width: `${scrollPct}%` }} />

      {/* ── HERO CAROUSEL ──────────────────────────── */}
      <section style={{ position: 'relative', width: '100%', height: 'min(70vh, 600px)', overflow: 'hidden', marginBottom: 0 }}>
        {/* Slides */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${s.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === slide ? 1 : 0,
              transition: 'opacity 0.9s ease',
              zIndex: i === slide ? 1 : 0,
              /* Remove Mouse parallax */
              transform: i === slide ? `scale(1.04)` : undefined,
            }}
          >
            {/* Dark overlay with blur */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(5,5,69,0.7) 0%, rgba(0,23,227,0.2) 100%)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }} />

            {/* Content */}
            <div style={{
              position: 'relative', zIndex: 2, height: '100%',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', padding: '0 clamp(20px, 6vw, 80px)',
            }}>
              {/* Badge */}
              <div className="hero-badge" style={{ marginBottom: 24, opacity: i === slide ? 1 : 0, transform: i === slide ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.2s' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.cyan, display: 'inline-block', boxShadow: `0 0 8px ${COLORS.cyan}`, animation: 'blinkDot 2s ease-in-out infinite' }} />
                {s.badge}
              </div>

              {/* Title */}
              <h1 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 'clamp(24px, 4vw, 44px)', lineHeight: 1.1,
                color: '#fff', marginBottom: 20, maxWidth: 800,
                opacity: i === slide ? 1 : 0, transform: i === slide ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s ease 0.35s',
              }}>
                <span className="grad-cyan">{s.title1}</span><br />
                {s.title2} <span className="grad-yellow">{s.title3}</span>
              </h1>

              {/* Subtitle */}
              <p style={{
                fontSize: 'clamp(14px, 1.5vw, 16px)', color: 'rgba(255,255,255,0.72)',
                maxWidth: 560, lineHeight: 1.7, marginBottom: 36,
                opacity: i === slide ? 1 : 0, transform: i === slide ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s ease 0.5s',
              }}>
                {i === 0 ? t('home.hero.subtitle') : i === 1 ? 'Our experienced team delivers tailored solutions that grow with your business.' : 'Connecting Cambodian businesses to the digital future with cutting-edge technology.'}
              </p>

              {/* CTA Buttons */}
              <div className="hero-cta" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', opacity: i === slide ? 1 : 0, transform: i === slide ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease 0.65s' }}>
                <a href={`/${language}/services`} className="btn-primary">
                  {t('home.hero.exploreServices')}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <a href={`/${language}/contact`} className="btn-outline">
                  {t('home.hero.bookDemo')}
                </a>
              </div>

              {/* Scroll hint */}
              {i === slide && (
                <div style={{ position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.5, animation: 'float 2s ease-in-out infinite' }}>
                  <span style={{ fontSize: 10, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' }}>Scroll</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M4 9l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Left hover zone */}
        <div
          style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', zIndex: 10, cursor: 'none' }}
          onMouseEnter={() => setHoverZone('prev')}
          onMouseLeave={() => setHoverZone(null)}
          onMouseMove={e => {
            const parent = e.currentTarget.parentElement!.getBoundingClientRect();
            setCursorPos({ x: e.clientX - parent.left, y: e.clientY - parent.top });
          }}
          onClick={() => { goTo(slide - 1); resetTimer(); }}
        />

        {/* Right hover zone */}
        <div
          style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', zIndex: 10, cursor: 'none' }}
          onMouseEnter={() => setHoverZone('next')}
          onMouseLeave={() => setHoverZone(null)}
          onMouseMove={e => {
            const parent = e.currentTarget.parentElement!.getBoundingClientRect();
            setCursorPos({ x: e.clientX - parent.left, y: e.clientY - parent.top });
          }}
          onClick={() => { goTo(slide + 1); resetTimer(); }}
        />

        {/* Custom cursor label */}
        {hoverZone && (
          <div style={{
            position: 'absolute', left: cursorPos.x, top: cursorPos.y,
            transform: 'translate(-50%, -50%)', zIndex: 20, pointerEvents: 'none',
            width: 90, height: 90, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 4, color: '#ffffff',
            textTransform: 'uppercase', fontSize: 12, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.1em',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            animation: 'fadeInCursor 0.2s cubic-bezier(0.23,1,0.32,1)',
          }}>
            <span style={{ fontSize: 16, lineHeight: 1 }}>{hoverZone === 'prev' ? '←' : '→'}</span>
            <span>{hoverZone === 'prev' ? 'Back' : 'Next'}</span>
          </div>
        )}

        {/* Dot indicators */}
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetTimer(); }}
              style={{
                width: i === slide ? 28 : 8, height: 8, borderRadius: 4,
                border: 'none', cursor: 'pointer',
                background: i === slide ? COLORS.cyan : 'rgba(255,255,255,0.35)',
                transition: 'all 0.35s ease', padding: 0,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>


      {/* ── SERVICES ────────────────────────── */}
      <section className="section" style={{ padding: "80px clamp(16px, 4vw, 40px)", background: "linear-gradient(180deg, #f8f9fc 0%, #ffffff 100%)" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="section-label">{t('home.services.sectionLabel')}</div>
              <h2 className="section-title">{t('home.services.title')} <span className="grad-cyan">{t('home.services.titleHighlight')}</span></h2>
              <div className="h-line" style={{ margin: "16px auto 0" }} />
              <p style={{ color: "rgba(26,26,46,0.55)", fontSize: 16, maxWidth: 520, margin: "20px auto 0", lineHeight: 1.7 }}>
                End-to-end technology solutions engineered for Cambodia's fastest-growing enterprises.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 24 }}>
            {services.map((s, i) => (
              <ScrollReveal key={s.key} delay={i * 80} direction="up">
                <TiltCard className="glass-card why-card" style={{ padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 28px)", position: "relative", overflow: "hidden", height: "100%" }}>
                  <div className="glow-top" style={{ background: `linear-gradient(90deg, transparent, ${s.color}60, transparent)` }} />
                  <div className="service-icon-wrap" style={{ background: s.bg, border: `1px solid ${s.color}30` }}>
                    <span style={{ fontSize: "clamp(20px, 5vw, 24px)", color: s.color }}>{s.icon}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px, 4vw, 19px)", fontWeight: 700, marginBottom: 10, color: "#0d0d2b" }}>{s.title}</h3>
                  <p style={{ color: "rgba(26,26,46,0.6)", fontSize: "clamp(13px, 3vw, 14px)", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                  <a href={`/${language}/services`} className="learn-link" style={{ color: s.linkColor }}>
                    {t('home.services.learnMore')} <span>→</span>
                  </a>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────── */}
      <section className="section" style={{ padding: "100px clamp(16px, 4vw, 40px)", background: "#ffffff" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label">Why Khmer Software</div>
              <h2 className="section-title">The Difference That <span className="grad-cyan">Drives Results</span></h2>
              <div className="h-line" style={{ margin: "16px auto 0" }} />
              <p style={{ color: "rgba(26,26,46,0.55)", fontSize: 16, maxWidth: 560, margin: "20px auto 0", lineHeight: 1.7 }}>
                We don't just build software — we build long-term partnerships grounded in trust, transparency, and technology excellence.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 24 }}>
            {WHY_US_ITEMS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 70} direction={i % 2 === 0 ? "left" : "right"}>
                <TiltCard className="why-card" style={{}}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div style={{ fontSize: 36, lineHeight: 1 }}>{item.icon}</div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.stat}</div>
                      <div style={{ fontSize: 11, color: "rgba(26,26,46,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.statLabel}</div>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "#0d0d2b", marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(26,26,46,0.6)", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                  <div style={{ marginTop: 16, width: "100%", height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ────────────────── */}
      <section className="section" style={{ padding: "100px clamp(16px, 4vw, 40px)", background: "linear-gradient(180deg, #f0f6ff 0%, #f8f9fc 100%)" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">Industries</div>
              <h2 className="section-title">We Serve <span className="grad-blue">Every Sector</span></h2>
              <div className="h-line" style={{ margin: "16px auto 0", background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.cyan})` }} />
              <p style={{ color: "rgba(26,26,46,0.55)", fontSize: 16, maxWidth: 560, margin: "20px auto 0", lineHeight: 1.7 }}>
                From government digital transformation to startup MVPs — our cross-industry expertise ensures we understand your domain deeply.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100} direction="fade">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 40 }}>
              {INDUSTRIES.map((ind, i) => (
                <button
                  key={i}
                  className="industry-pill"
                  onMouseEnter={() => { setActiveIndustry(i); setIsHoveringIndustry(true); }}
                  onMouseLeave={() => setIsHoveringIndustry(false)}
                  style={{
                    background: activeIndustry === i ? `${ind.color}10` : "white",
                    borderColor: activeIndustry === i ? ind.color : undefined,
                    color: activeIndustry === i ? ind.color : undefined,
                    transform: activeIndustry === i ? "translateY(-3px)" : undefined,
                    boxShadow: activeIndustry === i ? `0 8px 24px ${ind.color}25` : undefined,
                  }}
                >
                  <span>{ind.icon}</span>
                  <span>{ind.label}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Active industry detail */}
          <ScrollReveal delay={150}>
            <div style={{
              padding: "32px 40px", borderRadius: 20,
              background: `${INDUSTRIES[activeIndustry].color}08`,
              border: `1.5px solid ${INDUSTRIES[activeIndustry].color}30`,
              textAlign: "center", transition: "all 0.4s ease", minHeight: 100,
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8,
            }}>
              <div style={{ fontSize: 40 }}>{INDUSTRIES[activeIndustry].icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: INDUSTRIES[activeIndustry].color }}>
                {INDUSTRIES[activeIndustry].label}
              </div>
              <p style={{ color: "rgba(26,26,46,0.6)", fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: 0 }}>
                Delivering tailored digital solutions to the {INDUSTRIES[activeIndustry].label.toLowerCase()} sector — from ERP systems and compliance tooling to customer-facing mobile apps and data dashboards.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FEATURE HIGHLIGHT ───────────────── */}
      <section className="section" style={{ padding: "100px clamp(16px, 4vw, 40px)", background: "#ffffff" }}>
        <div className="container">
          <ScrollReveal>
            <div className="feature-row">
              {/* Text side */}
              <div>
                <div className="feature-pill" style={{ background: "rgba(10,186,223,0.1)", color: COLORS.cyan, border: `1px solid ${COLORS.cyan}30` }}>
                  ✦ {t('home.features.cloudNative.title')}
                </div>
                <h2 className="section-title">{t('home.features.cloudNative.mainTitle')} <span className="grad-cyan">{t('home.features.cloudNative.titleHighlight')}</span></h2>
                <div className="h-line" />
                <p style={{ color: "rgba(26,26,46,0.6)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                  {t('home.features.cloudNative.description')}
                </p>
                <ul className="check-list">
                  {[
                    t('home.features.cloudNative.features.autoScaling'),
                    t('home.features.cloudNative.features.localDataCenters'),
                    t('home.features.cloudNative.features.soc2Compliant'),
                    t('home.features.cloudNative.features.stagingEnvironments'),
                  ].map((item, i) => (
                    <li key={i}>
                      <div className="check-icon" style={{ background: "rgba(81,180,28,0.15)", color: COLORS.green }}>✓</div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={`/${language}/services`} className="btn-primary" style={{ marginTop: 32, display: "inline-flex" }}>
                  {t('home.features.cloudNative.viewCloudServices')} →
                </a>
              </div>

              {/* Visual side */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="tech-visual float-anim-slow" style={{ width: "100%", maxWidth: "min(400px, 100%)", height: "clamp(250px, 50vw, 300px)", position: "relative" }}>
                  {[90, 70, 50].map((size, i) => (
                    <div key={i} className="tech-ring" style={{ width: `${size}%`, height: `${size}%`, top: `${(100 - size) / 2}%`, left: `${(100 - size) / 2}%`, borderColor: i === 0 ? "rgba(10,186,223,0.15)" : i === 1 ? "rgba(237,236,58,0.1)" : "rgba(81,180,28,0.1)", animationDuration: i === 0 ? "12s" : i === 1 ? "18s" : "24s", animationDirection: i === 1 ? "reverse" : "normal" }} />
                  ))}
                  {[
                    { top: "5%", left: "50%", color: COLORS.cyan },
                    { top: "50%", left: "90%", color: COLORS.yellow },
                    { top: "95%", left: "50%", color: COLORS.green },
                    { top: "50%", left: "10%", color: COLORS.blue },
                    { top: "20%", left: "75%", color: COLORS.cyan },
                    { top: "80%", left: "25%", color: COLORS.yellow },
                  ].map((n, i) => (
                    <div key={i} className="tech-node" style={{ top: n.top, left: n.left, background: n.color, boxShadow: `0 0 10px ${n.color}, 0 0 20px ${n.color}80`, animationDelay: `${i * 0.4}s` }} />
                  ))}
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(140px, 40%)", padding: 20, borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, background: "transparent" }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.yellow})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>99.9%</div>
                    <div style={{ fontSize: 12, color: "rgba(26,26,46,0.5)", textAlign: "center" }}>Uptime SLA</div>
                    <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.blue})`, borderRadius: 1 }} />
                    <div style={{ fontSize: 11, color: COLORS.green, fontWeight: 600 }}>● Live</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── OUR PROCESS / TIMELINE ─────────────── */}
      <section className="section" style={{ padding: "100px clamp(16px, 4vw, 40px)", background: "linear-gradient(180deg, #f8f9fc 0%, #eef3fb 100%)" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="section-label">How We Work</div>
              <h2 className="section-title">Our <span className="grad-cyan">Delivery Process</span></h2>
              <div className="h-line" style={{ margin: "16px auto 0" }} />
              <p style={{ color: "rgba(26,26,46,0.55)", fontSize: 16, maxWidth: 560, margin: "20px auto 0", lineHeight: 1.7 }}>
                A transparent, repeatable process honed over 5+ years — so you always know what's happening and what comes next.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
            {/* Vertical connecting line */}
            <div style={{ position: "absolute", left: 28, top: 56, bottom: 0, width: 2, background: "linear-gradient(to bottom, rgba(10,186,223,0.7), rgba(14,98,162,0.3))", borderRadius: 2 }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PROCESS_STEPS.map((step, i) => (
                <ScrollReveal key={i} delay={i * 100} direction="left">
                  <div
                    className="timeline-step"
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveStep(activeStep === i ? null : i)}
                  >
                    {/* Step Number Bubble */}
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                      background: activeStep === i ? step.color : "white",
                      border: `2px solid ${step.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15,
                      color: activeStep === i ? "#fff" : step.color,
                      transition: "all 0.3s ease", zIndex: 1,
                      boxShadow: activeStep === i ? `0 0 0 6px ${step.color}20` : "0 4px 12px rgba(0,0,0,0.08)",
                    }}>
                      {step.num}
                    </div>

                    {/* Content Card */}
                    <div style={{
                      flex: 1, padding: "20px 24px", borderRadius: 16,
                      background: activeStep === i ? "white" : "rgba(255,255,255,0.7)",
                      border: `1.5px solid ${activeStep === i ? step.color + "40" : "rgba(5,5,69,0.06)"}`,
                      boxShadow: activeStep === i ? `0 8px 32px ${step.color}15` : "0 2px 8px rgba(5,5,69,0.04)",
                      transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "#0d0d2b", margin: 0 }}>{step.title}</h3>
                        <span style={{ fontSize: 12, color: step.color, fontWeight: 600, background: `${step.color}15`, padding: "3px 10px", borderRadius: 100, whiteSpace: "nowrap", marginLeft: 12 }}>{step.duration}</span>
                      </div>
                      <p style={{ fontSize: 14, color: "rgba(26,26,46,0.6)", lineHeight: 1.7, margin: "10px 0 0" }}>{step.desc}</p>

                      {/* Expanded details */}
                      <div style={{
                        overflow: "hidden", maxHeight: activeStep === i ? 200 : 0,
                        transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
                      }}>
                        <div style={{ paddingTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {step.details.map((d, di) => (
                            <span key={di} style={{
                              fontSize: 12, padding: "4px 12px", borderRadius: 100,
                              background: `${step.color}10`, color: step.color, fontWeight: 600,
                            }}>✓ {d}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DEVELOPMENT PROCESS FEATURE ─────── */}
      <section className="section" style={{ padding: "100px clamp(16px, 4vw, 40px)", background: "#ffffff" }}>
        <div className="container">
          <ScrollReveal delay={100}>
            <div className="feature-row reverse" style={{}}>
              {/* Visual */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { title: "Requirement Analysis", desc: "Deep-dive discovery with your team", icon: "01", color: COLORS.cyan, pct: 100 },
                  { title: "Prototype & Design", desc: "Wireframes validated in 2 weeks", icon: "02", color: COLORS.yellow, pct: 80 },
                  { title: "Agile Development", desc: "2-week sprints with live demos", icon: "03", color: COLORS.green, pct: 90 },
                  { title: "Deploy & Support", desc: "Seamless go-live + 12-mo warranty", icon: "04", color: COLORS.blue, pct: 95 },
                ].map((step, i) => (
                  <div key={i} className="glass-card" style={{ padding: "clamp(14px, 3vw, 20px)", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: "clamp(36px, 5vw, 44px)", height: "clamp(36px, 5vw, 44px)", borderRadius: 12, background: `${step.color}15`, border: `1px solid ${step.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(13px, 3vw, 15px)", fontWeight: 800, color: step.color, fontFamily: "'Syne', sans-serif", flexShrink: 0 }}>
                      {step.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: "clamp(12px, 3vw, 14px)", marginBottom: 4, color: "#0d0d2b" }}>{step.title}</div>
                      <div style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "rgba(26,26,46,0.5)", marginBottom: 8 }}>{step.desc}</div>
                      <div style={{ height: 4, background: "rgba(5,5,69,0.06)", borderRadius: 2 }}>
                        <div style={{ height: "100%", width: `${step.pct}%`, background: `linear-gradient(90deg, ${step.color}, ${step.color}80)`, borderRadius: 2, transition: "width 1s ease" }} />
                      </div>
                    </div>
                    <div style={{ fontSize: "clamp(12px, 3vw, 13px)", fontWeight: 700, color: step.color, flexShrink: 0 }}>{step.pct}%</div>
                  </div>
                ))}
              </div>

              {/* Text */}
              <div>
                <div className="feature-pill" style={{ background: "rgba(237,236,58,0.1)", color: COLORS.yellow, border: `1px solid ${COLORS.yellow}30` }}>
                  ✦ {t('home.features.developmentProcess.title')}
                </div>
                <h2 className="section-title">{t('home.features.developmentProcess.mainTitle')} <span className="grad-yellow">{t('home.features.developmentProcess.titleHighlight')}</span></h2>
                <div className="h-line" style={{ background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.green})` }} />
                <p style={{ color: "rgba(26,26,46,0.6)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                  {t('home.features.developmentProcess.description')}
                </p>
                <ul className="check-list">
                  {[
                    t('home.features.developmentProcess.features.weekDelivery'),
                    t('home.features.developmentProcess.features.documentation'),
                    t('home.features.developmentProcess.features.warranty'),
                  ].map((item, i) => (
                    <li key={i}>
                      <div className="check-icon" style={{ background: "rgba(237,236,58,0.15)", color: COLORS.yellow }}>✓</div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={`/${language}/contact`} className="btn-primary" style={{ marginTop: 32, display: "inline-flex", background: `linear-gradient(135deg, ${COLORS.yellow}, ${COLORS.green})` }}>
                  {t('home.features.developmentProcess.startProject')} →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ── TECHNOLOGY STACK ────────────────── */}
      <section className="section" style={{ padding: "100px 0", background: "#f8f9fc", borderTop: "1px solid rgba(0,0,0,0.03)", borderBottom: "1px solid rgba(0,0,0,0.03)" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="section-label">{t('home.technologyStack.sectionLabel')}</div>
              <h2 className="section-title">{t('home.technologyStack.title')} <span className="grad-blue">{t('home.technologyStack.titleHighlight')}</span></h2>
              <div className="h-line" style={{ margin: "16px auto 0", background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.cyan})` }} />
              <p style={{ color: "rgba(26,26,46,0.6)", fontSize: 16, maxWidth: 600, margin: "20px auto 0", lineHeight: 1.6 }}>
                {t('home.technologyStack.description')}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={100}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, marginTop: 40, padding: "0 16px" }}>
            {TECHNOLOGY_STACK.map((tech, i) => (
              <div key={i} className="tech-card" title={tech.name} style={{ margin: 0 }}>
                <img src={tech.logo} alt={tech.name} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── AWARDS & PARTNERS ─────────────────── */}
      <section className="section" style={{ padding: "100px clamp(16px, 4vw, 40px)", background: "#ffffff" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">Certifications & Partners</div>
              <h2 className="section-title">Trusted by <span className="grad-blue">Industry Leaders</span></h2>
              <div className="h-line" style={{ margin: "16px auto 0", background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.cyan})` }} />
              <p style={{ color: "rgba(26,26,46,0.55)", fontSize: 16, maxWidth: 520, margin: "20px auto 0", lineHeight: 1.7 }}>
                Our certifications and technology partnerships reflect our commitment to global standards and continuous learning.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: 20, marginBottom: 56 }}>
            {AWARDS.map((award, i) => (
              <ScrollReveal key={i} delay={i * 80} direction="up">
                <div className="award-card">
                  <img src={award.logo} alt={award.name} style={{ width: 48, height: 48, objectFit: "contain" }} />
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#0d0d2b", textAlign: "center" }}>{award.name}</div>
                  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 100, background: "rgba(10,186,223,0.08)", color: COLORS.cyan, fontWeight: 600 }}>{award.badge}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Trust badges row */}
          <ScrollReveal delay={200}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              {[
                { icon: "🔒", text: "SOC 2 Type II Compliant" },
                { icon: "🌏", text: "ISO 27001 Aligned" },
                { icon: "✅", text: "GDPR Ready" },
                { icon: "⚡", text: "99.9% SLA Guaranteed" },
                { icon: "🛡️", text: "Penetration Tested" },
                { icon: "📞", text: "24/7 Support Included" },
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 100, background: "rgba(5,5,69,0.04)", border: "1px solid rgba(5,5,69,0.08)", fontSize: 13, fontWeight: 600, color: "rgba(5,5,69,0.7)" }}>
                  <span>{b.icon}</span>{b.text}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────── */}
      <section className="section" style={{ padding: "100px clamp(16px, 4vw, 40px)", background: "linear-gradient(180deg, #f0f6ff 0%, #f8f9fc 100%)" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="section-label">{t('home.testimonials.sectionLabel')}</div>
              <h2 className="section-title">{t('home.testimonials.title')} <span className="grad-green">{t('home.testimonials.titleHighlight')}</span></h2>
              <div className="h-line" style={{ margin: "16px auto 0", background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.cyan})` }} />
            </div>
          </ScrollReveal>

          <style>{`
            .expert-scroll-container::-webkit-scrollbar { display: none; }
          `}</style>
          <div className="expert-scroll-container" style={{ display: "flex", gap: 24, overflowX: "auto", paddingBottom: 32, scrollSnapType: "x mandatory", msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            {testimonials.map((testimonial, i) => (
              <div key={i} style={{ width: 'min(360px, 85vw)', flexShrink: 0, scrollSnapAlign: "start", display: "flex", flexDirection: "column" }}>
                <ScrollReveal delay={i * 100} direction="up" style={{ height: '100%' }}>
                  <TiltCard className="glass-card testimonial-card" style={{ padding: "0", height: "100%", overflow: "hidden" }}>
                    <div className="glow-top" style={{ background: `linear-gradient(90deg, transparent, ${testimonial.color}50, transparent)` }} />
                    <div style={{ position: "relative", width: "100%", height: "240px" }}>
                      <img src={testimonial.photo} alt={testimonial.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(5,5,69,0.95) 0%, rgba(5,5,69,0.7) 50%, transparent 100%)", padding: "20px", display: "flex", flexDirection: "column", gap: 4 }}>
                        <div style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>{testimonial.name}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{testimonial.role}</div>
                      </div>
                    </div>
                    <div style={{ padding: "20px" }}>
                      <div className="stars" style={{ marginBottom: 12 }}>★★★★★</div>
                      <p className="quote" style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>"{testimonial.text}"</p>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ STRIP ─────────────────────────── */}
      <section className="section" style={{ padding: "80px clamp(16px, 4vw, 40px)", background: "#ffffff" }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: "clamp(24px, 5vw, 80px)", alignItems: "start" }}>
              <div>
                <div className="section-label">FAQ</div>
                <h2 className="section-title">Common <span className="grad-cyan">Questions</span></h2>
                <div className="h-line" />
                <p style={{ color: "rgba(26,26,46,0.55)", fontSize: 16, lineHeight: 1.7, marginTop: 16 }}>
                  Can't find what you're looking for? <a href={`/${language}/contact`} style={{ color: COLORS.cyan, fontWeight: 600 }}>Contact our team →</a>
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { q: "How long does a typical project take?", a: "Most projects range from 4–16 weeks depending on complexity. We provide a detailed timeline after the discovery phase." },
                  { q: "Do you offer ongoing support after launch?", a: "Yes — all projects include a 12-month warranty and we offer tiered SLA support packages for long-term maintenance." },
                  { q: "Can you work with our existing systems?", a: "Absolutely. We specialize in integrating with legacy systems, ERPs, payment gateways, and third-party APIs common in Cambodia." },
                  { q: "What industries do you have experience in?", a: "We've delivered projects across banking, healthcare, education, e-commerce, government, logistics, and tourism sectors." },
                ].map((faq, i) => (
                  <ScrollReveal key={i} delay={i * 60}>
                    <div style={{ padding: "20px 24px", borderRadius: 14, background: "rgba(5,5,69,0.02)", border: "1px solid rgba(5,5,69,0.07)", transition: "all 0.3s ease" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${COLORS.cyan}40`; (e.currentTarget as HTMLDivElement).style.background = "rgba(10,186,223,0.03)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(5,5,69,0.07)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(5,5,69,0.02)"; }}
                    >
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#0d0d2b", marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ color: COLORS.cyan, flexShrink: 0, marginTop: 2 }}>Q</span> {faq.q}
                      </div>
                      <div style={{ fontSize: 14, color: "rgba(26,26,46,0.6)", lineHeight: 1.6, paddingLeft: 20 }}>{faq.a}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────── */}
      <section className="section" style={{ padding: "40px clamp(16px, 4vw, 40px) 100px" }}>
        <div className="container">
          <ScrollReveal direction="fade">
            <div style={{ position: "relative", overflow: "hidden", padding: "clamp(40px, 6vw, 72px)", textAlign: "center", borderRadius: 28, background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0a1060 60%, #061050 100%)`, border: "1px solid rgba(10,186,223,0.25)", boxShadow: "0 24px 80px rgba(5,5,69,0.3)" }}>
              {/* Animated gradient border effect */}
              <div style={{ position: "absolute", inset: -2, borderRadius: 30, background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.yellow}, ${COLORS.green}, ${COLORS.cyan})`, backgroundSize: "200% auto", animation: "borderRotate 4s linear infinite", zIndex: -1 }} />

              {/* Ambient orbs */}
              <div style={{ position: "absolute", width: "min(400px, 50vw)", height: "min(400px, 50vw)", borderRadius: "50%", background: COLORS.cyan, filter: "blur(100px)", opacity: 0.1, top: "-100px", right: "0%", pointerEvents: "none" }} />
              <div style={{ position: "absolute", width: "min(300px, 40vw)", height: "min(300px, 40vw)", borderRadius: "50%", background: COLORS.yellow, filter: "blur(80px)", opacity: 0.08, bottom: "-80px", left: "10%", pointerEvents: "none" }} />

              <div style={{ position: "relative", zIndex: 2 }}>
                <div className="section-label" style={{ background: "rgba(10,186,223,0.12)", borderColor: "rgba(10,186,223,0.3)", color: COLORS.cyan, marginBottom: 8, fontSize: 12 }}>{t('home.cta.sectionLabel')}</div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", color: "#ffffff", lineHeight: 1.15, marginBottom: 12 }}>
                  {t('home.cta.title')} <span className="grad-cyan">{t('home.cta.titleHighlight')}</span><br />{t('home.cta.title2')}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 32px", textAlign: "center" }}>
                  {t('home.cta.description')}
                </p>

                {/* Feature checklist */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 36 }}>
                  {["Free initial consultation", "No commitment required", "Response within 24 hours", "Fixed-price contracts available"].map((item, i) => (
                    <span key={i} style={{ fontSize: 13, padding: "6px 14px", borderRadius: 100, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                      ✓ {item}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href={`/${language}/contact`} className="btn-primary" style={{ fontSize: 15, padding: "14px 36px", minWidth: "180px" }}>
                    {t('home.cta.bookConsultation')} →
                  </a>
                  <a href={`/${language}/services`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, padding: "14px 36px", borderRadius: 100, fontWeight: 600, background: "rgba(255,255,255,0.08)", color: "#fff", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.2)", transition: "all 0.3s ease" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.14)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)"; }}>
                    {t('home.cta.viewAllServices')}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}