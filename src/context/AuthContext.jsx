import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/initialData';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'SARYODAY_AUTH_USER_SECURE_V5';
const DEFAULT_ADMIN_PASSWORD = 'Admin@Saryoday2025#';
const DEFAULT_TEACHER_PASSWORD = 'Teacher@Saryoday2025#';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse auth user', e);
    }
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [currentUser]);

  const login = (role, identifier, password, studentsList = [], facultyList = []) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // 1. ADMIN LOGIN
    if (role === 'admin') {
      const savedAdminPass = localStorage.getItem('SARYODAY_ADMIN_PASSWORD') || DEFAULT_ADMIN_PASSWORD;
      if (
        (cleanId === 'admin@saryoday.com' || cleanId === 'admin' || cleanId === 'director') &&
        (cleanPass === savedAdminPass)
      ) {
        const adminUser = initialUsers.find(u => u.role === 'admin') || {
          id: "usr-admin",
          role: "admin",
          name: "Er. R.K. Mishra",
          email: "admin@saryoday.com",
          title: "Coaching Director & HOD",
          phone: "8400100814"
        };
        setCurrentUser(adminUser);
        return { success: true, user: adminUser };
      }
      return {
        success: false,
        message: 'अमान्य एडमिन ईमेल अथवा पासवर्ड। कृपया सही क्रेडेंशियल दर्ज करें।'
      };
    }

    // 2. TEACHER LOGIN
    if (role === 'teacher') {
      const matchedFaculty = (facultyList || []).find(
        f => (f.name && f.name.toLowerCase().includes(cleanId)) ||
             (f.email && f.email.toLowerCase() === cleanId) ||
             (f.phone && f.phone === cleanId)
      );

      const isValidTeacher = 
        (cleanId === 'teacher@saryoday.com' && cleanPass === DEFAULT_TEACHER_PASSWORD) ||
        (matchedFaculty && (cleanPass === (matchedFaculty.password || DEFAULT_TEACHER_PASSWORD)));

      if (isValidTeacher) {
        const teacherUser = matchedFaculty ? {
          id: matchedFaculty.id,
          role: 'teacher',
          name: matchedFaculty.name,
          email: matchedFaculty.email || 'teacher@saryoday.com',
          subject: matchedFaculty.subject,
          phone: matchedFaculty.phone || '9876543210',
          avatar: matchedFaculty.photo
        } : (initialUsers.find(u => u.role === 'teacher') || {
          id: 'usr-teacher',
          role: 'teacher',
          name: 'Prof. Ankit Pandey',
          email: 'teacher@saryoday.com',
          subject: 'Mathematics'
        });

        setCurrentUser(teacherUser);
        return { success: true, user: teacherUser };
      }
      return {
        success: false,
        message: 'अमान्य शिक्षक आईडी अथवा पासवर्ड।'
      };
    }

    // 3. STUDENT LOGIN
    if (role === 'student') {
      if (!studentsList || studentsList.length === 0) {
        return {
          success: false,
          message: 'डेटाबेस में कोई विद्यार्थी पंजीकृत नहीं है। कृपया पहले एडमिन द्वारा नया प्रवेश (रजिस्ट्रेशन) कराएं।'
        };
      }

      const stu = studentsList.find(s => 
        (s.rollNo && s.rollNo.toLowerCase() === cleanId) ||
        (s.phone && s.phone === cleanId) ||
        (s.email && s.email.toLowerCase() === cleanId) ||
        (s.id && s.id.toLowerCase() === cleanId)
      );

      if (stu) {
        const validPass = cleanPass === (stu.password || stu.phone);
        if (validPass) {
          const studentUser = {
            id: stu.id,
            role: 'student',
            name: stu.name,
            email: stu.email || `${stu.rollNo.toLowerCase()}@saryoday.com`,
            rollNo: stu.rollNo,
            studentId: stu.id,
            className: stu.className,
            batch: stu.batch,
            phone: stu.phone,
            fatherName: stu.fatherName,
            totalFee: stu.totalFee,
            paidFee: stu.paidFee,
            dueFee: stu.dueFee,
            attendancePercent: stu.attendanceRate || 100,
            avatar: stu.avatar
          };
          setCurrentUser(studentUser);
          return { success: true, user: studentUser };
        }
        return {
          success: false,
          message: 'गलत पासवर्ड! छात्र का डिफ़ॉल्ट पासवर्ड उनका पंजीकृत 10 अंकों का मोबाइल नंबर होता है।'
        };
      }
      return {
        success: false,
        message: 'यह रोल नंबर अथवा मोबाइल नंबर पंजीकृत नहीं है।'
      };
    }

    // 4. PARENT / GUARDIAN LOGIN
    if (role === 'parent') {
      if (!studentsList || studentsList.length === 0) {
        return {
          success: false,
          message: 'डेटाबेस में कोई विद्यार्थी रिकॉर्ड नहीं है।'
        };
      }

      const stu = studentsList.find(s => 
        (s.parentPhone && s.parentPhone === cleanId) ||
        (s.phone && s.phone === cleanId) ||
        (s.rollNo && s.rollNo.toLowerCase() === cleanId)
      );

      if (stu) {
        const validPass = cleanPass === (stu.parentPhone || stu.phone || stu.parentPassword);
        if (validPass) {
          const parentUser = {
            id: `par-${stu.id}`,
            role: 'parent',
            name: stu.fatherName || 'अभिभावक (Parent)',
            email: `parent.${stu.rollNo.toLowerCase()}@saryoday.com`,
            childRollNo: stu.rollNo,
            childName: stu.name,
            phone: stu.parentPhone || stu.phone,
            childBatch: stu.batch,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
          };
          setCurrentUser(parentUser);
          return { success: true, user: parentUser };
        }
        return {
          success: false,
          message: 'गलत पासवर्ड! अभिभावक का लॉगिन पासवर्ड उनका 10 अंकों का पंजीकृत मोबाइल नंबर है।'
        };
      }
      return {
        success: false,
        message: 'यह मोबाइल नंबर किसी पंजीकृत विद्यार्थी से सम्बद्ध नहीं है।'
      };
    }

    return {
      success: false,
      message: 'अमान्य लॉगिन अनुरोध।'
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateAdminPassword = (newPassword) => {
    if (!newPassword || newPassword.length < 6) {
      return { success: false, message: 'नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।' };
    }
    localStorage.setItem('SARYODAY_ADMIN_PASSWORD', newPassword);
    return { success: true, message: 'एडमिन पासवर्ड सफलतापूर्वक अपडेट कर दिया गया।' };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        updateAdminPassword,
        isAuthenticated: !!currentUser,
        role: currentUser?.role || null
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
