import React, { useState } from 'react';
import { BookOpen, Check, ArrowRight, Clock, Award, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const CoursesSection = ({ courses, onSelectCourse }) => {
  const { isHindi } = useLanguage();
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: isHindi ? 'सभी कोर्सेज (All Courses)' : 'All Programs' },
    { id: 'Competitive', label: 'IIT-JEE & NEET' },
    { id: 'Board', label: isHindi ? 'बोर्ड स्पेशल (10th & 12th)' : 'Board Booster (10th & 12th)' },
    { id: 'Foundation', label: isHindi ? 'प्री-फाउंडेशन (6th - 9th)' : 'Foundation (6th - 9th)' },
    { id: 'Crash Course', label: isHindi ? 'क्रैश कोर्स व टेस्ट सीरीज' : 'Crash Course & Test Series' },
  ];

  const filteredCourses = filter === 'all'
    ? courses
    : courses.filter(c => c.category === filter);

  return (
    <section id="courses" className="py-16 bg-slate-50 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
            {isHindi ? "शैक्षणिक कार्यक्रम (Our Courses)" : "Academic Programs & Classroom Courses"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            {isHindi
              ? "आपकी सफलता के लिए विशेष रूप से डिज़ाइन किए गए पाठ्यक्रम"
              : "Scientifically Structured Programs Designed for Top Ranks"
            }
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {isHindi
              ? "CBSE, ICSE, UP Board से लेकर IIT-JEE और NEET तक — गोरखपुर में सर्वश्रेष्ठ परिणाम के लिए प्रमाणित अध्ययन मॉडल"
              : "From CBSE, ICSE, UP Boards to IIT-JEE and NEET (UG) — Gorakhpur's proven curriculum for academic excellence"
            }
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                filter === cat.id
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const courseTitle = isHindi ? (course.hindiTitle || course.title) : course.title;
            const courseClass = isHindi ? (course.hindiClass || course.class) : (course.class || course.hindiClass);
            const courseDuration = isHindi ? (course.hindiDuration || course.duration) : (course.duration || course.hindiDuration);
            const courseFee = isHindi ? (course.hindiFee || course.fee) : course.fee;
            const courseFeatures = (isHindi && course.featuresHi && course.featuresHi.length > 0)
              ? course.featuresHi
              : course.features;

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-orange-500/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Header with Category Gradient Strip */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-900 text-white">
                      {course.targetExam}
                    </span>
                    {course.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 flex items-center gap-1">
                        <Sparkles size={11} /> {course.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition leading-snug">
                    {courseTitle}
                  </h3>
                  {isHindi && course.title && (
                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      {course.title}
                    </p>
                  )}

                  {/* Quick Meta */}
                  <div className="grid grid-cols-2 gap-2 mt-4 py-3 border-y border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">
                        {isHindi ? "कक्षा (Class)" : "Target Class"}
                      </span>
                      <span className="font-bold text-slate-800">{courseClass}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">
                        {isHindi ? "अवधि (Duration)" : "Duration"}
                      </span>
                      <span className="font-bold text-slate-800">{courseDuration}</span>
                    </div>
                  </div>

                  {/* Course Features List */}
                  <div className="mt-4 space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {isHindi ? "प्रमुख विशेषताएं:" : "Key Program Highlights:"}
                    </p>
                    {courseFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer with Fee and CTA */}
                <div className="p-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-medium text-slate-400 block">
                      {isHindi ? "वार्षिक शुल्क (Approx Fee)" : "Academic Fee"}
                    </span>
                    <span className="text-base font-black text-orange-600">{courseFee}</span>
                  </div>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition shadow cursor-pointer"
                  >
                    <span>{isHindi ? "प्रवेश हेतु संपर्क" : "Inquire / Enroll"}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
