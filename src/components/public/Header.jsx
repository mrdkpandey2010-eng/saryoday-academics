import React from 'react';

export const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white py-1.5 px-4 overflow-hidden shadow-sm border-b border-orange-500/30">
      <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs">
        <div className="shrink-0 flex items-center gap-1.5 bg-slate-950/80 text-orange-300 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow border border-orange-500/30">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span>नवीन सूचना</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap text-[12px] font-medium">
          <span className="inline-block animate-[marquee_25s_linear_infinite]">
            📢 सत्र 2025-26 के लिए Saryoday Scholarship Test (SST) रजिस्ट्रेशन प्रारंभ • कक्षा 10वीं व 12वीं बोर्ड परीक्षार्थियों हेतु 90-दिवसीय क्रैश कोर्स 15 नवम्बर से • प्रत्येक रविवार NTA पैटर्न पर NEET व JEE मॉक टेस्ट एवं विशेष डाउट क्लासेज • शाहपुर गोरखपुर ब्रांच में प्रवेश हेतु कॉल करें: 8400100814 📢
          </span>
        </div>
      </div>
    </header>
  );
};
