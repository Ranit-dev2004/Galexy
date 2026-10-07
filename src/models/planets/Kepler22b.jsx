import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Kepler22b({
  position = [-28, 5, -20],
  onClick,
}) {
  const planetRef = useRef();

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.3;
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
      <sphereGeometry args={[1.0, 32, 32]} />

      <meshStandardMaterial
        color="#4f8fa8"
        roughness={0.65}
        metalness={0.05}
      />
    </mesh>
  );
}