
import React, { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import FeedItem from './components/FeedItem';
import ReportModal from './components/ReportModal';
import { UserReport, TrafficStatus } from './types';
import { summarizeTraffic } from './services/geminiService';

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
    comments: 3
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
    isSocialMediaSource: true
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
  const [aiSummary, setAiSummary] = useState('Cargando resumen de inteligencia artificial...');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchSummary = useCallback(async () => {
    const summary = await summarizeTraffic(reports);
    setAiSummary(summary);
  }, [reports]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

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
      mediaType: 'image',
      likes: 0,
      comments: 0
    };
    setReports([newReport, ...reports]);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      fetchSummary();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col pb-24 max-w-md mx-auto relative overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <i className="fas fa-road text-white"></i>
          </div>
          <h1 className="text-2xl font-black text-white italic tracking-tighter">
            HAY<span className="text-indigo-500">PASO</span>
            <span className="text-xs font-normal text-slate-500 ml-1 not-italic">.mx</span>
          </h1>
        </div>
        <button 
          onClick={onRefresh}
          className={`text-slate-400 hover:text-white transition-all ${isRefreshing ? 'animate-spin' : ''}`}
        >
          <i className="fas fa-rotate"></i>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar">
        {activeTab === 'dashboard' ? (
          <div className="p-4 space-y-6">
            {/* AI Summary Box */}
            <section className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-20 text-4xl">
                <i className="fas fa-robot"></i>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <h2 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Resumen Inteligente</h2>
              </div>
              <p className="text-sm font-medium text-slate-200 leading-relaxed">
                {aiSummary}
              </p>
            </section>

            {/* Status Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex flex-col items-center justify-center space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Tiempo Est.</span>
                <span className="text-xl font-black text-white">3h 20m</span>
                <span className="text-green-500 text-[10px] flex items-center">
                  <i className="fas fa-arrow-down mr-1"></i> -10 min
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex flex-col items-center justify-center space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Alertas Activas</span>
                <span className="text-xl font-black text-white">4</span>
                <span className="text-red-500 text-[10px] flex items-center">
                  <i className="fas fa-triangle-exclamation mr-1"></i> Crítico
                </span>
              </div>
            </div>

            {/* Social Feed Title */}
            <div className="flex items-center justify-between pt-2">
              <h2 className="text-lg font-bold text-white flex items-center">
                <i className="fas fa-users text-indigo-500 mr-2"></i>
                Reportes en vivo
              </h2>
              <div className="flex space-x-1">
                 <button className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-md font-bold hover:bg-slate-700">Recientes</button>
                 <button className="text-[10px] bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded-md font-bold">Cerca de ti</button>
              </div>
            </div>

            {/* The Feed */}
            <div className="space-y-4">
              {reports.map((report) => (
                <FeedItem key={report.id} report={report} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] text-slate-500 p-8 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-tools text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-300">Sección en Construcción</h3>
            <p className="text-sm">Estamos trabajando para integrar el mapa interactivo y notificaciones avanzadas.</p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="bg-slate-800 text-white px-6 py-2 rounded-full font-bold"
            >
              Volver al Inicio
            </button>
          </div>
        )}
      </main>

      {/* Floating Informa UI */}
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onInformaClick={() => setIsReportModalOpen(true)}
      />

      {/* Report Modal */}
      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        onSubmit={handleNewReport}
      />

      {/* Bottom spacing for iOS safe area */}
      <div className="h-safe-area-bottom"></div>
    </div>
  );
};

export default App;
