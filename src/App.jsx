import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { seedSupabaseData } from './lib/seeder';

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
import { TopStoriesManager } from './admin/TopStoriesManager';
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

  // Admin Modal States
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState(null);
  const [deletingUpdate, setDeletingUpdate] = useState(null);
  const [viewingUpdate, setViewingUpdate] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);
  const [savingTopStories, setSavingTopStories] = useState(false);

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

  // 2. Fetch updates & categories purely from Supabase (No static fallbacks)
  const fetchSupabaseData = async () => {
    setLoadingUpdates(true);
    try {
      // Fetch Updates from Supabase
      const { data: updatesData, error: updatesErr } = await supabase
        .from('updates')
        .select('*')
        .order('created_at', { ascending: false });

      if (updatesErr) {
        console.error('Supabase updates fetch error:', updatesErr.message);
        setUpdates([]);
      } else {
        setUpdates(updatesData || []);
      }

      // Fetch Categories from Supabase
      const { data: catData, error: catErr } = await supabase.from('categories').select('*');
      if (!catErr && catData && catData.length > 0) {
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
      setUpdates([]);
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
    fetchSupabaseData();
    fetchReviews();

    // Realtime subscriptions: Auto-refetches live data whenever Supabase database changes
    const updatesChannel = supabase
      .channel('public:updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'updates' }, () => {
        fetchSupabaseData();
      })
      .subscribe();

    const reviewsChannel = supabase
      .channel('public:movie_reviews')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'movie_reviews' }, () => {
        fetchReviews();
      })
      .subscribe();

    const categoriesChannel = supabase
      .channel('public:categories')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => {
        fetchSupabaseData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(updatesChannel);
      supabase.removeChannel(reviewsChannel);
      supabase.removeChannel(categoriesChannel);
    };
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
      if (editingUpdate?.id) {
        // UPDATE existing record using exact ID
        const { error } = await supabase
          .from('updates')
          .update(updateData)
          .eq('id', editingUpdate.id);

        if (error) throw error;
        showToast('Update modified successfully!');
      } else {
        // INSERT new record into Supabase
        const { error } = await supabase.from('updates').insert([updateData]);
        if (error) throw error;
        showToast('New update created and published!');
      }

      await fetchSupabaseData();
    } catch (err) {
      console.error('Supabase save error:', err.message);
      showToast(err.message || 'Failed to save update', 'error');
      throw err;
    }
  };

  const handleConfirmDeleteUpdate = async () => {
    if (!deletingUpdate) return;
    setDeleteLoading(true);

    try {
      if (deletingUpdate.id) {
        // Delete update from Supabase
        const { error } = await supabase.from('updates').delete().eq('id', deletingUpdate.id);
        if (error) throw error;

        // Also delete any linked reviews in movie_reviews to prevent orphaned records
        await supabase.from('movie_reviews').delete().eq('movie_id', deletingUpdate.id);
      } else if (deletingUpdate.slug) {
        const { error } = await supabase.from('updates').delete().eq('slug', deletingUpdate.slug);
        if (error) throw error;
      }

      showToast('Update deleted successfully!');
      await fetchSupabaseData();
      await fetchReviews();
    } catch (err) {
      console.error('Supabase delete error:', err);
      showToast(err.message || 'Failed to delete update', 'error');
    } finally {
      setDeleteLoading(false);
      setDeletingUpdate(null);
    }
  };

  const handleToggleStatus = async (item) => {
    if (!item) return;
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    try {
      if (item.id) {
        const { error } = await supabase
          .from('updates')
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq('id', item.id);
        if (error) throw error;
      } else if (item.slug) {
        const { error } = await supabase
          .from('updates')
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq('slug', item.slug);
        if (error) throw error;
      }

      showToast(`Update status changed to ${newStatus}`);
      await fetchSupabaseData();
    } catch (err) {
      console.error('Failed to change status:', err);
      showToast('Failed to change status: ' + err.message, 'error');
    }
  };

  // Category CRUD
  const handleAddCategory = async (cat) => {
    try {
      const { error } = await supabase.from('categories').insert([cat]);
      if (error) throw error;
      showToast('Category added!');
      await fetchSupabaseData();
    } catch (err) {
      showToast(err.message || 'Failed to add category', 'error');
    }
  };

  const handleEditCategory = async (cat) => {
    try {
      if (cat.id) {
        const { error } = await supabase.from('categories').update(cat).eq('id', cat.id);
        if (error) throw error;
      }
      showToast('Category updated!');
      await fetchSupabaseData();
    } catch (err) {
      showToast(err.message || 'Failed to update category', 'error');
    }
  };

  const handleDeleteCategory = async (cat) => {
    try {
      if (cat.id) {
        const { error } = await supabase.from('categories').delete().eq('id', cat.id);
        if (error) throw error;
      }
      showToast('Category deleted!');
      await fetchSupabaseData();
    } catch (err) {
      showToast(err.message || 'Failed to delete category', 'error');
    }
  };

  // 1-Click Database Seeder (Manual trigger only)
  const handleSeedDatabase = async () => {
    setSeedLoading(true);
    const res = await seedSupabaseData(true);
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
        const { error } = await supabase
          .from('movie_reviews')
          .update({ ...reviewData, updated_at: new Date().toISOString() })
          .eq('id', editingReview.id);
        if (error) throw error;
        showToast('Review updated successfully!');
      } else {
        const { error } = await supabase
          .from('movie_reviews')
          .insert([{ ...reviewData, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }]);
        if (error) throw error;
        showToast('Review saved successfully!');
      }
      await fetchReviews();
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
      await fetchReviews();
    } catch (err) {
      showToast(err.message || 'Failed to delete review', 'error');
    } finally {
      setReviewDeleteLoading(false);
      setDeletingReview(null);
    }
  };

  const handleToggleReviewPublish = async (review) => {
    if (!review?.id) return;
    const newPublished = !review.published;
    try {
      const { error } = await supabase
        .from('movie_reviews')
        .update({
          published: newPublished,
          published_at: newPublished ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', review.id);
      if (error) throw error;
      showToast(`Review ${newPublished ? 'published' : 'unpublished'} successfully!`);
      await fetchReviews();
    } catch (err) {
      showToast('Failed to update review status: ' + err.message, 'error');
    }
  };

  const handleSaveTopStories = async ({ selectedStories, unselectedIds }) => {
    setSavingTopStories(true);
    try {
      // 1. Update selected stories in Supabase
      for (const item of selectedStories) {
        const existing = updates.find((u) => u.id === item.id);
        const newExtra = {
          ...(existing?.extra_data || {}),
          is_top_story: true,
          top_story_order: item.top_story_order
        };

        const { error } = await supabase
          .from('updates')
          .update({
            is_top_story: true,
            top_story_order: item.top_story_order,
            extra_data: newExtra,
            updated_at: new Date().toISOString()
          })
          .eq('id', item.id);

        if (error) throw error;
      }

      // 2. Clear is_top_story for unselected stories
      for (const id of unselectedIds) {
        const existing = updates.find((u) => u.id === id);
        const newExtra = {
          ...(existing?.extra_data || {}),
          is_top_story: false,
          top_story_order: 9999
        };

        const { error } = await supabase
          .from('updates')
          .update({
            is_top_story: false,
            top_story_order: 9999,
            extra_data: newExtra,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);

        if (error) throw error;
      }

      showToast('Top Stories selection & order saved successfully!');
      await fetchSupabaseData();
    } catch (err) {
      showToast('Error saving Top Stories: ' + err.message, 'error');
    } finally {
      setSavingTopStories(false);
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

        {adminTab === 'topstories' && (
          <TopStoriesManager
            updates={updates}
            onSaveTopStories={handleSaveTopStories}
            saving={savingTopStories}
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
