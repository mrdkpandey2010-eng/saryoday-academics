import React from 'react';
import { Trophy, Star, Quote, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ResultsToppersSection = ({ toppers, testimonials }) => {
  const { isHindi } = useLanguage();

  return (
    <section id="toppers" className="py-16 bg-slate-900 text-white relative overflow-hidden scroll-mt-24">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-400/30">
            <Trophy size={14} className="text-amber-400" />
            <span>{isHindi ? "हॉल ऑफ फेम (Hall of Fame)" : "Hall of Fame & Academic Ranks"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3">
            {isHindi ? "हमारे गौरव, हमारे सितारे — सर्वोदय टॉपर्स" : "Our Pride, Our Achievers — Saryoday Stars"}
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            {isHindi
              ? "कड़ी मेहनत, सटीक मार्गदर्शन और नियमित अभ्यास का परिणाम — गोरखपुर के होनहार विद्यार्थियों की सफलता की दास्तान"
              : "Inspiring ranks in IIT-JEE, NEET & Board Exams achieved through relentless practice and focused mentoring"
            }
          </p>
        </div>

        {/* Toppers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {toppers.map((topper) => (
            <div
              key={topper.id}
              className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 hover:border-amber-400/60 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-4">
                  <img
                    src={topper.photo}
                    alt={topper.name}
                    className="w-full h-52 object-cover object-top rounded-xl border border-slate-700"
                  />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                    <Trophy size={12} />
                    <span>{topper.score}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                    {topper.exam}
                  </span>
                  <h3 className="text-base font-bold text-white pt-1">
                    {topper.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-400">
                    {topper.rank}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-700/70 text-xs text-slate-300 italic flex gap-1.5 leading-relaxed">
                  <Quote size={18} className="text-slate-500 shrink-0 mt-0.5" />
                  <span>"{topper.quote}"</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                <span>सत्र 2024 Achiever</span>
                <span className="text-amber-400 font-bold">Gorakhpur Proud</span>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials from Parents & Students */}
        <div className="pt-6 border-t border-slate-800">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              अभिभावक एवं छात्र क्या कहते हैं?
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              गोरखपुर के संतुष्ट परिवारों के अनुभव
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                    "{test.text}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60">
                  <h4 className="text-sm font-bold text-white">{test.name}</h4>
                  <p className="text-xs text-orange-400">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
