import React, { useState } from 'react';
import { Sparkles, Play, Search, Calendar, Tv } from 'lucide-react';
import { ottPlatforms, ottUpdates } from '../data/movieData';

export function OttPage({ onSelectMedia }) {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = ottUpdates.filter((item) => {
    const matchesPlatform = selectedPlatform === 'all' || item.platform === selectedPlatform;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 space-y-6 animate-in fade-in">
      
      {/* Page Title Header */}
      <div className="bg-[#031738] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-wider mb-2">
            <Tv className="w-4 h-4" />
            DIGITAL PREMIERES
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            OTT Platform Releases & Stream Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Track official streaming dates, 4K HDR releases, and exclusive digital premieres across Netflix, Prime Video, JioHotstar, Sony LIV, aha & ZEE5.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search OTT releases..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 text-white placeholder:text-slate-400 text-xs sm:text-sm rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Platform Selector Grid */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        {ottPlatforms.map((platform) => {
          const isSelected = selectedPlatform === platform.id;
          return (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all border shrink-0 shadow-sm ${
                isSelected
                  ? 'bg-red-600 text-white border-red-500 shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="w-6 h-6 rounded flex items-center justify-center text-xs text-white" style={{ backgroundColor: platform.color }}>
                {platform.id === 'all' ? <Sparkles className="w-3.5 h-3.5" /> : platform.logo}
              </span>
              <span>{platform.name}</span>
            </button>
          );
        })}
      </div>

      {/* OTT Cards Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectMedia(item)}
            className="bg-white rounded-2xl border border-slate-200 hover:border-red-500/50 p-4 shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] sm:aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-900">
              <img
                src={item.poster}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
              <span className="absolute top-3 left-3 bg-slate-950/80 text-white text-xs font-black px-3 py-1 rounded shadow">
                {item.platformName}
              </span>
              <span className="absolute bottom-3 right-3 bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded shadow">
                {item.status}
              </span>
            </div>

            <div className="space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{item.quality}</span>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-red-500" />
                  {item.releaseDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
