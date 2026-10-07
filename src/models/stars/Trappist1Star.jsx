// src/models/stars/Trappist1Star.jsx
import React from 'react';

export function Trappist1Star({ position = [0, 0, 0], onClick }) {
  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial color="#ff2200" />
      </mesh>
      <pointLight color="#ff2200" intensity={1.5} distance={25} decay={1.5} />
    </group>
  );
}