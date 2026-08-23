import React, { useState, useEffect } from 'react';
import {
  Flame,
  Search,
  CheckCircle2,
  MoveUp,
  MoveDown,
  Trash2,
  Save,
  Layers,
  Sparkles,
  AlertCircle,
  GripVertical
} from 'lucide-react';
import { formatDate } from '../lib/dateUtils';

export function TopStoriesManager({ updates = [], onSaveTopStories, saving }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStories, setSelectedStories] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize selected stories from incoming updates prop
  useEffect(() => {
    const published = (Array.isArray(updates) ? updates : []).filter(
      (u) => u && typeof u === 'object' && u.status === 'published'
    );

    const initialTop = published
      .filter((u) => u.is_top_story === true || u.extra_data?.is_top_story === true)
      .sort((a, b) => {
        const orderA = typeof a.top_story_order === 'number' ? a.top_story_order : (a.extra_data?.top_story_order ?? 9999);
        const orderB = typeof b.top_story_order === 'number' ? b.top_story_order : (b.extra_data?.top_story_order ?? 9999);
        return orderA - orderB;
      });

    setSelectedStories(initialTop);
    setHasChanges(false);
  }, [updates]);

  // All published updates available for selection
  const publishedUpdates = (Array.isArray(updates) ? updates : []).filter(
    (u) => u && typeof u === 'object' && u.status === 'published'
  );

  // Filter available updates by search
  const availableUpdates = publishedUpdates.filter((item) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.short_description?.toLowerCase().includes(q)
    );
  });

  const isSelected = (id) => selectedStories.some((s) => s.id === id);

  // Toggle selection
  const handleToggleSelect = (item) => {
    if (isSelected(item.id)) {
      setSelectedStories((prev) => prev.filter((s) => s.id !== item.id));
    } else {
      setSelectedStories((prev) => [...prev, item]);
    }
    setHasChanges(true);
  };

  // Remove from selected list
  const handleRemoveSelected = (id) => {
    setSelectedStories((prev) => prev.filter((s) => s.id !== id));
    setHasChanges(true);
  };

  // Move up in order
  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...selectedStories];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setSelectedStories(updated);
    setHasChanges(true);
  };

  // Move down in order
  const handleMoveDown = (index) => {
    if (index === selectedStories.length - 1) return;
    const updated = [...selectedStories];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setSelectedStories(updated);
    setHasChanges(true);
  };

  // Save changes to database
  const handleSave = () => {
    const updatedPayload = selectedStories.map((story, idx) => ({
      id: story.id,
      is_top_story: true,
      top_story_order: idx + 1
    }));

    // Find stories that were un-selected
    const unselectedIds = publishedUpdates
      .filter(
        (u) =>
          (u.is_top_story === true || u.extra_data?.is_top_story === true) &&
          !selectedStories.some((s) => s.id === u.id)
      )
      .map((u) => u.id);

    onSaveTopStories({
      selectedStories: updatedPayload,
      unselectedIds
    });
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            Top Stories Carousel Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manually select and order the stories displayed in the public website's main Top Stories slider.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || (!hasChanges && selectedStories.length === 0)}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition flex items-center gap-2 cursor-pointer ${
            hasChanges
              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-900/40 animate-pulse'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : hasChanges ? 'Save Top Stories Selection *' : 'Save Selection'}</span>
        </button>
      </div>

      {/* Grid: Left - Order Selected Stories | Right - Select Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column 1: Configured Selected Top Stories (Public Order) - 6 cols */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Active Top Stories ({selectedStories.length})
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Exact order as displayed on the live website. Use ▲ ▼ to reorder.
              </p>
            </div>

            {selectedStories.length > 0 && (
              <button
                onClick={() => {
                  setSelectedStories([]);
                  setHasChanges(true);
                }}
                className="text-[11px] font-bold text-red-400 hover:text-red-300 transition"
              >
                Clear All
              </button>
            )}
          </div>

          {selectedStories.length === 0 ? (
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-8 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs font-bold text-slate-300">No Top Stories Selected</p>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Select articles from the list on the right to feature them in the Top Stories carousel.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {selectedStories.map((story, index) => (
                <div
                  key={story.id}
                  className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-3 group hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>

                    <img
                      src={story.featured_image_url || story.image}
                      alt={story.title}
                      className="w-12 h-12 object-cover rounded-lg shrink-0 border border-slate-800 bg-slate-900"
                    />

                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white line-clamp-1" title={story.title}>
                        {story.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        {story.category || 'Top Story'} • {formatDate(story.published_at || story.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Order Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1.5 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === selectedStories.length - 1}
                      className="p-1.5 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleRemoveSelected(story.id)}
                      className="p-1.5 bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition cursor-pointer"
                      title="Remove from Top Stories"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 2: Available Published Articles to Select - 6 cols */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Available Published Articles ({publishedUpdates.length})
            </h3>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search published articles by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Available Articles List */}
          <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
            {availableUpdates.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No published articles match your search.
              </div>
            ) : (
              availableUpdates.map((item) => {
                const selected = isSelected(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleSelect(item)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                      selected
                        ? 'bg-red-950/30 border-red-800/80'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-900 border-slate-700 cursor-pointer shrink-0"
                      />

                      <img
                        src={item.featured_image_url}
                        alt={item.title}
                        className="w-10 h-10 object-cover rounded-lg shrink-0 border border-slate-800 bg-slate-900"
                      />

                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white line-clamp-1" title={item.title}>
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {item.category || 'Movie News'} • {formatDate(item.published_at || item.created_at)}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                        selected
                          ? 'bg-red-600 text-white border-red-500'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {selected ? 'Selected' : 'Select'}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
