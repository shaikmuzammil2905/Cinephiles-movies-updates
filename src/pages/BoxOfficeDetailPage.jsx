import React, { useEffect, useState } from 'react';
import { ArrowLeft, TrendingUp, Calendar, DollarSign, Award, Tv, ShieldAlert, BarChart2, Star, ChevronRight, BookOpen, Loader2 } from 'lucide-react';
import { AnimatedNumber } from '../components/BoxOfficeSection';
import { CollectionReviewPage } from './CollectionReviewPage';
import { supabase } from '../lib/supabaseClient';
import { renderFormattedContent } from '../lib/contentUtils';

export function BoxOfficeDetailPage({ movieId, updates = [], onBack, onNavigateCategory }) {
  const cleanId = String(movieId || '').toLowerCase().trim();
  const decodedId = decodeURIComponent(cleanId);

  // Find box office movie by ID, slug, or title (case-insensitive & URL decoded)
  let movieRecord = (updates || []).find((u) => {
    if (!u) return false;
    const uid = String(u.id || '').toLowerCase().trim();
    const uslug = String(u.slug || '').toLowerCase().trim();
    const utitle = String(u.title || '').toLowerCase().trim();
    const cat = String(u.category || '').toLowerCase().trim();

    const isBoxOfficeCat = cat === 'box office' || cat === 'box-office';
    const matchesId = uid === cleanId || uslug === cleanId || utitle === cleanId ||
                      uid === decodedId || uslug === decodedId || utitle === decodedId;

    return (isBoxOfficeCat && matchesId) || matchesId;
  });

  // Fallback: search by title substring if exact match failed
  if (!movieRecord && cleanId) {
    movieRecord = (updates || []).find((u) => {
      if (!u) return false;
      const utitle = String(u.title || '').toLowerCase().trim();
      return utitle.includes(cleanId) || cleanId.includes(utitle);
    });
  }

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [activeReview, setActiveReview] = useState(null); // { collectionType, reviewData|null }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [movieId]);

  // Fetch published reviews for this movie from Supabase
  useEffect(() => {
    if (!movieRecord?.id) return;
    const fetchReviews = async () => {
      setLoadingReviews(true);
      try {
        const { data, error } = await supabase
          .from('movie_reviews')
          .select('*')
          .eq('movie_id', movieRecord.id)
          .eq('published', true)
          .order('created_at', { ascending: false });
        if (!error && data) {
          setReviews(data);
        }
      } catch (err) {
        // silently handle – reviews are optional
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, [movieRecord?.id]);

  // Handle clicking a collection type label → find its review
  const handleCollectionClick = (collectionType) => {
    const found = reviews.find(
      (r) => r.collection_type?.toLowerCase() === collectionType?.toLowerCase()
    );
    setActiveReview({ collectionType, reviewData: found || null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Sub-page: Review Detail ---
  if (activeReview) {
    return (
      <CollectionReviewPage
        review={activeReview.reviewData}
        movieTitle={movieRecord?.title}
        collectionType={activeReview.collectionType}
        onBack={() => {
          setActiveReview(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

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

  // Collection rows that can have reviews – filter to only visible ones
  const collectionRows = [
    openingCollection && { label: 'Opening Collection', value: openingCollection },
    day1Collection && { label: 'Day 1 Collection', value: day1Collection },
    weekendCollection && { label: 'Weekend Collection', value: weekendCollection },
    indiaNetCollection && { label: 'India Net Collection', value: indiaNetCollection },
    overseasCollection && { label: 'Overseas Collection', value: overseasCollection },
    worldwideCollection && { label: 'Worldwide Gross', value: worldwideCollection },
    totalCollection && { label: 'Total Collection', value: totalCollection },
  ].filter(Boolean);

  // Also add any collection types that have published reviews but aren't in above list
  const reviewOnlyCollections = reviews
    .filter((r) => !collectionRows.some((c) => c.label.toLowerCase() === r.collection_type.toLowerCase()))
    .map((r) => ({ label: r.collection_type, value: null, reviewOnly: true }));

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8 space-y-6 animate-in fade-in">
      {/* Top Action Bar & Category Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-red-600 transition bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4 text-red-600" />
          <span>Back to Box Office</span>
        </button>

        {/* Quick Category Switcher */}
        <div className="bg-[#031738] p-1.5 rounded-xl shadow-md border border-slate-800 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2 shrink-0 hidden md:inline">Switch Section:</span>
          {[
            { id: 'home', label: 'Home' },
            { id: 'news', label: 'Breaking News' },
            { id: 'ott', label: 'OTT Updates' },
            { id: 'boxoffice', label: 'Box Office' },
            { id: 'reviews', label: 'Reviews' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigateCategory && onNavigateCategory(cat.id)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800/90 hover:bg-red-600 text-slate-200 hover:text-white transition whitespace-nowrap shrink-0 border border-slate-700/60 cursor-pointer"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

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
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {renderFormattedContent(movieRecord.content)}
            </div>
          </div>
        )}
      </div>

      {/* ===== COLLECTION REVIEWS SECTION ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-5">
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 uppercase flex items-center gap-2 border-b border-slate-100 pb-3">
          <span className="w-1.5 h-5 bg-[#d90429] rounded-full" />
          <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          COLLECTION REVIEWS
        </h2>

        {loadingReviews ? (
          <div className="flex items-center gap-2 text-slate-500 py-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading reviews...</span>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-500">
              Click on a collection type below to read the full review published by our trade team.
            </p>

            <div className="space-y-2">
              {/* Collection rows with review button */}
              {collectionRows.map((row) => {
                const hasReview = reviews.some(
                  (r) => r.collection_type?.toLowerCase() === row.label?.toLowerCase()
                );
                return (
                  <button
                    key={row.label}
                    onClick={() => handleCollectionClick(row.label)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition text-left group cursor-pointer ${
                      hasReview
                        ? 'bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-400'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {hasReview ? (
                        <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className={`text-sm font-bold truncate ${hasReview ? 'text-red-700' : 'text-slate-700'}`}>
                          {row.label}
                        </p>
                        {hasReview && (
                          <p className="text-[11px] text-red-500 font-semibold">Review Available – Click to Read</p>
                        )}
                        {!hasReview && (
                          <p className="text-[11px] text-slate-400">Review not available yet</p>
                        )}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${hasReview ? 'text-red-500' : 'text-slate-400'}`} />
                  </button>
                );
              })}

              {/* Review-only collections (reviews that don't match any collection card) */}
              {reviewOnlyCollections.map((row) => (
                <button
                  key={row.label}
                  onClick={() => handleCollectionClick(row.label)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-400 transition text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-red-700 truncate">{row.label}</p>
                      <p className="text-[11px] text-red-500 font-semibold">Review Available – Click to Read</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-500 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}

              {collectionRows.length === 0 && reviewOnlyCollections.length === 0 && (
                <div className="py-6 text-center text-sm text-slate-400">
                  No collection data available for this movie.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
