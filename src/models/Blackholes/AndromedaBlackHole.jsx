// src/models/blackholes/AndromedaBlackHole.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AndromedaBlackHole({ position = [0, 0, 0], onClick }) {
  const diskRef = useRef();

  useFrame((state, delta) => {
    if (diskRef.current) diskRef.current.rotation.z += delta * 0.3;
  });

  return (
    <group position={position} onClick={onClick}>
      {/* Event Horizon */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Accretion Disk - Cool Pale Gold/Blue mix */}
      <mesh ref={diskRef} rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[6, 16, 64]} />
        <meshBasicMaterial color="#ffeaa7" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>

      {/* Nucleus Glow */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[16, 26, 64]} />
        <meshBasicMaterial color="#74b9ff" side={THREE.DoubleSide} transparent opacity={0.25} />
      </mesh>

      <pointLight color="#ffeaa7" intensity={3.5} distance={60} decay={1.5} />
    </group>
  );
}