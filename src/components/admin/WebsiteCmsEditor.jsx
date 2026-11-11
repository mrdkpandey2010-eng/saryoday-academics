import React, { useState } from 'react';
import {
  Globe, Home, Info, BookOpen, Users, Trophy, Image, Bell, Phone,
  Plus, Edit3, Trash2, CheckCircle2, Save, X, ExternalLink, Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const WebsiteCmsEditor = ({ initialTab = 'courses' }) => {
  const {
    instituteInfo, updateInstituteInfo, updateDirector,
    banners, addBanner, updateBanner, deleteBanner,
    courses, addCourse, updateCourse, deleteCourse,
    faculty, addFaculty, updateFaculty, deleteFaculty,
    toppers, addTopper, updateTopper, deleteTopper,
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

  // Gallery Modal state
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Classroom',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'
  });

  // Contact form state
  const [contactState, setContactState] = useState({
    address: instituteInfo?.address || '',
    phone1: instituteInfo?.phones?.[0] || '+91 84001 00814',
    phone2: instituteInfo?.phones?.[1] || '+91 84001 00813',
    whatsapp: instituteInfo?.whatsapp || '+918400100814',
    email: instituteInfo?.email || 'saryodayacademics@gmail.com',
    timings: instituteInfo?.timings || ''
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
      timings: contactState.timings
    });
    showSuccess('संपर्क विवरण एवं पता सफलतापूर्वक अपडेट कर दिया गया!');
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
          { id: 'courses', label: 'कोर्सेज (Courses)', icon: BookOpen, count: courses.length },
          { id: 'faculty', label: 'फैकल्टी (Faculty)', icon: Users, count: faculty.length },
          { id: 'about', label: 'हमारे बारे में (About)', icon: Info },
          { id: 'home', label: 'होम बैनर्स (Home)', icon: Home, count: banners.length },
          { id: 'toppers', label: 'टॉपर्स व परिणाम (Results)', icon: Trophy, count: toppers.length },
          { id: 'gallery', label: 'गैलरी (Gallery)', icon: Image, count: gallery.length },
          { id: 'contact', label: 'संपर्क व पता (Contact)', icon: Phone },
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

      {/* PAGE 6: GALLERY EDITOR */}
      {activeTab === 'gallery' && (
        <div className="p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">फोटो गैलरी संपादन (Photo Gallery Manager)</h3>
              <p className="text-xs text-slate-500">क्लासरूम, सम्मान समारोह और कैंपस की नई तस्वीरें जोड़ें</p>
            </div>
            <button
              onClick={() => {
                setGalleryForm({
                  title: '',
                  category: 'Classroom',
                  image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'
                });
                setShowGalleryModal(true);
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
            >
              <Plus size={15} /> नई फोटो जोड़ें (Add Photo)
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((g) => (
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
