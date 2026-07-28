import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { upcomingReleases } from '../data/movieData';

export function UpcomingReleases({ onSelectMovie }) {
  // Live ticking countdown logic
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
    }, 60000); // Ticks every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="upcoming-section" className="py-6 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-wide uppercase flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#d90429] rounded-full"></span>
            UPCOMING RELEASES
          </h2>
          <button className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
            View All &gt;
          </button>
        </div>

        {/* Carousel / Cards Grid matching screenshots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {timers.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectMovie && onSelectMovie(item)}
              className="bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-red-500/50 p-3 flex gap-3 group cursor-pointer transition-all hover:shadow-md"
            >
              <img
                src={item.poster}
                alt={item.title}
                className="w-20 h-28 object-cover rounded-lg shrink-0 border border-slate-200 group-hover:scale-105 transition-transform shadow-xs"
              />

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-red-500" />
                    {item.releaseDate}
                  </span>
                </div>

                {/* Countdown Timer Badge */}
                <div className="bg-slate-100 group-hover:bg-red-50 p-1.5 rounded-lg border border-slate-200 group-hover:border-red-200 transition-colors">
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div>
                      <span className="text-xs font-black text-slate-900 group-hover:text-red-700 font-mono">
                        {String(item.days).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">DAYS</span>
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-900 group-hover:text-red-700 font-mono">
                        {String(item.hrs).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">HRS</span>
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-900 group-hover:text-red-700 font-mono">
                        {String(item.mins).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">MINS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
