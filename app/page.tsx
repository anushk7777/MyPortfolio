'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/HeroSection';
import ProjectGrid from '@/components/ProjectGrid';
import CustomCursor from '@/components/CustomCursor';
import BackgroundParticles from '@/components/BackgroundParticles';
import MagneticButton from '@/components/MagneticButton';
import DominoInteractive from '@/components/DominoInteractive';
import { useSmoothScroll } from '@/components/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

const exp = [
  {
    company: 'JumpGrowth',
    role: 'Software Dev Intern',
    period: '2025 — Present',
    desc: 'Shipped ATS Scorer. NLP pipelines with Gemini Vision, robust error tracking, rapid feature iteration in production.',
  },
  {
    company: 'Emanate Community',
    role: 'Co-Founder',
    period: '2024',
    desc: 'Bootstrapped a 200+ member tech collective. Facilitated AR, blockchain, and quantitative analysis workshops.',
  },
];

const links = [
  { label: 'GitHub', href: 'https://github.com/anushk7777' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/anushk-dua' },
  { label: 'Email', href: 'mailto:anushkdua2508@gmail.com' },
];

export default function Home() {
  useSmoothScroll();

  const expRef = useRef<HTMLDivElement>(null!);
  const connectRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (expRef.current) {
      gsap.fromTo(expRef.current.querySelectorAll('.list-row'),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: expRef.current, start: 'top 85%', once: true }
        }
      );
    }
    if (connectRef.current) {
      gsap.fromTo(connectRef.current.querySelectorAll('[data-anim]'),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: connectRef.current, start: 'top 85%', once: true }
        }
      );
    }
  }, []);

  return (
    <main style={{ backgroundColor: '#000000', minHeight: '100vh', overflowX: 'hidden' }}>
      <CustomCursor />
      <BackgroundParticles />

      {/* ── Navbar ──── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        background: 'transparent',
        mixBlendMode: 'difference',
        pointerEvents: 'none', // Allow passing events through to things below except direct children
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <MagneticButton href="#">
            <span style={{ fontWeight: 600, fontSize: '1.2rem', letterSpacing: '-0.04em', color: '#fff' }}>
              Anushk Dua.
            </span>
          </MagneticButton>
        </div>
        <nav style={{ display: 'flex', gap: '3rem', alignItems: 'center', pointerEvents: 'auto' }}>
          <a href="#projects" className="tag" style={{ color: '#fff' }}>Work</a>
          <a href="#experience" className="tag" style={{ color: '#fff' }}>About</a>
          <a href="mailto:anushkdua2508@gmail.com" className="tag" style={{ color: '#fff' }}>Contact</a>
        </nav>
      </header>

      {/* ── Hero ──── */}
      <HeroSection />

      {/* ── Projects ──── */}
      <ProjectGrid />

      {/* ── Experience ──── */}
      <section id="experience" style={{ padding: '8rem 0' }}>
        <div className="container" ref={expRef}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '4rem' }}>
            <h2 className="section-heading">Career</h2>
            <span className="mono" style={{ paddingBottom: '0.5rem' }}>// 02</span>
          </div>

          <div style={{ borderTop: '1px solid var(--border)' }}>
            {exp.map((e) => (
              <div key={e.company} className="list-row" style={{ opacity: 0 }}>
                {/* ID & Title */}
                <div style={{ flex: 1.5 }}>
                  <div className="list-row-title" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}>
                    {e.company}
                  </div>
                </div>

                {/* Description */}
                <div className="desktop-only" style={{ flex: 2 }}>
                  <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 460 }}>
                    {e.desc}
                  </p>
                </div>

                {/* Tech Tags */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span className="tag" style={{ color: 'var(--fg)', marginBottom: '0.5rem' }}>{e.role}</span>
                  <span className="mono" style={{ fontSize: '0.65rem' }}>{e.period}</span>
                </div>
              </div>
            ))}

            {/* Education Row */}
            <div className="list-row" style={{ opacity: 0 }}>
              <div style={{ flex: 1.5 }}>
                <div className="list-row-title" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}>
                  Manipal University
                </div>
              </div>
              <div className="desktop-only" style={{ flex: 2 }}>
                <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 460 }}>
                  BTech in Computer Science & Communication. Dean&apos;s List. Strong foundation in distributed systems and systems architecture.
                </p>
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span className="tag" style={{ color: 'var(--fg)', marginBottom: '0.5rem' }}>Student</span>
                <span className="mono" style={{ fontSize: '0.65rem' }}>2022 — 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Connect ──── */}
      <section style={{ padding: '8rem 0 6rem', background: '#050505', borderTop: '1px solid var(--border)' }}>
        <div className="container" ref={connectRef}>
          <div style={{ marginBottom: '4rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'end' }}>
            <div>
              <span className="mono" data-anim style={{ display: 'block', marginBottom: '1rem' }}>// 03 — Connect</span>
              <h2 className="section-heading" data-anim style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>Talk to me.</h2>
            </div>
            <p data-anim style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 360 }}>
              Building something with uncompromising standards? Looking for an engineer who cares about architecture? Drop an email.
            </p>
          </div>
          
          <div data-anim style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            {links.map((l) => (
              <MagneticButton key={l.label} href={l.href} className="btn-magnetic">
                {l.label} <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', marginLeft: '0.75rem' }}>↗</span>
              </MagneticButton>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──── */}
      <footer style={{
        padding: '3rem 0',
        background: '#050505',
      }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '2rem',
          borderTop: '1px solid #111', paddingTop: '3rem', paddingBottom: '3rem'
        }}>
          <span style={{ fontSize: '0.85rem', color: '#555', letterSpacing: '-0.02em' }}>Anushk Dua © 2026</span>
          
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
             <DominoInteractive />
          </div>

          <span className="mono" style={{ fontSize: '0.65rem', color: '#444', textAlign: 'right' }}>Engineered with Next.js, <br/>Framer Motion, GSAP, and Lenis</span>
        </div>
      </footer>
    </main>
  );
}
