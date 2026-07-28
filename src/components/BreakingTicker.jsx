import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from './SocialIcons';

export function BreakingTicker() {
  const newsTickerList = [
    '🔥 Kalki 2898 AD crosses ₹1100 Cr worldwide in just 10 days',
    '⚡ Pushpa 2: The Rule box office collections hit ₹1500 Crore milestone',
    '🎬 SSMB29 shooting officially begins in Kenya with SS Rajamouli & Mahesh Babu',
    '💥 Pawan Kalyan OG climax shoot completed with massive vintage weapons',
    '⭐ Sitaare Zameen Par official trailer released, fans praise Aamir Khan'
  ];

  return (
    <div className="bg-slate-100 border-b border-slate-200 py-1.5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Breaking News Badge & Marquee */}
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <div className="bg-[#d90429] text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded shadow flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            BREAKING NEWS
          </div>

          <div className="overflow-hidden relative w-full text-xs font-medium text-slate-800">
            <div className="animate-ticker space-x-8">
              {newsTickerList.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 cursor-pointer hover:text-red-600 transition-colors">
                  <span>{item}</span>
                  <span className="text-red-500 font-bold">•</span>
                </span>
              ))}
              {newsTickerList.map((item, idx) => (
                <span key={`dup-${idx}`} className="inline-flex items-center gap-2 cursor-pointer hover:text-red-600 transition-colors">
                  <span>{item}</span>
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
            <a href="#" className="p-1 hover:text-pink-600 transition-colors" title="Instagram"><InstagramIcon className="w-3.5 h-3.5" /></a>
            <a href="#" className="p-1 hover:text-sky-500 transition-colors" title="X (Twitter)"><TwitterIcon className="w-3.5 h-3.5" /></a>
            <a href="#" className="p-1 hover:text-red-600 transition-colors" title="YouTube"><YoutubeIcon className="w-3.5 h-3.5" /></a>
          </div>
        </div>

      </div>
    </div>
  );
}
