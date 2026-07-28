import React from 'react';
import { X, Calendar, Eye, Share2, ThumbsUp, MessageSquare } from 'lucide-react';

export function ArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] my-auto">
        
        {/* Top Header */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-950 overflow-hidden shrink-0">
          <img
            src={article.image || article.poster}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950/70 text-white hover:bg-red-600 flex items-center justify-center transition-colors shadow-lg"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
            <span className="bg-[#d90429] text-white text-[9px] sm:text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded shadow mb-1.5 inline-block">
              {article.badge || article.category || 'FEATURED STORY'}
            </span>
            <h2 className="text-base sm:text-2xl font-extrabold leading-tight line-clamp-2">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Article Meta */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1 text-[11px] sm:text-xs">
              <Calendar className="w-3.5 h-3.5 text-red-500" />
              {article.date || article.time || 'Today'}
            </span>
            <span className="flex items-center gap-1 text-[11px] sm:text-xs">
              <Eye className="w-3.5 h-3.5 text-red-500" />
              {article.views || '10.5K Views'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors shadow-xs">
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line flex-1">
          <p className="font-bold text-slate-900 text-xs sm:text-base border-l-4 border-red-600 pl-3 italic bg-red-50/50 py-2 rounded-r-md">
            {article.summary || article.title}
          </p>

          <div className="text-slate-700 space-y-3">
            {article.content || `TELANGANA BOX OFFICE reports that this project is gaining immense traction across trade networks and movie lovers. With positive word of mouth, numbers are surging across multiplexes and single screen theaters globally.\n\nStay connected with Telangana Box Office for more real-time box office breakdowns, news, and official statements.`}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-bold text-slate-600">
            <button className="flex items-center gap-1 sm:gap-1.5 hover:text-red-600 transition-colors">
              <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
              <span>Like (1.4K)</span>
            </button>
            <button className="flex items-center gap-1 sm:gap-1.5 hover:text-red-600 transition-colors">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
              <span>Comments (38)</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 sm:px-5 py-1.5 bg-[#031738] hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors shadow"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
