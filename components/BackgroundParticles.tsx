'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const count = 3000;
  const mesh = useRef<THREE.Points>(null!);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a massive field of particles that looks like intelligence or stars
      const distance = Math.random() * 8 + 2;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime * 0.05;

    // Slowly rotate the entire swarm
    mesh.current.rotation.y = time;
    mesh.current.rotation.x = time * 0.5;

    // Subtle parallax effect tracking the mouse
    const tx = state.mouse.x * 0.5;
    const ty = state.mouse.y * 0.5;

    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, tx, 0.02);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, ty, 0.02);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function BackgroundParticles() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', mixBlendMode: 'screen' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
