import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Telangana Box Office ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    try {
      localStorage.removeItem('tbo_cms_updates');
    } catch (e) {}
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {}
    this.setState({ hasError: false, error: null });
    window.location.href = window.location.origin + window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl space-y-4">
            <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
              !
            </div>
            <h1 className="text-2xl font-extrabold text-white">Something went wrong</h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Telangana Box Office encountered a temporary display issue. Click below to restore live updates.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={this.handleReload}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Reload Website
              </button>
              <button
                onClick={this.handleReset}
                className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Reset Cache & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
