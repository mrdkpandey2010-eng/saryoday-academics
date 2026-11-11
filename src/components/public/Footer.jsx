import React from 'react';
import { GraduationCap, MapPin, Phone, Mail, Clock, Heart, Shield, LogIn } from 'lucide-react';

export const Footer = ({ instituteInfo, onOpenLogin, onOpenAdmission }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Institute Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black shadow-md">
                <GraduationCap size={22} className="text-amber-300" />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight">SARYODAY </span>
                <span className="text-lg font-black text-orange-500 tracking-tight">ACADEMICS</span>
                <p className="text-[10px] text-slate-400 font-semibold">सर्वोदय एकेडेमिक्स • गोरखपुर</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              गोरखपुर का अग्रणी कोचिंग संस्थान जो IIT-JEE, NEET, CBSE, ICSE एवं UP Board के विद्यार्थियों को गुणवत्तापूर्ण और परिणाम-उन्मुख शिक्षा प्रदान करता है।
            </p>

            <div className="pt-1 text-[11px] text-slate-500 space-y-1">
              <p>संबद्धता: CBSE | ICSE | UP Board</p>
              <p>फाउंडेशन: कक्षा 6वीं से 12वीं तक</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              महत्वपूर्ण लिंक्स (Quick Links)
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-orange-400 transition">मुख्य पृष्ठ (Home)</a></li>
              <li><a href="#about" className="hover:text-orange-400 transition">हमारे बारे में (About Us)</a></li>
              <li><a href="#courses" className="hover:text-orange-400 transition">उपलब्ध कोर्सेज (All Courses)</a></li>
              <li><a href="#faculty" className="hover:text-orange-400 transition">फैकल्टी टीम (Expert Faculty)</a></li>
              <li><a href="#toppers" className="hover:text-orange-400 transition">हॉल ऑफ फेम व परिणाम (Results)</a></li>
              <li><a href="#gallery" className="hover:text-orange-400 transition">फोटो गैलरी (Gallery)</a></li>
              <li><a href="#notices" className="hover:text-orange-400 transition">सूचना पट्ट (Notice Board)</a></li>
              <li><a href="#contact" className="hover:text-orange-400 transition">संपर्क शाखा (Contact Us)</a></li>
            </ul>
          </div>

          {/* Col 3: Portals Access */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              लॉगिन पोर्टल (Management)
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onOpenLogin('admin')}
                  className="hover:text-orange-400 flex items-center gap-1.5 transition text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>कोचिंग संचालक (Admin Panel)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLogin('teacher')}
                  className="hover:text-orange-400 flex items-center gap-1.5 transition text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>अध्यापक पोर्टल (Teacher Login)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLogin('student')}
                  className="hover:text-orange-400 flex items-center gap-1.5 transition text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>छात्र/छात्रा पोर्टल (Student Login)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLogin('parent')}
                  className="hover:text-orange-400 flex items-center gap-1.5 transition text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  <span>अभिभावक पोर्टल (Parent Login)</span>
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmission}
                  className="px-3 py-1.5 bg-orange-600/30 hover:bg-orange-600 border border-orange-500/50 text-orange-300 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <span>ऑनलाइन प्रवेश फॉर्म</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Address & Timings */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              शाखा संपर्क (Campus Office)
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                <span>
                  {instituteInfo?.address || "बी-कॉलोनी, शाहपुर, गोरखपुर, उत्तर प्रदेश – 273006 (निकट गीता वाटिका)"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-orange-500 shrink-0" />
                <span>+91 84001 00814 / 84001 00813</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-orange-500 shrink-0" />
                <span>saryodayacademics@gmail.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-orange-500 shrink-0 mt-0.5" />
                <span>प्रातः 07:00 AM से सायं 07:00 PM (सोम - शनि)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Saryoday Academics, Gorakhpur. सर्वाधिकार सुरक्षित।
          </p>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Shield size={12} /> GitHub Pages & Cloud Ready
            </span>
            <span>•</span>
            <span className="text-slate-400">Gorakhpur Premier Education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
