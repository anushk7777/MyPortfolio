'use client';

import { useSmoothScroll } from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import MagneticButton from '@/components/MagneticButton';
import BackgroundParticles from '@/components/BackgroundParticles';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function HireMe() {
  useSmoothScroll();
  const textRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    // Fade body back in if we routed from the domino effect which sets opacity to 0
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';

    // Staggered reveal for the massive text and credentials
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.3 }
      );
    }

    return () => {
      document.body.style.transition = 'none';
    };
  }, []);

  return (
    <main style={{ backgroundColor: '#000000', minHeight: '100vh', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
       <CustomCursor />
       <BackgroundParticles />

       <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
          <div ref={textRef} style={{ textAlign: 'center', maxWidth: 1000, position: 'relative', zIndex: 10 }}>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 10vw, 8rem)', 
              fontWeight: 600, 
              letterSpacing: '-0.05em', 
              lineHeight: 0.85, 
              marginBottom: '2rem', 
              color: '#fff',
              textTransform: 'uppercase'
            }}>
              Awesome. <br/>
              <span style={{ color: '#888' }}>Now you know <br/> how to play.</span>
            </h1>
            
            <p style={{ 
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', 
              color: '#fff', 
              marginBottom: '4rem', 
              lineHeight: 1.6,
              maxWidth: 700,
              margin: '0 auto 4rem auto',
              fontWeight: 500,
              letterSpacing: '-0.02em'
            }}>
               It&apos;s time to hire.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '8rem' }}>
               <MagneticButton href="mailto:anushkdua2508@gmail.com" className="btn-magnetic">
                  anushkdua2508@gmail.com
               </MagneticButton>
               <MagneticButton href="https://linkedin.com/in/anushk-dua" className="btn-magnetic">
                  LinkedIn Profile
               </MagneticButton>
               <MagneticButton href="https://github.com/anushk7777" className="btn-magnetic">
                  GitHub ↗
               </MagneticButton>
            </div>

            <div>
              <Link 
                href="/" 
                style={{ 
                  color: '#666', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.85rem', 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase',
                  borderBottom: '1px solid #333',
                  paddingBottom: '4px',
                  transition: 'color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                onMouseOut={(e) => e.currentTarget.style.color = '#666'}
              >
                 ← Return to Terminal
              </Link>
            </div>
          </div>
       </div>
    </main>
  );
}
