import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Venus({ position = [9, 0, 0], onClick }) {
  const venusRef = useRef();

  useFrame((state, delta) => {
    if (venusRef.current) {
      venusRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <mesh
      ref={venusRef}
      position={position}
      onClick={onClick}
    >
      <sphereGeometry args={[0.85, 32, 32]} />
      <meshStandardMaterial
        color="#d9a441"
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  );
}
