// src/models/blackholes/CygnusX1.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function CygnusX1({ position = [-40, 15, -20], onClick }) {
  const jetRef = useRef();
  const diskRef = useRef();

  useFrame((state, delta) => {
    if (diskRef.current) {
      diskRef.current.rotation.z += delta * 2.5; // Rapid stellar black hole disk spin
    }
    if (jetRef.current) {
      jetRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={position} onClick={onClick}>
      {/* Black Hole Event Horizon */}
      <mesh scale={0.7}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Superheated Plasma Accretion Disk (XPoSat X-Ray Target) */}
      <mesh ref={diskRef} rotation={[-Math.PI / 4, 0, 0]}>
        <ringGeometry args={[0.8, 2.2, 64]} />
        <meshBasicMaterial color="#a020f0" side={2} transparent opacity={0.9} />
      </mesh>

      {/* Polar X-Ray Plasma Relativistic Jets */}
      <group ref={jetRef}>
        {/* Top Jet */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.02, 0.3, 5, 16]} />
          <meshBasicMaterial color="#e0b0ff" transparent opacity={0.6} />
        </mesh>
        {/* Bottom Jet */}
        <mesh position={[0, -2.5, 0]} rotation={[Math.PI, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.3, 5, 16]} />
          <meshBasicMaterial color="#e0b0ff" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}