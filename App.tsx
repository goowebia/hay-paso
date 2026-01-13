
import React, { useState } from 'react';
import Navigation from './components/Navigation.tsx';
import FeedItem from './components/FeedItem.tsx';
import ReportModal from './components/ReportModal.tsx';
import TrafficMap from './components/TrafficMap.tsx';
import { UserReport, TrafficStatus } from './types.ts';

const MOCK_REPORTS: UserReport[] = [
  {
    id: '1',
    userName: 'Juan Mecánico',
    userAvatar: 'https://picsum.photos/seed/juan/100',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    location: 'Cuesta de Sayula',
    description: 'Tráfico súper lento por trailer averiado en carril de baja. Tomen precauciones.',
    status: TrafficStatus.SLOW,
    mediaUrl: 'https://picsum.photos/seed/truck/600/400',
    likes: 12,
    comments: 3,
    coords: { lat: 20.0123, lng: -103.5678 }
  },
  {
    id: 'fb-1',
    userName: 'Accidentes Carretera Colima-Guadalajara',
    userAvatar: 'https://picsum.photos/seed/group/100',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    location: 'Km 58',
    description: 'Reportan choque múltiple bajando hacia Manzanillo. Paso intermitente.',
    status: TrafficStatus.ACCIDENT,
    mediaUrl: 'https://picsum.photos/seed/accident/600/400',
    likes: 45,
    comments: 21,
    isSocialMediaSource: true,
    coords: { lat: 20.1567, lng: -103.4890 }
  },
  {
    id: '2',
    userName: 'Maria R.',
    userAvatar: 'https://picsum.photos/seed/maria/100',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    location: 'Caseta San Marcos',
    description: 'Todo libre por el momento, fluido de GDL a Colima.',
    status: TrafficStatus.FLUID,
    likes: 8,
    comments: 1
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reports, setReports] = useState<UserReport[]>(MOCK_REPORTS);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState('');

  const handleNewReport = (data: any) => {
    const newReport: UserReport = {
      id: Math.random().toString(36).substring(7),
      userName: 'Tú',
      userAvatar: 'https://picsum.photos/seed/user/100',
      timestamp: data.timestamp,
      location: data.location,
      description: data.description,
      status: data.status,
      mediaUrl: data.mediaUrl,
      mediaType: data.mediaUrl?.includes('video') ? 'video' : 'image',
      likes: 0,
      comments: 0,
      coords: data.coords
    };
    setReports([newReport, ...reports]);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === 'admin123') {
      setIsAdmin(true);
      setActiveTab('dashboard');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl border-x border-zinc-900">
      <header className="flex-none bg-black/90 backdrop-blur-lg border-b-2 border-yellow-400 p-4 flex items-center justify-between z-30">
        <div className="flex items-center space-x-2">
          <div className="bg-yellow-400 p-1.5 rounded-sm">
            <i className="fas fa-road text-black text-sm"></i>
          </div>
          <h1 className="text-xl font-black text-white italic tracking-tighter uppercase">
            HAY<span className="text-yellow-400">PASO</span>
            <span className="text-[10px] font-normal text-zinc-500 ml-1 not-italic lowercase">.mx</span>
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          {isAdmin && (
            <span className="bg-yellow-400 text-black text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest mr-2">
              ADMIN
            </span>
          )}
          <button 
            onClick={onRefresh}
            className={`text-yellow-400 hover:text-white transition-all p-2 rounded-full hover:bg-zinc-900 ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <i className="fas fa-rotate text-sm"></i>
          </button>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden flex flex-col">
        {activeTab === 'dashboard' && (
          <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white uppercase flex items-center tracking-tight">
                <i className="fas fa-tower-broadcast text-yellow-400 mr-2"></i>
                En Vivo
              </h2>
              <span className="text-[10px] text-yellow-400/70 uppercase tracking-widest font-black">Público</span>
            </div>

            <div className="space-y-4">
              {reports.map((report) => (
                <FeedItem key={report.id} report={report} isAdmin={isAdmin} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'maps' && (
          <div className="absolute inset-0 flex flex-col">
            <TrafficMap />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black">
            {isAdmin ? (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-yellow-400/20">
                  <i className="fas fa-user-shield text-3xl text-black"></i>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Administrador Activo</h3>
                  <p className="text-zinc-500 text-xs mt-1">Ahora puedes ver las coordenadas exactas de cada reporte.</p>
                </div>
                <button 
                  onClick={() => setIsAdmin(false)}
                  className="bg-zinc-900 text-yellow-400 border border-yellow-400/30 px-6 py-3 rounded-sm font-black text-xs uppercase tracking-widest w-full"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="w-full max-w-xs space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Acceso Admin</h3>
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-2">Sólo personal autorizado</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Contraseña</label>
                    <input 
                      type="password"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-sm p-4 text-white focus:outline-none focus:border-yellow-400"
                      placeholder="••••••••"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-yellow-400 text-black font-black py-4 rounded-sm uppercase tracking-widest text-xs"
                  >
                    Iniciar Sesión
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {(activeTab === 'alerts') && (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-zinc-900 rounded-lg border-2 border-yellow-400/20 flex items-center justify-center mb-4">
              <i className="fas fa-bell text-2xl text-yellow-400"></i>
            </div>
            <h3 className="text-lg font-black text-zinc-300 uppercase">Alertas</h3>
            <p className="text-xs text-zinc-600 uppercase font-bold">Activa notificaciones pronto</p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="bg-yellow-400 text-black px-6 py-2 rounded-sm font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
            >
              Volver
            </button>
          </div>
        )}
      </main>

      <div className="flex-none">
        <Navigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onInformaClick={() => setIsReportModalOpen(true)}
          isAdmin={isAdmin}
        />
      </div>

      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        onSubmit={handleNewReport}
      />
    </div>
  );
};

export default App;
