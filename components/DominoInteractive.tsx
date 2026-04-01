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

    // The user pulls the slingshot backwards (negative X). They are aiming towards the right (+X).
    const pulledX = info.offset.x;
    const pulledY = info.offset.y;

    // SUCCESS CRITERIA: 
    // They must pull back horizontally at least -40px. 
    // Their vertical aim must not be wildly off-target (Math.abs(y) < 45).
    const isGoodHit = pulledX < -40 && Math.abs(pulledY) < 45;

    if (isGoodHit) {
      setGameState('flyingHit');
      
      // Animate the ball snapping forward like a slingshot release and striking the first domino
      await ballControls.start({
        x: 60, // Fly into the first domino gap
        y: -pulledY * 0.8, // Slightly follow the Y trajectory opposite to the drag
        transition: { type: 'spring', stiffness: 600, damping: 15 }
      });
      
      // Ball hides after hit to simulate it shattering or falling behind
      ballControls.start({ opacity: 0, transition: { duration: 0.2 } });

      // Trigger the domino cascade fall
      setGameState('fallen');
      
      // Wait for the domino cascade to finish (0.12s delay per domino + animation time)
      setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
          router.push('/hire-me');
        }, 600);
      }, 1400); // 1.4s total wait
      
    } else {
      // MISS CRITERIA: Too weak or bad angle
      setGameState('flyingMiss');
      
      // Ball weakly drops or flies off target
      await ballControls.start({
        x: -pulledX * 0.5, // Snap forward minimally
        y: 80, // Drop to the "ground"
        opacity: 0,
        transition: { type: 'spring', stiffness: 200, damping: 20 }
      });

      // Reset the mini-game after a failure so they can try again
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
              boxShadow: '0 0 12px rgba(255,255,255,1)',
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
