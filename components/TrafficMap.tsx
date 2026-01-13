
import React from 'react';

const TrafficMap: React.FC = () => {
  const wazeUrl = "https://embed.waze.com/iframe?zoom=8&lat=20.1500&lon=-103.6500&ct=livemap";
  const externalLink = "https://www.waze.com/live-map/directions?to=place.ChIJ6S999_pXKIQRU9E7Gj2Z2v0&from=place.ChIJuS-x9-vMK4QR7S8Z7Gj2Z2v0";

  return (
    <div className="w-full h-full flex flex-col bg-black relative">
      {/* Overlay de información superior */}
      <div className="absolute top-4 left-4 right-4 z-20 space-y-2">
        <div className="bg-black/95 backdrop-blur-md border border-zinc-800 p-3 rounded-sm shadow-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-400 p-1.5 rounded-sm">
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Waze_logo.svg" alt="Waze" className="w-4 h-4 invert" />
            </div>
            <div>
              <p className="text-[8px] text-zinc-500 uppercase font-black tracking-widest leading-none mb-1">Mapa en Vivo</p>
              <h3 className="text-xs font-black text-white tracking-tight uppercase">GDL ↔ Manzanillo</h3>
            </div>
          </div>
          <a 
            href={externalLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-yellow-400 hover:bg-yellow-300 text-black text-[9px] font-black px-3 py-1.5 rounded-sm transition-all flex items-center space-x-2 active:scale-95 shadow-lg shadow-yellow-400/20"
          >
            <i className="fas fa-external-link-alt"></i>
            <span>ABRIR</span>
          </a>
        </div>
        
        {/* Leyenda rápida */}
        <div className="bg-black/80 backdrop-blur-md border border-zinc-800 rounded-sm px-3 py-1.5 inline-flex space-x-3 items-center shadow-lg">
          <div className="flex items-center space-x-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span className="text-[8px] font-black uppercase text-zinc-300">Libre</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
            <span className="text-[8px] font-black uppercase text-zinc-300">Lento</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
            <span className="text-[8px] font-black uppercase text-zinc-300">Alto</span>
          </div>
        </div>
      </div>

      {/* Contenedor del Iframe */}
      <div className="flex-1 relative bg-zinc-900">
        <iframe
          src={wazeUrl}
          className="absolute inset-0 w-full h-full border-none grayscale contrast-125 brightness-75"
          title="Waze Traffic Map"
          allowFullScreen
        ></iframe>
      </div>
      
      {/* Footer del Mapa */}
      <div className="bg-black border-t-2 border-yellow-400 p-2 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.5)]"></div>
            <span className="text-[9px] text-yellow-400 font-black uppercase tracking-widest italic">Activo</span>
        </div>
        <div className="text-[8px] text-zinc-500 font-black uppercase tracking-tighter">
           Ruta Colima - Jalisco
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;
