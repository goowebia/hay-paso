
import React, { useState, useRef } from 'react';
import { TrafficStatus } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TrafficStatus>(TrafficStatus.SLOW);
  const [location, setLocation] = useState('Tramo Sayula-Zapotal');
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      description,
      status,
      location,
      mediaUrl: preview,
      timestamp: new Date()
    });
    setDescription('');
    setMedia(null);
    setPreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden border-t sm:border border-slate-700 animate-in slide-in-from-bottom duration-300">
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center">
            <i className="fas fa-bullhorn text-indigo-500 mr-2"></i>
            Informa Tráfico
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">¿Cómo está el paso?</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { s: TrafficStatus.FLUID, l: 'Libre', c: 'bg-green-500/20 text-green-500 border-green-500/50' },
                { s: TrafficStatus.SLOW, l: 'Lento', c: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' },
                { s: TrafficStatus.STALL, l: 'Parado', c: 'bg-orange-500/20 text-orange-500 border-orange-500/50' },
                { s: TrafficStatus.ACCIDENT, l: 'Choque', c: 'bg-red-500/20 text-red-500 border-red-500/50' },
                { s: TrafficStatus.CLOSURE, l: 'Cierre', c: 'bg-red-900/40 text-red-400 border-red-800/50' },
              ].map((item) => (
                <button
                  key={item.s}
                  type="button"
                  onClick={() => setStatus(item.s)}
                  className={`py-2 rounded-lg border text-xs font-bold transition-all ${
                    status === item.s ? `${item.c} ring-2 ring-offset-2 ring-offset-slate-900 ring-indigo-500` : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {item.l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Descripción</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Accidente antes de la caseta de Sayula, trailer atravesado..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ubicación Actual</label>
            <div className="relative">
              <i className="fas fa-location-dot absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-700 aspect-video">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setPreview(null)}
                  className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white"
                >
                  <i className="fas fa-trash-can"></i>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-700 rounded-xl p-6 text-slate-500 flex flex-col items-center hover:border-indigo-500 hover:text-indigo-400 transition-all"
              >
                <i className="fas fa-camera text-2xl mb-2"></i>
                <span className="text-sm font-medium">Subir Foto o Video</span>
                <span className="text-[10px]">Cámara o galería</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
          >
            Publicar Reporte
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
