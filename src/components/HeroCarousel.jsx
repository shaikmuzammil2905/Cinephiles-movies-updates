import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Eye } from 'lucide-react';
import { formatDate } from '../lib/dateUtils';

export function HeroCarousel({ updates = [], onSelectArticle }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Transform published admin updates for Hero Slider (prefer "Top Story", fallback to any published update)
  const publishedUpdates = (Array.isArray(updates) ? updates : []).filter(
    (u) => u && typeof u === 'object' && u.status === 'published'
  );
  const topStoryUpdates = publishedUpdates.filter((u) => u.category === 'Top Story');
  const pool = topStoryUpdates.length > 0 ? topStoryUpdates : publishedUpdates;

  const adminHeroArticles = pool.map((item, idx) => ({
    id: item.id || item.slug || `hero-${idx}`,
    slug: item.slug || item.id || `hero-${idx}`,
    badge: item.extra_data?.badge || item.category || '',
    movieTag: item.extra_data?.movieTag || (item.tags ? item.tags.split(',')[0] : ''),
    actor: item.extra_data?.actor || '',
    title: item.title || '',
    date: formatDate(item.published_at || item.created_at, { month: 'short', day: 'numeric', year: 'numeric' }, ''),
    views: item.extra_data?.views || '',
    image: item.featured_image_url || '',
    poster: item.featured_image_url || '',
    summary: item.short_description || item.title || '',
    content: item.content || item.short_description || ''
  }));

  const activeHeroArticles = adminHeroArticles;

  // Transform published admin updates for Trending Sidebar
  const activeTrending = publishedUpdates
    .slice(0, 5)
    .map((item, idx) => ({
      id: item.id || item.slug || idx + 1,
      slug: item.slug || item.id,
      title: item.title || 'Movie Update',
      time: formatDate(item.published_at || item.created_at, { month: 'short', day: 'numeric' }, 'Just now'),
      image: item.featured_image_url || '',
      summary: item.short_description || item.title || '',
      content: item.content || item.short_description || ''
    }));

  useEffect(() => {
    if (!activeHeroArticles || activeHeroArticles.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeHeroArticles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeHeroArticles.length]);

  if (activeHeroArticles.length === 0) {
    return (
      <section id="hero-section" className="py-4 bg-slate-50">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6">
          <div className="bg-[#031738] text-white rounded-2xl p-6 sm:p-10 text-center space-y-3 shadow-xl border border-slate-800">
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">Welcome to Telangana Box Office</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Real-time updates, box office reports, and cinema news will appear here once published from the admin panel.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const current = activeHeroArticles[currentIndex] || activeHeroArticles[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeHeroArticles.length) % activeHeroArticles.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeHeroArticles.length);
  };

  return (
    <section id="hero-section" className="py-2 sm:py-4 bg-slate-50">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          
          {/* Main Hero Slider (Top Story) - 8 cols on Desktop */}
          <div className="lg:col-span-8 relative group rounded-xl sm:rounded-2xl overflow-hidden shadow-lg bg-slate-900 h-[220px] xs:h-[250px] sm:h-[360px] md:h-[400px] lg:h-auto lg:min-h-[440px]">
            {/* Background Image with Gradient Overlay */}
            <img
              src={current.image}
              alt={current.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

            {/* Top Badge */}
            <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10">
              <span className="bg-[#d90429] text-white text-[9px] sm:text-xs font-black tracking-wider uppercase px-2 sm:px-3 py-0.5 sm:py-1 rounded shadow-md">
                {current.badge}
              </span>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-slate-950/60 hover:bg-[#d90429] text-white flex items-center justify-center border border-white/20 transition-all shadow-lg active:scale-90"
              title="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-slate-950/60 hover:bg-[#d90429] text-white flex items-center justify-center border border-white/20 transition-all shadow-lg active:scale-90"
              title="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            {/* Slide Content */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:p-8 z-10 text-white space-y-1.5 sm:space-y-3">
              <h2 className="text-sm xs:text-base sm:text-2xl md:text-3xl font-extrabold leading-tight text-white drop-shadow-md line-clamp-2">
                {current.title}
              </h2>

              <div className="flex items-center gap-2.5 sm:gap-4 text-[10px] sm:text-sm text-slate-300">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                  {current.date}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                  {current.views}
                </span>
              </div>

              <div className="pt-0.5 sm:pt-2 flex items-center justify-between">
                <a
                  href={`/news/${current.id || current.slug || ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                      e.preventDefault();
                      onSelectArticle && onSelectArticle(current);
                    }
                  }}
                  className="px-3.5 sm:px-5 py-1 sm:py-2 rounded-full bg-red-600 text-white font-bold text-[11px] sm:text-sm hover:bg-red-700 transition-all shadow-md active:scale-95 border border-red-500 inline-flex items-center justify-center cursor-pointer"
                >
                  Read More
                </a>

                {/* Dots Indicator */}
                <div className="flex items-center gap-1 sm:gap-2">
                  {activeHeroArticles.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 sm:h-2 rounded-full transition-all ${
                        currentIndex === idx ? 'w-5 sm:w-8 bg-red-600' : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
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
              {activeTrending.map((item, idx) => (
                <div
                  key={item.id || idx}
                  onClick={() => onSelectArticle({
                    title: item.title,
                    date: item.time,
                    views: '9.4K Views',
                    image: item.image,
                    summary: item.summary || item.title,
                    content: item.content || `Full analysis and coverage for: ${item.title}. Released ${item.time}.`
                  })}
                  className="pt-2.5 flex items-center gap-3 group cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                    {idx + 1}
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
