import React from 'react';
import { Award, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';

export const FacultySection = ({ faculty }) => {
  return (
    <section id="faculty" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
            विद्वान शिक्षक मंडल (Our Expert Faculty)
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            अनुभवी व समर्पित शिक्षकों का मार्गदर्शन
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            हमारे शिक्षक केवल पढ़ाते नहीं, बल्कि हर विद्यार्थी की व्यक्तिगत कमजोरियों को पहचान कर उन्हें विषय का महारथी बनाते हैं
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((member) => (
            <div
              key={member.id}
              className="bg-slate-50/70 rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  {/* Floating Subject Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-orange-600">
                        {member.subject.split('(')[0]}
                      </span>
                      <h3 className="text-lg font-black text-white mt-1">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 mb-1">
                    <GraduationCap size={15} />
                    <span>{member.role}</span>
                  </div>

                  <p className="text-xs font-bold text-slate-700">
                    {member.qualification}
                  </p>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed border-t border-slate-200/70 pt-3">
                    {member.experience}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 text-[11px] font-medium text-slate-600">
                  <Award size={14} className="text-amber-500 shrink-0" />
                  <span>शाहपुर ब्रांच में नियमित रूप से उपलब्ध</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
