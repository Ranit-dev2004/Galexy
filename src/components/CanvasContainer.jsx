import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Stars & Solar System Models
import { SagittariusA } from '../models/blackholes/SagittariusA';
import { CygnusX1 } from '../models/blackholes/CygnusX1';
import { SunAdityaL1 } from '../models/stars/SunAdityaL1';
import { GalacticCoreStars } from '../models/stars/GalacticCoreStars';
import { Mercury } from '../models/planets/Mercury';
import { Venus } from '../models/planets/Venus';
import { Earth } from '../models/planets/Earth';
import { MoonChandrayaan } from '../models/planets/MoonChandrayaan';
import { MarsMangalyaan } from '../models/planets/MarsMangalyaan';
import { Jupiter } from '../models/planets/Jupiter';
import { Saturn } from '../models/planets/Saturn';
import { Uranus } from '../models/planets/planetUrenus';
import { Neptune } from '../models/planets/Neptune';

// Exoplanet & Star Models
import { ProximaCentauriB } from '../models/planets/ProximaCentauriB';
import { Trappist1e } from '../models/planets/Trappist1e';
import { Kepler22b } from '../models/planets/Kepler22b';
import { Pegasi51b } from '../models/planets/51PegasiB';
import { HD189733b } from '../models/planets/HD189733b';
import { WASP12b } from '../models/planets/WASP12b';
import { Cancri55e } from '../models/planets/55CancriE';
import { K218b } from '../models/planets/K2-18b';
import { ProximaCentauriStar } from '../models/stars/ProximaCentauriStar';
import { Trappist1Star } from '../models/stars/Trappist1Star';
import { Kepler22Star } from '../models/stars/Kepler22Star';
import { Pegasi51Star } from '../models/stars/Pegasi51Star';
import { HD189733Star } from '../models/stars/HD189733Star';
import { WASP12Star } from '../models/stars/WASP12Star';
import { Cancri55Star } from '../models/stars/Cancri55Star';
import { K218Star } from '../models/stars/K218Star';

// New Black Holes (Fixed lower-case directory paths)
import { AndromedaBlackHole } from '../models/blackholes/AndromedaBlackHole';
import { TON618 } from '../models/blackholes/TON618';
import { PhoenixA } from '../models/blackholes/PhoenixA';
import { Messier87 } from '../models/blackholes/Messier87';

function OrbitLine({ radius, color = '#445577' }) {
  const points = [];
  const segments = 256;

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * radius,
        0,
        Math.sin(theta) * radius
      )
    );
  }

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  );
}

function SpaceCamera({ selectedTarget, solarSystemPos, exoplanetClusterPos, orbitAngles, defaultCamPos = [0, 80, 160] }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  const isTransitioning = useRef(false);
  const targetWorldPos = useRef(new THREE.Vector3());

  const config = {
    sun: { radius: 0, speed: 0, distance: 20 },
    mercury: { radius: 6, speed: 1.0, distance: 8 },
    venus: { radius: 10, speed: 0.7, distance: 10 },
    earth: { radius: 15, speed: 0.5, distance: 12 },
    moon: { radius: 17.2, speed: 0.5, distance: 6 },
    mars: { radius: 21, speed: 0.35, distance: 10 },
    jupiter: { radius: 30, speed: 0.2, distance: 22 },
    saturn: { radius: 40, speed: 0.12, distance: 25 },
    uranus: { radius: 50, speed: 0.08, distance: 18 },
    neptune: { radius: 60, speed: 0.05, distance: 18 },
    sagittariusA: { coords: [0, 0, 0], distance: 35 },
    cygnusX1: { coords: [60, 25, -40], distance: 20 },
    andromeda: { coords: [-500, 80, -300], distance: 45 },
    ton618: { coords: [500, 120, -500], distance: 120 },
    phoenixA: { coords: [700, -100, -700], distance: 140 },
    messier87: { coords: [-600, -80, -600], distance: 60 },
    'Proxima Centauri b': { coords: [exoplanetClusterPos[0] - 40, exoplanetClusterPos[1] + 10, exoplanetClusterPos[2] - 20], distance: 12 },
    'TRAPPIST-1e': { coords: [exoplanetClusterPos[0] - 20, exoplanetClusterPos[1] - 10, exoplanetClusterPos[2] + 10], distance: 10 },
    'Kepler-22b': { coords: [exoplanetClusterPos[0], exoplanetClusterPos[1] + 15, exoplanetClusterPos[2] - 30], distance: 15 },
    '51 Pegasi b': { coords: [exoplanetClusterPos[0] + 25, exoplanetClusterPos[1] - 5, exoplanetClusterPos[2] - 15], distance: 14 },
    'HD 189733 b': { coords: [exoplanetClusterPos[0] + 45, exoplanetClusterPos[1] + 20, exoplanetClusterPos[2] + 15], distance: 14 },
    'WASP-12b': { coords: [exoplanetClusterPos[0] + 65, exoplanetClusterPos[1] - 15, exoplanetClusterPos[2] - 10], distance: 12 },
    '55 Cancri e': { coords: [exoplanetClusterPos[0] + 85, exoplanetClusterPos[1] + 10, exoplanetClusterPos[2] + 20], distance: 10 },
    'K2-18 b': { coords: [exoplanetClusterPos[0] + 105, exoplanetClusterPos[1] - 5, exoplanetClusterPos[2] - 25], distance: 14 },
  };

  useEffect(() => {
    isTransitioning.current = true;
  }, [selectedTarget]);

  useFrame((state, delta) => {
    if (!controlsRef.current) return;

    if (!selectedTarget) {
      const defaultTarget = new THREE.Vector3(0, 0, 0);
      const defaultCamVec = new THREE.Vector3(...defaultCamPos);

      if (isTransitioning.current) {
        camera.position.lerp(defaultCamVec, Math.min(delta * 2.5, 1));
        controlsRef.current.target.lerp(defaultTarget, Math.min(delta * 2.5, 1));
        controlsRef.current.update();

        if (camera.position.distanceTo(defaultCamVec) < 0.2) {
          isTransitioning.current = false;
        }
      }
      return;
    }

    const obj = config[selectedTarget];
    if (!obj) return;

    if (obj.coords) {
      targetWorldPos.current.set(...obj.coords);
    } else {
      const angle = orbitAngles.current[selectedTarget] || 0;
      targetWorldPos.current.set(
        solarSystemPos[0] + Math.cos(angle) * obj.radius,
        solarSystemPos[1],
        solarSystemPos[2] + Math.sin(angle) * obj.radius
      );
    }

    const currentPos = targetWorldPos.current;
    const dist = obj.distance || 15;
    const camOffset = new THREE.Vector3(0, dist * 0.6, dist);
    const desiredCamPos = currentPos.clone().add(camOffset);

    if (isTransitioning.current) {
      camera.position.lerp(desiredCamPos, Math.min(delta * 3, 1));
      controlsRef.current.target.lerp(currentPos, Math.min(delta * 4, 1));
      controlsRef.current.update();

      if (camera.position.distanceTo(desiredCamPos) < 0.1) {
        isTransitioning.current = false;
      }
    } else {
      controlsRef.current.target.copy(currentPos);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      screenSpacePanning={true}
      panSpeed={2}
      zoomSpeed={1.5}
      rotateSpeed={0.5}
      minDistance={1}
      maxDistance={3500}
      enableDamping={true}
      dampingFactor={0.08}
    />
  );
}

function SolarSystem({ position = [0, 0, 0], onSelectTarget, orbitAngles }) {
  const mercuryPivot = useRef();
  const venusPivot = useRef();
  const earthPivot = useRef();
  const moonPivot = useRef();
  const marsPivot = useRef();
  const jupiterPivot = useRef();
  const saturnPivot = useRef();
  const uranusPivot = useRef();
  const neptunePivot = useRef();

  useFrame((state, delta) => {
    if (mercuryPivot.current) {
      mercuryPivot.current.rotation.y += delta * 1.0;
      orbitAngles.current.mercury = (orbitAngles.current.mercury || 0) - delta * 1.0;
    }
    if (venusPivot.current) {
      venusPivot.current.rotation.y += delta * 0.7;
      orbitAngles.current.venus = (orbitAngles.current.venus || 0) - delta * 0.7;
    }
    if (earthPivot.current) {
      earthPivot.current.rotation.y += delta * 0.5;
      orbitAngles.current.earth = (orbitAngles.current.earth || 0) - delta * 0.5;
      orbitAngles.current.moon = orbitAngles.current.earth;
    }
    if (moonPivot.current) {
      moonPivot.current.rotation.y += delta * 2.0;
    }
    if (marsPivot.current) {
      marsPivot.current.rotation.y += delta * 0.35;
      orbitAngles.current.mars = (orbitAngles.current.mars || 0) - delta * 0.35;
    }
    if (jupiterPivot.current) {
      jupiterPivot.current.rotation.y += delta * 0.2;
      orbitAngles.current.jupiter = (orbitAngles.current.jupiter || 0) - delta * 0.2;
    }
    if (saturnPivot.current) {
      saturnPivot.current.rotation.y += delta * 0.12;
      orbitAngles.current.saturn = (orbitAngles.current.saturn || 0) - delta * 0.12;
    }
    if (uranusPivot.current) {
      uranusPivot.current.rotation.y += delta * 0.08;
      orbitAngles.current.uranus = (orbitAngles.current.uranus || 0) - delta * 0.08;
    }
    if (neptunePivot.current) {
      neptunePivot.current.rotation.y += delta * 0.05;
      orbitAngles.current.neptune = (orbitAngles.current.neptune || 0) - delta * 0.05;
    }
  });

  return (
    <group position={position}>
      <SunAdityaL1 position={[0, 0, 0]} onClick={() => onSelectTarget('sun')} />

      <OrbitLine radius={6} color="#8c8c8c" />
      <group ref={mercuryPivot}>
        <Mercury position={[6, 0, 0]} onClick={() => onSelectTarget('mercury')} />
      </group>

      <OrbitLine radius={10} color="#e3bb76" />
      <group ref={venusPivot}>
        <Venus position={[10, 0, 0]} onClick={() => onSelectTarget('venus')} />
      </group>

      <OrbitLine radius={15} color="#2b82c9" />
      <group ref={earthPivot}>
        <group position={[15, 0, 0]}>
          <Earth position={[0, 0, 0]} onClick={() => onSelectTarget('earth')} />
          <group ref={moonPivot}>
            <MoonChandrayaan position={[2.2, 0, 0]} onClick={() => onSelectTarget('moon')} />
          </group>
        </group>
      </group>

      <OrbitLine radius={21} color="#ff4500" />
      <group ref={marsPivot}>
        <MarsMangalyaan position={[21, 0, 0]} onClick={() => onSelectTarget('mars')} />
      </group>

      <OrbitLine radius={30} color="#b07f35" />
      <group ref={jupiterPivot}>
        <Jupiter position={[30, 0, 0]} onClick={() => onSelectTarget('jupiter')} />
      </group>

      <OrbitLine radius={40} color="#e2c17c" />
      <group ref={saturnPivot}>
        <Saturn position={[40, 0, 0]} onClick={() => onSelectTarget('saturn')} />
      </group>

      <OrbitLine radius={50} color="#66cdaa" />
      <group ref={uranusPivot}>
        <Uranus position={[50, 0, 0]} onClick={() => onSelectTarget('uranus')} />
      </group>

      <OrbitLine radius={60} color="#4169e1" />
      <group ref={neptunePivot}>
        <Neptune position={[60, 0, 0]} onClick={() => onSelectTarget('neptune')} />
      </group>
    </group>
  );
}

function ExoplanetCluster({ position = [120, 20, -40], onSelectTarget }) {
  const proximaPivot = useRef();
  const trappistPivot = useRef();
  const keplerPivot = useRef();
  const pegasiPivot = useRef();
  const hd189733Pivot = useRef();
  const wasp12Pivot = useRef();
  const cancri55Pivot = useRef();
  const k218Pivot = useRef();

  useFrame((state, delta) => {
    if (proximaPivot.current) proximaPivot.current.rotation.y += delta * 0.4;
    if (trappistPivot.current) trappistPivot.current.rotation.y += delta * 0.3;
    if (keplerPivot.current) keplerPivot.current.rotation.y += delta * 0.25;
    if (pegasiPivot.current) pegasiPivot.current.rotation.y += delta * 0.2;
    if (hd189733Pivot.current) hd189733Pivot.current.rotation.y += delta * 0.35;
    if (wasp12Pivot.current) wasp12Pivot.current.rotation.y += delta * 0.5;
    if (cancri55Pivot.current) cancri55Pivot.current.rotation.y += delta * 0.45;
    if (k218Pivot.current) k218Pivot.current.rotation.y += delta * 0.3;
  });

  return (
    <group position={position}>
      {/* Proxima Centauri System */}
      <group position={[-40, 10, -20]}>
        <ProximaCentauriStar position={[0, 0, 0]} />
        <OrbitLine radius={6} />
        <group ref={proximaPivot}>
          <ProximaCentauriB position={[6, 0, 0]} onClick={() => onSelectTarget('Proxima Centauri b')} />
        </group>
      </group>

      {/* TRAPPIST-1 System */}
      <group position={[-20, -10, 10]}>
        <Trappist1Star position={[0, 0, 0]} />
        <OrbitLine radius={6} />
        <group ref={trappistPivot}>
          <Trappist1e position={[6, 0, 0]} onClick={() => onSelectTarget('TRAPPIST-1e')} />
        </group>
      </group>

      {/* Kepler-22 System */}
      <group position={[0, 15, -30]}>
        <Kepler22Star position={[0, 0, 0]} />
        <OrbitLine radius={6} />
        <group ref={keplerPivot}>
          <Kepler22b position={[6, 0, 0]} onClick={() => onSelectTarget('Kepler-22b')} />
        </group>
      </group>

      {/* 51 Pegasi System */}
      <group position={[25, -5, -15]}>
        <Pegasi51Star position={[0, 0, 0]} />
        <OrbitLine radius={6} />
        <group ref={pegasiPivot}>
          <Pegasi51b position={[6, 0, 0]} onClick={() => onSelectTarget('51 Pegasi b')} />
        </group>
      </group>

      {/* HD 189733 System */}
      <group position={[45, 20, 15]}>
        <HD189733Star position={[0, 0, 0]} />
        <OrbitLine radius={6} />
        <group ref={hd189733Pivot}>
          <HD189733b position={[6, 0, 0]} onClick={() => onSelectTarget('HD 189733 b')} />
        </group>
      </group>

      {/* WASP-12 System */}
      <group position={[65, -15, -10]}>
        <WASP12Star position={[0, 0, 0]} />
        <OrbitLine radius={6} />
        <group ref={wasp12Pivot}>
          <WASP12b position={[6, 0, 0]} onClick={() => onSelectTarget('WASP-12b')} />
        </group>
      </group>

      {/* 55 Cancri System */}
      <group position={[85, 10, 20]}>
        <Cancri55Star position={[0, 0, 0]} />
        <OrbitLine radius={6} />
        <group ref={cancri55Pivot}>
          <Cancri55e position={[6, 0, 0]} onClick={() => onSelectTarget('55 Cancri e')} />
        </group>
      </group>

      {/* K2-18 System */}
      <group position={[105, -5, -25]}>
        <K218Star position={[0, 0, 0]} />
        <OrbitLine radius={6} />
        <group ref={k218Pivot}>
          <K218b position={[6, 0, 0]} onClick={() => onSelectTarget('K2-18 b')} />
        </group>
      </group>
    </group>
  );
}

// =====================================================
// MAIN CANVAS
// =====================================================
export function CanvasContainer({ onSelectTarget }) {
  const [selectedTarget, setSelectedTarget] = React.useState(null);

  const solarSystemPos = [-140, 0, -80];
  const exoplanetClusterPos = [120, 20, -40];
  const defaultCamPos = [0, 80, 160];
  const orbitAngles = useRef({});

  const handleSelectTarget = (id) => {
    if (onSelectTarget) {
      onSelectTarget(id);
    }
    setSelectedTarget(id);
  };

  const handleResetView = () => {
    if (onSelectTarget) {
      onSelectTarget(null);
    }
    setSelectedTarget(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleResetView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-full bg-black">
      {selectedTarget && (
        <button
          onClick={handleResetView}
          className="absolute top-6 right-6 z-20 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 rounded-lg text-sm font-medium backdrop-blur transition-all shadow-lg cursor-pointer"
        >
          Reset View (ESC)
        </button>
      )}

      <Canvas
        camera={{
          position: defaultCamPos,
          fov: 60,
          far: 5000,
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#ffffff" />

        <Stars radius={400} depth={100} count={12000} factor={4} saturation={0} fade speed={0.8} />

        <GalacticCoreStars count={3500} />

        {/* Existing Black Holes */}
        <SagittariusA
          position={[0, 0, 0]}
          onClick={() => handleSelectTarget('sagittariusA')}
        />

        <CygnusX1
          position={[60, 25, -40]}
          onClick={() => handleSelectTarget('cygnusX1')}
        />

        {/* Added Missing Black Holes */}
        <AndromedaBlackHole
          position={[-500, 80, -300]}
          onClick={() => handleSelectTarget('andromeda')}
        />

        <TON618
          position={[500, 120, -500]}
          onClick={() => handleSelectTarget('ton618')}
        />

        <PhoenixA
          position={[700, -100, -700]}
          onClick={() => handleSelectTarget('phoenixA')}
        />

        <Messier87
          position={[-600, -80, -600]}
          onClick={() => handleSelectTarget('messier87')}
        />

        {/* Planetary Systems */}
        <SolarSystem
          position={solarSystemPos}
          onSelectTarget={handleSelectTarget}
          orbitAngles={orbitAngles}
        />

        <ExoplanetCluster
          position={exoplanetClusterPos}
          onSelectTarget={handleSelectTarget}
        />

        <SpaceCamera
          selectedTarget={selectedTarget}
          solarSystemPos={solarSystemPos}
          exoplanetClusterPos={exoplanetClusterPos}
          orbitAngles={orbitAngles}
          defaultCamPos={defaultCamPos}
        />
      </Canvas>
    </div>
  );
}