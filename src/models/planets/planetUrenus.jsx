import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Uranus({ position = [37, 0, 0], onClick }) {
  const uranusRef = useRef();

  useFrame((state, delta) => {
    if (uranusRef.current) {
      uranusRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh
      ref={uranusRef}
      position={position}
      onClick={onClick}
    >
      <sphereGeometry args={[1.35, 40, 40]} />
      <meshStandardMaterial
        color="#7dd3df"
        roughness={0.75}
        metalness={0.05}
      />
    </mesh>
  );
}