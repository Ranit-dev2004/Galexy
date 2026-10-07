// src/models/stars/Pegasi51Star.jsx
import React from 'react';

export function Pegasi51Star({ position = [0, 0, 0], onClick }) {
  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[3.0, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <pointLight color="#ffffff" intensity={3.0} distance={50} decay={1.5} />
    </group>
  );
}