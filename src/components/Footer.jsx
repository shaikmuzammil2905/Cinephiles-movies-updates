import React from 'react';
import { Film, Shield, Heart } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from './SocialIcons';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-900 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand info */}
        <div className="space-y-4 md:col-span-1">
          <a href="#" className="flex items-center gap-2">
            <img src="/tbo.png" alt="TELANGANA BOX OFFICE" className="h-10 w-auto object-contain" />
          </a>
          <p className="text-xs leading-relaxed text-slate-400">
            TELANGANA BOX OFFICE is your premier digital destination for authentic Indian cinema box office tracking, Tollywood 2nd week collections, reviews, trailer launches, and OTT platform updates.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#hero-section" className="hover:text-red-500 transition-colors">Home Top Story</a></li>
            <li><a href="#ott-section" className="hover:text-red-500 transition-colors">OTT Platform Releases</a></li>
            <li><a href="#news-section" className="hover:text-red-500 transition-colors">Latest Movie News</a></li>
            <li><a href="#boxoffice-section" className="hover:text-red-500 transition-colors">Box Office Reports</a></li>
            <li><a href="#reviews-section" className="hover:text-red-500 transition-colors">Latest Film Reviews</a></li>
            <li><a href="#trailers-section" className="hover:text-red-500 transition-colors">Movie Trailers</a></li>
          </ul>
        </div>

        {/* Trending Categories */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Categories
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-red-500 transition-colors">Tollywood Box Office</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Highest 2nd Week Collections</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Netflix & Prime Video Schedule</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Bollywood & Pan-India Movies</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Upcoming Movie Countdowns</a></li>
          </ul>
        </div>

        {/* Disclaimer & Copyright */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Trade & Media
          </h4>
          <p className="text-xs leading-relaxed text-slate-500">
            Box office numbers compiled from trade sources, distributors, and exhibitor networks. Figures are approximate estimates for informational purposes.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-900 text-[11px] text-slate-500">
            <p>Designed for Cinephiles & Movie Lovers.</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 TELANGANA BOX OFFICE (TBO). All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" /> for Indian Cinema
        </p>
      </div>
    </footer>
  );
}
