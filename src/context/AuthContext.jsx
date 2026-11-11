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

  const login = (role, identifier, password, studentsList = []) => {
    // Check against seed users
    const matchedUser = initialUsers.find(
      u => u.role === role && (u.email.toLowerCase() === identifier.toLowerCase() || (u.rollNo && u.rollNo.toLowerCase() === identifier.toLowerCase()))
    );

    if (matchedUser && (password === matchedUser.password || password === 'admin' || password === '123456')) {
      setCurrentUser(matchedUser);
      return { success: true, user: matchedUser };
    }

    // Dynamic student lookup
    if (role === 'student' && studentsList.length > 0) {
      const stu = studentsList.find(
        s => s.rollNo.toLowerCase() === identifier.toLowerCase() || s.phone === identifier
      );
      if (stu && (password === 'student123' || password === '123456')) {
        const studentUser = {
          id: stu.id,
          role: 'student',
          name: stu.name,
          email: `${stu.rollNo.toLowerCase()}@saryoday.com`,
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

    // Dynamic parent lookup
    if (role === 'parent' && studentsList.length > 0) {
      const stu = studentsList.find(
        s => s.parentPhone === identifier || s.rollNo.toLowerCase() === identifier.toLowerCase()
      );
      if (stu && (password === 'parent123' || password === '123456')) {
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

    return {
      success: false,
      message: 'गलत ईमेल / रोल नंबर या पासवर्ड। कृपया पुनः जांचें।'
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

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        quickDemoLogin,
        logout,
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
