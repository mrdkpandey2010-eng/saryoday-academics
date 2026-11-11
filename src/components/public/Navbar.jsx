import React, { useState } from 'react';
import { Menu, X, LogIn, Sparkles, UserCheck, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Navbar = ({ onOpenLogin, onOpenAdmission, isAdminActive = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLanguage, isHindi } = useLanguage();

  // Navigation tabs with Library and Career added, supporting English Primary + Hindi
  const navLinks = [
    { nameEn: 'Home', nameHi: 'होम', href: '#home' },
    { nameEn: 'About', nameHi: 'परिचय', href: '#about' },
    { nameEn: 'Courses', nameHi: 'कोर्सेज', href: '#courses' },
    { nameEn: 'Faculty', nameHi: 'फैकल्टी', href: '#faculty' },
    { nameEn: 'Library', nameHi: 'लाइब्रेरी', href: '#library' },
    { nameEn: 'Career', nameHi: 'करियर', href: '#career' },
    { nameEn: 'Results', nameHi: 'परिणाम', href: '#toppers' },
    { nameEn: 'Gallery', nameHi: 'गैलरी', href: '#gallery' },
    { nameEn: 'Notices', nameHi: 'सूचना पट्ट', href: '#notices' },
    { nameEn: 'Contact', nameHi: 'संपर्क', href: '#contact' },
    { nameEn: 'Admission', nameHi: 'एडमिशन', href: '#admission', isSpecial: true },
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-3">
          
          {/* Logo & Institute Branding */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 select-none mr-1 sm:mr-2"
          >
            <img
              src="./logo.jpg"
              alt="Saryoday Logo"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl object-contain bg-white shadow-md shadow-orange-500/20 border-2 border-orange-500/40 p-0.5 group-hover:scale-105 transition shrink-0"
            />
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  SARYODAY
                </span>
                <span className="text-base sm:text-lg font-black text-orange-600 tracking-tight">
                  ACADEMICS
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-1 tracking-wide flex items-center gap-1 leading-none">
                <span className="text-orange-600">{isHindi ? "सर्वोदय एकेडेमिक्स" : "IIT-JEE & NEET"}</span>
                <span>•</span>
                <span>Gorakhpur</span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation Tabs (Middle) */}
          <div className="hidden xl:flex items-center gap-1 font-bold text-[12px] text-slate-700 whitespace-nowrap shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`whitespace-nowrap px-2 py-1.5 rounded-xl transition shrink-0 ${
                  link.isSpecial
                    ? 'text-orange-700 bg-orange-100/90 hover:bg-orange-200 border border-orange-300 font-extrabold shadow-2xs'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {isHindi ? link.nameHi : link.nameEn}
              </a>
            ))}
          </div>

          {/* Action CTAs (Right Side: Language Switcher & Login Portal) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-300 hover:border-orange-500 bg-slate-50 hover:bg-orange-50 text-[11px] font-extrabold text-slate-700 hover:text-orange-600 transition shadow-2xs cursor-pointer"
              title={lang === 'en' ? 'Switch to Hindi (हिंदी में देखें)' : 'Switch to English'}
              aria-label="Language Switcher"
            >
              <Globe size={13} className="text-orange-600" />
              <span>{lang === 'en' ? 'EN | हिंदी' : 'हिंदी | EN'}</span>
            </button>

            {/* Login Portal CTA */}
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition whitespace-nowrap cursor-pointer shadow-2xs"
            >
              <LogIn size={13} className="text-orange-600" />
              <span className="hidden sm:inline">{isHindi ? "पोर्टल लॉगिन" : "Login Portal"}</span>
              <span className="sm:hidden">{isHindi ? "लॉगिन" : "Login"}</span>
            </button>

            {/* Mobile Menu Button (Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-orange-600 rounded-xl hover:bg-slate-100 transition focus:outline-none shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-1.5 shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block px-3.5 py-2 rounded-xl text-sm font-bold transition ${
                link.isSpecial
                  ? 'bg-orange-50 text-orange-700 border border-orange-200'
                  : 'text-slate-800 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {isHindi ? link.nameHi : link.nameEn}
            </a>
          ))}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700">Language / भाषा:</span>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 bg-orange-600 text-white rounded-lg text-xs font-extrabold flex items-center gap-1"
              >
                <Globe size={12} />
                <span>{lang === 'en' ? 'Switch to हिंदी' : 'Switch to English'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmission();
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>{isHindi ? "ऑनलाइन एडमिशन पूछताछ" : "Online Admission Form"}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn size={16} className="text-orange-400" />
              <span>{isHindi ? "पोर्टल लॉगिन (Admin / Teacher / Student / Parent)" : "Login Portal (Admin / Faculty / Student)"}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
