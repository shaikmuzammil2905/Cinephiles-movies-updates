import React, { useState } from 'react';
import { Play, Sparkles, Tv, CheckCircle2 } from 'lucide-react';
import { ottPlatforms, ottUpdates } from '../data/movieData';

export function OttSection({ onSelectMedia }) {
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const filteredUpdates = selectedPlatform === 'all'
    ? ottUpdates
    : ottUpdates.filter(item => item.platform === selectedPlatform);

  return (
    <section id="ott-section" className="py-6 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Section Title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-wide uppercase flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#d90429] rounded-full"></span>
            OTT UPDATES
          </h2>
          <button 
            onClick={() => setSelectedPlatform('all')}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
          >
            View All &gt;
          </button>
        </div>

        {/* OTT Platform Apps Bar matching image.png & image copy.png */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-3 mb-5">
          {ottPlatforms.map((platform) => {
            const isSelected = selectedPlatform === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex flex-col items-center justify-center p-3 min-w-[90px] sm:min-w-[110px] rounded-xl border transition-all duration-200 shadow-sm shrink-0 ${
                  isSelected
                    ? 'border-red-600 bg-red-50/80 ring-2 ring-red-600/30 scale-105'
                    : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                }`}
              >
                {/* Custom Stylized Logo / Badge */}
                <div 
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-md mb-1.5 ${
                    platform.badgeBg || 'bg-slate-800'
                  }`}
                  style={{ backgroundColor: platform.color }}
                >
                  {platform.id === 'all' ? (
                    <Sparkles className="w-5 h-5" />
                  ) : (
                    <span>{platform.logo}</span>
                  )}
                </div>
                <span className={`text-xs font-bold ${isSelected ? 'text-red-700' : 'text-slate-700'}`}>
                  {platform.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filtered OTT Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUpdates.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectMedia(item)}
              className="bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-red-500/50 p-3 flex gap-3 group cursor-pointer transition-all hover:shadow-lg"
            >
              <div className="relative w-24 h-32 rounded-lg overflow-hidden shrink-0 bg-slate-900 shadow">
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {item.platformName}
                    </span>
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{item.quality}</span>
                  <span className="font-semibold text-slate-700">{item.releaseDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
