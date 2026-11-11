import React from 'react';
import { Award, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FacultySection = ({ faculty }) => {
  const { isHindi } = useLanguage();

  return (
    <section id="faculty" className="py-16 bg-white border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
            {isHindi ? "विद्वान शिक्षक मंडल (Our Expert Faculty)" : "Distinguished Academic Faculty Team"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            {isHindi ? "अनुभवी व समर्पित शिक्षकों का मार्गदर्शन" : "Mentorship by Top IITians & Senior Educators"}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {isHindi
              ? "हमारे शिक्षक केवल पढ़ाते नहीं, बल्कि हर विद्यार्थी की व्यक्तिगत कमजोरियों को पहचान कर उन्हें विषय का महारथी बनाते हैं"
              : "Our educators provide deep conceptual foundation, personal doubt resolution, and proven methodologies for IIT-JEE & NEET"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((member) => {
            const facultyName = isHindi ? (member.nameHi || member.name) : member.name;
            const facultyRole = isHindi ? (member.roleHi || member.role) : member.role;
            const facultySubject = isHindi ? (member.subjectHi || member.subject) : member.subject;
            const facultyExp = isHindi ? (member.experienceHi || member.experience) : member.experience;

            return (
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
                          {facultySubject.split('(')[0]}
                        </span>
                        <h3 className="text-lg font-black text-white mt-1">
                          {facultyName}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 mb-1">
                      <GraduationCap size={15} />
                      <span>{facultyRole}</span>
                    </div>

                    <p className="text-xs font-bold text-slate-700">
                      {member.qualification}
                    </p>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed border-t border-slate-200/70 pt-3">
                      {facultyExp}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 text-[11px] font-medium text-slate-600">
                    <Award size={14} className="text-amber-500 shrink-0" />
                    <span>
                      {isHindi ? "शाहपुर ब्रांच में नियमित रूप से उपलब्ध" : "Regularly Available at Shahpur Campus"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
