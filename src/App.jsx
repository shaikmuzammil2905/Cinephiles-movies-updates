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
        setUpdates([]);
      } else if (updatesData && updatesData.length > 0) {
        setUpdates(updatesData);
      } else if (!hasInitialLoaded.current) {
        // First application load and table is completely empty -> seed once into Supabase
        const seedRes = await seedSupabaseData(false);
        if (seedRes.success && seedRes.data && seedRes.data.length > 0) {
          setUpdates(seedRes.data);
        } else {
          setUpdates([]);
        }
      } else {
        setUpdates([]);
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
      setUpdates([]);
    } finally {
      setLoadingUpdates(false);
    }
  };

  useEffect(() => {
    fetchSupabaseData();
  }, []);

  // Handle URL hash changes for #admin
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setActiveTab('admin');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

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

  // Public Article handlers
  const handleOpenArticle = (article) => {
    setActiveArticle(article);
  };

  const handleOpenReview = (review) => {
    setActiveArticle({
      title: `${review.title} Review`,
      date: 'Latest Review',
      views: `${review.rating} ★ Rating`,
      image: review.poster || review.featured_image_url,
      summary: review.summary || review.short_description,
      content: `Verdict: ${review.verdict || review.extra_data?.verdict || 'Must Watch'}\nRating: ${
        review.rating || review.extra_data?.rating || '4.0'
      }/5.0\nDirector: ${review.director || review.extra_data?.director || 'Standard'}\nCast: ${
        review.cast || review.extra_data?.cast || 'N/A'
      }\n\nReview Breakdown:\n${review.content || review.summary}`
    });
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
        onAdminClick={() => setActiveTab('admin')}
        onLogoClick={() => setActiveTab('home')}
      />

      {/* Red Category Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Breaking News Ticker */}
      <BreakingTicker updates={updates} />

      {/* Main Page Rendering */}
      <main className="flex-1 pb-20 md:pb-0">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <HeroCarousel updates={updates} onSelectArticle={handleOpenArticle} />

            <OttSection
              updates={updates}
              onSelectMedia={(item) =>
                handleOpenArticle({
                  title: `${item.title} (${item.platformName || 'OTT'})`,
                  date: item.releaseDate || 'Streaming Now',
                  views: 'OTT Release',
                  image: item.poster || item.featured_image_url,
                  summary: item.description || item.short_description,
                  content: item.content || item.description
                })
              }
            />

            <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <NewsSection updates={updates} onSelectArticle={handleOpenArticle} />
                <BoxOfficeSection updates={updates} onOpenTollywoodRecords={() => setShowTollywoodRecords(true)} />
                <ReviewsSection updates={updates} onSelectReview={handleOpenReview} />
              </div>
            </section>

            <UpcomingReleases
              updates={updates}
              onSelectMovie={(movie) =>
                handleOpenArticle({
                  title: `${movie.title} - Theatrical Release`,
                  date: movie.releaseDate,
                  views: 'Countdown Active',
                  image: movie.poster || movie.featured_image_url,
                  summary: `Releasing in theaters on ${movie.releaseDate}`,
                  content: `The upcoming blockbuster '${movie.title}' is scheduled for premiere on ${movie.releaseDate}.`
                })
              }
            />

            <TrailersSection updates={updates} onPlayTrailer={(trailer) => setActiveTrailer(trailer)} />

            <Newsletter />
          </div>
        )}

        {/* Dedicated Standalone Pages */}
        {activeTab === 'ott' && (
          <OttPage
            updates={updates}
            onSelectMedia={(item) =>
              handleOpenArticle({
                title: `${item.title} (${item.platformName || 'OTT'})`,
                date: item.releaseDate || 'OTT Premiere',
                views: 'OTT Hub',
                image: item.poster || item.featured_image_url,
                summary: item.description || item.short_description,
                content: item.content || item.description
              })
            }
          />
        )}

        {activeTab === 'news' && <MovieNewsPage updates={updates} onSelectArticle={handleOpenArticle} />}

        {activeTab === 'reviews' && <ReviewsPage updates={updates} onSelectReview={handleOpenReview} />}

        {activeTab === 'boxoffice' && (
          <BoxOfficePage updates={updates} onOpenTollywoodRecords={() => setShowTollywoodRecords(true)} />
        )}

        {activeTab === 'trailers' && (
          <TrailersPage updates={updates} onPlayTrailer={(trailer) => setActiveTrailer(trailer)} />
        )}

        {activeTab === 'releases' && (
          <UpcomingPage
            updates={updates}
            onSelectMovie={(movie) =>
              handleOpenArticle({
                title: `${movie.title} - Release Update`,
                date: movie.releaseDate,
                views: 'Countdown Live',
                image: movie.poster || movie.featured_image_url,
                summary: `Releasing in theaters on ${movie.releaseDate}`,
                content: `The upcoming cinematic release '${movie.title}' is scheduled for premiere on ${movie.releaseDate}.`
              })
            }
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

      {/* Modals */}
      <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />

      <TrailerModal trailer={activeTrailer} onClose={() => setActiveTrailer(null)} />

      <TollywoodRecordsModal
        isOpen={showTollywoodRecords}
        onClose={() => setShowTollywoodRecords(false)}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onAdminClick={() => {
          setShowLoginModal(false);
          setActiveTab('admin');
        }}
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
