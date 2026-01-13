
import React from 'react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onInformaClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, onInformaClick }) => {
  const tabs = [
    { id: 'dashboard', icon: 'fa-house', label: 'Inicio' },
    { id: 'maps', icon: 'fa-map-location-dot', label: 'Mapa' },
    { id: 'informa', icon: 'fa-plus', label: 'Informa', isAction: true },
    { id: 'alerts', icon: 'fa-bell', label: 'Alertas' },
    { id: 'profile', icon: 'fa-user', label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-zinc-900 pb-safe-area pt-2 px-6 z-40">
      <div className="flex items-center justify-between max-w-lg mx-auto h-14">
        {tabs.map((tab) => {
          if (tab.isAction) {
            return (
              <button
                key={tab.id}
                onClick={onInformaClick}
                className="relative -top-6 bg-yellow-400 w-14 h-14 rounded-sm flex items-center justify-center text-black shadow-xl shadow-yellow-400/20 ring-4 ring-black active:scale-90 transition-all border-2 border-black"
              >
                <i className={`fas ${tab.icon} text-2xl`}></i>
              </button>
            );
          }
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 transition-all ${
                activeTab === tab.id ? 'text-yellow-400' : 'text-zinc-500'
              }`}
            >
              <i className={`fas ${tab.icon} text-lg`}></i>
              <span className="text-[9px] font-black uppercase tracking-tight">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="w-4 h-0.5 bg-yellow-400 mt-1"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
