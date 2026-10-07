import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function Pegasi51b({
  position = [32, 4, 12],
  onClick,
}) {
  const planetRef = useRef();

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.6;
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
      <sphereGeometry args={[1.35, 48, 48]} />

      <meshStandardMaterial
        color="#c98b55"
        roughness={0.8}
        metalness={0.02}
      />
    </mesh>
  );
}