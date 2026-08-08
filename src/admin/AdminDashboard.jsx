import React from 'react';
import {
  FileText,
  CheckCircle,
  Clock,
  Tag,
  Sparkles,
  Plus,
  Eye,
  Edit3,
  Trash2,
  Database,
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';

export function AdminDashboard({
  updates = [],
  categories = [],
  onNavigate,
  onAddNew,
  onEdit,
  onDelete,
  onView,
  onSeedDatabase,
  seedLoading
}) {
  const total = updates.length;
  const published = updates.filter((u) => u.status === 'published').length;
  const drafts = updates.filter((u) => u.status === 'draft').length;
  const totalCategories = categories.length || 7;

  const latestUpdate = updates[0];
  const recentlyUpdated = [...updates].sort(
    (a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0)
  )[0];

  const recentList = updates.slice(0, 7);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-red-950/40 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-red-600/20 text-red-400 border border-red-500/30 text-[11px] font-bold uppercase rounded-md">
              CMS Overview
            </span>
            <span className="text-xs text-slate-400">Live Website Sync</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Telangana Box Office Admin Control
          </h2>
          <p className="text-xs text-slate-400">
            Real-time management of movie updates, box office reports, OTT premieres, and reviews.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {total === 0 && (
            <button
              onClick={onSeedDatabase}
              disabled={seedLoading}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-900/30 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Database className="w-4 h-4" />
              <span>{seedLoading ? 'Seeding Data...' : '1-Click Seed Initial Data'}</span>
            </button>
          )}

          <button
            onClick={onAddNew}
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-red-900/30 transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Update</span>
          </button>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Card 1: Total */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Updates</span>
            <FileText className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-extrabold text-white">{total}</div>
          <div className="text-[10px] text-slate-500">Live & Draft records</div>
        </div>

        {/* Card 2: Published */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Published</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">{published}</div>
          <div className="text-[10px] text-slate-500">Visible on public site</div>
        </div>

        {/* Card 3: Draft */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Draft Updates</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{drafts}</div>
          <div className="text-[10px] text-slate-500">Hidden from visitors</div>
        </div>

        {/* Card 4: Total Categories */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Categories</span>
            <Tag className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-blue-400">{totalCategories}</div>
          <div className="text-[10px] text-slate-500">Active content tags</div>
        </div>

        {/* Card 5: Latest Update */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1 shadow-lg col-span-2 sm:col-span-1 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Latest Story</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xs font-bold text-white truncate" title={latestUpdate?.title}>
            {latestUpdate ? latestUpdate.title : 'No updates yet'}
          </div>
          <div className="text-[10px] text-slate-500">
            {latestUpdate
              ? new Date(latestUpdate.created_at || Date.now()).toLocaleDateString()
              : '-'}
          </div>
        </div>

        {/* Card 6: Recently Updated */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1 shadow-lg col-span-2 sm:col-span-1 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Recently Edited</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xs font-bold text-white truncate" title={recentlyUpdated?.title}>
            {recentlyUpdated ? recentlyUpdated.title : 'No updates yet'}
          </div>
          <div className="text-[10px] text-slate-500">
            {recentlyUpdated
              ? new Date(recentlyUpdated.updated_at || Date.now()).toLocaleDateString()
              : '-'}
          </div>
        </div>
      </div>

      {/* Recent Updates Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-500" />
              Recent Website Updates
            </h3>
            <p className="text-xs text-slate-400">Showing latest published and draft updates</p>
          </div>

          <button
            onClick={() => onNavigate('updates')}
            className="text-xs font-bold text-red-400 hover:text-red-300 transition flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>View All Updates ({total})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentList.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No updates in database. Click "1-Click Seed Initial Data" above to import existing website data.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Update</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3 max-w-sm">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                          {item.featured_image_url ? (
                            <img
                              src={item.featured_image_url}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-[9px]">
                              NO IMG
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-white text-xs line-clamp-1" title={item.title}>
                          {item.title}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 text-[10px] font-bold rounded-md">
                        {item.category || 'Movie News'}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-md border inline-flex items-center gap-1 ${
                          item.status === 'published'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                            : 'bg-amber-950/80 text-amber-300 border-amber-800'
                        }`}
                      >
                        {item.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                      {new Date(item.created_at || item.published_at || Date.now()).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onView(item)}
                          className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(item)}
                          className="p-1 text-slate-400 hover:text-blue-400 rounded hover:bg-slate-800 transition"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(item)}
                          className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800 transition"
                          title="Delete"
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
        )}
      </div>
    </div>
  );
}
