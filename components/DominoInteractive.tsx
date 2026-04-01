'use client';

import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type GameState = 'idle' | 'dragging' | 'flyingHit' | 'flyingMiss' | 'fallen';

export default function DominoInteractive() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const router = useRouter();
  const ballControls = useAnimation();
  
  // 5 dominos for a satisfying chain reaction
  const DOMINO_COUNT = 5;
  const dominos = Array.from({ length: DOMINO_COUNT });

  useEffect(() => {
    router.prefetch('/hire-me');
  }, [router]);

  // Handle the slingshot physics release
  const handleDragEnd = async (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If we're already animating a flight, ignore
    if (gameState === 'flyingHit' || gameState === 'flyingMiss' || gameState === 'fallen') return;

    const pulledX = info.offset.x;
    const pulledY = info.offset.y;

    // PRECISION AIMING: Must pull back significantly (-60px) and aim extremely straight (Y variance < 20px).
    const isGoodHit = pulledX < -60 && Math.abs(pulledY) < 20;

    if (isGoodHit) {
      setGameState('flyingHit');
      
      const flightDuration = 0.15; // 150ms fast strike
      const impactX = 65; // Precise distance across the gap to the domino face

      // Shoot the ball
      ballControls.start({
        x: impactX, 
        y: 0, 
        transition: { duration: flightDuration, ease: 'easeIn' }
      });
      
      // Moment of impact
      setTimeout(() => {
        // Trigger the domino cascade the instant the ball hits
        setGameState('fallen');
        
        // Physical Strike: Recoil bounce off the hard domino
        ballControls.start({
          x: impactX - 15,
          y: 60, 
          opacity: 0,
          transition: { type: 'spring', stiffness: 300, damping: 15 }
        });

        // ELEGANT TRANSITION: Wait for the EXACT moment the final domino hits the ground.
        // The last domino starts at 0.48s and finishes falling around 1.0s.
        setTimeout(() => {
          document.body.style.transition = 'opacity 0.6s ease';
          document.body.style.opacity = '0';
          
          setTimeout(() => {
            router.push('/hire-me');
          }, 600); // Route just after the fade completes
        }, 1100); // 1.1s wait for all dominos to fall

      }, flightDuration * 1000);      
    } else {
      // MISS CRITERIA: Too weak or bad angle
      setGameState('flyingMiss');
      
      // Ball weakly drops or flies off target due to bad physics
      await ballControls.start({
        x: -pulledX * 0.3, // Snap forward minimally
        y: 80, // Drop
        opacity: 0,
        transition: { type: 'spring', stiffness: 150, damping: 20 }
      });

      // Reset the mini-game
      setTimeout(() => {
        ballControls.set({ x: 0, y: 0, opacity: 1 });
        setGameState('idle');
      }, 800);
    }
  };

  const isFallen = gameState === 'fallen';

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        gap: '0.75rem', 
        padding: '1rem',
        position: 'relative',
        userSelect: 'none',
        touchAction: 'none' // Prevent scrolling while trying to pull the slingshot on mobile
      }} 
    >
       <div style={{ marginRight: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span 
            className="mono" 
            style={{ 
              fontSize: '0.65rem', 
              color: '#888',
              opacity: isFallen ? 0 : 1, 
              transition: 'opacity 0.4s ease',
              marginBottom: '10px'
            }}
          >
             {gameState === 'flyingMiss' ? '[ MISSED ]' : '[ PULL ORB ]'}
          </span>
          
          {/* The Slingshot Projectile (Glowing Orb) */}
          <motion.div
            drag={gameState === 'idle' || gameState === 'dragging'}
            dragConstraints={{ right: 0, top: -60, bottom: 60, left: -200 }}
            dragElastic={0.1}
            onDragStart={() => setGameState('dragging')}
            onDragEnd={handleDragEnd}
            animate={ballControls}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#ffffff',
              cursor: (gameState === 'idle' || gameState === 'dragging') ? 'grab' : 'default',
              zIndex: 10,
              marginBottom: '15px' 
            }}
            whileDrag={{ 
              scale: 1.1,
              // Subtle high-frequency vibration to simulate tension
              x: [0, -1, 1, -1, 1, 0],
              transition: { 
                x: {
                  repeat: Infinity,
                  duration: 0.08,
                  ease: "linear"
                }
              }
            }}
            whileTap={{ cursor: 'grabbing' }}
          />
       </div>
       
       {/* The Target Dominos */}
       {dominos.map((_, i) => (
         <motion.div
           key={i}
           animate={isFallen ? { rotate: 78 } : { rotate: 0 }}
           transition={{ 
             type: 'spring', 
             stiffness: 180, 
             damping: 12,
             mass: 1.2,
             // The sequential timing cascade that simulates them hitting each other
             delay: isFallen ? i * 0.12 : 0
           }}
           style={{
             width: '16px',
             height: '46px',
             background: '#ffffff',
             borderRadius: '2px',
             transformOrigin: 'bottom right',
             boxShadow: isFallen ? '0 0 0px rgba(255,255,255,0)' : '0 0 15px rgba(255,255,255,0.2)',
           }}
         />
       ))}
    </div>
  );
}
