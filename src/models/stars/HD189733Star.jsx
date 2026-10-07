// src/models/stars/HD189733Star.jsx
import React from 'react';

export function HD189733Star({ position = [0, 0, 0], onClick }) {
  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshBasicMaterial color="#ffaa44" />
      </mesh>
      <pointLight color="#ffaa44" intensity={2.2} distance={40} decay={1.5} />
    </group>
  );
}