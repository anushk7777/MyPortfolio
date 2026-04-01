'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

// Single dot cursor with blend-mode difference. Pure white dot over pitch black inverts colors on hover.
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Extremely tight spring for precision feel
  const dotX = useSpring(x, { stiffness: 1000, damping: 40, mass: 0.1 });
  const dotY = useSpring(y, { stiffness: 1000, damping: 40, mass: 0.1 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      style={{
        x: dotX,
        y: dotY,
        position: 'fixed',
        top: 0,
        left: 0,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: '#ffffff',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        mixBlendMode: 'difference',
      }}
    />
  );
}
