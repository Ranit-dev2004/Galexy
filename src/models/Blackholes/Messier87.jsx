// src/models/blackholes/Messier87.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Messier87({ position = [0, 0, 0], onClick }) {
  const diskRef = useRef();
  const jetRef = useRef();

  useFrame((state, delta) => {
    if (diskRef.current) diskRef.current.rotation.z += delta * 0.2;
    if (jetRef.current) jetRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group position={position} onClick={onClick}>
      {/* Event Horizon */}
      <mesh>
        <sphereGeometry args={[8, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Characteristic Orange-Gold Photon Ring */}
      <mesh ref={diskRef} rotation={[Math.PI / 3.5, 0, 0]}>
        <ringGeometry args={[9, 22, 64]} />
        <meshBasicMaterial color="#ff6600" side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>

      {/* Outer Halo */}
      <mesh rotation={[Math.PI / 3.5, 0, 0]}>
        <ringGeometry args={[22, 32, 64]} />
        <meshBasicMaterial color="#cc3300" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>

      {/* Relativistic Jet (5000 light-year scale relative high energy) */}
      <group ref={jetRef}>
        <mesh position={[18, 18, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.3, 4, 35, 16]} />
          <meshBasicMaterial color="#44aaff" transparent opacity={0.7} />
        </mesh>
      </group>

      <pointLight color="#ff6600" intensity={5} distance={80} decay={1.5} />
    </group>
  );
}