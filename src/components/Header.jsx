import React, { useState } from 'react';
import { Menu, Search, Bell, User, Sun, Moon, X, CheckCircle } from 'lucide-react';

export function Header({ onSearch, activeSearch, onOpenMenu, onLoginClick }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'Kalki 2898 AD hits ₹1100 Cr worldwide!', time: '10m ago' },
    { id: 2, text: 'Pushpa 3 official teaser confirmed for Diwali', time: '1h ago' },
    { id: 3, text: 'SSMB29 Kenya schedule first look leaked', time: '3h ago' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-3">
        
        {/* Left Side: Hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenMenu}
            className="p-2 text-slate-700 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo matching tbo.png */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative">
              <img 
                src="/tbo.png" 
                alt="TELANGANA BOX OFFICE Logo" 
                className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback stylized badge if logo image loading */}
              <div className="hidden flex-col items-start leading-none font-bold">
                <span className="text-navy-900 tracking-tighter text-xl font-display text-[#031738]">TELANGANA</span>
                <span className="text-red-600 tracking-tighter text-lg font-display italic">BOX OFFICE ★★★</span>
              </div>
            </div>
          </a>
        </div>

        {/* Center: Search Bar (Desktop View) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <div className="relative w-full">
            <input
              type="text"
              value={activeSearch}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search for movies, news, actors..."
              className="w-full pl-4 pr-10 py-2 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-900 rounded-full border border-slate-200 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all shadow-inner"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Right Side: Theme, Notifications, Login */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors hidden sm:flex"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-700 hover:text-red-600 hover:bg-slate-100 rounded-full transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Latest Alerts</h4>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {notifications.map((item) => (
                    <div key={item.id} className="py-2 px-1 hover:bg-slate-50 rounded text-xs transition-colors">
                      <p className="font-medium text-slate-800">{item.text}</p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Login / Register Button */}
          <button 
            onClick={onLoginClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all text-xs font-semibold shadow-sm"
          >
            <User className="w-4 h-4" />
            <span>Login / Register</span>
          </button>
        </div>
      </div>
    </header>
  );
}
