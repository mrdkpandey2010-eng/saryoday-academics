import React, { useState, useEffect } from 'react';
import { Image, X, ZoomIn, Eye, Folder, ChevronRight, ArrowLeft, ChevronLeft, Calendar, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const GallerySection = ({ gallery = [], albums = [] }) => {
  const { isHindi } = useLanguage();
  const [viewMode, setViewMode] = useState('albums'); // 'albums' | 'all-photos'
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [filter, setFilter] = useState('all');

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [currentPhotosList, setCurrentPhotosList] = useState([]);

  // Flattened photos from all albums + standalone gallery items
  const allPhotos = React.useMemo(() => {
    const list = [];
    const seenUrls = new Set();

    (albums || []).forEach(alb => {
      const albTitle = isHindi ? (alb.titleHi || alb.hindiTitle || alb.title) : (alb.title || alb.titleHi);
      const albDesc = isHindi ? (alb.descriptionHi || alb.description) : (alb.description || alb.descriptionHi);
      const albCat = isHindi ? (alb.categoryHi || alb.category) : (alb.category || alb.categoryHi);

      (alb.photos || []).forEach(p => {
        if (!seenUrls.has(p.url)) {
          seenUrls.add(p.url);
          list.push({
            id: p.id,
            title: isHindi ? (p.titleHi || p.title || albTitle) : (p.title || p.titleHi || albTitle),
            caption: isHindi ? (p.captionHi || p.caption || albDesc) : (p.caption || p.captionHi || albDesc),
            category: albCat,
            rawCategory: alb.category,
            image: p.url,
            albumTitle: albTitle,
            albumId: alb.id
          });
        }
      });
    });

    (gallery || []).forEach(g => {
      if (!seenUrls.has(g.image)) {
        seenUrls.add(g.image);
        list.push({
          id: g.id,
          title: isHindi ? (g.titleHi || g.title) : (g.title || g.titleHi),
          caption: '',
          category: isHindi ? (g.categoryHi || g.category) : (g.category || g.categoryHi),
          rawCategory: g.category,
          image: g.image,
          albumTitle: isHindi ? 'सामान्य कैंपस गैलरी' : 'General Campus Gallery',
          albumId: null
        });
      }
    });

    return list;
  }, [albums, gallery, isHindi]);

  // Categories for filter
  const categories = [
    { id: 'all', label: isHindi ? 'सभी तस्वीरें व एलबम (All)' : 'All Photos & Albums' },
    { id: 'Felicitation', label: isHindi ? 'सम्मान समारोह (Toppers)' : 'Felicitation & Awards' },
    { id: 'Classroom', label: isHindi ? 'क्लासरूम्स (Classrooms)' : 'Smart Classrooms' },
    { id: 'Campus', label: isHindi ? 'कैंपस व लाइब्रेरी (Campus)' : 'Campus & Facilities' },
    { id: 'Events', label: isHindi ? 'कार्यक्रम व PTM' : 'Events & Seminars' },
  ];

  // Filtered albums
  const filteredAlbums = filter === 'all'
    ? albums
    : (albums || []).filter(alb => {
        const cat = `${alb.category || ''} ${alb.categoryHi || ''}`.toLowerCase();
        return cat.includes(filter.toLowerCase());
      });

  // Filtered photos for all-photos view
  const filteredPhotos = filter === 'all'
    ? allPhotos
    : allPhotos.filter(p => {
        const cat = `${p.category || ''} ${p.rawCategory || ''}`.toLowerCase();
        return cat.includes(filter.toLowerCase());
      });

  // Open Lightbox
  const openLightbox = (photos, index) => {
    setCurrentPhotosList(photos);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = (e) => {
    if (e) e.stopPropagation();
    if (currentPhotosList.length > 0) {
      setLightboxIndex((prev) => (prev + 1) % currentPhotosList.length);
    }
  };

  const prevPhoto = (e) => {
    if (e) e.stopPropagation();
    if (currentPhotosList.length > 0) {
      setLightboxIndex((prev) => (prev === 0 ? currentPhotosList.length - 1 : prev - 1));
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, currentPhotosList]);

  return (
    <section id="gallery" className="py-16 bg-white border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
            {isHindi ? "चित्र दीर्घा एवं एलबम" : "Photo Gallery & Campus Albums"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            {isHindi ? "सर्वोदय एकेडेमिक्स के यादगार पल एवं गतिविधियां" : "Memorable Moments & Academic Life at Saryoday"}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {isHindi
              ? "मेधावी छात्र-छात्रा सम्मान समारोह, आधुनिक क्लासरूम शिक्षण, टेस्ट सीरीज और अनुशासित कैंपस के विभिन्न एलबम"
              : "Toppers felicitation ceremonies, modern classroom sessions, test series workshops, and student life across campus albums"}
          </p>
        </div>

        {/* View Switcher: Albums vs All Photos */}
        {!selectedAlbum && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                onClick={() => setViewMode('albums')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  viewMode === 'albums'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Folder size={15} />
                <span>{isHindi ? "एलबम अनुसार" : "Albums View"}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${viewMode === 'albums' ? 'bg-orange-800' : 'bg-slate-200 text-slate-700'}`}>
                  {albums.length}
                </span>
              </button>

              <button
                onClick={() => setViewMode('all-photos')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  viewMode === 'all-photos'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers size={15} />
                <span>{isHindi ? "सभी तस्वीरें" : "All Photos"}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${viewMode === 'all-photos' ? 'bg-orange-800' : 'bg-slate-200 text-slate-700'}`}>
                  {allPhotos.length}
                </span>
              </button>
            </div>

            {/* Filter Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    filter === cat.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* CASE 1: INSIDE A SELECTED ALBUM                      */}
        {/* ==================================================== */}
        {selectedAlbum ? (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Back & Album Info Header */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
              <div className="space-y-2 max-w-2xl">
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-xl transition border border-orange-200 mb-2"
                >
                  <ArrowLeft size={14} />
                  <span>{isHindi ? "← सभी एलबम पर वापस जाएं" : "← Back to All Albums"}</span>
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-white bg-orange-600 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {isHindi ? (selectedAlbum.categoryHi || selectedAlbum.category) : (selectedAlbum.category || selectedAlbum.categoryHi)}
                  </span>
                  {(selectedAlbum.date || selectedAlbum.dateHi) && (
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar size={13} /> {isHindi ? (selectedAlbum.dateHi || selectedAlbum.date) : (selectedAlbum.date || selectedAlbum.dateHi)}
                    </span>
                  )}
                  <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                    📷 {selectedAlbum.photos?.length || 0} {isHindi ? "तस्वीरें" : "Photos"}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {isHindi ? (selectedAlbum.titleHi || selectedAlbum.hindiTitle || selectedAlbum.title) : (selectedAlbum.title || selectedAlbum.titleHi)}
                </h3>
                {(selectedAlbum.description || selectedAlbum.descriptionHi) && (
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {isHindi ? (selectedAlbum.descriptionHi || selectedAlbum.description) : (selectedAlbum.description || selectedAlbum.descriptionHi)}
                  </p>
                )}
              </div>

              {/* Album Cover Thumbnail */}
              <div className="w-36 h-28 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0 hidden sm:block bg-slate-900">
                <img
                  src={selectedAlbum.coverImage || selectedAlbum.photos?.[0]?.url || './galary.jpg'}
                  alt={selectedAlbum.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Photos inside this Album */}
            {selectedAlbum.photos && selectedAlbum.photos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedAlbum.photos.map((photo, idx) => (
                  <div
                    key={photo.id || idx}
                    onClick={() => {
                      const list = selectedAlbum.photos.map(p => ({
                        id: p.id,
                        title: isHindi ? (p.titleHi || p.title || selectedAlbum.title) : (p.title || p.titleHi || selectedAlbum.title),
                        caption: isHindi ? (p.captionHi || p.caption || '') : (p.caption || p.captionHi || ''),
                        category: isHindi ? (selectedAlbum.categoryHi || selectedAlbum.category) : (selectedAlbum.category || selectedAlbum.categoryHi),
                        image: p.url,
                        albumTitle: isHindi ? (selectedAlbum.titleHi || selectedAlbum.hindiTitle || selectedAlbum.title) : (selectedAlbum.title || selectedAlbum.titleHi)
                      }));
                      openLightbox(list, idx);
                    }}
                    className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer bg-slate-950 aspect-4/3 transition-all duration-300 border border-slate-100"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title || selectedAlbum.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-all duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-75 group-hover:opacity-95 transition"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-sm font-bold leading-snug drop-shadow-sm">
                        {isHindi ? (photo.titleHi || photo.title || `तस्वीर #${idx + 1}`) : (photo.title || photo.titleHi || `Photo #${idx + 1}`)}
                      </p>
                      {(photo.caption || photo.captionHi) && (
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2 font-medium">
                          {isHindi ? (photo.captionHi || photo.caption) : (photo.caption || photo.captionHi)}
                        </p>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition backdrop-blur-xs">
                      <ZoomIn size={16} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                <p className="text-sm text-slate-500 font-semibold">
                  {isHindi ? "इस एलबम में अभी तस्वीरें जोड़ी जा रही हैं।" : "Photos are currently being added to this album."}
                </p>
              </div>
            )}
          </div>
        ) : viewMode === 'albums' ? (
          /* ==================================================== */
          /* CASE 2: ALBUMS LIST VIEW                             */
          /* ==================================================== */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album) => {
              const photoCount = album.photos ? album.photos.length : 0;
              const cover = album.coverImage || album.photos?.[0]?.url || './galary.jpg';

              return (
                <div
                  key={album.id}
                  onClick={() => setSelectedAlbum(album)}
                  className="group rounded-3xl overflow-hidden border border-slate-200/90 bg-white hover:border-orange-500/40 hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Album Cover Container */}
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-950">
                    <img
                      src={cover}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Badge: Photo Count */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                      <Folder size={13} className="text-orange-400" />
                      <span>{photoCount} {isHindi ? (photoCount === 1 ? 'फोटो' : 'तस्वीरें') : (photoCount === 1 ? 'Photo' : 'Photos')}</span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-orange-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {isHindi ? (album.categoryHi || album.category) : (album.category || album.categoryHi)}
                    </div>

                    {/* Session / Date Pill */}
                    {(album.date || album.dateHi) && (
                      <div className="absolute bottom-3 left-3 text-white/90 text-xs font-medium flex items-center gap-1">
                        <Calendar size={13} className="text-amber-400" />
                        <span>{isHindi ? (album.dateHi || album.date) : (album.date || album.dateHi)}</span>
                      </div>
                    )}
                  </div>

                  {/* Album Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition leading-snug">
                        {isHindi ? (album.titleHi || album.hindiTitle || album.title) : (album.title || album.titleHi)}
                      </h3>
                      {(album.description || album.descriptionHi) && (
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {isHindi ? (album.descriptionHi || album.description) : (album.description || album.descriptionHi)}
                        </p>
                      )}
                    </div>

                    {/* Footer Button */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600">
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition">
                        <span>{isHindi ? "एलबम खोलें (Open Album)" : "Open Album"}</span>
                        <ChevronRight size={15} />
                      </span>
                      <span className="text-slate-400 font-normal text-[11px]">
                        {isHindi ? "क्लिक करके देखें" : "Click to view"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ==================================================== */
          /* CASE 3: ALL PHOTOS FLAT GRID VIEW                    */
          /* ==================================================== */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => openLightbox(filteredPhotos, idx)}
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
                  {item.albumTitle && (
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      📁 {item.albumTitle}
                    </p>
                  )}
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition backdrop-blur-xs">
                  <ZoomIn size={16} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* FULL-SCREEN INTERACTIVE LIGHTBOX MODAL               */}
      {/* ==================================================== */}
      {lightboxIndex !== null && currentPhotosList[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fadeIn select-none p-3 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Top Bar with Counter & Close */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-20">
            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-bold">
              <span>{lightboxIndex + 1} / {currentPhotosList.length}</span>
              {currentPhotosList[lightboxIndex].albumTitle && (
                <>
                  <span className="text-slate-500">•</span>
                  <span className="text-orange-400">{currentPhotosList[lightboxIndex].albumTitle}</span>
                </>
              )}
            </div>

            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition backdrop-blur-md border border-white/20 cursor-pointer"
              title="Close (Esc)"
            >
              <X size={22} />
            </button>
          </div>

          {/* Left Arrow Button */}
          {currentPhotosList.length > 1 && (
            <button
              onClick={prevPhoto}
              className="absolute left-3 sm:left-6 z-20 p-3 rounded-full bg-black/60 hover:bg-orange-600 text-white transition backdrop-blur-md border border-white/20 cursor-pointer"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Center Image Container */}
          <div
            className="max-w-5xl max-h-[82vh] flex flex-col items-center justify-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhotosList[lightboxIndex].image}
              alt={currentPhotosList[lightboxIndex].title}
              className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-white/10 animate-zoomIn"
            />

            {/* Bottom Caption */}
            <div className="mt-3 text-center text-white max-w-2xl px-4">
              <h4 className="text-base sm:text-lg font-black text-white">
                {currentPhotosList[lightboxIndex].title}
              </h4>
              {currentPhotosList[lightboxIndex].caption && (
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                  {currentPhotosList[lightboxIndex].caption}
                </p>
              )}
            </div>
          </div>

          {/* Right Arrow Button */}
          {currentPhotosList.length > 1 && (
            <button
              onClick={nextPhoto}
              className="absolute right-3 sm:right-6 z-20 p-3 rounded-full bg-black/60 hover:bg-orange-600 text-white transition backdrop-blur-md border border-white/20 cursor-pointer"
              title="Next (Right Arrow)"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </section>
  );
};
