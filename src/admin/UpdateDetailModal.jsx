import React from 'react';
import { X, Calendar, Tag, User, Eye, Edit3, Trash2, Globe, FileText, CheckCircle, Clock } from 'lucide-react';

export function UpdateDetailModal({ update, isOpen, onClose, onEdit, onDelete }) {
  if (!isOpen || !update) return null;

  const extra = update.extra_data || {};

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl my-8 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase rounded-lg">
              {update.category || 'Movie News'}
            </span>
            <span
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border flex items-center gap-1 ${
                update.status === 'published'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                  : 'bg-amber-950/80 text-amber-300 border-amber-800'
              }`}
            >
              {update.status === 'published' ? (
                <>
                  <CheckCircle className="w-3 h-3" /> Published
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3" /> Draft
                </>
              )}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* Featured Image */}
          {update.featured_image_url && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 max-h-80 bg-slate-950">
              <img
                src={update.featured_image_url}
                alt={update.title}
                className="w-full h-full object-cover max-h-80"
              />
            </div>
          )}

          {/* Title & Metadata */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {update.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-y border-slate-800/80 py-3">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-red-400" />
                <span>{update.author || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-red-400" />
                <span>{new Date(update.published_at || update.created_at).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
              </div>
              {update.slug && (
                <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>/{update.slug}</span>
                </div>
              )}
            </div>
          </div>

          {/* Category Extra Details if present */}
          {(extra.rating || extra.platformName || extra.youtubeId || extra.releaseDate || extra.director) && (
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {extra.rating && (
                <div>
                  <span className="text-slate-400 block">Rating:</span>
                  <span className="text-amber-400 font-bold text-sm">★ {extra.rating} / 5.0</span>
                </div>
              )}
              {extra.director && (
                <div>
                  <span className="text-slate-400 block">Director:</span>
                  <span className="text-slate-200 font-semibold">{extra.director}</span>
                </div>
              )}
              {extra.cast && (
                <div>
                  <span className="text-slate-400 block">Cast:</span>
                  <span className="text-slate-200 font-semibold">{extra.cast}</span>
                </div>
              )}
              {extra.platformName && (
                <div>
                  <span className="text-slate-400 block">OTT Platform:</span>
                  <span className="text-red-400 font-bold">{extra.platformName}</span>
                </div>
              )}
              {extra.quality && (
                <div>
                  <span className="text-slate-400 block">Quality / Format:</span>
                  <span className="text-slate-200 font-semibold">{extra.quality}</span>
                </div>
              )}
              {extra.youtubeId && (
                <div>
                  <span className="text-slate-400 block">YouTube ID:</span>
                  <span className="text-blue-400 font-mono">{extra.youtubeId}</span>
                </div>
              )}
              {extra.releaseDate && (
                <div>
                  <span className="text-slate-400 block">Release Date:</span>
                  <span className="text-emerald-400 font-semibold">{extra.releaseDate}</span>
                </div>
              )}
            </div>
          )}

          {/* Short Description */}
          {update.short_description && (
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Short Description</span>
              <p className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 italic">
                "{update.short_description}"
              </p>
            </div>
          )}

          {/* Full Article Content */}
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-red-400" />
              Article Content
            </span>
            <div
              className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm leading-relaxed text-slate-200 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: update.content || update.short_description }}
            />
          </div>

          {/* Tags */}
          {update.tags && (
            <div className="flex items-center gap-2 pt-2 text-xs">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <div className="flex flex-wrap gap-1.5">
                {update.tags.split(',').map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md">
                    #{t.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition cursor-pointer"
          >
            Back to Updates
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(update);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-400" /> Edit Update
            </button>
            <button
              onClick={() => {
                onClose();
                onDelete(update);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-red-900/30"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
