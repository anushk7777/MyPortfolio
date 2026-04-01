'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null!);
  const line1Ref = useRef<HTMLDivElement>(null!);
  const line2Ref = useRef<HTMLDivElement>(null!);
  const subRef = useRef<HTMLParagraphElement>(null!);
  const metaRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    
    // Animate lines from bottom up with mask reveal
    tl.fromTo(line1Ref.current, { y: '100%' }, { y: '0%', duration: 1.4 }, 0.2)
      .fromTo(line2Ref.current, { y: '100%' }, { y: '0%', duration: 1.4 }, 0.3)
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 0.8)
      .fromTo(metaRef.current, { opacity: 0 }, { opacity: 1, duration: 2 }, 1.2);
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#000000', // Hard black
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        
        {/* Massive Typography Hero */}
        <h1 style={{
          fontSize: 'clamp(3rem, 11vw, 10rem)',
          fontWeight: 600,
          letterSpacing: '-0.05em',
          lineHeight: 0.85,
          textTransform: 'uppercase',
          marginBottom: '3rem',
          color: '#ffffff',
        }}>
          <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>
            <div ref={line1Ref} style={{ willChange: 'transform' }}>I BUILD</div>
          </div>
          <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>
            <div ref={line2Ref} style={{ color: '#888888', willChange: 'transform' }}>INTELLIGENCE.</div>
          </div>
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'end',
        }}>
          {/* Subheading */}
          <p ref={subRef} style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#a1a1aa',
            lineHeight: 1.6,
            maxWidth: 500,
            willChange: 'transform, opacity',
          }}>
            Software engineer shaping AI products from the ground up.<br/>
            Currently pushing RAG pipelines at JumpGrowth in Jaipur.
          </p>

          {/* Meta / Scroll Indicator */}
          <div ref={metaRef} style={{
            display: 'flex',
            gap: '3rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            color: '#666666',
            textTransform: 'uppercase',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ color: '#ffffff' }}>Status</span>
              <span>Available — 2026</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ color: '#ffffff' }}>Scroll</span>
              <span>To explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
