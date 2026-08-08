import React, { useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  PlusCircle,
  FolderKanban,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
  Film,
  Globe,
  Database,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function AdminLayout({
  activeTab,
  setActiveTab,
  user,
  onLogout,
  onOpenAddModal,
  onBackToSite,
  toast,
  children
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'updates', label: 'All Updates', icon: Layers },
    { id: 'add', label: 'Add Update', icon: PlusCircle, isAction: true },
    { id: 'categories', label: 'Categories', icon: FolderKanban },
    { id: 'media', label: 'Media Assets', icon: ImageIcon }
  ];

  const handleMenuClick = (item) => {
    if (item.isAction) {
      onOpenAddModal();
    } else {
      setActiveTab(item.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-red-600 selection:text-white">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white">
            <Film className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-sm text-white">TBO ADMIN</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between z-40 transition-transform duration-200 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } h-screen`}
      >
        {/* Top Logo */}
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30 text-white shrink-0">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-white tracking-tight leading-tight">
                TELANGANA BOX OFFICE
              </h1>
              <p className="text-[10px] text-red-500 font-semibold uppercase tracking-widest">
                CMS Portal
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-800/80">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Quick Links
            </div>

            <button
              onClick={onBackToSite}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 transition cursor-pointer"
            >
              <Globe className="w-4 h-4 shrink-0 text-blue-400" />
              <span>View Public Site</span>
            </button>
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 max-w-[140px]">
              <p className="text-xs font-bold text-white truncate">
                {user?.email ? user.email.split('@')[0] : 'Admin User'}
              </p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>

            <button
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/50 rounded-xl transition cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-screen relative">
        {/* Toast Notifications */}
        {toast && (
          <div
            className={`fixed top-5 right-5 z-50 p-4 rounded-2xl shadow-2xl border flex items-center gap-3 max-w-sm animate-in fade-in slide-in-from-top-3 ${
              toast.type === 'error'
                ? 'bg-red-950 border-red-800 text-red-100'
                : 'bg-emerald-950 border-emerald-800 text-emerald-100'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <span className="text-xs font-medium">{toast.message}</span>
          </div>
        )}

        {children}
      </main>
    </div>
  );
}
