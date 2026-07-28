import React from 'react';
import { Clock, Eye, Newspaper } from 'lucide-react';
import { movieNews } from '../data/movieData';

export function NewsSection({ onSelectArticle }) {
  const { featured, list } = movieNews;

  return (
    <div id="news-section" className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-wide uppercase flex items-center gap-2">
          <span className="w-1.5 h-5 bg-[#d90429] rounded-full"></span>
          LATEST MOVIE NEWS
        </h2>
        <button 
          onClick={() => onSelectArticle(featured)}
          className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
        >
          View All &gt;
        </button>
      </div>

      {/* Featured Big News Card */}
      <div 
        onClick={() => onSelectArticle(featured)}
        className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-[#d90429] text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded shadow">
              {featured.category}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
            {featured.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {featured.time}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {featured.views}
            </span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {featured.summary}
          </p>
        </div>
      </div>

      {/* List items below featured */}
      <div className="space-y-3 pt-1">
        {list.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectArticle({
              ...item,
              date: item.time,
              content: `${item.summary}\n\nExclusive details: Production team confirms that key creative discussions have concluded with optimistic timelines. Stay tuned to Telangana Box Office for live updates.`
            })}
            className="bg-white p-2.5 rounded-xl border border-slate-200 hover:border-red-500/50 flex gap-3 group cursor-pointer transition-all hover:shadow-sm"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-16 object-cover rounded-lg shrink-0 border border-slate-100 group-hover:scale-105 transition-transform"
            />
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>{item.time}</span>
                <span>•</span>
                <span>{item.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
