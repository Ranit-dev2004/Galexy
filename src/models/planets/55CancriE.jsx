import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Cancri55e({
  position = [-45, 6, -5],
  onClick,
}) {
  const planetRef = useRef();

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.55;
    }
  });

  return (
    <mesh
      ref={planetRef}
      position={position}
      onClick={onClick}
      castShadow
    >
      <sphereGeometry args={[0.72, 32, 32]} />

      <meshStandardMaterial
        color="#b54a2f"
        roughness={0.6}
        metalness={0.08}
        emissive="#260600"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}