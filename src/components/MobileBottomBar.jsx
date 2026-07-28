import React from 'react';
import { Home, Film, Image as ImageIcon, Video, Menu } from 'lucide-react';

export function MobileBottomBar({ activeTab, setActiveTab, onOpenMenu }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, sectionId: 'hero-section' },
    { id: 'trailers', label: 'Trailers', icon: Film, sectionId: 'trailers-section' },
    { id: 'photos', label: 'Photos', icon: ImageIcon, sectionId: 'news-section' },
    { id: 'videos', label: 'Videos', icon: Video, sectionId: 'trailers-section' },
    { id: 'menu', label: 'Menu', icon: Menu, action: onOpenMenu }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#031738] border-t border-slate-800 px-2 py-1 shadow-2xl">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.action) {
                  tab.action();
                } else {
                  setActiveTab(tab.id);
                  const el = document.getElementById(tab.sectionId);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-lg transition-colors ${
                isActive ? 'text-red-500' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
