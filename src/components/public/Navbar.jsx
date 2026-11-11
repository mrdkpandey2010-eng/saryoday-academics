import React, { useState } from 'react';
import { Menu, X, GraduationCap, ChevronDown, BookOpen, Users, Trophy, Image, PhoneCall, LogIn, Award } from 'lucide-react';

export const Navbar = ({ onOpenLogin, onOpenAdmission }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'होम (Home)', href: '#home' },
    { name: 'हमारे बारे में (About)', href: '#about' },
    { name: 'कोर्सेज (Courses)', href: '#courses' },
    { name: 'फैकल्टी (Faculty)', href: '#faculty' },
    { name: 'टॉपर्स व परिणाम (Results)', href: '#toppers' },
    { name: 'गैलरी (Gallery)', href: '#gallery' },
    { name: 'सूचना पट्ट (Notices)', href: '#notices' },
    { name: 'संपर्क (Contact)', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Branding */}
          <a href="#home" className="flex items-center gap-3 group">
            {/* Saryoday Official Logo */}
            <div className="relative group-hover:scale-105 transition shrink-0">
              <img
                src="./logo.jpg"
                alt="Saryoday Academics Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-contain bg-white shadow-md shadow-orange-500/20 border-2 border-orange-500/40 p-0.5"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  SARYODAY
                </span>
                <span className="text-xl sm:text-2xl font-black text-orange-600 tracking-tight">
                  ACADEMICS
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-500 -mt-1 tracking-wide flex items-center gap-1.5">
                <span className="text-orange-600">सर्वोदय एकेडेमिक्स</span>
                <span>•</span>
                <span>शाहपुर, गोरखपुर</span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1 font-semibold text-[13px] text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-lg hover:text-orange-600 hover:bg-orange-50 transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={onOpenAdmission}
              className="px-4 py-2 text-xs font-bold text-orange-700 bg-orange-100/80 hover:bg-orange-200 rounded-lg transition border border-orange-200"
            >
              एडमिशन पूछताछ
            </button>
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-slate-900 to-slate-800 hover:from-orange-600 hover:to-orange-700 rounded-lg shadow transition"
            >
              <LogIn size={14} className="text-orange-400" />
              <span>पोर्टल लॉगिन</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenLogin}
              className="p-2 text-xs font-bold text-white bg-orange-600 rounded-lg shadow sm:hidden"
            >
              लॉगिन
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-orange-600 rounded-lg hover:bg-slate-100 transition focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmission();
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-orange-700 bg-orange-50 border border-orange-200 rounded-lg"
            >
              ऑनलाइन प्रवेश फॉर्म भरें
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-slate-900 rounded-lg flex items-center justify-center gap-2"
            >
              <LogIn size={16} className="text-orange-400" />
              <span>लॉगिन पोर्टल (Admin / Teacher / Student / Parent)</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
