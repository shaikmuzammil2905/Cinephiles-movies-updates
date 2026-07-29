import React, { useState } from 'react';
import { Mail, Heart, ArrowUp, ShieldCheck, FileText, Info, HelpCircle, PhoneCall, ExternalLink, X } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon, LinkedinIcon, WhatsappIcon } from './SocialIcons';

export function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeModal = () => setActiveModal(null);

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900/80 relative overflow-hidden pt-12 pb-24 md:pb-12">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <a href="#" className="inline-block transition-transform hover:scale-105">
                <img src="/tbo_logo.png" alt="TELANGANA BOX OFFICE" className="h-10 sm:h-12 w-auto object-contain" />
              </a>
            </div>
            
            <p className="text-xs leading-relaxed text-slate-400 font-normal">
              TELANGANA BOX OFFICE is South India’s premier digital news portal providing real-time box office collections, Tollywood 2nd week stats, movie reviews, OTT release schedules, and trailer launches.
            </p>

            {/* Contact Email - Highlighted for Mobile and Desktop View */}
            <div className="pt-1">
              <a
                href="mailto:contact@telanganaboxoffice.com"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 hover:bg-slate-900 text-slate-200 text-xs font-semibold transition-all group shadow-md w-full sm:w-auto"
              >
                <div className="w-7 h-7 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Contact Mail Desk</span>
                  <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors truncate">contact@telanganaboxoffice.com</span>
                </div>
              </a>
            </div>

            {/* Social Media Icons with Smooth Hover Animations */}
            <div className="pt-2">
              <span className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Follow Telangana Box Office
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/25"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-pink-500/25"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-400 hover:bg-black text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-slate-500/25"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-600 hover:bg-[#FF0000] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-red-600/25"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-600 hover:bg-[#0A66C2] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-600/25"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-[#25D366] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/25"
                >
                  <WhatsappIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4 border-b border-slate-800/80 pb-2.5 flex items-center justify-between">
              <span>Quick Links</span>
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#hero-section" className="hover:text-red-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-red-500 transition-colors"></span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#news-section" className="hover:text-red-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-red-500 transition-colors"></span>
                  <span>Latest News</span>
                </a>
              </li>
              <li>
                <a href="#boxoffice-section" className="hover:text-red-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-red-500 transition-colors"></span>
                  <span>Box Office</span>
                </a>
              </li>
              <li>
                <a href="#reviews-section" className="hover:text-red-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-red-500 transition-colors"></span>
                  <span>Movie Reviews</span>
                </a>
              </li>
              <li>
                <a href="#ott-section" className="hover:text-red-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-red-500 transition-colors"></span>
                  <span>OTT Releases</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('about')}
                  className="hover:text-red-500 transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-red-500 transition-colors"></span>
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('contact')}
                  className="hover:text-red-500 transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-red-500 transition-colors"></span>
                  <span>Contact Us</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: About Us Summary */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4 border-b border-slate-800/80 pb-2.5 flex items-center justify-between">
              <span>About Us</span>
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
            </h3>
            <p className="text-xs leading-relaxed text-slate-400 mb-3">
              Telangana Box Office (TBO) is an independent cinema research and entertainment network. We provide accurate collections, theater gross analysis, exclusive director interviews, and streaming release schedules.
            </p>
            <button
              onClick={() => setActiveModal('about')}
              className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors pt-1"
            >
              <span>Read Full Story</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Column 4: Privacy Policy & Legal */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4 border-b border-slate-800/80 pb-2.5 flex items-center justify-between">
              <span>Privacy Policy</span>
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
            </h3>
            <ul className="space-y-2.5 text-xs font-medium mb-4">
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-500 transition-colors" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-500 transition-colors" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('disclaimer')}
                  className="hover:text-red-500 transition-colors flex items-center gap-2 group text-left"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-500 transition-colors" />
                  <span>Disclaimer</span>
                </button>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-normal">
              <span className="font-bold text-slate-300 block mb-1">Trade Notice:</span>
              Box office statistics are compiled from trade exhibitors and distributors. Figures represent estimates for analytical purposes.
            </div>
          </div>

        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="font-medium text-center sm:text-left text-slate-400">
            © 2026 Telangana Box Office. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600 animate-pulse" /> for Cinephiles
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-red-600 text-slate-400 hover:text-white transition-all shadow-md flex items-center justify-center group"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Footer Overlay Modals for Privacy, Terms, Disclaimer, About Us & Contact Us */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto space-y-4">
            
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'about' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-red-500 font-extrabold text-sm uppercase">
                  <Info className="w-5 h-5" />
                  <span>About Telangana Box Office</span>
                </div>
                <h3 className="text-xl font-black text-white">Your Ultimate Destination for Indian Cinema Intelligence</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                  Telangana Box Office (TBO) is an independent media platform dedicated to bringing transparent, authentic, and real-time box office statistics, movie news, in-depth film reviews, and OTT release tracking for Indian cinema lovers worldwide.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                  With a dedicated team of trade analysts and entertainment journalists, TBO covers Tollywood 2nd week collections, pan-India blockbusters, digital rights premieres, and theatrical countdowns.
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                  Contact Editorial Team: <a href="mailto:contact@telanganaboxoffice.com" className="text-red-400 font-bold hover:underline">contact@telanganaboxoffice.com</a>
                </div>
              </div>
            )}

            {activeModal === 'contact' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-500 font-extrabold text-sm uppercase">
                  <PhoneCall className="w-5 h-5" />
                  <span>Contact Us</span>
                </div>
                <h3 className="text-xl font-black text-white">Get in Touch with Telangana Box Office</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Have press releases, media inquiries, advertisement proposals, or box office data updates? Reach out directly to our team.
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block font-semibold">Official Email Address:</span>
                      <a href="mailto:contact@telanganaboxoffice.com" className="text-sm font-bold text-white hover:text-red-400 transition-colors">
                        contact@telanganaboxoffice.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  Response time: Usually within 24 hours for official trade inquiries.
                </div>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-red-500 font-extrabold text-sm uppercase">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Privacy Policy</span>
                </div>
                <h3 className="text-xl font-black text-white">Privacy Policy for Telangana Box Office</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  At Telangana Box Office, available at telanganaboxoffice.com, user privacy is one of our top priorities. This Privacy Policy document contains types of information that is collected and recorded by TBO and how we use it.
                </p>
                <h4 className="text-xs font-bold text-white uppercase">Log Files & Analytics</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Telangana Box Office follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, ISP, date and time stamp, and referring/exit pages.
                </p>
              </div>
            )}

            {activeModal === 'terms' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-red-500 font-extrabold text-sm uppercase">
                  <FileText className="w-5 h-5" />
                  <span>Terms & Conditions</span>
                </div>
                <h3 className="text-xl font-black text-white">Terms of Service</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  By accessing telanganaboxoffice.com, you agree to comply with these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All intellectual property rights for original editorial content belong to Telangana Box Office. Promotional posters and movie stills belong to their respective production houses.
                </p>
              </div>
            )}

            {activeModal === 'disclaimer' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-red-500 font-extrabold text-sm uppercase">
                  <HelpCircle className="w-5 h-5" />
                  <span>Disclaimer</span>
                </div>
                <h3 className="text-xl font-black text-white">Trade & Box Office Disclaimer</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The box office figures reported on Telangana Box Office are compiled from various trade sources, distributor networks, theatre chains, and exhibitor contacts.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  While every attempt is made to verify stats, numbers are approximate estimates for tracking trends and analytical informational purposes only.
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}
    </footer>
  );
}
