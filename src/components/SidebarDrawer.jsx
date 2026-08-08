import React from 'react';
import { X, Home, Tv, Newspaper, Star, BarChart3, Film, Trophy, ShieldCheck, Mail } from 'lucide-react';

export function SidebarDrawer({ isOpen, onClose, onNavigate, onOpenTollywoodRecords }) {
  if (!isOpen) return null;

  const links = [
    { id: 'home', label: 'Home Top Story', icon: Home, sectionId: 'hero-section' },
    { id: 'ott', label: 'OTT Platform Hub (Netflix, Prime, etc.)', icon: Tv, sectionId: 'ott-section' },
    { id: 'news', label: 'Movie News & Leaks', icon: Newspaper, sectionId: 'news-section' },
    { id: 'boxoffice', label: 'Box Office Reports & Trackers', icon: BarChart3, sectionId: 'boxoffice-section' },
    { id: 'records', label: 'Tollywood Highest 2nd Week Records', icon: Trophy, action: onOpenTollywoodRecords },
    { id: 'reviews', label: 'Latest Film Reviews', icon: Star, sectionId: 'reviews-section' },
    { id: 'trailers', label: 'HD Movie Trailers', icon: Film, sectionId: 'trailers-section' },
    { id: 'admin', label: 'Admin Portal & CMS', icon: ShieldCheck, action: () => { onNavigate('admin'); window.location.hash = '#admin'; } }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
      />

      {/* Sliding Menu Panel */}
      <div className="relative w-80 max-w-[85vw] bg-[#031738] text-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/tbo_logo.png" alt="TELANGANA BOX OFFICE" className="h-9 sm:h-10 w-auto object-contain" />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links List */}
        <div className="p-4 space-y-1 overflow-y-auto flex-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onClose();
                  if (link.action) {
                    link.action();
                  } else {
                    onNavigate(link.id);
                    const el = document.getElementById(link.sectionId);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-600/20 hover:text-red-400 text-slate-200 font-bold text-xs sm:text-sm transition-all border border-transparent hover:border-red-500/30"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-red-500 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-left">{link.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 space-y-2">
          <p className="font-bold text-slate-200">TELANGANA BOX OFFICE</p>
          <p className="text-[11px] text-slate-400">Authentic trade reports, Telugu movie reviews & box office tracking.</p>
        </div>
      </div>
    </div>
  );
}
