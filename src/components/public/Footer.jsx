import React from 'react';
import { MapPin, Phone, Mail, Clock, Shield, LogIn, MessageSquare, Eye } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, PlayStoreIcon } from '../common/SocialIcons';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = ({ instituteInfo, onOpenLogin, onOpenAdmission }) => {
  const { isHindi } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Col 1: Institute Branding & Social Connect */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="./logo.jpg"
                alt="Saryoday Academics Logo"
                className="w-10 h-10 rounded-xl object-contain bg-white shadow-md border border-slate-700 p-0.5 shrink-0"
              />
              <div>
                <span className="text-base sm:text-lg font-black text-white tracking-tight">SARYODAY </span>
                <span className="text-base sm:text-lg font-black text-orange-500 tracking-tight">ACADEMICS</span>
                <p className="text-[10px] text-slate-400 font-semibold">
                  {isHindi ? "गोरखपुर का अग्रणी IIT-JEE एवं NEET संस्थान" : "Gorakhpur's Premier IIT-JEE & NEET Institute"}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
              {isHindi
                ? "शाहपुर, गोरखपुर स्थित विश्वसनीय कोचिंग संस्थान — IIT-JEE (Main & Adv), NEET (UG), CBSE, ICSE एवं UP Board के विद्यार्थियों हेतु गुणवत्तापूर्ण शिक्षण एवं समर्पित मार्गदर्शन।"
                : "Premier coaching in Gorakhpur providing result-oriented education for IIT-JEE (Main & Adv), NEET (UG), CBSE, ICSE and UP Board students with expert faculty and individual mentoring."
              }
            </p>

            {/* Social Media Connect Buttons & Compact Visitor Counter */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-2">
                <a
                  href={instituteInfo?.instagram || "https://www.instagram.com/saryoday_gorakhpur/"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white hover:opacity-90 transition shadow"
                  title="Instagram"
                >
                  <InstagramIcon size={14} />
                </a>
                <a
                  href={instituteInfo?.facebook || "https://www.facebook.com/saryoday/"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-lg bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition shadow"
                  title="Facebook"
                >
                  <FacebookIcon size={14} />
                </a>
                <a
                  href={instituteInfo?.youtube || "https://www.youtube.com/@saryodayacademics"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-lg bg-[#FF0000] flex items-center justify-center text-white hover:opacity-90 transition shadow"
                  title="YouTube"
                >
                  <YoutubeIcon size={14} />
                </a>
                <a
                  href={instituteInfo?.playstore || "https://play.google.com/store/apps/details?id=com.saryoday.academics"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-lg bg-emerald-700 flex items-center justify-center text-white hover:opacity-90 transition shadow"
                  title="Google Play Store App"
                >
                  <PlayStoreIcon size={14} />
                </a>
                <a
                  href="https://wa.me/918400100814"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white hover:opacity-90 transition shadow"
                  title="WhatsApp"
                >
                  <MessageSquare size={14} />
                </a>
              </div>

              {/* Ultra-compact Visitor Counter */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[10px] text-slate-400">
                <Eye size={12} className="text-orange-400 shrink-0" />
                <span className="hidden sm:inline">Visitors:</span>
                <img
                  src="https://komarev.com/ghpvc/?username=saryoday-academics-gorakhpur&label=&color=ea580c&style=flat-square"
                  alt="Visitors"
                  className="h-3.5 inline rounded"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Col 2: Campus Office & Quick Contact */}
          <div className="md:col-span-6 space-y-2 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center justify-between">
              <span>{isHindi ? "परिसर कार्यालय (Campus Office)" : "Campus Office & Inquiries"}</span>
              <button
                onClick={() => onOpenLogin('admin')}
                className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 normal-case text-[11px] cursor-pointer"
              >
                <LogIn size={11} />
                <span>{isHindi ? "पोर्टल लॉगिन" : "Portal Login"}</span>
              </button>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-orange-500 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  {instituteInfo?.address || "B-Colony, Near Geeta Vatika Mandir, Shahpur, Gorakhpur, UP – 273006"}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Clock size={14} className="text-orange-500 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  {isHindi
                    ? "सोम - शनि: 07:00 AM से 07:00 PM (रविवार: विशेष डाउट सत्र)"
                    : "Mon – Sat: 07:00 AM – 07:00 PM (Sunday Special Doubt Sessions)"
                  }
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={14} className="text-orange-500 shrink-0" />
                <a href="tel:08400100814" className="text-[11px] hover:text-orange-400 transition font-medium">
                  +91 84001 00814 / 84001 00813
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={14} className="text-orange-500 shrink-0" />
                <a href="mailto:saryodayacademics@gmail.com" className="text-[11px] hover:text-orange-400 transition">
                  saryodayacademics@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Bottom Copyright Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Saryoday Academics, Gorakhpur. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2.5 text-[10px]">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Shield size={11} /> SSL 256-Bit Encrypted & Cloud Secured
            </span>
            <span>•</span>
            <span className="text-slate-400">Targeting IIT-JEE & NEET Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
