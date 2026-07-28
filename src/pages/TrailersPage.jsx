import React, { useState } from 'react';
import { Film, Play, Search, Clock, Eye } from 'lucide-react';
import { latestTrailers } from '../data/movieData';

export function TrailersPage({ onPlayTrailer }) {
  const [search, setSearch] = useState('');

  const filtered = latestTrailers.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 space-y-6 animate-in fade-in">
      
      {/* Page Header */}
      <div className="bg-[#031738] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-wider mb-2">
            <Film className="w-4 h-4" />
            HD VIDEO TRAILERS & TEASERS
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Official Movie Trailers & Teasers Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Watch official 4K trailers, first look glimpses, motion posters, and song videos for all major upcoming releases.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movie trailers..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 text-white placeholder:text-slate-400 text-xs sm:text-sm rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((trailer) => (
          <div
            key={trailer.id}
            onClick={() => onPlayTrailer(trailer)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-red-500/50 shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
              <img
                src={trailer.thumbnail}
                alt={trailer.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />

              <div className="absolute bottom-2 right-2 bg-slate-950/80 text-white font-mono text-xs font-bold px-2 py-0.5 rounded">
                {trailer.duration}
              </div>

              <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-all flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600 group-hover:scale-110 text-white flex items-center justify-center shadow-xl transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                {trailer.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span>{trailer.time}</span>
                <span>•</span>
                <span>{trailer.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
