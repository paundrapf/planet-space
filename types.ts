// Definisi tipe data untuk properti planet berdasarkan standar NASA
export interface PlanetData {
  id: string;
  name: string;
  textureUrl: string;
  cloudTextureUrl?: string; // URL opsional untuk tekstur awan (misal: Bumi)
  radius: number; // Skala relatif untuk visualisasi
  distanceFromSun: number; // Skala relatif untuk posisi
  rotationSpeed: number;
  orbitSpeed: number;
  hasRings?: boolean;
  ringTextureUrl?: string;
  color: string; // Warna fallback
  description: string;
  details: {
    diameter: string;
    distance: string;
    atmosphere: string;
    temperature: string;
    mass: string;
    orbitPeriod: string;
    moons: number;
    funFact: string;
    physicalCharacteristics: string;
    explorationMissions: string;
  };
}

export interface HUDProps {
  selectedPlanet: PlanetData | null;
  onClose: () => void;
}