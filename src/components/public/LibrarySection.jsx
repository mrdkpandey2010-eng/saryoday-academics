import React from 'react';
import { BookOpen, Wifi, Clock, ShieldCheck, CheckCircle2, Search, Sparkles, Coffee, Laptop } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';

export const LibrarySection = ({ onOpenAdmission }) => {
  const { isHindi } = useLanguage();
  const { libraryInfo } = useData();

  const defaultIcons = [
    <BookOpen className="text-orange-500" size={24} />,
    <Clock className="text-blue-500" size={24} />,
    <Wifi className="text-emerald-500" size={24} />,
    <Coffee className="text-purple-500" size={24} />
  ];

  const features = libraryInfo?.features || [
    {
      title: "5,000+ Reference Titles",
      desc: "HC Verma, Irodov, Cengage Series, DC Pandey, MS Chouhan, OP Tandon, NCERT at Fingertips & 20+ Years Solved Papers."
    },
    {
      title: "Extended Study Hours",
      desc: "Open 7:00 AM to 9:00 PM, 7 days a week, facilitating deep self-study after classroom lecture hours."
    },
    {
      title: "High-Speed Wi-Fi & CBT Stations",
      desc: "Dedicated computer terminals configured for NTA pattern Computer Based Tests (CBT) and video lecture analysis."
    },
    {
      title: "Soundproof Air-Conditioned Hall",
      desc: "Ergonomic seating with individual power sockets and LED desk lamps providing distraction-free focus."
    }
  ];

  const popularBooks = libraryInfo?.popularBooks || [
    { subject: "Physics", titles: ["Concepts of Physics - HC Verma", "Problems in General Physics - Irodov", "Understanding Physics - DC Pandey (5 Volumes)"] },
    { subject: "Chemistry", titles: ["Organic Chemistry - MS Chouhan", "Physical Chemistry - N. Awasthi", "Inorganic Chemistry - VK Jaiswal & JD Lee"] },
    { subject: "Mathematics", titles: ["Cengage JEE Advanced Series - G. Tewani", "Play with Graphs - Amit M. Agarwal", "Problems in Calculus of One Variable - IA Maron"] },
    { subject: "Biology (NEET)", titles: ["NCERT Biology Line-by-Line Fingertips (MTG)", "Trueman's Elementary Biology Vol 1 & 2", "Dr. Ali Objective Biology for NEET"] }
  ];

  return (
    <section id="library" className="py-16 bg-slate-50 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
            {isHindi ? (libraryInfo?.badgeHi || libraryInfo?.badge || "सर्वोदय ज्ञान केंद्र") : (libraryInfo?.badge || "Saryoday Knowledge Center")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            {isHindi ? (libraryInfo?.titleHi || libraryInfo?.title || "वातानुकूलित शांत सेल्फ-स्टडी एवं डिजिटल लाइब्रेरी") : (libraryInfo?.title || "Air-Conditioned Self-Study & Digital Library")}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {isHindi ? (libraryInfo?.subtitleHi || libraryInfo?.subtitle || "गोरखपुर के गंभीर जेईई और नीट अभ्यर्थियों हेतु अनुशासित अध्ययन केंद्र") : (libraryInfo?.subtitle || "A tranquil, scholarly sanctuary designed specifically for serious IIT-JEE and NEET aspirants in Gorakhpur")}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                {defaultIcons[idx % defaultIcons.length]}
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1.5">
                {isHindi ? (f.titleHi || f.title) : (f.title || f.titleHi)}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isHindi ? (f.descHi || f.desc) : (f.desc || f.descHi)}
              </p>
            </div>
          ))}
        </div>

        {/* Reference Books Showcase & Study Cabin Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Curated Resource Collection
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                Standard Reference Books & Chapter-wise Test Archives
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Every enrolled student receives complimentary library access with exclusive borrowing rights for competitive modules:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              {popularBooks.map((cat, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 text-orange-600">
                    <CheckCircle2 size={14} />
                    <span>{cat.subject}</span>
                  </h4>
                  <ul className="text-[11px] text-slate-600 space-y-1">
                    {cat.titles.map((t, idx) => (
                      <li key={idx} className="truncate">• {t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAdmission}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
              >
                <BookOpen size={15} />
                <span>Get Library Membership & Admission Form</span>
              </button>
              <span className="text-xs text-slate-500 font-medium">
                * Free for all Classroom Program Students
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative group">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
                alt="Saryoday Modern Study Library"
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-400">Shahpur Campus Hall</p>
                  <p className="text-sm font-black">Silent Self-Study Zone (AC)</p>
                  <p className="text-[11px] text-slate-300">Monitored 24/7 with CCTV for complete safety and discipline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
