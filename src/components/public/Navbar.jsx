import React, { useState } from 'react';
import { Menu, X, LogIn, Sparkles, UserCheck } from 'lucide-react';

export const Navbar = ({ onOpenLogin, onOpenAdmission, isAdminActive = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pure Hindi navigation tabs - crisp, compact & no overlapping
  const navLinks = [
    { name: 'होम', href: '#home' },
    { name: 'हमारे बारे में', href: '#about' },
    { name: 'कोर्सेज', href: '#courses' },
    { name: 'फैकल्टी', href: '#faculty' },
    { name: 'टॉपर्स व परिणाम', href: '#toppers' },
    { name: 'गैलरी', href: '#gallery' },
    { name: 'सूचना पट्ट', href: '#notices' },
    { name: 'संपर्क', href: '#contact' },
    { name: 'एडमिशन पूछताछ', href: '#admission', isSpecial: true },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`sticky z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 transition-all ${
        isAdminActive ? 'top-[42px]' : 'top-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Logo & Branding (Left Side - Shrink 0 to prevent squeezing) */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 select-none mr-2"
          >
            <img
              src="./logo.jpg"
              alt="Saryoday Logo"
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl object-contain bg-white shadow-md shadow-orange-500/20 border-2 border-orange-500/40 p-0.5 group-hover:scale-105 transition shrink-0"
            />
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  SARYODAY
                </span>
                <span className="text-lg sm:text-xl font-black text-orange-600 tracking-tight">
                  ACADEMICS
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-500 mt-1 tracking-wide flex items-center gap-1.5 leading-none">
                <span className="text-orange-600">सर्वोदय एकेडेमिक्स</span>
                <span>•</span>
                <span>शाहपुर, गोरखपुर</span>
              </p>
            </div>
          </a>

          {/* Pure Hindi Desktop Navigation Tabs (Middle) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 font-bold text-xs xl:text-[13px] text-slate-700 whitespace-nowrap shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`whitespace-nowrap px-2.5 py-1.5 rounded-xl transition shrink-0 ${
                  link.isSpecial
                    ? 'text-orange-700 bg-orange-100/90 hover:bg-orange-200 border border-orange-300 font-extrabold shadow-2xs'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTAs (Right Side) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition whitespace-nowrap cursor-pointer shadow-2xs"
            >
              <LogIn size={14} className="text-orange-600" />
              <span>पोर्टल लॉगिन</span>
            </button>

            {/* Mobile Menu Button (Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-orange-600 rounded-xl hover:bg-slate-100 transition focus:outline-none shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-1.5 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block px-3.5 py-2 rounded-xl text-sm font-bold transition ${
                link.isSpecial
                  ? 'bg-orange-50 text-orange-700 border border-orange-200'
                  : 'text-slate-800 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {link.name}
            </a>
          ))}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmission();
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              <span>एडमिशन पूछताछ फॉर्म</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition flex items-center justify-center gap-2"
            >
              <LogIn size={16} className="text-orange-400" />
              <span>पोर्टल लॉगिन (संचालक / शिक्षक / छात्र / अभिभावक)</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
