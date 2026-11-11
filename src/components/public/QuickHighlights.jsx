import React from 'react';
import { MonitorPlay, FileCheck2, HelpCircle, Users2, Library, Award, ShieldCheck, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const QuickHighlights = () => {
  const { isHindi } = useLanguage();

  const highlights = [
    {
      icon: Users2,
      titleEn: "IITian & Senior Faculty Team",
      titleHi: "आईआईटीयन व अनुभवी फैकल्टी",
      descEn: "14+ years experienced mentors dedicated to conceptual depth, rigorous analytics and personal attention.",
      descHi: "14+ वर्षों के अनुभवी शिक्षकों द्वारा व्यक्तिगत ध्यान व प्रेरणादायी अध्यापन।",
      badge: "Expert Mentors",
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      icon: FileCheck2,
      titleEn: "Daily Practice Problem (DPP)",
      titleHi: "दैनिक अभ्यास पत्रक (DPP)",
      descEn: "Daily 20-30 problem sets curated from previous 25 years JEE/NEET papers with next-day discussion.",
      descHi: "प्रत्येक कक्षा के बाद 20-30 प्रश्नों का दैनिक असाइनमेंट व अगले दिन त्वरित समाधान।",
      badge: "Daily Practice",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      icon: HelpCircle,
      titleEn: "Dedicated 1-on-1 Doubt Counters",
      titleHi: "अलग से व्यक्तिगत डाउट काउंटर",
      descEn: "Zero-hesitation individual faculty doubt resolution after every lecture session.",
      descHi: "कक्षा के बाद छात्र अपने विषय शिक्षक से आमने-सामने बैठकर शंकाओं का समाधान कराएं।",
      badge: "1-on-1 Doubt",
      color: "text-orange-600 bg-orange-50 border-orange-200"
    },
    {
      icon: MonitorPlay,
      titleEn: "Smart Digital Classrooms",
      titleHi: "स्मार्ट डिजिटल क्लासरूम्स",
      descEn: "3D visual simulations, high-resolution interactive panels and modern acoustic design.",
      descHi: "3D एनिमेशन, इंटरैक्टिव पैनल्स और आधुनिक ऑडियो-विजुअल तकनीक से सुसज्जित कक्ष।",
      badge: "Modern Tech",
      color: "text-purple-600 bg-purple-50 border-purple-200"
    },
    {
      icon: Award,
      titleEn: "Weekly CBT & OMR Mock Tests",
      titleHi: "साप्ताहिक OMR व CBT टेस्ट",
      descEn: "Actual NTA pattern simulation with negative marking drills and all-India percentile analytics.",
      descHi: "NTA एवं बोर्ड परीक्षा के वास्तविक स्वरूप पर साप्ताहिक टेस्ट व संपूर्ण एनालिसिस रिपोर्ट।",
      badge: "Exam Simulation",
      color: "text-rose-600 bg-rose-50 border-rose-200"
    },
    {
      icon: Library,
      titleEn: "Soundproof AC Self-Study Library",
      titleHi: "शांत वातानुकूलित लाइब्रेरी",
      descEn: "5,000+ reference volumes, high-speed Wi-Fi, CBT practice stations open 7 AM to 9 PM.",
      descHi: "सेल्फ-स्टडी के लिए शांत माहौल, संदर्भ पुस्तकों का विशाल संग्रह एवं फ्री वाई-फाई।",
      badge: "AC Study Hall",
      color: "text-amber-600 bg-amber-50 border-amber-200"
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
            {isHindi ? "सर्वोदय एकेडेमिक्स की विशेषताएँ" : "Why Choose Saryoday Academics"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2.5">
            {isHindi ? "सफलता का वैज्ञानिक एवं अनुशासित मार्ग" : "A Disciplined, Scientific Pathway to Academic Success"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
            {isHindi
              ? "गोरखपुर के छात्रों को महानगरों जैसा परिणाम देने वाला मजबूत शैक्षणिक इंफ्रास्ट्रक्चर"
              : "Premier academic infrastructure delivering national-level results for IIT-JEE, NEET & Board Aspirants"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:bg-white hover:border-orange-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-110 ${item.color}`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition mb-2">
                    {isHindi ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {isHindi ? item.descHi : item.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-orange-600">
                  <span>{isHindi ? "शाहपुर कैंपस में उपलब्ध" : "Available at Shahpur Campus"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
