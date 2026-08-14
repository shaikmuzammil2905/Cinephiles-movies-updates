import React, { useState, useEffect, useRef } from 'react';
import { uploadToCloudinary } from '../lib/cloudinary';
import {
  X,
  Star,
  Film,
  Upload,
  Image as ImageIcon,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  BookOpen
} from 'lucide-react';

const COMMON_COLLECTION_TYPES = [
  'Nizam Closing Collection',
  'Nizam Opening Collection',
  'Nizam Day 1 Collection',
  'Nizam Weekend Collection',
  'Nizam 1 Week Collection',
  'AP Closing Collection',
  'AP Opening Collection',
  'AP Day 1 Collection',
  'India Net Collection',
  'Worldwide Gross Collection',
  'Overseas Collection',
  'Total Collection',
  'Other'
];

const emptyForm = {
  movie_id: '',
  movie_title: '',
  collection_type: '',
  collection_type_custom: '',
  review_title: '',
  review_content: '',
  images: [],
  author: 'Admin',
  published: false
};

export function ReviewFormModal({
  isOpen,
  initialData,
  boxOfficeMovies = [],
  onClose,
  onSave
}) {
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [useCustomCollection, setUseCustomCollection] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      const isCustom = !COMMON_COLLECTION_TYPES.includes(initialData.collection_type);
      setForm({
        movie_id: initialData.movie_id || '',
        movie_title: initialData.movie_title || '',
        collection_type: isCustom ? 'Other' : (initialData.collection_type || ''),
        collection_type_custom: isCustom ? initialData.collection_type : '',
        review_title: initialData.review_title || '',
        review_content: initialData.review_content || '',
        images: initialData.images || [],
        author: initialData.author || 'Admin',
        published: !!initialData.published
      });
      setUseCustomCollection(isCustom);
    } else {
      setForm(emptyForm);
      setUseCustomCollection(false);
    }
    setFormError(null);
    setUploadError(null);
  }, [initialData, isOpen]);

  const handleMovieChange = (movieId) => {
    const movie = boxOfficeMovies.find((m) => m.id === movieId);
    setForm((prev) => ({
      ...prev,
      movie_id: movieId,
      movie_title: movie ? movie.title : ''
    }));
  };

  const handleCollectionTypeChange = (value) => {
    if (value === 'Other') {
      setUseCustomCollection(true);
      setForm((prev) => ({ ...prev, collection_type: 'Other', collection_type_custom: '' }));
    } else {
      setUseCustomCollection(false);
      setForm((prev) => ({ ...prev, collection_type: value, collection_type_custom: '' }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    setUploadError(null);

    const uploaded = [];
    for (const file of files) {
      try {
        const result = await uploadToCloudinary(file);
        if (result?.secure_url) {
          uploaded.push({ url: result.secure_url, public_id: result.public_id });
        }
      } catch (err) {
        setUploadError('Some images failed to upload. Please try again.');
      }
    }

    setForm((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }));
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (idx) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const finalCollectionType =
      form.collection_type === 'Other' ? form.collection_type_custom.trim() : form.collection_type;

    if (!form.movie_id) return setFormError('Please select a movie.');
    if (!finalCollectionType) return setFormError('Please specify the collection type.');
    if (!form.review_title.trim()) return setFormError('Review title is required.');
    if (!form.review_content.trim()) return setFormError('Review content cannot be empty.');

    setSaving(true);
    try {
      const payload = {
        movie_id: form.movie_id,
        movie_title: form.movie_title,
        collection_type: finalCollectionType,
        review_title: form.review_title.trim(),
        review_content: form.review_content.trim(),
        images: form.images,
        author: form.author.trim() || 'Admin',
        published: form.published,
        ...(form.published ? { published_at: new Date().toISOString() } : {}),
        updated_at: new Date().toISOString()
      };
      await onSave(payload);
      onClose();
    } catch (err) {
      setFormError(err.message || 'Failed to save review.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">
                {initialData ? 'Edit Review' : 'Add New Review'}
              </h2>
              <p className="text-[10px] text-slate-400">Box Office Collection Review</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-red-600/80 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Movie Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-red-400" />
              Select Movie *
            </label>
            <select
              value={form.movie_id}
              onChange={(e) => handleMovieChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/60 transition cursor-pointer"
              required
            >
              <option value="">— Select a Box Office Movie —</option>
              {boxOfficeMovies.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
            {boxOfficeMovies.length === 0 && (
              <p className="text-[11px] text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                No Box Office movies found. Add movies from the Updates tab first.
              </p>
            )}
          </div>

          {/* Collection Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              Collection Type *
            </label>
            <select
              value={form.collection_type}
              onChange={(e) => handleCollectionTypeChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/60 transition cursor-pointer"
            >
              <option value="">— Select Collection Type —</option>
              {COMMON_COLLECTION_TYPES.map((ct) => (
                <option key={ct} value={ct}>{ct}</option>
              ))}
            </select>
            {useCustomCollection && (
              <input
                type="text"
                value={form.collection_type_custom}
                onChange={(e) => setForm((prev) => ({ ...prev, collection_type_custom: e.target.value }))}
                placeholder="Enter custom collection type..."
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/60 transition mt-2"
              />
            )}
          </div>

          {/* Review Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              Review Title *
            </label>
            <input
              type="text"
              value={form.review_title}
              onChange={(e) => setForm((prev) => ({ ...prev, review_title: e.target.value }))}
              placeholder="e.g. Peddi Nizam Closing Collection Review"
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/60 transition"
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              Author / Reviewer Name
            </label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
              placeholder="Admin"
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/60 transition"
            />
          </div>

          {/* Review Content */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              Review Content *
            </label>
            <textarea
              value={form.review_content}
              onChange={(e) => setForm((prev) => ({ ...prev, review_content: e.target.value }))}
              placeholder="Write the complete review/analysis matter here. Admin can use new lines for formatting. All content entered here will appear exactly on the public page."
              rows={10}
              className="w-full px-3.5 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/60 transition resize-y leading-relaxed"
              required
            />
            <p className="text-[10px] text-slate-500">
              {form.review_content.length} characters. Use blank lines to separate paragraphs.
            </p>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              Review Images (Optional)
            </label>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-red-500/60 rounded-xl p-5 text-center cursor-pointer transition group"
            >
              {uploading ? (
                <div className="flex items-center justify-center gap-2 text-slate-400">
                  <Loader2 className="w-5 h-5 animate-spin text-red-400" />
                  <span className="text-xs">Uploading images...</span>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-slate-500 group-hover:text-red-400 mx-auto mb-1.5 transition" />
                  <p className="text-xs text-slate-400 group-hover:text-slate-300 transition">
                    Click to upload images
                  </p>
                  <p className="text-[10px] text-slate-500">JPG, PNG, WebP supported</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />

            {uploadError && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {uploadError}
              </p>
            )}

            {form.images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                {form.images.map((img, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-700">
                    <img
                      src={img.url || img}
                      alt={`review-img-${idx}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Publish Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-800/60 border border-slate-700/50 rounded-xl">
            <div>
              <p className="text-xs font-bold text-white">
                {form.published ? 'Published' : 'Draft'}
              </p>
              <p className="text-[10px] text-slate-400">
                {form.published
                  ? 'This review is visible on the public website.'
                  : 'Save as draft. Publish when ready.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, published: !prev.published }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                form.published ? 'bg-emerald-500' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${
                  form.published ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Error */}
          {formError && (
            <div className="flex items-center gap-2 p-3 bg-red-950/50 border border-red-800/50 rounded-xl text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {formError}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 text-xs font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-red-900/30 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  {initialData ? 'Update Review' : 'Save Review'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
