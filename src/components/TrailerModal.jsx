import React from 'react';
import { X, Play, Share2, ThumbsUp } from 'lucide-react';

export function TrailerModal({ trailer, onClose }) {
  if (!trailer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 text-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
            <h3 className="font-extrabold text-sm sm:text-base text-white line-clamp-1">
              {trailer.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-[16/9] bg-black w-full overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${trailer.youtubeId || 'dQw4w9WgXcQ'}?autoplay=1`}
            title={trailer.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Info & Meta */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-950 border-t border-slate-800">
          <div>
            <span className="text-xs text-red-500 font-bold uppercase tracking-wider">OFFICIAL HD TRAILER</span>
            <h4 className="text-base font-extrabold text-white mt-0.5">{trailer.title}</h4>
            <span className="text-xs text-slate-400 mt-1 block">
              {trailer.time || 'Recently Uploaded'} • {trailer.views || '1M+ Views'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow">
              <ThumbsUp className="w-4 h-4" />
              <span>Like</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg transition-colors"
            >
              Close Player
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
