import React from 'react';
import { Play, Clock, Eye } from 'lucide-react';
import { latestTrailers } from '../data/movieData';

export function TrailersSection({ onPlayTrailer }) {
  return (
    <section id="trailers-section" className="py-6 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-wide uppercase flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#d90429] rounded-full"></span>
            LATEST TRAILERS
          </h2>
          <button 
            onClick={() => onPlayTrailer(latestTrailers[0])}
            className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            View All &gt;
          </button>
        </div>

        {/* Trailers Grid matching image copy.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {latestTrailers.map((trailer) => (
            <div
              key={trailer.id}
              onClick={() => onPlayTrailer(trailer)}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-red-500/50 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                <img
                  src={trailer.thumbnail}
                  alt={trailer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-slate-950/80 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded shadow">
                  {trailer.duration}
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-90 group-hover:opacity-100 group-hover:bg-slate-950/20 transition-all flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-red-600 group-hover:scale-110 text-white flex items-center justify-center shadow-xl transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {trailer.title}
                </h3>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-2">
                  <span>{trailer.time}</span>
                  <span>|</span>
                  <span>{trailer.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
