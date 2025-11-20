import React, { Component, ReactNode, ErrorInfo } from 'react';
import { Html } from '@react-three/drei';
import { PlanetData, HUDProps } from '../types';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Error Boundary untuk menangkap crash rendering (misal: texture load fail)
// Harus dibungkus <Html> karena berada di dalam Canvas
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <Html fullscreen>
          <div className="absolute inset-0 flex items-center justify-center bg-black text-red-500 z-[100]">
            <div className="text-center p-8 border border-red-900 bg-red-900/20 rounded max-w-md backdrop-blur-md">
              <h2 className="text-2xl font-mono font-bold mb-4">Gagal Memuat Aset</h2>
              <p className="mb-4 font-sans text-sm text-red-200">
                {this.state.error?.message || "Terjadi kesalahan saat memuat visualisasi 3D."}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded font-mono text-xs uppercase transition-colors"
              >
                Muat Ulang Halaman
              </button>
            </div>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

// Komponen Panel Informasi Detail Planet
export const InfoPanel: React.FC<HUDProps> = ({ selectedPlanet, onClose }) => {
  if (!selectedPlanet) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div 
        className="bg-black/90 border border-nasa-blue/50 text-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-[0_0_50px_rgba(16,91,216,0.3)] relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-nasa-gray hover:text-white z-10 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Kolom Visual/Header (Mobile) */}
        <div className="md:w-1/3 bg-gradient-to-b from-nasa-blue/20 to-transparent p-8 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-nasa-blue/30">
          <div 
            className="w-32 h-32 rounded-full shadow-inner mb-6 animate-pulse"
            style={{ backgroundColor: selectedPlanet.color, boxShadow: `0 0 30px ${selectedPlanet.color}66` }}
          />
          <h2 className="text-4xl font-mono font-bold tracking-widest uppercase mb-2 text-center">{selectedPlanet.name}</h2>
          <p className="text-nasa-gray text-center text-sm italic">"{selectedPlanet.description}"</p>
        </div>

        {/* Kolom Data */}
        <div className="md:w-2/3 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
            
            <div className="space-y-4">
              <DataPoint label="Diameter" value={selectedPlanet.details.diameter} />
              <DataPoint label="Jarak dr Matahari" value={selectedPlanet.details.distance} />
              <DataPoint label="Suhu Rata-rata" value={selectedPlanet.details.temperature} />
              <DataPoint label="Massa" value={selectedPlanet.details.mass} />
              <DataPoint label="Periode Orbit" value={selectedPlanet.details.orbitPeriod} />
            </div>

            <div className="space-y-4">
              <DataPoint label="Jumlah Bulan" value={selectedPlanet.details.moons.toString()} />
              <DataPoint label="Atmosfer" value={selectedPlanet.details.atmosphere} />
              <DataPoint label="Misi Eksplorasi" value={selectedPlanet.details.explorationMissions} />
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-nasa-blue font-bold uppercase tracking-wider mb-2 text-sm">Karakteristik Fisik</h3>
            <p className="text-gray-300 leading-relaxed mb-6">{selectedPlanet.details.physicalCharacteristics}</p>
            
            <div className="bg-nasa-blue/10 border-l-4 border-nasa-blue p-4">
              <h3 className="text-nasa-blue font-bold uppercase tracking-wider mb-1 text-xs">Fakta Menarik</h3>
              <p className="text-white italic">{selectedPlanet.details.funFact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataPoint = ({ label, value }: { label: string, value: string }) => (
  <div className="border-b border-white/10 pb-2">
    <span className="text-nasa-gray text-xs uppercase tracking-wider block mb-1">{label}</span>
    <span className="text-white font-semibold">{value}</span>
  </div>
);

// Overlay Kontrol & Instruksi
export const ControlsOverlay = () => (
  <div className="absolute bottom-8 left-8 pointer-events-none text-white/70 font-mono text-xs z-40">
    <div className="bg-black/50 backdrop-blur-md p-4 rounded border border-white/10">
      <h3 className="text-nasa-blue font-bold mb-2 uppercase">Kontrol Navigasi</h3>
      <ul className="space-y-1">
        <li>[W, A, S, D] Bergerak Maju/Mundur/Samping</li>
        <li>[Shift] Tahan untuk Turbo Boost</li>
        <li>[Space / Ctrl] Naik / Turun</li>
        <li>[Mouse] Lihat Sekitar</li>
        <li>[Klik] Mulai Eksplorasi / Interaksi</li>
        <li>[ESC] Buka Kursor</li>
      </ul>
    </div>
  </div>
);

export const LoadingScreen = () => (
  <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center text-white">
    <div className="w-16 h-16 border-4 border-nasa-blue border-t-transparent rounded-full animate-spin mb-4"></div>
    <h2 className="font-mono text-xl tracking-[0.5em] uppercase">Memuat Sistem Tata Surya</h2>
    <p className="text-nasa-gray text-xs mt-2">Mengambil Data Satelit NASA...</p>
  </div>
);