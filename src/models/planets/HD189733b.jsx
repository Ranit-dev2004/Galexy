import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function HD189733b({
  position = [-35, -4, 15],
  onClick,
}) {
  const planetRef = useRef();

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.7;
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
      <sphereGeometry args={[1.25, 48, 48]} />

      <meshStandardMaterial
        color="#1856a3"
        roughness={0.45}
        metalness={0.05}
      />
    </mesh>
  );
}