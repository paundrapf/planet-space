import React, { useMemo } from 'react';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Planet } from './Planet';
import { SOLAR_SYSTEM_DATA } from '../constants';
import { PlanetData } from '../types';

interface SpaceSceneProps {
  onPlanetSelect: (planet: PlanetData) => void;
  isLocked: boolean;
}

export const SpaceScene: React.FC<SpaceSceneProps> = ({ onPlanetSelect, isLocked }) => {
  
  // Membuat Sabuk Asteroid (Asteroid Belt) antara Mars dan Jupiter
  const asteroids = useMemo(() => {
    const count = 2000;
    const tempObject = new THREE.Object3D();
    const geometry = new THREE.DodecahedronGeometry(0.2, 0); // Lebih detail sedikit
    const material = new THREE.MeshStandardMaterial({ 
      color: '#888888', 
      roughness: 0.9,
      flatShading: true 
    });
    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);

    for (let i = 0; i < count; i++) {
      // Posisi random dalam bentuk torus (donat)
      const angle = (Math.random() * Math.PI * 2);
      // Jarak antara Mars (65) dan Jupiter (100)
      const radius = 80 + (Math.random() * 15); 
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 8; // Variasi vertikal lebih lebar

      tempObject.position.set(x, y, z);
      
      // Rotasi random
      tempObject.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      
      // Skala random
      const scale = Math.random() * 0.8 + 0.2;
      tempObject.scale.set(scale, scale, scale);

      tempObject.updateMatrix();
      instancedMesh.setMatrixAt(i, tempObject.matrix);
    }
    return instancedMesh;
  }, []);

  return (
    <>
      {/* Pencahayaan Lingkungan: Cahaya minim di luar angkasa */}
      <ambientLight intensity={0.02} color="#ffffff" /> 
      
      {/* Sumber Cahaya Matahari (Point Light di pusat) */}
      <pointLight position={[0, 0, 0]} intensity={3.5} decay={0} distance={2000} color="#ffffff" />

      {/* Latar Belakang Bintang */}
      <Stars radius={400} depth={100} count={10000} factor={6} saturation={0.5} fade speed={0} />
      
      {/* Sabuk Asteroid */}
      <primitive object={asteroids} />

      {/* Planet-planet (Termasuk Matahari) */}
      {SOLAR_SYSTEM_DATA.map((planet) => (
        <Planet 
          key={planet.id} 
          data={planet} 
          onSelect={onPlanetSelect} 
          isLocked={isLocked}
        />
      ))}
    </>
  );
};