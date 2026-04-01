'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Medicobot',
    desc: 'RAG-powered clinical chatbot bridging LangChain, FAISS, and medical diagnostics.',
    tech: ['Python', 'LangChain', 'FAISS'],
    href: 'https://medical-chatbot-main.vercel.app/',
    id: '01',
  },
  {
    title: 'ATS Scorer',
    desc: 'Resume intelligence layer auditing profiles instantly via Gemini Vision APIs.',
    tech: ['Next.js', 'Gemini'],
    href: 'https://ats-scorer-ai.vercel.app/',
    id: '02',
  },
  {
    title: 'MealMan',
    desc: 'Bio-adaptive PWA tracking metabolic drift through Bayesian regression routines.',
    tech: ['Next.js', 'Supabase'],
    href: 'https://worka-out.vercel.app/',
    id: '03',
  },
];

export default function ProjectGrid() {
  const containerRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    if (!containerRef.current) return;
    const rows = containerRef.current.querySelectorAll('.list-row');
    
    gsap.fromTo(rows,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section id="projects" style={{ padding: '8rem 0' }} ref={containerRef}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '4rem' }}>
          <h2 className="section-heading">Selected Work</h2>
          <span className="mono" style={{ paddingBottom: '0.5rem' }}>// 01</span>
        </div>

        {/* List Container for Hover Sync */}
        <div className="list-container" style={{ borderTop: '1px solid var(--border)' }}>
          {projects.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="list-row"
            >
              {/* ID & Title */}
              <div style={{ flex: 1.5 }}>
                <div className="list-row-title">
                  <span style={{ fontSize: '1rem', color: 'var(--muted)', fontWeight: 400, transform: 'translateY(-10px)' }}>{p.id}</span>
                  {p.title}
                </div>
              </div>

              {/* Description */}
              <div style={{ flex: 2, display: 'none', '@media (min-width: 768px)': { display: 'block' } } as React.CSSProperties}>
                <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 460 }}>
                  {p.desc}
                </p>
              </div>

              {/* Tech Tags */}
              <div style={{ flex: 1, display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {p.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              {/* Arrow Indicator */}
              <div style={{ width: '40px', display: 'flex', justifyContent: 'flex-end' }}>
                <span className="list-row-arrow">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
