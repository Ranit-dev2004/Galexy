import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Neptune({ position = [43, 0, 0], onClick }) {
  const neptuneRef = useRef();

  useFrame((state, delta) => {
    if (neptuneRef.current) {
      neptuneRef.current.rotation.y += delta * 0.23;
    }
  });

  return (
    <mesh
      ref={neptuneRef}
      position={position}
      onClick={onClick}
    >
      <sphereGeometry args={[1.3, 40, 40]} />
      <meshStandardMaterial
        color="#4169e1"
        roughness={0.75}
        metalness={0.05}
      />
    </mesh>
  );
}