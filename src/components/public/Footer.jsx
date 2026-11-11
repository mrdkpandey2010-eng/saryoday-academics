import React from 'react';
import { GraduationCap, MapPin, Phone, Mail, Clock, Heart, Shield, LogIn, MessageSquare, Users, Eye, Activity } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, PlayStoreIcon } from '../common/SocialIcons';

export const Footer = ({ instituteInfo, onOpenLogin, onOpenAdmission }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Institute Info & Visitor Counter */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="./logo.jpg"
                alt="Saryoday Academics Logo"
                className="w-11 h-11 rounded-xl object-contain bg-white shadow-md border border-slate-700 p-0.5 shrink-0"
              />
              <div>
                <span className="text-lg font-black text-white tracking-tight">SARYODAY </span>
                <span className="text-lg font-black text-orange-500 tracking-tight">ACADEMICS</span>
                <p className="text-[10px] text-slate-400 font-semibold">Gorakhpur's Premier IIT-JEE & NEET Institute</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Premier coaching institute in Gorakhpur providing result-oriented education for IIT-JEE (Main & Adv), NEET (UG), CBSE, ICSE and UP Board students with expert faculty and individual mentoring.
            </p>

            {/* Social Media Connect Buttons (Instagram, Facebook, YouTube, Play Store, WhatsApp) */}
            <div className="pt-1">
              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">Connect With Us:</p>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={instituteInfo?.instagram || "https://www.instagram.com/saryoday_gorakhpur/"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white hover:opacity-90 transition shadow"
                  title="Follow on Instagram"
                >
                  <InstagramIcon size={16} />
                </a>
                <a
                  href={instituteInfo?.facebook || "https://www.facebook.com/saryoday/"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition shadow"
                  title="Follow on Facebook"
                >
                  <FacebookIcon size={16} />
                </a>
                <a
                  href={instituteInfo?.youtube || "https://www.youtube.com/@saryodayacademics"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#FF0000] flex items-center justify-center text-white hover:opacity-90 transition shadow"
                  title="Watch on YouTube"
                >
                  <YoutubeIcon size={16} />
                </a>
                <a
                  href={instituteInfo?.playstore || "https://play.google.com/store/apps/details?id=com.saryoday.academics"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white hover:opacity-90 transition shadow"
                  title="Download Saryoday Android App"
                >
                  <PlayStoreIcon size={16} />
                </a>
                <a
                  href="https://wa.me/918400100814"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white hover:opacity-90 transition shadow"
                  title="Chat on WhatsApp"
                >
                  <MessageSquare size={16} />
                </a>
              </div>
            </div>

            {/* Website Live Visitor Counter Widget */}
            <div className="pt-2">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-inner space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                  <span className="flex items-center gap-1.5 text-orange-400">
                    <Eye size={13} />
                    <span>Website Visitor Counter</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Live</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="https://komarev.com/ghpvc/?username=saryoday-academics-gorakhpur&label=Total+Visitors&color=ea580c&style=flat-square"
                    alt="Saryoday Academics Visitor Counter"
                    className="rounded shadow-sm max-w-full"
                    loading="lazy"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Cloud verified real-time visitor tracking
                </p>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (with Library & Career) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#home" className="hover:text-orange-400 transition">Home (होम)</a></li>
              <li><a href="#about" className="hover:text-orange-400 transition">About Us (हमारे बारे में)</a></li>
              <li><a href="#courses" className="hover:text-orange-400 transition">Courses (कोर्सेज)</a></li>
              <li><a href="#faculty" className="hover:text-orange-400 transition">Faculty (फैकल्टी)</a></li>
              <li><a href="#library" className="hover:text-orange-400 transition text-amber-400 font-semibold">Library (लाइब्रेरी)</a></li>
              <li><a href="#career" className="hover:text-orange-400 transition text-amber-400 font-semibold">Career (करियर)</a></li>
              <li><a href="#toppers" className="hover:text-orange-400 transition">Results & Toppers</a></li>
              <li><a href="#gallery" className="hover:text-orange-400 transition">Gallery (गैलरी)</a></li>
              <li><a href="#notices" className="hover:text-orange-400 transition">Notice Board</a></li>
              <li><a href="#contact" className="hover:text-orange-400 transition">Contact (संपर्क)</a></li>
              <li><a href="#admission" className="text-orange-400 hover:underline font-bold transition">Admission Inquiry</a></li>
            </ul>
          </div>

          {/* Col 3: Portals Access */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Login Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onOpenLogin('admin')}
                  className="hover:text-orange-400 flex items-center gap-1.5 transition text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>Director & Admin Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLogin('teacher')}
                  className="hover:text-orange-400 flex items-center gap-1.5 transition text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>Teacher & Faculty Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLogin('student')}
                  className="hover:text-orange-400 flex items-center gap-1.5 transition text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Student Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLogin('parent')}
                  className="hover:text-orange-400 flex items-center gap-1.5 transition text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  <span>Parent Portal</span>
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmission}
                  className="px-3 py-1.5 bg-orange-600/30 hover:bg-orange-600 border border-orange-500/50 text-orange-300 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Online Admission Form</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Address & Timings */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Campus Office
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                <span>
                  {instituteInfo?.address || "B-Colony, Near Geeta Vatika Mandir & Airtel Store, Shahpur, Gorakhpur, UP – 273006"}
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
                <span>Mon – Sat: 07:00 AM to 07:00 PM (Sunday Special Doubt Class)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Saryoday Academics, Gorakhpur. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Shield size={12} /> SSL 256-Bit Encrypted & Cloud Secured
            </span>
            <span>•</span>
            <span className="text-slate-400">Targeting IIT-JEE & NEET Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
