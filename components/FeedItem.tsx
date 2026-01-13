
import React from 'react';
import { UserReport, TrafficStatus } from '../types';

interface FeedItemProps {
  report: UserReport;
}

const statusConfig: Record<TrafficStatus, { icon: string, color: string, bg: string, label: string }> = {
  [TrafficStatus.FLUID]: { icon: 'fa-circle-check', color: 'text-green-500', bg: 'bg-green-500/10', label: 'Libre' },
  [TrafficStatus.SLOW]: { icon: 'fa-gauge-simple-med', color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Lento' },
  [TrafficStatus.STALL]: { icon: 'fa-hourglass-half', color: 'text-orange-500', bg: 'bg-orange-500/10', label: 'Parado' },
  [TrafficStatus.ACCIDENT]: { icon: 'fa-car-burst', color: 'text-red-500', bg: 'bg-red-500/10', label: 'Accidente' },
  [TrafficStatus.CLOSURE]: { icon: 'fa-ban', color: 'text-red-600', bg: 'bg-red-600/10', label: 'Cierre' },
};

const FeedItem: React.FC<FeedItemProps> = ({ report }) => {
  const config = statusConfig[report.status];
  
  const openMap = () => {
    if (report.coords) {
      const url = `https://www.google.com/maps/search/?api=1&query=${report.coords.lat},${report.coords.lng}`;
      window.open(url, '_blank');
    } else {
      // Si no hay coordenadas, buscar por texto de ubicación
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(report.location + ' carretera Colima Guadalajara')}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-zinc-950 rounded-lg overflow-hidden border border-zinc-900 mb-4 transition-all">
      {/* Header */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={report.userAvatar} 
            alt={report.userName} 
            className="w-10 h-10 rounded-sm border-2 border-yellow-400"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-black text-sm text-white uppercase tracking-tight">{report.userName}</h3>
              {report.isSocialMediaSource && (
                <span className="bg-yellow-400 text-black text-[9px] px-1.5 py-0.5 rounded-sm font-black border border-black uppercase">
                  FB
                </span>
              )}
            </div>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              {report.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {report.location}
            </p>
          </div>
        </div>
        <div className={`flex flex-col items-end`}>
          <div className={`${config.color} ${config.bg} flex items-center space-x-1.5 font-black text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm border border-current opacity-90`}>
            <i className={`fas ${config.icon}`}></i>
            <span>{config.label}</span>
          </div>
        </div>
      </div>

      {/* Media */}
      {report.mediaUrl && (
        <div className="relative aspect-video bg-zinc-900">
          {report.mediaType === 'video' ? (
            <video src={report.mediaUrl} className="w-full h-full object-cover" controls muted />
          ) : (
            <img src={report.mediaUrl} alt="Report content" className="w-full h-full object-cover" />
          )}
        </div>
      )}

      {/* Description */}
      <div className="p-3">
        <p className="text-sm text-zinc-200 leading-tight font-medium">
          {report.description}
        </p>
        {report.coords && (
          <div className="mt-2 flex items-center text-[9px] text-yellow-400/60 font-black uppercase tracking-widest">
            <i className="fas fa-satellite mr-1"></i>
            Ubicación GPS Verificada
          </div>
        )}
      </div>

      {/* Footer / Actions */}
      <div className="px-3 pb-3 flex items-center justify-between text-zinc-500 pt-2">
        <div className="flex space-x-5">
          <button className="flex items-center space-x-1.5 hover:text-yellow-400 transition-colors">
            <i className="far fa-heart"></i>
            <span className="text-[10px] font-black">{report.likes}</span>
          </button>
          <button className="flex items-center space-x-1.5 hover:text-yellow-400 transition-colors">
            <i className="far fa-comment"></i>
            <span className="text-[10px] font-black">{report.comments}</span>
          </button>
        </div>
        <button 
          onClick={openMap}
          className="text-[9px] font-black uppercase tracking-widest text-yellow-400 hover:text-white flex items-center bg-zinc-900 px-3 py-1 rounded-sm border border-zinc-800 active:scale-95 transition-all"
        >
          <i className="fas fa-location-dot mr-1 text-yellow-400"></i>
          Ver Lugar
        </button>
      </div>
    </div>
  );
};

export default FeedItem;
