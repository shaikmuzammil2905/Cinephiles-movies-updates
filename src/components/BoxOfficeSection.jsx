import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, BarChart3, ChevronRight } from 'lucide-react';
import { boxOfficeSummary, tollywoodSecondWeekRecords } from '../data/movieData';

// Helper component for animated number counting (typing effect)
export function AnimatedNumber({ value, prefix = '₹', suffix = ' Cr' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if (isNaN(end)) return;

    const duration = 1200; // ms
    const increment = end / (duration / 20);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start * 10) / 10);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-extrabold font-mono tracking-tight text-slate-900">
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export function BoxOfficeSection({ onOpenTollywoodRecords }) {
  return (
    <div id="boxoffice-section" className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-wide uppercase flex items-center gap-2">
          <span className="w-1.5 h-5 bg-[#d90429] rounded-full"></span>
          BOX OFFICE REPORT
        </h2>
        <button 
          onClick={onOpenTollywoodRecords}
          className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
        >
          View All &gt;
        </button>
      </div>

      {/* Table matching image.png & image copy.png */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead className="bg-[#031738] text-white font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
              <tr>
                <th scope="col" className="px-2 py-2.5 sm:px-3 sm:py-2.5 text-center">#</th>
                <th scope="col" className="px-2 py-2.5 sm:px-3 sm:py-2.5">Movie</th>
                <th scope="col" className="px-2 py-2.5 sm:px-3 sm:py-2.5 text-right">India Net</th>
                <th scope="col" className="px-2 py-2.5 sm:px-3 sm:py-2.5 text-right">Worldwide</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-xs sm:text-sm">
              {boxOfficeSummary.map((item) => (
                <tr key={item.rank} className="hover:bg-slate-50 transition-colors">
                  <td className="px-2 py-2 sm:px-3 sm:py-2.5 font-bold text-slate-700 text-center">{item.rank}</td>
                  <td className="px-2 py-2 sm:px-3 sm:py-2.5 font-bold text-slate-900 flex items-center gap-2">
                    <img 
                      src={item.poster} 
                      alt={item.movie} 
                      className="w-6 h-8 object-cover rounded shadow-xs hidden sm:block" 
                    />
                    <span className="truncate max-w-[120px] sm:max-w-none">{item.movie}</span>
                  </td>
                  <td className="px-2 py-2 sm:px-3 sm:py-2.5 text-right text-slate-700 font-semibold whitespace-nowrap text-[11px] sm:text-xs md:text-sm">
                    <AnimatedNumber value={item.indiaNet} />
                  </td>
                  <td className="px-2 py-2 sm:px-3 sm:py-2.5 text-right text-red-600 font-bold whitespace-nowrap text-[11px] sm:text-xs md:text-sm">
                    <AnimatedNumber value={item.worldwide} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Full Box Office Report Button */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-center">
          <button
            onClick={onOpenTollywoodRecords}
            className="w-full sm:w-auto px-5 py-2 rounded-lg border border-red-500 text-red-600 font-bold text-xs sm:text-sm hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Full Box Office Report (Tollywood 2nd Week Records)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
