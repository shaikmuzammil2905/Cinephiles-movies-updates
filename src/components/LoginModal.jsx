import React, { useState } from 'react';
import { X, User, Lock, Mail, CheckCircle2 } from 'lucide-react';

export function LoginModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 p-6 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Access exclusive box office trade reports and save your favorite movie reviews.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center text-xs font-bold flex flex-col items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            <span>Success! Logging you into Telangana Box Office...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 text-xs text-slate-900 rounded-lg border border-slate-300 focus:border-red-600 focus:outline-none"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 text-xs text-slate-900 rounded-lg border border-slate-300 focus:border-red-600 focus:outline-none"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 text-xs text-slate-900 rounded-lg border border-slate-300 focus:border-red-600 focus:outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#d90429] hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md mt-2"
            >
              {isSignUp ? 'Sign Up' : 'Log In'}
            </button>

            <div className="text-center pt-2 text-xs text-slate-500">
              {isSignUp ? (
                <p>
                  Already have an account?{' '}
                  <button type="button" onClick={() => setIsSignUp(false)} className="text-red-600 font-bold hover:underline">
                    Log In
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{' '}
                  <button type="button" onClick={() => setIsSignUp(true)} className="text-red-600 font-bold hover:underline">
                    Register Now
                  </button>
                </p>
              )}
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
