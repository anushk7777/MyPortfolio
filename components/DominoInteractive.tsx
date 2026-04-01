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
      
      // Animate the ball snapping forward and striking the first domino EXACTLY.
      // 40px is about the gap distance to the first domino face.
      await ballControls.start({
        x: 40, 
        y: 0, 
        transition: { type: 'spring', stiffness: 700, damping: 10 }
      });
      
      // Physical Strike: The ball bounces off the domino and falls down
      ballControls.start({
        x: 20,
        y: 60, // Falls to the floor
        opacity: 0, // slowly fades after hitting the floor
        transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.05, opacity: { delay: 0.3 } }
      });

      // Trigger the domino cascade fall right when the ball hits
      setGameState('fallen');
      
      // Let the user strictly enjoy the entire 5 sequential domino fall (takes about ~1 second total)
      // We will wait a full 1.8 seconds before triggering the page transition overlay to avoid "snappiness".
      setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
          router.push('/hire-me');
        }, 800);
      }, 1800); 
      
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
            dragConstraints={{ right: 0, top: -50, bottom: 50, left: -100 }}
            dragElastic={0.2}
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
              // Move the bounding box slightly up to align with the domino center height
              marginBottom: '15px' 
            }}
            whileTap={{ cursor: 'grabbing', scale: 1.2 }}
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
