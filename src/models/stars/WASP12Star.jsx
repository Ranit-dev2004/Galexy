// src/models/stars/WASP12Star.jsx
import React from 'react';

export function WASP12Star({ position = [0, 0, 0], onClick }) {
  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial color="#e8f0ff" />
      </mesh>
      <pointLight color="#e8f0ff" intensity={3.2} distance={55} decay={1.5} />
    </group>
  );
}