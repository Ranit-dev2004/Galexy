import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function WASP12b({
  position = [42, 1, -10],
  onClick,
}) {
  const planetRef = useRef();

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <mesh
      ref={planetRef}
      position={position}
      onClick={onClick}
      castShadow
    >
      <sphereGeometry args={[1.3, 48, 48]} />

      <meshStandardMaterial
        color="#5a241c"
        roughness={0.75}
        metalness={0.02}
      />
    </mesh>
  );
}