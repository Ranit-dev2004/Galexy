// src/App.jsx
import React, { useState } from 'react';
import { CanvasContainer } from './components/CanvasContainer';
import { ISRO_CELESTIAL_TARGETS } from './data/celestialTargets';

export default function App() {
  const [selectedTargetId, setSelectedTargetId] = useState('sagittariusA');
  const selectedTarget = ISRO_CELESTIAL_TARGETS[selectedTargetId];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans">
      {/* Header Bar */}
      <header className="absolute top-0 left-0 z-10 p-6 bg-gradient-to-b from-black/80 to-transparent w-full pointer-events-none">
        <h1 className="text-2xl font-bold tracking-wider text-cyan-400">COSMIC SIMULATOR</h1>
        <p className="text-sm text-gray-400">Module 1: ISRO Missions & Galactic Targets</p>
      </header>

      {/* 3D WebGL Canvas Viewport */}
      <CanvasContainer onSelectTarget={(id) => setSelectedTargetId(id)} />

      {/* Educational & ISRO Mission Inspector Panel */}
      {selectedTarget && (
        <aside className="absolute top-20 right-6 z-10 w-80 p-5 bg-slate-900/90 border border-cyan-500/30 rounded-xl backdrop-blur-md shadow-2xl">
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
            ISRO Target Info
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{selectedTarget.name}</h2>
          <div className="inline-block px-2 py-1 text-xs bg-cyan-950 border border-cyan-500 text-cyan-300 rounded mb-4">
            Mission: {selectedTarget.isroMission}
          </div>
          
          <div className="space-y-3 text-sm text-gray-300">
            <div>
              <span className="text-gray-500 block text-xs">Mass:</span>
              {selectedTarget.mass}
            </div>
            <div>
              <span className="text-gray-500 block text-xs">Distance:</span>
              {selectedTarget.distance}
            </div>
            <div>
              <span className="text-gray-500 block text-xs">Scientific Context:</span>
              {selectedTarget.description}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}