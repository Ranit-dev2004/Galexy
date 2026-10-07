// src/models/planets/MarsMangalyaan.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function MarsMangalyaan({ position = [20, 0, 10], onClick }) {
  const marsRef = useRef();

  useFrame((state, delta) => {
    if (marsRef.current) {
      marsRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <mesh ref={marsRef} position={position} onClick={onClick}>
      <sphereGeometry args={[1.1, 32, 32]} />
      <meshStandardMaterial color="#c1440e" roughness={0.8} metalness={0.1} />
    </mesh>
  );
}