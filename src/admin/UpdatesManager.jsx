import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  ArrowUpDown,
  FileText,
  Sparkles,
  Layers
} from 'lucide-react';

export function UpdatesManager({
  updates = [],
  categories = [],
  onAddNew,
  onEdit,
  onDelete,
  onView,
  onToggleStatus,
  loading
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Search & Filter & Sort Logic
  const filteredUpdates = useMemo(() => {
    return updates
      .filter((item) => {
        // Status filter
        if (statusFilter !== 'all' && item.status !== statusFilter) return false;

        // Category filter
        if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

        // Search term
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchTitle = item.title?.toLowerCase().includes(q);
          const matchCat = item.category?.toLowerCase().includes(q);
          const matchDesc = item.short_description?.toLowerCase().includes(q);
          const matchContent = item.content?.toLowerCase().includes(q);
          return matchTitle || matchCat || matchDesc || matchContent;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.created_at || b.published_at || 0) - new Date(a.created_at || a.published_at || 0);
        }
        if (sortBy === 'oldest') {
          return new Date(a.created_at || a.published_at || 0) - new Date(b.created_at || b.published_at || 0);
        }
        if (sortBy === 'updated') {
          return new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
        }
        if (sortBy === 'az') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'za') {
          return b.title.localeCompare(a.title);
        }
        return 0;
      });
  }, [updates, statusFilter, categoryFilter, searchTerm, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredUpdates.length / itemsPerPage));
  const paginatedUpdates = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUpdates.slice(start, start + itemsPerPage);
  }, [filteredUpdates, currentPage]);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-500" />
            Website Updates Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage all live & draft updates across News, Reviews, OTT, Trailers, and Box Office.
          </p>
        </div>

        <button
          onClick={onAddNew}
          className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-red-900/30 transition flex items-center gap-2 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Update</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title, category, content..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published Only</option>
              <option value="draft">Drafts Only</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
            >
              <option value="all">All Categories</option>
              <option value="Top Story">Top Story</option>
              <option value="Movie News">Movie News</option>
              <option value="OTT Updates">OTT Updates</option>
              <option value="Reviews">Reviews</option>
              <option value="Box Office">Box Office</option>
              <option value="Trailers">Trailers</option>
              <option value="Upcoming Releases">Upcoming Releases</option>
              {categories.map((c) => (
                <option key={c.id || c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="updated">Recently Updated</option>
              <option value="az">Title (A - Z)</option>
              <option value="za">Title (Z - A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Updates Table View for Desktop / Cards for Mobile */}
      {loading ? (
        <div className="bg-slate-900 border border-slate-800 p-12 text-center rounded-2xl">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-300">Loading updates from Supabase...</p>
        </div>
      ) : filteredUpdates.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-12 text-center rounded-2xl space-y-3">
          <FileText className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">No updates match your filters</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or clear filters to view all available website updates.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Update Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedUpdates.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3 max-w-md">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                          {item.featured_image_url ? (
                            <img
                              src={item.featured_image_url}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-[10px]">
                              NO IMG
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-xs line-clamp-1" title={item.title}>
                            {item.title}
                          </h4>
                          {item.short_description && (
                            <p className="text-[11px] text-slate-400 line-clamp-1">
                              {item.short_description}
                            </p>
                          )}
                          <span className="text-[10px] text-slate-500 font-mono">
                            slug: /{item.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-slate-800 text-slate-200 border border-slate-700 text-[11px] font-bold rounded-lg">
                        {item.category || 'Movie News'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => onToggleStatus(item)}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border flex items-center gap-1.5 transition cursor-pointer ${
                          item.status === 'published'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                            : 'bg-amber-950/80 text-amber-300 border-amber-800 hover:bg-amber-900'
                        }`}
                        title="Click to toggle status"
                      >
                        {item.status === 'published' ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-400" /> Published
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 text-amber-400" /> Draft
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                      {new Date(item.created_at || item.published_at || Date.now()).toLocaleDateString(
                        'en-US',
                        { month: 'short', day: 'numeric', year: 'numeric' }
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onView(item)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(item)}
                          className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition"
                          title="Edit Update"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(item)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
                          title="Delete Update"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>
                Showing page {currentPage} of {totalPages} ({filteredUpdates.length} total updates)
              </span>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
