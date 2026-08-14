import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  Calendar,
  User,
  BookOpen,
  Image as ImageIcon,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

/**
 * CollectionReviewPage – Public page showing the review content for a specific
 * box office movie + collection type.
 *
 * Props:
 *   review  – the review object from Supabase (or null if not found)
 *   movieTitle – string, name of the movie
 *   collectionType – string, e.g. "Nizam Closing Collection"
 *   onBack – function to go back to the movie detail page
 */
export function CollectionReviewPage({ review, movieTitle, collectionType, onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [review]);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8 space-y-6 animate-in fade-in">
      {/* Breadcrumb / Back */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-red-600 transition bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4 text-red-600" />
          <span>Back to {movieTitle || 'Movie'}</span>
        </button>

        {/* Breadcrumb trail */}
        <div className="flex items-center gap-1 text-xs text-slate-500 flex-wrap">
          <span>Box Office</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 font-semibold">{movieTitle}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 font-semibold">{collectionType}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-red-600 font-bold">Review</span>
        </div>
      </div>

      {/* No Review State */}
      {!review ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg font-extrabold text-slate-800">Review Not Available Yet</h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              A review for <strong>{movieTitle}</strong> – <strong>{collectionType}</strong> has not been published yet.
              Check back soon for the full collection review.
            </p>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d90429] text-white text-sm font-bold rounded-xl shadow-md hover:bg-red-700 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Movie Details
          </button>
        </div>
      ) : (
        <>
          {/* Review Hero Banner */}
          <div className="bg-[#031738] text-white rounded-2xl p-5 sm:p-8 shadow-xl border border-slate-800">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-white" />
                  COLLECTION REVIEW
                </span>
                <span className="inline-flex items-center gap-1.5 bg-blue-600/30 text-blue-300 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border border-blue-500/30 uppercase tracking-wide">
                  {collectionType}
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
                {review.review_title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                {review.author && (
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-red-400" />
                    {review.author}
                  </span>
                )}
                {(review.published_at || review.created_at) && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-red-400" />
                    {formatDate(review.published_at || review.created_at)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 uppercase flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-1.5 h-5 bg-[#d90429] rounded-full" />
              <BookOpen className="w-4 h-4 text-red-600" />
              REVIEW CONTENT
            </h2>

            {/* Review Text – paragraphs split by double newline */}
            <div className="prose prose-slate max-w-none">
              {review.review_content
                .split(/\n\n+/)
                .filter((p) => p.trim())
                .map((para, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4 last:mb-0 whitespace-pre-line"
                  >
                    {para.trim()}
                  </p>
                ))}
            </div>
          </div>

          {/* Review Images Gallery */}
          {review.images && review.images.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 uppercase flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-1.5 h-5 bg-[#d90429] rounded-full" />
                <ImageIcon className="w-4 h-4 text-red-600" />
                REVIEW IMAGES
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {review.images.map((img, idx) => {
                  const url = typeof img === 'string' ? img : img?.url;
                  if (!url) return null;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100"
                    >
                      <img
                        src={url}
                        alt={`Review image ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Disclaimer note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 leading-relaxed">
            <strong>Note:</strong> This review is based on available trade sources, theatre reports, and publicly available data. Figures may differ from officially reported numbers.
          </div>
        </>
      )}
    </div>
  );
}
