import React, { useState } from 'react';
import {
  Globe, Home, Info, BookOpen, Users, Trophy, Image, Bell, Phone,
  Plus, Edit3, Trash2, CheckCircle2, Save, X, ExternalLink, Sparkles,
  Folder, Upload, Camera, Layers, Calendar
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, PlayStoreIcon } from '../common/SocialIcons';
import { useData } from '../../context/DataContext';

export const WebsiteCmsEditor = ({ initialTab = 'courses' }) => {
  const {
    instituteInfo, updateInstituteInfo, updateDirector,
    banners, addBanner, updateBanner, deleteBanner,
    courses, addCourse, updateCourse, deleteCourse,
    faculty, addFaculty, updateFaculty, deleteFaculty,
    toppers, addTopper, updateTopper, deleteTopper,
    albums, addAlbum, updateAlbum, deleteAlbum, addPhotoToAlbum, deletePhotoFromAlbum, setAlbumCover,
    gallery, addGalleryItem, deleteGalleryItem,
    notices, addNotice, updateNotice, deleteNotice
  } = useData();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [successMessage, setSuccessMessage] = useState('');

  // Course Modal state
  const [editingCourse, setEditingCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: '',
    hindiTitle: '',
    targetExam: 'IIT-JEE / NEET',
    class: '11वीं एवं 12वीं',
    duration: '2 वर्ष',
    fee: '₹45,000 / वर्ष',
    category: 'Competitive',
    badge: 'Popular',
    features: ''
  });

  // Faculty Modal state
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [facultyForm, setFacultyForm] = useState({
    name: '',
    role: 'Senior Faculty',
    qualification: 'M.Sc, 10+ Years Exp',
    subject: 'Physics',
    experience: '',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  });

  // Topper Modal state
  const [editingTopper, setEditingTopper] = useState(null);
  const [showTopperModal, setShowTopperModal] = useState(false);
  const [topperForm, setTopperForm] = useState({
    name: '',
    exam: 'JEE Advanced 2025',
    rank: 'AIR 412 (IIT Selection)',
    score: '99.82 Percentile',
    quote: '',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  });

  // Banner Modal state
  const [editingBanner, setEditingBanner] = useState(null);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [bannerForm, setBannerForm] = useState({
    badge: 'सत्र 2025-26 प्रवेश प्रारंभ',
    title: '',
    subtitle: '',
    ctaPrimary: 'ऑनलाइन प्रवेश करें',
    ctaSecondary: 'कोर्स विवरण देखें',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
  });

  // Gallery & Albums State
  const [gallerySubTab, setGallerySubTab] = useState('albums'); // 'albums' | 'photos'
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Classroom',
    image: './galary.jpg'
  });

  // Album Modal state
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [albumForm, setAlbumForm] = useState({
    title: '',
    category: 'सम्मान समारोह',
    date: 'सत्र 2024-25',
    description: '',
    coverImage: './galary.jpg'
  });

  // Album Photos Manage Modal
  const [activeAlbumForPhotos, setActiveAlbumForPhotos] = useState(null);
  const [showAddPhotoToAlbumModal, setShowAddPhotoToAlbumModal] = useState(false);
  const [newPhotoForm, setNewPhotoForm] = useState({
    title: '',
    caption: '',
    url: './galary.jpg'
  });

  // Contact form state
  const [contactState, setContactState] = useState({
    address: instituteInfo?.address || '',
    phone1: instituteInfo?.phones?.[0] || '+91 84001 00814',
    phone2: instituteInfo?.phones?.[1] || '+91 84001 00813',
    whatsapp: instituteInfo?.whatsapp || '+918400100814',
    email: instituteInfo?.email || 'saryodayacademics@gmail.com',
    timings: instituteInfo?.timings || '',
    instagram: instituteInfo?.instagram || 'https://www.instagram.com/saryoday_gorakhpur/',
    facebook: instituteInfo?.facebook || 'https://www.facebook.com/saryoday/',
    youtube: instituteInfo?.youtube || 'https://www.youtube.com/@saryodayacademics',
    playstore: instituteInfo?.playstore || 'https://play.google.com/store/apps/details?id=com.saryoday.academics'
  });

  // Director form state
  const [directorState, setDirectorState] = useState({
    name: instituteInfo?.director?.name || 'Er. R.K. Mishra',
    qualification: instituteInfo?.director?.qualification || 'B.Tech (IIT BHU), 14+ Years Experience',
    role: instituteInfo?.director?.role || 'Director & Senior Physics Faculty',
    message: instituteInfo?.director?.message || '',
    photo: instituteInfo?.director?.photo || ''
  });

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // COURSE SUBMIT
  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (!courseForm.title) return;

    if (editingCourse) {
      updateCourse(editingCourse.id, courseForm);
      showSuccess(`कोर्स "${courseForm.title}" सफलतापूर्वक अपडेट किया गया!`);
    } else {
      addCourse(courseForm);
      showSuccess(`नया कोर्स "${courseForm.title}" सफलतापूर्वक जोड़ा गया!`);
    }
    setShowCourseModal(false);
    setEditingCourse(null);
  };

  // FACULTY SUBMIT
  const handleFacultySubmit = (e) => {
    e.preventDefault();
    if (!facultyForm.name) return;

    if (editingFaculty) {
      updateFaculty(editingFaculty.id, facultyForm);
      showSuccess(`शिक्षक "${facultyForm.name}" का विवरण अपडेट किया गया!`);
    } else {
      addFaculty(facultyForm);
      showSuccess(`नए शिक्षक "${facultyForm.name}" को सफलतापूर्वक जोड़ा गया!`);
    }
    setShowFacultyModal(false);
    setEditingFaculty(null);
  };

  // TOPPER SUBMIT
  const handleTopperSubmit = (e) => {
    e.preventDefault();
    if (!topperForm.name) return;

    if (editingTopper) {
      updateTopper(editingTopper.id, topperForm);
      showSuccess(`टॉपर "${topperForm.name}" का विवरण अपडेट किया गया!`);
    } else {
      addTopper(topperForm);
      showSuccess(`नया टॉपर "${topperForm.name}" जोड़ा गया!`);
    }
    setShowTopperModal(false);
    setEditingTopper(null);
  };

  // BANNER SUBMIT
  const handleBannerSubmit = (e) => {
    e.preventDefault();
    if (!bannerForm.title) return;

    if (editingBanner) {
      updateBanner(editingBanner.id, bannerForm);
      showSuccess(`बैनर "${bannerForm.title}" अपडेट किया गया!`);
    } else {
      addBanner(bannerForm);
      showSuccess(`नया बैनर जोड़ा गया!`);
    }
    setShowBannerModal(false);
    setEditingBanner(null);
  };

  // GALLERY SUBMIT
  const handleGallerySubmit = (e) => {
    e.preventDefault();
    if (!galleryForm.title) return;
    addGalleryItem(galleryForm);
    showSuccess(`गैलरी में नई फोटो जोड़ी गई!`);
    setShowGalleryModal(false);
  };

  // CONTACT SUBMIT
  const handleSaveContact = (e) => {
    e.preventDefault();
    updateInstituteInfo({
      address: contactState.address,
      phones: [contactState.phone1, contactState.phone2],
      whatsapp: contactState.whatsapp,
      email: contactState.email,
      timings: contactState.timings,
      instagram: contactState.instagram,
      facebook: contactState.facebook,
      youtube: contactState.youtube,
      playstore: contactState.playstore
    });
    showSuccess('संपर्क विवरण एवं सोशल मीडिया लिंक (YouTube, Play Store) सफलतापूर्वक अपडेट हो गए!');
  };

  // DIRECTOR / ABOUT SUBMIT
  const handleSaveDirector = (e) => {
    e.preventDefault();
    updateDirector(directorState);
    showSuccess('निदेशक एवं हमारे बारे में (About Us) विवरण अपडेट हो गया!');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Editor Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="text-orange-400" size={20} />
            <h2 className="text-lg font-black tracking-tight">वेबसाइट पेज संपादक (CMS Page Editor)</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            वेबसाइट के किसी भी पेज या सेक्शन का टेक्स्ट, फोटो, कोर्स, फैकल्टी अथवा सूचनाएं यहां से तुरंत एडिट करें।
          </p>
        </div>

        {successMessage && (
          <div className="p-2.5 px-4 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-2 animate-fadeIn shadow">
            <CheckCircle2 size={16} />
            <span>{successMessage}</span>
          </div>
        )}
      </div>

      {/* Pages Navigation Bar */}
      <div className="flex items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-200 overflow-x-auto">
        {[
          { id: 'courses', label: 'कोर्सेज', icon: BookOpen, count: courses.length },
          { id: 'faculty', label: 'फैकल्टी', icon: Users, count: faculty.length },
          { id: 'about', label: 'हमारे बारे में', icon: Info },
          { id: 'home', label: 'होम बैनर', icon: Home, count: banners.length },
          { id: 'toppers', label: 'टॉपर्स व परिणाम', icon: Trophy, count: toppers.length },
          { id: 'gallery', label: 'गैलरी व एलबम', icon: Image, count: gallery.length },
          { id: 'contact', label: 'संपर्क व पता', icon: Phone },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? 'bg-orange-800 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* PAGE 1: COURSES EDITOR */}
      {activeTab === 'courses' && (
        <div className="p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">वेबसाइट कोर्सेज संपादन (Courses Manager)</h3>
              <p className="text-xs text-slate-500">नया कोर्स जोड़ें, फीस बदलें अथवा मौजूदा कोर्स का विवरण अपडेट करें</p>
            </div>
            <button
              onClick={() => {
                setEditingCourse(null);
                setCourseForm({
                  title: '',
                  hindiTitle: '',
                  targetExam: 'IIT-JEE / NEET',
                  class: '11वीं एवं 12वीं',
                  duration: '2 वर्ष',
                  fee: '₹45,000 / वर्ष',
                  category: 'Competitive',
                  badge: 'Popular',
                  features: 'भौतिकी, रसायन एवं गणित के अध्यायों का गहन विश्लेषण\nदैनिक अभ्यास पत्रक (DPP)\nसाप्ताहिक टेस्ट सीरीज'
                });
                setShowCourseModal(true);
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
            >
              <Plus size={15} /> नया कोर्स जोड़ें (Add Course)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((c) => (
              <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-white">{c.targetExam}</span>
                    <span className="text-xs font-black text-orange-600">{c.fee}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{c.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{c.hindiTitle}</p>
                  <p className="text-xs text-slate-600 mt-2">कक्षा: <span className="font-semibold">{c.class}</span> | अवधि: {c.duration}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingCourse(c);
                      setCourseForm({
                        ...c,
                        features: Array.isArray(c.features) ? c.features.join('\n') : c.features
                      });
                      setShowCourseModal(true);
                    }}
                    className="p-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Edit3 size={13} /> एडिट करें
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`क्या आप कोर्स "${c.title}" को हटाना चाहते हैं?`)) {
                        deleteCourse(c.id);
                        showSuccess(`कोर्स हटाया गया!`);
                      }
                    }}
                    className="p-1.5 px-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAGE 2: FACULTY EDITOR */}
      {activeTab === 'faculty' && (
        <div className="p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">शिक्षक मंडल संपादन (Faculty Team Manager)</h3>
              <p className="text-xs text-slate-500">वेबसाइट पर फैकल्टी जोड़ें, फोटो बदलें अथवा विषय व अनुभव एडिट करें</p>
            </div>
            <button
              onClick={() => {
                setEditingFaculty(null);
                setFacultyForm({
                  name: '',
                  role: 'Senior Faculty',
                  qualification: 'M.Sc, B.Ed, 10+ Years Exp',
                  subject: 'Physics',
                  experience: '10+ वर्षों का शिक्षण अनुभव। सैकड़ों विद्यार्थियों का चयन कराया।',
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
                });
                setShowFacultyModal(true);
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
            >
              <Plus size={15} /> नए शिक्षक जोड़ें (Add Faculty)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {faculty.map((f) => (
              <div key={f.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div className="flex items-start gap-3">
                  <img src={f.photo} alt={f.name} className="w-14 h-14 rounded-xl object-cover border" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{f.name}</h4>
                    <p className="text-xs font-bold text-orange-600">{f.subject}</p>
                    <p className="text-[11px] text-slate-500">{f.qualification}</p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingFaculty(f);
                      setFacultyForm(f);
                      setShowFacultyModal(true);
                    }}
                    className="p-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Edit3 size={13} /> एडिट करें
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`क्या आप ${f.name} को हटाना चाहते हैं?`)) {
                        deleteFaculty(f.id);
                        showSuccess('फैकल्टी हटाई गई!');
                      }
                    }}
                    className="p-1.5 px-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAGE 3: ABOUT US & DIRECTOR MESSAGE EDITOR */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveDirector} className="p-5 space-y-4 max-w-2xl">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">हमारे बारे में एवं निदेशक संदेश (About & Director)</h3>
            <p className="text-xs text-slate-500">निदेशक का नाम, योग्यता, फोटो व वेबसाइट पर प्रदर्शित संदेश एडिट करें</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">निदेशक का नाम (Director Name)</label>
              <input
                type="text"
                required
                value={directorState.name}
                onChange={(e) => setDirectorState({ ...directorState, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">पद / भूमिका (Role)</label>
              <input
                type="text"
                value={directorState.role}
                onChange={(e) => setDirectorState({ ...directorState, role: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">योग्यता व अनुभव (Qualification)</label>
              <input
                type="text"
                value={directorState.qualification}
                onChange={(e) => setDirectorState({ ...directorState, qualification: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">फोटो URL (Director Photo)</label>
              <input
                type="text"
                value={directorState.photo}
                onChange={(e) => setDirectorState({ ...directorState, photo: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">निदेशक का संदेश (Director's Message)</label>
            <textarea
              rows="4"
              value={directorState.message}
              onChange={(e) => setDirectorState({ ...directorState, message: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs leading-relaxed"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5"
          >
            <Save size={15} /> बदलाव सहेजें (Save Changes)
          </button>
        </form>
      )}

      {/* PAGE 4: HOME BANNERS EDITOR */}
      {activeTab === 'home' && (
        <div className="p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">होम पेज बैनर स्लाइडर (Home Slider Banners)</h3>
              <p className="text-xs text-slate-500">मुख्य पृष्ठ पर घूमने वाले पोस्टर्स व शीर्षकों को बदलें</p>
            </div>
            <button
              onClick={() => {
                setEditingBanner(null);
                setBannerForm({
                  badge: 'सत्र 2025-26 प्रवेश प्रारंभ',
                  title: '',
                  subtitle: '',
                  ctaPrimary: 'ऑनलाइन प्रवेश करें',
                  ctaSecondary: 'कोर्स विवरण देखें',
                  image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
                });
                setShowBannerModal(true);
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
            >
              <Plus size={15} /> नया स्लाइडर बैनर जोड़ें
            </button>
          </div>

          <div className="space-y-3">
            {banners.map((b) => (
              <div key={b.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={b.image} alt={b.title} className="w-24 h-16 rounded-xl object-cover border" />
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">{b.badge}</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{b.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{b.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditingBanner(b);
                      setBannerForm(b);
                      setShowBannerModal(true);
                    }}
                    className="p-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Edit3 size={13} /> एडिट
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`क्या आप इस बैनर को हटाना चाहते हैं?`)) {
                        deleteBanner(b.id);
                        showSuccess('बैनर हटाया गया!');
                      }
                    }}
                    className="p-1.5 px-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAGE 5: TOPPERS & RESULTS EDITOR */}
      {activeTab === 'toppers' && (
        <div className="p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">टॉपर्स व परिणाम संपादन (Results & Toppers)</h3>
              <p className="text-xs text-slate-500">हॉल ऑफ फेम में नए विद्यार्थियों के रिजल्ट व फोटो जोड़ें</p>
            </div>
            <button
              onClick={() => {
                setEditingTopper(null);
                setTopperForm({
                  name: '',
                  exam: 'JEE Advanced 2025',
                  rank: 'AIR 450 (IIT Selection)',
                  score: '99.50 Percentile',
                  quote: 'सर्वोदय के डाउट काउंटर ने मेरे फिजिक्स के डर को खत्म किया।',
                  photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
                });
                setShowTopperModal(true);
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
            >
              <Plus size={15} /> नया टॉपर जोड़ें (Add Topper)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {toppers.map((t) => (
              <div key={t.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <img src={t.photo} alt={t.name} className="w-full h-36 object-cover rounded-xl border mb-2" />
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">{t.score}</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{t.name}</h4>
                  <p className="text-xs font-semibold text-emerald-600">{t.rank}</p>
                  <p className="text-[11px] text-slate-500">{t.exam}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingTopper(t);
                      setTopperForm(t);
                      setShowTopperModal(true);
                    }}
                    className="p-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Edit3 size={13} /> एडिट
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`क्या आप ${t.name} को हटाना चाहते हैं?`)) {
                        deleteTopper(t.id);
                        showSuccess('टॉपर हटाया गया!');
                      }
                    }}
                    className="p-1.5 px-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAGE 6: GALLERY & ALBUMS MANAGER */}
      {activeTab === 'gallery' && (
        <div className="p-5 space-y-5">
          {/* Top Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">चित्र दीर्घा एवं एलबम प्रबंधक (Gallery & Albums CMS)</h3>
              <p className="text-xs text-slate-500">एलबम बनाएं, एक से अधिक फोटो अपलोड करें अथवा एकल तस्वीरें प्रबंधित करें</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAlbumForm({
                    title: '',
                    category: 'सम्मान समारोह',
                    date: 'सत्र 2024-25',
                    description: '',
                    coverImage: './galary.jpg'
                  });
                  setEditingAlbum(null);
                  setShowAlbumModal(true);
                }}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={15} /> नया एलबम बनाएं (Create Album)
              </button>

              <button
                onClick={() => {
                  setGalleryForm({
                    title: '',
                    category: 'Classroom',
                    image: './galary.jpg'
                  });
                  setShowGalleryModal(true);
                }}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Plus size={14} /> एकल फोटो
              </button>
            </div>
          </div>

          {/* Sub Navigation: Albums vs Standalone Photos */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGallerySubTab('albums')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                gallerySubTab === 'albums'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Folder size={14} />
              <span>एलबम सूची ({albums?.length || 0})</span>
            </button>
            <button
              onClick={() => setGallerySubTab('photos')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                gallerySubTab === 'photos'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Layers size={14} />
              <span>सभी एकल फोटो ({gallery?.length || 0})</span>
            </button>
          </div>

          {/* ALBUMS GRID */}
          {gallerySubTab === 'albums' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(albums || []).map((alb) => (
                <div
                  key={alb.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Album Cover & Badges */}
                    <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
                      <img
                        src={alb.coverImage || alb.photos?.[0]?.url || './galary.jpg'}
                        alt={alb.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {alb.category}
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        📷 {alb.photos?.length || 0} फोटो
                      </div>
                      {alb.date && (
                        <div className="absolute bottom-2 left-2.5 text-white/90 text-[11px] font-medium bg-black/50 px-2 py-0.5 rounded">
                          {alb.date}
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-1.5">
                      <h4 className="text-sm font-black text-slate-900 leading-snug">
                        {alb.title}
                      </h4>
                      {alb.description && (
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {alb.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Album Action Buttons */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveAlbumForPhotos(alb)}
                      className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs"
                    >
                      <Camera size={13} />
                      <span>फोटो प्रबंधित करें ({alb.photos?.length || 0})</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingAlbum(alb);
                          setAlbumForm({
                            title: alb.title,
                            category: alb.category,
                            date: alb.date || 'सत्र 2024-25',
                            description: alb.description || '',
                            coverImage: alb.coverImage || './galary.jpg'
                          });
                          setShowAlbumModal(true);
                        }}
                        className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold"
                        title="एलबम विवरण एडिट करें"
                      >
                        <Edit3 size={13} />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`क्या आप एलबम "${alb.title}" और इसकी सभी फोटो हटाना चाहते हैं?`)) {
                            deleteAlbum(alb.id);
                            showSuccess('एलबम सफलतापूर्वक हटाया गया!');
                          }
                        }}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold"
                        title="एलबम हटाएं"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* STANDALONE PHOTOS GRID */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {(gallery || []).map((g) => (
                <div key={g.id} className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 group">
                  <img src={g.image} alt={g.title} className="w-full h-32 object-cover" />
                  <div className="p-2 bg-white text-xs">
                    <span className="text-[10px] font-bold text-orange-600 block">{g.category}</span>
                    <p className="font-semibold text-slate-800 truncate">{g.title}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`क्या आप इस फोटो को हटाना चाहते हैं?`)) {
                        deleteGalleryItem(g.id);
                        showSuccess('फोटो हटाई गई!');
                      }
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-600/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition"
                    title="हटाएं"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PAGE 7: CONTACT & LOCATION EDITOR */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSaveContact} className="p-5 space-y-4 max-w-2xl">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">संपर्क विवरण एवं पता संपादन (Contact & Campus Info)</h3>
            <p className="text-xs text-slate-500">शाहपुर गोरखपुर का पता, हेल्पलाइन नंबर व ऑफिस टाइमिंग अपडेट करें</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">संस्थान का पूरा पता (Campus Address)</label>
            <input
              type="text"
              required
              value={contactState.address}
              onChange={(e) => setContactState({ ...contactState, address: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">हेल्पलाइन फोन 1 (Primary Phone)</label>
              <input
                type="text"
                required
                value={contactState.phone1}
                onChange={(e) => setContactState({ ...contactState, phone1: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">हेल्पलाइन फोन 2 (Secondary Phone)</label>
              <input
                type="text"
                value={contactState.phone2}
                onChange={(e) => setContactState({ ...contactState, phone2: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">व्हाट्सएप सहायता नंबर (WhatsApp No)</label>
              <input
                type="text"
                value={contactState.whatsapp}
                onChange={(e) => setContactState({ ...contactState, whatsapp: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ईमेल पता (Official Email)</label>
              <input
                type="email"
                value={contactState.email}
                onChange={(e) => setContactState({ ...contactState, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ऑफिस समय (Working Hours)</label>
            <input
              type="text"
              value={contactState.timings}
              onChange={(e) => setContactState({ ...contactState, timings: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          {/* Social Media Links (Instagram & Facebook) */}
          <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-xl space-y-3">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>सोशल मीडिया प्रोफाइल्स (Social Media Links)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <InstagramIcon size={13} className="text-pink-600" />
                  <span>इंस्टाग्राम प्रोफाइल लिंक (Instagram URL)</span>
                </label>
                <input
                  type="url"
                  value={contactState.instagram}
                  onChange={(e) => setContactState({ ...contactState, instagram: e.target.value })}
                  placeholder="https://www.instagram.com/saryoday_gorakhpur/"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <FacebookIcon size={13} className="text-blue-600" />
                  <span>फेसबुक पेज लिंक (Facebook Page URL)</span>
                </label>
                <input
                  type="url"
                  value={contactState.facebook}
                  onChange={(e) => setContactState({ ...contactState, facebook: e.target.value })}
                  placeholder="https://www.facebook.com/saryoday/"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <YoutubeIcon size={13} className="text-red-600" />
                  <span>यूट्यूब चैनल लिंक (YouTube Channel URL)</span>
                </label>
                <input
                  type="url"
                  value={contactState.youtube || ''}
                  onChange={(e) => setContactState({ ...contactState, youtube: e.target.value })}
                  placeholder="https://www.youtube.com/@saryodayacademics"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <PlayStoreIcon size={13} className="text-emerald-700" />
                  <span>गूगल प्ले स्टोर ऐप लिंक (Play Store App URL)</span>
                </label>
                <input
                  type="url"
                  value={contactState.playstore || ''}
                  onChange={(e) => setContactState({ ...contactState, playstore: e.target.value })}
                  placeholder="https://play.google.com/store/apps/details?id=com.saryoday.academics"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5"
          >
            <Save size={15} /> संपर्क विवरण सहेजें
          </button>
        </form>
      )}

      {/* MODAL: ADD / EDIT COURSE */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCourseModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-black text-slate-900 mb-4">
              {editingCourse ? 'कोर्स विवरण अपडेट करें' : 'नया शैक्षणिक कोर्स जोड़ें'}
            </h3>
            <form onSubmit={handleCourseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">कोर्स का शीर्षक (English)*</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="उदा. IIT-JEE 2-Year Classroom Program"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">कोर्स का नाम (हिन्दी)</label>
                <input
                  type="text"
                  value={courseForm.hindiTitle}
                  onChange={(e) => setCourseForm({ ...courseForm, hindiTitle: e.target.value })}
                  placeholder="उदा. आईआईटी-जेईई 2 वर्षीय क्लासरूम प्रोग्राम"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">लक्षित परीक्षा (Target Exam)</label>
                  <input
                    type="text"
                    value={courseForm.targetExam}
                    onChange={(e) => setCourseForm({ ...courseForm, targetExam: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">कक्षा (Class)</label>
                  <input
                    type="text"
                    value={courseForm.class}
                    onChange={(e) => setCourseForm({ ...courseForm, class: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">शुल्क (Fee)</label>
                  <input
                    type="text"
                    value={courseForm.fee}
                    onChange={(e) => setCourseForm({ ...courseForm, fee: e.target.value })}
                    placeholder="उदा. ₹45,000 / वर्ष"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-orange-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">अवधि (Duration)</label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">विशेषताएं (प्रति पंक्ति 1 विशेषता)</label>
                <textarea
                  rows="3"
                  value={courseForm.features}
                  onChange={(e) => setCourseForm({ ...courseForm, features: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="दैनिक अभ्यास पत्रक (DPP)&#10;साप्ताहिक OMR टेस्ट&#10;अलग से डाउट काउंटर"
                ></textarea>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold shadow"
                >
                  सहेजें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT FACULTY */}
      {showFacultyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowFacultyModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-black text-slate-900 mb-4">
              {editingFaculty ? 'फैकल्टी विवरण अपडेट करें' : 'नए शिक्षक जोड़ें'}
            </h3>
            <form onSubmit={handleFacultySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">शिक्षक का नाम*</label>
                <input
                  type="text"
                  required
                  value={facultyForm.name}
                  onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                  placeholder="उदा. Dr. V.P. Srivastava"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">पद / रोल</label>
                  <input
                    type="text"
                    value={facultyForm.role}
                    onChange={(e) => setFacultyForm({ ...facultyForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">विषय (Subject)</label>
                  <input
                    type="text"
                    value={facultyForm.subject}
                    onChange={(e) => setFacultyForm({ ...facultyForm, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">योग्यता (Qualification)</label>
                <input
                  type="text"
                  value={facultyForm.qualification}
                  onChange={(e) => setFacultyForm({ ...facultyForm, qualification: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">फोटो लिंक (Photo URL)</label>
                <input
                  type="text"
                  value={facultyForm.photo}
                  onChange={(e) => setFacultyForm({ ...facultyForm, photo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">शिक्षण अनुभव व परिचय</label>
                <textarea
                  rows="2"
                  value={facultyForm.experience}
                  onChange={(e) => setFacultyForm({ ...facultyForm, experience: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                ></textarea>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFacultyModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold shadow"
                >
                  सहेजें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT TOPPER */}
      {showTopperModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowTopperModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-black text-slate-900 mb-4">
              {editingTopper ? 'टॉपर विवरण अपडेट करें' : 'नया टॉपर जोड़ें'}
            </h3>
            <form onSubmit={handleTopperSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">विद्यार्थी का नाम*</label>
                <input
                  type="text"
                  required
                  value={topperForm.name}
                  onChange={(e) => setTopperForm({ ...topperForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">परीक्षा (Exam)</label>
                  <input
                    type="text"
                    value={topperForm.exam}
                    onChange={(e) => setTopperForm({ ...topperForm, exam: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">प्राप्तांक / परसेंटाइल</label>
                  <input
                    type="text"
                    value={topperForm.score}
                    onChange={(e) => setTopperForm({ ...topperForm, score: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-orange-600"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">रैंक / चयन संस्थान (Rank)</label>
                <input
                  type="text"
                  value={topperForm.rank}
                  onChange={(e) => setTopperForm({ ...topperForm, rank: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">फोटो लिंक (Photo URL)</label>
                <input
                  type="text"
                  value={topperForm.photo}
                  onChange={(e) => setTopperForm({ ...topperForm, photo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">विद्यार्थी का संदेश / समीक्षा</label>
                <textarea
                  rows="2"
                  value={topperForm.quote}
                  onChange={(e) => setTopperForm({ ...topperForm, quote: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                ></textarea>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTopperModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold shadow"
                >
                  सहेजें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT BANNER */}
      {showBannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowBannerModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-black text-slate-900 mb-4">
              {editingBanner ? 'बैनर अपडेट करें' : 'नया होम स्लाइडर बैनर जोड़ें'}
            </h3>
            <form onSubmit={handleBannerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">शीर्ष टैग / बैज (Badge)</label>
                <input
                  type="text"
                  value={bannerForm.badge}
                  onChange={(e) => setBannerForm({ ...bannerForm, badge: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">मुख्य शीर्षक (Headline)*</label>
                <input
                  type="text"
                  required
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">उप-शीर्षक (Subtitle)</label>
                <textarea
                  rows="2"
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                ></textarea>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">बैकग्राउंड फोटो URL</label>
                <input
                  type="text"
                  value={bannerForm.image}
                  onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBannerModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold shadow"
                >
                  सहेजें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT ALBUM */}
      {showAlbumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-7 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowAlbumModal(false);
                setEditingAlbum(null);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                <Folder size={18} />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                {editingAlbum ? 'एलबम संपादित करें (Edit Album)' : 'नया एलबम बनाएं (Create New Album)'}
              </h3>
            </div>

            <form onSubmit={handleAlbumSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">एलबम शीर्षक (Album Title)*</label>
                <input
                  type="text"
                  required
                  value={albumForm.title}
                  onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })}
                  placeholder="उदा. मेधावी छात्र-छात्रा सम्मान समारोह"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">श्रेणी (Category)</label>
                  <select
                    value={albumForm.category}
                    onChange={(e) => setAlbumForm({ ...albumForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
                  >
                    <option value="सम्मान समारोह">सम्मान समारोह (Felicitation)</option>
                    <option value="क्लासरूम">क्लासरूम (Classroom)</option>
                    <option value="कैंपस">कैंपस (Campus)</option>
                    <option value="कार्यक्रम">कार्यक्रम व PTM</option>
                    <option value="परीक्षा">टेस्ट व परीक्षा</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">वर्ष / सत्र (Session/Date)</label>
                  <input
                    type="text"
                    value={albumForm.date}
                    onChange={(e) => setAlbumForm({ ...albumForm, date: e.target.value })}
                    placeholder="सत्र 2024-25"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">एलबम का संक्षिप्त विवरण (Description)</label>
                <textarea
                  rows={2}
                  value={albumForm.description}
                  onChange={(e) => setAlbumForm({ ...albumForm, description: e.target.value })}
                  placeholder="इस एलबम में शामिल कार्यक्रम या तस्वीरों का विवरण लिखें..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">कवर फोटो (Cover Image URL या अपने कंप्यूटर से चुनें)</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={albumForm.coverImage}
                    onChange={(e) => setAlbumForm({ ...albumForm, coverImage: e.target.value })}
                    placeholder="./galary.jpg अथवा इमेज लिंक"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <label className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1.5 border border-slate-300">
                      <Upload size={13} />
                      <span>कंप्यूटर से कवर फोटो चुनें</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAlbumCoverUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAlbumModal(false);
                    setEditingAlbum(null);
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  {editingAlbum ? 'अपडेट करें' : 'एलबम बनाएं'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MANAGE PHOTOS INSIDE AN ALBUM */}
      {activeAlbumForPhotos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 sm:p-7 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setActiveAlbumForPhotos(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            {/* Album Photos Manager Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                  {activeAlbumForPhotos.category}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {activeAlbumForPhotos.title}
                </h3>
                <p className="text-xs text-slate-500">
                  कुल तस्वीरें: {(activeAlbumForPhotos.photos || []).length} • नई तस्वीरें अपलोड करें या हटाएं
                </p>
              </div>

              {/* Action Buttons: Add Photo & Multiple Files Upload */}
              <div className="flex items-center gap-2">
                <label className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5 cursor-pointer">
                  <Upload size={14} />
                  <span>कंप्यूटर से कई फोटो अपलोड करें</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleMultipleFilesToAlbum}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => setShowAddPhotoToAlbumModal(true)}
                  className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} /> फोटो लिंक जोड़ें
                </button>
              </div>
            </div>

            {/* Photos Grid Inside Album */}
            {activeAlbumForPhotos.photos && activeAlbumForPhotos.photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {activeAlbumForPhotos.photos.map((p, idx) => (
                  <div
                    key={p.id || idx}
                    className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-square flex flex-col justify-end"
                  >
                    <img src={p.url} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition"></div>

                    <div className="relative p-2.5 text-white z-10">
                      <p className="text-xs font-bold truncate">{p.title || `फोटो #${idx + 1}`}</p>
                      {p.caption && (
                        <p className="text-[10px] text-slate-300 truncate">{p.caption}</p>
                      )}
                    </div>

                    {/* Actions: Delete & Set Cover */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition z-20">
                      <button
                        onClick={() => {
                          setAlbumCover(activeAlbumForPhotos.id, p.url);
                          showSuccess('कवर फोटो सेट की गई!');
                        }}
                        className="p-1 bg-black/70 hover:bg-orange-600 text-white rounded text-[10px] font-bold"
                        title="कवर फोटो बनाएं"
                      >
                        कवर
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('क्या आप इस फोटो को एलबम से हटाना चाहते हैं?')) {
                            deletePhotoFromAlbum(activeAlbumForPhotos.id, p.id);
                            setActiveAlbumForPhotos(prev => ({
                              ...prev,
                              photos: prev.photos.filter(item => item.id !== p.id)
                            }));
                            showSuccess('फोटो हटाई गई!');
                          }
                        }}
                        className="p-1 bg-red-600 hover:bg-red-700 text-white rounded"
                        title="हटाएं"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <Folder size={36} className="text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">इस एलबम में अभी कोई फोटो नहीं है</p>
                <p className="text-xs text-slate-500 mt-1">ऊपर दिए गए हरे बटन से अपने कंप्यूटर से तस्वीरें अपलोड करें</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: ADD PHOTO LINK TO ACTIVE ALBUM */}
      {showAddPhotoToAlbumModal && activeAlbumForPhotos && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowAddPhotoToAlbumModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X size={20} />
            </button>

            <h3 className="text-base font-black text-slate-900 mb-3">
              "{activeAlbumForPhotos.title}" में फोटो जोड़ें
            </h3>

            <form onSubmit={handleAddPhotoToAlbum} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">फोटो शीर्षक (Title)</label>
                <input
                  type="text"
                  required
                  value={newPhotoForm.title}
                  onChange={(e) => setNewPhotoForm({ ...newPhotoForm, title: e.target.value })}
                  placeholder="उदा. सभागार में पुरस्कार वितरण"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">कैप्शन / संक्षिप्त विवरण</label>
                <input
                  type="text"
                  value={newPhotoForm.caption}
                  onChange={(e) => setNewPhotoForm({ ...newPhotoForm, caption: e.target.value })}
                  placeholder="उदा. निदेशक द्वारा स्मृति चिन्ह प्रदान करते हुए"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">फोटो यूआरएल (Image URL या स्थानीय पाथ)*</label>
                <input
                  type="text"
                  required
                  value={newPhotoForm.url}
                  onChange={(e) => setNewPhotoForm({ ...newPhotoForm, url: e.target.value })}
                  placeholder="./galary1.jpg या https://..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPhotoToAlbumModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold shadow"
                >
                  जोड़ें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD GALLERY PHOTO */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowGalleryModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-black text-slate-900 mb-4">गैलरी में नई तस्वीर जोड़ें</h3>
            <form onSubmit={handleGallerySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">फोटो शीर्षक (Title)*</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="उदा. डिजिटल क्लासरूम सत्र"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">श्रेणी (Category)</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                >
                  <option value="Classroom">क्लासरूम्स (Classrooms)</option>
                  <option value="Felicitation">सम्मान समारोह</option>
                  <option value="Events">PTM व कार्यक्रम</option>
                  <option value="Campus">कैंपस व लाइब्रेरी</option>
                  <option value="Exam">टेस्ट व परीक्षाएं</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">फोटो लिंक (Image URL)</label>
                <input
                  type="text"
                  required
                  value={galleryForm.image}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold shadow"
                >
                  जोड़ें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
