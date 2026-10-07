import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Trappist1e({
  position = [25, -3, -14],
  onClick,
}) {
  const planetRef = useRef();

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <mesh
      ref={planetRef}
      position={position}
      onClick={onClick}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[0.58, 32, 32]} />

      <meshStandardMaterial
        color="#9b6b4f"
        roughness={0.85}
        metalness={0.02}
      />
    </mesh>
  );
}