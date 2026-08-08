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
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      return 'admin';
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
      // Fetch Updates
      const { data: updatesData, error: updatesErr } = await supabase
        .from('updates')
        .select('*')
        .order('created_at', { ascending: false });

      if (updatesErr) {
        console.warn('Supabase updates fetch notice:', updatesErr.message);
        // Fallback to initial seeds if database is empty/unseeded
        setUpdates(getInitialSeedUpdates());
      } else if (updatesData && updatesData.length > 0) {
        setUpdates(updatesData);
      } else {
        // Table empty -> set seeds locally so admin panel can show & seed them
        setUpdates(getInitialSeedUpdates());
      }

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
      if (editingUpdate?.id) {
        // UPDATE existing record
        const { error } = await supabase
          .from('updates')
          .update(updateData)
          .eq('id', editingUpdate.id);

        if (error) throw error;
        showToast('Update modified successfully!');
      } else {
        // INSERT new record
        const { error } = await supabase.from('updates').insert([updateData]);
        if (error) throw error;
        showToast('New update created and published!');
      }
      fetchSupabaseData();
    } catch (err) {
      console.warn('Supabase save fallback to local state:', err.message);
      // Fallback update in state if Supabase table is not yet created
      setUpdates((prev) => {
        if (editingUpdate) {
          return prev.map((u) => (u.id === editingUpdate.id ? { ...u, ...updateData } : u));
        }
        return [{ id: `up-${Date.now()}`, ...updateData }, ...prev];
      });
      showToast('Update saved successfully!');
    }
  };

  const handleConfirmDeleteUpdate = async () => {
    if (!deletingUpdate) return;
    setDeleteLoading(true);

    try {
      if (deletingUpdate.id) {
        const { error } = await supabase.from('updates').delete().eq('id', deletingUpdate.id);
        if (error) console.warn('Supabase delete notice:', error.message);
      }
      setUpdates((prev) => prev.filter((u) => u.id !== deletingUpdate.id && u.slug !== deletingUpdate.slug));
      showToast('Update deleted successfully!');
      fetchSupabaseData();
    } catch (err) {
      showToast(err.message, 'error');
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
      setUpdates((prev) =>
        prev.map((u) => (u.id === item.id ? { ...u, status: newStatus } : u))
      );
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
      <BreakingTicker />

      {/* Main Page Rendering */}
      <main className="flex-1 pb-20 md:pb-0">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <HeroCarousel onSelectArticle={handleOpenArticle} />

            <OttSection
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
                <NewsSection onSelectArticle={handleOpenArticle} />
                <BoxOfficeSection onOpenTollywoodRecords={() => setShowTollywoodRecords(true)} />
                <ReviewsSection onSelectReview={handleOpenReview} />
              </div>
            </section>

            <UpcomingReleases
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

            <TrailersSection onPlayTrailer={(trailer) => setActiveTrailer(trailer)} />

            <Newsletter />
          </div>
        )}

        {/* Dedicated Standalone Pages */}
        {activeTab === 'ott' && (
          <OttPage
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

        {activeTab === 'news' && <MovieNewsPage onSelectArticle={handleOpenArticle} />}

        {activeTab === 'reviews' && <ReviewsPage onSelectReview={handleOpenReview} />}

        {activeTab === 'boxoffice' && (
          <BoxOfficePage onOpenTollywoodRecords={() => setShowTollywoodRecords(true)} />
        )}

        {activeTab === 'trailers' && (
          <TrailersPage onPlayTrailer={(trailer) => setActiveTrailer(trailer)} />
        )}

        {activeTab === 'releases' && (
          <UpcomingPage
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

      <SidebarDrawer
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onNavigate={(tab) => setActiveTab(tab)}
        onOpenTollywoodRecords={() => setShowTollywoodRecords(true)}
      />
    </div>
  );
}
