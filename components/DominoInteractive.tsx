'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DominoInteractive() {
  const [fallen, setFallen] = useState(false);
  const router = useRouter();
  
  // 5 dominos for a satisfying chain reaction
  const DOMINO_COUNT = 5;
  const dominos = Array.from({ length: DOMINO_COUNT });

  useEffect(() => {
    // Actively prefetch the target page so it is instantly available in memory
    router.prefetch('/hire-me');
  }, [router]);

  const handleStrike = () => {
    if (fallen) return;
    setFallen(true);
    
    // Wait for the cascade to finish (0.1s delay per domino + animation time)
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.6s ease';
      document.body.style.opacity = '0';
      
      setTimeout(() => {
        // Push the route. The new page's mount effect will handle fading the body back in ensuring zero flash.
        router.push('/hire-me');
      }, 600);
    }, 1400); // Wait 1.4s for the full chain to fall and settle
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        gap: '0.75rem', 
        cursor: 'pointer',
        padding: '1rem', // Increase hit area
      }} 
      onClick={handleStrike}
    >
       <span 
         className="mono" 
         style={{ 
           fontSize: '0.7rem', 
           color: '#888',
           opacity: fallen ? 0 : 1, 
           transition: 'opacity 0.4s ease',
           transform: 'translateY(-4px)',
           marginRight: '1rem'
         }}
       >
          [ FLICK ME ]
       </span>
       
       {dominos.map((_, i) => (
         <motion.div
           key={i}
           animate={fallen ? { rotate: 78 } : { rotate: 0 }}
           transition={{ 
             type: 'spring', 
             stiffness: 180, 
             damping: 12,
             mass: 1.2,
             // The sequential timing cascade that simulates them hitting each other
             delay: i * 0.12 
           }}
           style={{
             width: '16px',
             height: '46px',
             background: '#ffffff',
             borderRadius: '2px',
             transformOrigin: 'bottom right',
             boxShadow: fallen ? '0 0 0px rgba(255,255,255,0)' : '0 0 15px rgba(255,255,255,0.2)',
             // As they fall, the 78deg rotation will cause them to perfectly overlap 
             // because the height (46px) is greater than width + gap.
           }}
         />
       ))}
    </div>
  );
}
