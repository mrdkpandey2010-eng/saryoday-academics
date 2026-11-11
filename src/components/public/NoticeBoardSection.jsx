import React, { useState } from 'react';
import { Bell, Calendar, ChevronRight, AlertCircle, FileText, X } from 'lucide-react';

export const NoticeBoardSection = ({ notices }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedNotice, setSelectedNotice] = useState(null);

  const categories = [
    { id: 'all', label: 'सभी सूचनाएं (All)' },
    { id: 'Exam', label: 'परीक्षा (Exams)' },
    { id: 'Academic', label: 'शैक्षणिक (Academic)' },
    { id: 'Meeting', label: 'बैठक / PTM' },
  ];

  const filteredNotices = activeCategory === 'all'
    ? notices
    : notices.filter(n => n.category === activeCategory);

  return (
    <section id="notices" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-bold text-xs uppercase tracking-wider border border-orange-200 mb-2">
              <Bell size={14} className="text-orange-600 animate-bounce" />
              <span>आधिकारिक सूचना पट्ट</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              नवीनतम सूचनाएं एवं घोषणाएं (Notice Board)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              प्रवेश, परीक्षा कार्यक्रम, परिणाम एवं विशेष सत्रों से संबंधित सभी महत्वपूर्ण अपडेट्स
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-orange-500/60 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                    <Calendar size={13} className="text-orange-500" />
                    <span>{notice.date}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    {notice.isNew && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-600 text-white animate-pulse">
                        NEW
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {notice.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition leading-snug">
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {notice.content}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600">
                <span>विस्तार से पढ़ें (Read Details)</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-7 border border-slate-100">
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
                {selectedNotice.category}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar size={13} /> {selectedNotice.date}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4 leading-tight">
              {selectedNotice.title}
            </h3>

            <div className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {selectedNotice.content}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                सर्वोदय एकेडेमिक्स, शाहपुर गोरखपुर
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
