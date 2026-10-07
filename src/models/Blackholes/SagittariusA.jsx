// src/models/blackholes/SagittariusA.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function SagittariusA({ position = [0, 0, 0], scale = 1, onClick }) {
  const accretionRef = useRef();

  useFrame((state, delta) => {
    if (accretionRef.current) {
      accretionRef.current.rotation.z += delta * 0.8;
    }
  });

  return (
    <group position={position} onClick={onClick}>
      <mesh scale={scale}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Gravitational Accretion Disk Ring */}
      <mesh ref={accretionRef} rotation={[-Math.PI / 3, 0, 0]} scale={scale}>
        <ringGeometry args={[1.5, 3.8, 64]} />
        <meshBasicMaterial color="#00e5ff" side={2} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}