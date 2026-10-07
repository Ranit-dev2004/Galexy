// src/models/blackholes/TON618.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function TON618({ position = [0, 0, 0], onClick }) {
  const diskRef = useRef();
  const jetRef = useRef();

  useFrame((state, delta) => {
    if (diskRef.current) diskRef.current.rotation.z += delta * 0.15;
    if (jetRef.current) jetRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group position={position} onClick={onClick}>
      {/* Massive Ultramassive Event Horizon */}
      <mesh>
        <sphereGeometry args={[18, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Hyper-Luminous Quasar Accretion Disk */}
      <mesh ref={diskRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[20, 50, 64]} />
        <meshBasicMaterial color="#00f2fe" side={THREE.DoubleSide} transparent opacity={0.95} />
      </mesh>

      {/* Outer Quasar Glow */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[50, 75, 64]} />
        <meshBasicMaterial color="#4facfe" side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>

      {/* Quasar Beams */}
      <group ref={jetRef}>
        <mesh position={[0, 45, 0]}>
          <cylinderGeometry args={[1, 8, 60, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, -45, 0]} rotation={[Math.PI, 0, 0]}>
          <cylinderGeometry args={[1, 8, 60, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      </group>

      <pointLight color="#00f2fe" intensity={10} distance={180} decay={1.5} />
    </group>
  );
}