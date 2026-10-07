// src/models/planets/MoonChandrayaan.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function MoonChandrayaan({ position = [12, 2, 5], onClick }) {
  const moonRef = useRef();
  const markerRef = useRef();

  useFrame((state, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * 0.15;
    }
    if (markerRef.current) {
      // Pulse Shiv Shakti landing marker
      const t = state.clock.getElapsedTime();
      markerRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.2);
    }
  });

  return (
    <group position={position} onClick={onClick}>
      {/* Lunar Body */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial 
          color="#a0a0a0" 
          roughness={0.9} 
          metalness={0.05} 
        />
      </mesh>

      {/* Chandrayaan-3 "Shiv Shakti Point" Pulsing Landing Beacon */}
      <group position={[0.4, -0.6, 0.5]}>
        <mesh ref={markerRef}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#00ffcc" />
        </mesh>
        <pointLight color="#00ffcc" intensity={1.5} distance={3} />
      </group>
    </group>
  );
}