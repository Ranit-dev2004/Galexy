import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Mercury({ position = [6, 0, 0], onClick }) {
  const mercuryRef = useRef();

  useFrame((state, delta) => {
    if (mercuryRef.current) {
      mercuryRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={mercuryRef}
      position={position}
      onClick={onClick}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#8c8c8c"
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  );
}