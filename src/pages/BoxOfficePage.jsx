import React, { useState } from 'react';
import { BarChart3, Trophy, TrendingUp, Search, Award, Flame } from 'lucide-react';
import { tollywoodSecondWeekRecords } from '../data/movieData';
import { AnimatedNumber } from '../components/BoxOfficeSection';

export function BoxOfficePage({ updates = [], onOpenTollywoodRecords }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' or 'tollywood2ndWeek'

  const adminBoxOffice = (Array.isArray(updates) ? updates : [])
    .filter((u) => {
      if (!u || typeof u !== 'object' || u.status !== 'published') return false;
      const cat = String(u.category || '').toLowerCase().trim();
      return cat === 'box office' || cat === 'box-office';
    })
    .map((item, idx) => {
      const extra = item.extra_data || {};
      const isManual = extra.manual_override === true || extra.manual_override === 'true';
      const worldwideVal = isManual && extra.manual_collection
        ? extra.manual_collection
        : (extra.worldwide || extra.gross || extra.totalCollection || '');
      const indiaNetVal = extra.indiaNet || extra.india_net || '';

      return {
        id: item.id || item.slug || item.title,
        rank: item.extra_data?.rank || idx + 1,
        movie: item.title,
        indiaNet: indiaNetVal,
        worldwide: worldwideVal,
        verdict: extra.verdict || 'Published',
        poster: item.featured_image_url || '/kalki.png'
      };
    });

  const activeBoxOffice = adminBoxOffice;

  const filteredRecords = (tollywoodSecondWeekRecords || []).filter((item) => {
    if (!item) return false;
    const movieStr = String(item.movie || '').toLowerCase();
    const heroStr = String(item.hero || '').toLowerCase();
    const searchStr = String(search || '').toLowerCase();
    return movieStr.includes(searchStr) || heroStr.includes(searchStr);
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6 animate-in fade-in">
      
      {/* Page Header */}
      <div className="bg-[#031738] text-white rounded-2xl p-4 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            TRADE ANALYTICS & COLLECTION TRACKER
          </div>
          <h1 className="text-xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Telangana & Worldwide Box Office Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Verified box office figures, India Net collections, gross earnings, and all-time Tollywood collection benchmarks.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movie collections..."
            className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-slate-900 text-white placeholder:text-slate-400 text-xs sm:text-sm rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 sm:gap-3 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
            activeTab === 'summary'
              ? 'bg-[#031738] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
          <span>Latest Box Office Report</span>
        </button>

        <button
          onClick={() => setActiveTab('tollywood2ndWeek')}
          className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
            activeTab === 'tollywood2ndWeek'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
          <span>Highest 2nd Week Collections (Tollywood)</span>
        </button>
      </div>

      {activeTab === 'summary' ? (
        <div className="space-y-6">
          {activeBoxOffice.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Box Office Data Available</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                No Box Office movies have been published yet. Added movies will appear here dynamically.
              </p>
            </div>
          ) : (
            /* Full Table */
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
              <div className="p-4 bg-slate-900 text-white font-extrabold text-sm uppercase tracking-wider flex justify-between items-center">
                <span>Current India Net & Worldwide Box Office Table</span>
                <span className="text-xs text-red-400 font-medium">Live Supabase Data</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
                    <tr>
                      <th className="p-3 text-center">#</th>
                      <th className="p-3">Movie Name</th>
                      <th className="p-3 text-right">India Net</th>
                      <th className="p-3 text-right">Worldwide Gross</th>
                      <th className="p-3 text-center">Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {activeBoxOffice.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => onSelectMovie && onSelectMovie(item.id)}
                        className="hover:bg-slate-50 transition-colors cursor-pointer group"
                      >
                        <td className="p-3 text-center font-bold text-slate-700">{item.rank}</td>
                        <td className="p-3 font-extrabold text-slate-900 group-hover:text-red-600 transition-colors flex items-center gap-3">
                          <img src={item.poster} alt={item.movie} className="w-8 h-10 object-cover rounded shadow-xs group-hover:scale-105 transition-transform" />
                          <span>{item.movie}</span>
                        </td>
                        <td className="p-3 text-right font-bold text-slate-800">
                          {item.indiaNet ? <AnimatedNumber value={item.indiaNet} /> : <span className="text-slate-400 font-normal">-</span>}
                        </td>
                        <td className="p-3 text-right font-extrabold text-red-600">
                          {item.worldwide ? <AnimatedNumber value={item.worldwide} /> : <span className="text-slate-400 font-normal">-</span>}
                        </td>
                        <td className="p-3 text-center">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                            {item.verdict}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Tollywood 2nd Week Full List */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden space-y-4 p-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Highest Collections in Tollywood (TG/AP & Worldwide)
              </h3>
              <p className="text-xs text-slate-500">
                Official CMS records uploaded from Admin Panel.
              </p>
            </div>
          </div>

          {activeBoxOffice.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <BarChart3 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Box Office Data Available</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No Box Office movies have been published yet. Movies uploaded in the Admin panel will appear here dynamically.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#031738] text-white font-bold uppercase text-[11px]">
                  <tr>
                    <th className="p-3 text-center">Rank</th>
                    <th className="p-3">Movie Name</th>
                    <th className="p-3 text-right">India Net</th>
                    <th className="p-3 text-right">Total Worldwide</th>
                    <th className="p-3 text-center">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {activeBoxOffice.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => onSelectMovie && onSelectMovie(item.id)}
                      className="hover:bg-red-50/50 transition-colors cursor-pointer group"
                    >
                      <td className="p-3 text-center">
                        <span className={`w-7 h-7 rounded-full font-black text-xs inline-flex items-center justify-center shadow-xs ${
                          item.rank === 1 ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300' :
                          item.rank === 2 ? 'bg-slate-300 text-slate-900' :
                          item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {item.rank}
                        </span>
                      </td>
                      <td className="p-3 font-extrabold text-slate-900 flex items-center gap-3">
                        <img src={item.poster} alt={item.movie} className="w-8 h-10 object-cover rounded shadow-xs group-hover:scale-105 transition-transform" />
                        <span>{item.movie}</span>
                      </td>
                      <td className="p-3 text-right font-bold text-slate-800">
                        {item.indiaNet ? <AnimatedNumber value={item.indiaNet} /> : <span className="text-slate-400 font-normal">-</span>}
                      </td>
                      <td className="p-3 text-right font-extrabold text-red-600">
                        {item.worldwide ? <AnimatedNumber value={item.worldwide} /> : <span className="text-slate-400 font-normal">-</span>}
                      </td>
                      <td className="p-3 text-center">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap uppercase">
                          {item.verdict}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
