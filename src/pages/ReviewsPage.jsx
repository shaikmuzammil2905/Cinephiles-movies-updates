import React, { useState } from 'react';
import { Star, Search, Filter, CheckCircle } from 'lucide-react';
import { latestReviews } from '../data/movieData';

export function ReviewsPage({ onSelectReview }) {
  const [search, setSearch] = useState('');
  const [minRating, setMinRating] = useState(0);

  const filtered = latestReviews.filter((item) => {
    const ratingVal = parseFloat(item.rating);
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.director.toLowerCase().includes(search.toLowerCase()) ||
                          item.cast.toLowerCase().includes(search.toLowerCase());
    return ratingVal >= minRating && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 space-y-6 animate-in fade-in">
      
      {/* Page Title Header */}
      <div className="bg-[#031738] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-wider mb-2">
            <Star className="w-4 h-4 fill-white" />
            CRITICS & USER REVIEWS
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Movie Reviews & Rating Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            In-depth film analysis, rating breakdown, performance highlights, verdict, and technical review for all new theatrical and OTT releases.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movie reviews..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 text-white placeholder:text-slate-400 text-xs sm:text-sm rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Rating Filters */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter by Rating:
        </span>
        {[0, 3.0, 3.5, 4.0].map((star) => (
          <button
            key={star}
            onClick={() => setMinRating(star)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1 ${
              minRating === star
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{star === 0 ? 'All Ratings' : `${star}+ Stars`}</span>
            {star > 0 && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
          </button>
        ))}
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectReview(item)}
            className="bg-white rounded-2xl border border-slate-200 hover:border-red-500/50 p-5 shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col sm:flex-row gap-5"
          >
            <div className="relative w-full sm:w-40 aspect-[2/3] rounded-xl overflow-hidden bg-slate-900 shrink-0 shadow-md">
              <img
                src={item.poster}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded shadow flex items-center gap-1">
                <span>{item.rating}</span>
                <Star className="w-3 h-3 fill-white text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  {item.verdict}
                </span>

                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-red-600 transition-colors mt-1.5">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Director: {item.director}
                </p>
                <p className="text-xs text-slate-400 line-clamp-1">
                  Cast: {item.cast}
                </p>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectReview(item);
                  }}
                  className="text-xs font-black text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Read Detailed Review &gt;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
