import React, { useState } from 'react';
import { Image, X, ZoomIn, Eye } from 'lucide-react';

export const GallerySection = ({ gallery }) => {
  const [filter, setFilter] = useState('all');
  const [previewImage, setPreviewImage] = useState(null);

  const categories = [
    { id: 'all', label: 'सभी तस्वीरें (All)' },
    { id: 'Classroom', label: 'क्लासरूम्स (Classrooms)' },
    { id: 'Felicitation', label: 'सम्मान समारोह' },
    { id: 'Events', label: 'PTM व कार्यक्रम' },
    { id: 'Campus', label: 'कैंपस व लाइब्रेरी' },
    { id: 'Exam', label: 'टेस्ट व परीक्षाएं' },
  ];

  const filteredGallery = filter === 'all'
    ? gallery
    : gallery.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
            चित्र दीर्घा (Photo Gallery)
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            सर्वोदय एकेडेमिक्स के कुछ यादगार पल
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            आधुनिक क्लासरूम, प्रतियोगी टेस्ट, टॉपर सम्मान समारोह और समर्पित शैक्षणिक वातावरण की झलकियां
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs ${
                filter === cat.id
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setPreviewImage(item)}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer bg-slate-900 aspect-video sm:aspect-4/3 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-all duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition"></div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-600 inline-block mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold leading-snug drop-shadow-sm">
                  {item.title}
                </h4>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition backdrop-blur-xs">
                <ZoomIn size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-black/60 rounded-full hover:bg-black/90 transition"
            >
              <X size={20} />
            </button>
            <img
              src={previewImage.image}
              alt={previewImage.title}
              className="w-full max-h-[75vh] object-contain"
            />
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-orange-400">
                  {previewImage.category}
                </span>
                <h3 className="text-base font-bold">{previewImage.title}</h3>
              </div>
              <span className="text-xs text-slate-400">Saryoday Academics Gorakhpur</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
