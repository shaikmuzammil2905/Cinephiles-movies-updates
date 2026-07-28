import React, { useState } from 'react';
import { Newspaper, Search, Eye, Clock, Calendar, ArrowRight } from 'lucide-react';
import { movieNews, heroArticles } from '../data/movieData';

export function MovieNewsPage({ onSelectArticle }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'TOLLYWOOD', 'BOLLYWOOD', 'PAN-INDIA', 'EXCLUSIVE', 'BOX OFFICE'];

  const allNews = [
    heroArticles[0],
    heroArticles[1],
    heroArticles[2],
    movieNews.featured,
    ...movieNews.list
  ];

  const filtered = allNews.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          (item.summary && item.summary.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 space-y-6 animate-in fade-in">
      
      {/* Page Title Header */}
      <div className="bg-[#031738] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-wider mb-2">
            <Newspaper className="w-4 h-4" />
            24/7 MOVIE NEWS DESK
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Latest Movie News & Filmy Leaks
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Real-time updates, shooting spot photos, official announcements, and breaking trade news from Tollywood, Bollywood, and Hollywood.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movie news..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 text-white placeholder:text-slate-400 text-xs sm:text-sm rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl font-black text-xs transition-all shrink-0 ${
              activeCategory === cat
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectArticle(item)}
            className="bg-white rounded-2xl border border-slate-200 hover:border-red-500/50 overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                <img
                  src={item.image || item.poster}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#d90429] text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded shadow">
                  {item.badge || item.category || 'NEWS'}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {item.date || item.time}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    {item.views || '8.5K views'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-red-600 group-hover:text-red-700">
                Read Full Story <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
