import React from 'react';
import { MonitorPlay, FileCheck2, HelpCircle, Users2, Library, Award, ShieldCheck, Clock } from 'lucide-react';

export const QuickHighlights = () => {
  const highlights = [
    {
      icon: Users2,
      title: "आईआईटीयन व अनुभवी फैकल्टी",
      desc: "14+ वर्षों के अनुभवी शिक्षकों द्वारा व्यक्तिगत ध्यान व प्रेरणादायी अध्यापन।",
      badge: "Expert Mentors",
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      icon: FileCheck2,
      title: "दैनिक अभ्यास पत्रक (DPP)",
      desc: "प्रत्येक कक्षा के बाद 20-30 प्रश्नों का दैनिक असाइनमेंट व अगले दिन त्वरित समाधान।",
      badge: "Daily Practice",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      icon: HelpCircle,
      title: "अलग से व्यक्तिगत डाउट काउंटर",
      desc: "कक्षा के बाद छात्र अपने विषय शिक्षक से आमने-सामने बैठकर शंकाओं का समाधान कराएं।",
      badge: "1-on-1 Doubt",
      color: "text-orange-600 bg-orange-50 border-orange-200"
    },
    {
      icon: MonitorPlay,
      title: "स्मार्ट डिजिटल क्लासरूम्स",
      desc: "3D एनिमेशन, इंटरैक्टिव पैनल्स और आधुनिक ऑडियो-विजुअल तकनीक से सुसज्जित कक्ष।",
      badge: "Modern Tech",
      color: "text-purple-600 bg-purple-50 border-purple-200"
    },
    {
      icon: Award,
      title: "साप्ताहिक OMR व CBT टेस्ट",
      desc: "NTA एवं बोर्ड परीक्षा के वास्तविक स्वरूप पर साप्ताहिक टेस्ट व संपूर्ण एनालिसिस रिपोर्ट।",
      badge: "Real Exam Feel",
      color: "text-rose-600 bg-rose-50 border-rose-200"
    },
    {
      icon: Library,
      title: "शांत वातानुकूलित लाइब्रेरी",
      desc: "सेल्फ-स्टडी के लिए शांत माहौल, संदर्भ पुस्तकों का विशाल संग्रह एवं फ्री वाई-फाई।",
      badge: "AC Study Hall",
      color: "text-amber-600 bg-amber-50 border-amber-200"
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
            सर्वोदय एकेडेमिक्स की विशेषताएं
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            गोरखपुर में सर्वश्रेष्ठ शिक्षण प्रणाली क्यों?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            हम केवल पाठ्यक्रम पूरा नहीं कराते, बल्कि छात्र को आत्मविश्वासी, वैचारिक रूप से दक्ष और परीक्षा में टॉप करने योग्य बनाते हैं।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-50/70 hover:bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-orange-500/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color} group-hover:scale-110 transition`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
