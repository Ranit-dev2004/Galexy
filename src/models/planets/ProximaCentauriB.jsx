import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function ProximaCentauriB({
  position = [18, 2, -8],
  onClick,
}) {
  const planetRef = useRef();

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.4;
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
      <sphereGeometry args={[0.55, 32, 32]} />

      <meshStandardMaterial
        color="#6b7f8c"
        roughness={0.9}
        metalness={0.02}
      />
    </mesh>
  );
}