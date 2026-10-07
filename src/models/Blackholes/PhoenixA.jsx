// src/models/blackholes/PhoenixA.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PhoenixA({ position = [0, 0, 0], onClick }) {
  const diskRef = useRef();
  const innerCoronaRef = useRef();

  useFrame((state, delta) => {
    if (diskRef.current) diskRef.current.rotation.z += delta * 0.1;
    if (innerCoronaRef.current) innerCoronaRef.current.rotation.y += delta * 0.2;
  });

  return (
    <group position={position} onClick={onClick}>
      {/* Colossal Event Horizon */}
      <mesh>
        <sphereGeometry args={[22, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Fiery Crimson/Purple Accretion Disk */}
      <mesh ref={diskRef} rotation={[Math.PI / 2.8, 0, 0]}>
        <ringGeometry args={[24, 60, 64]} />
        <meshBasicMaterial color="#ff0055" side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>

      {/* Deep Violet Outer Ring */}
      <mesh rotation={[Math.PI / 2.8, 0, 0]}>
        <ringGeometry args={[60, 90, 64]} />
        <meshBasicMaterial color="#7a00ff" side={THREE.DoubleSide} transparent opacity={0.35} />
      </mesh>

      {/* Gravitational Lensing / Photon Sphere */}
      <mesh ref={innerCoronaRef}>
        <sphereGeometry args={[23.5, 32, 32]} />
        <meshBasicMaterial color="#ff3300" transparent opacity={0.25} side={THREE.BackSide} />
      </mesh>

      <pointLight color="#ff0055" intensity={12} distance={220} decay={1.5} />
    </group>
  );
}