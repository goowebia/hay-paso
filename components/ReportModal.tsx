
import React, { useState, useRef, useEffect } from 'react';
import { TrafficStatus } from '../types.ts';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TrafficStatus>(TrafficStatus.SLOW);
  const [location, setLocation] = useState('Tramo Autopista');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      handleGetLocation();
    }
  }, [isOpen]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocalización no soportada");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
      },
      (error) => {
        console.error("Error obteniendo ubicación:", error);
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

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
      coords,
      mediaUrl: preview,
      timestamp: new Date()
    });
    setDescription('');
    setCoords(null);
    setMedia(null);
    setPreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-zinc-950 w-full max-w-lg rounded-t-2xl sm:rounded-lg overflow-hidden border-t sm:border border-zinc-800 animate-in slide-in-from-bottom duration-300">
        <div className="p-4 flex items-center justify-between border-b-2 border-yellow-400 bg-black">
          <h2 className="text-xl font-black text-white uppercase flex items-center tracking-tight">
            <i className="fas fa-bullhorn text-yellow-400 mr-2"></i>
            Reportar
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-yellow-400">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-4 space-y-5 bg-black">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">¿Cómo está el paso?</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { s: TrafficStatus.FLUID, l: 'Libre', c: 'bg-green-500 text-black' },
                { s: TrafficStatus.SLOW, l: 'Lento', c: 'bg-yellow-400 text-black' },
                { s: TrafficStatus.STALL, l: 'Parado', c: 'bg-orange-500 text-black' },
                { s: TrafficStatus.ACCIDENT, l: 'Choque', c: 'bg-red-500 text-black' },
                { s: TrafficStatus.CLOSURE, l: 'Cierre', c: 'bg-red-900 text-white' },
              ].map((item) => (
                <button
                  key={item.s}
                  type="button"
                  onClick={() => setStatus(item.s)}
                  className={`py-2.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${
                    status === item.s ? `${item.c} border-2 border-white` : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                  }`}
                >
                  {item.l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-yellow-400 uppercase tracking-widest flex items-center justify-between">
              Ubicación Actual
              {isLocating && <i className="fas fa-circle-notch animate-spin text-yellow-400"></i>}
            </label>
            <div className="relative group">
              <i className="fas fa-location-crosshairs absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400 text-xs"></i>
              <div className="w-full bg-zinc-900 border border-zinc-800 rounded-sm py-2.5 pl-9 pr-3 text-[11px] font-black text-zinc-400 uppercase tracking-wider">
                {coords ? `GPS: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : (isLocating ? 'Buscando satélite...' : 'GPS no disponible')}
              </div>
              <button 
                type="button"
                onClick={handleGetLocation}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-yellow-400 text-black px-2 py-1 rounded-sm font-black"
              >
                REINTENTAR
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Referencia Visual / Tramo</label>
            <input
              required
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ej. Cuesta de Sayula, Gasolinera..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-sm py-2.5 px-3 text-sm font-medium text-zinc-200 focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">¿Qué está pasando?</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el incidente..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-sm font-medium text-zinc-200 focus:border-yellow-400 focus:outline-none min-h-[80px]"
            />
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
              <div className="relative rounded-sm overflow-hidden border border-zinc-800 aspect-video">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setPreview(null)}
                  className="absolute top-2 right-2 bg-black/70 p-2 rounded-sm text-yellow-400"
                >
                  <i className="fas fa-trash-can"></i>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-zinc-800 rounded-sm p-6 text-zinc-500 flex flex-col items-center hover:border-yellow-400/50 hover:text-yellow-400 transition-all bg-zinc-900/50"
              >
                <i className="fas fa-camera text-2xl mb-2"></i>
                <span className="text-[10px] font-black uppercase tracking-widest">Subir Foto o Video</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 rounded-sm shadow-xl shadow-yellow-400/10 active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
          >
            Publicar Reporte
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
