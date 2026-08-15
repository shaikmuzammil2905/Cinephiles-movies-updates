import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { seedSupabaseData, getInitialSeedUpdates } from './lib/seeder';

// Public Header & Footer
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
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';

// Standalone Dedicated Pages
import { OttPage } from './pages/OttPage';
import { MovieNewsPage } from './pages/MovieNewsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { BoxOfficePage } from './pages/BoxOfficePage';
import { TrailersPage } from './pages/TrailersPage';
import { UpcomingPage } from './pages/UpcomingPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { BoxOfficeDetailPage } from './pages/BoxOfficeDetailPage';

// Public Modals
import { ArticleModal } from './components/ArticleModal';
import { TrailerModal } from './components/TrailerModal';
import { TollywoodRecordsModal } from './components/TollywoodRecordsModal';
import { LoginModal } from './components/LoginModal';
import { SidebarDrawer } from './components/SidebarDrawer';

// Admin CMS Components
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { UpdatesManager } from './admin/UpdatesManager';
import { UpdateFormModal } from './admin/UpdateFormModal';
import { UpdateDetailModal } from './admin/UpdateDetailModal';
import { DeleteConfirmModal } from './admin/DeleteConfirmModal';
import { CategoriesManager } from './admin/CategoriesManager';
import { MediaGallery } from './admin/MediaGallery';
import { ReviewsManager } from './admin/ReviewsManager';
import { ReviewFormModal } from './admin/ReviewFormModal';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#admin' || window.location.pathname === '/admin') {
      return 'admin';
    }
    const knownTabs = ['home', 'ott', 'news', 'reviews', 'boxoffice', 'trailers', 'releases', 'admin'];
    const cleanHash = hash.replace('#', '').toLowerCase();
    if (knownTabs.includes(cleanHash)) {
      return cleanHash;
    }
    return 'home';
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic Route States
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [activeBoxOfficeId, setActiveBoxOfficeId] = useState(null);

  // Admin Auth State
  const [session, setSession] = useState(null);
  const [adminTab, setAdminTab] = useState('dashboard');

  // Supabase Data State
  const [updates, setUpdates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingUpdates, setLoadingUpdates] = useState(true);
  const [toast, setToast] = useState(null);
  const hasInitialLoaded = React.useRef(false);

  // Admin Modal States
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState(null);
  const [deletingUpdate, setDeletingUpdate] = useState(null);
  const [viewingUpdate, setViewingUpdate] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [deletingReview, setDeletingReview] = useState(null);
  const [reviewDeleteLoading, setReviewDeleteLoading] = useState(false);

  // Public Modal States
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [showTollywoodRecords, setShowTollywoodRecords] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Show toast notification utility
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // 1. Listen for Supabase Auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch updates & categories from Supabase
  const fetchSupabaseData = async () => {
    setLoadingUpdates(true);
    try {
      // Fetch Updates from Supabase
      const { data: updatesData, error: updatesErr } = await supabase
        .from('updates')
        .select('*')
        .order('created_at', { ascending: false });

      if (updatesErr) {
        console.warn('Supabase updates fetch notice:', updatesErr.message);
        setUpdates(getInitialSeedUpdates());
      } else if (updatesData && updatesData.length > 0) {
        setUpdates(updatesData);
      } else if (!hasInitialLoaded.current) {
        // First application load and table is completely empty -> seed once into Supabase
        const seedRes = await seedSupabaseData(false);
        if (seedRes.success && seedRes.data && seedRes.data.length > 0) {
          setUpdates(seedRes.data);
        } else {
          setUpdates(getInitialSeedUpdates());
        }
      } else {
        setUpdates(getInitialSeedUpdates());
      }
      hasInitialLoaded.current = true;

      // Fetch Categories
      const { data: catData } = await supabase.from('categories').select('*');
      if (catData && catData.length > 0) {
        setCategories(catData);
      } else {
        setCategories([
          { id: '1', name: 'Top Story', slug: 'top-story' },
          { id: '2', name: 'Movie News', slug: 'movie-news' },
          { id: '3', name: 'OTT Updates', slug: 'ott-updates' },
          { id: '4', name: 'Reviews', slug: 'reviews' },
          { id: '5', name: 'Box Office', slug: 'box-office' },
          { id: '6', name: 'Trailers', slug: 'trailers' },
          { id: '7', name: 'Upcoming Releases', slug: 'upcoming-releases' }
        ]);
      }
    } catch (err) {
      console.error('Error fetching Supabase data:', err);
      setUpdates(getInitialSeedUpdates());
    } finally {
      setLoadingUpdates(false);
    }
  };

  useEffect(() => {
    fetchSupabaseData();
  }, []);

  // Fetch reviews from Supabase (admin sees all, including drafts)
  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const { data, error } = await supabase
        .from('movie_reviews')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setReviews(data);
    } catch (err) {
      console.warn('Error fetching reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Listen for Route Changes (Path & Hash) & Browser Back/Forward
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (hash === '#admin' || path === '/admin') {
        setActiveTab('admin');
        setActiveArticleId(null);
        setActiveBoxOfficeId(null);
        return;
      }

      // Check Article routes: /news/:id or /post/:id or #news/:id or #post/:id
      const newsMatch = path.match(/^\/(?:news|post)\/(.+)$/i) || hash.match(/^#(?:news|post)\/(.+)$/i);
      if (newsMatch && newsMatch[1]) {
        setActiveArticleId(newsMatch[1]);
        setActiveBoxOfficeId(null);
        return;
      }

      // Check Box Office routes: /box-office/:id or #box-office/:id
      const boMatch = path.match(/^\/box-office\/(.+)$/i) || hash.match(/^#box-office\/(.+)$/i);
      if (boMatch && boMatch[1]) {
        setActiveBoxOfficeId(boMatch[1]);
        setActiveArticleId(null);
        return;
      }

      setActiveArticleId(null);
      setActiveBoxOfficeId(null);
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActiveArticleId(null);
    setActiveBoxOfficeId(null);
    if (tabId === 'admin') {
      window.history.pushState({ route: 'admin' }, '', '/admin');
    } else {
      window.history.pushState({ route: tabId }, '', tabId === 'home' ? '/' : `/#${tabId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArticle = (articleOrId) => {
    let id = articleOrId;
    if (typeof articleOrId === 'object' && articleOrId !== null) {
      id = articleOrId.id || articleOrId.slug || articleOrId.title;
    }
    if (id) {
      window.history.pushState({ route: 'news', id }, '', `/news/${encodeURIComponent(id)}`);
      setActiveArticleId(id);
      setActiveBoxOfficeId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenMovie = (movieOrId) => {
    let id = movieOrId;
    if (typeof movieOrId === 'object' && movieOrId !== null) {
      id = movieOrId.id || movieOrId.slug || movieOrId.title;
    }
    if (id) {
      window.history.pushState({ route: 'boxoffice', id }, '', `/box-office/${encodeURIComponent(id)}`);
      setActiveBoxOfficeId(id);
      setActiveArticleId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToPublicHome = () => {
    window.history.pushState({}, '', '/');
    setActiveArticleId(null);
    setActiveBoxOfficeId(null);
  };

  // 3. Admin Actions (Create / Edit / Delete / Toggle Status)
  const handleSaveUpdate = async (updateData) => {
    try {
      let savedRecord = { ...updateData };

      if (editingUpdate?.id) {
        // UPDATE existing record
        const { data, error } = await supabase
          .from('updates')
          .update(updateData)
          .eq('id', editingUpdate.id)
          .select();

        if (error) throw error;
        if (data && data[0]) savedRecord = data[0];
        showToast('Update modified successfully!');
      } else {
        // INSERT new record
        const { data, error } = await supabase.from('updates').insert([updateData]).select();
        if (error) throw error;
        if (data && data[0]) savedRecord = data[0];
        showToast('New update created and published!');
      }

      setUpdates((prev) => {
        if (editingUpdate) {
          return prev.map((u) => (u.id === editingUpdate.id || u.slug === editingUpdate.slug ? { ...u, ...savedRecord } : u));
        } else {
          return [savedRecord, ...prev];
        }
      });

      fetchSupabaseData();
    } catch (err) {
      console.warn('Supabase save notice:', err.message);
      showToast(err.message || 'Failed to save update', 'error');
    }
  };

  const handleConfirmDeleteUpdate = async () => {
    if (!deletingUpdate) return;
    setDeleteLoading(true);

    try {
      if (deletingUpdate.id) {
        const { error } = await supabase.from('updates').delete().eq('id', deletingUpdate.id);
        if (error) {
          console.error('Supabase delete error:', error);
          throw error;
        }
      } else if (deletingUpdate.slug) {
        const { error } = await supabase.from('updates').delete().eq('slug', deletingUpdate.slug);
        if (error) {
          console.error('Supabase delete error by slug:', error);
          throw error;
        }
      }

      setUpdates((prev) => prev.filter((u) => u.id !== deletingUpdate.id && u.slug !== deletingUpdate.slug));
      showToast('Update deleted successfully!');

      // Re-fetch live data from Supabase immediately to ensure sync
      const { data: freshData } = await supabase
        .from('updates')
        .select('*')
        .order('created_at', { ascending: false });

      setUpdates(freshData || []);
    } catch (err) {
      showToast(err.message || 'Failed to delete update', 'error');
    } finally {
      setDeleteLoading(false);
      setDeletingUpdate(null);
    }
  };

  const handleToggleStatus = async (item) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    try {
      if (item.id) {
        await supabase.from('updates').update({ status: newStatus }).eq('id', item.id);
      }
      setUpdates((prev) => prev.map((u) => (u.id === item.id || u.slug === item.slug ? { ...u, status: newStatus } : u)));
      showToast(`Update status changed to ${newStatus}`);
    } catch (err) {
      showToast('Failed to change status', 'error');
    }
  };

  // Category CRUD
  const handleAddCategory = async (cat) => {
    try {
      const { data, error } = await supabase.from('categories').insert([cat]).select();
      if (error) throw error;
      showToast('Category added!');
      fetchSupabaseData();
    } catch (err) {
      setCategories((prev) => [...prev, { id: `cat-${Date.now()}`, ...cat }]);
      showToast('Category added!');
    }
  };

  const handleEditCategory = async (cat) => {
    try {
      if (cat.id) {
        await supabase.from('categories').update(cat).eq('id', cat.id);
      }
      setCategories((prev) => prev.map((c) => (c.id === cat.id ? cat : c)));
      showToast('Category updated!');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteCategory = async (cat) => {
    try {
      if (cat.id) {
        await supabase.from('categories').delete().eq('id', cat.id);
      }
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
      showToast('Category deleted!');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 1-Click Database Seeder
  const handleSeedDatabase = async () => {
    setSeedLoading(true);
    const res = await seedSupabaseData();
    setSeedLoading(false);
    if (res.success) {
      showToast('Supabase database seeded with website updates!');
      fetchSupabaseData();
    } else {
      showToast(`Seeder notice: ${res.error}`, 'error');
    }
  };

  // Public Article & Review Handlers
  const handleOpenReview = (review) => {
    handleOpenArticle(review);
  };

  // Review Admin Handlers
  const handleSaveReview = async (reviewData) => {
    try {
      if (editingReview?.id) {
        const { data, error } = await supabase
          .from('movie_reviews')
          .update(reviewData)
          .eq('id', editingReview.id)
          .select();
        if (error) throw error;
        showToast('Review updated successfully!');
      } else {
        const { data, error } = await supabase
          .from('movie_reviews')
          .insert([{ ...reviewData, created_at: new Date().toISOString() }])
          .select();
        if (error) throw error;
        showToast('Review saved successfully!');
      }
      fetchReviews();
    } catch (err) {
      showToast(err.message || 'Failed to save review', 'error');
      throw err;
    }
  };

  const handleConfirmDeleteReview = async () => {
    if (!deletingReview) return;
    setReviewDeleteLoading(true);
    try {
      const { error } = await supabase.from('movie_reviews').delete().eq('id', deletingReview.id);
      if (error) throw error;
      showToast('Review deleted!');
      fetchReviews();
    } catch (err) {
      showToast(err.message || 'Failed to delete review', 'error');
    } finally {
      setReviewDeleteLoading(false);
      setDeletingReview(null);
    }
  };

  const handleToggleReviewPublish = async (review) => {
    const newPublished = !review.published;
    try {
      const { error } = await supabase
        .from('movie_reviews')
        .update({
          published: newPublished,
          ...(newPublished ? { published_at: new Date().toISOString() } : {})
        })
        .eq('id', review.id);
      if (error) throw error;
      showToast(`Review ${newPublished ? 'published' : 'unpublished'} successfully!`);
      fetchReviews();
    } catch (err) {
      showToast('Failed to update review status', 'error');
    }
  };

  // RENDER ADMIN PANEL IF ACTIVE TAB IS 'admin'
  if (activeTab === 'admin') {
    if (!session) {
      return (
        <AdminLogin
          onLoginSuccess={(s) => setSession(s)}
          onBackToSite={() => {
            window.location.hash = '';
            setActiveTab('home');
          }}
        />
      );
    }

    return (
      <AdminLayout
        activeTab={adminTab}
        setActiveTab={setAdminTab}
        user={session.user}
        onLogout={async () => {
          await supabase.auth.signOut();
          setSession(null);
          window.location.hash = '';
          setActiveTab('home');
        }}
        onOpenAddModal={() => {
          setEditingUpdate(null);
          setShowAddEditModal(true);
        }}
        onBackToSite={() => {
          window.location.hash = '';
          setActiveTab('home');
        }}
        toast={toast}
      >
        {adminTab === 'dashboard' && (
          <AdminDashboard
            updates={updates}
            categories={categories}
            onNavigate={setAdminTab}
            onAddNew={() => {
              setEditingUpdate(null);
              setShowAddEditModal(true);
            }}
            onEdit={(item) => {
              setEditingUpdate(item);
              setShowAddEditModal(true);
            }}
            onDelete={(item) => setDeletingUpdate(item)}
            onView={(item) => setViewingUpdate(item)}
            onSeedDatabase={handleSeedDatabase}
            seedLoading={seedLoading}
          />
        )}

        {adminTab === 'updates' && (
          <UpdatesManager
            updates={updates}
            categories={categories}
            loading={loadingUpdates}
            onAddNew={() => {
              setEditingUpdate(null);
              setShowAddEditModal(true);
            }}
            onEdit={(item) => {
              setEditingUpdate(item);
              setShowAddEditModal(true);
            }}
            onDelete={(item) => setDeletingUpdate(item)}
            onView={(item) => setViewingUpdate(item)}
            onToggleStatus={handleToggleStatus}
          />
        )}

        {adminTab === 'categories' && (
          <CategoriesManager
            categories={categories}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}

        {adminTab === 'media' && <MediaGallery updates={updates} />}

        {adminTab === 'reviews' && (
          <ReviewsManager
            boxOfficeMovies={updates.filter((u) => u.category === 'Box Office')}
            reviews={reviews}
            loading={loadingReviews}
            onAddNew={() => {
              setEditingReview(null);
              setShowReviewForm(true);
            }}
            onEdit={(item) => {
              setEditingReview(item);
              setShowReviewForm(true);
            }}
            onDelete={(item) => setDeletingReview(item)}
            onTogglePublish={handleToggleReviewPublish}
          />
        )}

        {/* Admin Modals */}
        <UpdateFormModal
          isOpen={showAddEditModal}
          initialData={editingUpdate}
          categories={categories}
          onClose={() => {
            setShowAddEditModal(false);
            setEditingUpdate(null);
          }}
          onSave={handleSaveUpdate}
        />

        <UpdateDetailModal
          isOpen={!!viewingUpdate}
          update={viewingUpdate}
          onClose={() => setViewingUpdate(null)}
          onEdit={(item) => {
            setEditingUpdate(item);
            setShowAddEditModal(true);
          }}
          onDelete={(item) => setDeletingUpdate(item)}
        />

        <DeleteConfirmModal
          isOpen={!!deletingUpdate}
          title={deletingUpdate?.title}
          loading={deleteLoading}
          onConfirm={handleConfirmDeleteUpdate}
          onCancel={() => setDeletingUpdate(null)}
        />

        {/* Review Form Modal */}
        <ReviewFormModal
          isOpen={showReviewForm}
          initialData={editingReview}
          boxOfficeMovies={updates.filter((u) => u.category === 'Box Office')}
          onClose={() => {
            setShowReviewForm(false);
            setEditingReview(null);
          }}
          onSave={handleSaveReview}
        />

        {/* Review Delete Confirm */}
        <DeleteConfirmModal
          isOpen={!!deletingReview}
          title={deletingReview?.review_title}
          loading={reviewDeleteLoading}
          onConfirm={handleConfirmDeleteReview}
          onCancel={() => setDeletingReview(null)}
        />
      </AdminLayout>
    );
  }

  // RENDER PUBLIC WEBSITE
  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Header */}
      <Header
        activeSearch={searchQuery}
        onSearch={setSearchQuery}
        onOpenMenu={() => setShowSidebar(true)}
        onLoginClick={() => setShowLoginModal(true)}
        onAdminClick={() => handleTabChange('admin')}
        onLogoClick={() => handleTabChange('home')}
      />

      {/* Red Category Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Breaking News Ticker */}
      <BreakingTicker updates={updates} onSelectArticle={handleOpenArticle} />

      {/* Main Page Rendering */}
      <main className="flex-1 pb-20 md:pb-0">
        {activeArticleId ? (
          <ArticleDetailPage
            articleId={activeArticleId}
            updates={updates}
            onBack={handleBackToPublicHome}
            onNavigateArticle={handleOpenArticle}
            onNavigateCategory={handleTabChange}
          />
        ) : activeBoxOfficeId ? (
          <BoxOfficeDetailPage
            movieId={activeBoxOfficeId}
            updates={updates}
            onBack={handleBackToPublicHome}
            onNavigateCategory={handleTabChange}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <div className="space-y-6">
                <HeroCarousel updates={updates} onSelectArticle={handleOpenArticle} />

                <OttSection
                  updates={updates}
                  onSelectMedia={(item) => handleOpenArticle(item)}
                />

                <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NewsSection updates={updates} onSelectArticle={handleOpenArticle} />
                    <BoxOfficeSection
                      updates={updates}
                      onOpenTollywoodRecords={() => setShowTollywoodRecords(true)}
                      onSelectMovie={handleOpenMovie}
                    />
                    <ReviewsSection updates={updates} onSelectReview={handleOpenReview} />
                  </div>
                </section>

                <UpcomingReleases
                  updates={updates}
                  onSelectMovie={(movie) => handleOpenArticle(movie)}
                />

                <TrailersSection updates={updates} onPlayTrailer={(trailer) => setActiveTrailer(trailer)} />
              </div>
            )}

            {/* Dedicated Standalone Pages */}
            {activeTab === 'ott' && (
              <OttPage
                updates={updates}
                onSelectMedia={(item) => handleOpenArticle(item)}
              />
            )}

            {activeTab === 'news' && <MovieNewsPage updates={updates} onSelectArticle={handleOpenArticle} />}

            {activeTab === 'reviews' && <ReviewsPage updates={updates} onSelectReview={handleOpenReview} />}

            {activeTab === 'boxoffice' && (
              <BoxOfficePage
                updates={updates}
                onOpenTollywoodRecords={() => setShowTollywoodRecords(true)}
                onSelectMovie={handleOpenMovie}
              />
            )}

            {activeTab === 'trailers' && (
              <TrailersPage updates={updates} onPlayTrailer={(trailer) => setActiveTrailer(trailer)} />
            )}

            {activeTab === 'releases' && (
              <UpcomingPage
                updates={updates}
                onSelectMovie={(movie) => handleOpenArticle(movie)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomBar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenMenu={() => setShowSidebar(true)}
      />

      {/* Modals */}
      <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />

      <TrailerModal trailer={activeTrailer} onClose={() => setActiveTrailer(null)} />

      <TollywoodRecordsModal
        isOpen={showTollywoodRecords}
        onClose={() => setShowTollywoodRecords(false)}
        updates={updates}
        onSelectMovie={handleOpenMovie}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onAdminClick={() => {
          setShowLoginModal(false);
          handleTabChange('admin');
        }}
      />

      <SidebarDrawer
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onNavigate={(tab) => handleTabChange(tab)}
        onOpenTollywoodRecords={() => setShowTollywoodRecords(true)}
      />
    </div>
  );
}
