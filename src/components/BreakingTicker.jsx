import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from './SocialIcons';

export function BreakingTicker({ updates = [], onSelectArticle }) {
  const publishedUpdates = Array.isArray(updates) ? updates.filter(u => u && typeof u === 'object' && u.status === 'published') : [];

  return (
    <div className="bg-slate-100 border-b border-slate-200 py-1.5 px-2.5 sm:px-6 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Left: Breaking News Badge & Marquee */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden flex-1 min-w-0">
          <div className="bg-[#d90429] text-white text-[10px] sm:text-[11px] font-extrabold uppercase px-2 sm:px-2.5 py-1 rounded shadow flex items-center gap-1 sm:gap-1.5 shrink-0 whitespace-nowrap">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-ping"></span>
            BREAKING NEWS
          </div>

          <div className="overflow-hidden relative w-full min-w-0 text-xs font-medium text-slate-800">
            <div className="animate-ticker space-x-6 sm:space-x-8">
              {publishedUpdates.length > 0 ? (
                publishedUpdates.slice(0, 10).map((u, idx) => (
                  <span
                    key={u.id || u.slug || idx}
                    onClick={() => onSelectArticle && onSelectArticle(u)}
                    className="inline-flex items-center gap-2 cursor-pointer hover:text-red-600 font-semibold transition-colors"
                  >
                    <span>🔥 {u.title}</span>
                    <span className="text-red-500 font-bold">•</span>
                  </span>
                ))
              ) : (
                <span className="inline-flex items-center gap-2 text-slate-600">
                  🎬 Welcome to Telangana Box Office - Live Cinema & Trade News Desk
                </span>
              )}
              {publishedUpdates.length > 0 && publishedUpdates.slice(0, 10).map((u, idx) => (
                <span
                  key={`dup-${u.id || u.slug || idx}`}
                  onClick={() => onSelectArticle && onSelectArticle(u)}
                  className="inline-flex items-center gap-2 cursor-pointer hover:text-red-600 font-semibold transition-colors"
                >
                  <span>🔥 {u.title}</span>
                  <span className="text-red-500 font-bold">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Follow Us Social Icons */}
        <div className="hidden lg:flex items-center gap-3 text-xs text-slate-600 shrink-0">
          <span className="font-bold text-slate-800">Follow Us:</span>
          <div className="flex items-center gap-2">
            <a href="#" className="p-1 hover:text-blue-600 transition-colors" title="Facebook"><FacebookIcon className="w-3.5 h-3.5" /></a>
            <a href="https://www.instagram.com/telangana_boxoffice?utm_source=qr&igsi=MTR3cjE0azh2NHE5dg==" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-pink-600 transition-colors" title="Instagram"><InstagramIcon className="w-3.5 h-3.5" /></a>
            <a href="https://x.com/Telangana_BO" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-sky-500 transition-colors" title="X (Twitter)"><TwitterIcon className="w-3.5 h-3.5" /></a>
            <a href="#" className="p-1 hover:text-red-600 transition-colors" title="YouTube"><YoutubeIcon className="w-3.5 h-3.5" /></a>
          </div>
        </div>

      </div>
    </div>
  );
}

