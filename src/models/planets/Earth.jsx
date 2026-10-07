import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Earth({ position = [13, 0, 0], onClick }) {
  const earthRef = useRef();

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={earthRef}
      position={position}
      onClick={onClick}
    >
      <sphereGeometry args={[0.95, 32, 32]} />
      <meshStandardMaterial
        color="#2878c8"
        roughness={0.7}
        metalness={0.05}
      />
    </mesh>
  );
}