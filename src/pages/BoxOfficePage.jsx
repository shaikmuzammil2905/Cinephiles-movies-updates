import React, { useState } from 'react';
import { BarChart3, Trophy, TrendingUp, Search, Award, Flame } from 'lucide-react';
import { boxOfficeSummary, tollywoodSecondWeekRecords } from '../data/movieData';
import { AnimatedNumber } from '../components/BoxOfficeSection';

export function BoxOfficePage({ onOpenTollywoodRecords }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' or 'tollywood2ndWeek'

  const filteredRecords = tollywoodSecondWeekRecords.filter(item =>
    item.movie.toLowerCase().includes(search.toLowerCase()) ||
    item.hero.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 space-y-6 animate-in fade-in">
      
      {/* Page Header */}
      <div className="bg-[#031738] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-wider mb-2">
            <BarChart3 className="w-4 h-4" />
            TRADE ANALYTICS & COLLECTION TRACKER
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Telangana & Worldwide Box Office Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Verified box office figures, India Net collections, gross earnings, and all-time Tollywood 2nd week collection benchmarks.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movie collections..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 text-white placeholder:text-slate-400 text-xs sm:text-sm rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
            activeTab === 'summary'
              ? 'bg-[#031738] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-red-500" />
          <span>Latest Box Office Report</span>
        </button>

        <button
          onClick={() => setActiveTab('tollywood2ndWeek')}
          className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
            activeTab === 'tollywood2ndWeek'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-300" />
          <span>Highest 2nd Week Collections in Tollywood (Full List)</span>
        </button>
      </div>

      {activeTab === 'summary' ? (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Top Grosser 2024-2025</span>
              <h3 className="text-xl font-black text-slate-900">Pushpa 2: The Rule</h3>
              <p className="text-2xl font-black text-red-600 font-mono">₹1,500+ Cr</p>
              <span className="text-[11px] text-emerald-600 font-bold">All-Time Worldwide Benchmark</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Fastest ₹1100 Cr</span>
              <h3 className="text-xl font-black text-slate-900">Kalki 2898 AD</h3>
              <p className="text-2xl font-black text-red-600 font-mono">₹1,100 Cr</p>
              <span className="text-[11px] text-blue-600 font-bold">10 Days Global Run</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Telangana / AP Share</span>
              <h3 className="text-xl font-black text-slate-900">Baahubali 2</h3>
              <p className="text-2xl font-black text-red-600 font-mono">₹68.40 Cr</p>
              <span className="text-[11px] text-amber-600 font-bold">Highest 2nd Week Share</span>
            </div>
          </div>

          {/* Full Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            <div className="p-4 bg-slate-900 text-white font-extrabold text-sm uppercase tracking-wider flex justify-between items-center">
              <span>Current India Net & Worldwide Box Office Table</span>
              <span className="text-xs text-red-400 font-medium">Live Trade Data</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="p-3 text-center">#</th>
                    <th className="p-3">Movie Name</th>
                    <th className="p-3 text-right">India Net</th>
                    <th className="p-3 text-right">Worldwide Gross</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {boxOfficeSummary.map((item) => (
                    <tr key={item.rank} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 text-center font-bold text-slate-700">{item.rank}</td>
                      <td className="p-3 font-extrabold text-slate-900 flex items-center gap-3">
                        <img src={item.poster} alt={item.movie} className="w-8 h-10 object-cover rounded shadow-xs" />
                        <span>{item.movie}</span>
                      </td>
                      <td className="p-3 text-right font-bold text-slate-800">
                        <AnimatedNumber value={item.indiaNet} />
                      </td>
                      <td className="p-3 text-right font-extrabold text-red-600">
                        <AnimatedNumber value={item.worldwide} />
                      </td>
                      <td className="p-3 text-center">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          BLOCKBUSTER
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Tollywood 2nd Week Full List */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden space-y-4 p-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Highest 2nd Week Collections in Tollywood (TG/AP & Worldwide)
              </h3>
              <p className="text-xs text-slate-500">
                Reference record database matching official trade reports.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#031738] text-white font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3 text-center">Rank</th>
                  <th className="p-3">Movie & Lead Actor</th>
                  <th className="p-3 text-right">TG/AP 2nd Wk Share</th>
                  <th className="p-3 text-right">India Net 2nd Wk</th>
                  <th className="p-3 text-right">Total Worldwide</th>
                  <th className="p-3 text-center">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredRecords.map((item) => (
                  <tr key={item.rank} className="hover:bg-red-50/50 transition-colors">
                    <td className="p-3 text-center">
                      <span className={`w-7 h-7 rounded-full font-black text-xs inline-flex items-center justify-center shadow-xs ${
                        item.rank === 1 ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300' :
                        item.rank === 2 ? 'bg-slate-300 text-slate-900' :
                        item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.rank}
                      </span>
                    </td>
                    <td className="p-3">
                      <h4 className="font-extrabold text-slate-900 text-sm">{item.movie}</h4>
                      <p className="text-xs text-slate-500">{item.hero} • Dir: {item.director} ({item.year})</p>
                    </td>
                    <td className="p-3 text-right font-extrabold text-red-600">
                      {item.tgapSecondWeekShare}
                    </td>
                    <td className="p-3 text-right font-bold text-slate-800">
                      {item.indiaNetSecondWeek}
                    </td>
                    <td className="p-3 text-right font-bold text-slate-900">
                      {item.totalWorldwide}
                    </td>
                    <td className="p-3 text-center">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
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
  );
}
