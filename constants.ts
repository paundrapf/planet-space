import { PlanetData } from './types';

const TEXTURES = {
  sun: "/textures/sun.jpg",
  mercury: "/textures/mercury.jpg",
  venus: "/textures/venus.jpg",
  earth: "/textures/earth.jpg",
  earthClouds: "/textures/earth_clouds.png",
  mars: "/textures/mars.jpg",
  jupiter: "/textures/jupiter.jpg",
  saturn: "/textures/saturn.jpg",
  saturnRing: "/textures/saturn_ring.png",
  uranus: "/textures/uranus.jpg",
  neptune: "/textures/neptune.jpg"
};

export const SOLAR_SYSTEM_DATA: PlanetData[] = [
  {
    id: 'sun',
    name: 'Matahari',
    textureUrl: TEXTURES.sun,
    radius: 12,
    distanceFromSun: 0,
    rotationSpeed: 0.001,
    orbitSpeed: 0,
    color: '#FDB813',
    description: "Bintang pusat tata surya kita, sumber kehidupan di Bumi.",
    details: {
      diameter: "1.392.700 km",
      distance: "0 km",
      atmosphere: "Hidrogen (74.9%), Helium (23.8%)",
      temperature: "5.505°C (Permukaan), 15 Juta°C (Inti)",
      mass: "1,989 × 10^30 kg",
      orbitPeriod: "225-250 juta tahun (Galaksi)",
      moons: 0,
      funFact: "Matahari menyumbang 99,86% dari total massa tata surya.",
      physicalCharacteristics: "Bola plasma raksasa dengan medan magnet yang kuat.",
      explorationMissions: "Parker Solar Probe, SOHO, Solar Orbiter"
    }
  },
  {
    id: 'mercury',
    name: 'Merkurius',
    textureUrl: TEXTURES.mercury,
    radius: 0.8,
    distanceFromSun: 25,
    rotationSpeed: 0.004,
    orbitSpeed: 0.04,
    color: '#A5A5A5',
    description: "Planet terkecil di tata surya dan terdekat dengan Matahari.",
    details: {
      diameter: "4.880 km",
      distance: "57,9 juta km",
      atmosphere: "Tipis (Oksigen, Natrium, Hidrogen, Helium, Kalium)",
      temperature: "-173°C hingga 427°C",
      mass: "3,285 × 10^23 kg",
      orbitPeriod: "88 hari Bumi",
      moons: 0,
      funFact: "Merkurius menyusut perlahan seiring pendinginan inti besinya yang masif.",
      physicalCharacteristics: "Permukaan berkawah mirip Bulan, inti besi besar.",
      explorationMissions: "Mariner 10, MESSENGER, BepiColombo"
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    textureUrl: TEXTURES.venus,
    radius: 1.1,
    distanceFromSun: 35,
    rotationSpeed: 0.002,
    orbitSpeed: 0.015,
    color: '#E3BB76',
    description: "Planet terpanas di tata surya dengan efek rumah kaca yang ekstrim.",
    details: {
      diameter: "12.104 km",
      distance: "108,2 juta km",
      atmosphere: "Tebal (96% Karbon Dioksida, Nitrogen)",
      temperature: "462°C (Rata-rata)",
      mass: "4,867 × 10^24 kg",
      orbitPeriod: "225 hari Bumi",
      moons: 0,
      funFact: "Satu hari di Venus lebih lama daripada satu tahun di Venus karena rotasinya yang sangat lambat.",
      physicalCharacteristics: "Pegunungan, gunung berapi, dataran lava luas.",
      explorationMissions: "Venera, Magellan, Venus Express, Akatsuki"
    }
  },
  {
    id: 'earth',
    name: 'Bumi',
    textureUrl: TEXTURES.earth,
    cloudTextureUrl: TEXTURES.earthClouds,
    radius: 1.2,
    distanceFromSun: 50,
    rotationSpeed: 0.01,
    orbitSpeed: 0.01,
    color: '#22A6B3',
    description: "Satu-satunya planet yang diketahui memiliki kehidupan.",
    details: {
      diameter: "12.742 km",
      distance: "149,6 juta km",
      atmosphere: "Nitrogen (78%), Oksigen (21%), Argon",
      temperature: "-88°C hingga 58°C",
      mass: "5,972 × 10^24 kg",
      orbitPeriod: "365,25 hari",
      moons: 1,
      funFact: "Bumi adalah satu-satunya planet yang tidak dinamai menurut dewa/dewi Yunani atau Romawi.",
      physicalCharacteristics: "70% air, lempeng tektonik aktif, medan magnet pelindung.",
      explorationMissions: "N/A (Kita di sini)"
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    textureUrl: TEXTURES.mars,
    radius: 0.9,
    distanceFromSun: 65,
    rotationSpeed: 0.008,
    orbitSpeed: 0.008,
    color: '#D35400',
    description: "Planet Merah, target utama eksplorasi manusia di masa depan.",
    details: {
      diameter: "6.779 km",
      distance: "227,9 juta km",
      atmosphere: "Tipis (Karbon Dioksida, Argon, Nitrogen)",
      temperature: "-140°C hingga 20°C",
      mass: "6,39 × 10^23 kg",
      orbitPeriod: "687 hari Bumi",
      moons: 2,
      funFact: "Memiliki gunung tertinggi di tata surya, Olympus Mons (21 km).",
      physicalCharacteristics: "Tanah berkarat (besi oksida), kawah, lembah raksasa.",
      explorationMissions: "Viking, Pathfinder, Rovers (Spirit, Opportunity, Curiosity, Perseverance)"
    }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    textureUrl: TEXTURES.jupiter,
    radius: 4.5,
    distanceFromSun: 100,
    rotationSpeed: 0.04,
    orbitSpeed: 0.002,
    color: '#C08B66',
    description: "Raksasa gas dan planet terbesar di tata surya.",
    details: {
      diameter: "139.820 km",
      distance: "778,5 juta km",
      atmosphere: "Hidrogen, Helium",
      temperature: "-108°C (Awan atas)",
      mass: "1,898 × 10^27 kg",
      orbitPeriod: "11,86 tahun Bumi",
      moons: 95,
      funFact: "Great Red Spot adalah badai raksasa yang telah berlangsung selama ratusan tahun.",
      physicalCharacteristics: "Raksasa gas, tidak ada permukaan padat, cincin tipis.",
      explorationMissions: "Pioneer 10/11, Voyager, Galileo, Juno"
    }
  },
  {
    id: 'saturn',
    name: 'Saturnus',
    textureUrl: TEXTURES.saturn,
    hasRings: true,
    radius: 3.8,
    distanceFromSun: 140,
    rotationSpeed: 0.038,
    orbitSpeed: 0.0009,
    color: '#E4D5B6',
    description: "Dikenal dengan sistem cincinnya yang spektakuler dan kompleks.",
    details: {
      diameter: "116.460 km",
      distance: "1,4 miliar km",
      atmosphere: "Hidrogen, Helium",
      temperature: "-139°C",
      mass: "5,683 × 10^26 kg",
      orbitPeriod: "29,45 tahun Bumi",
      moons: 146,
      funFact: "Saturnus memiliki massa jenis sangat rendah; jika ada bak air raksasa, planet ini akan mengapung.",
      physicalCharacteristics: "Raksasa gas, sistem cincin es dan batuan yang luas.",
      explorationMissions: "Pioneer 11, Voyager, Cassini-Huygens"
    }
  },
  {
    id: 'uranus',
    name: 'Uranus',
    textureUrl: TEXTURES.uranus,
    radius: 2.2,
    distanceFromSun: 180,
    rotationSpeed: 0.03,
    orbitSpeed: 0.0006,
    color: '#73D7EE',
    description: "Raksasa es yang berotasi miring hingga hampir menggelinding pada orbitnya.",
    details: {
      diameter: "50.724 km",
      distance: "2,9 miliar km",
      atmosphere: "Hidrogen, Helium, Metana",
      temperature: "-197°C",
      mass: "8,681 × 10^25 kg",
      orbitPeriod: "84 tahun Bumi",
      moons: 27,
      funFact: "Atmosfernya mengandung es air, amonia, dan metana yang memberinya warna biru kehijauan.",
      physicalCharacteristics: "Raksasa es, sumbu rotasi miring 98 derajat.",
      explorationMissions: "Voyager 2"
    }
  },
  {
    id: 'neptune',
    name: 'Neptunus',
    textureUrl: TEXTURES.neptune,
    radius: 2.1,
    distanceFromSun: 220,
    rotationSpeed: 0.032,
    orbitSpeed: 0.0005,
    color: '#182983',
    description: "Planet terjauh dari Matahari, dikenal dengan angin supersoniknya.",
    details: {
      diameter: "49.244 km",
      distance: "4,5 miliar km",
      atmosphere: "Hidrogen, Helium, Metana",
      temperature: "-201°C",
      mass: "1,024 × 10^26 kg",
      orbitPeriod: "164,8 tahun Bumi",
      moons: 14,
      funFact: "Neptunus memiliki angin tercepat di tata surya, mencapai 2.100 km/jam.",
      physicalCharacteristics: "Raksasa es, badai gelap aktif, cincin tipis.",
      explorationMissions: "Voyager 2"
    }
  }
];