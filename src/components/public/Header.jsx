import React from 'react';
import { Phone, Mail, MapPin, Clock, Bell, UserCheck, MessageSquare } from 'lucide-react';

export const Header = ({ onOpenLogin, onOpenAdmission }) => {
  return (
    <header className="w-full bg-slate-900 text-slate-200 border-b border-slate-800 text-xs">
      {/* Topmost Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left contact info */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[11px] sm:text-xs">
            <a
              href="tel:08400100814"
              className="flex items-center gap-1.5 hover:text-orange-400 transition font-medium"
            >
              <Phone size={13} className="text-orange-500" />
              <span>+91 84001 00814</span> / <span>84001 00813</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin size={13} className="text-orange-500" />
              <span>बी-कॉलोनी, शाहपुर, गोरखपुर</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock size={13} className="text-orange-500" />
              <span>प्रातः 7:00 AM - सायं 7:00 PM</span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            <button
              onClick={onOpenAdmission}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-3 py-1 rounded-md transition shadow-sm animate-pulse-subtle flex items-center gap-1"
            >
              <Bell size={13} />
              <span>प्रवेश / छात्रवृत्ति फॉर्म</span>
            </button>

            <a
              href="https://wa.me/918400100814?text=नमस्ते%20सर्वोदय%20एकेडेमिक्स,%20मुझे%20कोचिंग%20और%20एडमिशन%20के%20बारे%20में%20जानकारी%20चाहिए।"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-2.5 py-1 rounded-md transition flex items-center gap-1"
            >
              <MessageSquare size={13} />
              <span className="hidden sm:inline">व्हाट्सएप</span>
            </a>

            <button
              onClick={onOpenLogin}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-orange-400 font-bold px-3 py-1 rounded-md transition flex items-center gap-1.5 shadow-inner"
            >
              <UserCheck size={13} />
              <span>लॉगिन पोर्टल</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Classes Style News Ticker Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white py-1.5 px-4 overflow-hidden shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="shrink-0 flex items-center gap-1 bg-slate-950/70 text-orange-300 font-bold text-[10px] uppercase px-2 py-0.5 rounded shadow">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            नवीन सूचना (Notice)
          </div>
          <div className="overflow-hidden whitespace-nowrap text-[12px] font-medium">
            <span className="inline-block animate-[marquee_25s_linear_infinite]">
              📢 सत्र 2025-26 के लिए Saryoday Scholarship Test (SST) रजिस्ट्रेशन प्रारंभ • कक्षा 10वीं व 12वीं बोर्ड परीक्षार्थियों हेतु 90-दिवसीय क्रैश कोर्स 15 नवम्बर से • प्रत्येक रविवार NTA पैटर्न पर NEET व JEE मॉक टेस्ट एवं विशेष डाउट क्लासेज • शाहपुर गोरखपुर ब्रांच में प्रवेश हेतु कॉल करें: 8400100814 📢
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
