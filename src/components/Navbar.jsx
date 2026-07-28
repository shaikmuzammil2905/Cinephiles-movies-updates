import React from 'react';
import { Home, Tv, Newspaper, Star, BarChart3, Film, Calendar } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'ott', label: 'OTT UPDATES', icon: Tv },
    { id: 'news', label: 'MOVIE NEWS', icon: Newspaper },
    { id: 'reviews', label: 'REVIEWS', icon: Star },
    { id: 'boxoffice', label: 'BOX OFFICE', icon: BarChart3 },
    { id: 'trailers', label: 'TRAILERS', icon: Film },
    { id: 'releases', label: 'UPCOMING', icon: Calendar }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-[#031738] border-t border-slate-800 text-white shadow-lg sticky top-16 sm:top-20 z-40">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold tracking-wide transition-all whitespace-nowrap border-b-2 shrink-0 ${
                  isActive
                    ? 'bg-[#d90429] text-white border-red-400 shadow-md scale-105'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-white border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
