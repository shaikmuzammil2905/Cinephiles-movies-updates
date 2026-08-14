import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Film,
  ChevronDown,
  X,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

/**
 * ReviewsManager – Admin tab for managing Box Office Collection Reviews.
 * Lists all reviews, lets admin create/edit/delete/publish them.
 */
export function ReviewsManager({
  boxOfficeMovies = [],
  onAddNew,
  onEdit,
  onDelete,
  onTogglePublish,
  reviews = [],
  loading = false
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPublished, setFilterPublished] = useState('all');

  const filtered = reviews.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      r.review_title?.toLowerCase().includes(q) ||
      r.movie_title?.toLowerCase().includes(q) ||
      r.collection_type?.toLowerCase().includes(q);
    const matchesStatus =
      filterPublished === 'all' ||
      (filterPublished === 'published' && r.published) ||
      (filterPublished === 'draft' && !r.published);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" />
            Box Office Reviews
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage collection reviews linked to box office movies
          </p>
        </div>
        <button
          onClick={onAddNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-red-900/30 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by movie, collection type or review title..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/60 transition"
          />
        </div>
        <select
          value={filterPublished}
          onChange={(e) => setFilterPublished(e.target.value)}
          className="px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/40 cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-white">{reviews.length}</p>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Total</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-emerald-400">{reviews.filter((r) => r.published).length}</p>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Published</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-amber-400">{reviews.filter((r) => !r.published).length}</p>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Drafts</p>
        </div>
      </div>

      {/* Reviews Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16 gap-3 text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading reviews...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-500">
          <BookOpen className="w-10 h-10 opacity-40" />
          <p className="text-sm font-semibold">
            {reviews.length === 0 ? 'No reviews yet. Add the first review.' : 'No results match your search.'}
          </p>
          {reviews.length === 0 && (
            <button
              onClick={onAddNew}
              className="mt-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              + Add First Review
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((review) => (
            <div
              key={review.id}
              className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-slate-600 transition"
            >
              {/* Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      review.published
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {review.published ? <Eye className="w-2.5 h-2.5" /> : <EyeOff className="w-2.5 h-2.5" />}
                    {review.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 uppercase tracking-wide">
                    <Film className="w-2.5 h-2.5" />
                    {review.movie_title}
                  </span>
                </div>
                <p className="text-sm font-bold text-white truncate">{review.review_title}</p>
                <p className="text-[11px] text-slate-400 truncate">
                  Collection: <span className="text-slate-300 font-semibold">{review.collection_type}</span>
                  {review.author && (
                    <> &bull; By <span className="text-slate-300">{review.author}</span></>
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onTogglePublish(review)}
                  title={review.published ? 'Unpublish' : 'Publish'}
                  className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    review.published
                      ? 'bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 border border-amber-500/30'
                      : 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30'
                  }`}
                >
                  {review.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => onEdit(review)}
                  title="Edit Review"
                  className="p-2 rounded-xl bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 border border-blue-500/30 transition cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete(review)}
                  title="Delete Review"
                  className="p-2 rounded-xl bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/30 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
