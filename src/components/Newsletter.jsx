import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 4000);
    }
  };

  return (
    <section className="bg-[#031738] text-white py-8 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#031738] via-slate-900 to-[#031738] border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left Side Info */}
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center shrink-0 shadow-lg">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg lg:text-xl font-extrabold uppercase tracking-wide leading-tight">
              GET THE LATEST MOVIE NEWS, REVIEWS & BOX OFFICE UPDATES IN YOUR INBOX!
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Join over 150,000+ movie fans receiving instant box office reports and exclusive news.
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-auto">
          {isSubmitted ? (
            <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold px-6 py-3 rounded-xl flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Thank you! You are now subscribed to Telangana Box Office updates.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full lg:w-96">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 shadow-inner"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#d90429] hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
