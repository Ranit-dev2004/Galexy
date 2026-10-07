// src/models/stars/ProximaCentauriStar.jsx
import React from 'react';

export function ProximaCentauriStar({ position = [0, 0, 0], onClick }) {
  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#ff4500" />
      </mesh>
      <pointLight color="#ff4500" intensity={2} distance={30} decay={1.5} />
    </group>
  );
}