import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useData } from './context/DataContext';

// Public Components
import { Header } from './components/public/Header';
import { Navbar } from './components/public/Navbar';
import { HeroBannerSlider } from './components/public/HeroBannerSlider';
import { QuickHighlights } from './components/public/QuickHighlights';
import { NoticeBoardSection } from './components/public/NoticeBoardSection';
import { DirectorMessageSection } from './components/public/DirectorMessageSection';
import { CoursesSection } from './components/public/CoursesSection';
import { FacultySection } from './components/public/FacultySection';
import { ResultsToppersSection } from './components/public/ResultsToppersSection';
import { GallerySection } from './components/public/GallerySection';
import { AdmissionInquirySection } from './components/public/AdmissionInquirySection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';

// Portal & Modals
import { LoginModal } from './components/portal/LoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { ParentDashboard } from './components/parent/ParentDashboard';

export function App() {
  const { currentUser, role, logout } = useAuth();
  const {
    instituteInfo,
    banners,
    notices,
    courses,
    faculty,
    toppers,
    gallery,
    testimonials,
    submitInquiry
  } = useData();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginModalInitialRole, setLoginModalInitialRole] = useState('admin');
  const [selectedCourseForInquiry, setSelectedCourseForInquiry] = useState(null);

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
    if (role === 'admin') {
      return <AdminDashboard onBackToPublic={logout} />;
    }
    if (role === 'teacher') {
      return <TeacherDashboard onBackToPublic={logout} />;
    }
    if (role === 'student') {
      return <StudentDashboard onBackToPublic={logout} />;
    }
    if (role === 'parent') {
      return <ParentDashboard onBackToPublic={logout} />;
    }
  }

  // Otherwise show the public website
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* 1. Topmost Notice Ticker & Header */}
      <Header
        onOpenLogin={() => handleOpenLogin('admin')}
        onOpenAdmission={scrollToAdmission}
      />

      {/* 2. Main Sticky Navbar */}
      <Navbar
        onOpenLogin={() => handleOpenLogin('admin')}
        onOpenAdmission={scrollToAdmission}
      />

      <main className="flex-1">
        {/* 3. Hero Banner Slider (Target Classes Style) */}
        <HeroBannerSlider
          banners={banners}
          onOpenAdmission={scrollToAdmission}
          onExploreCourses={scrollToCourses}
        />

        {/* 4. Quick Highlights & USPs */}
        <QuickHighlights />

        {/* 5. Live Notice Board (Target Classes Style) */}
        <NoticeBoardSection notices={notices} />

        {/* 6. Director's Message & Vision */}
        <DirectorMessageSection
          director={instituteInfo.director}
          onOpenAdmission={scrollToAdmission}
        />

        {/* 7. Categorized Courses & Programs */}
        <CoursesSection
          courses={courses}
          onSelectCourse={handleSelectCourse}
        />

        {/* 8. Faculty Team */}
        <FacultySection faculty={faculty} />

        {/* 9. Results & Hall of Fame */}
        <ResultsToppersSection
          toppers={toppers}
          testimonials={testimonials}
        />

        {/* 10. Photo Gallery */}
        <GallerySection gallery={gallery} />

        {/* 11. Interactive Admission & Scholarship Form */}
        <AdmissionInquirySection
          preSelectedCourse={selectedCourseForInquiry}
          onSubmitInquiry={submitInquiry}
          instituteInfo={instituteInfo}
        />

        {/* 12. Contact & Campus Location Map */}
        <ContactSection instituteInfo={instituteInfo} />
      </main>

      {/* 13. Footer */}
      <Footer
        instituteInfo={instituteInfo}
        onOpenLogin={handleOpenLogin}
        onOpenAdmission={scrollToAdmission}
      />

      {/* Login Portal Modal */}
      {showLoginModal && (
        <LoginModal
          initialRole={loginModalInitialRole}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}

export default App;
