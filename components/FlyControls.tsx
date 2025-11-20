
import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';

interface FlyControlsProps {
  isLocked: boolean;
  onLock: () => void;
  onUnlock: () => void;
}

export const FlyControls: React.FC<FlyControlsProps> = ({ isLocked, onLock, onUnlock }) => {
  const { camera } = useThree();
  
  // State untuk melacak tombol mana yang ditekan
  const movement = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    boost: false,
    up: false,   // Space
    down: false  // Control
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': movement.current.forward = true; break;
        case 'KeyS': movement.current.backward = true; break;
        case 'KeyA': movement.current.left = true; break;
        case 'KeyD': movement.current.right = true; break;
        case 'ShiftLeft': 
        case 'ShiftRight': movement.current.boost = true; break;
        case 'Space': movement.current.up = true; break;
        case 'ControlLeft': 
        case 'ControlRight': movement.current.down = true; break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': movement.current.forward = false; break;
        case 'KeyS': movement.current.backward = false; break;
        case 'KeyA': movement.current.left = false; break;
        case 'KeyD': movement.current.right = false; break;
        case 'ShiftLeft': 
        case 'ShiftRight': movement.current.boost = false; break;
        case 'Space': movement.current.up = false; break;
        case 'ControlLeft': 
        case 'ControlRight': movement.current.down = false; break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!isLocked) return;

    // Kecepatan dasar dan boost (unit per detik)
    // Karena skala tata surya besar, kita butuh kecepatan tinggi
    const baseSpeed = 15; 
    const boostMultiplier = 5; 
    const speed = (movement.current.boost ? baseSpeed * boostMultiplier : baseSpeed) * delta;

    // Pergerakan relatif terhadap arah kamera (Local Space)
    if (movement.current.forward) camera.translateZ(-speed);
    if (movement.current.backward) camera.translateZ(speed);
    if (movement.current.left) camera.translateX(-speed);
    if (movement.current.right) camera.translateX(speed);
    
    // Pergerakan vertikal absolut (Global Y) atau relatif (Local Y)
    // Di sini kita gunakan Local Y agar terasa seperti pesawat ruang angkasa
    if (movement.current.up) camera.translateY(speed);
    if (movement.current.down) camera.translateY(-speed);
  });

  return (
    <PointerLockControls 
      onLock={onLock} 
      onUnlock={onUnlock}
      selector="#root" // Memastikan event target benar
    />
  );
};
