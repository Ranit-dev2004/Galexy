// src/models/stars/K218Star.jsx
import React from 'react';

export function K218Star({ position = [0, 0, 0], onClick }) {
  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial color="#ff6633" />
      </mesh>
      <pointLight color="#ff6633" intensity={1.9} distance={35} decay={1.5} />
    </group>
  );
}