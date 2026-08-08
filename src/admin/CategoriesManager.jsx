import React, { useState } from 'react';
import { FolderPlus, Tag, Edit3, Trash2, Check, X, Sparkles } from 'lucide-react';

export function CategoriesManager({ categories = [], onAddCategory, onEditCategory, onDeleteCategory }) {
  const [newCategory, setNewCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    onAddCategory({
      name: newCategory.trim(),
      slug: newCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newDescription.trim()
    });
    setNewCategory('');
    setNewDescription('');
  };

  const startEdit = (cat) => {
    setEditingId(cat.id || cat.slug);
    setEditName(cat.name);
    setEditDesc(cat.description || '');
  };

  const saveEdit = (cat) => {
    onEditCategory({
      ...cat,
      name: editName,
      description: editDesc
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-950/80 border border-red-900 rounded-xl text-red-400">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Categories Management</h2>
            <p className="text-xs text-slate-400">
              Manage website categories used to organize news, OTT, reviews, and box office updates.
            </p>
          </div>
        </div>
      </div>

      {/* Add New Category Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <FolderPlus className="w-4 h-4 text-red-500" />
          Add New Category
        </h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            required
            placeholder="Category Name (e.g. Tollywood Records)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-red-900/30 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Add Category
          </button>
        </form>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const id = cat.id || cat.slug;
          const isEditing = editingId === id;

          return (
            <div
              key={id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl space-y-3 transition shadow-lg flex flex-col justify-between"
            >
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                  <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-300"
                  />
                  <div className="flex justify-end gap-1.5 pt-1">
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1 bg-slate-800 text-slate-400 hover:text-white rounded-md"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => saveEdit(cat)}
                      className="p-1 bg-emerald-600 text-white rounded-md"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-red-950/80 border border-red-800 text-red-300 text-xs font-bold rounded-lg">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">/{cat.slug}</span>
                    </div>
                    {cat.description && (
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">{cat.description}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => startEdit(cat)}
                      className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition"
                      title="Edit Category"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteCategory(cat)}
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
