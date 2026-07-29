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
    <nav className="bg-[#031738] border-t border-b border-slate-800 text-white shadow-md sticky top-16 sm:top-20 z-40 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth space-x-1.5 sm:space-x-2 touch-pan-x">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wide transition-all whitespace-nowrap shrink-0 active:scale-95 ${
                  isActive
                    ? 'bg-[#d90429] text-white shadow-lg shadow-red-900/40 ring-2 ring-red-500/50'
                    : 'text-slate-300 hover:bg-slate-800/90 hover:text-white bg-slate-900/40 border border-slate-700/50'
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
