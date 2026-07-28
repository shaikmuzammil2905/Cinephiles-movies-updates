import React from 'react';
import { Home, MoreVertical } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'HOME', icon: Home, sectionId: 'hero-section' },
    { id: 'ott', label: 'OTT UPDATES', sectionId: 'ott-section' },
    { id: 'news', label: 'MOVIE NEWS', sectionId: 'news-section' },
    { id: 'reviews', label: 'REVIEWS', sectionId: 'reviews-section' },
    { id: 'boxoffice', label: 'BOX OFFICE', sectionId: 'boxoffice-section' },
    { id: 'trailers', label: 'TRAILERS', sectionId: 'trailers-section' },
    { id: 'releases', label: 'UPCOMING', sectionId: 'upcoming-section' }
  ];

  const handleNavClick = (item) => {
    setActiveTab(item.id);
    const element = document.getElementById(item.sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-[#031738] border-t border-slate-800 text-white shadow-md sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center overflow-x-auto no-scrollbar py-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'bg-[#d90429] text-white border-red-400 shadow'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-white border-transparent'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </button>
            );
          })}
          <button 
            className="px-3 py-3 text-slate-400 hover:text-white transition-colors ml-auto"
            title="More categories"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
