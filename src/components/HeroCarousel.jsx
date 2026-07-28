import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Eye } from 'lucide-react';
import { heroArticles, trendingNow } from '../data/movieData';

export function HeroCarousel({ onSelectArticle }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroArticles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = heroArticles[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroArticles.length) % heroArticles.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroArticles.length);
  };

  return (
    <section id="hero-section" className="py-4 bg-slate-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Hero Slider (Top Story) - 8 cols on Desktop */}
          <div className="lg:col-span-8 relative group rounded-2xl overflow-hidden shadow-xl bg-slate-900 aspect-[16/10] sm:aspect-[16/9] min-h-[300px] sm:min-h-[440px]">
            {/* Background Image with Gradient Overlay */}
            <img
              src={current.image}
              alt={current.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

            {/* Top Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
              <span className="bg-[#d90429] text-white text-[10px] sm:text-xs font-black tracking-wider uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded shadow-md">
                {current.badge}
              </span>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950/60 hover:bg-[#d90429] text-white flex items-center justify-center border border-white/20 transition-all shadow-lg active:scale-90"
              title="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950/60 hover:bg-[#d90429] text-white flex items-center justify-center border border-white/20 transition-all shadow-lg active:scale-90"
              title="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Slide Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 z-10 text-white space-y-2 sm:space-y-3">
              <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold leading-tight text-white drop-shadow-md line-clamp-2">
                {current.title}
              </h2>

              <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-sm text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                  {current.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                  {current.views}
                </span>
              </div>

              <div className="pt-1 sm:pt-2">
                <button
                  onClick={() => onSelectArticle(current)}
                  className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border-2 border-red-600 text-white font-bold text-xs sm:text-sm hover:bg-red-600 transition-all shadow-md active:scale-95"
                >
                  Read More
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                {heroArticles.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all ${
                      currentIndex === idx ? 'w-6 sm:w-8 bg-red-600' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Trending Now (Desktop 4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 tracking-wide uppercase flex items-center gap-2">
                <span className="w-1.5 h-4 bg-red-600 rounded"></span>
                TRENDING NOW
              </h3>
              <a href="#news-section" className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors">
                View All &gt;
              </a>
            </div>

            <div className="divide-y divide-slate-100 space-y-2 pt-2">
              {trendingNow.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectArticle({
                    title: item.title,
                    date: item.time,
                    views: '9.4K Views',
                    image: item.image,
                    summary: item.title,
                    content: `Full analysis and coverage for: ${item.title}. Released ${item.time}. Trade experts and fans are actively discussing this major industry news update.`
                  })}
                  className="pt-2.5 flex items-center gap-3 group cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                    {item.id}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">{item.time}</span>
                  </div>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-lg shrink-0 border border-slate-100 group-hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
