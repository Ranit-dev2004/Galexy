import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Jupiter({ position = [23, 0, 0], onClick }) {
  const jupiterRef = useRef();

  useFrame((state, delta) => {
    if (jupiterRef.current) {
      jupiterRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <mesh
      ref={jupiterRef}
      position={position}
      onClick={onClick}
    >
      <sphereGeometry args={[2.2, 48, 48]} />
      <meshStandardMaterial
        color="#c99b6b"
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}