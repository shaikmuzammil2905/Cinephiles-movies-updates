import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export function DeleteConfirmModal({ isOpen, title, onConfirm, onCancel, loading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5 text-red-500">
            <div className="p-2 bg-red-950/80 border border-red-900 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-white">Confirm Deletion</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-slate-300 font-medium">
            Are you sure you want to delete this item?
          </p>
          {title && (
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-red-300 truncate">
              "{title}"
            </div>
          )}
          <p className="text-xs text-slate-400">
            This action cannot be undone. It will permanently remove the record from Supabase and remove it from the public website.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-900/40 transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Permanently</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
