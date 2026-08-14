import React, { useEffect } from 'react';
import { ArrowLeft, Clock, Eye, User, Share2, Tag, Calendar, Sparkles } from 'lucide-react';
import { formatDate } from '../lib/dateUtils';

export function ArticleDetailPage({ articleId, updates = [], onBack, onNavigateArticle }) {
  // Find article by ID or slug
  const article = (updates || []).find(
    (u) => String(u.id) === String(articleId) || String(u.slug) === String(articleId)
  );

  // Scroll to top when page opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [articleId]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <Tag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Article Not Found</h2>
        <p className="text-sm text-slate-600">The requested news post may have been removed or updated.</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d90429] text-white text-sm font-bold rounded-xl shadow-md hover:bg-red-700 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>
    );
  }

  const formattedDate = formatDate(
    article.published_at || article.created_at,
    { month: 'long', day: 'numeric', year: 'numeric' },
    'Recently Published'
  );

  // Get related articles in same or other categories
  const relatedArticles = (updates || [])
    .filter((u) => u.status === 'published' && u.id !== article.id && u.slug !== article.slug)
    .slice(0, 3);

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.short_description || article.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8 space-y-6 animate-in fade-in">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-red-600 transition bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-red-600" />
          <span>Back</span>
        </button>

        <button
          onClick={shareArticle}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-red-600 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs transition cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-red-600" />
          <span>Share</span>
        </button>
      </div>

      {/* Main Header */}
      <div className="space-y-4 bg-white p-4 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#d90429] text-white text-[11px] font-black uppercase px-3 py-1 rounded-md shadow-xs tracking-wider">
            {article.category || 'Movie News'}
          </span>
          {article.tags && (
            <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-0.5 rounded-md border border-slate-200">
              {article.tags}
            </span>
          )}
        </div>

        <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.short_description && (
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed italic border-l-4 border-red-500 pl-3">
            {article.short_description}
          </p>
        )}

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <User className="w-3.5 h-3.5 text-red-600" />
            <span>{article.author || 'Admin'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{formattedDate}</span>
          </div>
          {article.extra_data?.views && (
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.extra_data.views}</span>
            </div>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {article.featured_image_url && (
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 aspect-[16/9] sm:aspect-[21/9] relative">
          <img
            src={article.featured_image_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Full Article Content */}
      <div className="bg-white p-5 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
          {article.content ? (
            article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p>{article.short_description || article.title}</p>
          )}
        </div>

        {/* Extra data details if review/OTT/trailer */}
        {article.category === 'Reviews' && article.extra_data && (
          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
            <h4 className="font-extrabold text-amber-900 text-sm uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Review Summary
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Rating:</span>
                <span className="font-bold text-amber-700 text-sm">{article.extra_data.rating || '4.0'} / 5.0</span>
              </div>
              <div>
                <span className="text-slate-500 block">Director:</span>
                <span className="font-bold text-slate-800">{article.extra_data.director || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Cast:</span>
                <span className="font-bold text-slate-800">{article.extra_data.cast || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Verdict:</span>
                <span className="font-bold text-emerald-700 uppercase">{article.extra_data.verdict || 'Must Watch'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Posts Section */}
      {relatedArticles.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-extrabold text-slate-900 uppercase flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#d90429] rounded-full"></span>
            RELATED NEWS & STORIES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id || rel.slug}
                onClick={() => onNavigateArticle && onNavigateArticle(rel.id || rel.slug)}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-red-500 shadow-xs hover:shadow-md transition-all cursor-pointer group p-3 space-y-2"
              >
                {rel.featured_image_url && (
                  <img
                    src={rel.featured_image_url}
                    alt={rel.title}
                    className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                )}
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {rel.title}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {formatDate(rel.published_at || rel.created_at, { month: 'short', day: 'numeric' }, 'Recent')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
