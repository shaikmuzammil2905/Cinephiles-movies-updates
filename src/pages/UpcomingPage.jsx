import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Search, Sparkles } from 'lucide-react';
import { upcomingReleases } from '../data/movieData';

export function UpcomingPage({ onSelectMovie }) {
  const [search, setSearch] = useState('');
  const [timers, setTimers] = useState(upcomingReleases);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((item) => {
          let mins = item.mins - 1;
          let hrs = item.hrs;
          let days = item.days;

          if (mins < 0) {
            mins = 59;
            hrs -= 1;
          }
          if (hrs < 0) {
            hrs = 23;
            days -= 1;
          }
          if (days < 0) days = 0;

          return { ...item, days, hrs, mins };
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const filtered = timers.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 space-y-6 animate-in fade-in">
      
      {/* Page Header */}
      <div className="bg-[#031738] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            THEATRICAL COUNTDOWN CALENDAR
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Upcoming Movie Releases & Countdowns
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Live ticking countdown timers for the most anticipated Indian & Hollywood blockbusters heading to theaters.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search upcoming movies..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 text-white placeholder:text-slate-400 text-xs sm:text-sm rounded-xl border border-slate-700 focus:border-red-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectMovie(item)}
            className="bg-white rounded-2xl border border-slate-200 hover:border-red-500/50 p-5 shadow-sm hover:shadow-xl transition-all group cursor-pointer flex gap-4"
          >
            <img
              src={item.poster}
              alt={item.title}
              className="w-28 h-40 object-cover rounded-xl shrink-0 border border-slate-200 group-hover:scale-105 transition-transform shadow-md"
            />

            <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-red-500" />
                  {item.releaseDate}
                </span>
              </div>

              {/* Countdown */}
              <div className="bg-red-50 p-2.5 rounded-xl border border-red-100">
                <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-wider block mb-1">Releasing In:</span>
                <div className="grid grid-cols-3 gap-1 text-center">
                  <div>
                    <span className="text-sm font-black text-slate-900 font-mono">{String(item.days).padStart(2, '0')}</span>
                    <span className="text-[9px] font-bold text-slate-500 block">DAYS</span>
                  </div>
                  <div>
                    <span className="text-sm font-black text-slate-900 font-mono">{String(item.hrs).padStart(2, '0')}</span>
                    <span className="text-[9px] font-bold text-slate-500 block">HRS</span>
                  </div>
                  <div>
                    <span className="text-sm font-black text-slate-900 font-mono">{String(item.mins).padStart(2, '0')}</span>
                    <span className="text-[9px] font-bold text-slate-500 block">MINS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
