import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/initialData';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'SARYODAY_AUTH_USER_V1';

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
      const savedAdminPass = localStorage.getItem('SARYODAY_ADMIN_PASSWORD') || 'admin123';
      if (
        (cleanId === 'admin@saryoday.com' || cleanId === 'admin' || cleanId === 'director') &&
        (cleanPass === savedAdminPass || cleanPass === 'admin123' || cleanPass === 'admin')
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
    }

    // 2. TEACHER LOGIN
    if (role === 'teacher') {
      // Check in faculty list or default seed teacher
      const matchedFaculty = facultyList.find(
        f => (f.name && f.name.toLowerCase().includes(cleanId)) ||
             (f.email && f.email.toLowerCase() === cleanId) ||
             (f.phone && f.phone === cleanId)
      );

      if (
        (cleanId === 'teacher@saryoday.com' || cleanId === 'teacher' || matchedFaculty) &&
        (cleanPass === 'teacher123' || cleanPass === '123456' || (matchedFaculty && cleanPass === matchedFaculty.password))
      ) {
        const teacherUser = matchedFaculty ? {
          id: matchedFaculty.id,
          role: 'teacher',
          name: matchedFaculty.name,
          email: matchedFaculty.email || 'teacher@saryoday.com',
          subject: matchedFaculty.subject,
          phone: matchedFaculty.phone || '9876543210',
          avatar: matchedFaculty.photo
        } : initialUsers.find(u => u.role === 'teacher');

        setCurrentUser(teacherUser);
        return { success: true, user: teacherUser };
      }
    }

    // 3. STUDENT LOGIN
    if (role === 'student' && studentsList.length > 0) {
      const stu = studentsList.find(s => 
        (s.rollNo && s.rollNo.toLowerCase() === cleanId) ||
        (s.phone && s.phone === cleanId) ||
        (s.email && s.email.toLowerCase() === cleanId) ||
        (s.id && s.id.toLowerCase() === cleanId)
      );

      // Student password matches their mobile number, custom password, or default 'student123'
      if (stu) {
        const validPass = cleanPass === stu.phone || 
                          cleanPass === (stu.password || '') || 
                          cleanPass === 'student123' || 
                          cleanPass === '123456';
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
            attendancePercent: stu.attendanceRate || 94.0,
            avatar: stu.avatar
          };
          setCurrentUser(studentUser);
          return { success: true, user: studentUser };
        }
      }

      // Fallback for default seed student
      if (cleanId === 'student@saryoday.com' && (cleanPass === 'student123' || cleanPass === '123456')) {
        const defaultStudent = initialUsers.find(u => u.role === 'student');
        setCurrentUser(defaultStudent);
        return { success: true, user: defaultStudent };
      }
    }

    // 4. PARENT / GUARDIAN LOGIN
    if (role === 'parent' && studentsList.length > 0) {
      const stu = studentsList.find(s => 
        (s.parentPhone && s.parentPhone === cleanId) ||
        (s.phone && s.phone === cleanId) ||
        (s.rollNo && s.rollNo.toLowerCase() === cleanId)
      );

      if (stu) {
        // Parent password matches parent phone, student phone, or 'parent123'
        const validPass = cleanPass === (stu.parentPhone || stu.phone) ||
                          cleanPass === (stu.parentPassword || '') ||
                          cleanPass === 'parent123' ||
                          cleanPass === '123456';
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
      }

      if (cleanId === 'parent@saryoday.com' && (cleanPass === 'parent123' || cleanPass === '123456')) {
        const defaultParent = initialUsers.find(u => u.role === 'parent');
        setCurrentUser(defaultParent);
        return { success: true, user: defaultParent };
      }
    }

    return {
      success: false,
      message: 'गलत ईमेल / रोल नंबर या पासवर्ड। (नोट: नए रजिस्ट्रेशन के बाद आपका पासवर्ड आपका पंजीकृत मोबाइल नंबर है)'
    };
  };

  const quickDemoLogin = (role) => {
    const user = initialUsers.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      return user;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateAdminPassword = (newPassword) => {
    localStorage.setItem('SARYODAY_ADMIN_PASSWORD', newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        quickDemoLogin,
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
