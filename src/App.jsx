import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useData } from './context/DataContext';
import { useLanguage } from './context/LanguageContext';

// Public Components
import { Header } from './components/public/Header';
import { Navbar } from './components/public/Navbar';
import { HeroBannerSlider } from './components/public/HeroBannerSlider';
import { QuickHighlights } from './components/public/QuickHighlights';
import { NoticeBoardSection } from './components/public/NoticeBoardSection';
import { DirectorMessageSection } from './components/public/DirectorMessageSection';
import { CoursesSection } from './components/public/CoursesSection';
import { FacultySection } from './components/public/FacultySection';
import { LibrarySection } from './components/public/LibrarySection';
import { CareerSection } from './components/public/CareerSection';
import { ResultsToppersSection } from './components/public/ResultsToppersSection';
import { GallerySection } from './components/public/GallerySection';
import { AdmissionInquirySection } from './components/public/AdmissionInquirySection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { VisitorWelcomeModal } from './components/public/VisitorWelcomeModal';

// Portal & Modals
import { LoginModal } from './components/portal/LoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { WebsiteCmsEditor } from './components/admin/WebsiteCmsEditor';
import { Edit3, Globe, Sparkles, X, Shield, ArrowLeft, LogOut } from 'lucide-react';

export function App() {
  const { currentUser, role, logout } = useAuth();
  const { isHindi } = useLanguage();
  const {
    instituteInfo,
    banners,
    notices,
    courses,
    faculty,
    toppers,
    albums,
    gallery,
    testimonials,
    submitInquiry
  } = useData();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginModalInitialRole, setLoginModalInitialRole] = useState('admin');
  const [selectedCourseForInquiry, setSelectedCourseForInquiry] = useState(null);

  // Visitor Welcome Gate Lead Modal (Shown once per session)
  const [showVisitorWelcome, setShowVisitorWelcome] = useState(() => {
    try {
      const alreadyPassed = sessionStorage.getItem('SARYODAY_VISITOR_GATE_PASSED');
      return !alreadyPassed;
    } catch (e) {
      return true;
    }
  });
  
  // Admin Live Preview & In-Place CMS Modal
  const [adminViewingPublic, setAdminViewingPublic] = useState(false);
  const [cmsModalTab, setCmsModalTab] = useState(null);

  // Scroll to section helper
  const scrollToAdmission = () => {
    const el = document.getElementById('admission');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenLogin = (targetRole = 'admin') => {
    setLoginModalInitialRole(targetRole);
    setShowLoginModal(true);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourseForInquiry(course);
    scrollToAdmission();
  };

  // If a user is logged in, show their specific portal dashboard!
  if (currentUser) {
    if (role === 'admin' && !adminViewingPublic) {
      return <AdminDashboard onBackToPublic={() => setAdminViewingPublic(true)} />;
    }
    if (role === 'teacher') {
      return (
        <TeacherDashboard
          onBackToPublic={logout}
          onSwitchToAdmin={() => {
            logout();
            handleOpenLogin('admin');
          }}
        />
      );
    }
    if (role === 'student') {
      return <StudentDashboard onBackToPublic={logout} />;
    }
    if (role === 'parent') {
      return <ParentDashboard onBackToPublic={logout} />;
    }
  }

  const isAdminActive = role === 'admin' && adminViewingPublic;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-orange-500 selection:text-white relative">
      {/* Admin Floating Control Bar when Director is viewing Live Website */}
      {isAdminActive && (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-2 border-b-2 border-orange-500 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-extrabold text-orange-400">👑 Director CMS Live Preview</span>
            <span className="text-slate-400 hidden sm:inline">• Click on any section's edit button below to modify live website content</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCmsModalTab('courses')}
              className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold transition flex items-center gap-1 shadow cursor-pointer"
            >
              <Globe size={13} />
              <span>Open CMS Page Editor</span>
            </button>
            <button
              onClick={() => setAdminViewingPublic(false)}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold transition border border-slate-700 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back to Admin Dashboard</span>
            </button>
            <button
              onClick={logout}
              className="px-2.5 py-1 bg-red-600/80 hover:bg-red-600 text-white rounded-lg font-bold transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* 1. Topmost Notice Ticker */}
      <Header />

      {/* 2. Main Sticky Navbar (with Library & Career tabs + Language switcher) */}
      <Navbar
        onOpenLogin={() => handleOpenLogin('admin')}
        onOpenAdmission={scrollToAdmission}
        isAdminActive={isAdminActive}
      />

      <main className="flex-1">
        {/* Quick Admin Section Edit Badge for Home Banners */}
        {isAdminActive && (
          <div className="bg-orange-600 text-white py-1.5 px-4 text-xs font-bold flex items-center justify-between">
            <span>Home Page Banners & Posters</span>
            <button
              onClick={() => setCmsModalTab('home')}
              className="px-2.5 py-0.5 bg-black/40 hover:bg-black/70 rounded flex items-center gap-1"
            >
              <Edit3 size={12} /> Edit Banners
            </button>
          </div>
        )}

        {/* 3. Hero Banner Slider */}
        <HeroBannerSlider
          banners={banners}
          onOpenAdmission={scrollToAdmission}
          onExploreCourses={scrollToCourses}
        />

        {/* 4. Quick Highlights & Key Advantages */}
        <QuickHighlights />

        {/* Quick Admin Section Edit Badge for Notices */}
        {isAdminActive && (
          <div className="bg-orange-600 text-white py-1.5 px-4 text-xs font-bold flex items-center justify-between">
            <span>Official Notice Board</span>
            <button
              onClick={() => setCmsModalTab('about')}
              className="px-2.5 py-0.5 bg-black/40 hover:bg-black/70 rounded flex items-center gap-1"
            >
              <Edit3 size={12} /> Edit Notices
            </button>
          </div>
        )}

        {/* 5. Live Notice Board */}
        <NoticeBoardSection notices={notices} />

        {/* Quick Admin Section Edit Badge for About Us & Director */}
        {isAdminActive && (
          <div className="bg-orange-600 text-white py-1.5 px-4 text-xs font-bold flex items-center justify-between">
            <span>About Us & Director's Desk</span>
            <button
              onClick={() => setCmsModalTab('about')}
              className="px-2.5 py-0.5 bg-black/40 hover:bg-black/70 rounded flex items-center gap-1"
            >
              <Edit3 size={12} /> Edit Message & Profile
            </button>
          </div>
        )}

        {/* 6. Director's Message & Vision */}
        <DirectorMessageSection
          director={instituteInfo.director}
          onOpenAdmission={scrollToAdmission}
        />

        {/* Quick Admin Section Edit Badge for Courses */}
        {isAdminActive && (
          <div className="bg-orange-600 text-white py-1.5 px-4 text-xs font-bold flex items-center justify-between">
            <span>Academic Programs, Batches & Fees</span>
            <button
              onClick={() => setCmsModalTab('courses')}
              className="px-2.5 py-0.5 bg-black/40 hover:bg-black/70 rounded flex items-center gap-1"
            >
              <Edit3 size={12} /> Manage Courses
            </button>
          </div>
        )}

        {/* 7. Categorized Courses & Programs */}
        <CoursesSection
          courses={courses}
          onSelectCourse={handleSelectCourse}
        />

        {/* Quick Admin Section Edit Badge for Faculty */}
        {isAdminActive && (
          <div className="bg-orange-600 text-white py-1.5 px-4 text-xs font-bold flex items-center justify-between">
            <span>Distinguished Faculty Team</span>
            <button
              onClick={() => setCmsModalTab('faculty')}
              className="px-2.5 py-0.5 bg-black/40 hover:bg-black/70 rounded flex items-center gap-1"
            >
              <Edit3 size={12} /> Manage Faculty Profiles
            </button>
          </div>
        )}

        {/* 8. Faculty Team */}
        <FacultySection faculty={faculty} />

        {/* 9. Self-Study & Digital Library Section (NEW) */}
        <LibrarySection onOpenAdmission={scrollToAdmission} />

        {/* 10. Career & Faculty Recruitment Section (NEW) */}
        <CareerSection />

        {/* Quick Admin Section Edit Badge for Toppers */}
        {isAdminActive && (
          <div className="bg-orange-600 text-white py-1.5 px-4 text-xs font-bold flex items-center justify-between">
            <span>Hall of Fame & Academic Results</span>
            <button
              onClick={() => setCmsModalTab('toppers')}
              className="px-2.5 py-0.5 bg-black/40 hover:bg-black/70 rounded flex items-center gap-1"
            >
              <Edit3 size={12} /> Edit Results
            </button>
          </div>
        )}

        {/* 11. Results & Hall of Fame */}
        <ResultsToppersSection
          toppers={toppers}
          testimonials={testimonials}
        />

        {/* Quick Admin Section Edit Badge for Gallery */}
        {isAdminActive && (
          <div className="bg-orange-600 text-white py-1.5 px-4 text-xs font-bold flex items-center justify-between">
            <span>Campus Photo Gallery & Albums</span>
            <button
              onClick={() => setCmsModalTab('gallery')}
              className="px-2.5 py-0.5 bg-black/40 hover:bg-black/70 rounded flex items-center gap-1"
            >
              <Edit3 size={12} /> Manage Albums & Photos
            </button>
          </div>
        )}

        {/* 12. Photo Gallery with Albums */}
        <GallerySection gallery={gallery} albums={albums} />

        {/* 13. Interactive Admission & Scholarship Form */}
        <AdmissionInquirySection
          preSelectedCourse={selectedCourseForInquiry}
          onSubmitInquiry={submitInquiry}
          instituteInfo={instituteInfo}
        />

        {/* Quick Admin Section Edit Badge for Contact */}
        {isAdminActive && (
          <div className="bg-orange-600 text-white py-1.5 px-4 text-xs font-bold flex items-center justify-between">
            <span>Contact Details, Address & Social Links</span>
            <button
              onClick={() => setCmsModalTab('contact')}
              className="px-2.5 py-0.5 bg-black/40 hover:bg-black/70 rounded flex items-center gap-1"
            >
              <Edit3 size={12} /> Edit Contact Info
            </button>
          </div>
        )}

        {/* 14. Contact & Campus Location Map */}
        <ContactSection instituteInfo={instituteInfo} />
      </main>

      {/* 15. Footer */}
      <Footer
        instituteInfo={instituteInfo}
        onOpenLogin={handleOpenLogin}
        onOpenAdmission={scrollToAdmission}
      />

      {/* Visitor Welcome Lead Post Gate (Compact, High-Converting Alert Card) */}
      {showVisitorWelcome && !currentUser && (
        <VisitorWelcomeModal onUnlocked={() => setShowVisitorWelcome(false)} />
      )}

      {/* Login Portal Modal */}
      {showLoginModal && (
        <LoginModal
          initialRole={loginModalInitialRole}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      {/* CMS Page Editor Modal */}
      {cmsModalTab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto border border-slate-200">
            <button
              onClick={() => setCmsModalTab(null)}
              className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={20} />
            </button>
            <WebsiteCmsEditor initialTab={cmsModalTab} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
