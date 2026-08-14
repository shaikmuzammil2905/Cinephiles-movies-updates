import React, { useState } from 'react';
import { X, Award, Flame, Search, Trophy, TrendingUp, BarChart3 } from 'lucide-react';
import { AnimatedNumber } from './BoxOfficeSection';

export function TollywoodRecordsModal({ isOpen, onClose, updates = [], onSelectMovie }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const adminRecords = (Array.isArray(updates) ? updates : [])
    .filter((u) => u && typeof u === 'object' && u.status === 'published' && u.category === 'Box Office')
    .map((item, idx) => {
      const extra = item.extra_data || {};
      const isManual = extra.manual_override === true || extra.manual_override === 'true';
      const worldwideVal = isManual && extra.manual_collection
        ? extra.manual_collection
        : (extra.worldwide || extra.gross || extra.totalCollection || '');
      const indiaNetVal = extra.indiaNet || extra.india_net || '';
      const weekendVal = extra.weekendCollection || extra.tgapSecondWeekShare || '-';

      return {
        id: item.id || item.slug,
        rank: item.extra_data?.rank || idx + 1,
        movie: item.title,
        hero: extra.cast || extra.hero || 'Tollywood Star',
        director: extra.director || 'Director',
        year: extra.releaseDate || '2025',
        tgapSecondWeekShare: weekendVal,
        indiaNetSecondWeek: indiaNetVal,
        totalWorldwide: worldwideVal,
        verdict: extra.verdict || 'Published'
      };
    });

  const filteredRecords = adminRecords.filter((item) => {
    if (!item) return false;
    const movieStr = String(item.movie || '').toLowerCase();
    const heroStr = String(item.hero || '').toLowerCase();
    const searchStr = String(searchTerm || '').toLowerCase();
    return movieStr.includes(searchStr) || heroStr.includes(searchStr);
  });

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
                Highest Box Office Records in Tollywood
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-300">
                Live Supabase Admin Report & Record Benchmark
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
            <span>Live CMS Box Office Data</span>
          </div>
        </div>

        {/* Records Table or Empty State */}
        <div className="overflow-x-auto overflow-y-auto p-2 sm:p-4 flex-1">
          {adminRecords.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <BarChart3 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Box Office Data Available</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No Box Office movies have been published yet. Movies uploaded in the Admin panel will appear here dynamically.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px] sm:min-w-0">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] sm:text-[11px] sticky top-0 z-10 shadow-xs">
                <tr>
                  <th className="p-2 sm:p-3 text-center">Rank</th>
                  <th className="p-2 sm:p-3">Movie & Details</th>
                  <th className="p-2 sm:p-3 text-right">Weekend / Share</th>
                  <th className="p-2 sm:p-3 text-right">India Net</th>
                  <th className="p-2 sm:p-3 text-right">Total WW</th>
                  <th className="p-2 sm:p-3 text-center">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredRecords.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      if (onSelectMovie) {
                        onSelectMovie(item.id);
                        onClose();
                      }
                    }}
                    className="hover:bg-red-50/50 transition-colors cursor-pointer"
                  >
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
                      <p className="text-[11px] text-slate-500">{item.hero}</p>
                    </td>

                    <td className="p-2 sm:p-3 text-right font-extrabold text-red-600 whitespace-nowrap text-xs sm:text-sm">
                      {item.tgapSecondWeekShare}
                    </td>

                    <td className="p-2 sm:p-3 text-right font-bold text-slate-800 whitespace-nowrap text-xs sm:text-sm">
                      {item.indiaNetSecondWeek ? <AnimatedNumber value={item.indiaNetSecondWeek} /> : '-'}
                    </td>

                    <td className="p-2 sm:p-3 text-right font-bold text-slate-900 whitespace-nowrap text-xs sm:text-sm">
                      {item.totalWorldwide ? <AnimatedNumber value={item.totalWorldwide} /> : '-'}
                    </td>

                    <td className="p-2 sm:p-3 text-center">
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap uppercase">
                        {item.verdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-[#031738] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors shadow cursor-pointer"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
}

