// src/models/stars/GalacticCoreStars.jsx
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function GalacticCoreStars({ count = 2500 }) {
  const starsRef = useRef();

  // Generate dense particle positions and colors for galactic center
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spiral core concentration
      const radius = Math.random() * 18 + 0.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * (20 / (radius + 1));

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      // Color spectrum: Blue-white hot stars mixed with yellow core giants
      const isBlue = Math.random() > 0.4;
      col[i * 3] = isBlue ? 0.4 : 1.0;
      col[i * 3 + 1] = isBlue ? 0.8 : 0.7;
      col[i * 3 + 2] = 1.0;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.05; // Core galactic rotation
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}