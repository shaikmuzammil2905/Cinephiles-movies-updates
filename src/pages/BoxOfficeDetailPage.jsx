import React, { useEffect } from 'react';
import { ArrowLeft, TrendingUp, Calendar, DollarSign, Award, Tv, ShieldAlert, BarChart2 } from 'lucide-react';
import { AnimatedNumber } from '../components/BoxOfficeSection';

export function BoxOfficeDetailPage({ movieId, updates = [], onBack }) {
  // Find box office movie by ID or slug
  const movieRecord = (updates || []).find(
    (u) =>
      u.category === 'Box Office' &&
      (String(u.id) === String(movieId) || String(u.slug) === String(movieId) || String(u.title).toLowerCase() === String(movieId).toLowerCase())
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [movieId]);

  if (!movieRecord) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <BarChart2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Movie Box Office Details Not Found</h2>
        <p className="text-sm text-slate-600">The requested Box Office movie record is not available or has been removed.</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d90429] text-white text-sm font-bold rounded-xl shadow-md hover:bg-red-700 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Box Office</span>
        </button>
      </div>
    );
  }

  const extra = movieRecord.extra_data || {};
  const isManualOverride = extra.manual_override === true || extra.manual_override === 'true';

  // Extract collection numbers safely (Only display non-empty values!)
  const openingCollection = extra.openingCollection || extra.opening;
  const day1Collection = extra.day1Collection || extra.day1;
  const weekendCollection = extra.weekendCollection || extra.weekend;
  const indiaNetCollection = extra.indiaNet || extra.india_net;
  const overseasCollection = extra.overseasCollection || extra.overseas;
  const worldwideCollection = extra.worldwide || extra.worldwide_gross;
  const totalCollection = isManualOverride && extra.manual_collection ? extra.manual_collection : extra.totalCollection || extra.total;

  const budget = extra.budget;
  const verdict = extra.verdict;
  const releaseDate = extra.releaseDate || extra.release_date;
  const screens = extra.screens;

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8 space-y-6 animate-in fade-in">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-red-600 transition bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 text-red-600" />
        <span>Back to Box Office</span>
      </button>

      {/* Main Header Banner */}
      <div className="bg-[#031738] text-white rounded-2xl p-5 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center md:items-start gap-6">
        {movieRecord.featured_image_url && (
          <img
            src={movieRecord.featured_image_url}
            alt={movieRecord.title}
            className="w-32 h-44 sm:w-40 sm:h-56 object-cover rounded-xl border-2 border-slate-700 shadow-2xl shrink-0"
          />
        )}

        <div className="space-y-3 text-center md:text-left flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            BOX OFFICE VERIFIED REPORT
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
            {movieRecord.title}
          </h1>

          {releaseDate && (
            <p className="text-xs sm:text-sm text-slate-300 flex items-center justify-center md:justify-start gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-red-400" />
              <span>Release Date: {releaseDate}</span>
            </p>
          )}

          {verdict && (
            <div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                Verdict: {verdict}
              </span>
            </div>
          )}

          {isManualOverride && extra.manual_collection && (
            <div className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold px-2.5 py-0.5 rounded-md">
              Manual Collection Override Active
            </div>
          )}
        </div>
      </div>

      {/* Key Box Office Breakdown Table/Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 uppercase flex items-center gap-2 border-b border-slate-100 pb-3">
          <span className="w-1.5 h-5 bg-[#d90429] rounded-full"></span>
          OFFICIAL COLLECTION BREAKDOWN
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {openingCollection && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase">Opening Collection</span>
              <p className="text-xl font-extrabold text-slate-900 mt-1">₹{openingCollection}</p>
            </div>
          )}

          {day1Collection && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase">Day 1 Collection</span>
              <p className="text-xl font-extrabold text-slate-900 mt-1">₹{day1Collection}</p>
            </div>
          )}

          {weekendCollection && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase">Weekend Collection</span>
              <p className="text-xl font-extrabold text-slate-900 mt-1">₹{weekendCollection}</p>
            </div>
          )}

          {indiaNetCollection && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase">India Net Collection</span>
              <p className="text-xl font-extrabold text-slate-900 mt-1">₹{indiaNetCollection}</p>
            </div>
          )}

          {overseasCollection && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase">Overseas Collection</span>
              <p className="text-xl font-extrabold text-slate-900 mt-1">₹{overseasCollection}</p>
            </div>
          )}

          {worldwideCollection && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <span className="text-xs font-semibold text-red-600 uppercase">Worldwide Gross</span>
              <p className="text-xl font-black text-red-600 mt-1">₹{worldwideCollection}</p>
            </div>
          )}

          {totalCollection && (
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 col-span-1 sm:col-span-2 md:col-span-3">
              <span className="text-xs font-bold text-amber-800 uppercase">Total Collection Benchmark</span>
              <p className="text-2xl font-black text-amber-900 mt-1">₹{totalCollection}</p>
            </div>
          )}
        </div>

        {/* Additional Info Cards if Budget or Screens provided */}
        {(budget || screens) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            {budget && (
              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <DollarSign className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">Production Budget</span>
                  <span className="text-sm font-extrabold text-slate-800">₹{budget}</span>
                </div>
              </div>
            )}

            {screens && (
              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <Tv className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">Screen Count</span>
                  <span className="text-sm font-extrabold text-slate-800">{screens} Screens</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notes / Description */}
        {movieRecord.content && (
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase">Trade Analysis Notes</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {movieRecord.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
