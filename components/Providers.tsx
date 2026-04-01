'use client';

import { MotionConfig } from 'framer-motion';

// Global spring defaults — everything feels physically weighted, not "animated"
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 28,
        mass: 0.6,
      }}
    >
      {children}
    </MotionConfig>
  );
}
