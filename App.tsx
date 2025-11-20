import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { SpaceScene } from './components/SpaceScene';
import { InfoPanel, ControlsOverlay, LoadingScreen, ErrorBoundary } from './components/UI';
import { FlyControls } from './components/FlyControls';
import { PlanetData } from './types';

const App: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const handlePlanetSelect = (planet: PlanetData) => {
    // Hanya izinkan select jika sedang dalam mode locked (bermain)
    if (isLocked) {
      setSelectedPlanet(planet);
      if (document.pointerLockElement) {
        document.exitPointerLock();
        setIsLocked(false);
      }
    }
  };

  const handleCloseInfo = () => {
    setSelectedPlanet(null);
    // User perlu klik lagi untuk mengaktifkan kontrol setelah menutup panel
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* UI Overlay Layers */}
      <ControlsOverlay />
      <InfoPanel selectedPlanet={selectedPlanet} onClose={handleCloseInfo} />
      
      {/* Crosshair untuk navigasi */}
      {!selectedPlanet && isLocked && (
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/50 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 mix-blend-difference" />
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{ fov: 60, position: [0, 20, 100] }} // Posisi awal kamera sedikit lebih jauh
        gl={{ antialias: true, powerPreference: "high-performance" }}
        shadows
      >
        <ErrorBoundary>
          <Suspense fallback={<Html fullscreen><LoadingScreen /></Html>}>
            <SpaceScene 
              onPlanetSelect={handlePlanetSelect} 
              isLocked={isLocked}
            />
          </Suspense>
        </ErrorBoundary>

        {/* Kontrol Navigasi Custom (WASD + Mouse) */}
        {!selectedPlanet && (
          <FlyControls 
            isLocked={isLocked}
            onLock={() => setIsLocked(true)} 
            onUnlock={() => setIsLocked(false)}
          />
        )}
      </Canvas>
    </div>
  );
};

export default App;