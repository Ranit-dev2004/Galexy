// src/models/stars/Kepler22Star.jsx
import React from 'react';

export function Kepler22Star({ position = [0, 0, 0], onClick }) {
  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#fff0aa" />
      </mesh>
      <pointLight color="#fff0aa" intensity={2.5} distance={45} decay={1.5} />
    </group>
  );
}