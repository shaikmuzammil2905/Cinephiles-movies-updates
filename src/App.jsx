import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { BreakingTicker } from './components/BreakingTicker';
import { HeroCarousel } from './components/HeroCarousel';
import { OttSection } from './components/OttSection';
import { NewsSection } from './components/NewsSection';
import { BoxOfficeSection } from './components/BoxOfficeSection';
import { ReviewsSection } from './components/ReviewsSection';
import { UpcomingReleases } from './components/UpcomingReleases';
import { TrailersSection } from './components/TrailersSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';

import { ArticleModal } from './components/ArticleModal';
import { TrailerModal } from './components/TrailerModal';
import { TollywoodRecordsModal } from './components/TollywoodRecordsModal';
import { LoginModal } from './components/LoginModal';
import { SidebarDrawer } from './components/SidebarDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [showTollywoodRecords, setShowTollywoodRecords] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        activeSearch={searchQuery}
        onSearch={setSearchQuery}
        onOpenMenu={() => setShowSidebar(true)}
        onLoginClick={() => setShowLoginModal(true)}
      />

      {/* Red Category Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Breaking News Ticker */}
      <BreakingTicker />

      {/* Main Content Body */}
      <main className="flex-1 space-y-6">
        
        {/* Top Story Hero Carousel & Desktop Trending Widget */}
        <HeroCarousel
          onSelectArticle={(article) => setActiveArticle(article)}
        />

        {/* OTT Updates Section (Netflix, Prime Video, JioHotstar, Sony LIV, aha, ZEE5) */}
        <OttSection
          onSelectMedia={(item) => setActiveArticle({
            title: `${item.title} (${item.platformName})`,
            date: item.releaseDate,
            views: 'OTT Exclusive',
            image: item.poster,
            summary: item.description,
            content: `Platform: ${item.platformName}\nStatus: ${item.status}\nFormat: ${item.quality}\nLanguages: ${item.language}\n\nSynopsis:\n${item.description}\n\nStreaming directly on ${item.platformName} for subscribed members.`
          })}
        />

        {/* 3-Column Grid on Desktop / Stacked on Mobile matching image.png & image copy.png */}
        <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Latest Movie News */}
            <NewsSection
              onSelectArticle={(article) => setActiveArticle(article)}
            />

            {/* Column 2: Box Office Report */}
            <BoxOfficeSection
              onOpenTollywoodRecords={() => setShowTollywoodRecords(true)}
            />

            {/* Column 3: Latest Reviews */}
            <ReviewsSection
              onSelectReview={(review) => setActiveArticle({
                title: `${review.title} Review`,
                date: 'Latest Release',
                views: `${review.rating} ★ Rating`,
                image: review.poster,
                summary: review.summary,
                content: `Verdict: ${review.verdict}\nRating: ${review.rating}/5.0\nDirector: ${review.director}\nCast: ${review.cast}\n\nReview Breakdown:\n${review.content}`
              })}
            />

          </div>
        </section>

        {/* Upcoming Releases with Countdown Timers */}
        <UpcomingReleases
          onSelectMovie={(movie) => setActiveArticle({
            title: `${movie.title} - Release Update`,
            date: movie.releaseDate,
            views: 'Countdown Live',
            image: movie.poster,
            summary: `Releasing in theaters on ${movie.releaseDate}`,
            content: `The upcoming cinematic release '${movie.title}' is scheduled for worldwide theatrical premiere on ${movie.releaseDate}.\n\nTrade experts anticipate strong advance bookings across Telangana, Andhra Pradesh, and global territories.`
          })}
        />

        {/* Latest Video Trailers */}
        <TrailersSection
          onPlayTrailer={(trailer) => setActiveTrailer(trailer)}
        />

        {/* Inbox Newsletter Banner */}
        <Newsletter />

      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMenu={() => setShowSidebar(true)}
      />

      {/* Modals & Drawers */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />

      <TrailerModal
        trailer={activeTrailer}
        onClose={() => setActiveTrailer(null)}
      />

      <TollywoodRecordsModal
        isOpen={showTollywoodRecords}
        onClose={() => setShowTollywoodRecords(false)}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <SidebarDrawer
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onNavigate={(tab) => setActiveTab(tab)}
        onOpenTollywoodRecords={() => setShowTollywoodRecords(true)}
      />

    </div>
  );
}
