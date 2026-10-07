import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Saturn({ position = [30, 0, 0], onClick }) {
  const saturnRef = useRef();

  useFrame((state, delta) => {
    if (saturnRef.current) {
      saturnRef.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group
      ref={saturnRef}
      position={position}
      onClick={onClick}
    >
      {/* Planet */}
      <mesh>
        <sphereGeometry args={[1.8, 48, 48]} />
        <meshStandardMaterial
          color="#d8b878"
          roughness={0.85}
        />
      </mesh>

      {/* Rings */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[2.3, 3.5, 64]} />
        <meshStandardMaterial
          color="#c9b38c"
          side={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}