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

// Standalone Dedicated Pages
import { OttPage } from './pages/OttPage';
import { MovieNewsPage } from './pages/MovieNewsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { BoxOfficePage } from './pages/BoxOfficePage';
import { TrailersPage } from './pages/TrailersPage';
import { UpcomingPage } from './pages/UpcomingPage';

// Modals
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

  const handleOpenArticle = (article) => {
    setActiveArticle(article);
  };

  const handleOpenReview = (review) => {
    setActiveArticle({
      title: `${review.title} Review`,
      date: 'Latest Review',
      views: `${review.rating} ★ Rating`,
      image: review.poster,
      summary: review.summary,
      content: `Verdict: ${review.verdict}\nRating: ${review.rating}/5.0\nDirector: ${review.director}\nCast: ${review.cast}\n\nReview Breakdown:\n${review.content}`
    });
  };

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        activeSearch={searchQuery}
        onSearch={setSearchQuery}
        onOpenMenu={() => setShowSidebar(true)}
        onLoginClick={() => setShowLoginModal(true)}
        onLogoClick={() => setActiveTab('home')}
      />

      {/* Red Category Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Breaking News Ticker */}
      <BreakingTicker />

      {/* Main Page Rendering */}
      <main className="flex-1 pb-20 md:pb-0">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Top Story Hero Carousel & Desktop Trending Widget */}
            <HeroCarousel
              onSelectArticle={handleOpenArticle}
            />

            {/* OTT Updates Section */}
            <OttSection
              onSelectMedia={(item) => handleOpenArticle({
                title: `${item.title} (${item.platformName})`,
                date: item.releaseDate,
                views: 'OTT Release',
                image: item.poster,
                summary: item.description,
                content: `Platform: ${item.platformName}\nStatus: ${item.status}\nFormat: ${item.quality}\nLanguages: ${item.language}\n\nSynopsis:\n${item.description}`
              })}
            />

            {/* 3-Column Grid on Desktop / Stacked on Mobile */}
            <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <NewsSection onSelectArticle={handleOpenArticle} />
                <BoxOfficeSection onOpenTollywoodRecords={() => setShowTollywoodRecords(true)} />
                <ReviewsSection onSelectReview={handleOpenReview} />
              </div>
            </section>

            {/* Upcoming Releases & Countdowns */}
            <UpcomingReleases
              onSelectMovie={(movie) => handleOpenArticle({
                title: `${movie.title} - Theatrical Release`,
                date: movie.releaseDate,
                views: 'Countdown Active',
                image: movie.poster,
                summary: `Releasing in theaters on ${movie.releaseDate}`,
                content: `The upcoming blockbuster '${movie.title}' is scheduled for grand theatrical premiere on ${movie.releaseDate}.`
              })}
            />

            {/* Latest Video Trailers */}
            <TrailersSection
              onPlayTrailer={(trailer) => setActiveTrailer(trailer)}
            />

            {/* Newsletter */}
            <Newsletter />
          </div>
        )}

        {/* Dedicated Standalone Pages */}
        {activeTab === 'ott' && (
          <OttPage
            onSelectMedia={(item) => handleOpenArticle({
              title: `${item.title} (${item.platformName})`,
              date: item.releaseDate,
              views: 'OTT Hub',
              image: item.poster,
              summary: item.description,
              content: `Platform: ${item.platformName}\nStatus: ${item.status}\nFormat: ${item.quality}\nLanguages: ${item.language}\n\nSynopsis:\n${item.description}`
            })}
          />
        )}

        {activeTab === 'news' && (
          <MovieNewsPage onSelectArticle={handleOpenArticle} />
        )}

        {activeTab === 'reviews' && (
          <ReviewsPage onSelectReview={handleOpenReview} />
        )}

        {activeTab === 'boxoffice' && (
          <BoxOfficePage onOpenTollywoodRecords={() => setShowTollywoodRecords(true)} />
        )}

        {activeTab === 'trailers' && (
          <TrailersPage onPlayTrailer={(trailer) => setActiveTrailer(trailer)} />
        )}

        {activeTab === 'releases' && (
          <UpcomingPage
            onSelectMovie={(movie) => handleOpenArticle({
              title: `${movie.title} - Release Update`,
              date: movie.releaseDate,
              views: 'Countdown Live',
              image: movie.poster,
              summary: `Releasing in theaters on ${movie.releaseDate}`,
              content: `The upcoming cinematic release '${movie.title}' is scheduled for worldwide theatrical premiere on ${movie.releaseDate}.`
            })}
          />
        )}
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
