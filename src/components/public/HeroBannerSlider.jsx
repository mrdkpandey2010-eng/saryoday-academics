import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, CheckCircle, Sparkles, ArrowRight, Shield, BookOpen, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HeroBannerSlider = ({ banners, onOpenAdmission, onExploreCourses }) => {
  const { isHindi } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const slide = banners[currentSlide] || banners[0];

  // Language-aware slide text getters (English default + Hindi)
  const getSlideBadge = () => {
    if (isHindi) return slide.highlightTextHi || slide.badgeHi || slide.highlightText || slide.badge || "सत्र 2025-26 प्रवेश प्रारंभ";
    return slide.highlightText || slide.badge || slide.highlightTextHi || slide.badgeHi || "Admissions Open Session 2025-26";
  };

  const getSlideTitle = () => {
    if (isHindi) return slide.titleHi || slide.title;
    return slide.title || slide.titleHi || "Committed to Top Ranks in IIT-JEE & NEET";
  };

  const getSlideSubtitle = () => {
    if (isHindi) return slide.subtitleHi || slide.subtitle;
    return slide.subtitle || slide.subtitleHi || "Saryoday Academics, Shahpur Gorakhpur — Limited Batch Size, 1-on-1 Mentorship & Distinguished Faculty";
  };

  const getCtaPrimary = () => {
    if (isHindi) return slide.ctaPrimaryHi || slide.ctaPrimary;
    return slide.ctaPrimary || slide.ctaPrimaryHi || "Apply Online / Admission Form";
  };

  const getCtaSecondary = () => {
    if (isHindi) return slide.ctaSecondaryHi || slide.ctaSecondary;
    return slide.ctaSecondary || slide.ctaSecondaryHi || "Explore Programs & Fees";
  };

  return (
    <div id="home" className="relative overflow-hidden bg-slate-950 text-white min-h-[520px] lg:min-h-[580px] flex items-center scroll-mt-24">
      {/* Background with image and dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.image}
          alt={getSlideTitle()}
          className="w-full h-full object-cover scale-105 transition-all duration-1000 ease-out"
          style={{ opacity: (slide.imageOpacity !== undefined && slide.imageOpacity !== null ? slide.imageOpacity : 30) / 100 }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient || 'from-slate-950 via-slate-900 to-slate-950'} opacity-90 backdrop-blur-xs`}></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Slide Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs sm:text-sm font-bold backdrop-blur-md">
              <Sparkles size={16} className="text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{getSlideBadge()}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              {getSlideTitle()}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              {getSlideSubtitle()}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenAdmission}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{getCtaPrimary()}</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={onExploreCourses}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm transition hover:-translate-y-0.5 cursor-pointer"
              >
                {getCtaSecondary()}
              </button>
            </div>

            {/* Micro Highlights Pill */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} className="text-emerald-400" />
                {isHindi ? "IITian अनुभवी फैकल्टी" : "IITian & Senior Faculty Mentors"}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} className="text-emerald-400" />
                {isHindi ? "साप्ताहिक OMR व CBT टेस्ट" : "Weekly OMR & Computer Based Tests (CBT)"}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} className="text-emerald-400" />
                {isHindi ? "शाहपुर गोरखपुर में व्यक्तिगत डाउट काउंटर" : "Daily 1-on-1 Doubt Counters at Shahpur"}
              </span>
            </div>
          </div>

          {/* Right Floating Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-md shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Award className="text-orange-500" size={18} />
                  <span>{isHindi ? "सर्वोदय एकेडेमिक्स की पहचान" : "Saryoday Excellence"}</span>
                </h3>
                <span className="text-[11px] bg-orange-950 text-orange-400 px-2 py-0.5 rounded font-bold border border-orange-800/50">
                  Gorakhpur
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 text-center">
                  <p className="text-2xl font-black text-amber-400">14+ Yrs</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{isHindi ? "शिक्षण उत्कृष्टता" : "Academic Legacy"}</p>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 text-center">
                  <p className="text-2xl font-black text-emerald-400">98.6%</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{isHindi ? "हाईएस्ट बोर्ड स्कोर" : "Highest Board Score"}</p>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 text-center">
                  <p className="text-2xl font-black text-sky-400">500+</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{isHindi ? "JEE / NEET चयन" : "JEE / NEET Selections"}</p>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 text-center">
                  <p className="text-2xl font-black text-purple-400">100%</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{isHindi ? "तक छात्रवृत्ति (SST)" : "Scholarship (SST)"}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-950/60 to-amber-950/60 border border-orange-800/40 p-3.5 rounded-xl text-xs space-y-1">
                <p className="font-bold text-orange-300">📍 {isHindi ? "ऑफलाइन क्लासरूम वेन्यू:" : "Campus Location:"}</p>
                <p className="text-slate-300 text-[11px]">
                  B-Colony, Near Geeta Vatika Mandir & Airtel Store, Shahpur, Gorakhpur
                </p>
                <p className="text-orange-400 font-bold text-[11px] pt-1">
                  Helpline: +91 84001 00814 / 84001 00813
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-orange-600 text-white flex items-center justify-center backdrop-blur-sm transition cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-orange-600 text-white flex items-center justify-center backdrop-blur-sm transition cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentSlide === idx ? 'w-8 bg-orange-500' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
