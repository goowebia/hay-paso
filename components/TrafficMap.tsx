
import React from 'react';

const TrafficMap: React.FC = () => {
  // We use a Google Maps iframe with the traffic layer enabled and a specific route focus.
  const origin = "Manzanillo, Colima";
  const destination = "Guadalajara, Jalisco";
  
  // Construct a standard Google Maps URL for directions with traffic layer enabled.
  // Note: For actual embedding of traffic, this type of URL provides the best interactive experience
  // within an iframe for this specific use case.
  const mapUrl = `https://www.google.com/maps?q=from+${encodeURIComponent(origin)}+to+${encodeURIComponent(destination)}&layer=t&output=embed`;
  const externalLink = "https://maps.app.goo.gl/jw6nA8CyWpJzD5mt5";

  return (
    <div className="flex-1 flex flex-col bg-slate-900 relative">
      {/* Top Map Header/Info Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 space-y-2">
        <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800 p-3 rounded-2xl shadow-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <div className="w-0.5 h-4 bg-slate-700 my-0.5"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
            </div>
            <div>
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.2em] leading-none mb-0.5">Ruta en Vivo</p>
              <h3 className="text-xs font-bold text-white tracking-tight">Manzanillo ↔ Guadalajara</h3>
            </div>
          </div>
          <a 
            href={externalLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black px-4 py-2 rounded-xl transition-all flex items-center space-x-2 active:scale-95 shadow-lg shadow-indigo-600/20"
          >
            <i className="fas fa-up-right-from-square"></i>
            <span>ABRIR MAPS</span>
          </a>
        </div>
        
        {/* Traffic Legend Pill */}
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-1">
          <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-full px-2 py-1 flex space-x-3 items-center shadow-lg">
            <span className="flex items-center text-[8px] font-bold text-green-400">
              <i className="fas fa-circle mr-1 text-[6px]"></i>FLUYE
            </span>
            <span className="flex items-center text-[8px] font-bold text-yellow-400">
              <i className="fas fa-circle mr-1 text-[6px]"></i>LENTO
            </span>
            <span className="flex items-center text-[8px] font-bold text-red-400">
              <i className="fas fa-circle mr-1 text-[6px]"></i>ALTO
            </span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 bg-slate-800 relative group overflow-hidden">
        <iframe
          title="Tráfico en tiempo real"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1) brightness(0.95)' }}
          src={mapUrl}
          allowFullScreen
          className="w-full h-full transition-all duration-1000 group-hover:grayscale-0"
        ></iframe>
        
        {/* Interaction hint for touch screens */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none animate-bounce opacity-80">
            <div className="bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest px-5 py-2 rounded-full flex items-center space-x-2 shadow-xl border border-indigo-400/30">
                <i className="fas fa-fingerprint text-xs"></i>
                <span>Explorar Ruta</span>
            </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="bg-slate-950 border-t border-slate-900 p-3 flex items-center justify-between text-slate-500 text-[10px] font-medium">
        <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
            <span>Tráfico Actualizado</span>
        </div>
        <div className="flex items-center space-x-1">
            <i className="fas fa-shield-halved text-indigo-500/50"></i>
            <span>Vía Segura Colima-Jal</span>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;
