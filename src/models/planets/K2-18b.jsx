import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function K218b({
  position = [12, -7, 30],
  onClick,
}) {
  const planetRef = useRef();

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <mesh
      ref={planetRef}
      position={position}
      onClick={onClick}
      castShadow
    >
      <sphereGeometry args={[0.85, 40, 40]} />

      <meshStandardMaterial
        color="#477f91"
        roughness={0.7}
        metalness={0.03}
      />
    </mesh>
  );
}
