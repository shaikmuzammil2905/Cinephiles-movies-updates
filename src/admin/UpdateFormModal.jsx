import React, { useState, useEffect } from 'react';
import { uploadToCloudinary } from '../lib/cloudinary';
import { RichTextEditor } from './RichTextEditor';
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  FileText,
  Sparkles,
  Link,
  Trash2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export function UpdateFormModal({ isOpen, initialData, onClose, onSave, categories = [] }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Movie News',
    short_description: '',
    content: '',
    author: 'Admin',
    status: 'published',
    tags: '',
    featured_image_url: '',
    featured_image_public_id: '',
    extra_data: {
      rating: '',
      director: '',
      cast: '',
      verdict: '',
      platform: 'netflix',
      platformName: 'Netflix',
      quality: '4K Ultra HD',
      language: 'Telugu, Hindi',
      youtubeId: '',
      releaseDate: ''
    }
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [customUrlMode, setCustomUrlMode] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        category: initialData.category || 'Movie News',
        short_description: initialData.short_description || '',
        content: initialData.content || '',
        author: initialData.author || 'Admin',
        status: initialData.status || 'published',
        tags: initialData.tags || '',
        featured_image_url: initialData.featured_image_url || '',
        featured_image_public_id: initialData.featured_image_public_id || '',
        extra_data: {
          rating: initialData.extra_data?.rating || '',
          director: initialData.extra_data?.director || '',
          cast: initialData.extra_data?.cast || '',
          verdict: initialData.extra_data?.verdict || '',
          platform: initialData.extra_data?.platform || 'netflix',
          platformName: initialData.extra_data?.platformName || 'Netflix',
          quality: initialData.extra_data?.quality || '4K Ultra HD',
          language: initialData.extra_data?.language || 'Telugu, Hindi',
          youtubeId: initialData.extra_data?.youtubeId || '',
          releaseDate: initialData.extra_data?.releaseDate || ''
        }
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        category: 'Movie News',
        short_description: '',
        content: '',
        author: 'Admin',
        status: 'published',
        tags: '',
        featured_image_url: '',
        featured_image_public_id: '',
        extra_data: {
          rating: '',
          director: '',
          cast: '',
          verdict: '',
          platform: 'netflix',
          platformName: 'Netflix',
          quality: '4K Ultra HD',
          language: 'Telugu, Hindi',
          youtubeId: '',
          releaseDate: ''
        }
      });
    }
    setUploadError(null);
    setFormError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Auto generate slug from title if title changes
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: initialData ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }));
  };

  // Image Upload to Cloudinary
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      const result = await uploadToCloudinary(file, (percent) => setUploadProgress(percent));
      setFormData((prev) => ({
        ...prev,
        featured_image_url: result.url,
        featured_image_public_id: result.publicId
      }));
    } catch (err) {
      console.warn('Cloudinary upload notice:', err.message);
      // Fallback preview read as Data URL if unsigned preset failed
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          featured_image_url: event.target.result
        }));
      };
      reader.readAsDataURL(file);
      setUploadError('Cloudinary unsigned upload notice: Image loaded locally. You can also paste a direct image URL.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (statusOverride) => {
    const finalStatus = statusOverride || formData.status;
    if (!formData.title.trim()) {
      setFormError('Title is required.');
      return;
    }

    setSaving(true);
    setFormError(null);

    try {
      const payload = {
        ...formData,
        status: finalStatus,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        updated_at: new Date().toISOString()
      };

      await onSave(payload);
      onClose();
    } catch (err) {
      setFormError(err.message || 'Failed to save update.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl my-6 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold">
              {initialData ? 'Edit Update' : 'Add New Website Update'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {formError && (
            <div className="p-3.5 bg-red-950/90 border border-red-800 text-red-200 text-xs sm:text-sm rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-red-500" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kalki 2898 AD Sets Box Office Record"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Slug (URL Identifier)
                </label>
                <input
                  type="text"
                  placeholder="e.g. kalki-2898-ad-record"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                >
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Author</label>
                <input
                  type="text"
                  placeholder="Admin / Movie Desk"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="published">Published (Visible on site)</option>
                  <option value="draft">Draft (Hidden from public)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Short Description / Summary
              </label>
              <textarea
                rows={2}
                placeholder="Brief excerpt that will appear on card teasers..."
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Section 2: Category Specific Extra Fields */}
          {formData.category === 'Reviews' && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Review Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-400">Rating (e.g. 4.0)</label>
                  <input
                    type="text"
                    placeholder="4.0"
                    value={formData.extra_data.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        extra_data: { ...formData.extra_data, rating: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400">Director</label>
                  <input
                    type="text"
                    placeholder="Nag Ashwin"
                    value={formData.extra_data.director}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        extra_data: { ...formData.extra_data, director: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400">Verdict</label>
                  <input
                    type="text"
                    placeholder="MUST WATCH CINEMATIC MASTERPIECE"
                    value={formData.extra_data.verdict}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        extra_data: { ...formData.extra_data, verdict: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {formData.category === 'OTT Updates' && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider">
                OTT Platform Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-400">Platform Name</label>
                  <input
                    type="text"
                    placeholder="Netflix / Prime Video / aha"
                    value={formData.extra_data.platformName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        extra_data: { ...formData.extra_data, platformName: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400">Quality / Format</label>
                  <input
                    type="text"
                    placeholder="4K Ultra HD • Dolby Atmos"
                    value={formData.extra_data.quality}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        extra_data: { ...formData.extra_data, quality: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400">Release Date Info</label>
                  <input
                    type="text"
                    placeholder="Streaming Now / May 30"
                    value={formData.extra_data.releaseDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        extra_data: { ...formData.extra_data, releaseDate: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {formData.category === 'Trailers' && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Trailer Video Info
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400">YouTube Video ID (or embed code)</label>
                  <input
                    type="text"
                    placeholder="e.g. dQw4w9WgXcQ"
                    value={formData.extra_data.youtubeId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        extra_data: { ...formData.extra_data, youtubeId: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400">Duration (e.g. 2:45)</label>
                  <input
                    type="text"
                    placeholder="2:45"
                    value={formData.extra_data.quality}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        extra_data: { ...formData.extra_data, quality: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Cloudinary Image Upload */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-red-500" />
                Featured Image (Cloudinary)
              </h3>
              <button
                type="button"
                onClick={() => setCustomUrlMode(!customUrlMode)}
                className="text-xs text-slate-400 hover:text-slate-200 underline flex items-center gap-1 cursor-pointer"
              >
                <Link className="w-3 h-3" />
                {customUrlMode ? 'Upload File' : 'Paste Direct URL'}
              </button>
            </div>

            {uploadError && (
              <div className="p-2.5 bg-amber-950/80 border border-amber-800 text-amber-200 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {customUrlMode ? (
              <input
                type="url"
                placeholder="https://res.cloudinary.com/..."
                value={formData.featured_image_url}
                onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            ) : (
              <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 bg-slate-950 p-4 rounded-xl text-center relative transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-red-500">
                    {uploading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Upload className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {uploading ? (
                      <span>Uploading to Cloudinary... ({uploadProgress}%)</span>
                    ) : (
                      <span>
                        Click or drag image file here to upload to{' '}
                        <strong className="text-red-400">Cloudinary</strong>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Supports JPG, PNG, WEBP (preset: ml_default)
                  </span>
                </div>
              </div>
            )}

            {/* Image Preview Card */}
            {formData.featured_image_url && (
              <div className="relative rounded-xl overflow-hidden border border-slate-800 max-h-48 bg-slate-950 flex items-center justify-center p-2 group">
                <img
                  src={formData.featured_image_url}
                  alt="Preview"
                  className="max-h-44 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, featured_image_url: '', featured_image_public_id: '' })}
                  className="absolute top-3 right-3 p-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg opacity-90 transition cursor-pointer shadow-lg"
                  title="Remove Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Section 4: Full Article Content Editor */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-red-500" />
              Full Article Content
            </h3>
            <RichTextEditor
              value={formData.content}
              onChange={(val) => setFormData({ ...formData, content: val })}
              placeholder="Write full formatted news story, review breakdown, or release info here..."
            />
          </div>

          {/* Section 5: Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              placeholder="Tollywood, Prabhas, Box Office, Record"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit('draft')}
              className="px-4 py-2 text-xs font-semibold text-amber-300 bg-amber-950/80 hover:bg-amber-900 border border-amber-800 rounded-xl transition disabled:opacity-50 cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit('published')}
              className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl shadow-lg shadow-red-900/30 transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{initialData ? 'Update & Publish' : 'Publish Update'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
