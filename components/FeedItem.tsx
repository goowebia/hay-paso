
import React from 'react';
import { UserReport, TrafficStatus } from '../types';

interface FeedItemProps {
  report: UserReport;
}

const statusConfig: Record<TrafficStatus, { icon: string, color: string, label: string }> = {
  [TrafficStatus.FLUID]: { icon: 'fa-circle-check', color: 'text-green-500', label: 'Paso Libre' },
  [TrafficStatus.SLOW]: { icon: 'fa-gauge-simple-med', color: 'text-yellow-500', label: 'Tráfico Lento' },
  [TrafficStatus.STALL]: { icon: 'fa-hourglass-half', color: 'text-orange-500', label: 'Parado / Fila' },
  [TrafficStatus.ACCIDENT]: { icon: 'fa-car-burst', color: 'text-red-500', label: 'Accidente' },
  [TrafficStatus.CLOSURE]: { icon: 'fa-ban', color: 'text-red-600', label: 'Cierre Total' },
};

const FeedItem: React.FC<FeedItemProps> = ({ report }) => {
  const config = statusConfig[report.status];
  
  return (
    <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 mb-4 transition-all">
      {/* Header */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={report.userAvatar} 
            alt={report.userName} 
            className="w-10 h-10 rounded-full border-2 border-indigo-500 shadow-lg"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-sm text-slate-100">{report.userName}</h3>
              {report.isSocialMediaSource && (
                <span className="bg-blue-600/20 text-blue-400 text-[10px] px-1.5 py-0.5 rounded-full border border-blue-500/30">
                  <i className="fab fa-facebook mr-1"></i>FB Group
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400">
              {report.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {report.location}
            </p>
          </div>
        </div>
        <div className={`flex flex-col items-end`}>
          <div className={`${config.color} flex items-center space-x-1 font-bold text-xs uppercase tracking-wider`}>
            <i className={`fas ${config.icon}`}></i>
            <span>{config.label}</span>
          </div>
        </div>
      </div>

      {/* Media */}
      {report.mediaUrl && (
        <div className="relative aspect-video bg-slate-900 group">
          {report.mediaType === 'video' ? (
            <video src={report.mediaUrl} className="w-full h-full object-cover" controls muted />
          ) : (
            <img src={report.mediaUrl} alt="Report content" className="w-full h-full object-cover" />
          )}
        </div>
      )}

      {/* Description */}
      <div className="p-3">
        <p className="text-sm text-slate-200 leading-relaxed italic">
          "{report.description}"
        </p>
      </div>

      {/* Footer / Actions */}
      <div className="px-3 pb-3 flex items-center justify-between text-slate-400 border-t border-slate-700/30 pt-2">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
            <i className="far fa-heart"></i>
            <span className="text-xs">{report.likes}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-indigo-400 transition-colors">
            <i className="far fa-comment"></i>
            <span className="text-xs">{report.comments}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-green-400 transition-colors">
            <i className="far fa-share-square"></i>
          </button>
        </div>
        <button className="text-[10px] bg-slate-700/50 hover:bg-slate-700 px-2 py-1 rounded-md transition-all">
          Ver ubicación
        </button>
      </div>
    </div>
  );
};

export default FeedItem;
