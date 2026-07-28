import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { latestReviews } from '../data/movieData';

export function ReviewsSection({ onSelectReview }) {
  return (
    <div id="reviews-section" className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-wide uppercase flex items-center gap-2">
          <span className="w-1.5 h-5 bg-[#d90429] rounded-full"></span>
          LATEST REVIEWS
        </h2>
        <button 
          onClick={() => onSelectReview(latestReviews[0])}
          className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
        >
          View All &gt;
        </button>
      </div>

      {/* Review List matching mobile & desktop screenshots */}
      <div className="space-y-3">
        {latestReviews.map((review) => (
          <div
            key={review.id}
            onClick={() => onSelectReview(review)}
            className="bg-white p-3 rounded-xl border border-slate-200 hover:border-red-500/50 flex items-center justify-between gap-3 group cursor-pointer transition-all hover:shadow-sm"
          >
            <div className="flex items-center gap-3 min-w-0">
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
            <div className="bg-[#d90429] text-white font-extrabold text-xs px-2.5 py-1 rounded flex items-center gap-1 shadow-sm shrink-0">
              <span>{review.rating}</span>
              <Star className="w-3 h-3 fill-white text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
