import React, { useState } from 'react';
import { X, Award, Flame, Search, Trophy, TrendingUp } from 'lucide-react';
import { tollywoodSecondWeekRecords } from '../data/movieData';
import { AnimatedNumber } from './BoxOfficeSection';

export function TollywoodRecordsModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredRecords = tollywoodSecondWeekRecords.filter(item =>
    item.movie.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.hero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#031738] text-white p-3 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-2xl font-extrabold tracking-tight leading-tight">
                Highest 2nd Week Collections in Tollywood
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-300">
                Official Trade Analysis & Record Benchmark (TG/AP & Worldwide)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Search & Filter bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center justify-between">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search movie or actor..."
              className="w-full pl-9 pr-4 py-2 bg-white text-xs sm:text-sm text-slate-900 rounded-lg border border-slate-300 focus:border-red-600 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-600 font-medium">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 shrink-0" />
            <span>Updated with latest 2024-2025 Blockbusters</span>
          </div>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto overflow-y-auto p-2 sm:p-4 flex-1">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px] sm:min-w-0">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] sm:text-[11px] sticky top-0 z-10 shadow-xs">
              <tr>
                <th className="p-2 sm:p-3 text-center">Rank</th>
                <th className="p-2 sm:p-3">Movie & Hero</th>
                <th className="p-2 sm:p-3 text-right">TG/AP Share</th>
                <th className="p-2 sm:p-3 text-right">India Net</th>
                <th className="p-2 sm:p-3 text-right">Total WW</th>
                <th className="p-2 sm:p-3 text-center">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredRecords.map((item) => (
                <tr key={item.rank} className="hover:bg-red-50/50 transition-colors">
                  <td className="p-2 sm:p-3 text-center">
                    <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full font-black text-xs inline-flex items-center justify-center shadow-xs ${
                      item.rank === 1 ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300' :
                      item.rank === 2 ? 'bg-slate-300 text-slate-900' :
                      item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.rank}
                    </span>
                  </td>

                  <td className="p-2 sm:p-3">
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{item.movie}</h4>
                    <p className="text-[11px] text-slate-500">{item.hero} • Dir: {item.director} ({item.year})</p>
                  </td>

                  <td className="p-2 sm:p-3 text-right font-extrabold text-red-600 whitespace-nowrap text-xs sm:text-sm">
                    {item.tgapSecondWeekShare}
                  </td>

                  <td className="p-2 sm:p-3 text-right font-bold text-slate-800 whitespace-nowrap text-xs sm:text-sm">
                    {item.indiaNetSecondWeek}
                  </td>

                  <td className="p-2 sm:p-3 text-right font-bold text-slate-900 whitespace-nowrap text-xs sm:text-sm">
                    {item.totalWorldwide}
                  </td>

                  <td className="p-2 sm:p-3 text-center">
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      {item.verdict}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-[#031738] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors shadow"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
}
