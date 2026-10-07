// src/models/stars/SunAdityaL1.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function SunAdityaL1({ position = [0, 0, 0], onClick }) {
  const sunRef = useRef();

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={position} onClick={onClick}>
      <mesh ref={sunRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial emissive="#ff8800" emissiveIntensity={2} color="#ffaa00" />
      </mesh>
      {/* Solar Corona Atmosphere Glow */}
      <mesh scale={1.2}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#ffcc00" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}