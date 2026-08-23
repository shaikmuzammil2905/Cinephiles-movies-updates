import React from 'react';
import { Star, ChevronRight } from 'lucide-react';

export function ReviewsSection({ updates = [], onSelectReview }) {
  const adminReviews = (Array.isArray(updates) ? updates : [])
    .filter((u) => u && typeof u === 'object' && u.status === 'published' && u.category === 'Reviews')
    .map((item) => ({
      id: item.id || item.slug,
      title: item.title,
      rating: item.extra_data?.rating || '',
      director: item.extra_data?.director || '',
      cast: item.extra_data?.cast || '',
      verdict: item.extra_data?.verdict || '',
      poster: item.featured_image_url || '',
      summary: item.short_description || item.title || '',
      content: item.content || item.short_description || ''
    }));

  const activeReviews = adminReviews;

  return (
    <div id="reviews-section" className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-wide uppercase flex items-center gap-2">
          <span className="w-1.5 h-5 bg-[#d90429] rounded-full"></span>
          LATEST REVIEWS
        </h2>
        <button 
          onClick={() => onSelectReview(activeReviews[0])}
          className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
        >
          View All &gt;
        </button>
      </div>

      {/* Review List or Empty State */}
      {activeReviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Star className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No Reviews Available</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Film reviews and verdicts will appear here live once published from the admin panel.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activeReviews.map((review) => (
          <div
            key={review.id}
            onClick={() => onSelectReview(review)}
            className="bg-white p-3 rounded-xl border border-slate-200 hover:border-red-500/50 flex items-center justify-between gap-3 group cursor-pointer transition-all hover:shadow-sm relative overflow-hidden"
          >
            {/* Subtle Brand Logo Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5 group-hover:opacity-10 transition-opacity z-0 overflow-hidden">
              <img
                src="/tbo_logo.png"
                alt=""
                className="w-36 max-w-[65%] object-contain filter grayscale transform -rotate-12"
              />
            </div>

            <div className="flex items-center gap-3 min-w-0 relative z-10">
              <img
                src={review.poster}
                alt={review.title}
                className="w-12 h-16 object-cover rounded-lg shrink-0 border border-slate-100 group-hover:scale-105 transition-transform shadow-xs"
              />
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                  {review.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectReview(review);
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline mt-1 block"
                >
                  Read Review
                </button>
              </div>
            </div>

            {/* Red Star Rating Badge */}
            <div className="bg-[#d90429] text-white font-extrabold text-xs px-2.5 py-1 rounded flex items-center gap-1 shadow-sm shrink-0 relative z-10">
              <span>{review.rating}</span>
              <Star className="w-3 h-3 fill-white text-white" />
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
