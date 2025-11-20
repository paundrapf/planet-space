import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color, DoubleSide } from 'three';
import { Html, useTexture } from '@react-three/drei';
import { PlanetData } from '../types';

interface PlanetProps {
  data: PlanetData;
  onSelect: (data: PlanetData) => void;
  isLocked: boolean;
}

export const Planet: React.FC<PlanetProps> = ({ data, onSelect, isLocked }) => {
  const meshRef = useRef<Mesh>(null);
  const cloudsRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load textures. useTexture caches results, so it's efficient.
  const texture = useTexture(data.textureUrl);
  
  // Only load cloud texture if the URL is provided (e.g. for Earth)
  // Note: Hooks must be unconditional. We can pass null if URL is missing, 
  // but useTexture doesn't like null. 
  // Safe approach: Only render cloud mesh if data.cloudTextureUrl exists, 
  // and load it inside a sub-component or handle it here if we are sure about the data.
  // Since we know which planets have clouds from data, we can load it conditionally *outside* or use a safe default.
  // However, for simplicity and robustness in this specific loop structure:
  const cloudTexture = data.cloudTextureUrl ? useTexture(data.cloudTextureUrl) : null;

  const isSun = data.id === 'sun';

  useFrame(() => {
    if (meshRef.current) {
      // Rotasi planet pada porosnya
      meshRef.current.rotation.y += data.rotationSpeed;
    }
    // Rotasi awan bumi (sedikit lebih cepat dari permukaan)
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += data.rotationSpeed * 1.2;
    }
  });

  return (
    <group position={[data.distanceFromSun, 0, 0]}>
      {/* Orbit Line (Visualisasi Jalur Orbit) - Kecuali Matahari */}
      {!isSun && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-data.distanceFromSun, 0, 0]}>
          <ringGeometry args={[data.distanceFromSun - 0.15, data.distanceFromSun + 0.15, 128]} />
          <meshBasicMaterial color="#ffffff" opacity={0.08} transparent side={DoubleSide} />
        </mesh>
      )}

      {/* Planet Mesh */}
      <group>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            if (!isLocked) return;
            e.stopPropagation();
            onSelect(data);
          }}
          onPointerOver={() => {
            if (isLocked) {
              document.body.style.cursor = 'pointer';
              setHovered(true);
            }
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
            setHovered(false);
          }}
        >
          <sphereGeometry args={[data.radius, 64, 64]} />
          
          {isSun ? (
            // Material Matahari: Tidak terpengaruh bayangan, menyala sendiri
            <meshBasicMaterial map={texture} color={new Color("#ffddaa")} />
          ) : (
            // Material Planet: Bereaksi terhadap cahaya
            <meshStandardMaterial 
              map={texture}
              roughness={0.8}
              metalness={0.1}
              emissive={hovered && isLocked ? new Color(0x444444) : new Color(0x000000)}
              emissiveIntensity={0.2}
            />
          )}
        </mesh>

        {/* Lapisan Awan (Hanya jika tekstur awan tersedia) */}
        {data.cloudTextureUrl && cloudTexture && (
          <mesh ref={cloudsRef}>
            <sphereGeometry args={[data.radius + 0.02, 64, 64]} />
            <meshStandardMaterial 
              map={cloudTexture} 
              transparent 
              opacity={0.4} 
              depthWrite={false} 
              blending={2} // Additive blending for brighter clouds
            />
          </mesh>
        )}

        {/* Glow effect for Sun */}
        {isSun && (
           <mesh scale={[1.2, 1.2, 1.2]}>
             <sphereGeometry args={[data.radius, 32, 32]} />
             <meshBasicMaterial color="#FDB813" transparent opacity={0.1} side={1} />
           </mesh>
        )}
      </group>
      
      {/* Cincin Saturnus (Jika ada) */}
      {data.hasRings && (
        <mesh rotation={[-Math.PI / 2.5, 0, 0]} receiveShadow>
          <ringGeometry args={[data.radius * 1.4, data.radius * 2.4, 128]} />
          <meshStandardMaterial 
            color="#CBB388" 
            opacity={0.8} 
            transparent 
            side={DoubleSide}
            roughness={0.8}
          />
        </mesh>
      )}

      {/* Label Nama Planet */}
      <Html distanceFactor={20}>
        <div 
          className={`px-3 py-1 rounded-full text-xs font-mono pointer-events-none transition-all duration-300 backdrop-blur-sm ${
            hovered && isLocked
              ? 'bg-nasa-blue/80 text-white scale-110 shadow-[0_0_10px_rgba(16,91,216,0.8)]' 
              : 'bg-black/40 text-white/70 border border-white/10'
          }`}
          style={{ opacity: isSun ? 0.5 : 1 }} // Label matahari sedikit transparan agar tidak menghalangi
        >
          {data.name}
        </div>
      </Html>
    </group>
  );
};