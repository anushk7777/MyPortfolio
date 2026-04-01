'use client';

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setHidden(v > prev && v > 150);
  });

  return (
    <motion.header
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      // Smooth, spring-based hide/show — no jarring snap
      transition={{ type: 'spring', stiffness: 300, damping: 32, mass: 0.6 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 2.5rem',
        background: scrolled ? 'rgba(6,11,24,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background 0.5s, border-color 0.5s',
        willChange: 'transform',
      }}
    >
      {/* Logo */}
      <motion.a
        href="#"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        // Each element uses the global MotionConfig spring
        style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
      >
        <div style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
          boxShadow: '0 0 18px rgba(59,130,246,0.55)',
        }} />
        <span style={{
          fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.05rem',
          letterSpacing: '-0.03em', color: '#fff',
        }}>
          Anushk<span style={{ color: '#60a5fa' }}>.</span>
        </span>
      </motion.a>

      {/* Links */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}
      >
        {[['Work', '#projects'], ['About', '#experience'], ['Contact', 'mailto:anushkdua2508@gmail.com']].map(([label, href], i) => (
          <motion.a
            key={label}
            href={href}
            whileHover={{ color: '#60a5fa', y: -1 }}
            // spring from MotionConfig
            style={{
              fontSize: '0.88rem', fontWeight: 500,
              color: i === 2 ? '#fff' : 'rgba(255,255,255,0.6)',
              letterSpacing: '-0.01em',
              ...(i === 2 ? {
                padding: '7px 20px',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.04)',
              } : {}),
            }}
          >
            {label}
          </motion.a>
        ))}
      </motion.nav>
    </motion.header>
  );
}
