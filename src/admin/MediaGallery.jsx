import React from 'react';
import { Image, ExternalLink, Copy, Check } from 'lucide-react';

export function MediaGallery({ updates = [] }) {
  const [copiedUrl, setCopiedUrl] = React.useState(null);

  // Extract all non-empty featured images from updates
  const images = updates
    .filter((u) => u.featured_image_url)
    .map((u) => ({
      id: u.id,
      title: u.title,
      url: u.featured_image_url,
      category: u.category,
      isCloudinary: u.featured_image_url.includes('cloudinary.com')
    }));

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-950/80 border border-red-900 rounded-xl text-red-400">
            <Image className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Media Assets Gallery</h2>
            <p className="text-xs text-slate-400">
              Browse featured images uploaded to Cloudinary and stored across website updates.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      {images.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-12 text-center rounded-2xl">
          <Image className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-300">No media assets found</p>
          <p className="text-xs text-slate-500 mt-1">Upload images when adding or editing updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div
              key={img.id || idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg group hover:border-slate-700 transition"
            >
              <div className="h-44 bg-slate-950 relative overflow-hidden flex items-center justify-center p-2">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {img.isCloudinary && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-sky-950/90 border border-sky-800 text-sky-300 text-[10px] font-bold rounded-md">
                    Cloudinary
                  </span>
                )}
              </div>
              <div className="p-3 space-y-2">
                <h4 className="text-xs font-semibold text-white truncate" title={img.title}>
                  {img.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  <span className="text-red-400 font-medium">{img.category}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => copyLink(img.url)}
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
                      title="Copy URL"
                    >
                      {copiedUrl === img.url ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
                      title="Open full size"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
