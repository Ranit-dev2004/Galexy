// src/models/stars/Cancri55Star.jsx
import React from 'react';

export function Cancri55Star({ position = [0, 0, 0], onClick }) {
  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial color="#ffbb55" />
      </mesh>
      <pointLight color="#ffbb55" intensity={2.4} distance={40} decay={1.5} />
    </group>
  );
}